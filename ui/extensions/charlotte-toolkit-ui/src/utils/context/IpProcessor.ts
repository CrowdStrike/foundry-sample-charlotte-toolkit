// IP address processing utilities

import type { ContextOption } from '../../types';
import { createQueryTemplate } from '../queryTemplates';

import { isPublicIP } from './EntityHelpers';

/**
 * Process IP addresses and filter out private/internal ones
 */
// biome-ignore lint/suspicious/noExplicitAny: entityValues accepts any Falcon API entity structure
export const processIPs = (entityValues: any): ContextOption[] => {
  if (!entityValues) {
    return [];
  }

  const options: ContextOption[] = [];

  if (entityValues.ipv4s && Array.isArray(entityValues.ipv4s)) {
    entityValues.ipv4s.filter(isPublicIP).forEach((ip: string) => {
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
export const extractIPsFromDetection = (
  // biome-ignore lint/suspicious/noExplicitAny: detection accepts any Falcon API detection structure
  detection: any,
  options: ContextOption[],
): void => {
  if (!detection) return;

  // Extract IPs from device information
  if (detection.device) {
    // External IP
    if (
      detection.device.external_ip &&
      isPublicIP(detection.device.external_ip)
    ) {
      options.push({
        value: detection.device.external_ip.toLowerCase(),
        displayName: detection.device.external_ip.toLowerCase(),
        type: 'ip',
        queryTemplate: createQueryTemplate('ip', detection.device.external_ip),
        entityData: { ip: detection.device.external_ip.toLowerCase() },
      });
    }

    // Local IP (if public - rare but possible)
    if (detection.device.local_ip && isPublicIP(detection.device.local_ip)) {
      options.push({
        value: detection.device.local_ip.toLowerCase(),
        displayName: detection.device.local_ip.toLowerCase(),
        type: 'ip',
        queryTemplate: createQueryTemplate('ip', detection.device.local_ip),
        entityData: { ip: detection.device.local_ip.toLowerCase() },
      });
    }
  }
};
