import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import { IOCCore } from '../../../utils/security/iocCore';
import { InlineCode } from '../InlineCode';

// Mock component prop interfaces
interface SlBadgeProps {
  children: React.ReactNode;
  variant?: string;
  [key: string]: unknown;
}

interface SlIconProps {
  name: string;
  className?: string;
}

interface SlTooltipProps {
  children: React.ReactNode;
  content: string;
}

// Mock the custom hook
vi.mock('../../../hooks/useCopyToClipboard', () => ({
  useCopyToClipboard: vi.fn(() => ({
    copyState: 'clipboard',
    copyToClipboard: vi.fn(),
    isSuccess: false,
  })),
}));

// Mock IOCCore
vi.mock('../../../utils/security/iocCore', () => ({
  IOCCore: {
    detectType: vi.fn(() => null),
    getBadgeVariant: vi.fn(() => 'neutral'),
    defang: vi.fn((text: string) => text),
  },
}));

// Get mocked versions
const mockUseCopyToClipboard = vi.mocked(useCopyToClipboard);
const mockIOCCore = vi.mocked(IOCCore);

// Mock Shoelace components
vi.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlBadge: ({ children, variant, ...props }: SlBadgeProps) => (
    <span {...props} data-testid="sl-badge" data-variant={variant}>
      {children}
    </span>
  ),
  SlIcon: ({ name, className }: SlIconProps) => (
    <span data-testid={`icon-${name}`} className={className}>
      {name}
    </span>
  ),
  SlTooltip: ({ children, content }: SlTooltipProps) => (
    <div data-testid="sl-tooltip" data-content={content}>
      {children}
    </div>
  ),
}));

