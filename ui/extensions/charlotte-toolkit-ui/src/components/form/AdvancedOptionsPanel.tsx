// Advanced options panel component

import {
  SlCheckbox,
  SlDetails,
  SlIcon,
  SlOption,
  SlSelect,
} from '@shoelace-style/shoelace/dist/react';
import type React from 'react';

import { TEMPERATURE_OPTIONS } from '../../utils/constants';

interface AdvancedOptionsPanelProps {
  showJsonTab: boolean;
  setShowJsonTab: (showJsonTab: boolean) => void;
  temperature: number;
  setTemperature: (temperature: number) => void;
}

const AdvancedOptionsPanel: React.FC<AdvancedOptionsPanelProps> = ({
  showJsonTab,
  setShowJsonTab,
  temperature,
  setTemperature,
}) => {
  return (
    <SlDetails summary="Advanced Options" className="advanced-options-subtle">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-xl)',
        }}
      >
        {/* Show JSON Tab */}
        <SlCheckbox
          checked={showJsonTab}
          onSlChange={(e: CustomEvent) =>
            setShowJsonTab((e.target as HTMLInputElement).checked)
          }
        >
          Show JSON objects
        </SlCheckbox>

        {/* Temperature */}
        <SlSelect
          label="Temperature"
          value={String(temperature)}
          onSlChange={(e: CustomEvent) =>
            setTemperature(
              Number.parseFloat((e.target as HTMLSelectElement).value),
            )
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
    </SlDetails>
  );
};

export default AdvancedOptionsPanel;
