import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import { CodeBlock } from '../CodeBlock';

// Mock the custom hook
vi.mock('../../../hooks/useCopyToClipboard', () => ({
  useCopyToClipboard: vi.fn(() => ({
    copyState: 'clipboard',
    copyToClipboard: vi.fn(),
    isSuccess: false,
  })),
}));

// Get mocked version
const mockUseCopyToClipboard = vi.mocked(useCopyToClipboard);

// Mock Shoelace components
vi.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlBadge: ({
    children,
    variant,
    ...props
  }: React.ComponentPropsWithoutRef<'span'> & { variant?: string }) => (
    <span {...props} data-testid="sl-badge" data-variant={variant}>
      {children}
    </span>
  ),
  SlButton: ({
    children,
    onClick,
    className,
    size,
    variant,
    ...props
  }: React.ComponentPropsWithoutRef<'button'> & { size?: string; variant?: string }) => (
    <button
      {...props}
      onClick={onClick}
      className={className}
      data-testid="copy-button"
      data-size={size}
      data-variant={variant}
    >
      {children}
    </button>
  ),
  SlIcon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
  SlTooltip: ({ children, content }: React.PropsWithChildren<{ content: string }>) => (
    <div data-testid="sl-tooltip" data-content={content}>
      {children}
    </div>
  ),
}));

