// src/components/ResponseDisplay.tsx

import { SlIcon, SlSpinner } from '@shoelace-style/shoelace/dist/react';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { parseStructuredResponse } from '../utils/security/iocUtils';

import { createMarkdownRenderers } from './markdown';
import { StructuredSecurityAnalysis } from './security';
import '../styles/features/loading.css';

/**
 * Enhanced markdown preprocessor for consistent formatting and readability
 * Handles complex nested lists, dense paragraphs, and technical content formatting
 */
const preprocessMarkdown = (text: string): string => {
  let processed = text;

  // Phase 1: Fix inline IPs - convert "IPs: ip1    ip2    ip3" to separate lines
  processed = processed.replace(/^(IPs?:)\s*([0-9.]+(?:\s+[0-9.]+)+)\s*$/gim, (_, label, ips) => {
    const ipList = ips
      .trim()
      .split(/\s+/)
      .map((ip: string) => `- \`${ip}\``)
      .join('\n');
    return `${label}\n${ipList}`;
  });

  // Phase 2: Fix nested list structure - convert mixed bullets to consistent format
  processed = processed.replace(
    /^(\s*)\d+\.\s*(.+)\n(\s*[-*•]\s*.+)/gim,
    (_match, indent, mainItem, bulletItems) => {
      // Convert mixed numbered/bullet lists to consistent structure
      const formattedBullets = bulletItems.replace(/^(\s*)[-*•]\s*/gm, '   • ');
      return `${indent}• **${mainItem.trim()}**\n${formattedBullets}`;
    },
  );

  // Phase 3: Break up dense paragraphs (key fix for reasoning assessment)
  processed = processed.replace(
    /([.!?])\s+([A-Z][^.!?]*[.!?])\s+([A-Z][^.!?]*[.!?])\s+([A-Z][^.!?]*[.!?])/g,
    '$1\n\n$2 $3\n\n$4',
  );

  // Phase 4: Improve paragraph breaks for analytical content
  processed = processed.replace(
    /\b(However|Additionally|Furthermore|Therefore|Based on|The analysis|This assessment),/g,
    '\n\n$1,',
  );

  // Phase 5: Ensure technical term consistency
  processed = processed.replace(/^(\s*[-*•]\s*)([a-zA-Z0-9_.-]+\.exe)(?!`)(\s*)$/gim, '$1`$2`$3');
  processed = processed.replace(/^(\s*[-*•]\s*)([a-fA-F0-9]{32,64})(?!`)(\s*)$/gim, '$1`$2`$3');
  processed = processed.replace(/^(\s*[-*•]\s*)(HK[A-Z_\\]+[^`\n]*)(?!`)(\s*)$/gim, '$1`$2`$3');

  // Phase 6: Enhanced recommendation section detection
  processed = processed.replace(
    /^(#{1,6}\s*(?:Recommended Actions?|Security Recommendations?|Recommendations?)[\s\S]*?)^(?=#{1,6}|\n*$)/gim,
    (match) => `<div class="markdown-recommendations">\n${match}\n</div>`,
  );

  // Phase 7: Clean up excessive whitespace while preserving intentional breaks
  processed = processed.replace(/\n{4,}/g, '\n\n\n');
  processed = processed.replace(/\s+$/gm, '');

  return processed;
};

interface ResponseDisplayProps {
  loading: boolean;
  responseText: string;
  errorMessage: string;
}

const ResponseDisplay = React.memo(
  ({ loading, responseText, errorMessage }: ResponseDisplayProps) => {
    // Create markdown renderers
    const renderers = createMarkdownRenderers();

    // Progressive loading messages state
    const [loadingMessage, setLoadingMessage] = React.useState('Gathering information...');

    // Progressive loading message effect
    React.useEffect(() => {
      if (loading) {
        setLoadingMessage('Gathering information...');

        const timer1 = setTimeout(() => {
          setLoadingMessage('Processing data...');
        }, 8000);

        const timer2 = setTimeout(() => {
          setLoadingMessage('Compiling results...');
        }, 16000);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
      // Always return a cleanup function to satisfy TypeScript
      return () => {};
    }, [loading]);

    // Loading state
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-backdrop"></div>
          <div className="loading-icon-container">
            <SlSpinner
              style={
                {
                  '--track-width': '3px',
                  '--track-color': 'var(--cs-border-color-light, #e2e8f0)',
                  '--indicator-color': 'var(--cs-color-primary, #0ea5e9)',
                  '--speed': '2.5s',
                  fontSize: 'var(--font-size-4xl)',
                  filter: 'drop-shadow(0 0 8px rgba(14, 165, 233, 0.3))',
                } as React.CSSProperties
              }
            />
          </div>
          <p className="loading-text-pulse">{loadingMessage}</p>
        </div>
      );
    }

    // Error state
    if (errorMessage) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '384px',
            gap: 'var(--spacing-lg)',
            color: 'var(--cs-status-error)',
          }}
        >
          <SlIcon name="exclamation-triangle" />
          <p style={{ fontSize: 'var(--font-size-base)', textAlign: 'center' }}>{errorMessage}</p>
        </div>
      );
    }

    // Empty state
    if (!responseText) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '384px',
            gap: 'var(--spacing-lg)',
            color: 'var(--cs-text-secondary)',
          }}
        >
          <SlIcon name="chat-square-text" />
          <p style={{ fontSize: 'var(--font-size-base)' }}>
            Submit a query to see analysis results
          </p>
        </div>
      );
    }

    // Response content - render with height-constrained container and scroll indicators
    const structuredData = parseStructuredResponse(responseText);

    if (structuredData) {
      // Render structured security analysis with scroll container
      // Charlotte AI response parsed as structured JSON
      return (
        <div className="response-scroll-container">
          <div className="response-scroll-content">
            <StructuredSecurityAnalysis data={structuredData} renderers={renderers} />
          </div>
          <div className="response-scroll-fade"></div>
        </div>
      );
    } else {
      // JSON parsing failed - show markdown with warning in scroll container
      // Charlotte AI response could not be parsed as JSON, falling back to markdown
      // Raw response available for debugging

      return (
        <div className="response-scroll-container">
          <div className="response-scroll-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
              <div
                style={{
                  padding: 'var(--spacing-lg)',
                  borderRadius: 'var(--spacing-base)',
                  backgroundColor: `var(--cs-background-light)`,
                  border: `1px solid var(--cs-border-color-medium)`,
                }}
              >
                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--cs-status-warning)',
                  }}
                >
                  ⚠️ Response Format Issue
                </p>
                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    marginTop: 'var(--spacing-xs)',
                    color: 'var(--cs-text-secondary)',
                  }}
                >
                  Charlotte AI did not return the expected JSON format. Displaying as markdown
                  instead.
                </p>
              </div>
              <ReactMarkdown components={renderers}>
                {preprocessMarkdown(responseText)}
              </ReactMarkdown>
            </div>
          </div>
          <div className="response-scroll-fade"></div>
        </div>
      );
    }
  },
);

ResponseDisplay.displayName = 'ResponseDisplay';

export default ResponseDisplay;
