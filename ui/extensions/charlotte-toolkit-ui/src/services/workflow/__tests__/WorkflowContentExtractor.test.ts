import { describe, expect, it } from 'vitest';

import { extractWorkflowContent, validateExtractedContent } from '../WorkflowContentExtractor';

describe('WorkflowContentExtractor', () => {
  describe('extractWorkflowContent', () => {
    describe('Strategy 1: Dynamic completion field (Charlotte workflow)', () => {
      it('should extract from dynamic completion field', () => {
        const output = {
          'activity_123.FaaS.nlpassistantapi.llminvocator_handler.completion': 'Dynamic content',
          other: 'data',
        };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Dynamic content');
      });

      it('should ignore metadata completion fields', () => {
        const output = {
          'activity_123.FaaS.nlpassistantapi.llminvocator_handler.completion.meta': 'Metadata',
          'activity_123.FaaS.nlpassistantapi.llminvocator_handler.completion': 'Real content',
        };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Real content');
      });

      it('should require llminvocator_handler in field name', () => {
        const output = {
          'activity_123.completion': 'Wrong format',
          completion: 'Fallback content',
        };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Fallback content');
      });
    });

    describe('Strategy 2: Simple completion field', () => {
      it('should extract from simple completion field', () => {
        const output = { completion: 'Simple completion' };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Simple completion');
      });

      it('should prefer dynamic field over simple completion', () => {
        const output = {
          'activity_123.FaaS.nlpassistantapi.llminvocator_handler.completion': 'Dynamic',
          completion: 'Simple',
        };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Dynamic');
      });
    });

    describe('Strategy 3: Legacy formats', () => {
      it('should extract from content field', () => {
        const output = { content: 'Content field' };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Content field');
      });

      it('should extract from response field', () => {
        const output = { response: 'Response field' };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Response field');
      });

      it('should extract from result field', () => {
        const output = { result: 'Result field' };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Result field');
      });

      it('should extract from output field', () => {
        const output = { output: 'Output field' };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Output field');
      });

      it('should extract from generic completion field', () => {
        const output = { 'some_field.completion': 'Generic completion' };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Generic completion');
      });

      it('should ignore generic meta completion fields', () => {
        const output = {
          'field.completion.meta': 'Meta data',
          'field.completion': 'Real data',
        };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Real data');
      });
    });

    describe('Strategy 4: Nested structure extraction', () => {
      it('should extract from first string value', () => {
        const output = {
          nested: 'First string',
          other: 'Second string',
        };

        const result = extractWorkflowContent(output);
        expect(result).toBe('First string');
      });

      it('should extract from nested object with completion', () => {
        const output = {
          data: {
            completion: 'Nested completion',
          },
        };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Nested completion');
      });

      it('should extract from nested object with content', () => {
        const output = {
          data: {
            content: 'Nested content',
          },
        };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Nested content');
      });

      it('should handle empty nested objects', () => {
        const output = {
          data: {},
        };

        expect(() => extractWorkflowContent(output)).toThrow();
      });
    });

    describe('Error handling', () => {
      it('should throw when no output data provided', () => {
        expect(() => extractWorkflowContent(undefined)).toThrow(
          'No output data received from workflow',
        );
      });

      it('should throw when no content found', () => {
        const output = { number: 123, boolean: true };

        expect(() => extractWorkflowContent(output)).toThrow(
          'Unable to extract content from workflow output',
        );
      });

      it('should throw when content is empty string', () => {
        const output = { completion: '' };

        expect(() => extractWorkflowContent(output)).toThrow(
          'Unable to extract content from workflow output',
        );
      });

      it('should throw when content is whitespace only', () => {
        const output = { completion: '   \n\t   ' };

        expect(() => extractWorkflowContent(output)).toThrow(
          'Workflow completed but produced no content',
        );
      });

      it('should throw when extracted content is not string', () => {
        const output = { completion: 123 as unknown };

        expect(() => extractWorkflowContent(output)).toThrow(
          'Unable to extract content from workflow output',
        );
      });
    });

    describe('Content formatting', () => {
      it('should trim whitespace from content', () => {
        const output = { completion: '  Trimmed content  ' };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Trimmed content');
      });

      it('should preserve internal whitespace', () => {
        const output = { completion: 'Line 1\n\nLine 2' };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Line 1\n\nLine 2');
      });

      it('should preserve JSON structure', () => {
        const output = { completion: '{"key": "value"}' };

        const result = extractWorkflowContent(output);
        expect(result).toBe('{"key": "value"}');
      });
    });

    describe('Edge cases', () => {
      it('should handle very long content', () => {
        const longContent = 'word '.repeat(10000).trim();
        const output = { completion: longContent };

        const result = extractWorkflowContent(output);
        expect(result.length).toBeGreaterThan(0);
        expect(result).toContain('word');
      });

      it('should handle special characters', () => {
        const output = { completion: 'Content with <html> & special chars!' };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Content with <html> & special chars!');
      });

      it('should handle Unicode characters', () => {
        const output = { completion: 'Unicode: 🔒 中文 café' };

        const result = extractWorkflowContent(output);
        expect(result).toBe('Unicode: 🔒 中文 café');
      });

      it('should handle multiline markdown', () => {
        const output = {
          completion: '# Header\n\nParagraph\n\n```code```',
        };

        const result = extractWorkflowContent(output);
        expect(result).toBe('# Header\n\nParagraph\n\n```code```');
      });
    });
  });

  describe('validateExtractedContent', () => {
    describe('Valid content', () => {
      it('should validate normal text content', () => {
        const result = validateExtractedContent('This is valid content with enough words');

        expect(result.isValid).toBe(true);
        expect(result.isEmpty).toBe(false);
        expect(result.wordCount).toBeGreaterThan(0);
        expect(result.estimatedFormat).toBe('text');
        expect(result.warnings).toHaveLength(0);
      });

      it('should detect JSON format', () => {
        const result = validateExtractedContent('{"key": "value"}');

        expect(result.isValid).toBe(true);
        expect(result.hasStructuredData).toBe(true);
        expect(result.estimatedFormat).toBe('json');
      });

      it('should detect markdown format', () => {
        const result = validateExtractedContent('# Header\n\nContent');

        expect(result.isValid).toBe(true);
        expect(result.estimatedFormat).toBe('markdown');
      });

      it('should detect HTML format', () => {
        const result = validateExtractedContent('<div>Content</div>');

        expect(result.isValid).toBe(true);
        expect(result.estimatedFormat).toBe('html');
      });

      it('should count words correctly', () => {
        const result = validateExtractedContent('one two three four five');

        expect(result.wordCount).toBe(5);
      });

      it('should trim content before counting', () => {
        const result = validateExtractedContent('  word1 word2  ');

        expect(result.wordCount).toBe(2);
      });
    });

    describe('Invalid content', () => {
      it('should reject null content', () => {
        const result = validateExtractedContent(null as unknown as string);

        expect(result.isValid).toBe(false);
        expect(result.isEmpty).toBe(true);
        expect(result.warnings).toContain('Content is not a string or is null/undefined');
      });

      it('should reject undefined content', () => {
        const result = validateExtractedContent(undefined as unknown as string);

        expect(result.isValid).toBe(false);
        expect(result.isEmpty).toBe(true);
        expect(result.warnings).toContain('Content is not a string or is null/undefined');
      });

      it('should reject empty string', () => {
        const result = validateExtractedContent('');

        expect(result.isValid).toBe(false);
        expect(result.isEmpty).toBe(true);
        // Empty string is falsy, so it triggers the 'not a string' warning
        expect(result.warnings).toContain('Content is not a string or is null/undefined');
      });

      it('should reject whitespace-only string', () => {
        const result = validateExtractedContent('   \n\t   ');

        expect(result.isValid).toBe(false);
        expect(result.isEmpty).toBe(true);
        expect(result.warnings).toContain('Content is empty after trimming');
      });

      it('should reject non-string content', () => {
        const result = validateExtractedContent(123 as unknown as string);

        expect(result.isValid).toBe(false);
        expect(result.warnings).toContain('Content is not a string or is null/undefined');
      });
    });

    describe('Warnings', () => {
      it('should warn for very short content', () => {
        const result = validateExtractedContent('word');

        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Content is very short (less than 5 words)');
      });

      it('should warn for very long content', () => {
        const longContent = 'word '.repeat(6000);
        const result = validateExtractedContent(longContent);

        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Content is very long (over 5000 words)');
      });

      it('should warn for content with error messages', () => {
        const result = validateExtractedContent('Error: Something went wrong');

        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Content appears to contain error messages');
      });

      it('should warn for content with lowercase error', () => {
        const result = validateExtractedContent('An error: occurred during processing');

        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Content appears to contain error messages');
      });

      it('should not warn for normal content', () => {
        const result = validateExtractedContent('This is a good response with enough words');

        expect(result.isValid).toBe(true);
        expect(result.warnings).toHaveLength(0);
      });
    });

    describe('Format detection', () => {
      it('should detect complex JSON', () => {
        const json = JSON.stringify({ nested: { data: [1, 2, 3] } });
        const result = validateExtractedContent(json);

        expect(result.estimatedFormat).toBe('json');
        expect(result.hasStructuredData).toBe(true);
      });

      it('should detect markdown with code blocks', () => {
        const result = validateExtractedContent('```javascript\ncode\n```');

        expect(result.estimatedFormat).toBe('markdown');
      });

      it('should detect HTML with tags', () => {
        const result = validateExtractedContent('<p>Paragraph</p><div>Div</div>');

        expect(result.estimatedFormat).toBe('html');
      });

      it('should default to text for plain content', () => {
        const result = validateExtractedContent('Just plain text without special formatting');

        expect(result.estimatedFormat).toBe('text');
        expect(result.hasStructuredData).toBe(false);
      });
    });

    describe('Edge cases', () => {
      it('should handle empty object JSON', () => {
        const result = validateExtractedContent('{}');

        expect(result.isValid).toBe(true);
        expect(result.estimatedFormat).toBe('json');
      });

      it('should handle empty array JSON', () => {
        const result = validateExtractedContent('[]');

        expect(result.isValid).toBe(true);
        expect(result.estimatedFormat).toBe('json');
      });

      it('should handle invalid JSON as text', () => {
        const result = validateExtractedContent('{"invalid": json}');

        expect(result.isValid).toBe(true);
        expect(result.estimatedFormat).toBe('text');
        expect(result.hasStructuredData).toBe(false);
      });

      it('should handle mixed format indicators', () => {
        const result = validateExtractedContent('<div># Header</div>');

        expect(result.isValid).toBe(true);
        expect(result.estimatedFormat).toBe('html'); // HTML takes precedence
      });
    });
  });
});
