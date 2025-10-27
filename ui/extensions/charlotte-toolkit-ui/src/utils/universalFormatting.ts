// Universal formatting utilities for ALL security output sections
// Applies consistent paragraph breaks and readability improvements

import {
  formatMitreDescription,
  formatTextWithParagraphs,
  formatters,
} from './textFormatting';

/**
 * Universal formatter for any text content in security analysis
 * Uses unified paragraph breaking system with optimized configurations
 */
export const formatSecurityText = (
  text: string,
  type:
    | 'summary'
    | 'technical'
    | 'reasoning'
    | 'recommendation'
    | 'mitre' = 'technical',
): string[] => {
  if (!text || typeof text !== 'string') {
    return [];
  }

  switch (type) {
    case 'mitre':
      return formatMitreDescription(text);
    case 'summary':
      return formatters.summary(text);
    case 'technical':
      return formatters.technical(text);
    case 'reasoning':
      return formatters.reasoning(text);
    case 'recommendation':
      return formatTextWithParagraphs(text);
    default:
      return formatTextWithParagraphs(text);
  }
};

/**
 * Check if text needs formatting (has multiple sentences)
 */
export const needsFormatting = (text: string): boolean => {
  if (!text || typeof text !== 'string') return false;

  const sentenceCount = text
    .split(/[.!?]/)
    .filter((s) => s.trim().length > 0).length;
  return sentenceCount > 2;
};
