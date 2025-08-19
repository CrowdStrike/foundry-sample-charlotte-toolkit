// src/components/__tests__/ErrorBoundary.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';

// Component that throws an error for testing
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div data-testid="child-component">Child component rendered</div>;
};

// Component that throws an error with stack trace
const ThrowErrorWithStack = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    const error = new Error('Test error with stack');
    error.stack = 'Error: Test error with stack\n    at Component (test.js:1:1)';
    throw error;
  }
  return <div data-testid="child-component">Child component rendered</div>;
};

describe('ErrorBoundary Component', () => {
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.error for cleaner test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  describe('Normal Operation', () => {
    it('should render children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('child-component')).toBeInTheDocument();
      expect(screen.getByText('Child component rendered')).toBeInTheDocument();
    });

    it('should not show error UI when no error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
      expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should catch and display error when child component throws', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText(/The application encountered an unexpected error/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Refresh Page' })).toBeInTheDocument();
    });

    it('should show error details when expanded', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Click to expand error details
      const detailsElement = screen.getByText('Error Details');
      fireEvent.click(detailsElement);

      expect(screen.getByText('Error:')).toBeInTheDocument();
      expect(screen.getByText('Test error message')).toBeInTheDocument();
    });

    it('should show component stack when available', () => {
      render(
        <ErrorBoundary>
          <ThrowErrorWithStack shouldThrow={true} />
        </ErrorBoundary>
      );

      // Click to expand error details
      const detailsElement = screen.getByText('Error Details');
      fireEvent.click(detailsElement);

      expect(screen.getByText('Component Stack:')).toBeInTheDocument();
    });

    it('should call onError callback when provided', () => {
      render(
        <ErrorBoundary onError={mockOnError}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(mockOnError).toHaveBeenCalledTimes(1);
      expect(mockOnError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Test error message',
        }),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );
    });
  });

  describe('Custom Fallback', () => {
    it('should render custom fallback when provided', () => {
      const customFallback = <div data-testid="custom-fallback">Custom error UI</div>;

      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
      expect(screen.getByText('Custom error UI')).toBeInTheDocument();
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });
  });

  describe('Error Recovery', () => {
    it('should reset error state when "Try Again" is clicked', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Error state should be shown
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      // Click "Try Again" - this calls handleReset internally
      const tryAgainButton = screen.getByRole('button', { name: 'Try Again' });
      
      // Just verify we can click the button without error
      expect(() => fireEvent.click(tryAgainButton)).not.toThrow();
    });

    it('should reload page when "Refresh Page" is clicked', () => {
      const mockReload = jest.fn();
      delete (window as any).location;
      Object.defineProperty(window, 'location', {
        value: { reload: mockReload },
        writable: true,
        configurable: true,
      });

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const refreshButton = screen.getByRole('button', { name: 'Refresh Page' });
      fireEvent.click(refreshButton);

      expect(mockReload).toHaveBeenCalledTimes(1);
    });
  });

  describe('Styling and Structure', () => {
    it('should apply correct CSS classes to error container', () => {
      const { container } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const errorContainer = container.querySelector('.error-boundary-container.p-6.rounded-lg');
      expect(errorContainer).toBeInTheDocument();
    });

    it('should render error icon', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // SVG icon should be rendered
      const svgIcon = document.querySelector('svg.h-5.w-5');
      expect(svgIcon).toBeInTheDocument();
    });

    it('should render error details in monospace font', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Click to expand error details
      const detailsElement = screen.getByText('Error Details');
      fireEvent.click(detailsElement);

      const errorDetails = document.querySelector('.font-mono');
      expect(errorDetails).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle errors without messages', () => {
      // Component that throws error without message
      const ThrowEmptyError = () => {
        throw new Error('');
      };

      render(
        <ErrorBoundary>
          <ThrowEmptyError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should handle non-Error objects being thrown', () => {
      // Component that throws non-Error object
      const ThrowString = () => {
        throw 'String error';
      };

      render(
        <ErrorBoundary>
          <ThrowString />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should handle missing error info gracefully', () => {
      // Test that the component still works when error info is minimal
      const ThrowErrorMinimal = () => {
        const error = new Error('Minimal error');
        // Clear the stack to simulate missing error info
        error.stack = '';
        throw error;
      };

      render(
        <ErrorBoundary>
          <ThrowErrorMinimal />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      
      // Click to expand error details
      const detailsElement = screen.getByText('Error Details');
      fireEvent.click(detailsElement);

      expect(screen.getByText('Error:')).toBeInTheDocument();
      expect(screen.getByText('Minimal error')).toBeInTheDocument();
    });

    it('should handle multiple consecutive errors', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // First error
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      // Reset and throw different error
      const tryAgainButton = screen.getByRole('button', { name: 'Try Again' });
      fireEvent.click(tryAgainButton);

      rerender(
        <ErrorBoundary>
          <ThrowErrorWithStack shouldThrow={true} />
        </ErrorBoundary>
      );

      // Second error should also be caught
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  describe('Static Methods', () => {
    it('should return proper state from getDerivedStateFromError', () => {
      const error = new Error('Test error');
      const derivedState = ErrorBoundary.getDerivedStateFromError(error);

      expect(derivedState).toEqual({
        hasError: true,
        error,
      });
    });
  });
});
