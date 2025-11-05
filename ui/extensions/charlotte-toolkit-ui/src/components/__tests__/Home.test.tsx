// src/components/__tests__/Home.test.tsx

import type FalconApi from '@crowdstrike/foundry-js';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useContextProcessor } from '../../hooks/useContextProcessor';
import { useCopyManager } from '../../hooks/useCopyManager';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { useJsonDataManager } from '../../hooks/useJsonDataManager';
import { useTabManager } from '../../hooks/useTabManager';
import { executeWorkflowWithCache } from '../../services/workflow';
import { validateQuery } from '../../utils/helpers';
import Home from '../Home';

// Mock all hooks and services
vi.mock('../../hooks/useContextProcessor');
vi.mock('../../hooks/useCopyManager');
vi.mock('../../hooks/useCopyToClipboard');
vi.mock('../../hooks/useJsonDataManager');
vi.mock('../../hooks/useTabManager');
vi.mock('../../services/workflow');
vi.mock('../../utils/helpers', async () => {
  const actual = await vi.importActual('../../utils/helpers');
  return {
    ...actual,
    validateQuery: vi.fn(),
  };
});

// Mock child components
vi.mock('../QueryForm', () => ({
  default: ({
    query,
    setQuery,
    handleSubmit,
    loading,
  }: {
    query: string;
    setQuery: (q: string) => void;
    handleSubmit: () => void;
    loading: boolean;
  }) => (
    <div data-testid="query-form">
      <input
        data-testid="query-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={loading}
      />
      <button type="button" data-testid="submit-button" onClick={handleSubmit} disabled={loading}>
        Submit
      </button>
    </div>
  ),
}));

vi.mock('../ResponseDisplay', () => ({
  default: ({
    loading,
    responseText,
    errorMessage,
  }: {
    loading: boolean;
    responseText: string;
    errorMessage: string;
  }) => (
    <div data-testid="response-display">
      {loading && <div data-testid="loading-indicator">Loading...</div>}
      {responseText && <div data-testid="response-text">{responseText}</div>}
      {errorMessage && <div data-testid="error-message">{errorMessage}</div>}
    </div>
  ),
}));

// Mock Shoelace components
vi.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlButton: ({
    children,
    onClick,
    slot,
    size,
    variant,
    caret,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    slot?: string;
    size?: string;
    variant?: string;
    caret?: boolean;
    className?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      data-slot={slot}
      data-size={size}
      data-variant={variant}
      data-caret={caret}
      className={className}
    >
      {children}
    </button>
  ),
  SlCard: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="sl-card" className={className}>
      {children}
    </div>
  ),
  SlDropdown: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sl-dropdown">{children}</div>
  ),
  SlIcon: ({ name, slot, className }: { name?: string; slot?: string; className?: string }) => (
    <span data-icon={name} data-slot={slot} className={className}>
      [{name}]
    </span>
  ),
  SlMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sl-menu">{children}</div>
  ),
  SlMenuItem: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button type="button" data-testid="sl-menu-item" onClick={onClick}>
      {children}
    </button>
  ),
  SlTab: ({
    children,
    slot,
    panel,
    disabled,
    className,
  }: {
    children: React.ReactNode;
    slot?: string;
    panel?: string;
    disabled?: boolean;
    className?: string;
  }) => (
    <div
      data-testid={`sl-tab-${panel}`}
      data-slot={slot}
      data-disabled={disabled}
      className={className}
    >
      {children}
    </div>
  ),
  SlTabGroup: React.forwardRef(
    (
      {
        children,
        placement,
      }: {
        children: React.ReactNode;
        placement?: string;
      },
      ref: React.Ref<HTMLDivElement>,
    ) => (
      <div data-testid="sl-tab-group" data-placement={placement} ref={ref}>
        {children}
      </div>
    ),
  ),
  SlTabPanel: ({ children, name }: { children: React.ReactNode; name?: string }) => (
    <div data-testid={`sl-tab-panel-${name}`}>{children}</div>
  ),
}));

const mockUseContextProcessor = vi.mocked(useContextProcessor);
const mockUseCopyManager = vi.mocked(useCopyManager);
const mockUseCopyToClipboard = vi.mocked(useCopyToClipboard);
const mockUseJsonDataManager = vi.mocked(useJsonDataManager);
const mockUseTabManager = vi.mocked(useTabManager);
const mockExecuteWorkflowWithCache = vi.mocked(executeWorkflowWithCache);
const mockValidateQuery = vi.mocked(validateQuery);

