// src/utils/badgeUtils.ts

import type { ConfidenceLevel, ThreatLevel } from '../types/security';

/**
 * Shared badge color utilities to eliminate duplication across components
 */

export const getThreatLevelColor = (
  level: ThreatLevel,
): 'danger' | 'warning' | 'neutral' | 'success' => {
  switch (level.toLowerCase() as Lowercase<ThreatLevel>) {
    case 'critical':
      return 'danger';
    case 'high':
      return 'warning';
    case 'medium':
      return 'neutral';
    case 'low':
      return 'success';
    default:
      return 'neutral';
  }
};

export const getConfidenceLevelColor = (
  level: ConfidenceLevel,
): 'success' | 'warning' | 'neutral' => {
  switch (level.toLowerCase() as Lowercase<ConfidenceLevel>) {
    case 'high':
      return 'success';
    case 'medium':
      return 'warning';
    case 'low':
      return 'neutral';
    default:
      return 'neutral';
  }
};

/**
 * Get malware classification color
 */
export const getMalwareClassificationColor = (
  classification: string,
): 'danger' | 'warning' | 'neutral' => {
  switch (classification.toLowerCase()) {
    case 'malicious':
      return 'danger';
    case 'suspicious':
      return 'warning';
    default:
      return 'neutral';
  }
};
