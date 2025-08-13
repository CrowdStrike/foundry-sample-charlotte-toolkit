// src/services/workflow/__tests__/WorkflowContentExtractor.test.ts

import {
  extractWorkflowContent,
  analyzeWorkflowOutput,
  validateExtractedContent,
  extractWorkflowMetadata,
} from '../WorkflowContentExtractor';

describe('WorkflowContentExtractor', () => {
  describe('extractWorkflowContent', () => {
    describe('dynamic completion field extraction', () => {
      it('should extract from Charlotte workflow dynamic completion field', () => {
        const outputData = {
          'activity_12345-abcd-6789-efgh.FaaS.nlpassistantapi.llminvocator_handler.completion': 'Dynamic completion content',
          'activity_12345-abcd-6789-efgh.FaaS.nlpassistantapi.llminvocator_handler.meta': 'metadata',
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Dynamic completion content');
      });

      it('should prioritize dynamic completion field over simple completion', () => {
        const outputData = {
          completion: 'Simple completion',
          'activity_uuid.FaaS.nlpassistantapi.llminvocator_handler.completion': 'Dynamic completion content',
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Dynamic completion content');
      });

      it('should ignore meta fields when finding dynamic completion', () => {
        const outputData = {
          'activity_uuid.FaaS.nlpassistantapi.llminvocator_handler.completion.meta': 'metadata',
          'activity_uuid.FaaS.nlpassistantapi.llminvocator_handler.completion': 'Actual content',
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Actual content');
      });

      it('should handle multiple dynamic completion fields by selecting the first', () => {
        const outputData = {
          'activity_1.FaaS.nlpassistantapi.llminvocator_handler.completion': 'First completion',
          'activity_2.FaaS.nlpassistantapi.llminvocator_handler.completion': 'Second completion',
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('First completion');
      });
    });

    describe('simple Charlotte schema format', () => {
      it('should extract from simple completion field', () => {
        const outputData = {
          completion: 'Simple completion content',
          other_field: 'other data',
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Simple completion content');
      });

      it('should fallback to completion when no dynamic field exists', () => {
        const outputData = {
          completion: 'Fallback completion',
          'some_other.completion': 'Not matching pattern',
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Fallback completion');
      });
    });

    describe('legacy format extraction', () => {
      it('should extract from content field', () => {
        const outputData = {
          content: 'Legacy content field',
          other_data: 'ignored',
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Legacy content field');
      });

      it('should extract from response field', () => {
        const outputData = {
          response: 'Legacy response field',
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Legacy response field');
      });

      it('should extract from result field', () => {
        const outputData = {
          result: 'Legacy result field',
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Legacy result field');
      });

      it('should extract from output field', () => {
        const outputData = {
          output: 'Legacy output field',
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Legacy output field');
      });

      it('should prioritize content over response', () => {
        const outputData = {
          content: 'Content field',
          response: 'Response field',
          result: 'Result field',
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Content field');
      });
    });

    describe('string output data', () => {
      it('should handle string output data directly', () => {
        const outputData = 'Direct string content';

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Direct string content');
      });

      it('should trim string output data', () => {
        const outputData = '  \n  String with whitespace  \n  ';

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('String with whitespace');
      });
    });

    describe('generic completion pattern', () => {
      it('should extract from generic completion field pattern', () => {
        const outputData = {
          'workflow_step.completion': 'Generic completion content',
          'workflow_step.meta': 'metadata',
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Generic completion content');
      });

      it('should ignore meta completion fields', () => {
        const outputData = {
          'step.completion.meta': 'metadata',
          'step.completion': 'Actual content',
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Actual content');
      });
    });

    describe('nested structure extraction', () => {
      it('should extract from nested completion field', () => {
        const outputData = {
          nested_object: {
            completion: 'Nested completion content',
          },
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Nested completion content');
      });

      it('should extract from nested content field', () => {
        const outputData = {
          workflow_result: {
            content: 'Nested content field',
          },
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Nested content field');
      });

      it('should extract string value from first key', () => {
        const outputData = {
          first_key: 'String value from first key',
          second_key: 'Ignored',
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('String value from first key');
      });

      it('should handle deeply nested empty objects', () => {
        const outputData = {
          empty_object: {},
        };

        expect(() => extractWorkflowContent(outputData)).toThrow('Unable to extract content from workflow output');
      });
    });

    describe('error cases', () => {
      it('should throw error for null/undefined output data', () => {
        expect(() => extractWorkflowContent(null)).toThrow('No output data received from workflow');
        expect(() => extractWorkflowContent(undefined)).toThrow('No output data received from workflow');
      });

      it('should throw error when no content can be extracted', () => {
        const outputData = {
          metadata: { nested: 'object' },
          config: { another: 'object' },
        };

        expect(() => extractWorkflowContent(outputData)).toThrow('Unable to extract content from workflow output');
      });

      it('should throw error for non-string extracted content', () => {
        const outputData = {
          completion: 12345, // number instead of string
        };

        expect(() => extractWorkflowContent(outputData)).toThrow('Unable to extract content from workflow output');
      });

      it('should throw error for empty content after trimming', () => {
        const outputData = {
          completion: '   \n   \t   ', // only whitespace
        };

        expect(() => extractWorkflowContent(outputData)).toThrow('Workflow completed but produced no content');
      });

      it('should throw error for empty string content', () => {
        const outputData = {
          completion: '',
        };

        expect(() => extractWorkflowContent(outputData)).toThrow('Unable to extract content from workflow output');
      });
    });

    describe('content trimming and preservation', () => {
      it('should preserve JSON structure', () => {
        const jsonContent = '{"key": "value", "number": 42}';
        const outputData = {
          completion: jsonContent,
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe(jsonContent);
      });

      it('should trim whitespace but preserve content structure', () => {
        const content = '  # Markdown Content\n\nWith multiple lines  ';
        const outputData = {
          completion: content,
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('# Markdown Content\n\nWith multiple lines');
      });

      it('should handle multiline content correctly', () => {
        const multilineContent = 'Line 1\nLine 2\nLine 3';
        const outputData = {
          completion: multilineContent,
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe(multilineContent);
      });
    });

    describe('complex data structures', () => {
      it('should handle complex workflow output with multiple strategies', () => {
        const outputData = {
          'activity_complex.FaaS.nlpassistantapi.llminvocator_handler.completion': 'Complex workflow content',
          completion: 'Simple fallback',
          content: 'Legacy fallback',
          nested: {
            completion: 'Nested fallback',
          },
        };

        const result = extractWorkflowContent(outputData);

        expect(result).toBe('Complex workflow content');
      });

      it('should handle array values in output', () => {
        const outputData = {
          completion: ['Array', 'of', 'strings'],
        };

        expect(() => extractWorkflowContent(outputData)).toThrow('Unable to extract content from workflow output');
      });

      it('should handle boolean values in output', () => {
        const outputData = {
          completion: true,
        };

        expect(() => extractWorkflowContent(outputData)).toThrow('Unable to extract content from workflow output');
      });
    });
  });

  describe('analyzeWorkflowOutput', () => {
    it('should analyze simple structure with content', () => {
      const outputData = {
        completion: 'Simple content',
        metadata: 'meta',
      };

      const result = analyzeWorkflowOutput(outputData);

      expect(result).toEqual({
        hasContent: true,
        contentFields: ['completion'],
        structure: 'simple',
        recommendedExtraction: 'completion',
      });
    });

    it('should analyze nested structure', () => {
      const outputData = {
        completion: 'Content',
        nested: {
          data: 'value',
        },
      };

      const result = analyzeWorkflowOutput(outputData);

      expect(result).toEqual({
        hasContent: true,
        contentFields: ['completion'],
        structure: 'nested',
        recommendedExtraction: 'completion',
      });
    });

    it('should analyze complex structure', () => {
      const outputData = {
        completion: 'Content',
        result: 'Result',
        output: 'Output',
        nested1: { data: 'value1' },
        nested2: { data: 'value2' },
        nested3: { data: 'value3' },
        nested4: { data: 'value4' },
      };

      const result = analyzeWorkflowOutput(outputData);

      expect(result).toEqual({
        hasContent: true,
        contentFields: ['completion', 'result', 'output'],
        structure: 'complex',
        recommendedExtraction: 'completion',
      });
    });

    it('should identify dynamic completion field as recommended', () => {
      const outputData = {
        'activity_uuid.FaaS.nlpassistantapi.llminvocator_handler.completion': 'Dynamic content',
        completion: 'Simple content',
      };

      const result = analyzeWorkflowOutput(outputData);

      expect(result.recommendedExtraction).toBe('activity_uuid.FaaS.nlpassistantapi.llminvocator_handler.completion');
    });

    it('should handle output data without content fields', () => {
      const outputData = {
        metadata: 'meta',
        config: 'config',
      };

      const result = analyzeWorkflowOutput(outputData);

      expect(result).toEqual({
        hasContent: false,
        contentFields: [],
        structure: 'simple',
        recommendedExtraction: null,
      });
    });

    it('should handle null/undefined output data', () => {
      expect(analyzeWorkflowOutput(null)).toEqual({
        hasContent: false,
        contentFields: [],
        structure: 'simple',
        recommendedExtraction: null,
      });

      expect(analyzeWorkflowOutput(undefined)).toEqual({
        hasContent: false,
        contentFields: [],
        structure: 'simple',
        recommendedExtraction: null,
      });
    });

    it('should handle non-object output data', () => {
      expect(analyzeWorkflowOutput('string')).toEqual({
        hasContent: false,
        contentFields: [],
        structure: 'simple',
        recommendedExtraction: null,
      });

      expect(analyzeWorkflowOutput(12345)).toEqual({
        hasContent: false,
        contentFields: [],
        structure: 'simple',
        recommendedExtraction: null,
      });
    });

    it('should identify all content field types', () => {
      const outputData = {
        completion: 'completion content',
        content: 'content field',
        response: 'response field',
        result: 'result field',
        output: 'output field',
        other: 'other field',
      };

      const result = analyzeWorkflowOutput(outputData);

      expect(result.contentFields).toEqual(['completion', 'content', 'response', 'result', 'output']);
      expect(result.hasContent).toBe(true);
    });
  });

  describe('validateExtractedContent', () => {
    it('should validate normal text content', () => {
      const content = 'This is normal text content with several words.';

      const result = validateExtractedContent(content);

      expect(result).toEqual({
        isValid: true,
        isEmpty: false,
        wordCount: 8,
        hasStructuredData: false,
        estimatedFormat: 'text',
        warnings: [],
      });
    });

    it('should validate JSON content', () => {
      const content = '{"key": "value", "number": 42}';

      const result = validateExtractedContent(content);

      expect(result).toEqual({
        isValid: true,
        isEmpty: false,
        wordCount: 4, // JSON parsed as words
        hasStructuredData: true,
        estimatedFormat: 'json',
        warnings: ['Content is very short (less than 5 words)'],
      });
    });

    it('should validate HTML content', () => {
      const content = '<div>HTML content with <strong>formatting</strong></div>';

      const result = validateExtractedContent(content);

      expect(result).toEqual({
        isValid: true,
        isEmpty: false,
        wordCount: 4,
        hasStructuredData: false,
        estimatedFormat: 'html',
        warnings: ['Content is very short (less than 5 words)'],
      });
    });

    it('should validate Markdown content', () => {
      const content = '# Markdown Title\n\nWith some **bold** text and ```code```';

      const result = validateExtractedContent(content);

      expect(result).toEqual({
        isValid: true,
        isEmpty: false,
        wordCount: 9,
        hasStructuredData: false,
        estimatedFormat: 'markdown',
        warnings: [],
      });
    });

    it('should handle null/undefined content', () => {
      expect(validateExtractedContent(null as any)).toEqual({
        isValid: false,
        isEmpty: true,
        wordCount: 0,
        hasStructuredData: false,
        estimatedFormat: 'text',
        warnings: ['Content is not a string or is null/undefined'],
      });

      expect(validateExtractedContent(undefined as any)).toEqual({
        isValid: false,
        isEmpty: true,
        wordCount: 0,
        hasStructuredData: false,
        estimatedFormat: 'text',
        warnings: ['Content is not a string or is null/undefined'],
      });
    });

    it('should handle non-string content', () => {
      const result = validateExtractedContent(12345 as any);

      expect(result).toEqual({
        isValid: false,
        isEmpty: true,
        wordCount: 0,
        hasStructuredData: false,
        estimatedFormat: 'text',
        warnings: ['Content is not a string or is null/undefined'],
      });
    });

    it('should handle empty content', () => {
      const result = validateExtractedContent('');

      expect(result).toEqual({
        isValid: false,
        isEmpty: true,
        wordCount: 0,
        hasStructuredData: false,
        estimatedFormat: 'text',
        warnings: ['Content is not a string or is null/undefined'],
      });
    });

    it('should handle whitespace-only content', () => {
      const result = validateExtractedContent('   \n\t   ');

      expect(result).toEqual({
        isValid: false,
        isEmpty: true,
        wordCount: 1,
        hasStructuredData: false,
        estimatedFormat: 'text',
        warnings: ['Content is empty after trimming'],
      });
    });

    it('should warn about very short content', () => {
      const result = validateExtractedContent('Hi');

      expect(result.warnings).toContain('Content is very short (less than 5 words)');
      expect(result.isValid).toBe(true);
      expect(result.wordCount).toBe(1);
    });

    it('should warn about very long content', () => {
      const longContent = 'word '.repeat(5001).trim();

      const result = validateExtractedContent(longContent);

      expect(result.warnings).toContain('Content is very long (over 5000 words)');
      expect(result.isValid).toBe(true);
      expect(result.wordCount).toBe(5001);
    });

    it('should warn about error messages in content', () => {
      const errorContent = 'This content contains an Error: something went wrong';

      const result = validateExtractedContent(errorContent);

      expect(result.warnings).toContain('Content appears to contain error messages');
      expect(result.isValid).toBe(true);
    });

    it('should detect lowercase error messages', () => {
      const errorContent = 'This content has an error: network failure';

      const result = validateExtractedContent(errorContent);

      expect(result.warnings).toContain('Content appears to contain error messages');
    });

    it('should handle complex JSON with nested structures', () => {
      const complexJson = JSON.stringify({
        data: {
          results: [1, 2, 3],
          metadata: { version: '1.0' },
        },
      });

      const result = validateExtractedContent(complexJson);

      expect(result.estimatedFormat).toBe('json');
      expect(result.hasStructuredData).toBe(true);
      expect(result.isValid).toBe(true);
    });

    it('should handle malformed JSON as text', () => {
      const malformedJson = '{"key": value, "missing": quotes}';

      const result = validateExtractedContent(malformedJson);

      expect(result.estimatedFormat).toBe('text');
      expect(result.hasStructuredData).toBe(false);
    });
  });

  describe('extractWorkflowMetadata', () => {
    it('should extract metadata fields', () => {
      const outputData = {
        'workflow.meta': 'metadata value',
        'step.metadata': 'step metadata',
        'activity._meta': 'activity meta',
        completion: 'content',
      };

      const result = extractWorkflowMetadata(outputData);

      expect(result).toEqual({
        'workflow.meta': 'metadata value',
        'step.metadata': 'step metadata',
        'activity._meta': 'activity meta',
      });
    });

    it('should extract timing information', () => {
      const outputData = {
        execution_time: 1500,
        processing_time: 800,
        completion: 'content',
      };

      const result = extractWorkflowMetadata(outputData);

      expect(result).toEqual({
        timing: {
          execution_time: 1500,
          processing_time: 800,
        },
      });
    });

    it('should extract model information', () => {
      const outputData = {
        model_used: 'gpt-4',
        model_name: 'GPT-4',
        completion: 'content',
      };

      const result = extractWorkflowMetadata(outputData);

      expect(result).toEqual({
        model: {
          model_used: 'gpt-4',
          model_name: 'GPT-4',
        },
      });
    });

    it('should extract all types of metadata', () => {
      const outputData = {
        'workflow.meta': 'workflow metadata',
        execution_time: 2000,
        model_used: 'claude-3',
        completion: 'content',
        other_field: 'ignored',
      };

      const result = extractWorkflowMetadata(outputData);

      expect(result).toEqual({
        'workflow.meta': 'workflow metadata',
        timing: {
          execution_time: 2000,
          processing_time: undefined,
        },
        model: {
          model_used: 'claude-3',
          model_name: undefined,
        },
      });
    });

    it('should return empty object for null/undefined data', () => {
      expect(extractWorkflowMetadata(null)).toEqual({});
      expect(extractWorkflowMetadata(undefined)).toEqual({});
    });

    it('should return empty object for non-object data', () => {
      expect(extractWorkflowMetadata('string')).toEqual({});
      expect(extractWorkflowMetadata(12345)).toEqual({});
      expect(extractWorkflowMetadata(true)).toEqual({});
    });

    it('should return empty object when no metadata fields exist', () => {
      const outputData = {
        completion: 'content',
        result: 'result',
        output: 'output',
      };

      const result = extractWorkflowMetadata(outputData);

      expect(result).toEqual({});
    });

    it('should handle partial timing information', () => {
      const outputData = {
        execution_time: 1000,
        // processing_time missing
      };

      const result = extractWorkflowMetadata(outputData);

      expect(result).toEqual({
        timing: {
          execution_time: 1000,
          processing_time: undefined,
        },
      });
    });

    it('should handle partial model information', () => {
      const outputData = {
        model_name: 'Claude-3',
        // model_used missing
      };

      const result = extractWorkflowMetadata(outputData);

      expect(result).toEqual({
        model: {
          model_used: undefined,
          model_name: 'Claude-3',
        },
      });
    });
  });

  describe('integration scenarios', () => {
    it('should handle complete workflow output with all extraction methods', () => {
      const outputData = {
        'activity_12345.FaaS.nlpassistantapi.llminvocator_handler.completion': 'Primary content',
        'activity_12345.FaaS.nlpassistantapi.llminvocator_handler.meta': 'metadata',
        execution_time: 1500,
        model_used: 'gpt-4',
        fallback_content: 'fallback',
      };

      // Test content extraction
      const content = extractWorkflowContent(outputData);
      expect(content).toBe('Primary content');

      // Test analysis
      const analysis = analyzeWorkflowOutput(outputData);
      expect(analysis.recommendedExtraction).toBe('activity_12345.FaaS.nlpassistantapi.llminvocator_handler.completion');

      // Test validation
      const validation = validateExtractedContent(content);
      expect(validation.isValid).toBe(true);

      // Test metadata extraction
      const metadata = extractWorkflowMetadata(outputData);
      expect(metadata).toEqual({
        'activity_12345.FaaS.nlpassistantapi.llminvocator_handler.meta': 'metadata',
        timing: {
          execution_time: 1500,
          processing_time: undefined,
        },
        model: {
          model_used: 'gpt-4',
          model_name: undefined,
        },
      });
    });

    it('should handle minimal workflow output', () => {
      const outputData = {
        completion: 'Minimal content',
      };

      const content = extractWorkflowContent(outputData);
      const analysis = analyzeWorkflowOutput(outputData);
      const validation = validateExtractedContent(content);
      const metadata = extractWorkflowMetadata(outputData);

      expect(content).toBe('Minimal content');
      expect(analysis.structure).toBe('simple');
      expect(validation.isValid).toBe(true);
      expect(metadata).toEqual({});
    });

    it('should handle legacy workflow output format', () => {
      const outputData = {
        result: 'Legacy workflow result',
        execution_time: 800,
      };

      const content = extractWorkflowContent(outputData);
      const analysis = analyzeWorkflowOutput(outputData);

      expect(content).toBe('Legacy workflow result');
      expect(analysis.recommendedExtraction).toBe('result');
      expect(analysis.contentFields).toContain('result');
    });
  });
});
