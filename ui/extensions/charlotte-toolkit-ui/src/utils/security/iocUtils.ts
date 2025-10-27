// src/utils/security/iocUtils.ts

import type { StructuredSecurityResponse } from '../../types/security';

/**
 * Parse structured security response from text
 * @param responseText - Response text to parse
 * @returns Parsed security response or null
 */
export const parseStructuredResponse = (
  responseText: string,
): StructuredSecurityResponse | null => {
  try {
    // Try to parse as JSON
    const parsed = JSON.parse(responseText.trim());

    // Validate it has the expected structure
    if (
      parsed &&
      typeof parsed === 'object' &&
      parsed.executive_summary &&
      parsed.threat_level &&
      parsed.priority_actions
    ) {
      return parsed as StructuredSecurityResponse;
    }
  } catch {
    // Not JSON or invalid structure
  }
  return null;
};

// Note: All IOC-related functions have been moved to iocCore.ts
// Components should import from '../../utils/security/iocCore' instead
