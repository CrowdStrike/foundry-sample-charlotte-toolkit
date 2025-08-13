// src/components/form/__tests__/SubmitSection.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SubmitSection from '../SubmitSection';

// Mock Shoelace components
jest.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlCheckbox: ({ children, checked, size, onSlChange, ...props }: any) => (
    <div data-testid="sl-checkbox" data-checked={checked} data-size={size}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          const customEvent = new CustomEvent('sl-change');
          Object.defineProperty(customEvent, 'target', {
            value: e.target,
            enumerable: true
          });
          onSlChange?.(customEvent);
        }}
        {...props}
      />
      <label>{children}</label>
    </div>
  ),
  SlButton: ({ children, variant, size, disabled, onClick, ...props }: any) => (
    <button
      data-testid="sl-button"
      data-variant={variant}
      data-size={size}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
  SlIcon: ({ slot, name, ...props }: any) => (
    <span data-testid="sl-icon" data-slot={slot} data-name={name} {...props}>
      {name}
    </span>
  ),
}));

describe('SubmitSection Component', () => {
  const defaultProps = {
    quotaAcknowledged: false,
    setQuotaAcknowledged: jest.fn(),
    loading: false,
    query: 'test query',
    handleSubmit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render checkbox and button', () => {
      render(<SubmitSection {...defaultProps} />);

      expect(screen.getByTestId('sl-checkbox')).toBeInTheDocument();
      expect(screen.getByTestId('sl-button')).toBeInTheDocument();
      expect(screen.getByText('I understand this will use Charlotte AI credits')).toBeInTheDocument();
    });

    it('should render with correct structure and classes', () => {
      const { container } = render(<SubmitSection {...defaultProps} />);

      expect(container.firstChild).toHaveClass('flex', 'flex-col', 'gap-3', 'mt-3');
      expect(container.querySelector('.flex.items-center.justify-between.gap-4')).toBeInTheDocument();
    });

    it('should render checkbox with correct props', () => {
      render(<SubmitSection {...defaultProps} quotaAcknowledged={true} />);

      const checkbox = screen.getByTestId('sl-checkbox');
      expect(checkbox).toHaveAttribute('data-checked', 'true');
      expect(checkbox).toHaveAttribute('data-size', 'small');
    });

    it('should render button with correct props when not loading', () => {
      render(<SubmitSection {...defaultProps} quotaAcknowledged={true} />);

      const button = screen.getByTestId('sl-button');
      expect(button).toHaveAttribute('data-variant', 'primary');
      expect(button).toHaveAttribute('data-size', 'medium');
      expect(button).not.toBeDisabled();
      expect(screen.getByText('Analyze with Charlotte')).toBeInTheDocument();
    });

    it('should render button with loading state', () => {
      render(<SubmitSection {...defaultProps} loading={true} quotaAcknowledged={true} />);

      expect(screen.getByText('Analyzing...')).toBeInTheDocument();
      expect(screen.getByTestId('sl-button')).toBeDisabled();
    });
  });

  describe('Checkbox Functionality', () => {
    it('should call setQuotaAcknowledged when checkbox is clicked', () => {
      render(<SubmitSection {...defaultProps} />);

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      expect(defaultProps.setQuotaAcknowledged).toHaveBeenCalledWith(true);
    });

    it('should call setQuotaAcknowledged with false when checked checkbox is clicked', () => {
      render(<SubmitSection {...defaultProps} quotaAcknowledged={true} />);

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      expect(defaultProps.setQuotaAcknowledged).toHaveBeenCalledWith(false);
    });
  });

  describe('Button States', () => {
    it('should disable button when quota not acknowledged', () => {
      render(<SubmitSection {...defaultProps} quotaAcknowledged={false} />);

      expect(screen.getByTestId('sl-button')).toBeDisabled();
    });

    it('should disable button when query is empty', () => {
      render(<SubmitSection {...defaultProps} query="" quotaAcknowledged={true} />);

      expect(screen.getByTestId('sl-button')).toBeDisabled();
    });

    it('should disable button when query is only whitespace', () => {
      render(<SubmitSection {...defaultProps} query={"   \n\t  "} quotaAcknowledged={true} />);

      expect(screen.getByTestId('sl-button')).toBeDisabled();
    });

    it('should disable button when loading', () => {
      render(<SubmitSection {...defaultProps} loading={true} quotaAcknowledged={true} />);

      expect(screen.getByTestId('sl-button')).toBeDisabled();
    });

    it('should enable button when all conditions are met', () => {
      render(<SubmitSection {...defaultProps} quotaAcknowledged={true} query="valid query" />);

      expect(screen.getByTestId('sl-button')).not.toBeDisabled();
    });
  });

  describe('Button Icon States', () => {
    it('should show send icon when not loading', () => {
      render(<SubmitSection {...defaultProps} />);

      const icon = screen.getByTestId('sl-icon');
      expect(icon).toHaveAttribute('data-name', 'send');
      expect(icon).toHaveAttribute('data-slot', 'prefix');
    });

    it('should show hourglass icon when loading', () => {
      render(<SubmitSection {...defaultProps} loading={true} />);

      const icon = screen.getByTestId('sl-icon');
      expect(icon).toHaveAttribute('data-name', 'hourglass-split');
      expect(icon).toHaveAttribute('data-slot', 'prefix');
    });
  });

  describe('Button Click Handler', () => {
    it('should call handleSubmit when button is clicked and enabled', () => {
      render(<SubmitSection {...defaultProps} quotaAcknowledged={true} />);

      const button = screen.getByTestId('sl-button');
      fireEvent.click(button);

      expect(defaultProps.handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should not call handleSubmit when button is disabled', () => {
      render(<SubmitSection {...defaultProps} quotaAcknowledged={false} />);

      const button = screen.getByTestId('sl-button');
      fireEvent.click(button);

      expect(defaultProps.handleSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty query string', () => {
      render(<SubmitSection {...defaultProps} query="" />);

      expect(screen.getByTestId('sl-button')).toBeDisabled();
    });

    it('should handle undefined query gracefully', () => {
      render(<SubmitSection {...defaultProps} query={undefined as any} />);

      expect(screen.getByTestId('sl-button')).toBeDisabled();
    });

    it('should handle null query gracefully', () => {
      render(<SubmitSection {...defaultProps} query={null as any} />);

      expect(screen.getByTestId('sl-button')).toBeDisabled();
    });

    it('should handle multiple spaces in query', () => {
      render(<SubmitSection {...defaultProps} query="   valid   query   " quotaAcknowledged={true} />);

      expect(screen.getByTestId('sl-button')).not.toBeDisabled();
    });
  });

  describe('Prop Changes', () => {
    it('should update when quotaAcknowledged changes', () => {
      const { rerender } = render(<SubmitSection {...defaultProps} quotaAcknowledged={false} />);

      expect(screen.getByTestId('sl-checkbox')).toHaveAttribute('data-checked', 'false');

      rerender(<SubmitSection {...defaultProps} quotaAcknowledged={true} />);

      expect(screen.getByTestId('sl-checkbox')).toHaveAttribute('data-checked', 'true');
    });

    it('should update when loading state changes', () => {
      const { rerender } = render(<SubmitSection {...defaultProps} loading={false} quotaAcknowledged={true} />);

      expect(screen.getByText('Analyze with Charlotte')).toBeInTheDocument();
      expect(screen.getByTestId('sl-icon')).toHaveAttribute('data-name', 'send');

      rerender(<SubmitSection {...defaultProps} loading={true} quotaAcknowledged={true} />);

      expect(screen.getByText('Analyzing...')).toBeInTheDocument();
      expect(screen.getByTestId('sl-icon')).toHaveAttribute('data-name', 'hourglass-split');
    });
  });
});
