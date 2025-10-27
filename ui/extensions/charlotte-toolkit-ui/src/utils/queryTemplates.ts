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
const createDomainQueryTemplate = (domain: string): string => {
  return BASE_SECURITY_TEMPLATE.replace(/{entityType}/g, 'domain')
    .replace(/{entityValue}/g, domain)
    .replace(/{analysisType}/g, 'DOMAIN')
    .replace(/{contextSpecific}/g, 'Registration details and ownership information')
    .replace(/{responseActions}/g, 'Common attack vectors and associated subdomains/URLs');
};

/**
 * Generate file analysis query template for file-based threat analysis
 * @param filename - Name of the file to analyze
 * @returns Structured query template for comprehensive file security analysis
 */
const createFileQueryTemplate = (filename: string): string => {
  return BASE_SECURITY_TEMPLATE.replace(/{entityType}/g, 'file')
    .replace(/{entityValue}/g, filename)
    .replace(/{analysisType}/g, 'FILE')
    .replace(/{contextSpecific}/g, 'File type, format identification, and behavioral analysis')
    .replace(/{responseActions}/g, 'Associated hashes, registry keys, and network indicators');
};

/**
 * Generate hash analysis query template for malware analysis
 * @param hash - File hash to analyze
 * @param hashType - Type of hash (default: 'SHA256')
 * @returns Structured query template for comprehensive malware analysis
 */
const createHashQueryTemplate = (hash: string, hashType: string = 'SHA256'): string => {
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
const createIPQueryTemplate = (ip: string): string => {
  return BASE_SECURITY_TEMPLATE.replace(/{entityType}/g, 'IP address')
    .replace(/{entityValue}/g, ip)
    .replace(/{analysisType}/g, 'IP')
    .replace(/{contextSpecific}/g, 'Geolocation, ISP information, and network infrastructure')
    .replace(/{responseActions}/g, 'Network communication patterns, ports, and associated domains');
};

/**
 * Generate FQDN analysis query template
 */
const createFQDNQueryTemplate = (fqdn: string): string => {
  return BASE_SECURITY_TEMPLATE.replace(/{entityType}/g, 'hostname')
    .replace(/{entityValue}/g, fqdn)
    .replace(/{analysisType}/g, 'HOSTNAME')
    .replace(/{contextSpecific}/g, 'DNS resolution and infrastructure details')
    .replace(/{responseActions}/g, 'Network services, certificates, and subdomain patterns');
};

/**
 * Generate hostname analysis query template
 */
const createHostnameQueryTemplate = (hostname: string): string => {
  return BASE_SECURITY_TEMPLATE.replace(/{entityType}/g, 'hostname')
    .replace(/{entityValue}/g, hostname)
    .replace(/{analysisType}/g, 'HOSTNAME')
    .replace(/{contextSpecific}/g, 'System identification and network infrastructure')
    .replace(/{responseActions}/g, 'Network connections, services, and associated processes');
};

/**
 * Generate user analysis query template
 */
const createUserQueryTemplate = (user: string): string => {
  return BASE_SECURITY_TEMPLATE.replace(/{entityType}/g, 'user account')
    .replace(/{entityValue}/g, user)
    .replace(/{analysisType}/g, 'USER ACCOUNT')
    .replace(
      /{contextSpecific}/g,
      'Account privileges, activity patterns, and authentication details',
    )
    .replace(
      /{responseActions}/g,
      'Login history, privilege escalation attempts, and associated processes',
    );
};

/**
 * Generate MITRE ATT&CK technique analysis query template
 * @param techniqueId - MITRE technique ID (e.g., 'T1055')
 * @param techniqueName - Optional technique name for display
 * @returns Structured query template for comprehensive MITRE technique analysis
 */
const createMitreQueryTemplate = (techniqueId: string, techniqueName?: string): string => {
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
export const createQueryTemplate = (
  entityType: 'domain' | 'file' | 'ip' | 'fqdn' | 'hostname' | 'user' | 'mitre',
  entityValue: string,
  entityData?: Record<string, unknown>,
): string => {
  switch (entityType) {
    case 'domain':
      return createDomainQueryTemplate(entityValue);
    case 'file':
      if (entityData?.hashType && typeof entityData.hashType === 'string') {
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
      return createMitreQueryTemplate(
        entityValue,
        typeof entityData?.techniqueName === 'string' ? entityData.techniqueName : undefined,
      );
    default: {
      // This should never happen with the current type system, but provides a fallback
      const fallbackEntityType = entityType as string;
      return BASE_SECURITY_TEMPLATE.replace(/{entityType}/g, fallbackEntityType)
        .replace(/{entityValue}/g, entityValue)
        .replace(/{analysisType}/g, fallbackEntityType.toUpperCase())
        .replace(/{contextSpecific}/g, 'Entity-specific analysis and characteristics')
        .replace(/{responseActions}/g, 'Related indicators and attack patterns');
    }
  }
};
