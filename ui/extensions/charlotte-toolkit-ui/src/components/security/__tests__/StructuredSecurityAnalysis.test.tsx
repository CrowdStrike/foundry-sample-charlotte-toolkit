import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { IOCs, MITRETechnique, StructuredSecurityResponse } from '../../../types/security';
import { formatSecurityText, needsFormatting } from '../../../utils/universalFormatting';
import { StructuredSecurityAnalysis } from '../StructuredSecurityAnalysis';

// Mock component prop interfaces
interface MockIOCDisplayProps {
  iocs: IOCs;
}

interface MockMITREDisplayProps {
  techniques: MITRETechnique[] | undefined;
}

interface MockReactMarkdownProps {
  children: ReactNode;
}

interface MockSlCardProps {
  children: ReactNode;
  className?: string;
}

interface MockSlBadgeProps {
  children: ReactNode;
  variant?: string;
  [key: string]: unknown;
}

interface MockSlIconProps {
  name: string;
}

// Mock utility functions
vi.mock('../../../utils/badgeUtils', () => ({
  getConfidenceLevelColor: vi.fn((level: string) => {
    if (level === 'High') return 'success';
    if (level === 'Medium') return 'warning';
    return 'neutral';
  }),
  getThreatLevelColor: vi.fn((level: string) => {
    if (level === 'Critical' || level === 'High') return 'danger';
    if (level === 'Medium') return 'warning';
    return 'neutral';
  }),
}));

vi.mock('../../../utils/universalFormatting', () => ({
  formatSecurityText: vi.fn((text: string) => [text]),
  needsFormatting: vi.fn(() => false),
}));

const mockFormatSecurityText = vi.mocked(formatSecurityText);
const mockNeedsFormatting = vi.mocked(needsFormatting);

// Mock child components
vi.mock('../IocDisplay', () => ({
  IOCDisplay: ({ iocs }: MockIOCDisplayProps) => (
    <div data-testid="ioc-display">IOC Display: {JSON.stringify(iocs)}</div>
  ),
}));

vi.mock('../MitreDisplay', () => ({
  MITREDisplay: ({ techniques }: MockMITREDisplayProps) => (
    <div data-testid="mitre-display">MITRE Display: {techniques?.length ?? 0} techniques</div>
  ),
}));

// Mock ReactMarkdown
vi.mock('react-markdown', () => ({
  default: ({ children }: MockReactMarkdownProps) => <div data-testid="markdown">{children}</div>,
}));

// Mock Shoelace components
vi.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlCard: ({ children, className }: MockSlCardProps) => (
    <div data-testid="sl-card" className={className}>
      {children}
    </div>
  ),
  SlBadge: ({ children, variant, ...props }: MockSlBadgeProps) => (
    <span {...props} data-testid="sl-badge" data-variant={variant}>
      {children}
    </span>
  ),
  SlIcon: ({ name }: MockSlIconProps) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

