// src/components/security/MITREDisplay.tsx

import { SlBadge, SlButton, SlIcon, SlTooltip } from '@shoelace-style/shoelace/dist/react';
import type React from 'react';
import { useCallback, useState } from 'react';

import type { MITRETechnique } from '../../types/security';
import { buildMitreUrl } from '../../utils/helpers';
import { formatMitreDescription } from '../../utils/textFormatting';

interface MITREDisplayProps {
  techniques: MITRETechnique[] | undefined;
}

export const MITREDisplay: React.FC<MITREDisplayProps> = ({ techniques }) => {
  const [copyStates, setCopyStates] = useState<Record<string, boolean>>({});

  const copyMitreUrl = useCallback(async (url: string, techniqueId: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyStates((prev) => ({ ...prev, [techniqueId]: true }));
      setTimeout(() => {
        setCopyStates((prev) => ({ ...prev, [techniqueId]: false }));
      }, 2000);
    } catch {
      // Silent failure like IOC pattern
    }
  }, []);

  if (!techniques || techniques.length === 0) return null;

  // Extract tactic from technique if available
  const getTacticFromTechnique = (technique: MITRETechnique): string | null => {
    // Try to extract tactic from description or technique_name
    const description = technique.description.toLowerCase() || '';
    const name = technique.technique_name.toLowerCase() || '';

    // Common MITRE tactics mapping
    const tactics = {
      'initial-access': ['initial access', 'exploit', 'phishing', 'drive-by'],
      execution: ['execution', 'command', 'script', 'powershell', 'rundll32'],
      persistence: ['persistence', 'registry', 'startup', 'scheduled task'],
      'privilege-escalation': ['privilege escalation', 'escalate', 'token', 'uac bypass'],
      'defense-evasion': ['defense evasion', 'obfuscat', 'masquerade', 'disable', 'hide'],
      'credential-access': ['credential', 'password', 'hash', 'keylog', 'dump'],
      discovery: ['discovery', 'enumerate', 'network', 'system information'],
      'lateral-movement': ['lateral movement', 'remote', 'psexec', 'wmi'],
      collection: ['collection', 'data', 'clipboard', 'screen capture'],
      'command-control': ['command and control', 'c2', 'communication', 'channel'],
      exfiltration: ['exfiltration', 'steal', 'transfer', 'upload'],
      impact: ['impact', 'destroy', 'encrypt', 'ransom', 'wipe'],
    };

    const combinedText = `${description} ${name}`;

    for (const [tactic, keywords] of Object.entries(tactics)) {
      if (keywords.some((keyword) => combinedText.includes(keyword))) {
        return tactic;
      }
    }

    return null;
  };

  // Get badge variant based on tactic
  const getTacticBadgeVariant = (
    tactic: string | null,
  ): 'primary' | 'warning' | 'danger' | 'success' | 'neutral' => {
    if (!tactic) return 'neutral';

    switch (tactic) {
      case 'initial-access':
      case 'execution':
        return 'warning';
      case 'persistence':
      case 'privilege-escalation':
        return 'danger';
      case 'defense-evasion':
      case 'credential-access':
        return 'primary';
      case 'discovery':
      case 'lateral-movement':
        return 'success';
      default:
        return 'neutral';
    }
  };

  // Format tactic name for display
  const formatTacticName = (tactic: string | null): string => {
    if (!tactic) return '';
    return tactic
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="mitre-techniques-container space-y-3">
      {techniques.map((technique, index) => {
        const formattedDescriptions = formatMitreDescription(technique.description);
        const tactic = getTacticFromTechnique(technique);
        const tacticVariant = getTacticBadgeVariant(tactic);
        const tacticName = formatTacticName(tactic);

        return (
          <div key={index} className="mitre-technique-card enhanced-card">
            {/* Technique Header - Restructured Layout */}
            <div className="technique-header">
              <div className="technique-title-section">
                {/* Icon, ID and copy button on first line - IOC-style pattern */}
                <div className="flex items-center gap-1 mb-1">
                  <SlIcon name="shield-check" className="technique-icon flex-shrink-0" />
                  <span className="technique-id">{technique.technique_id}</span>
                  <SlTooltip
                    content={
                      copyStates[technique.technique_id]
                        ? 'Copied to clipboard!'
                        : 'Copy MITRE URL to clipboard'
                    }
                    placement="top"
                    distance={8}
                    hoist
                  >
                    <SlButton
                      size="small"
                      variant="text"
                      onClick={() =>
                        copyMitreUrl(buildMitreUrl(technique.technique_id), technique.technique_id)
                      }
                      className="compact-copy-btn ioc-copy-btn flex-shrink-0"
                    >
                      <SlIcon
                        name={copyStates[technique.technique_id] ? 'check-circle' : 'clipboard'}
                        className={
                          copyStates[technique.technique_id] ? 'copy-success' : 'secondary-text'
                        }
                      />
                    </SlButton>
                  </SlTooltip>
                </div>

                {/* Technique Name on second line */}
                <div className="technique-name-line mb-1">
                  <span className="technique-name">{technique.technique_name}</span>
                </div>

                {/* Tactic Badge on third line */}
                {tacticName && (
                  <div className="tactic-badge-container mb-3">
                    <SlBadge variant={tacticVariant} className="text-xs w-fit tactic-badge">
                      {tacticName}
                    </SlBadge>
                  </div>
                )}
              </div>
            </div>

            {/* Technique Description with Paragraphs */}
            <div className="technique-description">
              {formattedDescriptions.length > 0 ? (
                formattedDescriptions.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="text-sm sm:text-base secondary-text leading-relaxed break-words technique-paragraph"
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-sm sm:text-base secondary-text leading-relaxed break-words technique-paragraph">
                  {technique.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
