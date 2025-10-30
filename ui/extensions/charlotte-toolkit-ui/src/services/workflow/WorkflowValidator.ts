// src/services/workflow/WorkflowValidator.ts

import type { WorkflowExecutionParams } from './types';

/**
 * Validation result interface
 */
interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate workflow execution parameters
 * Ensures all required parameters are present and properly formatted
 * @param params - Parameters to validate
 * @returns Validation result with error details if invalid
 */
export const validateWorkflowParams = (params: WorkflowExecutionParams): ValidationResult => {
  // Query validation
  if (!params.query || typeof params.query !== 'string' || !params.query.trim()) {
    return { isValid: false, error: 'Query is required' };
  }

  // Model validation
  if (!params.model || typeof params.model !== 'string') {
    return { isValid: false, error: 'Model is required' };
  }

  // Temperature validation
  if (typeof params.temperature !== 'number' || params.temperature < 0 || params.temperature > 1) {
    return { isValid: false, error: 'Temperature must be between 0 and 1' };
  }

  // Stop words validation (optional parameter)
  if (params.stopWords && !Array.isArray(params.stopWords)) {
    return { isValid: false, error: 'Stop words must be an array' };
  }

  if (params.stopWords && params.stopWords.length > 4) {
    return { isValid: false, error: 'Maximum 4 stop words allowed' };
  }

  // JSON schema validation (optional parameter)
  if (params.jsonSchema && typeof params.jsonSchema !== 'string') {
    return { isValid: false, error: 'JSON schema must be a string' };
  }

  // Data to include validation (optional parameter)
  if (params.dataToInclude && !Array.isArray(params.dataToInclude)) {
    return { isValid: false, error: 'Data to include must be an array' };
  }

  return { isValid: true };
};