describe('StructuredSecurityAnalysis', () => {
  const mockRenderers = {};

  const createMockData = (
    overrides?: Partial<StructuredSecurityResponse>,
  ): StructuredSecurityResponse => ({
    threat_level: 'High',
    confidence_level: 'High',
    executive_summary: 'This is a test executive summary.',
    priority_actions: ['Action 1', 'Action 2'],
    ...overrides,
  });

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mocks to default behavior
    mockNeedsFormatting.mockReturnValue(false);
    mockFormatSecurityText.mockImplementation((text: string) => [text]);
  });

  describe('Rendering', () => {
    it('should render successfully with complete data', () => {
      const data = createMockData();
      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getAllByText(/Executive Summary/i).length).toBeGreaterThan(0);
      expect(screen.getByText('This is a test executive summary.')).toBeDefined();
    });

    it('should render executive summary card', () => {
      const data = createMockData();
      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      const cards = screen.getAllByTestId('sl-card');
      const executiveCard = cards.find((card) =>
        card.className?.includes('executive-summary-card'),
      );
      expect(executiveCard).toBeDefined();
    });

    it('should render threat level badge', () => {
      const data = createMockData({ threat_level: 'Critical' });
      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      const badges = screen.getAllByTestId('sl-badge');
      const threatBadge = badges.find((badge) => badge.textContent?.includes('Critical Threat'));
      expect(threatBadge).toBeDefined();
      expect(threatBadge?.getAttribute('data-variant')).toBe('danger');
    });

    it('should render confidence level badge', () => {
      const data = createMockData({ confidence_level: 'Medium' });
      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      const badges = screen.getAllByTestId('sl-badge');
      const confidenceBadge = badges.find((badge) =>
        badge.textContent?.includes('Medium Confidence'),
      );
      expect(confidenceBadge).toBeDefined();
      expect(confidenceBadge?.getAttribute('data-variant')).toBe('warning');
    });

    it('should render executive summary icon', () => {
      const data = createMockData();
      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByTestId('icon-clipboard-data')).toBeDefined();
    });
  });

  describe('IOCs Section', () => {
    it('should render IOCs section when IOCs are present', () => {
      const data = createMockData({
        iocs: {
          hashes: ['abc123'],
          ips: [],
          domains: [],
          urls: [],
          file_paths: [],
        },
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText(/IOC Details/i)).toBeDefined();
      expect(screen.getByTestId('ioc-display')).toBeDefined();
    });

    it('should not render IOCs section when no IOCs are present', () => {
      const data = createMockData({
        iocs: {
          hashes: [],
          ips: [],
          domains: [],
          urls: [],
          file_paths: [],
        },
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.queryByText(/IOC Details/i)).toBeNull();
    });

    it('should render IOCs section when IPs are present', () => {
      const data = createMockData({
        iocs: {
          hashes: [],
          ips: ['192.168.1.1'],
          domains: [],
          urls: [],
          file_paths: [],
        },
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText(/IOC Details/i)).toBeDefined();
    });

    it('should render IOCs section when domains are present', () => {
      const data = createMockData({
        iocs: {
          hashes: [],
          ips: [],
          domains: ['malicious.com'],
          urls: [],
          file_paths: [],
        },
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText(/IOC Details/i)).toBeDefined();
    });

    it('should render IOCs icon', () => {
      const data = createMockData({
        iocs: {
          hashes: ['abc'],
          ips: [],
          domains: [],
          urls: [],
          file_paths: [],
        },
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByTestId('icon-shield-exclamation')).toBeDefined();
    });
  });

  describe('MITRE Techniques Section', () => {
    it('should render MITRE section when techniques are present', () => {
      const data = createMockData({
        mitre_techniques: [
          {
            technique_id: 'T1059',
            technique_name: 'Command Interpreter',
            description: 'Test description',
          },
        ],
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText(/MITRE ATT&CK Techniques/i)).toBeDefined();
      expect(screen.getByTestId('mitre-display')).toBeDefined();
    });

    it('should not render MITRE section when techniques are empty', () => {
      const data = createMockData({
        mitre_techniques: [],
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.queryByText(/MITRE ATT&CK Techniques/i)).toBeNull();
    });

    it('should display technique count in header', () => {
      const data = createMockData({
        mitre_techniques: [
          {
            technique_id: 'T1059',
            technique_name: 'Command Interpreter',
            description: 'Test',
          },
          {
            technique_id: 'T1071',
            technique_name: 'Application Protocol',
            description: 'Test',
          },
        ],
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText(/MITRE ATT&CK Techniques \(2\)/i)).toBeDefined();
    });

    it('should render MITRE icon', () => {
      const data = createMockData({
        mitre_techniques: [
          {
            technique_id: 'T1059',
            technique_name: 'Command Interpreter',
            description: 'Test',
          },
        ],
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByTestId('icon-diagram-3')).toBeDefined();
    });
  });

  describe('Technical Details Section', () => {
    it('should render technical details when present', () => {
      const data = createMockData({
        technical_details: 'Detailed technical analysis here.',
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getAllByText(/Technical Analysis/i).length).toBeGreaterThan(0);
      expect(screen.getByTestId('markdown')).toBeDefined();
    });

    it('should not render technical details when not present', () => {
      const data = createMockData();

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.queryByText(/Technical Analysis/i)).toBeNull();
    });

    it('should render technical details icon', () => {
      const data = createMockData({
        technical_details: 'Technical analysis',
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByTestId('icon-gear')).toBeDefined();
    });

    it('should apply correct card class', () => {
      const data = createMockData({
        technical_details: 'Technical analysis',
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      const cards = screen.getAllByTestId('sl-card');
      const technicalCard = cards.find((card) => card.className?.includes('technical-details'));
      expect(technicalCard).toBeDefined();
    });
  });

  describe('Priority Actions Section', () => {
    it('should render priority actions when present', () => {
      const data = createMockData({
        priority_actions: ['Action 1', 'Action 2', 'Action 3'],
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText(/Priority Actions \(3\)/i)).toBeDefined();
      expect(screen.getByText('Action 1')).toBeDefined();
      expect(screen.getByText('Action 2')).toBeDefined();
      expect(screen.getByText('Action 3')).toBeDefined();
    });

    it('should not render priority actions when empty', () => {
      const data = createMockData({
        priority_actions: [],
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.queryByText(/Priority Actions/i)).toBeNull();
    });

    it('should render actions as list items', () => {
      const data = createMockData({
        priority_actions: ['Action 1'],
      });

      const { container } = render(
        <StructuredSecurityAnalysis data={data} renderers={mockRenderers} />,
      );

      const list = container.querySelector('.compact-bullet-list');
      expect(list).toBeDefined();
      expect(list?.tagName).toBe('UL');
    });

    it('should render dot icons for each action', () => {
      const data = createMockData({
        priority_actions: ['Action 1', 'Action 2'],
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      const dotIcons = screen.getAllByTestId('icon-dot');
      expect(dotIcons.length).toBe(2);
    });

    it('should render lightbulb icon', () => {
      const data = createMockData({
        priority_actions: ['Action 1'],
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      const lightbulbIcons = screen.getAllByTestId('icon-lightbulb');
      expect(lightbulbIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Reasoning Assessment Section', () => {
    it('should render reasoning assessment when present', () => {
      const data = createMockData({
        reasoning_assessment: 'Charlotte analyzed the data using these methods...',
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText(/Analysis Methodology/i)).toBeDefined();
      expect(screen.getByText(/Charlotte analyzed the data using these methods.../i)).toBeDefined();
    });

    it('should not render reasoning assessment when not present', () => {
      const data = createMockData();

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.queryByText(/Analysis Methodology/i)).toBeNull();
    });

    it('should render reasoning label', () => {
      const data = createMockData({
        reasoning_assessment: 'Test reasoning',
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText(/Charlotte's Analytical Methodology:/i)).toBeDefined();
    });
  });

  describe('Formatting Integration', () => {
    it('should use formatSecurityText when needsFormatting returns true', () => {
      mockNeedsFormatting.mockReturnValue(true);
      mockFormatSecurityText.mockReturnValue(['Paragraph 1', 'Paragraph 2']);

      const data = createMockData({
        executive_summary: 'Long summary text',
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(mockFormatSecurityText).toHaveBeenCalledWith('Long summary text', 'summary');
    });

    it('should render executive summary without formatting when not needed', () => {
      mockNeedsFormatting.mockReturnValue(false);

      const data = createMockData({
        executive_summary: 'Short summary',
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText('Short summary')).toBeDefined();
    });

    it('should format technical details when needsFormatting returns true', () => {
      mockNeedsFormatting.mockReturnValue(true);
      mockFormatSecurityText.mockReturnValue(['Tech paragraph 1', 'Tech paragraph 2']);

      const data = createMockData({
        technical_details: 'Long technical text',
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(mockFormatSecurityText).toHaveBeenCalledWith('Long technical text', 'technical');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined optional fields gracefully', () => {
      const data = {
        threat_level: 'Low' as const,
        confidence_level: 'Low' as const,
        executive_summary: 'Summary',
        priority_actions: [],
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText('Summary')).toBeDefined();
    });

    it('should handle very long executive summaries', () => {
      const longSummary = 'a'.repeat(1000);
      const data = createMockData({
        executive_summary: longSummary,
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText(longSummary)).toBeDefined();
    });

    it('should handle special characters in text', () => {
      const data = createMockData({
        executive_summary: 'Summary with <special> & "characters"',
      });

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText('Summary with <special> & "characters"')).toBeDefined();
    });

    it('should handle multiple threat levels', () => {
      const levels: Array<'Critical' | 'High' | 'Medium' | 'Low'> = [
        'Critical',
        'High',
        'Medium',
        'Low',
      ];

      levels.forEach((level) => {
        const data = createMockData({ threat_level: level });
        const { container } = render(
          <StructuredSecurityAnalysis data={data} renderers={mockRenderers} />,
        );

        const badges = container.querySelectorAll('[data-testid="sl-badge"]');
        const threatBadge = Array.from(badges).find((badge) =>
          badge.textContent?.includes(`${level} Threat`),
        );
        expect(threatBadge).toBeDefined();

        container.remove();
      });
    });
  });

  describe('Styling and Layout', () => {
    it('should apply correct card classes', () => {
      const data = createMockData({
        iocs: {
          hashes: ['abc'],
          ips: [],
          domains: [],
          urls: [],
          file_paths: [],
        },
        mitre_techniques: [
          {
            technique_id: 'T1059',
            technique_name: 'Test',
            description: 'Test',
          },
        ],
        technical_details: 'Technical',
        priority_actions: ['Action'],
        reasoning_assessment: 'Reasoning',
      });

      const { container } = render(
        <StructuredSecurityAnalysis data={data} renderers={mockRenderers} />,
      );

      expect(container.querySelector('.executive-summary-card')).toBeDefined();
      expect(container.querySelector('.iocs-card')).toBeDefined();
      expect(container.querySelector('.mitre-details')).toBeDefined();
      expect(container.querySelector('.technical-details')).toBeDefined();
      expect(container.querySelector('.recommendations-details')).toBeDefined();
      expect(container.querySelector('.analysis-methodology-card')).toBeDefined();
    });

    it('should apply structured-analysis class to container', () => {
      const data = createMockData();
      const { container } = render(
        <StructuredSecurityAnalysis data={data} renderers={mockRenderers} />,
      );

      expect(container.querySelector('.structured-analysis')).toBeDefined();
    });
  });
});
