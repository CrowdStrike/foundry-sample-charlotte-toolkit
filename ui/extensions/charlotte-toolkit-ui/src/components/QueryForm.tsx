// Modular QueryForm component using extracted subcomponents

import {
  SlIcon,
  SlOption,
  SlSelect,
} from '@shoelace-style/shoelace/dist/react';
import React from 'react';

import type { ContextOption } from '../types';
import { CHARLOTTE_MODEL_OPTIONS } from '../utils/constants';

// Import modular subcomponents
import AdvancedOptionsPanel from './form/AdvancedOptionsPanel';
import ContextEntitySelector from './form/ContextEntitySelector';
import PromptTextarea from './form/PromptTextarea';
import SubmitSection from './form/SubmitSection';

interface QueryFormProps {
  query: string;
  setQuery: (query: string) => void;
  modelName: string;
  setModelName: (modelName: string) => void;
  temperature: number;
  setTemperature: (temperature: number) => void;
  loading: boolean;
  handleSubmit: () => void;
  selectedContextEntity: string | null;
  setSelectedContextEntity: (selectedContextEntity: string | null) => void;
  availableContextOptions: ContextOption[];
  showJsonTab: boolean;
  setShowJsonTab: (showJsonTab: boolean) => void;
  quotaAcknowledged: boolean;
  setQuotaAcknowledged: (quotaAcknowledged: boolean) => void;
}

const QueryForm = React.memo(
  ({
    query,
    setQuery,
    modelName,
    setModelName,
    temperature,
    setTemperature,
    loading,
    handleSubmit,
    selectedContextEntity,
    setSelectedContextEntity,
    availableContextOptions,
    showJsonTab,
    setShowJsonTab,
    quotaAcknowledged,
    setQuotaAcknowledged,
  }: QueryFormProps) => {
    const handleModelChange = (e: CustomEvent) => {
      const target = e.target as HTMLSelectElement;
      setModelName(target.value);
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-xl)',
        }}
      >
        {/* Context Entity Selection */}
        <ContextEntitySelector
          selectedContextEntity={selectedContextEntity}
          setSelectedContextEntity={setSelectedContextEntity}
          availableContextOptions={availableContextOptions}
          setQuery={setQuery}
        />

        {/* Prompt Input */}
        <PromptTextarea query={query} setQuery={setQuery} />

        {/* Model Selection */}
        <SlSelect
          label="Model"
          defaultValue={modelName}
          value={modelName}
          onSlChange={handleModelChange}
        >
          <SlIcon slot="prefix" name="cpu" />
          {CHARLOTTE_MODEL_OPTIONS.map((option) => (
            <SlOption key={option.value} value={option.value}>
              {option.label}
            </SlOption>
          ))}
        </SlSelect>

        {/* Submit Section */}
        <SubmitSection
          quotaAcknowledged={quotaAcknowledged}
          setQuotaAcknowledged={setQuotaAcknowledged}
          loading={loading}
          query={query}
          handleSubmit={handleSubmit}
        />

        {/* Advanced Options Panel */}
        <AdvancedOptionsPanel
          showJsonTab={showJsonTab}
          setShowJsonTab={setShowJsonTab}
          temperature={temperature}
          setTemperature={setTemperature}
        />
      </div>
    );
  },
);

QueryForm.displayName = 'QueryForm';

export default QueryForm;
