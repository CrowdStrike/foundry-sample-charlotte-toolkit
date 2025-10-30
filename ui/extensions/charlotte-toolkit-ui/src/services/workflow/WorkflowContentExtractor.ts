// src/services/workflow/WorkflowContentExtractor.ts

/**
 * Content extraction utilities for workflow output parsing
 * Handles various workflow output formats and ensures robust content extraction
 */

// Export only the functions used by WorkflowExecutor
export { extractWorkflowContent, validateExtractedContent };

/**
 * Extract content from workflow output data
 * Tries multiple extraction strategies to handle different workflow output formats
 * @param outputData - Workflow output data from API response
 * @returns Extracted content string
 * @throws Error if no content can be extracted
 */
const extractWorkflowContent = (outputData: Record<string, unknown> | undefined): string => {
  if (!outputData) {
    throw new Error('No output data received from workflow');
  }

  let content = '';

  // Strategy 1: Charlotte workflow dynamic completion field
  // Pattern: "activity_{UUID}.FaaS.nlpassistantapi.llminvocator_handler.completion"
  const dynamicCompletionField = findDynamicCompletionField(outputData);
  if (dynamicCompletionField && typeof outputData[dynamicCompletionField] === 'string') {
    content = outputData[dynamicCompletionField] as string;
  }
  // Strategy 2: Simple Charlotte schema format
  else if ('completion' in outputData && typeof outputData.completion === 'string') {
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
const findDynamicCompletionField = (outputData: Record<string, unknown>): string | null => {
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
const extractFromLegacyFormats = (outputData: Record<string, unknown>): string => {
  // Try standard content fields
  if ('content' in outputData && typeof outputData.content === 'string') {
    return outputData.content;
  }

  if ('response' in outputData && typeof outputData.response === 'string') {
    return outputData.response;
  }

  if ('result' in outputData && typeof outputData.result === 'string') {
    return outputData.result;
  }

  if ('output' in outputData && typeof outputData.output === 'string') {
    return outputData.output;
  }

  // Handle string output data directly (should not happen with Record type, but kept for safety)
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
const extractFromNestedStructure = (outputData: Record<string, unknown>): string => {
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
    const objValue = firstValue as Record<string, unknown>;
    if ('completion' in objValue && typeof objValue.completion === 'string') {
      return objValue.completion;
    }

    if ('content' in objValue && typeof objValue.content === 'string') {
      return objValue.content;
    }
  }

  return '';
};

/**
 * Log detailed information about extraction failure for debugging
 * @param outputData - Output data that failed extraction
 */
const logExtractionFailure = (outputData: Record<string, unknown>): void => {
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
const validateExtractedContent = (
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
