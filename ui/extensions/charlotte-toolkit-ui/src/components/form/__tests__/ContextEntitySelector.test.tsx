// src/components/form/__tests__/ContextEntitySelector.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContextEntitySelector from '../ContextEntitySelector';
import { ContextOption } from '../../../types';

// Mock utilities
jest.mock('../../../utils/context', () => ({
  formatDisplayName: jest.fn((option: ContextOption) => {
    // Defensive check to ensure we always return the expected structure
    if (!option || typeof option.displayName !== 'string') {
      return {
        displayText: 'Unknown',
        originalText: 'Unknown',
      };
    }
    return {
      displayText: option.displayName,
      originalText: option.displayName,
    };
  }),
}));

// Mock TruncatedText component
jest.mock('../../TruncatedText', () => {
  return function MockTruncatedText({ children, displayText }: any) {
    return <span data-testid="truncated-text">{displayText || children}</span>;
  };
});

// Mock Shoelace components
jest.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlSelect: ({ children, label, value, onSlChange, disabled }: any) => (
    <div data-testid="sl-select">
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onSlChange && onSlChange({ target: e.target })}
        disabled={disabled}
        data-testid="context-select"
      >
        {children}
      </select>
    </div>
  ),
  SlOption: ({ children, value, className }: any) => (
    <option value={value} className={className} data-testid="sl-option">
      {children}
    </option>
  ),
  SlIcon: ({ name, slot, className }: any) => (
    <span
      data-testid={`sl-icon-${name}`}
      data-slot={slot}
      className={className}
    >
      {name}
    </span>
  ),
  SlTooltip: ({ children, content }: any) => (
    <div data-testid="sl-tooltip" title={content}>
      {children}
    </div>
  ),
  SlDivider: () => <hr data-testid="sl-divider" />,
  SlBadge: ({ children, className }: any) => (
    <span data-testid="sl-badge" className={className}>
      {children}
    </span>
  ),
}));

