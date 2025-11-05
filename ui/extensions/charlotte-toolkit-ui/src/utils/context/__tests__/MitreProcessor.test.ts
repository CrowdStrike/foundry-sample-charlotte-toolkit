import { describe, expect, it } from 'vitest';
import type { ContextOption } from '../../../types';
import { extractMITREFromDetection, processMITRETechniques } from '../MitreProcessor';

describe('MitreProcessor', () => {
  describe('extractMITREFromDetection', () => {
    it('should handle null detection', () => {
      const options: ContextOption[] = [];
      extractMITREFromDetection(null, options);
      expect(options).toHaveLength(0);
    });

    it('should handle undefined detection', () => {
      const options: ContextOption[] = [];
      extractMITREFromDetection(undefined, options);
      expect(options).toHaveLength(0);
    });

    it('should handle empty detection object', () => {
      const options: ContextOption[] = [];
      extractMITREFromDetection({}, options);
      expect(options).toHaveLength(0);
    });

    describe('behaviors array processing', () => {
      it('should extract technique from behaviors', () => {
        const options: ContextOption[] = [];
        const detection = {
          behaviors: [{ technique_id: 'T1566' }],
        };

        extractMITREFromDetection(detection, options);

        expect(options).toHaveLength(1);
        expect(options[0]?.displayName).toContain('T1566');
        expect(options[0]?.type).toBe('mitre');
      });

      it('should extract technique with sub-technique', () => {
        const options: ContextOption[] = [];
        const detection = {
          behaviors: [{ technique_id: 'T1003.001' }],
        };

        extractMITREFromDetection(detection, options);
        expect(options).toHaveLength(1);
        expect(options[0]?.displayName).toContain('T1003.001');
      });

      it('should uppercase lowercase technique ID', () => {
        const options: ContextOption[] = [];
        const detection = {
          behaviors: [{ technique_id: 't1566' }],
        };

        extractMITREFromDetection(detection, options);
        expect(options[0]?.displayName).toContain('T1566');
      });

      it('should include technique name if available', () => {
        const options: ContextOption[] = [];
        const detection = {
          behaviors: [
            {
              technique_id: 'T1566',
              technique: 'Phishing',
            },
          ],
        };

        extractMITREFromDetection(detection, options);
        expect(options[0]?.displayName).toContain('Phishing');
      });

      it('should include tactic if available', () => {
        const options: ContextOption[] = [];
        const detection = {
          behaviors: [
            {
              technique_id: 'T1566',
              technique: 'Phishing',
              tactic: 'Initial Access',
            },
          ],
        };

        extractMITREFromDetection(detection, options);
        expect(options[0]?.entityData?.tactic).toBe('Initial Access');
      });

      it('should count multiple occurrences of same technique', () => {
        const options: ContextOption[] = [];
        const detection = {
          behaviors: [{ technique_id: 'T1566' }, { technique_id: 'T1566' }],
        };

        extractMITREFromDetection(detection, options);
        expect(options).toHaveLength(1);
        expect(options[0]?.displayName).toContain('2 occurrences');
      });

      it('should reject invalid technique ID format', () => {
        const options: ContextOption[] = [];
        const detection = {
          behaviors: [
            { technique_id: 'INVALID' },
            { technique_id: 'T12345' },
            { technique_id: 'T123' },
          ],
        };

        extractMITREFromDetection(detection, options);
        expect(options).toHaveLength(0);
      });
    });

    describe('kill_chain array processing', () => {
      it('should extract technique from kill_chain', () => {
        const options: ContextOption[] = [];
        const detection = {
          kill_chain: [{ technique_id: 'T1059' }],
        };

        extractMITREFromDetection(detection, options);
        expect(options).toHaveLength(1);
        expect(options[0]?.displayName).toContain('T1059');
      });

      it('should extract technique_name from kill_chain', () => {
        const options: ContextOption[] = [];
        const detection = {
          kill_chain: [
            {
              technique_id: 'T1059',
              technique_name: 'Command and Scripting Interpreter',
            },
          ],
        };

        extractMITREFromDetection(detection, options);
        expect(options[0]?.displayName).toContain('Command and Scripting Interpreter');
      });

      it('should track kill_chain as source', () => {
        const options: ContextOption[] = [];
        const detection = {
          kill_chain: [{ technique_id: 'T1059' }],
        };

        extractMITREFromDetection(detection, options);
        expect(options[0]?.entityData?.sources).toContain('kill_chain');
      });
    });

    describe('mitre_attack array processing', () => {
      it('should extract technique from mitre_attack', () => {
        const options: ContextOption[] = [];
        const detection = {
          mitre_attack: [{ technique_id: 'T1055' }],
        };

        extractMITREFromDetection(detection, options);
        expect(options).toHaveLength(1);
        expect(options[0]?.displayName).toContain('T1055');
      });

      it('should use "technique" field for name', () => {
        const options: ContextOption[] = [];
        const detection = {
          mitre_attack: [
            {
              technique_id: 'T1055',
              technique: 'Process Injection',
            },
          ],
        };

        extractMITREFromDetection(detection, options);
        expect(options[0]?.displayName).toContain('Process Injection');
      });

      it('should track mitre_attack as source', () => {
        const options: ContextOption[] = [];
        const detection = {
          mitre_attack: [{ technique_id: 'T1055' }],
        };

        extractMITREFromDetection(detection, options);
        expect(options[0]?.entityData?.sources).toContain('mitre_attack');
      });
    });

    describe('detection_fields processing', () => {
      it('should extract from detection.technique_id', () => {
        const options: ContextOption[] = [];
        const detection = {
          technique_id: 'T1071',
        };

        extractMITREFromDetection(detection, options);
        expect(options).toHaveLength(1);
        expect(options[0]?.displayName).toContain('T1071');
      });

      it('should use detection.technique for name', () => {
        const options: ContextOption[] = [];
        const detection = {
          technique_id: 'T1071',
          technique: 'Application Layer Protocol',
        };

        extractMITREFromDetection(detection, options);
        expect(options[0]?.displayName).toContain('Application Layer Protocol');
      });

      it('should use detection.tactic', () => {
        const options: ContextOption[] = [];
        const detection = {
          technique_id: 'T1071',
          tactic: 'Command and Control',
        };

        extractMITREFromDetection(detection, options);
        expect(options[0]?.entityData?.tactic).toBe('Command and Control');
      });

      it('should track detection_fields as source', () => {
        const options: ContextOption[] = [];
        const detection = {
          technique_id: 'T1071',
        };

        extractMITREFromDetection(detection, options);
        expect(options[0]?.entityData?.sources).toContain('detection_fields');
      });
    });

    describe('multiple sources aggregation', () => {
      it('should merge same technique from multiple sources', () => {
        const options: ContextOption[] = [];
        const detection = {
          behaviors: [{ technique_id: 'T1566' }],
          kill_chain: [{ technique_id: 'T1566' }],
        };

        extractMITREFromDetection(detection, options);
        expect(options).toHaveLength(1);
        expect(options[0]?.entityData?.count).toBe(2);
        expect(options[0]?.entityData?.sources).toContain('detection_behaviors');
        expect(options[0]?.entityData?.sources).toContain('kill_chain');
      });

      it('should keep technique name from first source', () => {
        const options: ContextOption[] = [];
        const detection = {
          behaviors: [
            {
              technique_id: 'T1566',
              technique: 'Phishing',
            },
          ],
          kill_chain: [
            {
              technique_id: 'T1566',
              technique_name: 'Different Name',
            },
          ],
        };

        extractMITREFromDetection(detection, options);
        expect(options[0]?.displayName).toContain('Phishing');
        expect(options[0]?.displayName).not.toContain('Different Name');
      });
    });
  });

  describe('processMITRETechniques', () => {
    it('should return empty array for null input', () => {
      expect(processMITRETechniques(null)).toEqual([]);
    });

    it('should return empty array for undefined input', () => {
      expect(processMITRETechniques(undefined)).toEqual([]);
    });

    it('should return empty array for empty object', () => {
      expect(processMITRETechniques({})).toEqual([]);
    });

    it('should process string technique ID', () => {
      const input = { mitre_techniques: ['T1566'] };
      const result = processMITRETechniques(input);

      expect(result).toHaveLength(1);
      expect(result[0]?.displayName).toContain('T1566');
    });

    it('should process object with technique_id', () => {
      const input = {
        mitre_techniques: [{ technique_id: 'T1566' }],
      };
      const result = processMITRETechniques(input);

      expect(result).toHaveLength(1);
      expect(result[0]?.displayName).toContain('T1566');
    });

    it('should process object with techniqueId', () => {
      const input = {
        mitre_techniques: [{ techniqueId: 'T1566' }],
      };
      const result = processMITRETechniques(input);

      expect(result).toHaveLength(1);
    });

    it('should process object with id field', () => {
      const input = {
        mitre_techniques: [{ id: 'T1566' }],
      };
      const result = processMITRETechniques(input);

      expect(result).toHaveLength(1);
    });

    it('should process object with technique field', () => {
      const input = {
        mitre_techniques: [{ technique: 'T1566' }],
      };
      const result = processMITRETechniques(input);

      expect(result).toHaveLength(1);
    });

    it('should include technique name', () => {
      const input = {
        mitre_techniques: [
          {
            technique_id: 'T1566',
            name: 'Phishing',
          },
        ],
      };
      const result = processMITRETechniques(input);

      expect(result[0]?.displayName).toContain('Phishing');
    });

    it('should include tactic', () => {
      const input = {
        mitre_techniques: [
          {
            technique_id: 'T1566',
            tactic: 'Initial Access',
          },
        ],
      };
      const result = processMITRETechniques(input);

      expect(result[0]?.entityData?.tactic).toBe('Initial Access');
    });

    it('should count duplicate techniques', () => {
      const input = {
        mitre_techniques: ['T1566', 'T1566'],
      };
      const result = processMITRETechniques(input);

      expect(result).toHaveLength(1);
      expect(result[0]?.displayName).toContain('2 occurrences');
    });

    it('should validate technique ID format', () => {
      const input = {
        mitre_techniques: ['T1566', 'INVALID', 'T1003.001', 'WRONG'],
      };
      const result = processMITRETechniques(input);

      expect(result).toHaveLength(2);
      expect(result[0]?.displayName).toContain('T1566');
      expect(result[1]?.displayName).toContain('T1003.001');
    });

    it('should handle sub-techniques', () => {
      const input = {
        mitre_techniques: ['T1003.001', 'T1003.002'],
      };
      const result = processMITRETechniques(input);

      expect(result).toHaveLength(2);
    });

    it('should uppercase lowercase IDs', () => {
      const input = {
        mitre_techniques: ['t1566', 't1003.001'],
      };
      const result = processMITRETechniques(input);

      expect(result[0]?.displayName).toContain('T1566');
      expect(result[1]?.displayName).toContain('T1003.001');
    });

    it('should include incident_data as source', () => {
      const input = {
        mitre_techniques: ['T1566'],
      };
      const result = processMITRETechniques(input);

      expect(result[0]?.entityData?.sources).toContain('incident_data');
    });

    it('should handle empty mitre_techniques array', () => {
      const input = { mitre_techniques: [] };
      const result = processMITRETechniques(input);

      expect(result).toEqual([]);
    });

    it('should handle non-array mitre_techniques', () => {
      const input = { mitre_techniques: 'not-an-array' };
      const result = processMITRETechniques(input);

      expect(result).toEqual([]);
    });

    it('should ignore null values in array', () => {
      const input = {
        mitre_techniques: ['T1566', null, 'T1059'],
      };
      const result = processMITRETechniques(input);

      expect(result).toHaveLength(2);
    });

    it('should ignore invalid objects', () => {
      const input = {
        mitre_techniques: [{ invalid: 'data' }, { technique_id: 'T1566' }],
      };
      const result = processMITRETechniques(input);

      expect(result).toHaveLength(1);
    });
  });
});
