import { describe, expect, it } from 'vitest';
import { formatMitreDescription, formatTextWithParagraphs, formatters } from '../textFormatting';

describe('textFormatting', () => {
  describe('formatTextWithParagraphs (default formatter)', () => {
    it('should handle null input', () => {
      const result = formatTextWithParagraphs(null as any);
      expect(result).toEqual([]);
    });

    it('should handle undefined input', () => {
      const result = formatTextWithParagraphs(undefined as any);
      expect(result).toEqual([]);
    });

    it('should handle empty string', () => {
      const result = formatTextWithParagraphs('');
      expect(result).toEqual([]);
    });

    it('should handle non-string input', () => {
      const result = formatTextWithParagraphs(123 as any);
      expect(result).toEqual([]);
    });

    it('should handle whitespace-only input', () => {
      const result = formatTextWithParagraphs('   \n  \t  ');
      // Whitespace is normalized to empty string, which is still in array
      expect(result).toEqual(['']);
    });

    it('should return single paragraph for short text (≤2 sentences)', () => {
      const text = 'This is a short text. It has only two sentences.';
      const result = formatTextWithParagraphs(text);
      expect(result).toEqual([text]);
    });

    it('should return single paragraph for single sentence', () => {
      const text = 'This is just one sentence.';
      const result = formatTextWithParagraphs(text);
      expect(result).toEqual([text]);
    });

    it('should normalize whitespace', () => {
      const text = 'This  has   multiple    spaces. And   extra  whitespace.';
      const result = formatTextWithParagraphs(text);
      expect(result[0]).toBe('This has multiple spaces. And extra whitespace.');
    });

    it('should split sentences correctly on period', () => {
      const text = 'First sentence. Second sentence. Third sentence. Fourth sentence.';
      const result = formatTextWithParagraphs(text);
      expect(result.length).toBeGreaterThan(1);
    });

    it('should split sentences correctly on exclamation mark', () => {
      const text = 'First sentence! Second sentence! Third sentence! Fourth sentence!';
      const result = formatTextWithParagraphs(text);
      expect(result.length).toBeGreaterThan(1);
    });

    it('should split sentences correctly on question mark', () => {
      const text = 'First sentence? Second sentence? Third sentence? Fourth sentence?';
      const result = formatTextWithParagraphs(text);
      expect(result.length).toBeGreaterThan(1);
    });

    it('should break paragraphs at max 3 sentences', () => {
      const text =
        'First sentence. Second sentence. Third sentence. Fourth sentence. Fifth sentence. Sixth sentence.';
      const result = formatTextWithParagraphs(text);
      expect(result.length).toBe(2);
      expect(result[0]).toBe('First sentence. Second sentence. Third sentence.');
      expect(result[1]).toBe('Fourth sentence. Fifth sentence. Sixth sentence.');
    });

    it('should break on keyword "Additionally"', () => {
      const text = 'First sentence. Additionally, second sentence. Third sentence.';
      const result = formatTextWithParagraphs(text);
      // Keyword triggers break after the sentence containing it
      expect(result.length).toBe(2);
      expect(result[0]).toBe('First sentence. Additionally, second sentence.');
      expect(result[1]).toBe('Third sentence.');
    });

    it('should break on keyword "Furthermore"', () => {
      const text = 'First sentence. Furthermore, second sentence. Third sentence.';
      const result = formatTextWithParagraphs(text);
      // Keyword triggers break after the sentence containing it
      expect(result.length).toBe(2);
      expect(result[0]).toBe('First sentence. Furthermore, second sentence.');
      expect(result[1]).toBe('Third sentence.');
    });

    it('should break on keyword "However"', () => {
      const text = 'First sentence. However, second sentence. Third sentence.';
      const result = formatTextWithParagraphs(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "This technique"', () => {
      const text = 'First sentence. This technique is used. Third sentence.';
      const result = formatTextWithParagraphs(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "Attackers"', () => {
      const text = 'First sentence. Attackers use this method. Third sentence.';
      const result = formatTextWithParagraphs(text);
      expect(result.length).toBe(2);
    });

    it('should not break on keyword in last sentence', () => {
      const text = 'First sentence. Second sentence. Additionally, third sentence.';
      const result = formatTextWithParagraphs(text);
      // Should be 1 paragraph since keyword is in last sentence
      expect(result.length).toBe(1);
    });

    it('should filter out empty paragraphs', () => {
      const text = 'First sentence. Second sentence. Third sentence.';
      const result = formatTextWithParagraphs(text);
      expect(result.every((p) => p.length > 0)).toBe(true);
    });

    it('should preserve sentence punctuation', () => {
      const text = 'Is this working? Yes it is! Great success.';
      const result = formatTextWithParagraphs(text);
      expect(result[0]).toContain('?');
      expect(result[0]).toContain('!');
    });

    it('should handle text without capital letters after punctuation', () => {
      const text = 'First sentence. second sentence starts lowercase.';
      const result = formatTextWithParagraphs(text);
      // Won't split because lowercase after period
      expect(result.length).toBe(1);
    });
  });

  describe('formatMitreDescription (mitre formatter)', () => {
    it('should handle short MITRE text (≤1 sentence)', () => {
      const text = 'This is a single MITRE technique description.';
      const result = formatMitreDescription(text);
      expect(result).toEqual([text]);
    });

    it('should break at max 2 sentences', () => {
      const text = 'First sentence. Second sentence. Third sentence. Fourth sentence.';
      const result = formatMitreDescription(text);
      expect(result.length).toBe(2);
      expect(result[0]).toBe('First sentence. Second sentence.');
      expect(result[1]).toBe('Third sentence. Fourth sentence.');
    });

    it('should break on technical keyword "This technique"', () => {
      const text = 'Initial description. This technique involves malware. More details.';
      const result = formatMitreDescription(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "Attackers"', () => {
      const text = 'Initial description. Attackers use this method. More details.';
      const result = formatMitreDescription(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "Adversaries"', () => {
      const text = 'Initial description. Adversaries employ this tactic. More details.';
      const result = formatMitreDescription(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "The malware"', () => {
      const text = 'Initial description. The malware executes code. More details.';
      const result = formatMitreDescription(text);
      expect(result.length).toBe(2);
    });

    it('should break on platform keyword "Windows"', () => {
      const text = 'Initial description. Windows systems are affected. More details.';
      const result = formatMitreDescription(text);
      expect(result.length).toBe(2);
    });

    it('should break on platform keyword "Linux"', () => {
      const text = 'Initial description. Linux systems are targeted. More details.';
      const result = formatMitreDescription(text);
      expect(result.length).toBe(2);
    });

    it('should break on platform keyword "macOS"', () => {
      const text = 'Initial description. macOS security is compromised. More details.';
      const result = formatMitreDescription(text);
      expect(result.length).toBe(2);
    });

    it('should break on technical keyword "executed"', () => {
      const text = 'Initial description. Commands are executed remotely. More details.';
      const result = formatMitreDescription(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "registry"', () => {
      const text = 'Initial description. Registry keys are modified. More details.';
      const result = formatMitreDescription(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "file system"', () => {
      const text = 'Initial description. File system access is gained. More details.';
      const result = formatMitreDescription(text);
      expect(result.length).toBe(2);
    });

    it('should handle multiple keywords in sequence', () => {
      const text =
        'Initial description. Attackers use Windows registry. The malware executes code. More details.';
      const result = formatMitreDescription(text);
      expect(result.length).toBeGreaterThan(1);
    });
  });

  describe('formatters.summary', () => {
    it('should handle short summary text (≤3 sentences)', () => {
      const text = 'First sentence. Second sentence. Third sentence.';
      const result = formatters.summary(text);
      expect(result).toEqual([text]);
    });

    it('should break at max 3 sentences per paragraph', () => {
      const text = 'First. Second. Third. Fourth. Fifth. Sixth. Seventh.';
      const result = formatters.summary(text);
      expect(result.length).toBeGreaterThan(1);
    });

    it('should break on keyword "Additionally"', () => {
      const text =
        'First sentence. Second sentence. Additionally, third sentence. Fourth sentence.';
      const result = formatters.summary(text);
      expect(result.length).toBe(2);
    });
  });

  describe('formatters.technical', () => {
    it('should handle short technical text (≤4 sentences)', () => {
      const text = 'First. Second. Third. Fourth.';
      const result = formatters.technical(text);
      expect(result).toEqual([text]);
    });

    it('should break at max 5 sentences per paragraph', () => {
      const text = 'First. Second. Third. Fourth. Fifth. Sixth. Seventh. Eighth.';
      const result = formatters.technical(text);
      expect(result.length).toBeGreaterThan(1);
    });

    it('should break on keyword "The analysis"', () => {
      const text =
        'Initial finding. The analysis shows malicious activity. More details. Fourth sentence. Fifth sentence.';
      const result = formatters.technical(text);
      // Technical formatter has shortTextThreshold of 4, needs more sentences
      expect(result.length).toBeGreaterThan(1);
    });

    it('should break on keyword "This indicates"', () => {
      const text = 'Initial data. This indicates a security breach. More details. Fourth. Fifth.';
      const result = formatters.technical(text);
      // Technical formatter has shortTextThreshold of 4, needs more sentences
      expect(result.length).toBeGreaterThan(1);
    });

    it('should break on keyword "Based on"', () => {
      const text = 'Initial data. Based on evidence we conclude. More details. Fourth. Fifth.';
      const result = formatters.technical(text);
      // Technical formatter has shortTextThreshold of 4, needs more sentences
      expect(result.length).toBeGreaterThan(1);
    });
  });

  describe('formatters.reasoning', () => {
    it('should handle short reasoning text (≤1 sentence)', () => {
      const text = 'This is the reasoning behind the decision.';
      const result = formatters.reasoning(text);
      expect(result).toEqual([text]);
    });

    it('should break at max 2 sentences per paragraph', () => {
      const text = 'First. Second. Third. Fourth.';
      const result = formatters.reasoning(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "The analysis"', () => {
      const text = 'Initial assessment. The analysis reveals patterns. Conclusion.';
      const result = formatters.reasoning(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "This assessment"', () => {
      const text = 'Initial data. This assessment shows risks. Conclusion.';
      const result = formatters.reasoning(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "Based on the"', () => {
      const text = 'Initial data. Based on the evidence we conclude. More details.';
      const result = formatters.reasoning(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "The evidence"', () => {
      const text = 'Initial data. The evidence suggests compromise. Conclusion.';
      const result = formatters.reasoning(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "Charlotte"', () => {
      const text = 'Initial data. Charlotte analyzed the threat. Conclusion.';
      const result = formatters.reasoning(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "probability"', () => {
      const text = 'Initial data. The probability is high. Conclusion.';
      const result = formatters.reasoning(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "likelihood"', () => {
      const text = 'Initial data. The likelihood increases. Conclusion.';
      const result = formatters.reasoning(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "confidence level"', () => {
      const text = 'Initial data. The confidence level is high. Conclusion.';
      const result = formatters.reasoning(text);
      expect(result.length).toBe(2);
    });

    it('should break on keyword "methodology"', () => {
      const text = 'Initial data. Our methodology ensures accuracy. Conclusion.';
      const result = formatters.reasoning(text);
      expect(result.length).toBe(2);
    });
  });

  describe('edge cases', () => {
    it('should handle text with no sentence-ending punctuation', () => {
      const text = 'This text has no punctuation marks';
      const result = formatTextWithParagraphs(text);
      expect(result).toEqual([text]);
    });

    it('should handle text with multiple spaces between sentences', () => {
      const text = 'First sentence.    Second sentence.    Third sentence.';
      const result = formatTextWithParagraphs(text);
      expect(result[0]).not.toContain('    ');
    });

    it('should handle text with tabs and newlines', () => {
      const text = 'First sentence.\t\nSecond sentence.\n\tThird sentence.';
      const result = formatTextWithParagraphs(text);
      expect(result[0]).not.toContain('\t');
      expect(result[0]).not.toContain('\n');
    });

    it('should handle very long single sentence', () => {
      const text =
        'This is a very long sentence that goes on and on without any punctuation to break it up into smaller pieces.';
      const result = formatTextWithParagraphs(text);
      expect(result).toEqual([text]);
    });

    it('should handle text with abbreviations', () => {
      const text = 'Dr. Smith works at St. Mary Hospital. He is very skilled.';
      const result = formatTextWithParagraphs(text);
      // Splits on "Hospital. He" because of capital H
      expect(result.length).toBe(2);
    });

    it('should handle unicode characters', () => {
      const text = 'First sentence with émojis 😀. Second sentence with ñ character.';
      const result = formatTextWithParagraphs(text);
      expect(result[0]).toContain('😀');
      expect(result[0]).toContain('ñ');
    });

    it('should handle mixed punctuation', () => {
      const text = 'Is this working? Yes! It works. Great success.';
      const result = formatTextWithParagraphs(text);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('formatter exports', () => {
    it('should export formatTextWithParagraphs', () => {
      expect(formatTextWithParagraphs).toBeDefined();
      expect(typeof formatTextWithParagraphs).toBe('function');
    });

    it('should export formatMitreDescription', () => {
      expect(formatMitreDescription).toBeDefined();
      expect(typeof formatMitreDescription).toBe('function');
    });

    it('should export formatters object', () => {
      expect(formatters).toBeDefined();
      expect(formatters).toHaveProperty('default');
      expect(formatters).toHaveProperty('mitre');
      expect(formatters).toHaveProperty('summary');
      expect(formatters).toHaveProperty('technical');
      expect(formatters).toHaveProperty('reasoning');
    });

    it('should have all formatters as functions', () => {
      expect(typeof formatters.default).toBe('function');
      expect(typeof formatters.mitre).toBe('function');
      expect(typeof formatters.summary).toBe('function');
      expect(typeof formatters.technical).toBe('function');
      expect(typeof formatters.reasoning).toBe('function');
    });
  });
});
