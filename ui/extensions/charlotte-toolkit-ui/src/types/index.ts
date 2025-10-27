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

// Cache types
// biome-ignore lint/suspicious/noExplicitAny: Generic cache interface supports storing any data type
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
  subType?:
    | 'filename'
    | 'md5'
    | 'sha256'
    | 'sha1'
    | 'tld'
    | 'fqdn'
    | 'technique'
    | 'tactic';
  parentFile?: string;
  parentDomain?: string;
  queryTemplate: string;
  // biome-ignore lint/suspicious/noExplicitAny: entityData stores arbitrary context metadata from Falcon API
  entityData?: any;
}

export interface UseContextProcessorProps {
  // biome-ignore lint/suspicious/noExplicitAny: falconData accepts any Falcon API response structure
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
