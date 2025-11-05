import { describe, expect, it } from 'vitest';
import {
  CACHE_TTL,
  CHARLOTTE_MODEL_OPTIONS,
  DEFAULT_DATA_TO_INCLUDE,
  DEFAULT_JSON_SCHEMA,
  DEFAULT_MODEL,
  DEFAULT_STOP_WORDS,
  DEFAULT_TEMPERATURE,
  getModelLabel,
  MAX_CACHE_SIZE,
  TEMPERATURE_OPTIONS,
} from '../constants';

describe('constants', () => {
  describe('cache configuration', () => {
    it('should have valid CACHE_TTL', () => {
      expect(CACHE_TTL).toBe(5 * 60 * 1000);
      expect(CACHE_TTL).toBe(300000);
    });

    it('should have valid MAX_CACHE_SIZE', () => {
      expect(MAX_CACHE_SIZE).toBe(100);
    });

    it('should have positive cache values', () => {
      expect(CACHE_TTL).toBeGreaterThan(0);
      expect(MAX_CACHE_SIZE).toBeGreaterThan(0);
    });
  });

  describe('CHARLOTTE_MODEL_OPTIONS', () => {
    it('should have valid model options', () => {
      expect(CHARLOTTE_MODEL_OPTIONS).toHaveLength(3);
    });

    it('should have claude-latest model', () => {
      const claudeLatest = CHARLOTTE_MODEL_OPTIONS.find((m) => m.value === 'claude-latest');
      expect(claudeLatest).toBeDefined();
      expect(claudeLatest?.label).toBe('Claude Latest');
    });

    it('should have claude-3-7-sonnet model', () => {
      const claudeSonnet = CHARLOTTE_MODEL_OPTIONS.find((m) => m.value === 'claude-3-7-sonnet');
      expect(claudeSonnet).toBeDefined();
      expect(claudeSonnet?.label).toBe('Claude 3.7 Sonnet');
    });

    it('should have gpt-4o model', () => {
      const gpt4o = CHARLOTTE_MODEL_OPTIONS.find((m) => m.value === 'gpt-4o');
      expect(gpt4o).toBeDefined();
      expect(gpt4o?.label).toBe('GPT-4o');
    });

    it('should have space-safe values', () => {
      CHARLOTTE_MODEL_OPTIONS.forEach((option) => {
        expect(option.value).not.toContain(' ');
      });
    });

    it('should have consistent structure', () => {
      CHARLOTTE_MODEL_OPTIONS.forEach((option) => {
        expect(option).toHaveProperty('value');
        expect(option).toHaveProperty('label');
        expect(typeof option.value).toBe('string');
        expect(typeof option.label).toBe('string');
      });
    });

    it('should have unique values', () => {
      const values = CHARLOTTE_MODEL_OPTIONS.map((o) => o.value);
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBe(values.length);
    });

    it('should have unique labels', () => {
      const labels = CHARLOTTE_MODEL_OPTIONS.map((o) => o.label);
      const uniqueLabels = new Set(labels);
      expect(uniqueLabels.size).toBe(labels.length);
    });
  });

  describe('DEFAULT_MODEL', () => {
    it('should be claude-latest', () => {
      expect(DEFAULT_MODEL).toBe('claude-latest');
    });

    it('should exist in model options', () => {
      const modelExists = CHARLOTTE_MODEL_OPTIONS.some((m) => m.value === DEFAULT_MODEL);
      expect(modelExists).toBe(true);
    });

    it('should not contain spaces', () => {
      expect(DEFAULT_MODEL).not.toContain(' ');
    });
  });

  describe('getModelLabel', () => {
    it('should return label for claude-latest', () => {
      expect(getModelLabel('claude-latest')).toBe('Claude Latest');
    });

    it('should return label for claude-3-7-sonnet', () => {
      expect(getModelLabel('claude-3-7-sonnet')).toBe('Claude 3.7 Sonnet');
    });

    it('should return label for gpt-4o', () => {
      expect(getModelLabel('gpt-4o')).toBe('GPT-4o');
    });

    it('should return original value for unknown model', () => {
      expect(getModelLabel('unknown-model')).toBe('unknown-model');
    });

    it('should return empty string for empty input', () => {
      expect(getModelLabel('')).toBe('');
    });

    it('should handle mixed case', () => {
      expect(getModelLabel('CLAUDE-LATEST')).toBe('CLAUDE-LATEST');
    });

    it('should handle values with spaces', () => {
      expect(getModelLabel('claude latest')).toBe('claude latest');
    });

    it('should be case sensitive', () => {
      expect(getModelLabel('Claude-Latest')).toBe('Claude-Latest');
      expect(getModelLabel('claude-latest')).toBe('Claude Latest');
    });
  });

  describe('TEMPERATURE_OPTIONS', () => {
    it('should have 11 temperature options', () => {
      expect(TEMPERATURE_OPTIONS).toHaveLength(11);
    });

    it('should range from 0 to 1', () => {
      const values = TEMPERATURE_OPTIONS.map((o) => o.value);
      expect(Math.min(...values)).toBe(0);
      expect(Math.max(...values)).toBe(1);
    });

    it('should have 0.1 increments', () => {
      const values = TEMPERATURE_OPTIONS.map((o) => o.value);
      for (let i = 0; i < values.length - 1; i++) {
        const current = values[i];
        const next = values[i + 1];
        if (current !== undefined && next !== undefined) {
          const diff = Math.abs(next - current);
          expect(diff).toBeCloseTo(0.1, 10);
        }
      }
    });

    it('should have descriptive labels for key values', () => {
      expect(TEMPERATURE_OPTIONS.find((o) => o.value === 0)?.label).toContain('Precise');
      expect(TEMPERATURE_OPTIONS.find((o) => o.value === 0.2)?.label).toContain('Focused');
      expect(TEMPERATURE_OPTIONS.find((o) => o.value === 0.4)?.label).toContain('Balanced');
      expect(TEMPERATURE_OPTIONS.find((o) => o.value === 0.6)?.label).toContain('Flexible');
      expect(TEMPERATURE_OPTIONS.find((o) => o.value === 0.8)?.label).toContain('Varied');
      expect(TEMPERATURE_OPTIONS.find((o) => o.value === 1)?.label).toContain('Creative');
    });

    it('should have consistent structure', () => {
      TEMPERATURE_OPTIONS.forEach((option) => {
        expect(option).toHaveProperty('value');
        expect(option).toHaveProperty('label');
        expect(typeof option.value).toBe('number');
        expect(typeof option.label).toBe('string');
      });
    });

    it('should have unique values', () => {
      const values = TEMPERATURE_OPTIONS.map((o) => o.value);
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBe(values.length);
    });

    it('should be sorted in ascending order', () => {
      const values = TEMPERATURE_OPTIONS.map((o) => o.value);
      for (let i = 0; i < values.length - 1; i++) {
        const current = values[i];
        const next = values[i + 1];
        if (current !== undefined && next !== undefined) {
          expect(current).toBeLessThan(next);
        }
      }
    });

    it('should include temperature value in label', () => {
      TEMPERATURE_OPTIONS.forEach((option) => {
        expect(option.label).toContain(option.value.toString());
      });
    });
  });

  describe('DEFAULT_TEMPERATURE', () => {
    it('should be 0.1', () => {
      expect(DEFAULT_TEMPERATURE).toBe(0.1);
    });

    it('should exist in temperature options', () => {
      const exists = TEMPERATURE_OPTIONS.some((o) => o.value === DEFAULT_TEMPERATURE);
      expect(exists).toBe(true);
    });

    it('should be between 0 and 1', () => {
      expect(DEFAULT_TEMPERATURE).toBeGreaterThanOrEqual(0);
      expect(DEFAULT_TEMPERATURE).toBeLessThanOrEqual(1);
    });

    it('should be a low value for precise responses', () => {
      expect(DEFAULT_TEMPERATURE).toBeLessThanOrEqual(0.2);
    });
  });

  describe('DEFAULT_STOP_WORDS', () => {
    it('should be an empty array', () => {
      expect(DEFAULT_STOP_WORDS).toEqual([]);
    });

    it('should be an array', () => {
      expect(Array.isArray(DEFAULT_STOP_WORDS)).toBe(true);
    });

    it('should have length 0', () => {
      expect(DEFAULT_STOP_WORDS).toHaveLength(0);
    });
  });

  describe('DEFAULT_JSON_SCHEMA', () => {
    it('should be an empty string', () => {
      expect(DEFAULT_JSON_SCHEMA).toBe('');
    });

    it('should be a string', () => {
      expect(typeof DEFAULT_JSON_SCHEMA).toBe('string');
    });

    it('should have length 0', () => {
      expect(DEFAULT_JSON_SCHEMA).toHaveLength(0);
    });
  });

  describe('DEFAULT_DATA_TO_INCLUDE', () => {
    it('should be an empty array', () => {
      expect(DEFAULT_DATA_TO_INCLUDE).toEqual([]);
    });

    it('should be an array', () => {
      expect(Array.isArray(DEFAULT_DATA_TO_INCLUDE)).toBe(true);
    });

    it('should have length 0', () => {
      expect(DEFAULT_DATA_TO_INCLUDE).toHaveLength(0);
    });
  });

  describe('constant integrity', () => {
    it('should maintain CHARLOTTE_MODEL_OPTIONS array integrity', () => {
      // Verify the array hasn't been accidentally modified
      expect(CHARLOTTE_MODEL_OPTIONS).toHaveLength(3);
      expect(CHARLOTTE_MODEL_OPTIONS[0]?.value).toBe('claude-latest');
    });

    it('should maintain TEMPERATURE_OPTIONS array integrity', () => {
      // Verify the array hasn't been accidentally modified
      expect(TEMPERATURE_OPTIONS).toHaveLength(11);
      expect(TEMPERATURE_OPTIONS[0]?.value).toBe(0);
    });
  });
});
