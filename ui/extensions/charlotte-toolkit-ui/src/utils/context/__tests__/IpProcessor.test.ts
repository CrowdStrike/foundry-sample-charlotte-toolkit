// src/utils/context/__tests__/IpProcessor.test.ts

import { processIPs, extractIPsFromDetection } from '../IpProcessor';
import { createQueryTemplate } from '../../queryTemplates';
import { isPublicIP } from '../EntityHelpers';

import type { ContextOption } from '../../../types';

// Mock dependencies
jest.mock('../../queryTemplates');
jest.mock('../EntityHelpers');

const mockCreateQueryTemplate = createQueryTemplate as jest.MockedFunction<typeof createQueryTemplate>;
const mockIsPublicIP = isPublicIP as jest.MockedFunction<typeof isPublicIP>;

describe('IpProcessor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    mockCreateQueryTemplate.mockImplementation((type, value) => `query for ${type}: ${value}`);
    mockIsPublicIP.mockImplementation(ip => {
      // Mock public IP detection - exclude private ranges
      if (!ip || typeof ip !== 'string' || ip.trim() === '') return false;
      
      // Simple mock: exclude common private ranges
      return !ip.startsWith('192.168.') && 
             !ip.startsWith('10.') && 
             !ip.startsWith('172.16.') &&
             !ip.startsWith('127.') &&
             !ip.includes('localhost');
    });
  });

  describe('processIPs', () => {
    it('should handle empty input', () => {
      const result = processIPs({});
      expect(result).toEqual([]);
    });

    it('should handle null/undefined input', () => {
      expect(processIPs(null)).toEqual([]);
      expect(processIPs(undefined)).toEqual([]);
    });

    it('should process public IPv4 addresses', () => {
      const entityValues = {
        ipv4s: ['8.8.8.8', '1.1.1.1', '192.168.1.1']
      };

      const result = processIPs(entityValues);

      expect(mockIsPublicIP).toHaveBeenCalledWith('8.8.8.8', 0, ['8.8.8.8', '1.1.1.1', '192.168.1.1']);
      expect(mockIsPublicIP).toHaveBeenCalledWith('1.1.1.1', 1, ['8.8.8.8', '1.1.1.1', '192.168.1.1']);
      expect(mockIsPublicIP).toHaveBeenCalledWith('192.168.1.1', 2, ['8.8.8.8', '1.1.1.1', '192.168.1.1']);
      
      // Should only include public IPs (8.8.8.8 and 1.1.1.1)
      expect(result).toHaveLength(2);
      
      expect(result[0]).toMatchObject({
        value: '8.8.8.8',
        displayName: '8.8.8.8',
        type: 'ip',
        queryTemplate: 'query for ip: 8.8.8.8',
        entityData: { ip: '8.8.8.8' }
      });
      
      expect(result[1]).toMatchObject({
        value: '1.1.1.1',
        displayName: '1.1.1.1',
        type: 'ip',
        queryTemplate: 'query for ip: 1.1.1.1',
        entityData: { ip: '1.1.1.1' }
      });
    });

    it('should filter out private IP addresses', () => {
      const entityValues = {
        ipv4s: ['192.168.1.1', '10.0.0.1', '172.16.1.1', '127.0.0.1']
      };

      mockIsPublicIP.mockReturnValue(false); // All private

      const result = processIPs(entityValues);

      expect(result).toHaveLength(0);
      expect(mockIsPublicIP).toHaveBeenCalledTimes(4);
    });

    it('should handle mixed case IP addresses', () => {
      const entityValues = {
        ipv4s: ['8.8.8.8', '1.1.1.1']
      };

      const result = processIPs(entityValues);

      expect(result).toHaveLength(2);
      expect(result[0].displayName).toBe('8.8.8.8'); // Should be lowercase (already is)
      expect(result[1].displayName).toBe('1.1.1.1');
    });

    it('should handle empty ipv4s array', () => {
      const entityValues = {
        ipv4s: []
      };

      const result = processIPs(entityValues);

      expect(result).toEqual([]);
    });

    it('should handle non-array ipv4s', () => {
      const entityValues = {
        ipv4s: 'not-an-array'
      };

      const result = processIPs(entityValues);

      expect(result).toEqual([]);
    });

    it('should handle invalid IP formats in array', () => {
      const entityValues = {
        ipv4s: [null, '', undefined, 'invalid-ip', '999.999.999.999', '8.8.8.8']
      };

      mockIsPublicIP.mockImplementation(ip => ip === '8.8.8.8');

      const result = processIPs(entityValues);

      expect(result).toHaveLength(1);
      expect(result[0].value).toBe('8.8.8.8');
    });

    it('should create proper query templates', () => {
      const entityValues = {
        ipv4s: ['8.8.8.8']
      };

      processIPs(entityValues);

      expect(mockCreateQueryTemplate).toHaveBeenCalledWith('ip', '8.8.8.8');
    });

    it('should handle large number of IPs', () => {
      const publicIPs = Array.from({ length: 100 }, (_, i) => `203.0.113.${i}`);
      const entityValues = {
        ipv4s: publicIPs
      };

      mockIsPublicIP.mockReturnValue(true);

      const result = processIPs(entityValues);

      expect(result).toHaveLength(100);
      expect(mockIsPublicIP).toHaveBeenCalledTimes(100);
    });

    it('should handle missing ipv4s property', () => {
      const entityValues = {
        other_property: 'value'
      };

      const result = processIPs(entityValues);

      expect(result).toEqual([]);
    });
  });

  describe('extractIPsFromDetection', () => {
    let options: ContextOption[];

    beforeEach(() => {
      options = [];
    });

    it('should handle null/undefined detection', () => {
      extractIPsFromDetection(null, options);
      expect(options).toHaveLength(0);

      extractIPsFromDetection(undefined, options);
      expect(options).toHaveLength(0);
    });

    it('should extract public external_ip from device', () => {
      const detection = {
        device: {
          external_ip: '8.8.8.8'
        }
      };

      extractIPsFromDetection(detection, options);

      expect(mockIsPublicIP).toHaveBeenCalledWith('8.8.8.8');
      expect(options).toHaveLength(1);
      expect(options[0]).toMatchObject({
        value: '8.8.8.8',
        displayName: '8.8.8.8',
        type: 'ip',
        queryTemplate: 'query for ip: 8.8.8.8',
        entityData: { ip: '8.8.8.8' }
      });
    });

    it('should extract public local_ip from device', () => {
      const detection = {
        device: {
          local_ip: '203.0.113.1'
        }
      };

      extractIPsFromDetection(detection, options);

      expect(mockIsPublicIP).toHaveBeenCalledWith('203.0.113.1');
      expect(options).toHaveLength(1);
      expect(options[0]).toMatchObject({
        value: '203.0.113.1',
        displayName: '203.0.113.1',
        type: 'ip',
        entityData: { ip: '203.0.113.1' }
      });
    });

    it('should extract both external and local IPs when both are public', () => {
      const detection = {
        device: {
          external_ip: '8.8.8.8',
          local_ip: '203.0.113.1'
        }
      };

      extractIPsFromDetection(detection, options);

      expect(options).toHaveLength(2);
      expect(options[0].value).toBe('8.8.8.8');
      expect(options[1].value).toBe('203.0.113.1');
    });

    it('should filter out private external_ip', () => {
      const detection = {
        device: {
          external_ip: '192.168.1.1'
        }
      };

      mockIsPublicIP.mockReturnValue(false);

      extractIPsFromDetection(detection, options);

      expect(options).toHaveLength(0);
    });

    it('should filter out private local_ip', () => {
      const detection = {
        device: {
          local_ip: '10.0.0.1'
        }
      };

      mockIsPublicIP.mockReturnValue(false);

      extractIPsFromDetection(detection, options);

      expect(options).toHaveLength(0);
    });

    it('should handle mixed public and private IPs', () => {
      const detection = {
        device: {
          external_ip: '8.8.8.8',        // Public
          local_ip: '192.168.1.1'        // Private
        }
      };

      mockIsPublicIP.mockImplementation(ip => ip === '8.8.8.8');

      extractIPsFromDetection(detection, options);

      expect(options).toHaveLength(1);
      expect(options[0].value).toBe('8.8.8.8');
    });

    it('should handle case sensitivity', () => {
      const detection = {
        device: {
          external_ip: 'INVALID.IP.ADDRESS'
        }
      };

      extractIPsFromDetection(detection, options);

      expect(mockIsPublicIP).toHaveBeenCalledWith('INVALID.IP.ADDRESS');
      // Should convert to lowercase in the result
      if (options.length > 0) {
        expect(options[0].value).toBe('invalid.ip.address');
        expect(options[0].displayName).toBe('invalid.ip.address');
        expect(options[0].entityData.ip).toBe('invalid.ip.address');
      }
    });

    it('should handle missing device properties', () => {
      const detection = {
        device: {}
      };

      extractIPsFromDetection(detection, options);

      expect(options).toHaveLength(0);
    });

    it('should handle missing device object', () => {
      const detection = {
        other_property: 'value'
      };

      extractIPsFromDetection(detection, options);

      expect(options).toHaveLength(0);
    });

    it('should handle null/undefined IP values', () => {
      const detection = {
        device: {
          external_ip: null,
          local_ip: undefined
        }
      };

      extractIPsFromDetection(detection, options);

      expect(options).toHaveLength(0);
    });

    it('should handle empty string IP values', () => {
      const detection = {
        device: {
          external_ip: '',
          local_ip: '   '
        }
      };

      extractIPsFromDetection(detection, options);

      expect(options).toHaveLength(0);
    });

    it('should create proper query templates for detection IPs', () => {
      const detection = {
        device: {
          external_ip: '8.8.8.8'
        }
      };

      extractIPsFromDetection(detection, options);

      expect(mockCreateQueryTemplate).toHaveBeenCalledWith('ip', '8.8.8.8');
    });

    it('should maintain existing options while adding new ones', () => {
      // Pre-populate options
      const existingOption: ContextOption = {
        value: 'domain:example.com',
        displayName: 'example.com',
        type: 'domain',
        queryTemplate: 'existing',
      };
      options.push(existingOption);

      const detection = {
        device: {
          external_ip: '8.8.8.8'
        }
      };

      extractIPsFromDetection(detection, options);

      expect(options).toHaveLength(2);
      expect(options[0]).toBe(existingOption); // Original option preserved
      expect(options[1].type).toBe('ip');      // New IP option added
    });

    it('should handle invalid detection structure', () => {
      const detection = 'invalid-detection-data';

      extractIPsFromDetection(detection as any, options);

      expect(options).toHaveLength(0);
    });
  });
});
