import { describe, expect, it } from 'vitest';
import type { ContextOption } from '../../../types';
import { extractIPsFromDetection, processIPs } from '../IpProcessor';

describe('IpProcessor', () => {
  describe('processIPs', () => {
    it('should return empty array for null input', () => {
      expect(processIPs(null)).toEqual([]);
    });

    it('should return empty array for undefined input', () => {
      expect(processIPs(undefined)).toEqual([]);
    });

    it('should return empty array for empty object', () => {
      expect(processIPs({})).toEqual([]);
    });

    it('should return empty array when ipv4s is missing', () => {
      expect(processIPs({ other: 'data' })).toEqual([]);
    });

    it('should return empty array when ipv4s is not an array', () => {
      expect(processIPs({ ipv4s: 'not-an-array' })).toEqual([]);
    });

    it('should process single public IP', () => {
      const input = { ipv4s: ['8.8.8.8'] };
      const result = processIPs(input);

      expect(result).toHaveLength(1);
      expect(result[0]).toBeDefined();
      expect(result[0]?.value).toBe('8.8.8.8');
      expect(result[0]?.displayName).toBe('8.8.8.8');
      expect(result[0]?.type).toBe('ip');
      expect(result[0]?.entityData?.ip).toBe('8.8.8.8');
    });

    it('should process multiple public IPs', () => {
      const input = { ipv4s: ['8.8.8.8', '1.1.1.1', '93.184.216.34'] };
      const result = processIPs(input);

      expect(result).toHaveLength(3);
      expect(result[0]?.value).toBe('8.8.8.8');
      expect(result[1]?.value).toBe('1.1.1.1');
      expect(result[2]?.value).toBe('93.184.216.34');
    });

    it('should filter out private IPs (10.x.x.x)', () => {
      const input = { ipv4s: ['8.8.8.8', '10.0.0.1', '1.1.1.1'] };
      const result = processIPs(input);

      expect(result).toHaveLength(2);
      expect(result[0]?.value).toBe('8.8.8.8');
      expect(result[1]?.value).toBe('1.1.1.1');
    });

    it('should filter out private IPs (192.168.x.x)', () => {
      const input = { ipv4s: ['8.8.8.8', '192.168.1.1', '1.1.1.1'] };
      const result = processIPs(input);

      expect(result).toHaveLength(2);
      expect(result[0]?.value).toBe('8.8.8.8');
      expect(result[1]?.value).toBe('1.1.1.1');
    });

    it('should filter out private IPs (172.16-31.x.x)', () => {
      const input = { ipv4s: ['8.8.8.8', '172.16.0.1', '172.31.255.255', '1.1.1.1'] };
      const result = processIPs(input);

      expect(result).toHaveLength(2);
      expect(result[0]?.value).toBe('8.8.8.8');
      expect(result[1]?.value).toBe('1.1.1.1');
    });

    it('should filter out loopback IPs (127.x.x.x)', () => {
      const input = { ipv4s: ['8.8.8.8', '127.0.0.1', '1.1.1.1'] };
      const result = processIPs(input);

      expect(result).toHaveLength(2);
      expect(result[0]?.value).toBe('8.8.8.8');
      expect(result[1]?.value).toBe('1.1.1.1');
    });

    it('should filter out link-local IPs (169.254.x.x)', () => {
      const input = { ipv4s: ['8.8.8.8', '169.254.1.1', '1.1.1.1'] };
      const result = processIPs(input);

      expect(result).toHaveLength(2);
      expect(result[0]?.value).toBe('8.8.8.8');
      expect(result[1]?.value).toBe('1.1.1.1');
    });

    it('should filter out multicast IPs (224+.x.x.x)', () => {
      const input = { ipv4s: ['8.8.8.8', '224.0.0.1', '255.255.255.255', '1.1.1.1'] };
      const result = processIPs(input);

      expect(result).toHaveLength(2);
      expect(result[0]?.value).toBe('8.8.8.8');
      expect(result[1]?.value).toBe('1.1.1.1');
    });

    it('should filter out 0.0.0.0/8 range', () => {
      const input = { ipv4s: ['8.8.8.8', '0.0.0.0', '1.1.1.1'] };
      const result = processIPs(input);

      expect(result).toHaveLength(2);
      expect(result[0]?.value).toBe('8.8.8.8');
      expect(result[1]?.value).toBe('1.1.1.1');
    });

    it('should convert IPs to lowercase', () => {
      const input = { ipv4s: ['8.8.8.8'] };
      const result = processIPs(input);

      expect(result[0]?.displayName).toBe('8.8.8.8');
    });

    it('should include query template', () => {
      const input = { ipv4s: ['8.8.8.8'] };
      const result = processIPs(input);

      expect(result[0]?.queryTemplate).toBeDefined();
      expect(result[0]?.queryTemplate).toContain('8.8.8.8');
    });

    it('should handle empty ipv4s array', () => {
      const input = { ipv4s: [] };
      const result = processIPs(input);

      expect(result).toEqual([]);
    });

    it('should filter invalid IPs', () => {
      const input = { ipv4s: ['8.8.8.8', '256.1.1.1', 'invalid', '1.1.1.1'] };
      const result = processIPs(input);

      expect(result).toHaveLength(2);
      expect(result[0]?.value).toBe('8.8.8.8');
      expect(result[1]?.value).toBe('1.1.1.1');
    });

    it('should handle mixed public and private IPs', () => {
      const input = {
        ipv4s: [
          '8.8.8.8', // public
          '10.0.0.1', // private
          '1.1.1.1', // public
          '192.168.1.1', // private
          '93.184.216.34', // public
        ],
      };
      const result = processIPs(input);

      expect(result).toHaveLength(3);
      expect(result.map((r) => r.value)).toEqual(['8.8.8.8', '1.1.1.1', '93.184.216.34']);
    });
  });

  describe('extractIPsFromDetection', () => {
    it('should handle null detection', () => {
      const options: ContextOption[] = [];
      extractIPsFromDetection(null, options);
      expect(options).toHaveLength(0);
    });

    it('should handle undefined detection', () => {
      const options: ContextOption[] = [];
      extractIPsFromDetection(undefined, options);
      expect(options).toHaveLength(0);
    });

    it('should handle detection without device', () => {
      const options: ContextOption[] = [];
      extractIPsFromDetection({}, options);
      expect(options).toHaveLength(0);
    });

    it('should handle device without IPs', () => {
      const options: ContextOption[] = [];
      const detection = { device: { hostname: 'test' } };
      extractIPsFromDetection(detection, options);
      expect(options).toHaveLength(0);
    });

    it('should extract public external IP', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          external_ip: '8.8.8.8',
        },
      };

      extractIPsFromDetection(detection, options);

      expect(options).toHaveLength(1);
      expect(options[0]?.value).toBe('8.8.8.8');
      expect(options[0]?.displayName).toBe('8.8.8.8');
      expect(options[0]?.type).toBe('ip');
      expect(options[0]?.entityData?.ip).toBe('8.8.8.8');
    });

    it('should extract public local IP (rare case)', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          local_ip: '8.8.4.4', // Public IP in local_ip field (rare)
        },
      };

      extractIPsFromDetection(detection, options);

      expect(options).toHaveLength(1);
      expect(options[0]?.value).toBe('8.8.4.4');
    });

    it('should extract both external and local if both public', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          external_ip: '8.8.8.8',
          local_ip: '1.1.1.1',
        },
      };

      extractIPsFromDetection(detection, options);

      expect(options).toHaveLength(2);
      expect(options[0]?.value).toBe('8.8.8.8');
      expect(options[1]?.value).toBe('1.1.1.1');
    });

    it('should filter out private external IP', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          external_ip: '192.168.1.1',
        },
      };

      extractIPsFromDetection(detection, options);
      expect(options).toHaveLength(0);
    });

    it('should filter out private local IP', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          local_ip: '10.0.0.1',
        },
      };

      extractIPsFromDetection(detection, options);
      expect(options).toHaveLength(0);
    });

    it('should convert IPs to lowercase', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          external_ip: '8.8.8.8',
        },
      };

      extractIPsFromDetection(detection, options);
      expect(options[0]?.displayName).toBe('8.8.8.8');
      expect(options[0]?.entityData?.ip).toBe('8.8.8.8');
    });

    it('should include query template', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          external_ip: '8.8.8.8',
        },
      };

      extractIPsFromDetection(detection, options);
      expect(options[0]?.queryTemplate).toBeDefined();
      expect(options[0]?.queryTemplate).toContain('8.8.8.8');
    });

    it('should handle non-string IP values', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          external_ip: 123, // Not a string
          local_ip: null,
        },
      };

      extractIPsFromDetection(detection, options);
      expect(options).toHaveLength(0);
    });

    it('should handle invalid IP strings', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          external_ip: '256.1.1.1',
          local_ip: 'not-an-ip',
        },
      };

      extractIPsFromDetection(detection, options);
      expect(options).toHaveLength(0);
    });

    it('should handle device as non-object', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: 'not-an-object',
      };

      extractIPsFromDetection(detection, options);
      expect(options).toHaveLength(0);
    });

    it('should append to existing options array', () => {
      const options: ContextOption[] = [
        { value: 'existing', displayName: 'existing', type: 'domain', queryTemplate: '' },
      ];
      const detection = {
        device: {
          external_ip: '8.8.8.8',
        },
      };

      extractIPsFromDetection(detection, options);

      expect(options).toHaveLength(2);
      expect(options[0]?.value).toBe('existing');
      expect(options[1]?.value).toBe('8.8.8.8');
    });

    it('should handle detection with only loopback', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          external_ip: '127.0.0.1',
        },
      };

      extractIPsFromDetection(detection, options);
      expect(options).toHaveLength(0);
    });

    it('should handle detection with only link-local', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          external_ip: '169.254.1.1',
        },
      };

      extractIPsFromDetection(detection, options);
      expect(options).toHaveLength(0);
    });
  });
});
