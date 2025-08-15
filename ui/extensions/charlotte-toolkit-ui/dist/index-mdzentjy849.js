import { reactExports, jsxDevRuntimeExports, React, icon_default, details_default, checkbox_default, tooltip_default, select_default, option_default, input_default, button_default, textarea_default, divider_default, badge_default, card_default, Markdown, spinner_default, tab_group_default, tab_default, tab_panel_default, dropdown_default, menu_default, menu_item_default, FalconApi, setBasePath, ReactDOM } from './vendor-mdzentjy849.js';

var _jsxFileName$e = "/Users/mraible/dev/foundry-sample-charlotte-toolkit/ui/extensions/charlotte-toolkit-ui/src/components/ErrorBoundary.tsx";
/**
 * Error Boundary component to catch and handle React errors gracefully
 */
class ErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    // Error caught by boundary - details available in UI

    this.setState({
      error,
      errorInfo
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };
  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "error-boundary-container p-6 rounded-lg",
        style: {
          backgroundColor: 'var(--cs-background-base)',
          border: '1px solid var(--cs-border-color-light)',
          borderRadius: 'var(--spacing-base)',
          padding: 'var(--spacing-3xl)'
        },
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
          className: "flex items-center mb-4",
          children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
            className: "flex-shrink-0",
            children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("svg", {
              className: "h-5 w-5",
              style: {
                color: 'var(--cs-status-error)'
              },
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("path", {
                fillRule: "evenodd",
                d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                clipRule: "evenodd"
              }, void 0, false, {
                fileName: _jsxFileName$e,
                lineNumber: 82,
                columnNumber: 17
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName$e,
              lineNumber: 75,
              columnNumber: 15
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName$e,
            lineNumber: 74,
            columnNumber: 13
          }, this), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
            className: "ml-3",
            children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("h3", {
              className: "text-sm font-medium",
              style: {
                color: 'var(--cs-status-error)'
              },
              children: "Something went wrong"
            }, void 0, false, {
              fileName: _jsxFileName$e,
              lineNumber: 90,
              columnNumber: 15
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName$e,
            lineNumber: 89,
            columnNumber: 13
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName$e,
          lineNumber: 73,
          columnNumber: 11
        }, this), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
          className: "text-sm mb-4",
          style: {
            color: 'var(--cs-text-primary)'
          },
          children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
            children: "The application encountered an unexpected error. Please try refreshing the page or contact support if the problem persists."
          }, void 0, false, {
            fileName: _jsxFileName$e,
            lineNumber: 103,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName$e,
          lineNumber: 99,
          columnNumber: 11
        }, this), this.state.error && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("details", {
          className: "mb-4",
          children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("summary", {
            className: "text-sm font-medium cursor-pointer hover:opacity-80",
            style: {
              color: 'var(--cs-status-error)'
            },
            children: "Error Details"
          }, void 0, false, {
            fileName: _jsxFileName$e,
            lineNumber: 111,
            columnNumber: 15
          }, this), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
            className: "mt-2 text-xs font-mono p-2 rounded border",
            style: {
              color: 'var(--cs-text-secondary)',
              fontFamily: 'var(--font-family-mono)',
              backgroundColor: 'var(--cs-background-lighter)',
              border: '1px solid var(--cs-border-color-light)',
              padding: 'var(--spacing-lg)',
              borderRadius: 'var(--spacing-sm)'
            },
            children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
              className: "mb-2",
              children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("strong", {
                children: "Error:"
              }, void 0, false, {
                fileName: _jsxFileName$e,
                lineNumber: 129,
                columnNumber: 19
              }, this), " ", this.state.error.message]
            }, void 0, true, {
              fileName: _jsxFileName$e,
              lineNumber: 128,
              columnNumber: 17
            }, this), this.state.errorInfo && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
              children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("strong", {
                children: "Component Stack:"
              }, void 0, false, {
                fileName: _jsxFileName$e,
                lineNumber: 133,
                columnNumber: 21
              }, this), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("pre", {
                className: "whitespace-pre-wrap mt-1",
                children: this.state.errorInfo.componentStack
              }, void 0, false, {
                fileName: _jsxFileName$e,
                lineNumber: 134,
                columnNumber: 21
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName$e,
              lineNumber: 132,
              columnNumber: 19
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName$e,
            lineNumber: 117,
            columnNumber: 15
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName$e,
          lineNumber: 110,
          columnNumber: 13
        }, this), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
          className: "flex space-x-3",
          children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("button", {
            type: "button",
            onClick: this.handleReset,
            className: "inline-flex items-center px-3 py-2 border shadow-sm text-sm leading-4 font-medium rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2",
            style: {
              borderColor: 'var(--cs-border-color-light)',
              color: 'var(--cs-text-primary)',
              backgroundColor: 'var(--cs-background-base)',
              focusRingColor: 'var(--cs-primary)'
            },
            children: "Try Again"
          }, void 0, false, {
            fileName: _jsxFileName$e,
            lineNumber: 144,
            columnNumber: 13
          }, this), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("button", {
            type: "button",
            onClick: () => window.location.reload(),
            className: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2",
            style: {
              color: 'white',
              backgroundColor: 'var(--cs-status-error)',
              focusRingColor: 'var(--cs-status-error)'
            },
            children: "Refresh Page"
          }, void 0, false, {
            fileName: _jsxFileName$e,
            lineNumber: 157,
            columnNumber: 13
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName$e,
          lineNumber: 143,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName$e,
        lineNumber: 64,
        columnNumber: 9
      }, this);
    }
    return this.props.children;
  }
}

/**
 * Query template utilities for security analysis
 * Provides standardized templates for different types of security investigations
 */

/**
 * Base template structure for security analysis queries
 * Contains placeholders for entity-specific customization
 */
const BASE_SECURITY_TEMPLATE = `Conduct a comprehensive security analysis of {entityType} "{entityValue}" and provide a structured assessment including:

**🔍 {analysisType} ANALYSIS**
- {contextSpecific}
- Threat classification (Malicious/Suspicious/Clean/Unknown)
- Risk level (Critical/High/Medium/Low)

**⚔️ THREAT INTELLIGENCE**
- Known malicious activities and associations
- Malware families or campaigns linked to this {entityType}
- MITRE ATT&CK techniques if applicable

**🎯 INCIDENT CONTEXT**
- Relevance to current investigation
- {responseActions}
- Associated IOCs for hunting and blocking

**🚨 RESPONSE ACTIONS**
- Immediate containment and mitigation steps
- Detection rules and monitoring recommendations
- Investigation and forensic analysis guidance

**📊 CONFIDENCE ASSESSMENT**
- Analysis confidence level (High/Medium/Low)
- Data source reliability and validation
- Recommended next steps for verification

Provide specific, actionable guidance for SOC analysts and incident responders.`;

/**
 * Generate domain analysis query template for DNS and domain investigation
 * @param domain - Domain name to analyze (e.g., 'example.com')
 * @returns Structured query template for comprehensive domain security analysis
 */
const createDomainQueryTemplate = domain => {
  return BASE_SECURITY_TEMPLATE.replace(/{entityType}/g, 'domain').replace(/{entityValue}/g, domain).replace(/{analysisType}/g, 'DOMAIN').replace(/{contextSpecific}/g, 'Registration details and ownership information').replace(/{responseActions}/g, 'Common attack vectors and associated subdomains/URLs');
};

/**
 * Generate file analysis query template for file-based threat analysis
 * @param filename - Name of the file to analyze
 * @returns Structured query template for comprehensive file security analysis
 */
const createFileQueryTemplate = filename => {
  return BASE_SECURITY_TEMPLATE.replace(/{entityType}/g, 'file').replace(/{entityValue}/g, filename).replace(/{analysisType}/g, 'FILE').replace(/{contextSpecific}/g, 'File type, format identification, and behavioral analysis').replace(/{responseActions}/g, 'Associated hashes, registry keys, and network indicators');
};

/**
 * Generate hash analysis query template for malware analysis
 * @param hash - File hash to analyze
 * @param hashType - Type of hash (default: 'SHA256')
 * @returns Structured query template for comprehensive malware analysis
 */
const createHashQueryTemplate = (hash, hashType = 'SHA256') => {
  return `Conduct a comprehensive malware analysis of ${hashType} hash "${hash}" and provide a structured security assessment including:

**🦠 MALWARE ANALYSIS**
- Threat classification (Malicious/Suspicious/Clean/Unknown)
- Malware family and variant identification
- Risk level (Critical/High/Medium/Low)

**⚔️ ATTACK INTELLIGENCE**
- Primary malware functions and capabilities
- MITRE ATT&CK techniques and tactics
- Persistence mechanisms and behavior patterns

**🎯 INCIDENT CONTEXT**
- Relevance to current investigation
- Associated file names and execution contexts
- Related IOCs for hunting (domains, IPs, registry keys)

**🚨 RESPONSE ACTIONS**
- Immediate containment and isolation steps
- Detection rules and hunting queries
- Remediation and cleanup guidance

**📊 CONFIDENCE ASSESSMENT**
- Analysis confidence level (High/Medium/Low)
- Threat intelligence source reliability
- Recommended validation and sandbox analysis

Provide specific, actionable guidance for incident response and threat hunting.`;
};

/**
 * Generate IP analysis query template for network investigation
 * @param ip - IP address to analyze (IPv4 or IPv6)
 * @returns Structured query template for comprehensive IP address analysis
 */
const createIPQueryTemplate = ip => {
  return BASE_SECURITY_TEMPLATE.replace(/{entityType}/g, 'IP address').replace(/{entityValue}/g, ip).replace(/{analysisType}/g, 'IP').replace(/{contextSpecific}/g, 'Geolocation, ISP information, and network infrastructure').replace(/{responseActions}/g, 'Network communication patterns, ports, and associated domains');
};

/**
 * Generate FQDN analysis query template
 */
const createFQDNQueryTemplate = fqdn => {
  return BASE_SECURITY_TEMPLATE.replace(/{entityType}/g, 'hostname').replace(/{entityValue}/g, fqdn).replace(/{analysisType}/g, 'HOSTNAME').replace(/{contextSpecific}/g, 'DNS resolution and infrastructure details').replace(/{responseActions}/g, 'Network services, certificates, and subdomain patterns');
};

/**
 * Generate hostname analysis query template
 */
const createHostnameQueryTemplate = hostname => {
  return BASE_SECURITY_TEMPLATE.replace(/{entityType}/g, 'hostname').replace(/{entityValue}/g, hostname).replace(/{analysisType}/g, 'HOSTNAME').replace(/{contextSpecific}/g, 'System identification and network infrastructure').replace(/{responseActions}/g, 'Network connections, services, and associated processes');
};

/**
 * Generate user analysis query template
 */
const createUserQueryTemplate = user => {
  return BASE_SECURITY_TEMPLATE.replace(/{entityType}/g, 'user account').replace(/{entityValue}/g, user).replace(/{analysisType}/g, 'USER ACCOUNT').replace(/{contextSpecific}/g, 'Account privileges, activity patterns, and authentication details').replace(/{responseActions}/g, 'Login history, privilege escalation attempts, and associated processes');
};

/**
 * Generate MITRE ATT&CK technique analysis query template
 * @param techniqueId - MITRE technique ID (e.g., 'T1055')
 * @param techniqueName - Optional technique name for display
 * @returns Structured query template for comprehensive MITRE technique analysis
 */
const createMitreQueryTemplate = (techniqueId, techniqueName) => {
  const techniqueDisplay = techniqueName ? `${techniqueId} - ${techniqueName}` : techniqueId;
  return `Conduct a comprehensive analysis of MITRE ATT&CK technique "${techniqueDisplay}" and provide a structured assessment including:

**🎯 TECHNIQUE ANALYSIS**
- Technique overview and primary functionality
- Attack methodology and implementation methods
- Target systems and environments
- Risk level and prevalence in real-world attacks

**🔍 DETECTION & MONITORING**
- Key indicators and detection signatures
- Log sources and telemetry requirements
- Behavioral patterns and anomaly detection
- Detection rules and hunting queries

**🛡️ MITIGATION & PREVENTION**
- Specific security controls and countermeasures
- Configuration hardening recommendations
- Preventive technologies and solutions
- Network and endpoint protection strategies

**⚔️ THREAT INTELLIGENCE**
- APT groups and malware families using this technique
- Common attack chains and technique combinations
- Geographic and sector targeting patterns
- Recent campaigns and threat actor TTPs

**🚨 INCIDENT RESPONSE**
- Immediate containment and isolation steps
- Forensic artifacts and evidence collection
- Impact assessment and damage evaluation
- Recovery and remediation guidance

**📊 CONTEXTUAL ANALYSIS**
- Related techniques and sub-techniques
- Kill chain phase and tactical positioning
- Difficulty level and skill requirements
- Business impact and criticality assessment

Provide specific, actionable guidance for security analysts, SOC teams, and incident responders dealing with this MITRE ATT&CK technique.`;
};

/**
 * Create query template based on entity type and data
 * Dispatches to appropriate specialized template based on entity type
 * @param entityType - Type of entity to analyze
 * @param entityValue - Value/identifier of the entity
 * @param entityData - Optional additional data for template customization
 * @returns Structured query template optimized for the specific entity type
 */
const createQueryTemplate = (entityType, entityValue, entityData) => {
  switch (entityType) {
    case 'domain':
      return createDomainQueryTemplate(entityValue);
    case 'file':
      if (entityData?.hashType) {
        return createHashQueryTemplate(entityValue, entityData.hashType);
      }
      return createFileQueryTemplate(entityValue);
    case 'ip':
      return createIPQueryTemplate(entityValue);
    case 'fqdn':
      return createFQDNQueryTemplate(entityValue);
    case 'hostname':
      return createHostnameQueryTemplate(entityValue);
    case 'user':
      return createUserQueryTemplate(entityValue);
    case 'mitre':
      return createMitreQueryTemplate(entityValue, entityData?.techniqueName);
    default:
      {
        // This should never happen with the current type system, but provides a fallback
        const fallbackEntityType = entityType;
        return BASE_SECURITY_TEMPLATE.replace(/{entityType}/g, fallbackEntityType).replace(/{entityValue}/g, entityValue).replace(/{analysisType}/g, fallbackEntityType.toUpperCase()).replace(/{contextSpecific}/g, 'Entity-specific analysis and characteristics').replace(/{responseActions}/g, 'Related indicators and attack patterns');
      }
  }
};

// Context processing constants

// Hash display constants
const HASH_TRUNCATION_LENGTH = 32;
const HASH_DISPLAY_FORMAT = {
  PREFIX_LENGTH: 12,
  SUFFIX_LENGTH: 12,
  SEPARATOR: '...'
};

// IP filtering constants
const PRIVATE_IP_RANGES = {
  MULTICAST_START: 224};

// Domain filtering patterns
const INTERNAL_DOMAIN_PATTERNS = ['.lan', '.local', '.internal', '.corp', '.intranet', '.private', '.domain', '.ad'];

// Entity processing helper utilities


/**
 * Truncate hash values for better display with more characters
 */
const truncateHash = hash => {
  if (hash.length <= HASH_TRUNCATION_LENGTH) return hash;
  return `${hash.slice(0, Math.max(0, HASH_DISPLAY_FORMAT.PREFIX_LENGTH))}${HASH_DISPLAY_FORMAT.SEPARATOR}${hash.slice(Math.max(0, hash.length - HASH_DISPLAY_FORMAT.SUFFIX_LENGTH))}`;
};

/**
 * Extract top-level domain from full domain
 */
const extractTopLevelDomain = domain => {
  const parts = domain.split('.');
  if (parts.length < 2) return domain;

  // Handle common two-part TLDs (e.g., .co.uk, .com.au)
  const lastPart = parts.at(-1)?.toLowerCase() ?? '';
  const secondLastPart = parts.at(-2)?.toLowerCase() ?? '';
  const commonTwoPartTLDs = ['co.uk', 'com.au', 'org.uk', 'net.au', 'gov.uk', 'edu.au'];
  const twoPartTLD = `${secondLastPart}.${lastPart}`;
  if (commonTwoPartTLDs.includes(twoPartTLD) && parts.length >= 3) {
    return `${parts.at(-3)}.${twoPartTLD}`;
  }

  // Standard TLD (e.g., .com, .org, .net)
  return `${secondLastPart}.${lastPart}`;
};

/**
 * Smart domain truncation showing beginning with consistent 32-character maximum
 * Example: "aaa.bbb.ccc.ddd.com" becomes "aaa.bbb.ccc..." (32 chars max)
 */
const truncateDomain = (domain, maxLength = 32) => {
  if (domain.length <= maxLength) return domain;

  // Always truncate at the end with consistent character count
  const truncationSuffix = '...';
  const availableLength = maxLength - truncationSuffix.length;
  if (availableLength <= 0) return domain; // Safety check

  return domain.slice(0, Math.max(0, availableLength)) + truncationSuffix;
};

/**
 * Format display names for better readability
 * Returns both display text and original text for tooltip support
 */
const formatDisplayName = option => {
  if (option.subType === 'md5' || option.subType === 'sha256') {
    const hashMatch = option.displayName.match(/^(MD5|SHA256):\s*(.+)$/);
    if (hashMatch?.[1] && hashMatch[2]) {
      const [, type, displayedHash] = hashMatch; // This is already truncated

      // Get the original hash from entityData
      const originalHash = option.entityData?.hash;
      if (originalHash && originalHash !== displayedHash) {
        return {
          displayText: option.displayName,
          // Already formatted with truncated hash
          originalText: `${type}: ${originalHash}` // Show full hash in tooltip
        };
      }
    }
  }

  // For domain entries, check if it's truncated
  if (option.type === 'domain' && option.subType === 'fqdn' && option.entityData) {
    const {
      fullDomain,
      isTruncated
    } = option.entityData;
    if (isTruncated && fullDomain) {
      return {
        displayText: option.displayName,
        // Already truncated
        originalText: fullDomain // Show original full domain
      };
    }
  }
  return {
    displayText: option.displayName,
    originalText: option.displayName
  };
};

/**
 * Check if an IP address is public/routable (not private/internal)
 */
const isPublicIP = ip => {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some(part => Number.isNaN(Number(part)) || part < 0 || part > 255)) {
    return false;
  }
  const [a, b] = parts; // Safe because we validated length and values above

  // Private ranges (RFC 1918)
  if (a === 10) return false; // 10.0.0.0/8
  if (a === 172 && b >= 16 && b <= 31) return false; // 172.16.0.0/12
  if (a === 192 && b === 168) return false; // 192.168.0.0/16

  // Other non-routable ranges
  if (a === 127) return false; // 127.0.0.0/8 (loopback)
  if (a === 169 && b === 254) return false; // 169.254.0.0/16 (link-local)
  if (a === 0) return false; // 0.0.0.0/8
  if (a >= PRIVATE_IP_RANGES.MULTICAST_START) return false; // 224.0.0.0/4 (multicast/reserved)

  return true;
};

/**
 * Check if a hostname is external (not internal domain)
 */
const isExternalFQDN = hostname => {
  // Basic validation
  if (!hostname.includes('.')) return false;
  if (hostname === '.' || hostname === 'localhost') return false;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) return false;
  const parts = hostname.split('.');
  if (parts.length < 2 || (parts.at(-1)?.length ?? 0) < 2) return false;

  // Filter out internal domain patterns
  const lowerHostname = hostname.toLowerCase();
  return !INTERNAL_DOMAIN_PATTERNS.some(pattern => lowerHostname.endsWith(pattern));
};

/**
 * Calculate entity counts for each type
 */
const calculateEntityCounts = options => {
  return {
    total: options.length,
    domains: options.filter(opt => opt.type === 'domain').length,
    files: options.filter(opt => opt.type === 'file').length,
    ips: options.filter(opt => opt.type === 'ip').length,
    mitres: options.filter(opt => opt.type === 'mitre').length
  };
};

// Domain processing utilities


/**
 * Process domains with hierarchical structure: TLD as parent, full domains as children
 * Filters out internal/non-routable domains
 */
const processDomains = entityValues => {
  const domainMap = new Map();

  // Add domains from direct domain_names array
  if (entityValues.domain_names && Array.isArray(entityValues.domain_names)) {
    entityValues.domain_names.forEach(domain => {
      if (domain && typeof domain === 'string' && isExternalFQDN(domain)) {
        const existing = domainMap.get(domain) ?? {
          count: 0,
          sources: []
        };
        existing.count += 1;
        existing.sources.push('domain_names');
        domainMap.set(domain, existing);
      }
    });
  }

  // Add domains from email addresses
  if (entityValues.email_addresses && Array.isArray(entityValues.email_addresses)) {
    entityValues.email_addresses.forEach(email => {
      const [, domain] = email.split('@');
      if (domain && isExternalFQDN(domain)) {
        const existing = domainMap.get(domain) ?? {
          count: 0,
          sources: []
        };
        existing.count += 1;
        existing.sources.push('email_addresses');
        domainMap.set(domain, existing);
      }
    });
  }

  // Add domains from email-formatted usernames
  if (entityValues.users && Array.isArray(entityValues.users)) {
    entityValues.users.forEach(user => {
      if (user && typeof user === 'string' && user.includes('@')) {
        const [, domain] = user.split('@');
        if (domain && isExternalFQDN(domain)) {
          const existing = domainMap.get(domain) ?? {
            count: 0,
            sources: []
          };
          existing.count += 1;
          existing.sources.push('users');
          domainMap.set(domain, existing);
        }
      }
    });
  }

  // Add domains from host_names (previously handled by processFQDNs)
  if (entityValues.host_names && Array.isArray(entityValues.host_names)) {
    entityValues.host_names.forEach(hostname => {
      if (hostname && typeof hostname === 'string' && isExternalFQDN(hostname)) {
        const existing = domainMap.get(hostname) ?? {
          count: 0,
          sources: []
        };
        existing.count += 1;
        existing.sources.push('host_names');
        domainMap.set(hostname, existing);
      }
    });
  }

  // Group domains by their top-level domain
  const tldGroups = new Map();
  domainMap.forEach(({
    count,
    sources
  }, fullDomain) => {
    const tld = extractTopLevelDomain(fullDomain);
    if (!tldGroups.has(tld)) {
      tldGroups.set(tld, {
        domains: [],
        totalCount: 0,
        allSources: []
      });
    }
    const group = tldGroups.get(tld);
    group.domains.push(fullDomain);
    group.totalCount += count;

    // Add unique sources
    sources.forEach(source => {
      if (!group.allSources.includes(source)) {
        group.allSources.push(source);
      }
    });
  });

  // Create hierarchical structure
  const options = [];
  tldGroups.forEach(({
    domains,
    totalCount,
    allSources
  }, tld) => {
    // Create TLD as parent entry
    const tldDisplayName = totalCount > 1 ? `${tld.toLowerCase()} (${totalCount} instances)` : tld.toLowerCase();
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
        sources: allSources
      }
    });

    // Create full domains as children under each TLD
    domains.forEach(fullDomain => {
      const domainData = domainMap.get(fullDomain);
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
          isTruncated: truncatedDomain !== fullDomain
        }
      });
    });
  });
  return options;
};

/**
 * Extract domain entities from detection data with validation
 */
const extractDomainsFromDetection = (detection, options) => {
  if (!detection) return;

  // Extract domains from device information
  if (detection.device) {
    // Domains from device
    if (detection.device.machine_domain && isExternalFQDN(detection.device.machine_domain)) {
      const domain = detection.device.machine_domain.toLowerCase();
      const truncatedDomain = truncateDomain(domain);
      options.push({
        value: `domain:${domain}`,
        displayName: truncatedDomain,
        type: 'domain',
        subType: 'fqdn',
        queryTemplate: createQueryTemplate('domain', domain),
        entityData: {
          fullDomain: domain,
          isTruncated: truncatedDomain !== domain
        }
      });
    }

    // Domain from hostinfo
    if (detection.device.hostinfo?.domain && isExternalFQDN(detection.device.hostinfo.domain)) {
      const domain = detection.device.hostinfo.domain.toLowerCase();
      const truncatedDomain = truncateDomain(domain);

      // Avoid duplicates
      const domainExists = options.some(opt => opt.value === `domain:${domain}`);
      if (!domainExists) {
        options.push({
          value: `domain:${domain}`,
          displayName: truncatedDomain,
          type: 'domain',
          subType: 'fqdn',
          queryTemplate: createQueryTemplate('domain', domain),
          entityData: {
            fullDomain: domain,
            isTruncated: truncatedDomain !== domain
          }
        });
      }
    }
  }

  // Extract domain from user email if it's external (e.g., gmail.com from user@gmail.com)
  // Note: We don't extract the user account itself as that's private information
  if (detection.user_principal?.includes('@')) {
    const email = detection.user_principal.toLowerCase();
    const [, domain] = email.split('@');

    // Only add domain from email if external (e.g., gmail.com, outlook.com)
    // Internal domains like user@internal.system are filtered out by isExternalFQDN()
    if (domain && isExternalFQDN(domain)) {
      const truncatedDomain = truncateDomain(domain);

      // Avoid duplicates
      const domainExists = options.some(opt => opt.value === `domain:${domain}`);
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
            source: 'user_principal'
          }
        });
      }
    }
  }
};

// File and hash processing utilities


/**
 * Process files and hashes with proper parent-child grouping
 * Filename as parent, hashes as children. MD5 only shown if no SHA256 available.
 */
