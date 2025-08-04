// src/services/workflow/WorkflowPayloadBuilder.ts

import { createSecurityResponseSchema, detectUseCase } from '../../utils/promptEngineer';

import { 
  getModelLabel,
  VALIDATION_THRESHOLDS,
} from '../../utils/constants';
import type { WorkflowExecutionParams } from './types';

/**
 * Build workflow execution payload with enhanced prompting
 * Handles model name normalization, prompt enhancement, and parameter formatting
 * @param params - Workflow execution parameters
 * @returns Formatted payload for workflow execution
 */
export const buildWorkflowPayload = (params: WorkflowExecutionParams): Record<string, any> => {
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
  payload: Record<string, any>,
  params: WorkflowExecutionParams,
  enhancedJsonSchema: string,
  selectedContext: string
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
 * Validate payload before sending to workflow
 * @param payload - Payload to validate
 * @returns Validation result
 */
export const validatePayload = (
  payload: Record<string, any>
): {
  isValid: boolean;
  error?: string;
  warnings?: string[];
} => {
  const warnings: string[] = [];

  // Required field validation
  if (!payload.user_prompt || typeof payload.user_prompt !== 'string') {
    return { isValid: false, error: 'user_prompt is required and must be a string' };
  }

  if (!payload.model_name || typeof payload.model_name !== 'string') {
    return { isValid: false, error: 'model_name is required and must be a string' };
  }

  if (typeof payload.temperature !== 'number') {
    return { isValid: false, error: 'temperature is required and must be a number' };
  }

  // Optional field validation
  if (payload.stop_words && !Array.isArray(payload.stop_words)) {
    return { isValid: false, error: 'stop_words must be an array if provided' };
  }

  if (payload.json_schema && typeof payload.json_schema !== 'string') {
    return { isValid: false, error: 'json_schema must be a string if provided' };
  }

  if (payload.data_to_include && !Array.isArray(payload.data_to_include)) {
    return { isValid: false, error: 'data_to_include must be an array if provided' };
  }

  // Generate warnings for optimization
  if (payload.user_prompt.length > VALIDATION_THRESHOLDS.PROMPT_LENGTH) {
    warnings.push('Prompt is very long - consider shortening for optimal performance');
  }

  if (payload.stop_words && payload.stop_words.length > VALIDATION_THRESHOLDS.STOP_WORDS_MAX) {
    warnings.push('Many stop words may constrain response creativity');
  }

  if (payload.data_to_include && payload.data_to_include.length > VALIDATION_THRESHOLDS.CONTEXT_ITEMS) {
    warnings.push('Large amount of context data may affect response focus');
  }

  return {
    isValid: true,
    ...(warnings.length > 0 && { warnings }),
  };
};

/**
 * Create payload for different use cases with optimized parameters
 * @param baseParams - Base workflow parameters
 * @param useCase - Specific use case for optimization
 * @returns Optimized payload
 */
export const createOptimizedPayload = (
  baseParams: WorkflowExecutionParams,
  useCase: 'security_analysis' | 'threat_hunting' | 'incident_response' | 'general'
): Record<string, any> => {
  const optimizations = getUseCaseOptimizations(useCase);

  // Apply use case specific optimizations
  const optimizedParams: WorkflowExecutionParams = {
    ...baseParams,
    ...optimizations.parameterOverrides,
    enablePromptEnhancement: optimizations.enablePromptEnhancement,
  };

  const payload = buildWorkflowPayload(optimizedParams);

  // Add use case specific metadata
  payload._useCase = useCase;
  payload._optimization = optimizations.name;

  return payload;
};

/**
 * Get optimization settings for different use cases
 * @param useCase - Use case to optimize for
 * @returns Optimization configuration
 */
const getUseCaseOptimizations = (useCase: string) => {
  const optimizations = {
    security_analysis: {
      name: 'Security Analysis Optimized',
      enablePromptEnhancement: true,
      parameterOverrides: {
        temperature: 0.3, // More focused for analysis
      },
    },
    threat_hunting: {
      name: 'Threat Hunting Optimized',
      enablePromptEnhancement: true,
      parameterOverrides: {
        temperature: 0.5, // Balanced for discovery
      },
    },
    incident_response: {
      name: 'Incident Response Optimized',
      enablePromptEnhancement: true,
      parameterOverrides: {
        temperature: 0.2, // Very focused for critical decisions
      },
    },
    general: {
      name: 'General Purpose',
      enablePromptEnhancement: true,
      parameterOverrides: {},
    },
  };

  return optimizations[useCase as keyof typeof optimizations] ?? optimizations.general;
};

/**
 * Estimate payload size for performance optimization
 * @param payload - Payload to analyze
 * @returns Size estimation and recommendations
 */
export const analyzePayloadSize = (
  payload: Record<string, any>
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
    recommendations.push('Consider breaking down the request into smaller chunks');
  } else if (estimatedBytes > VALIDATION_THRESHOLDS.PAYLOAD_SIZE_MEDIUM) {
    complexity = 'medium';
    recommendations.push('Monitor response times for potential optimization');
  }

  // Specific recommendations
  if (payload.user_prompt && payload.user_prompt.length > VALIDATION_THRESHOLDS.LONG_PROMPT) {
    recommendations.push('Consider shortening the main prompt');
  }

  if (payload.data_to_include && payload.data_to_include.length > (VALIDATION_THRESHOLDS.CONTEXT_ITEMS - 2)) {
    recommendations.push('Reduce context data for better focus');
  }

  if (payload.json_schema && payload.json_schema.length > VALIDATION_THRESHOLDS.JSON_SCHEMA_SIZE) {
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
 * Create minimal payload for testing purposes
 * @param query - Test query
 * @param model - Model to use
 * @returns Minimal test payload
 */
export const createTestPayload = (query: string, model: string): Record<string, any> => {
  return {
    user_prompt: query,
    model_name: normalizeModelName(model),
    temperature: 0.5,
  };
};

/**
 * Log payload information for debugging
 * @param payload - Payload to log
 * @param context - Additional context for logging
 */
export const logPayloadInfo = (payload: Record<string, any>, _context: string = ''): void => {
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
