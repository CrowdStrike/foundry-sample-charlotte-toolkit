// src/utils/copyUtils.ts

/**
 * Copy format options for the enhanced copy functionality
 */
export type CopyFormat = 'json' | 'markdown' | 'plaintext';

/**
 * Copy option configuration
 */
export interface CopyOption {
  format: CopyFormat;
  label: string;
  icon: string;
  description: string;
}

/**
 * Available copy format options
 */
export const COPY_OPTIONS: CopyOption[] = [
  {
    format: 'json',
    label: 'JSON',
    icon: 'code-square',
    description: 'Complete structured data including request/response context',
  },
  {
    format: 'markdown',
    label: 'Markdown',
    icon: 'markdown',
    description: 'Formatted response with markdown styling',
  },
  {
    format: 'plaintext',
    label: 'Plain Text',
    icon: 'file-text',
    description: 'Clean text without formatting',
  },
];

/**
 * Strip markdown formatting from text
 * @param markdown - Markdown text to convert
 * @returns Plain text without markdown formatting
 */
export const stripMarkdown = (markdown: string): string => {
  if (!markdown) return '';

  let text = markdown;

  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/`([^`]+)`/g, '$1');

  // Remove headers
  text = text.replace(/^#{1,6}\s+/gm, '');

  // Remove bold/italic
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/__([^_]+)__/g, '$1');
  text = text.replace(/_([^_]+)_/g, '$1');

  // Remove links
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remove list markers
  text = text.replace(/^[\s]*[-*+]\s+/gm, '');
  text = text.replace(/^[\s]*\d+\.\s+/gm, '');

  // Remove blockquotes
  text = text.replace(/^>\s*/gm, '');

  // Remove horizontal rules
  text = text.replace(/^[\s]*[-*_]{3,}[\s]*$/gm, '');

  // Clean up extra whitespace
  text = text.replace(/\n\s*\n\s*\n/g, '\n\n');
  text = text.replace(/^\s+|\s+$/g, '');

  return text;
};

/**
 * Convert structured JSON data to markdown format
 * @param jsonData - Parsed JSON response
 * @returns Markdown formatted string
 */
export const convertJsonToMarkdown = (jsonData: any): string => {
  if (!jsonData) return '';

  let markdown = '';

  // Executive Summary
  if (jsonData.executive_summary) {
    markdown += `# Executive Summary\n\n${jsonData.executive_summary}\n\n`;
  }

  // Threat and Confidence Levels
  if (jsonData.threat_level || jsonData.confidence_level) {
    markdown += `## Assessment\n\n`;
    if (jsonData.threat_level) {
      markdown += `**Threat Level:** ${jsonData.threat_level}\n\n`;
    }
    if (jsonData.confidence_level) {
      markdown += `**Confidence Level:** ${jsonData.confidence_level}\n\n`;
    }
  }

  // Malware Analysis
  if (jsonData.malware_analysis) {
    markdown += `## Malware Analysis\n\n`;
    if (jsonData.malware_analysis.malware_family) {
      markdown += `**Family:** ${jsonData.malware_analysis.malware_family}\n\n`;
    }
    if (jsonData.malware_analysis.variant_identification) {
      markdown += `**Variant:** ${jsonData.malware_analysis.variant_identification}\n\n`;
    }
    if (jsonData.malware_analysis.threat_classification) {
      markdown += `**Classification:** ${jsonData.malware_analysis.threat_classification}\n\n`;
    }
    if (jsonData.malware_analysis.risk_level) {
      markdown += `**Risk Level:** ${jsonData.malware_analysis.risk_level}\n\n`;
    }
  }

  // Attack Intelligence
  if (jsonData.attack_intelligence) {
    markdown += `## Attack Intelligence\n\n`;
    if (
      jsonData.attack_intelligence.primary_functions &&
      jsonData.attack_intelligence.primary_functions.length > 0
    ) {
      markdown += `### Primary Functions\n`;
      jsonData.attack_intelligence.primary_functions.forEach((func: string) => {
        markdown += `- ${func}\n`;
      });
      markdown += '\n';
    }
    if (
      jsonData.attack_intelligence.persistence_mechanisms &&
      jsonData.attack_intelligence.persistence_mechanisms.length > 0
    ) {
      markdown += `### Persistence Mechanisms\n`;
      jsonData.attack_intelligence.persistence_mechanisms.forEach((mech: string) => {
        markdown += `- ${mech}\n`;
      });
      markdown += '\n';
    }
    if (
      jsonData.attack_intelligence.behavior_patterns &&
      jsonData.attack_intelligence.behavior_patterns.length > 0
    ) {
      markdown += `### Behavior Patterns\n`;
      jsonData.attack_intelligence.behavior_patterns.forEach((pattern: string) => {
        markdown += `- ${pattern}\n`;
      });
      markdown += '\n';
    }
  }

  // Incident Context
  if (jsonData.incident_context) {
    markdown += `## Incident Context\n\n`;
    if (jsonData.incident_context.investigation_relevance) {
      markdown += `**Investigation Relevance:** ${jsonData.incident_context.investigation_relevance}\n\n`;
    }
    if (
      jsonData.incident_context.associated_filenames &&
      jsonData.incident_context.associated_filenames.length > 0
    ) {
      markdown += `### Associated Filenames\n`;
      jsonData.incident_context.associated_filenames.forEach((filename: string) => {
        markdown += `- \`${filename}\`\n`;
      });
      markdown += '\n';
    }
    if (jsonData.incident_context.related_iocs) {
      markdown += `### Related IOCs for Hunting\n`;
      if (
        jsonData.incident_context.related_iocs.domains &&
        jsonData.incident_context.related_iocs.domains.length > 0
      ) {
        markdown += `**Domains:**\n`;
        jsonData.incident_context.related_iocs.domains.forEach((domain: string) => {
          markdown += `- \`${domain}\`\n`;
        });
        markdown += '\n';
      }
      if (
        jsonData.incident_context.related_iocs.ips &&
        jsonData.incident_context.related_iocs.ips.length > 0
      ) {
        markdown += `**IPs:**\n`;
        jsonData.incident_context.related_iocs.ips.forEach((ip: string) => {
          markdown += `- \`${ip}\`\n`;
        });
        markdown += '\n';
      }
      if (
        jsonData.incident_context.related_iocs.registry_keys &&
        jsonData.incident_context.related_iocs.registry_keys.length > 0
      ) {
        markdown += `**Registry Keys:**\n`;
        jsonData.incident_context.related_iocs.registry_keys.forEach((key: string) => {
          markdown += `- \`${key}\`\n`;
        });
        markdown += '\n';
      }
      if (
        jsonData.incident_context.related_iocs.hashes &&
        jsonData.incident_context.related_iocs.hashes.length > 0
      ) {
        markdown += `**Hashes:**\n`;
        jsonData.incident_context.related_iocs.hashes.forEach((hash: string) => {
          markdown += `- \`${hash}\`\n`;
        });
        markdown += '\n';
      }
    }
  }

  // Immediate Actions
  if (jsonData.immediate_actions && jsonData.immediate_actions.length > 0) {
    markdown += `## Immediate Actions\n\n`;
    jsonData.immediate_actions.forEach((action: string, index: number) => {
      markdown += `${index + 1}. ${action}\n`;
    });
    markdown += '\n';
  }

  // Response Actions (comprehensive)
  if (jsonData.response_actions) {
    if (
      jsonData.response_actions.immediate_containment &&
      jsonData.response_actions.immediate_containment.length > 0
    ) {
      markdown += `## Immediate Containment\n\n`;
      jsonData.response_actions.immediate_containment.forEach((action: string, index: number) => {
        markdown += `${index + 1}. ${action}\n`;
      });
      markdown += '\n';
    }
    if (
      jsonData.response_actions.detection_rules &&
      jsonData.response_actions.detection_rules.length > 0
    ) {
      markdown += `## Detection Rules\n\n`;
      jsonData.response_actions.detection_rules.forEach((rule: string, index: number) => {
        markdown += `${index + 1}. ${rule}\n`;
      });
      markdown += '\n';
    }
    if (
      jsonData.response_actions.remediation_guidance &&
      jsonData.response_actions.remediation_guidance.length > 0
    ) {
      markdown += `## Remediation Guidance\n\n`;
      jsonData.response_actions.remediation_guidance.forEach((guidance: string, index: number) => {
        markdown += `${index + 1}. ${guidance}\n`;
      });
      markdown += '\n';
    }
  }

  // IOCs
  if (jsonData.iocs && Object.keys(jsonData.iocs).length > 0) {
    markdown += `## Indicators of Compromise (IOCs)\n\n`;

    if (jsonData.iocs.hashes && jsonData.iocs.hashes.length > 0) {
      markdown += `### File Hashes\n`;
      jsonData.iocs.hashes.forEach((hash: string) => {
        markdown += `- \`${hash}\`\n`;
      });
      markdown += '\n';
    }

    if (jsonData.iocs.ips && jsonData.iocs.ips.length > 0) {
      markdown += `### IP Addresses\n`;
      jsonData.iocs.ips.forEach((ip: string) => {
        markdown += `- \`${ip}\`\n`;
      });
      markdown += '\n';
    }

    if (jsonData.iocs.domains && jsonData.iocs.domains.length > 0) {
      markdown += `### Domains\n`;
      jsonData.iocs.domains.forEach((domain: string) => {
        markdown += `- \`${domain}\`\n`;
      });
      markdown += '\n';
    }

    if (jsonData.iocs.urls && jsonData.iocs.urls.length > 0) {
      markdown += `### URLs\n`;
      jsonData.iocs.urls.forEach((url: string) => {
        markdown += `- \`${url}\`\n`;
      });
      markdown += '\n';
    }

    if (jsonData.iocs.file_paths && jsonData.iocs.file_paths.length > 0) {
      markdown += `### File Paths\n`;
      jsonData.iocs.file_paths.forEach((path: string) => {
        markdown += `- \`${path}\`\n`;
      });
      markdown += '\n';
    }
  }

  // MITRE ATT&CK Techniques
  if (jsonData.mitre_techniques && jsonData.mitre_techniques.length > 0) {
    markdown += `## MITRE ATT&CK Techniques\n\n`;
    jsonData.mitre_techniques.forEach((technique: any) => {
      markdown += `### ${technique.technique_id}: ${technique.technique_name}\n`;
      if (technique.tactic) {
        markdown += `**Tactic:** ${technique.tactic}\n`;
      }
      if (technique.description) {
        markdown += `${technique.description}\n\n`;
      }
    });
  }

  // MITRE techniques from attack intelligence
  if (
    jsonData.attack_intelligence?.mitre_techniques &&
    jsonData.attack_intelligence.mitre_techniques.length > 0
  ) {
    markdown += `## MITRE ATT&CK Techniques (Attack Intelligence)\n\n`;
    jsonData.attack_intelligence.mitre_techniques.forEach((technique: any) => {
      markdown += `### ${technique.technique_id}: ${technique.technique_name}\n`;
      if (technique.tactic) {
        markdown += `**Tactic:** ${technique.tactic}\n`;
      }
      if (technique.description) {
        markdown += `${technique.description}\n\n`;
      }
    });
  }

  // Technical Details
  if (jsonData.technical_details) {
    markdown += `## Technical Details\n\n${jsonData.technical_details}\n\n`;
  }

  // Recommendations
  if (jsonData.recommendations && jsonData.recommendations.length > 0) {
    markdown += `## Recommendations\n\n`;
    jsonData.recommendations.forEach((rec: string, index: number) => {
      markdown += `${index + 1}. ${rec}\n`;
    });
    markdown += '\n';
  }

  // Confidence Assessment and Reasoning Assessment
  if (jsonData.confidence_assessment || jsonData.reasoning_assessment) {
    markdown += `## Confidence & Reasoning Assessment\n\n`;

    if (jsonData.confidence_assessment) {
      markdown += `### Confidence Metrics\n`;
      if (jsonData.confidence_assessment.analysis_confidence) {
        markdown += `**Analysis Confidence:** ${jsonData.confidence_assessment.analysis_confidence}\n`;
      }
      if (jsonData.confidence_assessment.source_reliability) {
        markdown += `**Source Reliability:** ${jsonData.confidence_assessment.source_reliability}\n`;
      }
      if (
        jsonData.confidence_assessment.validation_recommendations &&
        jsonData.confidence_assessment.validation_recommendations.length > 0
      ) {
        markdown += `\n**Validation Recommendations:**\n`;
        jsonData.confidence_assessment.validation_recommendations.forEach((rec: string) => {
          markdown += `- ${rec}\n`;
        });
      }
      markdown += '\n';
    }

    if (jsonData.reasoning_assessment) {
      markdown += `### Charlotte's Analytical Methodology\n`;
      markdown += `${jsonData.reasoning_assessment}\n\n`;
    }
  }

  return markdown;
};

