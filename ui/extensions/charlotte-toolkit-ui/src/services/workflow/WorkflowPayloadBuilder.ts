// src/services/workflow/WorkflowPayloadBuilder.ts

import { getModelLabel, VALIDATION_THRESHOLDS } from '../../utils/constants';
import {
  createSecurityResponseSchema,
  detectUseCase,
} from '../../utils/promptEngineer';
import type { WorkflowExecutionParams } from './types';

/**
 * Build workflow execution payload with enhanced prompting
 * Handles model name normalization, prompt enhancement, and parameter formatting
 * @param params - Workflow execution parameters
 * @returns Formatted payload for workflow execution
 */
export const buildWorkflowPayload = (
  params: WorkflowExecutionParams,
  // biome-ignore lint/suspicious/noExplicitAny: workflow payload structure varies based on parameters
): Record<string, any> => {
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
  // biome-ignore lint/suspicious/noExplicitAny: payload object accepts dynamic workflow parameters
  const payload: Record<string, any> = {
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
export const normalizeModelName = (modelName: string): string => {
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
  // biome-ignore lint/suspicious/noExplicitAny: payload accepts dynamic optional parameters
  payload: Record<string, any>,
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
 * Estimate payload size for performance optimization
 * @param payload - Payload to analyze
 * @returns Size estimation and recommendations
 */
export const analyzePayloadSize = (
  // biome-ignore lint/suspicious/noExplicitAny: analyzes payloads with varying structures
  payload: Record<string, any>,
): {
  estimatedBytes: number;
  characterCount: number;
  complexity: 'low' | 'medium' | 'high';
  recommendations: string[];
} => {
  const jsonString = JSON.stringify(payload);
  const estimatedBytes = new Blob([jsonString]).size;
  const characterCount = jsonString.length;

  let complexity: 'low' | 'medium' | 'high' = 'low';
  const recommendations: string[] = [];

  // Determine complexity
  if (estimatedBytes > VALIDATION_THRESHOLDS.PAYLOAD_SIZE_HIGH) {
    complexity = 'high';
    recommendations.push(
      'Consider breaking down the request into smaller chunks',
    );
  } else if (estimatedBytes > VALIDATION_THRESHOLDS.PAYLOAD_SIZE_MEDIUM) {
    complexity = 'medium';
    recommendations.push('Monitor response times for potential optimization');
  }

  // Specific recommendations
  if (
    payload.user_prompt &&
    payload.user_prompt.length > VALIDATION_THRESHOLDS.LONG_PROMPT
  ) {
    recommendations.push('Consider shortening the main prompt');
  }

  if (
    payload.data_to_include &&
    payload.data_to_include.length > VALIDATION_THRESHOLDS.CONTEXT_ITEMS - 2
  ) {
    recommendations.push('Reduce context data for better focus');
  }

  if (
    payload.json_schema &&
    payload.json_schema.length > VALIDATION_THRESHOLDS.JSON_SCHEMA_SIZE
  ) {
    recommendations.push('Simplify JSON schema for faster processing');
  }

  return {
    estimatedBytes,
    characterCount,
    complexity,
    recommendations,
  };
};

/**
 * Log payload information for debugging
 * @param payload - Payload to log
 * @param context - Additional context for logging
 */
export const logPayloadInfo = (
  // biome-ignore lint/suspicious/noExplicitAny: logs payloads with varying structures
  payload: Record<string, any>,
  _context: string = '',
): void => {
  // console.log(`=== PAYLOAD INFO ${context ? `(${context})` : ''} ===`);
  // console.log('Model:', payload.model_name);
  // console.log('Temperature:', payload.temperature);
  // console.log('Prompt length:', payload.user_prompt?.length || 0);
  // console.log('Has schema:', !!payload.json_schema);
  // console.log('Stop words:', payload.stop_words?.length || 0);
  // console.log('Context items:', payload.data_to_include?.length || 0);

  const sizeInfo = analyzePayloadSize(payload);
  // console.log('Estimated size:', `${sizeInfo.estimatedBytes} bytes (${sizeInfo.complexity} complexity)`);

  if (sizeInfo.recommendations.length > 0) {
    // console.log('Recommendations:', sizeInfo.recommendations);
  }
};
