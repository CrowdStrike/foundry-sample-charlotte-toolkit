import { describe, expect, it } from 'vitest';
import { parseStructuredResponse } from '../iocUtils';

describe('iocUtils', () => {
  describe('parseStructuredResponse', () => {
    describe('valid structured responses', () => {
      it('should parse valid JSON with required fields', () => {
        const json = JSON.stringify({
          executive_summary: 'Test summary',
          threat_level: 'high',
          priority_actions: ['action1', 'action2'],
        });

        const result = parseStructuredResponse(json);
        expect(result).not.toBeNull();
        expect(result?.executive_summary).toBe('Test summary');
        expect(result?.threat_level).toBe('high');
        expect(result?.priority_actions).toEqual(['action1', 'action2']);
      });

      it('should parse complete structured security response', () => {
        const response = {
          executive_summary: 'Malicious activity detected',
          threat_level: 'critical',
          priority_actions: ['Isolate affected systems', 'Block IP addresses'],
          iocs: {
            ips: ['192.168.1.1', '10.0.0.1'],
            domains: ['malicious.com'],
            hashes: ['abc123'],
          },
          mitre_techniques: ['T1566', 'T1059'],
          reasoning: 'Based on behavioral patterns',
          recommendations: ['Update security policies'],
        };

        const result = parseStructuredResponse(JSON.stringify(response));
        expect(result).not.toBeNull();
        expect(result?.executive_summary).toBe('Malicious activity detected');
        expect(result?.threat_level).toBe('critical');
        expect(result?.priority_actions).toHaveLength(2);
        expect(result?.iocs).toBeDefined();
        expect(result?.mitre_techniques).toHaveLength(2);
      });

      it('should handle JSON with extra whitespace', () => {
        const json = `
          {
            "executive_summary": "Test",
            "threat_level": "medium",
            "priority_actions": ["action"]
          }
        `;

        const result = parseStructuredResponse(json);
        expect(result).not.toBeNull();
        expect(result?.executive_summary).toBe('Test');
      });

      it('should handle JSON with leading/trailing whitespace', () => {
        const json =
          '   {"executive_summary": "Test", "threat_level": "low", "priority_actions": []}   ';

        const result = parseStructuredResponse(json);
        expect(result).not.toBeNull();
      });

      it('should handle JSON with tabs and newlines', () => {
        const json =
          '\t\n{"executive_summary": "Test", "threat_level": "info", "priority_actions": []}\n\t';

        const result = parseStructuredResponse(json);
        expect(result).not.toBeNull();
      });
    });

    describe('invalid responses', () => {
      it('should return null for invalid JSON', () => {
        const result = parseStructuredResponse('not valid json');
        expect(result).toBeNull();
      });

      it('should return null for empty string', () => {
        const result = parseStructuredResponse('');
        expect(result).toBeNull();
      });

      it('should return null for whitespace only', () => {
        const result = parseStructuredResponse('   \n  \t  ');
        expect(result).toBeNull();
      });

      it('should return null for incomplete JSON', () => {
        const result = parseStructuredResponse('{"executive_summary": "Test"');
        expect(result).toBeNull();
      });

      it('should return null for malformed JSON', () => {
        const result = parseStructuredResponse('{executive_summary: Test}');
        expect(result).toBeNull();
      });

      it('should return null when missing executive_summary', () => {
        const json = JSON.stringify({
          threat_level: 'high',
          priority_actions: ['action'],
        });

        const result = parseStructuredResponse(json);
        expect(result).toBeNull();
      });

      it('should return null when missing threat_level', () => {
        const json = JSON.stringify({
          executive_summary: 'Test',
          priority_actions: ['action'],
        });

        const result = parseStructuredResponse(json);
        expect(result).toBeNull();
      });

      it('should return null when missing priority_actions', () => {
        const json = JSON.stringify({
          executive_summary: 'Test',
          threat_level: 'high',
        });

        const result = parseStructuredResponse(json);
        expect(result).toBeNull();
      });

      it('should return null for JSON array', () => {
        const result = parseStructuredResponse('[1, 2, 3]');
        expect(result).toBeNull();
      });

      it('should return null for JSON string', () => {
        const result = parseStructuredResponse('"just a string"');
        expect(result).toBeNull();
      });

      it('should return null for JSON number', () => {
        const result = parseStructuredResponse('123');
        expect(result).toBeNull();
      });

      it('should return null for JSON boolean', () => {
        const result = parseStructuredResponse('true');
        expect(result).toBeNull();
      });

      it('should return null for JSON null', () => {
        const result = parseStructuredResponse('null');
        expect(result).toBeNull();
      });
    });

    describe('edge cases', () => {
      it('should handle empty object', () => {
        const result = parseStructuredResponse('{}');
        expect(result).toBeNull();
      });

      it('should handle object with null values', () => {
        const json = JSON.stringify({
          executive_summary: null,
          threat_level: null,
          priority_actions: null,
        });

        const result = parseStructuredResponse(json);
        expect(result).toBeNull();
      });

      it('should handle object with undefined values', () => {
        const json =
          '{"executive_summary": undefined, "threat_level": undefined, "priority_actions": undefined}';

        const result = parseStructuredResponse(json);
        expect(result).toBeNull();
      });

      it('should handle very large JSON', () => {
        const largeData = {
          executive_summary: 'A'.repeat(10000),
          threat_level: 'high',
          priority_actions: Array(1000).fill('action'),
        };

        const result = parseStructuredResponse(JSON.stringify(largeData));
        expect(result).not.toBeNull();
        expect(result?.executive_summary).toHaveLength(10000);
        expect(result?.priority_actions).toHaveLength(1000);
      });

      it('should handle unicode characters', () => {
        const json = JSON.stringify({
          executive_summary: 'Test with émojis 😀 and ñ characters',
          threat_level: 'medium',
          priority_actions: ['行動'],
        });

        const result = parseStructuredResponse(json);
        expect(result).not.toBeNull();
        expect(result?.executive_summary).toContain('😀');
        expect(result?.executive_summary).toContain('ñ');
        expect(result?.priority_actions).toContain('行動');
      });

      it('should handle special characters in strings', () => {
        const json = JSON.stringify({
          executive_summary: 'Test with "quotes" and \'apostrophes\'',
          threat_level: 'low',
          priority_actions: ['action with \n newline'],
        });

        const result = parseStructuredResponse(json);
        expect(result).not.toBeNull();
      });

      it('should handle nested objects', () => {
        const json = JSON.stringify({
          executive_summary: 'Test',
          threat_level: 'medium',
          priority_actions: ['action'],
          nested: {
            deep: {
              object: 'value',
            },
          },
        });

        const result = parseStructuredResponse(json);
        expect(result).not.toBeNull();
      });
    });

    describe('type validation', () => {
      it('should accept when executive_summary is a string', () => {
        const json = JSON.stringify({
          executive_summary: 'Valid string',
          threat_level: 'high',
          priority_actions: [],
        });

        const result = parseStructuredResponse(json);
        expect(result).not.toBeNull();
      });

      it('should accept when threat_level is a string', () => {
        const json = JSON.stringify({
          executive_summary: 'Test',
          threat_level: 'high',
          priority_actions: [],
        });

        const result = parseStructuredResponse(json);
        expect(result).not.toBeNull();
      });

      it('should accept when priority_actions is an array', () => {
        const json = JSON.stringify({
          executive_summary: 'Test',
          threat_level: 'high',
          priority_actions: ['action1', 'action2'],
        });

        const result = parseStructuredResponse(json);
        expect(result).not.toBeNull();
      });

      it('should accept empty priority_actions array', () => {
        const json = JSON.stringify({
          executive_summary: 'Test',
          threat_level: 'high',
          priority_actions: [],
        });

        const result = parseStructuredResponse(json);
        expect(result).not.toBeNull();
        expect(result?.priority_actions).toEqual([]);
      });
    });
  });
});
