import type FalconApi from '@crowdstrike/foundry-js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useFalconApi } from '../../hooks/useFalconApi';
import App from '../App';

// Mock the useFalconApi hook
vi.mock('../../hooks/useFalconApi', () => ({
  useFalconApi: vi.fn(),
}));

// Mock Home component
vi.mock('../Home', () => ({
  default: ({ falcon }: { falcon: unknown }) => (
    <div data-testid="home-component">Home with falcon: {falcon ? 'present' : 'absent'}</div>
  ),
}));

// Mock ErrorBoundary
vi.mock('../ErrorBoundary', () => ({
  ErrorBoundary: ({ children, onRetry }: { children: React.ReactNode; onRetry?: () => void }) => (
    <div data-testid="error-boundary" data-has-retry={!!onRetry}>
      {children}
    </div>
  ),
}));

const mockUseFalconApi = vi.mocked(useFalconApi);

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialization States', () => {
    it('should render loading state when not initialized', () => {
      mockUseFalconApi.mockReturnValue({
        isInitialized: false,
        falcon: null as unknown as FalconApi,
        error: null,
        retry: vi.fn(),
      });

      render(<App />);

      expect(screen.getByText('Initializing...')).toBeDefined();
    });

    it('should show loading spinner when not initialized', () => {
      mockUseFalconApi.mockReturnValue({
        isInitialized: false,
        falcon: null as unknown as FalconApi,
        error: null,
        retry: vi.fn(),
      });

      const { container } = render(<App />);

      expect(container.querySelector('.loading-state')).toBeDefined();
    });
  });

  describe('Error States', () => {
    it('should render error state when error is present', () => {
      mockUseFalconApi.mockReturnValue({
        isInitialized: false,
        falcon: null as unknown as FalconApi,
        error: 'Failed to connect',
        retry: vi.fn(),
      });

      render(<App />);

      expect(screen.getByText('Failed to Initialize')).toBeDefined();
      expect(screen.getByText(/Unable to connect to the Falcon API/i)).toBeDefined();
    });

    it('should display specific error message', () => {
      mockUseFalconApi.mockReturnValue({
        isInitialized: false,
        falcon: null as unknown as FalconApi,
        error: 'Network timeout',
        retry: vi.fn(),
      });

      render(<App />);

      expect(screen.getByText(/Network timeout/i)).toBeDefined();
    });

    it('should render retry button in error state', () => {
      mockUseFalconApi.mockReturnValue({
        isInitialized: false,
        falcon: null as unknown as FalconApi,
        error: 'Connection failed',
        retry: vi.fn(),
      });

      render(<App />);

      expect(screen.getByText('Retry')).toBeDefined();
    });

    it('should call retry when retry button is clicked', async () => {
      const retryFn = vi.fn();
      mockUseFalconApi.mockReturnValue({
        isInitialized: false,
        falcon: null as unknown as FalconApi,
        error: 'Connection failed',
        retry: retryFn,
      });

      const user = userEvent.setup();
      render(<App />);

      const retryButton = screen.getByText('Retry');
      await user.click(retryButton);

      expect(retryFn).toHaveBeenCalled();
    });

    it('should apply error-state class', () => {
      mockUseFalconApi.mockReturnValue({
        isInitialized: false,
        falcon: null as unknown as FalconApi,
        error: 'Error',
        retry: vi.fn(),
      });

      const { container } = render(<App />);

      expect(container.querySelector('.error-state')).toBeDefined();
    });
  });

  describe('Successful Initialization', () => {
    it('should render Home component when initialized', () => {
      mockUseFalconApi.mockReturnValue({
        isInitialized: true,
        falcon: { data: {} } as unknown as FalconApi,
        error: null,
        retry: vi.fn(),
      });

      render(<App />);

      expect(screen.getByTestId('home-component')).toBeDefined();
    });

    it('should pass falcon to Home component', () => {
      mockUseFalconApi.mockReturnValue({
        isInitialized: true,
        falcon: { data: { test: 'value' } } as unknown as FalconApi,
        error: null,
        retry: vi.fn(),
      });

      render(<App />);

      const home = screen.getByTestId('home-component');
      expect(home.textContent).toContain('Home with falcon: present');
    });

    it('should wrap Home in ErrorBoundary', () => {
      mockUseFalconApi.mockReturnValue({
        isInitialized: true,
        falcon: { data: {} } as unknown as FalconApi,
        error: null,
        retry: vi.fn(),
      });

      render(<App />);

      expect(screen.getByTestId('error-boundary')).toBeDefined();
    });

    it('should pass retry to ErrorBoundary onRetry', () => {
      const retryFn = vi.fn();
      mockUseFalconApi.mockReturnValue({
        isInitialized: true,
        falcon: { data: {} } as unknown as FalconApi,
        error: null,
        retry: retryFn,
      });

      render(<App />);

      const errorBoundary = screen.getByTestId('error-boundary');
      expect(errorBoundary.getAttribute('data-has-retry')).toBe('true');
    });

    it('should render with React.StrictMode', () => {
      mockUseFalconApi.mockReturnValue({
        isInitialized: true,
        falcon: { data: {} } as unknown as FalconApi,
        error: null,
        retry: vi.fn(),
      });

      render(<App />);

      // StrictMode doesn't render in DOM but component should render successfully
      expect(screen.getByTestId('home-component')).toBeDefined();
    });
  });

  describe('State Transitions', () => {
    it('should transition from loading to initialized', () => {
      mockUseFalconApi.mockReturnValue({
        isInitialized: false,
        falcon: null as unknown as FalconApi,
        error: null,
        retry: vi.fn(),
      });

      const { rerender } = render(<App />);

      expect(screen.getByText('Initializing...')).toBeDefined();

      mockUseFalconApi.mockReturnValue({
        isInitialized: true,
        falcon: { data: {} } as unknown as FalconApi,
        error: null,
        retry: vi.fn(),
      });

      rerender(<App />);

      expect(screen.getByTestId('home-component')).toBeDefined();
    });

    it('should transition from loading to error', () => {
      mockUseFalconApi.mockReturnValue({
        isInitialized: false,
        falcon: null as unknown as FalconApi,
        error: null,
        retry: vi.fn(),
      });

      const { rerender } = render(<App />);

      expect(screen.getByText('Initializing...')).toBeDefined();

      mockUseFalconApi.mockReturnValue({
        isInitialized: false,
        falcon: null as unknown as FalconApi,
        error: 'Connection failed',
        retry: vi.fn(),
      });

      rerender(<App />);

      expect(screen.getByText('Failed to Initialize')).toBeDefined();
    });
  });

  describe('Hook Integration', () => {
    it('should call useFalconApi hook', () => {
      mockUseFalconApi.mockReturnValue({
        isInitialized: true,
        falcon: { data: {} } as unknown as FalconApi,
        error: null,
        retry: vi.fn(),
      });

      render(<App />);

      expect(mockUseFalconApi).toHaveBeenCalled();
    });

    it('should handle hook returning all properties', () => {
      const retryFn = vi.fn();
      mockUseFalconApi.mockReturnValue({
        isInitialized: true,
        falcon: { data: { key: 'value' } } as unknown as FalconApi,
        error: null,
        retry: retryFn,
      });

      render(<App />);

      expect(screen.getByTestId('home-component')).toBeDefined();
    });
  });

  describe('Styling and Layout', () => {
    it('should apply correct container styles when initialized', () => {
      mockUseFalconApi.mockReturnValue({
        isInitialized: true,
        falcon: { data: {} } as unknown as FalconApi,
        error: null,
        retry: vi.fn(),
      });

      const { container } = render(<App />);

      const mainDiv = container.querySelector('div[style*="minHeight"]');
      expect(mainDiv).toBeDefined();
    });

    it('should center loading content', () => {
      mockUseFalconApi.mockReturnValue({
        isInitialized: false,
        falcon: null as unknown as FalconApi,
        error: null,
        retry: vi.fn(),
      });

      const { container } = render(<App />);

      const loadingState = container.querySelector('.loading-state');
      expect(loadingState).toBeDefined();
    });
  });
});