const processFiles = (entityValues, entities) => {
  const options = [];

  // Create a comprehensive file-to-hash mapping
  const fileHashMap = new Map();

  // Collect all SHA256 hashes from various sources
  const sha256Array = entityValues.sha256s ?? [];
  const md5Array = entityValues.md5s ?? [];
  const fileNameArray = entities?.file_name ?? [];

  // Method 1: Positional association (if arrays align)
  const canGroupFiles = fileNameArray.length > 0 && sha256Array.length > 0 && fileNameArray.length === sha256Array.length;
  if (canGroupFiles) {
    for (const [i, filename] of fileNameArray.entries()) {
      const sha256Hash = sha256Array[i];
      if (filename && typeof filename === 'string' && sha256Hash && typeof sha256Hash === 'string') {
        if (!fileHashMap.has(filename)) {
          fileHashMap.set(filename, {
            sha256Hashes: new Set(),
            md5Hashes: new Set()
          });
        }
        fileHashMap.get(filename).sha256Hashes.add(sha256Hash);
      }
    }

    // Also collect MD5 hashes if available and arrays align
    if (md5Array.length === fileNameArray.length) {
      for (const [i, filename] of fileNameArray.entries()) {
        const md5Hash = md5Array[i];
        if (filename && typeof filename === 'string' && md5Hash && typeof md5Hash === 'string') {
          if (!fileHashMap.has(filename)) {
            fileHashMap.set(filename, {
              sha256Hashes: new Set(),
              md5Hashes: new Set()
            });
          }
          fileHashMap.get(filename).md5Hashes.add(md5Hash);
        }
      }
    }
  } else {
    // Method 2: Collect all hashes separately (no positional association)
    // If we have filenames but no positional association, create entries for standalone hashes
    if (fileNameArray.length > 0) {
      fileNameArray.forEach(filename => {
        if (filename && typeof filename === 'string' && !fileHashMap.has(filename)) {
          fileHashMap.set(filename, {
            sha256Hashes: new Set(),
            md5Hashes: new Set()
          });
        }
      });
    }
  }

  // Create parent-child structure from file-hash mapping
  fileHashMap.forEach((hashData, filename) => {
    const {
      sha256Hashes,
      md5Hashes
    } = hashData;

    // Always create the filename as parent
    options.push({
      value: `file:${filename}`,
      displayName: filename.toLowerCase(),
      type: 'file',
      subType: 'filename',
      queryTemplate: createQueryTemplate('file', filename),
      entityData: {
        filename,
        sha256Count: sha256Hashes.size,
        md5Count: md5Hashes.size
      }
    });

    // Add SHA256 hashes as children (always preferred)
    sha256Hashes.forEach(sha256Hash => {
      const truncatedHash = truncateHash(sha256Hash);
      options.push({
        value: `sha256:${sha256Hash}`,
        displayName: `SHA256: ${truncatedHash.toLowerCase()}`,
        type: 'file',
        subType: 'sha256',
        parentFile: filename,
        queryTemplate: createHashQueryTemplate(sha256Hash, 'SHA256'),
        entityData: {
          hash: sha256Hash,
          hashType: 'SHA256',
          filename,
          isGrouped: true
        }
      });
    });

    // Add MD5 hashes as children ONLY if no SHA256 hashes exist for this file
    if (sha256Hashes.size === 0 && md5Hashes.size > 0) {
      md5Hashes.forEach(md5Hash => {
        const truncatedHash = truncateHash(md5Hash);
        options.push({
          value: `md5:${md5Hash}`,
          displayName: `MD5: ${truncatedHash.toLowerCase()}`,
          type: 'file',
          subType: 'md5',
          parentFile: filename,
          queryTemplate: createHashQueryTemplate(md5Hash, 'MD5'),
          entityData: {
            hash: md5Hash,
            hashType: 'MD5',
            filename,
            isGrouped: true
          }
        });
      });
    }
  });

  // Note: Removed standalone hash processing - only show hashes with associated files

  return options;
};

/**
 * Process legacy structured file data from entities_full
 * Creates proper parent-child structure: filename as parent, hashes as children
 */
const processLegacyFiles = (entitiesFull, existingOptions) => {
  const options = [];
  if (entitiesFull && Array.isArray(entitiesFull)) {
    const fileMap = new Map();

    // Process entities_full to collect unique filenames and their hashes
    entitiesFull.forEach(entity => {
      if (entity?.FileName) {
        const filename = entity.FileName;
        if (!fileMap.has(filename)) {
          fileMap.set(filename, {
            sha256Hashes: new Set(),
            md5Hashes: new Set()
          });
        }
        const fileData = fileMap.get(filename);

        // Add SHA256 hashes (automatically deduplicates)
        if (entity.SHA256HashData && typeof entity.SHA256HashData === 'string') {
          fileData.sha256Hashes.add(entity.SHA256HashData);
        }

        // Add MD5 hashes (automatically deduplicates)
        if (entity.MD5HashData && typeof entity.MD5HashData === 'string') {
          fileData.md5Hashes.add(entity.MD5HashData);
        }
      }
    });

    // Create parent-child structure from the deduplicated map
    fileMap.forEach((fileData, filename) => {
      const {
        sha256Hashes,
        md5Hashes
      } = fileData;

      // Only create entries if not already handled by main processFiles function
      const filenameExists = existingOptions.some(opt => opt.value === `file:${filename}` && opt.subType === 'filename');
      if (!filenameExists && (sha256Hashes.size > 0 || md5Hashes.size > 0)) {
        // Create filename as parent
        options.push({
          value: `file:${filename}`,
          displayName: filename.toLowerCase(),
          type: 'file',
          subType: 'filename',
          queryTemplate: createQueryTemplate('file', filename),
          entityData: {
            filename,
            sha256Count: sha256Hashes.size,
            md5Count: md5Hashes.size,
            isLegacy: true
          }
        });

        // Add SHA256 hashes as children (always preferred)
        sha256Hashes.forEach(sha256Hash => {
          const optionValue = `sha256:${sha256Hash}`;
          const alreadyExists = existingOptions.some(opt => opt.value === optionValue);
          if (!alreadyExists) {
            const truncatedHash = truncateHash(sha256Hash);
            options.push({
              value: optionValue,
              displayName: `SHA256: ${truncatedHash.toLowerCase()}`,
              type: 'file',
              subType: 'sha256',
              parentFile: filename,
              queryTemplate: createHashQueryTemplate(sha256Hash, 'SHA256'),
              entityData: {
                hash: sha256Hash,
                hashType: 'SHA256',
                filename,
                isLegacy: true,
                isGrouped: true
              }
            });
          }
        });

        // Add MD5 hashes as children ONLY if no SHA256 hashes exist for this file
        if (sha256Hashes.size === 0 && md5Hashes.size > 0) {
          md5Hashes.forEach(md5Hash => {
            const optionValue = `md5:${md5Hash}`;
            const alreadyExists = existingOptions.some(opt => opt.value === optionValue);
            if (!alreadyExists) {
              const truncatedHash = truncateHash(md5Hash);
              options.push({
                value: optionValue,
                displayName: `MD5: ${truncatedHash.toLowerCase()}`,
                type: 'file',
                subType: 'md5',
                parentFile: filename,
                queryTemplate: createHashQueryTemplate(md5Hash, 'MD5'),
                entityData: {
                  hash: md5Hash,
                  hashType: 'MD5',
                  filename,
                  isLegacy: true,
                  isGrouped: true
                }
              });
            }
          });
        }
      }
    });
  }
  return options;
};

/**
 * Extract file entities from detection data with hash association
 */
const extractFilesFromDetection = (detection, options) => {
  if (!detection) return;

  // Extract file information from main detection
  if (detection.filename) {
    const filename = detection.filename.toLowerCase();

    // Create file entry
    options.push({
      value: `file:${filename}`,
      displayName: filename,
      type: 'file',
      subType: 'filename',
      queryTemplate: createQueryTemplate('file', filename),
      entityData: {
        filename
      }
    });

    // Add hashes associated with this file
    if (detection.sha256) {
      const sha256Hash = detection.sha256.toLowerCase();
      const truncatedHash = truncateHash(sha256Hash);
      options.push({
        value: `sha256:${sha256Hash}`,
        displayName: `SHA256: ${truncatedHash}`,
        type: 'file',
        subType: 'sha256',
        parentFile: filename,
        queryTemplate: createHashQueryTemplate(sha256Hash, 'SHA256'),
        entityData: {
          hash: sha256Hash,
          hashType: 'SHA256',
          filename,
          isGrouped: true
        }
      });
    }
    if (detection.md5) {
      const md5Hash = detection.md5.toLowerCase();
      const truncatedHash = truncateHash(md5Hash);

      // Only add MD5 if no SHA256 exists
      const hasSha256 = options.some(opt => opt.subType === 'sha256' && opt.parentFile === filename);
      if (!hasSha256) {
        options.push({
          value: `md5:${md5Hash}`,
          displayName: `MD5: ${truncatedHash}`,
          type: 'file',
          subType: 'md5',
          parentFile: filename,
          queryTemplate: createHashQueryTemplate(md5Hash, 'MD5'),
          entityData: {
            hash: md5Hash,
            hashType: 'MD5',
            filename,
            isGrouped: true
          }
        });
      }
    }
    if (detection.sha1) {
      const sha1Hash = detection.sha1.toLowerCase();
      const truncatedHash = truncateHash(sha1Hash);

      // Only add SHA1 if no SHA256 exists
      const hasSha256 = options.some(opt => opt.subType === 'sha256' && opt.parentFile === filename);
      if (!hasSha256) {
        options.push({
          value: `sha1:${sha1Hash}`,
          displayName: `SHA1: ${truncatedHash}`,
          type: 'file',
          subType: 'sha1',
          parentFile: filename,
          queryTemplate: createHashQueryTemplate(sha1Hash, 'SHA1'),
          entityData: {
            hash: sha1Hash,
            hashType: 'SHA1',
            filename,
            isGrouped: true
          }
        });
      }
    }
  }

  // Extract parent process information
  if (detection.parent_details) {
    const parent = detection.parent_details;
    if (parent.filename) {
      const filename = parent.filename.toLowerCase();

      // Avoid duplicates
      const fileExists = options.some(opt => opt.value === `file:${filename}`);
      if (!fileExists) {
        options.push({
          value: `file:${filename}`,
          displayName: filename,
          type: 'file',
          subType: 'filename',
          queryTemplate: createQueryTemplate('file', filename),
          entityData: {
            filename,
            source: 'parent_process'
          }
        });

        // Add parent hashes
        if (parent.sha256) {
          const sha256Hash = parent.sha256.toLowerCase();
          const truncatedHash = truncateHash(sha256Hash);
          options.push({
            value: `sha256:${sha256Hash}`,
            displayName: `SHA256: ${truncatedHash}`,
            type: 'file',
            subType: 'sha256',
            parentFile: filename,
            queryTemplate: createHashQueryTemplate(sha256Hash, 'SHA256'),
            entityData: {
              hash: sha256Hash,
              hashType: 'SHA256',
              filename,
              source: 'parent_process',
              isGrouped: true
            }
          });
        }
        if (parent.md5) {
          const md5Hash = parent.md5.toLowerCase();
          const truncatedHash = truncateHash(md5Hash);

          // Only add MD5 if no SHA256 exists for this file
          const hasSha256 = options.some(opt => opt.subType === 'sha256' && opt.parentFile === filename);
          if (!hasSha256) {
            options.push({
              value: `md5:${md5Hash}`,
              displayName: `MD5: ${truncatedHash}`,
              type: 'file',
              subType: 'md5',
              parentFile: filename,
              queryTemplate: createHashQueryTemplate(md5Hash, 'MD5'),
              entityData: {
                hash: md5Hash,
                hashType: 'MD5',
                filename,
                source: 'parent_process',
                isGrouped: true
              }
            });
          }
        }
      }
    }
  }

  // Extract grandparent process information
  if (detection.grandparent_details) {
    const grandparent = detection.grandparent_details;
    if (grandparent.filename) {
      const filename = grandparent.filename.toLowerCase();

      // Avoid duplicates
      const fileExists = options.some(opt => opt.value === `file:${filename}`);
      if (!fileExists) {
        options.push({
          value: `file:${filename}`,
          displayName: filename,
          type: 'file',
          subType: 'filename',
          queryTemplate: createQueryTemplate('file', filename),
          entityData: {
            filename,
            source: 'grandparent_process'
          }
        });

        // Add grandparent hashes
        if (grandparent.sha256) {
          const sha256Hash = grandparent.sha256.toLowerCase();
          const truncatedHash = truncateHash(sha256Hash);
          options.push({
            value: `sha256:${sha256Hash}`,
            displayName: `SHA256: ${truncatedHash}`,
            type: 'file',
            subType: 'sha256',
            parentFile: filename,
            queryTemplate: createHashQueryTemplate(sha256Hash, 'SHA256'),
            entityData: {
              hash: sha256Hash,
              hashType: 'SHA256',
              filename,
              source: 'grandparent_process',
              isGrouped: true
            }
          });
        }
        if (grandparent.md5) {
          const md5Hash = grandparent.md5.toLowerCase();
          const truncatedHash = truncateHash(md5Hash);

          // Only add MD5 if no SHA256 exists for this file
          const hasSha256 = options.some(opt => opt.subType === 'sha256' && opt.parentFile === filename);
          if (!hasSha256) {
            options.push({
              value: `md5:${md5Hash}`,
              displayName: `MD5: ${truncatedHash}`,
              type: 'file',
              subType: 'md5',
              parentFile: filename,
              queryTemplate: createHashQueryTemplate(md5Hash, 'MD5'),
              entityData: {
                hash: md5Hash,
                hashType: 'MD5',
                filename,
                source: 'grandparent_process',
                isGrouped: true
              }
            });
          }
        }
      }
    }
  }
};

// IP address processing utilities


/**
 * Process IP addresses and filter out private/internal ones
 */
const processIPs = entityValues => {
  const options = [];
  if (entityValues.ipv4s && Array.isArray(entityValues.ipv4s)) {
    entityValues.ipv4s.filter(isPublicIP).forEach(ip => {
      options.push({
        value: ip,
        displayName: ip.toLowerCase(),
        type: 'ip',
        queryTemplate: createQueryTemplate('ip', ip),
        entityData: {
          ip
        }
      });
    });
  }
  return options;
};

/**
 * Extract IP entities from detection data with validation
 */
const extractIPsFromDetection = (detection, options) => {
  if (!detection) return;

  // Extract IPs from device information
  if (detection.device) {
    // External IP
    if (detection.device.external_ip && isPublicIP(detection.device.external_ip)) {
      options.push({
        value: detection.device.external_ip.toLowerCase(),
        displayName: detection.device.external_ip.toLowerCase(),
        type: 'ip',
        queryTemplate: createQueryTemplate('ip', detection.device.external_ip),
        entityData: {
          ip: detection.device.external_ip.toLowerCase()
        }
      });
    }

    // Local IP (if public - rare but possible)
    if (detection.device.local_ip && isPublicIP(detection.device.local_ip)) {
      options.push({
        value: detection.device.local_ip.toLowerCase(),
        displayName: detection.device.local_ip.toLowerCase(),
        type: 'ip',
        queryTemplate: createQueryTemplate('ip', detection.device.local_ip),
        entityData: {
          ip: detection.device.local_ip.toLowerCase()
        }
      });
    }
  }
};

// MITRE ATT&CK technique processing utilities


/**
 * Extract MITRE ATT&CK techniques from various detection data structures
 */
const extractMITREFromDetection = (detection, options) => {
  if (!detection) return;
  const mitreMap = new Map();

  // Method 1: From detection.behaviors array
  if (detection.behaviors && Array.isArray(detection.behaviors)) {
    detection.behaviors.forEach(behavior => {
      if (behavior.technique_id) {
        const techniqueId = behavior.technique_id.toUpperCase();

        // Validate MITRE technique ID format (T1055, T1003.001, etc.)
        const mitrePattern = /^T\d{4}(\.\d{3})?$/;
        if (mitrePattern.test(techniqueId)) {
          const existing = mitreMap.get(techniqueId) ?? {
            count: 0,
            sources: []
          };
          existing.count += 1;
          existing.sources.push('detection_behaviors');

          // Capture technique name and tactic if available
          if (behavior.technique && !existing.techniqueName) {
            existing.techniqueName = behavior.technique;
          }
          if (behavior.tactic && !existing.tactic) {
            existing.tactic = behavior.tactic;
          }
          mitreMap.set(techniqueId, existing);
        }
      }
    });
  }

  // Method 2: From detection.kill_chain array
  if (detection.kill_chain && Array.isArray(detection.kill_chain)) {
    detection.kill_chain.forEach(phase => {
      if (phase.technique_id) {
        const techniqueId = phase.technique_id.toUpperCase();
        const mitrePattern = /^T\d{4}(\.\d{3})?$/;
        if (mitrePattern.test(techniqueId)) {
          const existing = mitreMap.get(techniqueId) ?? {
            count: 0,
            sources: []
          };
          existing.count += 1;
          existing.sources.push('kill_chain');
          if (phase.technique_name && !existing.techniqueName) {
            existing.techniqueName = phase.technique_name;
          }
          if (phase.tactic && !existing.tactic) {
            existing.tactic = phase.tactic;
          }
          mitreMap.set(techniqueId, existing);
        }
      }
    });
  }

  // Method 3: From detection.mitre_attack array (common in activity detections)
  if (detection.mitre_attack && Array.isArray(detection.mitre_attack)) {
    detection.mitre_attack.forEach(attack => {
      if (attack.technique_id) {
        const techniqueId = attack.technique_id.toUpperCase();
        const mitrePattern = /^T\d{4}(\.\d{3})?$/;
        if (mitrePattern.test(techniqueId)) {
          const existing = mitreMap.get(techniqueId) ?? {
            count: 0,
            sources: []
          };
          existing.count += 1;
          existing.sources.push('mitre_attack');
          if (attack.technique && !existing.techniqueName) {
            existing.techniqueName = attack.technique;
          }
          if (attack.tactic && !existing.tactic) {
            existing.tactic = attack.tactic;
          }
          mitreMap.set(techniqueId, existing);
        }
      }
    });
  }

  // Method 4: From individual detection fields (fallback)
  if (detection.technique_id) {
    const techniqueId = detection.technique_id.toUpperCase();
    const mitrePattern = /^T\d{4}(\.\d{3})?$/;
    if (mitrePattern.test(techniqueId)) {
      const existing = mitreMap.get(techniqueId) ?? {
        count: 0,
        sources: []
      };
      existing.count += 1;
      existing.sources.push('detection_fields');
      if (detection.technique && !existing.techniqueName) {
        existing.techniqueName = detection.technique;
      }
      if (detection.tactic && !existing.tactic) {
        existing.tactic = detection.tactic;
      }
      mitreMap.set(techniqueId, existing);
    }
  }

  // Create MITRE technique entries from collected data
  mitreMap.forEach(({
    techniqueName,
    tactic,
    count,
    sources
  }, techniqueId) => {
    let displayName = techniqueId;

    // Add technique name if available
    if (techniqueName) {
      displayName += ` - ${techniqueName}`;
    }

    // Add count if multiple occurrences
    if (count > 1) {
      displayName += ` (${count} occurrences)`;
    }
    options.push({
      value: `mitre:${techniqueId}`,
      displayName,
      type: 'mitre',
      subType: 'technique',
      queryTemplate: createQueryTemplate('mitre', techniqueId, {
        techniqueName
      }),
      entityData: {
        techniqueId,
        techniqueName,
        tactic,
        count,
        sources
      }
    });
  });
};

/**
 * Validate MITRE technique ID format
 */
const isValidMITRETechnique = techniqueId => {
  const mitrePattern = /^T\d{4}(\.\d{3})?$/;
  return mitrePattern.test(techniqueId.toUpperCase());
};

/**
 * Extract technique ID from various MITRE data formats
 */
const extractTechniqueId = mitreData => {
  if (typeof mitreData === 'string') {
    return isValidMITRETechnique(mitreData) ? mitreData.toUpperCase() : null;
  }
  if (mitreData && typeof mitreData === 'object') {
    const possibleIds = [mitreData.technique_id, mitreData.techniqueId, mitreData.id, mitreData.technique];
    for (const id of possibleIds) {
      if (typeof id === 'string' && isValidMITRETechnique(id)) {
        return id.toUpperCase();
      }
    }
  }
  return null;
};

/**
 * Process MITRE techniques from incident data (for legacy support)
 */
const processMITRETechniques = entityValues => {
  const options = [];
  if (entityValues.mitre_techniques && Array.isArray(entityValues.mitre_techniques)) {
    const mitreMap = new Map();
    entityValues.mitre_techniques.forEach(technique => {
      const techniqueId = extractTechniqueId(technique);
      if (techniqueId) {
        const existing = mitreMap.get(techniqueId) ?? {
          count: 0
        };
        existing.count += 1;

        // Capture additional data if available
        if (technique.name && !existing.techniqueName) {
          existing.techniqueName = technique.name;
        }
        if (technique.tactic && !existing.tactic) {
          existing.tactic = technique.tactic;
        }
        mitreMap.set(techniqueId, existing);
      }
    });

    // Create options from collected techniques
    mitreMap.forEach(({
      techniqueName,
      tactic,
      count
    }, techniqueId) => {
      let displayName = techniqueId;
      if (techniqueName) {
        displayName += ` - ${techniqueName}`;
      }
      if (count > 1) {
        displayName += ` (${count} occurrences)`;
      }
      options.push({
        value: `mitre:${techniqueId}`,
        displayName,
        type: 'mitre',
        subType: 'technique',
        queryTemplate: createQueryTemplate('mitre', techniqueId, {
          techniqueName
        }),
        entityData: {
          techniqueId,
          techniqueName,
          tactic,
          count,
          sources: ['incident_data']
        }
      });
    });
  }
  return options;
};

// Context processing orchestrator - combines all entity processors


/**
 * Extract entities from detection data structure with lowercase normalization
 */
const extractDetectionEntities = detection => {
  const options = [];
  if (!detection) return options;

  // Extract each entity type using specialized processors
  extractIPsFromDetection(detection, options);
  extractDomainsFromDetection(detection, options);
  extractFilesFromDetection(detection, options);
  extractMITREFromDetection(detection, options);
  return options;
};

/**
 * Main processing function that coordinates all entity processing
 */
const processAllEntities = falconData => {
  if (!falconData) return [];
  const options = [];

  // Check if we have detection data (activity detections)
  if (falconData.detection || falconData.detectionId) {
    const detectionEntities = extractDetectionEntities(falconData.detection);
    options.push(...detectionEntities);
  }

  // Check for incident data (traditional structure)
  const entityValues = falconData.incident?.entity_values;
  if (entityValues) {
    const entitiesFull = falconData.incident?.entities_full ?? [];
    const entities = falconData.incident?.entities;

    // Process each entity type from incident data using specialized processors
    options.push(...processDomains(entityValues));
    options.push(...processFiles(entityValues, entities));
    options.push(...processLegacyFiles(entitiesFull, options));
    options.push(...processIPs(entityValues));
    options.push(...processMITRETechniques(entityValues));
  }
  return options;
};

// src/hooks/useContextProcessor.ts


/**
 * Custom hook to process Falcon context data and extract available entities
 * Handles both incident and detection contexts
 *
 * This hook has been refactored to use utility functions for better maintainability.
 * The complex processing logic has been moved to contextProcessing.ts utilities.
 */
const useContextProcessor = ({
  falconData
}) => {
  // Memoized context options to prevent unnecessary recalculation
  const availableContextOptions = reactExports.useMemo(() => {
    return processAllEntities(falconData);
  }, [falconData]);

  // Calculate counts for each entity type
  const contextCounts = reactExports.useMemo(() => {
    return calculateEntityCounts(availableContextOptions);
  }, [availableContextOptions]);
  return {
    availableContextOptions,
    contextCounts
  };
};

// src/utils/copyUtils.ts

/**
 * Copy format options for the enhanced copy functionality
 */

/**
 * Copy option configuration
 */

/**
 * Available copy format options
 */
const COPY_OPTIONS = [{
  format: 'json',
  label: 'JSON',
  icon: 'code-square',
  description: 'Complete structured data including request/response context'
}, {
  format: 'markdown',
  label: 'Markdown',
  icon: 'markdown',
  description: 'Formatted response with markdown styling'
}, {
  format: 'plaintext',
  label: 'Plain Text',
  icon: 'file-text',
  description: 'Clean text without formatting'
}];

/**
 * Strip markdown formatting from text
 * @param markdown - Markdown text to convert
 * @returns Plain text without markdown formatting
 */
