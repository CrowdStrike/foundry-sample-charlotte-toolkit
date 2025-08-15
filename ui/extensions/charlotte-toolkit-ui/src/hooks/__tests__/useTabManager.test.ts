// src/hooks/__tests__/useTabManager.test.ts
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useTabManager } from '../useTabManager';

// Mock Shoelace components
jest.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlIcon: (props: any) => props,
}));

describe('useTabManager', () => {
  const defaultProps = {
    hasSubmittedQuery: false,
    loading: false,
    errorMessage: '',
    responseText: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should initialize with request tab active', () => {
      const { result } = renderHook(() => useTabManager(defaultProps));

      expect(result.current.activeTab).toBe('request');
    });

    it('should provide a tabGroupRef', () => {
      const { result } = renderHook(() => useTabManager(defaultProps));

      expect(result.current.tabGroupRef).toBeDefined();
      expect(result.current.tabGroupRef.current).toBeNull();
    });

    it('should provide all required functions', () => {
      const { result } = renderHook(() => useTabManager(defaultProps));

      expect(typeof result.current.handleTabChange).toBe('function');
      expect(typeof result.current.setActiveTab).toBe('function');
      expect(typeof result.current.getResponseTabIndicator).toBe('function');
    });
  });

  describe('setActiveTab functionality', () => {
    it('should update activeTab when setActiveTab is called', () => {
      const { result } = renderHook(() => useTabManager(defaultProps));

      act(() => {
        result.current.setActiveTab('response');
      });

      expect(result.current.activeTab).toBe('response');
    });

    it('should update activeTab to json', () => {
      const { result } = renderHook(() => useTabManager(defaultProps));

      act(() => {
        result.current.setActiveTab('json');
      });

      expect(result.current.activeTab).toBe('json');
    });

    it('should call tabGroupRef.show when activeTab changes and ref exists', () => {
      const mockShow = jest.fn();
      const { result } = renderHook(() => useTabManager(defaultProps));

      // Set up mock ref
      act(() => {
        result.current.tabGroupRef.current = { show: mockShow };
      });

      act(() => {
        result.current.setActiveTab('response');
      });

      expect(mockShow).toHaveBeenCalledWith('response');
    });

    it('should not call tabGroupRef.show when ref is null', () => {
      const { result } = renderHook(() => useTabManager(defaultProps));

      // Ensure ref is null
      expect(result.current.tabGroupRef.current).toBeNull();

      act(() => {
        result.current.setActiveTab('response');
      });

      // Should not throw an error
      expect(result.current.activeTab).toBe('response');
    });
  });

  describe('handleTabChange functionality', () => {
    it('should update activeTab when handleTabChange is called', () => {
      const { result } = renderHook(() => useTabManager(defaultProps));

      const mockEvent = {
        detail: { name: 'json' },
      } as CustomEvent;

      act(() => {
        result.current.handleTabChange(mockEvent);
      });

      expect(result.current.activeTab).toBe('json');
    });

    it('should handle different tab types in handleTabChange', () => {
      const { result } = renderHook(() => useTabManager(defaultProps));

      // Test response tab
      act(() => {
        result.current.handleTabChange({
          detail: { name: 'response' },
        } as CustomEvent);
      });
      expect(result.current.activeTab).toBe('response');

      // Test request tab
      act(() => {
        result.current.handleTabChange({
          detail: { name: 'request' },
        } as CustomEvent);
      });
      expect(result.current.activeTab).toBe('request');
    });

    it('should maintain function identity across re-renders', () => {
      const { result, rerender } = renderHook(() => useTabManager(defaultProps));

      const firstHandleTabChange = result.current.handleTabChange;
      rerender();
      const secondHandleTabChange = result.current.handleTabChange;

      expect(firstHandleTabChange).toBe(secondHandleTabChange);
    });
  });

  describe('getResponseTabIndicator functionality', () => {
    it('should return null when hasSubmittedQuery is false', () => {
      const { result } = renderHook(() => 
        useTabManager({ ...defaultProps, hasSubmittedQuery: false })
      );

      const indicator = result.current.getResponseTabIndicator();
      expect(indicator).toBeNull();
    });

    it('should return loading icon when loading is true', () => {
      const { result } = renderHook(() =>
        useTabManager({
          ...defaultProps,
          hasSubmittedQuery: true,
          loading: true,
        })
      );

      const indicator = result.current.getResponseTabIndicator();
      expect(indicator).not.toBeNull();
      expect(React.isValidElement(indicator)).toBe(true);
      
      // Check if it's the correct SlIcon element
      const element = indicator as any;
      expect(element.props.name).toBe('hourglass-split');
      expect(element.props.className).toBe('mr-2');
      expect(element.props.style.color).toBe('var(--cs-status-info)');
    });

    it('should return error icon when errorMessage exists', () => {
      const { result } = renderHook(() =>
        useTabManager({
          ...defaultProps,
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: 'Something went wrong',
        })
      );

      const indicator = result.current.getResponseTabIndicator();
      expect(indicator).not.toBeNull();
      expect(React.isValidElement(indicator)).toBe(true);
      
      const element = indicator as any;
      expect(element.props.name).toBe('exclamation-triangle');
      expect(element.props.className).toBe('mr-2');
      expect(element.props.style.color).toBe('var(--cs-status-error)');
    });

    it('should return success icon when responseText exists', () => {
      const { result } = renderHook(() =>
        useTabManager({
          ...defaultProps,
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: '',
          responseText: 'Some response data',
        })
      );

      const indicator = result.current.getResponseTabIndicator();
      expect(indicator).not.toBeNull();
      expect(React.isValidElement(indicator)).toBe(true);
      
      const element = indicator as any;
      expect(element.props.name).toBe('check-circle');
      expect(element.props.className).toBe('mr-2');
      expect(element.props.style.color).toBe('var(--cs-status-success)');
    });

    it('should prioritize error over success when both errorMessage and responseText exist', () => {
      const { result } = renderHook(() =>
        useTabManager({
          ...defaultProps,
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: 'Error occurred',
          responseText: 'Some response',
        })
      );

      const indicator = result.current.getResponseTabIndicator();
      const element = indicator as any;
      expect(element.props.name).toBe('exclamation-triangle');
    });

    it('should prioritize loading over error and success', () => {
      const { result } = renderHook(() =>
        useTabManager({
          ...defaultProps,
          hasSubmittedQuery: true,
          loading: true,
          errorMessage: 'Error occurred',
          responseText: 'Some response',
        })
      );

      const indicator = result.current.getResponseTabIndicator();
      const element = indicator as any;
      expect(element.props.name).toBe('hourglass-split');
    });

    it('should return null when hasSubmittedQuery is true but no other conditions are met', () => {
      const { result } = renderHook(() =>
        useTabManager({
          ...defaultProps,
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: '',
          responseText: '',
        })
      );

      const indicator = result.current.getResponseTabIndicator();
      expect(indicator).toBeNull();
    });

    it('should maintain function identity across re-renders with same dependencies', () => {
      const props = {
        ...defaultProps,
        hasSubmittedQuery: true,
        loading: false,
        errorMessage: '',
        responseText: 'test',
      };

      const { result, rerender } = renderHook(() => useTabManager(props));

      const firstGetIndicator = result.current.getResponseTabIndicator;
      rerender();
      const secondGetIndicator = result.current.getResponseTabIndicator;

      expect(firstGetIndicator).toBe(secondGetIndicator);
    });

    it('should update when dependencies change', () => {
      const { result, rerender } = renderHook(
        ({ loading }) => useTabManager({
          ...defaultProps,
          hasSubmittedQuery: true,
          loading,
        }),
        { initialProps: { loading: false } }
      );

      const initialIndicator = result.current.getResponseTabIndicator();
      expect(initialIndicator).toBeNull();

      rerender({ loading: true });

      const updatedIndicator = result.current.getResponseTabIndicator();
      expect(updatedIndicator).not.toBeNull();
      const element = updatedIndicator as any;
      expect(element.props.name).toBe('hourglass-split');
    });
  });

  describe('effect behavior', () => {
    it('should call tabGroupRef.show when activeTab changes via setActiveTab', () => {
      const mockShow = jest.fn();
      const { result } = renderHook(() => useTabManager(defaultProps));

      // Set up mock ref first
      act(() => {
        result.current.tabGroupRef.current = { show: mockShow };
      });

      // Change active tab
      act(() => {
        result.current.setActiveTab('json');
      });

      expect(mockShow).toHaveBeenCalledWith('json');
    });

    it('should call tabGroupRef.show when activeTab changes via handleTabChange', () => {
      const mockShow = jest.fn();
      const { result } = renderHook(() => useTabManager(defaultProps));

      // Set up mock ref first
      act(() => {
        result.current.tabGroupRef.current = { show: mockShow };
      });

      // Change active tab via event
      act(() => {
        result.current.handleTabChange({
          detail: { name: 'response' },
        } as CustomEvent);
      });

      expect(mockShow).toHaveBeenCalledWith('response');
    });
  });

  describe('edge cases', () => {
    it('should handle empty string values gracefully', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: '',
          responseText: '',
        })
      );

      const indicator = result.current.getResponseTabIndicator();
      expect(indicator).toBeNull();
    });

    it('should handle whitespace-only strings', () => {
      const { result } = renderHook(() =>
        useTabManager({
          hasSubmittedQuery: true,
          loading: false,
          errorMessage: '   ',
          responseText: '',
        })
      );

      const indicator = result.current.getResponseTabIndicator();
      const element = indicator as any;
      expect(element.props.name).toBe('exclamation-triangle');
    });

    it('should handle changing ref from null to object', () => {
      const { result } = renderHook(() => useTabManager(defaultProps));

      // Initially null
      expect(result.current.tabGroupRef.current).toBeNull();

      const mockShow = jest.fn();

      // Set ref and change tab
      act(() => {
        result.current.tabGroupRef.current = { show: mockShow };
        result.current.setActiveTab('response');
      });

      expect(mockShow).toHaveBeenCalledWith('response');
    });

    it('should handle CustomEvent without proper detail', () => {
      const { result } = renderHook(() => useTabManager(defaultProps));

      const mockEvent = {
        detail: {}
      } as CustomEvent;

      expect(() => {
        act(() => {
          result.current.handleTabChange(mockEvent);
        });
      }).not.toThrow();

      // The activeTab should remain as it was since detail.name is undefined
      expect(result.current.activeTab).toBe(undefined);
    });
  });
});
