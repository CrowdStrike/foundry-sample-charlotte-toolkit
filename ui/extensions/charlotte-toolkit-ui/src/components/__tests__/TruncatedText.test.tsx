// src/components/__tests__/TruncatedText.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import TruncatedText from '../TruncatedText';

// Mock Shoelace SlTooltip
jest.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlTooltip: ({ children, content, placement, hoist, className, trigger, distance, ...props }: any) => (
    <div
      data-testid="sl-tooltip"
      data-content={content}
      data-placement={placement}
      data-hoist={hoist}
      data-classname={className}
      data-trigger={trigger}
      data-distance={distance}
      {...props}
    >
      {children}
    </div>
  ),
}));

describe('TruncatedText Component', () => {
  const defaultProps = {
    originalText: 'This is the full original text',
    displayText: 'This is the full original text',
    children: <span>Test content</span>,
  };

  describe('Component Rendering', () => {
    it('should render children without tooltip when text is not truncated', () => {
      render(<TruncatedText {...defaultProps} />);

      expect(screen.getByText('Test content')).toBeInTheDocument();
      expect(screen.queryByTestId('sl-tooltip')).not.toBeInTheDocument();
    });

    it('should render children with tooltip when text is truncated', () => {
      const truncatedProps = {
        ...defaultProps,
        displayText: 'This is truncated...',
      };

      render(<TruncatedText {...truncatedProps} />);

      expect(screen.getByText('Test content')).toBeInTheDocument();
      expect(screen.getByTestId('sl-tooltip')).toBeInTheDocument();
    });

    it('should render with different types of children', () => {
      const stringChild = (
        <TruncatedText
          originalText="Full text"
          displayText="Truncated..."
          children="String child"
        />
      );

      const { rerender } = render(stringChild);
      expect(screen.getByText('String child')).toBeInTheDocument();

      const elementChild = (
        <TruncatedText
          originalText="Full text"
          displayText="Truncated..."
          children={<div data-testid="custom-element">Custom element</div>}
        />
      );

      rerender(elementChild);
      expect(screen.getByTestId('custom-element')).toBeInTheDocument();
      expect(screen.getByText('Custom element')).toBeInTheDocument();
    });
  });

  describe('Truncation Logic', () => {
    it('should detect truncation when originalText !== displayText', () => {
      render(
        <TruncatedText
          originalText="This is a very long text that gets truncated"
          displayText="This is a very long..."
          children={<span>Truncated content</span>}
        />
      );

      expect(screen.getByTestId('sl-tooltip')).toBeInTheDocument();
    });

    it('should not detect truncation when originalText === displayText', () => {
      render(
        <TruncatedText
          originalText="Short text"
          displayText="Short text"
          children={<span>Non-truncated content</span>}
        />
      );

      expect(screen.queryByTestId('sl-tooltip')).not.toBeInTheDocument();
    });

    it('should handle empty strings correctly', () => {
      render(
        <TruncatedText
          originalText=""
          displayText=""
          children={<span>Empty text</span>}
        />
      );

      expect(screen.queryByTestId('sl-tooltip')).not.toBeInTheDocument();
    });

    it('should handle case where displayText is empty but originalText is not', () => {
      render(
        <TruncatedText
          originalText="Original text"
          displayText=""
          children={<span>Content</span>}
        />
      );

      expect(screen.getByTestId('sl-tooltip')).toBeInTheDocument();
    });

    it('should handle case where originalText is empty but displayText is not', () => {
      render(
        <TruncatedText
          originalText=""
          displayText="Display text"
          children={<span>Content</span>}
        />
      );

      expect(screen.getByTestId('sl-tooltip')).toBeInTheDocument();
    });
  });

  describe('Tooltip Configuration', () => {
    it('should set correct tooltip content from originalText', () => {
      const originalText = 'This is the complete original text content';
      
      render(
        <TruncatedText
          originalText={originalText}
          displayText="Truncated..."
          children={<span>Content</span>}
        />
      );

      const tooltip = screen.getByTestId('sl-tooltip');
      expect(tooltip).toHaveAttribute('data-content', originalText);
    });

    it('should use default placement of "top"', () => {
      render(
        <TruncatedText
          originalText="Full text"
          displayText="Truncated..."
          children={<span>Content</span>}
        />
      );

      const tooltip = screen.getByTestId('sl-tooltip');
      expect(tooltip).toHaveAttribute('data-placement', 'top');
    });

    it('should accept custom placement prop', () => {
      const placements = [
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ] as const;

      placements.forEach(placement => {
        const { unmount } = render(
          <TruncatedText
            originalText="Full text"
            displayText="Truncated..."
            placement={placement}
            children={<span data-testid={`content-${placement}`}>Content</span>}
          />
        );

        const tooltip = screen.getByTestId('sl-tooltip');
        expect(tooltip).toHaveAttribute('data-placement', placement);
        
        // Clean up after each render
        unmount();
      });
    });

    it('should set correct tooltip props', () => {
      render(
        <TruncatedText
          originalText="Full text"
          displayText="Truncated..."
          children={<span>Content</span>}
        />
      );

      const tooltip = screen.getByTestId('sl-tooltip');
      expect(tooltip).toHaveAttribute('data-hoist', 'true');
      expect(tooltip).toHaveAttribute('data-classname', 'truncated-text-tooltip');
      expect(tooltip).toHaveAttribute('data-trigger', 'hover focus');
      expect(tooltip).toHaveAttribute('data-distance', '8');
    });
  });

  describe('Edge Cases', () => {
    it('should handle whitespace differences', () => {
      render(
        <TruncatedText
          originalText="Text with   spaces"
          displayText="Text with spaces"
          children={<span>Content</span>}
        />
      );

      expect(screen.getByTestId('sl-tooltip')).toBeInTheDocument();
    });

    it('should handle special characters', () => {
      render(
        <TruncatedText
          originalText="Text with special chars: @#$%^&*()"
          displayText="Text with special chars..."
          children={<span>Content</span>}
        />
      );

      const tooltip = screen.getByTestId('sl-tooltip');
      expect(tooltip).toHaveAttribute('data-content', 'Text with special chars: @#$%^&*()');
    });

    it('should handle unicode characters', () => {
      render(
        <TruncatedText
          originalText="Unicode text: 你好世界 émojis 🌟"
          displayText="Unicode text..."
          children={<span>Content</span>}
        />
      );

      const tooltip = screen.getByTestId('sl-tooltip');
      expect(tooltip).toHaveAttribute('data-content', 'Unicode text: 你好世界 émojis 🌟');
    });

    it('should handle very long text', () => {
      const longText = 'a'.repeat(1000);
      const truncatedText = 'a'.repeat(50) + '...';

      render(
        <TruncatedText
          originalText={longText}
          displayText={truncatedText}
          children={<span>Content</span>}
        />
      );

      const tooltip = screen.getByTestId('sl-tooltip');
      expect(tooltip).toHaveAttribute('data-content', longText);
    });
  });

  describe('Component Behavior', () => {
    it('should preserve children structure in both truncated and non-truncated states', () => {
      const complexChildren = (
        <div>
          <span>First child</span>
          <div data-testid="nested">Nested content</div>
        </div>
      );

      const { rerender } = render(
        <TruncatedText
          originalText="Same text"
          displayText="Same text"
          children={complexChildren}
        />
      );

      expect(screen.getByText('First child')).toBeInTheDocument();
      expect(screen.getByTestId('nested')).toBeInTheDocument();

      rerender(
        <TruncatedText
          originalText="Different original text"
          displayText="Different display text"
          children={complexChildren}
        />
      );

      expect(screen.getByText('First child')).toBeInTheDocument();
      expect(screen.getByTestId('nested')).toBeInTheDocument();
    });

    it('should re-render correctly when props change', () => {
      const { rerender } = render(
        <TruncatedText
          originalText="Original"
          displayText="Original"
          children={<span>Content</span>}
        />
      );

      expect(screen.queryByTestId('sl-tooltip')).not.toBeInTheDocument();

      rerender(
        <TruncatedText
          originalText="Original text"
          displayText="Truncated..."
          children={<span>Content</span>}
        />
      );

      expect(screen.getByTestId('sl-tooltip')).toBeInTheDocument();
    });
  });

  describe('Default Export', () => {
    it('should be available as default export', () => {
      expect(TruncatedText).toBeDefined();
      expect(typeof TruncatedText).toBe('function');
    });
  });
});
