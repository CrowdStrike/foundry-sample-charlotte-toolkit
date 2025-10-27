// Entity processing helper utilities

import type { ContextOption } from '../../types';
import {
  HASH_DISPLAY_FORMAT,
  HASH_TRUNCATION_LENGTH,
  INTERNAL_DOMAIN_PATTERNS,
  PRIVATE_IP_RANGES,
} from '../contextConstants';

/**
 * Truncate hash values for better display with more characters
 */
export const truncateHash = (hash: string): string => {
  if (hash.length <= HASH_TRUNCATION_LENGTH) return hash;
  return `${hash.slice(0, Math.max(0, HASH_DISPLAY_FORMAT.PREFIX_LENGTH))}${HASH_DISPLAY_FORMAT.SEPARATOR}${hash.slice(Math.max(0, hash.length - HASH_DISPLAY_FORMAT.SUFFIX_LENGTH))}`;
};

/**
 * Extract top-level domain from full domain
 */
export const extractTopLevelDomain = (domain: string): string => {
  const parts = domain.split('.');
  if (parts.length < 2) return domain;

  // Handle common two-part TLDs (e.g., .co.uk, .com.au)
  const lastPart = parts.at(-1)?.toLowerCase() ?? '';
  const secondLastPart = parts.at(-2)?.toLowerCase() ?? '';

  const commonTwoPartTLDs = [
    'co.uk',
    'com.au',
    'org.uk',
    'net.au',
    'gov.uk',
    'edu.au',
  ];
  const twoPartTLD = `${secondLastPart}.${lastPart}`;

  if (commonTwoPartTLDs.includes(twoPartTLD) && parts.length >= 3) {
    return `${parts.at(-3)}.${twoPartTLD}`;
  }

  // Standard TLD (e.g., .com, .org, .net)
  return `${secondLastPart}.${lastPart}`;
};

/**
 * Smart domain truncation showing beginning with consistent 32-character maximum
 * Example: "aaa.bbb.ccc.ddd.com" becomes "aaa.bbb.ccc..." (32 chars max)
 */
export const truncateDomain = (
  domain: string,
  maxLength: number = 32,
): string => {
  if (domain.length <= maxLength) return domain;

  // Always truncate at the end with consistent character count
  const truncationSuffix = '...';
  const availableLength = maxLength - truncationSuffix.length;

  if (availableLength <= 0) return domain; // Safety check

  return domain.slice(0, Math.max(0, availableLength)) + truncationSuffix;
};

/**
 * Format display names for better readability
 * Returns both display text and original text for tooltip support
 */
export const formatDisplayName = (
  option: ContextOption,
): { displayText: string; originalText: string } => {
  if (option.subType === 'md5' || option.subType === 'sha256') {
    const hashMatch = option.displayName.match(/^(MD5|SHA256):\s*(.+)$/);
    if (hashMatch?.[1] && hashMatch[2]) {
      const [, type, displayedHash] = hashMatch; // This is already truncated

      // Get the original hash from entityData
      const originalHash = option.entityData?.hash;
      if (originalHash && originalHash !== displayedHash) {
        return {
          displayText: option.displayName, // Already formatted with truncated hash
          originalText: `${type}: ${originalHash}`, // Show full hash in tooltip
        };
      }
    }
  }

  // For domain entries, check if it's truncated
  if (
    option.type === 'domain' &&
    option.subType === 'fqdn' &&
    option.entityData
  ) {
    const { fullDomain, isTruncated } = option.entityData;
    if (isTruncated && fullDomain) {
      return {
        displayText: option.displayName, // Already truncated
        originalText: fullDomain, // Show original full domain
      };
    }
  }

  return { displayText: option.displayName, originalText: option.displayName };
};

/**
 * Check if an IP address is public/routable (not private/internal)
 */
export const isPublicIP = (ip: string): boolean => {
  const parts = ip.split('.').map(Number);
  if (
    parts.length !== 4 ||
    parts.some((part) => Number.isNaN(Number(part)) || part < 0 || part > 255)
  ) {
    return false;
  }

  const a = parts[0];
  const b = parts[1];

  // Private ranges (RFC 1918)
  if (a === 10) return false; // 10.0.0.0/8
  if (a === 172 && b !== undefined && b >= 16 && b <= 31) return false; // 172.16.0.0/12
  if (a === 192 && b === 168) return false; // 192.168.0.0/16

  // Other non-routable ranges
  if (a === 127) return false; // 127.0.0.0/8 (loopback)
  if (a === 169 && b === 254) return false; // 169.254.0.0/16 (link-local)
  if (a === 0) return false; // 0.0.0.0/8
  if (a !== undefined && a >= PRIVATE_IP_RANGES.MULTICAST_START) return false; // 224.0.0.0/4 (multicast/reserved)

  return true;
};

/**
 * Check if a hostname is external (not internal domain)
 */
export const isExternalFQDN = (hostname: string): boolean => {
  // Basic validation
  if (!hostname.includes('.')) return false;
  if (hostname === '.' || hostname === 'localhost') return false;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) return false;

  const parts = hostname.split('.');
  if (parts.length < 2 || (parts.at(-1)?.length ?? 0) < 2) return false;

  // Filter out internal domain patterns
  const lowerHostname = hostname.toLowerCase();
  return !INTERNAL_DOMAIN_PATTERNS.some((pattern) =>
    lowerHostname.endsWith(pattern),
  );
};

/**
 * Calculate entity counts for each type
 */
export const calculateEntityCounts = (options: ContextOption[]) => {
  return {
    total: options.length,
    domains: options.filter((opt) => opt.type === 'domain').length,
    files: options.filter((opt) => opt.type === 'file').length,
    ips: options.filter((opt) => opt.type === 'ip').length,
    mitres: options.filter((opt) => opt.type === 'mitre').length,
  };
};
