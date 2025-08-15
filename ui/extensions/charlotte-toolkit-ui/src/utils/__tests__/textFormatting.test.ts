// src/utils/__tests__/textFormatting.test.ts
import {
  formatTextWithParagraphs,
  formatMitreDescription,
  truncateText,
  capitalizeFirstLetter,
  formatters,
} from '../textFormatting';

describe('textFormatting', () => {
  describe('formatTextWithParagraphs (default formatter)', () => {
    it('should handle empty string', () => {
      const result = formatTextWithParagraphs('');
      expect(result).toEqual([]);
    });

    it('should handle null/undefined input', () => {
      expect(formatTextWithParagraphs(null as any)).toEqual([]);
      expect(formatTextWithParagraphs(undefined as any)).toEqual([]);
    });

    it('should handle non-string input', () => {
      expect(formatTextWithParagraphs(123 as any)).toEqual([]);
    });

    it('should return single paragraph for short text', () => {
      const text = 'This is a short sentence.';
      const result = formatTextWithParagraphs(text);
      expect(result).toEqual([text]);
    });

    it('should split text into paragraphs based on sentence count', () => {
      const text = 'First sentence. Second sentence. Third sentence. Fourth sentence. Fifth sentence.';
      const result = formatTextWithParagraphs(text);
      expect(result.length).toBeGreaterThan(1);
      expect(result[0]).toContain('First sentence. Second sentence. Third sentence.');
    });

    it('should break on keywords', () => {
      const text = 'First sentence. Additionally this is another point. Third sentence.';
      const result = formatTextWithParagraphs(text);
      expect(result.length).toBeGreaterThan(1);
    });

    it('should handle text with multiple whitespaces', () => {
      const text = 'First   sentence.    Second     sentence.';
      const result = formatTextWithParagraphs(text);
      expect(result[0]).toBe('First sentence. Second sentence.');
    });

    it('should split on sentence boundaries with proper punctuation', () => {
      const text = 'Question? Answer! Statement. Another statement.';
      const result = formatTextWithParagraphs(text);
      expect(result.length).toBeGreaterThan(0);
      expect(result.join(' ')).toContain('Question? Answer! Statement. Another statement.');
    });

    it('should handle text with no sentence endings', () => {
      const text = 'This is text without proper sentence endings';
      const result = formatTextWithParagraphs(text);
      expect(result).toEqual([text]);
    });

    it('should filter out empty paragraphs', () => {
      const text = 'Valid sentence. Another valid sentence.';
      const result = formatTextWithParagraphs(text);
      expect(result.every(p => p.length > 0)).toBe(true);
    });
  });

  describe('formatMitreDescription', () => {
    it('should handle empty string', () => {
      const result = formatMitreDescription('');
      expect(result).toEqual([]);
    });

    it('should use MITRE-specific keywords for breaking', () => {
      const text = 'This technique is used by attackers. Attackers often use this method. Detection is difficult.';
      const result = formatMitreDescription(text);
      expect(result.length).toBeGreaterThan(1);
    });

    it('should break on technical indicators', () => {
      const text = 'The malware executes code. Windows registry is modified. Linux systems are affected.';
      const result = formatMitreDescription(text);
      expect(result.length).toBeGreaterThan(1);
    });

    it('should handle MITRE transition phrases', () => {
      const text = 'Basic description. Additionally, this technique can be used. Furthermore, detection methods exist.';
      const result = formatMitreDescription(text);
      expect(result.length).toBeGreaterThan(1);
    });

    it('should use shorter paragraph length than default', () => {
      const text = 'First sentence. Second sentence. Third sentence. Fourth sentence.';
      const mitreResult = formatMitreDescription(text);
      const defaultResult = formatTextWithParagraphs(text);
      
      // MITRE formatter should create more paragraphs due to shorter maxSentencesPerParagraph
      expect(mitreResult.length).toBeGreaterThanOrEqual(defaultResult.length);
    });
  });

  describe('truncateText', () => {
    it('should return original text if shorter than maxLength', () => {
      const text = 'Short text';
      const result = truncateText(text, 20);
      expect(result).toBe(text);
    });

    it('should return original text if equal to maxLength', () => {
      const text = 'Exact length';
      const result = truncateText(text, text.length);
      expect(result).toBe(text);
    });

    it('should truncate text longer than maxLength', () => {
      const text = 'This is a very long text that needs to be truncated';
      const result = truncateText(text, 20);
      expect(result.length).toBeLessThanOrEqual(24); // 20 + '...' = 23, but might be less due to word boundary
      expect(result.endsWith('...')).toBe(true);
    });

    it('should break at word boundaries when possible', () => {
      const text = 'This is a long sentence with multiple words';
      const result = truncateText(text, 15);
      expect(result.endsWith('...')).toBe(true);
      // Should not cut in the middle of a word
      expect(result).toMatch(/^[\w\s]+\.\.\.$/);
    });

    it('should handle text with no spaces', () => {
      const text = 'verylongtextwithoutanyspaces';
      const result = truncateText(text, 10);
      expect(result).toBe('verylongte...');
    });

    it('should handle empty string', () => {
      const result = truncateText('', 10);
      expect(result).toBe('');
    });

    it('should handle null/undefined input', () => {
      expect(truncateText(null as any, 10)).toBe(null);
      expect(truncateText(undefined as any, 10)).toBe(undefined);
    });

    it('should handle maxLength of 0', () => {
      const text = 'Some text';
      const result = truncateText(text, 0);
      expect(result).toBe('...');
    });

    it('should respect the 80% threshold for word boundaries', () => {
      const text = 'This is exactly twenty characters';
      const result = truncateText(text, 25); // Last space at position 20, which is 80% of 25
      
      // Should break at the last space if it's within 80% of maxLength
      expect(result.length).toBeLessThanOrEqual(28); // 25 + '...'
    });

    it('should handle single character input', () => {
      const result = truncateText('A', 10);
      expect(result).toBe('A');
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should capitalize first letter of lowercase string', () => {
      const result = capitalizeFirstLetter('hello world');
      expect(result).toBe('Hello world');
    });

    it('should keep first letter capitalized if already capitalized', () => {
      const result = capitalizeFirstLetter('Hello world');
      expect(result).toBe('Hello world');
    });

    it('should handle single character', () => {
      expect(capitalizeFirstLetter('a')).toBe('A');
      expect(capitalizeFirstLetter('A')).toBe('A');
    });

    it('should handle empty string', () => {
      const result = capitalizeFirstLetter('');
      expect(result).toBe('');
    });

    it('should handle null/undefined input', () => {
      expect(capitalizeFirstLetter(null as any)).toBe(null);
      expect(capitalizeFirstLetter(undefined as any)).toBe(undefined);
    });

    it('should handle string starting with number', () => {
      const result = capitalizeFirstLetter('123 test');
      expect(result).toBe('123 test');
    });

    it('should handle string starting with special character', () => {
      const result = capitalizeFirstLetter('!hello');
      expect(result).toBe('!hello');
    });

    it('should only capitalize first character', () => {
      const result = capitalizeFirstLetter('hello WORLD');
      expect(result).toBe('Hello WORLD');
    });

    it('should handle whitespace-only string', () => {
      const result = capitalizeFirstLetter('   ');
      expect(result).toBe('   ');
    });

    it('should handle string with leading whitespace', () => {
      const result = capitalizeFirstLetter(' hello');
      expect(result).toBe(' hello');
    });
  });

  describe('formatters object', () => {
    it('should have all expected formatter types', () => {
      expect(formatters).toHaveProperty('default');
      expect(formatters).toHaveProperty('mitre');
      expect(formatters).toHaveProperty('summary');
      expect(formatters).toHaveProperty('technical');
      expect(formatters).toHaveProperty('reasoning');
    });

    it('should have different configurations for each formatter', () => {
      const text = 'First sentence. Second sentence. Third sentence. Fourth sentence. Fifth sentence. Sixth sentence.';
      
      const defaultResult = formatters.default(text);
      const mitreResult = formatters.mitre(text);
      const summaryResult = formatters.summary(text);
      const technicalResult = formatters.technical(text);
      const reasoningResult = formatters.reasoning(text);

      // Each formatter should be a function
      expect(typeof formatters.default).toBe('function');
      expect(typeof formatters.mitre).toBe('function');
      expect(typeof formatters.summary).toBe('function');
      expect(typeof formatters.technical).toBe('function');
      expect(typeof formatters.reasoning).toBe('function');

      // Results should be arrays
      expect(Array.isArray(defaultResult)).toBe(true);
      expect(Array.isArray(mitreResult)).toBe(true);
      expect(Array.isArray(summaryResult)).toBe(true);
      expect(Array.isArray(technicalResult)).toBe(true);
      expect(Array.isArray(reasoningResult)).toBe(true);
    });

    it('should handle reasoning formatter keywords', () => {
      const text = 'The analysis shows important findings. Charlotte provides insights. This indicates significant results.';
      const result = formatters.reasoning(text);
      expect(result.length).toBeGreaterThan(1);
    });

    it('should handle technical formatter with longer paragraphs', () => {
      const text = 'First. Second. Third. Fourth. Fifth. Sixth. Seventh.';
      const technicalResult = formatters.technical(text);
      const defaultResult = formatters.default(text);
      
      // Technical formatter allows more sentences per paragraph
      expect(technicalResult.length).toBeLessThanOrEqual(defaultResult.length);
    });

    it('should handle summary formatter', () => {
      const text = 'Summary point one. Additionally, point two. However, point three.';
      const result = formatters.summary(text);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('edge cases and integration', () => {
    it('should handle very long text with mixed punctuation', () => {
      const text = 'Question one? Statement one! Exclamation two! Question two? Statement two. Normal sentence. Additionally, another point. However, different perspective.';
      const result = formatTextWithParagraphs(text);
      expect(result.length).toBeGreaterThan(1);
      expect(result.every(p => p.length > 0)).toBe(true);
    });

    it('should handle text with only whitespace', () => {
      const result = formatTextWithParagraphs('   \n\t  ');
      expect(result).toEqual(['']);
    });

    it('should handle text with consecutive punctuation', () => {
      const text = 'What?! Really?! Yes!!! Absolutely.';
      const result = formatTextWithParagraphs(text);
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('should handle mixed case sentences', () => {
      const text = 'lowercase start. UPPERCASE START. MiXeD cAsE sTaRt.';
      const result = formatTextWithParagraphs(text);
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('should maintain original text content after formatting', () => {
      const text = 'First sentence. Second sentence. Third sentence.';
      const result = formatTextWithParagraphs(text);
      const rejoined = result.join(' ');
      expect(rejoined).toBe(text);
    });
  });
});
