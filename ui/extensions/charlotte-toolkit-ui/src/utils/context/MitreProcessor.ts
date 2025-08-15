// MITRE ATT&CK technique processing utilities

import { ContextOption } from '../../types';
import { createQueryTemplate } from '../queryTemplates';

/**
 * Extract MITRE ATT&CK techniques from various detection data structures
 */
export const extractMITREFromDetection = (detection: any, options: ContextOption[]): void => {
  if (!detection) return;

  const mitreMap = new Map<
    string,
    { techniqueName?: string; tactic?: string; count: number; sources: string[] }
  >();

  // Method 1: From detection.behaviors array
  if (detection.behaviors && Array.isArray(detection.behaviors)) {
    detection.behaviors.forEach((behavior: any) => {
      if (behavior.technique_id) {
        const techniqueId = behavior.technique_id.toUpperCase();

        // Validate MITRE technique ID format (T1055, T1003.001, etc.)
        const mitrePattern = /^T\d{4}(\.\d{3})?$/;
        if (mitrePattern.test(techniqueId)) {
          const existing = mitreMap.get(techniqueId) ?? { count: 0, sources: [] };
          existing.count += 1;
          existing.sources.push('detection_behaviors');

          // Capture technique name and tactic if available
          if (behavior.technique && !existing.techniqueName) {
            existing.techniqueName = behavior.technique;
          }
          if (behavior.tactic && !existing.tactic) {
            existing.tactic = behavior.tactic;
          }

          mitreMap.set(techniqueId, existing);
        }
      }
    });
  }

  // Method 2: From detection.kill_chain array
  if (detection.kill_chain && Array.isArray(detection.kill_chain)) {
    detection.kill_chain.forEach((phase: any) => {
      if (phase.technique_id) {
        const techniqueId = phase.technique_id.toUpperCase();
        const mitrePattern = /^T\d{4}(\.\d{3})?$/;

        if (mitrePattern.test(techniqueId)) {
          const existing = mitreMap.get(techniqueId) ?? { count: 0, sources: [] };
          existing.count += 1;
          existing.sources.push('kill_chain');

          if (phase.technique_name && !existing.techniqueName) {
            existing.techniqueName = phase.technique_name;
          }
          if (phase.tactic && !existing.tactic) {
            existing.tactic = phase.tactic;
          }

          mitreMap.set(techniqueId, existing);
        }
      }
    });
  }

  // Method 3: From detection.mitre_attack array (common in activity detections)
  if (detection.mitre_attack && Array.isArray(detection.mitre_attack)) {
    detection.mitre_attack.forEach((attack: any) => {
      if (attack.technique_id) {
        const techniqueId = attack.technique_id.toUpperCase();
        const mitrePattern = /^T\d{4}(\.\d{3})?$/;

        if (mitrePattern.test(techniqueId)) {
          const existing = mitreMap.get(techniqueId) ?? { count: 0, sources: [] };
          existing.count += 1;
          existing.sources.push('mitre_attack');

          if (attack.technique && !existing.techniqueName) {
            existing.techniqueName = attack.technique;
          }
          if (attack.tactic && !existing.tactic) {
            existing.tactic = attack.tactic;
          }

          mitreMap.set(techniqueId, existing);
        }
      }
    });
  }

  // Method 4: From individual detection fields (fallback)
  if (detection.technique_id) {
    const techniqueId = detection.technique_id.toUpperCase();
    const mitrePattern = /^T\d{4}(\.\d{3})?$/;

    if (mitrePattern.test(techniqueId)) {
      const existing = mitreMap.get(techniqueId) ?? { count: 0, sources: [] };
      existing.count += 1;
      existing.sources.push('detection_fields');

      if (detection.technique && !existing.techniqueName) {
        existing.techniqueName = detection.technique;
      }
      if (detection.tactic && !existing.tactic) {
        existing.tactic = detection.tactic;
      }

      mitreMap.set(techniqueId, existing);
    }
  }

  // Create MITRE technique entries from collected data
  mitreMap.forEach(({ techniqueName, tactic, count, sources }, techniqueId) => {
    let displayName = techniqueId;

    // Add technique name if available
    if (techniqueName) {
      displayName += ` - ${techniqueName}`;
    }

    // Add count if multiple occurrences
    if (count > 1) {
      displayName += ` (${count} occurrences)`;
    }

    options.push({
      value: `mitre:${techniqueId}`,
      displayName,
      type: 'mitre',
      subType: 'technique',
      queryTemplate: createQueryTemplate('mitre', techniqueId, { techniqueName }),
      entityData: {
        techniqueId,
        techniqueName,
        tactic,
        count,
        sources,
      },
    });
  });
};

/**
 * Validate MITRE technique ID format
 */
export const isValidMITRETechnique = (techniqueId: string): boolean => {
  const mitrePattern = /^T\d{4}(\.\d{3})?$/;
  return mitrePattern.test(techniqueId.toUpperCase());
};

/**
 * Extract technique ID from various MITRE data formats
 */
export const extractTechniqueId = (mitreData: any): string | null => {
  if (typeof mitreData === 'string') {
    return isValidMITRETechnique(mitreData) ? mitreData.toUpperCase() : null;
  }

  if (mitreData && typeof mitreData === 'object') {
    const possibleIds = [
      mitreData.technique_id,
      mitreData.techniqueId,
      mitreData.id,
      mitreData.technique,
    ];

    for (const id of possibleIds) {
      if (typeof id === 'string' && isValidMITRETechnique(id)) {
        return id.toUpperCase();
      }
    }
  }

  return null;
};

/**
 * Process MITRE techniques from incident data (for legacy support)
 */
export const processMITRETechniques = (entityValues: any): ContextOption[] => {
  if (!entityValues) {
    return [];
  }
  
  const options: ContextOption[] = [];

  if (entityValues.mitre_techniques && Array.isArray(entityValues.mitre_techniques)) {
    const mitreMap = new Map<string, { techniqueName?: string; tactic?: string; count: number }>();

    entityValues.mitre_techniques.forEach((technique: any) => {
      const techniqueId = extractTechniqueId(technique);
      if (techniqueId) {
        const existing = mitreMap.get(techniqueId) ?? { count: 0 };
        existing.count += 1;

        // Capture additional data if available
        if (technique.name && !existing.techniqueName) {
          existing.techniqueName = technique.name;
        }
        if (technique.tactic && !existing.tactic) {
          existing.tactic = technique.tactic;
        }

        mitreMap.set(techniqueId, existing);
      }
    });

    // Create options from collected techniques
    mitreMap.forEach(({ techniqueName, tactic, count }, techniqueId) => {
      let displayName = techniqueId;

      if (techniqueName) {
        displayName += ` - ${techniqueName}`;
      }

      if (count > 1) {
        displayName += ` (${count} occurrences)`;
      }

      options.push({
        value: `mitre:${techniqueId}`,
        displayName,
        type: 'mitre',
        subType: 'technique',
        queryTemplate: createQueryTemplate('mitre', techniqueId, { techniqueName }),
        entityData: {
          techniqueId,
          techniqueName,
          tactic,
          count,
          sources: ['incident_data'],
        },
      });
    });
  }

  return options;
};
