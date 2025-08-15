// src/components/markdown/__tests__/CodeBlock.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CodeBlock } from '../CodeBlock';

// Mock useCopyToClipboard hook
jest.mock('../../../hooks/useCopyToClipboard', () => ({
  useCopyToClipboard: jest.fn(() => ({
    copyState: 'copy',
    copyToClipboard: jest.fn(),
  })),
}));

// Mock Shoelace components
jest.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlButton: ({ children, size, variant, onClick, className, ...props }: any) => (
    <button
      data-testid="sl-button"
      data-size={size}
      data-variant={variant}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
  SlIcon: ({ name, ...props }: any) => (
    <span data-testid="sl-icon" data-name={name} {...props}>
      {name}
    </span>
  ),
  SlBadge: ({ children, variant, ...props }: any) => (
    <span data-testid="sl-badge" data-variant={variant} {...props}>
      {children}
    </span>
  ),
  SlTooltip: ({ children, content, placement, distance, hoist, ...props }: any) => (
    <div
      data-testid="sl-tooltip"
      data-content={content}
      data-placement={placement}
      data-distance={distance}
      data-hoist={hoist}
      {...props}
    >
      {children}
    </div>
  ),
}));

import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';

const mockUseCopyToClipboard = useCopyToClipboard as jest.MockedFunction<typeof useCopyToClipboard>;

