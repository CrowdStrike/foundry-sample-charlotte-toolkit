// src/utils/__tests__/universalFormatting.test.ts

import React from 'react';
import {
  formatSecurityText,
  needsFormatting,
  renderFormattedText,
} from '../universalFormatting';
import * as textFormatting from '../textFormatting';

// Mock React.createElement
jest.mock('react', () => ({
  createElement: jest.fn(),
}));

// Mock textFormatting module
jest.mock('../textFormatting', () => ({
  formatTextWithParagraphs: jest.fn(),
  formatMitreDescription: jest.fn(),
  formatters: {
    summary: jest.fn(),
    technical: jest.fn(),
    reasoning: jest.fn(),
  },
}));

const mockReact = React as jest.Mocked<typeof React>;
const mockTextFormatting = textFormatting as jest.Mocked<typeof textFormatting>;

describe('universalFormatting', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('formatSecurityText', () => {
    it('should handle empty input', () => {
      const result = formatSecurityText('');
      expect(result).toEqual([]);
    });

    it('should handle null/undefined input', () => {
      expect(formatSecurityText(null as any)).toEqual([]);
      expect(formatSecurityText(undefined as any)).toEqual([]);
    });

    it('should handle non-string input', () => {
      expect(formatSecurityText(123 as any)).toEqual([]);
    });

    it('should dispatch to formatMitreDescription for mitre type', () => {
      const text = 'MITRE technique description';
      mockTextFormatting.formatMitreDescription.mockReturnValue(['formatted']);
      
      const result = formatSecurityText(text, 'mitre');
      
      expect(mockTextFormatting.formatMitreDescription).toHaveBeenCalledWith(text);
      expect(result).toEqual(['formatted']);
    });

    it('should dispatch to summary formatter', () => {
      const text = 'Summary text';
      mockTextFormatting.formatters.summary.mockReturnValue(['summary']);
      
      const result = formatSecurityText(text, 'summary');
      
      expect(mockTextFormatting.formatters.summary).toHaveBeenCalledWith(text);
      expect(result).toEqual(['summary']);
    });

    it('should dispatch to technical formatter', () => {
      const text = 'Technical text';
      mockTextFormatting.formatters.technical.mockReturnValue(['technical']);
      
      const result = formatSecurityText(text, 'technical');
      
      expect(mockTextFormatting.formatters.technical).toHaveBeenCalledWith(text);
      expect(result).toEqual(['technical']);
    });

    it('should dispatch to reasoning formatter', () => {
      const text = 'Reasoning text';
      mockTextFormatting.formatters.reasoning.mockReturnValue(['reasoning']);
      
      const result = formatSecurityText(text, 'reasoning');
      
      expect(mockTextFormatting.formatters.reasoning).toHaveBeenCalledWith(text);
      expect(result).toEqual(['reasoning']);
    });

    it('should use formatTextWithParagraphs for recommendation type', () => {
      const text = 'Recommendation text';
      mockTextFormatting.formatTextWithParagraphs.mockReturnValue(['recommendation']);
      
      const result = formatSecurityText(text, 'recommendation');
      
      expect(mockTextFormatting.formatTextWithParagraphs).toHaveBeenCalledWith(text);
      expect(result).toEqual(['recommendation']);
    });

    it('should default to technical type when no type specified', () => {
      const text = 'Default text';
      mockTextFormatting.formatters.technical.mockReturnValue(['default']);
      
      const result = formatSecurityText(text);
      
      expect(mockTextFormatting.formatters.technical).toHaveBeenCalledWith(text);
      expect(result).toEqual(['default']);
    });

    it('should handle unknown type with formatTextWithParagraphs', () => {
      const text = 'Unknown type text';
      mockTextFormatting.formatTextWithParagraphs.mockReturnValue(['unknown']);
      
      const result = formatSecurityText(text, 'unknown' as any);
      
      expect(mockTextFormatting.formatTextWithParagraphs).toHaveBeenCalledWith(text);
      expect(result).toEqual(['unknown']);
    });
  });

  describe('needsFormatting', () => {
    it('should return false for empty text', () => {
      expect(needsFormatting('')).toBe(false);
    });

    it('should return false for null/undefined', () => {
      expect(needsFormatting(null as any)).toBe(false);
      expect(needsFormatting(undefined as any)).toBe(false);
    });

    it('should return false for non-string input', () => {
      expect(needsFormatting(123 as any)).toBe(false);
    });

    it('should return false for single sentence', () => {
      expect(needsFormatting('This is one sentence.')).toBe(false);
    });

    it('should return false for two sentences', () => {
      expect(needsFormatting('First sentence. Second sentence.')).toBe(false);
    });

    it('should return true for more than two sentences', () => {
      expect(needsFormatting('First. Second. Third.')).toBe(true);
    });

    it('should handle different punctuation marks', () => {
      expect(needsFormatting('First! Second? Third.')).toBe(true);
    });

    it('should ignore empty sentence fragments', () => {
      expect(needsFormatting('First. . Second.')).toBe(false);
    });

    it('should handle text with whitespace only fragments', () => {
      expect(needsFormatting('First.   . Second. Third.')).toBe(true);
    });
  });

  describe('renderFormattedText', () => {
    beforeEach(() => {
      mockReact.createElement.mockImplementation((type, props) => ({ type, props } as any));
    });

    it('should render formatted paragraphs as React elements', () => {
      mockTextFormatting.formatters.technical.mockReturnValue(['para1', 'para2']);
      
      const result = renderFormattedText('test text');
      
      expect(result).toHaveLength(2);
      expect(mockReact.createElement).toHaveBeenCalledTimes(2);
      expect(mockReact.createElement).toHaveBeenCalledWith('p', {
        key: 0,
        className: 'formatted-paragraph',
        dangerouslySetInnerHTML: { __html: 'para1' }
      });
      expect(mockReact.createElement).toHaveBeenCalledWith('p', {
        key: 1,
        className: 'formatted-paragraph',
        dangerouslySetInnerHTML: { __html: 'para2' }
      });
    });

    it('should handle custom className', () => {
      mockTextFormatting.formatters.summary.mockReturnValue(['para1']);
      
      renderFormattedText('test', 'summary', 'custom-class');
      
      expect(mockReact.createElement).toHaveBeenCalledWith('p', {
        key: 0,
        className: 'formatted-paragraph custom-class',
        dangerouslySetInnerHTML: { __html: 'para1' }
      });
    });

    it('should handle empty className', () => {
      mockTextFormatting.formatters.technical.mockReturnValue(['para1']);
      
      renderFormattedText('test', 'technical', '');
      
      expect(mockReact.createElement).toHaveBeenCalledWith('p', {
        key: 0,
        className: 'formatted-paragraph',
        dangerouslySetInnerHTML: { __html: 'para1' }
      });
    });

    it('should handle different text types', () => {
      mockTextFormatting.formatMitreDescription.mockReturnValue(['mitre-para']);
      
      renderFormattedText('mitre text', 'mitre');
      
      expect(mockTextFormatting.formatMitreDescription).toHaveBeenCalledWith('mitre text');
      expect(mockReact.createElement).toHaveBeenCalledWith('p', {
        key: 0,
        className: 'formatted-paragraph',
        dangerouslySetInnerHTML: { __html: 'mitre-para' }
      });
    });

    it('should handle empty paragraphs array', () => {
      mockTextFormatting.formatters.technical.mockReturnValue([]);
      
      const result = renderFormattedText('');
      
      expect(result).toEqual([]);
      expect(mockReact.createElement).not.toHaveBeenCalled();
    });

    it('should trim className properly', () => {
      mockTextFormatting.formatters.technical.mockReturnValue(['para1']);
      
      renderFormattedText('test', 'technical', '  spaced-class  ');
      
      expect(mockReact.createElement).toHaveBeenCalledWith('p', {
        key: 0,
        className: 'formatted-paragraph   spaced-class',
        dangerouslySetInnerHTML: { __html: 'para1' }
      });
    });
  });

  describe('Integration tests', () => {
    it('should work end-to-end for formatting and rendering', () => {
      mockTextFormatting.formatters.summary.mockReturnValue(['Summary paragraph']);
      mockReact.createElement.mockImplementation((type, props) => ({ type, props } as any));
      
      const formatted = formatSecurityText('Summary text', 'summary');
      const rendered = renderFormattedText('Summary text', 'summary', 'summary-class');
      
      expect(formatted).toEqual(['Summary paragraph']);
      expect(rendered).toHaveLength(1);
      expect(mockReact.createElement).toHaveBeenCalledWith('p', {
        key: 0,
        className: 'formatted-paragraph summary-class',
        dangerouslySetInnerHTML: { __html: 'Summary paragraph' }
      });
    });

    it('should handle complex text needing formatting', () => {
      const complexText = 'First sentence. Second sentence. Third sentence with details.';
      
      expect(needsFormatting(complexText)).toBe(true);
      
      mockTextFormatting.formatters.technical.mockReturnValue(['Para 1', 'Para 2']);
      const formatted = formatSecurityText(complexText, 'technical');
      
      expect(formatted).toEqual(['Para 1', 'Para 2']);
    });
  });
});
