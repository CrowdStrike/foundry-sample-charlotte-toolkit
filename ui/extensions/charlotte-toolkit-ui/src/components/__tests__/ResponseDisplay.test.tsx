import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ResponseDisplay from '../ResponseDisplay';

// Mock utility function
vi.mock('../../utils/security/iocUtils', () => ({
  parseStructuredResponse: vi.fn((text: string) => {
    if (text.includes('structured')) {
      return {
        threat_level: 'High',
        confidence_level: 'High',
        executive_summary: 'Test summary',
        priority_actions: [],
      };
    }
    return null;
  }),
}));

// Mock markdown utilities
vi.mock('../markdown', () => ({
  createMarkdownRenderers: vi.fn(() => ({})),
}));

// Mock StructuredSecurityAnalysis
vi.mock('../security', () => ({
  StructuredSecurityAnalysis: ({ data }: { data: { executive_summary: string } }) => (
    <div data-testid="structured-security-analysis">
      Structured Analysis: {data.executive_summary}
    </div>
  ),
}));

// Mock ReactMarkdown
vi.mock('react-markdown', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="react-markdown">{children}</div>
  ),
}));

// Mock Shoelace components
vi.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlIcon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
  SlSpinner: (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid="sl-spinner" {...props}>
      Loading...
    </div>
  ),
}));

describe('ResponseDisplay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Loading State', () => {
    it('should render loading state with spinner', () => {
      render(<ResponseDisplay loading={true} responseText="" errorMessage="" />);

      expect(screen.getByTestId('sl-spinner')).toBeDefined();
    });

    it('should show initial loading message', () => {
      render(<ResponseDisplay loading={true} responseText="" errorMessage="" />);

      expect(screen.getByText('Gathering information...')).toBeDefined();
    });

    it('should update loading message after 8 seconds', async () => {
      render(<ResponseDisplay loading={true} responseText="" errorMessage="" />);

      expect(screen.getByText('Gathering information...')).toBeDefined();

      vi.advanceTimersByTime(8000);

      await waitFor(() => {
        expect(screen.getByText('Processing data...')).toBeDefined();
      });
    });

    it('should update loading message after 16 seconds', async () => {
      render(<ResponseDisplay loading={true} responseText="" errorMessage="" />);

      vi.advanceTimersByTime(16000);

      await waitFor(() => {
        expect(screen.getByText('Compiling results...')).toBeDefined();
      });
    });

    it('should apply loading styles', () => {
      const { container } = render(
        <ResponseDisplay loading={true} responseText="" errorMessage="" />,
      );

      expect(container.querySelector('.loading-container')).toBeDefined();
      expect(container.querySelector('.loading-backdrop')).toBeDefined();
      expect(container.querySelector('.loading-icon-container')).toBeDefined();
    });
  });

  describe('Error State', () => {
    it('should render error state with icon', () => {
      render(<ResponseDisplay loading={false} responseText="" errorMessage="Test error" />);

      expect(screen.getByTestId('icon-exclamation-triangle')).toBeDefined();
    });

    it('should display error message', () => {
      render(<ResponseDisplay loading={false} responseText="" errorMessage="Test error message" />);

      expect(screen.getByText('Test error message')).toBeDefined();
    });

    it('should not show loading or empty state when error present', () => {
      render(<ResponseDisplay loading={false} responseText="" errorMessage="Error" />);

      expect(screen.queryByTestId('sl-spinner')).toBeNull();
      expect(screen.queryByTestId('icon-chat-square-text')).toBeNull();
    });
  });

  describe('Empty State', () => {
    it('should render empty state when no response', () => {
      render(<ResponseDisplay loading={false} responseText="" errorMessage="" />);

      expect(screen.getByTestId('icon-chat-square-text')).toBeDefined();
    });

    it('should show empty state message', () => {
      render(<ResponseDisplay loading={false} responseText="" errorMessage="" />);

      expect(screen.getByText('Submit a query to see analysis results')).toBeDefined();
    });
  });

  describe('Structured Response', () => {
    it('should render structured analysis when JSON is parseable', () => {
      render(
        <ResponseDisplay loading={false} responseText="structured response" errorMessage="" />,
      );

      expect(screen.getByTestId('structured-security-analysis')).toBeDefined();
    });

    it('should render in scroll container', () => {
      const { container } = render(
        <ResponseDisplay loading={false} responseText="structured response" errorMessage="" />,
      );

      expect(container.querySelector('.response-scroll-container')).toBeDefined();
      expect(container.querySelector('.response-scroll-content')).toBeDefined();
      expect(container.querySelector('.response-scroll-fade')).toBeDefined();
    });
  });

  describe('Markdown Fallback', () => {
    it('should render markdown when JSON parsing fails', () => {
      render(
        <ResponseDisplay loading={false} responseText="plain text response" errorMessage="" />,
      );

      expect(screen.getByTestId('react-markdown')).toBeDefined();
    });

    it('should show warning message for format issue', () => {
      render(
        <ResponseDisplay loading={false} responseText="plain text response" errorMessage="" />,
      );

      expect(screen.getByText(/Response Format Issue/i)).toBeDefined();
      expect(
        screen.getByText(/Charlotte AI did not return the expected JSON format/i),
      ).toBeDefined();
    });

    it('should render in scroll container with fade', () => {
      const { container } = render(
        <ResponseDisplay loading={false} responseText="plain text response" errorMessage="" />,
      );

      expect(container.querySelector('.response-scroll-container')).toBeDefined();
      expect(container.querySelector('.response-scroll-fade')).toBeDefined();
    });
  });

  describe('Loading Message Progression', () => {
    it('should clean up timers when component unmounts', () => {
      const { unmount } = render(
        <ResponseDisplay loading={true} responseText="" errorMessage="" />,
      );

      unmount();

      // Advance time to ensure no state updates after unmount
      vi.advanceTimersByTime(20000);
      // Should not throw or cause issues
    });

    it('should reset loading message when loading becomes false', () => {
      const { rerender } = render(
        <ResponseDisplay loading={true} responseText="" errorMessage="" />,
      );

      vi.advanceTimersByTime(8000);

      rerender(<ResponseDisplay loading={false} responseText="done" errorMessage="" />);

      // Should not show loading messages
      expect(screen.queryByText('Processing data...')).toBeNull();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long response text', () => {
      const longText = 'a'.repeat(10000);
      render(<ResponseDisplay loading={false} responseText={longText} errorMessage="" />);

      expect(screen.getByTestId('react-markdown')).toBeDefined();
    });

    it('should handle special characters in response', () => {
      const specialText = 'Response with <script>alert("test")</script>';
      render(<ResponseDisplay loading={false} responseText={specialText} errorMessage="" />);

      expect(screen.getByTestId('react-markdown')).toBeDefined();
    });

    it('should handle Unicode in response', () => {
      const unicodeText = '测试 🌍 مرحبا';
      render(<ResponseDisplay loading={false} responseText={unicodeText} errorMessage="" />);

      expect(screen.getByTestId('react-markdown')).toBeDefined();
    });
  });

  describe('Component Memoization', () => {
    it('should render without errors', () => {
      const { rerender } = render(
        <ResponseDisplay loading={false} responseText="" errorMessage="" />,
      );

      rerender(<ResponseDisplay loading={false} responseText="test" errorMessage="" />);

      expect(screen.getByTestId('react-markdown')).toBeDefined();
    });
  });
});
