// Universal formatting utilities for ALL security output sections
// Applies consistent paragraph breaks and readability improvements

import React, { type ReactElement } from 'react';
import { formatMitreDescription, formatTextWithParagraphs, formatters } from './textFormatting';

/**
 * Universal formatter for any text content in security analysis
 * Uses unified paragraph breaking system with optimized configurations
 */
export const formatSecurityText = (
  text: string,
  type: 'summary' | 'technical' | 'reasoning' | 'recommendation' | 'mitre' = 'technical',
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

  const sentenceCount = text.split(/[.!?]/).filter((s) => s.trim().length > 0).length;
  return sentenceCount > 2;
};

/**
 * Format text for display with proper paragraph structure
 * Returns JSX-ready elements
 */
export const renderFormattedText = (
  text: string,
  type: 'summary' | 'technical' | 'reasoning' | 'recommendation' | 'mitre' = 'technical',
  className = '',
): ReactElement[] => {
  const paragraphs = formatSecurityText(text, type);

  // biome-ignore lint/suspicious/noArrayIndexKey: Formatted paragraphs are static and don't reorder, index is safe as key
  return paragraphs.map((paragraph, index) =>
    React.createElement('p', {
      key: index,
      className: `formatted-paragraph ${className}`.trim(),
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Security analysis content is formatted text from trusted workflow output, not user input
      dangerouslySetInnerHTML: { __html: paragraph },
    }),
  );
};
