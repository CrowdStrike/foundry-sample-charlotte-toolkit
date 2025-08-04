// src/components/TruncatedText.tsx

import { SlTooltip } from '@shoelace-style/shoelace/dist/react';
import React from 'react';

interface TruncatedTextProps {
  originalText: string;
  displayText: string;
  children: React.ReactNode;
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';
}

/**
 * Conditionally wraps content with SlTooltip when text is truncated
 * Shows full text on hover when display text differs from original
 * Uses Shoelace's auto-placement system for optimal positioning
 */
export const TruncatedText: React.FC<TruncatedTextProps> = ({
  originalText,
  displayText,
  children,
  placement = 'top',
}) => {
  // Only show tooltip if content is actually truncated
  const isTruncated = originalText !== displayText;

  if (isTruncated) {
    return (
      <SlTooltip
        content={originalText}
        placement={placement}
        hoist
        className='truncated-text-tooltip'
        trigger='hover focus'
        distance={8}
      >
        {children}
      </SlTooltip>
    );
  }

  return <>{children}</>;
};

export default TruncatedText;
