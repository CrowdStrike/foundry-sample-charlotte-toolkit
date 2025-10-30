// src/components/App.tsx

import React from 'react';
import { useFalconApi } from '../hooks/useFalconApi';
import { ErrorBoundary } from './ErrorBoundary';
import Home from './Home';

/**
 * Main App component with error boundary
 */
function App(): React.ReactNode {
  const { isInitialized, falcon, error, retry } = useFalconApi();

  // Show error state if Falcon API failed to initialize
  if (error) {
    return (
      <div
        className="error-state"
        style={{
          padding: 'var(--spacing-3xl)',
          borderRadius: 'var(--spacing-base)',
          backgroundColor: 'var(--cs-background-base)',
          border: '1px solid var(--cs-border-color-light)',
        }}
      >
        <h3
          style={{
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-medium)',
            marginBottom: 'var(--spacing-base)',
            color: 'var(--cs-status-error)',
          }}
        >
          Failed to Initialize
        </h3>
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            marginBottom: 'var(--spacing-xl)',
            color: 'var(--cs-text-primary)',
          }}
        >
          Unable to connect to the Falcon API: {error}
        </p>
        <button
          type="button"
          onClick={retry}
          style={{
            padding: 'var(--spacing-base) var(--spacing-xl)',
            borderRadius: 'var(--spacing-sm)',
            cursor: 'pointer',
            backgroundColor: 'var(--cs-status-error)',
            color: 'var(--cs-text-on-primary)',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div
        className="loading-state"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              animation: 'spin 1s linear infinite',
              borderRadius: '9999px',
              height: '2rem',
              width: '2rem',
              borderBottom: '2px solid var(--cs-primary)',
              margin: '0 auto var(--spacing-xl)',
            }}
          ></div>
          <p style={{ color: 'var(--cs-text-primary)' }}>Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary onRetry={retry}>
      <React.StrictMode>
        <div
          style={{
            fontFamily: 'var(--font-family-sans)',
            minHeight: '100vh',
            padding: 'var(--spacing-xl)',
            color: 'var(--cs-text-primary)',
            backgroundColor: 'var(--cs-background-dark)',
          }}
        >
          <Home falcon={falcon} />
        </div>
      </React.StrictMode>
    </ErrorBoundary>
  );
}

export default App;
