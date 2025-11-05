import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { WorkflowExecutionParams } from '../types';
import { buildWorkflowPayload, logPayloadInfo } from '../WorkflowPayloadBuilder';

// Mock dependencies
vi.mock('../../../utils/constants', () => ({
  getModelLabel: vi.fn((model: string) => model.replace(/_/g, ' ')),
}));

vi.mock('../../../utils/promptEngineer', () => ({
  detectUseCase: vi.fn(() => 'threat_analysis'),
  createSecurityResponseSchema: vi.fn(() => '{"type": "object"}'),
}));

describe('WorkflowPayloadBuilder', () => {
  const baseParams: WorkflowExecutionParams = {
    query: 'Test query',
    model: 'gpt_4',
    temperature: 0.7,
    stopWords: [],
    jsonSchema: '',
    dataToInclude: [],
    selectedContext: '',
    enableCaching: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('buildWorkflowPayload', () => {
    it('should build basic payload with required fields', () => {
      const payload = buildWorkflowPayload(baseParams);

      expect(payload.user_prompt).toBe('Test query');
      expect(payload.model_name).toBe('gpt 4');
      expect(payload.temperature).toBe(0.7);
    });

    it('should normalize model name', () => {
      const params = { ...baseParams, model: 'claude_3_sonnet' };
      const payload = buildWorkflowPayload(params);

      expect(payload.model_name).toBe('claude 3 sonnet');
    });

    it('should add stop words when provided', () => {
      const params = { ...baseParams, stopWords: ['stop1', 'stop2'] };
      const payload = buildWorkflowPayload(params);

      expect(payload.stop_words).toEqual(['stop1', 'stop2']);
    });

    it('should not add stop words when empty', () => {
      const payload = buildWorkflowPayload(baseParams);

      expect(payload.stop_words).toBeUndefined();
    });

    it('should add JSON schema when provided', () => {
      const params = { ...baseParams, jsonSchema: '{"type": "object"}' };
      const payload = buildWorkflowPayload(params);

      expect(payload.json_schema).toBe('{"type": "object"}');
    });

    it('should trim JSON schema whitespace', () => {
      const params = { ...baseParams, jsonSchema: '  {"type": "object"}  ' };
      const payload = buildWorkflowPayload(params);

      expect(payload.json_schema).toBe('{"type": "object"}');
    });

    it('should not add empty JSON schema when enhancement disabled', () => {
      const params = { ...baseParams, enablePromptEnhancement: false };
      const payload = buildWorkflowPayload(params);

      expect(payload.json_schema).toBeUndefined();
    });

    it('should add dataToInclude when provided', () => {
      const params = { ...baseParams, dataToInclude: ['detection', 'incident'] };
      const payload = buildWorkflowPayload(params);

      expect(payload.data_to_include).toEqual(['detection', 'incident']);
    });

    it('should not add dataToInclude when empty', () => {
      const payload = buildWorkflowPayload(baseParams);

      expect(payload.data_to_include).toBeUndefined();
    });

    it('should add selectedContext to dataToInclude', () => {
      const params = { ...baseParams, selectedContext: 'context_data' };
      const payload = buildWorkflowPayload(params);

      expect(payload.data_to_include).toEqual(['context_data']);
    });

    it('should merge selectedContext with existing dataToInclude', () => {
      const params = {
        ...baseParams,
        dataToInclude: ['detection'],
        selectedContext: 'context_data',
      };
      const payload = buildWorkflowPayload(params);

      expect(payload.data_to_include).toEqual(['detection', 'context_data']);
    });

    it('should not add whitespace-only selectedContext', () => {
      const params = { ...baseParams, selectedContext: '   ' };
      const payload = buildWorkflowPayload(params);

      expect(payload.data_to_include).toBeUndefined();
    });
  });

  describe('prompt enhancement', () => {
    it('should auto-generate schema when enablePromptEnhancement is true', async () => {
      const { detectUseCase, createSecurityResponseSchema } = await import(
        '../../../utils/promptEngineer'
      );

      const params = { ...baseParams, enablePromptEnhancement: true };
      const payload = buildWorkflowPayload(params);

      expect(detectUseCase).toHaveBeenCalledWith('Test query');
      expect(createSecurityResponseSchema).toHaveBeenCalledWith('threat_analysis');
      expect(payload.json_schema).toBe('{"type": "object"}');
    });

    it('should not override provided schema', async () => {
      const { detectUseCase, createSecurityResponseSchema } = await import(
        '../../../utils/promptEngineer'
      );

      const params = {
        ...baseParams,
        jsonSchema: '{"existing": "schema"}',
        enablePromptEnhancement: true,
      };
      const payload = buildWorkflowPayload(params);

      expect(detectUseCase).not.toHaveBeenCalled();
      expect(createSecurityResponseSchema).not.toHaveBeenCalled();
      expect(payload.json_schema).toBe('{"existing": "schema"}');
    });

    it('should skip enhancement when disabled', async () => {
      const { detectUseCase, createSecurityResponseSchema } = await import(
        '../../../utils/promptEngineer'
      );

      const params = { ...baseParams, enablePromptEnhancement: false };
      const payload = buildWorkflowPayload(params);

      expect(detectUseCase).not.toHaveBeenCalled();
      expect(createSecurityResponseSchema).not.toHaveBeenCalled();
      expect(payload.json_schema).toBeUndefined();
    });

    it('should default to enhancement enabled', async () => {
      const { detectUseCase } = await import('../../../utils/promptEngineer');

      const params = { ...baseParams }; // No enablePromptEnhancement specified
      buildWorkflowPayload(params);

      expect(detectUseCase).toHaveBeenCalled();
    });
  });

  describe('logPayloadInfo', () => {
    it('should not throw when called', () => {
      expect(() => {
        logPayloadInfo({ user_prompt: 'test', model_name: 'test', temperature: 0.7 });
      }).not.toThrow();
    });

    it('should accept context parameter', () => {
      expect(() => {
        logPayloadInfo(
          { user_prompt: 'test', model_name: 'test', temperature: 0.7 },
          'Test Context',
        );
      }).not.toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle very long query', () => {
      const longQuery = 'test '.repeat(10000);
      const params = { ...baseParams, query: longQuery };
      const payload = buildWorkflowPayload(params);

      expect(payload.user_prompt).toBe(longQuery);
    });

    it('should handle special characters in query', () => {
      const params = { ...baseParams, query: 'Test: <script>alert("xss")</script>' };
      const payload = buildWorkflowPayload(params);

      expect(payload.user_prompt).toBe('Test: <script>alert("xss")</script>');
    });

    it('should handle Unicode characters', () => {
      const params = { ...baseParams, query: '🔒 Security analysis 中文' };
      const payload = buildWorkflowPayload(params);

      expect(payload.user_prompt).toBe('🔒 Security analysis 中文');
    });

    it('should handle temperature edge values', () => {
      expect(buildWorkflowPayload({ ...baseParams, temperature: 0 }).temperature).toBe(0);
      expect(buildWorkflowPayload({ ...baseParams, temperature: 1 }).temperature).toBe(1);
      expect(buildWorkflowPayload({ ...baseParams, temperature: 0.001 }).temperature).toBe(0.001);
    });

    it('should handle empty model name', () => {
      const params = { ...baseParams, model: '' };
      const payload = buildWorkflowPayload(params);

      expect(payload.model_name).toBe('');
    });

    it('should handle complex dataToInclude', () => {
      const params = {
        ...baseParams,
        dataToInclude: ['item1', 'item2', 'item3', 'item4', 'item5'],
      };
      const payload = buildWorkflowPayload(params);

      expect(payload.data_to_include).toEqual(['item1', 'item2', 'item3', 'item4', 'item5']);
    });

    it('should handle multiple whitespace in selectedContext', () => {
      const params = { ...baseParams, selectedContext: '  \n\t  ' };
      const payload = buildWorkflowPayload(params);

      expect(payload.data_to_include).toBeUndefined();
    });
  });
});
