// src/components/security/__tests__/StructuredSecurityAnalysis.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { StructuredSecurityAnalysis } from '../StructuredSecurityAnalysis';
import { formatSecurityText, needsFormatting } from '../../../utils/universalFormatting';
import { getThreatLevelColor, getConfidenceLevelColor } from '../../../utils/badgeUtils';
import type { StructuredSecurityResponse } from '../../../types/security';

// Mock the utilities
jest.mock('../../../utils/universalFormatting');
jest.mock('../../../utils/badgeUtils');

const mockFormatSecurityText = formatSecurityText as jest.MockedFunction<typeof formatSecurityText>;
const mockNeedsFormatting = needsFormatting as jest.MockedFunction<typeof needsFormatting>;
const mockGetThreatLevelColor = getThreatLevelColor as jest.MockedFunction<typeof getThreatLevelColor>;
const mockGetConfidenceLevelColor = getConfidenceLevelColor as jest.MockedFunction<typeof getConfidenceLevelColor>;

// Mock child components
jest.mock('../IocDisplay', () => ({
  IOCDisplay: ({ iocs }: any) => (
    <div data-testid="ioc-display">
      IOC Display with {Object.keys(iocs).length} types
    </div>
  ),
}));

jest.mock('../MitreDisplay', () => ({
  MITREDisplay: ({ techniques }: any) => (
    <div data-testid="mitre-display">
      MITRE Display with {techniques.length} techniques
    </div>
  ),
}));

// Mock ReactMarkdown
jest.mock('react-markdown', () => {
  return ({ children, components }: any) => (
    <div data-testid="react-markdown">
      {children}
    </div>
  );
});

// Mock Shoelace components
jest.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlIcon: ({ name, className }: any) => (
    <span className={className} data-testid={`sl-icon-${name}`}>
      {name}
    </span>
  ),
  SlBadge: ({ children, variant, className }: any) => (
    <span className={`badge-${variant} ${className}`} data-testid="sl-badge">
      {children}
    </span>
  ),
  SlCard: ({ children, className }: any) => (
    <div className={className} data-testid="sl-card">
      {children}
    </div>
  ),
}));

