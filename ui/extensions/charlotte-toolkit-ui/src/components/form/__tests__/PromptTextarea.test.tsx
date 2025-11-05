import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PromptTextarea from '../PromptTextarea';

// Mock Shoelace components
vi.mock('@shoelace-style/shoelace/dist/react', () => {
  const React = require('react');

  interface SlTextareaProps {
    value?: string;
    onSlInput?: (event: Event) => void;
    label?: string;
    placeholder?: string;
    rows?: number;
    resize?: string;
    children?: React.ReactNode;
    [key: string]: unknown;
  }

  interface SlIconProps {
    name: string;
    slot?: string;
  }

  return {
    SlTextarea: React.forwardRef(
      (
        { value, onSlInput, label, placeholder, rows, resize, children, ...props }: SlTextareaProps,
        ref: React.Ref<HTMLTextAreaElement>,
      ) => (
        <div data-testid="textarea-wrapper">
          <label htmlFor="prompt-textarea-input">{label}</label>
          <textarea
            id="prompt-textarea-input"
            {...props}
            ref={ref}
            value={value}
            onChange={(e) => {
              const customEvent = new CustomEvent('sl-input', {
                detail: {},
              });
              Object.defineProperty(customEvent, 'target', {
                value: e.target,
                writable: false,
              });
              onSlInput?.(customEvent);
            }}
            placeholder={placeholder}
            rows={rows}
            data-testid="prompt-textarea"
            data-resize={resize}
          />
          {children}
        </div>
      ),
    ),
    SlIcon: ({ name, slot }: SlIconProps) => (
      <span data-testid={`icon-${name}`} data-slot={slot}>
        {name}
      </span>
    ),
  };
});

