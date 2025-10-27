// src/utils/constants.ts

// Cache configuration
export const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
export const MAX_CACHE_SIZE = 100;

// API configuration - Note: Workflow polling now uses WORKFLOW_CONFIG in types.ts

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
