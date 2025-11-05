import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MITRETechnique } from '../../../types/security';
import { MITREDisplay } from '../MitreDisplay';

// Mock utility functions
vi.mock('../../../utils/helpers', () => ({
  buildMitreUrl: vi.fn(
    (techniqueId: string) => `https://attack.mitre.org/techniques/${techniqueId}/`,
  ),
}));

vi.mock('../../../utils/textFormatting', () => ({
  formatMitreDescription: vi.fn((description: string) => [description]),
}));

// Mock component prop interfaces
interface MockSlBadgeProps {
  children: React.ReactNode;
  variant?: string;
  className?: string;
  [key: string]: unknown;
}

interface MockSlButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: string;
  variant?: string;
  [key: string]: unknown;
}

interface MockSlIconProps {
  name: string;
  className?: string;
}

interface MockSlTooltipProps {
  children: React.ReactNode;
  content: string;
}

// Mock Shoelace components
vi.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlBadge: ({ children, variant, className, ...props }: MockSlBadgeProps) => (
    <span {...props} data-testid="sl-badge" data-variant={variant} className={className}>
      {children}
    </span>
  ),
  SlButton: ({ children, onClick, className, size, variant, ...props }: MockSlButtonProps) => (
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
  SlIcon: ({ name, className }: MockSlIconProps) => (
    <span data-testid={`icon-${name}`} className={className}>
      {name}
    </span>
  ),
  SlTooltip: ({ children, content }: MockSlTooltipProps) => (
    <div data-testid="sl-tooltip" data-content={content}>
      {children}
    </div>
  ),
}));

