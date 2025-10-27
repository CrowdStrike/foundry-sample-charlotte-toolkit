// src/components/security/StructuredSecurityAnalysis.tsx

import { SlBadge, SlCard, SlIcon } from '@shoelace-style/shoelace/dist/react';
import type React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';

import type { StructuredSecurityResponse } from '../../types/security';
import {
  getConfidenceLevelColor,
  getThreatLevelColor,
} from '../../utils/badgeUtils';
import {
  formatSecurityText,
  needsFormatting,
} from '../../utils/universalFormatting';

import { IOCDisplay } from './IocDisplay';
import { MITREDisplay } from './MitreDisplay';

interface StructuredSecurityAnalysisProps {
  data: StructuredSecurityResponse;
  renderers: Components; // ReactMarkdown component renderers
}

export const StructuredSecurityAnalysis: React.FC<
  StructuredSecurityAnalysisProps
> = ({ data, renderers }) => {
  // Get priority actions from simplified schema
  const priorityActions = data.priority_actions;

  return (
    <div className="structured-analysis space-y-2 sm:space-y-4">
      {/* Executive Summary */}
      <SlCard className="executive-summary-card">
        <h3 className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3">
          <SlIcon name="clipboard-data" className="flex-shrink-0" />
          <span className="break-words">Executive Summary</span>
        </h3>
        <div className="flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-2 mb-3">
          <SlBadge
            variant={getThreatLevelColor(data.threat_level)}
            className="text-xs sm:text-sm w-fit"
          >
            {data.threat_level} Threat
          </SlBadge>
          <SlBadge
            variant={getConfidenceLevelColor(data.confidence_level)}
            className="text-xs sm:text-sm w-fit"
          >
            {data.confidence_level} Confidence
          </SlBadge>
        </div>
        {needsFormatting(data.executive_summary) ? (
          formatSecurityText(data.executive_summary, 'summary').map(
            (paragraph) => (
              <p
                key={`summary-${paragraph.substring(0, 50)}`}
                className="text-sm sm:text-base leading-relaxed break-words formatted-paragraph"
              >
                {paragraph}
              </p>
            ),
          )
        ) : (
          <p className="text-sm sm:text-base leading-relaxed break-words">
            {data.executive_summary}
          </p>
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
            <h3 className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3">
              <SlIcon name="shield-exclamation" className="flex-shrink-0" />
              <span className="break-words">IOC Details</span>
            </h3>
            <IOCDisplay iocs={data.iocs} />
          </SlCard>
        )}

      {/* MITRE ATT&CK Techniques */}
      {data.mitre_techniques && data.mitre_techniques.length > 0 && (
        <SlCard className="mitre-details">
          <h3 className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3">
            <SlIcon name="diagram-3" className="flex-shrink-0" />
            <span className="break-words">
              MITRE ATT&CK Techniques ({data.mitre_techniques.length})
            </span>
          </h3>
          <MITREDisplay techniques={data.mitre_techniques} />
        </SlCard>
      )}

      {/* Technical Details */}
      {data.technical_details && (
        <SlCard className="technical-details">
          <h3 className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3">
            <SlIcon name="gear" className="flex-shrink-0" />
            <span className="break-words">Technical Analysis</span>
          </h3>
          <div className="prose prose-sm max-w-none">
            {needsFormatting(data.technical_details) ? (
              <div className="technical-details-formatted">
                {formatSecurityText(data.technical_details, 'technical').map(
                  (paragraph) => (
                    <div
                      key={`technical-${paragraph.substring(0, 50)}`}
                      className="technical-paragraph"
                    >
                      <ReactMarkdown components={renderers}>
                        {paragraph}
                      </ReactMarkdown>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <ReactMarkdown components={renderers}>
                {data.technical_details}
              </ReactMarkdown>
            )}
          </div>
        </SlCard>
      )}

      {/* Priority Actions - Simplified unified recommendations */}
      {priorityActions.length > 0 && (
        <SlCard className="recommendations-details">
          <h3 className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3">
            <SlIcon name="lightbulb" className="flex-shrink-0" />
            <span className="break-words">
              Priority Actions ({priorityActions.length})
            </span>
          </h3>
          <ul className="compact-bullet-list">
            {priorityActions.map((action) => (
              <li
                key={`action-${action.substring(0, 50)}`}
                className="recommendation-item"
              >
                <SlIcon
                  name="dot"
                  className="secondary-text mt-0.5 flex-shrink-0"
                />
                <span className="text-sm sm:text-base break-words">
                  {action}
                </span>
              </li>
            ))}
          </ul>
        </SlCard>
      )}

      {/* Analysis Methodology - Charlotte's analytical transparency */}
      {data.reasoning_assessment && (
        <SlCard className="analysis-methodology-card">
          <h3 className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3">
            <SlIcon name="lightbulb" className="flex-shrink-0" />
            <span className="break-words">Analysis Methodology</span>
          </h3>
          <div className="reasoning-content">
            <strong className="text-sm font-semibold mb-2 block">
              Charlotte&apos;s Analytical Methodology:
            </strong>
            {needsFormatting(data.reasoning_assessment) ? (
              formatSecurityText(data.reasoning_assessment, 'reasoning').map(
                (paragraph) => (
                  <p
                    key={`reasoning-${paragraph.substring(0, 50)}`}
                    className="text-sm sm:text-base leading-relaxed break-words formatted-paragraph"
                  >
                    {paragraph}
                  </p>
                ),
              )
            ) : (
              <p className="text-sm sm:text-base leading-relaxed break-words">
                {data.reasoning_assessment}
              </p>
            )}
          </div>
        </SlCard>
      )}
    </div>
  );
};
