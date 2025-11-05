import { describe, expect, it } from 'vitest';
import { StructuredSecurityAnalysis } from '../index';

describe('security/index', () => {
  it('should export StructuredSecurityAnalysis', () => {
    expect(StructuredSecurityAnalysis).toBeDefined();
    expect(typeof StructuredSecurityAnalysis).toBe('function');
  });
});
