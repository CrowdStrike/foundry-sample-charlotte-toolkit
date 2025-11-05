import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SubmitSection from '../SubmitSection';

// Mock component prop types
interface SlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

interface SlCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  checked?: boolean;
  onSlChange?: (event: CustomEvent) => void;
}

interface SlIconProps {
  name?: string;
  slot?: string;
}

// Mock Shoelace components
vi.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlButton: ({ children, disabled, onClick, ...props }: SlButtonProps) => (
    <button {...props} disabled={disabled} onClick={onClick} data-testid="submit-button">
      {children}
    </button>
  ),
  SlCheckbox: ({ children, checked, onSlChange, ...props }: SlCheckboxProps) => (
    <div data-testid="checkbox-wrapper">
      <input
        {...props}
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          const customEvent = new CustomEvent('sl-change', {
            detail: {},
          });
          Object.defineProperty(customEvent, 'target', {
            value: e.target,
            writable: false,
          });
          onSlChange?.(customEvent as unknown as CustomEvent);
        }}
        data-testid="quota-checkbox"
        aria-label="quota acknowledgment"
      />
      <span>{children}</span>
    </div>
  ),
  SlIcon: ({ name, slot }: SlIconProps) => (
    <span data-testid={`icon-${name}`} data-slot={slot}>
      {name}
    </span>
  ),
}));

