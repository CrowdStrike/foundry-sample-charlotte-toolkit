// src/components/markdown/CodeBlock.tsx

import {
  SlBadge,
  SlButton,
  SlIcon,
  SlTooltip,
} from '@shoelace-style/shoelace/dist/react';
import type React from 'react';

import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className,
}) => {
  const { copyState, copyToClipboard } = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard(String(children));
  };

  const language = className?.replace('language-', '') ?? 'text';

  return (
    <div className="relative group">
      <div className="flex items-center justify-between mb-2">
        <SlBadge variant="neutral">{language}</SlBadge>
        <SlTooltip
          content={
            copyState === 'check-circle'
              ? 'Copied to clipboard!'
              : `Copy ${language} code to clipboard`
          }
          placement="top"
          distance={8}
          hoist
        >
          <SlButton
            size="small"
            variant="text"
            onClick={handleCopy}
            className={`compact-copy-btn opacity-0 group-hover:opacity-100 transition-opacity ${
              copyState === 'check-circle'
                ? 'copy-success'
                : 'text-body-and-labels'
            }`}
          >
            <SlIcon name={copyState} />
          </SlButton>
        </SlTooltip>
      </div>
      <pre className="enhanced-code-block">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
};
