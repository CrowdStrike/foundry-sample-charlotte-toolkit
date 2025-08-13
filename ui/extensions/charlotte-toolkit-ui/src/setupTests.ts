// src/setupTests.ts
import '@testing-library/jest-dom';

// Global test utilities
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

// Mock console.warn to avoid noisy test output
const originalWarn = console.warn;
const originalError = console.error;

beforeEach(() => {
  console.warn = jest.fn();
  
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
  console.warn = originalWarn;
  console.error = originalError;
});
