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
// biome-ignore lint/suspicious/noExplicitAny: workflow output has dynamic structure varying by workflow type
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
// biome-ignore lint/suspicious/noExplicitAny: searches dynamic output structure for completion fields
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
// biome-ignore lint/suspicious/noExplicitAny: handles multiple legacy output formats with varying structures
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

  if (
    genericCompletionField &&
    typeof outputData[genericCompletionField] === 'string'
  ) {
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
// biome-ignore lint/suspicious/noExplicitAny: recursively extracts from unknown nested structures
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
// biome-ignore lint/suspicious/noExplicitAny: logs failed extraction attempts for any output structure
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
