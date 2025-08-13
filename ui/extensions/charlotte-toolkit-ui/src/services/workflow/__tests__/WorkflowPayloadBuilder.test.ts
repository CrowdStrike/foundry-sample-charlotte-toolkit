// src/services/workflow/__tests__/WorkflowPayloadBuilder.test.ts

import {
  buildWorkflowPayload,
  normalizeModelName,
  validatePayload,
  createOptimizedPayload,
  analyzePayloadSize,
  createTestPayload,
  logPayloadInfo,
} from '../WorkflowPayloadBuilder';
import type { WorkflowExecutionParams } from '../types';

// Mock external dependencies
jest.mock('../../../utils/promptEngineer', () => ({
  createSecurityResponseSchema: jest.fn(),
  detectUseCase: jest.fn(),
}));

jest.mock('../../../utils/constants', () => ({
  getModelLabel: jest.fn(),
  VALIDATION_THRESHOLDS: {
    PROMPT_LENGTH: 8000,
    STOP_WORDS_MAX: 3,
    CONTEXT_ITEMS: 10,
    PAYLOAD_SIZE_HIGH: 50000,
    PAYLOAD_SIZE_MEDIUM: 20000,
    LONG_PROMPT: 5000,
    JSON_SCHEMA_SIZE: 2000,
  },
}));

import { createSecurityResponseSchema, detectUseCase } from '../../../utils/promptEngineer';
import { getModelLabel } from '../../../utils/constants';

const mockCreateSecurityResponseSchema = createSecurityResponseSchema as jest.MockedFunction<typeof createSecurityResponseSchema>;
const mockDetectUseCase = detectUseCase as jest.MockedFunction<typeof detectUseCase>;
const mockGetModelLabel = getModelLabel as jest.MockedFunction<typeof getModelLabel>;

