// src/hooks/useJsonDataManager.ts

import { useCallback, useEffect, useState } from 'react';

import type { ContextOption } from '../types';
import { detectCurrentSocket, type SocketInfo } from '../utils/socketDetection';
import { useCopyToClipboard } from './useCopyToClipboard';

type JsonContextData = {
  falcon_context: {
    socket_info: SocketInfo;
    falcon_object: {
      full_data: unknown;
      data_structure: string[];
      incident: unknown;
      detection: unknown;
      available_entities: ContextOption[];
      entity_counts: {
        total_entities: number;
        domains: number;
        files: number;
        ips: number;
        fqdns: number;
      };
    };
  };
  request_data?: {
    timestamp: string;
    parameters: {
      query: string;
      model: string;
      temperature: number;
      stopWords: string[];
      jsonSchema: string;
      dataToInclude: string[];
      selectedContext: string;
    };
  };
  response_data?: {
    timestamp: string;
    execution_time_ms: number;
    success: boolean;
    from_cache: boolean;
    content: string | null;
    content_length: number;
    error: string | null;
    workflow_result: unknown;
  };
};

type RequestParams = {
  query: string;
  model: string;
  temperature: number;
  stopWords: string[];
  jsonSchema: string;
  dataToInclude: string[];
  selectedContext: string;
};

type ResponseData = {
  executionEndTime: string;
  executionStartTime: string;
  success: boolean;
  fromCache?: boolean | undefined;
  content?: string | undefined;
  error?: string | undefined;
  workflowResult?: unknown;
};

type UseJsonDataManagerProps = {
  falconData: unknown;
  availableContextOptions: ContextOption[];
  contextCounts: {
    total: number;
    domains: number;
    files: number;
    ips: number;
    fqdns: number;
  };
};

type UseJsonDataManagerResult = {
  jsonContextData: JsonContextData | null;
  initializeRequestData: (requestParams: RequestParams) => JsonContextData;
  updateRequestData: (requestParams: RequestParams) => void;
  updateResponseData: (responseData: ResponseData) => void;
  copyFalconContext: () => Promise<void>;
  copyRequestData: () => Promise<void>;
  copyResponseData: () => Promise<void>;
  copyRawResponse: () => Promise<void>;
  // Copy states for visual feedback
  contextCopyState: 'clipboard' | 'check-circle';
  requestCopyState: 'clipboard' | 'check-circle';
  responseCopyState: 'clipboard' | 'check-circle';
  rawResponseCopyState: 'clipboard' | 'check-circle';
};

/**
 * Custom hook to manage JSON context data for the application
 * Handles Falcon context, request data, and response data with enhanced copy functionality
 */
export const useJsonDataManager = ({
  falconData,
  availableContextOptions,
  contextCounts,
}: UseJsonDataManagerProps): UseJsonDataManagerResult => {
  const [jsonContextData, setJsonContextData] = useState<JsonContextData | null>(null);

  // Individual copy hooks for visual feedback
  const { copyState: contextCopyState, copyToClipboard: copyContextToClipboard } =
    useCopyToClipboard();
  const { copyState: requestCopyState, copyToClipboard: copyRequestToClipboard } =
    useCopyToClipboard();
  const { copyState: responseCopyState, copyToClipboard: copyResponseToClipboard } =
    useCopyToClipboard();
  const { copyState: rawResponseCopyState, copyToClipboard: copyRawResponseToClipboard } =
    useCopyToClipboard();

  // Initialize falcon context data when component mounts
  useEffect(() => {
    if (falconData) {
      // Detect current socket information
      const socketInfo = detectCurrentSocket(falconData);

      const falconContextData = {
        socket_info: socketInfo,
        falcon_object: {
          full_data: falconData,
          data_structure:
            falconData && typeof falconData === 'object' ? Object.keys(falconData) : [],
          incident: (falconData as Record<string, unknown>)?.incident ?? null,
          detection: (falconData as Record<string, unknown>)?.detection ?? null,
          available_entities: availableContextOptions,
          entity_counts: {
            total_entities: contextCounts.total,
            domains: contextCounts.domains,
            files: contextCounts.files,
            ips: contextCounts.ips,
            fqdns: contextCounts.fqdns,
          },
        },
      };

      const initialJsonContext: JsonContextData = {
        falcon_context: falconContextData,
      };

      setJsonContextData(initialJsonContext);
    }
  }, [falconData, availableContextOptions, contextCounts]);

  // Initialize request data and return updated context
  const initializeRequestData = useCallback(
    (requestParams: RequestParams): JsonContextData => {
      const executionStartTime = new Date().toISOString();

      if (!jsonContextData) {
        throw new Error('Cannot initialize request data: jsonContextData is null');
      }

      // Create the updated context directly
      const updatedContext: JsonContextData = {
        ...jsonContextData,
        request_data: {
          timestamp: executionStartTime,
          parameters: requestParams,
        },
      };

      // Update state with the new context
      setJsonContextData(updatedContext);

      // Return the context immediately for synchronous use
      return updatedContext;
    },
    [jsonContextData],
  );

  // Update request data in real-time (preserves existing timestamp)
  const updateRequestData = useCallback((requestParams: RequestParams) => {
    setJsonContextData((prevState) => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        request_data: {
          timestamp: prevState.request_data?.timestamp ?? '', // Don't generate new timestamp during updates
          parameters: requestParams,
        },
      };
    });
  }, []);

  // Update response data
  const updateResponseData = useCallback((responseData: ResponseData) => {
    setJsonContextData((prevState) => {
      if (!prevState) {
        return prevState;
      }

      const newResponseData = {
        timestamp: responseData.executionEndTime,
        execution_time_ms:
          new Date(responseData.executionEndTime).getTime() -
          new Date(responseData.executionStartTime).getTime(),
        success: responseData.success,
        from_cache: responseData.fromCache ?? false,
        content: responseData.content ?? null,
        content_length: responseData.content?.length ?? 0,
        error: responseData.error ?? null,
        workflow_result: responseData.workflowResult,
      };

      return {
        ...prevState,
        response_data: newResponseData,
      };
    });
  }, []);

  // Copy falcon context to clipboard with visual feedback
  const copyFalconContext = useCallback(async () => {
    const falconData = jsonContextData?.falcon_context ?? {};
    await copyContextToClipboard(JSON.stringify(falconData, null, 2));
  }, [jsonContextData, copyContextToClipboard]);

  // Copy request data to clipboard with visual feedback
  const copyRequestData = useCallback(async () => {
    const requestData = jsonContextData?.request_data ?? {};
    await copyRequestToClipboard(JSON.stringify(requestData, null, 2));
  }, [jsonContextData, copyRequestToClipboard]);

  // Copy response metadata to clipboard with visual feedback
  const copyResponseData = useCallback(async () => {
    if (!jsonContextData?.response_data) {
      await copyResponseToClipboard(JSON.stringify({}, null, 2));
      return;
    }

    const responseData = jsonContextData.response_data;
    // Create a copy without the raw content for metadata-only copy
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content: _, ...metadataOnly } = responseData;
    await copyResponseToClipboard(JSON.stringify(metadataOnly, null, 2));
  }, [jsonContextData, copyResponseToClipboard]);

  // Copy raw response content to clipboard with visual feedback
  const copyRawResponse = useCallback(async () => {
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
    rawResponseCopyState,
  };
};
