import * as contextExports from '../index';

describe('utils/context/index', () => {
  it('should export the main processing function', () => {
    expect(contextExports.processAllEntities).toBeDefined();
    expect(typeof contextExports.processAllEntities).toBe('function');
  });

  it('should export individual processors', () => {
    expect(contextExports.processDomains).toBeDefined();
    expect(contextExports.extractDomainsFromDetection).toBeDefined();
    expect(contextExports.processFiles).toBeDefined();
    expect(contextExports.processLegacyFiles).toBeDefined();
    expect(contextExports.extractFilesFromDetection).toBeDefined();
    expect(contextExports.processIPs).toBeDefined();
    expect(contextExports.extractIPsFromDetection).toBeDefined();
    expect(contextExports.processMITRETechniques).toBeDefined();
    expect(contextExports.extractMITREFromDetection).toBeDefined();
  });

  it('should export helper functions', () => {
    expect(contextExports.truncateHash).toBeDefined();
    expect(contextExports.extractTopLevelDomain).toBeDefined();
    expect(contextExports.truncateDomain).toBeDefined();
    expect(contextExports.isDomainTruncated).toBeDefined();
    expect(contextExports.formatDisplayName).toBeDefined();
    expect(contextExports.isPublicIP).toBeDefined();
    expect(contextExports.isExternalFQDN).toBeDefined();
    expect(contextExports.calculateEntityCounts).toBeDefined();
  });

  it('should have default export as processAllEntities', () => {
    expect(contextExports.default).toBeDefined();
    expect(contextExports.default).toBe(contextExports.processAllEntities);
  });

  it('should process empty falcon data', () => {
    const result = contextExports.processAllEntities(null);
    expect(result).toEqual([]);
  });

  it('should process falcon data with detection', () => {
    const mockFalconData = {
      detection: {
        host_info: {
          domain: 'test.com'
        }
      }
    };
    
    const result = contextExports.processAllEntities(mockFalconData);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should process falcon data with incident', () => {
    const mockFalconData = {
      incident: {
        entity_values: {
          domain: ['example.com']
        }
      }
    };
    
    const result = contextExports.processAllEntities(mockFalconData);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle falcon data with both detection and incident', () => {
    const mockFalconData = {
      detection: {
        host_info: {
          domain: 'test.com'
        }
      },
      incident: {
        entity_values: {
          domain: ['example.com']
        }
      }
    };
    
    const result = contextExports.processAllEntities(mockFalconData);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle falcon data with detectionId', () => {
    const mockFalconData = {
      detectionId: 'det_123'
    };
    
    const result = contextExports.processAllEntities(mockFalconData);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should have proper function signatures', () => {
    expect(typeof contextExports.processDomains).toBe('function');
    expect(typeof contextExports.processFiles).toBe('function');
    expect(typeof contextExports.processIPs).toBe('function');
    expect(typeof contextExports.processMITRETechniques).toBe('function');
  });
});