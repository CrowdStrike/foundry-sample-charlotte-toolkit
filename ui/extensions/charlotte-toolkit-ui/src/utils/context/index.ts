// Context processing orchestrator - combines all entity processors

import type { ContextOption } from '../../types';

import { extractDomainsFromDetection, processDomains } from './DomainProcessor';
import { extractFilesFromDetection, processFiles, processLegacyFiles } from './FileProcessor';
import { extractIPsFromDetection, processIPs } from './IpProcessor';
import { extractMITREFromDetection, processMITRETechniques } from './MitreProcessor';

// Re-export helper functions for backward compatibility
export {
  calculateEntityCounts,
  extractTopLevelDomain,
  formatDisplayName,
  isDomainTruncated,
  isExternalFQDN,
  isPublicIP,
  truncateDomain,
  truncateHash,
} from './EntityHelpers';

/**
 * Extract entities from detection data structure with lowercase normalization
 */
const extractDetectionEntities = (detection: any): ContextOption[] => {
  const options: ContextOption[] = [];

  if (!detection) return options;

  // Extract each entity type using specialized processors
  extractIPsFromDetection(detection, options);
  extractDomainsFromDetection(detection, options);
  extractFilesFromDetection(detection, options);
  extractMITREFromDetection(detection, options);

  return options;
};

/**
 * Main processing function that coordinates all entity processing
 */
export const processAllEntities = (falconData: any): ContextOption[] => {
  if (!falconData) return [];

  const options: ContextOption[] = [];

  // Check if we have detection data (activity detections)
  if (falconData.detection || falconData.detectionId) {
    const detectionEntities = extractDetectionEntities(falconData.detection);
    options.push(...detectionEntities);
  }

  // Check for incident data (traditional structure)
  const entityValues = falconData.incident?.entity_values;
  if (entityValues) {
    const entitiesFull = falconData.incident?.entities_full ?? [];
    const entities = falconData.incident?.entities;

    // Process each entity type from incident data using specialized processors
    options.push(...processDomains(entityValues));
    options.push(...processFiles(entityValues, entities));
    options.push(...processLegacyFiles(entitiesFull, options));
    options.push(...processIPs(entityValues));
    options.push(...processMITRETechniques(entityValues));
  }

  return options;
};

// Export individual processors for advanced usage

// Export the main processing function as default
export default processAllEntities;

export { extractDomainsFromDetection, processDomains } from './DomainProcessor';
export { extractFilesFromDetection, processFiles, processLegacyFiles } from './FileProcessor';
export { extractIPsFromDetection, processIPs } from './IpProcessor';
export { extractMITREFromDetection, processMITRETechniques } from './MitreProcessor';
