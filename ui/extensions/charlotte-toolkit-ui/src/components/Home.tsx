// src/components/Home.tsx

import {
  SlButton,
  SlCard,
  SlDropdown,
  SlIcon,
  SlMenu,
  SlMenuItem,
  SlTab,
  SlTabGroup,
  SlTabPanel,
} from '@shoelace-style/shoelace/dist/react';
import React, { useCallback, useEffect, useState } from 'react';

import { useContextProcessor } from '../hooks/useContextProcessor';
import { useCopyManager } from '../hooks/useCopyManager';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useJsonDataManager } from '../hooks/useJsonDataManager';
import { useTabManager } from '../hooks/useTabManager';
import {
  executeWorkflowWithCache,
  type WorkflowExecutionParams,
  type WorkflowExecutionResult,
} from '../services/workflow';
import {
  DEFAULT_DATA_TO_INCLUDE,
  DEFAULT_JSON_SCHEMA,
  DEFAULT_MODEL,
  DEFAULT_STOP_WORDS,
  DEFAULT_TEMPERATURE,
  getModelLabel,
} from '../utils/constants';
import { formatErrorMessage, validateQuery } from '../utils/helpers';

import QueryForm from './QueryForm';
import ResponseDisplay from './ResponseDisplay';

interface HomeProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  falcon: any; // Complex Falcon API types - any is appropriate here
}

interface HomeState {
  query: string;
  modelName: string;
  temperature: number;
  stopWords: string[];
  jsonSchema: string;
  dataToInclude: string[];
  responseText: string;
  status: string;
  loading: boolean;
  errorMessage: string;
  hasSubmittedQuery: boolean;
  selectedContextEntity: string | null;
  showJsonTab: boolean;
  quotaAcknowledged: boolean;
  executionStartTime: string | null;
  executionEndTime: string | null;
}

