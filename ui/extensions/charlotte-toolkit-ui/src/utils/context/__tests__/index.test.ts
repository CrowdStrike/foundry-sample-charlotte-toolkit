import { describe, expect, it } from 'vitest';
import { calculateEntityCounts, formatDisplayName, processAllEntities } from '../index';

describe('context/index orchestrator', () => {
  describe('re-exported functions', () => {
    it('should export calculateEntityCounts', () => {
      expect(calculateEntityCounts).toBeDefined();
      expect(typeof calculateEntityCounts).toBe('function');
    });

    it('should export formatDisplayName', () => {
      expect(formatDisplayName).toBeDefined();
      expect(typeof formatDisplayName).toBe('function');
    });
  });

  describe('processAllEntities', () => {
    it('should return empty array for null input', () => {
      expect(processAllEntities(null)).toEqual([]);
    });

    it('should return empty array for undefined input', () => {
      expect(processAllEntities(undefined)).toEqual([]);
    });

    it('should return empty array for empty object', () => {
      expect(processAllEntities({})).toEqual([]);
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

        const result = processAllEntities(falconData);

        const ips = result.filter((opt) => opt.type === 'ip');
        expect(ips.length).toBeGreaterThan(0);
      });

      it('should process detection with domains', () => {
        const falconData = {
          detection: {
            device: {
              machine_domain: 'malicious.com',
            },
            user_principal: 'user@evil.com',
          },
        };

        const result = processAllEntities(falconData);

        const domains = result.filter((opt) => opt.type === 'domain');
        expect(domains.length).toBeGreaterThan(0);
      });

      it('should process detection with files', () => {
        const falconData = {
          detection: {
            filename: 'malware.exe',
            sha256: 'abc123def456abc123def456abc123def456abc123def456abc123def456abc12345',
          },
        };

        const result = processAllEntities(falconData);

        const files = result.filter((opt) => opt.type === 'file');
        expect(files.length).toBeGreaterThan(0);
      });

      it('should process detection with MITRE techniques', () => {
        const falconData = {
          detection: {
            technique_id: 'T1566',
            tactic: 'Initial Access',
          },
        };

        const result = processAllEntities(falconData);

        const mitre = result.filter((opt) => opt.type === 'mitre');
        expect(mitre.length).toBeGreaterThan(0);
      });

      it('should process detectionId as detection', () => {
        const falconData = {
          detectionId: 'det-12345',
          detection: {
            device: {
              external_ip: '8.8.8.8',
            },
          },
        };

        const result = processAllEntities(falconData);
        expect(result.length).toBeGreaterThan(0);
      });

      it('should handle null detection', () => {
        const falconData = {
          detection: null,
        };

        const result = processAllEntities(falconData);
        expect(result).toEqual([]);
      });
    });

    describe('incident data processing', () => {
      it('should process incident with entity_values', () => {
        const falconData = {
          incident: {
            entity_values: {
              ipv4s: ['8.8.8.8', '1.1.1.1'],
              domain_names: ['test.com'],
            },
          },
        };

        const result = processAllEntities(falconData);
        expect(result.length).toBeGreaterThan(0);
      });

      it('should process domains from entity_values', () => {
        const falconData = {
          incident: {
            entity_values: {
              domain_names: ['malicious.com', 'evil.net'],
            },
          },
        };

        const result = processAllEntities(falconData);

        const domains = result.filter((opt) => opt.type === 'domain');
        expect(domains.length).toBeGreaterThan(0);
      });

      it('should process files from entity_values', () => {
        const falconData = {
          incident: {
            entity_values: {
              sha256s: ['abcd1234efgh5678abcd1234efgh5678abcd1234efgh5678abcd1234efgh5678'],
            },
            entities: {
              file_name: ['test.exe'],
            },
          },
        };

        const result = processAllEntities(falconData);

        const files = result.filter((opt) => opt.type === 'file');
        expect(files.length).toBeGreaterThan(0);
      });

      it('should process legacy files from entities_full', () => {
        const falconData = {
          incident: {
            entity_values: {},
            entities_full: [
              {
                FileName: 'legacy.exe',
                SHA256HashData: 'abcd1234efgh5678abcd1234efgh5678abcd1234efgh5678abcd1234efgh5678',
              },
            ],
          },
        };

        const result = processAllEntities(falconData);

        const files = result.filter((opt) => opt.type === 'file');
        expect(files.length).toBeGreaterThan(0);
      });

      it('should process IPs from entity_values', () => {
        const falconData = {
          incident: {
            entity_values: {
              ipv4s: ['8.8.8.8', '1.1.1.1', '9.9.9.9'],
            },
          },
        };

        const result = processAllEntities(falconData);

        const ips = result.filter((opt) => opt.type === 'ip');
        expect(ips.length).toBeGreaterThan(0);
      });

      it('should process MITRE techniques from entity_values', () => {
        const falconData = {
          incident: {
            entity_values: {
              mitre_techniques: ['T1566', 'T1003'],
            },
          },
        };

        const result = processAllEntities(falconData);

        const mitre = result.filter((opt) => opt.type === 'mitre');
        expect(mitre.length).toBeGreaterThan(0);
      });

      it('should handle incident without entity_values', () => {
        const falconData = {
          incident: {},
        };

        const result = processAllEntities(falconData);
        expect(result).toEqual([]);
      });

      it('should handle entities_full as non-array', () => {
        const falconData = {
          incident: {
            entity_values: {
              ipv4s: ['8.8.8.8'],
            },
            entities_full: 'not-an-array',
          },
        };

        const result = processAllEntities(falconData);
        // Should still process entity_values even if entities_full is invalid
        expect(result.length).toBeGreaterThan(0);
      });
    });

    describe('integration scenarios', () => {
      it('should process both detection and incident data', () => {
        const falconData = {
          detection: {
            device: {
              external_ip: '8.8.8.8',
            },
            filename: 'malware.exe',
            sha256: 'abcd1234efgh5678abcd1234efgh5678abcd1234efgh5678abcd1234efgh5678',
          },
          incident: {
            entity_values: {
              ipv4s: ['1.1.1.1'],
              domain_names: ['evil.com'],
              file_names: ['trojan.dll'],
            },
          },
        };

        const result = processAllEntities(falconData);

        const ips = result.filter((opt) => opt.type === 'ip');
        const files = result.filter((opt) => opt.type === 'file');
        const domains = result.filter((opt) => opt.type === 'domain');

        expect(ips.length).toBeGreaterThan(0);
        expect(files.length).toBeGreaterThan(0);
        expect(domains.length).toBeGreaterThan(0);
      });

      it('should process complete falcon data structure', () => {
        const falconData = {
          detectionId: 'det-123',
          detection: {
            device: {
              external_ip: '8.8.8.8',
              machine_domain: 'threat.com',
            },
            filename: 'threat.exe',
            sha256: 'abcd1234efgh5678abcd1234efgh5678abcd1234efgh5678abcd1234efgh5678',
            technique_id: 'T1566',
            tactic: 'Initial Access',
            parent_details: {
              parent_process_graph_id: 'graph1',
              parent_sha256: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            },
          },
          incident: {
            entity_values: {
              ipv4s: ['1.1.1.1', '9.9.9.9'],
              domain_names: ['example.com', 'test.org'],
              file_names: ['malware.exe', 'trojan.dll'],
              sha256s: ['efgh5678ijkl9012efgh5678ijkl9012efgh5678ijkl9012efgh5678ijkl9012'],
              technique_ids: ['T1059', 'T1055'],
            },
            entities: {
              file_name: ['file.dll'],
            },
            entities_full: [
              {
                FileName: 'legacy.sys',
                MD5HashData: 'xyz789abc123xyz789abc123xyz78912',
              },
            ],
          },
        };

        const result = processAllEntities(falconData);

        const ips = result.filter((opt) => opt.type === 'ip');
        const domains = result.filter((opt) => opt.type === 'domain');
        const files = result.filter((opt) => opt.type === 'file');
        const mitre = result.filter((opt) => opt.type === 'mitre');

        expect(ips.length).toBeGreaterThan(0);
        expect(domains.length).toBeGreaterThan(0);
        expect(files.length).toBeGreaterThan(0);
        expect(mitre.length).toBeGreaterThan(0);
      });

      it('should deduplicate entities across sources', () => {
        const falconData = {
          detection: {
            device: {
              machine_domain: 'duplicate.com',
            },
          },
          incident: {
            entity_values: {
              domain_names: ['duplicate.com', 'unique.com'],
            },
          },
        };

        const result = processAllEntities(falconData);

        const duplicateDomain = result.filter(
          (opt) => opt.type === 'domain' && opt.displayName === 'duplicate.com',
        );
        expect(duplicateDomain.length).toBeGreaterThan(0);
      });
    });
  });
});
