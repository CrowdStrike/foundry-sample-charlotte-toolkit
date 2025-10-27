// Context processing orchestrator - combines all entity processors

import type { ContextOption } from '../../types';

import { extractDomainsFromDetection, processDomains } from './DomainProcessor';
import { extractFilesFromDetection, processFiles, processLegacyFiles } from './FileProcessor';
import { extractIPsFromDetection, processIPs } from './IpProcessor';
import { extractMITREFromDetection, processMITRETechniques } from './MitreProcessor';

// Re-export only used helper functions
export { calculateEntityCounts, formatDisplayName } from './EntityHelpers';

/**
 * Extract entities from detection data structure with lowercase normalization
 */
const extractDetectionEntities = (detection: unknown): ContextOption[] => {
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
export const processAllEntities = (falconData: unknown): ContextOption[] => {
  if (!falconData) return [];

  const options: ContextOption[] = [];
  const falconDataRecord = falconData as Record<string, unknown>;

  // Check if we have detection data (activity detections)
  if (falconDataRecord.detection || falconDataRecord.detectionId) {
    const detectionEntities = extractDetectionEntities(falconDataRecord.detection);
    options.push(...detectionEntities);
  }

  // Check for incident data (traditional structure)
  const incident = falconDataRecord.incident as Record<string, unknown> | undefined;
  const entityValues = incident?.entity_values;
  if (entityValues) {
    const entitiesFull = Array.isArray(incident?.entities_full) ? incident.entities_full : [];
    const entities = incident?.entities;

    // Process each entity type from incident data using specialized processors
    options.push(...processDomains(entityValues));
    options.push(...processFiles(entityValues, entities));
    options.push(...processLegacyFiles(entitiesFull, options));
    options.push(...processIPs(entityValues));
    options.push(...processMITRETechniques(entityValues));
  }

  return options;
};