describe('StructuredSecurityAnalysis', () => {
  const mockRenderers = {
    p: ({ children }: any) => <p>{children}</p>,
    strong: ({ children }: any) => <strong>{children}</strong>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mocks
    mockNeedsFormatting.mockReturnValue(false);
    mockFormatSecurityText.mockReturnValue(['Formatted text']);
    mockGetThreatLevelColor.mockReturnValue('danger');
    mockGetConfidenceLevelColor.mockReturnValue('success');
  });

  describe('Executive Summary', () => {
    it('should render executive summary with basic data', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'This is a security analysis summary',
        threat_level: 'High',
        confidence_level: 'Medium',
        priority_actions: ['Action 1', 'Action 2']
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText('Executive Summary')).toBeInTheDocument();
      expect(screen.getByText('This is a security analysis summary')).toBeInTheDocument();
      expect(screen.getByText('High Threat')).toBeInTheDocument();
      expect(screen.getByText('Medium Confidence')).toBeInTheDocument();
    });

    it('should call badge color functions with correct parameters', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Critical',
        confidence_level: 'Low',
        priority_actions: []
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(mockGetThreatLevelColor).toHaveBeenCalledWith('Critical');
      expect(mockGetConfidenceLevelColor).toHaveBeenCalledWith('Low');
    });

    it('should use formatted text when needsFormatting returns true', () => {
      mockNeedsFormatting.mockReturnValue(true);
      mockFormatSecurityText.mockReturnValue(['First paragraph', 'Second paragraph']);

      const data: StructuredSecurityResponse = {
        executive_summary: 'Multi-line summary\nwith formatting',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: []
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(mockNeedsFormatting).toHaveBeenCalledWith('Multi-line summary\nwith formatting');
      expect(mockFormatSecurityText).toHaveBeenCalledWith('Multi-line summary\nwith formatting', 'summary');
      expect(screen.getByText('First paragraph')).toBeInTheDocument();
      expect(screen.getByText('Second paragraph')).toBeInTheDocument();
    });

    it('should use original text when needsFormatting returns false', () => {
      mockNeedsFormatting.mockReturnValue(false);

      const data: StructuredSecurityResponse = {
        executive_summary: 'Simple summary text',
        threat_level: 'Low',
        confidence_level: 'Medium',
        priority_actions: []
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText('Simple summary text')).toBeInTheDocument();
      expect(mockFormatSecurityText).not.toHaveBeenCalled();
    });
  });

  describe('IOC Details', () => {
    it('should render IOC section when IOCs are present', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: [],
        iocs: {
          hashes: ['hash1', 'hash2'],
          ips: ['192.168.1.1']
        }
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText('IOC Details')).toBeInTheDocument();
      expect(screen.getByTestId('ioc-display')).toBeInTheDocument();
      expect(screen.getByText('IOC Display with 2 types')).toBeInTheDocument();
    });

    it('should not render IOC section when no IOCs are present', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: []
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.queryByText('IOC Details')).not.toBeInTheDocument();
      expect(screen.queryByTestId('ioc-display')).not.toBeInTheDocument();
    });

    it('should not render IOC section when IOCs are empty', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: [],
        iocs: {
          hashes: [],
          ips: [],
          domains: [],
          urls: [],
          file_paths: []
        }
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.queryByText('IOC Details')).not.toBeInTheDocument();
      expect(screen.queryByTestId('ioc-display')).not.toBeInTheDocument();
    });

    it('should render IOC section when any IOC type has data', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: [],
        iocs: {
          hashes: [],
          ips: [],
          domains: ['malicious.com'],
          urls: [],
          file_paths: []
        }
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText('IOC Details')).toBeInTheDocument();
      expect(screen.getByTestId('ioc-display')).toBeInTheDocument();
    });
  });

  describe('MITRE ATT&CK Techniques', () => {
    it('should render MITRE section when techniques are present', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: [],
        mitre_techniques: [
          {
            technique_id: 'T1566.001',
            technique_name: 'Spearphishing Attachment',
            description: 'Test description'
          },
          {
            technique_id: 'T1059.001',
            technique_name: 'PowerShell',
            description: 'PowerShell description'
          }
        ]
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText('MITRE ATT&CK Techniques (2)')).toBeInTheDocument();
      expect(screen.getByTestId('mitre-display')).toBeInTheDocument();
      expect(screen.getByText('MITRE Display with 2 techniques')).toBeInTheDocument();
    });

    it('should not render MITRE section when no techniques are present', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: []
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.queryByText(/MITRE ATT&CK Techniques/)).not.toBeInTheDocument();
      expect(screen.queryByTestId('mitre-display')).not.toBeInTheDocument();
    });

    it('should not render MITRE section when techniques array is empty', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: [],
        mitre_techniques: []
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.queryByText(/MITRE ATT&CK Techniques/)).not.toBeInTheDocument();
      expect(screen.queryByTestId('mitre-display')).not.toBeInTheDocument();
    });
  });

  describe('Technical Details', () => {
    it('should render technical details when present', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: [],
        technical_details: 'Detailed technical analysis'
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText('Technical Analysis')).toBeInTheDocument();
      expect(screen.getByTestId('react-markdown')).toBeInTheDocument();
      expect(screen.getByText('Detailed technical analysis')).toBeInTheDocument();
    });

    it('should use formatted text for technical details when needsFormatting returns true', () => {
      mockNeedsFormatting.mockReturnValue(true);
      mockFormatSecurityText.mockReturnValue(['Technical paragraph 1', 'Technical paragraph 2']);

      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: [],
        technical_details: 'Multi-line technical\nanalysis'
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(mockNeedsFormatting).toHaveBeenCalledWith('Multi-line technical\nanalysis');
      expect(mockFormatSecurityText).toHaveBeenCalledWith('Multi-line technical\nanalysis', 'technical');
      
      const markdownElements = screen.getAllByTestId('react-markdown');
      expect(markdownElements).toHaveLength(2);
    });

    it('should not render technical details when not present', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: []
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.queryByText('Technical Analysis')).not.toBeInTheDocument();
    });
  });

  describe('Priority Actions', () => {
    it('should render priority actions when present', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: ['Update systems', 'Patch vulnerabilities', 'Monitor network']
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText('Priority Actions (3)')).toBeInTheDocument();
      expect(screen.getByText('Update systems')).toBeInTheDocument();
      expect(screen.getByText('Patch vulnerabilities')).toBeInTheDocument();
      expect(screen.getByText('Monitor network')).toBeInTheDocument();
    });

    it('should not render priority actions when empty', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: []
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.queryByText(/Priority Actions/)).not.toBeInTheDocument();
    });

    it('should render dot icons for each action', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: ['Action 1', 'Action 2']
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      const dotIcons = screen.getAllByTestId('sl-icon-dot');
      expect(dotIcons).toHaveLength(2);
    });
  });

  describe('Analysis Methodology', () => {
    it('should render reasoning assessment when present', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: [],
        reasoning_assessment: 'Charlotte analyzed the data using multiple factors'
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.getByText('Analysis Methodology')).toBeInTheDocument();
      expect(screen.getByText("Charlotte's Analytical Methodology:")).toBeInTheDocument();
      expect(screen.getByText('Charlotte analyzed the data using multiple factors')).toBeInTheDocument();
    });

    it('should use formatted text for reasoning when needsFormatting returns true', () => {
      mockNeedsFormatting.mockImplementation((text: string) => 
        text === 'Multi-line reasoning\nassessment'
      );
      mockFormatSecurityText.mockImplementation((text: string, type: string) => {
        if (type === 'reasoning') {
          return ['Reasoning paragraph 1', 'Reasoning paragraph 2'];
        }
        return [text];
      });

      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: [],
        reasoning_assessment: 'Multi-line reasoning\nassessment'
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(mockNeedsFormatting).toHaveBeenCalledWith('Multi-line reasoning\nassessment');
      expect(mockFormatSecurityText).toHaveBeenCalledWith('Multi-line reasoning\nassessment', 'reasoning');
      expect(screen.getByText('Reasoning paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Reasoning paragraph 2')).toBeInTheDocument();
    });

    it('should not render reasoning assessment when not present', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: []
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      expect(screen.queryByText('Analysis Methodology')).not.toBeInTheDocument();
      expect(screen.queryByText("Charlotte's Analytical Methodology:")).not.toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should render all sections when full data is provided', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Comprehensive security analysis',
        threat_level: 'Critical',
        confidence_level: 'High',
        priority_actions: ['Immediate action required'],
        iocs: {
          hashes: ['hash1'],
          domains: ['malicious.com']
        },
        mitre_techniques: [
          {
            technique_id: 'T1566.001',
            technique_name: 'Spearphishing',
            description: 'Phishing technique'
          }
        ],
        technical_details: 'Technical analysis details',
        reasoning_assessment: 'Analytical reasoning'
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      // Verify all sections are present
      expect(screen.getByText('Executive Summary')).toBeInTheDocument();
      expect(screen.getByText('IOC Details')).toBeInTheDocument();
      expect(screen.getByText('MITRE ATT&CK Techniques (1)')).toBeInTheDocument();
      expect(screen.getByText('Technical Analysis')).toBeInTheDocument();
      expect(screen.getByText('Priority Actions (1)')).toBeInTheDocument();
      expect(screen.getByText('Analysis Methodology')).toBeInTheDocument();

      // Verify content is rendered
      expect(screen.getByText('Comprehensive security analysis')).toBeInTheDocument();
      expect(screen.getByTestId('ioc-display')).toBeInTheDocument();
      expect(screen.getByTestId('mitre-display')).toBeInTheDocument();
      expect(screen.getByText('Technical analysis details')).toBeInTheDocument();
      expect(screen.getByText('Immediate action required')).toBeInTheDocument();
      expect(screen.getByText('Analytical reasoning')).toBeInTheDocument();
    });

    it('should render only required sections with minimal data', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Basic summary',
        threat_level: 'Low',
        confidence_level: 'Medium',
        priority_actions: []
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      // Required sections
      expect(screen.getByText('Executive Summary')).toBeInTheDocument();
      expect(screen.getByText('Basic summary')).toBeInTheDocument();

      // Optional sections should not be present
      expect(screen.queryByText('IOC Details')).not.toBeInTheDocument();
      expect(screen.queryByText(/MITRE ATT&CK Techniques/)).not.toBeInTheDocument();
      expect(screen.queryByText('Technical Analysis')).not.toBeInTheDocument();
      expect(screen.queryByText(/Priority Actions/)).not.toBeInTheDocument();
      expect(screen.queryByText('Analysis Methodology')).not.toBeInTheDocument();
    });

    it('should handle different threat and confidence levels', () => {
      const scenarios = [
        { threat: 'Low', confidence: 'Low' },
        { threat: 'Medium', confidence: 'Medium' },
        { threat: 'High', confidence: 'High' },
        { threat: 'Critical', confidence: 'High' }
      ];

      scenarios.forEach(({ threat, confidence }) => {
        const data: StructuredSecurityResponse = {
          executive_summary: 'Test summary',
          threat_level: threat as any,
          confidence_level: confidence as any,
          priority_actions: []
        };

        const { unmount } = render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

        expect(screen.getByText(`${threat} Threat`)).toBeInTheDocument();
        expect(screen.getByText(`${confidence} Confidence`)).toBeInTheDocument();

        unmount();
      });
    });

    it('should apply correct CSS classes for responsive design', () => {
      const data: StructuredSecurityResponse = {
        executive_summary: 'Summary',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: ['Action 1']
      };

      render(<StructuredSecurityAnalysis data={data} renderers={mockRenderers} />);

      const cards = screen.getAllByTestId('sl-card');
      expect(cards.length).toBeGreaterThan(0);

      // Check for structured analysis container
      const container = cards[0].parentElement;
      expect(container).toHaveClass('structured-analysis', 'space-y-2', 'sm:space-y-4');
    });
  });
});
