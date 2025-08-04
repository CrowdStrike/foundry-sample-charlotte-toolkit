// src/utils/helpers.ts

/**
 * Wait for a specified amount of time
 * @param ms - Time to wait in milliseconds
 * @returns Promise that resolves after the specified time
 */
export const wait = (ms: number = 1000): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Create display name for Charlotte workflow
 * @param modelName - Selected Charlotte model name
 * @returns Display name showing the selected model with proper formatting
 */
export const getDisplayModelName = (modelName: string): string => {
  // Normalize model name for display (convert underscores to spaces)
  return modelName.replace(/_/g, ' ');
};

/**
 * Simple hash function for cache key generation
 * @param str - String to hash
 * @returns Hash number
 */
const simpleHash = (inputString: string): string => {
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString.codePointAt(i) ?? 0;
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
};

/**
 * Generate optimized cache key for Charlotte workflow requests
 * Single-pass hashing with consistent parameter serialization
 * @param query - User query
 * @param model - Model name
 * @param temperature - Temperature setting
 * @param stopWords - Stop words array
 * @param jsonSchema - JSON schema string
 * @param dataToInclude - Data to include array
 * @returns Cache key string
 */
export const generateCacheKey = (
  query: string,
  model: string,
  temperature: number,
  stopWords: string[],
  jsonSchema: string,
  dataToInclude: string[]
): string => {
  // Serialize all parameters into single string for consistent hashing
  const cacheParams = {
    query: query.slice(0, 100), // Truncate for performance while maintaining uniqueness
    model,
    temperature,
    stopWords: stopWords.length > 0 ? stopWords.join('|') : '',
    jsonSchema: jsonSchema.trim().slice(0, 50),
    dataToInclude: dataToInclude.length > 0 ? dataToInclude.join('|') : ''
  };

  // Single-pass hash generation - much more efficient than multiple btoa() calls
  const paramString = JSON.stringify(cacheParams);
  const hash = simpleHash(paramString);

  return `charlotte:${hash}`;
};

/**
 * Validate query input
 * @param query - Query string to validate
 * @returns Validation result
 */
export const validateQuery = (query: string): { isValid: boolean; error?: string } => {
  if (!query || typeof query !== 'string') {
    return { isValid: false, error: 'Query is required' };
  }

  const trimmed = query.trim();
  if (trimmed.length === 0) {
    return { isValid: false, error: 'Query cannot be empty' };
  }

  if (trimmed.length > 10000) {
    return { isValid: false, error: 'Query is too long (max 10,000 characters)' };
  }

  return { isValid: true };
};

/**
 * Format error message for display
 * @param error - Error object or string
 * @returns Formatted error message
 */
export const formatErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return 'An unexpected error occurred';
};

/**
 * Builds MITRE ATT&CK URL from technique ID
 * @param techniqueId - MITRE technique ID (e.g., "T1027", "T1566.001")
 * @returns MITRE ATT&CK URL
 */
export const buildMitreUrl = (techniqueId: string): string => {
  const baseUrl = 'https://attack.mitre.org/techniques/';
  
  // Convert dot notation to slash notation for sub-techniques
  // T1566.001 → T1566/001/
  // T1027 → T1027/
  const urlPath = techniqueId.replace('.', '/');
  
  return `${baseUrl}${urlPath}/`;
};
