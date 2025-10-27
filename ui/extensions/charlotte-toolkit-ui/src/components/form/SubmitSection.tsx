// Submit section with quota acknowledgment and submit button

import {
  SlButton,
  SlCheckbox,
  SlIcon,
} from '@shoelace-style/shoelace/dist/react';
import type React from 'react';

interface SubmitSectionProps {
  quotaAcknowledged: boolean;
  setQuotaAcknowledged: (quotaAcknowledged: boolean) => void;
  loading: boolean;
  query: string;
  handleSubmit: () => void;
}

const SubmitSection: React.FC<SubmitSectionProps> = ({
  quotaAcknowledged,
  setQuotaAcknowledged,
  loading,
  query,
  handleSubmit,
}) => {
  // More explicit disabled check
  const isQueryEmpty = !query || query.trim() === '';
  const isDisabled = loading || isQueryEmpty || !quotaAcknowledged;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-xl)',
      }}
    >
      <SlCheckbox
        size="small"
        checked={quotaAcknowledged}
        onSlChange={(e: CustomEvent) =>
          setQuotaAcknowledged((e.target as HTMLInputElement).checked)
        }
      >
        I understand this will use Charlotte AI credits
      </SlCheckbox>

      <SlButton
        variant="primary"
        size="medium"
        disabled={isDisabled}
        onClick={handleSubmit}
      >
        <SlIcon slot="prefix" name={loading ? 'hourglass-split' : 'send'} />
        {loading ? 'Analyzing...' : 'Analyze with Charlotte'}
      </SlButton>
    </div>
  );
};

export default SubmitSection;
