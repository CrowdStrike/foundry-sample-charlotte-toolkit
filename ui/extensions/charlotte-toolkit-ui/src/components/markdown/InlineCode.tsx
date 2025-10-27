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

  const handleIOCCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(text);
  };

  if (iocType) {
    const badgeVariant = IOCCore.getBadgeVariant(iocType);
    // Defang IOCs for display while keeping original for copying
    const defangedText = IOCCore.defang(text);

    return (
      <span className="inline-flex items-center gap-1 ioc-container">
        <SlBadge variant={badgeVariant} className="text-xs">
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
          <code
            className="ioc-code cursor-pointer ioc-hover-bg transition-colors"
            onClick={handleIOCCopy}
          >
            {defangedText}
          </code>
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
          <SlIcon
            name={copyState}
            className={`text-xs cursor-pointer ioc-hover-text ${copyState === 'check-circle' ? 'copy-success' : 'secondary-text'}`}
            onClick={handleIOCCopy}
          />
        </SlTooltip>
      </span>
    );
  }

  return <code className={className}>{children}</code>;
};
