import { describe, expect, it } from 'vitest';
import type { WorkflowExecutionParams } from '../types';
import { validateWorkflowParams } from '../WorkflowValidator';

describe('WorkflowValidator', () => {
  const validParams: WorkflowExecutionParams = {
    query: 'Test query',
    model: 'gpt-4',
    temperature: 0.7,
    stopWords: ['stop'],
    jsonSchema: '{}',
    dataToInclude: ['detection'],
    selectedContext: 'all',
    enableCaching: true,
  };

  describe('valid parameters', () => {
    it('should validate correct parameters', () => {
      const result = validateWorkflowParams(validParams);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should validate with minimal parameters', () => {
      const minimalParams: WorkflowExecutionParams = {
        query: 'Test',
        model: 'gpt-4',
        temperature: 0.5,
        stopWords: [],
        jsonSchema: '',
        dataToInclude: [],
        selectedContext: '',
        enableCaching: false,
      };

      const result = validateWorkflowParams(minimalParams);
      expect(result.isValid).toBe(true);
    });

    it('should validate with temperature at boundaries', () => {
      expect(validateWorkflowParams({ ...validParams, temperature: 0 }).isValid).toBe(true);
      expect(validateWorkflowParams({ ...validParams, temperature: 1 }).isValid).toBe(true);
      expect(validateWorkflowParams({ ...validParams, temperature: 0.5 }).isValid).toBe(true);
    });
  });

  describe('query validation', () => {
    it('should reject empty query', () => {
      const result = validateWorkflowParams({ ...validParams, query: '' });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is required');
    });

    it('should reject whitespace-only query', () => {
      const result = validateWorkflowParams({ ...validParams, query: '   ' });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is required');
    });

    it('should reject non-string query', () => {
      const result = validateWorkflowParams({ ...validParams, query: 123 as unknown as string });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is required');
    });

    it('should reject undefined query', () => {
      const result = validateWorkflowParams({
        ...validParams,
        query: undefined as unknown as string,
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is required');
    });
  });

  describe('model validation', () => {
    it('should reject empty model', () => {
      const result = validateWorkflowParams({ ...validParams, model: '' });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Model is required');
    });

    it('should reject non-string model', () => {
      const result = validateWorkflowParams({ ...validParams, model: 123 as unknown as string });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Model is required');
    });

    it('should reject undefined model', () => {
      const result = validateWorkflowParams({
        ...validParams,
        model: undefined as unknown as string,
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Model is required');
    });
  });

  describe('temperature validation', () => {
    it('should reject negative temperature', () => {
      const result = validateWorkflowParams({ ...validParams, temperature: -0.1 });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Temperature must be between 0 and 1');
    });

    it('should reject temperature above 1', () => {
      const result = validateWorkflowParams({ ...validParams, temperature: 1.1 });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Temperature must be between 0 and 1');
    });

    it('should reject non-number temperature', () => {
      const result = validateWorkflowParams({
        ...validParams,
        temperature: '0.5' as unknown as number,
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Temperature must be between 0 and 1');
    });

    it('should reject undefined temperature', () => {
      const result = validateWorkflowParams({
        ...validParams,
        temperature: undefined as unknown as number,
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Temperature must be between 0 and 1');
    });
  });

  describe('stopWords validation', () => {
    it('should accept empty array', () => {
      const result = validateWorkflowParams({ ...validParams, stopWords: [] });
      expect(result.isValid).toBe(true);
    });

    it('should accept up to 4 stop words', () => {
      const result = validateWorkflowParams({
        ...validParams,
        stopWords: ['one', 'two', 'three', 'four'],
      });
      expect(result.isValid).toBe(true);
    });

    it('should reject more than 4 stop words', () => {
      const result = validateWorkflowParams({
        ...validParams,
        stopWords: ['one', 'two', 'three', 'four', 'five'],
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Maximum 4 stop words allowed');
    });

    it('should reject non-array stopWords', () => {
      const result = validateWorkflowParams({
        ...validParams,
        stopWords: 'invalid' as unknown as string[],
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Stop words must be an array');
    });
  });

  describe('jsonSchema validation', () => {
    it('should accept valid JSON schema string', () => {
      const result = validateWorkflowParams({ ...validParams, jsonSchema: '{"type": "object"}' });
      expect(result.isValid).toBe(true);
    });

    it('should accept empty JSON schema', () => {
      const result = validateWorkflowParams({ ...validParams, jsonSchema: '' });
      expect(result.isValid).toBe(true);
    });

    it('should reject non-string JSON schema', () => {
      const result = validateWorkflowParams({
        ...validParams,
        jsonSchema: { invalid: true } as unknown as string,
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('JSON schema must be a string');
    });
  });

  describe('dataToInclude validation', () => {
    it('should accept valid array', () => {
      const result = validateWorkflowParams({
        ...validParams,
        dataToInclude: ['detection', 'incident'],
      });
      expect(result.isValid).toBe(true);
    });

    it('should accept empty array', () => {
      const result = validateWorkflowParams({ ...validParams, dataToInclude: [] });
      expect(result.isValid).toBe(true);
    });

    it('should reject non-array dataToInclude', () => {
      const result = validateWorkflowParams({
        ...validParams,
        dataToInclude: 'invalid' as unknown as string[],
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Data to include must be an array');
    });
  });
});