/**
 * Convert structured JSON data to plain text format
 * @param jsonData - Parsed JSON response
 * @returns Plain text formatted string
 */
export const convertJsonToPlainText = (jsonData: any): string => {
  if (!jsonData) return '';

  let text = '';

  // Executive Summary
  if (jsonData.executive_summary) {
    text += `EXECUTIVE SUMMARY\n${jsonData.executive_summary}\n\n`;
  }

  // Assessment
  if (jsonData.threat_level || jsonData.confidence_level) {
    text += `ASSESSMENT\n`;
    if (jsonData.threat_level) {
      text += `Threat Level: ${jsonData.threat_level}\n`;
    }
    if (jsonData.confidence_level) {
      text += `Confidence Level: ${jsonData.confidence_level}\n`;
    }
    text += '\n';
  }

  // Malware Analysis
  if (jsonData.malware_analysis) {
    text += `MALWARE ANALYSIS\n`;
    if (jsonData.malware_analysis.malware_family) {
      text += `Family: ${jsonData.malware_analysis.malware_family}\n`;
    }
    if (jsonData.malware_analysis.variant_identification) {
      text += `Variant: ${jsonData.malware_analysis.variant_identification}\n`;
    }
    if (jsonData.malware_analysis.threat_classification) {
      text += `Classification: ${jsonData.malware_analysis.threat_classification}\n`;
    }
    if (jsonData.malware_analysis.risk_level) {
      text += `Risk Level: ${jsonData.malware_analysis.risk_level}\n`;
    }
    text += '\n';
  }

  // Attack Intelligence
  if (jsonData.attack_intelligence) {
    text += `ATTACK INTELLIGENCE\n`;
    if (
      jsonData.attack_intelligence.primary_functions &&
      jsonData.attack_intelligence.primary_functions.length > 0
    ) {
      text += `Primary Functions:\n`;
      jsonData.attack_intelligence.primary_functions.forEach((func: string) => {
        text += `- ${func}\n`;
      });
      text += '\n';
    }
    if (
      jsonData.attack_intelligence.persistence_mechanisms &&
      jsonData.attack_intelligence.persistence_mechanisms.length > 0
    ) {
      text += `Persistence Mechanisms:\n`;
      jsonData.attack_intelligence.persistence_mechanisms.forEach((mech: string) => {
        text += `- ${mech}\n`;
      });
      text += '\n';
    }
    if (
      jsonData.attack_intelligence.behavior_patterns &&
      jsonData.attack_intelligence.behavior_patterns.length > 0
    ) {
      text += `Behavior Patterns:\n`;
      jsonData.attack_intelligence.behavior_patterns.forEach((pattern: string) => {
        text += `- ${pattern}\n`;
      });
      text += '\n';
    }
  }

  // Incident Context
  if (jsonData.incident_context) {
    text += `INCIDENT CONTEXT\n`;
    if (jsonData.incident_context.investigation_relevance) {
      text += `Investigation Relevance: ${jsonData.incident_context.investigation_relevance}\n\n`;
    }
    if (
      jsonData.incident_context.associated_filenames &&
      jsonData.incident_context.associated_filenames.length > 0
    ) {
      text += `Associated Filenames:\n`;
      jsonData.incident_context.associated_filenames.forEach((filename: string) => {
        text += `- ${filename}\n`;
      });
      text += '\n';
    }
    if (jsonData.incident_context.related_iocs) {
      text += `Related IOCs for Hunting:\n`;
      if (
        jsonData.incident_context.related_iocs.domains &&
        jsonData.incident_context.related_iocs.domains.length > 0
      ) {
        text += `Domains:\n`;
        jsonData.incident_context.related_iocs.domains.forEach((domain: string) => {
          text += `- ${domain}\n`;
        });
        text += '\n';
      }
      if (
        jsonData.incident_context.related_iocs.ips &&
        jsonData.incident_context.related_iocs.ips.length > 0
      ) {
        text += `IPs:\n`;
        jsonData.incident_context.related_iocs.ips.forEach((ip: string) => {
          text += `- ${ip}\n`;
        });
        text += '\n';
      }
      if (
        jsonData.incident_context.related_iocs.registry_keys &&
        jsonData.incident_context.related_iocs.registry_keys.length > 0
      ) {
        text += `Registry Keys:\n`;
        jsonData.incident_context.related_iocs.registry_keys.forEach((key: string) => {
          text += `- ${key}\n`;
        });
        text += '\n';
      }
      if (
        jsonData.incident_context.related_iocs.hashes &&
        jsonData.incident_context.related_iocs.hashes.length > 0
      ) {
        text += `Hashes:\n`;
        jsonData.incident_context.related_iocs.hashes.forEach((hash: string) => {
          text += `- ${hash}\n`;
        });
        text += '\n';
      }
    }
  }

  // Immediate Actions
  if (jsonData.immediate_actions && jsonData.immediate_actions.length > 0) {
    text += `IMMEDIATE ACTIONS\n`;
    jsonData.immediate_actions.forEach((action: string, index: number) => {
      text += `${index + 1}. ${action}\n`;
    });
    text += '\n';
  }

  // Response Actions (comprehensive)
  if (jsonData.response_actions) {
    if (
      jsonData.response_actions.immediate_containment &&
      jsonData.response_actions.immediate_containment.length > 0
    ) {
      text += `IMMEDIATE CONTAINMENT\n`;
      jsonData.response_actions.immediate_containment.forEach((action: string, index: number) => {
        text += `${index + 1}. ${action}\n`;
      });
      text += '\n';
    }
    if (
      jsonData.response_actions.detection_rules &&
      jsonData.response_actions.detection_rules.length > 0
    ) {
      text += `DETECTION RULES\n`;
      jsonData.response_actions.detection_rules.forEach((rule: string, index: number) => {
        text += `${index + 1}. ${rule}\n`;
      });
      text += '\n';
    }
    if (
      jsonData.response_actions.remediation_guidance &&
      jsonData.response_actions.remediation_guidance.length > 0
    ) {
      text += `REMEDIATION GUIDANCE\n`;
      jsonData.response_actions.remediation_guidance.forEach((guidance: string, index: number) => {
        text += `${index + 1}. ${guidance}\n`;
      });
      text += '\n';
    }
  }

  // IOCs
  if (jsonData.iocs && Object.keys(jsonData.iocs).length > 0) {
    text += `INDICATORS OF COMPROMISE (IOCs)\n`;

    if (jsonData.iocs.hashes && jsonData.iocs.hashes.length > 0) {
      text += `File Hashes:\n`;
      jsonData.iocs.hashes.forEach((hash: string) => {
        text += `- ${hash}\n`;
      });
      text += '\n';
    }

    if (jsonData.iocs.ips && jsonData.iocs.ips.length > 0) {
      text += `IP Addresses:\n`;
      jsonData.iocs.ips.forEach((ip: string) => {
        text += `- ${ip}\n`;
      });
      text += '\n';
    }

    if (jsonData.iocs.domains && jsonData.iocs.domains.length > 0) {
      text += `Domains:\n`;
      jsonData.iocs.domains.forEach((domain: string) => {
        text += `- ${domain}\n`;
      });
      text += '\n';
    }

    if (jsonData.iocs.urls && jsonData.iocs.urls.length > 0) {
      text += `URLs:\n`;
      jsonData.iocs.urls.forEach((url: string) => {
        text += `- ${url}\n`;
      });
      text += '\n';
    }

    if (jsonData.iocs.file_paths && jsonData.iocs.file_paths.length > 0) {
      text += `File Paths:\n`;
      jsonData.iocs.file_paths.forEach((path: string) => {
        text += `- ${path}\n`;
      });
      text += '\n';
    }
  }

  // MITRE ATT&CK Techniques
  if (jsonData.mitre_techniques && jsonData.mitre_techniques.length > 0) {
    text += `MITRE ATT&CK TECHNIQUES\n`;
    jsonData.mitre_techniques.forEach((technique: any) => {
      text += `${technique.technique_id}: ${technique.technique_name}\n`;
      if (technique.description) {
        text += `${technique.description}\n\n`;
      }
    });
  }

  // Technical Details
  if (jsonData.technical_details) {
    text += `TECHNICAL DETAILS\n${jsonData.technical_details}\n\n`;
  }

  // Recommendations
  if (jsonData.recommendations && jsonData.recommendations.length > 0) {
    text += `RECOMMENDATIONS\n`;
    jsonData.recommendations.forEach((rec: string, index: number) => {
      text += `${index + 1}. ${rec}\n`;
    });
    text += '\n';
  }

  // Confidence Assessment and Reasoning Assessment
  if (jsonData.confidence_assessment || jsonData.reasoning_assessment) {
    text += `CONFIDENCE & REASONING ASSESSMENT\n`;

    if (jsonData.confidence_assessment) {
      text += `Confidence Metrics:\n`;
      if (jsonData.confidence_assessment.analysis_confidence) {
        text += `Analysis Confidence: ${jsonData.confidence_assessment.analysis_confidence}\n`;
      }
      if (jsonData.confidence_assessment.source_reliability) {
        text += `Source Reliability: ${jsonData.confidence_assessment.source_reliability}\n`;
      }
      if (
        jsonData.confidence_assessment.validation_recommendations &&
        jsonData.confidence_assessment.validation_recommendations.length > 0
      ) {
        text += `\nValidation Recommendations:\n`;
        jsonData.confidence_assessment.validation_recommendations.forEach((rec: string) => {
          text += `- ${rec}\n`;
        });
      }
      text += '\n';
    }

    if (jsonData.reasoning_assessment) {
      text += `Charlotte's Analytical Methodology:\n`;
      text += `${jsonData.reasoning_assessment}\n\n`;
    }
  }

  return text;
};

