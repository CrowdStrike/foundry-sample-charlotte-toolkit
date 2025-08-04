// Context processing constants

// Hash display constants
export const HASH_TRUNCATION_LENGTH = 32;
export const HASH_DISPLAY_FORMAT = {
  PREFIX_LENGTH: 12,
  SUFFIX_LENGTH: 12,
  SEPARATOR: '...',
};

// IP filtering constants
export const PRIVATE_IP_RANGES = {
  CLASS_A: { start: [10, 0, 0, 0], end: [10, 255, 255, 255] },
  CLASS_B: { start: [172, 16, 0, 0], end: [172, 31, 255, 255] },
  CLASS_C: { start: [192, 168, 0, 0], end: [192, 168, 255, 255] },
  LOOPBACK: { start: [127, 0, 0, 0], end: [127, 255, 255, 255] },
  LINK_LOCAL: { start: [169, 254, 0, 0], end: [169, 254, 255, 255] },
  MULTICAST_START: 224,
  RESERVED_START: 0,
};

// Domain filtering patterns
export const INTERNAL_DOMAIN_PATTERNS = [
  '.lan',
  '.local',
  '.internal',
  '.corp',
  '.intranet',
  '.private',
  '.domain',
  '.ad',
];

// Entity type configurations
export const ENTITY_TYPE_CONFIG = {
  domain: {
    name: 'Domains',
    icon: 'shield-exclamation',
    childIcon: 'shield',
  },
  file: {
    name: 'Files',
    icon: 'file-lock',
    childIcons: {
      filename: 'file-earmark',
      md5: 'fingerprint',
      sha256: 'fingerprint',
    },
  },
  ip: {
    name: 'IP Addresses',
    icon: 'router-fill',
    childIcon: 'router',
  },
  fqdn: {
    name: 'FQDNs',
    icon: 'globe2',
    childIcon: 'dns',
  },
};

// Note: Validation constants moved to constants.ts VALIDATION_THRESHOLDS
// to eliminate duplication and provide centralized configuration

// Processing limits
export const PROCESSING_LIMITS = {
  MAX_DOMAIN_INSTANCES_DISPLAY: 20,
  MAX_FILE_ASSOCIATIONS: 50,
  MIN_DOMAIN_PARTS: 2,
  MIN_TLD_LENGTH: 2,
};
