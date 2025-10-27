// src/services/workflow/types.ts

/**
 * Interface for security context (simplified)
 */
interface SecurityContext {
  incidentId?: string;
  hostName?: string;
  detectionType?: string;
  severity?: string;
  timestamp?: string;
  additionalContext?: Record<string, unknown>;
}

/**
 * Interface for workflow execution parameters
 */
export interface WorkflowExecutionParams {
  query: string;
  model: string;
  temperature: number;
  stopWords: string[];
  jsonSchema: string;
  dataToInclude: string[];
  selectedContext: string;
  enableCaching: boolean;
  enablePromptEnhancement?: boolean;
  securityContext?: SecurityContext;
}

/**
 * Interface for workflow execution result
 */
export interface WorkflowExecutionResult {
  success: boolean;
  content?: string;
  error?: string;
  fromCache?: boolean;
}

/**
 * Enum for workflow execution statuses
 */
export enum WorkflowStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'InProgress',
  RUNNING = 'Running',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
  UNKNOWN = 'Unknown',
}

/**
 * Interface for workflow polling result
 */
export interface WorkflowPollResult {
  status: WorkflowStatus;
  output_data?: Record<string, unknown>;
  error?: string;
  pollResults?: unknown[];
}

/**
 * Interface for workflow payload sent to the API
 */
export interface WorkflowPayload {
  user_prompt: string;
  model_name: string;
  temperature: number;
  stop_words?: string[];
  json_schema?: string;
  data_to_include?: string[];
}

/**
 * Interface for workflow execution API response
 */
export interface WorkflowExecutionResponse {
  errors?: Array<{ message?: string }>;
  resources?: unknown[];
}

/**
 * Configuration constants for workflow execution
 */
export const WORKFLOW_CONFIG = {
  MAX_POLL_ATTEMPTS: 90,
  WORKFLOW_NAME: 'Charlotte Toolkit Chat Completion',
  WORKFLOW_DEPTH: 0,
} as const;

// Note: Model mapping and options are now centralized in utils/constants.ts
// This reduces duplication and keeps UI-related model definitions in one place
