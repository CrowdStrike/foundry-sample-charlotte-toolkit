// src/components/security/StructuredSecurityAnalysis.tsx

import { SlBadge, SlCard, SlIcon } from '@shoelace-style/shoelace/dist/react';
import type React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';

import type { StructuredSecurityResponse } from '../../types/security';
import { getConfidenceLevelColor, getThreatLevelColor } from '../../utils/badgeUtils';
import { formatSecurityText, needsFormatting } from '../../utils/universalFormatting';

import { IOCDisplay } from './IocDisplay';
import { MITREDisplay } from './MitreDisplay';

interface StructuredSecurityAnalysisProps {
  data: StructuredSecurityResponse;
  renderers: Components; // ReactMarkdown component renderers
}

export const StructuredSecurityAnalysis: React.FC<StructuredSecurityAnalysisProps> = ({
  data,
  renderers,
}) => {
  // Get priority actions from simplified schema
  const priorityActions = data.priority_actions;

  return (
    <div className="structured-analysis">
      {/* Executive Summary */}
      <SlCard className="executive-summary-card">
        <h3>
          <SlIcon name="clipboard-data" />
          <span className="text-break">Executive Summary</span>
        </h3>
        <div className="badge-container" style={{ marginBottom: 'var(--spacing-lg)' }}>
          <SlBadge
            variant={getThreatLevelColor(data.threat_level)}
            style={{ fontSize: 'var(--font-size-xs)', width: 'fit-content' }}
          >
            {data.threat_level} Threat
          </SlBadge>
          <SlBadge
            variant={getConfidenceLevelColor(data.confidence_level)}
            style={{ fontSize: 'var(--font-size-xs)', width: 'fit-content' }}
          >
            {data.confidence_level} Confidence
          </SlBadge>
        </div>
        {needsFormatting(data.executive_summary) ? (
          formatSecurityText(data.executive_summary, 'summary').map((paragraph, index) => (
            <p
              key={`summary-${index}-${paragraph.substring(0, 30)}`}
              className="formatted-paragraph"
            >
              {paragraph}
            </p>
          ))
        ) : (
          <p className="formatted-paragraph">{data.executive_summary}</p>
        )}
      </SlCard>

      {/* IOCs */}
      {data.iocs &&
        ((data.iocs.hashes?.length ?? 0) > 0 ||
          (data.iocs.ips?.length ?? 0) > 0 ||
          (data.iocs.domains?.length ?? 0) > 0 ||
          (data.iocs.urls?.length ?? 0) > 0 ||
          (data.iocs.file_paths?.length ?? 0) > 0) && (
          <SlCard className="iocs-card">
            <h3>
              <SlIcon name="shield-exclamation" />
              <span className="text-break">IOC Details</span>
            </h3>
            <IOCDisplay iocs={data.iocs} />
          </SlCard>
        )}

      {/* MITRE ATT&CK Techniques */}
      {data.mitre_techniques && data.mitre_techniques.length > 0 && (
        <SlCard className="mitre-details">
          <h3>
            <SlIcon name="diagram-3" />
            <span className="text-break">
              MITRE ATT&CK Techniques ({data.mitre_techniques.length})
            </span>
          </h3>
          <MITREDisplay techniques={data.mitre_techniques} />
        </SlCard>
      )}

      {/* Technical Details */}
      {data.technical_details && (
        <SlCard className="technical-details">
          <h3>
            <SlIcon name="gear" />
            <span className="text-break">Technical Analysis</span>
          </h3>
          <div>
            {needsFormatting(data.technical_details) ? (
              <div className="technical-details-formatted">
                {formatSecurityText(data.technical_details, 'technical').map((paragraph, index) => (
                  <div
                    key={`technical-${index}-${paragraph.substring(0, 30)}`}
                    className="technical-paragraph"
                  >
                    <ReactMarkdown components={renderers}>{paragraph}</ReactMarkdown>
                  </div>
                ))}
              </div>
            ) : (
              <ReactMarkdown components={renderers}>{data.technical_details}</ReactMarkdown>
            )}
          </div>
        </SlCard>
      )}

      {/* Priority Actions - Simplified unified recommendations */}
      {priorityActions.length > 0 && (
        <SlCard className="recommendations-details">
          <h3>
            <SlIcon name="lightbulb" />
            <span className="text-break">Priority Actions ({priorityActions.length})</span>
          </h3>
          <ul className="compact-bullet-list">
            {priorityActions.map((action, index) => (
              <li
                key={`action-${index}-${action.substring(0, 30)}`}
                className="recommendation-item"
              >
                <SlIcon name="dot" className="secondary-text" />
                <span className="text-break">{action}</span>
              </li>
            ))}
          </ul>
        </SlCard>
      )}

      {/* Analysis Methodology - Charlotte's analytical transparency */}
      {data.reasoning_assessment && (
        <SlCard className="analysis-methodology-card">
          <h3>
            <SlIcon name="lightbulb" />
            <span className="text-break">Analysis Methodology</span>
          </h3>
          <div className="reasoning-content">
            <strong className="methodology-label">Charlotte&apos;s Analytical Methodology:</strong>
            {needsFormatting(data.reasoning_assessment) ? (
              formatSecurityText(data.reasoning_assessment, 'reasoning').map((paragraph, index) => (
                <p
                  key={`reasoning-${index}-${paragraph.substring(0, 30)}`}
                  className="formatted-paragraph"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="formatted-paragraph">{data.reasoning_assessment}</p>
            )}
          </div>
        </SlCard>
      )}
    </div>
  );
};
