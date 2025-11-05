import { describe, expect, it } from 'vitest';
import { formatSecurityText, needsFormatting } from '../universalFormatting';

describe('universalFormatting', () => {
  describe('formatSecurityText', () => {
    const sampleText = 'First sentence. Second sentence. Third sentence. Fourth sentence.';

    describe('input validation', () => {
      it('should handle null input', () => {
        const result = formatSecurityText(null as unknown as string);
        expect(result).toEqual([]);
      });

      it('should handle undefined input', () => {
        const result = formatSecurityText(undefined as unknown as string);
        expect(result).toEqual([]);
      });

      it('should handle empty string', () => {
        const result = formatSecurityText('');
        expect(result).toEqual([]);
      });

      it('should handle non-string input', () => {
        const result = formatSecurityText(123 as unknown as string);
        expect(result).toEqual([]);
      });

      it('should handle whitespace-only input', () => {
        const result = formatSecurityText('   \n  \t  ');
        // Whitespace is normalized to empty string, which is still in array
        expect(result).toEqual(['']);
      });
    });

    describe('type: mitre', () => {
      it('should format MITRE descriptions', () => {
        const result = formatSecurityText(sampleText, 'mitre');
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
      });

      it('should use MITRE-specific paragraph breaking', () => {
        const text = 'Initial description. Attackers use this method. More details.';
        const result = formatSecurityText(text, 'mitre');
        expect(result.length).toBeGreaterThan(1);
      });

      it('should handle short MITRE text', () => {
        const text = 'Single MITRE sentence.';
        const result = formatSecurityText(text, 'mitre');
        expect(result).toEqual([text]);
      });
    });

    describe('type: summary', () => {
      it('should format summary text', () => {
        const result = formatSecurityText(sampleText, 'summary');
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
      });

      it('should use summary-specific paragraph breaking', () => {
        const text = 'First. Second. Third. Additionally, fourth. Fifth. Sixth.';
        const result = formatSecurityText(text, 'summary');
        expect(result.length).toBeGreaterThan(0);
      });

      it('should handle short summary', () => {
        const text = 'Brief summary. Just two sentences. End.';
        const result = formatSecurityText(text, 'summary');
        expect(result).toEqual([text]);
      });
    });

    describe('type: technical', () => {
      it('should format technical text', () => {
        const result = formatSecurityText(sampleText, 'technical');
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
      });

      it('should use technical-specific paragraph breaking', () => {
        const text = 'Data point one. Data point two. The analysis shows patterns. More data.';
        const result = formatSecurityText(text, 'technical');
        expect(result.length).toBeGreaterThan(0);
      });

      it('should handle short technical text', () => {
        const text = 'One. Two. Three. Four.';
        const result = formatSecurityText(text, 'technical');
        expect(result).toEqual([text]);
      });
    });

    describe('type: reasoning', () => {
      it('should format reasoning text', () => {
        const result = formatSecurityText(sampleText, 'reasoning');
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
      });

      it('should use reasoning-specific paragraph breaking', () => {
        const text =
          'Initial assessment. The analysis shows risk. Based on the evidence we conclude.';
        const result = formatSecurityText(text, 'reasoning');
        expect(result.length).toBeGreaterThan(1);
      });

      it('should handle short reasoning', () => {
        const text = 'Single reasoning sentence.';
        const result = formatSecurityText(text, 'reasoning');
        expect(result).toEqual([text]);
      });
    });

    describe('type: recommendation', () => {
      it('should format recommendation text', () => {
        const result = formatSecurityText(sampleText, 'recommendation');
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
      });

      it('should use default paragraph breaking for recommendations', () => {
        const text = 'First recommendation. Second recommendation. Third recommendation.';
        const result = formatSecurityText(text, 'recommendation');
        expect(result.length).toBeGreaterThan(0);
      });

      it('should handle short recommendation', () => {
        const text = 'Brief recommendation. Second point.';
        const result = formatSecurityText(text, 'recommendation');
        expect(result).toEqual([text]);
      });
    });

    describe('default type', () => {
      it('should use default formatting when type not specified', () => {
        const result = formatSecurityText(sampleText);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
      });

      it('should use default formatting for invalid type', () => {
        const result = formatSecurityText(
          sampleText,
          'invalid' as unknown as
            | 'summary'
            | 'technical'
            | 'reasoning'
            | 'recommendation'
            | 'mitre',
        );
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      });
    });

    describe('integration with formatters', () => {
      it('should preserve whitespace normalization', () => {
        const text = 'First  sentence.   Second   sentence.   Third sentence.';
        const result = formatSecurityText(text, 'technical');
        expect(result[0]).not.toContain('  ');
      });

      it('should handle mixed punctuation', () => {
        const text = 'Is this working? Yes! It works. Great success.';
        const result = formatSecurityText(text, 'summary');
        expect(result.length).toBeGreaterThan(0);
      });

      it('should preserve unicode characters', () => {
        const text = 'First sentence with émojis 😀. Second sentence with ñ character.';
        const result = formatSecurityText(text, 'mitre');
        expect(result[0]).toContain('😀');
        expect(result[0]).toContain('ñ');
      });
    });
  });

  describe('needsFormatting', () => {
    describe('returns false', () => {
      it('should return false for null', () => {
        expect(needsFormatting(null as unknown as string)).toBe(false);
      });

      it('should return false for undefined', () => {
        expect(needsFormatting(undefined as unknown as string)).toBe(false);
      });

      it('should return false for empty string', () => {
        expect(needsFormatting('')).toBe(false);
      });

      it('should return false for non-string input', () => {
        expect(needsFormatting(123 as unknown as string)).toBe(false);
      });

      it('should return false for whitespace-only', () => {
        expect(needsFormatting('   \n  \t  ')).toBe(false);
      });

      it('should return false for single sentence', () => {
        expect(needsFormatting('This is a single sentence.')).toBe(false);
      });

      it('should return false for two sentences', () => {
        expect(needsFormatting('First sentence. Second sentence.')).toBe(false);
      });

      it('should return false for text with punctuation but short content', () => {
        expect(needsFormatting('Short. Text.')).toBe(false);
      });

      it('should return false for question mark only', () => {
        expect(needsFormatting('Is this a question?')).toBe(false);
      });

      it('should return false for exclamation mark only', () => {
        expect(needsFormatting('This is exciting!')).toBe(false);
      });
    });

    describe('returns true', () => {
      it('should return true for three sentences with periods', () => {
        expect(needsFormatting('First sentence. Second sentence. Third sentence.')).toBe(true);
      });

      it('should return true for four sentences', () => {
        expect(needsFormatting('First. Second. Third. Fourth.')).toBe(true);
      });

      it('should return true for mixed punctuation with 3+ sentences', () => {
        expect(needsFormatting('First sentence. Is this working? Yes it is!')).toBe(true);
      });

      it('should return true for sentences with question marks', () => {
        expect(needsFormatting('First question? Second question? Third question?')).toBe(true);
      });

      it('should return true for sentences with exclamation marks', () => {
        expect(needsFormatting('First! Second! Third!')).toBe(true);
      });

      it('should return true for long technical text', () => {
        const text =
          'The analysis reveals multiple indicators. Several patterns emerged. Key findings suggest. Further investigation required.';
        expect(needsFormatting(text)).toBe(true);
      });

      it('should return true for security analysis text', () => {
        const text =
          'Malicious activity detected. IOCs identified. Threat level elevated. Immediate action recommended.';
        expect(needsFormatting(text)).toBe(true);
      });
    });

    describe('edge cases', () => {
      it('should handle text with periods but no content after', () => {
        expect(needsFormatting('Text with period. . .')).toBe(false);
      });

      it('should handle text with trailing punctuation', () => {
        expect(needsFormatting('First sentence. Second sentence...')).toBe(false);
      });

      it('should handle abbreviations correctly', () => {
        // Simple regex counts periods, so this counts as 3 "sentences"
        expect(needsFormatting('Dr. Smith works at St. Hospital.')).toBe(true);
      });

      it('should handle decimal numbers', () => {
        // Simple regex counts periods, so decimals count as "sentences"
        expect(needsFormatting('The value is 3.14 and 2.5 meters.')).toBe(true);
      });

      it('should count actual sentences correctly', () => {
        const text = 'Value is 3.14. Second sentence. Third sentence.';
        expect(needsFormatting(text)).toBe(true);
      });

      it('should handle empty sentences between punctuation', () => {
        expect(needsFormatting('First. . . Second. Third.')).toBe(true);
      });

      it('should handle newlines and tabs', () => {
        const text = 'First sentence.\nSecond sentence.\tThird sentence.';
        expect(needsFormatting(text)).toBe(true);
      });
    });
  });
});
