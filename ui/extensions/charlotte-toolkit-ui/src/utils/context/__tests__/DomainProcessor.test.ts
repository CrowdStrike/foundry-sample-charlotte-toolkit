// src/utils/context/__tests__/DomainProcessor.test.ts

import { processDomains, extractDomainsFromDetection } from '../DomainProcessor';
import { createQueryTemplate } from '../../queryTemplates';
import { extractTopLevelDomain, truncateDomain, isExternalFQDN } from '../EntityHelpers';

import type { ContextOption } from '../../../types';

// Mock dependencies
jest.mock('../../queryTemplates');
jest.mock('../EntityHelpers');

const mockCreateQueryTemplate = createQueryTemplate as jest.MockedFunction<typeof createQueryTemplate>;
const mockExtractTopLevelDomain = extractTopLevelDomain as jest.MockedFunction<typeof extractTopLevelDomain>;
const mockTruncateDomain = truncateDomain as jest.MockedFunction<typeof truncateDomain>;
const mockIsExternalFQDN = isExternalFQDN as jest.MockedFunction<typeof isExternalFQDN>;

describe('DomainProcessor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    mockCreateQueryTemplate.mockImplementation((type, value) => `query for ${type}: ${value}`);
    mockExtractTopLevelDomain.mockImplementation(domain => {
      // Simple TLD extraction logic for testing
      const parts = domain.toLowerCase().split('.');
      if (parts.length >= 2) {
        return parts.slice(-2).join('.');
      }
      return domain;
    });
    mockTruncateDomain.mockImplementation(domain => domain); // No truncation by default
    mockIsExternalFQDN.mockImplementation(domain => {
      // Mock external domain detection - exclude .local, .corp, etc.
      return !domain.toLowerCase().includes('.local') && 
             !domain.toLowerCase().includes('.corp') &&
             !domain.toLowerCase().includes('.internal') &&
             domain.includes('.');
    });
  });

  describe('processDomains', () => {
    it('should handle empty input', () => {
      const result = processDomains({});
      expect(result).toEqual([]);
    });

    it('should handle null/undefined input', () => {
      expect(processDomains(null as any)).toEqual([]);
      expect(processDomains(undefined as any)).toEqual([]);
    });

    it('should process domain_names array', () => {
      const entityValues = {
        domain_names: ['example.com', 'test.org']
      };

      const result = processDomains(entityValues);

      expect(mockIsExternalFQDN).toHaveBeenCalledWith('example.com');
      expect(mockIsExternalFQDN).toHaveBeenCalledWith('test.org');
      expect(result).toHaveLength(4); // 2 TLDs + 2 domains
      
      // Check TLD entries
      expect(result[0]).toMatchObject({
        type: 'domain',
        subType: 'tld',
        value: 'tld:example.com',
        entityData: expect.objectContaining({
          tld: 'example.com',
          domainCount: 1,
          totalCount: 1,
          sources: ['domain_names']
        })
      });
      
      // Check domain entries
      expect(result[1]).toMatchObject({
        type: 'domain',
        subType: 'fqdn',
        value: 'domain:example.com',
        parentDomain: 'example.com',
        entityData: expect.objectContaining({
          fullDomain: 'example.com',
          tld: 'example.com',
          count: 1,
          sources: ['domain_names']
        })
      });
    });

    it('should filter out internal domains', () => {
      const entityValues = {
        domain_names: ['example.com', 'internal.local', 'server.corp']
      };

      mockIsExternalFQDN.mockImplementation(domain => !domain.includes('.local') && !domain.includes('.corp'));

      const result = processDomains(entityValues);

      expect(result).toHaveLength(2); // Only external domain: 1 TLD + 1 domain
      expect(result[0].value).toBe('tld:example.com');
      expect(result[1].value).toBe('domain:example.com');
    });

    it('should extract domains from email addresses', () => {
      const entityValues = {
        email_addresses: ['user@gmail.com', 'admin@company.org']
      };

      const result = processDomains(entityValues);

      expect(mockIsExternalFQDN).toHaveBeenCalledWith('gmail.com');
      expect(mockIsExternalFQDN).toHaveBeenCalledWith('company.org');
      expect(result).toHaveLength(4); // 2 TLDs + 2 domains

      const gmailTld = result.find(r => r.value === 'tld:gmail.com');
      expect(gmailTld).toBeDefined();
      expect(gmailTld?.entityData.sources).toContain('email_addresses');
    });

    it('should extract domains from email-formatted users', () => {
      const entityValues = {
        users: ['john@example.com', 'mary@test.org', 'regularuser']
      };

      const result = processDomains(entityValues);

      // Should only process email-formatted users
      expect(mockIsExternalFQDN).toHaveBeenCalledWith('example.com');
      expect(mockIsExternalFQDN).toHaveBeenCalledWith('test.org');
      expect(result).toHaveLength(4); // 2 TLDs + 2 domains

      const exampleTld = result.find(r => r.value === 'tld:example.com');
      expect(exampleTld?.entityData.sources).toContain('users');
    });

    it('should extract domains from host_names', () => {
      const entityValues = {
        host_names: ['web.example.com', 'mail.company.org']
      };

      const result = processDomains(entityValues);

      expect(result).toHaveLength(4); // 2 TLDs + 2 domains
      
      const exampleTld = result.find(r => r.value === 'tld:example.com');
      expect(exampleTld?.entityData.sources).toContain('host_names');
    });

    it('should group domains by TLD with counts', () => {
      const entityValues = {
        domain_names: ['sub1.example.com', 'sub2.example.com'],
        email_addresses: ['user@example.com']
      };

      mockExtractTopLevelDomain.mockImplementation(() => 'example.com');

      const result = processDomains(entityValues);

      // Should have 1 TLD with 3 total instances and 3 domain entries
      expect(result).toHaveLength(4); // 1 TLD + 3 domains
      
      const tldEntry = result[0];
      expect(tldEntry.displayName).toBe('example.com (3 instances)');
      expect(tldEntry.entityData.totalCount).toBe(3);
      expect(tldEntry.entityData.domainCount).toBe(3);
      expect(tldEntry.entityData.sources).toEqual(['domain_names', 'email_addresses']);
    });

    it('should handle duplicate domains from different sources', () => {
      const entityValues = {
        domain_names: ['example.com'],
        email_addresses: ['user@example.com'],
        users: ['admin@example.com']
      };

      const result = processDomains(entityValues);

      expect(result).toHaveLength(2); // 1 TLD + 1 domain (duplicates merged)
      
      const tldEntry = result[0];
      expect(tldEntry.entityData.totalCount).toBe(3);
      expect(tldEntry.entityData.sources).toEqual(['domain_names', 'email_addresses', 'users']);
      
      const domainEntry = result[1];
      expect(domainEntry.entityData.count).toBe(3);
      expect(domainEntry.entityData.sources).toEqual(['domain_names', 'email_addresses', 'users']);
    });

    it('should handle domain truncation', () => {
      const entityValues = {
        domain_names: ['very-long-subdomain-name.example.com']
      };

      mockTruncateDomain.mockReturnValue('very-long-subdomain-name.exam...');

      const result = processDomains(entityValues);

      const domainEntry = result.find(r => r.subType === 'fqdn');
      expect(domainEntry?.displayName).toBe('very-long-subdomain-name.exam...');
      expect(domainEntry?.entityData.isTruncated).toBe(true);
    });

    it('should handle invalid/empty domain data', () => {
      const entityValues = {
        domain_names: [null, '', undefined, 123, 'valid.com'],
        email_addresses: ['invalid-email', '@missing-user.com', 'user@valid.org'],
        users: [null, '', 'user@valid.net'],
        host_names: ['', 'valid-host.com']
      };

      const result = processDomains(entityValues);

      // Should only process valid domains
      expect(mockIsExternalFQDN).toHaveBeenCalledWith('valid.com');
      expect(mockIsExternalFQDN).toHaveBeenCalledWith('valid.org');
      expect(mockIsExternalFQDN).toHaveBeenCalledWith('valid.net');
      expect(mockIsExternalFQDN).toHaveBeenCalledWith('valid-host.com');
      
      expect(result.length).toBeGreaterThan(0);
    });

    it('should create proper query templates', () => {
      const entityValues = {
        domain_names: ['example.com']
      };

      processDomains(entityValues);

      expect(mockCreateQueryTemplate).toHaveBeenCalledWith('domain', 'example.com');
    });

    it('should handle complex TLD grouping', () => {
      const entityValues = {
        domain_names: ['mail.google.com', 'drive.google.com', 'example.org']
      };

      mockExtractTopLevelDomain.mockImplementation(domain => {
        if (domain.includes('google.com')) return 'google.com';  // lgtm[js/incomplete-url-substring-sanitization]
        return 'example.org';
      });

      const result = processDomains(entityValues);

      expect(result).toHaveLength(5); // 2 TLDs + 3 domains
      
      const googleTld = result.find(r => r.value === 'tld:google.com');
      expect(googleTld?.displayName).toBe('google.com (2 instances)');
      expect(googleTld?.entityData.domainCount).toBe(2);
      
      const exampleTld = result.find(r => r.value === 'tld:example.org');
      expect(exampleTld?.displayName).toBe('example.org');
      expect(exampleTld?.entityData.domainCount).toBe(1);
    });
  });

  describe('extractDomainsFromDetection', () => {
    let options: ContextOption[];

    beforeEach(() => {
      options = [];
    });

    it('should handle null/undefined detection', () => {
      extractDomainsFromDetection(null, options);
      expect(options).toHaveLength(0);

      extractDomainsFromDetection(undefined, options);
      expect(options).toHaveLength(0);
    });

    it('should extract domain from device machine_domain', () => {
      const detection = {
        device: {
          machine_domain: 'EXAMPLE.COM'
        }
      };

      extractDomainsFromDetection(detection, options);

      expect(mockIsExternalFQDN).toHaveBeenCalledWith('EXAMPLE.COM');
      expect(options).toHaveLength(1);
      expect(options[0]).toMatchObject({
        type: 'domain',
        subType: 'fqdn',
        value: 'domain:example.com',
        displayName: 'example.com',
        entityData: expect.objectContaining({
          fullDomain: 'example.com'
        })
      });
    });

    it('should extract domain from device hostinfo', () => {
      const detection = {
        device: {
          hostinfo: {
            domain: 'company.org'
          }
        }
      };

      extractDomainsFromDetection(detection, options);

      expect(options).toHaveLength(1);
      expect(options[0].value).toBe('domain:company.org');
    });

    it('should avoid duplicates from device domains', () => {
      const detection = {
        device: {
          machine_domain: 'example.com',
          hostinfo: {
            domain: 'example.com'
          }
        }
      };

      extractDomainsFromDetection(detection, options);

      expect(options).toHaveLength(1); // Should not duplicate
    });

    it('should extract domain from user_principal email', () => {
      const detection = {
        user_principal: 'user@GMAIL.COM'
      };

      extractDomainsFromDetection(detection, options);

      expect(mockIsExternalFQDN).toHaveBeenCalledWith('gmail.com');
      expect(options).toHaveLength(1);
      expect(options[0]).toMatchObject({
        value: 'domain:gmail.com',
        entityData: expect.objectContaining({
          fullDomain: 'gmail.com',
          source: 'user_principal'
        })
      });
    });

    it('should not extract domain from non-email user_principal', () => {
      const detection = {
        user_principal: 'DOMAIN\\username'
      };

      extractDomainsFromDetection(detection, options);

      expect(options).toHaveLength(0);
    });

    it('should filter out internal domains from user_principal', () => {
      const detection = {
        user_principal: 'user@internal.corp'
      };

      mockIsExternalFQDN.mockReturnValue(false);

      extractDomainsFromDetection(detection, options);

      expect(options).toHaveLength(0);
    });

    it('should avoid duplicates in existing options array', () => {
      // Pre-populate options with existing domain
      options.push({
        value: 'domain:example.com',
        displayName: 'example.com',
        type: 'domain',
        subType: 'fqdn',
        queryTemplate: 'existing',
      });

      const detection = {
        device: {
          hostinfo: {
            domain: 'example.com'
          }
        },
        user_principal: 'user@example.com'
      };

      extractDomainsFromDetection(detection, options);

      expect(options).toHaveLength(1); // Should not add duplicates from hostinfo and user_principal
    });

    it('should handle domain truncation in detection', () => {
      const detection = {
        device: {
          machine_domain: 'very-long-subdomain-name.example.com'
        }
      };

      mockTruncateDomain.mockReturnValue('very-long-subdomain-name.exam...');

      extractDomainsFromDetection(detection, options);

      expect(options[0].displayName).toBe('very-long-subdomain-name.exam...');
      expect(options[0].entityData.isTruncated).toBe(true);
    });

    it('should handle missing device properties gracefully', () => {
      const detection = {
        device: {}
      };

      extractDomainsFromDetection(detection, options);

      expect(options).toHaveLength(0);
    });

    it('should handle missing user_principal gracefully', () => {
      const detection = {
        some_other_field: 'value'
      };

      extractDomainsFromDetection(detection, options);

      expect(options).toHaveLength(0);
    });

    it('should create proper query templates for detection domains', () => {
      const detection = {
        device: {
          machine_domain: 'example.com'
        }
      };

      extractDomainsFromDetection(detection, options);

      expect(mockCreateQueryTemplate).toHaveBeenCalledWith('domain', 'example.com');
    });
  });
});
