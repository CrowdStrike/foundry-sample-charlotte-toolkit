// Core Foundry types
export interface FalconData {
  incident?: {
    id: string;
    name: string;
    description?: string;
    created_date?: string;
    modified_date?: string;
    status?: string;
    severity?: number;
  };
  detection?: {
    id: string;
    name: string;
    description?: string;
    created_date?: string;
    severity?: string;
  };
  host?: {
    id: string;
    hostname?: string;
    platform?: string;
    os_version?: string;
  };
}

export interface FalconContext {
  data?: FalconData;
  api: {
    workflows: {
      postEntitiesExecuteV1: (
        payload: WorkflowPayload,
        config?: any
      ) => Promise<WorkflowPendingResponse>;
      getEntitiesExecutionResultsV1: (
        ids: string[],
        config?: any
      ) => Promise<WorkflowResultResponse>;
    };
  };
}

// Workflow types
export interface WorkflowPayload {
  definition_id?: string;
  name?: string;
  parameters?: Record<string, any>;
}

export interface WorkflowPendingResponse {
  errors?: Array<{ message: string; code?: number }>;
  resources?: string[];
  meta?: {
    query_time: number;
    pagination?: {
      offset: number;
      limit: number;
      total: number;
    };
  };
}

export interface WorkflowResultResponse {
  errors?: Array<{ message: string; code?: number }>;
  resources?: Array<{
    id: string;
    status: 'InProgress' | 'Completed' | 'Failed' | 'Cancelled';
    output_data?: {
      content?: string;
      [key: string]: any;
    };
    created_date?: string;
    last_updated?: string;
  }>;
  meta?: {
    query_time: number;
  };
}

// LLM API types
export interface LLMResponse {
  content: string;
  model: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  finish_reason?: string;
}

export interface ModelOption {
  value: string;
  label: string;
  description?: string;
  maxTokens?: number;
  costPer1kTokens?: number;
}

// Hook return types
export interface UseFalconApiReturn {
  isInitialized: boolean;
  falcon: FalconContext | null;
  error: string | null;
}

// Cache types
export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
}

export interface ResponseCache {
  get: (key: string) => LLMResponse | null;
  set: (key: string, value: LLMResponse, ttl?: number) => void;
  clear: () => void;
  size: () => number;
}

// Error boundary types
export interface ErrorInfo {
  componentStack: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// Context processing types
export interface ContextOption {
  value: string;
  displayName: string;
  type: 'domain' | 'file' | 'ip' | 'mitre';
  subType?: 'filename' | 'md5' | 'sha256' | 'sha1' | 'tld' | 'fqdn' | 'technique' | 'tactic';
  parentFile?: string;
  parentDomain?: string;
  queryTemplate: string;
  entityData?: any;
}

export interface UseContextProcessorProps {
  falconData: any;
}

export interface UseContextProcessorResult {
  availableContextOptions: ContextOption[];
  contextCounts: {
    total: number;
    domains: number;
    files: number;
    ips: number;
    mitres: number;
  };
}

export interface EntityCounts {
  domain: number;
  file: number;
  ip: number;
}


