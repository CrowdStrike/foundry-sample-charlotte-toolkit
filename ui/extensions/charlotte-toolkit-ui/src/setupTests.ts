// src/setupTests.ts
import '@testing-library/jest-dom';

// Type declarations for Jest globals
declare global {
  var jest: any;
  var beforeEach: any;
  var afterEach: any;
  var global: any;
}

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
beforeEach(() => {
  console.warn = jest.fn();
});

afterEach(() => {
  console.warn = originalWarn;
});