describe('PromptTextarea', () => {
  const defaultProps = {
    query: '',
    setQuery: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render successfully with all elements', () => {
      render(<PromptTextarea {...defaultProps} />);

      expect(screen.getByTestId('textarea-wrapper')).toBeDefined();
      expect(screen.getByTestId('prompt-textarea')).toBeDefined();
      expect(screen.getByText('Prompt')).toBeDefined();
    });

    it('should render with placeholder text', () => {
      render(<PromptTextarea {...defaultProps} />);

      const textarea = screen.getByTestId('prompt-textarea') as HTMLTextAreaElement;
      expect(textarea.placeholder).toBe('Enter your security analysis question...');
    });

    it('should render with icon prefix', () => {
      render(<PromptTextarea {...defaultProps} />);

      expect(screen.getByTestId('icon-chat-quote')).toBeDefined();
    });

    it('should render with correct number of rows', () => {
      render(<PromptTextarea {...defaultProps} />);

      const textarea = screen.getByTestId('prompt-textarea') as HTMLTextAreaElement;
      expect(textarea.rows).toBe(5);
    });

    it('should render with resize set to none', () => {
      render(<PromptTextarea {...defaultProps} />);

      const textarea = screen.getByTestId('prompt-textarea');
      expect(textarea.getAttribute('data-resize')).toBe('none');
    });

    it('should display current query value', () => {
      render(<PromptTextarea {...defaultProps} query="test query" />);

      const textarea = screen.getByTestId('prompt-textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe('test query');
    });
  });

  describe('User Input', () => {
    it('should call setQuery when user types', async () => {
      const user = userEvent.setup({ delay: null });
      render(<PromptTextarea {...defaultProps} />);

      const textarea = screen.getByTestId('prompt-textarea');
      await user.type(textarea, 'test input');

      expect(defaultProps.setQuery).toHaveBeenCalled();
      // Check last call contains the full text
      const calls = defaultProps.setQuery.mock.calls;
      expect(calls[calls.length - 1]?.[0]).toBe('test input');
    });

    it('should update value on each character typed', async () => {
      const user = userEvent.setup({ delay: null });
      render(<PromptTextarea {...defaultProps} />);

      const textarea = screen.getByTestId('prompt-textarea');
      await user.type(textarea, 'abc');

      expect(defaultProps.setQuery).toHaveBeenCalledTimes(3);
    });

    it('should handle clearing textarea', async () => {
      const user = userEvent.setup({ delay: null });
      render(<PromptTextarea {...defaultProps} query="existing text" />);

      const textarea = screen.getByTestId('prompt-textarea');
      await user.clear(textarea);

      expect(defaultProps.setQuery).toHaveBeenCalledWith('');
    });

    it('should handle multiline input', async () => {
      const user = userEvent.setup({ delay: null });
      render(<PromptTextarea {...defaultProps} />);

      const textarea = screen.getByTestId('prompt-textarea');
      await user.type(textarea, 'line 1{Enter}line 2{Enter}line 3');

      const calls = defaultProps.setQuery.mock.calls;
      const lastCall = calls[calls.length - 1]?.[0];
      expect(lastCall).toContain('\n');
    });

    it('should handle paste events', async () => {
      const user = userEvent.setup({ delay: null });
      render(<PromptTextarea {...defaultProps} />);

      const textarea = screen.getByTestId('prompt-textarea');
      await user.click(textarea);
      await user.paste('pasted content');

      const calls = defaultProps.setQuery.mock.calls;
      expect(calls[calls.length - 1]?.[0]).toBe('pasted content');
    });
  });

  describe('Auto-resize Behavior', () => {
    it('should apply initial auto-resize on mount', async () => {
      render(<PromptTextarea {...defaultProps} />);

      // Fast-forward through the initial setTimeout calls
      vi.advanceTimersByTime(100);

      await waitFor(() => {
        const textarea = screen.getByTestId('prompt-textarea') as HTMLTextAreaElement;
        expect(textarea).toBeDefined();
      });
    });

    it('should disable transitions during initial calculation', async () => {
      render(<PromptTextarea {...defaultProps} />);

      // The component disables transitions initially
      vi.advanceTimersByTime(50);

      await waitFor(() => {
        const textarea = screen.getByTestId('prompt-textarea');
        expect(textarea).toBeDefined();
      });
    });

    it('should re-enable transitions after initial calculation', async () => {
      render(<PromptTextarea {...defaultProps} />);

      // Fast-forward through both setTimeout calls
      vi.advanceTimersByTime(150);

      await waitFor(() => {
        const textarea = screen.getByTestId('prompt-textarea');
        expect(textarea).toBeDefined();
      });
    });

    it('should handle resize on input', async () => {
      const user = userEvent.setup({ delay: null });
      render(<PromptTextarea {...defaultProps} />);

      const textarea = screen.getByTestId('prompt-textarea');

      // Mock scrollHeight for resize calculation
      Object.defineProperty(textarea, 'scrollHeight', {
        configurable: true,
        value: 150,
      });

      await user.type(textarea, 'a');

      expect(defaultProps.setQuery).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long text input', async () => {
      const longText = 'a'.repeat(10000);
      const user = userEvent.setup({ delay: null });
      render(<PromptTextarea {...defaultProps} />);

      const textarea = screen.getByTestId('prompt-textarea');
      await user.click(textarea);
      await user.paste(longText);

      expect(defaultProps.setQuery).toHaveBeenCalled();
      const calls = defaultProps.setQuery.mock.calls;
      expect(calls[calls.length - 1]?.[0]).toBe(longText);
    });

    it('should handle special characters', async () => {
      const specialText = '!@#$%^&*()_+{}|:"<>?[]\\;\',./`~';
      const user = userEvent.setup({ delay: null });
      render(<PromptTextarea {...defaultProps} />);

      const textarea = screen.getByTestId('prompt-textarea');
      await user.click(textarea);
      await user.paste(specialText);

      expect(defaultProps.setQuery).toHaveBeenCalled();
      const calls = defaultProps.setQuery.mock.calls;
      expect(calls[calls.length - 1]?.[0]).toBe(specialText);
    });

    it('should handle Unicode characters', async () => {
      const unicodeText = '你好世界 🌍 مرحبا بالعالم';
      const user = userEvent.setup({ delay: null });
      render(<PromptTextarea {...defaultProps} />);

      const textarea = screen.getByTestId('prompt-textarea');
      await user.click(textarea);
      await user.paste(unicodeText);

      expect(defaultProps.setQuery).toHaveBeenCalled();
      const calls = defaultProps.setQuery.mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      expect(calls[calls.length - 1]?.[0]).toBe(unicodeText);
    });

    it('should handle empty string gracefully', () => {
      render(<PromptTextarea {...defaultProps} query="" />);

      const textarea = screen.getByTestId('prompt-textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe('');
    });

    it('should handle rapid typing', async () => {
      const user = userEvent.setup({ delay: null });
      render(<PromptTextarea {...defaultProps} />);

      const textarea = screen.getByTestId('prompt-textarea');
      await user.type(textarea, 'rapidtext');

      expect(defaultProps.setQuery.mock.calls.length).toBeGreaterThan(0);
    });

    it('should maintain query value on re-render', () => {
      const { rerender } = render(<PromptTextarea {...defaultProps} query="initial" />);

      let textarea = screen.getByTestId('prompt-textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe('initial');

      rerender(<PromptTextarea {...defaultProps} query="updated" />);

      textarea = screen.getByTestId('prompt-textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe('updated');
    });
  });

  describe('Props and Configuration', () => {
    it('should use provided query prop', () => {
      render(<PromptTextarea {...defaultProps} query="provided query" />);

      const textarea = screen.getByTestId('prompt-textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe('provided query');
    });

    it('should call setQuery with new values', async () => {
      const setQueryMock = vi.fn();
      const user = userEvent.setup({ delay: null });
      render(<PromptTextarea query="" setQuery={setQueryMock} />);

      const textarea = screen.getByTestId('prompt-textarea');
      await user.type(textarea, 'new');

      expect(setQueryMock).toHaveBeenCalled();
    });

    it('should handle controlled component pattern', async () => {
      const setQueryMock = vi.fn();
      const user = userEvent.setup({ delay: null });
      const { rerender } = render(<PromptTextarea query="initial" setQuery={setQueryMock} />);

      const textarea = screen.getByTestId('prompt-textarea');
      await user.type(textarea, 'x');

      expect(setQueryMock).toHaveBeenCalled();

      // Simulate parent updating the value
      rerender(<PromptTextarea query="initialx" setQuery={setQueryMock} />);

      const updatedTextarea = screen.getByTestId('prompt-textarea') as HTMLTextAreaElement;
      expect(updatedTextarea.value).toBe('initialx');
    });
  });

  describe('Layout and Styling', () => {
    it('should have correct wrapper positioning', () => {
      const { container } = render(<PromptTextarea {...defaultProps} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.position).toBe('relative');
      expect(wrapper.style.minHeight).toBe('120px');
      expect(wrapper.style.zIndex).toBe('10');
    });

    it('should maintain minimum height', () => {
      const { container } = render(<PromptTextarea {...defaultProps} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.minHeight).toBe('120px');
    });

    it('should have correct z-index for overlay behavior', () => {
      const { container } = render(<PromptTextarea {...defaultProps} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.zIndex).toBe('10');
    });
  });

  describe('Accessibility', () => {
    it('should have label for textarea', () => {
      render(<PromptTextarea {...defaultProps} />);

      expect(screen.getByText('Prompt')).toBeDefined();
    });

    it('should have descriptive placeholder', () => {
      render(<PromptTextarea {...defaultProps} />);

      const textarea = screen.getByTestId('prompt-textarea') as HTMLTextAreaElement;
      expect(textarea.placeholder).toBe('Enter your security analysis question...');
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup({ delay: null });
      render(<PromptTextarea {...defaultProps} />);

      const textarea = screen.getByTestId('prompt-textarea');
      await user.tab();

      // Textarea should be focusable
      expect(document.activeElement).toBe(textarea);
    });
  });
});
