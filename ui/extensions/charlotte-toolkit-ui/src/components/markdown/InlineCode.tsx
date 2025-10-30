// src/components/markdown/InlineCode.tsx

import { SlBadge, SlIcon, SlTooltip } from '@shoelace-style/shoelace/dist/react';
import type React from 'react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { IOCCore } from '../../utils/security/iocCore';

interface InlineCodeProps {
  children: React.ReactNode;
  className?: string;
}

export const InlineCode: React.FC<InlineCodeProps> = ({ children, className }) => {
  const text = String(children);
  const iocType = IOCCore.detectType(text);
  const { copyState, copyToClipboard } = useCopyToClipboard();

  const handleIOCCopy = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    copyToClipboard(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Trigger on Enter or Space key (standard button behavior)
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleIOCCopy(e);
    }
  };

  if (iocType) {
    const badgeVariant = IOCCore.getBadgeVariant(iocType);
    // Defang IOCs for display while keeping original for copying
    const defangedText = IOCCore.defang(text);

    return (
      <span
        className="ioc-container"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}
      >
        <SlBadge variant={badgeVariant} style={{ fontSize: 'var(--font-size-xs)' }}>
          {iocType.toUpperCase()}
        </SlBadge>
        <SlTooltip
          content={
            copyState === 'check-circle'
              ? 'Copied to clipboard!'
              : `Click to copy ${iocType} to clipboard`
          }
          placement="top"
          distance={8}
          hoist
        >
          <button
            type="button"
            className="ioc-code cursor-pointer ioc-hover-bg transition-colors"
            onClick={handleIOCCopy}
            onKeyDown={handleKeyDown}
          >
            {defangedText}
          </button>
        </SlTooltip>
        <SlTooltip
          content={
            copyState === 'check-circle'
              ? 'Copied to clipboard!'
              : `Copy ${iocType} to clipboard for further analysis`
          }
          placement="top"
          distance={8}
          hoist
        >
          <button
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              border: 0,
              background: 'transparent',
              padding: 0,
              cursor: 'pointer',
            }}
            onClick={handleIOCCopy}
            onKeyDown={handleKeyDown}
            aria-label={`Copy ${iocType} to clipboard`}
          >
            <SlIcon
              name={copyState}
              className={`text-xs cursor-pointer ioc-hover-text ${copyState === 'check-circle' ? 'copy-success' : 'secondary-text'}`}
            />
          </button>
        </SlTooltip>
      </span>
    );
  }

  return <code className={className}>{children}</code>;
};