const stripMarkdown = markdown => {
  if (!markdown) return '';
  let text = markdown;

  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/`([^`]+)`/g, '$1');

  // Remove headers
  text = text.replace(/^#{1,6}\s+/gm, '');

  // Remove bold/italic
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/__([^_]+)__/g, '$1');
  text = text.replace(/_([^_]+)_/g, '$1');

  // Remove links
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remove list markers
  text = text.replace(/^[\s]*[-*+]\s+/gm, '');
  text = text.replace(/^[\s]*\d+\.\s+/gm, '');

  // Remove blockquotes
  text = text.replace(/^>\s*/gm, '');

  // Remove horizontal rules
  text = text.replace(/^[\s]*[-*_]{3,}[\s]*$/gm, '');

  // Clean up extra whitespace
  text = text.replace(/\n\s*\n\s*\n/g, '\n\n');
  text = text.replace(/^\s+|\s+$/g, '');
  return text;
};

/**
 * Convert structured JSON data to markdown format
 * @param jsonData - Parsed JSON response
 * @returns Markdown formatted string
 */
const convertJsonToMarkdown = jsonData => {
  if (!jsonData) return '';
  let markdown = '';

  // Executive Summary
  if (jsonData.executive_summary) {
    markdown += `# Executive Summary\n\n${jsonData.executive_summary}\n\n`;
  }

  // Threat and Confidence Levels
  if (jsonData.threat_level || jsonData.confidence_level) {
    markdown += `## Assessment\n\n`;
    if (jsonData.threat_level) {
      markdown += `**Threat Level:** ${jsonData.threat_level}\n\n`;
    }
    if (jsonData.confidence_level) {
      markdown += `**Confidence Level:** ${jsonData.confidence_level}\n\n`;
    }
  }

  // Malware Analysis
  if (jsonData.malware_analysis) {
    markdown += `## Malware Analysis\n\n`;
    if (jsonData.malware_analysis.malware_family) {
      markdown += `**Family:** ${jsonData.malware_analysis.malware_family}\n\n`;
    }
    if (jsonData.malware_analysis.variant_identification) {
      markdown += `**Variant:** ${jsonData.malware_analysis.variant_identification}\n\n`;
    }
    if (jsonData.malware_analysis.threat_classification) {
      markdown += `**Classification:** ${jsonData.malware_analysis.threat_classification}\n\n`;
    }
    if (jsonData.malware_analysis.risk_level) {
      markdown += `**Risk Level:** ${jsonData.malware_analysis.risk_level}\n\n`;
    }
  }

  // Attack Intelligence
  if (jsonData.attack_intelligence) {
    markdown += `## Attack Intelligence\n\n`;
    if (jsonData.attack_intelligence.primary_functions && jsonData.attack_intelligence.primary_functions.length > 0) {
      markdown += `### Primary Functions\n`;
      jsonData.attack_intelligence.primary_functions.forEach(func => {
        markdown += `- ${func}\n`;
      });
      markdown += '\n';
    }
    if (jsonData.attack_intelligence.persistence_mechanisms && jsonData.attack_intelligence.persistence_mechanisms.length > 0) {
      markdown += `### Persistence Mechanisms\n`;
      jsonData.attack_intelligence.persistence_mechanisms.forEach(mech => {
        markdown += `- ${mech}\n`;
      });
      markdown += '\n';
    }
    if (jsonData.attack_intelligence.behavior_patterns && jsonData.attack_intelligence.behavior_patterns.length > 0) {
      markdown += `### Behavior Patterns\n`;
      jsonData.attack_intelligence.behavior_patterns.forEach(pattern => {
        markdown += `- ${pattern}\n`;
      });
      markdown += '\n';
    }
  }

  // Incident Context
  if (jsonData.incident_context) {
    markdown += `## Incident Context\n\n`;
    if (jsonData.incident_context.investigation_relevance) {
      markdown += `**Investigation Relevance:** ${jsonData.incident_context.investigation_relevance}\n\n`;
    }
    if (jsonData.incident_context.associated_filenames && jsonData.incident_context.associated_filenames.length > 0) {
      markdown += `### Associated Filenames\n`;
      jsonData.incident_context.associated_filenames.forEach(filename => {
        markdown += `- \`${filename}\`\n`;
      });
      markdown += '\n';
    }
    if (jsonData.incident_context.related_iocs) {
      markdown += `### Related IOCs for Hunting\n`;
      if (jsonData.incident_context.related_iocs.domains && jsonData.incident_context.related_iocs.domains.length > 0) {
        markdown += `**Domains:**\n`;
        jsonData.incident_context.related_iocs.domains.forEach(domain => {
          markdown += `- \`${domain}\`\n`;
        });
        markdown += '\n';
      }
      if (jsonData.incident_context.related_iocs.ips && jsonData.incident_context.related_iocs.ips.length > 0) {
        markdown += `**IPs:**\n`;
        jsonData.incident_context.related_iocs.ips.forEach(ip => {
          markdown += `- \`${ip}\`\n`;
        });
        markdown += '\n';
      }
      if (jsonData.incident_context.related_iocs.registry_keys && jsonData.incident_context.related_iocs.registry_keys.length > 0) {
        markdown += `**Registry Keys:**\n`;
        jsonData.incident_context.related_iocs.registry_keys.forEach(key => {
          markdown += `- \`${key}\`\n`;
        });
        markdown += '\n';
      }
      if (jsonData.incident_context.related_iocs.hashes && jsonData.incident_context.related_iocs.hashes.length > 0) {
        markdown += `**Hashes:**\n`;
        jsonData.incident_context.related_iocs.hashes.forEach(hash => {
          markdown += `- \`${hash}\`\n`;
        });
        markdown += '\n';
      }
    }
  }

  // Immediate Actions
  if (jsonData.immediate_actions && jsonData.immediate_actions.length > 0) {
    markdown += `## Immediate Actions\n\n`;
    jsonData.immediate_actions.forEach((action, index) => {
      markdown += `${index + 1}. ${action}\n`;
    });
    markdown += '\n';
  }

  // Response Actions (comprehensive)
  if (jsonData.response_actions) {
    if (jsonData.response_actions.immediate_containment && jsonData.response_actions.immediate_containment.length > 0) {
      markdown += `## Immediate Containment\n\n`;
      jsonData.response_actions.immediate_containment.forEach((action, index) => {
        markdown += `${index + 1}. ${action}\n`;
      });
      markdown += '\n';
    }
    if (jsonData.response_actions.detection_rules && jsonData.response_actions.detection_rules.length > 0) {
      markdown += `## Detection Rules\n\n`;
      jsonData.response_actions.detection_rules.forEach((rule, index) => {
        markdown += `${index + 1}. ${rule}\n`;
      });
      markdown += '\n';
    }
    if (jsonData.response_actions.remediation_guidance && jsonData.response_actions.remediation_guidance.length > 0) {
      markdown += `## Remediation Guidance\n\n`;
      jsonData.response_actions.remediation_guidance.forEach((guidance, index) => {
        markdown += `${index + 1}. ${guidance}\n`;
      });
      markdown += '\n';
    }
  }

  // IOCs
  if (jsonData.iocs && Object.keys(jsonData.iocs).length > 0) {
    markdown += `## Indicators of Compromise (IOCs)\n\n`;
    if (jsonData.iocs.hashes && jsonData.iocs.hashes.length > 0) {
      markdown += `### File Hashes\n`;
      jsonData.iocs.hashes.forEach(hash => {
        markdown += `- \`${hash}\`\n`;
      });
      markdown += '\n';
    }
    if (jsonData.iocs.ips && jsonData.iocs.ips.length > 0) {
      markdown += `### IP Addresses\n`;
      jsonData.iocs.ips.forEach(ip => {
        markdown += `- \`${ip}\`\n`;
      });
      markdown += '\n';
    }
    if (jsonData.iocs.domains && jsonData.iocs.domains.length > 0) {
      markdown += `### Domains\n`;
      jsonData.iocs.domains.forEach(domain => {
        markdown += `- \`${domain}\`\n`;
      });
      markdown += '\n';
    }
    if (jsonData.iocs.urls && jsonData.iocs.urls.length > 0) {
      markdown += `### URLs\n`;
      jsonData.iocs.urls.forEach(url => {
        markdown += `- \`${url}\`\n`;
      });
      markdown += '\n';
    }
    if (jsonData.iocs.file_paths && jsonData.iocs.file_paths.length > 0) {
      markdown += `### File Paths\n`;
      jsonData.iocs.file_paths.forEach(path => {
        markdown += `- \`${path}\`\n`;
      });
      markdown += '\n';
    }
  }

  // MITRE ATT&CK Techniques
  if (jsonData.mitre_techniques && jsonData.mitre_techniques.length > 0) {
    markdown += `## MITRE ATT&CK Techniques\n\n`;
    jsonData.mitre_techniques.forEach(technique => {
      markdown += `### ${technique.technique_id}: ${technique.technique_name}\n`;
      if (technique.tactic) {
        markdown += `**Tactic:** ${technique.tactic}\n`;
      }
      if (technique.description) {
        markdown += `${technique.description}\n\n`;
      }
    });
  }

  // MITRE techniques from attack intelligence
  if (jsonData.attack_intelligence?.mitre_techniques && jsonData.attack_intelligence.mitre_techniques.length > 0) {
    markdown += `## MITRE ATT&CK Techniques (Attack Intelligence)\n\n`;
    jsonData.attack_intelligence.mitre_techniques.forEach(technique => {
      markdown += `### ${technique.technique_id}: ${technique.technique_name}\n`;
      if (technique.tactic) {
        markdown += `**Tactic:** ${technique.tactic}\n`;
      }
      if (technique.description) {
        markdown += `${technique.description}\n\n`;
      }
    });
  }

  // Technical Details
  if (jsonData.technical_details) {
    markdown += `## Technical Details\n\n${jsonData.technical_details}\n\n`;
  }

  // Recommendations
  if (jsonData.recommendations && jsonData.recommendations.length > 0) {
    markdown += `## Recommendations\n\n`;
    jsonData.recommendations.forEach((rec, index) => {
      markdown += `${index + 1}. ${rec}\n`;
    });
    markdown += '\n';
  }

  // Confidence Assessment and Reasoning Assessment
  if (jsonData.confidence_assessment || jsonData.reasoning_assessment) {
    markdown += `## Confidence & Reasoning Assessment\n\n`;
    if (jsonData.confidence_assessment) {
      markdown += `### Confidence Metrics\n`;
      if (jsonData.confidence_assessment.analysis_confidence) {
        markdown += `**Analysis Confidence:** ${jsonData.confidence_assessment.analysis_confidence}\n`;
      }
      if (jsonData.confidence_assessment.source_reliability) {
        markdown += `**Source Reliability:** ${jsonData.confidence_assessment.source_reliability}\n`;
      }
      if (jsonData.confidence_assessment.validation_recommendations && jsonData.confidence_assessment.validation_recommendations.length > 0) {
        markdown += `\n**Validation Recommendations:**\n`;
        jsonData.confidence_assessment.validation_recommendations.forEach(rec => {
          markdown += `- ${rec}\n`;
        });
      }
      markdown += '\n';
    }
    if (jsonData.reasoning_assessment) {
      markdown += `### Charlotte's Analytical Methodology\n`;
      markdown += `${jsonData.reasoning_assessment}\n\n`;
    }
  }
  return markdown;
};

/**
 * Convert structured JSON data to plain text format
 * @param jsonData - Parsed JSON response
 * @returns Plain text formatted string
 */
const convertJsonToPlainText = jsonData => {
  if (!jsonData) return '';
  let text = '';

  // Executive Summary
  if (jsonData.executive_summary) {
    text += `EXECUTIVE SUMMARY\n${jsonData.executive_summary}\n\n`;
  }

  // Assessment
  if (jsonData.threat_level || jsonData.confidence_level) {
    text += `ASSESSMENT\n`;
    if (jsonData.threat_level) {
      text += `Threat Level: ${jsonData.threat_level}\n`;
    }
    if (jsonData.confidence_level) {
      text += `Confidence Level: ${jsonData.confidence_level}\n`;
    }
    text += '\n';
  }

  // Malware Analysis
  if (jsonData.malware_analysis) {
    text += `MALWARE ANALYSIS\n`;
    if (jsonData.malware_analysis.malware_family) {
      text += `Family: ${jsonData.malware_analysis.malware_family}\n`;
    }
    if (jsonData.malware_analysis.variant_identification) {
      text += `Variant: ${jsonData.malware_analysis.variant_identification}\n`;
    }
    if (jsonData.malware_analysis.threat_classification) {
      text += `Classification: ${jsonData.malware_analysis.threat_classification}\n`;
    }
    if (jsonData.malware_analysis.risk_level) {
      text += `Risk Level: ${jsonData.malware_analysis.risk_level}\n`;
    }
    text += '\n';
  }

  // Attack Intelligence
  if (jsonData.attack_intelligence) {
    text += `ATTACK INTELLIGENCE\n`;
    if (jsonData.attack_intelligence.primary_functions && jsonData.attack_intelligence.primary_functions.length > 0) {
      text += `Primary Functions:\n`;
      jsonData.attack_intelligence.primary_functions.forEach(func => {
        text += `- ${func}\n`;
      });
      text += '\n';
    }
    if (jsonData.attack_intelligence.persistence_mechanisms && jsonData.attack_intelligence.persistence_mechanisms.length > 0) {
      text += `Persistence Mechanisms:\n`;
      jsonData.attack_intelligence.persistence_mechanisms.forEach(mech => {
        text += `- ${mech}\n`;
      });
      text += '\n';
    }
    if (jsonData.attack_intelligence.behavior_patterns && jsonData.attack_intelligence.behavior_patterns.length > 0) {
      text += `Behavior Patterns:\n`;
      jsonData.attack_intelligence.behavior_patterns.forEach(pattern => {
        text += `- ${pattern}\n`;
      });
      text += '\n';
    }
  }

  // Incident Context
  if (jsonData.incident_context) {
    text += `INCIDENT CONTEXT\n`;
    if (jsonData.incident_context.investigation_relevance) {
      text += `Investigation Relevance: ${jsonData.incident_context.investigation_relevance}\n\n`;
    }
    if (jsonData.incident_context.associated_filenames && jsonData.incident_context.associated_filenames.length > 0) {
      text += `Associated Filenames:\n`;
      jsonData.incident_context.associated_filenames.forEach(filename => {
        text += `- ${filename}\n`;
      });
      text += '\n';
    }
    if (jsonData.incident_context.related_iocs) {
      text += `Related IOCs for Hunting:\n`;
      if (jsonData.incident_context.related_iocs.domains && jsonData.incident_context.related_iocs.domains.length > 0) {
        text += `Domains:\n`;
        jsonData.incident_context.related_iocs.domains.forEach(domain => {
          text += `- ${domain}\n`;
        });
        text += '\n';
      }
      if (jsonData.incident_context.related_iocs.ips && jsonData.incident_context.related_iocs.ips.length > 0) {
        text += `IPs:\n`;
        jsonData.incident_context.related_iocs.ips.forEach(ip => {
          text += `- ${ip}\n`;
        });
        text += '\n';
      }
      if (jsonData.incident_context.related_iocs.registry_keys && jsonData.incident_context.related_iocs.registry_keys.length > 0) {
        text += `Registry Keys:\n`;
        jsonData.incident_context.related_iocs.registry_keys.forEach(key => {
          text += `- ${key}\n`;
        });
        text += '\n';
      }
      if (jsonData.incident_context.related_iocs.hashes && jsonData.incident_context.related_iocs.hashes.length > 0) {
        text += `Hashes:\n`;
        jsonData.incident_context.related_iocs.hashes.forEach(hash => {
          text += `- ${hash}\n`;
        });
        text += '\n';
      }
    }
  }

  // Immediate Actions
  if (jsonData.immediate_actions && jsonData.immediate_actions.length > 0) {
    text += `IMMEDIATE ACTIONS\n`;
    jsonData.immediate_actions.forEach((action, index) => {
      text += `${index + 1}. ${action}\n`;
    });
    text += '\n';
  }

  // Response Actions (comprehensive)
  if (jsonData.response_actions) {
    if (jsonData.response_actions.immediate_containment && jsonData.response_actions.immediate_containment.length > 0) {
      text += `IMMEDIATE CONTAINMENT\n`;
      jsonData.response_actions.immediate_containment.forEach((action, index) => {
        text += `${index + 1}. ${action}\n`;
      });
      text += '\n';
    }
    if (jsonData.response_actions.detection_rules && jsonData.response_actions.detection_rules.length > 0) {
      text += `DETECTION RULES\n`;
      jsonData.response_actions.detection_rules.forEach((rule, index) => {
        text += `${index + 1}. ${rule}\n`;
      });
      text += '\n';
    }
    if (jsonData.response_actions.remediation_guidance && jsonData.response_actions.remediation_guidance.length > 0) {
      text += `REMEDIATION GUIDANCE\n`;
      jsonData.response_actions.remediation_guidance.forEach((guidance, index) => {
        text += `${index + 1}. ${guidance}\n`;
      });
      text += '\n';
    }
  }

  // IOCs
  if (jsonData.iocs && Object.keys(jsonData.iocs).length > 0) {
    text += `INDICATORS OF COMPROMISE (IOCs)\n`;
    if (jsonData.iocs.hashes && jsonData.iocs.hashes.length > 0) {
      text += `File Hashes:\n`;
      jsonData.iocs.hashes.forEach(hash => {
        text += `- ${hash}\n`;
      });
      text += '\n';
    }
    if (jsonData.iocs.ips && jsonData.iocs.ips.length > 0) {
      text += `IP Addresses:\n`;
      jsonData.iocs.ips.forEach(ip => {
        text += `- ${ip}\n`;
      });
      text += '\n';
    }
    if (jsonData.iocs.domains && jsonData.iocs.domains.length > 0) {
      text += `Domains:\n`;
      jsonData.iocs.domains.forEach(domain => {
        text += `- ${domain}\n`;
      });
      text += '\n';
    }
    if (jsonData.iocs.urls && jsonData.iocs.urls.length > 0) {
      text += `URLs:\n`;
      jsonData.iocs.urls.forEach(url => {
        text += `- ${url}\n`;
      });
      text += '\n';
    }
    if (jsonData.iocs.file_paths && jsonData.iocs.file_paths.length > 0) {
      text += `File Paths:\n`;
      jsonData.iocs.file_paths.forEach(path => {
        text += `- ${path}\n`;
      });
      text += '\n';
    }
  }

  // MITRE ATT&CK Techniques
  if (jsonData.mitre_techniques && jsonData.mitre_techniques.length > 0) {
    text += `MITRE ATT&CK TECHNIQUES\n`;
    jsonData.mitre_techniques.forEach(technique => {
      text += `${technique.technique_id}: ${technique.technique_name}\n`;
      if (technique.description) {
        text += `${technique.description}\n\n`;
      }
    });
  }

  // Technical Details
  if (jsonData.technical_details) {
    text += `TECHNICAL DETAILS\n${jsonData.technical_details}\n\n`;
  }

  // Recommendations
  if (jsonData.recommendations && jsonData.recommendations.length > 0) {
    text += `RECOMMENDATIONS\n`;
    jsonData.recommendations.forEach((rec, index) => {
      text += `${index + 1}. ${rec}\n`;
    });
    text += '\n';
  }

  // Confidence Assessment and Reasoning Assessment
  if (jsonData.confidence_assessment || jsonData.reasoning_assessment) {
    text += `CONFIDENCE & REASONING ASSESSMENT\n`;
    if (jsonData.confidence_assessment) {
      text += `Confidence Metrics:\n`;
      if (jsonData.confidence_assessment.analysis_confidence) {
        text += `Analysis Confidence: ${jsonData.confidence_assessment.analysis_confidence}\n`;
      }
      if (jsonData.confidence_assessment.source_reliability) {
        text += `Source Reliability: ${jsonData.confidence_assessment.source_reliability}\n`;
      }
      if (jsonData.confidence_assessment.validation_recommendations && jsonData.confidence_assessment.validation_recommendations.length > 0) {
        text += `\nValidation Recommendations:\n`;
        jsonData.confidence_assessment.validation_recommendations.forEach(rec => {
          text += `- ${rec}\n`;
        });
      }
      text += '\n';
    }
    if (jsonData.reasoning_assessment) {
      text += `Charlotte's Analytical Methodology:\n`;
      text += `${jsonData.reasoning_assessment}\n\n`;
    }
  }
  return text;
};

/**
 * Format data for copying based on the selected format
 * @param format - The format to copy as
 * @param responseText - The markdown response text
 * @param jsonData - The complete JSON context data
 * @param parsedJsonResponse - The parsed structured JSON response (if available)
 * @returns Formatted string ready for clipboard
 */
const formatForCopy = (format, responseText, jsonData, parsedJsonResponse) => {
  switch (format) {
    case 'json':
      // First try to use the parsed JSON response (Charlotte AI's structured response)
      if (parsedJsonResponse) {
        return JSON.stringify(parsedJsonResponse, null, 2);
      }
      // Fall back to complete JSON context data
      if (jsonData) {
        return JSON.stringify(jsonData, null, 2);
      }
      // Final fallback to basic JSON structure
      return JSON.stringify({
        response: responseText,
        timestamp: new Date().toISOString()
      }, null, 2);
    case 'markdown':
      // If we have parsed JSON response, convert it to markdown
      if (parsedJsonResponse) {
        return convertJsonToMarkdown(parsedJsonResponse);
      }
      // Otherwise use the raw response text
      return responseText;
    case 'plaintext':
      // If we have parsed JSON response, convert it to plain text
      if (parsedJsonResponse) {
        return convertJsonToPlainText(parsedJsonResponse);
      }
      // Otherwise strip markdown from response text
      return stripMarkdown(responseText);
    default:
      return responseText;
  }
};

// src/utils/security/iocUtils.ts

/**
 * Parse structured security response from text
 * @param responseText - Response text to parse
 * @returns Parsed security response or null
 */
const parseStructuredResponse = responseText => {
  try {
    // Try to parse as JSON
    const parsed = JSON.parse(responseText.trim());

    // Validate it has the expected structure
    if (parsed && typeof parsed === 'object' && parsed.executive_summary && parsed.threat_level && parsed.priority_actions) {
      return parsed;
    }
  } catch {
    // Not JSON or invalid structure
  }
  return null;
};

// Note: All IOC-related functions have been moved to iocCore.ts
// Components should import from '../../utils/security/iocCore' instead

// src/hooks/useCopyToClipboard.ts

/**
 * Shared hook for copy-to-clipboard functionality with visual feedback
 * Eliminates duplication across CodeBlock, InlineCode, and IOCDisplay components
 */
const useCopyToClipboard = () => {
  const [copyState, setCopyState] = reactExports.useState('clipboard');
  const copyToClipboard = reactExports.useCallback(async (text, successDuration = 2000) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState('check-circle');
      setTimeout(() => {
        setCopyState('clipboard');
      }, successDuration);
    } catch {
      // Silent failure for copy operation - matches existing behavior
    }
  }, []);
  return {
    copyState,
    isSuccess: copyState === 'check-circle',
    copyToClipboard
  };
};

// src/hooks/useCopyManager.ts

/**
 * Enhanced copy manager hook that integrates with useCopyToClipboard
 * Provides multi-format copy functionality for the Response tab
 */
const useCopyManager = ({
  responseText,
  jsonContextData
}) => {
  const {
    copyState,
    isSuccess,
    copyToClipboard
  } = useCopyToClipboard();

  // Handle copy operation for different formats
  const handleCopyFormat = reactExports.useCallback(async format => {
    // Always try to parse the response as structured JSON first
    const parsedJsonResponse = parseStructuredResponse(responseText);

    // Format the text for the selected copy format
    const textToCopy = formatForCopy(format, responseText, jsonContextData, parsedJsonResponse);

    // Use the shared copy hook for consistent visual feedback
    await copyToClipboard(textToCopy);
  }, [responseText, jsonContextData, copyToClipboard]);
  return {
    copyState,
    isSuccess,
    handleCopyFormat,
    copyOptions: COPY_OPTIONS
  };
};

// src/utils/socketDetection.ts

/**
 * Socket detection utility for CrowdStrike Falcon Console
 * Detects which socket/page the extension is currently embedded in
 */

/**
 * Map of socket identifiers to their display information
 */
const SOCKET_MAP = {
  'activity.detections.details': {
    socket: 'activity.detections.details',
    displayName: 'Activity Detections',
    description: 'Activity app detection detail pages'
  },
  'ngsiem.workbench.details': {
    socket: 'ngsiem.workbench.details',
    displayName: 'Next-Gen SIEM',
    description: 'Next-Gen SIEM workbench detail views'
  },
  'xdr.detections.panel': {
    socket: 'xdr.detections.panel',
    displayName: 'XDR Detections',
    description: 'XDR detection panel views'
  }
};

/**
 * Detects the current socket based on various context clues
 */
function detectCurrentSocket(falconData) {
  // Method 1: Check URL patterns
  const urlSocket = detectSocketFromUrl();
  if (urlSocket && SOCKET_MAP[urlSocket]) {
    const socketInfo = SOCKET_MAP[urlSocket];
    return {
      socket: socketInfo.socket,
      displayName: socketInfo.displayName,
      description: socketInfo.description,
      detected: true,
      detectionMethod: 'URL pattern analysis'
    };
  }

  // Method 2: Check Falcon context data structure
  const contextSocket = detectSocketFromContext(falconData);
  if (contextSocket && SOCKET_MAP[contextSocket]) {
    const socketInfo = SOCKET_MAP[contextSocket];
    return {
      socket: socketInfo.socket,
      displayName: socketInfo.displayName,
      description: socketInfo.description,
      detected: true,
      detectionMethod: 'Falcon context analysis'
    };
  }

  // Method 3: Check document title or parent window
  const titleSocket = detectSocketFromTitle();
  if (titleSocket && SOCKET_MAP[titleSocket]) {
    const socketInfo = SOCKET_MAP[titleSocket];
    return {
      socket: socketInfo.socket,
      displayName: socketInfo.displayName,
      description: socketInfo.description,
      detected: true,
      detectionMethod: 'Document title analysis'
    };
  }

  // Fallback: Unknown socket
  return {
    socket: 'unknown',
    displayName: 'Unknown Page',
    description: 'Unable to detect current Falcon Console page',
    detected: false,
    detectionMethod: 'No detection method successful'
  };
}

/**
 * Detect socket from URL patterns
 */
function detectSocketFromUrl() {
  try {
    const currentUrl = window.location.href;
    const parentUrl = window.parent?.location?.href ?? '';
    const topUrl = window.top?.location?.href ?? '';

    // Check current and parent URLs for patterns
    const urlsToCheck = [currentUrl, parentUrl, topUrl].filter(Boolean);
    for (const url of urlsToCheck) {
      // Activity detections
      if (url.includes('/activity/') && url.includes('/detections/')) {
        return 'activity.detections.details';
      }

      // Next-Gen SIEM
      if (url.includes('/ngsiem/') || url.includes('/workbench/')) {
        return 'ngsiem.workbench.details';
      }

      // XDR detections
      if (url.includes('/xdr/') && url.includes('/detections/')) {
        return 'xdr.detections.panel';
      }
    }
  } catch {
    // Silently handle URL detection errors
  }
  return null;
}

