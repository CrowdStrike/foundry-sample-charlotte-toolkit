// Domain processing utilities

import type { ContextOption } from '../../types';
import { createQueryTemplate } from '../queryTemplates';

import { extractTopLevelDomain, isExternalFQDN, truncateDomain } from './EntityHelpers';

/**
 * Process domains with hierarchical structure: TLD as parent, full domains as children
 * Filters out internal/non-routable domains
 */
export const processDomains = (entityValues: unknown): ContextOption[] => {
  if (!entityValues) {
    return [];
  }

  const entityValuesRecord = entityValues as Record<string, unknown>;
  const domainMap = new Map<string, { count: number; sources: string[] }>();

  // Add domains from direct domain_names array
  if (entityValuesRecord.domain_names && Array.isArray(entityValuesRecord.domain_names)) {
    entityValuesRecord.domain_names.forEach((domain: string) => {
      if (domain && typeof domain === 'string' && isExternalFQDN(domain)) {
        const existing = domainMap.get(domain) ?? { count: 0, sources: [] };
        existing.count += 1;
        existing.sources.push('domain_names');
        domainMap.set(domain, existing);
      }
    });
  }

  // Add domains from email addresses
  if (entityValuesRecord.email_addresses && Array.isArray(entityValuesRecord.email_addresses)) {
    entityValuesRecord.email_addresses.forEach((email: string) => {
      const [, domain] = email.split('@');
      if (domain && isExternalFQDN(domain)) {
        const existing = domainMap.get(domain) ?? { count: 0, sources: [] };
        existing.count += 1;
        existing.sources.push('email_addresses');
        domainMap.set(domain, existing);
      }
    });
  }

  // Add domains from email-formatted usernames
  if (entityValuesRecord.users && Array.isArray(entityValuesRecord.users)) {
    entityValuesRecord.users.forEach((user: string) => {
      if (user && typeof user === 'string' && user.includes('@')) {
        const [, domain] = user.split('@');
        if (domain && isExternalFQDN(domain)) {
          const existing = domainMap.get(domain) ?? { count: 0, sources: [] };
          existing.count += 1;
          existing.sources.push('users');
          domainMap.set(domain, existing);
        }
      }
    });
  }

  // Add domains from host_names (previously handled by processFQDNs)
  if (entityValuesRecord.host_names && Array.isArray(entityValuesRecord.host_names)) {
    entityValuesRecord.host_names.forEach((hostname: string) => {
      if (hostname && typeof hostname === 'string' && isExternalFQDN(hostname)) {
        const existing = domainMap.get(hostname) ?? { count: 0, sources: [] };
        existing.count += 1;
        existing.sources.push('host_names');
        domainMap.set(hostname, existing);
      }
    });
  }

  // Group domains by their top-level domain
  const tldGroups = new Map<
    string,
    { domains: string[]; totalCount: number; allSources: string[] }
  >();

  domainMap.forEach(({ count, sources }, fullDomain) => {
    const tld = extractTopLevelDomain(fullDomain);

    if (!tldGroups.has(tld)) {
      tldGroups.set(tld, { domains: [], totalCount: 0, allSources: [] });
    }

    const group = tldGroups.get(tld);
    if (!group) return;
    group.domains.push(fullDomain);
    group.totalCount += count;

    // Add unique sources
    sources.forEach((source) => {
      if (!group.allSources.includes(source)) {
        group.allSources.push(source);
      }
    });
  });

  // Create hierarchical structure
  const options: ContextOption[] = [];

  tldGroups.forEach(({ domains, totalCount, allSources }, tld) => {
    // Create TLD as parent entry
    const tldDisplayName =
      totalCount > 1 ? `${tld.toLowerCase()} (${totalCount} instances)` : tld.toLowerCase();

    options.push({
      value: `tld:${tld}`,
      displayName: tldDisplayName,
      type: 'domain',
      subType: 'tld',
      queryTemplate: createQueryTemplate('domain', tld),
      entityData: {
        tld,
        domainCount: domains.length,
        totalCount,
        sources: allSources,
      },
    });

    // Create full domains as children under each TLD
    domains.forEach((fullDomain) => {
      const domainData = domainMap.get(fullDomain);
      if (!domainData) return;
      const truncatedDomain = truncateDomain(fullDomain);

      options.push({
        value: `domain:${fullDomain}`,
        displayName: truncatedDomain.toLowerCase(),
        type: 'domain',
        subType: 'fqdn',
        parentDomain: tld,
        queryTemplate: createQueryTemplate('domain', fullDomain),
        entityData: {
          fullDomain,
          tld,
          count: domainData.count,
          sources: domainData.sources,
          isTruncated: truncatedDomain !== fullDomain,
        },
      });
    });
  });

  return options;
};

/**
 * Extract domain entities from detection data with validation
 */
export const extractDomainsFromDetection = (detection: unknown, options: ContextOption[]): void => {
  if (!detection) return;

  const detectionRecord = detection as Record<string, unknown>;

  // Extract domains from device information
  if (detectionRecord.device && typeof detectionRecord.device === 'object') {
    const device = detectionRecord.device as Record<string, unknown>;
    // Domains from device
    if (typeof device.machine_domain === 'string' && isExternalFQDN(device.machine_domain)) {
      const domain = device.machine_domain.toLowerCase();
      const truncatedDomain = truncateDomain(domain);

      options.push({
        value: `domain:${domain}`,
        displayName: truncatedDomain,
        type: 'domain',
        subType: 'fqdn',
        queryTemplate: createQueryTemplate('domain', domain),
        entityData: {
          fullDomain: domain,
          isTruncated: truncatedDomain !== domain,
        },
      });
    }

    // Domain from hostinfo
    if (device.hostinfo && typeof device.hostinfo === 'object') {
      const hostinfo = device.hostinfo as Record<string, unknown>;
      if (typeof hostinfo.domain === 'string' && isExternalFQDN(hostinfo.domain)) {
        const domain = hostinfo.domain.toLowerCase();
        const truncatedDomain = truncateDomain(domain);

        // Avoid duplicates
        const domainExists = options.some((opt) => opt.value === `domain:${domain}`);
        if (!domainExists) {
          options.push({
            value: `domain:${domain}`,
            displayName: truncatedDomain,
            type: 'domain',
            subType: 'fqdn',
            queryTemplate: createQueryTemplate('domain', domain),
            entityData: {
              fullDomain: domain,
              isTruncated: truncatedDomain !== domain,
            },
          });
        }
      }
    }
  }

  // Extract domain from user email if it's external (e.g., gmail.com from user@gmail.com)
  // Note: We don't extract the user account itself as that's private information
  if (
    typeof detectionRecord.user_principal === 'string' &&
    detectionRecord.user_principal.includes('@')
  ) {
    const email = detectionRecord.user_principal.toLowerCase();
    const [, domain] = email.split('@');

    // Only add domain from email if external (e.g., gmail.com, outlook.com)
    // Internal domains like user@internal.system are filtered out by isExternalFQDN()
    if (domain && isExternalFQDN(domain)) {
      const truncatedDomain = truncateDomain(domain);

      // Avoid duplicates
      const domainExists = options.some((opt) => opt.value === `domain:${domain}`);
      if (!domainExists) {
        options.push({
          value: `domain:${domain}`,
          displayName: truncatedDomain,
          type: 'domain',
          subType: 'fqdn',
          queryTemplate: createQueryTemplate('domain', domain),
          entityData: {
            fullDomain: domain,
            isTruncated: truncatedDomain !== domain,
            source: 'user_principal',
          },
        });
      }
    }
  }
};
