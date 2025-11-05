import { describe, expect, it } from 'vitest';
import { createSecurityResponseSchema, detectUseCase } from '../promptEngineer';

describe('promptEngineer', () => {
  describe('detectUseCase', () => {
    describe('hash detection', () => {
      it('should detect MD5 hash (32 hex chars)', () => {
        const result = detectUseCase('a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4');
        expect(result).toBe('hash_analysis');
      });

      it('should detect SHA1 hash (40 hex chars)', () => {
        const result = detectUseCase('a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2');
        expect(result).toBe('hash_analysis');
      });

      it('should detect SHA256 hash (64 hex chars)', () => {
        const result = detectUseCase(
          'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
        );
        expect(result).toBe('hash_analysis');
      });

      it('should detect hash with uppercase letters', () => {
        const result = detectUseCase('A1B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4');
        expect(result).toBe('hash_analysis');
      });

      it('should detect hash mixed with text', () => {
        const result = detectUseCase('Analyze this hash a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4 please');
        expect(result).toBe('hash_analysis');
      });
    });

    describe('IP detection', () => {
      it('should detect IPv4 address', () => {
        const result = detectUseCase('192.168.1.1');
        expect(result).toBe('ip_investigation');
      });

      it('should detect public IP', () => {
        const result = detectUseCase('8.8.8.8');
        expect(result).toBe('ip_investigation');
      });

      it('should detect IP in text', () => {
        const result = detectUseCase('Check IP 10.0.0.1 for malicious activity');
        expect(result).toBe('ip_investigation');
      });

      it('should detect IP with leading zeros', () => {
        const result = detectUseCase('192.168.001.001');
        expect(result).toBe('ip_investigation');
      });

      it('should detect edge IP addresses', () => {
        expect(detectUseCase('0.0.0.0')).toBe('ip_investigation');
        expect(detectUseCase('255.255.255.255')).toBe('ip_investigation');
      });
    });

    describe('domain detection', () => {
      it('should detect domain name', () => {
        const result = detectUseCase('example.com');
        expect(result).toBe('domain_analysis');
      });

      it('should detect subdomain', () => {
        const result = detectUseCase('www.example.com');
        expect(result).toBe('domain_analysis');
      });

      it('should detect domain with hyphens', () => {
        const result = detectUseCase('my-domain.example.com');
        expect(result).toBe('domain_analysis');
      });

      it('should detect domain in text', () => {
        const result = detectUseCase('Investigate malicious-site.com domain');
        expect(result).toBe('domain_analysis');
      });

      it('should detect domain with country TLD', () => {
        const result = detectUseCase('example.co.uk');
        expect(result).toBe('domain_analysis');
      });
    });

    describe('keyword-based detection', () => {
      it('should detect incident response query', () => {
        expect(detectUseCase('incident response procedures')).toBe('incident_response');
        expect(detectUseCase('containment strategy')).toBe('incident_response');
        expect(detectUseCase('How to respond to incident')).toBe('incident_response');
      });

      it('should detect malware analysis query', () => {
        expect(detectUseCase('malware family analysis')).toBe('malware_analysis');
        expect(detectUseCase('virus detection')).toBe('malware_analysis');
        expect(detectUseCase('trojan behavior')).toBe('malware_analysis');
      });

      it('should detect threat hunting query', () => {
        expect(detectUseCase('threat hunting techniques')).toBe('threat_hunting');
        expect(detectUseCase('proactive hunt')).toBe('threat_hunting');
        expect(detectUseCase('hunting for APT')).toBe('threat_hunting');
      });

      it('should be case insensitive for keywords', () => {
        expect(detectUseCase('INCIDENT response')).toBe('incident_response');
        expect(detectUseCase('MALWARE analysis')).toBe('malware_analysis');
        expect(detectUseCase('HUNTING techniques')).toBe('threat_hunting');
      });
    });

    describe('priority and fallback', () => {
      it('should prioritize patterns over keywords (hash)', () => {
        const result = detectUseCase('incident malware a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4');
        expect(result).toBe('hash_analysis');
      });

      it('should prioritize patterns over keywords (IP)', () => {
        const result = detectUseCase('incident malware 192.168.1.1');
        expect(result).toBe('ip_investigation');
      });

      it('should prioritize patterns over keywords (domain)', () => {
        const result = detectUseCase('incident malware example.com');
        expect(result).toBe('domain_analysis');
      });

      it('should return general_security for generic queries', () => {
        const result = detectUseCase('What is security?');
        expect(result).toBe('general_security');
      });

      it('should return general_security for empty query', () => {
        const result = detectUseCase('');
        expect(result).toBe('general_security');
      });

      it('should return general_security for whitespace query', () => {
        const result = detectUseCase('   ');
        expect(result).toBe('general_security');
      });
    });
  });

  describe('createSecurityResponseSchema', () => {
    it('should return valid JSON string for hash_analysis', () => {
      const schema = createSecurityResponseSchema('hash_analysis');
      expect(() => JSON.parse(schema)).not.toThrow();
    });

    it('should return valid JSON string for malware_analysis', () => {
      const schema = createSecurityResponseSchema('malware_analysis');
      expect(() => JSON.parse(schema)).not.toThrow();
    });

    it('should return valid JSON string for ip_investigation', () => {
      const schema = createSecurityResponseSchema('ip_investigation');
      expect(() => JSON.parse(schema)).not.toThrow();
    });

    it('should return valid JSON string for domain_analysis', () => {
      const schema = createSecurityResponseSchema('domain_analysis');
      expect(() => JSON.parse(schema)).not.toThrow();
    });

    it('should return valid JSON string for incident_response', () => {
      const schema = createSecurityResponseSchema('incident_response');
      expect(() => JSON.parse(schema)).not.toThrow();
    });

    it('should return valid JSON string for threat_hunting', () => {
      const schema = createSecurityResponseSchema('threat_hunting');
      expect(() => JSON.parse(schema)).not.toThrow();
    });

    it('should return valid JSON string for general_security', () => {
      const schema = createSecurityResponseSchema('general_security');
      expect(() => JSON.parse(schema)).not.toThrow();
    });

    describe('schema structure', () => {
      it('should have required fields in schema', () => {
        const schema = JSON.parse(createSecurityResponseSchema('general_security'));
        expect(schema).toHaveProperty('type');
        expect(schema).toHaveProperty('properties');
        expect(schema).toHaveProperty('required');
      });

      it('should have executive_summary property', () => {
        const schema = JSON.parse(createSecurityResponseSchema('general_security'));
        expect(schema.properties).toHaveProperty('executive_summary');
      });

      it('should have threat_level property', () => {
        const schema = JSON.parse(createSecurityResponseSchema('general_security'));
        expect(schema.properties).toHaveProperty('threat_level');
        expect(schema.properties.threat_level.enum).toEqual(['Low', 'Medium', 'High', 'Critical']);
      });

      it('should have confidence_level property', () => {
        const schema = JSON.parse(createSecurityResponseSchema('general_security'));
        expect(schema.properties).toHaveProperty('confidence_level');
        expect(schema.properties.confidence_level.enum).toEqual(['Low', 'Medium', 'High']);
      });

      it('should have priority_actions property', () => {
        const schema = JSON.parse(createSecurityResponseSchema('general_security'));
        expect(schema.properties).toHaveProperty('priority_actions');
        expect(schema.properties.priority_actions.type).toBe('array');
      });

      it('should have technical_details property', () => {
        const schema = JSON.parse(createSecurityResponseSchema('general_security'));
        expect(schema.properties).toHaveProperty('technical_details');
      });

      it('should have iocs property', () => {
        const schema = JSON.parse(createSecurityResponseSchema('general_security'));
        expect(schema.properties).toHaveProperty('iocs');
      });

      it('should have mitre_techniques property', () => {
        const schema = JSON.parse(createSecurityResponseSchema('general_security'));
        expect(schema.properties).toHaveProperty('mitre_techniques');
      });

      it('should have reasoning_assessment property', () => {
        const schema = JSON.parse(createSecurityResponseSchema('general_security'));
        expect(schema.properties).toHaveProperty('reasoning_assessment');
      });

      it('should require key fields', () => {
        const schema = JSON.parse(createSecurityResponseSchema('general_security'));
        expect(schema.required).toContain('executive_summary');
        expect(schema.required).toContain('threat_level');
        expect(schema.required).toContain('confidence_level');
        expect(schema.required).toContain('priority_actions');
        expect(schema.required).toContain('technical_details');
        expect(schema.required).toContain('reasoning_assessment');
      });

      it('should be formatted with indentation', () => {
        const schema = createSecurityResponseSchema('general_security');
        expect(schema).toContain('\n');
        expect(schema).toContain('  ');
      });
    });

    describe('use case consistency', () => {
      it('should return same schema for hash_analysis and malware_analysis', () => {
        const hashSchema = createSecurityResponseSchema('hash_analysis');
        const malwareSchema = createSecurityResponseSchema('malware_analysis');
        expect(hashSchema).toBe(malwareSchema);
      });

      it('should return consistent schema structure for all use cases', () => {
        const useCases: Array<Parameters<typeof createSecurityResponseSchema>[0]> = [
          'hash_analysis',
          'malware_analysis',
          'ip_investigation',
          'domain_analysis',
          'incident_response',
          'threat_hunting',
          'general_security',
        ];

        const schemas = useCases.map((useCase) =>
          JSON.parse(createSecurityResponseSchema(useCase)),
        );

        // All should have the same properties
        schemas.forEach((schema) => {
          expect(schema).toHaveProperty('properties.executive_summary');
          expect(schema).toHaveProperty('properties.threat_level');
          expect(schema).toHaveProperty('properties.confidence_level');
        });
      });
    });
  });
});
