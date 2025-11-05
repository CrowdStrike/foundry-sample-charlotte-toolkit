import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { ContextOption } from '../../types';
import { useContextProcessor } from '../useContextProcessor';

describe('useContextProcessor', () => {
  describe('basic functionality', () => {
    it('should return empty arrays for null input', () => {
      const { result } = renderHook(() => useContextProcessor({ falconData: null }));

      expect(result.current.availableContextOptions).toEqual([]);
      expect(result.current.contextCounts).toEqual({
        total: 0,
        domains: 0,
        files: 0,
        ips: 0,
        mitres: 0,
      });
    });

    it('should return empty arrays for undefined input', () => {
      const { result } = renderHook(() => useContextProcessor({ falconData: undefined }));

      expect(result.current.availableContextOptions).toEqual([]);
      expect(result.current.contextCounts).toEqual({
        total: 0,
        domains: 0,
        files: 0,
        ips: 0,
        mitres: 0,
      });
    });

    it('should return empty arrays for empty object', () => {
      const { result } = renderHook(() => useContextProcessor({ falconData: {} }));

      expect(result.current.availableContextOptions).toEqual([]);
      expect(result.current.contextCounts).toEqual({
        total: 0,
        domains: 0,
        files: 0,
        ips: 0,
        mitres: 0,
      });
    });
  });

  describe('detection data processing', () => {
    it('should process detection with IP addresses', () => {
      const falconData = {
        detection: {
          device: {
            external_ip: '8.8.8.8',
            local_ip: '1.1.1.1',
          },
        },
      };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      const ips = result.current.availableContextOptions.filter((opt) => opt.type === 'ip');
      expect(ips.length).toBeGreaterThan(0);
      expect(result.current.contextCounts.ips).toBeGreaterThan(0);
    });

    it('should process detection with domains', () => {
      const falconData = {
        detection: {
          device: {
            machine_domain: 'example.com',
          },
        },
      };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      const domains = result.current.availableContextOptions.filter((opt) => opt.type === 'domain');
      expect(domains.length).toBeGreaterThan(0);
      expect(result.current.contextCounts.domains).toBeGreaterThan(0);
    });

    it('should process detection with files', () => {
      const falconData = {
        detection: {
          filename: 'malware.exe',
          sha256: 'abc123def456abc123def456abc123def456abc123def456abc123def456abc12345',
        },
      };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      const files = result.current.availableContextOptions.filter((opt) => opt.type === 'file');
      expect(files.length).toBeGreaterThan(0);
      expect(result.current.contextCounts.files).toBeGreaterThan(0);
    });

    it('should process detection with MITRE techniques', () => {
      const falconData = {
        detection: {
          technique_id: 'T1566',
          tactic: 'Initial Access',
        },
      };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      const mitre = result.current.availableContextOptions.filter((opt) => opt.type === 'mitre');
      expect(mitre.length).toBeGreaterThan(0);
    });
  });

  describe('incident data processing', () => {
    it('should process incident with entity_values', () => {
      const falconData = {
        incident: {
          entity_values: {
            ipv4s: ['8.8.8.8', '1.1.1.1'],
            domain_names: ['example.com'],
          },
        },
      };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      expect(result.current.availableContextOptions.length).toBeGreaterThan(0);
      expect(result.current.contextCounts.total).toBeGreaterThan(0);
    });

    it('should process domains from entity_values', () => {
      const falconData = {
        incident: {
          entity_values: {
            domain_names: ['example.com', 'test.org'],
          },
        },
      };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      const domains = result.current.availableContextOptions.filter((opt) => opt.type === 'domain');
      expect(domains.length).toBeGreaterThan(0);
      expect(result.current.contextCounts.domains).toBeGreaterThan(0);
    });

    it('should process IPs from entity_values', () => {
      const falconData = {
        incident: {
          entity_values: {
            ipv4s: ['8.8.8.8', '1.1.1.1', '9.9.9.9'],
          },
        },
      };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      const ips = result.current.availableContextOptions.filter((opt) => opt.type === 'ip');
      expect(ips.length).toBeGreaterThan(0);
      expect(result.current.contextCounts.ips).toBeGreaterThan(0);
    });

    it('should process files from entity_values', () => {
      const falconData = {
        incident: {
          entity_values: {
            sha256s: ['abcd1234efgh5678abcd1234efgh5678abcd1234efgh5678abcd1234efgh5678'],
          },
          entities: {
            file_name: ['malware.exe'],
          },
        },
      };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      const files = result.current.availableContextOptions.filter((opt) => opt.type === 'file');
      expect(files.length).toBeGreaterThan(0);
      expect(result.current.contextCounts.files).toBeGreaterThan(0);
    });
  });

  describe('combined data processing', () => {
    it('should process both detection and incident data', () => {
      const falconData = {
        detection: {
          device: {
            external_ip: '8.8.8.8',
          },
        },
        incident: {
          entity_values: {
            domain_names: ['example.com'],
          },
        },
      };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      const ips = result.current.availableContextOptions.filter((opt) => opt.type === 'ip');
      const domains = result.current.availableContextOptions.filter((opt) => opt.type === 'domain');

      expect(ips.length).toBeGreaterThan(0);
      expect(domains.length).toBeGreaterThan(0);
      expect(result.current.contextCounts.total).toBeGreaterThan(0);
    });

    it('should calculate correct entity counts', () => {
      const falconData = {
        incident: {
          entity_values: {
            ipv4s: ['8.8.8.8', '1.1.1.1'],
            domain_names: ['example.com', 'test.org', 'demo.net'],
          },
        },
      };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      expect(result.current.contextCounts.ips).toBe(2);
      expect(result.current.contextCounts.domains).toBeGreaterThan(0); // TLDs + domains
      expect(result.current.contextCounts.total).toBeGreaterThan(0);
    });
  });

  describe('memoization', () => {
    it('should memoize results when falconData does not change', () => {
      const falconData = {
        detection: {
          device: {
            external_ip: '8.8.8.8',
          },
        },
      };

      const { result, rerender } = renderHook((props) => useContextProcessor(props), {
        initialProps: { falconData },
      });

      const firstResult = result.current.availableContextOptions;
      const firstCounts = result.current.contextCounts;

      // Rerender with same data
      rerender({ falconData });

      // Should return same references (memoized)
      expect(result.current.availableContextOptions).toBe(firstResult);
      expect(result.current.contextCounts).toBe(firstCounts);
    });

    it('should recompute when falconData changes', () => {
      const falconData1 = {
        detection: {
          device: {
            external_ip: '8.8.8.8',
          },
        },
      };

      const falconData2 = {
        detection: {
          device: {
            external_ip: '1.1.1.1',
          },
        },
      };

      const { result, rerender } = renderHook((props) => useContextProcessor(props), {
        initialProps: { falconData: falconData1 },
      });

      const firstResult = result.current.availableContextOptions;
      const firstCounts = result.current.contextCounts;

      // Rerender with different data
      rerender({ falconData: falconData2 });

      // Should return different references (recomputed)
      expect(result.current.availableContextOptions).not.toBe(firstResult);
      expect(result.current.contextCounts).not.toBe(firstCounts);
    });
  });

  describe('return value structure', () => {
    it('should return object with availableContextOptions and contextCounts', () => {
      const { result } = renderHook(() => useContextProcessor({ falconData: {} }));

      expect(result.current).toHaveProperty('availableContextOptions');
      expect(result.current).toHaveProperty('contextCounts');
      expect(Array.isArray(result.current.availableContextOptions)).toBe(true);
      expect(typeof result.current.contextCounts).toBe('object');
    });

    it('should return context counts with correct structure', () => {
      const { result } = renderHook(() => useContextProcessor({ falconData: {} }));

      expect(result.current.contextCounts).toHaveProperty('total');
      expect(result.current.contextCounts).toHaveProperty('domains');
      expect(result.current.contextCounts).toHaveProperty('files');
      expect(result.current.contextCounts).toHaveProperty('ips');
      expect(result.current.contextCounts).toHaveProperty('mitres');

      expect(typeof result.current.contextCounts.total).toBe('number');
      expect(typeof result.current.contextCounts.domains).toBe('number');
      expect(typeof result.current.contextCounts.files).toBe('number');
      expect(typeof result.current.contextCounts.ips).toBe('number');
      expect(typeof result.current.contextCounts.mitres).toBe('number');
    });

    it('should return context options as array of ContextOption objects', () => {
      const falconData = {
        detection: {
          device: {
            external_ip: '8.8.8.8',
          },
        },
      };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      result.current.availableContextOptions.forEach((option: ContextOption) => {
        expect(option).toHaveProperty('value');
        expect(option).toHaveProperty('displayName');
        expect(option).toHaveProperty('type');
        expect(option).toHaveProperty('queryTemplate');
        expect(option).toHaveProperty('entityData');
      });
    });
  });

  describe('edge cases', () => {
    it('should handle malformed detection data', () => {
      const falconData = {
        detection: {
          device: null,
        },
      };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      expect(result.current.availableContextOptions).toEqual([]);
    });

    it('should handle malformed incident data', () => {
      const falconData = {
        incident: {
          entity_values: null,
        },
      };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      expect(result.current.availableContextOptions).toEqual([]);
    });

    it('should handle array instead of object', () => {
      const falconData = ['not', 'an', 'object'];

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      expect(result.current.availableContextOptions).toEqual([]);
    });

    it('should handle string instead of object', () => {
      const falconData = 'invalid data';

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      expect(result.current.availableContextOptions).toEqual([]);
    });

    it('should handle number instead of object', () => {
      const falconData = 12345;

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      expect(result.current.availableContextOptions).toEqual([]);
    });
  });
});
