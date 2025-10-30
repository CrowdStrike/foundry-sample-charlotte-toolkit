// src/utils/security/iocCore.ts
// Unified IOC handling system - single source of truth for all IOC operations

type IOCType = 'ip' | 'domain' | 'hash' | 'url' | 'path' | 'registry';

/**
 * Detect the type of an IOC
 */
const detectIOCType = (text: string): IOCType | null => {
  if (!text || typeof text !== 'string') return null;

  // Hash patterns
  const isHash = /^[a-fA-F0-9]{32}$|^[a-fA-F0-9]{40}$|^[a-fA-F0-9]{64}$/.test(text);
  if (isHash) return 'hash';

  // IP patterns (including defanged)
  const isIP =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[.[\].]){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      text,
    );
  if (isIP) return 'ip';

  // Domain patterns (including defanged)
  const isDomain = /^[a-zA-Z0-9][a-zA-Z0-9\-[\].-]{1,61}[a-zA-Z0-9][.[\].][a-zA-Z]{2,}$/.test(text);
  if (isDomain) return 'domain';

  // URL patterns
  const isURL = /^https?:\/\//.test(text) || text.includes('://');
  if (isURL) return 'url';

  // Registry key patterns
  const isRegistry = /^HK[A-Z_]+(\\|\/).+/.test(text);
  if (isRegistry) return 'registry';

  // File path patterns
  const isPath = /^[a-zA-Z]:\\|^\/|\\/.test(text) || text.includes('\\') || text.includes('/');
  if (isPath) return 'path';

  return null;
};

/**
 * Defang an IOC for safe display (prevents accidental clicks/navigation)
 */
const defangIOC = (ioc: string): string => {
  if (!ioc || typeof ioc !== 'string') return ioc;
  return ioc.replace(/\./g, '[.]').replace(/http/g, 'hxxp').replace(/ftp/g, 'fxp');
};

/**
 * Remove defanging from an IOC (for copying original values)
 */
const removeFanging = (ioc: string): string => {
  if (!ioc || typeof ioc !== 'string') return ioc;
  return ioc.replace(/\[\.\]/g, '.');
};

/**
 * Normalize IOC for comparison (remove defanging, convert to lowercase)
 */
const normalizeIOC = (ioc: string): string => {
  if (!ioc || typeof ioc !== 'string') return ioc;
  return removeFanging(ioc).toLowerCase().trim();
};

/**
 * Get appropriate CSS classes for IOC display
 */
const getIOCDisplayClasses = (
  _type: IOCType,
  variant: 'list' | 'pill' | 'inline' = 'list',
): string => {
  const baseClasses = 'font-mono text-xs break-words';

  switch (variant) {
    case 'pill':
      return `${baseClasses} inline-block px-2 py-1 rounded border bg-opacity-50`;
    case 'inline':
      return `${baseClasses} inline`;
    default:
      return `${baseClasses}`;
  }
};

/**
 * Get badge variant for IOC type (for Shoelace badges)
 */
const getIOCBadgeVariant = (type: IOCType): 'warning' | 'primary' | 'neutral' | 'success' => {
  switch (type) {
    case 'hash':
      return 'warning';
    case 'ip':
      return 'primary';
    case 'domain':
      return 'neutral';
    case 'url':
      return 'neutral';
    case 'registry':
      return 'success';
    case 'path':
      return 'success';
    default:
      return 'neutral';
  }
};

/**
 * Main IOC utility object - single interface for all IOC operations
 */
export const IOCCore = {
  // Type detection
  detectType: detectIOCType,

  // Defanging operations
  defang: defangIOC, // For safe display
  removeFanging, // For copying original values

  // Normalization and comparison
  normalize: normalizeIOC,

  // Display utilities
  getDisplayClasses: getIOCDisplayClasses,
  getBadgeVariant: getIOCBadgeVariant,
};
