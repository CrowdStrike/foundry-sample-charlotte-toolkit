import * as workflowExports from '../index';

describe('services/workflow/index', () => {
  it('should export workflow execution functions', () => {
    expect(workflowExports.executeWorkflowWithCache).toBeDefined();
    expect(workflowExports.cancelWorkflowExecution).toBeDefined();
    expect(workflowExports.getWorkflowStatus).toBeDefined();
  });

  it('should export validation utilities', () => {
    expect(workflowExports.validateWorkflowParams).toBeDefined();
    expect(workflowExports.validateModelName).toBeDefined();
    expect(workflowExports.validateTemperature).toBeDefined();
    expect(workflowExports.validateJsonSchema).toBeDefined();
    expect(workflowExports.validateWorkflowParamsDetailed).toBeDefined();
  });

  it('should export payload building utilities', () => {
    expect(workflowExports.buildWorkflowPayload).toBeDefined();
    expect(workflowExports.normalizeModelName).toBeDefined();
    expect(workflowExports.validatePayload).toBeDefined();
    expect(workflowExports.createOptimizedPayload).toBeDefined();
    expect(workflowExports.analyzePayloadSize).toBeDefined();
    expect(workflowExports.createTestPayload).toBeDefined();
    expect(workflowExports.logPayloadInfo).toBeDefined();
  });

  it('should export polling utilities', () => {
    expect(workflowExports.pollWorkflowCompletion).toBeDefined();
    expect(workflowExports.isWorkflowRunning).toBeDefined();
    expect(workflowExports.isWorkflowTerminal).toBeDefined();
    expect(workflowExports.parseWorkflowStatus).toBeDefined();
  });

  it('should export content extraction utilities', () => {
    expect(workflowExports.extractWorkflowContent).toBeDefined();
    expect(workflowExports.analyzeWorkflowOutput).toBeDefined();
    expect(workflowExports.validateExtractedContent).toBeDefined();
    expect(workflowExports.extractWorkflowMetadata).toBeDefined();
  });

  it('should export WorkflowStatus and WORKFLOW_CONFIG', () => {
    expect(workflowExports.WorkflowStatus).toBeDefined();
    expect(workflowExports.WORKFLOW_CONFIG).toBeDefined();
  });

  it('should have function type exports', () => {
    expect(typeof workflowExports.executeWorkflowWithCache).toBe('function');
    expect(typeof workflowExports.validateWorkflowParams).toBe('function');
    expect(typeof workflowExports.buildWorkflowPayload).toBe('function');
    expect(typeof workflowExports.pollWorkflowCompletion).toBe('function');
    expect(typeof workflowExports.extractWorkflowContent).toBe('function');
  });
});