describe('CodeBlock Component', () => {
  const mockCopyToClipboard = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCopyToClipboard.mockReturnValue({
      copyState: 'copy',
      copyToClipboard: mockCopyToClipboard,
    });
  });

  describe('Component Rendering', () => {
    it('should render with basic props', () => {
      render(<CodeBlock>const test = "hello";</CodeBlock>);

      expect(screen.getByText('const test = "hello";')).toBeInTheDocument();
      expect(screen.getByTestId('sl-badge')).toBeInTheDocument();
      expect(screen.getByTestId('sl-button')).toBeInTheDocument();
    });

    it('should render with language class', () => {
      render(<CodeBlock className="language-javascript">const test = "hello";</CodeBlock>);

      expect(screen.getByTestId('sl-badge')).toHaveTextContent('javascript');
    });

    it('should render with default language when no className', () => {
      render(<CodeBlock>const test = "hello";</CodeBlock>);

      expect(screen.getByTestId('sl-badge')).toHaveTextContent('text');
    });

    it('should render code in pre/code structure', () => {
      const { container } = render(<CodeBlock className="language-python">print("hello")</CodeBlock>);

      const pre = container.querySelector('pre');
      const code = container.querySelector('code');

      expect(pre).toBeInTheDocument();
      expect(code).toBeInTheDocument();
      expect(pre).toHaveClass('enhanced-code-block');
      expect(code).toHaveClass('language-python');
      expect(code).toHaveTextContent('print("hello")');
    });
  });

  describe('Language Badge', () => {
    it('should display correct language from className', () => {
      render(<CodeBlock className="language-typescript">interface Test {}</CodeBlock>);

      expect(screen.getByTestId('sl-badge')).toHaveTextContent('typescript');
      expect(screen.getByTestId('sl-badge')).toHaveAttribute('data-variant', 'neutral');
    });

    it('should handle className without language prefix', () => {
      render(<CodeBlock className="custom-class">code content</CodeBlock>);

      expect(screen.getByTestId('sl-badge')).toHaveTextContent('custom-class');
    });

    it('should handle empty className', () => {
      render(<CodeBlock className="">code content</CodeBlock>);

      expect(screen.getByTestId('sl-badge')).toHaveTextContent('');
    });
  });

  describe('Copy Functionality', () => {
    it('should call copyToClipboard with code content when copy button is clicked', () => {
      const jsonCode = '{"key": "value"}';
      render(<CodeBlock className="language-json">{jsonCode}</CodeBlock>);

      const copyButton = screen.getByTestId('sl-button');
      fireEvent.click(copyButton);

      expect(mockCopyToClipboard).toHaveBeenCalledWith(jsonCode);
    });

    it('should handle complex children content', () => {
      const complexCode = `
        function example() {
          return "complex code";
        }
      `;
      render(<CodeBlock className="language-javascript">{complexCode}</CodeBlock>);

      const copyButton = screen.getByTestId('sl-button');
      fireEvent.click(copyButton);

      expect(mockCopyToClipboard).toHaveBeenCalledWith(complexCode);
    });
  });

  describe('Copy Button States', () => {
    it('should show copy icon when in default state', () => {
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'copy',
        copyToClipboard: mockCopyToClipboard,
      });

      render(<CodeBlock>test code</CodeBlock>);

      expect(screen.getByTestId('sl-icon')).toHaveAttribute('data-name', 'copy');
    });

    it('should show check-circle icon when copy is successful', () => {
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'check-circle',
        copyToClipboard: mockCopyToClipboard,
      });

      render(<CodeBlock>test code</CodeBlock>);

      expect(screen.getByTestId('sl-icon')).toHaveAttribute('data-name', 'check-circle');
    });

    it('should have correct button styling for default state', () => {
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'copy',
        copyToClipboard: mockCopyToClipboard,
      });

      render(<CodeBlock>test code</CodeBlock>);

      const button = screen.getByTestId('sl-button');
      expect(button).toHaveAttribute('data-size', 'small');
      expect(button).toHaveAttribute('data-variant', 'text');
      expect(button).toHaveClass('text-body-and-labels');
    });

    it('should have correct button styling for success state', () => {
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'check-circle',
        copyToClipboard: mockCopyToClipboard,
      });

      render(<CodeBlock>test code</CodeBlock>);

      const button = screen.getByTestId('sl-button');
      expect(button).toHaveClass('copy-success');
    });
  });

  describe('Tooltip Configuration', () => {
    it('should show copy tooltip for default state', () => {
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'copy',
        copyToClipboard: mockCopyToClipboard,
      });

      render(<CodeBlock className="language-python">print("test")</CodeBlock>);

      const tooltip = screen.getByTestId('sl-tooltip');
      expect(tooltip).toHaveAttribute('data-content', 'Copy python code to clipboard');
      expect(tooltip).toHaveAttribute('data-placement', 'top');
      expect(tooltip).toHaveAttribute('data-distance', '8');
      expect(tooltip).toHaveAttribute('data-hoist', 'true');
    });

    it('should show success tooltip for success state', () => {
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'check-circle',
        copyToClipboard: mockCopyToClipboard,
      });

      render(<CodeBlock className="language-javascript">console.log("test")</CodeBlock>);

      const tooltip = screen.getByTestId('sl-tooltip');
      expect(tooltip).toHaveAttribute('data-content', 'Copied to clipboard!');
    });
  });

  describe('CSS Classes', () => {
    it('should apply correct CSS classes to container', () => {
      const { container } = render(<CodeBlock>test</CodeBlock>);

      expect(container.firstChild).toHaveClass('relative', 'group');
    });

    it('should apply correct CSS classes to header', () => {
      const { container } = render(<CodeBlock>test</CodeBlock>);

      const header = container.querySelector('.flex.items-center.justify-between.mb-2');
      expect(header).toBeInTheDocument();
    });

    it('should apply hover and transition classes to button', () => {
      render(<CodeBlock>test</CodeBlock>);

      const button = screen.getByTestId('sl-button');
      expect(button).toHaveClass('compact-copy-btn', 'opacity-0', 'group-hover:opacity-100', 'transition-opacity');
    });
  });

  describe('Edge Cases', () => {
    it('should handle null children', () => {
      render(<CodeBlock>{null}</CodeBlock>);

      expect(screen.getByTestId('sl-badge')).toHaveTextContent('text');
    });

    it('should handle undefined children', () => {
      render(<CodeBlock>{undefined}</CodeBlock>);

      expect(screen.getByTestId('sl-badge')).toHaveTextContent('text');
    });

    it('should handle empty string children', () => {
      render(<CodeBlock>{""}</CodeBlock>);

      const copyButton = screen.getByTestId('sl-button');
      fireEvent.click(copyButton);

      expect(mockCopyToClipboard).toHaveBeenCalledWith('');
    });

    it('should handle numeric children', () => {
      render(<CodeBlock>{42}</CodeBlock>);

      const copyButton = screen.getByTestId('sl-button');
      fireEvent.click(copyButton);

      expect(mockCopyToClipboard).toHaveBeenCalledWith('42');
    });
  });
});
