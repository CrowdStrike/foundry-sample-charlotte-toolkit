// src/hooks/useCopyManager.ts

import { useCallback } from 'react';

import {
  COPY_OPTIONS,
  formatForCopy,
  type CopyFormat,
} from '../utils/copyUtils';
import { parseStructuredResponse } from '../utils/security/iocUtils';

import { useCopyToClipboard } from './useCopyToClipboard';

interface UseCopyManagerProps {
  responseText: string;
  jsonContextData?: unknown;
}

interface UseCopyManagerReturn {
  copyState: 'clipboard' | 'check-circle';
  isSuccess: boolean;
  handleCopyFormat: (format: CopyFormat) => Promise<void>;
  copyOptions: typeof COPY_OPTIONS;
}

/**
 * Enhanced copy manager hook that integrates with useCopyToClipboard
 * Provides multi-format copy functionality for the Response tab
 */
export const useCopyManager = ({
  responseText,
  jsonContextData,
}: UseCopyManagerProps): UseCopyManagerReturn => {
  const { copyState, isSuccess, copyToClipboard } = useCopyToClipboard();

  // Handle copy operation for different formats
  const handleCopyFormat = useCallback(
    async (format: CopyFormat) => {
      // Always try to parse the response as structured JSON first
      const parsedJsonResponse = parseStructuredResponse(responseText);

      // Format the text for the selected copy format
      const textToCopy = formatForCopy(format, responseText, jsonContextData, parsedJsonResponse);

      // Use the shared copy hook for consistent visual feedback
      await copyToClipboard(textToCopy);
    },
    [responseText, jsonContextData, copyToClipboard]
  );

  return {
    copyState,
    isSuccess,
    handleCopyFormat,
    copyOptions: COPY_OPTIONS,
  };
};
