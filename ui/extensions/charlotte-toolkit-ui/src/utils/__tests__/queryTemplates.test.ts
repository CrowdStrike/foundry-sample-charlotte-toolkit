// src/utils/__tests__/queryTemplates.test.ts

import {
  createDomainQueryTemplate,
  createFileQueryTemplate,
  createHashQueryTemplate,
  createIPQueryTemplate,
  createFQDNQueryTemplate,
  createHostnameQueryTemplate,
  createUserQueryTemplate,
  createMitreQueryTemplate,
  createQueryTemplate,
  createGroupedFileTemplate,
} from '../queryTemplates';

describe('queryTemplates', () => {
  describe('createDomainQueryTemplate', () => {
    it('should create domain analysis template with domain name', () => {
      const domain = 'malicious-example.com';
      const result = createDomainQueryTemplate(domain);
      
      expect(result).toContain('domain "malicious-example.com"');
      expect(result).toContain('DOMAIN ANALYSIS');
      expect(result).toContain('Registration details and ownership information');
      expect(result).toContain('Common attack vectors and associated subdomains/URLs');
      expect(result).toContain('Threat classification (Malicious/Suspicious/Clean/Unknown)');
      expect(result).toContain('MITRE ATT&CK techniques');
      expect(result).toContain('SOC analysts and incident responders');
    });

    it('should handle domains with special characters', () => {
      const domain = 'test-domain_123.co.uk';
      const result = createDomainQueryTemplate(domain);
      
      expect(result).toContain('domain "test-domain_123.co.uk"');
      expect(result).toContain('DOMAIN ANALYSIS');
    });

    it('should handle empty domain string', () => {
      const result = createDomainQueryTemplate('');
      
      expect(result).toContain('domain ""');
      expect(result).toContain('DOMAIN ANALYSIS');
    });

    it('should handle unicode domain names', () => {
      const domain = 'тест.рф';
      const result = createDomainQueryTemplate(domain);
      
      expect(result).toContain('domain "тест.рф"');
    });
  });

  describe('createFileQueryTemplate', () => {
    it('should create file analysis template with filename', () => {
      const filename = 'malware.exe';
      const result = createFileQueryTemplate(filename);
      
      expect(result).toContain('file "malware.exe"');
      expect(result).toContain('FILE ANALYSIS');
      expect(result).toContain('File type, format identification, and behavioral analysis');
      expect(result).toContain('Associated hashes, registry keys, and network indicators');
      expect(result).toContain('Threat classification (Malicious/Suspicious/Clean/Unknown)');
    });

    it('should handle filenames with paths', () => {
      const filename = 'C:\\Windows\\System32\\suspicious.dll';
      const result = createFileQueryTemplate(filename);
      
      expect(result).toContain('file "C:\\Windows\\System32\\suspicious.dll"');
      expect(result).toContain('FILE ANALYSIS');
    });

    it('should handle filenames with special characters', () => {
      const filename = 'file-name_123[test].pdf';
      const result = createFileQueryTemplate(filename);
      
      expect(result).toContain('file "file-name_123[test].pdf"');
    });

    it('should handle empty filename', () => {
      const result = createFileQueryTemplate('');
      
      expect(result).toContain('file ""');
      expect(result).toContain('FILE ANALYSIS');
    });
  });

  describe('createHashQueryTemplate', () => {
    it('should create hash analysis template with default SHA256', () => {
      const hash = 'abc123def456789';
      const result = createHashQueryTemplate(hash);
      
      expect(result).toContain('SHA256 hash "abc123def456789"');
      expect(result).toContain('MALWARE ANALYSIS');
      expect(result).toContain('Malware family and variant identification');
      expect(result).toContain('Primary malware functions and capabilities');
      expect(result).toContain('MITRE ATT&CK techniques and tactics');
      expect(result).toContain('incident response and threat hunting');
    });

    it('should create hash analysis template with custom hash type', () => {
      const hash = 'def456abc789';
      const hashType = 'MD5';
      const result = createHashQueryTemplate(hash, hashType);
      
      expect(result).toContain('MD5 hash "def456abc789"');
      expect(result).toContain('MALWARE ANALYSIS');
      expect(result).toContain('Persistence mechanisms and behavior patterns');
    });

    it('should handle various hash types', () => {
      const hash = '1234567890abcdef';
      const hashTypes = ['SHA1', 'SHA512', 'SSDEEP', 'Imphash'];
      
      hashTypes.forEach(hashType => {
        const result = createHashQueryTemplate(hash, hashType);
        expect(result).toContain(`${hashType} hash "${hash}"`);
        expect(result).toContain('MALWARE ANALYSIS');
      });
    });

    it('should handle empty hash', () => {
      const result = createHashQueryTemplate('');
      
      expect(result).toContain('SHA256 hash ""');
      expect(result).toContain('MALWARE ANALYSIS');
    });

    it('should handle long hash strings', () => {
      const longHash = 'a'.repeat(64);
      const result = createHashQueryTemplate(longHash, 'SHA256');
      
      expect(result).toContain(`SHA256 hash "${longHash}"`);
    });
  });

  describe('createIPQueryTemplate', () => {
    it('should create IP analysis template for IPv4', () => {
      const ip = '192.168.1.100';
      const result = createIPQueryTemplate(ip);
      
      expect(result).toContain('IP address "192.168.1.100"');
      expect(result).toContain('IP ANALYSIS');
      expect(result).toContain('Geolocation, ISP information, and network infrastructure');
      expect(result).toContain('Network communication patterns, ports, and associated domains');
    });

    it('should create IP analysis template for IPv6', () => {
      const ip = '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
      const result = createIPQueryTemplate(ip);
      
      expect(result).toContain('IP address "2001:0db8:85a3:0000:0000:8a2e:0370:7334"');
      expect(result).toContain('IP ANALYSIS');
    });

    it('should handle localhost IP', () => {
      const ip = '127.0.0.1';
      const result = createIPQueryTemplate(ip);
      
      expect(result).toContain('IP address "127.0.0.1"');
    });

    it('should handle empty IP string', () => {
      const result = createIPQueryTemplate('');
      
      expect(result).toContain('IP address ""');
      expect(result).toContain('IP ANALYSIS');
    });
  });

  describe('createFQDNQueryTemplate', () => {
    it('should create FQDN analysis template', () => {
      const fqdn = 'mail.example.com';
      const result = createFQDNQueryTemplate(fqdn);
      
      expect(result).toContain('hostname "mail.example.com"');
      expect(result).toContain('HOSTNAME ANALYSIS');
      expect(result).toContain('DNS resolution and infrastructure details');
      expect(result).toContain('Network services, certificates, and subdomain patterns');
    });

    it('should handle complex FQDN', () => {
      const fqdn = 'very.long.subdomain.example.co.uk';
      const result = createFQDNQueryTemplate(fqdn);
      
      expect(result).toContain('hostname "very.long.subdomain.example.co.uk"');
    });
  });

  describe('createHostnameQueryTemplate', () => {
    it('should create hostname analysis template', () => {
      const hostname = 'workstation-01';
      const result = createHostnameQueryTemplate(hostname);
      
      expect(result).toContain('hostname "workstation-01"');
      expect(result).toContain('HOSTNAME ANALYSIS');
      expect(result).toContain('System identification and network infrastructure');
      expect(result).toContain('Network connections, services, and associated processes');
    });

    it('should handle hostname with domain', () => {
      const hostname = 'server.internal.corp';
      const result = createHostnameQueryTemplate(hostname);
      
      expect(result).toContain('hostname "server.internal.corp"');
    });
  });

  describe('createUserQueryTemplate', () => {
    it('should create user account analysis template', () => {
      const user = 'john.doe';
      const result = createUserQueryTemplate(user);
      
      expect(result).toContain('user account "john.doe"');
      expect(result).toContain('USER ACCOUNT ANALYSIS');
      expect(result).toContain('Account privileges, activity patterns, and authentication details');
      expect(result).toContain('Login history, privilege escalation attempts, and associated processes');
    });

    it('should handle user with domain', () => {
      const user = 'DOMAIN\\admin';
      const result = createUserQueryTemplate(user);
      
      expect(result).toContain('user account "DOMAIN\\admin"');
    });

    it('should handle email-format username', () => {
      const user = 'user@company.com';
      const result = createUserQueryTemplate(user);
      
      expect(result).toContain('user account "user@company.com"');
    });
  });

  describe('createMitreQueryTemplate', () => {
    it('should create MITRE technique template with ID only', () => {
      const techniqueId = 'T1055';
      const result = createMitreQueryTemplate(techniqueId);
      
      expect(result).toContain('MITRE ATT&CK technique "T1055"');
      expect(result).toContain('TECHNIQUE ANALYSIS');
      expect(result).toContain('DETECTION & MONITORING');
      expect(result).toContain('MITIGATION & PREVENTION');
      expect(result).toContain('THREAT INTELLIGENCE');
      expect(result).toContain('INCIDENT RESPONSE');
      expect(result).toContain('CONTEXTUAL ANALYSIS');
      expect(result).toContain('Key indicators and detection signatures');
      expect(result).toContain('APT groups and malware families');
    });

    it('should create MITRE technique template with ID and name', () => {
      const techniqueId = 'T1055';
      const techniqueName = 'Process Injection';
      const result = createMitreQueryTemplate(techniqueId, techniqueName);
      
      expect(result).toContain('MITRE ATT&CK technique "T1055 - Process Injection"');
      expect(result).toContain('TECHNIQUE ANALYSIS');
    });

    it('should handle sub-techniques', () => {
      const techniqueId = 'T1055.002';
      const techniqueName = 'Portable Executable Injection';
      const result = createMitreQueryTemplate(techniqueId, techniqueName);
      
      expect(result).toContain('MITRE ATT&CK technique "T1055.002 - Portable Executable Injection"');
    });

    it('should handle empty technique name', () => {
      const techniqueId = 'T1027';
      const result = createMitreQueryTemplate(techniqueId, '');
      
      expect(result).toContain('MITRE ATT&CK technique "T1027"');
    });
  });

  describe('createQueryTemplate', () => {
    it('should dispatch to domain template', () => {
      const result = createQueryTemplate('domain', 'example.com');
      
      expect(result).toContain('domain "example.com"');
      expect(result).toContain('DOMAIN ANALYSIS');
    });

    it('should dispatch to file template', () => {
      const result = createQueryTemplate('file', 'test.exe');
      
      expect(result).toContain('file "test.exe"');
      expect(result).toContain('FILE ANALYSIS');
    });

    it('should dispatch to IP template', () => {
      const result = createQueryTemplate('ip', '10.0.0.1');
      
      expect(result).toContain('IP address "10.0.0.1"');
      expect(result).toContain('IP ANALYSIS');
    });

    it('should dispatch to FQDN template', () => {
      const result = createQueryTemplate('fqdn', 'server.example.com');
      
      expect(result).toContain('hostname "server.example.com"');
      expect(result).toContain('HOSTNAME ANALYSIS');
    });

    it('should dispatch to hostname template', () => {
      const result = createQueryTemplate('hostname', 'workstation');
      
      expect(result).toContain('hostname "workstation"');
      expect(result).toContain('HOSTNAME ANALYSIS');
    });

    it('should dispatch to user template', () => {
      const result = createQueryTemplate('user', 'testuser');
      
      expect(result).toContain('user account "testuser"');
      expect(result).toContain('USER ACCOUNT ANALYSIS');
    });

    it('should dispatch to MITRE template', () => {
      const result = createQueryTemplate('mitre', 'T1234');
      
      expect(result).toContain('MITRE ATT&CK technique "T1234"');
      expect(result).toContain('TECHNIQUE ANALYSIS');
    });

    it('should dispatch to MITRE template with technique name', () => {
      const result = createQueryTemplate('mitre', 'T1234', { techniqueName: 'Test Technique' });
      
      expect(result).toContain('MITRE ATT&CK technique "T1234 - Test Technique"');
    });

    it('should handle file with hash type', () => {
      const result = createQueryTemplate('file', 'abc123', { hashType: 'MD5' });
      
      expect(result).toContain('MD5 hash "abc123"');
      expect(result).toContain('MALWARE ANALYSIS');
    });

    it('should handle unknown entity type gracefully', () => {
      // TypeScript won't allow this, but testing runtime behavior
      const result = createQueryTemplate('unknown' as any, 'test-value');
      
      expect(result).toContain('unknown "test-value"');
      expect(result).toContain('UNKNOWN ANALYSIS');
      expect(result).toContain('Entity-specific analysis and characteristics');
      expect(result).toContain('Related indicators and attack patterns');
    });

    it('should handle entity data parameter for various types', () => {
      // Test that entityData is handled properly for different types
      const domainResult = createQueryTemplate('domain', 'test.com', { extra: 'data' });
      expect(domainResult).toContain('domain "test.com"');
      
      const ipResult = createQueryTemplate('ip', '1.2.3.4', { location: 'US' });
      expect(ipResult).toContain('IP address "1.2.3.4"');
    });
  });

  describe('createGroupedFileTemplate', () => {
    it('should create grouped file template with default SHA256', () => {
      const filename = 'document.pdf';
      const hash = 'abc123def456';
      const result = createGroupedFileTemplate(filename, hash);
      
      expect(result).toContain('file "document.pdf" (SHA256: abc123def456)');
      expect(result).toContain('FILE ANALYSIS');
      expect(result).toContain('BEHAVIORAL ANALYSIS');
      expect(result).toContain('File type and format identification');
      expect(result).toContain('Primary file functions and capabilities');
      expect(result).toContain('Digital signatures and certificate information');
      expect(result).toContain('file-based threat analysis');
    });

    it('should create grouped file template with custom hash type', () => {
      const filename = 'malware.exe';
      const hash = 'def789abc123';
      const hashType = 'MD5';
      const result = createGroupedFileTemplate(filename, hash, hashType);
      
      expect(result).toContain('file "malware.exe" (MD5: def789abc123)');
      expect(result).toContain('FILE ANALYSIS');
      expect(result).toContain('BEHAVIORAL ANALYSIS');
    });

    it('should handle various hash types', () => {
      const filename = 'test.dll';
      const hash = '1234567890';
      const hashTypes = ['SHA1', 'SHA512', 'SSDEEP'];
      
      hashTypes.forEach(hashType => {
        const result = createGroupedFileTemplate(filename, hash, hashType);
        expect(result).toContain(`file "test.dll" (${hashType}: 1234567890)`);
        expect(result).toContain('FILE ANALYSIS');
      });
    });

    it('should handle empty inputs', () => {
      const result = createGroupedFileTemplate('', '');
      
      expect(result).toContain('file "" (SHA256: )');
      expect(result).toContain('FILE ANALYSIS');
    });

    it('should handle long filenames and hashes', () => {
      const longFilename = 'very-long-filename-with-many-characters.extension';
      const longHash = 'a'.repeat(64);
      const result = createGroupedFileTemplate(longFilename, longHash, 'SHA256');
      
      expect(result).toContain(`file "${longFilename}" (SHA256: ${longHash})`);
    });
  });

  describe('Template content validation', () => {
    it('should include all required sections in domain template', () => {
      const result = createDomainQueryTemplate('test.com');
      
      const requiredSections = [
        'DOMAIN ANALYSIS',
        'THREAT INTELLIGENCE',
        'INCIDENT CONTEXT',
        'RESPONSE ACTIONS',
        'CONFIDENCE ASSESSMENT'
      ];
      
      requiredSections.forEach(section => {
        expect(result).toContain(section);
      });
    });

    it('should include all required sections in MITRE template', () => {
      const result = createMitreQueryTemplate('T1055');
      
      const requiredSections = [
        'TECHNIQUE ANALYSIS',
        'DETECTION & MONITORING',
        'MITIGATION & PREVENTION',
        'THREAT INTELLIGENCE',
        'INCIDENT RESPONSE',
        'CONTEXTUAL ANALYSIS'
      ];
      
      requiredSections.forEach(section => {
        expect(result).toContain(section);
      });
    });

    it('should include consistent risk levels across templates', () => {
      const templates = [
        createDomainQueryTemplate('test.com'),
        createFileQueryTemplate('test.exe'),
        createIPQueryTemplate('1.2.3.4'),
        createHashQueryTemplate('abc123'),
      ];
      
      templates.forEach(template => {
        expect(template).toContain('Risk level (Critical/High/Medium/Low)');
      });
    });

    it('should include consistent threat classification across templates', () => {
      const templates = [
        createDomainQueryTemplate('test.com'),
        createFileQueryTemplate('test.exe'),
        createIPQueryTemplate('1.2.3.4'),
      ];
      
      templates.forEach(template => {
        expect(template).toContain('Threat classification (Malicious/Suspicious/Clean/Unknown)');
      });
    });

    it('should include actionable guidance in all templates', () => {
      const templates = [
        createDomainQueryTemplate('test.com'),
        createFileQueryTemplate('test.exe'),
        createHashQueryTemplate('abc123'),
        createMitreQueryTemplate('T1055'),
        createGroupedFileTemplate('test.exe', 'abc123'),
      ];
      
      templates.forEach(template => {
        expect(template.toLowerCase()).toMatch(/(actionable|guidance|analysts|responders)/);
      });
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle special characters in entity values', () => {
      const specialChars = ['<script>', '"quotes"', "'apostrophe'", '&amp;', '\n\t'];
      
      specialChars.forEach(char => {
        expect(() => createDomainQueryTemplate(char)).not.toThrow();
        expect(() => createFileQueryTemplate(char)).not.toThrow();
        expect(() => createIPQueryTemplate(char)).not.toThrow();
      });
    });

    it('should handle very long entity values', () => {
      const longValue = 'a'.repeat(1000);
      
      expect(() => createDomainQueryTemplate(longValue)).not.toThrow();
      expect(() => createFileQueryTemplate(longValue)).not.toThrow();
      expect(() => createHashQueryTemplate(longValue)).not.toThrow();
      
      const result = createDomainQueryTemplate(longValue);
      expect(result).toContain(longValue);
    });

    it('should handle null and undefined gracefully', () => {
      // These would cause TypeScript errors, but testing runtime behavior
      expect(() => createDomainQueryTemplate(null as any)).not.toThrow();
      expect(() => createFileQueryTemplate(undefined as any)).not.toThrow();
      
      const result = createDomainQueryTemplate(null as any);
      expect(result).toContain('domain "null"');
    });

    it('should maintain template structure with unusual inputs', () => {
      const weirdInputs = ['', '   ', '123', '!@#$%', '🔍💻🚨'];
      
      weirdInputs.forEach(input => {
        const result = createDomainQueryTemplate(input);
        expect(result).toContain('DOMAIN ANALYSIS');
        expect(result).toContain('THREAT INTELLIGENCE');
        expect(result).toContain('RESPONSE ACTIONS');
      });
    });
  });
});