/**
 * Detect socket from Falcon context data structure
 */
function detectSocketFromContext(falconData) {
  if (!falconData) return null;
  try {
    // Check for specific data structures that indicate the current page

    // Next-Gen SIEM: Look for incident data
    if (falconData.incident || falconData.ngsiem) {
      return 'ngsiem.workbench.details';
    }

    // Detection pages: Look for detection data
    if (falconData.detection) {
      // Differentiate between activity and XDR detections
      if (falconData.detection.source?.includes('activity') || falconData.activity) {
        return 'activity.detections.details';
      }
      if (falconData.detection.source?.includes('xdr') || falconData.xdr) {
        return 'xdr.detections.panel';
      }
      // Generic detection fallback
      return 'activity.detections.details';
    }
  } catch {
    // Silently handle context detection errors
  }
  return null;
}

/**
 * Detect socket from document title or DOM elements
 */
function detectSocketFromTitle() {
  try {
    const title = document.title?.toLowerCase() ?? '';
    const parentTitle = window.parent?.document?.title?.toLowerCase() ?? '';
    const topTitle = window.top?.document?.title?.toLowerCase() ?? '';
    const titlesToCheck = [title, parentTitle, topTitle].filter(Boolean);
    for (const titleText of titlesToCheck) {
      if (titleText.includes('activity') && titleText.includes('detection')) {
        return 'activity.detections.details';
      }
      if (titleText.includes('siem') || titleText.includes('workbench')) {
        return 'ngsiem.workbench.details';
      }
      if (titleText.includes('xdr') && titleText.includes('detection')) {
        return 'xdr.detections.panel';
      }
    }
  } catch {
    // Silently handle title detection errors
  }
  return null;
}

// src/hooks/useJsonDataManager.ts

/**
 * Custom hook to manage JSON context data for the application
 * Handles Falcon context, request data, and response data with enhanced copy functionality
 */
const useJsonDataManager = ({
  falconData,
  availableContextOptions,
  contextCounts
}) => {
  const [jsonContextData, setJsonContextData] = reactExports.useState(null);

  // Individual copy hooks for visual feedback
  const {
    copyState: contextCopyState,
    copyToClipboard: copyContextToClipboard
  } = useCopyToClipboard();
  const {
    copyState: requestCopyState,
    copyToClipboard: copyRequestToClipboard
  } = useCopyToClipboard();
  const {
    copyState: responseCopyState,
    copyToClipboard: copyResponseToClipboard
  } = useCopyToClipboard();
  const {
    copyState: rawResponseCopyState,
    copyToClipboard: copyRawResponseToClipboard
  } = useCopyToClipboard();

  // Initialize falcon context data when component mounts
  reactExports.useEffect(() => {
    if (falconData) {
      // Detect current socket information
      const socketInfo = detectCurrentSocket(falconData);
      const falconContextData = {
        socket_info: socketInfo,
        falcon_object: {
          full_data: falconData,
          data_structure: Object.keys(falconData),
          incident: falconData.incident ?? null,
          detection: falconData.detection ?? null,
          available_entities: availableContextOptions,
          entity_counts: {
            total_entities: contextCounts.total,
            domains: contextCounts.domains,
            files: contextCounts.files,
            ips: contextCounts.ips,
            fqdns: contextCounts.fqdns
          }
        }
      };
      const initialJsonContext = {
        falcon_context: falconContextData
      };
      setJsonContextData(initialJsonContext);
    }
  }, [falconData, availableContextOptions, contextCounts]);

  // Initialize request data and return updated context
  const initializeRequestData = reactExports.useCallback(requestParams => {
    const executionStartTime = new Date().toISOString();

    // Create the updated context directly
    const updatedContext = {
      ...jsonContextData,
      request_data: {
        timestamp: executionStartTime,
        parameters: requestParams
      }
    };

    // Update state with the new context
    setJsonContextData(updatedContext);

    // Return the context immediately for synchronous use
    return updatedContext;
  }, [jsonContextData]);

  // Update request data in real-time (preserves existing timestamp)
  const updateRequestData = reactExports.useCallback(requestParams => {
    setJsonContextData(prevState => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        request_data: {
          timestamp: prevState.request_data?.timestamp ?? '',
          // Don't generate new timestamp during updates
          parameters: requestParams
        }
      };
    });
  }, []);

  // Update response data
  const updateResponseData = reactExports.useCallback(responseData => {
    setJsonContextData(prevState => {
      if (!prevState) {
        return prevState;
      }
      const newResponseData = {
        timestamp: responseData.executionEndTime,
        execution_time_ms: new Date(responseData.executionEndTime).getTime() - new Date(responseData.executionStartTime).getTime(),
        success: responseData.success,
        from_cache: responseData.fromCache ?? false,
        content: responseData.content ?? null,
        content_length: responseData.content?.length ?? 0,
        error: responseData.error ?? null,
        workflow_result: responseData.workflowResult
      };
      return {
        ...prevState,
        response_data: newResponseData
      };
    });
  }, []);

  // Copy falcon context to clipboard with visual feedback
  const copyFalconContext = reactExports.useCallback(async () => {
    const falconData = jsonContextData?.falcon_context ?? {};
    await copyContextToClipboard(JSON.stringify(falconData, null, 2));
  }, [jsonContextData, copyContextToClipboard]);

  // Copy request data to clipboard with visual feedback
  const copyRequestData = reactExports.useCallback(async () => {
    const requestData = jsonContextData?.request_data ?? {};
    await copyRequestToClipboard(JSON.stringify(requestData, null, 2));
  }, [jsonContextData, copyRequestToClipboard]);

  // Copy response metadata to clipboard with visual feedback
  const copyResponseData = reactExports.useCallback(async () => {
    if (!jsonContextData?.response_data) {
      await copyResponseToClipboard(JSON.stringify({}, null, 2));
      return;
    }
    const responseData = jsonContextData.response_data;
    // Create a copy without the raw content for metadata-only copy
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      content: _,
      ...metadataOnly
    } = responseData;
    await copyResponseToClipboard(JSON.stringify(metadataOnly, null, 2));
  }, [jsonContextData, copyResponseToClipboard]);

  // Copy raw response content to clipboard with visual feedback
  const copyRawResponse = reactExports.useCallback(async () => {
    const rawContent = jsonContextData?.response_data?.content ?? '';
    await copyRawResponseToClipboard(rawContent);
  }, [jsonContextData, copyRawResponseToClipboard]);
  return {
    jsonContextData,
    initializeRequestData,
    updateRequestData,
    updateResponseData,
    copyFalconContext,
    copyRequestData,
    copyResponseData,
    copyRawResponse,
    // Copy states for visual feedback
    contextCopyState,
    requestCopyState,
    responseCopyState,
    rawResponseCopyState
  };
};

// src/hooks/useTabManager.ts

/**
 * Custom hook to manage tab state and transitions
 * Extracted from Home.tsx for better separation of concerns
 */
const useTabManager = ({
  hasSubmittedQuery,
  loading,
  errorMessage,
  responseText
}) => {
  const [activeTab, setActiveTab] = reactExports.useState('request');
  const tabGroupRef = reactExports.useRef(null);

  // Handle tab change events from Shoelace TabGroup
  const handleTabChange = reactExports.useCallback(e => {
    setActiveTab(e.detail.name);
  }, []);

  // Programmatically switch tabs when activeTab state changes
  reactExports.useEffect(() => {
    if (tabGroupRef.current && activeTab) {
      tabGroupRef.current.show(activeTab);
    }
  }, [activeTab]);

  // Generate response tab indicator icon based on current state
  const getResponseTabIndicator = reactExports.useCallback(() => {
    if (!hasSubmittedQuery) return null;
    if (loading) {
      return /*#__PURE__*/React.createElement(icon_default, {
        name: 'hourglass-split',
        className: 'mr-2',
        style: {
          color: 'var(--cs-status-info)'
        }
      });
    }
    if (errorMessage) {
      return /*#__PURE__*/React.createElement(icon_default, {
        name: 'exclamation-triangle',
        className: 'mr-2',
        style: {
          color: 'var(--cs-status-error)'
        }
      });
    }
    if (responseText) {
      return /*#__PURE__*/React.createElement(icon_default, {
        name: 'check-circle',
        className: 'mr-2',
        style: {
          color: 'var(--cs-status-success)'
        }
      });
    }
    return null;
  }, [hasSubmittedQuery, loading, errorMessage, responseText]);
  return {
    activeTab,
    tabGroupRef,
    handleTabChange,
    setActiveTab,
    getResponseTabIndicator
  };
};

// src/utils/constants.ts


// Charlotte models with space-safe values and display labels
const CHARLOTTE_MODEL_OPTIONS = [{
  value: 'claude-latest',
  label: 'Claude Latest'
}, {
  value: 'claude-3-7-sonnet',
  label: 'Claude 3.7 Sonnet'
}, {
  value: 'gpt-4o',
  label: 'GPT-4o'
}];
const DEFAULT_MODEL = 'claude-latest'; // Space-safe default value

// Model mapping utilities

/**
 * Get display label for a model value
 * @param value - The model value (e.g., 'claude-latest')
 * @returns The display label (e.g., 'Claude Latest') or the original value if not found
 */
const getModelLabel = value => {
  const option = CHARLOTTE_MODEL_OPTIONS.find(opt => opt.value === value);
  return option?.label ?? value;
};

// Temperature options with specific descriptions
const TEMPERATURE_OPTIONS = [{
  value: 0,
  label: '0.0 - Precise'
}, {
  value: 0.1,
  label: '0.1'
}, {
  value: 0.2,
  label: '0.2 - Focused'
}, {
  value: 0.3,
  label: '0.3'
}, {
  value: 0.4,
  label: '0.4 - Balanced'
}, {
  value: 0.5,
  label: '0.5'
}, {
  value: 0.6,
  label: '0.6 - Flexible'
}, {
  value: 0.7,
  label: '0.7'
}, {
  value: 0.8,
  label: '0.8 - Varied'
}, {
  value: 0.9,
  label: '0.9'
}, {
  value: 1,
  label: '1.0 - Creative'
}];

// Charlotte workflow parameter defaults (from schema)
const DEFAULT_TEMPERATURE = 0.1;
const DEFAULT_STOP_WORDS = [];
const DEFAULT_JSON_SCHEMA = '';
const DEFAULT_DATA_TO_INCLUDE = [];

// Validation and optimization thresholds (consolidated from contextConstants.ts)
const VALIDATION_THRESHOLDS = {
  // characters (was PROMPT_OPTIMIZATION_THRESHOLD)
  CONTEXT_ITEMS: 10,
  // max stop words warning
  LONG_PROMPT: 5000,
  // characters
  JSON_SCHEMA_SIZE: 2000,
  // characters
  PAYLOAD_SIZE_HIGH: 50000,
  // bytes
  PAYLOAD_SIZE_MEDIUM: 20000 // bytes
};

// src/utils/helpers.ts

/**
 * Wait for a specified amount of time
 * @param ms - Time to wait in milliseconds
 * @returns Promise that resolves after the specified time
 */
const wait = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Validate query input
 * @param query - Query string to validate
 * @returns Validation result
 */
const validateQuery = query => {
  if (!query || typeof query !== 'string') {
    return {
      isValid: false,
      error: 'Query is required'
    };
  }
  const trimmed = query.trim();
  if (trimmed.length === 0) {
    return {
      isValid: false,
      error: 'Query cannot be empty'
    };
  }
  if (trimmed.length > 10000) {
    return {
      isValid: false,
      error: 'Query is too long (max 10,000 characters)'
    };
  }
  return {
    isValid: true
  };
};

/**
 * Format error message for display
 * @param error - Error object or string
 * @returns Formatted error message
 */
const formatErrorMessage = error => {
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  return 'An unexpected error occurred';
};

/**
 * Builds MITRE ATT&CK URL from technique ID
 * @param techniqueId - MITRE technique ID (e.g., "T1027", "T1566.001")
 * @returns MITRE ATT&CK URL
 */
const buildMitreUrl = techniqueId => {
  const baseUrl = 'https://attack.mitre.org/techniques/';

  // Convert dot notation to slash notation for sub-techniques
  // T1566.001 → T1566/001/
  // T1027 → T1027/
  const urlPath = techniqueId.replace('.', '/');
  return `${baseUrl}${urlPath}/`;
};

// src/services/workflow/types.ts

/**
 * Interface for security context (simplified)
 */

/**
 * Interface for workflow execution parameters
 */

/**
 * Interface for workflow execution result
 */

/**
 * Enum for workflow execution statuses
 */
let WorkflowStatus = /*#__PURE__*/function (WorkflowStatus) {
  WorkflowStatus["PENDING"] = "Pending";
  WorkflowStatus["IN_PROGRESS"] = "InProgress";
  WorkflowStatus["RUNNING"] = "Running";
  WorkflowStatus["COMPLETED"] = "Completed";
  WorkflowStatus["FAILED"] = "Failed";
  WorkflowStatus["UNKNOWN"] = "Unknown";
  return WorkflowStatus;
}({});

/**
 * Interface for workflow execution payload
 */

/**
 * Interface for API error responses
 */

/**
 * Interface for standard API responses
 */

/**
 * Interface for workflow polling result
 */

/**
 * Interface for workflow execution data from API
 */

/**
 * Configuration constants for workflow execution
 */
const WORKFLOW_CONFIG = {
  MAX_POLL_ATTEMPTS: 90,
  WORKFLOW_NAME: 'Charlotte Toolkit Chat Completion',
  WORKFLOW_DEPTH: 0
};

// Note: Model mapping and options are now centralized in utils/constants.ts
// This reduces duplication and keeps UI-related model definitions in one place

// src/services/workflow/WorkflowContentExtractor.ts

/**
 * Content extraction utilities for workflow output parsing
 * Handles various workflow output formats and ensures robust content extraction
 */

/**
 * Extract content from workflow output data
 * Tries multiple extraction strategies to handle different workflow output formats
 * @param outputData - Workflow output data from API response
 * @returns Extracted content string
 * @throws Error if no content can be extracted
 */
const extractWorkflowContent = outputData => {
  if (!outputData) {
    throw new Error('No output data received from workflow');
  }
  let content = '';

  // Strategy 1: Charlotte workflow dynamic completion field
  // Pattern: "activity_{UUID}.FaaS.nlpassistantapi.llminvocator_handler.completion"
  const dynamicCompletionField = findDynamicCompletionField(outputData);
  if (dynamicCompletionField) {
    content = outputData[dynamicCompletionField];
  }
  // Strategy 2: Simple Charlotte schema format
  else if (outputData.completion) {
    content = outputData.completion;
  }
  // Strategy 3: Legacy fallback formats
  else {
    content = extractFromLegacyFormats(outputData);
  }

  // Validate extracted content
  if (!content || typeof content !== 'string') {
    logExtractionFailure(outputData);
    throw new Error('Unable to extract content from workflow output');
  }

  // Validate content is not empty
  if (!content.trim()) {
    throw new Error('Workflow completed but produced no content');
  }

  // Always preserve JSON structure for Charlotte AI responses
  const trimmedContent = content.trim();

  // Debug logging disabled for production

  return trimmedContent;
};

/**
 * Find dynamic completion field in Charlotte workflow output
 * @param outputData - Output data to search
 * @returns Field name if found, null otherwise
 */
const findDynamicCompletionField = outputData => {
  const found = Object.keys(outputData).find(key => key.includes('.completion') && !key.includes('.meta') &&
  // Exclude metadata fields
  key.includes('llminvocator_handler'));
  if (found === undefined) {
    return null;
  }
  return found;
};

/**
 * Extract content from legacy workflow output formats
 * @param outputData - Output data to extract from
 * @returns Extracted content or empty string
 */
const extractFromLegacyFormats = outputData => {
  // Try standard content fields
  if (outputData.content) {
    return outputData.content;
  }
  if (outputData.response) {
    return outputData.response;
  }
  if (outputData.result) {
    return outputData.result;
  }
  if (outputData.output) {
    return outputData.output;
  }

  // Handle string output data directly
  if (typeof outputData === 'string') {
    return outputData;
  }

  // Try generic completion field pattern
  const genericCompletionField = Object.keys(outputData).find(key => key.endsWith('.completion') && !key.includes('.meta'));
  if (genericCompletionField && typeof outputData[genericCompletionField] === 'string') {
    return outputData[genericCompletionField];
  }

  // Last resort: try to extract from nested structure
  return extractFromNestedStructure(outputData);
};

/**
 * Attempt to extract content from nested object structures
 * @param outputData - Output data with nested structure
 * @returns Extracted content or empty string
 */
const extractFromNestedStructure = outputData => {
  const keys = Object.keys(outputData);
  if (keys.length === 0) {
    return '';
  }
  const [firstKey] = keys;
  if (!firstKey) {
    return '';
  }
  const firstValue = outputData[firstKey];
  if (typeof firstValue === 'string') {
    return firstValue;
  }
  if (firstValue && typeof firstValue === 'object') {
    if (firstValue.completion) {
      return firstValue.completion;
    }
    if (firstValue.content) {
      return firstValue.content;
    }
  }
  return '';
};

/**
 * Log detailed information about extraction failure for debugging
 * @param outputData - Output data that failed extraction
 */
const logExtractionFailure = outputData => {
  // console.error('=== CONTENT EXTRACTION FAILURE ===');
  // console.error('Unable to extract content from output data:', outputData);
  // console.error('Available fields:', Object.keys(outputData));
  // console.error('Field types:', Object.keys(outputData).map(...));

  // Log potential completion fields for debugging
  const potentialFields = Object.keys(outputData).filter(key => key.includes('completion') || key.includes('content') || key.includes('response') || key.includes('result'));
  if (potentialFields.length > 0) {
    // console.error('Potential content fields found:', potentialFields);
    potentialFields.forEach(_field => {
      // console.error(`${field}:`, typeof outputData[field], outputData[field]);
    });
  }
};

/**
 * Validate extracted content quality
 * @param content - Extracted content to validate
 * @returns Validation result with quality metrics
 */
const validateExtractedContent = content => {
  const warnings = [];
  if (!content || typeof content !== 'string') {
    return {
      isValid: false,
      isEmpty: true,
      wordCount: 0,
      hasStructuredData: false,
      estimatedFormat: 'text',
      warnings: ['Content is not a string or is null/undefined']
    };
  }
  const trimmedContent = content.trim();
  const isEmpty = trimmedContent.length === 0;
  const wordCount = trimmedContent.split(/\s+/).length;

  // Detect content format
  let estimatedFormat = 'text';
  let hasStructuredData = false;
  try {
    JSON.parse(trimmedContent);
    estimatedFormat = 'json';
    hasStructuredData = true;
  } catch {
    if (trimmedContent.includes('<') && trimmedContent.includes('>')) {
      estimatedFormat = 'html';
    } else if (trimmedContent.includes('#') || trimmedContent.includes('```')) {
      estimatedFormat = 'markdown';
    }
  }

  // Generate warnings
  if (isEmpty) {
    warnings.push('Content is empty after trimming');
  } else if (wordCount < 5) {
    warnings.push('Content is very short (less than 5 words)');
  } else if (wordCount > 5000) {
    warnings.push('Content is very long (over 5000 words)');
  }
  if (trimmedContent.includes('Error:') || trimmedContent.includes('error:')) {
    warnings.push('Content appears to contain error messages');
  }
  return {
    isValid: !isEmpty,
    isEmpty,
    wordCount,
    hasStructuredData,
    estimatedFormat,
    warnings
  };
};

// src/utils/promptEngineer.ts

/**
 * Simplified prompt engineering utilities for Charlotte AI
 * Provides intelligent use case detection and schema generation for security analysis
 */

/**
 * Supported use cases for Charlotte AI security analysis
 */

/**
 * Detect the most appropriate use case from a user query
 * Uses pattern matching and keyword analysis to determine the best analysis type
 * @param query - User input query to analyze
 * @returns The detected use case that best matches the query content
 */
const detectUseCase = query => {
  const lowercaseQuery = query.toLowerCase();

  // Hash patterns
  if (/\b[a-f0-9]{32}\b|\b[a-f0-9]{40}\b|\b[a-f0-9]{64}\b/i.test(query)) {
    return 'hash_analysis';
  }

  // IP patterns
  if (/\b(?:\d{1,3}\.){3}\d{1,3}\b/.test(query)) {
    return 'ip_investigation';
  }

  // Domain patterns
  if (/\b[a-z0-9.-]+\.[a-z]{2,}\b/i.test(query)) {
    return 'domain_analysis';
  }

  // Keyword detection
  if (lowercaseQuery.includes('incident') || lowercaseQuery.includes('response') || lowercaseQuery.includes('containment')) {
    return 'incident_response';
  }
  if (lowercaseQuery.includes('malware') || lowercaseQuery.includes('virus') || lowercaseQuery.includes('trojan')) {
    return 'malware_analysis';
  }
  if (lowercaseQuery.includes('hunt') || lowercaseQuery.includes('hunting') || lowercaseQuery.includes('proactive')) {
    return 'threat_hunting';
  }
  return 'general_security';
};

/**
 * Create optimized JSON schema for structured Charlotte AI responses
 * Generates use case-specific schemas with appropriate fields and validation
 * @param useCase - The detected or specified use case for analysis
 * @returns JSON schema string optimized for the specific security analysis type
 */
const createSecurityResponseSchema = useCase => {
  // Generate use-case specific schema
  switch (useCase) {
    case 'hash_analysis':
    case 'malware_analysis':
      return createMalwareAnalysisSchema();
    case 'ip_investigation':
      return createIPInvestigationSchema();
    case 'domain_analysis':
      return createDomainAnalysisSchema();
    case 'incident_response':
      return createIncidentResponseSchema();
    case 'threat_hunting':
      return createThreatHuntingSchema();
    default:
      return createGeneralSecuritySchema();
  }
};

/**
 * Create simplified universal security analysis schema
 * Provides clean, focused structure for all security analysis types
 * @returns JSON schema string for security analysis responses
 */
const createUniversalSecuritySchema = () => {
  const schema = {
    type: 'object',
    properties: {
      executive_summary: {
        type: 'string',
        description: 'Brief executive overview for leadership'
      },
      threat_level: {
        type: 'string',
        enum: ['Low', 'Medium', 'High', 'Critical'],
        description: 'Overall threat severity'
      },
      confidence_level: {
        type: 'string',
        enum: ['Low', 'Medium', 'High'],
        description: 'Analysis confidence level'
      },
      // Unified priority actions - replaces all multiple recommendation arrays
      priority_actions: {
        type: 'array',
        items: {
          type: 'string',
          maxLength: 150
        },
        maxItems: 6,
        description: 'Top priority security actions ranked by urgency and impact'
      },
      // Technical analysis details
      technical_details: {
        type: 'string',
        maxLength: 600,
        description: 'Concise technical analysis and findings'
      },
      // Unified IOCs structure (when applicable)
      iocs: {
        type: 'object',
        properties: {
          hashes: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          ips: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          domains: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          urls: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          file_paths: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        },
        description: 'Indicators of Compromise when applicable'
      },
      // MITRE techniques (when applicable)
      mitre_techniques: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            technique_id: {
              type: 'string'
            },
            technique_name: {
              type: 'string'
            },
            description: {
              type: 'string'
            }
          }
        },
        description: 'MITRE ATT&CK techniques when applicable'
      },
      // Analysis methodology and reasoning
      reasoning_assessment: {
        type: 'string',
        maxLength: 800,
        description: 'Concise explanation of analytical methodology and confidence reasoning: data sources consulted, key decision factors, specific evidence supporting findings, and reasoning behind confidence levels. Focus on essential rationale rather than comprehensive details.'
      }
    },
    required: ['executive_summary', 'threat_level', 'confidence_level', 'priority_actions', 'technical_details', 'reasoning_assessment']
  };
  return JSON.stringify(schema, null, 2);
};

/**
 * Create simplified universal security analysis schema
 * Provides clean, focused structure for all security analysis types
 * @returns JSON schema string for security analysis responses
 */
const createMalwareAnalysisSchema = () => {
  return createUniversalSecuritySchema();
};

/**
 * Create IP investigation schema - now uses simplified universal schema
 * @returns JSON schema string for IP investigation responses
 */
const createIPInvestigationSchema = () => {
  return createUniversalSecuritySchema();
};

/**
 * Create domain analysis schema - now uses simplified universal schema
 * @returns JSON schema string for domain analysis responses
 */
const createDomainAnalysisSchema = () => {
  return createUniversalSecuritySchema();
};

/**
 * Create incident response schema - now uses simplified universal schema
 * @returns JSON schema string for incident response workflows
 */
const createIncidentResponseSchema = () => {
  return createUniversalSecuritySchema();
};

/**
 * Create threat hunting schema - now uses simplified universal schema
 * @returns JSON schema string for threat hunting activities
 */
const createThreatHuntingSchema = () => {
  return createUniversalSecuritySchema();
};

/**
 * Create general security analysis schema - now uses simplified universal schema
 * @returns JSON schema string for general security analysis responses
 */
const createGeneralSecuritySchema = () => {
  return createUniversalSecuritySchema();
};

// src/services/workflow/WorkflowPayloadBuilder.ts

/**
 * Build workflow execution payload with enhanced prompting
 * Handles model name normalization, prompt enhancement, and parameter formatting
 * @param params - Workflow execution parameters
 * @returns Formatted payload for workflow execution
 */
