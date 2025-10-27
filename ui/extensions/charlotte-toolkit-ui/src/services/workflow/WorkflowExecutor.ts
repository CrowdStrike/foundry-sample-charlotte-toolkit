// src/services/workflow/WorkflowExecutor.ts

import type FalconApi from '@crowdstrike/foundry-js';

import type { LLMResponse } from '../../types';
import { responseCache } from '../../utils/cache';
import { formatErrorMessage, generateCacheKey } from '../../utils/helpers';
import {
  WORKFLOW_CONFIG,
  type WorkflowExecutionParams,
  type WorkflowExecutionResponse,
  type WorkflowExecutionResult,
  type WorkflowPayload,
  type WorkflowPollResult,
  WorkflowStatus,
} from './types';
import { extractWorkflowContent, validateExtractedContent } from './WorkflowContentExtractor';
import { buildWorkflowPayload, logPayloadInfo } from './WorkflowPayloadBuilder';
import { pollWorkflowCompletion } from './WorkflowPolling';
import { validateWorkflowParams } from './WorkflowValidator';

/**
 * Execute workflow via Falcon API
 * Handles the initial workflow trigger and returns the execution ID
 * @param falcon - Falcon API instance
 * @param payload - Workflow execution payload
 * @returns Promise with workflow execution response
 */
const executeWorkflow = async (
  falcon: FalconApi,
  payload: WorkflowPayload,
): Promise<WorkflowExecutionResponse> => {
  const workflowConfig = {
    name: WORKFLOW_CONFIG.WORKFLOW_NAME,
    depth: WORKFLOW_CONFIG.WORKFLOW_DEPTH,
  };

  // console.log(`🚀 Executing workflow: ${workflowConfig.name}`);
  const response = await falcon.api.workflows.postEntitiesExecuteV1(payload, workflowConfig);

  if (response.errors && response.errors.length > 0) {
    throw new Error(response.errors[0]?.message ?? 'Workflow execution failed');
  }

  if (!response.resources || response.resources.length === 0) {
    throw new Error('No workflow execution ID returned');
  }

  return response;
};

/**
 * Check cache for existing response
 * @param params - Workflow execution parameters
 * @returns Cached response or null
 */
const checkCache = (params: WorkflowExecutionParams): string | null => {
  if (!params.enableCaching) {
    return null;
  }

  try {
    const cacheKey = generateCacheKey(
      params.query,
      params.model,
      params.temperature,
      params.stopWords,
      params.jsonSchema,
      params.dataToInclude,
    );

    const cachedResponse = responseCache.get(cacheKey);
    return cachedResponse?.content ?? null;
  } catch {
    // console.warn('Cache check failed:', error);
    return null;
  }
};

/**
 * Save response to cache
 * @param params - Workflow execution parameters
 * @param content - Response content to cache
 */
const saveResponseToCache = (params: WorkflowExecutionParams, content: string): void => {
  if (!params.enableCaching) {
    return;
  }

  try {
    const cacheKey = generateCacheKey(
      params.query,
      params.model,
      params.temperature,
      params.stopWords,
      params.jsonSchema,
      params.dataToInclude,
    );

    const llmResponse: LLMResponse = {
      content,
      model: params.model,
    };

    responseCache.set(cacheKey, llmResponse);
    // console.log('💾 Response cached successfully');
  } catch {
    // console.warn('Cache save failed:', error);
  }
};

/**
 * Execute workflow with full error handling and caching
 * Main function to execute LLM workflow with modular architecture
 * @param falcon - Falcon API instance
 * @param params - Workflow execution parameters
 * @returns Promise with workflow execution result
 */
export const executeWorkflowWithCache = async (
  falcon: FalconApi,
  params: WorkflowExecutionParams,
): Promise<WorkflowExecutionResult> => {
  let workflowId: string | undefined;
  let payload: WorkflowPayload | undefined;
  let pollingResult: WorkflowPollResult;

  try {
    // console.log('🎯 Starting workflow execution with modular architecture...');

    // Step 1: Validate parameters using WorkflowValidator
    const validation = validateWorkflowParams(params);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error ?? 'Validation failed',
      };
    }

    // Step 2: Check cache first
    const cachedResponse = checkCache(params);
    if (cachedResponse) {
      // console.log('💾 Cache hit - returning cached response');
      return {
        success: true,
        content: cachedResponse,
        fromCache: true,
      };
    }

    // Step 3: Build payload using WorkflowPayloadBuilder
    payload = buildWorkflowPayload(params);
    logPayloadInfo(payload, 'Workflow Execution');

    // Step 4: Execute workflow
    const executionResponse = await executeWorkflow(falcon, payload);
    workflowId = executionResponse.resources?.[0] as string | undefined;

    // console.log(`✅ Workflow started successfully: ${workflowId}`);

    // Step 5: Poll for completion using WorkflowPolling
    if (!workflowId) {
      throw new Error('No workflow ID received from execution');
    }

    // console.log('⏳ Polling for workflow completion...');
    pollingResult = await pollWorkflowCompletion(falcon, workflowId);

    if (pollingResult.status === WorkflowStatus.FAILED) {
      const errorMessage = pollingResult.error ?? 'Workflow execution failed';

      return {
        success: false,
        error: errorMessage,
      };
    }

    // Step 6: Extract content using WorkflowContentExtractor
    // console.log('📤 Extracting workflow results...');
    const content = extractWorkflowContent(pollingResult.output_data);

    // Step 7: Validate extracted content quality
    const contentValidation = validateExtractedContent(content);
    if (!contentValidation.isValid) {
      // console.warn('⚠️ Content validation warnings:', contentValidation.warnings);
    }

    // console.log(`✅ Content extracted successfully (${contentValidation.wordCount} words, ${contentValidation.estimatedFormat} format)`);

    // Step 8: Save to cache
    saveResponseToCache(params, content);

    // console.log(`🎉 Workflow execution completed successfully`);

    return {
      success: true,
      content,
      fromCache: false,
    };
  } catch (error) {
    // console.error('❌ Workflow execution failed:', error);

    return {
      success: false,
      error: formatErrorMessage(error),
    };
  }
};
