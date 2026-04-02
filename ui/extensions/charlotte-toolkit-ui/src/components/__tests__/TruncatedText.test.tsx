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
  };

  describe('Component Rendering', () => {
    it('should render children without tooltip when text is not truncated', () => {
      render(<TruncatedText {...defaultProps}><span>Test content</span></TruncatedText>);

      expect(screen.getByText('Test content')).toBeInTheDocument();
      expect(screen.queryByTestId('sl-tooltip')).not.toBeInTheDocument();
    });

    it('should render children with tooltip when text is truncated', () => {
      const truncatedProps = {
        ...defaultProps,
        displayText: 'This is truncated...',
      };

      render(<TruncatedText {...truncatedProps}><span>Test content</span></TruncatedText>);

      expect(screen.getByText('Test content')).toBeInTheDocument();
      expect(screen.getByTestId('sl-tooltip')).toBeInTheDocument();
    });

    it('should render with different types of children', () => {
      const { rerender } = render(
        <TruncatedText
          originalText="Full text"
          displayText="Truncated..."
        >
          {"String child"}
        </TruncatedText>
      );
      expect(screen.getByText('String child')).toBeInTheDocument();

      rerender(
        <TruncatedText
          originalText="Full text"
          displayText="Truncated..."
        >
          <div data-testid="custom-element">Custom element</div>
        </TruncatedText>
      );
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
        >
          <span>Truncated content</span>
        </TruncatedText>
      );

      expect(screen.getByTestId('sl-tooltip')).toBeInTheDocument();
    });

    it('should not detect truncation when originalText === displayText', () => {
      render(
        <TruncatedText
          originalText="Short text"
          displayText="Short text"
        >
          <span>Non-truncated content</span>
        </TruncatedText>
      );

      expect(screen.queryByTestId('sl-tooltip')).not.toBeInTheDocument();
    });

    it('should handle empty strings correctly', () => {
      render(
        <TruncatedText
          originalText=""
          displayText=""
        >
          <span>Empty text</span>
        </TruncatedText>
      );

      expect(screen.queryByTestId('sl-tooltip')).not.toBeInTheDocument();
    });

    it('should handle case where displayText is empty but originalText is not', () => {
      render(
        <TruncatedText
          originalText="Original text"
          displayText=""
        >
          <span>Content</span>
        </TruncatedText>
      );

      expect(screen.getByTestId('sl-tooltip')).toBeInTheDocument();
    });

    it('should handle case where originalText is empty but displayText is not', () => {
      render(
        <TruncatedText
          originalText=""
          displayText="Display text"
        >
          <span>Content</span>
        </TruncatedText>
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
        >
          <span>Content</span>
        </TruncatedText>
      );

      const tooltip = screen.getByTestId('sl-tooltip');
      expect(tooltip).toHaveAttribute('data-content', originalText);
    });

    it('should use default placement of "top"', () => {
      render(
        <TruncatedText
          originalText="Full text"
          displayText="Truncated..."
        >
          <span>Content</span>
        </TruncatedText>
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
          >
            <span data-testid={`content-${placement}`}>Content</span>
          </TruncatedText>
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
        >
          <span>Content</span>
        </TruncatedText>
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
        >
          <span>Content</span>
        </TruncatedText>
      );

      expect(screen.getByTestId('sl-tooltip')).toBeInTheDocument();
    });

    it('should handle special characters', () => {
      render(
        <TruncatedText
          originalText="Text with special chars: @#$%^&*()"
          displayText="Text with special chars..."
        >
          <span>Content</span>
        </TruncatedText>
      );

      const tooltip = screen.getByTestId('sl-tooltip');
      expect(tooltip).toHaveAttribute('data-content', 'Text with special chars: @#$%^&*()');
    });

    it('should handle unicode characters', () => {
      render(
        <TruncatedText
          originalText="Unicode text: 你好世界 émojis 🌟"
          displayText="Unicode text..."
        >
          <span>Content</span>
        </TruncatedText>
      );

      const tooltip = screen.getByTestId('sl-tooltip');
      expect(tooltip).toHaveAttribute('data-content', 'Unicode text: 你好世界 émojis 🌟');
    });

    it('should handle very long text', () => {
      const longText = 'a'.repeat(1000);
      const truncatedText = `${'a'.repeat(50)}...`;

      render(
        <TruncatedText
          originalText={longText}
          displayText={truncatedText}
        >
          <span>Content</span>
        </TruncatedText>
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
        >
          {complexChildren}
        </TruncatedText>
      );

      expect(screen.getByText('First child')).toBeInTheDocument();
      expect(screen.getByTestId('nested')).toBeInTheDocument();

      rerender(
        <TruncatedText
          originalText="Different original text"
          displayText="Different display text"
        >
          {complexChildren}
        </TruncatedText>
      );

      expect(screen.getByText('First child')).toBeInTheDocument();
      expect(screen.getByTestId('nested')).toBeInTheDocument();
    });

    it('should re-render correctly when props change', () => {
      const { rerender } = render(
        <TruncatedText
          originalText="Original"
          displayText="Original"
        >
          <span>Content</span>
        </TruncatedText>
      );

      expect(screen.queryByTestId('sl-tooltip')).not.toBeInTheDocument();

      rerender(
        <TruncatedText
          originalText="Original text"
          displayText="Truncated..."
        >
          <span>Content</span>
        </TruncatedText>
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
