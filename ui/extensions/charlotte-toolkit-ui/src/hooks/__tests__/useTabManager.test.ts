import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTabManager } from '../useTabManager';

// Type for SlIcon props we're testing
interface SlIconProps {
  name: string;
  style: {
    color: string;
    marginRight?: string;
  };
}

describe('useTabManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initialization', () => {
    it('should initialize with request tab active', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: false,
          loading: false,
          errorMessage: '',
          responseText: '',
        }),
      );

      expect(result.current.activeTab).toBe('request');
    });

    it('should provide tabGroupRef', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: false,
          loading: false,
          errorMessage: '',
          responseText: '',
        }),
      );

      expect(result.current.tabGroupRef).toBeDefined();
      expect(result.current.tabGroupRef.current).toBeNull();
    });

    it('should provide all required functions', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: false,
          loading: false,
          errorMessage: '',
          responseText: '',
        }),
      );

      expect(typeof result.current.handleTabChange).toBe('function');
      expect(typeof result.current.setActiveTab).toBe('function');
      expect(typeof result.current.getResponseTabIndicator).toBe('function');
    });
  });

  describe('handleTabChange', () => {
    it('should update active tab when handleTabChange is called', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: false,
          loading: false,
          errorMessage: '',
          responseText: '',
        }),
      );

      const mockEvent = new CustomEvent('sl-tab-show', {
        detail: { name: 'response' },
      });

      act(() => {
        result.current.handleTabChange(mockEvent);
      });

      expect(result.current.activeTab).toBe('response');
    });

    it('should handle json tab selection', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: false,
          loading: false,
          errorMessage: '',
          responseText: '',
        }),
      );

      const mockEvent = new CustomEvent('sl-tab-show', {
        detail: { name: 'json' },
      });

      act(() => {
        result.current.handleTabChange(mockEvent);
      });

      expect(result.current.activeTab).toBe('json');
    });

    it('should handle request tab selection', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: false,
          loading: false,
          errorMessage: '',
          responseText: '',
        }),
      );

      // First switch to another tab
      act(() => {
        result.current.handleTabChange(
          new CustomEvent('sl-tab-show', { detail: { name: 'response' } }),
        );
      });
      expect(result.current.activeTab).toBe('response');

      // Then switch back to request
      act(() => {
        result.current.handleTabChange(
          new CustomEvent('sl-tab-show', { detail: { name: 'request' } }),
        );
      });
      expect(result.current.activeTab).toBe('request');
    });
  });

  describe('setActiveTab', () => {
    it('should programmatically set active tab to response', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: false,
          loading: false,
          errorMessage: '',
          responseText: '',
        }),
      );

      act(() => {
        result.current.setActiveTab('response');
      });

      expect(result.current.activeTab).toBe('response');
    });

    it('should programmatically set active tab to json', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: false,
          loading: false,
          errorMessage: '',
          responseText: '',
        }),
      );

      act(() => {
        result.current.setActiveTab('json');
      });

      expect(result.current.activeTab).toBe('json');
    });

    it('should allow switching between tabs multiple times', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: false,
          loading: false,
          errorMessage: '',
          responseText: '',
        }),
      );

      act(() => {
        result.current.setActiveTab('response');
      });
      expect(result.current.activeTab).toBe('response');

      act(() => {
        result.current.setActiveTab('json');
      });
      expect(result.current.activeTab).toBe('json');

      act(() => {
        result.current.setActiveTab('request');
      });
      expect(result.current.activeTab).toBe('request');
    });
  });

  describe('getResponseTabIndicator', () => {
    it('should return null when hasSubmittedQuery is false', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: false,
          loading: false,
          errorMessage: '',
          responseText: '',
        }),
      );

      const indicator = result.current.getResponseTabIndicator();
      expect(indicator).toBeNull();
    });

    it('should return hourglass icon when loading', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: true,
          loading: true,
          errorMessage: '',
          responseText: '',
        }),
      );

      const indicator = result.current.getResponseTabIndicator();
      expect(indicator).not.toBeNull();
      expect(React.isValidElement(indicator)).toBe(true);

      // Check it's an SlIcon element
      if (indicator && React.isValidElement(indicator)) {
        expect(indicator.type).toBeDefined();
        expect((indicator.props as SlIconProps).name).toBe('hourglass-split');
        expect((indicator.props as SlIconProps).style.color).toBe('var(--cs-status-info)');
      }
    });

    it('should return error icon when errorMessage is present', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: 'An error occurred',
          responseText: '',
        }),
      );

      const indicator = result.current.getResponseTabIndicator();
      expect(indicator).not.toBeNull();
      expect(React.isValidElement(indicator)).toBe(true);

      if (indicator && React.isValidElement(indicator)) {
        expect((indicator.props as SlIconProps).name).toBe('exclamation-triangle');
        expect((indicator.props as SlIconProps).style.color).toBe('var(--cs-status-error)');
      }
    });

    it('should return success icon when responseText is present', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: '',
          responseText: 'Success response',
        }),
      );

      const indicator = result.current.getResponseTabIndicator();
      expect(indicator).not.toBeNull();
      expect(React.isValidElement(indicator)).toBe(true);

      if (indicator && React.isValidElement(indicator)) {
        expect((indicator.props as SlIconProps).name).toBe('check-circle');
        expect((indicator.props as SlIconProps).style.color).toBe('var(--cs-status-success)');
      }
    });

    it('should prioritize loading state over error', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: true,
          loading: true,
          errorMessage: 'Error',
          responseText: '',
        }),
      );

      const indicator = result.current.getResponseTabIndicator();

      if (indicator && React.isValidElement(indicator)) {
        expect((indicator.props as SlIconProps).name).toBe('hourglass-split');
      }
    });

    it('should prioritize error state over success', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: 'Error',
          responseText: 'Response',
        }),
      );

      const indicator = result.current.getResponseTabIndicator();

      if (indicator && React.isValidElement(indicator)) {
        expect((indicator.props as SlIconProps).name).toBe('exclamation-triangle');
      }
    });

    it('should return null when query submitted but no state change yet', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: '',
          responseText: '',
        }),
      );

      const indicator = result.current.getResponseTabIndicator();
      expect(indicator).toBeNull();
    });
  });

  describe('state transitions', () => {
    it('should update indicator from loading to success', () => {
      const { result, rerender } = renderHook((props) => useTabManager(props), {
        initialProps: {
          hasSubmittedQuery: true,
          loading: true,
          errorMessage: '',
          responseText: '',
        },
      });

      // Initially loading
      let indicator = result.current.getResponseTabIndicator();
      if (indicator && React.isValidElement(indicator)) {
        expect((indicator.props as SlIconProps).name).toBe('hourglass-split');
      }

      // Change to success
      rerender({
        hasSubmittedQuery: true,
        loading: false,
        errorMessage: '',
        responseText: 'Success!',
      });

      indicator = result.current.getResponseTabIndicator();
      if (indicator && React.isValidElement(indicator)) {
        expect((indicator.props as SlIconProps).name).toBe('check-circle');
      }
    });

    it('should update indicator from loading to error', () => {
      const { result, rerender } = renderHook((props) => useTabManager(props), {
        initialProps: {
          hasSubmittedQuery: true,
          loading: true,
          errorMessage: '',
          responseText: '',
        },
      });

      // Initially loading
      let indicator = result.current.getResponseTabIndicator();
      if (indicator && React.isValidElement(indicator)) {
        expect((indicator.props as SlIconProps).name).toBe('hourglass-split');
      }

      // Change to error
      rerender({
        hasSubmittedQuery: true,
        loading: false,
        errorMessage: 'Request failed',
        responseText: '',
      });

      indicator = result.current.getResponseTabIndicator();
      if (indicator && React.isValidElement(indicator)) {
        expect((indicator.props as SlIconProps).name).toBe('exclamation-triangle');
      }
    });
  });

  describe('edge cases', () => {
    it('should handle empty errorMessage string', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: '',
          responseText: 'Response',
        }),
      );

      const indicator = result.current.getResponseTabIndicator();
      if (indicator && React.isValidElement(indicator)) {
        expect((indicator.props as SlIconProps).name).toBe('check-circle');
      }
    });

    it('should handle whitespace-only errorMessage as truthy', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: '   ',
          responseText: 'Response',
        }),
      );

      const indicator = result.current.getResponseTabIndicator();
      // Whitespace string is truthy, so should show error
      if (indicator && React.isValidElement(indicator)) {
        expect((indicator.props as SlIconProps).name).toBe('exclamation-triangle');
      }
    });

    it('should handle very long errorMessage', () => {
      const longError = 'Error: '.repeat(1000);
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: longError,
          responseText: '',
        }),
      );

      const indicator = result.current.getResponseTabIndicator();
      if (indicator && React.isValidElement(indicator)) {
        expect((indicator.props as SlIconProps).name).toBe('exclamation-triangle');
      }
    });

    it('should handle very long responseText', () => {
      const longResponse = 'Response '.repeat(10000);
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: '',
          responseText: longResponse,
        }),
      );

      const indicator = result.current.getResponseTabIndicator();
      if (indicator && React.isValidElement(indicator)) {
        expect((indicator.props as SlIconProps).name).toBe('check-circle');
      }
    });
  });

  describe('return value structure', () => {
    it('should return all required properties', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: false,
          loading: false,
          errorMessage: '',
          responseText: '',
        }),
      );

      expect(result.current).toHaveProperty('activeTab');
      expect(result.current).toHaveProperty('tabGroupRef');
      expect(result.current).toHaveProperty('handleTabChange');
      expect(result.current).toHaveProperty('setActiveTab');
      expect(result.current).toHaveProperty('getResponseTabIndicator');
    });

    it('should return activeTab as valid TabType', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: false,
          loading: false,
          errorMessage: '',
          responseText: '',
        }),
      );

      expect(['request', 'response', 'json']).toContain(result.current.activeTab);
    });

    it('should return tabGroupRef as React ref object', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: false,
          loading: false,
          errorMessage: '',
          responseText: '',
        }),
      );

      expect(result.current.tabGroupRef).toHaveProperty('current');
    });
  });

  describe('memoization', () => {
    it('should memoize getResponseTabIndicator with same props', () => {
      const props = {
        hasSubmittedQuery: true,
        loading: false,
        errorMessage: '',
        responseText: 'test',
      };

      const { result, rerender } = renderHook((p) => useTabManager(p), { initialProps: props });

      const firstIndicator = result.current.getResponseTabIndicator;

      rerender(props);

      expect(result.current.getResponseTabIndicator).toBe(firstIndicator);
    });

    it('should create new getResponseTabIndicator when hasSubmittedQuery changes', () => {
      const { result, rerender } = renderHook((props) => useTabManager(props), {
        initialProps: {
          hasSubmittedQuery: false,
          loading: false,
          errorMessage: '',
          responseText: '',
        },
      });

      const firstIndicator = result.current.getResponseTabIndicator;

      rerender({
        hasSubmittedQuery: true,
        loading: false,
        errorMessage: '',
        responseText: '',
      });

      expect(result.current.getResponseTabIndicator).not.toBe(firstIndicator);
    });

    it('should create new getResponseTabIndicator when loading changes', () => {
      const { result, rerender } = renderHook((props) => useTabManager(props), {
        initialProps: {
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: '',
          responseText: '',
        },
      });

      const firstIndicator = result.current.getResponseTabIndicator;

      rerender({
        hasSubmittedQuery: true,
        loading: true,
        errorMessage: '',
        responseText: '',
      });

      expect(result.current.getResponseTabIndicator).not.toBe(firstIndicator);
    });

    it('should create new getResponseTabIndicator when errorMessage changes', () => {
      const { result, rerender } = renderHook((props) => useTabManager(props), {
        initialProps: {
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: '',
          responseText: '',
        },
      });

      const firstIndicator = result.current.getResponseTabIndicator;

      rerender({
        hasSubmittedQuery: true,
        loading: false,
        errorMessage: 'Error occurred',
        responseText: '',
      });

      expect(result.current.getResponseTabIndicator).not.toBe(firstIndicator);
    });

    it('should create new getResponseTabIndicator when responseText changes', () => {
      const { result, rerender } = renderHook((props) => useTabManager(props), {
        initialProps: {
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: '',
          responseText: '',
        },
      });

      const firstIndicator = result.current.getResponseTabIndicator;

      rerender({
        hasSubmittedQuery: true,
        loading: false,
        errorMessage: '',
        responseText: 'New response',
      });

      expect(result.current.getResponseTabIndicator).not.toBe(firstIndicator);
    });

    it('should memoize handleTabChange', () => {
      const props = {
        hasSubmittedQuery: false,
        loading: false,
        errorMessage: '',
        responseText: '',
      };

      const { result, rerender } = renderHook((p) => useTabManager(p), { initialProps: props });

      const firstHandler = result.current.handleTabChange;

      rerender(props);

      expect(result.current.handleTabChange).toBe(firstHandler);
    });
  });

  describe('indicator styling', () => {
    it('should apply correct styling to loading indicator', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: true,
          loading: true,
          errorMessage: '',
          responseText: '',
        }),
      );

      const indicator = result.current.getResponseTabIndicator();

      if (indicator && React.isValidElement(indicator)) {
        expect((indicator.props as SlIconProps).style).toEqual({
          color: 'var(--cs-status-info)',
          marginRight: 'var(--spacing-base)',
        });
      }
    });

    it('should apply correct styling to error indicator', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: 'Error',
          responseText: '',
        }),
      );

      const indicator = result.current.getResponseTabIndicator();

      if (indicator && React.isValidElement(indicator)) {
        expect((indicator.props as SlIconProps).style).toEqual({
          color: 'var(--cs-status-error)',
          marginRight: 'var(--spacing-base)',
        });
      }
    });

    it('should apply correct styling to success indicator', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: '',
          responseText: 'Success',
        }),
      );

      const indicator = result.current.getResponseTabIndicator();

      if (indicator && React.isValidElement(indicator)) {
        expect((indicator.props as SlIconProps).style).toEqual({
          color: 'var(--cs-status-success)',
          marginRight: 'var(--spacing-base)',
        });
      }
    });
  });
});
