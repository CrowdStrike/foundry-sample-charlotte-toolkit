// src/services/workflow/WorkflowValidator.ts

import type { WorkflowExecutionParams } from './types';

/**
 * Validation result interface
 */
export interface ValidationResult {
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

/**
 * Validate model name against supported models
 * @param modelName - Model name to validate
 * @returns Validation result
 */
export const validateModelName = (modelName: string): ValidationResult => {
  const supportedModels = [
    'Claude Latest',
    'Claude_Latest',
    'Claude 3.7 Sonnet',
    'Claude_3.7_Sonnet',
    'GPT-4o',
  ];

  if (!supportedModels.includes(modelName)) {
    return {
      isValid: false,
      error: `Unsupported model: ${modelName}. Supported models: ${supportedModels.join(', ')}`,
    };
  }

  return { isValid: true };
};

/**
 * Validate temperature value with specific recommendations
 * @param temperature - Temperature value to validate
 * @returns Validation result with recommendations
 */
export const validateTemperature = (temperature: number): ValidationResult => {
  if (typeof temperature !== 'number') {
    return { isValid: false, error: 'Temperature must be a number' };
  }

  if (temperature < 0 || temperature > 1) {
    return { isValid: false, error: 'Temperature must be between 0 and 1' };
  }

  // Optional: Provide recommendations for different use cases
  if (temperature === 0) {
    // console.log('ℹ️ Temperature 0.0: Deterministic output, good for consistent results');
  } else if (temperature <= 0.3) {
    // console.log('ℹ️ Low temperature: More focused and deterministic responses');
  } else if (temperature <= 0.7) {
    // console.log('ℹ️ Medium temperature: Balanced creativity and consistency');
  } else {
    // console.log('ℹ️ High temperature: More creative and varied responses');
  }

  return { isValid: true };
};

/**
 * Validate JSON schema format
 * @param jsonSchema - JSON schema string to validate
 * @returns Validation result
 */
export const validateJsonSchema = (jsonSchema: string): ValidationResult => {
  if (!jsonSchema.trim()) {
    return { isValid: true }; // Empty schema is valid (optional)
  }

  try {
    const parsed = JSON.parse(jsonSchema);

    // Basic JSON Schema validation
    if (typeof parsed !== 'object' || parsed === null) {
      return { isValid: false, error: 'JSON schema must be an object' };
    }

    // Check for required JSON Schema properties
    if (!parsed.type) {
      return { isValid: false, error: 'JSON schema must have a "type" property' };
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: `Invalid JSON schema format: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
};

/**
 * Comprehensive validation with detailed error reporting
 * @param params - Workflow execution parameters
 * @returns Detailed validation result
 */
export const validateWorkflowParamsDetailed = (
  params: WorkflowExecutionParams
): ValidationResult & {
  warnings?: string[];
} => {
  const warnings: string[] = [];

  // Run basic validation first
  const basicValidation = validateWorkflowParams(params);
  if (!basicValidation.isValid) {
    return basicValidation;
  }

  // Additional detailed validations
  const modelValidation = validateModelName(params.model);
  if (!modelValidation.isValid) {
    return modelValidation;
  }

  const temperatureValidation = validateTemperature(params.temperature);
  if (!temperatureValidation.isValid) {
    return temperatureValidation;
  }

  if (params.jsonSchema) {
    const schemaValidation = validateJsonSchema(params.jsonSchema);
    if (!schemaValidation.isValid) {
      return schemaValidation;
    }
  }

  // Generate warnings for potential issues
  if (params.query.length < 10) {
    warnings.push('Query is very short - consider providing more context for better results');
  }

  if (params.query.length > 4000) {
    warnings.push('Query is very long - consider breaking it into smaller, focused requests');
  }

  if (params.stopWords && params.stopWords.length > 2) {
    warnings.push('Many stop words may overly constrain the response');
  }

  if (params.dataToInclude && params.dataToInclude.length > 5) {
    warnings.push('Large amount of context data may affect response focus');
  }

  return {
    isValid: true,
    ...(warnings.length > 0 && { warnings }),
  };
};