describe('WorkflowPayloadBuilder', () => {
  // Test data factory
  const createValidParams = (): WorkflowExecutionParams => ({
    query: 'Analyze this security incident',
    model: 'Claude Latest',
    temperature: 0.5,
    stopWords: ['stop'],
    jsonSchema: '{"type":"object","properties":{"result":{"type":"string"}}}',
    dataToInclude: ['context1'],
    selectedContext: 'test context',
    enableCaching: true,
    enablePromptEnhancement: true,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetModelLabel.mockReturnValue('Claude Latest');
    mockDetectUseCase.mockReturnValue('general_security');
    mockCreateSecurityResponseSchema.mockReturnValue('{"type":"object","properties":{"analysis":{"type":"string"}}}');
  });

  describe('buildWorkflowPayload', () => {
    it('should build basic payload successfully', () => {
      const params = createValidParams();
      
      const result = buildWorkflowPayload(params);

      expect(result).toEqual({
        user_prompt: 'Analyze this security incident',
        model_name: 'Claude Latest',
        temperature: 0.5,
        stop_words: ['stop'],
        json_schema: '{"type":"object","properties":{"result":{"type":"string"}}}',
        data_to_include: ['context1', 'test context'],
      });
      expect(mockGetModelLabel).toHaveBeenCalledWith('Claude Latest');
    });

    it('should handle prompt enhancement enabled', () => {
      const params = createValidParams();
      params.enablePromptEnhancement = true;
      params.jsonSchema = '';

      const result = buildWorkflowPayload(params);

      expect(result.user_prompt).toBe('Analyze this security incident');
      expect(result.json_schema).toBe('{"type":"object","properties":{"analysis":{"type":"string"}}}');
      expect(mockDetectUseCase).toHaveBeenCalledWith('Analyze this security incident');
      expect(mockCreateSecurityResponseSchema).toHaveBeenCalledWith('general_security');
      expect(mockCreateSecurityResponseSchema).toHaveBeenCalledWith('general_security');
    });

    it('should handle prompt enhancement disabled', () => {
      const params = createValidParams();
      params.enablePromptEnhancement = false;

      const result = buildWorkflowPayload(params);

      expect(result.user_prompt).toBe('Analyze this security incident');
      expect(mockDetectUseCase).not.toHaveBeenCalled();
      expect(mockCreateSecurityResponseSchema).not.toHaveBeenCalled();
    });

    it('should handle prompt enhancement undefined (defaults to enabled)', () => {
      const params = createValidParams();
      delete (params as any).enablePromptEnhancement;
      params.jsonSchema = '';

      const result = buildWorkflowPayload(params);

      expect(result.json_schema).toBe('{"type":"object","properties":{"analysis":{"type":"string"}}}');
      expect(mockDetectUseCase).toHaveBeenCalled();
      expect(mockCreateSecurityResponseSchema).toHaveBeenCalled();
    });

    it('should not override existing JSON schema when enhancement enabled', () => {
      const params = createValidParams();
      params.enablePromptEnhancement = true;
      params.jsonSchema = '{"type":"object","properties":{"custom":{"type":"string"}}}';

      const result = buildWorkflowPayload(params);

      expect(result.json_schema).toBe('{"type":"object","properties":{"custom":{"type":"string"}}}');
      expect(mockCreateSecurityResponseSchema).not.toHaveBeenCalled();
    });

    it('should handle empty stop words', () => {
      const params = createValidParams();
      params.stopWords = [];

      const result = buildWorkflowPayload(params);

      expect(result.stop_words).toBeUndefined();
    });

    it('should handle undefined stop words', () => {
      const params = createValidParams();
      delete (params as any).stopWords;

      const result = buildWorkflowPayload(params);

      expect(result.stop_words).toBeUndefined();
    });

    it('should handle empty JSON schema', () => {
      const params = createValidParams();
      params.jsonSchema = '';
      params.enablePromptEnhancement = false;

      const result = buildWorkflowPayload(params);

      expect(result.json_schema).toBeUndefined();
    });

    it('should handle whitespace-only JSON schema', () => {
      const params = createValidParams();
      params.jsonSchema = '   \n\t   ';
      params.enablePromptEnhancement = false;

      const result = buildWorkflowPayload(params);

      expect(result.json_schema).toBeUndefined();
    });

    it('should handle empty data to include', () => {
      const params = createValidParams();
      params.dataToInclude = [];
      params.selectedContext = '';

      const result = buildWorkflowPayload(params);

      expect(result.data_to_include).toBeUndefined();
    });

    it('should handle undefined data to include', () => {
      const params = createValidParams();
      delete (params as any).dataToInclude;
      params.selectedContext = '';

      const result = buildWorkflowPayload(params);

      expect(result.data_to_include).toBeUndefined();
    });

    it('should combine dataToInclude and selectedContext', () => {
      const params = createValidParams();
      params.dataToInclude = ['context1', 'context2'];
      params.selectedContext = 'additional context';

      const result = buildWorkflowPayload(params);

      expect(result.data_to_include).toEqual(['context1', 'context2', 'additional context']);
    });

    it('should handle only selectedContext when dataToInclude is empty', () => {
      const params = createValidParams();
      params.dataToInclude = [];
      params.selectedContext = 'only context';

      const result = buildWorkflowPayload(params);

      expect(result.data_to_include).toEqual(['only context']);
    });

    it('should handle empty selectedContext', () => {
      const params = createValidParams();
      params.dataToInclude = ['context1'];
      params.selectedContext = '';

      const result = buildWorkflowPayload(params);

      expect(result.data_to_include).toEqual(['context1']);
    });

    it('should handle whitespace-only selectedContext', () => {
      const params = createValidParams();
      params.dataToInclude = ['context1'];
      params.selectedContext = '   \n\t   ';

      const result = buildWorkflowPayload(params);

      expect(result.data_to_include).toEqual(['context1']);
    });
  });

  describe('normalizeModelName', () => {
    it('should normalize model names correctly', () => {
      mockGetModelLabel.mockReturnValue('Claude 3.7 Sonnet');
      
      const result = normalizeModelName('Claude_3.7_Sonnet');

      expect(result).toBe('Claude 3.7 Sonnet');
      expect(mockGetModelLabel).toHaveBeenCalledWith('Claude_3.7_Sonnet');
    });

    it('should handle various model name formats', () => {
      const testCases = [
        { input: 'Claude Latest', expected: 'Claude Latest' },
        { input: 'Claude_Latest', expected: 'Claude Latest' },
        { input: 'GPT-4o', expected: 'GPT-4o' },
      ];

      testCases.forEach(({ input, expected }) => {
        mockGetModelLabel.mockReturnValue(expected);
        
        const result = normalizeModelName(input);

        expect(result).toBe(expected);
        expect(mockGetModelLabel).toHaveBeenCalledWith(input);
      });
    });
  });

  describe('validatePayload', () => {
    const createValidPayload = () => ({
      user_prompt: 'Test prompt',
      model_name: 'Claude Latest',
      temperature: 0.5,
    });

    it('should validate valid payload successfully', () => {
      const payload = createValidPayload();
      
      const result = validatePayload(payload);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
      expect(result.warnings).toBeUndefined();
    });

    describe('required field validation', () => {
      it('should reject missing user_prompt', () => {
        const payload = createValidPayload();
        delete payload.user_prompt;

        const result = validatePayload(payload);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('user_prompt is required and must be a string');
      });

      it('should reject non-string user_prompt', () => {
        const payload = createValidPayload();
        (payload as any).user_prompt = 123;

        const result = validatePayload(payload);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('user_prompt is required and must be a string');
      });

      it('should reject missing model_name', () => {
        const payload = createValidPayload();
        delete payload.model_name;

        const result = validatePayload(payload);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('model_name is required and must be a string');
      });

      it('should reject non-string model_name', () => {
        const payload = createValidPayload();
        (payload as any).model_name = null;

        const result = validatePayload(payload);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('model_name is required and must be a string');
      });

      it('should reject missing temperature', () => {
        const payload = createValidPayload();
        delete payload.temperature;

        const result = validatePayload(payload);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('temperature is required and must be a number');
      });

      it('should reject non-numeric temperature', () => {
        const payload = createValidPayload();
        (payload as any).temperature = 'high';

        const result = validatePayload(payload);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('temperature is required and must be a number');
      });
    });

    describe('optional field validation', () => {
      it('should reject non-array stop_words', () => {
        const payload = {
          ...createValidPayload(),
          stop_words: 'stop',
        };

        const result = validatePayload(payload);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('stop_words must be an array if provided');
      });

      it('should accept valid stop_words array', () => {
        const payload = {
          ...createValidPayload(),
          stop_words: ['stop1', 'stop2'],
        };

        const result = validatePayload(payload);

        expect(result.isValid).toBe(true);
      });

      it('should reject non-string json_schema', () => {
        const payload = {
          ...createValidPayload(),
          json_schema: { type: 'object' },
        };

        const result = validatePayload(payload);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('json_schema must be a string if provided');
      });

      it('should accept valid json_schema string', () => {
        const payload = {
          ...createValidPayload(),
          json_schema: '{"type":"object"}',
        };

        const result = validatePayload(payload);

        expect(result.isValid).toBe(true);
      });

      it('should reject non-array data_to_include', () => {
        const payload = {
          ...createValidPayload(),
          data_to_include: 'context',
        };

        const result = validatePayload(payload);

        expect(result.isValid).toBe(false);
        expect(result.error).toBe('data_to_include must be an array if provided');
      });

      it('should accept valid data_to_include array', () => {
        const payload = {
          ...createValidPayload(),
          data_to_include: ['context1', 'context2'],
        };

        const result = validatePayload(payload);

        expect(result.isValid).toBe(true);
      });
    });

    describe('warnings generation', () => {
      it('should warn about very long prompts', () => {
        const payload = {
          ...createValidPayload(),
          user_prompt: 'a'.repeat(8500), // > PROMPT_LENGTH threshold
        };

        const result = validatePayload(payload);

        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Prompt is very long - consider shortening for optimal performance');
      });

      it('should warn about many stop words', () => {
        const payload = {
          ...createValidPayload(),
          stop_words: ['stop1', 'stop2', 'stop3', 'stop4'], // > STOP_WORDS_MAX
        };

        const result = validatePayload(payload);

        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Many stop words may constrain response creativity');
      });

      it('should warn about large amount of context data', () => {
        const payload = {
          ...createValidPayload(),
          data_to_include: ['ctx1', 'ctx2', 'ctx3', 'ctx4', 'ctx5', 'ctx6', 'ctx7', 'ctx8', 'ctx9', 'ctx10', 'ctx11'], // > CONTEXT_ITEMS
        };

        const result = validatePayload(payload);

        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Large amount of context data may affect response focus');
      });

      it('should combine multiple warnings', () => {
        const payload = {
          ...createValidPayload(),
          user_prompt: 'a'.repeat(8500), // > PROMPT_LENGTH (8000)
          stop_words: ['stop1', 'stop2', 'stop3', 'stop4'], // > STOP_WORDS_MAX (3)
          data_to_include: ['ctx1', 'ctx2', 'ctx3', 'ctx4', 'ctx5', 'ctx6', 'ctx7', 'ctx8', 'ctx9', 'ctx10', 'ctx11'], // > CONTEXT_ITEMS (10)
        };

        const result = validatePayload(payload);

        expect(result.isValid).toBe(true);
        expect(result.warnings).toHaveLength(3);
        expect(result.warnings).toContain('Prompt is very long - consider shortening for optimal performance');
        expect(result.warnings).toContain('Many stop words may constrain response creativity');
        expect(result.warnings).toContain('Large amount of context data may affect response focus');
      });
    });
  });

  describe('createOptimizedPayload', () => {
    it('should create security analysis optimized payload', () => {
      const params = createValidParams();
      
      const result = createOptimizedPayload(params, 'security_analysis');

      expect(result.temperature).toBe(0.3);
      expect(result._useCase).toBe('security_analysis');
      expect(result._optimization).toBe('Security Analysis Optimized');
    });

    it('should create threat hunting optimized payload', () => {
      const params = createValidParams();
      
      const result = createOptimizedPayload(params, 'threat_hunting');

      expect(result.temperature).toBe(0.5);
      expect(result._useCase).toBe('threat_hunting');
      expect(result._optimization).toBe('Threat Hunting Optimized');
    });

    it('should create incident response optimized payload', () => {
      const params = createValidParams();
      
      const result = createOptimizedPayload(params, 'incident_response');

      expect(result.temperature).toBe(0.2);
      expect(result._useCase).toBe('incident_response');
      expect(result._optimization).toBe('Incident Response Optimized');
    });

    it('should create general purpose optimized payload', () => {
      const params = createValidParams();
      
      const result = createOptimizedPayload(params, 'general');

      expect(result.temperature).toBe(0.5); // Original temperature preserved
      expect(result._useCase).toBe('general');
      expect(result._optimization).toBe('General Purpose');
    });

    it('should default to general purpose for unknown use case', () => {
      const params = createValidParams();
      
      const result = createOptimizedPayload(params, 'unknown' as any);

      expect(result._useCase).toBe('unknown');
      expect(result._optimization).toBe('General Purpose');
    });

    it('should enable prompt enhancement for all optimized payloads', () => {
      const params = createValidParams();
      params.enablePromptEnhancement = false;
      params.jsonSchema = '';
      
      createOptimizedPayload(params, 'security_analysis');

      expect(mockDetectUseCase).toHaveBeenCalled();
      expect(mockCreateSecurityResponseSchema).toHaveBeenCalled();
    });
  });

  describe('analyzePayloadSize', () => {
    it('should analyze small payload correctly', () => {
      const payload = {
        user_prompt: 'Short prompt',
        model_name: 'Claude Latest',
        temperature: 0.5,
      };

      const result = analyzePayloadSize(payload);

      expect(result.complexity).toBe('low');
      expect(result.estimatedBytes).toBeGreaterThan(0);
      expect(result.characterCount).toBeGreaterThan(0);
      expect(result.recommendations).toHaveLength(0);
    });

    it('should analyze medium complexity payload', () => {
      const payload = {
        user_prompt: 'a'.repeat(25000), // Large prompt to trigger medium complexity
        model_name: 'Claude Latest',
        temperature: 0.5,
      };

      const result = analyzePayloadSize(payload);

      expect(result.complexity).toBe('medium');
      expect(result.recommendations).toContain('Monitor response times for potential optimization');
    });

    it('should analyze high complexity payload', () => {
      const payload = {
        user_prompt: 'a'.repeat(60000), // Very large prompt to trigger high complexity
        model_name: 'Claude Latest',
        temperature: 0.5,
      };

      const result = analyzePayloadSize(payload);

      expect(result.complexity).toBe('high');
      expect(result.recommendations).toContain('Consider breaking down the request into smaller chunks');
    });

    it('should provide specific recommendations', () => {
      const payload = {
        user_prompt: 'a'.repeat(5500), // > LONG_PROMPT threshold
        model_name: 'Claude Latest',
        temperature: 0.5,
        data_to_include: ['ctx1', 'ctx2', 'ctx3', 'ctx4', 'ctx5', 'ctx6', 'ctx7', 'ctx8', 'ctx9'], // > CONTEXT_ITEMS - 1
        json_schema: 'a'.repeat(2500), // > JSON_SCHEMA_SIZE threshold
      };

      const result = analyzePayloadSize(payload);

      expect(result.recommendations).toContain('Consider shortening the main prompt');
      expect(result.recommendations).toContain('Reduce context data for better focus');
      expect(result.recommendations).toContain('Simplify JSON schema for faster processing');
    });

    it('should calculate size metrics accurately', () => {
      const payload = { test: 'data' };
      const expectedString = JSON.stringify(payload);
      
      const result = analyzePayloadSize(payload);

      expect(result.characterCount).toBe(expectedString.length);
      expect(result.estimatedBytes).toBe(new Blob([expectedString]).size);
    });
  });

  describe('createTestPayload', () => {
    it('should create minimal test payload', () => {
      mockGetModelLabel.mockReturnValue('Claude Latest');
      
      const result = createTestPayload('Test query', 'Claude Latest');

      expect(result).toEqual({
        user_prompt: 'Test query',
        model_name: 'Claude Latest',
        temperature: 0.5,
      });
      expect(mockGetModelLabel).toHaveBeenCalledWith('Claude Latest');
    });

    it('should handle different model names', () => {
      mockGetModelLabel.mockReturnValue('GPT-4o');
      
      const result = createTestPayload('Security analysis', 'GPT-4o');

      expect(result.model_name).toBe('GPT-4o');
    });

    it('should always use temperature 0.5', () => {
      const result = createTestPayload('Any query', 'Any Model');

      expect(result.temperature).toBe(0.5);
    });
  });

  describe('logPayloadInfo', () => {
    // Mock console.log to avoid actual logging during tests
    const originalConsoleLog = console.log;
    const mockConsoleLog = jest.fn();

    beforeEach(() => {
      console.log = mockConsoleLog;
    });

    afterEach(() => {
      console.log = originalConsoleLog;
      mockConsoleLog.mockClear();
    });

    it('should not throw errors when logging payload info', () => {
      const payload = {
        user_prompt: 'Test prompt',
        model_name: 'Claude Latest',
        temperature: 0.5,
        json_schema: '{"type":"object"}',
        stop_words: ['stop'],
        data_to_include: ['context'],
      };

      expect(() => logPayloadInfo(payload, 'Test Context')).not.toThrow();
    });

    it('should handle payload without optional fields', () => {
      const payload = {
        user_prompt: 'Test prompt',
        model_name: 'Claude Latest',
        temperature: 0.5,
      };

      expect(() => logPayloadInfo(payload)).not.toThrow();
    });

    it('should handle empty payload', () => {
      expect(() => logPayloadInfo({})).not.toThrow();
    });
  });

  describe('edge cases and boundary conditions', () => {
    // Local createValidPayload function for this describe block
    const createValidPayload = () => ({
      user_prompt: 'Test prompt',
      model_name: 'Claude Latest',
      temperature: 0.5,
    });

    it('should handle null payload in validatePayload', () => {
      expect(() => validatePayload(null as any)).toThrow();
    });

    it('should handle undefined payload in validatePayload', () => {
      expect(() => validatePayload(undefined as any)).toThrow();
    });

    it('should handle payload with extra properties', () => {
      const payload = {
        ...createValidPayload(),
        extraProperty: 'should be ignored',
      };

      const result = validatePayload(payload);

      expect(result.isValid).toBe(true);
    });

    it('should handle empty arrays gracefully', () => {
      const payload = {
        user_prompt: 'Test prompt',
        model_name: 'Claude Latest',
        temperature: 0.5,
        stop_words: [],
        data_to_include: [],
      };

      const result = validatePayload(payload);

      expect(result.isValid).toBe(true);
    });

    it('should handle extremely large payloads', () => {
      const payload = {
        user_prompt: 'a'.repeat(200000),
        model_name: 'Claude Latest',
        temperature: 0.5,
      };

      const sizeResult = analyzePayloadSize(payload);
      const validationResult = validatePayload(payload);

      expect(sizeResult.complexity).toBe('high');
      expect(validationResult.isValid).toBe(true);
      expect(validationResult.warnings).toBeDefined();
    });
  });
});