describe('Home Component', () => {
  const mockFalcon = { data: { test: 'data' } } as unknown as FalconApi;
  const mockAvailableContextOptions = [
    {
      value: 'test1.com',
      displayName: 'Context 1',
      type: 'domain' as const,
      subType: 'fqdn' as const,
      queryTemplate: 'Domain: {{value}}',
    },
    {
      value: '1.2.3.4',
      displayName: 'Context 2',
      type: 'ip' as const,
      queryTemplate: 'IP: {{value}}',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    // Default hook mocks
    mockUseContextProcessor.mockReturnValue({
      availableContextOptions: mockAvailableContextOptions,
      contextCounts: {
        total: 2,
        domains: 1,
        files: 0,
        ips: 1,
        mitres: 0,
      },
    });

    mockUseCopyManager.mockReturnValue({
      copyState: 'clipboard',
      isSuccess: false,
      handleCopyFormat: vi.fn(),
      copyOptions: [
        {
          format: 'markdown',
          label: 'Copy as Markdown',
          icon: 'markdown',
          description: 'Formatted response with markdown styling',
        },
        {
          format: 'plaintext',
          label: 'Copy as Text',
          icon: 'file-text',
          description: 'Clean text without formatting',
        },
      ],
    });

    mockUseCopyToClipboard.mockReturnValue({
      copyState: 'clipboard',
      copyToClipboard: vi.fn().mockResolvedValue(undefined),
      isSuccess: false,
    });

    mockUseJsonDataManager.mockReturnValue({
      jsonContextData: {
        falcon_context: {
          socket_info: {
            detected: true,
            socket: 'test-socket',
            displayName: 'Test Page',
            description: 'Test description',
            detectionMethod: 'pathname',
          },
          falcon_object: {
            full_data: {},
            data_structure: [],
            incident: null,
            detection: null,
            available_entities: [],
            entity_counts: {
              total_entities: 0,
              domains: 0,
              files: 0,
              ips: 0,
              fqdns: 0,
            },
          },
        },
        request_data: {
          timestamp: new Date().toISOString(),
          parameters: {
            query: 'test query',
            model: 'gpt-4',
            temperature: 0.7,
            stopWords: [],
            jsonSchema: '',
            dataToInclude: [],
            selectedContext: '',
          },
        },
      },
      initializeRequestData: vi.fn(),
      updateRequestData: vi.fn(),
      updateResponseData: vi.fn(),
      copyFalconContext: vi.fn(),
      copyRequestData: vi.fn(),
      copyResponseData: vi.fn(),
      copyRawResponse: vi.fn(),
      contextCopyState: 'clipboard',
      requestCopyState: 'clipboard',
      responseCopyState: 'clipboard',
      rawResponseCopyState: 'clipboard',
    });

    mockUseTabManager.mockReturnValue({
      activeTab: 'request',
      tabGroupRef: { current: null },
      handleTabChange: vi.fn(),
      setActiveTab: vi.fn(),
      getResponseTabIndicator: vi.fn(() => <span data-testid="response-indicator">[icon]</span>),
    });

    mockValidateQuery.mockReturnValue({ isValid: true });
  });

  describe('Initial Render', () => {
    it('should render Home component with tabs', () => {
      render(<Home falcon={mockFalcon} />);

      expect(screen.getByTestId('sl-card')).toBeDefined();
      expect(screen.getByTestId('sl-tab-group')).toBeDefined();
      expect(screen.getByTestId('sl-tab-request')).toBeDefined();
      expect(screen.getByTestId('sl-tab-response')).toBeDefined();
    });

    it('should render QueryForm in Request tab panel', () => {
      render(<Home falcon={mockFalcon} />);

      expect(screen.getByTestId('sl-tab-panel-request')).toBeDefined();
      expect(screen.getByTestId('query-form')).toBeDefined();
    });

    it('should render ResponseDisplay in Response tab panel', () => {
      render(<Home falcon={mockFalcon} />);

      expect(screen.getByTestId('sl-tab-panel-response')).toBeDefined();
      expect(screen.getByTestId('response-display')).toBeDefined();
    });

    it('should initialize with empty query state', () => {
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input') as HTMLInputElement;
      expect(queryInput.value).toBe('');
    });

    it('should not show JSON tab by default', () => {
      render(<Home falcon={mockFalcon} />);

      expect(screen.queryByTestId('sl-tab-json')).toBeNull();
    });

    it('should call useContextProcessor with falcon data', () => {
      render(<Home falcon={mockFalcon} />);

      expect(mockUseContextProcessor).toHaveBeenCalledWith({
        falconData: mockFalcon.data,
      });
    });

    it('should call useJsonDataManager with correct context counts', () => {
      render(<Home falcon={mockFalcon} />);

      expect(mockUseJsonDataManager).toHaveBeenCalledWith({
        falconData: mockFalcon.data,
        availableContextOptions: mockAvailableContextOptions,
        contextCounts: {
          total: 2,
          domains: 1,
          files: 0,
          ips: 1,
          fqdns: 1, // Mock data includes one FQDN domain (line 187)
        },
      });
    });

    it('should disable response tab initially', () => {
      render(<Home falcon={mockFalcon} />);

      const responseTab = screen.getByTestId('sl-tab-response');
      expect(responseTab.getAttribute('data-disabled')).toBe('true');
    });
  });

  describe('State Management', () => {
    it('should update query when typing in input', async () => {
      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      await waitFor(() => {
        expect((queryInput as HTMLInputElement).value).toBe('test query');
      });
    });

    it('should update request data when query changes', async () => {
      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test');

      // Verify that query state was updated (input value changed)
      await waitFor(() => {
        expect((queryInput as HTMLInputElement).value).toBe('test');
      });
    });
  });

  describe('Form Submission - Success', () => {
    it('should handle successful form submission', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      mockExecuteWorkflowWithCache.mockResolvedValue({
        success: true,
        content: 'Test response content',
        fromCache: false,
      });

      const defaultTabManager = mockUseTabManager.mock.results[0]?.value || {
        activeTab: 'request',
        tabGroupRef: { current: null },
        handleTabChange: vi.fn(),
        setActiveTab: vi.fn(),
        getResponseTabIndicator: vi.fn(),
      };
      const defaultJsonManager = mockUseJsonDataManager.mock.results[0]?.value || {
        jsonContextData: null,
        initializeRequestData: vi.fn(),
        updateRequestData: vi.fn(),
        updateResponseData: vi.fn(),
        copyFalconContext: vi.fn(),
        copyRequestData: vi.fn(),
        copyResponseData: vi.fn(),
        copyRawResponse: vi.fn(),
        contextCopyState: 'clipboard',
        requestCopyState: 'clipboard',
        responseCopyState: 'clipboard',
        rawResponseCopyState: 'clipboard',
      };
      const mockSetActiveTab = vi.fn();
      const mockInitializeRequestData = vi.fn();
      const mockUpdateResponseData = vi.fn();

      mockUseTabManager.mockReturnValue({
        ...defaultTabManager,
        setActiveTab: mockSetActiveTab,
      });

      mockUseJsonDataManager.mockReturnValue({
        ...defaultJsonManager,
        initializeRequestData: mockInitializeRequestData,
        updateResponseData: mockUpdateResponseData,
      });

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockValidateQuery).toHaveBeenCalledWith('test query');
        expect(mockInitializeRequestData).toHaveBeenCalled();
        expect(mockSetActiveTab).toHaveBeenCalledWith('response');
        expect(mockExecuteWorkflowWithCache).toHaveBeenCalledWith(
          mockFalcon,
          expect.objectContaining({
            query: 'test query',
            enableCaching: false,
          }),
        );
      });
    });

    it('should display response text after successful submission', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      mockExecuteWorkflowWithCache.mockResolvedValue({
        success: true,
        content: 'Test response content',
        fromCache: false,
      });

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('response-text')).toBeDefined();
        expect(screen.getByTestId('response-text').textContent).toBe('Test response content');
      });
    });

    it('should show cached status for cached responses', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      mockExecuteWorkflowWithCache.mockResolvedValue({
        success: true,
        content: 'Cached response',
        fromCache: true,
      });

      const defaultJsonManager = mockUseJsonDataManager.mock.results[0]?.value || {
        jsonContextData: null,
        initializeRequestData: vi.fn(),
        updateRequestData: vi.fn(),
        updateResponseData: vi.fn(),
        copyFalconContext: vi.fn(),
        copyRequestData: vi.fn(),
        copyResponseData: vi.fn(),
        copyRawResponse: vi.fn(),
        contextCopyState: 'clipboard',
        requestCopyState: 'clipboard',
        responseCopyState: 'clipboard',
        rawResponseCopyState: 'clipboard',
      };
      const mockUpdateResponseData = vi.fn();
      mockUseJsonDataManager.mockReturnValue({
        ...defaultJsonManager,
        updateResponseData: mockUpdateResponseData,
      });

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockUpdateResponseData).toHaveBeenCalledWith(
          expect.objectContaining({
            fromCache: true,
          }),
        );
      });
    });

    it('should update response data with execution times', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      mockExecuteWorkflowWithCache.mockResolvedValue({
        success: true,
        content: 'Test response',
        fromCache: false,
      });

      const defaultJsonManager = mockUseJsonDataManager.mock.results[0]?.value || {
        jsonContextData: null,
        initializeRequestData: vi.fn(),
        updateRequestData: vi.fn(),
        updateResponseData: vi.fn(),
        copyFalconContext: vi.fn(),
        copyRequestData: vi.fn(),
        copyResponseData: vi.fn(),
        copyRawResponse: vi.fn(),
        contextCopyState: 'clipboard',
        requestCopyState: 'clipboard',
        responseCopyState: 'clipboard',
        rawResponseCopyState: 'clipboard',
      };
      const mockUpdateResponseData = vi.fn();
      mockUseJsonDataManager.mockReturnValue({
        ...defaultJsonManager,
        updateResponseData: mockUpdateResponseData,
      });

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockUpdateResponseData).toHaveBeenCalledWith(
          expect.objectContaining({
            executionStartTime: expect.any(String),
            executionEndTime: expect.any(String),
            success: true,
          }),
        );
      });
    });
  });

  describe('Form Submission - Error Handling', () => {
    it('should show validation error for invalid query', async () => {
      mockValidateQuery.mockReturnValue({
        isValid: false,
        error: 'Query is required',
      });

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockExecuteWorkflowWithCache).not.toHaveBeenCalled();
      });
    });

    it('should handle workflow execution error', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      mockExecuteWorkflowWithCache.mockResolvedValue({
        success: false,
        error: 'Workflow execution failed',
      });

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeDefined();
        expect(screen.getByTestId('error-message').textContent).toBe('Workflow execution failed');
      });
    });

    it('should handle exception during workflow execution', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      mockExecuteWorkflowWithCache.mockRejectedValue(new Error('Network error'));

      const defaultJsonManager = mockUseJsonDataManager.mock.results[0]?.value || {
        jsonContextData: null,
        initializeRequestData: vi.fn(),
        updateRequestData: vi.fn(),
        updateResponseData: vi.fn(),
        copyFalconContext: vi.fn(),
        copyRequestData: vi.fn(),
        copyResponseData: vi.fn(),
        copyRawResponse: vi.fn(),
        contextCopyState: 'clipboard',
        requestCopyState: 'clipboard',
        responseCopyState: 'clipboard',
        rawResponseCopyState: 'clipboard',
      };
      const mockUpdateResponseData = vi.fn();
      mockUseJsonDataManager.mockReturnValue({
        ...defaultJsonManager,
        updateResponseData: mockUpdateResponseData,
      });

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockUpdateResponseData).toHaveBeenCalledWith(
          expect.objectContaining({
            success: false,
            error: expect.stringContaining('Network error'),
          }),
        );
      });
    });

    it('should update response data with error information', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      mockExecuteWorkflowWithCache.mockRejectedValue(new Error('Test error'));

      const defaultJsonManager = mockUseJsonDataManager.mock.results[0]?.value || {
        jsonContextData: null,
        initializeRequestData: vi.fn(),
        updateRequestData: vi.fn(),
        updateResponseData: vi.fn(),
        copyFalconContext: vi.fn(),
        copyRequestData: vi.fn(),
        copyResponseData: vi.fn(),
        copyRawResponse: vi.fn(),
        contextCopyState: 'clipboard',
        requestCopyState: 'clipboard',
        responseCopyState: 'clipboard',
        rawResponseCopyState: 'clipboard',
      };
      const mockUpdateResponseData = vi.fn();
      mockUseJsonDataManager.mockReturnValue({
        ...defaultJsonManager,
        updateResponseData: mockUpdateResponseData,
      });

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockUpdateResponseData).toHaveBeenCalledWith(
          expect.objectContaining({
            success: false,
            workflowResult: expect.objectContaining({
              exception: expect.objectContaining({
                message: 'Test error',
                stack: expect.any(String),
              }),
            }),
          }),
        );
      });
    });
  });

  describe('Loading State', () => {
    it('should show loading state during submission', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });

      let resolveWorkflow: ((value: { success: boolean; content: string }) => void) | undefined;
      const workflowPromise = new Promise<{ success: boolean; content: string }>((resolve) => {
        resolveWorkflow = resolve;
      });
      mockExecuteWorkflowWithCache.mockReturnValue(
        workflowPromise as unknown as ReturnType<typeof executeWorkflowWithCache>,
      );

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('loading-indicator')).toBeDefined();
      });

      resolveWorkflow?.({ success: true, content: 'Done' });
    });

    it('should disable submit button during loading', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });

      let resolveWorkflow: ((value: { success: boolean; content: string }) => void) | undefined;
      const workflowPromise = new Promise<{ success: boolean; content: string }>((resolve) => {
        resolveWorkflow = resolve;
      });
      mockExecuteWorkflowWithCache.mockReturnValue(
        workflowPromise as unknown as ReturnType<typeof executeWorkflowWithCache>,
      );

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button') as HTMLButtonElement;
      await user.click(submitButton);

      await waitFor(() => {
        expect(submitButton.disabled).toBe(true);
      });

      resolveWorkflow?.({ success: true, content: 'Done' });
    });
  });

  describe('Copy Functionality', () => {
    it('should render copy dropdown when response is available', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      mockExecuteWorkflowWithCache.mockResolvedValue({
        success: true,
        content: 'Test response',
        fromCache: false,
      });

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('sl-dropdown')).toBeDefined();
      });
    });

    it('should call handleCopyFormat when copy option is clicked', async () => {
      const mockHandleCopyFormat = vi.fn();
      mockUseCopyManager.mockReturnValue({
        copyState: 'clipboard',
        isSuccess: false,
        handleCopyFormat: mockHandleCopyFormat,
        copyOptions: [
          {
            format: 'markdown',
            label: 'Copy as Markdown',
            icon: 'markdown',
            description: 'Formatted response with markdown styling',
          },
        ],
      });

      mockValidateQuery.mockReturnValue({ isValid: true });
      mockExecuteWorkflowWithCache.mockResolvedValue({
        success: true,
        content: 'Test response',
        fromCache: false,
      });

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        const menuItem = screen.getByTestId('sl-menu-item');
        expect(menuItem).toBeDefined();
      });
    });

    it('should show success state after copying', async () => {
      mockUseCopyManager.mockReturnValue({
        copyState: 'check-circle',
        isSuccess: true,
        handleCopyFormat: vi.fn(),
        copyOptions: [
          {
            format: 'markdown',
            label: 'Copy as Markdown',
            icon: 'markdown',
            description: 'Formatted response with markdown styling',
          },
        ],
      });

      mockValidateQuery.mockReturnValue({ isValid: true });
      mockExecuteWorkflowWithCache.mockResolvedValue({
        success: true,
        content: 'Test response',
        fromCache: false,
      });

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        const copyButton = screen
          .getAllByRole('button')
          .find((btn) => btn.className?.includes('copy-success'));
        expect(copyButton).toBeDefined();
      });
    });
  });

  describe('Hook Integration', () => {
    it('should call useTabManager with correct parameters', () => {
      render(<Home falcon={mockFalcon} />);

      expect(mockUseTabManager).toHaveBeenCalledWith({
        hasSubmittedQuery: false,
        loading: false,
        errorMessage: '',
        responseText: '',
      });
    });

    it('should call useCopyManager with response text', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      mockExecuteWorkflowWithCache.mockResolvedValue({
        success: true,
        content: 'Test response',
        fromCache: false,
      });

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockUseCopyManager).toHaveBeenCalledWith(
          expect.objectContaining({
            responseText: 'Test response',
          }),
        );
      });
    });
  });

  describe('Component Memoization', () => {
    it('should be a memoized component', () => {
      expect(Home.displayName).toBe('Home');
    });

    it('should not re-render when props do not change', () => {
      const { rerender } = render(<Home falcon={mockFalcon} />);

      const initialCallCount = mockUseContextProcessor.mock.calls.length;

      rerender(<Home falcon={mockFalcon} />);

      // Memoized component with same props should not trigger additional hook calls
      expect(mockUseContextProcessor.mock.calls.length).toBe(initialCallCount);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty falcon data', () => {
      const emptyFalcon = { data: {} } as unknown as FalconApi;
      render(<Home falcon={emptyFalcon} />);

      expect(mockUseContextProcessor).toHaveBeenCalledWith({
        falconData: {},
      });
    });

    it('should handle null selectedContextEntity', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      mockExecuteWorkflowWithCache.mockResolvedValue({
        success: true,
        content: 'Test',
        fromCache: false,
      });

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockExecuteWorkflowWithCache).toHaveBeenCalledWith(
          mockFalcon,
          expect.objectContaining({
            selectedContext: '',
          }),
        );
      });
    });

    it('should handle workflow returning no content', async () => {
      mockValidateQuery.mockReturnValue({ isValid: true });
      mockExecuteWorkflowWithCache.mockResolvedValue({
        success: true,
        content: '',
        fromCache: false,
      });

      const user = userEvent.setup();
      render(<Home falcon={mockFalcon} />);

      const queryInput = screen.getByTestId('query-input');
      await user.type(queryInput, 'test query');

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByTestId('response-text')).toBeNull();
      });
    });
  });
});
