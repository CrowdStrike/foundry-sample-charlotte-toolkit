// src/services/workflow/__tests__/WorkflowValidator.test.ts

import {
  validateWorkflowParams,
  validateModelName,
  validateTemperature,
  validateJsonSchema,
  validateWorkflowParamsDetailed,
  type ValidationResult,
} from '../WorkflowValidator';
import type { WorkflowExecutionParams } from '../types';

describe('WorkflowValidator', () => {
  // Test data factory
  const createValidParams = (): WorkflowExecutionParams => ({
    query: 'Test security analysis query',
    model: 'Claude Latest',
    temperature: 0.5,
    stopWords: ['stop'],
    jsonSchema: '{"type":"object","properties":{"result":{"type":"string"}}}',
    dataToInclude: ['context1'],
    selectedContext: 'test context',
    enableCaching: true,
    enablePromptEnhancement: true,
  });

  describe('validateWorkflowParams', () => {
    it('should validate valid parameters successfully', () => {
      const params = createValidParams();
      const result = validateWorkflowParams(params);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    describe('query validation', () => {
      it('should reject empty query', () => {
        const params = createValidParams();
        params.query = '';

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Query is required');
      });

      it('should reject whitespace-only query', () => {
        const params = createValidParams();
        params.query = '   \n\t   ';

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Query is required');
      });

      it('should reject non-string query', () => {
        const params = createValidParams();
        (params.query as any) = 123;

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Query is required');
      });

      it('should reject missing query', () => {
        const params = createValidParams();
        delete (params as any).query;

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Query is required');
      });

      it('should accept valid query with proper content', () => {
        const params = createValidParams();
        params.query = 'Analyze this security incident for IOCs';

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(true);
      });
    });

    describe('model validation', () => {
      it('should reject empty model', () => {
        const params = createValidParams();
        params.model = '';

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Model is required');
      });

      it('should reject non-string model', () => {
        const params = createValidParams();
        (params.model as any) = null;

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Model is required');
      });

      it('should reject missing model', () => {
        const params = createValidParams();
        delete (params as any).model;

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Model is required');
      });

      it('should accept valid model name', () => {
        const params = createValidParams();
        params.model = 'Claude_3.7_Sonnet';

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(true);
      });
    });

    describe('temperature validation', () => {
      it('should reject negative temperature', () => {
        const params = createValidParams();
        params.temperature = -0.1;

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Temperature must be between 0 and 1');
      });

      it('should reject temperature greater than 1', () => {
        const params = createValidParams();
        params.temperature = 1.1;

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Temperature must be between 0 and 1');
      });

      it('should reject non-numeric temperature', () => {
        const params = createValidParams();
        (params.temperature as any) = 'high';

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Temperature must be between 0 and 1');
      });

      it('should accept temperature of 0', () => {
        const params = createValidParams();
        params.temperature = 0;

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(true);
      });

      it('should accept temperature of 1', () => {
        const params = createValidParams();
        params.temperature = 1;

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(true);
      });

      it('should accept valid temperature values', () => {
        const validTemperatures = [0.0, 0.3, 0.5, 0.7, 1.0];

        validTemperatures.forEach(temp => {
          const params = createValidParams();
          params.temperature = temp;

          const result = validateWorkflowParams(params);

          expect(result.isValid).toBe(true);
        });
      });
    });

    describe('stop words validation', () => {
      it('should reject non-array stop words', () => {
        const params = createValidParams();
        (params.stopWords as any) = 'stop';

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Stop words must be an array');
      });

      it('should reject more than 4 stop words', () => {
        const params = createValidParams();
        params.stopWords = ['stop1', 'stop2', 'stop3', 'stop4', 'stop5'];

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Maximum 4 stop words allowed');
      });

      it('should accept empty stop words array', () => {
        const params = createValidParams();
        params.stopWords = [];

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(true);
      });

      it('should accept valid stop words (1-4 items)', () => {
        const validStopWords = [
          ['stop'],
          ['stop1', 'stop2'],
          ['stop1', 'stop2', 'stop3'],
          ['stop1', 'stop2', 'stop3', 'stop4'],
        ];

        validStopWords.forEach(stopWords => {
          const params = createValidParams();
          params.stopWords = stopWords;

          const result = validateWorkflowParams(params);

          expect(result.isValid).toBe(true);
        });
      });

      it('should accept undefined stop words', () => {
        const params = createValidParams();
        delete (params as any).stopWords;

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(true);
      });
    });

    describe('JSON schema validation', () => {
      it('should reject non-string JSON schema', () => {
        const params = createValidParams();
        (params.jsonSchema as any) = { type: 'object' };

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('JSON schema must be a string');
      });

      it('should accept valid JSON schema string', () => {
        const params = createValidParams();
        params.jsonSchema = '{"type":"object","properties":{"analysis":{"type":"string"}}}';

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(true);
      });

      it('should accept empty JSON schema', () => {
        const params = createValidParams();
        params.jsonSchema = '';

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(true);
      });

      it('should accept undefined JSON schema', () => {
        const params = createValidParams();
        delete (params as any).jsonSchema;

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(true);
      });
    });

    describe('data to include validation', () => {
      it('should reject non-array data to include', () => {
        const params = createValidParams();
        (params.dataToInclude as any) = 'context';

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Data to include must be an array');
      });

      it('should accept valid data to include array', () => {
        const params = createValidParams();
        params.dataToInclude = ['context1', 'context2', 'context3'];

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(true);
      });

      it('should accept empty data to include array', () => {
        const params = createValidParams();
        params.dataToInclude = [];

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(true);
      });

      it('should accept undefined data to include', () => {
        const params = createValidParams();
        delete (params as any).dataToInclude;

        const result = validateWorkflowParams(params);

        expect(result.isValid).toBe(true);
      });
    });
  });

  describe('validateModelName', () => {
    it('should accept supported model names', () => {
      const supportedModels = [
        'Claude Latest',
        'Claude_Latest',
        'Claude 3.7 Sonnet',
        'Claude_3.7_Sonnet',
        'GPT-4o',
      ];

      supportedModels.forEach(model => {
        const result = validateModelName(model);

        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    it('should reject unsupported model names', () => {
      const unsupportedModels = [
        'GPT-3',
        'Claude 2',
        'Llama-2',
        'Unknown Model',
        '',
      ];

      unsupportedModels.forEach(model => {
        const result = validateModelName(model);

        expect(result.isValid).toBe(false);
        expect(result.error).toContain('Unsupported model');
        expect(result.error).toContain(model);
      });
    });

    it('should provide list of supported models in error message', () => {
      const result = validateModelName('Invalid Model');

      expect(result.error).toContain('Claude Latest');
      expect(result.error).toContain('GPT-4o');
    });
  });

  describe('validateTemperature', () => {
    it('should accept valid temperature values', () => {
      const validTemperatures = [0, 0.1, 0.5, 0.7, 0.9, 1.0];

      validTemperatures.forEach(temp => {
        const result = validateTemperature(temp);

        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    it('should reject non-numeric temperature', () => {
      const invalidTemperatures = ['high', null, undefined, {}, []];

      invalidTemperatures.forEach(temp => {
        const result = validateTemperature(temp as any);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Temperature must be a number');
      });
    });

    it('should reject temperature below 0', () => {
      const invalidTemperatures = [-0.1, -1, -100];

      invalidTemperatures.forEach(temp => {
        const result = validateTemperature(temp);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Temperature must be between 0 and 1');
      });
    });

    it('should reject temperature above 1', () => {
      const invalidTemperatures = [1.1, 2, 100];

      invalidTemperatures.forEach(temp => {
        const result = validateTemperature(temp);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Temperature must be between 0 and 1');
      });
    });
  });

  describe('validateJsonSchema', () => {
    it('should accept valid JSON schemas', () => {
      const validSchemas = [
        '{"type":"object"}',
        '{"type":"string"}',
        '{"type":"object","properties":{"name":{"type":"string"}}}',
        '{"type":"array","items":{"type":"string"}}',
      ];

      validSchemas.forEach(schema => {
        const result = validateJsonSchema(schema);

        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    it('should accept empty schema', () => {
      const result = validateJsonSchema('');

      expect(result.isValid).toBe(true);
    });

    it('should accept whitespace-only schema', () => {
      const result = validateJsonSchema('   \n\t   ');

      expect(result.isValid).toBe(true);
    });

    it('should reject invalid JSON', () => {
      const invalidSchemas = [
        '{"type":}',
        '{invalid json}',
        'not json at all',
        '{"type":"object",}', // trailing comma
      ];

      invalidSchemas.forEach(schema => {
        const result = validateJsonSchema(schema);

        expect(result.isValid).toBe(false);
        expect(result.error).toContain('Invalid JSON schema format');
      });
    });

    it('should reject non-object schemas', () => {
      const nonObjectSchemas = [
        '"string"',
        '123',
        'true',
        'null',
      ];

      nonObjectSchemas.forEach(schema => {
        const result = validateJsonSchema(schema);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('JSON schema must be an object');
      });
    });

    it('should reject arrays without type property', () => {
      const result = validateJsonSchema('[]');

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('JSON schema must have a "type" property');
    });

    it('should require type property', () => {
      const schemasWithoutType = [
        '{}',
        '{"properties":{"name":{"type":"string"}}}',
        '{"description":"A schema without type"}',
      ];

      schemasWithoutType.forEach(schema => {
        const result = validateJsonSchema(schema);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('JSON schema must have a "type" property');
      });
    });
  });

  describe('validateWorkflowParamsDetailed', () => {
    it('should validate valid parameters without warnings', () => {
      const params = createValidParams();
      params.query = 'This is a good query with sufficient length for analysis';
      params.stopWords = ['stop'];
      params.dataToInclude = ['context1', 'context2'];

      const result = validateWorkflowParamsDetailed(params);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
      expect(result.warnings).toBeUndefined();
    });

    it('should return error for invalid basic parameters', () => {
      const params = createValidParams();
      params.query = '';

      const result = validateWorkflowParamsDetailed(params);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is required');
    });

    it('should return error for unsupported model', () => {
      const params = createValidParams();
      params.model = 'Unsupported Model';

      const result = validateWorkflowParamsDetailed(params);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Unsupported model');
    });

    it('should return error for invalid temperature', () => {
      const params = createValidParams();
      params.temperature = 2.0;

      const result = validateWorkflowParamsDetailed(params);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Temperature must be between 0 and 1');
    });

    it('should return error for invalid JSON schema', () => {
      const params = createValidParams();
      params.jsonSchema = '{invalid json}';

      const result = validateWorkflowParamsDetailed(params);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid JSON schema format');
    });

    describe('warnings generation', () => {
      it('should warn about very short queries', () => {
        const params = createValidParams();
        params.query = 'short';

        const result = validateWorkflowParamsDetailed(params);

        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Query is very short - consider providing more context for better results');
      });

      it('should warn about very long queries', () => {
        const params = createValidParams();
        params.query = 'a'.repeat(4500); // > 4000 characters

        const result = validateWorkflowParamsDetailed(params);

        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Query is very long - consider breaking it into smaller, focused requests');
      });

      it('should warn about many stop words', () => {
        const params = createValidParams();
        params.stopWords = ['stop1', 'stop2', 'stop3'];

        const result = validateWorkflowParamsDetailed(params);

        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Many stop words may overly constrain the response');
      });

      it('should warn about large amount of context data', () => {
        const params = createValidParams();
        params.dataToInclude = ['ctx1', 'ctx2', 'ctx3', 'ctx4', 'ctx5', 'ctx6'];

        const result = validateWorkflowParamsDetailed(params);

        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Large amount of context data may affect response focus');
      });

      it('should combine multiple warnings', () => {
        const params = createValidParams();
        params.query = 'short';
        params.stopWords = ['stop1', 'stop2', 'stop3'];
        params.dataToInclude = ['ctx1', 'ctx2', 'ctx3', 'ctx4', 'ctx5', 'ctx6'];

        const result = validateWorkflowParamsDetailed(params);

        expect(result.isValid).toBe(true);
        expect(result.warnings).toHaveLength(3);
        expect(result.warnings).toContain('Query is very short - consider providing more context for better results');
        expect(result.warnings).toContain('Many stop words may overly constrain the response');
        expect(result.warnings).toContain('Large amount of context data may affect response focus');
      });
    });

    it('should validate with no JSON schema', () => {
      const params = createValidParams();
      delete (params as any).jsonSchema;

      const result = validateWorkflowParamsDetailed(params);

      expect(result.isValid).toBe(true);
    });

    it('should validate with empty JSON schema', () => {
      const params = createValidParams();
      params.jsonSchema = '';

      const result = validateWorkflowParamsDetailed(params);

      expect(result.isValid).toBe(true);
    });
  });

  describe('edge cases and boundary conditions', () => {
    it('should handle null parameters gracefully', () => {
      expect(() => validateWorkflowParams(null as any)).toThrow();
    });

    it('should handle undefined parameters gracefully', () => {
      expect(() => validateWorkflowParams(undefined as any)).toThrow();
    });

    it('should handle parameters with extra properties', () => {
      const params = {
        ...createValidParams(),
        extraProperty: 'should be ignored',
      };

      const result = validateWorkflowParams(params);

      expect(result.isValid).toBe(true);
    });

    it('should validate minimal valid parameters', () => {
      const minimalParams: WorkflowExecutionParams = {
        query: 'test query',
        model: 'Claude Latest',
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

    it('should handle extreme temperature values at boundaries', () => {
      const params1 = createValidParams();
      params1.temperature = Number.MIN_VALUE;
      expect(validateWorkflowParams(params1).isValid).toBe(true);

      const params2 = createValidParams();
      params2.temperature = 1 - Number.EPSILON;
      expect(validateWorkflowParams(params2).isValid).toBe(true);
    });
  });
});
