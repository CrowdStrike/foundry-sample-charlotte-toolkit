// src/services/workflow/WorkflowContentExtractor.ts

/**
 * Content extraction utilities for workflow output parsing
 * Handles various workflow output formats and ensures robust content extraction
 */

/**
 * Extract content from workflow output data
 * Tries multiple extraction strategies to handle different workflow output formats
 * @param outputData - Workflow output data from API response
 * @returns Extracted content string
 * @throws Error if no content can be extracted
 */
export const extractWorkflowContent = (outputData: any): string => {
  if (!outputData) {
    throw new Error('No output data received from workflow');
  }

  let content = '';

  // Strategy 1: Charlotte workflow dynamic completion field
  // Pattern: "activity_{UUID}.FaaS.nlpassistantapi.llminvocator_handler.completion"
  const dynamicCompletionField = findDynamicCompletionField(outputData);
  if (dynamicCompletionField) {
    content = outputData[dynamicCompletionField];
  }
  // Strategy 2: Simple Charlotte schema format
  else if (outputData.completion) {
    content = outputData.completion;
  }
  // Strategy 3: Legacy fallback formats
  else {
    content = extractFromLegacyFormats(outputData);
  }

  // Validate extracted content
  if (!content || typeof content !== 'string') {
    logExtractionFailure(outputData);
    throw new Error('Unable to extract content from workflow output');
  }

  // Validate content is not empty
  if (!content.trim()) {
    throw new Error('Workflow completed but produced no content');
  }

  // Always preserve JSON structure for Charlotte AI responses
  const trimmedContent = content.trim();

  // Debug logging disabled for production

  return trimmedContent;
};

/**
 * Find dynamic completion field in Charlotte workflow output
 * @param outputData - Output data to search
 * @returns Field name if found, null otherwise
 */
const findDynamicCompletionField = (outputData: any): string | null => {
  const found = Object.keys(outputData).find(
    (key) =>
      key.includes('.completion') &&
      !key.includes('.meta') && // Exclude metadata fields
      key.includes('llminvocator_handler'),
  );
  if (found === undefined) {
    return null;
  }
  return found;
};

/**
 * Extract content from legacy workflow output formats
 * @param outputData - Output data to extract from
 * @returns Extracted content or empty string
 */
const extractFromLegacyFormats = (outputData: any): string => {
  // Try standard content fields
  if (outputData.content) {
    return outputData.content;
  }

  if (outputData.response) {
    return outputData.response;
  }

  if (outputData.result) {
    return outputData.result;
  }

  if (outputData.output) {
    return outputData.output;
  }

  // Handle string output data directly
  if (typeof outputData === 'string') {
    return outputData;
  }

  // Try generic completion field pattern
  const genericCompletionField = Object.keys(outputData).find(
    (key) => key.endsWith('.completion') && !key.includes('.meta'),
  );

  if (genericCompletionField && typeof outputData[genericCompletionField] === 'string') {
    return outputData[genericCompletionField];
  }

  // Last resort: try to extract from nested structure
  return extractFromNestedStructure(outputData);
};

/**
 * Attempt to extract content from nested object structures
 * @param outputData - Output data with nested structure
 * @returns Extracted content or empty string
 */
const extractFromNestedStructure = (outputData: any): string => {
  const keys = Object.keys(outputData);
  if (keys.length === 0) {
    return '';
  }

  const [firstKey] = keys;
  if (!firstKey) {
    return '';
  }

  const firstValue = outputData[firstKey];

  if (typeof firstValue === 'string') {
    return firstValue;
  }

  if (firstValue && typeof firstValue === 'object') {
    if (firstValue.completion) {
      return firstValue.completion;
    }

    if (firstValue.content) {
      return firstValue.content;
    }
  }

  return '';
};

/**
 * Log detailed information about extraction failure for debugging
 * @param outputData - Output data that failed extraction
 */
const logExtractionFailure = (outputData: any): void => {
  // console.error('=== CONTENT EXTRACTION FAILURE ===');
  // console.error('Unable to extract content from output data:', outputData);
  // console.error('Available fields:', Object.keys(outputData));
  // console.error('Field types:', Object.keys(outputData).map(...));

  // Log potential completion fields for debugging
  const potentialFields = Object.keys(outputData).filter(
    (key) =>
      key.includes('completion') ||
      key.includes('content') ||
      key.includes('response') ||
      key.includes('result'),
  );

  if (potentialFields.length > 0) {
    // console.error('Potential content fields found:', potentialFields);
    potentialFields.forEach((_field) => {
      // console.error(`${field}:`, typeof outputData[field], outputData[field]);
    });
  }
};

