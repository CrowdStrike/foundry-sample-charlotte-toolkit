import { detectUseCase, createSecurityResponseSchema } from '../promptEngineer';

describe('promptEngineer', () => {
  describe('detectUseCase', () => {
    it('should detect hash_analysis for MD5 hash', () => {
      const query = 'Analyze this hash: d41d8cd98f00b204e9800998ecf8427e';
      expect(detectUseCase(query)).toBe('hash_analysis');
    });

    it('should detect hash_analysis for SHA1 hash', () => {
      const query = 'Check this SHA1: da39a3ee5e6b4b0d3255bfef95601890afd80709';
      expect(detectUseCase(query)).toBe('hash_analysis');
    });

    it('should detect hash_analysis for SHA256 hash', () => {
      const query = 'Investigate e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
      expect(detectUseCase(query)).toBe('hash_analysis');
    });

    it('should detect ip_investigation for IP address', () => {
      const query = 'Analyze IP 192.168.1.1';
      expect(detectUseCase(query)).toBe('ip_investigation');
    });

    it('should detect ip_investigation for multiple IP patterns', () => {
      expect(detectUseCase('Check 10.0.0.1')).toBe('ip_investigation');
      expect(detectUseCase('Investigate 255.255.255.255')).toBe('ip_investigation');
      expect(detectUseCase('IP address 1.2.3.4 is suspicious')).toBe('ip_investigation');
    });

    it('should detect domain_analysis for domain', () => {
      const query = 'Check domain example.com';
      expect(detectUseCase(query)).toBe('domain_analysis');
    });

    it('should detect domain_analysis for various domain patterns', () => {
      expect(detectUseCase('Analyze test.org')).toBe('domain_analysis');
      expect(detectUseCase('Domain suspicious-site.net')).toBe('domain_analysis');
      expect(detectUseCase('Check www.malicious.co.uk')).toBe('domain_analysis');
    });

    it('should detect incident_response for incident keywords', () => {
      expect(detectUseCase('incident response plan')).toBe('incident_response');
      expect(detectUseCase('containment strategy')).toBe('incident_response');
      expect(detectUseCase('security incident')).toBe('incident_response');
      expect(detectUseCase('Incident details')).toBe('incident_response');
      expect(detectUseCase('response to breach')).toBe('incident_response');
    });

    it('should detect malware_analysis for malware keywords', () => {
      expect(detectUseCase('malware sample analysis')).toBe('malware_analysis');
      expect(detectUseCase('virus detection')).toBe('malware_analysis');
      expect(detectUseCase('trojan behavior')).toBe('malware_analysis');
      expect(detectUseCase('MALWARE found')).toBe('malware_analysis');
      expect(detectUseCase('Virus scan')).toBe('malware_analysis');
    });

    it('should detect threat_hunting for hunting keywords', () => {
      expect(detectUseCase('threat hunting query')).toBe('threat_hunting');
      expect(detectUseCase('proactive hunting')).toBe('threat_hunting');
      expect(detectUseCase('hunt for threats')).toBe('threat_hunting');
      expect(detectUseCase('Hunting activities')).toBe('threat_hunting');
      expect(detectUseCase('proactive security')).toBe('threat_hunting');
    });

    it('should default to general_security for unknown patterns', () => {
      expect(detectUseCase('general security question')).toBe('general_security');
      expect(detectUseCase('random text')).toBe('general_security');
      expect(detectUseCase('')).toBe('general_security');
      expect(detectUseCase('undefined behavior')).toBe('general_security');
    });

    it('should be case insensitive', () => {
      expect(detectUseCase('MALWARE ANALYSIS')).toBe('malware_analysis');
      expect(detectUseCase('Incident Response')).toBe('incident_response');
      expect(detectUseCase('THREAT HUNTING')).toBe('threat_hunting');
    });

    it('should detect hash analysis from valid hash patterns', () => {
      // This test is focused on just testing hash detection
      expect(detectUseCase('d41d8cd98f00b204e9800998ecf8427e')).toBe('hash_analysis');
      expect(detectUseCase('da39a3ee5e6b4b0d3255bfef95601890afd80709')).toBe('hash_analysis');
    });

    it('should prioritize IP detection over domain detection', () => {
      const queryWithIpAndDomain = 'Analyze 192.168.1.1 and example.com';
      expect(detectUseCase(queryWithIpAndDomain)).toBe('ip_investigation');
    });

    it('should handle edge cases in regex patterns', () => {
      expect(detectUseCase('Hash with spaces: abc 123 def should not match')).toBe('general_security');
      expect(detectUseCase('Invalid domain: test')).toBe('general_security');
    });
  });

  describe('createSecurityResponseSchema', () => {
    it('should return valid JSON schema for hash_analysis', () => {
      const schema = createSecurityResponseSchema('hash_analysis');
      expect(() => JSON.parse(schema)).not.toThrow();
      const parsed = JSON.parse(schema);
      expect(parsed.type).toBe('object');
      expect(parsed.properties).toBeDefined();
      expect(parsed.required).toContain('executive_summary');
    });

    it('should return valid JSON schema for malware_analysis', () => {
      const schema = createSecurityResponseSchema('malware_analysis');
      expect(() => JSON.parse(schema)).not.toThrow();
      const parsed = JSON.parse(schema);
      expect(parsed.type).toBe('object');
    });

    it('should return valid JSON schema for ip_investigation', () => {
      const schema = createSecurityResponseSchema('ip_investigation');
      expect(() => JSON.parse(schema)).not.toThrow();
      const parsed = JSON.parse(schema);
      expect(parsed.type).toBe('object');
    });

    it('should return valid JSON schema for domain_analysis', () => {
      const schema = createSecurityResponseSchema('domain_analysis');
      expect(() => JSON.parse(schema)).not.toThrow();
      const parsed = JSON.parse(schema);
      expect(parsed.type).toBe('object');
    });

    it('should return valid JSON schema for incident_response', () => {
      const schema = createSecurityResponseSchema('incident_response');
      expect(() => JSON.parse(schema)).not.toThrow();
      const parsed = JSON.parse(schema);
      expect(parsed.type).toBe('object');
    });

    it('should return valid JSON schema for threat_hunting', () => {
      const schema = createSecurityResponseSchema('threat_hunting');
      expect(() => JSON.parse(schema)).not.toThrow();
      const parsed = JSON.parse(schema);
      expect(parsed.type).toBe('object');
    });

    it('should return valid JSON schema for general_security', () => {
      const schema = createSecurityResponseSchema('general_security');
      expect(() => JSON.parse(schema)).not.toThrow();
      const parsed = JSON.parse(schema);
      expect(parsed.type).toBe('object');
    });

    it('should have consistent schema structure across use cases', () => {
      const useCases = ['hash_analysis', 'ip_investigation', 'domain_analysis', 'incident_response', 'threat_hunting', 'general_security'] as const;
      
      const schemas = useCases.map(useCase => JSON.parse(createSecurityResponseSchema(useCase)));
      
      schemas.forEach(schema => {
        expect(schema.properties.executive_summary).toBeDefined();
        expect(schema.properties.threat_level).toBeDefined();
        expect(schema.properties.confidence_level).toBeDefined();
        expect(schema.properties.priority_actions).toBeDefined();
        expect(schema.properties.technical_details).toBeDefined();
        expect(schema.properties.reasoning_assessment).toBeDefined();
      });
    });

    it('should return schemas with proper threat level enum', () => {
      const schema = JSON.parse(createSecurityResponseSchema('general_security'));
      expect(schema.properties.threat_level.enum).toEqual(['Low', 'Medium', 'High', 'Critical']);
    });

    it('should return schemas with proper confidence level enum', () => {
      const schema = JSON.parse(createSecurityResponseSchema('general_security'));
      expect(schema.properties.confidence_level.enum).toEqual(['Low', 'Medium', 'High']);
    });

    it('should include IOCs structure in schema', () => {
      const schema = JSON.parse(createSecurityResponseSchema('general_security'));
      expect(schema.properties.iocs).toBeDefined();
      expect(schema.properties.iocs.properties.hashes).toBeDefined();
      expect(schema.properties.iocs.properties.ips).toBeDefined();
      expect(schema.properties.iocs.properties.domains).toBeDefined();
    });

    it('should include MITRE techniques structure in schema', () => {
      const schema = JSON.parse(createSecurityResponseSchema('general_security'));
      expect(schema.properties.mitre_techniques).toBeDefined();
      expect(schema.properties.mitre_techniques.items.properties.technique_id).toBeDefined();
      expect(schema.properties.mitre_techniques.items.properties.technique_name).toBeDefined();
    });

    it('should have proper array constraints', () => {
      const schema = JSON.parse(createSecurityResponseSchema('general_security'));
      expect(schema.properties.priority_actions.maxItems).toBe(6);
      expect(schema.properties.priority_actions.items.maxLength).toBe(150);
    });

    it('should have proper string length constraints', () => {
      const schema = JSON.parse(createSecurityResponseSchema('general_security'));
      expect(schema.properties.technical_details.maxLength).toBe(600);
      expect(schema.properties.reasoning_assessment.maxLength).toBe(800);
    });

    it('should return identical schemas for hash_analysis and malware_analysis', () => {
      const hashSchema = createSecurityResponseSchema('hash_analysis');
      const malwareSchema = createSecurityResponseSchema('malware_analysis');
      expect(hashSchema).toBe(malwareSchema);
    });

    it('should handle all schema creation branches', () => {
      // Test that all internal schema creation functions are called
      const useCases = ['hash_analysis', 'malware_analysis', 'ip_investigation', 'domain_analysis', 'incident_response', 'threat_hunting', 'general_security'];
      
      useCases.forEach(useCase => {
        const schema = createSecurityResponseSchema(useCase as any);
        expect(schema).toBeDefined();
        expect(schema.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Integration tests', () => {
    it('should work end-to-end: detect use case and create matching schema', () => {
      const testCases = [
        { query: 'analyze hash d41d8cd98f00b204e9800998ecf8427e', expectedUseCase: 'hash_analysis' },
        { query: 'investigate IP 192.168.1.1', expectedUseCase: 'ip_investigation' },
        { query: 'check domain malicious.com', expectedUseCase: 'domain_analysis' },
        { query: 'incident response needed', expectedUseCase: 'incident_response' },
        { query: 'threat hunting activity', expectedUseCase: 'threat_hunting' },
        { query: 'general security question', expectedUseCase: 'general_security' },
      ];

      testCases.forEach(({ query, expectedUseCase }) => {
        const detectedUseCase = detectUseCase(query);
        expect(detectedUseCase).toBe(expectedUseCase);
        
        const schema = createSecurityResponseSchema(detectedUseCase);
        expect(() => JSON.parse(schema)).not.toThrow();
        
        const parsed = JSON.parse(schema);
        expect(parsed.properties.executive_summary).toBeDefined();
      });
    });
  });
});