describe('SubmitSection', () => {
  const defaultProps = {
    quotaAcknowledged: false,
    setQuotaAcknowledged: vi.fn(),
    loading: false,
    query: 'test query',
    handleSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render successfully with all elements', () => {
      render(<SubmitSection {...defaultProps} />);

      expect(screen.getByTestId('quota-checkbox')).toBeDefined();
      expect(screen.getByText(/I understand this will use Charlotte AI credits/i)).toBeDefined();
      expect(screen.getByTestId('submit-button')).toBeDefined();
    });

    it('should render submit button with correct text when not loading', () => {
      render(<SubmitSection {...defaultProps} />);

      expect(screen.getByText('Analyze with Charlotte')).toBeDefined();
      expect(screen.getByTestId('icon-send')).toBeDefined();
    });

    it('should render submit button with loading text when loading', () => {
      render(<SubmitSection {...defaultProps} loading={true} />);

      expect(screen.getByText('Analyzing...')).toBeDefined();
      expect(screen.getByTestId('icon-hourglass-split')).toBeDefined();
    });

    it('should render checkbox as checked when quotaAcknowledged is true', () => {
      render(<SubmitSection {...defaultProps} quotaAcknowledged={true} />);

      const checkbox = screen.getByTestId('quota-checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('should render checkbox as unchecked when quotaAcknowledged is false', () => {
      render(<SubmitSection {...defaultProps} />);

      const checkbox = screen.getByTestId('quota-checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });
  });

  describe('Button State', () => {
    it('should disable button when query is empty', () => {
      render(<SubmitSection {...defaultProps} query="" quotaAcknowledged={true} />);

      const button = screen.getByTestId('submit-button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('should disable button when query contains only whitespace', () => {
      render(<SubmitSection {...defaultProps} query="   " quotaAcknowledged={true} />);

      const button = screen.getByTestId('submit-button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('should disable button when quota is not acknowledged', () => {
      render(<SubmitSection {...defaultProps} quotaAcknowledged={false} />);

      const button = screen.getByTestId('submit-button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('should disable button when loading', () => {
      render(<SubmitSection {...defaultProps} loading={true} quotaAcknowledged={true} />);

      const button = screen.getByTestId('submit-button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('should enable button when all conditions are met', () => {
      render(<SubmitSection {...defaultProps} quotaAcknowledged={true} />);

      const button = screen.getByTestId('submit-button') as HTMLButtonElement;
      expect(button.disabled).toBe(false);
    });

    it('should disable button when multiple conditions fail', () => {
      render(<SubmitSection {...defaultProps} query="" loading={true} quotaAcknowledged={false} />);

      const button = screen.getByTestId('submit-button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });
  });

  describe('User Interactions', () => {
    it('should call setQuotaAcknowledged when checkbox is clicked', async () => {
      const user = userEvent.setup();
      render(<SubmitSection {...defaultProps} />);

      const checkbox = screen.getByTestId('quota-checkbox');
      await user.click(checkbox);

      expect(defaultProps.setQuotaAcknowledged).toHaveBeenCalledTimes(1);
      expect(defaultProps.setQuotaAcknowledged).toHaveBeenCalledWith(true);
    });

    it('should call setQuotaAcknowledged with false when unchecking', async () => {
      const user = userEvent.setup();
      render(<SubmitSection {...defaultProps} quotaAcknowledged={true} />);

      const checkbox = screen.getByTestId('quota-checkbox');
      await user.click(checkbox);

      expect(defaultProps.setQuotaAcknowledged).toHaveBeenCalledTimes(1);
      expect(defaultProps.setQuotaAcknowledged).toHaveBeenCalledWith(false);
    });

    it('should call handleSubmit when button is clicked', async () => {
      const user = userEvent.setup();
      render(<SubmitSection {...defaultProps} quotaAcknowledged={true} />);

      const button = screen.getByTestId('submit-button');
      await user.click(button);

      expect(defaultProps.handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should not call handleSubmit when button is disabled', async () => {
      const user = userEvent.setup();
      render(<SubmitSection {...defaultProps} quotaAcknowledged={false} />);

      const button = screen.getByTestId('submit-button');
      await user.click(button);

      // Button is disabled, so click won't trigger handler
      expect(defaultProps.handleSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null query gracefully', () => {
      render(
        <SubmitSection
          {...defaultProps}
          query={null as unknown as string}
          quotaAcknowledged={true}
        />,
      );

      const button = screen.getByTestId('submit-button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('should handle undefined query gracefully', () => {
      render(
        <SubmitSection
          {...defaultProps}
          query={undefined as unknown as string}
          quotaAcknowledged={true}
        />,
      );

      const button = screen.getByTestId('submit-button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('should handle very long query text', () => {
      const longQuery = 'a'.repeat(10000);
      render(<SubmitSection {...defaultProps} query={longQuery} quotaAcknowledged={true} />);

      const button = screen.getByTestId('submit-button') as HTMLButtonElement;
      expect(button.disabled).toBe(false);
    });

    it('should handle rapid checkbox toggling', async () => {
      const user = userEvent.setup();
      render(<SubmitSection {...defaultProps} />);

      const checkbox = screen.getByTestId('quota-checkbox');

      await user.click(checkbox);
      await user.click(checkbox);
      await user.click(checkbox);

      expect(defaultProps.setQuotaAcknowledged).toHaveBeenCalledTimes(3);
    });

    it('should maintain state consistency during loading', () => {
      const { rerender } = render(
        <SubmitSection {...defaultProps} loading={false} quotaAcknowledged={true} />,
      );

      let button = screen.getByTestId('submit-button') as HTMLButtonElement;
      expect(button.disabled).toBe(false);

      rerender(<SubmitSection {...defaultProps} loading={true} quotaAcknowledged={true} />);

      button = screen.getByTestId('submit-button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
      expect(screen.getByText('Analyzing...')).toBeDefined();
    });
  });

  describe('Loading State', () => {
    it('should show loading icon when loading is true', () => {
      render(<SubmitSection {...defaultProps} loading={true} />);

      const loadingIcon = screen.getByTestId('icon-hourglass-split');
      expect(loadingIcon).toBeDefined();
    });

    it('should show send icon when loading is false', () => {
      render(<SubmitSection {...defaultProps} loading={false} />);

      const sendIcon = screen.getByTestId('icon-send');
      expect(sendIcon).toBeDefined();
    });

    it('should update button text based on loading state', () => {
      const { rerender } = render(<SubmitSection {...defaultProps} loading={false} />);
      expect(screen.getByText('Analyze with Charlotte')).toBeDefined();

      rerender(<SubmitSection {...defaultProps} loading={true} />);
      expect(screen.getByText('Analyzing...')).toBeDefined();
    });
  });

  describe('Query Validation', () => {
    it('should enable button with valid query and acknowledged quota', () => {
      render(<SubmitSection {...defaultProps} query="valid query" quotaAcknowledged={true} />);

      const button = screen.getByTestId('submit-button') as HTMLButtonElement;
      expect(button.disabled).toBe(false);
    });

    it('should disable button with tabs and spaces only', () => {
      render(<SubmitSection {...defaultProps} query="\t\n  \t" quotaAcknowledged={true} />);

      const button = screen.getByTestId('submit-button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    it('should enable button with query containing special characters', () => {
      render(<SubmitSection {...defaultProps} query="test@#$%^&*()" quotaAcknowledged={true} />);

      const button = screen.getByTestId('submit-button') as HTMLButtonElement;
      expect(button.disabled).toBe(false);
    });

    it('should enable button with multiline query', () => {
      render(
        <SubmitSection {...defaultProps} query="line1\nline2\nline3" quotaAcknowledged={true} />,
      );

      const button = screen.getByTestId('submit-button') as HTMLButtonElement;
      expect(button.disabled).toBe(false);
    });
  });
});
