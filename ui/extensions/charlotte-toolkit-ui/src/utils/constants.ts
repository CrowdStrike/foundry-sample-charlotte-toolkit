// src/utils/constants.ts

// Cache configuration
export const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
export const MAX_CACHE_SIZE = 100;

// API configuration - Note: Workflow polling now uses WORKFLOW_CONFIG in types.ts

// UI configuration
export const DEBOUNCE_DELAY = 300; // milliseconds
export const MAX_QUERY_LENGTH = 10000; // characters
export const MIN_QUERY_LENGTH = 1; // characters

// Charlotte models with space-safe values and display labels
export const CHARLOTTE_MODEL_OPTIONS = [
  { value: 'claude-latest', label: 'Claude Latest' },
  { value: 'claude-3-7-sonnet', label: 'Claude 3.7 Sonnet' },
  { value: 'gpt-4o', label: 'GPT-4o' },
] as const;

export const DEFAULT_MODEL = 'claude-latest'; // Space-safe default value

// Model mapping utilities

/**
 * Get display label for a model value
 * @param value - The model value (e.g., 'claude-latest')
 * @returns The display label (e.g., 'Claude Latest') or the original value if not found
 */
export const getModelLabel = (value: string): string => {
  const option = CHARLOTTE_MODEL_OPTIONS.find((opt) => opt.value === value);
  return option?.label ?? value;
};

/**
 * Get model value from a display label
 * @param label - The display label (e.g., 'Claude Latest')
 * @returns The model value (e.g., 'claude-latest') or the original label if not found
 */
export const getModelValue = (label: string): string => {
  const option = CHARLOTTE_MODEL_OPTIONS.find((opt) => opt.label === label);
  return option?.value ?? label;
};

// Temperature options with specific descriptions
export const TEMPERATURE_OPTIONS = [
  { value: 0, label: '0.0 - Precise' },
  { value: 0.1, label: '0.1' },
  { value: 0.2, label: '0.2 - Focused' },
  { value: 0.3, label: '0.3' },
  { value: 0.4, label: '0.4 - Balanced' },
  { value: 0.5, label: '0.5' },
  { value: 0.6, label: '0.6 - Flexible' },
  { value: 0.7, label: '0.7' },
  { value: 0.8, label: '0.8 - Varied' },
  { value: 0.9, label: '0.9' },
  { value: 1, label: '1.0 - Creative' },
] as const;

// Charlotte workflow parameter defaults (from schema)
export const DEFAULT_TEMPERATURE = 0.1;
export const DEFAULT_STOP_WORDS: string[] = [];
export const DEFAULT_JSON_SCHEMA = '';
export const DEFAULT_DATA_TO_INCLUDE: string[] = [];

// Charlotte Toolkit specific constants
export const DEFAULT_WORKFLOW_NAME = 'Charlotte Toolkit Chat Completion';

// UI constants for better maintainability
export const LOADING_SPINNER_SIZE = 32; // 8 * 4 (h-8 w-8 in tailwind = 32px)
export const MIN_HEIGHT_SCREEN = '100vh';

// Validation and optimization thresholds (consolidated from contextConstants.ts)
export const VALIDATION_THRESHOLDS = {
  PROMPT_LENGTH: 8000, // characters (was PROMPT_OPTIMIZATION_THRESHOLD)
  CONTEXT_ITEMS: 10, // max context items warning
  STOP_WORDS_MAX: 3, // max stop words warning
  LONG_PROMPT: 5000, // characters
  JSON_SCHEMA_SIZE: 2000, // characters
  PAYLOAD_SIZE_HIGH: 50000, // bytes
  PAYLOAD_SIZE_MEDIUM: 20000, // bytes
} as const;
