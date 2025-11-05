import { describe, expect, it } from 'vitest';
import {
  HASH_DISPLAY_FORMAT,
  HASH_TRUNCATION_LENGTH,
  INTERNAL_DOMAIN_PATTERNS,
  PRIVATE_IP_RANGES,
} from '../contextConstants';

describe('contextConstants', () => {
  describe('HASH_TRUNCATION_LENGTH', () => {
    it('should be 32 characters', () => {
      expect(HASH_TRUNCATION_LENGTH).toBe(32);
    });

    it('should be a positive number', () => {
      expect(HASH_TRUNCATION_LENGTH).toBeGreaterThan(0);
    });
  });

  describe('HASH_DISPLAY_FORMAT', () => {
    it('should have correct structure', () => {
      expect(HASH_DISPLAY_FORMAT).toHaveProperty('PREFIX_LENGTH');
      expect(HASH_DISPLAY_FORMAT).toHaveProperty('SUFFIX_LENGTH');
      expect(HASH_DISPLAY_FORMAT).toHaveProperty('SEPARATOR');
    });

    it('should have PREFIX_LENGTH of 12', () => {
      expect(HASH_DISPLAY_FORMAT.PREFIX_LENGTH).toBe(12);
    });

    it('should have SUFFIX_LENGTH of 12', () => {
      expect(HASH_DISPLAY_FORMAT.SUFFIX_LENGTH).toBe(12);
    });

    it('should have SEPARATOR of "..."', () => {
      expect(HASH_DISPLAY_FORMAT.SEPARATOR).toBe('...');
    });

    it('should have combined length less than truncation length', () => {
      const combined =
        HASH_DISPLAY_FORMAT.PREFIX_LENGTH +
        HASH_DISPLAY_FORMAT.SEPARATOR.length +
        HASH_DISPLAY_FORMAT.SUFFIX_LENGTH;
      expect(combined).toBeLessThan(HASH_TRUNCATION_LENGTH);
    });
  });

  describe('PRIVATE_IP_RANGES', () => {
    it('should have all standard private ranges', () => {
      expect(PRIVATE_IP_RANGES).toHaveProperty('CLASS_A');
      expect(PRIVATE_IP_RANGES).toHaveProperty('CLASS_B');
      expect(PRIVATE_IP_RANGES).toHaveProperty('CLASS_C');
      expect(PRIVATE_IP_RANGES).toHaveProperty('LOOPBACK');
      expect(PRIVATE_IP_RANGES).toHaveProperty('LINK_LOCAL');
    });

    it('should have correct CLASS_A range (10.0.0.0/8)', () => {
      expect(PRIVATE_IP_RANGES.CLASS_A.start).toEqual([10, 0, 0, 0]);
      expect(PRIVATE_IP_RANGES.CLASS_A.end).toEqual([10, 255, 255, 255]);
    });

    it('should have correct CLASS_B range (172.16.0.0/12)', () => {
      expect(PRIVATE_IP_RANGES.CLASS_B.start).toEqual([172, 16, 0, 0]);
      expect(PRIVATE_IP_RANGES.CLASS_B.end).toEqual([172, 31, 255, 255]);
    });

    it('should have correct CLASS_C range (192.168.0.0/16)', () => {
      expect(PRIVATE_IP_RANGES.CLASS_C.start).toEqual([192, 168, 0, 0]);
      expect(PRIVATE_IP_RANGES.CLASS_C.end).toEqual([192, 168, 255, 255]);
    });

    it('should have correct LOOPBACK range (127.0.0.0/8)', () => {
      expect(PRIVATE_IP_RANGES.LOOPBACK.start).toEqual([127, 0, 0, 0]);
      expect(PRIVATE_IP_RANGES.LOOPBACK.end).toEqual([127, 255, 255, 255]);
    });

    it('should have correct LINK_LOCAL range (169.254.0.0/16)', () => {
      expect(PRIVATE_IP_RANGES.LINK_LOCAL.start).toEqual([169, 254, 0, 0]);
      expect(PRIVATE_IP_RANGES.LINK_LOCAL.end).toEqual([169, 254, 255, 255]);
    });

    it('should have correct MULTICAST_START', () => {
      expect(PRIVATE_IP_RANGES.MULTICAST_START).toBe(224);
    });

    it('should have correct RESERVED_START', () => {
      expect(PRIVATE_IP_RANGES.RESERVED_START).toBe(0);
    });

    it('should have valid octets in all ranges', () => {
      const ranges = [
        PRIVATE_IP_RANGES.CLASS_A,
        PRIVATE_IP_RANGES.CLASS_B,
        PRIVATE_IP_RANGES.CLASS_C,
        PRIVATE_IP_RANGES.LOOPBACK,
        PRIVATE_IP_RANGES.LINK_LOCAL,
      ];

      ranges.forEach((range) => {
        range.start.forEach((octet) => {
          expect(octet).toBeGreaterThanOrEqual(0);
          expect(octet).toBeLessThanOrEqual(255);
        });
        range.end.forEach((octet) => {
          expect(octet).toBeGreaterThanOrEqual(0);
          expect(octet).toBeLessThanOrEqual(255);
        });
      });
    });
  });

  describe('INTERNAL_DOMAIN_PATTERNS', () => {
    it('should be an array', () => {
      expect(Array.isArray(INTERNAL_DOMAIN_PATTERNS)).toBe(true);
    });

    it('should have common internal patterns', () => {
      expect(INTERNAL_DOMAIN_PATTERNS).toContain('.lan');
      expect(INTERNAL_DOMAIN_PATTERNS).toContain('.local');
      expect(INTERNAL_DOMAIN_PATTERNS).toContain('.internal');
      expect(INTERNAL_DOMAIN_PATTERNS).toContain('.corp');
      expect(INTERNAL_DOMAIN_PATTERNS).toContain('.intranet');
      expect(INTERNAL_DOMAIN_PATTERNS).toContain('.private');
      expect(INTERNAL_DOMAIN_PATTERNS).toContain('.domain');
      expect(INTERNAL_DOMAIN_PATTERNS).toContain('.ad');
    });

    it('should have 8 patterns', () => {
      expect(INTERNAL_DOMAIN_PATTERNS).toHaveLength(8);
    });

    it('should all start with a dot', () => {
      INTERNAL_DOMAIN_PATTERNS.forEach((pattern) => {
        expect(pattern).toMatch(/^\./);
      });
    });

    it('should be lowercase', () => {
      INTERNAL_DOMAIN_PATTERNS.forEach((pattern) => {
        expect(pattern).toBe(pattern.toLowerCase());
      });
    });

    it('should not have duplicates', () => {
      const uniquePatterns = new Set(INTERNAL_DOMAIN_PATTERNS);
      expect(uniquePatterns.size).toBe(INTERNAL_DOMAIN_PATTERNS.length);
    });

    it('should be valid domain suffixes', () => {
      INTERNAL_DOMAIN_PATTERNS.forEach((pattern) => {
        expect(pattern).toMatch(/^\.[a-z]+$/);
      });
    });
  });
});
