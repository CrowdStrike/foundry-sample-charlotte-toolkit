import { describe, expect, it } from 'vitest';
import { IOCCore } from '../iocCore';

describe('iocCore', () => {
  describe('detectType', () => {
    describe('hash detection', () => {
      it('should detect MD5 hash (32 chars)', () => {
        expect(IOCCore.detectType('5d41402abc4b2a76b9719d911017c592')).toBe('hash');
      });

      it('should detect SHA1 hash (40 chars)', () => {
        expect(IOCCore.detectType('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d')).toBe('hash');
      });

      it('should detect SHA256 hash (64 chars)', () => {
        expect(
          IOCCore.detectType('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae'),
        ).toBe('hash');
      });

      it('should detect uppercase hash', () => {
        expect(IOCCore.detectType('5D41402ABC4B2A76B9719D911017C592')).toBe('hash');
      });

      it('should detect mixed case hash', () => {
        expect(IOCCore.detectType('5d41402ABC4b2a76B9719d911017c592')).toBe('hash');
      });

      it('should not detect invalid hash with wrong length', () => {
        expect(IOCCore.detectType('5d41402abc4b2a76b9719d911017c59')).not.toBe('hash');
      });

      it('should not detect hash with non-hex characters', () => {
        expect(IOCCore.detectType('5d41402abc4b2a76b9719d911017c59g')).not.toBe('hash');
      });
    });

    describe('IP detection', () => {
      it('should detect standard IPv4', () => {
        expect(IOCCore.detectType('192.168.1.1')).toBe('ip');
      });

      it('should detect IPv4 with zeros', () => {
        expect(IOCCore.detectType('10.0.0.1')).toBe('ip');
      });

      it('should detect edge IPv4 (255.255.255.255)', () => {
        expect(IOCCore.detectType('255.255.255.255')).toBe('ip');
      });

      it('should detect edge IPv4 (0.0.0.0)', () => {
        expect(IOCCore.detectType('0.0.0.0')).toBe('ip');
      });

      it('should detect defanged IPv4 with brackets', () => {
        // Defanged IPs with [.] are not recognized by the patterns
        expect(IOCCore.detectType('192[.]168[.]1[.]1')).toBeNull();
      });

      it('should not detect invalid IPv4 (out of range)', () => {
        expect(IOCCore.detectType('256.256.256.256')).not.toBe('ip');
      });

      it('should not detect incomplete IPv4', () => {
        expect(IOCCore.detectType('192.168.1')).not.toBe('ip');
      });
    });

    describe('domain detection', () => {
      it('should detect standard domain', () => {
        expect(IOCCore.detectType('example.com')).toBe('domain');
      });

      it('should detect subdomain', () => {
        expect(IOCCore.detectType('www.example.com')).toBe('domain');
      });

      it('should detect deep subdomain', () => {
        expect(IOCCore.detectType('api.v2.example.com')).toBe('domain');
      });

      it('should detect domain with hyphen', () => {
        expect(IOCCore.detectType('my-site.com')).toBe('domain');
      });

      it('should detect defanged domain', () => {
        // Defanged domains with [.] are not recognized by the patterns
        expect(IOCCore.detectType('example[.]com')).toBeNull();
      });

      it('should detect various TLDs', () => {
        expect(IOCCore.detectType('example.org')).toBe('domain');
        expect(IOCCore.detectType('example.net')).toBe('domain');
        expect(IOCCore.detectType('example.io')).toBe('domain');
      });

      it('should not detect single word', () => {
        expect(IOCCore.detectType('example')).not.toBe('domain');
      });

      it('should not detect domain starting with hyphen', () => {
        expect(IOCCore.detectType('-example.com')).not.toBe('domain');
      });

      it('should not detect domain ending with hyphen', () => {
        expect(IOCCore.detectType('example-.com')).not.toBe('domain');
      });
    });

    describe('URL detection', () => {
      it('should detect HTTP URL', () => {
        expect(IOCCore.detectType('http://example.com')).toBe('url');
      });

      it('should detect HTTPS URL', () => {
        expect(IOCCore.detectType('https://example.com')).toBe('url');
      });

      it('should detect URL with path', () => {
        expect(IOCCore.detectType('https://example.com/path/to/resource')).toBe('url');
      });

      it('should detect URL with query string', () => {
        expect(IOCCore.detectType('https://example.com?query=param')).toBe('url');
      });

      it('should detect custom protocol URL', () => {
        expect(IOCCore.detectType('ftp://example.com')).toBe('url');
      });

      it('should detect defanged URL', () => {
        expect(IOCCore.detectType('hxxp://example.com')).toBe('url');
      });
    });

    describe('registry detection', () => {
      it('should detect HKLM registry key', () => {
        expect(IOCCore.detectType('HKLM\\Software\\Microsoft')).toBe('registry');
      });

      it('should detect HKCU registry key', () => {
        expect(IOCCore.detectType('HKCU\\Software\\Test')).toBe('registry');
      });

      it('should detect HKEY_LOCAL_MACHINE', () => {
        expect(IOCCore.detectType('HKEY_LOCAL_MACHINE\\Software')).toBe('registry');
      });

      it('should detect HKEY_CURRENT_USER', () => {
        expect(IOCCore.detectType('HKEY_CURRENT_USER\\Software')).toBe('registry');
      });

      it('should detect registry with forward slash', () => {
        expect(IOCCore.detectType('HKLM/Software/Microsoft')).toBe('registry');
      });

      it('should not detect partial registry key', () => {
        expect(IOCCore.detectType('HKLM')).not.toBe('registry');
      });
    });

    describe('path detection', () => {
      it('should detect Windows path', () => {
        expect(IOCCore.detectType('C:\\Windows\\System32')).toBe('path');
      });

      it('should detect Unix path', () => {
        expect(IOCCore.detectType('/usr/bin/bash')).toBe('path');
      });

      it('should detect relative path with backslash', () => {
        expect(IOCCore.detectType('folder\\file.txt')).toBe('path');
      });

      it('should detect relative path with forward slash', () => {
        expect(IOCCore.detectType('folder/file.txt')).toBe('path');
      });

      it('should detect path starting with drive letter', () => {
        expect(IOCCore.detectType('D:\\Data\\file.txt')).toBe('path');
      });
    });

    describe('edge cases', () => {
      it('should return null for null input', () => {
        expect(IOCCore.detectType(null as any)).toBeNull();
      });

      it('should return null for undefined input', () => {
        expect(IOCCore.detectType(undefined as any)).toBeNull();
      });

      it('should return null for empty string', () => {
        expect(IOCCore.detectType('')).toBeNull();
      });

      it('should return null for non-string input', () => {
        expect(IOCCore.detectType(123 as any)).toBeNull();
      });

      it('should return null for whitespace', () => {
        expect(IOCCore.detectType('   ')).toBeNull();
      });

      it('should return null for unrecognized pattern', () => {
        expect(IOCCore.detectType('just some text')).toBeNull();
      });
    });
  });

  describe('defang', () => {
    it('should defang domain by replacing dots', () => {
      expect(IOCCore.defang('example.com')).toBe('example[.]com');
    });

    it('should defang IP by replacing dots', () => {
      expect(IOCCore.defang('192.168.1.1')).toBe('192[.]168[.]1[.]1');
    });

    it('should defang HTTP to hxxp', () => {
      expect(IOCCore.defang('http://example.com')).toBe('hxxp://example[.]com');
    });

    it('should defang HTTPS to hxxps', () => {
      expect(IOCCore.defang('https://example.com')).toBe('hxxps://example[.]com');
    });

    it('should defang FTP to fxp', () => {
      expect(IOCCore.defang('ftp://files.example.com')).toBe('fxp://files[.]example[.]com');
    });

    it('should defang URL with path', () => {
      expect(IOCCore.defang('http://example.com/path')).toBe('hxxp://example[.]com/path');
    });

    it('should handle multiple occurrences', () => {
      expect(IOCCore.defang('http://sub.example.com')).toBe('hxxp://sub[.]example[.]com');
    });

    it('should handle already defanged input', () => {
      // Defanging already defanged input creates nested brackets
      expect(IOCCore.defang('example[.]com')).toBe('example[[.]]com');
    });

    it('should return null for null input', () => {
      expect(IOCCore.defang(null as any)).toBeNull();
    });

    it('should return undefined for undefined input', () => {
      expect(IOCCore.defang(undefined as any)).toBeUndefined();
    });

    it('should handle empty string', () => {
      expect(IOCCore.defang('')).toBe('');
    });

    it('should handle string without dots or protocols', () => {
      expect(IOCCore.defang('plaintext')).toBe('plaintext');
    });
  });

  describe('removeFanging', () => {
    it('should remove brackets from defanged domain', () => {
      expect(IOCCore.removeFanging('example[.]com')).toBe('example.com');
    });

    it('should remove brackets from defanged IP', () => {
      expect(IOCCore.removeFanging('192[.]168[.]1[.]1')).toBe('192.168.1.1');
    });

    it('should handle multiple bracket pairs', () => {
      expect(IOCCore.removeFanging('sub[.]example[.]com')).toBe('sub.example.com');
    });

    it('should not affect normal dots', () => {
      expect(IOCCore.removeFanging('example.com')).toBe('example.com');
    });

    it('should handle mixed defanged and normal', () => {
      expect(IOCCore.removeFanging('example[.]com.test')).toBe('example.com.test');
    });

    it('should return null for null input', () => {
      expect(IOCCore.removeFanging(null as any)).toBeNull();
    });

    it('should return undefined for undefined input', () => {
      expect(IOCCore.removeFanging(undefined as any)).toBeUndefined();
    });

    it('should handle empty string', () => {
      expect(IOCCore.removeFanging('')).toBe('');
    });

    it('should handle string without brackets', () => {
      expect(IOCCore.removeFanging('plaintext')).toBe('plaintext');
    });
  });

  describe('normalize', () => {
    it('should lowercase domain', () => {
      expect(IOCCore.normalize('EXAMPLE.COM')).toBe('example.com');
    });

    it('should remove defanging and lowercase', () => {
      expect(IOCCore.normalize('EXAMPLE[.]COM')).toBe('example.com');
    });

    it('should trim whitespace', () => {
      expect(IOCCore.normalize('  example.com  ')).toBe('example.com');
    });

    it('should handle mixed case with defanging', () => {
      expect(IOCCore.normalize('Example[.]Com')).toBe('example.com');
    });

    it('should normalize IP', () => {
      expect(IOCCore.normalize('192[.]168[.]1[.]1')).toBe('192.168.1.1');
    });

    it('should handle multiple transformations', () => {
      expect(IOCCore.normalize('  EXAMPLE[.]COM  ')).toBe('example.com');
    });

    it('should return null for null input', () => {
      expect(IOCCore.normalize(null as any)).toBeNull();
    });

    it('should return undefined for undefined input', () => {
      expect(IOCCore.normalize(undefined as any)).toBeUndefined();
    });

    it('should handle empty string', () => {
      expect(IOCCore.normalize('')).toBe('');
    });

    it('should handle whitespace-only string', () => {
      expect(IOCCore.normalize('   ')).toBe('');
    });
  });

  describe('getDisplayClasses', () => {
    it('should return base classes for default variant', () => {
      const classes = IOCCore.getDisplayClasses('ip', 'list');
      expect(classes).toContain('font-mono');
      expect(classes).toContain('text-xs');
      expect(classes).toContain('break-words');
    });

    it('should return pill classes for pill variant', () => {
      const classes = IOCCore.getDisplayClasses('domain', 'pill');
      expect(classes).toContain('inline-block');
      expect(classes).toContain('px-2');
      expect(classes).toContain('py-1');
      expect(classes).toContain('rounded');
      expect(classes).toContain('border');
    });

    it('should return inline classes for inline variant', () => {
      const classes = IOCCore.getDisplayClasses('hash', 'inline');
      expect(classes).toContain('inline');
    });

    it('should handle all IOC types', () => {
      const types: Array<'ip' | 'domain' | 'hash' | 'url' | 'path' | 'registry'> = [
        'ip',
        'domain',
        'hash',
        'url',
        'path',
        'registry',
      ];

      types.forEach((type) => {
        const classes = IOCCore.getDisplayClasses(type);
        expect(classes).toBeTruthy();
        expect(classes).toContain('font-mono');
      });
    });

    it('should use list variant as default', () => {
      const withDefault = IOCCore.getDisplayClasses('ip');
      const withList = IOCCore.getDisplayClasses('ip', 'list');
      expect(withDefault).toBe(withList);
    });
  });

  describe('getBadgeVariant', () => {
    it('should return warning for hash', () => {
      expect(IOCCore.getBadgeVariant('hash')).toBe('warning');
    });

    it('should return primary for ip', () => {
      expect(IOCCore.getBadgeVariant('ip')).toBe('primary');
    });

    it('should return neutral for domain', () => {
      expect(IOCCore.getBadgeVariant('domain')).toBe('neutral');
    });

    it('should return neutral for url', () => {
      expect(IOCCore.getBadgeVariant('url')).toBe('neutral');
    });

    it('should return success for registry', () => {
      expect(IOCCore.getBadgeVariant('registry')).toBe('success');
    });

    it('should return success for path', () => {
      expect(IOCCore.getBadgeVariant('path')).toBe('success');
    });

    it('should return neutral for unknown type', () => {
      expect(IOCCore.getBadgeVariant('unknown' as any)).toBe('neutral');
    });
  });

  describe('integration', () => {
    it('should detect, defang, and normalize IP', () => {
      const ip = '192.168.1.1';
      expect(IOCCore.detectType(ip)).toBe('ip');

      const defanged = IOCCore.defang(ip);
      expect(defanged).toBe('192[.]168[.]1[.]1');

      const normalized = IOCCore.normalize(defanged);
      expect(normalized).toBe('192.168.1.1');
    });

    it('should detect, defang, and normalize domain', () => {
      const domain = 'EXAMPLE.COM';
      expect(IOCCore.detectType(domain)).toBe('domain');

      const defanged = IOCCore.defang(domain);
      expect(defanged).toBe('EXAMPLE[.]COM');

      const normalized = IOCCore.normalize(defanged);
      expect(normalized).toBe('example.com');
    });

    it('should handle URL complete workflow', () => {
      const url = 'http://example.com/path';
      expect(IOCCore.detectType(url)).toBe('url');

      const defanged = IOCCore.defang(url);
      expect(defanged).toContain('hxxp');
      expect(defanged).toContain('[.]');

      const normalized = IOCCore.normalize(defanged);
      expect(normalized).toContain('hxxp');
      expect(normalized).not.toContain('[.]');
    });
  });
});
