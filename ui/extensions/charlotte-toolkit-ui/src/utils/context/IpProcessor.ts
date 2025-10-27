// IP address processing utilities

import type { ContextOption } from '../../types';
import { createQueryTemplate } from '../queryTemplates';

import { isPublicIP } from './EntityHelpers';

/**
 * Process IP addresses and filter out private/internal ones
 */
export const processIPs = (entityValues: unknown): ContextOption[] => {
  if (!entityValues) {
    return [];
  }

  const entityValuesRecord = entityValues as Record<string, unknown>;
  const options: ContextOption[] = [];

  if (entityValuesRecord.ipv4s && Array.isArray(entityValuesRecord.ipv4s)) {
    entityValuesRecord.ipv4s.filter(isPublicIP).forEach((ip: string) => {
      options.push({
        value: ip,
        displayName: ip.toLowerCase(),
        type: 'ip',
        queryTemplate: createQueryTemplate('ip', ip),
        entityData: { ip },
      });
    });
  }

  return options;
};

/**
 * Extract IP entities from detection data with validation
 */
export const extractIPsFromDetection = (detection: unknown, options: ContextOption[]): void => {
  if (!detection) return;

  const detectionRecord = detection as Record<string, unknown>;

  // Extract IPs from device information
  if (detectionRecord.device && typeof detectionRecord.device === 'object') {
    const device = detectionRecord.device as Record<string, unknown>;
    // External IP
    if (typeof device.external_ip === 'string' && isPublicIP(device.external_ip)) {
      options.push({
        value: device.external_ip.toLowerCase(),
        displayName: device.external_ip.toLowerCase(),
        type: 'ip',
        queryTemplate: createQueryTemplate('ip', device.external_ip),
        entityData: { ip: device.external_ip.toLowerCase() },
      });
    }

    // Local IP (if public - rare but possible)
    if (typeof device.local_ip === 'string' && isPublicIP(device.local_ip)) {
      options.push({
        value: device.local_ip.toLowerCase(),
        displayName: device.local_ip.toLowerCase(),
        type: 'ip',
        queryTemplate: createQueryTemplate('ip', device.local_ip),
        entityData: { ip: device.local_ip.toLowerCase() },
      });
    }
  }
};
