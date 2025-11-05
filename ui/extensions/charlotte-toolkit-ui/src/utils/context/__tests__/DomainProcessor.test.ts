import { describe, expect, it } from 'vitest';
import type { ContextOption } from '../../../types';
import { extractDomainsFromDetection, processDomains } from '../DomainProcessor';

describe('DomainProcessor', () => {
  describe('processDomains', () => {
    it('should return empty array for null input', () => {
      expect(processDomains(null)).toEqual([]);
    });

    it('should return empty array for undefined input', () => {
      expect(processDomains(undefined)).toEqual([]);
    });

    it('should return empty array for empty object', () => {
      expect(processDomains({})).toEqual([]);
    });

    describe('domain_names processing', () => {
      it('should process single domain', () => {
        const input = { domain_names: ['example.com'] };
        const result = processDomains(input);

        expect(result.length).toBeGreaterThan(0);
        const tldOption = result.find((opt) => opt.subType === 'tld');
        const domainOption = result.find((opt) => opt.subType === 'fqdn');

        expect(tldOption).toBeDefined();
        expect(domainOption).toBeDefined();
      });

      it('should process multiple domains under same TLD', () => {
        const input = { domain_names: ['www.example.com', 'api.example.com'] };
        const result = processDomains(input);

        const tldOptions = result.filter((opt) => opt.subType === 'tld');
        expect(tldOptions).toHaveLength(1);
        expect(tldOptions[0]?.displayName).toContain('2 instances');
      });

      it('should filter out internal domains (.local)', () => {
        const input = { domain_names: ['example.com', 'server.local'] };
        const result = processDomains(input);

        const domains = result.filter((opt) => opt.subType === 'fqdn');
        expect(domains).toHaveLength(1);
        expect(domains[0]?.displayName).toBe('example.com');
      });

      it('should filter out internal domains (.internal)', () => {
        const input = { domain_names: ['example.com', 'service.internal'] };
        const result = processDomains(input);

        const domains = result.filter((opt) => opt.subType === 'fqdn');
        expect(domains).toHaveLength(1);
      });

      it('should handle empty domain_names array', () => {
        const input = { domain_names: [] };
        const result = processDomains(input);
        expect(result).toEqual([]);
      });

      it('should ignore null values in array', () => {
        const input = { domain_names: ['example.com', null, 'test.com'] };
        const result = processDomains(input);

        const domains = result.filter((opt) => opt.subType === 'fqdn');
        expect(domains).toHaveLength(2);
      });

      it('should ignore non-string values', () => {
        const input = { domain_names: ['example.com', 123, 'test.com'] };
        const result = processDomains(input);

        const domains = result.filter((opt) => opt.subType === 'fqdn');
        expect(domains).toHaveLength(2);
      });

      it('should convert domains to lowercase', () => {
        const input = { domain_names: ['EXAMPLE.COM'] };
        const result = processDomains(input);

        const domain = result.find((opt) => opt.subType === 'fqdn');
        expect(domain?.displayName).toBe('example.com');
      });
    });

    describe('email_addresses processing', () => {
      it('should extract domain from email', () => {
        const input = { email_addresses: ['user@example.com'] };
        const result = processDomains(input);

        const domain = result.find((opt) => opt.subType === 'fqdn');
        expect(domain?.displayName).toBe('example.com');
      });

      it('should process multiple emails with same domain', () => {
        const input = { email_addresses: ['user1@example.com', 'user2@example.com'] };
        const result = processDomains(input);

        const tld = result.find((opt) => opt.subType === 'tld');
        expect(tld?.displayName).toContain('2 instances');
      });

      it('should filter out internal email domains', () => {
        const input = { email_addresses: ['user@example.com', 'admin@company.local'] };
        const result = processDomains(input);

        const domains = result.filter((opt) => opt.subType === 'fqdn');
        expect(domains).toHaveLength(1);
        expect(domains[0]?.displayName).toBe('example.com');
      });

      it('should handle malformed emails', () => {
        const input = { email_addresses: ['notanemail', 'valid@example.com'] };
        const result = processDomains(input);

        const domains = result.filter((opt) => opt.subType === 'fqdn');
        expect(domains).toHaveLength(1);
      });
    });

    describe('users processing', () => {
      it('should extract domain from user email format', () => {
        const input = { users: ['user@example.com'] };
        const result = processDomains(input);

        const domain = result.find((opt) => opt.subType === 'fqdn');
        expect(domain?.displayName).toBe('example.com');
      });

      it('should ignore non-email usernames', () => {
        const input = { users: ['username', 'user@example.com'] };
        const result = processDomains(input);

        const domains = result.filter((opt) => opt.subType === 'fqdn');
        expect(domains).toHaveLength(1);
      });
    });

    describe('host_names processing', () => {
      it('should process hostname as domain', () => {
        const input = { host_names: ['www.example.com'] };
        const result = processDomains(input);

        const domain = result.find((opt) => opt.subType === 'fqdn');
        expect(domain).toBeDefined();
      });

      it('should filter internal hostnames', () => {
        const input = { host_names: ['example.com', 'server.local'] };
        const result = processDomains(input);

        const domains = result.filter((opt) => opt.subType === 'fqdn');
        expect(domains).toHaveLength(1);
      });
    });

    describe('hierarchical structure', () => {
      it('should create TLD parent and domain children', () => {
        const input = { domain_names: ['example.com'] };
        const result = processDomains(input);

        const tld = result.find((opt) => opt.subType === 'tld');
        const domain = result.find((opt) => opt.subType === 'fqdn');

        expect(tld).toBeDefined();
        expect(domain).toBeDefined();
        expect(domain?.parentDomain).toBe('example.com');
      });

      it('should group multiple domains under same TLD', () => {
        const input = { domain_names: ['www.example.com', 'api.example.com', 'cdn.example.com'] };
        const result = processDomains(input);

        const tldOptions = result.filter((opt) => opt.subType === 'tld');
        const domainOptions = result.filter((opt) => opt.subType === 'fqdn');

        expect(tldOptions).toHaveLength(1);
        expect(domainOptions).toHaveLength(3);
      });

      it('should track domain counts in TLD', () => {
        const input = { domain_names: ['sub1.example.com', 'sub2.example.com'] };
        const result = processDomains(input);

        const tld = result.find((opt) => opt.subType === 'tld');
        expect(tld?.entityData?.domainCount).toBe(2);
      });

      it('should track sources in TLD', () => {
        const input = {
          domain_names: ['example.com'],
          email_addresses: ['user@example.com'],
        };
        const result = processDomains(input);

        const tld = result.find((opt) => opt.subType === 'tld');
        expect(tld?.entityData?.sources).toContain('domain_names');
        expect(tld?.entityData?.sources).toContain('email_addresses');
      });
    });

    describe('domain truncation', () => {
      it('should truncate long domains', () => {
        const longDomain =
          'very.long.subdomain.example.domain.that.exceeds.thirtytwo.characters.com';
        const input = { domain_names: [longDomain] };
        const result = processDomains(input);

        const domain = result.find((opt) => opt.subType === 'fqdn');
        expect(domain?.displayName.length).toBeLessThanOrEqual(32);
        expect(domain?.entityData?.isTruncated).toBe(true);
      });

      it('should not truncate short domains', () => {
        const input = { domain_names: ['example.com'] };
        const result = processDomains(input);

        const domain = result.find((opt) => opt.subType === 'fqdn');
        expect(domain?.entityData?.isTruncated).toBe(false);
      });
    });
  });

  describe('extractDomainsFromDetection', () => {
    it('should handle null detection', () => {
      const options: ContextOption[] = [];
      extractDomainsFromDetection(null, options);
      expect(options).toHaveLength(0);
    });

    it('should handle undefined detection', () => {
      const options: ContextOption[] = [];
      extractDomainsFromDetection(undefined, options);
      expect(options).toHaveLength(0);
    });

    it('should extract machine_domain from device', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          machine_domain: 'example.com',
        },
      };

      extractDomainsFromDetection(detection, options);

      expect(options).toHaveLength(1);
      expect(options[0]?.type).toBe('domain');
      expect(options[0]?.displayName).toBe('example.com');
    });

    it('should extract domain from hostinfo', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          hostinfo: {
            domain: 'example.com',
          },
        },
      };

      extractDomainsFromDetection(detection, options);
      expect(options).toHaveLength(1);
    });

    it('should avoid duplicate domains from device and hostinfo', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          machine_domain: 'example.com',
          hostinfo: {
            domain: 'example.com',
          },
        },
      };

      extractDomainsFromDetection(detection, options);
      expect(options).toHaveLength(1);
    });

    it('should extract domain from user_principal email', () => {
      const options: ContextOption[] = [];
      const detection = {
        user_principal: 'user@example.com',
      };

      extractDomainsFromDetection(detection, options);

      expect(options).toHaveLength(1);
      expect(options[0]?.entityData?.source).toBe('user_principal');
    });

    it('should filter internal domain from user_principal', () => {
      const options: ContextOption[] = [];
      const detection = {
        user_principal: 'admin@company.local',
      };

      extractDomainsFromDetection(detection, options);
      expect(options).toHaveLength(0);
    });

    it('should avoid duplicate from user_principal', () => {
      const options: ContextOption[] = [
        {
          value: 'domain:example.com',
          displayName: 'example.com',
          type: 'domain',
          queryTemplate: '',
        },
      ];
      const detection = {
        user_principal: 'user@example.com',
      };

      extractDomainsFromDetection(detection, options);
      expect(options).toHaveLength(1); // No duplicate added
    });

    it('should convert domains to lowercase', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          machine_domain: 'EXAMPLE.COM',
        },
      };

      extractDomainsFromDetection(detection, options);
      expect(options[0]?.displayName).toBe('example.com');
    });

    it('should handle non-object device', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: 'not-an-object',
      };

      extractDomainsFromDetection(detection, options);
      expect(options).toHaveLength(0);
    });

    it('should handle non-string machine_domain', () => {
      const options: ContextOption[] = [];
      const detection = {
        device: {
          machine_domain: 123,
        },
      };

      extractDomainsFromDetection(detection, options);
      expect(options).toHaveLength(0);
    });

    it('should handle malformed user_principal', () => {
      const options: ContextOption[] = [];
      const detection = {
        user_principal: 'notanemail',
      };

      extractDomainsFromDetection(detection, options);
      expect(options).toHaveLength(0);
    });
  });
});