const buildWorkflowPayload = params => {
  const {
    query,
    model,
    temperature,
    selectedContext
  } = params;

  // Normalize model name to ensure schema compliance
  const normalizedModel = normalizeModelName(model);

  // Enhanced prompt engineering for Charlotte AI
  let finalPrompt = query;
  let enhancedJsonSchema = params.jsonSchema;

  // Apply prompt enhancement if enabled (default: true for better Charlotte AI results)
  const shouldEnhancePrompts = params.enablePromptEnhancement !== false;
  if (shouldEnhancePrompts) {
    // console.log('🔬 Enhancing prompt for Charlotte AI security expertise...');

    // Use query as-is (simplified prompt handling)
    finalPrompt = query;

    // Auto-generate structured schema if none provided
    if (!enhancedJsonSchema?.trim()) {
      const detectedUseCase = detectUseCase(query);
      enhancedJsonSchema = createSecurityResponseSchema(detectedUseCase);
      // console.log(`📋 Auto-generated ${detectedUseCase} response schema`);
    }

    // console.log('✅ Prompt enhancement applied for better Charlotte AI analysis');
  } else {
    // console.log('📝 Using raw prompt (enhancement disabled)');
    finalPrompt = query;
  }

  // Build base payload
  const payload = {
    user_prompt: finalPrompt,
    model_name: normalizedModel,
    temperature
  };

  // Add optional parameters if provided
  addOptionalParameters(payload, params, enhancedJsonSchema, selectedContext);
  return payload;
};

/**
 * Normalize model name to match workflow schema exactly
 * @param modelName - Model name that might have underscores
 * @returns Normalized model name with spaces as required by schema
 */
const normalizeModelName = modelName => {
  return getModelLabel(modelName);
};

/**
 * Add optional parameters to payload if provided
 * @param payload - Base payload to enhance
 * @param params - Original workflow parameters
 * @param enhancedJsonSchema - Processed JSON schema
 * @param selectedContext - Selected context data
 */
const addOptionalParameters = (payload, params, enhancedJsonSchema, selectedContext) => {
  // Add stop words if provided
  if (params.stopWords && params.stopWords.length > 0) {
    payload.stop_words = params.stopWords;
  }

  // Add JSON schema if provided
  if (enhancedJsonSchema?.trim()) {
    payload.json_schema = enhancedJsonSchema.trim();
  }

  // Add data to include if provided
  if (params.dataToInclude && params.dataToInclude.length > 0) {
    payload.data_to_include = [...params.dataToInclude];
  }

  // Add context data if selected
  if (selectedContext?.trim()) {
    if (payload.data_to_include) {
      payload.data_to_include = [...payload.data_to_include, selectedContext];
    } else {
      payload.data_to_include = [selectedContext];
    }
  }
};

/**
 * Estimate payload size for performance optimization
 * @param payload - Payload to analyze
 * @returns Size estimation and recommendations
 */
const analyzePayloadSize = payload => {
  const jsonString = JSON.stringify(payload);
  const estimatedBytes = new Blob([jsonString]).size;
  const characterCount = jsonString.length;
  let complexity = 'low';
  const recommendations = [];

  // Determine complexity
  if (estimatedBytes > VALIDATION_THRESHOLDS.PAYLOAD_SIZE_HIGH) {
    complexity = 'high';
    recommendations.push('Consider breaking down the request into smaller chunks');
  } else if (estimatedBytes > VALIDATION_THRESHOLDS.PAYLOAD_SIZE_MEDIUM) {
    complexity = 'medium';
    recommendations.push('Monitor response times for potential optimization');
  }

  // Specific recommendations
  if (payload.user_prompt && payload.user_prompt.length > VALIDATION_THRESHOLDS.LONG_PROMPT) {
    recommendations.push('Consider shortening the main prompt');
  }
  if (payload.data_to_include && payload.data_to_include.length > VALIDATION_THRESHOLDS.CONTEXT_ITEMS - 2) {
    recommendations.push('Reduce context data for better focus');
  }
  if (payload.json_schema && payload.json_schema.length > VALIDATION_THRESHOLDS.JSON_SCHEMA_SIZE) {
    recommendations.push('Simplify JSON schema for faster processing');
  }
  return {
    estimatedBytes,
    characterCount,
    complexity,
    recommendations
  };
};

/**
 * Log payload information for debugging
 * @param payload - Payload to log
 * @param context - Additional context for logging
 */
const logPayloadInfo = (payload, _context = '') => {
  // console.log(`=== PAYLOAD INFO ${context ? `(${context})` : ''} ===`);
  // console.log('Model:', payload.model_name);
  // console.log('Temperature:', payload.temperature);
  // console.log('Prompt length:', payload.user_prompt?.length || 0);
  // console.log('Has schema:', !!payload.json_schema);
  // console.log('Stop words:', payload.stop_words?.length || 0);
  // console.log('Context items:', payload.data_to_include?.length || 0);

  analyzePayloadSize(payload);
};

// src/services/workflow/WorkflowPolling.ts


/**
 * Poll workflow for completion with simple 1-second intervals
 * Handles status checking, retry logic, and timeout management
 * @param falcon - Falcon API instance
 * @param workflowId - Workflow execution ID
 * @param options - Polling configuration options
 * @returns Promise with workflow completion result
 */
const pollWorkflowCompletion = async (falcon, workflowId, options = {}) => {
  const {
    maxAttempts = WORKFLOW_CONFIG.MAX_POLL_ATTEMPTS
  } = options;
  let attempts = 0;
  const delay = 1000; // Fixed 1-second delay
  const pollResults = [];
  while (attempts < maxAttempts) {
    try {
      const result = await getWorkflowStatus(falcon, workflowId);
      pollResults.push({
        attempt: attempts + 1,
        timestamp: Date.now(),
        status: result.status,
        hasOutput: !!result.output_data
      });

      // Check if workflow is complete
      if (result.status === WorkflowStatus.COMPLETED) {
        return {
          status: WorkflowStatus.COMPLETED,
          ...(result.output_data && {
            output_data: result.output_data
          }),
          pollResults
        };
      }

      // Check if workflow failed
      if (result.status === WorkflowStatus.FAILED) {
        return {
          status: WorkflowStatus.FAILED,
          error: result.error ?? 'Workflow execution failed',
          pollResults
        };
      }

      // Still running, wait and try again
      if (isWorkflowRunning(result.status)) {
        attempts++;
        if (attempts < maxAttempts) {
          // console.log(`⏳ Polling attempt ${attempts}/${maxAttempts} - Status: ${result.status} - Waiting 1 second`);
          await wait(delay);
          continue;
        } else {
          throw new Error('Workflow execution timed out');
        }
      }

      // Unknown status
      throw new Error(`Unknown workflow status: ${result.status}`);
    } catch (error) {
      // console.error(`Polling attempt ${attempts + 1} failed:`, error);

      // Add error to poll results
      pollResults.push({
        attempt: attempts + 1,
        timestamp: Date.now(),
        error: error instanceof Error ? error.message : String(error)
      });

      // If this is the last attempt, throw the error
      if (attempts >= maxAttempts - 1) {
        throw error;
      }

      // Otherwise, wait and try again
      attempts++;
      await wait(delay);
    }
  }
  throw new Error('Workflow polling timed out after maximum attempts');
};

/**
 * Get current workflow execution status
 * @param falcon - Falcon API instance
 * @param workflowId - Workflow execution ID
 * @returns Current workflow status and data
 */
const getWorkflowStatus = async (falcon, workflowId) => {
  const result = await falcon.api.workflows.getEntitiesExecutionResultsV1({
    ids: [workflowId]
  });
  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0]?.message ?? 'Failed to get workflow results');
  }
  if (!result.resources || result.resources.length === 0) {
    throw new Error('No workflow results found');
  }
  const workflowResult = result.resources[0];
  return {
    status: parseWorkflowStatus(workflowResult.status),
    output_data: workflowResult.output_data,
    error: workflowResult.error
  };
};

/**
 * Check if workflow is in a running state
 * @param status - Workflow status to check
 * @returns True if workflow is still running
 */
const isWorkflowRunning = status => {
  return status === WorkflowStatus.IN_PROGRESS || status === WorkflowStatus.RUNNING || status === WorkflowStatus.PENDING;
};

/**
 * Parse workflow status string to enum
 * @param statusString - Status string from API
 * @returns Parsed workflow status
 */
const parseWorkflowStatus = statusString => {
  const normalizedStatus = statusString?.trim().toLowerCase();
  switch (normalizedStatus) {
    case 'pending':
      return WorkflowStatus.PENDING;
    case 'inprogress':
    case 'in progress':
      return WorkflowStatus.IN_PROGRESS;
    case 'running':
      return WorkflowStatus.RUNNING;
    case 'completed':
      return WorkflowStatus.COMPLETED;
    case 'failed':
      return WorkflowStatus.FAILED;
    default:
      // console.warn(`Unknown workflow status: ${statusString}`);
      return WorkflowStatus.UNKNOWN;
  }
};

// src/services/workflow/WorkflowValidator.ts

/**
 * Validation result interface
 */

/**
 * Validate workflow execution parameters
 * Ensures all required parameters are present and properly formatted
 * @param params - Parameters to validate
 * @returns Validation result with error details if invalid
 */
const validateWorkflowParams = params => {
  // Query validation
  if (!params.query || typeof params.query !== 'string' || !params.query.trim()) {
    return {
      isValid: false,
      error: 'Query is required'
    };
  }

  // Model validation
  if (!params.model || typeof params.model !== 'string') {
    return {
      isValid: false,
      error: 'Model is required'
    };
  }

  // Temperature validation
  if (typeof params.temperature !== 'number' || params.temperature < 0 || params.temperature > 1) {
    return {
      isValid: false,
      error: 'Temperature must be between 0 and 1'
    };
  }

  // Stop words validation (optional parameter)
  if (params.stopWords && !Array.isArray(params.stopWords)) {
    return {
      isValid: false,
      error: 'Stop words must be an array'
    };
  }
  if (params.stopWords && params.stopWords.length > 4) {
    return {
      isValid: false,
      error: 'Maximum 4 stop words allowed'
    };
  }

  // JSON schema validation (optional parameter)
  if (params.jsonSchema && typeof params.jsonSchema !== 'string') {
    return {
      isValid: false,
      error: 'JSON schema must be a string'
    };
  }

  // Data to include validation (optional parameter)
  if (params.dataToInclude && !Array.isArray(params.dataToInclude)) {
    return {
      isValid: false,
      error: 'Data to include must be an array'
    };
  }
  return {
    isValid: true
  };
};

// src/services/workflow/WorkflowExecutor.ts


/**
 * Execute workflow via Falcon API
 * Handles the initial workflow trigger and returns the execution ID
 * @param falcon - Falcon API instance
 * @param payload - Workflow execution payload
 * @returns Promise with workflow execution response
 */
const executeWorkflow = async (falcon, payload) => {
  const workflowConfig = {
    name: WORKFLOW_CONFIG.WORKFLOW_NAME,
    depth: WORKFLOW_CONFIG.WORKFLOW_DEPTH
  };

  // console.log(`🚀 Executing workflow: ${workflowConfig.name}`);
  const response = await falcon.api.workflows.postEntitiesExecuteV1(payload, workflowConfig);
  if (response.errors && response.errors.length > 0) {
    throw new Error(response.errors[0]?.message ?? 'Workflow execution failed');
  }
  if (!response.resources || response.resources.length === 0) {
    throw new Error('No workflow execution ID returned');
  }
  return response;
};

/**
 * Check cache for existing response
 * @param params - Workflow execution parameters
 * @returns Cached response or null
 */
const checkCache = params => {
  {
    return null;
  }
};

/**
 * Execute workflow with full error handling and caching
 * Main function to execute LLM workflow with modular architecture
 * @param falcon - Falcon API instance
 * @param params - Workflow execution parameters
 * @returns Promise with workflow execution result
 */
const executeWorkflowWithCache = async (falcon, params) => {
  let workflowId;
  let payload;
  let pollingResult;
  try {
    // console.log('🎯 Starting workflow execution with modular architecture...');

    // Step 1: Validate parameters using WorkflowValidator
    const validation = validateWorkflowParams(params);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error ?? 'Validation failed'
      };
    }

    // Step 2: Check cache first
    const cachedResponse = checkCache();
    if (cachedResponse) {
      // console.log('💾 Cache hit - returning cached response');
      return {
        success: true,
        content: cachedResponse,
        fromCache: true
      };
    }

    // Step 3: Build payload using WorkflowPayloadBuilder
    payload = buildWorkflowPayload(params);
    logPayloadInfo(payload, 'Workflow Execution');

    // Step 4: Execute workflow
    const executionResponse = await executeWorkflow(falcon, payload);
    [workflowId] = executionResponse.resources;

    // console.log(`✅ Workflow started successfully: ${workflowId}`);

    // Step 5: Poll for completion using WorkflowPolling
    if (!workflowId) {
      throw new Error('No workflow ID received from execution');
    }

    // console.log('⏳ Polling for workflow completion...');
    pollingResult = await pollWorkflowCompletion(falcon, workflowId);
    if (pollingResult.status === WorkflowStatus.FAILED) {
      const errorMessage = pollingResult.error ?? 'Workflow execution failed';
      return {
        success: false,
        error: errorMessage
      };
    }

    // Step 6: Extract content using WorkflowContentExtractor
    // console.log('📤 Extracting workflow results...');
    const content = extractWorkflowContent(pollingResult.output_data);

    // Step 7: Validate extracted content quality
    validateExtractedContent(content);

    // console.log(`🎉 Workflow execution completed successfully`);

    return {
      success: true,
      content,
      fromCache: false
    };
  } catch (error) {
    // console.error('❌ Workflow execution failed:', error);

    return {
      success: false,
      error: formatErrorMessage(error)
    };
  }
};

var _jsxFileName$d = "/Users/mraible/dev/foundry-sample-charlotte-toolkit/ui/extensions/charlotte-toolkit-ui/src/components/form/AdvancedOptionsPanel.tsx";
const AdvancedOptionsPanel = ({
  showJsonTab,
  setShowJsonTab,
  temperature,
  setTemperature,
  stopWords,
  setStopWords,
  jsonSchema,
  setJsonSchema,
  dataToInclude,
  setDataToInclude
}) => {
  // State for stop words input
  const [stopWordsInput, setStopWordsInput] = reactExports.useState('');

  // State for data to include input
  const [dataToIncludeInput, setDataToIncludeInput] = reactExports.useState('');

  // Handle adding stop words
  const handleAddStopWord = () => {
    if (stopWordsInput.trim() && stopWords.length < 4) {
      setStopWords([...stopWords, stopWordsInput.trim()]);
      setStopWordsInput('');
    }
  };

  // Handle removing stop words
  const handleRemoveStopWord = index => {
    setStopWords(stopWords.filter((_, i) => i !== index));
  };

  // Handle adding data to include
  const handleAddDataToInclude = () => {
    if (dataToIncludeInput.trim()) {
      setDataToInclude([...dataToInclude, dataToIncludeInput.trim()]);
      setDataToIncludeInput('');
    }
  };

  // Handle removing data to include
  const handleRemoveDataToInclude = index => {
    setDataToInclude(dataToInclude.filter((_, i) => i !== index));
  };
  return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(details_default, {
    summary: "Advanced Options",
    className: "advanced-options-subtle",
    children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
      className: "flex flex-col gap-4 mt-3",
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "flex items-center gap-2",
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
          className: "flex-1",
          children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(checkbox_default, {
            checked: showJsonTab,
            onSlChange: e => setShowJsonTab(e.target.checked),
            children: "Show JSON objects"
          }, void 0, false, {
            fileName: _jsxFileName$d,
            lineNumber: 81,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName$d,
          lineNumber: 80,
          columnNumber: 11
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tooltip_default, {
          content: "Enable a JSON tab in the response to view complete request and response data for analysis and troubleshooting.",
          children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            name: "question-circle",
            className: "cursor-help",
            style: {
              color: `var(--cs-text-secondary)`
            }
          }, void 0, false, {
            fileName: _jsxFileName$d,
            lineNumber: 91,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName$d,
          lineNumber: 90,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName$d,
        lineNumber: 79,
        columnNumber: 9
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "flex items-center gap-2",
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
          className: "flex-1",
          children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(select_default, {
            label: "Temperature",
            value: String(temperature),
            onSlChange: e => setTemperature(Number.parseFloat(e.target.value)),
            children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
              slot: "prefix",
              name: "thermometer"
            }, void 0, false, {
              fileName: _jsxFileName$d,
              lineNumber: 109,
              columnNumber: 15
            }, undefined), TEMPERATURE_OPTIONS.map(option => /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(option_default, {
              value: String(option.value),
              children: option.label
            }, option.value, false, {
              fileName: _jsxFileName$d,
              lineNumber: 111,
              columnNumber: 17
            }, undefined))]
          }, void 0, true, {
            fileName: _jsxFileName$d,
            lineNumber: 102,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName$d,
          lineNumber: 101,
          columnNumber: 11
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tooltip_default, {
          content: "Controls randomness. Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.",
          children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            name: "question-circle",
            className: "cursor-help",
            style: {
              color: `var(--cs-text-secondary)`
            }
          }, void 0, false, {
            fileName: _jsxFileName$d,
            lineNumber: 118,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName$d,
          lineNumber: 117,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName$d,
        lineNumber: 100,
        columnNumber: 9
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "flex items-start gap-2",
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
          className: "flex-1",
          children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("label", {
            className: "block text-sm font-medium mb-2",
            children: "Stop Sequences"
          }, void 0, false, {
            fileName: _jsxFileName$d,
            lineNumber: 129,
            columnNumber: 13
          }, undefined), stopWords.length > 0 ? /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
            className: "flex flex-wrap gap-2 mb-2 min-h-[32px] p-2 rounded",
            style: {
              border: `1px solid var(--cs-border-color-light)`,
              backgroundColor: `var(--cs-background-light)`
            },
            children: stopWords.map((word, index) => /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
              className: "flex items-center gap-1 px-2 py-1 rounded text-sm",
              style: {
                backgroundColor: 'var(--cs-background-light)',
                color: `var(--cs-text-primary)`
              },
              children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
                children: word
              }, void 0, false, {
                fileName: _jsxFileName$d,
                lineNumber: 147,
                columnNumber: 21
              }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("button", {
                type: "button",
                onClick: () => handleRemoveStopWord(index),
                className: "hover:opacity-80 transition-opacity",
                style: {
                  color: `var(--cs-status-info)`
                },
                children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                  name: "x",
                  style: {
                    fontSize: 'var(--font-size-sm)'
                  }
                }, void 0, false, {
                  fileName: _jsxFileName$d,
                  lineNumber: 154,
                  columnNumber: 23
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName$d,
                lineNumber: 148,
                columnNumber: 21
              }, undefined)]
            }, index, true, {
              fileName: _jsxFileName$d,
              lineNumber: 139,
              columnNumber: 19
            }, undefined))
          }, void 0, false, {
            fileName: _jsxFileName$d,
            lineNumber: 131,
            columnNumber: 15
          }, undefined) : /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
            className: "text-sm mb-2 italic",
            style: {
              color: `var(--cs-text-secondary)`
            },
            children: "Optional: Add stop sequences to control output termination"
          }, void 0, false, {
            fileName: _jsxFileName$d,
            lineNumber: 160,
            columnNumber: 15
          }, undefined), stopWords.length < 4 && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
            className: "flex gap-2",
            children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(input_default, {
              placeholder: "Enter stop sequence",
              value: stopWordsInput,
              onSlInput: e => setStopWordsInput(e.target.value),
              onKeyDown: e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddStopWord();
                }
              }
            }, void 0, false, {
              fileName: _jsxFileName$d,
              lineNumber: 166,
              columnNumber: 17
            }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(button_default, {
              size: "small",
              onClick: handleAddStopWord,
              disabled: !stopWordsInput.trim(),
              children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                name: "plus"
              }, void 0, false, {
                fileName: _jsxFileName$d,
                lineNumber: 184,
                columnNumber: 19
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName$d,
              lineNumber: 179,
              columnNumber: 17
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName$d,
            lineNumber: 165,
            columnNumber: 15
          }, undefined), stopWords.length >= 4 && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
            className: "text-sm",
            style: {
              color: `var(--cs-text-secondary)`
            },
            children: "Maximum 4 stop sequences allowed"
          }, void 0, false, {
            fileName: _jsxFileName$d,
            lineNumber: 189,
            columnNumber: 15
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName$d,
          lineNumber: 128,
          columnNumber: 11
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tooltip_default, {
          content: "Up to 4 sequences where API will stop generating further tokens. The return text will not contain the stop sequence.",
          children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            name: "question-circle",
            className: "cursor-help mt-6",
            style: {
              color: `var(--cs-text-secondary)`
            }
          }, void 0, false, {
            fileName: _jsxFileName$d,
            lineNumber: 195,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName$d,
          lineNumber: 194,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName$d,
        lineNumber: 127,
        columnNumber: 9
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "flex items-start gap-2",
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
          className: "flex-1",
          children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(textarea_default, {
            label: "JSON Schema",
            value: jsonSchema,
            placeholder: "Enter JSON schema to define response structure...",
            rows: 4,
            onSlInput: e => setJsonSchema(e.target.value),
            children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
              slot: "prefix",
              name: "code-square"
            }, void 0, false, {
              fileName: _jsxFileName$d,
              lineNumber: 213,
              columnNumber: 15
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName$d,
            lineNumber: 206,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName$d,
          lineNumber: 205,
          columnNumber: 11
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tooltip_default, {
          content: "JSON schema is used to define the structure of the model's response format.",
          children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            name: "question-circle",
            className: "cursor-help mt-6",
            style: {
              color: `var(--cs-text-secondary)`
            }
          }, void 0, false, {
            fileName: _jsxFileName$d,
            lineNumber: 217,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName$d,
          lineNumber: 216,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName$d,
        lineNumber: 204,
        columnNumber: 9
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "flex items-start gap-2",
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
          className: "flex-1",
          children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("label", {
            className: "block text-sm font-medium mb-2",
            children: "Data to Include"
          }, void 0, false, {
            fileName: _jsxFileName$d,
            lineNumber: 228,
            columnNumber: 13
          }, undefined), dataToInclude.length > 0 ? /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
            className: "flex flex-wrap gap-2 mb-2 min-h-[32px] p-2 rounded",
            style: {
              border: `1px solid var(--cs-border-color-light)`,
              backgroundColor: `var(--cs-background-light)`
            },
            children: dataToInclude.map((data, index) => /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
              className: "flex items-center gap-1 px-2 py-1 rounded text-sm",
              style: {
                backgroundColor: `var(--cs-background-light)`,
                color: `var(--cs-text-primary)`
              },
              children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
                children: data
              }, void 0, false, {
                fileName: _jsxFileName$d,
                lineNumber: 246,
                columnNumber: 21
              }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("button", {
                type: "button",
                onClick: () => handleRemoveDataToInclude(index),
                className: "hover:opacity-80 transition-opacity",
                style: {
                  color: `var(--cs-status-warning)`
                },
                children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                  name: "x",
                  style: {
                    fontSize: 'var(--font-size-sm)'
                  }
                }, void 0, false, {
                  fileName: _jsxFileName$d,
                  lineNumber: 253,
                  columnNumber: 23
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName$d,
                lineNumber: 247,
                columnNumber: 21
              }, undefined)]
            }, index, true, {
              fileName: _jsxFileName$d,
              lineNumber: 238,
              columnNumber: 19
            }, undefined))
          }, void 0, false, {
            fileName: _jsxFileName$d,
            lineNumber: 230,
            columnNumber: 15
          }, undefined) : /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
            className: "text-sm mb-2 italic",
            style: {
              color: `var(--cs-text-secondary)`
            },
            children: "Optional: Add custom data to enhance your analysis"
          }, void 0, false, {
            fileName: _jsxFileName$d,
            lineNumber: 259,
            columnNumber: 15
          }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
            className: "flex gap-2",
            children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(input_default, {
              placeholder: "Enter additional data",
              value: dataToIncludeInput,
              onSlInput: e => setDataToIncludeInput(e.target.value),
              onKeyDown: e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddDataToInclude();
                }
              }
            }, void 0, false, {
              fileName: _jsxFileName$d,
              lineNumber: 264,
              columnNumber: 15
            }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(button_default, {
              size: "small",
              onClick: handleAddDataToInclude,
              disabled: !dataToIncludeInput.trim(),
              children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                name: "plus"
              }, void 0, false, {
                fileName: _jsxFileName$d,
                lineNumber: 282,
                columnNumber: 17
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName$d,
              lineNumber: 277,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName$d,
            lineNumber: 263,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName$d,
          lineNumber: 227,
          columnNumber: 11
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tooltip_default, {
          content: "Additional key-value pairs provided from the trigger or preceding action output fields. This data is appended to the user prompt.",
          children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            name: "question-circle",
            className: "cursor-help mt-6",
            style: {
              color: `var(--cs-text-secondary)`
            }
          }, void 0, false, {
            fileName: _jsxFileName$d,
            lineNumber: 287,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName$d,
          lineNumber: 286,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName$d,
        lineNumber: 226,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$d,
      lineNumber: 77,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName$d,
    lineNumber: 76,
    columnNumber: 5
  }, undefined);
};

var _jsxFileName$c = "/Users/mraible/dev/foundry-sample-charlotte-toolkit/ui/extensions/charlotte-toolkit-ui/src/components/TruncatedText.tsx";
/**
 * Conditionally wraps content with SlTooltip when text is truncated
 * Shows full text on hover when display text differs from original
 * Uses Shoelace's auto-placement system for optimal positioning
 */
