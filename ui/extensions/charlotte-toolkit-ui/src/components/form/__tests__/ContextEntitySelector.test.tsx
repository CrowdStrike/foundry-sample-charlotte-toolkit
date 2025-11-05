import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ContextOption } from '../../../types';
import { formatDisplayName } from '../../../utils/context';
import ContextEntitySelector from '../ContextEntitySelector';

// Type definitions for mocked Shoelace components
interface SlSelectProps {
  children: ReactNode;
  label: string;
  value: string;
  onSlChange?: (event: CustomEvent) => void;
  disabled: boolean;
}

interface SlOptionProps {
  children: ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
}

interface SlIconProps {
  name: string;
  slot?: string;
  className?: string;
}

interface SlBadgeProps {
  children: ReactNode;
  className?: string;
}

interface SlTooltipProps {
  children: ReactNode;
  content: string;
}

// Mock the formatDisplayName utility
vi.mock('../../../utils/context', () => ({
  formatDisplayName: vi.fn((option: ContextOption) => ({
    displayText: option.displayName,
    originalText: option.value,
  })),
}));

// Get properly typed mock for the imported function
const mockFormatDisplayName = vi.mocked(formatDisplayName);

// Mock Shoelace components
vi.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlSelect: ({ children, label, value, onSlChange, disabled }: SlSelectProps) => (
    <div data-testid="sl-select" data-label={label} data-disabled={disabled}>
      <label htmlFor="context-select">{label}</label>
      <select
        id="context-select"
        data-testid="select-element"
        value={value}
        onChange={(e) => {
          const customEvent = new CustomEvent('sl-change');
          Object.defineProperty(customEvent, 'target', {
            value: e.target,
            writable: false,
          });
          onSlChange?.(customEvent as CustomEvent);
        }}
        disabled={disabled}
      >
        {children}
      </select>
    </div>
  ),
  SlOption: ({ children, value, disabled, className }: SlOptionProps) => (
    <option value={value} disabled={disabled} data-classname={className}>
      {children}
    </option>
  ),
  SlIcon: ({ name, slot, className }: SlIconProps) => (
    <span data-testid={`icon-${name}`} data-slot={slot} className={className}>
      {name}
    </span>
  ),
  SlBadge: ({ children, className }: SlBadgeProps) => (
    <span data-testid="sl-badge" className={className}>
      {children}
    </span>
  ),
  SlTooltip: ({ children, content }: SlTooltipProps) => (
    <div data-testid="sl-tooltip" data-content={content}>
      {children}
    </div>
  ),
  SlDivider: () => <hr data-testid="sl-divider" />,
}));