/**
 * Format data for copying based on the selected format
 * @param format - The format to copy as
 * @param responseText - The markdown response text
 * @param jsonData - The complete JSON context data
 * @param parsedJsonResponse - The parsed structured JSON response (if available)
 * @returns Formatted string ready for clipboard
 */
export const formatForCopy = (
  format: CopyFormat,
  responseText: string,
  jsonData?: any,
  parsedJsonResponse?: any
): string => {
  switch (format) {
    case 'json':
      // First try to use the parsed JSON response (Charlotte AI's structured response)
      if (parsedJsonResponse) {
        return JSON.stringify(parsedJsonResponse, null, 2);
      }
      // Fall back to complete JSON context data
      if (jsonData) {
        return JSON.stringify(jsonData, null, 2);
      }
      // Final fallback to basic JSON structure
      return JSON.stringify(
        {
          response: responseText,
          timestamp: new Date().toISOString(),
        },
        null,
        2
      );

    case 'markdown':
      // If we have parsed JSON response, convert it to markdown
      if (parsedJsonResponse) {
        return convertJsonToMarkdown(parsedJsonResponse);
      }
      // Otherwise use the raw response text
      return responseText;

    case 'plaintext':
      // If we have parsed JSON response, convert it to plain text
      if (parsedJsonResponse) {
        return convertJsonToPlainText(parsedJsonResponse);
      }
      // Otherwise strip markdown from response text
      return stripMarkdown(responseText);

    default:
      return responseText;
  }
};

/**
 * Copy text to clipboard with error handling
 * @param text - Text to copy
 * @param format - Format being copied (for error messages)
 * @returns Promise that resolves to success boolean
 */
export const copyToClipboard = async (text: string, _format: CopyFormat): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Silently fail - clipboard API might not be available
    return false;
  }
};

/**
 * Get appropriate success message for copy operation
 * @param format - The format that was copied
 * @returns Success message string
 */
export const getCopySuccessMessage = (format: CopyFormat): string => {
  switch (format) {
    case 'json':
      return 'JSON copied to clipboard!';
    case 'markdown':
      return 'Markdown copied to clipboard!';
    case 'plaintext':
      return 'Plain text copied to clipboard!';
    default:
      return 'Copied to clipboard!';
  }
};
