// src/components/security/__tests__/MitreDisplay.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MITREDisplay } from '../MitreDisplay';
import { formatMitreDescription } from '../../../utils/textFormatting';
import { buildMitreUrl } from '../../../utils/helpers';
import type { MITRETechnique } from '../../../types/security';

// Mock the utilities
jest.mock('../../../utils/textFormatting');
jest.mock('../../../utils/helpers');

const mockFormatMitreDescription = formatMitreDescription as jest.MockedFunction<typeof formatMitreDescription>;
const mockBuildMitreUrl = buildMitreUrl as jest.MockedFunction<typeof buildMitreUrl>;

// Mock Shoelace components
jest.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlButton: ({ children, onClick, className, ...props }: any) => (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  ),
  SlIcon: ({ name, className }: any) => (
    <span className={className} data-testid={`sl-icon-${name}`}>
      {name}
    </span>
  ),
  SlTooltip: ({ children, content }: any) => (
    <div title={content}>{children}</div>
  ),
  SlBadge: ({ children, variant, className }: any) => (
    <span className={`badge-${variant} ${className}`} data-testid="sl-badge">
      {children}
    </span>
  ),
}));

// Mock clipboard API
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

describe('MITREDisplay', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    // Default mocks
    mockFormatMitreDescription.mockImplementation((description: string) => [description]);
    mockBuildMitreUrl.mockImplementation((techniqueId: string) => `https://attack.mitre.org/techniques/${techniqueId}/`);
    mockWriteText.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render nothing for undefined techniques', () => {
      const { container } = render(<MITREDisplay techniques={undefined} />);
      expect(container.firstChild).toBeNull();
    });

    it('should render nothing for empty techniques array', () => {
      const { container } = render(<MITREDisplay techniques={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it('should render single MITRE technique', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1566.001',
          technique_name: 'Spearphishing Attachment',
          description: 'Adversaries may send spearphishing emails with a malicious attachment.'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      expect(screen.getByText('T1566.001')).toBeInTheDocument();
      expect(screen.getByText('Spearphishing Attachment')).toBeInTheDocument();
      expect(screen.getByText('Adversaries may send spearphishing emails with a malicious attachment.')).toBeInTheDocument();
    });

    it('should render multiple MITRE techniques', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1566.001',
          technique_name: 'Spearphishing Attachment',
          description: 'Adversaries may send spearphishing emails with a malicious attachment.'
        },
        {
          technique_id: 'T1059.001',
          technique_name: 'PowerShell',
          description: 'Adversaries may abuse PowerShell commands and scripts for execution.'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      expect(screen.getByText('T1566.001')).toBeInTheDocument();
      expect(screen.getByText('Spearphishing Attachment')).toBeInTheDocument();
      expect(screen.getByText('T1059.001')).toBeInTheDocument();
      expect(screen.getByText('PowerShell')).toBeInTheDocument();
    });

    it('should call formatMitreDescription for each technique', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1566.001',
          technique_name: 'Spearphishing Attachment',
          description: 'Test description 1'
        },
        {
          technique_id: 'T1059.001',
          technique_name: 'PowerShell',
          description: 'Test description 2'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      expect(mockFormatMitreDescription).toHaveBeenCalledWith('Test description 1');
      expect(mockFormatMitreDescription).toHaveBeenCalledWith('Test description 2');
      expect(mockFormatMitreDescription).toHaveBeenCalledTimes(2);
    });

    it('should render formatted description paragraphs', () => {
      mockFormatMitreDescription.mockReturnValue(['First paragraph', 'Second paragraph']);

      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1566.001',
          technique_name: 'Spearphishing Attachment',
          description: 'Multi-paragraph description'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      expect(screen.getByText('First paragraph')).toBeInTheDocument();
      expect(screen.getByText('Second paragraph')).toBeInTheDocument();
    });

    it('should render original description when formatting returns empty array', () => {
      mockFormatMitreDescription.mockReturnValue([]);

      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1566.001',
          technique_name: 'Spearphishing Attachment',
          description: 'Original description'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      expect(screen.getByText('Original description')).toBeInTheDocument();
    });
  });

  describe('Tactic Inference and Badges', () => {
    it('should infer initial-access tactic and show warning badge', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1566.001',
          technique_name: 'Spearphishing Attachment',
          description: 'Initial access technique for phishing attacks'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge).toHaveClass('badge-warning');
      expect(badge).toHaveTextContent('Initial Access');
    });

    it('should infer execution tactic and show warning badge', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1059.001',
          technique_name: 'PowerShell',
          description: 'Command execution using PowerShell scripts'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge).toHaveClass('badge-warning');
      expect(badge).toHaveTextContent('Execution');
    });

    it('should infer persistence tactic and show danger badge', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1547.001',
          technique_name: 'Registry Run Keys',
          description: 'Persistence through registry startup entries'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge).toHaveClass('badge-danger');
      expect(badge).toHaveTextContent('Persistence');
    });

    it('should infer defense-evasion tactic and show primary badge', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1027',
          technique_name: 'Obfuscated Files',
          description: 'Defense evasion through obfuscation techniques'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge).toHaveClass('badge-primary');
      expect(badge).toHaveTextContent('Defense Evasion');
    });

    it('should infer credential-access tactic and show primary badge', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1003.001',
          technique_name: 'LSASS Memory',
          description: 'Credential access through password hash dumping'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge).toHaveClass('badge-primary');
      expect(badge).toHaveTextContent('Credential Access');
    });

    it('should infer discovery tactic and show success badge', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1083',
          technique_name: 'File and Directory Discovery',
          description: 'Discovery of network and system information'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge).toHaveClass('badge-success');
      expect(badge).toHaveTextContent('Discovery');
    });

    it('should show no badge for unrecognized tactics', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T9999',
          technique_name: 'Custom Method',
          description: 'A completely novel approach using proprietary methods'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      expect(screen.queryByTestId('sl-badge')).not.toBeInTheDocument();
    });

    it('should infer tactics from technique name when description is unclear', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1059.001',
          technique_name: 'PowerShell Execution',
          description: 'Generic description'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge).toHaveClass('badge-warning');
      expect(badge).toHaveTextContent('Execution');
    });
  });

  describe('Copy to Clipboard', () => {
    it('should copy MITRE URL when copy button is clicked', async () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1566.001',
          technique_name: 'Spearphishing Attachment',
          description: 'Test description'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const copyButton = screen.getByRole('button');
      fireEvent.click(copyButton);

      expect(mockBuildMitreUrl).toHaveBeenCalledWith('T1566.001');
      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith('https://attack.mitre.org/techniques/T1566.001/');
      });
    });

    it('should show success state after successful copy', async () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1566.001',
          technique_name: 'Spearphishing Attachment',
          description: 'Test description'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const copyButton = screen.getByRole('button');
      
      // Initially should show clipboard icon
      expect(screen.getByTestId('sl-icon-clipboard')).toBeInTheDocument();
      
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(screen.getByTestId('sl-icon-check-circle')).toBeInTheDocument();
        expect(screen.queryByTestId('sl-icon-clipboard')).not.toBeInTheDocument();
      });
    });

    it('should reset copy state after timeout', async () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1566.001',
          technique_name: 'Spearphishing Attachment',
          description: 'Test description'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const copyButton = screen.getByRole('button');
      fireEvent.click(copyButton);

      // Should show success state
      await waitFor(() => {
        expect(screen.getByTestId('sl-icon-check-circle')).toBeInTheDocument();
      });

      // Fast-forward timeout
      jest.advanceTimersByTime(2000);

      await waitFor(() => {
        expect(screen.getByTestId('sl-icon-clipboard')).toBeInTheDocument();
        expect(screen.queryByTestId('sl-icon-check-circle')).not.toBeInTheDocument();
      });
    });

    it('should handle copy failure gracefully', async () => {
      mockWriteText.mockRejectedValueOnce(new Error('Copy failed'));

      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1566.001',
          technique_name: 'Spearphishing Attachment',
          description: 'Test description'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const copyButton = screen.getByRole('button');
      fireEvent.click(copyButton);

      // Should not show success state on failure
      await waitFor(() => {
        expect(screen.getByTestId('sl-icon-clipboard')).toBeInTheDocument();
        expect(screen.queryByTestId('sl-icon-check-circle')).not.toBeInTheDocument();
      });
    });

    it('should handle multiple techniques with independent copy states', async () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1566.001',
          technique_name: 'Spearphishing Attachment',
          description: 'Test description 1'
        },
        {
          technique_id: 'T1059.001',
          technique_name: 'PowerShell',
          description: 'Test description 2'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const copyButtons = screen.getAllByRole('button');
      expect(copyButtons).toHaveLength(2);

      // Click first copy button
      fireEvent.click(copyButtons[0]);

      await waitFor(() => {
        // First technique should show success state
        const checkCircles = screen.getAllByTestId('sl-icon-check-circle');
        expect(checkCircles).toHaveLength(1);
        
        // Second technique should still show clipboard icon
        const clipboards = screen.getAllByTestId('sl-icon-clipboard');
        expect(clipboards).toHaveLength(1);
      });

      expect(mockBuildMitreUrl).toHaveBeenCalledWith('T1566.001');
    });
  });

  describe('Tooltip Content', () => {
    it('should show correct tooltip content before copy', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1566.001',
          technique_name: 'Spearphishing Attachment',
          description: 'Test description'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const tooltip = screen.getByTitle('Copy MITRE URL to clipboard');
      expect(tooltip).toBeInTheDocument();
    });

    it('should show success tooltip content after copy', async () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1566.001',
          technique_name: 'Spearphishing Attachment',
          description: 'Test description'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const copyButton = screen.getByRole('button');
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(screen.getByTitle('Copied to clipboard!')).toBeInTheDocument();
      });
    });
  });

  describe('CSS Classes and Styling', () => {
    it('should apply correct CSS classes to elements', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1566.001',
          technique_name: 'Spearphishing Attachment',
          description: 'Test description'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const copyButton = screen.getByRole('button');
      expect(copyButton).toHaveClass('compact-copy-btn', 'ioc-copy-btn', 'flex-shrink-0');
    });

    it('should apply correct icon classes for different states', async () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1566.001',
          technique_name: 'Spearphishing Attachment',
          description: 'Test description'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      // Initially should have secondary-text class
      expect(screen.getByTestId('sl-icon-clipboard')).toHaveClass('secondary-text');

      const copyButton = screen.getByRole('button');
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(screen.getByTestId('sl-icon-check-circle')).toHaveClass('copy-success');
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle techniques with complex tactic keywords', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1055',
          technique_name: 'Process Injection',
          description: 'Process injection for defense evasion and privilege escalation'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      // Should match the first tactic found (privilege-escalation comes before defense-evasion in the iteration order)
      const badge = screen.getByTestId('sl-badge');
      expect(badge).toHaveClass('badge-danger');
      expect(badge).toHaveTextContent('Privilege Escalation');
    });

    it('should handle empty technique descriptions', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T9999',
          technique_name: 'Novel Method',
          description: ''
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      expect(screen.getByText('T9999')).toBeInTheDocument();
      expect(screen.getByText('Novel Method')).toBeInTheDocument();
      expect(screen.queryByTestId('sl-badge')).not.toBeInTheDocument();
    });

    it('should format multi-word tactic names correctly', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1078',
          technique_name: 'Valid Accounts',
          description: 'Using valid accounts for privilege escalation'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge).toHaveTextContent('Privilege Escalation');
    });

    it('should handle case-insensitive tactic matching', () => {
      const techniques: MITRETechnique[] = [
        {
          technique_id: 'T1027',
          technique_name: 'Obfuscated Files',
          description: 'DEFENSE EVASION THROUGH OBFUSCATION'
        }
      ];

      render(<MITREDisplay techniques={techniques} />);

      const badge = screen.getByTestId('sl-badge');
      expect(badge).toHaveClass('badge-primary');
      expect(badge).toHaveTextContent('Defense Evasion');
    });
  });
});
