// src/types/security.ts

export type ThreatLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type ConfidenceLevel = 'Low' | 'Medium' | 'High';

export interface StructuredSecurityResponse {
  executive_summary: string;
  
  // Core fields from universal schema
  threat_level: ThreatLevel;
  confidence_level: ConfidenceLevel;
  priority_actions: string[];
  technical_details?: string;
  reasoning_assessment?: string;

  // Optional structured data (when applicable)
  iocs?: {
    hashes?: string[];
    ips?: string[];
    domains?: string[];
    urls?: string[];
    file_paths?: string[];
  };
  mitre_techniques?: Array<{
    technique_id: string;
    technique_name: string;
    description: string;
  }>;
}

export interface MITRETechnique {
  technique_id: string;
  technique_name: string;
  description: string;
}

export interface IOCs {
  hashes?: string[];
  ips?: string[];
  domains?: string[];
  urls?: string[];
  file_paths?: string[];
}
