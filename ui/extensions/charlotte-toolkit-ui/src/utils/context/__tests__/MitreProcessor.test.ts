// src/utils/context/__tests__/MitreProcessor.test.ts

import { 
  extractMITREFromDetection, 
  isValidMITRETechnique, 
  extractTechniqueId, 
  processMITRETechniques 
} from '../MitreProcessor';
import { createQueryTemplate } from '../../queryTemplates';

import type { ContextOption } from '../../../types';

// Mock dependencies
jest.mock('../../queryTemplates');

const mockCreateQueryTemplate = createQueryTemplate as jest.MockedFunction<typeof createQueryTemplate>;

describe('MitreProcessor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation
    mockCreateQueryTemplate.mockImplementation((type, value, options) => 
      `query for ${type}: ${value}${options?.techniqueName ? ` (${options.techniqueName})` : ''}`
    );
  });

  describe('isValidMITRETechnique', () => {
    it('should validate standard MITRE technique IDs', () => {
      expect(isValidMITRETechnique('T1055')).toBe(true);
      expect(isValidMITRETechnique('T1003')).toBe(true);
      expect(isValidMITRETechnique('T9999')).toBe(true);
    });

    it('should validate sub-technique IDs', () => {
      expect(isValidMITRETechnique('T1003.001')).toBe(true);
      expect(isValidMITRETechnique('T1055.012')).toBe(true);
      expect(isValidMITRETechnique('T1234.999')).toBe(true);
    });

    it('should handle case insensitivity', () => {
      expect(isValidMITRETechnique('t1055')).toBe(true);
      expect(isValidMITRETechnique('t1003.001')).toBe(true);
    });

    it('should reject invalid formats', () => {
      expect(isValidMITRETechnique('T105')).toBe(false);      // Too short
      expect(isValidMITRETechnique('T10555')).toBe(false);    // Too long
      expect(isValidMITRETechnique('T1055.01')).toBe(false);  // Sub-technique too short
      expect(isValidMITRETechnique('T1055.0001')).toBe(false); // Sub-technique too long
      expect(isValidMITRETechnique('1055')).toBe(false);      // Missing T prefix
      expect(isValidMITRETechnique('TA1055')).toBe(false);    // Wrong prefix
      expect(isValidMITRETechnique('T1055.abc')).toBe(false); // Non-numeric sub-technique
      expect(isValidMITRETechnique('')).toBe(false);          // Empty string
      expect(isValidMITRETechnique('invalid')).toBe(false);   // Completely invalid
    });

    it('should handle edge cases', () => {
      expect(isValidMITRETechnique('T0000')).toBe(true);      // Edge case - all zeros
      expect(isValidMITRETechnique('T0000.000')).toBe(true);  // Edge case - all zeros with sub
    });
  });

  describe('extractTechniqueId', () => {
    it('should extract from string format', () => {
      expect(extractTechniqueId('T1055')).toBe('T1055');
      expect(extractTechniqueId('t1003.001')).toBe('T1003.001');
      expect(extractTechniqueId('T1234.567')).toBe('T1234.567');
    });

    it('should return null for invalid string format', () => {
      expect(extractTechniqueId('invalid')).toBeNull();
      expect(extractTechniqueId('T105')).toBeNull();
      expect(extractTechniqueId('')).toBeNull();
    });

    it('should extract from object with technique_id property', () => {
      expect(extractTechniqueId({ technique_id: 'T1055' })).toBe('T1055');
      expect(extractTechniqueId({ technique_id: 't1003.001' })).toBe('T1003.001');
    });

    it('should extract from object with techniqueId property', () => {
      expect(extractTechniqueId({ techniqueId: 'T1055' })).toBe('T1055');
      expect(extractTechniqueId({ techniqueId: 't1234.567' })).toBe('T1234.567');
    });

    it('should extract from object with id property', () => {
      expect(extractTechniqueId({ id: 'T1055' })).toBe('T1055');
      expect(extractTechniqueId({ id: 't1003.001' })).toBe('T1003.001');
    });

    it('should extract from object with technique property', () => {
      expect(extractTechniqueId({ technique: 'T1055' })).toBe('T1055');
      expect(extractTechniqueId({ technique: 't1234.567' })).toBe('T1234.567');
    });

    it('should prioritize properties in order', () => {
      const mitreData = {
        technique_id: 'T1055',
        techniqueId: 'T1003',
        id: 'T1004',
        technique: 'T1005'
      };
      expect(extractTechniqueId(mitreData)).toBe('T1055'); // First valid property
    });

    it('should handle objects with invalid technique IDs', () => {
      expect(extractTechniqueId({ technique_id: 'invalid' })).toBeNull();
      expect(extractTechniqueId({ techniqueId: 'T105' })).toBeNull();
      expect(extractTechniqueId({ id: '' })).toBeNull();
    });

    it('should handle null/undefined input', () => {
      expect(extractTechniqueId(null)).toBeNull();
      expect(extractTechniqueId(undefined)).toBeNull();
      expect(extractTechniqueId({})).toBeNull();
    });

    it('should handle non-string property values', () => {
      expect(extractTechniqueId({ technique_id: 123 })).toBeNull();
      expect(extractTechniqueId({ technique_id: null })).toBeNull();
      expect(extractTechniqueId({ technique_id: undefined })).toBeNull();
    });
  });

  describe('extractMITREFromDetection', () => {
    let options: ContextOption[];

    beforeEach(() => {
      options = [];
    });

    it('should handle null/undefined detection', () => {
      extractMITREFromDetection(null, options);
      expect(options).toHaveLength(0);

      extractMITREFromDetection(undefined, options);
      expect(options).toHaveLength(0);
    });

    it('should extract from detection.behaviors array', () => {
      const detection = {
        behaviors: [
          {
            technique_id: 'T1055',
            technique: 'Process Injection',
            tactic: 'Defense Evasion'
          },
          {
            technique_id: 't1003.001',
            technique: 'LSASS Memory',
            tactic: 'Credential Access'
          }
        ]
      };

      extractMITREFromDetection(detection, options);

      expect(options).toHaveLength(2);
      
      const t1055 = options.find(o => o.value === 'mitre:T1055');
      expect(t1055).toMatchObject({
        displayName: 'T1055 - Process Injection',
        type: 'mitre',
        subType: 'technique',
        entityData: expect.objectContaining({
          techniqueId: 'T1055',
          techniqueName: 'Process Injection',
          tactic: 'Defense Evasion',
          count: 1,
          sources: ['detection_behaviors']
        })
      });

      const t1003 = options.find(o => o.value === 'mitre:T1003.001');
      expect(t1003).toMatchObject({
        displayName: 'T1003.001 - LSASS Memory',
        entityData: expect.objectContaining({
          techniqueId: 'T1003.001',
          techniqueName: 'LSASS Memory',
          tactic: 'Credential Access'
        })
      });
    });

    it('should extract from detection.kill_chain array', () => {
      const detection = {
        kill_chain: [
          {
            technique_id: 'T1059',
            technique_name: 'Command and Scripting Interpreter',
            tactic: 'Execution'
          }
        ]
      };

      extractMITREFromDetection(detection, options);

      expect(options).toHaveLength(1);
      expect(options[0]).toMatchObject({
        value: 'mitre:T1059',
        displayName: 'T1059 - Command and Scripting Interpreter',
        entityData: expect.objectContaining({
          sources: ['kill_chain']
        })
      });
    });

    it('should extract from detection.mitre_attack array', () => {
      const detection = {
        mitre_attack: [
          {
            technique_id: 'T1071',
            technique: 'Application Layer Protocol',
            tactic: 'Command and Control'
          }
        ]
      };

      extractMITREFromDetection(detection, options);

      expect(options).toHaveLength(1);
      expect(options[0]).toMatchObject({
        value: 'mitre:T1071',
        entityData: expect.objectContaining({
          sources: ['mitre_attack']
        })
      });
    });

    it('should extract from individual detection fields', () => {
      const detection = {
        technique_id: 'T1486',
        technique: 'Data Encrypted for Impact',
        tactic: 'Impact'
      };

      extractMITREFromDetection(detection, options);

      expect(options).toHaveLength(1);
      expect(options[0]).toMatchObject({
        value: 'mitre:T1486',
        entityData: expect.objectContaining({
          sources: ['detection_fields']
        })
      });
    });

    it('should deduplicate techniques from multiple sources', () => {
      const detection = {
        behaviors: [
          { technique_id: 'T1055', technique: 'Process Injection' }
        ],
        kill_chain: [
          { technique_id: 'T1055', technique_name: 'Process Injection' }
        ],
        technique_id: 'T1055',
        technique: 'Process Injection'
      };

      extractMITREFromDetection(detection, options);

      expect(options).toHaveLength(1);
      expect(options[0]).toMatchObject({
        value: 'mitre:T1055',
        displayName: 'T1055 - Process Injection (3 occurrences)',
        entityData: expect.objectContaining({
          count: 3,
          sources: ['detection_behaviors', 'kill_chain', 'detection_fields']
        })
      });
    });

    it('should handle techniques without names or tactics', () => {
      const detection = {
        behaviors: [
          { technique_id: 'T1055' }
        ]
      };

      extractMITREFromDetection(detection, options);

      expect(options).toHaveLength(1);
      expect(options[0]).toMatchObject({
        displayName: 'T1055',
        entityData: expect.objectContaining({
          techniqueId: 'T1055',
          techniqueName: undefined,
          tactic: undefined
        })
      });
    });

    it('should filter out invalid technique IDs', () => {
      const detection = {
        behaviors: [
          { technique_id: 'T1055' },      // Valid
          { technique_id: 'invalid' },    // Invalid
          { technique_id: 'T105' },       // Invalid
          { technique_id: 'T1003.001' }   // Valid
        ]
      };

      extractMITREFromDetection(detection, options);

      expect(options).toHaveLength(2); // Only valid techniques
      expect(options.map(o => o.value)).toEqual(['mitre:T1055', 'mitre:T1003.001']);
    });

    it('should handle empty arrays', () => {
      const detection = {
        behaviors: [],
        kill_chain: [],
        mitre_attack: []
      };

      extractMITREFromDetection(detection, options);

      expect(options).toHaveLength(0);
    });

    it('should handle non-array properties', () => {
      const detection = {
        behaviors: 'not-an-array',
        kill_chain: { technique_id: 'T1055' },
        mitre_attack: null
      };

      extractMITREFromDetection(detection, options);

      expect(options).toHaveLength(0);
    });

    it('should preserve technique name precedence', () => {
      const detection = {
        behaviors: [
          { technique_id: 'T1055', technique: 'First Name' }
        ],
        kill_chain: [
          { technique_id: 'T1055', technique_name: 'Second Name' }
        ]
      };

      extractMITREFromDetection(detection, options);

      expect(options).toHaveLength(1);
      expect(options[0].entityData.techniqueName).toBe('First Name'); // First source wins
    });

    it('should create proper query templates', () => {
      const detection = {
        behaviors: [
          { technique_id: 'T1055', technique: 'Process Injection' }
        ]
      };

      extractMITREFromDetection(detection, options);

      expect(mockCreateQueryTemplate).toHaveBeenCalledWith('mitre', 'T1055', { 
        techniqueName: 'Process Injection' 
      });
    });

    it('should maintain existing options while adding new ones', () => {
      const existingOption: ContextOption = {
        value: 'domain:example.com',
        displayName: 'example.com',
        type: 'domain',
        queryTemplate: 'existing'
      };
      options.push(existingOption);

      const detection = {
        behaviors: [{ technique_id: 'T1055' }]
      };

      extractMITREFromDetection(detection, options);

      expect(options).toHaveLength(2);
      expect(options[0]).toBe(existingOption); // Original preserved
      expect(options[1].type).toBe('mitre');   // New MITRE option added
    });
  });

  describe('processMITRETechniques', () => {
    it('should handle empty/null input', () => {
      expect(processMITRETechniques({})).toEqual([]);
      expect(processMITRETechniques(null)).toEqual([]);
      expect(processMITRETechniques(undefined)).toEqual([]);
    });

    it('should process legacy mitre_techniques array', () => {
      const entityValues = {
        mitre_techniques: [
          {
            technique_id: 'T1055',
            name: 'Process Injection',
            tactic: 'Defense Evasion'
          },
          {
            technique_id: 'T1003.001',
            name: 'LSASS Memory'
          }
        ]
      };

      const result = processMITRETechniques(entityValues);

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        value: 'mitre:T1055',
        displayName: 'T1055 - Process Injection',
        entityData: expect.objectContaining({
          sources: ['incident_data']
        })
      });
    });

    it('should handle various technique data formats', () => {
      const entityValues = {
        mitre_techniques: [
          'T1055',                        // String format
          { technique_id: 'T1003' },      // Object with technique_id
          { techniqueId: 'T1059' },       // Object with techniqueId
          { id: 'T1071' },                // Object with id
          { technique: 'T1486' }          // Object with technique
        ]
      };

      const result = processMITRETechniques(entityValues);

      expect(result).toHaveLength(5);
      expect(result.map(r => r.value)).toEqual([
        'mitre:T1055',
        'mitre:T1003',
        'mitre:T1059',
        'mitre:T1071',
        'mitre:T1486'
      ]);
    });

    it('should deduplicate techniques and count occurrences', () => {
      const entityValues = {
        mitre_techniques: [
          { technique_id: 'T1055', name: 'Process Injection' },
          { technique_id: 'T1055' },  // Duplicate
          'T1055'                     // Duplicate in different format
        ]
      };

      const result = processMITRETechniques(entityValues);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        displayName: 'T1055 - Process Injection (3 occurrences)',
        entityData: expect.objectContaining({
          count: 3
        })
      });
    });

    it('should filter out invalid techniques', () => {
      const entityValues = {
        mitre_techniques: [
          'T1055',            // Valid
          'invalid',          // Invalid
          { technique_id: 'T105' },  // Invalid
          { technique_id: 'T1003.001' }  // Valid
        ]
      };

      const result = processMITRETechniques(entityValues);

      expect(result).toHaveLength(2);
      expect(result.map(r => r.value)).toEqual(['mitre:T1055', 'mitre:T1003.001']);
    });

    it('should handle techniques without names', () => {
      const entityValues = {
        mitre_techniques: [
          { technique_id: 'T1055' }
        ]
      };

      const result = processMITRETechniques(entityValues);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        displayName: 'T1055',
        entityData: expect.objectContaining({
          techniqueName: undefined
        })
      });
    });

    it('should handle non-array mitre_techniques', () => {
      const entityValues = {
        mitre_techniques: 'not-an-array'
      };

      const result = processMITRETechniques(entityValues);

      expect(result).toEqual([]);
    });

    it('should preserve technique name precedence', () => {
      const entityValues = {
        mitre_techniques: [
          { technique_id: 'T1055', name: 'First Name' },
          { technique_id: 'T1055', name: 'Second Name' }
        ]
      };

      const result = processMITRETechniques(entityValues);

      expect(result).toHaveLength(1);
      expect(result[0].entityData.techniqueName).toBe('First Name');
    });

    it('should create proper query templates for legacy techniques', () => {
      const entityValues = {
        mitre_techniques: [
          { technique_id: 'T1055', name: 'Process Injection' }
        ]
      };

      processMITRETechniques(entityValues);

      expect(mockCreateQueryTemplate).toHaveBeenCalledWith('mitre', 'T1055', {
        techniqueName: 'Process Injection'
      });
    });
  });
});