const TruncatedText = ({
  originalText,
  displayText,
  children,
  placement = 'top'
}) => {
  // Only show tooltip if content is actually truncated
  const isTruncated = originalText !== displayText;
  if (isTruncated) {
    return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tooltip_default, {
      content: originalText,
      placement: placement,
      hoist: true,
      className: "truncated-text-tooltip",
      trigger: "hover focus",
      distance: 8,
      children: children
    }, void 0, false, {
      fileName: _jsxFileName$c,
      lineNumber: 41,
      columnNumber: 7
    }, undefined);
  }
  return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, {
    children: children
  }, void 0, false);
};

var _jsxFileName$b = "/Users/mraible/dev/foundry-sample-charlotte-toolkit/ui/extensions/charlotte-toolkit-ui/src/components/form/ContextEntitySelector.tsx";
const ContextEntitySelector = ({
  selectedContextEntity,
  setSelectedContextEntity,
  availableContextOptions,
  setQuery
}) => {
  const isContextDisabled = availableContextOptions.length === 0;

  // Get entity counts for badge display
  const getEntityCounts = () => {
    const counts = {
      domain: availableContextOptions.filter(opt => opt.type === 'domain').length,
      file: availableContextOptions.filter(opt => opt.type === 'file').length,
      ip: availableContextOptions.filter(opt => opt.type === 'ip').length,
      mitre: availableContextOptions.filter(opt => opt.type === 'mitre').length
    };
    return counts;
  };

  // Helper function to detect if an option is a child item
  const isChildOption = option => {
    return !!(option.parentFile ?? option.parentDomain ?? ['md5', 'sha256', 'fqdn'].includes(option.subType ?? ''));
  };
  const handleContextEntityChange = e => {
    const target = e.target;
    const selectedValue = target.value;
    if (selectedValue) {
      const selectedOption = availableContextOptions.find(option => option.value === selectedValue);
      if (selectedOption) {
        setSelectedContextEntity(selectedValue);
        setQuery(selectedOption.queryTemplate);
      }
    } else {
      setSelectedContextEntity(null);
    }
  };
  if (isContextDisabled) {
    return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tooltip_default, {
      content: "No context detected for this incident",
      children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "opacity-60 cursor-not-allowed",
        children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(select_default, {
          label: "Incident Context",
          value: "",
          disabled: true,
          children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            slot: "prefix",
            name: "layers"
          }, void 0, false, {
            fileName: _jsxFileName$b,
            lineNumber: 72,
            columnNumber: 13
          }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(option_default, {
            value: "",
            disabled: true,
            children: "No entities available"
          }, void 0, false, {
            fileName: _jsxFileName$b,
            lineNumber: 73,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName$b,
          lineNumber: 71,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName$b,
        lineNumber: 70,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName$b,
      lineNumber: 69,
      columnNumber: 7
    }, undefined);
  }
  const entityCounts = getEntityCounts();
  return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(select_default, {
    label: "Incident Context",
    value: selectedContextEntity ?? '',
    onSlChange: handleContextEntityChange,
    children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
      slot: "prefix",
      name: "layers"
    }, void 0, false, {
      fileName: _jsxFileName$b,
      lineNumber: 90,
      columnNumber: 7
    }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(option_default, {
      value: "",
      children: "None Selected"
    }, void 0, false, {
      fileName: _jsxFileName$b,
      lineNumber: 92,
      columnNumber: 7
    }, undefined), ['domain', 'file', 'ip', 'mitre'].map((type, index) => {
      const optionsOfType = availableContextOptions.filter(option => option.type === type);
      if (optionsOfType.length === 0) return null;
      const groupConfig = {
        domain: {
          name: 'Domains',
          icon: 'shield-exclamation'
        },
        file: {
          name: 'Files',
          icon: 'file-lock'
        },
        ip: {
          name: 'IP Addresses',
          icon: 'router-fill'
        },
        mitre: {
          name: 'MITRE ATT&CK',
          icon: 'shield-exclamation'
        }
      }[type];
      if (!groupConfig) return null;
      const count = entityCounts[type];
      return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(React.Fragment, {
        children: [index > 0 && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(divider_default, {}, void 0, false, {
          fileName: _jsxFileName$b,
          lineNumber: 112,
          columnNumber: 27
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("small", {
          className: "context-group-header",
          children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            name: groupConfig.icon,
            className: "mr-2"
          }, void 0, false, {
            fileName: _jsxFileName$b,
            lineNumber: 116,
            columnNumber: 15
          }, undefined), groupConfig.name, /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(badge_default, {
            className: "ml-2 context-entity-badge",
            children: count
          }, void 0, false, {
            fileName: _jsxFileName$b,
            lineNumber: 118,
            columnNumber: 15
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName$b,
          lineNumber: 115,
          columnNumber: 13
        }, undefined), optionsOfType.map(option => /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(option_default, {
          value: option.value,
          className: isChildOption(option) ? 'child-option' : '',
          children: [(option.subType === 'md5' || option.subType === 'sha256') && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            slot: "prefix",
            name: "fingerprint"
          }, void 0, false, {
            fileName: _jsxFileName$b,
            lineNumber: 130,
            columnNumber: 19
          }, undefined), option.subType === 'fqdn' && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            slot: "prefix",
            name: "globe"
          }, void 0, false, {
            fileName: _jsxFileName$b,
            lineNumber: 132,
            columnNumber: 47
          }, undefined), option.subType === 'tld' && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            slot: "prefix",
            name: "shield-exclamation"
          }, void 0, false, {
            fileName: _jsxFileName$b,
            lineNumber: 133,
            columnNumber: 46
          }, undefined), option.subType === 'filename' && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            slot: "prefix",
            name: "file-earmark"
          }, void 0, false, {
            fileName: _jsxFileName$b,
            lineNumber: 134,
            columnNumber: 51
          }, undefined), option.subType === 'technique' && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            slot: "prefix",
            name: "shield-exclamation"
          }, void 0, false, {
            fileName: _jsxFileName$b,
            lineNumber: 135,
            columnNumber: 52
          }, undefined), option.type === 'ip' && !option.subType && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            slot: "prefix",
            name: "router"
          }, void 0, false, {
            fileName: _jsxFileName$b,
            lineNumber: 138,
            columnNumber: 61
          }, undefined), option.type === 'domain' && !option.subType && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            slot: "prefix",
            name: "shield-exclamation"
          }, void 0, false, {
            fileName: _jsxFileName$b,
            lineNumber: 140,
            columnNumber: 19
          }, undefined), option.type === 'mitre' && !option.subType && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            slot: "prefix",
            name: "shield-exclamation"
          }, void 0, false, {
            fileName: _jsxFileName$b,
            lineNumber: 143,
            columnNumber: 19
          }, undefined), option.type === 'file' && !option.subType && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            slot: "prefix",
            name: "file-lock"
          }, void 0, false, {
            fileName: _jsxFileName$b,
            lineNumber: 146,
            columnNumber: 19
          }, undefined), (() => {
            const {
              displayText,
              originalText
            } = formatDisplayName(option);
            return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(TruncatedText, {
              originalText: originalText,
              displayText: displayText,
              children: displayText
            }, void 0, false, {
              fileName: _jsxFileName$b,
              lineNumber: 152,
              columnNumber: 21
            }, undefined);
          })()]
        }, option.value, true, {
          fileName: _jsxFileName$b,
          lineNumber: 123,
          columnNumber: 15
        }, undefined))]
      }, type, true, {
        fileName: _jsxFileName$b,
        lineNumber: 110,
        columnNumber: 11
      }, undefined);
    })]
  }, void 0, true, {
    fileName: _jsxFileName$b,
    lineNumber: 85,
    columnNumber: 5
  }, undefined);
};

var _jsxFileName$a = "/Users/mraible/dev/foundry-sample-charlotte-toolkit/ui/extensions/charlotte-toolkit-ui/src/components/form/PromptTextarea.tsx";
const PromptTextarea = ({
  query,
  setQuery
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textareaRef = reactExports.useRef(null);

  // Set initial textarea dimensions on mount with delayed calculation and no transitions
  reactExports.useEffect(() => {
    if (textareaRef.current) {
      const element = textareaRef.current;

      // Disable transitions temporarily to prevent visible resize
      element.style.transition = 'none';

      // Delay calculation to ensure component is fully rendered
      setTimeout(() => {
        element.style.height = 'auto';
        const calculatedHeight = Math.max(element.scrollHeight, 96);
        element.style.height = `${calculatedHeight}px`;

        // Re-enable transitions after calculation
        setTimeout(() => {
          element.style.transition = 'height 0.15s ease-out';
        }, 50);
      }, 50);
    }
  }, []);

  // Handle immediate resize during input to prevent scrollbar flicker
  const handleTextareaInput = e => {
    const target = e.target;
    const newValue = target.value;

    // Resize immediately before state update to prevent scrollbar flicker
    if (textareaRef.current) {
      const element = textareaRef.current;
      const currentHeight = element.offsetHeight;

      // Calculate required height for new content
      const newHeight = Math.min(element.scrollHeight, 300);

      // Only resize if there's a meaningful difference
      if (Math.abs(newHeight - currentHeight) > 2) {
        element.style.height = `${newHeight}px`;
      }
    }

    // Update React state after resize
    setQuery(newValue);
  };
  return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
    className: "relative min-h-[120px] z-10",
    children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(textarea_default, {
      ref: textareaRef,
      label: "Prompt",
      value: query,
      rows: 5,
      resize: "none",
      placeholder: "Enter your security analysis question...",
      onSlInput: handleTextareaInput,
      children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
        slot: "prefix",
        name: "chat-quote"
      }, void 0, false, {
        fileName: _jsxFileName$a,
        lineNumber: 71,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName$a,
      lineNumber: 62,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName$a,
    lineNumber: 61,
    columnNumber: 5
  }, undefined);
};

var _jsxFileName$9 = "/Users/mraible/dev/foundry-sample-charlotte-toolkit/ui/extensions/charlotte-toolkit-ui/src/components/form/SubmitSection.tsx";
const SubmitSection = ({
  quotaAcknowledged,
  setQuotaAcknowledged,
  loading,
  query,
  handleSubmit
}) => {
  return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
    className: "flex flex-col gap-3 mt-3",
    children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
      className: "flex items-center justify-between gap-4",
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(checkbox_default, {
        size: "small",
        checked: quotaAcknowledged,
        onSlChange: e => setQuotaAcknowledged(e.target.checked),
        children: "I understand this will use Charlotte AI credits"
      }, void 0, false, {
        fileName: _jsxFileName$9,
        lineNumber: 25,
        columnNumber: 9
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(button_default, {
        variant: "primary",
        size: "medium",
        disabled: loading || !query.trim() || !quotaAcknowledged,
        onClick: handleSubmit,
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
          slot: "prefix",
          name: loading ? 'hourglass-split' : 'send'
        }, void 0, false, {
          fileName: _jsxFileName$9,
          lineNumber: 41,
          columnNumber: 11
        }, undefined), loading ? 'Analyzing...' : 'Analyze with Charlotte']
      }, void 0, true, {
        fileName: _jsxFileName$9,
        lineNumber: 35,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$9,
      lineNumber: 24,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName$9,
    lineNumber: 22,
    columnNumber: 5
  }, undefined);
};

var _jsxFileName$8 = "/Users/mraible/dev/foundry-sample-charlotte-toolkit/ui/extensions/charlotte-toolkit-ui/src/components/QueryForm.tsx";
const QueryForm = /*#__PURE__*/React.memo(({
  query,
  setQuery,
  modelName,
  setModelName,
  temperature,
  setTemperature,
  stopWords,
  setStopWords,
  jsonSchema,
  setJsonSchema,
  dataToInclude,
  setDataToInclude,
  loading,
  handleSubmit,
  selectedContextEntity,
  setSelectedContextEntity,
  availableContextOptions,
  showJsonTab,
  setShowJsonTab,
  quotaAcknowledged,
  setQuotaAcknowledged
}) => {
  const handleModelChange = e => {
    const target = e.target;
    setModelName(target.value);
  };
  return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
    className: "flex flex-col gap-4 isolate",
    children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(ContextEntitySelector, {
      selectedContextEntity: selectedContextEntity,
      setSelectedContextEntity: setSelectedContextEntity,
      availableContextOptions: availableContextOptions,
      setQuery: setQuery
    }, void 0, false, {
      fileName: _jsxFileName$8,
      lineNumber: 71,
      columnNumber: 9
    }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(PromptTextarea, {
      query: query,
      setQuery: setQuery
    }, void 0, false, {
      fileName: _jsxFileName$8,
      lineNumber: 79,
      columnNumber: 9
    }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(select_default, {
      label: "Model",
      defaultValue: modelName,
      value: modelName,
      onSlChange: handleModelChange,
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
        slot: "prefix",
        name: "cpu"
      }, void 0, false, {
        fileName: _jsxFileName$8,
        lineNumber: 88,
        columnNumber: 11
      }, undefined), CHARLOTTE_MODEL_OPTIONS.map(option => /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(option_default, {
        value: option.value,
        children: option.label
      }, option.value, false, {
        fileName: _jsxFileName$8,
        lineNumber: 90,
        columnNumber: 13
      }, undefined))]
    }, void 0, true, {
      fileName: _jsxFileName$8,
      lineNumber: 82,
      columnNumber: 9
    }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(SubmitSection, {
      quotaAcknowledged: quotaAcknowledged,
      setQuotaAcknowledged: setQuotaAcknowledged,
      loading: loading,
      query: query,
      handleSubmit: handleSubmit
    }, void 0, false, {
      fileName: _jsxFileName$8,
      lineNumber: 97,
      columnNumber: 9
    }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(AdvancedOptionsPanel, {
      showJsonTab: showJsonTab,
      setShowJsonTab: setShowJsonTab,
      temperature: temperature,
      setTemperature: setTemperature,
      stopWords: stopWords,
      setStopWords: setStopWords,
      jsonSchema: jsonSchema,
      setJsonSchema: setJsonSchema,
      dataToInclude: dataToInclude,
      setDataToInclude: setDataToInclude
    }, void 0, false, {
      fileName: _jsxFileName$8,
      lineNumber: 106,
      columnNumber: 9
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName$8,
    lineNumber: 69,
    columnNumber: 7
  }, undefined);
});
QueryForm.displayName = 'QueryForm';

var _jsxFileName$7 = "/Users/mraible/dev/foundry-sample-charlotte-toolkit/ui/extensions/charlotte-toolkit-ui/src/components/markdown/CodeBlock.tsx";
const CodeBlock = ({
  children,
  className
}) => {
  const {
    copyState,
    copyToClipboard
  } = useCopyToClipboard();
  const handleCopy = () => {
    copyToClipboard(String(children));
  };
  const language = className?.replace('language-', '') ?? 'text';
  return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
    className: "relative group",
    children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
      className: "flex items-center justify-between mb-2",
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(badge_default, {
        variant: "neutral",
        children: language
      }, void 0, false, {
        fileName: _jsxFileName$7,
        lineNumber: 25,
        columnNumber: 9
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tooltip_default, {
        content: copyState === 'check-circle' ? 'Copied to clipboard!' : `Copy ${language} code to clipboard`,
        placement: "top",
        distance: 8,
        hoist: true,
        children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(button_default, {
          size: "small",
          variant: "text",
          onClick: handleCopy,
          className: `compact-copy-btn opacity-0 group-hover:opacity-100 transition-opacity ${copyState === 'check-circle' ? 'copy-success' : 'text-body-and-labels'}`,
          children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            name: copyState
          }, void 0, false, {
            fileName: _jsxFileName$7,
            lineNumber: 44,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName$7,
          lineNumber: 36,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName$7,
        lineNumber: 26,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$7,
      lineNumber: 24,
      columnNumber: 7
    }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("pre", {
      className: "enhanced-code-block",
      children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("code", {
        className: className,
        children: children
      }, void 0, false, {
        fileName: _jsxFileName$7,
        lineNumber: 49,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName$7,
      lineNumber: 48,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName$7,
    lineNumber: 23,
    columnNumber: 5
  }, undefined);
};

// src/utils/security/iocCore.ts
// Unified IOC handling system - single source of truth for all IOC operations

/**
 * Detect the type of an IOC
 */
const detectIOCType = text => {
  if (!text || typeof text !== 'string') return null;

  // Hash patterns
  const isHash = /^[a-fA-F0-9]{32}$|^[a-fA-F0-9]{40}$|^[a-fA-F0-9]{64}$/.test(text);
  if (isHash) return 'hash';

  // IP patterns (including defanged)
  const isIP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[.[\].]){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(text);
  if (isIP) return 'ip';

  // Domain patterns (including defanged)
  const isDomain = /^[a-zA-Z0-9][a-zA-Z0-9\-[\].-]{1,61}[a-zA-Z0-9][.[\].][a-zA-Z]{2,}$/.test(text);
  if (isDomain) return 'domain';

  // URL patterns
  const isURL = /^https?:\/\//.test(text) || text.includes('://');
  if (isURL) return 'url';

  // Registry key patterns
  const isRegistry = /^HK[A-Z_]+(\\|\/).+/.test(text);
  if (isRegistry) return 'registry';

  // File path patterns
  const isPath = /^[a-zA-Z]:\\|^\/|\\/.test(text) || text.includes('\\') || text.includes('/');
  if (isPath) return 'path';
  return null;
};

/**
 * Defang an IOC for safe display (prevents accidental clicks/navigation)
 */
const defangIOC = ioc => {
  if (!ioc || typeof ioc !== 'string') return ioc;
  return ioc.replace(/\./g, '[.]').replace(/http/g, 'hxxp').replace(/ftp/g, 'fxp');
};

/**
 * Remove defanging from an IOC (for copying original values)
 */
const removeFanging = ioc => {
  if (!ioc || typeof ioc !== 'string') return ioc;
  return ioc.replace(/\[\.\]/g, '.');
};

/**
 * Normalize IOC for comparison (remove defanging, convert to lowercase)
 */
const normalizeIOC = ioc => {
  if (!ioc || typeof ioc !== 'string') return ioc;
  return removeFanging(ioc).toLowerCase().trim();
};

/**
 * Get appropriate CSS classes for IOC display
 */
const getIOCDisplayClasses = (_type, variant = 'list') => {
  const baseClasses = 'font-mono text-xs break-words';
  switch (variant) {
    case 'pill':
      return `${baseClasses} inline-block px-2 py-1 rounded border bg-opacity-50`;
    case 'inline':
      return `${baseClasses} inline`;
    case 'list':
    default:
      return `${baseClasses}`;
  }
};

/**
 * Get badge variant for IOC type (for Shoelace badges)
 */
const getIOCBadgeVariant = type => {
  switch (type) {
    case 'hash':
      return 'warning';
    case 'ip':
      return 'primary';
    case 'domain':
      return 'neutral';
    case 'url':
      return 'neutral';
    case 'registry':
      return 'success';
    case 'path':
      return 'success';
    default:
      return 'neutral';
  }
};

/**
 * Main IOC utility object - single interface for all IOC operations
 */
const IOCCore = {
  // Type detection
  detectType: detectIOCType,
  // Defanging operations
  defang: defangIOC,
  // For safe display
  removeFanging,
  // For copying original values

  // Normalization and comparison
  normalize: normalizeIOC,
  // Display utilities
  getDisplayClasses: getIOCDisplayClasses,
  getBadgeVariant: getIOCBadgeVariant
};

var _jsxFileName$6 = "/Users/mraible/dev/foundry-sample-charlotte-toolkit/ui/extensions/charlotte-toolkit-ui/src/components/markdown/InlineCode.tsx";
const InlineCode = ({
  children,
  className
}) => {
  const text = String(children);
  const iocType = IOCCore.detectType(text);
  const {
    copyState,
    copyToClipboard
  } = useCopyToClipboard();
  const handleIOCCopy = e => {
    e.stopPropagation();
    copyToClipboard(text);
  };
  if (iocType) {
    const badgeVariant = IOCCore.getBadgeVariant(iocType);
    // Defang IOCs for display while keeping original for copying
    const defangedText = IOCCore.defang(text);
    return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
      className: "inline-flex items-center gap-1 ioc-container",
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(badge_default, {
        variant: badgeVariant,
        className: "text-xs",
        children: iocType.toUpperCase()
      }, void 0, false, {
        fileName: _jsxFileName$6,
        lineNumber: 31,
        columnNumber: 9
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tooltip_default, {
        content: copyState === 'check-circle' ? 'Copied to clipboard!' : `Click to copy ${iocType} to clipboard`,
        placement: "top",
        distance: 8,
        hoist: true,
        children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("code", {
          className: "ioc-code cursor-pointer ioc-hover-bg transition-colors",
          onClick: handleIOCCopy,
          children: defangedText
        }, void 0, false, {
          fileName: _jsxFileName$6,
          lineNumber: 44,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName$6,
        lineNumber: 34,
        columnNumber: 9
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tooltip_default, {
        content: copyState === 'check-circle' ? 'Copied to clipboard!' : `Copy ${iocType} to clipboard for further analysis`,
        placement: "top",
        distance: 8,
        hoist: true,
        children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
          name: copyState,
          className: `text-xs cursor-pointer ioc-hover-text ${copyState === 'check-circle' ? 'copy-success' : 'secondary-text'}`,
          onClick: handleIOCCopy
        }, void 0, false, {
          fileName: _jsxFileName$6,
          lineNumber: 61,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName$6,
        lineNumber: 51,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$6,
      lineNumber: 30,
      columnNumber: 7
    }, undefined);
  }
  return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("code", {
    className: className,
    children: children
  }, void 0, false, {
    fileName: _jsxFileName$6,
    lineNumber: 71,
    columnNumber: 10
  }, undefined);
};

// src/components/markdown/index.ts


// Simple components that don't need separate files
const HeadingWithAnchor = ({
  level,
  children,
  ...props
}) => {
  const tagName = `h${level}`;
  const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const headingIcons = {
    1: 'file-text',
    2: 'list-ul',
    3: 'chevron-right',
    4: 'dot',
    5: 'dot',
    6: 'dot'
  };
  const iconName = headingIcons[level] || 'dot';
  return /*#__PURE__*/React.createElement(tagName, {
    id,
    className: 'group flex items-center gap-2',
    ...props
  }, /*#__PURE__*/React.createElement(icon_default, {
    name: iconName,
    className: 'text-sm flex-shrink-0'
  }), children);
};
const ListItem = ({
  children,
  ...props
}) => {
  return /*#__PURE__*/React.createElement('li', {
    className: 'flex items-start gap-2',
    ...props
  }, /*#__PURE__*/React.createElement(icon_default, {
    name: 'dot',
    className: 'secondary-text text-sm mt-0.5 flex-shrink-0'
  }), /*#__PURE__*/React.createElement('span', null, children));
};
const createMarkdownRenderers = () => ({
  code: ({
    _node,
    inline,
    className,
    children,
    ...props
  }) => {
    return inline ? /*#__PURE__*/React.createElement(InlineCode, {
      className,
      ...props
    }, children) : /*#__PURE__*/React.createElement(CodeBlock, {
      className,
      ...props
    }, children);
  },
  heading: ({
    _node,
    level,
    children,
    ...props
  }) => /*#__PURE__*/React.createElement(HeadingWithAnchor, {
    level,
    ...props
  }, children),
  li: ({
    _node,
    children,
    ...props
  }) => /*#__PURE__*/React.createElement(ListItem, {
    ...props
  }, children)
});

var _jsxFileName$5 = "/Users/mraible/dev/foundry-sample-charlotte-toolkit/ui/extensions/charlotte-toolkit-ui/src/components/security/IocDisplay.tsx";
const IOCDisplay = ({
  iocs
}) => {
  const [copyStates, setCopyStates] = reactExports.useState({});
  const copyIOC = reactExports.useCallback(async (ioc, type) => {
    try {
      await navigator.clipboard.writeText(ioc);
      setCopyStates(prev => ({
        ...prev,
        [`${type}-${ioc}`]: true
      }));
      setTimeout(() => {
        setCopyStates(prev => ({
          ...prev,
          [`${type}-${ioc}`]: false
        }));
      }, 2000);
    } catch {
      // console.error('Copy failed:', e);
    }
  }, []);
  const renderIOCList = (items, type) => {
    if (!items || items.length === 0) return null;
    return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
      className: "ioc-section-spacing",
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "ioc-type-header",
        children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
          className: "text-sm font-semibold",
          children: [type.toUpperCase(), "S (", items.length, ")"]
        }, void 0, true, {
          fileName: _jsxFileName$5,
          lineNumber: 34,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName$5,
        lineNumber: 33,
        columnNumber: 9
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "space-y-2",
        children: items.map((item, index) => {
          // Defang IOCs for display (but keep original for copying)
          const defangedItem = IOCCore.defang(item);
          return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
            className: "ioc-value-item",
            children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
              className: "flex items-center gap-1 p-0",
              children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("code", {
                className: "flex-1 text-xs font-mono min-w-0 break-all",
                children: defangedItem
              }, void 0, false, {
                fileName: _jsxFileName$5,
                lineNumber: 46,
                columnNumber: 19
              }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tooltip_default, {
                content: copyStates[`${type}-${item}`] ? 'Copied to clipboard!' : `Copy ${type} to clipboard for further analysis`,
                placement: "top",
                distance: 8,
                hoist: true,
                children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(button_default, {
                  size: "small",
                  variant: "text",
                  onClick: () => copyIOC(item, type),
                  className: "compact-copy-btn ioc-copy-btn flex-shrink-0",
                  children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                    name: copyStates[`${type}-${item}`] ? 'check-circle' : 'clipboard',
                    className: copyStates[`${type}-${item}`] ? 'copy-success' : 'secondary-text'
                  }, void 0, false, {
                    fileName: _jsxFileName$5,
                    lineNumber: 63,
                    columnNumber: 23
                  }, undefined)
                }, void 0, false, {
                  fileName: _jsxFileName$5,
                  lineNumber: 57,
                  columnNumber: 21
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName$5,
                lineNumber: 47,
                columnNumber: 19
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName$5,
              lineNumber: 45,
              columnNumber: 17
            }, undefined)
          }, index, false, {
            fileName: _jsxFileName$5,
            lineNumber: 44,
            columnNumber: 15
          }, undefined);
        })
      }, void 0, false, {
        fileName: _jsxFileName$5,
        lineNumber: 38,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$5,
      lineNumber: 32,
      columnNumber: 7
    }, undefined);
  };
  return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
    children: [renderIOCList(iocs.hashes, 'hash'), renderIOCList(iocs.ips, 'ip'), renderIOCList(iocs.domains, 'domain'), renderIOCList(iocs.urls, 'url'), renderIOCList(iocs.file_paths, 'path')]
  }, void 0, true, {
    fileName: _jsxFileName$5,
    lineNumber: 81,
    columnNumber: 5
  }, undefined);
};

// Unified text formatting utilities for improving readability

/**
 * Core paragraph breaking engine - unified logic for all formatting types
 */
const createParagraphBreaker = options => {
  return text => {
    if (!text || typeof text !== 'string') {
      return [];
    }

    // Normalize whitespace for consistent processing
    const cleanText = text.replace(/\s+/g, ' ').trim();

    // Split on sentence boundaries (. ! ?) followed by space and capital letter
    const sentences = cleanText.split(/(?<=[.!?])\s+(?=[A-Z])/).map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);

    // Short text handling
    if (sentences.length <= options.shortTextThreshold) {
      return [cleanText];
    }
    const paragraphs = [];
    let currentParagraph = [];
    sentences.forEach((sentence, index) => {
      currentParagraph.push(sentence);

      // Determine if we should break paragraph
      const atMaxLength = currentParagraph.length >= options.maxSentencesPerParagraph;
      const isLastSentence = index === sentences.length - 1;
      const hasKeywordBreak = options.aggressiveBreaking && currentParagraph.length > 0 && index < sentences.length - 1 && options.breakKeywords.some(keyword => sentence.includes(keyword));
      const shouldBreak = atMaxLength || isLastSentence || hasKeywordBreak;
      if (shouldBreak) {
        paragraphs.push(currentParagraph.join(' '));
        currentParagraph = [];
      }
    });
    return paragraphs.filter(p => p.length > 0);
  };
};

// Predefined formatter configurations
const formatters = {
  default: createParagraphBreaker({
    maxSentencesPerParagraph: 3,
    shortTextThreshold: 2,
    breakKeywords: ['Additionally', 'Furthermore', 'However', 'This technique', 'Attackers'],
    aggressiveBreaking: true
  }),
  mitre: createParagraphBreaker({
    maxSentencesPerParagraph: 2,
    shortTextThreshold: 1,
    breakKeywords: [
    // Technical transition indicators
    'This technique', 'Attackers', 'Adversaries', 'The malware', 'Additionally', 'Furthermore', 'However', 'For example', 'In some cases', 'Common methods', 'Detection methods', 'Mitigation strategies',
    // Technical process indicators  
    'executed', 'implemented', 'utilized', 'performed',
    // Platform/system indicators
    'Windows', 'Linux', 'macOS', 'registry', 'file system', 'network', 'process'],
    aggressiveBreaking: true
  }),
  summary: createParagraphBreaker({
    maxSentencesPerParagraph: 3,
    shortTextThreshold: 3,
    breakKeywords: ['Additionally', 'However', 'Furthermore'],
    aggressiveBreaking: true
  }),
  technical: createParagraphBreaker({
    maxSentencesPerParagraph: 5,
    shortTextThreshold: 4,
    breakKeywords: ['Additionally', 'Furthermore', 'However', 'The analysis', 'This indicates', 'Based on'],
    aggressiveBreaking: true
  }),
  reasoning: createParagraphBreaker({
    maxSentencesPerParagraph: 2,
    shortTextThreshold: 1,
    breakKeywords: [
    // Core analytical transition phrases
    'The analysis', 'This assessment', 'Based on the', 'The evidence', 'However', 'Additionally', 'Furthermore', 'Therefore', 'In conclusion', 'This indicates', 'The reasoning', 'Charlotte', 'data sources', 'analytical methods', 'decision factors', 'confidence level', 'limitations', 'assumptions',
    // Technical assessment indicators
    'probability', 'likelihood', 'assessment shows', 'evaluation indicates', 'analysis reveals', 'findings suggest', 'results demonstrate', 'investigation', 'methodology', 'approach', 'consideration', 'factor', 'criteria', 'metric', 'measurement', 'validation', 'verification'],
    aggressiveBreaking: true
  })
};

// Public API - simplified function exports
const formatTextWithParagraphs = formatters.default;
const formatMitreDescription = formatters.mitre;

var _jsxFileName$4 = "/Users/mraible/dev/foundry-sample-charlotte-toolkit/ui/extensions/charlotte-toolkit-ui/src/components/security/MitreDisplay.tsx";
const MITREDisplay = ({
  techniques
}) => {
  const [copyStates, setCopyStates] = reactExports.useState({});
  const copyMitreUrl = reactExports.useCallback(async (url, techniqueId) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyStates(prev => ({
        ...prev,
        [techniqueId]: true
      }));
      setTimeout(() => {
        setCopyStates(prev => ({
          ...prev,
          [techniqueId]: false
        }));
      }, 2000);
    } catch {
      // Silent failure like IOC pattern
    }
  }, []);
  if (!techniques || techniques.length === 0) return null;

  // Extract tactic from technique if available
  const getTacticFromTechnique = technique => {
    // Try to extract tactic from description or technique_name
    const description = technique.description.toLowerCase() || '';
    const name = technique.technique_name.toLowerCase() || '';

    // Common MITRE tactics mapping
    const tactics = {
      'initial-access': ['initial access', 'exploit', 'phishing', 'drive-by'],
      'execution': ['execution', 'command', 'script', 'powershell', 'rundll32'],
      'persistence': ['persistence', 'registry', 'startup', 'scheduled task'],
      'privilege-escalation': ['privilege escalation', 'escalate', 'token', 'uac bypass'],
      'defense-evasion': ['defense evasion', 'obfuscat', 'masquerade', 'disable', 'hide'],
      'credential-access': ['credential', 'password', 'hash', 'keylog', 'dump'],
      'discovery': ['discovery', 'enumerate', 'network', 'system information'],
      'lateral-movement': ['lateral movement', 'remote', 'psexec', 'wmi'],
      'collection': ['collection', 'data', 'clipboard', 'screen capture'],
      'command-control': ['command and control', 'c2', 'communication', 'channel'],
      'exfiltration': ['exfiltration', 'steal', 'transfer', 'upload'],
      'impact': ['impact', 'destroy', 'encrypt', 'ransom', 'wipe']
    };
    const combinedText = `${description} ${name}`;
    for (const [tactic, keywords] of Object.entries(tactics)) {
      if (keywords.some(keyword => combinedText.includes(keyword))) {
        return tactic;
      }
    }
    return null;
  };

  // Get badge variant based on tactic
  const getTacticBadgeVariant = tactic => {
    if (!tactic) return 'neutral';
    switch (tactic) {
      case 'initial-access':
      case 'execution':
        return 'warning';
      case 'persistence':
      case 'privilege-escalation':
        return 'danger';
      case 'defense-evasion':
      case 'credential-access':
        return 'primary';
      case 'discovery':
      case 'lateral-movement':
        return 'success';
      default:
        return 'neutral';
    }
  };

  // Format tactic name for display
  const formatTacticName = tactic => {
    if (!tactic) return '';
    return tactic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
    className: "mitre-techniques-container space-y-3",
    children: techniques.map((technique, index) => {
      const formattedDescriptions = formatMitreDescription(technique.description);
      const tactic = getTacticFromTechnique(technique);
      const tacticVariant = getTacticBadgeVariant(tactic);
      const tacticName = formatTacticName(tactic);
      return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "mitre-technique-card enhanced-card",
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
          className: "technique-header",
          children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
            className: "technique-title-section",
            children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
              className: "flex items-center gap-1 mb-1",
              children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                name: "shield-check",
                className: "technique-icon flex-shrink-0"
              }, void 0, false, {
                fileName: _jsxFileName$4,
                lineNumber: 110,
                columnNumber: 19
              }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
                className: "technique-id",
                children: technique.technique_id
              }, void 0, false, {
                fileName: _jsxFileName$4,
                lineNumber: 111,
                columnNumber: 19
              }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tooltip_default, {
                content: copyStates[technique.technique_id] ? 'Copied to clipboard!' : 'Copy MITRE URL to clipboard',
                placement: "top",
                distance: 8,
                hoist: true,
                children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(button_default, {
                  size: "small",
                  variant: "text",
                  onClick: () => copyMitreUrl(buildMitreUrl(technique.technique_id), technique.technique_id),
                  className: "compact-copy-btn ioc-copy-btn flex-shrink-0",
                  children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                    name: copyStates[technique.technique_id] ? 'check-circle' : 'clipboard',
                    className: copyStates[technique.technique_id] ? 'copy-success' : 'secondary-text'
                  }, void 0, false, {
                    fileName: _jsxFileName$4,
                    lineNumber: 130,
                    columnNumber: 23
                  }, undefined)
                }, void 0, false, {
                  fileName: _jsxFileName$4,
                  lineNumber: 124,
                  columnNumber: 21
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName$4,
                lineNumber: 114,
                columnNumber: 19
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName$4,
              lineNumber: 109,
              columnNumber: 17
            }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
              className: "technique-name-line mb-1",
              children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
                className: "technique-name",
                children: technique.technique_name
              }, void 0, false, {
                fileName: _jsxFileName$4,
                lineNumber: 140,
                columnNumber: 19
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName$4,
              lineNumber: 139,
              columnNumber: 17
            }, undefined), tacticName && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
              className: "tactic-badge-container mb-3",
              children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(badge_default, {
                variant: tacticVariant,
                className: "text-xs w-fit tactic-badge",
                children: tacticName
              }, void 0, false, {
                fileName: _jsxFileName$4,
                lineNumber: 146,
                columnNumber: 21
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName$4,
              lineNumber: 145,
              columnNumber: 19
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName$4,
            lineNumber: 107,
            columnNumber: 15
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName$4,
          lineNumber: 106,
          columnNumber: 13
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
          className: "technique-description",
          children: formattedDescriptions.length > 0 ? formattedDescriptions.map((paragraph, paragraphIndex) => /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
            className: "text-sm sm:text-base secondary-text leading-relaxed break-words technique-paragraph",
            children: paragraph
          }, paragraphIndex, false, {
            fileName: _jsxFileName$4,
            lineNumber: 161,
            columnNumber: 19
          }, undefined)) : /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
            className: "text-sm sm:text-base secondary-text leading-relaxed break-words technique-paragraph",
            children: technique.description
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 169,
            columnNumber: 17
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName$4,
          lineNumber: 158,
          columnNumber: 13
        }, undefined)]
      }, index, true, {
        fileName: _jsxFileName$4,
        lineNumber: 104,
        columnNumber: 11
      }, undefined);
    })
  }, void 0, false, {
    fileName: _jsxFileName$4,
    lineNumber: 96,
    columnNumber: 5
  }, undefined);
};