const Home = React.memo(({ falcon }: HomeProps) => {
  const [state, setState] = useState<HomeState>({
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
    executionEndTime: null,
  });

  // Use custom hooks for modular functionality
  const { availableContextOptions } = useContextProcessor({ falconData: falcon?.data });

  // Calculate context counts for the JSON manager
  const contextCounts = {
    total: availableContextOptions.length,
    domains: availableContextOptions.filter((opt) => opt.type === 'domain').length,
    files: availableContextOptions.filter((opt) => opt.type === 'file').length,
    ips: availableContextOptions.filter((opt) => opt.type === 'ip').length,
    fqdns: availableContextOptions.filter((opt) => opt.type === 'domain' && opt.subType === 'fqdn')
      .length,
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
    requestCopyState,
  } = useJsonDataManager({
    falconData: falcon?.data,
    availableContextOptions,
    contextCounts,
  });

  // Use tab manager hook
  const {
    tabGroupRef: tabGroupRefFromHook,
    handleTabChange,
    setActiveTab,
    getResponseTabIndicator,
  } = useTabManager({
    hasSubmittedQuery: state.hasSubmittedQuery,
    loading: state.loading,
    errorMessage: state.errorMessage,
    responseText: state.responseText,
  });

  // Use copy manager hook for Response tab copy functionality
  const { copyState, handleCopyFormat, copyOptions } = useCopyManager({
    responseText: state.responseText,
    jsonContextData,
  });

  // Additional copy hook for Raw Response in JSON tab
  const { copyState: rawResponseCopyState, copyToClipboard: copyRawResponse } =
    useCopyToClipboard();

  const updateState = useCallback((updates: Partial<HomeState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Use the tab manager's ref instead of our local ref
  // The useTabManager hook handles tab switching internally

  // Update request data in real-time whenever query parameters change
  useEffect(() => {
    if (
      jsonContextData &&
      (state.query ||
        state.modelName ||
        state.temperature ||
        state.jsonSchema ||
        state.selectedContextEntity)
    ) {
      const requestParams = {
        query: state.query,
        model: getModelLabel(state.modelName),
        temperature: state.temperature,
        stopWords: state.stopWords,
        jsonSchema: state.jsonSchema,
        dataToInclude: state.dataToInclude,
        selectedContext: state.selectedContextEntity ?? '',
      };

      updateRequestData(requestParams);
    }
  }, [
    state.query,
    state.modelName,
    state.temperature,
    state.stopWords,
    state.jsonSchema,
    state.dataToInclude,
    state.selectedContextEntity,
    jsonContextData,
    updateRequestData,
  ]);

  const handleSubmit = useCallback(async () => {
    // Validate input
    const validation = validateQuery(state.query);
    if (!validation.isValid) {
      setState((prev) => ({
        ...prev,
        errorMessage: validation.error ?? 'Invalid query',
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
      selectedContext: state.selectedContextEntity ?? '',
    };

    initializeRequestData(requestParams);

    setState((prev) => ({
      ...prev,
      hasSubmittedQuery: true,
      loading: true,
      status: 'Gathering details...',
      responseText: '',
      errorMessage: '',
    }));

    // Automatically switch to response tab
    setActiveTab('response');

    try {
      // Build workflow execution parameters
      const workflowParameters: WorkflowExecutionParams = {
        query: state.query,
        model: getModelLabel(state.modelName), // Convert internal value to display label for workflow
        temperature: state.temperature,
        stopWords: state.stopWords,
        jsonSchema: state.jsonSchema,
        dataToInclude: state.dataToInclude,
        selectedContext: state.selectedContextEntity ?? '',
        enableCaching: false,
      };

      // Execute workflow using the workflowExecutor
      const result: WorkflowExecutionResult = await executeWorkflowWithCache(
        falcon,
        workflowParameters,
      );
      const executionEndTime = new Date().toISOString();

      // Update JSON context data with response
      updateResponseData({
        executionEndTime,
        executionStartTime,
        success: result.success,
        fromCache: result.fromCache,
        content: result.content,
        error: result.error,
        workflowResult: result,
      });

      if (result.success && result.content) {
        setState((prev) => ({
          ...prev,
          responseText: result.content ?? '',
          status: result.fromCache ? 'Done (cached)' : 'Done',
          loading: false,
          errorMessage: '',
          quotaAcknowledged: false, // Reset checkbox after successful submission
          executionStartTime,
          executionEndTime,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          responseText: '',
          errorMessage: result.error ?? 'Unknown error occurred',
          status: 'Error',
          loading: false,
          executionStartTime,
          executionEndTime,
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
            stack: e instanceof Error ? e.stack : null,
          },
        },
      });

      setState((prev) => ({
        ...prev,
        responseText: '',
        errorMessage: `Error: ${errorMessage}`,
        status: 'Error',
        loading: false,
        executionStartTime,
        executionEndTime,
      }));
    }
  }, [
    state.query,
    state.modelName,
    state.temperature,
    state.stopWords,
    state.jsonSchema,
    state.dataToInclude,
    state.selectedContextEntity,
    falcon,
    initializeRequestData,
    updateResponseData,
    setActiveTab,
  ]);

  return (
    <div className="w-full py-2">
      <SlCard className="full-width-card">
        <SlTabGroup ref={tabGroupRefFromHook} placement="top" onSlTabShow={handleTabChange}>
          <SlTab slot="nav" panel="request">
            <SlIcon name="pencil" className="mr-2" />
            Request
          </SlTab>
          <SlTab
            slot="nav"
            panel="response"
            disabled={!state.hasSubmittedQuery}
            className={!state.hasSubmittedQuery ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {getResponseTabIndicator()}
            Response
          </SlTab>

          {state.showJsonTab ? (
            <SlTab slot="nav" panel="json">
              <SlIcon name="code-square" className="mr-2" />
              JSON
            </SlTab>
          ) : null}

          <SlTabPanel name="request">
            <QueryForm
              query={state.query}
              setQuery={(query: string) => updateState({ query })}
              modelName={state.modelName}
              setModelName={(modelName: string) => updateState({ modelName })}
              temperature={state.temperature}
              setTemperature={(temperature: number) => updateState({ temperature })}
              stopWords={state.stopWords}
              setStopWords={(stopWords: string[]) => updateState({ stopWords })}
              jsonSchema={state.jsonSchema}
              setJsonSchema={(jsonSchema: string) => updateState({ jsonSchema })}
              dataToInclude={state.dataToInclude}
              setDataToInclude={(dataToInclude: string[]) => updateState({ dataToInclude })}
              loading={state.loading}
              handleSubmit={handleSubmit}
              selectedContextEntity={state.selectedContextEntity}
              setSelectedContextEntity={(selectedContextEntity: string | null) =>
                updateState({ selectedContextEntity })
              }
              availableContextOptions={availableContextOptions}
              showJsonTab={state.showJsonTab}
              setShowJsonTab={(showJsonTab: boolean) => updateState({ showJsonTab })}
              quotaAcknowledged={state.quotaAcknowledged}
              setQuotaAcknowledged={(quotaAcknowledged: boolean) =>
                updateState({ quotaAcknowledged })
              }
            />
          </SlTabPanel>

          <SlTabPanel name="response">
            <div className="flex flex-col">
              {/* Response Header with Copy Button */}
              {state.responseText && !state.loading && !state.errorMessage && (
                <div className="flex justify-end mb-2">
                  <SlDropdown>
                    <SlButton
                      slot="trigger"
                      size="small"
                      variant="text"
                      caret
                      className={`compact-copy-btn ${
                        copyState === 'check-circle'
                          ? 'copy-success transition-colors duration-200'
                          : 'text-body-and-labels'
                      }`}
                    >
                      <SlIcon name={copyState} />
                    </SlButton>
                    <SlMenu>
                      {copyOptions.map((option) => (
                        <SlMenuItem
                          key={option.format}
                          onClick={() => handleCopyFormat(option.format)}
                        >
                          <SlIcon slot="prefix" name={option.icon} />
                          <span className="ml-2">{option.label}</span>
                        </SlMenuItem>
                      ))}
                    </SlMenu>
                  </SlDropdown>
                </div>
              )}

              {/* Response Content */}
              <ResponseDisplay
                loading={state.loading}
                responseText={state.responseText}
                errorMessage={state.errorMessage}
              />
            </div>
          </SlTabPanel>

          {state.showJsonTab ? (
            <SlTabPanel name="json">
              <div className="json-tab-section">
                {/* Socket Information Section */}
                {jsonContextData?.falcon_context.socket_info && (
                  <div>
                    <div className="json-section-header">
                      <h3 className="json-section-title">
                        <SlIcon name="diagram-3" />
                        Socket Information
                      </h3>
                    </div>

                    <div className="socket-info-container">
                      <div className="socket-info-grid">
                        <div className="socket-info-row">
                          <span className="socket-info-label">Current Socket:</span>
                          <span
                            className={
                              jsonContextData.falcon_context.socket_info.detected
                                ? 'socket-badge-detected'
                                : 'socket-badge-unknown'
                            }
                          >
                            {jsonContextData.falcon_context.socket_info.detected
                              ? jsonContextData.falcon_context.socket_info.socket
                              : 'Unknown'}
                          </span>
                        </div>
                        <div className="socket-info-row">
                          <span className="socket-info-label">Page:</span>
                          <span className="socket-info-text">
                            {jsonContextData.falcon_context.socket_info.displayName}
                          </span>
                        </div>
                        <div className="socket-info-row">
                          <span className="socket-info-label">Description:</span>
                          <span className="socket-info-description">
                            {jsonContextData.falcon_context.socket_info.description}
                          </span>
                        </div>
                        <div className="socket-info-row">
                          <span className="socket-info-label">Detection Method:</span>
                          <span className="socket-info-method">
                            {jsonContextData.falcon_context.socket_info.detectionMethod}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Context Section */}
                <div>
                  <div className="json-section-header">
                    <h3 className="json-section-title">
                      <SlIcon name="shield-check" />
                      Context
                    </h3>
                    <SlButton
                      size="small"
                      onClick={copyFalconContext}
                      className={`json-copy-button ${contextCopyState === 'check-circle' ? 'copy-success' : ''}`}
                    >
                      <SlIcon slot="prefix" name={contextCopyState} />
                      {contextCopyState === 'check-circle' ? 'Copied!' : 'Copy Context'}
                    </SlButton>
                  </div>

                  <div className="json-content-container">
                    <pre className="json-content-pre">
                      {jsonContextData?.falcon_context
                        ? JSON.stringify(jsonContextData.falcon_context, null, 2)
                        : 'No Falcon context available'}
                    </pre>
                  </div>
                </div>

                {/* Request Section */}
                <div>
                  <div className="json-section-header">
                    <h3 className="json-section-title">
                      <SlIcon name="arrow-up-circle" />
                      Request
                    </h3>
                    <SlButton
                      size="small"
                      onClick={copyRequestData}
                      className={`json-copy-button ${requestCopyState === 'check-circle' ? 'copy-success' : ''}`}
                    >
                      <SlIcon slot="prefix" name={requestCopyState} />
                      {requestCopyState === 'check-circle' ? 'Copied!' : 'Copy Request'}
                    </SlButton>
                  </div>

                  <div className="json-content-container">
                    <pre className="json-content-pre">
                      {jsonContextData?.request_data
                        ? JSON.stringify(jsonContextData.request_data, null, 2)
                        : 'No request data available - select a query to populate'}
                    </pre>
                  </div>
                </div>

                {/* Raw Response Section */}
                {state.responseText && (
                  <div>
                    <div className="json-section-header">
                      <h3 className="json-section-title">
                        <SlIcon name="file-text" />
                        Raw Response
                      </h3>
                      <SlButton
                        size="small"
                        onClick={() => copyRawResponse(state.responseText)}
                        className={`json-copy-button ${rawResponseCopyState === 'check-circle' ? 'copy-success' : ''}`}
                      >
                        <SlIcon slot="prefix" name={rawResponseCopyState} />
                        {rawResponseCopyState === 'check-circle' ? 'Copied!' : 'Copy Raw Response'}
                      </SlButton>
                    </div>

                    <div className="raw-response-container">
                      <pre className="raw-response-pre">{state.responseText}</pre>
                    </div>
                  </div>
                )}

                {/* Empty response state */}
                {state.hasSubmittedQuery && !state.responseText && !state.loading && (
                  <div className="raw-response-container">
                    <div className="raw-response-empty">No response content available</div>
                  </div>
                )}
              </div>
            </SlTabPanel>
          ) : null}
        </SlTabGroup>
      </SlCard>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
