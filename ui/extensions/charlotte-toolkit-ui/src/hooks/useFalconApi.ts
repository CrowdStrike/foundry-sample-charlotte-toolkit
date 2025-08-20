// src/hooks/useFalconApi.ts
import FalconApi from '@crowdstrike/foundry-js';
import { useEffect, useMemo, useState } from 'react';

/**
 * Hook to initialize and provide access to the Falcon API
 * @returns Object containing falcon API instance and initialization state
 */
export function useFalconApi() {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const falcon = useMemo(() => new FalconApi(), []);

  const initializeFalcon = async () => {
    try {
      setError(null);
      setIsInitialized(false);
      await falcon.connect();
      setIsInitialized(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize Falcon API';
      // console.error('Failed to initialize Falcon API:', err);
      setError(errorMessage);
      setIsInitialized(false);
    }
  };

  useEffect(() => {
    initializeFalcon();
  }, [falcon]);

  return {
    falcon,
    isInitialized,
    error,
    retry: initializeFalcon
  };
}
