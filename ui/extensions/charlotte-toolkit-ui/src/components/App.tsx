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
      <div className="error-state">
        <h3>Failed to Initialize</h3>
        <p>Unable to connect to the Falcon API: {error}</p>
        <button type="button" onClick={retry}>
          Retry
        </button>
      </div>
    );
  }

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="loading-state">
        <div className="text-center">
          <div className="animate-spin spinner"></div>
          <p>Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary onRetry={retry}>
      <React.StrictMode>
        <div className="app-container">
          <Home falcon={falcon} />
        </div>
      </React.StrictMode>
    </ErrorBoundary>
  );
}

export default App;
