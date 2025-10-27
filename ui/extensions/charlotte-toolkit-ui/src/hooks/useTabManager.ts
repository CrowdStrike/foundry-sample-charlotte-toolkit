// src/hooks/useTabManager.ts

import { SlIcon } from '@shoelace-style/shoelace/dist/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type TabType = 'request' | 'response' | 'json';

interface UseTabManagerProps {
  hasSubmittedQuery: boolean;
  loading: boolean;
  errorMessage: string;
  responseText: string;
}

interface UseTabManagerReturn {
  activeTab: TabType;
  // biome-ignore lint/suspicious/noExplicitAny: Shoelace TabGroup ref type is not properly exported from the library
  tabGroupRef: React.RefObject<any>;
  handleTabChange: (e: CustomEvent) => void;
  setActiveTab: (tab: TabType) => void;
  getResponseTabIndicator: () => React.ReactNode;
}

/**
 * Custom hook to manage tab state and transitions
 * Extracted from Home.tsx for better separation of concerns
 */
export const useTabManager = ({
  hasSubmittedQuery,
  loading,
  errorMessage,
  responseText,
}: UseTabManagerProps): UseTabManagerReturn => {
  const [activeTab, setActiveTab] = useState<TabType>('request');
  // biome-ignore lint/suspicious/noExplicitAny: Shoelace TabGroup ref type is not properly exported from the library
  const tabGroupRef = useRef<any>(null);

  // Handle tab change events from Shoelace TabGroup
  const handleTabChange = useCallback((e: CustomEvent) => {
    setActiveTab(e.detail.name as TabType);
  }, []);

  // Programmatically switch tabs when activeTab state changes
  useEffect(() => {
    if (tabGroupRef.current && activeTab) {
      tabGroupRef.current.show(activeTab);
    }
  }, [activeTab]);

  // Generate response tab indicator icon based on current state
  const getResponseTabIndicator = useCallback((): React.ReactNode => {
    if (!hasSubmittedQuery) return null;

    if (loading) {
      return React.createElement(SlIcon, {
        name: 'hourglass-split',
        className: 'mr-2',
        style: { color: 'var(--cs-status-info)' },
      });
    }

    if (errorMessage) {
      return React.createElement(SlIcon, {
        name: 'exclamation-triangle',
        className: 'mr-2',
        style: { color: 'var(--cs-status-error)' },
      });
    }

    if (responseText) {
      return React.createElement(SlIcon, {
        name: 'check-circle',
        className: 'mr-2',
        style: { color: 'var(--cs-status-success)' },
      });
    }

    return null;
  }, [hasSubmittedQuery, loading, errorMessage, responseText]);

  return {
    activeTab,
    tabGroupRef,
    handleTabChange,
    setActiveTab,
    getResponseTabIndicator,
  };
};