/**
 * Analyze workflow output structure for debugging
 * @param outputData - Output data to analyze
 * @returns Analysis summary
 */
export const analyzeWorkflowOutput = (
  outputData: any,
): {
  hasContent: boolean;
  contentFields: string[];
  structure: 'simple' | 'nested' | 'complex';
  recommendedExtraction: string | null;
} => {
  if (!outputData || typeof outputData !== 'object') {
    return {
      hasContent: false,
      contentFields: [],
      structure: 'simple',
      recommendedExtraction: null,
    };
  }

  const keys = Object.keys(outputData);
  const contentFields = keys.filter(
    (key) =>
      key.includes('completion') ||
      key.includes('content') ||
      key.includes('response') ||
      key.includes('result') ||
      key.includes('output'),
  );

  // Determine structure complexity
  let structure: 'simple' | 'nested' | 'complex' = 'simple';
  const hasNestedObjects = keys.some(
    (key) => outputData[key] && typeof outputData[key] === 'object',
  );

  if (hasNestedObjects) {
    structure = keys.length > 3 ? 'complex' : 'nested';
  }

  // Find recommended extraction field
  let recommendedExtraction: string | null = null;

  // Prioritize Charlotte-specific fields
  const dynamicField = findDynamicCompletionField(outputData);
  if (dynamicField) {
    recommendedExtraction = dynamicField;
  } else if (outputData.completion) {
    recommendedExtraction = 'completion';
  } else if (contentFields.length > 0) {
    const [firstField] = contentFields;
    recommendedExtraction = firstField ?? null;
  }

  return {
    hasContent: contentFields.length > 0,
    contentFields,
    structure,
    recommendedExtraction,
  };
};

/**
 * Validate extracted content quality
 * @param content - Extracted content to validate
 * @returns Validation result with quality metrics
 */
export const validateExtractedContent = (
  content: string,
): {
  isValid: boolean;
  isEmpty: boolean;
  wordCount: number;
  hasStructuredData: boolean;
  estimatedFormat: 'json' | 'markdown' | 'html' | 'text';
  warnings: string[];
} => {
  const warnings: string[] = [];

  if (!content || typeof content !== 'string') {
    return {
      isValid: false,
      isEmpty: true,
      wordCount: 0,
      hasStructuredData: false,
      estimatedFormat: 'text',
      warnings: ['Content is not a string or is null/undefined'],
    };
  }

  const trimmedContent = content.trim();
  const isEmpty = trimmedContent.length === 0;
  const wordCount = trimmedContent.split(/\s+/).length;

  // Detect content format
  let estimatedFormat: 'json' | 'markdown' | 'html' | 'text' = 'text';
  let hasStructuredData = false;

  try {
    JSON.parse(trimmedContent);
    estimatedFormat = 'json';
    hasStructuredData = true;
  } catch {
    if (trimmedContent.includes('<') && trimmedContent.includes('>')) {
      estimatedFormat = 'html';
    } else if (trimmedContent.includes('#') || trimmedContent.includes('```')) {
      estimatedFormat = 'markdown';
    }
  }

  // Generate warnings
  if (isEmpty) {
    warnings.push('Content is empty after trimming');
  } else if (wordCount < 5) {
    warnings.push('Content is very short (less than 5 words)');
  } else if (wordCount > 5000) {
    warnings.push('Content is very long (over 5000 words)');
  }

  if (trimmedContent.includes('Error:') || trimmedContent.includes('error:')) {
    warnings.push('Content appears to contain error messages');
  }

  return {
    isValid: !isEmpty,
    isEmpty,
    wordCount,
    hasStructuredData,
    estimatedFormat,
    warnings,
  };
};

/**
 * Extract metadata from workflow output if available
 * @param outputData - Workflow output data
 * @returns Extracted metadata object
 */
export const extractWorkflowMetadata = (outputData: any): Record<string, any> => {
  if (!outputData || typeof outputData !== 'object') {
    return {};
  }

  const metadata: Record<string, any> = {};

  // Look for metadata fields
  Object.keys(outputData).forEach((key) => {
    if (key.includes('.meta') || key.includes('metadata') || key.includes('_meta')) {
      metadata[key] = outputData[key];
    }
  });

  // Extract timing information if available
  if (outputData.execution_time || outputData.processing_time) {
    metadata.timing = {
      execution_time: outputData.execution_time,
      processing_time: outputData.processing_time,
    };
  }

  // Extract model information if available
  if (outputData.model_used || outputData.model_name) {
    metadata.model = {
      model_used: outputData.model_used,
      model_name: outputData.model_name,
    };
  }

  return metadata;
};
