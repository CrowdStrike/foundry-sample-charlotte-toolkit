// src/utils/context/__tests__/EntityHelpers.test.ts

import {
  truncateHash,
  extractTopLevelDomain,
  truncateDomain,
  isDomainTruncated,
  formatDisplayName,
  isPublicIP,
  isExternalFQDN,
  calculateEntityCounts,
} from '../EntityHelpers';

import type { ContextOption } from '../../../types';

describe('EntityHelpers', () => {
  describe('truncateHash', () => {
    it('should return full hash if shorter than truncation length', () => {
      const shortHash = 'abcd1234';
      expect(truncateHash(shortHash)).toBe('abcd1234');
    });

    it('should not truncate MD5 hashes (32 chars = truncation length)', () => {
      const md5Hash = 'd41d8cd98f00b204e9800998ecf8427e';
      const result = truncateHash(md5Hash);
      expect(result).toBe(md5Hash); // 32 chars = HASH_TRUNCATION_LENGTH, so no truncation
    });

    it('should truncate SHA1 hashes properly (40 chars)', () => {
      const sha1Hash = 'da39a3ee5e6b4b0d3255bfef95601890afd80709';
      const result = truncateHash(sha1Hash);
      expect(result).toMatch(/^da39a3ee5e6b\.\.\.1890afd80709$/); // 12 chars + ... + 12 chars
      expect(result.length).toBeLessThan(sha1Hash.length);
    });

    it('should truncate SHA256 hashes properly (64 chars)', () => {
      const sha256Hash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
      const result = truncateHash(sha256Hash);
      expect(result).toMatch(/^e3b0c44298fc\.\.\.991b7852b855$/); // 12 chars + ... + 12 chars
      expect(result.length).toBeLessThan(sha256Hash.length);
    });

    it('should handle very long hashes', () => {
      const longHash = 'a'.repeat(100);
      const result = truncateHash(longHash);
      expect(result).toContain('...');
      expect(result.length).toBeLessThan(longHash.length);
      expect(result.startsWith('aaaaaaaa')).toBe(true);
      expect(result.endsWith('aaaaaaaa')).toBe(true);
    });

    it('should handle empty string', () => {
      expect(truncateHash('')).toBe('');
    });

    it('should handle single character', () => {
      expect(truncateHash('a')).toBe('a');
    });
  });

  describe('extractTopLevelDomain', () => {
    it('should extract standard TLD (com, org, net)', () => {
      expect(extractTopLevelDomain('example.com')).toBe('example.com');
      expect(extractTopLevelDomain('test.org')).toBe('test.org');
      expect(extractTopLevelDomain('site.net')).toBe('site.net');
    });

    it('should extract from subdomains', () => {
      expect(extractTopLevelDomain('sub.example.com')).toBe('example.com');
      expect(extractTopLevelDomain('www.google.com')).toBe('google.com');
      expect(extractTopLevelDomain('mail.subdomain.example.org')).toBe('example.org');
    });

    it('should handle two-part TLDs (co.uk, com.au)', () => {
      expect(extractTopLevelDomain('example.co.uk')).toBe('example.co.uk');
      expect(extractTopLevelDomain('test.com.au')).toBe('test.com.au');
      expect(extractTopLevelDomain('site.org.uk')).toBe('site.org.uk');
      expect(extractTopLevelDomain('example.gov.uk')).toBe('example.gov.uk');
      expect(extractTopLevelDomain('test.edu.au')).toBe('test.edu.au');
    });

    it('should handle subdomains with two-part TLDs', () => {
      expect(extractTopLevelDomain('www.example.co.uk')).toBe('example.co.uk');
      expect(extractTopLevelDomain('mail.test.com.au')).toBe('test.com.au');
      expect(extractTopLevelDomain('sub.domain.site.org.uk')).toBe('site.org.uk');
    });

    it('should handle edge cases', () => {
      expect(extractTopLevelDomain('single')).toBe('single');
      expect(extractTopLevelDomain('a.b')).toBe('a.b');
      expect(extractTopLevelDomain('')).toBe('');
    });

    it('should handle mixed case', () => {
      expect(extractTopLevelDomain('Example.COM')).toBe('example.com');
      expect(extractTopLevelDomain('Test.Co.UK')).toBe('Test.co.uk'); // Only the TLD part is lowercased
    });
  });

  describe('truncateDomain', () => {
    it('should return full domain if shorter than max length', () => {
      const shortDomain = 'example.com';
      expect(truncateDomain(shortDomain)).toBe('example.com');
    });

    it('should truncate long domains with default max length (32)', () => {
      const longDomain = 'very-long-subdomain-name.example-domain.com';
      const result = truncateDomain(longDomain);
      expect(result).toBe('very-long-subdomain-name.exam...');
      expect(result.length).toBe(32);
    });

    it('should truncate with custom max length', () => {
      const domain = 'subdomain.example.com';
      const result = truncateDomain(domain, 15);
      expect(result).toBe('subdomain.ex...');
      expect(result.length).toBe(15);
    });

    it('should handle very short max length gracefully', () => {
      const domain = 'example.com';
      const result = truncateDomain(domain, 5);
      expect(result).toBe('ex...');
      expect(result.length).toBe(5);
    });

    it('should handle edge cases with max length <= 3', () => {
      const domain = 'example.com';
      expect(truncateDomain(domain, 3)).toBe('example.com'); // Safety check returns original
      expect(truncateDomain(domain, 0)).toBe('example.com');
      expect(truncateDomain(domain, -1)).toBe('example.com');
    });

    it('should handle empty domain', () => {
      expect(truncateDomain('')).toBe('');
    });
  });

  describe('isDomainTruncated', () => {
    it('should return false for short domains', () => {
      expect(isDomainTruncated('example.com')).toBe(false);
      expect(isDomainTruncated('short.domain.org')).toBe(false);
    });

    it('should return true for long domains with default max length', () => {
      const longDomain = 'very-long-subdomain-name.example-domain.com';
      expect(isDomainTruncated(longDomain)).toBe(true);
    });

    it('should work with custom max length', () => {
      const domain = 'subdomain.example.com';
      expect(isDomainTruncated(domain, 15)).toBe(true);
      expect(isDomainTruncated(domain, 25)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isDomainTruncated('', 10)).toBe(false);
      expect(isDomainTruncated('a', 1)).toBe(false);
      expect(isDomainTruncated('ab', 1)).toBe(true);
    });
  });

  describe('formatDisplayName', () => {
    it('should format hash options with truncation info', () => {
      const md5Option: ContextOption = {
        value: 'md5:d41d8cd98f00b204e9800998ecf8427e',
        displayName: 'MD5: d41d8cd9...ecf8427e',
        type: 'file',
        subType: 'md5',
        queryTemplate: 'query template',
        entityData: {
          hash: 'd41d8cd98f00b204e9800998ecf8427e',
          hashType: 'MD5',
        },
      };

      const result = formatDisplayName(md5Option);
      expect(result.displayText).toBe('MD5: d41d8cd9...ecf8427e');
      expect(result.originalText).toBe('MD5: d41d8cd98f00b204e9800998ecf8427e');
    });

    it('should format SHA256 hash options', () => {
      const sha256Option: ContextOption = {
        value: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        displayName: 'SHA256: e3b0c442...852b855',
        type: 'file',
        subType: 'sha256',
        queryTemplate: 'query template',
        entityData: {
          hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          hashType: 'SHA256',
        },
      };

      const result = formatDisplayName(sha256Option);
      expect(result.displayText).toBe('SHA256: e3b0c442...852b855');
      expect(result.originalText).toBe('SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    });

    it('should format truncated domain options', () => {
      const domainOption: ContextOption = {
        value: 'domain:very-long-subdomain.example.com',
        displayName: 'very-long-subdomain.example...',
        type: 'domain',
        subType: 'fqdn',
        queryTemplate: 'query template',
        entityData: {
          fullDomain: 'very-long-subdomain.example.com',
          isTruncated: true,
        },
      };

      const result = formatDisplayName(domainOption);
      expect(result.displayText).toBe('very-long-subdomain.example...');
      expect(result.originalText).toBe('very-long-subdomain.example.com');
    });

    it('should handle non-truncated domain options', () => {
      const domainOption: ContextOption = {
        value: 'domain:example.com',
        displayName: 'example.com',
        type: 'domain',
        subType: 'fqdn',
        queryTemplate: 'query template',
        entityData: {
          fullDomain: 'example.com',
          isTruncated: false,
        },
      };

      const result = formatDisplayName(domainOption);
      expect(result.displayText).toBe('example.com');
      expect(result.originalText).toBe('example.com');
    });

    it('should handle options without special formatting', () => {
      const regularOption: ContextOption = {
        value: 'ip:192.168.1.1',
        displayName: '192.168.1.1',
        type: 'ip',
        queryTemplate: 'query template',
      };

      const result = formatDisplayName(regularOption);
      expect(result.displayText).toBe('192.168.1.1');
      expect(result.originalText).toBe('192.168.1.1');
    });

    it('should handle malformed hash display names', () => {
      const malformedOption: ContextOption = {
        value: 'md5:somehash',
        displayName: 'Invalid Format',
        type: 'file',
        subType: 'md5',
        queryTemplate: 'query template',
      };

      const result = formatDisplayName(malformedOption);
      expect(result.displayText).toBe('Invalid Format');
      expect(result.originalText).toBe('Invalid Format');
    });
  });

  describe('isPublicIP', () => {
    it('should identify public IP addresses', () => {
      expect(isPublicIP('8.8.8.8')).toBe(true); // Google DNS
      expect(isPublicIP('1.1.1.1')).toBe(true); // Cloudflare DNS
      expect(isPublicIP('208.67.222.222')).toBe(true); // OpenDNS
      expect(isPublicIP('4.4.4.4')).toBe(true); // Level3 DNS
      expect(isPublicIP('208.123.45.67')).toBe(true); // Random public IP
    });

    it('should identify private/internal IP addresses (RFC 1918)', () => {
      // 10.0.0.0/8
      expect(isPublicIP('10.0.0.1')).toBe(false);
      expect(isPublicIP('10.255.255.255')).toBe(false);
      expect(isPublicIP('10.123.45.67')).toBe(false);

      // 172.16.0.0/12
      expect(isPublicIP('172.16.0.1')).toBe(false);
      expect(isPublicIP('172.31.255.255')).toBe(false);
      expect(isPublicIP('172.20.1.1')).toBe(false);

      // 192.168.0.0/16
      expect(isPublicIP('192.168.0.1')).toBe(false);
      expect(isPublicIP('192.168.1.1')).toBe(false);
      expect(isPublicIP('192.168.255.255')).toBe(false);
    });

    it('should identify other non-routable ranges', () => {
      // Loopback (127.0.0.0/8)
      expect(isPublicIP('127.0.0.1')).toBe(false);
      expect(isPublicIP('127.1.2.3')).toBe(false);

      // Link-local (169.254.0.0/16)
      expect(isPublicIP('169.254.1.1')).toBe(false);
      expect(isPublicIP('169.254.255.255')).toBe(false);

      // Null route (0.0.0.0/8)
      expect(isPublicIP('0.0.0.0')).toBe(false);
      expect(isPublicIP('0.1.2.3')).toBe(false);

      // Multicast (224.0.0.0/4 and above)
      expect(isPublicIP('224.0.0.1')).toBe(false);
      expect(isPublicIP('239.255.255.255')).toBe(false);
      expect(isPublicIP('255.255.255.255')).toBe(false);
    });

    it('should handle invalid IP formats', () => {
      expect(isPublicIP('invalid')).toBe(false);
      expect(isPublicIP('192.168.1')).toBe(false); // Incomplete
      expect(isPublicIP('192.168.1.1.1')).toBe(false); // Too many octets
      expect(isPublicIP('192.168.256.1')).toBe(false); // Out of range
      expect(isPublicIP('192.168.-1.1')).toBe(false); // Negative
      expect(isPublicIP('192.168.abc.1')).toBe(false); // Non-numeric
      expect(isPublicIP('')).toBe(false);
      expect(isPublicIP('...')).toBe(false);
    });

    it('should handle edge cases for private ranges', () => {
      // Test boundaries of private ranges
      expect(isPublicIP('9.255.255.255')).toBe(true); // Just before 10.0.0.0/8
      expect(isPublicIP('11.0.0.0')).toBe(true); // Just after 10.0.0.0/8
      expect(isPublicIP('172.15.255.255')).toBe(true); // Just before 172.16.0.0/12
      expect(isPublicIP('172.32.0.0')).toBe(true); // Just after 172.31.255.255
      expect(isPublicIP('192.167.255.255')).toBe(true); // Just before 192.168.0.0/16
      expect(isPublicIP('192.169.0.0')).toBe(true); // Just after 192.168.255.255
    });
  });

  describe('isExternalFQDN', () => {
    it('should identify external/public domains', () => {
      expect(isExternalFQDN('google.com')).toBe(true);
      expect(isExternalFQDN('example.org')).toBe(true);
      expect(isExternalFQDN('malicious-site.net')).toBe(true);
      expect(isExternalFQDN('subdomain.example.com')).toBe(true);
      expect(isExternalFQDN('test.co.uk')).toBe(true);
    });

    it('should filter out internal domain patterns', () => {
      expect(isExternalFQDN('internal.local')).toBe(false);
      expect(isExternalFQDN('server.corp')).toBe(false);
      expect(isExternalFQDN('test.internal')).toBe(false);
      expect(isExternalFQDN('host.lan')).toBe(false);
      expect(isExternalFQDN('device.home')).toBe(true); // .home is NOT in INTERNAL_DOMAIN_PATTERNS
    });

    it('should reject invalid domain formats', () => {
      expect(isExternalFQDN('nodot')).toBe(false); // No dot
      expect(isExternalFQDN('.')).toBe(false); // Just dot
      expect(isExternalFQDN('localhost')).toBe(false); // Localhost
      expect(isExternalFQDN('192.168.1.1')).toBe(false); // IP address
      expect(isExternalFQDN('127.0.0.1')).toBe(false); // Loopback IP
      expect(isExternalFQDN('')).toBe(false); // Empty
    });

    it('should handle domain validation edge cases', () => {
      expect(isExternalFQDN('a.b')).toBe(false); // TLD too short (MIN_TLD_LENGTH = 2)
      expect(isExternalFQDN('test.x')).toBe(false); // TLD too short
      expect(isExternalFQDN('example.')).toBe(false); // Ends with dot
      expect(isExternalFQDN('.example.com')).toBe(true); // Function doesn't reject domains starting with dot
    });

    it('should handle case sensitivity', () => {
      expect(isExternalFQDN('Example.COM')).toBe(true);
      expect(isExternalFQDN('Test.LOCAL')).toBe(false);
      expect(isExternalFQDN('SERVER.CORP')).toBe(false);
    });
  });

  describe('calculateEntityCounts', () => {
    it('should calculate counts for empty options array', () => {
      const result = calculateEntityCounts([]);
      expect(result).toEqual({
        total: 0,
        domains: 0,
        files: 0,
        ips: 0,
        mitres: 0,
      });
    });

    it('should calculate counts for mixed entity types', () => {
      const options: ContextOption[] = [
        {
          value: 'domain:example.com',
          displayName: 'example.com',
          type: 'domain',
          subType: 'fqdn',
          queryTemplate: 'template',
        },
        {
          value: 'domain:test.org',
          displayName: 'test.org',
          type: 'domain',
          subType: 'fqdn',
          queryTemplate: 'template',
        },
        {
          value: 'file:malware.exe',
          displayName: 'malware.exe',
          type: 'file',
          subType: 'filename',
          queryTemplate: 'template',
        },
        {
          value: 'ip:192.168.1.1',
          displayName: '192.168.1.1',
          type: 'ip',
          queryTemplate: 'template',
        },
        {
          value: 'ip:10.0.0.1',
          displayName: '10.0.0.1',
          type: 'ip',
          queryTemplate: 'template',
        },
        {
          value: 'mitre:T1059',
          displayName: 'Command and Scripting Interpreter',
          type: 'mitre',
          subType: 'technique',
          queryTemplate: 'template',
        },
      ];

      const result = calculateEntityCounts(options);
      expect(result).toEqual({
        total: 6,
        domains: 2,
        files: 1,
        ips: 2,
        mitres: 1,
      });
    });

    it('should handle options with only one type', () => {
      const domainOptions: ContextOption[] = [
        {
          value: 'domain:example.com',
          displayName: 'example.com',
          type: 'domain',
          subType: 'fqdn',
          queryTemplate: 'template',
        },
        {
          value: 'domain:test.org',
          displayName: 'test.org',
          type: 'domain',
          subType: 'fqdn',
          queryTemplate: 'template',
        },
      ];

      const result = calculateEntityCounts(domainOptions);
      expect(result).toEqual({
        total: 2,
        domains: 2,
        files: 0,
        ips: 0,
        mitres: 0,
      });
    });

    it('should handle various subtypes within same type', () => {
      const fileOptions: ContextOption[] = [
        {
          value: 'file:malware.exe',
          displayName: 'malware.exe',
          type: 'file',
          subType: 'filename',
          queryTemplate: 'template',
        },
        {
          value: 'sha256:abcd1234',
          displayName: 'SHA256: abcd1234',
          type: 'file',
          subType: 'sha256',
          queryTemplate: 'template',
        },
        {
          value: 'md5:efgh5678',
          displayName: 'MD5: efgh5678',
          type: 'file',
          subType: 'md5',
          queryTemplate: 'template',
        },
      ];

      const result = calculateEntityCounts(fileOptions);
      expect(result).toEqual({
        total: 3,
        domains: 0,
        files: 3, // All have type 'file' regardless of subType
        ips: 0,
        mitres: 0,
      });
    });
  });
});
