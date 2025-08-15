// src/components/markdown/__tests__/InlineCode.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { InlineCode } from '../InlineCode';
import { IOCCore } from '../../../utils/security/iocCore';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';

// Mock the dependencies
jest.mock('../../../utils/security/iocCore');
jest.mock('../../../hooks/useCopyToClipboard');

// Mock Shoelace components
jest.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlBadge: ({ children, variant, className }: any) => (
    <span data-testid="sl-badge" data-variant={variant} className={className}>
      {children}
    </span>
  ),
  SlIcon: ({ name, className, onClick }: any) => (
    <span
      data-testid="sl-icon"
      data-name={name}
      className={className}
      onClick={onClick}
      role="button"
    />
  ),
  SlTooltip: ({ children, content, placement, distance, hoist }: any) => (
    <div data-testid="sl-tooltip" data-content={content} data-placement={placement}>
      {children}
    </div>
  ),
}));

const mockIOCCore = IOCCore as jest.Mocked<typeof IOCCore>;
const mockUseCopyToClipboard = useCopyToClipboard as jest.MockedFunction<typeof useCopyToClipboard>;

describe('InlineCode', () => {
  const mockCopyToClipboard = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCopyToClipboard.mockReturnValue({
      copyState: 'copy',
      copyToClipboard: mockCopyToClipboard,
    });
  });

  describe('when text is not an IOC', () => {
    beforeEach(() => {
      mockIOCCore.detectType.mockReturnValue(null);
    });

    it('renders simple code element for non-IOC text', () => {
      render(<InlineCode>regular code</InlineCode>);
      
      const codeElement = screen.getByText('regular code');
      expect(codeElement).toBeInTheDocument();
      expect(codeElement.tagName).toBe('CODE');
      expect(screen.queryByTestId('sl-badge')).not.toBeInTheDocument();
    });

    it('applies custom className to code element', () => {
      render(<InlineCode className="custom-class">regular code</InlineCode>);
      
      const codeElement = screen.getByText('regular code');
      expect(codeElement).toHaveClass('custom-class');
    });

    it('handles various children types', () => {
      render(<InlineCode>{123}</InlineCode>);
      
      const codeElement = screen.getByText('123');
      expect(codeElement).toBeInTheDocument();
      expect(codeElement.tagName).toBe('CODE');
    });
  });

  describe('when text is an IOC', () => {
    beforeEach(() => {
      mockIOCCore.detectType.mockReturnValue('ip');
      mockIOCCore.getBadgeVariant.mockReturnValue('danger');
      mockIOCCore.defang.mockReturnValue('192[.]168[.]1[.]1');
    });

    it('renders IOC components for detected IOC', () => {
      render(<InlineCode>192.168.1.1</InlineCode>);
      
      // Check badge
      const badge = screen.getByTestId('sl-badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute('data-variant', 'danger');
      expect(badge).toHaveTextContent('IP');

      // Check defanged text in code element
      const codeElement = screen.getByText('192[.]168[.]1[.]1');
      expect(codeElement).toBeInTheDocument();
      expect(codeElement.tagName).toBe('CODE');

      // Check icon
      const icon = screen.getByTestId('sl-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('data-name', 'copy');
    });

    it('calls IOCCore methods with correct parameters', () => {
      render(<InlineCode>malicious.com</InlineCode>);

      expect(mockIOCCore.detectType).toHaveBeenCalledWith('malicious.com');
      expect(mockIOCCore.getBadgeVariant).toHaveBeenCalledWith('ip');
      expect(mockIOCCore.defang).toHaveBeenCalledWith('malicious.com');
    });

    it('displays correct tooltips for copy functionality', () => {
      render(<InlineCode>192.168.1.1</InlineCode>);
      
      const tooltips = screen.getAllByTestId('sl-tooltip');
      expect(tooltips).toHaveLength(2);
      
      // Check first tooltip (for code element)
      expect(tooltips[0]).toHaveAttribute('data-content', 'Click to copy ip to clipboard');
      
      // Check second tooltip (for icon)
      expect(tooltips[1]).toHaveAttribute('data-content', 'Copy ip to clipboard for further analysis');
    });

    it('handles code element click to copy IOC', () => {
      render(<InlineCode>192.168.1.1</InlineCode>);
      
      const codeElement = screen.getByText('192[.]168[.]1[.]1');
      fireEvent.click(codeElement);
      
      expect(mockCopyToClipboard).toHaveBeenCalledWith('192.168.1.1');
    });

    it('handles icon click to copy IOC', () => {
      render(<InlineCode>192.168.1.1</InlineCode>);
      
      const icon = screen.getByTestId('sl-icon');
      fireEvent.click(icon);
      
      expect(mockCopyToClipboard).toHaveBeenCalledWith('192.168.1.1');
    });

    it('handles click event on IOC elements', () => {
      render(<InlineCode>192.168.1.1</InlineCode>);
      
      const codeElement = screen.getByText('192[.]168[.]1[.]1');
      
      // Test that clicking the element calls the copy function
      fireEvent.click(codeElement);
      expect(mockCopyToClipboard).toHaveBeenCalledWith('192.168.1.1');
    });

    describe('when copy state is success', () => {
      beforeEach(() => {
        mockUseCopyToClipboard.mockReturnValue({
          copyState: 'check-circle',
          copyToClipboard: mockCopyToClipboard,
        });
      });

      it('displays success tooltips', () => {
        render(<InlineCode>192.168.1.1</InlineCode>);
        
        const tooltips = screen.getAllByTestId('sl-tooltip');
        expect(tooltips[0]).toHaveAttribute('data-content', 'Copied to clipboard!');
        expect(tooltips[1]).toHaveAttribute('data-content', 'Copied to clipboard!');
      });

      it('displays success icon state', () => {
        render(<InlineCode>192.168.1.1</InlineCode>);
        
        const icon = screen.getByTestId('sl-icon');
        expect(icon).toHaveAttribute('data-name', 'check-circle');
        expect(icon).toHaveClass('copy-success');
      });
    });

    describe('with different IOC types', () => {
      it('handles domain IOC type', () => {
        mockIOCCore.detectType.mockReturnValue('domain');
        mockIOCCore.getBadgeVariant.mockReturnValue('warning');
        mockIOCCore.defang.mockReturnValue('evil[.]com');

        render(<InlineCode>evil.com</InlineCode>);
        
        const badge = screen.getByTestId('sl-badge');
        expect(badge).toHaveAttribute('data-variant', 'warning');
        expect(badge).toHaveTextContent('DOMAIN');
        
        const codeElement = screen.getByText('evil[.]com');
        expect(codeElement).toBeInTheDocument();
      });

      it('handles hash IOC type', () => {
        mockIOCCore.detectType.mockReturnValue('hash');
        mockIOCCore.getBadgeVariant.mockReturnValue('neutral');
        mockIOCCore.defang.mockReturnValue('abc123def456');

        render(<InlineCode>abc123def456</InlineCode>);
        
        const badge = screen.getByTestId('sl-badge');
        expect(badge).toHaveAttribute('data-variant', 'neutral');
        expect(badge).toHaveTextContent('HASH');
      });

      it('handles url IOC type', () => {
        mockIOCCore.detectType.mockReturnValue('url');
        mockIOCCore.getBadgeVariant.mockReturnValue('danger');
        mockIOCCore.defang.mockReturnValue('hxxps://evil[.]com/malware');

        render(<InlineCode>https://evil.com/malware</InlineCode>);
        
        const badge = screen.getByTestId('sl-badge');
        expect(badge).toHaveAttribute('data-variant', 'danger');
        expect(badge).toHaveTextContent('URL');
        
        const codeElement = screen.getByText('hxxps://evil[.]com/malware');
        expect(codeElement).toBeInTheDocument();
      });
    });

    it('applies correct CSS classes to IOC container', () => {
      render(<InlineCode>192.168.1.1</InlineCode>);
      
      const container = screen.getByText('192[.]168[.]1[.]1').closest('span');
      expect(container).toHaveClass('inline-flex', 'items-center', 'gap-1', 'ioc-container');
    });

    it('applies correct CSS classes to code element', () => {
      render(<InlineCode>192.168.1.1</InlineCode>);
      
      const codeElement = screen.getByText('192[.]168[.]1[.]1');
      expect(codeElement).toHaveClass('ioc-code', 'cursor-pointer', 'ioc-hover-bg', 'transition-colors');
    });

    it('applies correct CSS classes to icon element', () => {
      render(<InlineCode>192.168.1.1</InlineCode>);
      
      const icon = screen.getByTestId('sl-icon');
      expect(icon).toHaveClass('text-xs', 'cursor-pointer', 'ioc-hover-text', 'secondary-text');
    });
  });

  describe('edge cases', () => {
    it('handles empty children', () => {
      mockIOCCore.detectType.mockReturnValue(null);
      const { container } = render(<InlineCode>{''}</InlineCode>);
      
      const codeElement = container.querySelector('code');
      expect(codeElement).toBeInTheDocument();
      expect(codeElement?.tagName).toBe('CODE');
    });

    it('handles null children', () => {
      mockIOCCore.detectType.mockReturnValue(null);
      render(<InlineCode>{null}</InlineCode>);
      
      expect(mockIOCCore.detectType).toHaveBeenCalledWith('null');
    });

    it('handles undefined children', () => {
      mockIOCCore.detectType.mockReturnValue(null);
      render(<InlineCode>{undefined}</InlineCode>);
      
      expect(mockIOCCore.detectType).toHaveBeenCalledWith('undefined');
    });

    it('handles React elements as children', () => {
      mockIOCCore.detectType.mockReturnValue(null);
      render(<InlineCode><span>nested element</span></InlineCode>);
      
      // String conversion of React element
      expect(mockIOCCore.detectType).toHaveBeenCalledWith('[object Object]');
    });
  });

  describe('accessibility', () => {
    beforeEach(() => {
      mockIOCCore.detectType.mockReturnValue('ip');
      mockIOCCore.getBadgeVariant.mockReturnValue('danger');
      mockIOCCore.defang.mockReturnValue('192[.]168[.]1[.]1');
    });

    it('provides proper role for clickable icon', () => {
      render(<InlineCode>192.168.1.1</InlineCode>);
      
      const icon = screen.getByRole('button');
      expect(icon).toBeInTheDocument();
    });

    it('provides cursor pointer styling for interactive elements', () => {
      render(<InlineCode>192.168.1.1</InlineCode>);
      
      const codeElement = screen.getByText('192[.]168[.]1[.]1');
      const icon = screen.getByTestId('sl-icon');
      
      expect(codeElement).toHaveClass('cursor-pointer');
      expect(icon).toHaveClass('cursor-pointer');
    });
  });
});
