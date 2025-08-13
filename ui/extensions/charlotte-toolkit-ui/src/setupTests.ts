// src/setupTests.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// Global test utilities with proper cleanup
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Store original console methods
const originalWarn = console.warn;
const originalError = console.error;
const originalLog = console.log;

// Memory management: Track DOM elements for cleanup
let domCleanupQueue: (() => void)[] = [];

beforeEach(() => {
  // Reset console mocks
  console.warn = jest.fn();
  console.log = jest.fn();
  
  // Suppress React warnings while preserving other errors
  console.error = jest.fn().mockImplementation((...args) => {
    const fullMessage = args.join(' ');
    if (
      // React act() warnings
      fullMessage.includes('An update to TestComponent inside a test was not wrapped in act(...)') ||
      fullMessage.includes('When testing, code that causes React state updates should be wrapped into act(...)') ||
      (typeof args[0] === 'string' && args[0].includes('An update to TestComponent')) ||
      // DOM validation warnings
      fullMessage.includes('cannot be a child of') ||
      fullMessage.includes('cannot contain a nested') ||
      fullMessage.includes('This will cause a hydration error') ||
      fullMessage.includes('See this log for the ancestor stack trace') ||
      // Controlled/uncontrolled component warnings
      fullMessage.includes('Select elements must be either controlled or uncontrolled') ||
      fullMessage.includes('controlled-components')
    ) {
      // Suppress React warnings
      return;
    }
    // Log other errors normally
    originalError.apply(console, args);
  });
});

afterEach(() => {
  // Restore console methods
  console.warn = originalWarn;
  console.error = originalError;
  console.log = originalLog;
  
  // Clear all mocks
  jest.clearAllMocks();
  jest.clearAllTimers();
  
  // Clean up React Testing Library
  cleanup();
  
  // Run any custom cleanup functions
  domCleanupQueue.forEach(cleanupFn => {
    try {
      cleanupFn();
    } catch (error) {
      // Ignore cleanup errors
    }
  });
  domCleanupQueue = [];
  
  // Force garbage collection if available (enabled with --expose-gc)
  if (global.gc) {
    global.gc();
  }
});

// Global cleanup helper
(global as any).addCleanup = (cleanupFn: () => void) => {
  domCleanupQueue.push(cleanupFn);
};

// Add global timeout for tests to prevent hanging
jest.setTimeout(30000);
