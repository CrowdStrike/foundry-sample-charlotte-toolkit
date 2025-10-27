// src/services/workflow/WorkflowPayloadBuilder.ts

import { getModelLabel } from '../../utils/constants';
import { createSecurityResponseSchema, detectUseCase } from '../../utils/promptEngineer';
import type { WorkflowExecutionParams, WorkflowPayload } from './types';

/**
 * Build workflow execution payload with enhanced prompting
 * Handles model name normalization, prompt enhancement, and parameter formatting
 * @param params - Workflow execution parameters
 * @returns Formatted payload for workflow execution
 */
export const buildWorkflowPayload = (params: WorkflowExecutionParams): WorkflowPayload => {
  const { query, model, temperature, selectedContext } = params;

  // Normalize model name to ensure schema compliance
  const normalizedModel = normalizeModelName(model);

  // Enhanced prompt engineering for Charlotte AI
  let finalPrompt = query;
  let enhancedJsonSchema = params.jsonSchema;

  // Apply prompt enhancement if enabled (default: true for better Charlotte AI results)
  const shouldEnhancePrompts = params.enablePromptEnhancement !== false;

  if (shouldEnhancePrompts) {
    // console.log('🔬 Enhancing prompt for Charlotte AI security expertise...');

    // Use query as-is (simplified prompt handling)
    finalPrompt = query;

    // Auto-generate structured schema if none provided
    if (!enhancedJsonSchema?.trim()) {
      const detectedUseCase = detectUseCase(query);
      enhancedJsonSchema = createSecurityResponseSchema(detectedUseCase);
      // console.log(`📋 Auto-generated ${detectedUseCase} response schema`);
    }

    // console.log('✅ Prompt enhancement applied for better Charlotte AI analysis');
  } else {
    // console.log('📝 Using raw prompt (enhancement disabled)');
    finalPrompt = query;
  }

  // Build base payload
  const payload: WorkflowPayload = {
    user_prompt: finalPrompt,
    model_name: normalizedModel,
    temperature,
  };

  // Add optional parameters if provided
  addOptionalParameters(payload, params, enhancedJsonSchema, selectedContext);

  return payload;
};

/**
 * Normalize model name to match workflow schema exactly
 * @param modelName - Model name that might have underscores
 * @returns Normalized model name with spaces as required by schema
 */
const normalizeModelName = (modelName: string): string => {
  return getModelLabel(modelName);
};

/**
 * Add optional parameters to payload if provided
 * @param payload - Base payload to enhance
 * @param params - Original workflow parameters
 * @param enhancedJsonSchema - Processed JSON schema
 * @param selectedContext - Selected context data
 */
const addOptionalParameters = (
  payload: WorkflowPayload,
  params: WorkflowExecutionParams,
  enhancedJsonSchema: string,
  selectedContext: string,
): void => {
  // Add stop words if provided
  if (params.stopWords && params.stopWords.length > 0) {
    payload.stop_words = params.stopWords;
  }

  // Add JSON schema if provided
  if (enhancedJsonSchema?.trim()) {
    payload.json_schema = enhancedJsonSchema.trim();
  }

  // Add data to include if provided
  if (params.dataToInclude && params.dataToInclude.length > 0) {
    payload.data_to_include = [...params.dataToInclude];
  }

  // Add context data if selected
  if (selectedContext?.trim()) {
    if (payload.data_to_include) {
      payload.data_to_include = [...payload.data_to_include, selectedContext];
    } else {
      payload.data_to_include = [selectedContext];
    }
  }
};

/**
 * Log payload information for debugging
 * @param payload - Payload to log
 * @param context - Additional context for logging
 */
export const logPayloadInfo = (_payload: WorkflowPayload, _context: string = ''): void => {
  // All logging is disabled for production
  // This function is kept for API compatibility
};
