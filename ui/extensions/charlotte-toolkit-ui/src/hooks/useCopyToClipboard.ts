// src/hooks/useCopyToClipboard.ts

import { useState, useCallback } from 'react';

interface CopyToClipboardState {
  copyState: 'clipboard' | 'check-circle';
  isSuccess: boolean;
  copyToClipboard: (text: string, successDuration?: number) => Promise<void>;
}

/**
 * Shared hook for copy-to-clipboard functionality with visual feedback
 * Eliminates duplication across CodeBlock, InlineCode, and IOCDisplay components
 */
export const useCopyToClipboard = (): CopyToClipboardState => {
  const [copyState, setCopyState] = useState<'clipboard' | 'check-circle'>('clipboard');

  const copyToClipboard = useCallback(async (text: string, successDuration = 2000) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState('check-circle');
      
      setTimeout(() => {
        setCopyState('clipboard');
      }, successDuration);
    } catch {
      // Silent failure for copy operation - matches existing behavior
    }
  }, []);

  return {
    copyState,
    isSuccess: copyState === 'check-circle',
    copyToClipboard,
  };
};
