// src/components/security/__tests__/IocDisplay.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { IOCDisplay } from '../IocDisplay';
import { IOCCore } from '../../../utils/security/iocCore';
import type { IOCs } from '../../../types/security';

// Mock the IOCCore
jest.mock('../../../utils/security/iocCore');
const mockIOCCore = IOCCore as jest.Mocked<typeof IOCCore>;

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
}));

// Mock clipboard API
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

describe('IOCDisplay', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    // Default mock for defang function
    mockIOCCore.defang.mockImplementation((ioc: string) => 
      ioc.replace(/\./g, '[.]').replace(/http/g, 'hxxp')
    );
    
    mockWriteText.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering IOCs', () => {
    it('should render all IOC types when provided', () => {
      const iocs: IOCs = {
        hashes: ['d41d8cd98f00b204e9800998ecf8427e', 'da39a3ee5e6b4b0d3255bfef95601890afd80709'],
        ips: ['192.168.1.1', '8.8.8.8'],
        domains: ['malicious.com', 'evil.org'],
        urls: ['http://malicious.com/payload', 'https://evil.org/malware'],
        file_paths: ['C:\\temp\\malware.exe', '/usr/bin/suspicious']
      };

      render(<IOCDisplay iocs={iocs} />);

      // Check headers are rendered
      expect(screen.getByText('HASHS (2)')).toBeInTheDocument();
      expect(screen.getByText('IPS (2)')).toBeInTheDocument();
      expect(screen.getByText('DOMAINS (2)')).toBeInTheDocument();
      expect(screen.getByText('URLS (2)')).toBeInTheDocument();
      expect(screen.getByText('PATHS (2)')).toBeInTheDocument();

      // Check IOC values are rendered (defanged)
      expect(screen.getByText('d41d8cd98f00b204e9800998ecf8427e')).toBeInTheDocument();
      expect(screen.getByText('192[.]168[.]1[.]1')).toBeInTheDocument();
      expect(screen.getByText('malicious[.]com')).toBeInTheDocument();
      expect(screen.getByText('hxxp://malicious[.]com/payload')).toBeInTheDocument();
      expect(screen.getByText('C:\\temp\\malware[.]exe')).toBeInTheDocument();
    });

    it('should handle empty IOC arrays', () => {
      const iocs: IOCs = {
        hashes: [],
        ips: [],
        domains: [],
        urls: [],
        file_paths: []
      };

      render(<IOCDisplay iocs={iocs} />);

      // No sections should be rendered for empty arrays
      expect(screen.queryByText(/HASHS/)).not.toBeInTheDocument();
      expect(screen.queryByText(/IPS/)).not.toBeInTheDocument();
      expect(screen.queryByText(/DOMAINS/)).not.toBeInTheDocument();
      expect(screen.queryByText(/URLS/)).not.toBeInTheDocument();
      expect(screen.queryByText(/PATHS/)).not.toBeInTheDocument();
    });

    it('should handle undefined IOC arrays', () => {
      const iocs: IOCs = {};

      render(<IOCDisplay iocs={iocs} />);

      // No sections should be rendered for undefined arrays
      expect(screen.queryByText(/HASHS/)).not.toBeInTheDocument();
      expect(screen.queryByText(/IPS/)).not.toBeInTheDocument();
      expect(screen.queryByText(/DOMAINS/)).not.toBeInTheDocument();
      expect(screen.queryByText(/URLS/)).not.toBeInTheDocument();
      expect(screen.queryByText(/PATHS/)).not.toBeInTheDocument();
    });

    it('should handle partial IOC data', () => {
      const iocs: IOCs = {
        hashes: ['d41d8cd98f00b204e9800998ecf8427e'],
        domains: ['malicious.com']
        // ips, urls, file_paths are undefined
      };

      render(<IOCDisplay iocs={iocs} />);

      // Only provided sections should be rendered
      expect(screen.getByText('HASHS (1)')).toBeInTheDocument();
      expect(screen.getByText('DOMAINS (1)')).toBeInTheDocument();
      
      // Undefined sections should not be rendered
      expect(screen.queryByText(/IPS/)).not.toBeInTheDocument();
      expect(screen.queryByText(/URLS/)).not.toBeInTheDocument();
      expect(screen.queryByText(/PATHS/)).not.toBeInTheDocument();
    });

    it('should call IOCCore.defang for each IOC', () => {
      const iocs: IOCs = {
        domains: ['malicious.com', 'evil.org']
      };

      render(<IOCDisplay iocs={iocs} />);

      expect(mockIOCCore.defang).toHaveBeenCalledWith('malicious.com');
      expect(mockIOCCore.defang).toHaveBeenCalledWith('evil.org');
      expect(mockIOCCore.defang).toHaveBeenCalledTimes(2);
    });
  });

  describe('Copy to Clipboard', () => {
    it('should copy original IOC to clipboard when copy button is clicked', async () => {
      const iocs: IOCs = {
        domains: ['malicious.com']
      };

      render(<IOCDisplay iocs={iocs} />);

      const copyButton = screen.getByRole('button');
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith('malicious.com');
      });
    });

    it('should show success state after successful copy', async () => {
      const iocs: IOCs = {
        domains: ['malicious.com']
      };

      render(<IOCDisplay iocs={iocs} />);

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
      const iocs: IOCs = {
        domains: ['malicious.com']
      };

      render(<IOCDisplay iocs={iocs} />);

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

      const iocs: IOCs = {
        domains: ['malicious.com']
      };

      render(<IOCDisplay iocs={iocs} />);

      const copyButton = screen.getByRole('button');
      fireEvent.click(copyButton);

      // Should not show success state on failure
      await waitFor(() => {
        expect(screen.getByTestId('sl-icon-clipboard')).toBeInTheDocument();
        expect(screen.queryByTestId('sl-icon-check-circle')).not.toBeInTheDocument();
      });
    });

    it('should handle multiple IOCs with independent copy states', async () => {
      const iocs: IOCs = {
        domains: ['malicious.com', 'evil.org']
      };

      render(<IOCDisplay iocs={iocs} />);

      const copyButtons = screen.getAllByRole('button');
      expect(copyButtons).toHaveLength(2);

      // Click first copy button
      fireEvent.click(copyButtons[0]);

      await waitFor(() => {
        // First IOC should show success state
        const checkCircles = screen.getAllByTestId('sl-icon-check-circle');
        expect(checkCircles).toHaveLength(1);
        
        // Second IOC should still show clipboard icon
        const clipboards = screen.getAllByTestId('sl-icon-clipboard');
        expect(clipboards).toHaveLength(1);
      });

      expect(mockWriteText).toHaveBeenCalledWith('malicious.com');
    });

    it('should use correct key format for copy states', async () => {
      const iocs: IOCs = {
        hashes: ['d41d8cd98f00b204e9800998ecf8427e'],
        ips: ['192.168.1.1']
      };

      render(<IOCDisplay iocs={iocs} />);

      const copyButtons = screen.getAllByRole('button');
      
      // Click hash copy button
      fireEvent.click(copyButtons[0]);
      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith('d41d8cd98f00b204e9800998ecf8427e');
      });

      // Click IP copy button
      fireEvent.click(copyButtons[1]);
      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith('192.168.1.1');
      });

      expect(mockWriteText).toHaveBeenCalledTimes(2);
    });
  });

  describe('Tooltip Content', () => {
    it('should show correct tooltip content before copy', () => {
      const iocs: IOCs = {
        domains: ['malicious.com']
      };

      render(<IOCDisplay iocs={iocs} />);

      const tooltip = screen.getByTitle('Copy domain to clipboard for further analysis');
      expect(tooltip).toBeInTheDocument();
    });

    it('should show success tooltip content after copy', async () => {
      const iocs: IOCs = {
        domains: ['malicious.com']
      };

      render(<IOCDisplay iocs={iocs} />);

      const copyButton = screen.getByRole('button');
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(screen.getByTitle('Copied to clipboard!')).toBeInTheDocument();
      });
    });

    it('should show correct tooltip for different IOC types', () => {
      const iocs: IOCs = {
        hashes: ['d41d8cd98f00b204e9800998ecf8427e'],
        ips: ['192.168.1.1'],
        urls: ['http://malicious.com']
      };

      render(<IOCDisplay iocs={iocs} />);

      expect(screen.getByTitle('Copy hash to clipboard for further analysis')).toBeInTheDocument();
      expect(screen.getByTitle('Copy ip to clipboard for further analysis')).toBeInTheDocument();
      expect(screen.getByTitle('Copy url to clipboard for further analysis')).toBeInTheDocument();
    });
  });

  describe('CSS Classes and Styling', () => {
    it('should apply correct CSS classes to elements', () => {
      const iocs: IOCs = {
        domains: ['malicious.com']
      };

      render(<IOCDisplay iocs={iocs} />);

      // Check for key CSS classes
      expect(screen.getByText('malicious[.]com')).toHaveClass('flex-1', 'text-xs', 'font-mono', 'min-w-0', 'break-all');
      
      const copyButton = screen.getByRole('button');
      expect(copyButton).toHaveClass('compact-copy-btn', 'ioc-copy-btn', 'flex-shrink-0');
    });

    it('should apply correct icon classes for different states', async () => {
      const iocs: IOCs = {
        domains: ['malicious.com']
      };

      render(<IOCDisplay iocs={iocs} />);

      // Initially should have secondary-text class
      expect(screen.getByTestId('sl-icon-clipboard')).toHaveClass('secondary-text');

      const copyButton = screen.getByRole('button');
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(screen.getByTestId('sl-icon-check-circle')).toHaveClass('copy-success');
      });
    });
  });

  describe('Component Integration', () => {
    it('should render complex IOC data structure correctly', () => {
      const iocs: IOCs = {
        hashes: [
          'd41d8cd98f00b204e9800998ecf8427e',
          'da39a3ee5e6b4b0d3255bfef95601890afd80709',
          'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
        ],
        ips: ['192.168.1.1', '10.0.0.1', '172.16.0.1'],
        domains: ['malicious.com', 'evil.org', 'bad-actor.net'],
        urls: [
          'http://malicious.com/payload.exe',
          'https://evil.org/malware.zip',
          'ftp://bad-actor.net/trojan.bin'
        ],
        file_paths: [
          'C:\\Windows\\System32\\malware.exe',
          '/usr/bin/suspicious',
          '~/Downloads/payload.sh'
        ]
      };

      render(<IOCDisplay iocs={iocs} />);

      // Should render all sections with correct counts
      expect(screen.getByText('HASHS (3)')).toBeInTheDocument();
      expect(screen.getByText('IPS (3)')).toBeInTheDocument();
      expect(screen.getByText('DOMAINS (3)')).toBeInTheDocument();
      expect(screen.getByText('URLS (3)')).toBeInTheDocument();
      expect(screen.getByText('PATHS (3)')).toBeInTheDocument();

      // Should have correct number of copy buttons (15 total)
      expect(screen.getAllByRole('button')).toHaveLength(15);

      // Verify IOCCore.defang is called for each IOC
      expect(mockIOCCore.defang).toHaveBeenCalledTimes(15);
    });

    it('should handle edge case IOC values', () => {
      const iocs: IOCs = {
        domains: ['', 'valid.com', '   ', 'another.domain.com'],
        ips: ['0.0.0.0', '255.255.255.255']
      };

      render(<IOCDisplay iocs={iocs} />);

      // Should render all items, including edge cases
      expect(screen.getByText('DOMAINS (4)')).toBeInTheDocument();
      expect(screen.getByText('IPS (2)')).toBeInTheDocument();

      // Should call defang for all items, including empty/whitespace
      expect(mockIOCCore.defang).toHaveBeenCalledWith('');
      expect(mockIOCCore.defang).toHaveBeenCalledWith('valid.com');
      expect(mockIOCCore.defang).toHaveBeenCalledWith('   ');
      expect(mockIOCCore.defang).toHaveBeenCalledWith('another.domain.com');
    });
  });
});