// Universal formatting utilities for ALL security output sections
// Applies consistent paragraph breaks and readability improvements


/**
 * Universal formatter for any text content in security analysis
 * Uses unified paragraph breaking system with optimized configurations
 */
const formatSecurityText = (text, type = 'technical') => {
  if (!text || typeof text !== 'string') {
    return [];
  }
  switch (type) {
    case 'mitre':
      return formatMitreDescription(text);
    case 'summary':
      return formatters.summary(text);
    case 'technical':
      return formatters.technical(text);
    case 'reasoning':
      return formatters.reasoning(text);
    case 'recommendation':
      return formatTextWithParagraphs(text);
    default:
      return formatTextWithParagraphs(text);
  }
};

/**
 * Check if text needs formatting (has multiple sentences)
 */
const needsFormatting = text => {
  if (!text || typeof text !== 'string') return false;
  const sentenceCount = text.split(/[.!?]/).filter(s => s.trim().length > 0).length;
  return sentenceCount > 2;
};

// src/utils/badgeUtils.ts

/**
 * Shared badge color utilities to eliminate duplication across components
 */

const getThreatLevelColor = level => {
  switch (level.toLowerCase()) {
    case 'critical':
      return 'danger';
    case 'high':
      return 'warning';
    case 'medium':
      return 'neutral';
    case 'low':
      return 'success';
    default:
      return 'neutral';
  }
};
const getConfidenceLevelColor = level => {
  switch (level.toLowerCase()) {
    case 'high':
      return 'success';
    case 'medium':
      return 'warning';
    case 'low':
      return 'neutral';
    default:
      return 'neutral';
  }
};

