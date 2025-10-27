// Context entity selection component

import {
  SlBadge,
  SlDivider,
  SlIcon,
  SlOption,
  SlSelect,
  SlTooltip,
} from '@shoelace-style/shoelace/dist/react';
import React from 'react';

import type { ContextOption } from '../../types';
import { formatDisplayName } from '../../utils/context';

interface ContextEntitySelectorProps {
  selectedContextEntity: string | null;
  setSelectedContextEntity: (selectedContextEntity: string | null) => void;
  availableContextOptions: ContextOption[];
  setQuery: (query: string) => void;
}

const ContextEntitySelector: React.FC<ContextEntitySelectorProps> = ({
  selectedContextEntity,
  setSelectedContextEntity,
  availableContextOptions,
  setQuery,
}) => {
  const isContextDisabled = availableContextOptions.length === 0;

  // Get entity counts for badge display
  const getEntityCounts = () => {
    const counts = {
      domain: availableContextOptions.filter((opt) => opt.type === 'domain').length,
      file: availableContextOptions.filter((opt) => opt.type === 'file').length,
      ip: availableContextOptions.filter((opt) => opt.type === 'ip').length,
      mitre: availableContextOptions.filter((opt) => opt.type === 'mitre').length,
    };
    return counts;
  };

  // Helper function to detect if an option is a child item
  const isChildOption = (option: ContextOption): boolean => {
    return !!(
      option.parentFile ??
      option.parentDomain ??
      ['md5', 'sha256', 'fqdn'].includes(option.subType ?? '')
    );
  };

  const handleContextEntityChange = (e: CustomEvent) => {
    const target = e.target as HTMLSelectElement;
    const selectedValue = target.value;

    if (selectedValue) {
      const selectedOption = availableContextOptions.find(
        (option) => option.value === selectedValue,
      );
      if (selectedOption) {
        setSelectedContextEntity(selectedValue);
        setQuery(selectedOption.queryTemplate);
      }
    } else {
      setSelectedContextEntity(null);
    }
  };

  if (isContextDisabled) {
    return (
      <SlTooltip content="No context detected for this incident">
        <div className="opacity-60 cursor-not-allowed">
          <SlSelect label="Incident Context" value="" disabled={true}>
            <SlIcon slot="prefix" name="layers" />
            <SlOption value="" disabled>
              No entities available
            </SlOption>
          </SlSelect>
        </div>
      </SlTooltip>
    );
  }

  const entityCounts = getEntityCounts();

  return (
    <SlSelect
      label="Incident Context"
      value={selectedContextEntity ?? ''}
      onSlChange={handleContextEntityChange}
    >
      <SlIcon slot="prefix" name="layers" />

      <SlOption value="">None Selected</SlOption>

      {/* Group by entity type using proper Shoelace grouping */}
      {['domain', 'file', 'ip', 'mitre'].map((type, index) => {
        const optionsOfType = availableContextOptions.filter((option) => option.type === type);
        if (optionsOfType.length === 0) return null;

        const groupConfig = {
          domain: { name: 'Domains', icon: 'shield-exclamation' },
          file: { name: 'Files', icon: 'file-lock' },
          ip: { name: 'IP Addresses', icon: 'router-fill' },
          mitre: { name: 'MITRE ATT&CK', icon: 'shield-exclamation' },
        }[type];

        if (!groupConfig) return null;
        const count = entityCounts[type as keyof typeof entityCounts];

        return (
          <React.Fragment key={type}>
            {/* Add divider before each group except the first */}
            {index > 0 && <SlDivider />}

            {/* Group header using <small> as recommended by Shoelace */}
            <small className="context-group-header">
              <SlIcon name={groupConfig.icon} className="mr-2" />
              {groupConfig.name}
              <SlBadge className="ml-2 context-entity-badge">{count}</SlBadge>
            </small>

            {/* Group options */}
            {optionsOfType.map((option) => (
              <SlOption
                key={option.value}
                value={option.value}
                className={isChildOption(option) ? 'child-option' : ''}
              >
                {/* Icons for ALL child entries */}
                {(option.subType === 'md5' || option.subType === 'sha256') && (
                  <SlIcon slot="prefix" name="fingerprint" />
                )}
                {option.subType === 'fqdn' && <SlIcon slot="prefix" name="globe" />}
                {option.subType === 'tld' && <SlIcon slot="prefix" name="shield-exclamation" />}
                {option.subType === 'filename' && <SlIcon slot="prefix" name="file-earmark" />}
                {option.subType === 'technique' && (
                  <SlIcon slot="prefix" name="shield-exclamation" />
                )}

                {/* Icons for individual entries without subtypes */}
                {option.type === 'ip' && !option.subType && <SlIcon slot="prefix" name="router" />}
                {option.type === 'domain' && !option.subType && (
                  <SlIcon slot="prefix" name="shield-exclamation" />
                )}
                {option.type === 'mitre' && !option.subType && (
                  <SlIcon slot="prefix" name="shield-exclamation" />
                )}
                {option.type === 'file' && !option.subType && (
                  <SlIcon slot="prefix" name="file-lock" />
                )}

                {(() => {
                  try {
                    const result = formatDisplayName(option);
                    if (!result || typeof result !== 'object') {
                      return <span>{option.displayName}</span>;
                    }
                    const { displayText, originalText } = result;
                    return (
                      <SlTooltip content={originalText} placement="right" distance={8}>
                        <span>{displayText}</span>
                      </SlTooltip>
                    );
                  } catch (_error) {
                    return <span>{option.displayName}</span>;
                  }
                })()}
              </SlOption>
            ))}
          </React.Fragment>
        );
      })}
    </SlSelect>
  );
};

export default ContextEntitySelector;