describe('MITREDisplay', () => {
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

  const createMockTechnique = (overrides?: Partial<MITRETechnique>): MITRETechnique => ({
    technique_id: 'T1059',
    technique_name: 'Command and Scripting Interpreter',
    description: 'Adversaries may abuse command and script interpreters to execute commands.',
    ...overrides,
  });

  describe('Rendering', () => {
    it('should render successfully with techniques', () => {
      const techniques = [createMockTechnique()];
      render(<MITREDisplay techniques={techniques} />);

      expect(screen.getByText('T1059')).toBeDefined();
      expect(screen.getByText('Command and Scripting Interpreter')).toBeDefined();
    });

    it('should render multiple techniques', () => {
      const techniques = [
        createMockTechnique({ technique_id: 'T1059', technique_name: 'Command Interpreter' }),
        createMockTechnique({
          technique_id: 'T1071',
          technique_name: 'Application Layer Protocol',
        }),
      ];

      render(<MITREDisplay techniques={techniques} />);

      expect(screen.getByText('T1059')).toBeDefined();
      expect(screen.getByText('T1071')).toBeDefined();
    });

    it('should render technique descriptions', () => {
      const techniques = [
        createMockTechnique({
          description: 'Test description for the technique',
        }),
      ];

      render(<MITREDisplay techniques={techniques} />);

      expect(screen.getByText('Test description for the technique')).toBeDefined();
    });

    it('should render copy button for each technique', () => {
      const techniques = [createMockTechnique()];
      render(<MITREDisplay techniques={techniques} />);

      expect(screen.getByTestId('copy-button')).toBeDefined();
    });

    it('should render clipboard icon by default', () => {
      const techniques = [createMockTechnique()];
      render(<MITREDisplay techniques={techniques} />);

      expect(screen.getByTestId('icon-clipboard')).toBeDefined();
    });
  });

  describe('Empty States', () => {
    it('should return null for undefined techniques', () => {
      const { container } = render(<MITREDisplay techniques={undefined} />);
      expect(container.firstChild).toBeNull();
    });

    it('should return null for empty techniques array', () => {
      const { container } = render(<MITREDisplay techniques={[]} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Copy Functionality', () => {
    it('should copy MITRE URL when copy button is clicked', async () => {
      const techniques = [createMockTechnique({ technique_id: 'T1059' })];
      const user = userEvent.setup({ delay: null });

      render(<MITREDisplay techniques={techniques} />);

      const copyButton = screen.getByTestId('copy-button');
      await user.click(copyButton);
      
      // Flush microtasks without advancing timers
      await vi.advanceTimersByTimeAsync(0);

      await waitFor(() => {
        expect(mockClipboard.writeText).toHaveBeenCalledWith(
          'https://attack.mitre.org/techniques/T1059/',
        );
      });
    });

    it('should show success icon after copying', async () => {
      const techniques = [createMockTechnique()];
      const user = userEvent.setup({ delay: null });

      render(<MITREDisplay techniques={techniques} />);

      const copyButton = screen.getByTestId('copy-button');
      await user.click(copyButton);
      
      // Flush microtasks without advancing timers
      await vi.advanceTimersByTimeAsync(0);

      await waitFor(() => {
        expect(screen.getByTestId('icon-check-circle')).toBeDefined();
      });
    });

    it('should revert to clipboard icon after timeout', async () => {
      const techniques = [createMockTechnique()];
      const user = userEvent.setup({ delay: null });

      render(<MITREDisplay techniques={techniques} />);

      const copyButton = screen.getByTestId('copy-button');
      await user.click(copyButton);
      await vi.advanceTimersByTimeAsync(0);

      await waitFor(() => {
        expect(screen.getByTestId('icon-check-circle')).toBeDefined();
      });

      // Advance timers by 2000ms to trigger reset
      await vi.advanceTimersByTimeAsync(2000);

      await waitFor(() => {
        expect(screen.getByTestId('icon-clipboard')).toBeDefined();
      });
    });

    it('should update tooltip content when copy succeeds', async () => {
      const techniques = [createMockTechnique()];
      const user = userEvent.setup({ delay: null });

      render(<MITREDisplay techniques={techniques} />);

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

      const techniques = [createMockTechnique()];
      const user = userEvent.setup({ delay: null });

      render(<MITREDisplay techniques={techniques} />);

      const copyButton = screen.getByTestId('copy-button');
      await user.click(copyButton);
      
      // Flush microtasks without advancing timers
      await vi.advanceTimersByTimeAsync(0);

      await waitFor(() => {
        // Should not throw and icon should remain clipboard
        expect(screen.getByTestId('icon-clipboard')).toBeDefined();
      });
    });

    it('should manage separate copy states for different techniques', async () => {
      const techniques = [
        createMockTechnique({ technique_id: 'T1059' }),
        createMockTechnique({ technique_id: 'T1071' }),
      ];
      const user = userEvent.setup({ delay: null });

      render(<MITREDisplay techniques={techniques} />);

      const copyButtons = screen.getAllByTestId('copy-button');
      const firstButton = copyButtons[0];
      expect(firstButton).toBeDefined();

      await user.click(firstButton as HTMLElement);
      await vi.advanceTimersByTimeAsync(0);

      await waitFor(() => {
        const icons = screen.getAllByTestId(/^icon-/);
        const hasCheckCircle = icons.some(
          (icon) => icon.getAttribute('data-testid') === 'icon-check-circle',
        );
        expect(hasCheckCircle).toBe(true);
      });

      const clipboardIcons = screen.getAllByTestId('icon-clipboard');
      expect(clipboardIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Tactic Detection', () => {
    it('should detect initial-access tactic', () => {
      const techniques = [
        createMockTechnique({
          description: 'Adversaries may use phishing for initial access to systems.',
        }),
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('Initial Access');
      expect(badge.getAttribute('data-variant')).toBe('warning');
    });

    it('should detect execution tactic', () => {
      const techniques = [
        createMockTechnique({
          description: 'Adversaries may use command execution to run malicious code.',
        }),
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('Execution');
      expect(badge.getAttribute('data-variant')).toBe('warning');
    });

    it('should detect persistence tactic', () => {
      const techniques = [
        createMockTechnique({
          technique_name: 'Registry Run Keys',
          description: 'Adversaries may establish persistence through registry modifications.',
        }),
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('Persistence');
      expect(badge.getAttribute('data-variant')).toBe('danger');
    });

    it('should detect privilege-escalation tactic', () => {
      const techniques = [
        createMockTechnique({
          technique_name: 'Token Manipulation',
          description: 'Adversaries may escalate privileges using token manipulation.',
        }),
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('Privilege Escalation');
      expect(badge.getAttribute('data-variant')).toBe('danger');
    });

    it('should detect defense-evasion tactic', () => {
      const techniques = [
        createMockTechnique({
          technique_name: 'Obfuscated Files or Information',
          description: 'Adversaries may use obfuscation to hide their activities.',
        }),
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('Defense Evasion');
      expect(badge.getAttribute('data-variant')).toBe('primary');
    });

    it('should detect credential-access tactic', () => {
      const techniques = [
        createMockTechnique({
          technique_name: 'OS Credential Dumping',
          description: 'Adversaries may dump credentials from memory.',
        }),
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('Credential Access');
      expect(badge.getAttribute('data-variant')).toBe('primary');
    });

    it('should detect discovery tactic', () => {
      const techniques = [
        createMockTechnique({
          technique_name: 'Network Service Discovery',
          description: 'Adversaries may enumerate network information.',
        }),
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge.textContent).toBe('Discovery');
      expect(badge.getAttribute('data-variant')).toBe('success');
    });

    it('should use neutral badge when tactic cannot be detected', () => {
      const techniques = [
        createMockTechnique({
          technique_name: 'Unknown Technique',
          description: 'Unknown technique description.',
        }),
      ];

      const { container } = render(<MITREDisplay techniques={techniques} />);
      const badges = container.querySelectorAll('[data-testid="sl-badge"]');
      // If no tactic is detected, no badge should be rendered
      expect(badges.length).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long technique descriptions', () => {
      const longDescription = 'a'.repeat(1000);
      const techniques = [
        createMockTechnique({
          description: longDescription,
        }),
      ];

      render(<MITREDisplay techniques={techniques} />);

      expect(screen.getByText(longDescription)).toBeDefined();
    });

    it('should handle special characters in technique names', () => {
      const techniques = [
        createMockTechnique({
          technique_name: 'Test & Special <Characters>',
        }),
      ];

      render(<MITREDisplay techniques={techniques} />);

      expect(screen.getByText('Test & Special <Characters>')).toBeDefined();
    });

    it('should handle techniques with subtechniques in ID', () => {
      const techniques = [
        createMockTechnique({
          technique_id: 'T1059.001',
          technique_name: 'PowerShell',
        }),
      ];

      render(<MITREDisplay techniques={techniques} />);

      expect(screen.getByText('T1059.001')).toBeDefined();
      expect(screen.getByText('PowerShell')).toBeDefined();
    });

    it('should handle multiple clicks on copy button', async () => {
      const techniques = [createMockTechnique()];
      const user = userEvent.setup({ delay: null });

      render(<MITREDisplay techniques={techniques} />);

      const copyButton = screen.getByTestId('copy-button');

      await user.click(copyButton);
      await vi.advanceTimersByTimeAsync(0);
      await user.click(copyButton);
      await vi.advanceTimersByTimeAsync(0);
      await user.click(copyButton);
      await vi.advanceTimersByTimeAsync(0);

      await waitFor(() => {
        expect(mockClipboard.writeText).toHaveBeenCalledTimes(3);
      });
    });
  });

  describe('Styling and Layout', () => {
    it('should apply correct classes to technique card', () => {
      const techniques = [createMockTechnique()];
      const { container } = render(<MITREDisplay techniques={techniques} />);

      const card = container.querySelector('.mitre-technique-card');
      expect(card).toBeDefined();
      expect(card?.className).toContain('enhanced-card');
    });

    it('should apply compact-copy-btn class to button', () => {
      const techniques = [createMockTechnique()];
      render(<MITREDisplay techniques={techniques} />);

      const button = screen.getByTestId('copy-button');
      expect(button.className).toContain('compact-copy-btn');
      expect(button.className).toContain('ioc-copy-btn');
    });

    it('should apply copy-success class when copied', async () => {
      const techniques = [createMockTechnique()];
      const user = userEvent.setup({ delay: null });

      render(<MITREDisplay techniques={techniques} />);

      const copyButton = screen.getByTestId('copy-button');
      await user.click(copyButton);
      await vi.advanceTimersByTimeAsync(0);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-check-circle');
        expect(icon.className).toContain('copy-success');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have clickable copy button', async () => {
      const techniques = [createMockTechnique()];
      const user = userEvent.setup({ delay: null });

      render(<MITREDisplay techniques={techniques} />);

      const button = screen.getByTestId('copy-button');
      expect(button.tagName).toBe('BUTTON');

      await user.click(button);
      await vi.advanceTimersByTimeAsync(0);
      
      await waitFor(() => {
        // Should not throw and clipboard should be called
        expect(mockClipboard.writeText).toHaveBeenCalled();
      });
    });

    it('should show helpful tooltip content', () => {
      const techniques = [createMockTechnique()];
      render(<MITREDisplay techniques={techniques} />);

      const tooltip = screen.getByTestId('sl-tooltip');
      const content = tooltip.getAttribute('data-content');

      expect(content).toContain('Copy');
      expect(content).toContain('MITRE');
    });
  });
});
