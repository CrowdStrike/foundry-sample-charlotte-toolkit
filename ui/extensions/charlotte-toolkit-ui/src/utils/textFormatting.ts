// Unified text formatting utilities for improving readability

interface ParagraphBreakerOptions {
  maxSentencesPerParagraph: number;
  shortTextThreshold: number;
  breakKeywords: string[];
  aggressiveBreaking?: boolean;
}

/**
 * Core paragraph breaking engine - unified logic for all formatting types
 */
const createParagraphBreaker = (options: ParagraphBreakerOptions) => {
  return (text: string): string[] => {
    if (!text || typeof text !== 'string') {
      return [];
    }

    // Normalize whitespace for consistent processing
    const cleanText = text.replace(/\s+/g, ' ').trim();

    // Split on sentence boundaries (. ! ?) followed by space and capital letter
    const sentences = cleanText
      .split(/(?<=[.!?])\s+(?=[A-Z])/)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 0);

    // Short text handling
    if (sentences.length <= options.shortTextThreshold) {
      return [cleanText];
    }

    const paragraphs: string[] = [];
    let currentParagraph: string[] = [];

    sentences.forEach((sentence, index) => {
      currentParagraph.push(sentence);

      // Determine if we should break paragraph
      const atMaxLength = currentParagraph.length >= options.maxSentencesPerParagraph;
      const isLastSentence = index === sentences.length - 1;
      const hasKeywordBreak =
        options.aggressiveBreaking &&
        currentParagraph.length > 0 &&
        index < sentences.length - 1 &&
        options.breakKeywords.some((keyword) => sentence.includes(keyword));

      const shouldBreak = atMaxLength || isLastSentence || hasKeywordBreak;

      if (shouldBreak) {
        paragraphs.push(currentParagraph.join(' '));
        currentParagraph = [];
      }
    });

    return paragraphs.filter((p) => p.length > 0);
  };
};

// Predefined formatter configurations
const formatters = {
  default: createParagraphBreaker({
    maxSentencesPerParagraph: 3,
    shortTextThreshold: 2,
    breakKeywords: ['Additionally', 'Furthermore', 'However', 'This technique', 'Attackers'],
    aggressiveBreaking: true,
  }),

  mitre: createParagraphBreaker({
    maxSentencesPerParagraph: 2,
    shortTextThreshold: 1,
    breakKeywords: [
      // Technical transition indicators
      'This technique',
      'Attackers',
      'Adversaries',
      'The malware',
      'Additionally',
      'Furthermore',
      'However',
      'For example',
      'In some cases',
      'Common methods',
      'Detection methods',
      'Mitigation strategies',
      // Technical process indicators
      'executed',
      'implemented',
      'utilized',
      'performed',
      // Platform/system indicators
      'Windows',
      'Linux',
      'macOS',
      'registry',
      'file system',
      'network',
      'process',
    ],
    aggressiveBreaking: true,
  }),

  summary: createParagraphBreaker({
    maxSentencesPerParagraph: 3,
    shortTextThreshold: 3,
    breakKeywords: ['Additionally', 'However', 'Furthermore'],
    aggressiveBreaking: true,
  }),

  technical: createParagraphBreaker({
    maxSentencesPerParagraph: 5,
    shortTextThreshold: 4,
    breakKeywords: [
      'Additionally',
      'Furthermore',
      'However',
      'The analysis',
      'This indicates',
      'Based on',
    ],
    aggressiveBreaking: true,
  }),

  reasoning: createParagraphBreaker({
    maxSentencesPerParagraph: 2,
    shortTextThreshold: 1,
    breakKeywords: [
      // Core analytical transition phrases
      'The analysis',
      'This assessment',
      'Based on the',
      'The evidence',
      'However',
      'Additionally',
      'Furthermore',
      'Therefore',
      'In conclusion',
      'This indicates',
      'The reasoning',
      'Charlotte',
      'data sources',
      'analytical methods',
      'decision factors',
      'confidence level',
      'limitations',
      'assumptions',
      // Technical assessment indicators
      'probability',
      'likelihood',
      'assessment shows',
      'evaluation indicates',
      'analysis reveals',
      'findings suggest',
      'results demonstrate',
      'investigation',
      'methodology',
      'approach',
      'consideration',
      'factor',
      'criteria',
      'metric',
      'measurement',
      'validation',
      'verification',
    ],
    aggressiveBreaking: true,
  }),
};

// Public API - simplified function exports
export const formatTextWithParagraphs = formatters.default;
export const formatMitreDescription = formatters.mitre;

// Export formatters for use in universalFormatting.ts
export { formatters };