describe('CodeBlock', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render successfully with code content', () => {
      render(<CodeBlock>const x = 1;</CodeBlock>);

      expect(screen.getByText('const x = 1;')).toBeDefined();
    });

    it('should render language badge with default text language', () => {
      render(<CodeBlock>plain text</CodeBlock>);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('text');
    });

    it('should render language badge from className', () => {
      render(<CodeBlock className="language-javascript">const x = 1;</CodeBlock>);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('javascript');
    });

    it('should render copy button', () => {
      render(<CodeBlock>code content</CodeBlock>);

      expect(screen.getByTestId('copy-button')).toBeDefined();
    });

    it('should render with pre and code elements', () => {
      const { container } = render(<CodeBlock>test code</CodeBlock>);

      const pre = container.querySelector('pre');
      const code = container.querySelector('code');

      expect(pre).toBeDefined();
      expect(code).toBeDefined();
      expect(code?.textContent).toBe('test code');
    });

    it('should apply enhanced-code-block class to pre element', () => {
      const { container } = render(<CodeBlock>test</CodeBlock>);

      const pre = container.querySelector('pre');
      expect(pre?.className).toBe('enhanced-code-block');
    });

    it('should render clipboard icon by default', () => {
      render(<CodeBlock>code</CodeBlock>);

      expect(screen.getByTestId('icon-clipboard')).toBeDefined();
    });
  });

  describe('Language Detection', () => {
    it('should extract language from className with language- prefix', () => {
      render(<CodeBlock className="language-python">print("hello")</CodeBlock>);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('python');
    });

    it('should handle TypeScript language', () => {
      render(<CodeBlock className="language-typescript">const x: number = 1;</CodeBlock>);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('typescript');
    });

    it('should handle JSON language', () => {
      render(<CodeBlock className="language-json">{`{"key": "value"}`}</CodeBlock>);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('json');
    });

    it('should handle shell/bash language', () => {
      render(<CodeBlock className="language-bash">npm install</CodeBlock>);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('bash');
    });

    it('should handle multiple language prefixes correctly', () => {
      render(<CodeBlock className="language-css other-class">body {}</CodeBlock>);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toContain('css');
    });

    it('should preserve className on code element', () => {
      const { container } = render(<CodeBlock className="language-java">code</CodeBlock>);

      const code = container.querySelector('code');
      expect(code?.className).toBe('language-java');
    });
  });

  describe('Copy Functionality', () => {
    it('should call copyToClipboard when copy button is clicked', async () => {
      const mockCopyToClipboard = vi.fn();
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'clipboard',
        copyToClipboard: mockCopyToClipboard,
        isSuccess: false,
      });

      const user = userEvent.setup();
      render(<CodeBlock>test code content</CodeBlock>);

      const copyButton = screen.getByTestId('copy-button');
      await user.click(copyButton);

      expect(mockCopyToClipboard).toHaveBeenCalledWith('test code content');
      expect(mockCopyToClipboard).toHaveBeenCalledTimes(1);
    });

    it('should copy complete multiline code', async () => {
      const mockCopyToClipboard = vi.fn();
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'clipboard',
        copyToClipboard: mockCopyToClipboard,
        isSuccess: false,
      });

      const multilineCode = `function test() {
  console.log('hello');
  return true;
}`;

      const user = userEvent.setup();
      render(<CodeBlock>{multilineCode}</CodeBlock>);

      const copyButton = screen.getByTestId('copy-button');
      await user.click(copyButton);

      expect(mockCopyToClipboard).toHaveBeenCalledWith(multilineCode);
    });

    it('should show success icon after copying', () => {
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'check-circle',
        copyToClipboard: vi.fn(),
        isSuccess: true,
      });

      render(<CodeBlock>code</CodeBlock>);

      expect(screen.getByTestId('icon-check-circle')).toBeDefined();
    });

    it('should update tooltip content when copy succeeds', () => {
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'check-circle',
        copyToClipboard: vi.fn(),
        isSuccess: true,
      });

      render(<CodeBlock className="language-javascript">code</CodeBlock>);

      const tooltip = screen.getByTestId('sl-tooltip');
      expect(tooltip.getAttribute('data-content')).toBe('Copied to clipboard!');
    });

    it('should show copy tooltip with language name', () => {
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'clipboard',
        copyToClipboard: vi.fn(),
        isSuccess: false,
      });

      render(<CodeBlock className="language-python">code</CodeBlock>);

      const tooltip = screen.getByTestId('sl-tooltip');
      expect(tooltip.getAttribute('data-content')).toBe('Copy python code to clipboard');
    });

    it('should handle multiple clicks on copy button', async () => {
      const mockCopyToClipboard = vi.fn();
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'clipboard',
        copyToClipboard: mockCopyToClipboard,
        isSuccess: false,
      });

      const user = userEvent.setup();
      render(<CodeBlock>code</CodeBlock>);

      const copyButton = screen.getByTestId('copy-button');

      await user.click(copyButton);
      await user.click(copyButton);
      await user.click(copyButton);

      expect(mockCopyToClipboard).toHaveBeenCalledTimes(3);
    });
  });

  describe('Styling and Classes', () => {
    it('should apply compact-copy-btn class to button', () => {
      render(<CodeBlock>code</CodeBlock>);

      const button = screen.getByTestId('copy-button');
      expect(button.className).toContain('compact-copy-btn');
    });

    it('should apply opacity classes for hover effect', () => {
      render(<CodeBlock>code</CodeBlock>);

      const button = screen.getByTestId('copy-button');
      expect(button.className).toContain('opacity-0');
      expect(button.className).toContain('group-hover:opacity-100');
    });

    it('should apply copy-success class when copied', () => {
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'check-circle',
        copyToClipboard: vi.fn(),
        isSuccess: true,
      });

      render(<CodeBlock>code</CodeBlock>);

      const button = screen.getByTestId('copy-button');
      expect(button.className).toContain('copy-success');
    });

    it('should apply text-body-and-labels class when not copied', () => {
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'clipboard',
        copyToClipboard: vi.fn(),
        isSuccess: false,
      });

      render(<CodeBlock>code</CodeBlock>);

      const button = screen.getByTestId('copy-button');
      expect(button.className).toContain('text-body-and-labels');
    });

    it('should have neutral variant badge', () => {
      render(<CodeBlock>code</CodeBlock>);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.getAttribute('data-variant')).toBe('neutral');
    });

    it('should have small size button', () => {
      render(<CodeBlock>code</CodeBlock>);

      const button = screen.getByTestId('copy-button');
      expect(button.getAttribute('data-size')).toBe('small');
    });

    it('should have text variant button', () => {
      render(<CodeBlock>code</CodeBlock>);

      const button = screen.getByTestId('copy-button');
      expect(button.getAttribute('data-variant')).toBe('text');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty code content', () => {
      const { container } = render(<CodeBlock>{''}</CodeBlock>);

      const code = container.querySelector('code');
      expect(code?.textContent).toBe('');
    });

    it('should handle very long code blocks', () => {
      const longCode = 'a'.repeat(10000);
      render(<CodeBlock>{longCode}</CodeBlock>);

      expect(screen.getByText(longCode)).toBeDefined();
    });

    it('should handle special characters in code', () => {
      const specialCode = '<script>alert("test")</script>';
      render(<CodeBlock>{specialCode}</CodeBlock>);

      expect(screen.getByText(specialCode)).toBeDefined();
    });

    it('should handle Unicode characters', () => {
      const unicodeCode = '// 你好世界\nconst x = "🌍";';
      const { container } = render(<CodeBlock>{unicodeCode}</CodeBlock>);

      const code = container.querySelector('code');
      expect(code?.textContent).toBe(unicodeCode);
    });

    it('should handle numeric children', () => {
      render(<CodeBlock>{12345}</CodeBlock>);

      expect(screen.getByText('12345')).toBeDefined();
    });

    it('should handle tabs and special whitespace', () => {
      const tabCode = '\t\tindented\n\t\tcode';
      const { container } = render(<CodeBlock>{tabCode}</CodeBlock>);

      const code = container.querySelector('code');
      expect(code?.textContent).toBe(tabCode);
    });

    it('should preserve leading/trailing whitespace', () => {
      const whitespaceCode = '  leading  \n  trailing  ';
      const { container } = render(<CodeBlock>{whitespaceCode}</CodeBlock>);

      const code = container.querySelector('code');
      expect(code?.textContent).toBe(whitespaceCode);
    });

    it('should handle className with no language prefix', () => {
      render(<CodeBlock className="custom-class">code</CodeBlock>);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('custom-class');
    });

    it('should handle undefined className', () => {
      render(<CodeBlock>code</CodeBlock>);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('text');
    });
  });

  describe('Layout Structure', () => {
    it('should have correct wrapper structure', () => {
      const { container } = render(<CodeBlock>code</CodeBlock>);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.position).toBe('relative');
    });

    it('should have header section with badge and button', () => {
      const { container } = render(<CodeBlock>code</CodeBlock>);

      const header = container.querySelector('div > div');
      expect(header).toBeDefined();

      const badge = screen.getByTestId('sl-badge');
      const button = screen.getByTestId('copy-button');

      expect(badge).toBeDefined();
      expect(button).toBeDefined();
    });

    it('should render tooltip wrapper around button', () => {
      render(<CodeBlock>code</CodeBlock>);

      const tooltip = screen.getByTestId('sl-tooltip');
      const button = screen.getByTestId('copy-button');

      expect(tooltip).toBeDefined();
      expect(button.parentElement).toBe(tooltip);
    });
  });

  describe('Accessibility', () => {
    it('should have clickable copy button', async () => {
      const user = userEvent.setup();
      render(<CodeBlock>code</CodeBlock>);

      const button = screen.getByTestId('copy-button');
      expect(button.tagName).toBe('BUTTON');

      await user.click(button);
      // Should not throw
    });

    it('should show helpful tooltip content', () => {
      render(<CodeBlock className="language-javascript">code</CodeBlock>);

      const tooltip = screen.getByTestId('sl-tooltip');
      const content = tooltip.getAttribute('data-content');

      expect(content).toContain('Copy');
      expect(content).toContain('javascript');
    });

    it('should have semantic code structure', () => {
      const { container } = render(<CodeBlock>code</CodeBlock>);

      const pre = container.querySelector('pre');
      const code = pre?.querySelector('code');

      expect(pre).toBeDefined();
      expect(code).toBeDefined();
    });
  });

  describe('Integration with useCopyToClipboard', () => {
    it('should use hook return values correctly', () => {
      const mockCopyToClipboard = vi.fn();
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'clipboard',
        copyToClipboard: mockCopyToClipboard,
        isSuccess: false,
      });

      render(<CodeBlock>test</CodeBlock>);

      expect(mockUseCopyToClipboard).toHaveBeenCalled();
      expect(screen.getByTestId('icon-clipboard')).toBeDefined();
    });

    it('should react to copyState changes', () => {
      const { rerender } = render(<CodeBlock>code</CodeBlock>);

      // Initial state
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'clipboard',
        copyToClipboard: vi.fn(),
        isSuccess: false,
      });

      rerender(<CodeBlock>code</CodeBlock>);
      expect(screen.getByTestId('icon-clipboard')).toBeDefined();

      // Success state
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'check-circle',
        copyToClipboard: vi.fn(),
        isSuccess: true,
      });

      rerender(<CodeBlock>code</CodeBlock>);
      expect(screen.getByTestId('icon-check-circle')).toBeDefined();
    });
  });
});