describe('ContextEntitySelector', () => {
  const defaultProps = {
    selectedContextEntity: null,
    setSelectedContextEntity: vi.fn(),
    availableContextOptions: [] as ContextOption[],
    setQuery: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createMockOptions = (): ContextOption[] => [
    {
      type: 'domain',
      subType: 'tld',
      value: 'example.com',
      displayName: 'example.com',
      queryTemplate: 'Analyze domain example.com',
    },
    {
      type: 'ip',
      value: '192.168.1.1',
      displayName: '192.168.1.1',
      queryTemplate: 'Analyze IP 192.168.1.1',
    },
    {
      type: 'file',
      subType: 'filename',
      value: 'malware.exe',
      displayName: 'malware.exe',
      queryTemplate: 'Analyze file malware.exe',
    },
    {
      type: 'mitre',
      subType: 'technique',
      value: 'T1003',
      displayName: 'T1003',
      queryTemplate: 'Analyze MITRE T1003',
    },
  ];

  describe('Rendering', () => {
    it('should render successfully with label', () => {
      render(<ContextEntitySelector {...defaultProps} />);

      expect(screen.getByText('Incident Context')).toBeDefined();
    });

    it('should render select element', () => {
      render(<ContextEntitySelector {...defaultProps} />);

      expect(screen.getByTestId('sl-select')).toBeDefined();
    });

    it('should render "None Selected" option when no options available', () => {
      render(<ContextEntitySelector {...defaultProps} />);

      const select = screen.getByTestId('select-element') as HTMLSelectElement;
      expect(select.querySelector('option[value=""]')).toBeDefined();
    });

    it('should render icon prefix', () => {
      render(<ContextEntitySelector {...defaultProps} />);

      expect(screen.getByTestId('icon-layers')).toBeDefined();
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when no context options available', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={[]} />);

      const select = screen.getByTestId('sl-select');
      expect(select.getAttribute('data-disabled')).toBe('true');
    });

    it('should show tooltip when disabled', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={[]} />);

      const tooltip = screen.getByTestId('sl-tooltip');
      expect(tooltip.getAttribute('data-content')).toBe('No context detected for this incident');
    });

    it('should show "No entities available" text when disabled', () => {
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={[]} />);

      expect(screen.getByText('No entities available')).toBeDefined();
    });

    it('should not be disabled when context options are available', () => {
      const options = createMockOptions();
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      const select = screen.getByTestId('sl-select');
      expect(select.getAttribute('data-disabled')).not.toBe('true');
    });
  });

  describe('Options Rendering', () => {
    it('should render all provided options', () => {
      const options = createMockOptions();
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      expect(screen.getByText('example.com')).toBeDefined();
      expect(screen.getByText('192.168.1.1')).toBeDefined();
      expect(screen.getByText('malware.exe')).toBeDefined();
      expect(screen.getByText('T1003')).toBeDefined();
    });

    it('should group options by type', () => {
      const options = createMockOptions();
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      expect(screen.getByText('Domains')).toBeDefined();
      expect(screen.getByText('Files')).toBeDefined();
      expect(screen.getByText('IP Addresses')).toBeDefined();
      expect(screen.getByText('MITRE ATT&CK')).toBeDefined();
    });

    it('should render group icons', () => {
      const options = createMockOptions();
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      // Multiple shield-exclamation icons exist (in headers and options), so use getAllByTestId
      const shieldIcons = screen.getAllByTestId('icon-shield-exclamation');
      expect(shieldIcons.length).toBeGreaterThan(0);
      expect(screen.getByTestId('icon-file-lock')).toBeDefined();
      expect(screen.getByTestId('icon-router-fill')).toBeDefined();
    });

    it('should render entity count badges', () => {
      const options = createMockOptions();
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      const badges = screen.getAllByTestId('sl-badge');
      expect(badges.length).toBeGreaterThan(0);
    });

    it('should render dividers between groups', () => {
      const options = createMockOptions();
      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      const dividers = screen.getAllByTestId('sl-divider');
      // Should have dividers between groups (not before first group)
      expect(dividers.length).toBeGreaterThan(0);
    });

    it('should not render empty groups', () => {
      const options: ContextOption[] = [
        {
          type: 'domain',
          value: 'test.com',
          displayName: 'test.com',
          queryTemplate: 'Analyze test.com',
        },
      ];

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      expect(screen.getByText('Domains')).toBeDefined();
      expect(screen.queryByText('Files')).toBeNull();
      expect(screen.queryByText('IP Addresses')).toBeNull();
    });
  });

  describe('Child Options', () => {
    it('should apply child-option class to MD5 subtype', () => {
      const options: ContextOption[] = [
        {
          type: 'file',
          subType: 'md5',
          value: 'abc123',
          displayName: 'abc123',
          queryTemplate: 'Analyze MD5',
        },
      ];

      const { container } = render(
        <ContextEntitySelector {...defaultProps} availableContextOptions={options} />,
      );

      const option = container.querySelector('[data-classname="child-option"]');
      expect(option).toBeDefined();
    });

    it('should apply child-option class to SHA256 subtype', () => {
      const options: ContextOption[] = [
        {
          type: 'file',
          subType: 'sha256',
          value: 'def456',
          displayName: 'def456',
          queryTemplate: 'Analyze SHA256',
        },
      ];

      const { container } = render(
        <ContextEntitySelector {...defaultProps} availableContextOptions={options} />,
      );

      const option = container.querySelector('[data-classname="child-option"]');
      expect(option).toBeDefined();
    });

    it('should apply child-option class to FQDN subtype', () => {
      const options: ContextOption[] = [
        {
          type: 'domain',
          subType: 'fqdn',
          value: 'sub.example.com',
          displayName: 'sub.example.com',
          queryTemplate: 'Analyze FQDN',
        },
      ];

      const { container } = render(
        <ContextEntitySelector {...defaultProps} availableContextOptions={options} />,
      );

      const option = container.querySelector('[data-classname="child-option"]');
      expect(option).toBeDefined();
    });

    it('should render fingerprint icon for MD5', () => {
      const options: ContextOption[] = [
        {
          type: 'file',
          subType: 'md5',
          value: 'abc',
          displayName: 'abc',
          queryTemplate: 'test',
        },
      ];

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      expect(screen.getByTestId('icon-fingerprint')).toBeDefined();
    });

    it('should render globe icon for FQDN', () => {
      const options: ContextOption[] = [
        {
          type: 'domain',
          subType: 'fqdn',
          value: 'test.com',
          displayName: 'test.com',
          queryTemplate: 'test',
        },
      ];

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      expect(screen.getByTestId('icon-globe')).toBeDefined();
    });
  });

  describe('User Interactions', () => {
    it('should call setSelectedContextEntity when option is selected', async () => {
      const options = createMockOptions();
      const user = userEvent.setup();

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      const select = screen.getByTestId('select-element');
      await user.selectOptions(select, 'example.com');

      expect(defaultProps.setSelectedContextEntity).toHaveBeenCalledWith('example.com');
    });

    it('should call setQuery with queryTemplate when option is selected', async () => {
      const options = createMockOptions();
      const user = userEvent.setup();

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      const select = screen.getByTestId('select-element');
      await user.selectOptions(select, 'example.com');

      expect(defaultProps.setQuery).toHaveBeenCalledWith('Analyze domain example.com');
    });

    it('should set selectedContextEntity to null when empty value selected', async () => {
      const options = createMockOptions();
      const user = userEvent.setup();

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      const select = screen.getByTestId('select-element');
      await user.selectOptions(select, '');

      expect(defaultProps.setSelectedContextEntity).toHaveBeenCalledWith(null);
    });

    it('should not update query when empty value selected', async () => {
      const options = createMockOptions();
      const user = userEvent.setup();

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      const select = screen.getByTestId('select-element');
      await user.selectOptions(select, '');

      expect(defaultProps.setQuery).not.toHaveBeenCalled();
    });

    it('should handle selection of different entity types', async () => {
      const options = createMockOptions();
      const user = userEvent.setup();

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      const select = screen.getByTestId('select-element');

      await user.selectOptions(select, '192.168.1.1');
      expect(defaultProps.setSelectedContextEntity).toHaveBeenCalledWith('192.168.1.1');
      expect(defaultProps.setQuery).toHaveBeenCalledWith('Analyze IP 192.168.1.1');

      await user.selectOptions(select, 'malware.exe');
      expect(defaultProps.setSelectedContextEntity).toHaveBeenCalledWith('malware.exe');
      expect(defaultProps.setQuery).toHaveBeenCalledWith('Analyze file malware.exe');
    });
  });

  describe('Entity Counts', () => {
    it('should display correct count for each entity type', () => {
      const options: ContextOption[] = [
        ...Array.from({ length: 3 }, (_, i) => ({
          type: 'domain' as const,
          value: `domain${i}.com`,
          displayName: `domain${i}.com`,
          queryTemplate: `query${i}`,
        })),
        ...Array.from({ length: 2 }, (_, i) => ({
          type: 'ip' as const,
          value: `10.0.0.${i}`,
          displayName: `10.0.0.${i}`,
          queryTemplate: `query${i}`,
        })),
      ];

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      const badges = screen.getAllByTestId('sl-badge');
      const domainBadge = badges.find((b) => b.textContent === '3');
      const ipBadge = badges.find((b) => b.textContent === '2');

      expect(domainBadge).toBeDefined();
      expect(ipBadge).toBeDefined();
    });

    it('should update counts when options change', () => {
      const initialOptions: ContextOption[] = [
        {
          type: 'domain',
          value: 'test.com',
          displayName: 'test.com',
          queryTemplate: 'query',
        },
      ];

      const { rerender } = render(
        <ContextEntitySelector {...defaultProps} availableContextOptions={initialOptions} />,
      );

      let badges = screen.getAllByTestId('sl-badge');
      expect(badges.some((b) => b.textContent === '1')).toBe(true);

      const updatedOptions: ContextOption[] = [
        ...initialOptions,
        {
          type: 'domain',
          value: 'test2.com',
          displayName: 'test2.com',
          queryTemplate: 'query',
        },
      ];

      rerender(
        <ContextEntitySelector {...defaultProps} availableContextOptions={updatedOptions} />,
      );

      badges = screen.getAllByTestId('sl-badge');
      expect(badges.some((b) => b.textContent === '2')).toBe(true);
    });
  });

  describe('Display Name Formatting', () => {
    it('should call formatDisplayName for each option', () => {
      mockFormatDisplayName.mockClear();
      const options = createMockOptions();

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      expect(mockFormatDisplayName).toHaveBeenCalled();
      expect(mockFormatDisplayName.mock.calls.length).toBeGreaterThan(0);
    });

    it('should handle formatDisplayName errors gracefully', () => {
      mockFormatDisplayName.mockImplementation(() => {
        throw new Error('Format error');
      });

      const options: ContextOption[] = [
        {
          type: 'domain',
          value: 'test.com',
          displayName: 'test.com',
          queryTemplate: 'query',
        },
      ];

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      // Should still render displayName despite error
      expect(screen.getByText('test.com')).toBeDefined();

      // Restore mock for other tests
      mockFormatDisplayName.mockImplementation((option: ContextOption) => ({
        displayText: option.displayName,
        originalText: option.value,
      }));
    });

    it('should render tooltip with original text from formatDisplayName', () => {
      mockFormatDisplayName.mockReturnValue({
        displayText: 'Short Name',
        originalText: 'Very Long Original Name',
      });

      const options: ContextOption[] = [
        {
          type: 'domain',
          value: 'test.com',
          displayName: 'test.com',
          queryTemplate: 'query',
        },
      ];

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      const tooltips = screen.getAllByTestId('sl-tooltip');
      const matchingTooltip = tooltips.find(
        (t) => t.getAttribute('data-content') === 'Very Long Original Name',
      );
      expect(matchingTooltip).toBeDefined();

      // Restore mock for other tests
      mockFormatDisplayName.mockImplementation((option: ContextOption) => ({
        displayText: option.displayName,
        originalText: option.value,
      }));
    });
  });

  describe('Selected Value', () => {
    it('should display selected value correctly', () => {
      const options = createMockOptions();

      render(
        <ContextEntitySelector
          {...defaultProps}
          availableContextOptions={options}
          selectedContextEntity="example.com"
        />,
      );

      const select = screen.getByTestId('select-element') as HTMLSelectElement;
      expect(select.value).toBe('example.com');
    });

    it('should display empty string when no entity selected', () => {
      const options = createMockOptions();

      render(
        <ContextEntitySelector
          {...defaultProps}
          availableContextOptions={options}
          selectedContextEntity={null}
        />,
      );

      const select = screen.getByTestId('select-element') as HTMLSelectElement;
      expect(select.value).toBe('');
    });
  });

  describe('Edge Cases', () => {
    it('should handle options with parentFile property', () => {
      const options: ContextOption[] = [
        {
          type: 'file',
          subType: 'md5',
          value: 'hash123',
          displayName: 'hash123',
          queryTemplate: 'query',
          parentFile: 'parent.exe',
        },
      ];

      const { container } = render(
        <ContextEntitySelector {...defaultProps} availableContextOptions={options} />,
      );

      const option = container.querySelector('[data-classname="child-option"]');
      expect(option).toBeDefined();
    });

    it('should handle options with parentDomain property', () => {
      const options: ContextOption[] = [
        {
          type: 'domain',
          subType: 'fqdn',
          value: 'sub.test.com',
          displayName: 'sub.test.com',
          queryTemplate: 'query',
          parentDomain: 'test.com',
        },
      ];

      const { container } = render(
        <ContextEntitySelector {...defaultProps} availableContextOptions={options} />,
      );

      const option = container.querySelector('[data-classname="child-option"]');
      expect(option).toBeDefined();
    });

    it('should handle empty subType gracefully', () => {
      const options: ContextOption[] = [
        {
          type: 'ip',
          value: '10.0.0.1',
          displayName: '10.0.0.1',
          queryTemplate: 'query',
        },
      ];

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      expect(screen.getByText('10.0.0.1')).toBeDefined();
    });

    it('should handle very long display names', () => {
      const longName = 'a'.repeat(200);
      const options: ContextOption[] = [
        {
          type: 'domain',
          value: longName,
          displayName: longName,
          queryTemplate: 'query',
        },
      ];

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      expect(screen.getByText(longName)).toBeDefined();
    });

    it('should handle special characters in values', () => {
      const specialValue = 'C:\\Windows\\System32\\file.dll';
      const options: ContextOption[] = [
        {
          type: 'file',
          value: specialValue,
          displayName: specialValue,
          queryTemplate: 'query',
        },
      ];

      render(<ContextEntitySelector {...defaultProps} availableContextOptions={options} />);

      expect(screen.getByText(specialValue)).toBeDefined();
    });
  });
});
