// src/utils/security/__tests__/iocUtils.test.ts

import { parseStructuredResponse } from '../iocUtils';
import type { StructuredSecurityResponse } from '../../../types/security';

// Jest global declarations for TypeScript
declare global {
  var describe: (name: string, fn: () => void) => void;
  var it: (name: string, fn: () => void) => void;
  var expect: any;
}

describe('IOC Utils', () => {
  describe('parseStructuredResponse', () => {
    it('should parse valid structured security response', () => {
      const validResponse: StructuredSecurityResponse = {
        executive_summary: 'This is a security threat analysis.',
        threat_level: 'High',
        confidence_level: 'High',
        priority_actions: ['Block this IP', 'Investigate further'],
        technical_details: 'Technical analysis details',
        reasoning_assessment: 'Reasoning behind the assessment',
        iocs: {
          hashes: ['abc123'],
          ips: ['192.168.1.1'],
          domains: ['evil.com'],
          urls: ['http://evil.com/malware'],
          file_paths: ['C:\\temp\\malware.exe']
        },
        mitre_techniques: [
          {
            technique_id: 'T1027',
            technique_name: 'Obfuscated Files or Information',
            description: 'Adversaries may attempt to make an executable or file difficult to discover or analyze.'
          }
        ]
      };

      const jsonString = JSON.stringify(validResponse);
      const result = parseStructuredResponse(jsonString);

      expect(result).toEqual(validResponse);
      expect(result?.executive_summary).toBe('This is a security threat analysis.');
      expect(result?.threat_level).toBe('High');
      expect(result?.confidence_level).toBe('High');
      expect(result?.priority_actions).toEqual(['Block this IP', 'Investigate further']);
    });

    it('should parse minimal valid structured response with required fields only', () => {
      const minimalResponse = {
        executive_summary: 'Minimal threat analysis.',
        threat_level: 'Low',
        priority_actions: ['Monitor'],
        confidence_level: 'Medium'
      };

      const jsonString = JSON.stringify(minimalResponse);
      const result = parseStructuredResponse(jsonString);

      expect(result).toEqual(minimalResponse);
      expect(result?.executive_summary).toBe('Minimal threat analysis.');
      expect(result?.threat_level).toBe('Low'); 
      expect(result?.priority_actions).toEqual(['Monitor']);
    });

    it('should handle different threat levels', () => {
      const response = {
        executive_summary: 'Test analysis',
        threat_level: 'Critical',
        confidence_level: 'High',
        priority_actions: ['Immediate action required']
      };

      const result = parseStructuredResponse(JSON.stringify(response));
      expect(result?.threat_level).toBe('Critical');
    });

    it('should handle different confidence levels', () => {
      const response = {
        executive_summary: 'Test analysis',
        threat_level: 'Medium',
        confidence_level: 'Low',
        priority_actions: ['Further investigation needed']
      };

      const result = parseStructuredResponse(JSON.stringify(response));
      expect(result?.confidence_level).toBe('Low');
    });

    it('should handle response with IOCs', () => {
      const response = {
        executive_summary: 'IOC analysis',
        threat_level: 'High',
        confidence_level: 'High',
        priority_actions: ['Block IOCs'],
        iocs: {
          hashes: ['hash1', 'hash2'],
          ips: ['1.2.3.4', '5.6.7.8'],
          domains: ['bad.com', 'evil.org'],
          urls: ['http://bad.com/malware'],
          file_paths: ['C:\\temp\\bad.exe', '/tmp/malware']
        }
      };

      const result = parseStructuredResponse(JSON.stringify(response));
      expect(result?.iocs?.hashes).toEqual(['hash1', 'hash2']);
      expect(result?.iocs?.ips).toEqual(['1.2.3.4', '5.6.7.8']);
      expect(result?.iocs?.domains).toEqual(['bad.com', 'evil.org']);
      expect(result?.iocs?.urls).toEqual(['http://bad.com/malware']);
      expect(result?.iocs?.file_paths).toEqual(['C:\\temp\\bad.exe', '/tmp/malware']);
    });

    it('should handle response with MITRE techniques', () => {
      const response = {
        executive_summary: 'MITRE analysis',
        threat_level: 'High',
        confidence_level: 'High',
        priority_actions: ['Apply mitigations'],
        mitre_techniques: [
          {
            technique_id: 'T1059',
            technique_name: 'Command and Scripting Interpreter',
            description: 'Adversaries may abuse command and script interpreters.'
          },
          {
            technique_id: 'T1055',
            technique_name: 'Process Injection',
            description: 'Adversaries may inject code into processes.'
          }
        ]
      };

      const result = parseStructuredResponse(JSON.stringify(response));
      expect(result?.mitre_techniques).toHaveLength(2);
      expect(result?.mitre_techniques?.[0].technique_id).toBe('T1059');
      expect(result?.mitre_techniques?.[1].technique_id).toBe('T1055');
    });

    it('should handle response with optional fields', () => {
      const response = {
        executive_summary: 'Complete analysis',
        threat_level: 'High',
        confidence_level: 'High',
        priority_actions: ['Take action'],
        technical_details: 'Detailed technical analysis of the threat',
        reasoning_assessment: 'The reasoning behind this assessment is...'
      };

      const result = parseStructuredResponse(JSON.stringify(response));
      expect(result?.technical_details).toBe('Detailed technical analysis of the threat');
      expect(result?.reasoning_assessment).toBe('The reasoning behind this assessment is...');
    });

    it('should return null for invalid JSON', () => {
      const invalidJson = '{ invalid json }';
      const result = parseStructuredResponse(invalidJson);
      expect(result).toBeNull();
    });

    it('should return null for malformed JSON', () => {
      const malformedJson = '{"key": "value"'; // missing closing brace
      const result = parseStructuredResponse(malformedJson);
      expect(result).toBeNull();
    });

    it('should return null for non-JSON string', () => {
      const nonJson = 'This is not JSON at all';
      const result = parseStructuredResponse(nonJson);
      expect(result).toBeNull();
    });

    it('should return null for response missing required fields', () => {
      // Missing executive_summary
      const missingExecutiveSummary = {
        threat_level: 'High',
        confidence_level: 'High',
        priority_actions: ['Action required']
      };

      let result = parseStructuredResponse(JSON.stringify(missingExecutiveSummary));
      expect(result).toBeNull();

      // Missing threat_level
      const missingThreatLevel = {
        executive_summary: 'Summary',
        confidence_level: 'High',
        priority_actions: ['Action required']
      };

      result = parseStructuredResponse(JSON.stringify(missingThreatLevel));
      expect(result).toBeNull();

      // Missing priority_actions
      const missingPriorityActions = {
        executive_summary: 'Summary',
        threat_level: 'High',
        confidence_level: 'High'
      };

      result = parseStructuredResponse(JSON.stringify(missingPriorityActions));
      expect(result).toBeNull();
    });

    it('should return null for response with null required fields', () => {
      const nullFields = {
        executive_summary: null,
        threat_level: 'High',
        confidence_level: 'High',
        priority_actions: ['Action required']
      };

      const result = parseStructuredResponse(JSON.stringify(nullFields));
      expect(result).toBeNull();
    });

    it('should return null for response with undefined required fields', () => {
      const undefinedFields = {
        executive_summary: 'Summary',
        threat_level: undefined,
        confidence_level: 'High',
        priority_actions: ['Action required']
      };

      const result = parseStructuredResponse(JSON.stringify(undefinedFields));
      expect(result).toBeNull();
    });

    it('should return null for non-object JSON', () => {
      // Array instead of object
      const arrayJson = JSON.stringify(['not', 'an', 'object']);
      let result = parseStructuredResponse(arrayJson);
      expect(result).toBeNull();

      // String instead of object
      const stringJson = JSON.stringify('not an object');
      result = parseStructuredResponse(stringJson);
      expect(result).toBeNull();

      // Number instead of object
      const numberJson = JSON.stringify(42);
      result = parseStructuredResponse(numberJson);
      expect(result).toBeNull();

      // Boolean instead of object
      const booleanJson = JSON.stringify(true);
      result = parseStructuredResponse(booleanJson);
      expect(result).toBeNull();

      // null instead of object
      const nullJson = JSON.stringify(null);
      result = parseStructuredResponse(nullJson);
      expect(result).toBeNull();
    });

    it('should handle JSON with extra whitespace', () => {
      const response = {
        executive_summary: 'Whitespace test',
        threat_level: 'Low',
        confidence_level: 'Medium',
        priority_actions: ['Test action']
      };

      const jsonWithWhitespace = `   ${JSON.stringify(response)}   `;
      const result = parseStructuredResponse(jsonWithWhitespace);
      expect(result).toEqual(response);
    });

    it('should return null for empty strings in required fields', () => {
      const emptyStringFields = {
        executive_summary: '',
        threat_level: 'High',
        confidence_level: 'High',
        priority_actions: ['Action required']
      };

      // Empty string is falsy in JavaScript, so validation fails
      const result = parseStructuredResponse(JSON.stringify(emptyStringFields));
      expect(result).toBeNull();
    });

    it('should handle empty priority_actions array', () => {
      const emptyActions = {
        executive_summary: 'Summary',
        threat_level: 'Low',
        confidence_level: 'Medium',
        priority_actions: []
      };

      // Empty array should still be considered valid (truthy)
      const result = parseStructuredResponse(JSON.stringify(emptyActions));
      expect(result).toEqual(emptyActions);
      expect(result?.priority_actions).toEqual([]);
    });

    it('should handle response with additional unknown fields', () => {
      const responseWithExtraFields = {
        executive_summary: 'Summary with extra fields',
        threat_level: 'Medium',
        confidence_level: 'High',
        priority_actions: ['Standard action'],
        unknown_field: 'This should not break parsing',
        another_extra: 42
      };

      const result = parseStructuredResponse(JSON.stringify(responseWithExtraFields));
      expect(result).toEqual(responseWithExtraFields);
      expect((result as any)?.unknown_field).toBe('This should not break parsing');
    });
  });
});
