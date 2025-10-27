// src/services/workflow/WorkflowPolling.ts

import type FalconApi from '@crowdstrike/foundry-js';

import { wait } from '../../utils/helpers';

import {
  WORKFLOW_CONFIG,
  type WorkflowPollResult,
  WorkflowStatus,
} from './types';

/**
 * Poll workflow for completion with simple 1-second intervals
 * Handles status checking, retry logic, and timeout management
 * @param falcon - Falcon API instance
 * @param workflowId - Workflow execution ID
 * @param options - Polling configuration options
 * @returns Promise with workflow completion result
 */
export const pollWorkflowCompletion = async (
  falcon: FalconApi,
  workflowId: string,
  options: {
    maxAttempts?: number;
  } = {},
): Promise<WorkflowPollResult> => {
  const { maxAttempts = WORKFLOW_CONFIG.MAX_POLL_ATTEMPTS } = options;

  let attempts = 0;
  const delay = 1000; // Fixed 1-second delay
  // biome-ignore lint/suspicious/noExplicitAny: pollResults contains dynamic status snapshots with varying properties
  const pollResults: any[] = [];

  while (attempts < maxAttempts) {
    try {
      const result = await getWorkflowStatus(falcon, workflowId);
      pollResults.push({
        attempt: attempts + 1,
        timestamp: Date.now(),
        status: result.status,
        hasOutput: !!result.output_data,
      });

      // Check if workflow is complete
      if (result.status === WorkflowStatus.COMPLETED) {
        return {
          status: WorkflowStatus.COMPLETED,
          ...(result.output_data && { output_data: result.output_data }),
          pollResults,
        };
      }

      // Check if workflow failed
      if (result.status === WorkflowStatus.FAILED) {
        return {
          status: WorkflowStatus.FAILED,
          error: result.error ?? 'Workflow execution failed',
          pollResults,
        };
      }

      // Still running, wait and try again
      if (isWorkflowRunning(result.status)) {
        attempts++;
        if (attempts < maxAttempts) {
          // console.log(`⏳ Polling attempt ${attempts}/${maxAttempts} - Status: ${result.status} - Waiting 1 second`);
          await wait(delay);
          continue;
        } else {
          throw new Error('Workflow execution timed out');
        }
      }

      // Unknown status
      throw new Error(`Unknown workflow status: ${result.status}`);
    } catch (error) {
      // console.error(`Polling attempt ${attempts + 1} failed:`, error);

      // Add error to poll results
      pollResults.push({
        attempt: attempts + 1,
        timestamp: Date.now(),
        error: error instanceof Error ? error.message : String(error),
      });

      // If this is the last attempt, throw the error
      if (attempts >= maxAttempts - 1) {
        throw error;
      }

      // Otherwise, wait and try again
      attempts++;
      await wait(delay);
    }
  }

  throw new Error('Workflow polling timed out after maximum attempts');
};

/**
 * Get current workflow execution status
 * @param falcon - Falcon API instance
 * @param workflowId - Workflow execution ID
 * @returns Current workflow status and data
 */
export const getWorkflowStatus = async (
  falcon: FalconApi,
  workflowId: string,
): Promise<{
  status: WorkflowStatus;
  output_data?: Record<string, unknown>;
  error?: string;
}> => {
  const result = await falcon.api.workflows.getEntitiesExecutionResultsV1({
    ids: [workflowId],
  });

  if (result.errors && result.errors.length > 0) {
    throw new Error(
      result.errors[0]?.message ?? 'Failed to get workflow results',
    );
  }

  if (!result.resources || result.resources.length === 0) {
    throw new Error('No workflow results found');
  }

  // biome-ignore lint/suspicious/noExplicitAny: Falcon API workflow result has untyped response structure
  const workflowResult = result.resources[0] as any;

  return {
    status: parseWorkflowStatus(workflowResult.status),
    output_data: workflowResult.output_data,
    error: workflowResult.error,
  };
};

/**
 * Check if workflow is in a running state
 * @param status - Workflow status to check
 * @returns True if workflow is still running
 */
export const isWorkflowRunning = (status: WorkflowStatus): boolean => {
  return (
    status === WorkflowStatus.IN_PROGRESS ||
    status === WorkflowStatus.RUNNING ||
    status === WorkflowStatus.PENDING
  );
};

/**
 * Parse workflow status string to enum
 * @param statusString - Status string from API
 * @returns Parsed workflow status
 */
export const parseWorkflowStatus = (statusString: string): WorkflowStatus => {
  const normalizedStatus = statusString?.trim().toLowerCase();

  switch (normalizedStatus) {
    case 'pending':
      return WorkflowStatus.PENDING;
    case 'inprogress':
    case 'in progress':
      return WorkflowStatus.IN_PROGRESS;
    case 'running':
      return WorkflowStatus.RUNNING;
    case 'completed':
      return WorkflowStatus.COMPLETED;
    case 'failed':
      return WorkflowStatus.FAILED;
    default:
      // console.warn(`Unknown workflow status: ${statusString}`);
      return WorkflowStatus.UNKNOWN;
  }
};
