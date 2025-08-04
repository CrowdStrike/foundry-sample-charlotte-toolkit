// src/components/security/IOCDisplay.tsx

import { SlButton, SlIcon, SlTooltip } from '@shoelace-style/shoelace/dist/react';
import React, { useState, useCallback } from 'react';

import type { IOCs } from '../../types/security';
import { IOCCore } from '../../utils/security/iocCore';

interface IOCDisplayProps {
  iocs: IOCs;
}

export const IOCDisplay: React.FC<IOCDisplayProps> = ({ iocs }) => {
  const [copyStates, setCopyStates] = useState<Record<string, boolean>>({});

  const copyIOC = useCallback(async (ioc: string, type: string) => {
    try {
      await navigator.clipboard.writeText(ioc);
      setCopyStates(prev => ({ ...prev, [`${type}-${ioc}`]: true }));
      setTimeout(() => {
        setCopyStates(prev => ({ ...prev, [`${type}-${ioc}`]: false }));
      }, 2000);
    } catch {
      // console.error('Copy failed:', e);
    }
  }, []);

  const renderIOCList = (items: string[] | undefined, type: string) => {
    if (!items || items.length === 0) return null;

    return (
      <div className='ioc-section-spacing'>
        <div className='ioc-type-header'>
          <span className='text-sm font-semibold'>
            {type.toUpperCase()}S ({items.length})
          </span>
        </div>
        <div className='space-y-2'>
          {items.map((item, index) => {
            // Defang IOCs for display (but keep original for copying)
            const defangedItem = IOCCore.defang(item);

            return (
              <div key={index} className='ioc-value-item'>
                <div className='flex items-center gap-1 p-0'>
                  <code className='flex-1 text-xs font-mono min-w-0 break-all'>{defangedItem}</code>
                  <SlTooltip
                    content={
                      copyStates[`${type}-${item}`]
                        ? 'Copied to clipboard!'
                        : `Copy ${type} to clipboard for further analysis`
                    }
                    placement='top'
                    distance={8}
                    hoist
                  >
                    <SlButton
                      size='small'
                      variant='text'
                      onClick={() => copyIOC(item, type)}
                      className='compact-copy-btn ioc-copy-btn flex-shrink-0'
                    >
                      <SlIcon
                        name={copyStates[`${type}-${item}`] ? 'check-circle' : 'clipboard'}
                        className={
                          copyStates[`${type}-${item}`] ? 'copy-success' : 'secondary-text'
                        }
                      />
                    </SlButton>
                  </SlTooltip>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderIOCList(iocs.hashes, 'hash')}
      {renderIOCList(iocs.ips, 'ip')}
      {renderIOCList(iocs.domains, 'domain')}
      {renderIOCList(iocs.urls, 'url')}
      {renderIOCList(iocs.file_paths, 'path')}
    </div>
  );
};
