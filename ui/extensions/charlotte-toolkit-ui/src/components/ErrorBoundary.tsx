// src/components/ErrorBoundary.tsx

import { Component, type ReactNode } from 'react';

import type { ErrorBoundaryState, ErrorInfo } from '../types';

interface ErrorBoundaryProperties {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onRetry?: () => void;
}

/**
 * Error Boundary component to catch and handle React errors gracefully
 */
export class ErrorBoundary extends Component<ErrorBoundaryProperties, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProperties) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Error caught by boundary - details available in UI

    this.setState({
      error,
      errorInfo,
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div
          className="error-boundary-container"
          style={{
            backgroundColor: 'var(--cs-background-base)',
            border: '1px solid var(--cs-border-color-light)',
            borderRadius: 'var(--spacing-base)',
            padding: 'var(--spacing-3xl)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
            <div style={{ flexShrink: 0 }}>
              <svg
                style={{ height: '1.25rem', width: '1.25rem', color: 'var(--cs-status-error)' }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                role="img"
                aria-label="Error icon"
              >
                <title>Error icon</title>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div style={{ marginLeft: 'var(--spacing-lg)' }}>
              <h3
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--cs-status-error)',
                }}
              >
                Something went wrong
              </h3>
            </div>
          </div>

          <div
            style={{
              fontSize: 'var(--font-size-sm)',
              marginBottom: 'var(--spacing-xl)',
              color: 'var(--cs-text-primary)',
            }}
          >
            <p>
              The application encountered an unexpected error. Please try refreshing the page or
              contact support if the problem persists.
            </p>
          </div>

          {this.state.error && (
            <details style={{ marginBottom: 'var(--spacing-xl)' }}>
              <summary
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  color: 'var(--cs-status-error)',
                }}
              >
                Error Details
              </summary>
              <div
                style={{
                  marginTop: 'var(--spacing-base)',
                  fontSize: 'var(--font-size-xs)',
                  fontFamily: 'var(--font-family-mono)',
                  padding: 'var(--spacing-lg)',
                  borderRadius: 'var(--spacing-sm)',
                  border: '1px solid var(--cs-border-color-light)',
                  color: 'var(--cs-text-secondary)',
                  backgroundColor: 'var(--cs-background-lighter)',
                }}
              >
                <div style={{ marginBottom: 'var(--spacing-base)' }}>
                  <strong>Error:</strong> {this.state.error.message}
                </div>
                {this.state.errorInfo && (
                  <div>
                    <strong>Component Stack:</strong>
                    <pre style={{ whiteSpace: 'pre-wrap', marginTop: 'var(--spacing-xs)' }}>
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}

          <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: 'var(--spacing-base) var(--spacing-lg)',
                border: '1px solid var(--cs-border-color-light)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                borderRadius: 'var(--spacing-sm)',
                borderColor: 'var(--cs-border-color-light)',
                color: 'var(--cs-text-primary)',
                backgroundColor: 'var(--cs-background-base)',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={this.props.onRetry}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: 'var(--spacing-base) var(--spacing-lg)',
                border: '1px solid transparent',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                borderRadius: 'var(--spacing-sm)',
                color: 'white',
                backgroundColor: 'var(--cs-status-error)',
                cursor: 'pointer',
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
