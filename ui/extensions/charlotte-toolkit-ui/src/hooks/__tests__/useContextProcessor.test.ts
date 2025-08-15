// src/hooks/__tests__/useContextProcessor.test.ts

import { renderHook } from '@testing-library/react';
import { useContextProcessor } from '../useContextProcessor';
import { ContextOption } from '../../types';

// Mock the context utilities
jest.mock('../../utils/context', () => ({
  processAllEntities: jest.fn(),
  calculateEntityCounts: jest.fn(),
}));

import { processAllEntities, calculateEntityCounts } from '../../utils/context';

const mockProcessAllEntities = processAllEntities as jest.MockedFunction<typeof processAllEntities>;
const mockCalculateEntityCounts = calculateEntityCounts as jest.MockedFunction<typeof calculateEntityCounts>;

describe('useContextProcessor', () => {
  const mockContextOptions: ContextOption[] = [
    {
      value: 'example.com',
      displayName: 'example.com',
      type: 'domain',
      subType: 'fqdn',
      queryTemplate: 'domain analysis for {value}',
      entityData: { domain: 'example.com' }
    },
    {
      value: '192.168.1.1',
      displayName: '192.168.1.1',
      type: 'ip',
      queryTemplate: 'IP analysis for {value}',
      entityData: { ip: '192.168.1.1' }
    },
    {
      value: 'malware.exe',
      displayName: 'malware.exe',
      type: 'file',
      subType: 'filename',
      queryTemplate: 'file analysis for {value}',
      entityData: { filename: 'malware.exe' }
    }
  ];

  const mockContextCounts = {
    total: 3,
    domains: 1,
    files: 1,
    ips: 1,
    mitres: 0
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockProcessAllEntities.mockReturnValue(mockContextOptions);
    mockCalculateEntityCounts.mockReturnValue(mockContextCounts);
  });

  describe('Basic Functionality', () => {
    it('should process falcon data and return context options and counts', () => {
      const falconData = {
        incident: {
          id: 'inc123',
          name: 'Test Incident',
          description: 'Test incident with entities'
        }
      };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      expect(result.current.availableContextOptions).toEqual(mockContextOptions);
      expect(result.current.contextCounts).toEqual(mockContextCounts);
      
      expect(mockProcessAllEntities).toHaveBeenCalledWith(falconData);
      expect(mockCalculateEntityCounts).toHaveBeenCalledWith(mockContextOptions);
    });

    it('should handle detection data', () => {
      const falconData = {
        detection: {
          id: 'det456',
          name: 'Test Detection',
          severity: 'high'
        }
      };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      expect(result.current.availableContextOptions).toEqual(mockContextOptions);
      expect(result.current.contextCounts).toEqual(mockContextCounts);
      
      expect(mockProcessAllEntities).toHaveBeenCalledWith(falconData);
    });

    it('should handle complex falcon data with multiple entities', () => {
      const complexFalconData = {
        incident: {
          id: 'inc123',
          name: 'Complex Incident'
        },
        detection: {
          id: 'det456',
          name: 'Complex Detection'
        },
        host: {
          id: 'host789',
          hostname: 'test-host',
          platform: 'Windows'
        }
      };

      const complexOptions: ContextOption[] = [
        ...mockContextOptions,
        {
          value: 'T1055',
          displayName: 'Process Injection',
          type: 'mitre',
          subType: 'technique',
          queryTemplate: 'MITRE analysis for {value}',
          entityData: { technique: 'T1055' }
        }
      ];

      const complexCounts = {
        total: 4,
        domains: 1,
        files: 1,
        ips: 1,
        mitres: 1
      };

      mockProcessAllEntities.mockReturnValue(complexOptions);
      mockCalculateEntityCounts.mockReturnValue(complexCounts);

      const { result } = renderHook(() => useContextProcessor({ falconData: complexFalconData }));

      expect(result.current.availableContextOptions).toEqual(complexOptions);
      expect(result.current.contextCounts).toEqual(complexCounts);
    });

    it('should return empty results for empty falcon data', () => {
      const emptyOptions: ContextOption[] = [];
      const emptyCounts = {
        total: 0,
        domains: 0,
        files: 0,
        ips: 0,
        mitres: 0
      };

      mockProcessAllEntities.mockReturnValue(emptyOptions);
      mockCalculateEntityCounts.mockReturnValue(emptyCounts);

      const { result } = renderHook(() => useContextProcessor({ falconData: {} }));

      expect(result.current.availableContextOptions).toEqual([]);
      expect(result.current.contextCounts).toEqual(emptyCounts);
    });
  });

  describe('Memoization Behavior', () => {
    it('should memoize context options based on falconData', () => {
      const falconData = {
        incident: { id: 'inc123', name: 'Test' }
      };

      const { result, rerender } = renderHook(
        ({ falconData }) => useContextProcessor({ falconData }),
        { initialProps: { falconData } }
      );

      const initialOptions = result.current.availableContextOptions;
      const initialCounts = result.current.contextCounts;

      // Rerender with same data
      rerender({ falconData });

      // Should be the same references (memoized)
      expect(result.current.availableContextOptions).toBe(initialOptions);
      expect(result.current.contextCounts).toBe(initialCounts);

      // Should only call processing functions once
      expect(mockProcessAllEntities).toHaveBeenCalledTimes(1);
      expect(mockCalculateEntityCounts).toHaveBeenCalledTimes(1);
    });

    it('should recalculate when falconData changes', () => {
      const initialData = {
        incident: { id: 'inc123', name: 'Test 1' }
      };

      const updatedData = {
        incident: { id: 'inc456', name: 'Test 2' }
      };

      const { result, rerender } = renderHook(
        ({ falconData }) => useContextProcessor({ falconData }),
        { initialProps: { falconData: initialData } }
      );

      const initialOptions = result.current.availableContextOptions;

      // Change the falconData
      rerender({ falconData: updatedData });

      // Should recalculate
      expect(mockProcessAllEntities).toHaveBeenCalledTimes(2);
      expect(mockProcessAllEntities).toHaveBeenNthCalledWith(1, initialData);
      expect(mockProcessAllEntities).toHaveBeenNthCalledWith(2, updatedData);
    });

    it('should memoize counts based on available options', () => {
      const falconData = {
        incident: { id: 'inc123', name: 'Test' }
      };

      const { result, rerender } = renderHook(() => useContextProcessor({ falconData }));

      const initialCounts = result.current.contextCounts;

      // Multiple rerenders with same options should use memoized counts
      rerender();
      rerender();

      expect(result.current.contextCounts).toBe(initialCounts);
      expect(mockCalculateEntityCounts).toHaveBeenCalledTimes(1);
    });

    it('should recalculate counts when options change', () => {
      const falconData1 = { incident: { id: 'inc1' } };
      const falconData2 = { incident: { id: 'inc2' } };

      const options1 = [mockContextOptions[0]];
      const options2 = [...mockContextOptions];

      mockProcessAllEntities
        .mockReturnValueOnce(options1)
        .mockReturnValueOnce(options2);

      const counts1 = { total: 1, domains: 1, files: 0, ips: 0, mitres: 0 };
      const counts2 = { total: 3, domains: 1, files: 1, ips: 1, mitres: 0 };

      mockCalculateEntityCounts
        .mockReturnValueOnce(counts1)
        .mockReturnValueOnce(counts2);

      const { result, rerender } = renderHook(
        ({ falconData }) => useContextProcessor({ falconData }),
        { initialProps: { falconData: falconData1 } }
      );

      expect(result.current.contextCounts).toEqual(counts1);

      rerender({ falconData: falconData2 });

      expect(result.current.contextCounts).toEqual(counts2);
      expect(mockCalculateEntityCounts).toHaveBeenCalledTimes(2);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null falconData', () => {
      const emptyOptions: ContextOption[] = [];
      const emptyCounts = {
        total: 0,
        domains: 0,
        files: 0,
        ips: 0,
        mitres: 0
      };

      mockProcessAllEntities.mockReturnValue(emptyOptions);
      mockCalculateEntityCounts.mockReturnValue(emptyCounts);

      const { result } = renderHook(() => useContextProcessor({ falconData: null }));

      expect(result.current.availableContextOptions).toEqual([]);
      expect(result.current.contextCounts).toEqual(emptyCounts);
      expect(mockProcessAllEntities).toHaveBeenCalledWith(null);
    });

    it('should handle undefined falconData', () => {
      const emptyOptions: ContextOption[] = [];
      const emptyCounts = {
        total: 0,
        domains: 0,
        files: 0,
        ips: 0,
        mitres: 0
      };

      mockProcessAllEntities.mockReturnValue(emptyOptions);
      mockCalculateEntityCounts.mockReturnValue(emptyCounts);

      const { result } = renderHook(() => useContextProcessor({ falconData: undefined }));

      expect(result.current.availableContextOptions).toEqual([]);
      expect(result.current.contextCounts).toEqual(emptyCounts);
      expect(mockProcessAllEntities).toHaveBeenCalledWith(undefined);
    });

    it('should handle malformed falconData', () => {
      const malformedData = {
        invalid: 'structure',
        nested: {
          deeply: {
            invalid: true
          }
        }
      };

      const emptyOptions: ContextOption[] = [];
      const emptyCounts = {
        total: 0,
        domains: 0,
        files: 0,
        ips: 0,
        mitres: 0
      };

      mockProcessAllEntities.mockReturnValue(emptyOptions);
      mockCalculateEntityCounts.mockReturnValue(emptyCounts);

      const { result } = renderHook(() => useContextProcessor({ falconData: malformedData }));

      expect(result.current.availableContextOptions).toEqual([]);
      expect(result.current.contextCounts).toEqual(emptyCounts);
      expect(mockProcessAllEntities).toHaveBeenCalledWith(malformedData);
    });

    it('should handle utility function errors gracefully', () => {
      const falconData = { incident: { id: 'test' } };

      // Mock processAllEntities to throw
      mockProcessAllEntities.mockImplementation(() => {
        throw new Error('Processing failed');
      });

      expect(() => {
        renderHook(() => useContextProcessor({ falconData }));
      }).toThrow('Processing failed');
    });

    it('should handle count calculation errors gracefully', () => {
      const falconData = { incident: { id: 'test' } };

      mockProcessAllEntities.mockReturnValue(mockContextOptions);
      mockCalculateEntityCounts.mockImplementation(() => {
        throw new Error('Count calculation failed');
      });

      expect(() => {
        renderHook(() => useContextProcessor({ falconData }));
      }).toThrow('Count calculation failed');
    });

    it('should handle very large datasets', () => {
      const largeFalconData = {
        incident: { id: 'large-test' },
        entities: Array.from({ length: 1000 }, (_, i) => ({ id: `entity-${i}` }))
      };

      const largeOptions: ContextOption[] = Array.from({ length: 1000 }, (_, i) => ({
        value: `entity-${i}`,
        displayName: `Entity ${i}`,
        type: 'domain' as const,
        queryTemplate: `Query for entity-${i}`,
        entityData: { id: `entity-${i}` }
      }));

      const largeCounts = {
        total: 1000,
        domains: 1000,
        files: 0,
        ips: 0,
        mitres: 0
      };

      mockProcessAllEntities.mockReturnValue(largeOptions);
      mockCalculateEntityCounts.mockReturnValue(largeCounts);

      const { result } = renderHook(() => useContextProcessor({ falconData: largeFalconData }));

      expect(result.current.availableContextOptions).toHaveLength(1000);
      expect(result.current.contextCounts.total).toBe(1000);
    });
  });

  describe('Integration Scenarios', () => {
    it('should work with real-world incident data structure', () => {
      const realWorldData = {
        incident: {
          id: 'inc_2b7d4c89e4b642d6a123456789abcdef',
          name: 'Suspicious PowerShell Activity',
          description: 'Detected suspicious PowerShell execution',
          status: 'New',
          severity: 3,
          created_date: '2024-01-15T10:30:00Z',
          modified_date: '2024-01-15T10:35:00Z'
        },
        host: {
          id: 'host_123456789abcdef',
          hostname: 'DESKTOP-ABC123',
          platform: 'Windows',
          os_version: '10.0.19041'
        }
      };

      const realWorldOptions: ContextOption[] = [
        {
          value: 'DESKTOP-ABC123',
          displayName: 'DESKTOP-ABC123 (Host)',
          type: 'domain',
          subType: 'fqdn',
          queryTemplate: 'host analysis for {value}',
          entityData: { hostname: 'DESKTOP-ABC123' }
        }
      ];

      const realWorldCounts = {
        total: 1,
        domains: 1,
        files: 0,
        ips: 0,
        mitres: 0
      };

      mockProcessAllEntities.mockReturnValue(realWorldOptions);
      mockCalculateEntityCounts.mockReturnValue(realWorldCounts);

      const { result } = renderHook(() => useContextProcessor({ falconData: realWorldData }));

      expect(result.current.availableContextOptions).toEqual(realWorldOptions);
      expect(result.current.contextCounts).toEqual(realWorldCounts);
      expect(mockProcessAllEntities).toHaveBeenCalledWith(realWorldData);
    });

    it('should work with detection data structure', () => {
      const detectionData = {
        detection: {
          id: 'det_3c8e5d90f5c753e7b234567890bcdefg',
          name: 'Malware Detected',
          description: 'Malicious file detected',
          severity: 'high',
          created_date: '2024-01-15T11:00:00Z'
        }
      };

      const detectionOptions: ContextOption[] = [
        {
          value: 'malware.exe',
          displayName: 'malware.exe',
          type: 'file',
          subType: 'filename',
          queryTemplate: 'file analysis for {value}',
          entityData: { filename: 'malware.exe', hash: 'abc123' }
        }
      ];

      const detectionCounts = {
        total: 1,
        domains: 0,
        files: 1,
        ips: 0,
        mitres: 0
      };

      mockProcessAllEntities.mockReturnValue(detectionOptions);
      mockCalculateEntityCounts.mockReturnValue(detectionCounts);

      const { result } = renderHook(() => useContextProcessor({ falconData: detectionData }));

      expect(result.current.availableContextOptions).toEqual(detectionOptions);
      expect(result.current.contextCounts).toEqual(detectionCounts);
    });

    it('should handle mixed entity types correctly', () => {
      const mixedData = {
        incident: { id: 'inc123' },
        detection: { id: 'det456' }
      };

      const mixedOptions: ContextOption[] = [
        {
          value: 'evil.com',
          displayName: 'evil.com',
          type: 'domain',
          subType: 'fqdn',
          queryTemplate: 'domain analysis for {value}',
          entityData: { domain: 'evil.com' }
        },
        {
          value: 'virus.exe',
          displayName: 'virus.exe',
          type: 'file',
          subType: 'filename',
          queryTemplate: 'file analysis for {value}',
          entityData: { filename: 'virus.exe' }
        },
        {
          value: '10.0.0.1',
          displayName: '10.0.0.1',
          type: 'ip',
          queryTemplate: 'IP analysis for {value}',
          entityData: { ip: '10.0.0.1' }
        },
        {
          value: 'T1059',
          displayName: 'Command and Scripting Interpreter',
          type: 'mitre',
          subType: 'technique',
          queryTemplate: 'MITRE analysis for {value}',
          entityData: { technique: 'T1059' }
        }
      ];

      const mixedCounts = {
        total: 4,
        domains: 1,
        files: 1,
        ips: 1,
        mitres: 1
      };

      mockProcessAllEntities.mockReturnValue(mixedOptions);
      mockCalculateEntityCounts.mockReturnValue(mixedCounts);

      const { result } = renderHook(() => useContextProcessor({ falconData: mixedData }));

      expect(result.current.availableContextOptions).toEqual(mixedOptions);
      expect(result.current.contextCounts).toEqual(mixedCounts);
    });
  });

  describe('Performance Considerations', () => {
    it('should not recalculate on rapid re-renders with same data', () => {
      const falconData = { incident: { id: 'test' } };

      const { result, rerender } = renderHook(() => useContextProcessor({ falconData }));

      const initialOptions = result.current.availableContextOptions;
      const initialCounts = result.current.contextCounts;

      // Rapid re-renders
      for (let i = 0; i < 10; i++) {
        rerender();
      }

      // Should still be the same memoized values
      expect(result.current.availableContextOptions).toBe(initialOptions);
      expect(result.current.contextCounts).toBe(initialCounts);

      // Should only call utility functions once
      expect(mockProcessAllEntities).toHaveBeenCalledTimes(1);
      expect(mockCalculateEntityCounts).toHaveBeenCalledTimes(1);
    });

    it('should handle frequent data changes efficiently', () => {
      // Create different option arrays for each call to trigger count recalculation
      const optionsArrays = Array.from({ length: 5 }, (_, i) => [
        {
          value: `entity-${i}`,
          displayName: `Entity ${i}`,
          type: 'domain' as const,
          queryTemplate: `Query for entity-${i}`,
          entityData: { id: `entity-${i}` }
        }
      ]);

      // Mock to return different arrays each time
      mockProcessAllEntities
        .mockReturnValueOnce(optionsArrays[0])
        .mockReturnValueOnce(optionsArrays[1])
        .mockReturnValueOnce(optionsArrays[2])
        .mockReturnValueOnce(optionsArrays[3])
        .mockReturnValueOnce(optionsArrays[4]);

      const { result, rerender } = renderHook(
        ({ data }) => useContextProcessor({ falconData: data }),
        { initialProps: { data: { incident: { id: '1' } } } }
      );

      // Change data multiple times
      for (let i = 2; i <= 5; i++) {
        rerender({ data: { incident: { id: i.toString() } } });
      }

      // Should call processing function for each unique data set
      expect(mockProcessAllEntities).toHaveBeenCalledTimes(5);
      expect(mockCalculateEntityCounts).toHaveBeenCalledTimes(5);
    });
  });

  describe('Type Safety', () => {
    it('should return correctly typed results', () => {
      const falconData = { incident: { id: 'test' } };

      const { result } = renderHook(() => useContextProcessor({ falconData }));

      // TypeScript should enforce these types
      expect(Array.isArray(result.current.availableContextOptions)).toBe(true);
      expect(typeof result.current.contextCounts).toBe('object');
      expect(typeof result.current.contextCounts.total).toBe('number');
      expect(typeof result.current.contextCounts.domains).toBe('number');
      expect(typeof result.current.contextCounts.files).toBe('number');
      expect(typeof result.current.contextCounts.ips).toBe('number');
      expect(typeof result.current.contextCounts.mitres).toBe('number');
    });

    it('should accept any falconData type', () => {
      // Should accept different data structures without TypeScript errors
      const scenarios = [
        { incident: { id: 'test' } },
        { detection: { id: 'test' } },
        { host: { id: 'test' } },
        { custom: { field: 'value' } },
        null,
        undefined,
        {},
        []
      ];

      scenarios.forEach((falconData, index) => {
        const emptyOptions: ContextOption[] = [];
        const emptyCounts = {
          total: 0,
          domains: 0,
          files: 0,
          ips: 0,
          mitres: 0
        };

        mockProcessAllEntities.mockReturnValue(emptyOptions);
        mockCalculateEntityCounts.mockReturnValue(emptyCounts);

        const { result } = renderHook(() => useContextProcessor({ falconData }));

        expect(result.current.availableContextOptions).toEqual([]);
        expect(result.current.contextCounts).toEqual(emptyCounts);
      });
    });
  });
});
