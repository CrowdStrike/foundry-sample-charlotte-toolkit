import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { IOCs } from '../../../types/security';
import { IOCDisplay } from '../IocDisplay';

// Mock component prop interfaces
interface SlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  size?: string;
  variant?: string;
}

interface SlIconProps {
  name: string;
  className?: string;
}

interface SlTooltipProps {
  children: React.ReactNode;
  content: string;
}

// Mock IOCCore
vi.mock('../../../utils/security/iocCore', () => ({
  IOCCore: {
    defang: vi.fn((text: string) => text.replace(/\./g, '[.]')),
  },
}));

// Mock Shoelace components
vi.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlButton: ({ children, onClick, className, size, variant, ...props }: SlButtonProps) => (
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

describe('IOCDisplay', () => {
  let mockClipboard: { writeText: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const createMockIOCs = (): IOCs => ({
    hashes: ['abc123', 'def456'],
    ips: ['192.168.1.1', '10.0.0.1'],
    domains: ['malicious.com', 'evil.net'],
    urls: ['http://bad.com/path', 'https://evil.org/malware'],
    file_paths: ['/tmp/malware.exe', 'C:\\Windows\\System32\\bad.dll'],
  });

  describe('Rendering', () => {
    it('should render successfully with IOCs', () => {
      const iocs = createMockIOCs();
      render(<IOCDisplay iocs={iocs} />);

      expect(screen.getByText(/HASHS \(2\)/i)).toBeDefined();
      expect(screen.getByText(/IPS \(2\)/i)).toBeDefined();
      expect(screen.getByText(/DOMAINS \(2\)/i)).toBeDefined();
    });

    it('should render all IOC types with correct counts', () => {
      const iocs = createMockIOCs();
      render(<IOCDisplay iocs={iocs} />);

      expect(screen.getByText(/HASHS \(2\)/i)).toBeDefined();
      expect(screen.getByText(/IPS \(2\)/i)).toBeDefined();
      expect(screen.getByText(/DOMAINS \(2\)/i)).toBeDefined();
      expect(screen.getByText(/URLS \(2\)/i)).toBeDefined();
      expect(screen.getByText(/PATHS \(2\)/i)).toBeDefined();
    });

    it('should render defanged IOCs', () => {
      const iocs: IOCs = {
        domains: ['example.com'],
        ips: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      expect(screen.getByText('example[.]com')).toBeDefined();
    });

    it('should render each IOC value in code elements', () => {
      const iocs: IOCs = {
        hashes: ['test-hash'],
        ips: [],
        domains: [],
        urls: [],
        file_paths: [],
      };

      const { container } = render(<IOCDisplay iocs={iocs} />);
      const codeElements = container.querySelectorAll('code');

      expect(codeElements.length).toBeGreaterThan(0);
      expect(codeElements[0]?.textContent).toBe('test-hash');
    });

    it('should render copy buttons for each IOC', () => {
      const iocs: IOCs = {
        ips: ['10.0.0.1'],
        domains: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      const copyButtons = screen.getAllByTestId('copy-button');
      expect(copyButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Empty States', () => {
    it('should not render sections for empty IOC arrays', () => {
      const iocs: IOCs = {
        hashes: [],
        ips: [],
        domains: [],
        urls: [],
        file_paths: [],
      };

      const { container } = render(<IOCDisplay iocs={iocs} />);

      expect(container.querySelector('.ioc-section-spacing')).toBeNull();
    });

    it('should not render sections for undefined IOC arrays', () => {
      const iocs = {
        hashes: undefined,
        ips: undefined,
        domains: [],
        urls: [],
        file_paths: [],
      } as unknown as IOCs;

      render(<IOCDisplay iocs={iocs} />);

      expect(screen.queryByText(/HASHS/i)).toBeNull();
      expect(screen.queryByText(/IPS/i)).toBeNull();
    });

    it('should render only sections with data', () => {
      const iocs: IOCs = {
        ips: ['10.0.0.1'],
        domains: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      expect(screen.getByText(/IPS \(1\)/i)).toBeDefined();
      expect(screen.queryByText(/HASHS/i)).toBeNull();
      expect(screen.queryByText(/DOMAINS/i)).toBeNull();
    });
  });

  describe('Copy Functionality', () => {
    it('should copy IOC to clipboard when copy button is clicked', async () => {
      const iocs: IOCs = {
        ips: ['192.168.1.1'],
        domains: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      const user = userEvent.setup({ delay: null });
      render(<IOCDisplay iocs={iocs} />);

      const copyButton = screen.getByTestId('copy-button');
      await user.click(copyButton);
      
      // Flush microtasks without advancing timers
      await vi.advanceTimersByTimeAsync(0);

      await waitFor(() => {
        expect(mockClipboard.writeText).toHaveBeenCalledWith('192.168.1.1');
      });
    });

    it('should copy original IOC not defanged version', async () => {
      const iocs: IOCs = {
        domains: ['example.com'],
        ips: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      const user = userEvent.setup({ delay: null });
      render(<IOCDisplay iocs={iocs} />);

      const copyButton = screen.getByTestId('copy-button');
      await user.click(copyButton);
      
      // Flush microtasks without advancing timers
      await vi.advanceTimersByTimeAsync(0);

      await waitFor(() => {
        // Should copy original, not defanged version
        expect(mockClipboard.writeText).toHaveBeenCalledWith('example.com');
      });
    });

    it('should show success icon after copying', async () => {
      const iocs: IOCs = {
        hashes: ['abc123'],
        ips: [],
        domains: [],
        urls: [],
        file_paths: [],
      };

      const user = userEvent.setup({ delay: null });
      render(<IOCDisplay iocs={iocs} />);

      const copyButton = screen.getByTestId('copy-button');
      await user.click(copyButton);
      
      // Flush microtasks without advancing timers
      await vi.advanceTimersByTimeAsync(0);

      await waitFor(() => {
        expect(screen.getByTestId('icon-check-circle')).toBeDefined();
      });
    });

    it('should revert to clipboard icon after timeout', async () => {
      const iocs: IOCs = {
        ips: ['10.0.0.1'],
        domains: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      const user = userEvent.setup({ delay: null });
      render(<IOCDisplay iocs={iocs} />);

      const copyButton = screen.getByTestId('copy-button');
      await user.click(copyButton);

      // Should show check-circle immediately
      await waitFor(() => {
        expect(screen.getByTestId('icon-check-circle')).toBeDefined();
      });

      // Advance timers by 2000ms to trigger reset
      vi.advanceTimersByTime(2000);

      await waitFor(() => {
        expect(screen.getByTestId('icon-clipboard')).toBeDefined();
      });
    });

    it('should update tooltip content when copy succeeds', async () => {
      const iocs: IOCs = {
        domains: ['test.com'],
        ips: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      const user = userEvent.setup({ delay: null });
      render(<IOCDisplay iocs={iocs} />);

      const copyButton = screen.getByTestId('copy-button');
      await user.click(copyButton);
      
      // Flush microtasks without advancing timers
      await vi.advanceTimersByTimeAsync(0);

      await waitFor(() => {
        const tooltip = screen.getByTestId('sl-tooltip');
        expect(tooltip.getAttribute('data-content')).toBe('Copied to clipboard!');
      });
    });

    it('should handle clipboard write failure gracefully', async () => {
      mockClipboard.writeText.mockRejectedValue(new Error('Clipboard failed'));

      const iocs: IOCs = {
        ips: ['10.0.0.1'],
        domains: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      const user = userEvent.setup({ delay: null });
      render(<IOCDisplay iocs={iocs} />);

      const copyButton = screen.getByTestId('copy-button');
      await user.click(copyButton);
      
      // Flush microtasks without advancing timers
      await vi.advanceTimersByTimeAsync(0);

      await waitFor(() => {
        // Should not throw and icon should remain clipboard
        expect(screen.getByTestId('icon-clipboard')).toBeDefined();
      });
    });

    it('should handle multiple IOCs independently', async () => {
      const iocs: IOCs = {
        ips: ['10.0.0.1', '192.168.1.1'],
        domains: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      const user = userEvent.setup({ delay: null });
      render(<IOCDisplay iocs={iocs} />);

      const copyButtons = screen.getAllByTestId('copy-button');
      expect(copyButtons.length).toBe(2);

      await user.click(copyButtons[0] as HTMLElement);
      await vi.advanceTimersByTimeAsync(0);
      await waitFor(() => {
        expect(mockClipboard.writeText).toHaveBeenCalledWith('10.0.0.1');
      });

      await user.click(copyButtons[1] as HTMLElement);
      await vi.advanceTimersByTimeAsync(0);
      await waitFor(() => {
        expect(mockClipboard.writeText).toHaveBeenCalledWith('192.168.1.1');
      });
    });
  });

  describe('IOC Types', () => {
    it('should render hashes correctly', () => {
      const iocs: IOCs = {
        hashes: ['abc123def456'],
        ips: [],
        domains: [],
        urls: [],
        file_paths: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      expect(screen.getByText(/HASHS \(1\)/i)).toBeDefined();
      expect(screen.getByText('abc123def456')).toBeDefined();
    });

    it('should render IPs correctly', () => {
      const iocs: IOCs = {
        ips: ['192.168.1.1'],
        hashes: [],
        domains: [],
        urls: [],
        file_paths: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      expect(screen.getByText(/IPS \(1\)/i)).toBeDefined();
    });

    it('should render domains correctly', () => {
      const iocs: IOCs = {
        domains: ['malicious.com'],
        ips: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      expect(screen.getByText(/DOMAINS \(1\)/i)).toBeDefined();
    });

    it('should render URLs correctly', () => {
      const iocs: IOCs = {
        urls: ['http://bad.com'],
        ips: [],
        domains: [],
        hashes: [],
        file_paths: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      expect(screen.getByText(/URLS \(1\)/i)).toBeDefined();
    });

    it('should render file paths correctly', () => {
      const iocs: IOCs = {
        file_paths: ['/tmp/malware.exe'],
        ips: [],
        domains: [],
        hashes: [],
        urls: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      expect(screen.getByText(/PATHS \(1\)/i)).toBeDefined();
    });
  });

  describe('Defanging', () => {
    it('should display defanged values', () => {
      const iocs: IOCs = {
        ips: ['10.0.0.1'],
        domains: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      // Mock returns text with [.] instead of .
      expect(screen.getByText('10[.]0[.]0[.]1')).toBeDefined();
    });

    it('should defang multiple IOC values', () => {
      const iocs: IOCs = {
        domains: ['test.com', 'example.org'],
        ips: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      expect(screen.getByText('test[.]com')).toBeDefined();
      expect(screen.getByText('example[.]org')).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long IOC values', () => {
      const longHash = 'a'.repeat(500);
      const iocs: IOCs = {
        hashes: [longHash],
        ips: [],
        domains: [],
        urls: [],
        file_paths: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      expect(screen.getByText(longHash)).toBeDefined();
    });

    it('should handle special characters in IOCs', () => {
      const specialPath = 'C:\\Users\\Admin\\Desktop\\file.exe';
      const iocs: IOCs = {
        file_paths: [specialPath],
        ips: [],
        domains: [],
        hashes: [],
        urls: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      expect(screen.getByText(specialPath)).toBeDefined();
    });

    it('should handle Unicode in IOCs', () => {
      const unicodeDomain = '测试.com';
      const iocs: IOCs = {
        domains: [unicodeDomain],
        ips: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      // Check that it renders the defanged version
      expect(screen.getByText('测试[.]com')).toBeDefined();
    });

    it('should handle duplicate IOCs', () => {
      const iocs: IOCs = {
        ips: ['10.0.0.1', '10.0.0.1'],
        domains: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      expect(screen.getByText(/IPS \(2\)/i)).toBeDefined();
      const copyButtons = screen.getAllByTestId('copy-button');
      expect(copyButtons.length).toBe(2);
    });

    it('should handle mixed case in IOC values', () => {
      const iocs: IOCs = {
        domains: ['MixedCase.COM'],
        ips: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      // Check that it renders the defanged version
      expect(screen.getByText('MixedCase[.]COM')).toBeDefined();
    });
  });

  describe('Styling and Layout', () => {
    it('should apply ioc-section-spacing class to sections', () => {
      const iocs: IOCs = {
        ips: ['10.0.0.1'],
        domains: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      const { container } = render(<IOCDisplay iocs={iocs} />);

      const section = container.querySelector('.ioc-section-spacing');
      expect(section).toBeDefined();
    });

    it('should apply ioc-type-header class to headers', () => {
      const iocs: IOCs = {
        hashes: ['abc'],
        ips: [],
        domains: [],
        urls: [],
        file_paths: [],
      };

      const { container } = render(<IOCDisplay iocs={iocs} />);

      const header = container.querySelector('.ioc-type-header');
      expect(header).toBeDefined();
    });

    it('should apply ioc-value-item class to each IOC', () => {
      const iocs: IOCs = {
        domains: ['test.com'],
        ips: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      const { container } = render(<IOCDisplay iocs={iocs} />);

      const item = container.querySelector('.ioc-value-item');
      expect(item).toBeDefined();
    });

    it('should apply copy button classes', () => {
      const iocs: IOCs = {
        ips: ['10.0.0.1'],
        domains: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      render(<IOCDisplay iocs={iocs} />);

      const button = screen.getByTestId('copy-button');
      expect(button.className).toContain('compact-copy-btn');
      expect(button.className).toContain('ioc-copy-btn');
    });
  });

  describe('Copy State Management', () => {
    it('should manage separate copy states for different IOCs', async () => {
      const iocs: IOCs = {
        ips: ['10.0.0.1', '192.168.1.1'],
        domains: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      const user = userEvent.setup({ delay: null });
      render(<IOCDisplay iocs={iocs} />);

      const copyButtons = screen.getAllByTestId('copy-button');
      expect(copyButtons.length).toBe(2);

      // Click first button
      await user.click(copyButtons[0] as HTMLElement);
      await vi.advanceTimersByTimeAsync(0);

      await waitFor(() => {
        const icons = screen.getAllByTestId(/^icon-/);
        const hasCheckCircle = icons.some(
          (icon) => icon.getAttribute('data-testid') === 'icon-check-circle',
        );
        expect(hasCheckCircle).toBe(true);
      });

      // Second button should still show clipboard
      const clipboardIcons = screen.getAllByTestId('icon-clipboard');
      expect(clipboardIcons.length).toBeGreaterThan(0);
    });

    it('should clear copy state after timeout', async () => {
      const iocs: IOCs = {
        domains: ['test.com'],
        ips: [],
        hashes: [],
        urls: [],
        file_paths: [],
      };

      const user = userEvent.setup({ delay: null });
      render(<IOCDisplay iocs={iocs} />);

      const copyButton = screen.getByTestId('copy-button');
      await user.click(copyButton);
      await vi.advanceTimersByTimeAsync(0);

      // Verify success state
      await waitFor(() => {
        expect(screen.getByTestId('icon-check-circle')).toBeDefined();
      });

      // Fast forward 2000ms to trigger reset
      await vi.advanceTimersByTimeAsync(2000);

      // Should revert to clipboard
      await waitFor(() => {
        expect(screen.getByTestId('icon-clipboard')).toBeDefined();
      });
    });
  });
});
