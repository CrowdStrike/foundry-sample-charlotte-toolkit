// MITRE ATT&CK technique processing utilities

import type { ContextOption } from '../../types';
import { createQueryTemplate } from '../queryTemplates';

/**
 * Extract MITRE ATT&CK techniques from various detection data structures
 */
export const extractMITREFromDetection = (detection: unknown, options: ContextOption[]): void => {
  if (!detection) return;

  const detectionRecord = detection as Record<string, unknown>;
  const mitreMap = new Map<
    string,
    { techniqueName?: string; tactic?: string; count: number; sources: string[] }
  >();

  // Method 1: From detection.behaviors array
  if (detectionRecord.behaviors && Array.isArray(detectionRecord.behaviors)) {
    detectionRecord.behaviors.forEach((behavior: unknown) => {
      const behaviorRecord = behavior as Record<string, unknown>;
      if (typeof behaviorRecord.technique_id === 'string') {
        const techniqueId = behaviorRecord.technique_id.toUpperCase();

        // Validate MITRE technique ID format (T1055, T1003.001, etc.)
        const mitrePattern = /^T\d{4}(\.\d{3})?$/;
        if (mitrePattern.test(techniqueId)) {
          const existing = mitreMap.get(techniqueId) ?? { count: 0, sources: [] };
          existing.count += 1;
          existing.sources.push('detection_behaviors');

          // Capture technique name and tactic if available
          if (typeof behaviorRecord.technique === 'string' && !existing.techniqueName) {
            existing.techniqueName = behaviorRecord.technique;
          }
          if (typeof behaviorRecord.tactic === 'string' && !existing.tactic) {
            existing.tactic = behaviorRecord.tactic;
          }

          mitreMap.set(techniqueId, existing);
        }
      }
    });
  }

  // Method 2: From detection.kill_chain array
  if (detectionRecord.kill_chain && Array.isArray(detectionRecord.kill_chain)) {
    detectionRecord.kill_chain.forEach((phase: unknown) => {
      const phaseRecord = phase as Record<string, unknown>;
      if (typeof phaseRecord.technique_id === 'string') {
        const techniqueId = phaseRecord.technique_id.toUpperCase();
        const mitrePattern = /^T\d{4}(\.\d{3})?$/;

        if (mitrePattern.test(techniqueId)) {
          const existing = mitreMap.get(techniqueId) ?? { count: 0, sources: [] };
          existing.count += 1;
          existing.sources.push('kill_chain');

          if (typeof phaseRecord.technique_name === 'string' && !existing.techniqueName) {
            existing.techniqueName = phaseRecord.technique_name;
          }
          if (typeof phaseRecord.tactic === 'string' && !existing.tactic) {
            existing.tactic = phaseRecord.tactic;
          }

          mitreMap.set(techniqueId, existing);
        }
      }
    });
  }

  // Method 3: From detection.mitre_attack array (common in activity detections)
  if (detectionRecord.mitre_attack && Array.isArray(detectionRecord.mitre_attack)) {
    detectionRecord.mitre_attack.forEach((attack: unknown) => {
      const attackRecord = attack as Record<string, unknown>;
      if (typeof attackRecord.technique_id === 'string') {
        const techniqueId = attackRecord.technique_id.toUpperCase();
        const mitrePattern = /^T\d{4}(\.\d{3})?$/;

        if (mitrePattern.test(techniqueId)) {
          const existing = mitreMap.get(techniqueId) ?? { count: 0, sources: [] };
          existing.count += 1;
          existing.sources.push('mitre_attack');

          if (typeof attackRecord.technique === 'string' && !existing.techniqueName) {
            existing.techniqueName = attackRecord.technique;
          }
          if (typeof attackRecord.tactic === 'string' && !existing.tactic) {
            existing.tactic = attackRecord.tactic;
          }

          mitreMap.set(techniqueId, existing);
        }
      }
    });
  }

  // Method 4: From individual detection fields (fallback)
  if (typeof detectionRecord.technique_id === 'string') {
    const techniqueId = detectionRecord.technique_id.toUpperCase();
    const mitrePattern = /^T\d{4}(\.\d{3})?$/;

    if (mitrePattern.test(techniqueId)) {
      const existing = mitreMap.get(techniqueId) ?? { count: 0, sources: [] };
      existing.count += 1;
      existing.sources.push('detection_fields');

      if (typeof detectionRecord.technique === 'string' && !existing.techniqueName) {
        existing.techniqueName = detectionRecord.technique;
      }
      if (typeof detectionRecord.tactic === 'string' && !existing.tactic) {
        existing.tactic = detectionRecord.tactic;
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
const isValidMITRETechnique = (techniqueId: string): boolean => {
  const mitrePattern = /^T\d{4}(\.\d{3})?$/;
  return mitrePattern.test(techniqueId.toUpperCase());
};

/**
 * Extract technique ID from various MITRE data formats
 */
const extractTechniqueId = (mitreData: unknown): string | null => {
  if (typeof mitreData === 'string') {
    return isValidMITRETechnique(mitreData) ? mitreData.toUpperCase() : null;
  }

  if (mitreData && typeof mitreData === 'object') {
    const mitreDataRecord = mitreData as Record<string, unknown>;
    const possibleIds = [
      mitreDataRecord.technique_id,
      mitreDataRecord.techniqueId,
      mitreDataRecord.id,
      mitreDataRecord.technique,
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
export const processMITRETechniques = (entityValues: unknown): ContextOption[] => {
  if (!entityValues) {
    return [];
  }

  const options: ContextOption[] = [];
  const entityValuesRecord = entityValues as Record<string, unknown>;

  if (entityValuesRecord.mitre_techniques && Array.isArray(entityValuesRecord.mitre_techniques)) {
    const mitreMap = new Map<string, { techniqueName?: string; tactic?: string; count: number }>();

    entityValuesRecord.mitre_techniques.forEach((technique: unknown) => {
      const techniqueId = extractTechniqueId(technique);
      if (techniqueId) {
        const existing = mitreMap.get(techniqueId) ?? { count: 0 };
        existing.count += 1;

        // Capture additional data if available
        const techniqueRecord = technique as Record<string, unknown>;
        if (typeof techniqueRecord.name === 'string' && !existing.techniqueName) {
          existing.techniqueName = techniqueRecord.name;
        }
        if (typeof techniqueRecord.tactic === 'string' && !existing.tactic) {
          existing.tactic = techniqueRecord.tactic;
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
