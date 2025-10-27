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
        className="error-state p-6 rounded-lg"
        style={{
          backgroundColor: 'var(--cs-background-base)',
          border: '1px solid var(--cs-border-color-light)',
          borderRadius: 'var(--spacing-base)',
        }}
      >
        <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--cs-status-error)' }}>
          Failed to Initialize
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--cs-text-primary)' }}>
          Unable to connect to the Falcon API: {error}
        </p>
        <button
          type="button"
          onClick={retry}
          className="px-4 py-2 rounded hover:opacity-80 focus:outline-none focus:ring-2"
          style={{
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
      <div className="loading-state flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4"
            style={{ borderBottomColor: 'var(--cs-primary)' }}
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
          className="font-sans min-h-screen p-4"
          style={{
            fontFamily: 'var(--font-family-sans)',
            color: 'var(--cs-text-primary)',
            backgroundColor: 'var(--cs-background-dark)',
            minHeight: '100vh',
            padding: 'var(--spacing-xl)',
          }}
        >
          <Home falcon={falcon} />
        </div>
      </React.StrictMode>
    </ErrorBoundary>
  );
}

export default App;