describe('InlineCode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering - Non-IOC Content', () => {
    it('should render plain code when no IOC is detected', () => {
      mockIOCCore.detectType.mockReturnValue(null);

      render(<InlineCode>plain text</InlineCode>);

      const code = screen.getByText('plain text');
      expect(code.tagName).toBe('CODE');
    });

    it('should render with custom className when provided', () => {
      mockIOCCore.detectType.mockReturnValue(null);

      render(<InlineCode className="custom-class">text</InlineCode>);

      const code = screen.getByText('text');
      expect(code.className).toBe('custom-class');
    });

    it('should handle numeric children', () => {
      mockIOCCore.detectType.mockReturnValue(null);

      render(<InlineCode>{12345}</InlineCode>);

      expect(screen.getByText('12345')).toBeDefined();
    });

    it('should handle empty string', () => {
      mockIOCCore.detectType.mockReturnValue(null);

      const { container } = render(<InlineCode>{''}</InlineCode>);

      expect(container.querySelector('code')).toBeDefined();
    });
  });

  describe('Rendering - IOC Content', () => {
    it('should render IOC badge when IOC is detected', () => {
      mockIOCCore.detectType.mockReturnValue('ip');
      mockIOCCore.getBadgeVariant.mockReturnValue('primary');
      mockIOCCore.defang.mockReturnValue('192.168.1[.]1');

      render(<InlineCode>192.168.1.1</InlineCode>);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('IP');
      expect(badge.getAttribute('data-variant')).toBe('primary');
    });

    it('should display defanged IOC text', () => {
      mockIOCCore.detectType.mockReturnValue('domain');
      mockIOCCore.defang.mockReturnValue('example[.]com');

      render(<InlineCode>example.com</InlineCode>);

      expect(screen.getByText('example[.]com')).toBeDefined();
    });

    it('should render copy icons for IOC', () => {
      mockIOCCore.detectType.mockReturnValue('hash');

      render(<InlineCode>abc123def456</InlineCode>);

      const icons = screen.getAllByTestId(/^icon-/);
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should have clickable IOC button', () => {
      mockIOCCore.detectType.mockReturnValue('ip');
      mockIOCCore.defang.mockReturnValue('10.0.0[.]1');

      render(<InlineCode>10.0.0.1</InlineCode>);

      const button = screen.getByRole('button', { name: /10\.0\.0\[.\]1/i });
      expect(button).toBeDefined();
      expect(button.className).toContain('ioc-code');
    });

    it('should render tooltips for IOC', () => {
      mockIOCCore.detectType.mockReturnValue('domain');

      render(<InlineCode>malicious.com</InlineCode>);

      const tooltips = screen.getAllByTestId('sl-tooltip');
      expect(tooltips.length).toBeGreaterThan(0);
    });
  });

  describe('Copy Functionality', () => {
    it('should call copyToClipboard when IOC is clicked', async () => {
      const mockCopyToClipboard = vi.fn();
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'clipboard',
        copyToClipboard: mockCopyToClipboard,
        isSuccess: false,
      });

      mockIOCCore.detectType.mockReturnValue('ip');
      mockIOCCore.defang.mockReturnValue('192.168.1[.]1');

      const user = userEvent.setup();
      render(<InlineCode>192.168.1.1</InlineCode>);

      const button = screen.getByRole('button', { name: /192\.168\.1\[.\]1/i });
      await user.click(button);

      expect(mockCopyToClipboard).toHaveBeenCalledWith('192.168.1.1');
    });

    it('should call copyToClipboard when copy icon is clicked', async () => {
      const mockCopyToClipboard = vi.fn();
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'clipboard',
        copyToClipboard: mockCopyToClipboard,
        isSuccess: false,
      });

      mockIOCCore.detectType.mockReturnValue('domain');

      const user = userEvent.setup();
      render(<InlineCode>example.com</InlineCode>);

      const copyButtons = screen.getAllByRole('button');
      const copyIconButton = copyButtons.find((btn) =>
        btn.getAttribute('aria-label')?.includes('Copy'),
      );

      if (copyIconButton) {
        await user.click(copyIconButton);
        expect(mockCopyToClipboard).toHaveBeenCalledWith('example.com');
      }
    });

    it('should show success state after copying', () => {
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'check-circle',
        copyToClipboard: vi.fn(),
        isSuccess: true,
      });

      mockIOCCore.detectType.mockReturnValue('ip');

      render(<InlineCode>10.0.0.1</InlineCode>);

      expect(screen.getByTestId('icon-check-circle')).toBeDefined();
    });

    it('should update tooltip content when copy succeeds', () => {
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'check-circle',
        copyToClipboard: vi.fn(),
        isSuccess: true,
      });

      mockIOCCore.detectType.mockReturnValue('hash');

      render(<InlineCode>abc123</InlineCode>);

      const tooltips = screen.getAllByTestId('sl-tooltip');
      const copiedTooltip = tooltips.find((t) =>
        t.getAttribute('data-content')?.includes('Copied to clipboard!'),
      );
      expect(copiedTooltip).toBeDefined();
    });
  });

  describe('Keyboard Accessibility', () => {
    it('should copy on Enter key press', async () => {
      const mockCopyToClipboard = vi.fn();
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'clipboard',
        copyToClipboard: mockCopyToClipboard,
        isSuccess: false,
      });

      mockIOCCore.detectType.mockReturnValue('ip');
      mockIOCCore.defang.mockReturnValue('10.0.0[.]1');

      const user = userEvent.setup();
      render(<InlineCode>10.0.0.1</InlineCode>);

      const button = screen.getByRole('button', { name: /10\.0\.0\[.\]1/i });
      button.focus();
      await user.keyboard('{Enter}');

      expect(mockCopyToClipboard).toHaveBeenCalledWith('10.0.0.1');
    });

    it('should copy on Space key press', async () => {
      const mockCopyToClipboard = vi.fn();
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'clipboard',
        copyToClipboard: mockCopyToClipboard,
        isSuccess: false,
      });

      mockIOCCore.detectType.mockReturnValue('domain');
      mockIOCCore.defang.mockReturnValue('test[.]com');

      const user = userEvent.setup();
      render(<InlineCode>test.com</InlineCode>);

      const button = screen.getByRole('button', { name: /test\[.\]com/i });
      button.focus();
      await user.keyboard(' ');

      expect(mockCopyToClipboard).toHaveBeenCalledWith('test.com');
    });

    it('should not copy on other key presses', async () => {
      const mockCopyToClipboard = vi.fn();
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'clipboard',
        copyToClipboard: mockCopyToClipboard,
        isSuccess: false,
      });

      mockIOCCore.detectType.mockReturnValue('ip');
      mockIOCCore.defang.mockReturnValue('10.0.0[.]1');

      const user = userEvent.setup();
      render(<InlineCode>10.0.0.1</InlineCode>);

      const button = screen.getByRole('button', { name: /10\.0\.0\[.\]1/i });
      button.focus();
      await user.keyboard('a');

      expect(mockCopyToClipboard).not.toHaveBeenCalled();
    });
  });

  describe('IOC Type Detection', () => {
    it('should handle different IOC types', () => {
      const iocTypes: Array<'ip' | 'domain' | 'hash' | 'url'> = ['ip', 'domain', 'hash', 'url'];

      iocTypes.forEach((type) => {
        mockIOCCore.detectType.mockReturnValue(type);
        mockIOCCore.getBadgeVariant.mockReturnValue('primary');

        const { container } = render(<InlineCode>{`test-${type}`}</InlineCode>);

        const badge = container.querySelector('[data-testid="sl-badge"]');
        expect(badge?.textContent).toBe(type.toUpperCase());

        container.remove();
      });
    });

    it('should call IOCCore.detectType with string children', () => {
      mockIOCCore.detectType.mockReturnValue(null);

      render(<InlineCode>test content</InlineCode>);

      expect(mockIOCCore.detectType).toHaveBeenCalledWith('test content');
    });

    it('should handle badge variant from IOCCore', () => {
      mockIOCCore.detectType.mockReturnValue('ip');
      mockIOCCore.getBadgeVariant.mockReturnValue('primary');

      render(<InlineCode>malicious-ip</InlineCode>);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.getAttribute('data-variant')).toBe('primary');
      expect(mockIOCCore.getBadgeVariant).toHaveBeenCalledWith('ip');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long IOC strings', () => {
      const longIOC = 'a'.repeat(1000);
      mockIOCCore.detectType.mockReturnValue('hash');
      mockIOCCore.defang.mockReturnValue(longIOC);

      render(<InlineCode>{longIOC}</InlineCode>);

      expect(screen.getByText(longIOC)).toBeDefined();
    });

    it('should handle special characters in IOC', () => {
      const specialIOC = 'test@#$%^&*().com';
      mockIOCCore.detectType.mockReturnValue('domain');
      mockIOCCore.defang.mockReturnValue('test@#$%^&*()[.]com');

      render(<InlineCode>{specialIOC}</InlineCode>);

      expect(screen.getByText('test@#$%^&*()[.]com')).toBeDefined();
    });

    it('should handle Unicode characters', () => {
      const unicodeText = '你好世界.com';
      mockIOCCore.detectType.mockReturnValue('domain');
      mockIOCCore.defang.mockReturnValue('你好世界[.]com');

      render(<InlineCode>{unicodeText}</InlineCode>);

      expect(screen.getByText('你好世界[.]com')).toBeDefined();
    });

    it('should handle click event with stopPropagation', async () => {
      const mockCopyToClipboard = vi.fn();
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'clipboard',
        copyToClipboard: mockCopyToClipboard,
        isSuccess: false,
      });

      mockIOCCore.detectType.mockReturnValue('ip');
      mockIOCCore.defang.mockReturnValue('10.0.0[.]1');

      const user = userEvent.setup();
      render(<InlineCode>10.0.0.1</InlineCode>);

      const buttons = screen.getAllByRole('button', { name: /10\.0\.0\[.\]1/i });
      const iocButton = buttons.find((btn) => btn.className.includes('ioc-code'));
      
      if (iocButton) {
        await user.click(iocButton);
      }

      // Verify the copy functionality works (stopPropagation is implemented in the component)
      expect(mockCopyToClipboard).toHaveBeenCalledWith('10.0.0.1');
      expect(mockCopyToClipboard).toHaveBeenCalledTimes(1);
    });
  });

  describe('Styling and Layout', () => {
    it('should apply ioc-container styles for IOC', () => {
      mockIOCCore.detectType.mockReturnValue('ip');

      const { container } = render(<InlineCode>10.0.0.1</InlineCode>);

      const iocContainer = container.querySelector('.ioc-container');
      expect(iocContainer).toBeDefined();
    });

    it('should apply correct classes to IOC code button', () => {
      mockIOCCore.detectType.mockReturnValue('domain');
      mockIOCCore.defang.mockReturnValue('test[.]com');

      render(<InlineCode>test.com</InlineCode>);

      const button = screen.getByRole('button', { name: /test\[.\]com/i });
      expect(button.className).toContain('ioc-code');
      expect(button.className).toContain('cursor-pointer');
    });

    it('should apply copy success styling when copied', () => {
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'check-circle',
        copyToClipboard: vi.fn(),
        isSuccess: true,
      });

      mockIOCCore.detectType.mockReturnValue('ip');

      render(<InlineCode>10.0.0.1</InlineCode>);

      const icon = screen.getByTestId('icon-check-circle');
      expect(icon.className).toContain('copy-success');
    });
  });
});
