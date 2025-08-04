// src/utils/promptEngineer.ts

/**
 * Simplified prompt engineering utilities for Charlotte AI
 * Provides intelligent use case detection and schema generation for security analysis
 */

/**
 * Supported use cases for Charlotte AI security analysis
 */
export interface PromptOptions {
  useCase:
    | 'hash_analysis'
    | 'ip_investigation'
    | 'domain_analysis'
    | 'incident_response'
    | 'general_security'
    | 'malware_analysis'
    | 'threat_hunting';
}

/**
 * Detect the most appropriate use case from a user query
 * Uses pattern matching and keyword analysis to determine the best analysis type
 * @param query - User input query to analyze
 * @returns The detected use case that best matches the query content
 */
export const detectUseCase = (query: string): PromptOptions['useCase'] => {
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
  if (
    lowercaseQuery.includes('incident') ||
    lowercaseQuery.includes('response') ||
    lowercaseQuery.includes('containment')
  ) {
    return 'incident_response';
  }

  if (
    lowercaseQuery.includes('malware') ||
    lowercaseQuery.includes('virus') ||
    lowercaseQuery.includes('trojan')
  ) {
    return 'malware_analysis';
  }

  if (
    lowercaseQuery.includes('hunt') ||
    lowercaseQuery.includes('hunting') ||
    lowercaseQuery.includes('proactive')
  ) {
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
export const createSecurityResponseSchema = (useCase: PromptOptions['useCase']): string => {
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
const createUniversalSecuritySchema = (): string => {
  const schema = {
    type: 'object',
    properties: {
      executive_summary: {
        type: 'string',
        description: 'Brief executive overview for leadership',
      },
      
      threat_level: {
        type: 'string',
        enum: ['Low', 'Medium', 'High', 'Critical'],
        description: 'Overall threat severity',
      },
      
      confidence_level: {
        type: 'string',
        enum: ['Low', 'Medium', 'High'],
        description: 'Analysis confidence level',
      },

      // Unified priority actions - replaces all multiple recommendation arrays
      priority_actions: {
        type: 'array',
        items: { type: 'string', maxLength: 150 },
        maxItems: 6,
        description: 'Top priority security actions ranked by urgency and impact',
      },

      // Technical analysis details
      technical_details: {
        type: 'string',
        maxLength: 600,
        description: 'Concise technical analysis and findings',
      },

      // Unified IOCs structure (when applicable)
      iocs: {
        type: 'object',
        properties: {
          hashes: { type: 'array', items: { type: 'string' } },
          ips: { type: 'array', items: { type: 'string' } },
          domains: { type: 'array', items: { type: 'string' } },
          urls: { type: 'array', items: { type: 'string' } },
          file_paths: { type: 'array', items: { type: 'string' } },
        },
        description: 'Indicators of Compromise when applicable',
      },

      // MITRE techniques (when applicable)
      mitre_techniques: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            technique_id: { type: 'string' },
            technique_name: { type: 'string' },
            description: { type: 'string' },
          },
        },
        description: 'MITRE ATT&CK techniques when applicable',
      },

      // Analysis methodology and reasoning
      reasoning_assessment: {
        type: 'string',
        maxLength: 800,
        description: 'Concise explanation of analytical methodology and confidence reasoning: data sources consulted, key decision factors, specific evidence supporting findings, and reasoning behind confidence levels. Focus on essential rationale rather than comprehensive details.',
      },
    },
    required: [
      'executive_summary',
      'threat_level',
      'confidence_level',
      'priority_actions',
      'technical_details',
      'reasoning_assessment',
    ],
  };

  return JSON.stringify(schema, null, 2);
};

/**
 * Create simplified universal security analysis schema
 * Provides clean, focused structure for all security analysis types
 * @returns JSON schema string for security analysis responses
 */
const createMalwareAnalysisSchema = (): string => {
  return createUniversalSecuritySchema();
};

/**
 * Create IP investigation schema - now uses simplified universal schema
 * @returns JSON schema string for IP investigation responses
 */
const createIPInvestigationSchema = (): string => {
  return createUniversalSecuritySchema();
};

/**
 * Create domain analysis schema - now uses simplified universal schema
 * @returns JSON schema string for domain analysis responses
 */
const createDomainAnalysisSchema = (): string => {
  return createUniversalSecuritySchema();
};

/**
 * Create incident response schema - now uses simplified universal schema
 * @returns JSON schema string for incident response workflows
 */
const createIncidentResponseSchema = (): string => {
  return createUniversalSecuritySchema();
};

/**
 * Create threat hunting schema - now uses simplified universal schema
 * @returns JSON schema string for threat hunting activities
 */
const createThreatHuntingSchema = (): string => {
  return createUniversalSecuritySchema();
};

/**
 * Create general security analysis schema - now uses simplified universal schema
 * @returns JSON schema string for general security analysis responses
 */
const createGeneralSecuritySchema = (): string => {
  return createUniversalSecuritySchema();
};
