// Advanced options panel component

import {
  SlButton,
  SlCheckbox,
  SlDetails,
  SlIcon,
  SlInput,
  SlOption,
  SlSelect,
  SlTextarea,
  SlTooltip,
} from '@shoelace-style/shoelace/dist/react';
import type React from 'react';
import { useState } from 'react';

import { TEMPERATURE_OPTIONS } from '../../utils/constants';

interface AdvancedOptionsPanelProps {
  showJsonTab: boolean;
  setShowJsonTab: (showJsonTab: boolean) => void;
  temperature: number;
  setTemperature: (temperature: number) => void;
  stopWords: string[];
  setStopWords: (stopWords: string[]) => void;
  jsonSchema: string;
  setJsonSchema: (jsonSchema: string) => void;
  dataToInclude: string[];
  setDataToInclude: (dataToInclude: string[]) => void;
}

const AdvancedOptionsPanel: React.FC<AdvancedOptionsPanelProps> = ({
  showJsonTab,
  setShowJsonTab,
  temperature,
  setTemperature,
  stopWords,
  setStopWords,
  jsonSchema,
  setJsonSchema,
  dataToInclude,
  setDataToInclude,
}) => {
  // State for stop words input
  const [stopWordsInput, setStopWordsInput] = useState('');

  // State for data to include input
  const [dataToIncludeInput, setDataToIncludeInput] = useState('');

  // Handle adding stop words
  const handleAddStopWord = () => {
    if (stopWordsInput.trim() && stopWords.length < 4) {
      setStopWords([...stopWords, stopWordsInput.trim()]);
      setStopWordsInput('');
    }
  };

  // Handle removing stop words
  const handleRemoveStopWord = (index: number) => {
    setStopWords(stopWords.filter((_, i) => i !== index));
  };

  // Handle adding data to include
  const handleAddDataToInclude = () => {
    if (dataToIncludeInput.trim()) {
      setDataToInclude([...dataToInclude, dataToIncludeInput.trim()]);
      setDataToIncludeInput('');
    }
  };

  // Handle removing data to include
  const handleRemoveDataToInclude = (index: number) => {
    setDataToInclude(dataToInclude.filter((_, i) => i !== index));
  };

  return (
    <SlDetails summary="Advanced Options" className="advanced-options-subtle">
      <div className="flex flex-col gap-4 mt-3">
        {/* Show JSON Tab - Moved to Top */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <SlCheckbox
              checked={showJsonTab}
              onSlChange={(e: CustomEvent) =>
                setShowJsonTab((e.target as HTMLInputElement).checked)
              }
            >
              Show JSON objects
            </SlCheckbox>
          </div>
          <SlTooltip content="Enable a JSON tab in the response to view complete request and response data for analysis and troubleshooting.">
            <SlIcon
              name="question-circle"
              className="cursor-help"
              style={{ color: `var(--cs-text-secondary)` }}
            />
          </SlTooltip>
        </div>

        {/* Temperature */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <SlSelect
              label="Temperature"
              value={String(temperature)}
              onSlChange={(e: CustomEvent) =>
                setTemperature(Number.parseFloat((e.target as HTMLSelectElement).value))
              }
            >
              <SlIcon slot="prefix" name="thermometer" />
              {TEMPERATURE_OPTIONS.map((option) => (
                <SlOption key={option.value} value={String(option.value)}>
                  {option.label}
                </SlOption>
              ))}
            </SlSelect>
          </div>
          <SlTooltip content="Controls randomness. Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.">
            <SlIcon
              name="question-circle"
              className="cursor-help"
              style={{ color: `var(--cs-text-secondary)` }}
            />
          </SlTooltip>
        </div>

        {/* Stop Words */}
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Stop Sequences</label>
            {stopWords.length > 0 ? (
              <div
                className="flex flex-wrap gap-2 mb-2 min-h-[32px] p-2 rounded"
                style={{
                  border: `1px solid var(--cs-border-color-light)`,
                  backgroundColor: `var(--cs-background-light)`,
                }}
              >
                {stopWords.map((word, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-2 py-1 rounded text-sm"
                    style={{
                      backgroundColor: 'var(--cs-background-light)',
                      color: `var(--cs-text-primary)`,
                    }}
                  >
                    <span>{word}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveStopWord(index)}
                      className="hover:opacity-80 transition-opacity"
                      style={{ color: `var(--cs-status-info)` }}
                    >
                      <SlIcon name="x" style={{ fontSize: 'var(--font-size-sm)' }} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm mb-2 italic" style={{ color: `var(--cs-text-secondary)` }}>
                Optional: Add stop sequences to control output termination
              </p>
            )}
            {stopWords.length < 4 && (
              <div className="flex gap-2">
                <SlInput
                  placeholder="Enter stop sequence"
                  value={stopWordsInput}
                  onSlInput={(e: CustomEvent) =>
                    setStopWordsInput((e.target as HTMLInputElement).value)
                  }
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddStopWord();
                    }
                  }}
                />
                <SlButton
                  size="small"
                  onClick={handleAddStopWord}
                  disabled={!stopWordsInput.trim()}
                >
                  <SlIcon name="plus" />
                </SlButton>
              </div>
            )}
            {stopWords.length >= 4 && (
              <p className="text-sm" style={{ color: `var(--cs-text-secondary)` }}>
                Maximum 4 stop sequences allowed
              </p>
            )}
          </div>
          <SlTooltip content="Up to 4 sequences where API will stop generating further tokens. The return text will not contain the stop sequence.">
            <SlIcon
              name="question-circle"
              className="cursor-help mt-6"
              style={{ color: `var(--cs-text-secondary)` }}
            />
          </SlTooltip>
        </div>

        {/* JSON Schema */}
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <SlTextarea
              label="JSON Schema"
              value={jsonSchema}
              placeholder="Enter JSON schema to define response structure..."
              rows={4}
              onSlInput={(e: CustomEvent) => setJsonSchema((e.target as HTMLTextAreaElement).value)}
            >
              <SlIcon slot="prefix" name="code-square" />
            </SlTextarea>
          </div>
          <SlTooltip content="JSON schema is used to define the structure of the model's response format.">
            <SlIcon
              name="question-circle"
              className="cursor-help mt-6"
              style={{ color: `var(--cs-text-secondary)` }}
            />
          </SlTooltip>
        </div>

        {/* Data to Include */}
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Data to Include</label>
            {dataToInclude.length > 0 ? (
              <div
                className="flex flex-wrap gap-2 mb-2 min-h-[32px] p-2 rounded"
                style={{
                  border: `1px solid var(--cs-border-color-light)`,
                  backgroundColor: `var(--cs-background-light)`,
                }}
              >
                {dataToInclude.map((data, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-2 py-1 rounded text-sm"
                    style={{
                      backgroundColor: `var(--cs-background-light)`,
                      color: `var(--cs-text-primary)`,
                    }}
                  >
                    <span>{data}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDataToInclude(index)}
                      className="hover:opacity-80 transition-opacity"
                      style={{ color: `var(--cs-status-warning)` }}
                    >
                      <SlIcon name="x" style={{ fontSize: 'var(--font-size-sm)' }} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm mb-2 italic" style={{ color: `var(--cs-text-secondary)` }}>
                Optional: Add custom data to enhance your analysis
              </p>
            )}
            <div className="flex gap-2">
              <SlInput
                placeholder="Enter additional data"
                value={dataToIncludeInput}
                onSlInput={(e: CustomEvent) =>
                  setDataToIncludeInput((e.target as HTMLInputElement).value)
                }
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddDataToInclude();
                  }
                }}
              />
              <SlButton
                size="small"
                onClick={handleAddDataToInclude}
                disabled={!dataToIncludeInput.trim()}
              >
                <SlIcon name="plus" />
              </SlButton>
            </div>
          </div>
          <SlTooltip content="Additional key-value pairs provided from the trigger or preceding action output fields. This data is appended to the user prompt.">
            <SlIcon
              name="question-circle"
              className="cursor-help mt-6"
              style={{ color: `var(--cs-text-secondary)` }}
            />
          </SlTooltip>
        </div>
      </div>
    </SlDetails>
  );
};

export default AdvancedOptionsPanel;