describe('ContextEntitySelector', () => {
  const defaultProps = {
    selectedContextEntity: null,
    setSelectedContextEntity: jest.fn(),
    availableContextOptions: [],
    setQuery: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Disabled State', () => {
    it('should render disabled state when no context options available', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={[]} />);
      
      expect(screen.getByTestId('sl-tooltip')).toBeInTheDocument();
      expect(screen.getByTitle('No context detected for this incident')).toBeInTheDocument();
      expect(screen.getByTestId('context-select')).toBeDisabled();
      expect(screen.getByText('No entities available')).toBeInTheDocument();
    });

    it('should show layers icon in disabled state', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={[]} />);
      
      expect(screen.getByTestId('sl-icon-layers')).toBeInTheDocument();
    });

    it('should have opacity-60 and cursor-not-allowed classes in disabled state', () => {
      const { container } = render(<ContextEntitySelector {...defaultProps} availableContextOptions={[]} />);
      
      const disabledDiv = container.querySelector('.opacity-60.cursor-not-allowed');
      expect(disabledDiv).toBeInTheDocument();
    });
  });

  describe('Enabled State with Options', () => {
    const sampleOptions: ContextOption[] = [
      {
        value: 'domain1',
        displayName: 'example.com',
        type: 'domain',
        queryTemplate: 'Domain query for example.com',
      },
      {
        value: 'file1',
        displayName: 'malware.exe',
        type: 'file',
        subType: 'filename',
        queryTemplate: 'File query for malware.exe',
      },
      {
        value: 'ip1',
        displayName: '192.168.1.1',
        type: 'ip',
        queryTemplate: 'IP query for 192.168.1.1',
      },
      {
        value: 'mitre1',
        displayName: 'T1055',
        type: 'mitre',
        subType: 'technique',
        queryTemplate: 'MITRE query for T1055',
      },
    ];

    it('should render enabled select with options', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={sampleOptions} />);
      
      expect(screen.getByTestId('context-select')).not.toBeDisabled();
      expect(screen.getByText('Incident Context')).toBeInTheDocument();
      expect(screen.getByText('None Selected')).toBeInTheDocument();
    });

    it('should show layers icon in enabled state', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={sampleOptions} />);
      
      expect(screen.getByTestId('sl-icon-layers')).toBeInTheDocument();
    });

    it('should render all entity types with correct icons', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={sampleOptions} />);
      
      // Check for group icons
      expect(screen.getAllByTestId('sl-icon-shield-exclamation')).toHaveLength(4); // domains/mitre (header + option each)
      expect(screen.getByTestId('sl-icon-file-lock')).toBeInTheDocument(); // files group header only (option uses file-earmark due to filename subtype)
      expect(screen.getByTestId('sl-icon-router-fill')).toBeInTheDocument(); // ips
    });

    it('should render entity badges with correct counts', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={sampleOptions} />);
      
      const badges = screen.getAllByTestId('sl-badge');
      expect(badges).toHaveLength(4); // domain, file, ip, mitre
      
      // Each type has 1 entity in our sample
      badges.forEach(badge => {
        expect(badge).toHaveTextContent('1');
      });
    });

    it('should render group headers correctly', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={sampleOptions} />);
      
      expect(screen.getByText('Domains')).toBeInTheDocument();
      expect(screen.getByText('Files')).toBeInTheDocument();
      expect(screen.getByText('IP Addresses')).toBeInTheDocument();
      expect(screen.getByText('MITRE ATT&CK')).toBeInTheDocument();
    });

    it('should render dividers between groups', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={sampleOptions} />);
      
      const dividers = screen.getAllByTestId('sl-divider');
      expect(dividers).toHaveLength(3); // Between 4 groups = 3 dividers
    });
  });

  describe('Entity Selection', () => {
    const sampleOptions: ContextOption[] = [
      {
        value: 'domain1',
        displayName: 'example.com',
        type: 'domain',
        queryTemplate: 'Domain query for example.com',
      },
    ];

    it('should call setSelectedContextEntity and setQuery when option is selected', () => {
      const setSelectedContextEntity = jest.fn();
      const setQuery = jest.fn();
      
      render(
        <ContextEntitySelector
          {...defaultProps}
          availableContextOptions={sampleOptions}
          setSelectedContextEntity={setSelectedContextEntity}
          setQuery={setQuery}
        />
      );
      
      const select = screen.getByTestId('context-select');
      fireEvent.change(select, { target: { value: 'domain1' } });
      
      expect(setSelectedContextEntity).toHaveBeenCalledWith('domain1');
      expect(setQuery).toHaveBeenCalledWith('Domain query for example.com');
    });

    it('should set selected entity to null when empty value is selected', () => {
      const setSelectedContextEntity = jest.fn();
      
      render(
        <ContextEntitySelector
          {...defaultProps}
          availableContextOptions={sampleOptions}
          setSelectedContextEntity={setSelectedContextEntity}
        />
      );
      
      const select = screen.getByTestId('context-select');
      fireEvent.change(select, { target: { value: '' } });
      
      expect(setSelectedContextEntity).toHaveBeenCalledWith(null);
    });

    it('should display selected value correctly', () => {
      render(
        <ContextEntitySelector
          {...defaultProps}
          availableContextOptions={sampleOptions}
          selectedContextEntity="domain1"
        />
      );
      
      const select = screen.getByTestId('context-select');
      expect(select).toHaveValue('domain1');
    });

    it('should handle null selectedContextEntity', () => {
      render(
        <ContextEntitySelector
          {...defaultProps}
          availableContextOptions={sampleOptions}
          selectedContextEntity={null}
        />
      );
      
      const select = screen.getByTestId('context-select');
      expect(select).toHaveValue('');
    });
  });

  describe('Child Options', () => {
    const childOptions: ContextOption[] = [
      {
        value: 'hash1',
        displayName: 'abc123...',
        type: 'file',
        subType: 'md5',
        parentFile: 'malware.exe',
        queryTemplate: 'MD5 query',
      },
      {
        value: 'hash2',
        displayName: 'def456...',
        type: 'file',
        subType: 'sha256',
        parentFile: 'malware.exe',
        queryTemplate: 'SHA256 query',
      },
      {
        value: 'fqdn1',
        displayName: 'sub.example.com',
        type: 'domain',
        subType: 'fqdn',
        parentDomain: 'example.com',
        queryTemplate: 'FQDN query',
      },
    ];

    it('should apply child-option class to child options', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={childOptions} />);
      
      const options = screen.getAllByTestId('sl-option');
      // Filter out the "None Selected" option
      const entityOptions = options.filter(option => option.getAttribute('value') !== '');
      
      entityOptions.forEach(option => {
        // All our test options are child options
        expect(option).toHaveClass('child-option');
      });
    });

    it('should render correct icons for hash subtypes', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={childOptions} />);
      
      // Should have fingerprint icons for md5 and sha256
      const fingerprintIcons = screen.getAllByTestId('sl-icon-fingerprint');
      expect(fingerprintIcons).toHaveLength(2);
    });

    it('should render correct icon for fqdn subtype', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={childOptions} />);
      
      expect(screen.getByTestId('sl-icon-globe')).toBeInTheDocument();
    });
  });

  describe('Icon Rendering', () => {
    it('should render correct icons for different subtypes', () => {
      const iconTestOptions: ContextOption[] = [
        {
          value: 'md5',
          displayName: 'md5hash',
          type: 'file',
          subType: 'md5',
          queryTemplate: 'MD5 query',
        },
        {
          value: 'sha256',
          displayName: 'sha256hash',
          type: 'file',
          subType: 'sha256',
          queryTemplate: 'SHA256 query',
        },
        {
          value: 'fqdn',
          displayName: 'sub.domain.com',
          type: 'domain',
          subType: 'fqdn',
          queryTemplate: 'FQDN query',
        },
        {
          value: 'tld',
          displayName: 'com',
          type: 'domain',
          subType: 'tld',
          queryTemplate: 'TLD query',
        },
        {
          value: 'filename',
          displayName: 'file.exe',
          type: 'file',
          subType: 'filename',
          queryTemplate: 'Filename query',
        },
        {
          value: 'technique',
          displayName: 'T1055',
          type: 'mitre',
          subType: 'technique',
          queryTemplate: 'Technique query',
        },
      ];

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={iconTestOptions} />);
      
      expect(screen.getAllByTestId('sl-icon-fingerprint')).toHaveLength(2); // md5, sha256
      expect(screen.getByTestId('sl-icon-globe')).toBeInTheDocument(); // fqdn
      expect(screen.getAllByTestId('sl-icon-shield-exclamation')).toHaveLength(4); // domain header + tld, mitre header + technique
      expect(screen.getByTestId('sl-icon-file-earmark')).toBeInTheDocument(); // filename
    });

    it('should render correct icons for types without subtypes', () => {
      const typeIconOptions: ContextOption[] = [
        {
          value: 'ip',
          displayName: '192.168.1.1',
          type: 'ip',
          queryTemplate: 'IP query',
        },
        {
          value: 'domain',
          displayName: 'example.com',
          type: 'domain',
          queryTemplate: 'Domain query',
        },
        {
          value: 'file',
          displayName: 'file.exe',
          type: 'file',
          queryTemplate: 'File query',
        },
        {
          value: 'mitre',
          displayName: 'T1055',
          type: 'mitre',
          queryTemplate: 'MITRE query',
        },
      ];

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={typeIconOptions} />);
      
      expect(screen.getByTestId('sl-icon-router')).toBeInTheDocument(); // ip
      expect(screen.getAllByTestId('sl-icon-shield-exclamation')).toHaveLength(4); // domain and mitre (header + option)
      expect(screen.getAllByTestId('sl-icon-file-lock')).toHaveLength(2); // file (header + option)
      // mitre without subtype also uses shield-exclamation
    });
  });

  describe('Entity Grouping', () => {
    const mixedOptions: ContextOption[] = [
      // Domain group
      {
        value: 'domain1',
        displayName: 'example.com',
        type: 'domain',
        queryTemplate: 'Domain 1',
      },
      {
        value: 'domain2',
        displayName: 'test.com',
        type: 'domain',
        queryTemplate: 'Domain 2',
      },
      // File group
      {
        value: 'file1',
        displayName: 'malware.exe',
        type: 'file',
        queryTemplate: 'File 1',
      },
      // IP group (no IPs in this test)
      // MITRE group
      {
        value: 'mitre1',
        displayName: 'T1055',
        type: 'mitre',
        queryTemplate: 'MITRE 1',
      },
    ];

    it('should group entities by type correctly', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={mixedOptions} />);
      
      // Check group headers appear
      expect(screen.getByText('Domains')).toBeInTheDocument();
      expect(screen.getByText('Files')).toBeInTheDocument();
      expect(screen.getByText('MITRE ATT&CK')).toBeInTheDocument();
      
      // IP group should not appear since no IP entities
      expect(screen.queryByText('IP Addresses')).not.toBeInTheDocument();
    });

    it('should show correct counts in badges', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={mixedOptions} />);
      
      const badges = screen.getAllByTestId('sl-badge');
      
      // Should have badges for domain (2), file (1), mitre (1)
      const badgeTexts = badges.map(badge => badge.textContent);
      expect(badgeTexts).toContain('2'); // domains
      expect(badgeTexts).toContain('1'); // files
      expect(badgeTexts).toContain('1'); // mitre
    });

    it('should only render dividers between existing groups', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={mixedOptions} />);
      
      // Should have 2 dividers (between domain-file, file-mitre)
      const dividers = screen.getAllByTestId('sl-divider');
      expect(dividers).toHaveLength(2);
    });
  });

  describe('TruncatedText Integration', () => {
    const truncatedOptions: ContextOption[] = [
      {
        value: 'long1',
        displayName: 'very-long-domain-name-that-should-be-truncated.com',
        type: 'domain',
        queryTemplate: 'Long domain query',
      },
    ];

    it('should render TruncatedText components for display names', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={truncatedOptions} />);
      
      expect(screen.getByTestId('truncated-text')).toBeInTheDocument();
    });

    it('should call formatDisplayName utility', () => {
      const { formatDisplayName } = require('../../../utils/context');
      
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={truncatedOptions} />);
      
      expect(formatDisplayName).toHaveBeenCalledWith(truncatedOptions[0]);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty availableContextOptions array', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={[]} />);
      
      expect(screen.getByText('No entities available')).toBeInTheDocument();
      expect(screen.getByTestId('context-select')).toBeDisabled();
    });

    it('should handle selection of non-existent option gracefully', () => {
      const sampleOptions: ContextOption[] = [
        {
          value: 'existing',
          displayName: 'Existing Option',
          type: 'domain',
          queryTemplate: 'Existing query',
        },
      ];

      const setSelectedContextEntity = jest.fn();
      const setQuery = jest.fn();
      
      render(
        <ContextEntitySelector
          {...defaultProps}
          availableContextOptions={sampleOptions}
          setSelectedContextEntity={setSelectedContextEntity}
          setQuery={setQuery}
        />
      );
      
      const select = screen.getByTestId('context-select');
      fireEvent.change(select, { target: { value: 'non-existent' } });
      
      // Should still call setSelectedContextEntity but not setQuery
      expect(setSelectedContextEntity).toHaveBeenCalledWith(null);
      expect(setQuery).not.toHaveBeenCalled();
    });

    it('should handle options with missing required properties', () => {
      const incompleteOptions: ContextOption[] = [
        {
          value: 'incomplete',
          displayName: 'Incomplete Option',
          type: 'domain',
          queryTemplate: 'Query template',
          // Missing some optional properties
        },
      ];

      expect(() => {
        render(<ContextEntitySelector {...defaultProps} availableContextOptions={incompleteOptions} />);
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    const sampleOptions: ContextOption[] = [
      {
        value: 'accessible',
        displayName: 'Accessible Option',
        type: 'domain',
        queryTemplate: 'Accessible query',
      },
    ];

    it('should have proper label for select element', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={sampleOptions} />);
      
      expect(screen.getByText('Incident Context')).toBeInTheDocument();
    });

    it('should have proper tooltip content for disabled state', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={[]} />);
      
      expect(screen.getByTitle('No context detected for this incident')).toBeInTheDocument();
    });

    it('should have proper option values and text', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={sampleOptions} />);
      
      const options = screen.getAllByTestId('sl-option');
      const noneOption = options.find(option => option.getAttribute('value') === '');
      const entityOption = options.find(option => option.getAttribute('value') === 'accessible');
      
      expect(noneOption).toHaveTextContent('None Selected');
      expect(entityOption).toBeDefined();
    });
  });
});