var _jsxFileName$3 = "/Users/mraible/dev/foundry-sample-charlotte-toolkit/ui/extensions/charlotte-toolkit-ui/src/components/security/StructuredSecurityAnalysis.tsx";
const StructuredSecurityAnalysis = ({
  data,
  renderers
}) => {
  // Get priority actions from simplified schema
  const priorityActions = data.priority_actions;
  return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
    className: "structured-analysis space-y-2 sm:space-y-4",
    children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(card_default, {
      className: "executive-summary-card",
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("h3", {
        className: "flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3",
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
          name: "clipboard-data",
          className: "flex-shrink-0"
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 33,
          columnNumber: 11
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
          className: "break-words",
          children: "Executive Summary"
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 34,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName$3,
        lineNumber: 32,
        columnNumber: 9
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-2 mb-3",
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(badge_default, {
          variant: getThreatLevelColor(data.threat_level),
          className: "text-xs sm:text-sm w-fit",
          children: [data.threat_level, " Threat"]
        }, void 0, true, {
          fileName: _jsxFileName$3,
          lineNumber: 37,
          columnNumber: 11
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(badge_default, {
          variant: getConfidenceLevelColor(data.confidence_level),
          className: "text-xs sm:text-sm w-fit",
          children: [data.confidence_level, " Confidence"]
        }, void 0, true, {
          fileName: _jsxFileName$3,
          lineNumber: 43,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName$3,
        lineNumber: 36,
        columnNumber: 9
      }, undefined), needsFormatting(data.executive_summary) ? formatSecurityText(data.executive_summary, 'summary').map((paragraph, index) => /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
        className: "text-sm sm:text-base leading-relaxed break-words formatted-paragraph",
        children: paragraph
      }, index, false, {
        fileName: _jsxFileName$3,
        lineNumber: 52,
        columnNumber: 13
      }, undefined)) : /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
        className: "text-sm sm:text-base leading-relaxed break-words",
        children: data.executive_summary
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 57,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$3,
      lineNumber: 31,
      columnNumber: 7
    }, undefined), data.iocs && ((data.iocs.hashes?.length ?? 0) > 0 || (data.iocs.ips?.length ?? 0) > 0 || (data.iocs.domains?.length ?? 0) > 0 || (data.iocs.urls?.length ?? 0) > 0 || (data.iocs.file_paths?.length ?? 0) > 0) && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(card_default, {
      className: "iocs-card",
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("h3", {
        className: "flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3",
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
          name: "shield-exclamation",
          className: "flex-shrink-0"
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 70,
          columnNumber: 15
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
          className: "break-words",
          children: "IOC Details"
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 71,
          columnNumber: 15
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName$3,
        lineNumber: 69,
        columnNumber: 13
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(IOCDisplay, {
        iocs: data.iocs
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 73,
        columnNumber: 13
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$3,
      lineNumber: 68,
      columnNumber: 11
    }, undefined), data.mitre_techniques && data.mitre_techniques.length > 0 && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(card_default, {
      className: "mitre-details",
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("h3", {
        className: "flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3",
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
          name: "diagram-3",
          className: "flex-shrink-0"
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 81,
          columnNumber: 13
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
          className: "break-words",
          children: ["MITRE ATT&CK Techniques (", data.mitre_techniques.length, ")"]
        }, void 0, true, {
          fileName: _jsxFileName$3,
          lineNumber: 82,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName$3,
        lineNumber: 80,
        columnNumber: 11
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(MITREDisplay, {
        techniques: data.mitre_techniques
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 86,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$3,
      lineNumber: 79,
      columnNumber: 9
    }, undefined), data.technical_details && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(card_default, {
      className: "technical-details",
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("h3", {
        className: "flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3",
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
          name: "gear",
          className: "flex-shrink-0"
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 94,
          columnNumber: 13
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
          className: "break-words",
          children: "Technical Analysis"
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 95,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName$3,
        lineNumber: 93,
        columnNumber: 11
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "prose prose-sm max-w-none",
        children: needsFormatting(data.technical_details) ? /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
          className: "technical-details-formatted",
          children: formatSecurityText(data.technical_details, 'technical').map((paragraph, index) => /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
            className: "technical-paragraph",
            children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(Markdown, {
              components: renderers,
              children: paragraph
            }, void 0, false, {
              fileName: _jsxFileName$3,
              lineNumber: 102,
              columnNumber: 21
            }, undefined)
          }, index, false, {
            fileName: _jsxFileName$3,
            lineNumber: 101,
            columnNumber: 19
          }, undefined))
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 99,
          columnNumber: 15
        }, undefined) : /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(Markdown, {
          components: renderers,
          children: data.technical_details
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 107,
          columnNumber: 15
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 97,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$3,
      lineNumber: 92,
      columnNumber: 9
    }, undefined), priorityActions.length > 0 && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(card_default, {
      className: "recommendations-details",
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("h3", {
        className: "flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3",
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
          name: "lightbulb",
          className: "flex-shrink-0"
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 117,
          columnNumber: 13
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
          className: "break-words",
          children: ["Priority Actions (", priorityActions.length, ")"]
        }, void 0, true, {
          fileName: _jsxFileName$3,
          lineNumber: 118,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName$3,
        lineNumber: 116,
        columnNumber: 11
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("ul", {
        className: "compact-bullet-list",
        children: priorityActions.map((action, index) => /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("li", {
          className: "recommendation-item",
          children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            name: "dot",
            className: "secondary-text mt-0.5 flex-shrink-0"
          }, void 0, false, {
            fileName: _jsxFileName$3,
            lineNumber: 125,
            columnNumber: 17
          }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
            className: "text-sm sm:text-base break-words",
            children: action
          }, void 0, false, {
            fileName: _jsxFileName$3,
            lineNumber: 126,
            columnNumber: 17
          }, undefined)]
        }, index, true, {
          fileName: _jsxFileName$3,
          lineNumber: 124,
          columnNumber: 15
        }, undefined))
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 122,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$3,
      lineNumber: 115,
      columnNumber: 9
    }, undefined), data.reasoning_assessment && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(card_default, {
      className: "analysis-methodology-card",
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("h3", {
        className: "flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold mb-2 sm:mb-3",
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
          name: "lightbulb",
          className: "flex-shrink-0"
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 137,
          columnNumber: 13
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
          className: "break-words",
          children: "Analysis Methodology"
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 138,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName$3,
        lineNumber: 136,
        columnNumber: 11
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "reasoning-content",
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("strong", {
          className: "text-sm font-semibold mb-2 block",
          children: "Charlotte's Analytical Methodology:"
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 141,
          columnNumber: 13
        }, undefined), needsFormatting(data.reasoning_assessment) ? formatSecurityText(data.reasoning_assessment, 'reasoning').map((paragraph, index) => /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
          className: "text-sm sm:text-base leading-relaxed break-words formatted-paragraph",
          children: paragraph
        }, index, false, {
          fileName: _jsxFileName$3,
          lineNumber: 146,
          columnNumber: 17
        }, undefined)) : /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
          className: "text-sm sm:text-base leading-relaxed break-words",
          children: data.reasoning_assessment
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 151,
          columnNumber: 15
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName$3,
        lineNumber: 140,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$3,
      lineNumber: 135,
      columnNumber: 9
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName$3,
    lineNumber: 29,
    columnNumber: 5
  }, undefined);
};

var _jsxFileName$2 = "/Users/mraible/dev/foundry-sample-charlotte-toolkit/ui/extensions/charlotte-toolkit-ui/src/components/ResponseDisplay.tsx";
const preprocessMarkdown = text => {
  let processed = text;

  // Phase 1: Fix inline IPs - convert "IPs: ip1    ip2    ip3" to separate lines
  processed = processed.replace(/^(IPs?:)\s*([0-9.]+(?:\s+[0-9.]+)+)\s*$/gim, (_, label, ips) => {
    const ipList = ips.trim().split(/\s+/).map(ip => `- \`${ip}\``).join('\n');
    return `${label}\n${ipList}`;
  });

  // Phase 2: Fix nested list structure - convert mixed bullets to consistent format
  processed = processed.replace(/^(\s*)\d+\.\s*(.+)\n(\s*[-*•]\s*.+)/gim, (match, indent, mainItem, bulletItems) => {
    // Convert mixed numbered/bullet lists to consistent structure
    const formattedBullets = bulletItems.replace(/^(\s*)[-*•]\s*/gm, '   • ');
    return `${indent}• **${mainItem.trim()}**\n${formattedBullets}`;
  });

  // Phase 3: Break up dense paragraphs (key fix for reasoning assessment)
  processed = processed.replace(/([.!?])\s+([A-Z][^.!?]*[.!?])\s+([A-Z][^.!?]*[.!?])\s+([A-Z][^.!?]*[.!?])/g, '$1\n\n$2 $3\n\n$4');

  // Phase 4: Improve paragraph breaks for analytical content
  processed = processed.replace(/\b(However|Additionally|Furthermore|Therefore|Based on|The analysis|This assessment),/g, '\n\n$1,');

  // Phase 5: Ensure technical term consistency
  processed = processed.replace(/^(\s*[-*•]\s*)([a-zA-Z0-9_.-]+\.exe)(?!`)(\s*)$/gim, '$1`$2`$3');
  processed = processed.replace(/^(\s*[-*•]\s*)([a-fA-F0-9]{32,64})(?!`)(\s*)$/gim, '$1`$2`$3');
  processed = processed.replace(/^(\s*[-*•]\s*)(HK[A-Z_\\]+[^`\n]*)(?!`)(\s*)$/gim, '$1`$2`$3');

  // Phase 6: Enhanced recommendation section detection
  processed = processed.replace(/^(#{1,6}\s*(?:Recommended Actions?|Security Recommendations?|Recommendations?)[\s\S]*?)^(?=#{1,6}|\n*$)/gim, match => `<div class="markdown-recommendations">\n${match}\n</div>`);

  // Phase 7: Clean up excessive whitespace while preserving intentional breaks
  processed = processed.replace(/\n{4,}/g, '\n\n\n');
  processed = processed.replace(/\s+$/gm, '');
  return processed;
};
const ResponseDisplay = /*#__PURE__*/React.memo(({
  loading,
  responseText,
  errorMessage
}) => {
  // Create markdown renderers
  const renderers = createMarkdownRenderers();

  // Progressive loading messages state
  const [loadingMessage, setLoadingMessage] = React.useState('Gathering information...');

  // Progressive loading message effect
  React.useEffect(() => {
    if (loading) {
      setLoadingMessage('Gathering information...');
      const timer1 = setTimeout(() => {
        setLoadingMessage('Processing data...');
      }, 8000);
      const timer2 = setTimeout(() => {
        setLoadingMessage('Compiling results...');
      }, 16000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
    // Always return a cleanup function to satisfy TypeScript
    return () => {};
  }, [loading]);

  // Loading state
  if (loading) {
    return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
      className: "loading-container",
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "loading-backdrop"
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 102,
        columnNumber: 11
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "loading-icon-container",
        children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(spinner_default, {
          style: {
            '--track-width': '3px',
            '--track-color': 'var(--cs-border-color-light, #e2e8f0)',
            '--indicator-color': 'var(--cs-color-primary, #0ea5e9)',
            '--speed': '2.5s',
            fontSize: 'var(--font-size-4xl)',
            filter: 'drop-shadow(0 0 8px rgba(14, 165, 233, 0.3))'
          }
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 104,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 103,
        columnNumber: 11
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
        className: "loading-text-pulse",
        children: loadingMessage
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 117,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$2,
      lineNumber: 101,
      columnNumber: 9
    }, undefined);
  }

  // Error state
  if (errorMessage) {
    return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
      className: "flex flex-col items-center justify-center min-h-96 gap-3",
      style: {
        color: `var(--cs-status-error)`
      },
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
        name: "exclamation-triangle"
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 129,
        columnNumber: 11
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
        className: "text-base text-center",
        children: errorMessage
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 130,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$2,
      lineNumber: 125,
      columnNumber: 9
    }, undefined);
  }

  // Empty state
  if (!responseText) {
    return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
      className: "flex flex-col items-center justify-center min-h-96 gap-3",
      style: {
        color: `var(--cs-text-secondary)`
      },
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
        name: "chat-square-text"
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 142,
        columnNumber: 11
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
        className: "text-base",
        children: "Submit a query to see analysis results"
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 143,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$2,
      lineNumber: 138,
      columnNumber: 9
    }, undefined);
  }

  // Response content - render with height-constrained container and scroll indicators
  const structuredData = parseStructuredResponse(responseText);
  if (structuredData) {
    // Render structured security analysis with scroll container
    // Charlotte AI response parsed as structured JSON
    return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
      className: "response-scroll-container",
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "response-scroll-content",
        children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(StructuredSecurityAnalysis, {
          data: structuredData,
          renderers: renderers
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 157,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 156,
        columnNumber: 11
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "response-scroll-fade"
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 159,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$2,
      lineNumber: 155,
      columnNumber: 9
    }, undefined);
  } else {
    // JSON parsing failed - show markdown with warning in scroll container
    // Charlotte AI response could not be parsed as JSON, falling back to markdown
    // Raw response available for debugging

    return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
      className: "response-scroll-container",
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "response-scroll-content",
        children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
            className: "p-3 rounded-lg",
            style: {
              backgroundColor: `var(--cs-background-light)`,
              border: `1px solid var(--cs-border-color-medium)`
            },
            children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
              className: "text-sm font-medium",
              style: {
                color: `var(--cs-status-warning)`
              },
              children: "\u26A0\uFE0F Response Format Issue"
            }, void 0, false, {
              fileName: _jsxFileName$2,
              lineNumber: 178,
              columnNumber: 17
            }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
              className: "text-sm mt-1",
              style: {
                color: `var(--cs-text-secondary)`
              },
              children: "Charlotte AI did not return the expected JSON format. Displaying as markdown instead."
            }, void 0, false, {
              fileName: _jsxFileName$2,
              lineNumber: 181,
              columnNumber: 17
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName$2,
            lineNumber: 171,
            columnNumber: 15
          }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(Markdown, {
            components: renderers,
            children: preprocessMarkdown(responseText)
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 186,
            columnNumber: 15
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName$2,
          lineNumber: 170,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 169,
        columnNumber: 11
      }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "response-scroll-fade"
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 191,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName$2,
      lineNumber: 168,
      columnNumber: 9
    }, undefined);
  }
});
ResponseDisplay.displayName = 'ResponseDisplay';

var _jsxFileName$1 = "/Users/mraible/dev/foundry-sample-charlotte-toolkit/ui/extensions/charlotte-toolkit-ui/src/components/Home.tsx";
const Home = /*#__PURE__*/React.memo(({
  falcon
}) => {
  const [state, setState] = reactExports.useState({
    query: '',
    modelName: DEFAULT_MODEL,
    temperature: DEFAULT_TEMPERATURE,
    stopWords: DEFAULT_STOP_WORDS,
    jsonSchema: DEFAULT_JSON_SCHEMA,
    dataToInclude: DEFAULT_DATA_TO_INCLUDE,
    responseText: '',
    status: '',
    loading: false,
    errorMessage: '',
    hasSubmittedQuery: false,
    selectedContextEntity: null,
    showJsonTab: false,
    quotaAcknowledged: false,
    executionStartTime: null,
    executionEndTime: null
  });

  // Use custom hooks for modular functionality
  const {
    availableContextOptions
  } = useContextProcessor({
    falconData: falcon?.data
  });

  // Calculate context counts for the JSON manager
  const contextCounts = {
    total: availableContextOptions.length,
    domains: availableContextOptions.filter(opt => opt.type === 'domain').length,
    files: availableContextOptions.filter(opt => opt.type === 'file').length,
    ips: availableContextOptions.filter(opt => opt.type === 'ip').length,
    fqdns: availableContextOptions.filter(opt => opt.type === 'domain' && opt.subType === 'fqdn').length
  };
  const {
    jsonContextData,
    initializeRequestData,
    updateRequestData,
    updateResponseData,
    copyFalconContext,
    copyRequestData,
    // Copy states for visual feedback
    contextCopyState,
    requestCopyState
  } = useJsonDataManager({
    falconData: falcon?.data,
    availableContextOptions,
    contextCounts
  });

  // Use tab manager hook
  const {
    tabGroupRef: tabGroupRefFromHook,
    handleTabChange,
    setActiveTab,
    getResponseTabIndicator
  } = useTabManager({
    hasSubmittedQuery: state.hasSubmittedQuery,
    loading: state.loading,
    errorMessage: state.errorMessage,
    responseText: state.responseText
  });

  // Use copy manager hook for Response tab copy functionality
  const {
    copyState,
    handleCopyFormat,
    copyOptions
  } = useCopyManager({
    responseText: state.responseText,
    jsonContextData
  });

  // Additional copy hook for Raw Response in JSON tab
  const {
    copyState: rawResponseCopyState,
    copyToClipboard: copyRawResponse
  } = useCopyToClipboard();
  const updateState = reactExports.useCallback(updates => {
    setState(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  // Use the tab manager's ref instead of our local ref
  // The useTabManager hook handles tab switching internally

  // Update request data in real-time whenever query parameters change
  reactExports.useEffect(() => {
    if (jsonContextData && (state.query || state.modelName || state.temperature || state.jsonSchema || state.selectedContextEntity)) {
      const requestParams = {
        query: state.query,
        model: getModelLabel(state.modelName),
        temperature: state.temperature,
        stopWords: state.stopWords,
        jsonSchema: state.jsonSchema,
        dataToInclude: state.dataToInclude,
        selectedContext: state.selectedContextEntity ?? ''
      };
      updateRequestData(requestParams);
    }
  }, [state.query, state.modelName, state.temperature, state.stopWords, state.jsonSchema, state.dataToInclude, state.selectedContextEntity, jsonContextData, updateRequestData]);
  const handleSubmit = reactExports.useCallback(async () => {
    // Validate input
    const validation = validateQuery(state.query);
    if (!validation.isValid) {
      setState(prev => ({
        ...prev,
        errorMessage: validation.error ?? 'Invalid query'
      }));
      return;
    }

    // Enable response tab and switch to it
    const executionStartTime = new Date().toISOString();

    // Initialize JSON context data with request parameters
    const requestParams = {
      query: state.query,
      model: getModelLabel(state.modelName),
      temperature: state.temperature,
      stopWords: state.stopWords,
      jsonSchema: state.jsonSchema,
      dataToInclude: state.dataToInclude,
      selectedContext: state.selectedContextEntity ?? ''
    };
    initializeRequestData(requestParams);
    setState(prev => ({
      ...prev,
      hasSubmittedQuery: true,
      loading: true,
      status: 'Gathering details...',
      responseText: '',
      errorMessage: ''
    }));

    // Automatically switch to response tab
    setActiveTab('response');
    try {
      // Build workflow execution parameters
      const workflowParameters = {
        query: state.query,
        model: getModelLabel(state.modelName),
        // Convert internal value to display label for workflow
        temperature: state.temperature,
        stopWords: state.stopWords,
        jsonSchema: state.jsonSchema,
        dataToInclude: state.dataToInclude,
        selectedContext: state.selectedContextEntity ?? ''};

      // Execute workflow using the workflowExecutor
      const result = await executeWorkflowWithCache(falcon, workflowParameters);
      const executionEndTime = new Date().toISOString();

      // Update JSON context data with response
      updateResponseData({
        executionEndTime,
        executionStartTime,
        success: result.success,
        fromCache: result.fromCache,
        content: result.content,
        error: result.error,
        workflowResult: result
      });
      if (result.success && result.content) {
        setState(prev => ({
          ...prev,
          responseText: result.content ?? '',
          status: result.fromCache ? 'Done (cached)' : 'Done',
          loading: false,
          errorMessage: '',
          quotaAcknowledged: false,
          // Reset checkbox after successful submission
          executionStartTime,
          executionEndTime
        }));
      } else {
        setState(prev => ({
          ...prev,
          responseText: '',
          errorMessage: result.error ?? 'Unknown error occurred',
          status: 'Error',
          loading: false,
          executionStartTime,
          executionEndTime
        }));
      }
    } catch (e) {
      // Workflow error occurred
      const errorMessage = formatErrorMessage(e);
      const executionEndTime = new Date().toISOString();

      // Update JSON context data with error
      updateResponseData({
        executionEndTime,
        executionStartTime,
        success: false,
        error: errorMessage,
        workflowResult: {
          exception: {
            message: e instanceof Error ? e.message : String(e),
            stack: e instanceof Error ? e.stack : null
          }
        }
      });
      setState(prev => ({
        ...prev,
        responseText: '',
        errorMessage: `Error: ${errorMessage}`,
        status: 'Error',
        loading: false,
        executionStartTime,
        executionEndTime
      }));
    }
  }, [state.query, state.modelName, state.temperature, state.stopWords, state.jsonSchema, state.dataToInclude, state.selectedContextEntity, falcon, initializeRequestData, updateResponseData, setActiveTab]);
  return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
    className: "w-full py-2",
    children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(card_default, {
      className: "full-width-card",
      children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tab_group_default, {
        ref: tabGroupRefFromHook,
        placement: "top",
        onSlTabShow: handleTabChange,
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tab_default, {
          slot: "nav",
          panel: "request",
          children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            name: "pencil",
            className: "mr-2"
          }, void 0, false, {
            fileName: _jsxFileName$1,
            lineNumber: 316,
            columnNumber: 13
          }, undefined), "Request"]
        }, void 0, true, {
          fileName: _jsxFileName$1,
          lineNumber: 315,
          columnNumber: 11
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tab_default, {
          slot: "nav",
          panel: "response",
          disabled: !state.hasSubmittedQuery,
          className: !state.hasSubmittedQuery ? 'opacity-50 cursor-not-allowed' : '',
          children: [getResponseTabIndicator(), "Response"]
        }, void 0, true, {
          fileName: _jsxFileName$1,
          lineNumber: 319,
          columnNumber: 11
        }, undefined), state.showJsonTab ? /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tab_default, {
          slot: "nav",
          panel: "json",
          children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
            name: "code-square",
            className: "mr-2"
          }, void 0, false, {
            fileName: _jsxFileName$1,
            lineNumber: 331,
            columnNumber: 15
          }, undefined), "JSON"]
        }, void 0, true, {
          fileName: _jsxFileName$1,
          lineNumber: 330,
          columnNumber: 13
        }, undefined) : null, /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tab_panel_default, {
          name: "request",
          children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(QueryForm, {
            query: state.query,
            setQuery: query => updateState({
              query
            }),
            modelName: state.modelName,
            setModelName: modelName => updateState({
              modelName
            }),
            temperature: state.temperature,
            setTemperature: temperature => updateState({
              temperature
            }),
            stopWords: state.stopWords,
            setStopWords: stopWords => updateState({
              stopWords
            }),
            jsonSchema: state.jsonSchema,
            setJsonSchema: jsonSchema => updateState({
              jsonSchema
            }),
            dataToInclude: state.dataToInclude,
            setDataToInclude: dataToInclude => updateState({
              dataToInclude
            }),
            loading: state.loading,
            handleSubmit: handleSubmit,
            selectedContextEntity: state.selectedContextEntity,
            setSelectedContextEntity: selectedContextEntity => updateState({
              selectedContextEntity
            }),
            availableContextOptions: availableContextOptions,
            showJsonTab: state.showJsonTab,
            setShowJsonTab: showJsonTab => updateState({
              showJsonTab
            }),
            quotaAcknowledged: state.quotaAcknowledged,
            setQuotaAcknowledged: quotaAcknowledged => updateState({
              quotaAcknowledged
            })
          }, void 0, false, {
            fileName: _jsxFileName$1,
            lineNumber: 337,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 336,
          columnNumber: 11
        }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tab_panel_default, {
          name: "response",
          children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
            className: "flex flex-col",
            children: [state.responseText && !state.loading && !state.errorMessage && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
              className: "flex justify-end mb-2",
              children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(dropdown_default, {
                children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(button_default, {
                  slot: "trigger",
                  size: "small",
                  variant: "text",
                  caret: true,
                  className: `compact-copy-btn ${copyState === 'check-circle' ? 'copy-success transition-colors duration-200' : 'text-body-and-labels'}`,
                  children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                    name: copyState
                  }, void 0, false, {
                    fileName: _jsxFileName$1,
                    lineNumber: 383,
                    columnNumber: 23
                  }, undefined)
                }, void 0, false, {
                  fileName: _jsxFileName$1,
                  lineNumber: 372,
                  columnNumber: 21
                }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(menu_default, {
                  children: copyOptions.map(option => /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(menu_item_default, {
                    onClick: () => handleCopyFormat(option.format),
                    children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                      slot: "prefix",
                      name: option.icon
                    }, void 0, false, {
                      fileName: _jsxFileName$1,
                      lineNumber: 391,
                      columnNumber: 27
                    }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
                      className: "ml-2",
                      children: option.label
                    }, void 0, false, {
                      fileName: _jsxFileName$1,
                      lineNumber: 392,
                      columnNumber: 27
                    }, undefined)]
                  }, option.format, true, {
                    fileName: _jsxFileName$1,
                    lineNumber: 387,
                    columnNumber: 25
                  }, undefined))
                }, void 0, false, {
                  fileName: _jsxFileName$1,
                  lineNumber: 385,
                  columnNumber: 21
                }, undefined)]
              }, void 0, true, {
                fileName: _jsxFileName$1,
                lineNumber: 371,
                columnNumber: 19
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 370,
              columnNumber: 17
            }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(ResponseDisplay, {
              loading: state.loading,
              responseText: state.responseText,
              errorMessage: state.errorMessage
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 401,
              columnNumber: 15
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 367,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 366,
          columnNumber: 11
        }, undefined), state.showJsonTab ? /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(tab_panel_default, {
          name: "json",
          children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
            className: "json-tab-section",
            children: [jsonContextData?.falcon_context.socket_info && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
              children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
                className: "json-section-header",
                children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("h3", {
                  className: "json-section-title",
                  children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                    name: "diagram-3"
                  }, void 0, false, {
                    fileName: _jsxFileName$1,
                    lineNumber: 417,
                    columnNumber: 25
                  }, undefined), "Socket Information"]
                }, void 0, true, {
                  fileName: _jsxFileName$1,
                  lineNumber: 416,
                  columnNumber: 23
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 415,
                columnNumber: 21
              }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
                className: "socket-info-container",
                children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
                  className: "socket-info-grid",
                  children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
                    className: "socket-info-row",
                    children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
                      className: "socket-info-label",
                      children: "Current Socket:"
                    }, void 0, false, {
                      fileName: _jsxFileName$1,
                      lineNumber: 425,
                      columnNumber: 27
                    }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
                      className: jsonContextData.falcon_context.socket_info.detected ? 'socket-badge-detected' : 'socket-badge-unknown',
                      children: jsonContextData.falcon_context.socket_info.detected ? jsonContextData.falcon_context.socket_info.socket : 'Unknown'
                    }, void 0, false, {
                      fileName: _jsxFileName$1,
                      lineNumber: 426,
                      columnNumber: 27
                    }, undefined)]
                  }, void 0, true, {
                    fileName: _jsxFileName$1,
                    lineNumber: 424,
                    columnNumber: 25
                  }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
                    className: "socket-info-row",
                    children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
                      className: "socket-info-label",
                      children: "Page:"
                    }, void 0, false, {
                      fileName: _jsxFileName$1,
                      lineNumber: 439,
                      columnNumber: 27
                    }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
                      className: "socket-info-text",
                      children: jsonContextData.falcon_context.socket_info.displayName
                    }, void 0, false, {
                      fileName: _jsxFileName$1,
                      lineNumber: 440,
                      columnNumber: 27
                    }, undefined)]
                  }, void 0, true, {
                    fileName: _jsxFileName$1,
                    lineNumber: 438,
                    columnNumber: 25
                  }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
                    className: "socket-info-row",
                    children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
                      className: "socket-info-label",
                      children: "Description:"
                    }, void 0, false, {
                      fileName: _jsxFileName$1,
                      lineNumber: 445,
                      columnNumber: 27
                    }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
                      className: "socket-info-description",
                      children: jsonContextData.falcon_context.socket_info.description
                    }, void 0, false, {
                      fileName: _jsxFileName$1,
                      lineNumber: 446,
                      columnNumber: 27
                    }, undefined)]
                  }, void 0, true, {
                    fileName: _jsxFileName$1,
                    lineNumber: 444,
                    columnNumber: 25
                  }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
                    className: "socket-info-row",
                    children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
                      className: "socket-info-label",
                      children: "Detection Method:"
                    }, void 0, false, {
                      fileName: _jsxFileName$1,
                      lineNumber: 451,
                      columnNumber: 27
                    }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("span", {
                      className: "socket-info-method",
                      children: jsonContextData.falcon_context.socket_info.detectionMethod
                    }, void 0, false, {
                      fileName: _jsxFileName$1,
                      lineNumber: 452,
                      columnNumber: 27
                    }, undefined)]
                  }, void 0, true, {
                    fileName: _jsxFileName$1,
                    lineNumber: 450,
                    columnNumber: 25
                  }, undefined)]
                }, void 0, true, {
                  fileName: _jsxFileName$1,
                  lineNumber: 423,
                  columnNumber: 23
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 422,
                columnNumber: 21
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName$1,
              lineNumber: 414,
              columnNumber: 19
            }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
              children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
                className: "json-section-header",
                children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("h3", {
                  className: "json-section-title",
                  children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                    name: "shield-check"
                  }, void 0, false, {
                    fileName: _jsxFileName$1,
                    lineNumber: 465,
                    columnNumber: 23
                  }, undefined), "Context"]
                }, void 0, true, {
                  fileName: _jsxFileName$1,
                  lineNumber: 464,
                  columnNumber: 21
                }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(button_default, {
                  size: "small",
                  onClick: copyFalconContext,
                  className: `json-copy-button ${contextCopyState === 'check-circle' ? 'copy-success' : ''}`,
                  children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                    slot: "prefix",
                    name: contextCopyState
                  }, void 0, false, {
                    fileName: _jsxFileName$1,
                    lineNumber: 473,
                    columnNumber: 23
                  }, undefined), contextCopyState === 'check-circle' ? 'Copied!' : 'Copy Context']
                }, void 0, true, {
                  fileName: _jsxFileName$1,
                  lineNumber: 468,
                  columnNumber: 21
                }, undefined)]
              }, void 0, true, {
                fileName: _jsxFileName$1,
                lineNumber: 463,
                columnNumber: 19
              }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
                className: "json-content-container",
                children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("pre", {
                  className: "json-content-pre",
                  children: jsonContextData?.falcon_context ? JSON.stringify(jsonContextData.falcon_context, null, 2) : 'No Falcon context available'
                }, void 0, false, {
                  fileName: _jsxFileName$1,
                  lineNumber: 479,
                  columnNumber: 21
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 478,
                columnNumber: 19
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName$1,
              lineNumber: 462,
              columnNumber: 17
            }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
              children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
                className: "json-section-header",
                children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("h3", {
                  className: "json-section-title",
                  children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                    name: "arrow-up-circle"
                  }, void 0, false, {
                    fileName: _jsxFileName$1,
                    lineNumber: 491,
                    columnNumber: 23
                  }, undefined), "Request"]
                }, void 0, true, {
                  fileName: _jsxFileName$1,
                  lineNumber: 490,
                  columnNumber: 21
                }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(button_default, {
                  size: "small",
                  onClick: copyRequestData,
                  className: `json-copy-button ${requestCopyState === 'check-circle' ? 'copy-success' : ''}`,
                  children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                    slot: "prefix",
                    name: requestCopyState
                  }, void 0, false, {
                    fileName: _jsxFileName$1,
                    lineNumber: 499,
                    columnNumber: 23
                  }, undefined), requestCopyState === 'check-circle' ? 'Copied!' : 'Copy Request']
                }, void 0, true, {
                  fileName: _jsxFileName$1,
                  lineNumber: 494,
                  columnNumber: 21
                }, undefined)]
              }, void 0, true, {
                fileName: _jsxFileName$1,
                lineNumber: 489,
                columnNumber: 19
              }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
                className: "json-content-container",
                children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("pre", {
                  className: "json-content-pre",
                  children: jsonContextData?.request_data ? JSON.stringify(jsonContextData.request_data, null, 2) : 'No request data available - select a query to populate'
                }, void 0, false, {
                  fileName: _jsxFileName$1,
                  lineNumber: 505,
                  columnNumber: 21
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 504,
                columnNumber: 19
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName$1,
              lineNumber: 488,
              columnNumber: 17
            }, undefined), state.responseText && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
              children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
                className: "json-section-header",
                children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("h3", {
                  className: "json-section-title",
                  children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                    name: "file-text"
                  }, void 0, false, {
                    fileName: _jsxFileName$1,
                    lineNumber: 518,
                    columnNumber: 25
                  }, undefined), "Raw Response"]
                }, void 0, true, {
                  fileName: _jsxFileName$1,
                  lineNumber: 517,
                  columnNumber: 23
                }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(button_default, {
                  size: "small",
                  onClick: () => copyRawResponse(state.responseText),
                  className: `json-copy-button ${rawResponseCopyState === 'check-circle' ? 'copy-success' : ''}`,
                  children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV(icon_default, {
                    slot: "prefix",
                    name: rawResponseCopyState
                  }, void 0, false, {
                    fileName: _jsxFileName$1,
                    lineNumber: 526,
                    columnNumber: 25
                  }, undefined), rawResponseCopyState === 'check-circle' ? 'Copied!' : 'Copy Raw Response']
                }, void 0, true, {
                  fileName: _jsxFileName$1,
                  lineNumber: 521,
                  columnNumber: 23
                }, undefined)]
              }, void 0, true, {
                fileName: _jsxFileName$1,
                lineNumber: 516,
                columnNumber: 21
              }, undefined), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
                className: "raw-response-container",
                children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("pre", {
                  className: "raw-response-pre",
                  children: state.responseText
                }, void 0, false, {
                  fileName: _jsxFileName$1,
                  lineNumber: 532,
                  columnNumber: 23
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 531,
                columnNumber: 21
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName$1,
              lineNumber: 515,
              columnNumber: 19
            }, undefined), state.hasSubmittedQuery && !state.responseText && !state.loading && /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
              className: "raw-response-container",
              children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
                className: "raw-response-empty",
                children: "No response content available"
              }, void 0, false, {
                fileName: _jsxFileName$1,
                lineNumber: 543,
                columnNumber: 21
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 542,
              columnNumber: 19
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName$1,
            lineNumber: 411,
            columnNumber: 15
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 410,
          columnNumber: 13
        }, undefined) : null]
      }, void 0, true, {
        fileName: _jsxFileName$1,
        lineNumber: 314,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 313,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 312,
    columnNumber: 5
  }, undefined);
});
Home.displayName = 'Home';

// src/hooks/useFalconApi.ts

/**
 * Hook to initialize and provide access to the Falcon API
 * @returns Object containing falcon API instance and initialization state
 */
function useFalconApi() {
  const [isInitialized, setIsInitialized] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const falcon = reactExports.useMemo(() => new FalconApi(), []);
  reactExports.useEffect(() => {
    async function initializeFalcon() {
      try {
        await falcon.connect();
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize Falcon API';
        // console.error('Failed to initialize Falcon API:', err);
        setError(errorMessage);
        setIsInitialized(false);
      }
    }
    initializeFalcon();
  }, [falcon]);
  return {
    falcon,
    isInitialized,
    error
  };
}

var _jsxFileName = "/Users/mraible/dev/foundry-sample-charlotte-toolkit/ui/extensions/charlotte-toolkit-ui/src/components/App.tsx";
function App() {
  const {
    isInitialized,
    falcon,
    error
  } = useFalconApi();

  // Show error state if Falcon API failed to initialize
  if (error) {
    return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
      className: "error-state p-6 rounded-lg",
      style: {
        backgroundColor: 'var(--cs-background-base)',
        border: '1px solid var(--cs-border-color-light)',
        borderRadius: 'var(--spacing-base)'
      },
      children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("h3", {
        className: "text-lg font-medium mb-2",
        style: {
          color: 'var(--cs-status-error)'
        },
        children: "Failed to Initialize"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 9
      }, this), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
        className: "text-sm mb-4",
        style: {
          color: 'var(--cs-text-primary)'
        },
        children: ["Unable to connect to the Falcon API: ", error]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 9
      }, this), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("button", {
        onClick: () => window.location.reload(),
        className: "px-4 py-2 rounded hover:opacity-80 focus:outline-none focus:ring-2",
        style: {
          backgroundColor: 'var(--cs-status-error)',
          color: 'var(--cs-text-on-primary)'
        },
        children: "Retry"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }, this);
  }

  // Show loading state while initializing
  if (!isInitialized) {
    return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
      className: "loading-state flex items-center justify-center min-h-screen",
      children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "text-center",
        children: [/*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
          className: "animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4",
          style: {
            borderBottomColor: 'var(--cs-primary)'
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 51,
          columnNumber: 11
        }, this), /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("p", {
          style: {
            color: 'var(--cs-text-primary)'
          },
          children: "Initializing..."
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 55,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 7
    }, this);
  }
  return /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(ErrorBoundary, {
    children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(React.StrictMode, {
      children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV("div", {
        className: "font-sans min-h-screen p-4",
        style: {
          fontFamily: 'var(--font-family-sans)',
          color: 'var(--cs-text-primary)',
          backgroundColor: 'var(--cs-background-dark)',
          minHeight: '100vh',
          padding: 'var(--spacing-xl)'
        },
        children: /*#__PURE__*/jsxDevRuntimeExports.jsxDEV(Home, {
          falcon: falcon
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 74,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 62,
    columnNumber: 5
  }, this);
}

// src/index.ts


// Set the base path for Shoelace icons to CDN
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/');

// Theme switching utility - system preferences only (no localStorage in sandbox)
const initializeTheme = () => {
  // Simple system preference detection
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.documentElement.classList.add('theme-dark');
  } else {
    document.documentElement.classList.remove('theme-dark');
  }

  // Listen for system theme changes and update automatically
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
      document.documentElement.classList.add('theme-dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
    }
  });
};

// Initialize theme before rendering
initializeTheme();

// Render the app
const container = document.querySelector('#app');
if (!container) {
  throw new Error('Could not find app container element');
}
const root = ReactDOM.createRoot(container);
root.render(/*#__PURE__*/React.createElement(App));
//# sourceMappingURL=index-mdzentjy849.js.map
