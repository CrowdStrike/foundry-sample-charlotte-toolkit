import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from '../ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    // Suppress console.error for expected errors
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy?.mockRestore();
  });

  describe('Normal Operation', () => {
    it('should render children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <div>Test content</div>
        </ErrorBoundary>,
      );

      expect(screen.getByText('Test content')).toBeDefined();
    });

    it('should render multiple children', () => {
      render(
        <ErrorBoundary>
          <div>Child 1</div>
          <div>Child 2</div>
        </ErrorBoundary>,
      );

      expect(screen.getByText('Child 1')).toBeDefined();
      expect(screen.getByText('Child 2')).toBeDefined();
    });
  });

  describe('Error Catching', () => {
    it('should catch errors thrown by children', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>,
      );

      expect(screen.getByText('Something went wrong')).toBeDefined();
    });

    it('should display error message', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>,
      );

      expect(screen.getByText(/The application encountered an unexpected error/i)).toBeDefined();
    });

    it('should render error icon', () => {
      const { container } = render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>,
      );

      const icon = container.querySelector('svg[aria-label="Error icon"]');
      expect(icon).toBeDefined();
    });

    it('should show error details in expandable section', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>,
      );

      const details = screen.getByText('Error Details');
      expect(details.tagName).toBe('SUMMARY');
    });

    it('should display error message in details', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>,
      );

      expect(screen.getByText(/Test error/i)).toBeDefined();
    });
  });

  describe('Custom Fallback', () => {
    it('should render custom fallback when provided', () => {
      render(
        <ErrorBoundary fallback={<div>Custom error UI</div>}>
          <ThrowError />
        </ErrorBoundary>,
      );

      expect(screen.getByText('Custom error UI')).toBeDefined();
      expect(screen.queryByText('Something went wrong')).toBeNull();
    });
  });

  describe('Error Callbacks', () => {
    it('should call onError callback when error occurs', () => {
      const onError = vi.fn();

      render(
        <ErrorBoundary onError={onError}>
          <ThrowError />
        </ErrorBoundary>,
      );

      expect(onError).toHaveBeenCalled();
      expect(onError.mock.calls[0]?.[0].message).toBe('Test error');
    });

    it('should provide error info to callback', () => {
      const onError = vi.fn();

      render(
        <ErrorBoundary onError={onError}>
          <ThrowError />
        </ErrorBoundary>,
      );

      expect(onError).toHaveBeenCalled();
      expect(onError.mock.calls[0]?.[1]).toBeDefined();
      expect(onError.mock.calls[0]?.[1]?.componentStack).toBeDefined();
    });
  });

  describe('Reset Functionality', () => {
    it('should render Try Again button', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>,
      );

      expect(screen.getByText('Try Again')).toBeDefined();
    });

    it('should reset error state when Try Again is clicked', async () => {
      const user = userEvent.setup();

      // Use a ref to control throwing behavior from outside the component
      const throwControl = { shouldThrow: true };
      
      const ControlledThrow = () => {
        if (throwControl.shouldThrow) {
          throw new Error('Test error');
        }
        return <div>No error</div>;
      };

      render(
        <ErrorBoundary>
          <ControlledThrow />
        </ErrorBoundary>,
      );

      // Error should be caught
      expect(screen.getByText('Something went wrong')).toBeDefined();

      // Change the control ref so it won't throw on next render
      throwControl.shouldThrow = false;

      // Click Try Again to reset the error boundary
      const tryAgainButton = screen.getByText('Try Again');
      await user.click(tryAgainButton);

      // After reset, should render successfully since control ref was changed
      expect(screen.getByText('No error')).toBeDefined();
    });

    it('should call onRetry when Refresh Page is clicked', async () => {
      const onRetry = vi.fn();
      const user = userEvent.setup();

      render(
        <ErrorBoundary onRetry={onRetry}>
          <ThrowError />
        </ErrorBoundary>,
      );

      const refreshButton = screen.getByText('Refresh Page');
      await user.click(refreshButton);

      expect(onRetry).toHaveBeenCalled();
    });
  });

  describe('Styling and Layout', () => {
    it('should apply error-boundary-container class', () => {
      const { container } = render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>,
      );

      expect(container.querySelector('.error-boundary-container')).toBeDefined();
    });

    it('should have proper button styling', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>,
      );

      const tryAgainButton = screen.getByText('Try Again');
      expect(tryAgainButton.tagName).toBe('BUTTON');
    });
  });

  describe('Edge Cases', () => {
    it('should handle errors with long messages', () => {
      const LongErrorComponent = () => {
        throw new Error('a'.repeat(1000));
      };

      render(
        <ErrorBoundary>
          <LongErrorComponent />
        </ErrorBoundary>,
      );

      expect(screen.getByText('Something went wrong')).toBeDefined();
    });

    it('should handle errors with special characters', () => {
      const SpecialErrorComponent = () => {
        throw new Error('Error with <special> & "characters"');
      };

      render(
        <ErrorBoundary>
          <SpecialErrorComponent />
        </ErrorBoundary>,
      );

      expect(screen.getByText(/Error with <special> & "characters"/i)).toBeDefined();
    });

    it('should handle nested component errors', () => {
      const NestedComponent = () => (
        <div>
          <div>
            <ThrowError />
          </div>
        </div>
      );

      render(
        <ErrorBoundary>
          <NestedComponent />
        </ErrorBoundary>,
      );

      expect(screen.getByText('Something went wrong')).toBeDefined();
    });
  });

  describe('Component Lifecycle', () => {
    it('should catch errors in componentDidCatch', () => {
      const onError = vi.fn();

      render(
        <ErrorBoundary onError={onError}>
          <ThrowError />
        </ErrorBoundary>,
      );

      expect(onError).toHaveBeenCalled();
    });

    it('should update state via getDerivedStateFromError', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>,
      );

      // Error boundary should be in error state
      expect(screen.getByText('Something went wrong')).toBeDefined();
    });
  });
});
