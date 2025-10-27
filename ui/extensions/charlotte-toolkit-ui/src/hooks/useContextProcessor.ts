// src/hooks/useContextProcessor.ts

import { useMemo } from 'react';

import type {
  UseContextProcessorProps,
  UseContextProcessorResult,
} from '../types';
import { calculateEntityCounts, processAllEntities } from '../utils/context';

/**
 * Custom hook to process Falcon context data and extract available entities
 * Handles both incident and detection contexts
 *
 * This hook has been refactored to use utility functions for better maintainability.
 * The complex processing logic has been moved to contextProcessing.ts utilities.
 */
export const useContextProcessor = ({
  falconData,
}: UseContextProcessorProps): UseContextProcessorResult => {
  // Memoized context options to prevent unnecessary recalculation
  const availableContextOptions = useMemo(() => {
    return processAllEntities(falconData);
  }, [falconData]);

  // Calculate counts for each entity type
  const contextCounts = useMemo(() => {
    return calculateEntityCounts(availableContextOptions);
  }, [availableContextOptions]);

  return {
    availableContextOptions,
    contextCounts,
  };
};
