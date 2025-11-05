import { describe, expect, it } from 'vitest';
import { createQueryTemplate } from '../queryTemplates';

describe('queryTemplates', () => {
  describe('createQueryTemplate', () => {
    describe('domain queries', () => {
      it('should create domain analysis template', () => {
        const template = createQueryTemplate('domain', 'example.com');
        expect(template).toContain('example.com');
        expect(template).toContain('DOMAIN');
        expect(template).toContain('domain');
        expect(template).toContain('Registration details');
      });

      it('should handle subdomain', () => {
        const template = createQueryTemplate('domain', 'www.example.com');
        expect(template).toContain('www.example.com');
      });

      it('should include security analysis sections', () => {
        const template = createQueryTemplate('domain', 'test.com');
        expect(template).toContain('ANALYSIS');
        expect(template).toContain('THREAT INTELLIGENCE');
        expect(template).toContain('INCIDENT CONTEXT');
        expect(template).toContain('RESPONSE ACTIONS');
        expect(template).toContain('CONFIDENCE ASSESSMENT');
      });
    });

    describe('file queries', () => {
      it('should create file analysis template', () => {
        const template = createQueryTemplate('file', 'malware.exe');
        expect(template).toContain('malware.exe');
        expect(template).toContain('FILE');
        expect(template).toContain('file');
      });

      it('should create hash analysis template with hashType', () => {
        const template = createQueryTemplate('file', 'abc123...', { hashType: 'MD5' });
        expect(template).toContain('MD5');
        expect(template).toContain('abc123...');
        expect(template).toContain('MALWARE ANALYSIS');
      });

      it('should create hash analysis template with SHA256', () => {
        const template = createQueryTemplate('file', 'def456...', { hashType: 'SHA256' });
        expect(template).toContain('SHA256');
        expect(template).toContain('def456...');
      });

      it('should default to file template without hashType', () => {
        const template = createQueryTemplate('file', 'document.pdf', {});
        expect(template).toContain('document.pdf');
        expect(template).toContain('FILE');
        expect(template).not.toContain('MD5');
        expect(template).not.toContain('SHA256');
      });

      it('should handle hashType not being a string', () => {
        const template = createQueryTemplate('file', 'test.exe', { hashType: 123 });
        expect(template).toContain('FILE');
      });
    });

    describe('IP queries', () => {
      it('should create IP investigation template', () => {
        const template = createQueryTemplate('ip', '192.168.1.1');
        expect(template).toContain('192.168.1.1');
        expect(template).toContain('IP');
        expect(template).toContain('IP address');
        expect(template).toContain('Geolocation');
      });

      it('should handle public IP', () => {
        const template = createQueryTemplate('ip', '8.8.8.8');
        expect(template).toContain('8.8.8.8');
      });

      it('should handle IPv4 format', () => {
        const template = createQueryTemplate('ip', '10.0.0.1');
        expect(template).toContain('10.0.0.1');
      });
    });

    describe('FQDN queries', () => {
      it('should create FQDN analysis template', () => {
        const template = createQueryTemplate('fqdn', 'server.example.com');
        expect(template).toContain('server.example.com');
        expect(template).toContain('HOSTNAME');
        expect(template).toContain('hostname');
        expect(template).toContain('DNS resolution');
      });

      it('should include network services', () => {
        const template = createQueryTemplate('fqdn', 'mail.example.com');
        expect(template).toContain('Network services');
        expect(template).toContain('certificates');
      });
    });

    describe('hostname queries', () => {
      it('should create hostname analysis template', () => {
        const template = createQueryTemplate('hostname', 'WORKSTATION01');
        expect(template).toContain('WORKSTATION01');
        expect(template).toContain('HOSTNAME');
        expect(template).toContain('System identification');
      });

      it('should handle lowercase hostname', () => {
        const template = createQueryTemplate('hostname', 'server01');
        expect(template).toContain('server01');
      });
    });

    describe('user queries', () => {
      it('should create user account analysis template', () => {
        const template = createQueryTemplate('user', 'jdoe');
        expect(template).toContain('jdoe');
        expect(template).toContain('USER ACCOUNT');
        expect(template).toContain('user account');
        expect(template).toContain('Account privileges');
      });

      it('should include login history', () => {
        const template = createQueryTemplate('user', 'admin');
        expect(template).toContain('Login history');
        expect(template).toContain('privilege escalation');
      });
    });

    describe('MITRE queries', () => {
      it('should create MITRE technique template without technique name', () => {
        const template = createQueryTemplate('mitre', 'T1055');
        expect(template).toContain('T1055');
        expect(template).toContain('MITRE ATT&CK');
        expect(template).toContain('TECHNIQUE ANALYSIS');
      });

      it('should create MITRE technique template with technique name', () => {
        const template = createQueryTemplate('mitre', 'T1055', {
          techniqueName: 'Process Injection',
        });
        expect(template).toContain('T1055 - Process Injection');
      });

      it('should handle technique name not being a string', () => {
        const template = createQueryTemplate('mitre', 'T1566', { techniqueName: 123 });
        expect(template).toContain('T1566');
        expect(template).not.toContain('123');
      });

      it('should include all MITRE-specific sections', () => {
        const template = createQueryTemplate('mitre', 'T1027');
        expect(template).toContain('TECHNIQUE ANALYSIS');
        expect(template).toContain('DETECTION & MONITORING');
        expect(template).toContain('MITIGATION & PREVENTION');
        expect(template).toContain('THREAT INTELLIGENCE');
        expect(template).toContain('INCIDENT RESPONSE');
        expect(template).toContain('CONTEXTUAL ANALYSIS');
      });

      it('should mention APT groups and malware families', () => {
        const template = createQueryTemplate('mitre', 'T1059');
        expect(template).toContain('APT groups');
        expect(template).toContain('malware families');
      });
    });

    describe('template consistency', () => {
      it('should return non-empty template for all types', () => {
        const types: Array<Parameters<typeof createQueryTemplate>[0]> = [
          'domain',
          'file',
          'ip',
          'fqdn',
          'hostname',
          'user',
          'mitre',
        ];

        types.forEach((type) => {
          const template = createQueryTemplate(type, 'test-value');
          expect(template.length).toBeGreaterThan(100);
        });
      });

      it('should include entity value in all templates', () => {
        const types: Array<Parameters<typeof createQueryTemplate>[0]> = [
          'domain',
          'file',
          'ip',
          'fqdn',
          'hostname',
          'user',
          'mitre',
        ];

        types.forEach((type) => {
          const template = createQueryTemplate(type, 'unique-test-value-123');
          expect(template).toContain('unique-test-value-123');
        });
      });

      it('should be actionable and comprehensive', () => {
        const template = createQueryTemplate('domain', 'test.com');
        expect(template).toContain('actionable');
        expect(template).toContain('comprehensive');
      });
    });

    describe('edge cases', () => {
      it('should handle empty entity value', () => {
        const template = createQueryTemplate('domain', '');
        expect(template).toBeDefined();
        expect(template.length).toBeGreaterThan(0);
      });

      it('should handle special characters in entity value', () => {
        const template = createQueryTemplate('file', 'file!@#$%.exe');
        expect(template).toContain('file!@#$%.exe');
      });

      it('should handle unicode characters', () => {
        const template = createQueryTemplate('domain', '测试.com');
        expect(template).toContain('测试.com');
      });

      it('should handle very long entity values', () => {
        const longValue = 'a'.repeat(1000);
        const template = createQueryTemplate('domain', longValue);
        expect(template).toContain(longValue);
      });

      it('should handle entity data with extra properties', () => {
        const template = createQueryTemplate('file', 'test.exe', {
          hashType: 'MD5',
          extra: 'data',
          another: { nested: 'value' },
        });
        expect(template).toContain('MD5');
      });
    });
  });
});
