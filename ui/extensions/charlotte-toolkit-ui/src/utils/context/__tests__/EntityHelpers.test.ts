import { describe, expect, it } from 'vitest';
import type { ContextOption } from '../../../types';
import {
  calculateEntityCounts,
  extractTopLevelDomain,
  formatDisplayName,
  isExternalFQDN,
  isPublicIP,
  truncateDomain,
  truncateHash,
} from '../EntityHelpers';

describe('EntityHelpers', () => {
  describe('truncateHash', () => {
    it('should return short hash unchanged', () => {
      const shortHash = 'abc123';
      expect(truncateHash(shortHash)).toBe(shortHash);
    });

    it('should return hash at truncation length unchanged', () => {
      const hash = 'a'.repeat(20);
      expect(truncateHash(hash)).toBe(hash);
    });

    it('should not truncate MD5 hash at exactly 32 chars (at threshold)', () => {
      const md5 = '5d41402abc4b2a76b9719d911017c592';
      const result = truncateHash(md5);
      // MD5 is exactly at HASH_TRUNCATION_LENGTH, so not truncated
      expect(result).toBe(md5);
    });

    it('should truncate long SHA256 hash (64 chars)', () => {
      const sha256 = '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae';
      const result = truncateHash(sha256);
      expect(result).toContain('...');
      expect(result.length).toBeLessThan(sha256.length);
    });

    it('should show prefix and suffix of truncated hash', () => {
      const hash = 'abcdefghijklmnopqrstuvwxyz123456';
      const result = truncateHash(hash);
      expect(result).toMatch(/^abcdefgh.*123456$/);
    });

    it('should handle empty string', () => {
      expect(truncateHash('')).toBe('');
    });
  });

  describe('extractTopLevelDomain', () => {
    it('should extract standard TLD', () => {
      expect(extractTopLevelDomain('www.example.com')).toBe('example.com');
    });

    it('should extract from subdomain', () => {
      expect(extractTopLevelDomain('api.v2.example.org')).toBe('example.org');
    });

    it('should handle two-part domain', () => {
      expect(extractTopLevelDomain('example.com')).toBe('example.com');
    });

    it('should return single-part domain unchanged', () => {
      expect(extractTopLevelDomain('localhost')).toBe('localhost');
    });

    it('should handle co.uk TLD', () => {
      expect(extractTopLevelDomain('www.example.co.uk')).toBe('example.co.uk');
    });

    it('should handle com.au TLD', () => {
      expect(extractTopLevelDomain('www.example.com.au')).toBe('example.com.au');
    });

    it('should handle org.uk TLD', () => {
      expect(extractTopLevelDomain('api.example.org.uk')).toBe('example.org.uk');
    });

    it('should handle gov.uk TLD', () => {
      expect(extractTopLevelDomain('service.example.gov.uk')).toBe('example.gov.uk');
    });

    it('should handle net.au TLD', () => {
      expect(extractTopLevelDomain('www.example.net.au')).toBe('example.net.au');
    });

    it('should handle edu.au TLD', () => {
      expect(extractTopLevelDomain('portal.example.edu.au')).toBe('example.edu.au');
    });

    it('should handle mixed case and lowercase TLD check', () => {
      // Function lowercases parts for comparison but preserves original case
      expect(extractTopLevelDomain('WWW.EXAMPLE.COM')).toBe('example.com');
    });

    it('should handle empty string parts gracefully', () => {
      expect(extractTopLevelDomain('example.com')).toBe('example.com');
    });

    it('should not treat standard TLD as two-part when it is not', () => {
      expect(extractTopLevelDomain('example.org')).toBe('example.org');
    });
  });

  describe('truncateDomain', () => {
    it('should return short domain unchanged', () => {
      const domain = 'example.com';
      expect(truncateDomain(domain)).toBe(domain);
    });

    it('should truncate long domain at default 32 characters', () => {
      const longDomain = 'very.long.subdomain.example.domain.com';
      const result = truncateDomain(longDomain);
      expect(result.length).toBe(32);
      expect(result).toMatch(/\.\.\.$/);
    });

    it('should truncate at custom max length', () => {
      const domain = 'subdomain.example.com';
      const result = truncateDomain(domain, 15);
      expect(result.length).toBe(15);
      expect(result).toMatch(/\.\.\.$/);
    });

    it('should show beginning of domain', () => {
      const domain = 'aaa.bbb.ccc.ddd.eee.fff.ggg.hhh.com';
      const result = truncateDomain(domain);
      expect(result).toMatch(/^aaa\./);
    });

    it('should handle domain at exact max length', () => {
      const domain = 'a'.repeat(32);
      expect(truncateDomain(domain, 32)).toBe(domain);
    });

    it('should handle domain one char over max length', () => {
      const domain = 'a'.repeat(33);
      const result = truncateDomain(domain, 32);
      expect(result.length).toBe(32);
      expect(result).toContain('...');
    });

    it('should handle very short max length', () => {
      const domain = 'example.com';
      const result = truncateDomain(domain, 5);
      expect(result.length).toBe(5);
    });

    it('should return original if max length too small for truncation', () => {
      const domain = 'example.com';
      const result = truncateDomain(domain, 2);
      expect(result).toBe(domain);
    });

    it('should handle empty string', () => {
      expect(truncateDomain('')).toBe('');
    });
  });

  describe('formatDisplayName', () => {
    it('should return original display name for non-hash types', () => {
      const option: ContextOption = {
        value: 'example.com',
        displayName: 'example.com',
        type: 'domain',
        queryTemplate: '',
      };
      const result = formatDisplayName(option);
      expect(result.displayText).toBe('example.com');
      expect(result.originalText).toBe('example.com');
    });

    it('should format MD5 hash with truncation info', () => {
      const fullHash = '5d41402abc4b2a76b9719d911017c592';
      const truncatedHash = '5d41402a...1017c592';
      const option: ContextOption = {
        value: fullHash,
        displayName: `MD5: ${truncatedHash}`,
        type: 'file',
        subType: 'md5',
        queryTemplate: '',
        entityData: { hash: fullHash },
      };
      const result = formatDisplayName(option);
      expect(result.displayText).toBe(`MD5: ${truncatedHash}`);
      expect(result.originalText).toBe(`MD5: ${fullHash}`);
    });

    it('should format SHA256 hash with truncation info', () => {
      const fullHash = '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae';
      const truncatedHash = '2c26b46b...6266e7ae';
      const option: ContextOption = {
        value: fullHash,
        displayName: `SHA256: ${truncatedHash}`,
        type: 'file',
        subType: 'sha256',
        queryTemplate: '',
        entityData: { hash: fullHash },
      };
      const result = formatDisplayName(option);
      expect(result.displayText).toBe(`SHA256: ${truncatedHash}`);
      expect(result.originalText).toBe(`SHA256: ${fullHash}`);
    });

    it('should handle hash without truncation', () => {
      const shortHash = 'abc123';
      const option: ContextOption = {
        value: shortHash,
        displayName: `MD5: ${shortHash}`,
        type: 'file',
        subType: 'md5',
        queryTemplate: '',
        entityData: { hash: shortHash },
      };
      const result = formatDisplayName(option);
      expect(result.displayText).toBe(`MD5: ${shortHash}`);
      expect(result.originalText).toBe(`MD5: ${shortHash}`);
    });

    it('should format truncated domain', () => {
      const fullDomain = 'very.long.subdomain.example.com';
      const truncatedDomain = 'very.long.subdomain.exampl...';
      const option: ContextOption = {
        value: fullDomain,
        displayName: truncatedDomain,
        type: 'domain',
        subType: 'fqdn',
        queryTemplate: '',
        entityData: { fullDomain, isTruncated: true },
      };
      const result = formatDisplayName(option);
      expect(result.displayText).toBe(truncatedDomain);
      expect(result.originalText).toBe(fullDomain);
    });

    it('should handle non-truncated domain', () => {
      const domain = 'example.com';
      const option: ContextOption = {
        value: domain,
        displayName: domain,
        type: 'domain',
        subType: 'fqdn',
        queryTemplate: '',
        entityData: { fullDomain: domain, isTruncated: false },
      };
      const result = formatDisplayName(option);
      expect(result.displayText).toBe(domain);
      expect(result.originalText).toBe(domain);
    });

    it('should handle missing entityData', () => {
      const option: ContextOption = {
        value: 'test',
        displayName: 'test',
        type: 'domain',
        queryTemplate: '',
      };
      const result = formatDisplayName(option);
      expect(result.displayText).toBe('test');
      expect(result.originalText).toBe('test');
    });
  });

  describe('isPublicIP', () => {
    describe('public IPs', () => {
      it('should identify public IP', () => {
        expect(isPublicIP('8.8.8.8')).toBe(true);
      });

      it('should identify Google DNS', () => {
        expect(isPublicIP('8.8.4.4')).toBe(true);
      });

      it('should identify Cloudflare DNS', () => {
        expect(isPublicIP('1.1.1.1')).toBe(true);
      });

      it('should identify routable IP', () => {
        expect(isPublicIP('93.184.216.34')).toBe(true); // example.com
      });
    });

    describe('private IPs (RFC 1918)', () => {
      it('should reject 10.x.x.x range', () => {
        expect(isPublicIP('10.0.0.1')).toBe(false);
        expect(isPublicIP('10.255.255.255')).toBe(false);
      });

      it('should reject 172.16-31.x.x range', () => {
        expect(isPublicIP('172.16.0.1')).toBe(false);
        expect(isPublicIP('172.31.255.255')).toBe(false);
      });

      it('should accept 172.15.x.x (outside private range)', () => {
        expect(isPublicIP('172.15.0.1')).toBe(true);
      });

      it('should accept 172.32.x.x (outside private range)', () => {
        expect(isPublicIP('172.32.0.1')).toBe(true);
      });

      it('should reject 192.168.x.x range', () => {
        expect(isPublicIP('192.168.1.1')).toBe(false);
        expect(isPublicIP('192.168.255.255')).toBe(false);
      });
    });

    describe('special ranges', () => {
      it('should reject loopback (127.x.x.x)', () => {
        expect(isPublicIP('127.0.0.1')).toBe(false);
        expect(isPublicIP('127.255.255.255')).toBe(false);
      });

      it('should reject link-local (169.254.x.x)', () => {
        expect(isPublicIP('169.254.1.1')).toBe(false);
        expect(isPublicIP('169.254.255.255')).toBe(false);
      });

      it('should reject 0.0.0.0/8', () => {
        expect(isPublicIP('0.0.0.0')).toBe(false);
        expect(isPublicIP('0.255.255.255')).toBe(false);
      });

      it('should reject multicast (224-255.x.x.x)', () => {
        expect(isPublicIP('224.0.0.1')).toBe(false);
        expect(isPublicIP('255.255.255.255')).toBe(false);
      });
    });

    describe('invalid IPs', () => {
      it('should reject malformed IP', () => {
        expect(isPublicIP('256.1.1.1')).toBe(false);
      });

      it('should reject out of range octets', () => {
        expect(isPublicIP('192.168.1.256')).toBe(false);
      });

      it('should reject negative octets', () => {
        expect(isPublicIP('-1.0.0.0')).toBe(false);
      });

      it('should reject incomplete IP', () => {
        expect(isPublicIP('192.168.1')).toBe(false);
      });

      it('should reject too many octets', () => {
        expect(isPublicIP('192.168.1.1.1')).toBe(false);
      });

      it('should reject non-numeric octets', () => {
        expect(isPublicIP('192.168.a.1')).toBe(false);
      });

      it('should reject empty string', () => {
        expect(isPublicIP('')).toBe(false);
      });

      it('should reject hostname', () => {
        expect(isPublicIP('example.com')).toBe(false);
      });
    });
  });

  describe('isExternalFQDN', () => {
    describe('external domains', () => {
      it('should identify external domain', () => {
        expect(isExternalFQDN('example.com')).toBe(true);
      });

      it('should identify external subdomain', () => {
        expect(isExternalFQDN('www.example.com')).toBe(true);
      });

      it('should identify deep subdomain', () => {
        expect(isExternalFQDN('api.v2.example.com')).toBe(true);
      });
    });

    describe('internal/local domains', () => {
      it('should reject .local domain', () => {
        expect(isExternalFQDN('server.local')).toBe(false);
      });

      it('should reject .internal domain', () => {
        expect(isExternalFQDN('service.internal')).toBe(false);
      });

      it('should reject .corp domain', () => {
        expect(isExternalFQDN('intranet.corp')).toBe(false);
      });

      it('should reject .lan domain', () => {
        expect(isExternalFQDN('router.lan')).toBe(false);
      });

      it('should accept .home domain (not in default internal patterns)', () => {
        // .home is not in INTERNAL_DOMAIN_PATTERNS by default
        expect(isExternalFQDN('nas.home')).toBe(true);
      });
    });

    describe('invalid domains', () => {
      it('should reject single word', () => {
        expect(isExternalFQDN('localhost')).toBe(false);
      });

      it('should reject just a dot', () => {
        expect(isExternalFQDN('.')).toBe(false);
      });

      it('should reject literal "localhost"', () => {
        expect(isExternalFQDN('localhost')).toBe(false);
      });

      it('should reject IP address', () => {
        expect(isExternalFQDN('192.168.1.1')).toBe(false);
      });

      it('should reject domain without TLD', () => {
        expect(isExternalFQDN('example')).toBe(false);
      });

      it('should reject domain with single-char TLD', () => {
        expect(isExternalFQDN('example.c')).toBe(false);
      });

      it('should reject empty string', () => {
        expect(isExternalFQDN('')).toBe(false);
      });
    });

    describe('edge cases', () => {
      it('should handle mixed case internal domains', () => {
        expect(isExternalFQDN('SERVER.LOCAL')).toBe(false);
      });

      it('should accept external domain with valid two-char TLD', () => {
        expect(isExternalFQDN('example.co')).toBe(true);
      });

      it('should handle subdomain of internal domain', () => {
        expect(isExternalFQDN('api.service.local')).toBe(false);
      });
    });
  });

  describe('calculateEntityCounts', () => {
    it('should count zero entities', () => {
      const counts = calculateEntityCounts([]);
      expect(counts).toEqual({ total: 0, domains: 0, files: 0, ips: 0, mitres: 0 });
    });

    it('should count single entity', () => {
      const options: ContextOption[] = [
        { value: 'example.com', displayName: 'example.com', type: 'domain', queryTemplate: '' },
      ];
      const counts = calculateEntityCounts(options);
      expect(counts).toEqual({ total: 1, domains: 1, files: 0, ips: 0, mitres: 0 });
    });

    it('should count multiple entity types', () => {
      const options: ContextOption[] = [
        { value: 'example.com', displayName: 'example.com', type: 'domain', queryTemplate: '' },
        { value: 'test.txt', displayName: 'test.txt', type: 'file', queryTemplate: '' },
        { value: '8.8.8.8', displayName: '8.8.8.8', type: 'ip', queryTemplate: '' },
        { value: 'T1566', displayName: 'T1566', type: 'mitre', queryTemplate: '' },
      ];
      const counts = calculateEntityCounts(options);
      expect(counts).toEqual({ total: 4, domains: 1, files: 1, ips: 1, mitres: 1 });
    });

    it('should count multiple entities of same type', () => {
      const options: ContextOption[] = [
        { value: 'example.com', displayName: 'example.com', type: 'domain', queryTemplate: '' },
        { value: 'test.com', displayName: 'test.com', type: 'domain', queryTemplate: '' },
        { value: 'another.com', displayName: 'another.com', type: 'domain', queryTemplate: '' },
      ];
      const counts = calculateEntityCounts(options);
      expect(counts).toEqual({ total: 3, domains: 3, files: 0, ips: 0, mitres: 0 });
    });

    it('should handle mixed entities', () => {
      const options: ContextOption[] = [
        { value: 'd1', displayName: 'd1', type: 'domain', queryTemplate: '' },
        { value: 'd2', displayName: 'd2', type: 'domain', queryTemplate: '' },
        { value: 'f1', displayName: 'f1', type: 'file', queryTemplate: '' },
        { value: 'i1', displayName: 'i1', type: 'ip', queryTemplate: '' },
        { value: 'i2', displayName: 'i2', type: 'ip', queryTemplate: '' },
        { value: 'i3', displayName: 'i3', type: 'ip', queryTemplate: '' },
        { value: 'm1', displayName: 'm1', type: 'mitre', queryTemplate: '' },
      ];
      const counts = calculateEntityCounts(options);
      expect(counts).toEqual({ total: 7, domains: 2, files: 1, ips: 3, mitres: 1 });
    });
  });
});
