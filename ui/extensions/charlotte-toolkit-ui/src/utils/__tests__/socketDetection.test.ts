// src/utils/__tests__/socketDetection.test.ts

import {
  detectCurrentSocket,
  getAllAvailableSockets,
  formatSocketInfo,
  type SocketInfo,
} from '../socketDetection';

// Mock window and document objects
const mockWindow = {
  location: {
    href: 'https://falcon.crowdstrike.com/test',
  },
  parent: {
    location: {
      href: 'https://falcon.crowdstrike.com/parent',
    },
  },
  top: {
    location: {
      href: 'https://falcon.crowdstrike.com/top',
    },
  },
};

const mockDocument = {
  title: 'Falcon Console',
};

// Store original values
const originalWindow = global.window;
const originalDocument = global.document;

describe.skip('socketDetection', () => {
  beforeEach(() => {
    // Reset mocks
    Object.defineProperty(global, 'window', {
      value: mockWindow,
      writable: true,
    });
    Object.defineProperty(global, 'document', {
      value: mockDocument,
      writable: true,
    });
  });

  afterEach(() => {
    // Restore originals
    global.window = originalWindow;
    global.document = originalDocument;
  });

  describe('detectCurrentSocket', () => {
    describe('URL-based detection', () => {
      it('should detect activity detections socket from URL', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/activity/detections/details/123';
        
        const result = detectCurrentSocket();
        
        expect(result.socket).toBe('activity.detections.details');
        expect(result.displayName).toBe('Activity Detections');
        expect(result.description).toBe('Activity app detection detail pages');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('URL pattern analysis');
      });

      it('should detect Next-Gen SIEM socket from URL', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/ngsiem/workbench/incident/456';
        
        const result = detectCurrentSocket();
        
        expect(result.socket).toBe('ngsiem.workbench.details');
        expect(result.displayName).toBe('Next-Gen SIEM');
        expect(result.description).toBe('Next-Gen SIEM workbench detail views');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('URL pattern analysis');
      });

      it('should detect XDR detections socket from URL', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/xdr/detections/panel/789';
        
        const result = detectCurrentSocket();
        
        expect(result.socket).toBe('xdr.detections.panel');
        expect(result.displayName).toBe('XDR Detections');
        expect(result.description).toBe('XDR detection panel views');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('URL pattern analysis');
      });

      it('should check parent window URL when current URL does not match', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        mockWindow.parent.location.href = 'https://falcon.crowdstrike.com/activity/detections/details/123';
        
        const result = detectCurrentSocket();
        
        expect(result.socket).toBe('activity.detections.details');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('URL pattern analysis');
      });

      it('should check top window URL when current and parent URLs do not match', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        mockWindow.parent.location.href = 'https://falcon.crowdstrike.com/unknown2';
        mockWindow.top.location.href = 'https://falcon.crowdstrike.com/ngsiem/workbench/incident/456';
        
        const result = detectCurrentSocket();
        
        expect(result.socket).toBe('ngsiem.workbench.details');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('URL pattern analysis');
      });

      it('should handle URL access errors gracefully', () => {
        // Mock URL access to throw error
        Object.defineProperty(mockWindow, 'location', {
          get: () => {
            throw new Error('Access denied');
          },
        });
        
        const result = detectCurrentSocket();
        
        // Should fall back to unknown since URL detection fails
        expect(result.socket).toBe('unknown');
        expect(result.detected).toBe(false);
      });
    });

    describe('Context-based detection', () => {
      it('should detect Next-Gen SIEM from incident data', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        
        const falconData = {
          incident: {
            id: '123',
            name: 'Test Incident',
          },
        };
        
        const result = detectCurrentSocket(falconData);
        
        expect(result.socket).toBe('ngsiem.workbench.details');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('Falcon context analysis');
      });

      it('should detect Next-Gen SIEM from ngsiem data', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        
        const falconData = {
          ngsiem: {
            workbench: true,
          },
        };
        
        const result = detectCurrentSocket(falconData);
        
        expect(result.socket).toBe('ngsiem.workbench.details');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('Falcon context analysis');
      });

      it('should detect activity detections from detection data with activity source', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        
        const falconData = {
          detection: {
            id: '456',
            source: 'activity-detection',
          },
        };
        
        const result = detectCurrentSocket(falconData);
        
        expect(result.socket).toBe('activity.detections.details');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('Falcon context analysis');
      });

      it('should detect XDR detections from detection data with xdr source', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        
        const falconData = {
          detection: {
            id: '789',
            source: 'xdr-detection',
          },
        };
        
        const result = detectCurrentSocket(falconData);
        
        expect(result.socket).toBe('xdr.detections.panel');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('Falcon context analysis');
      });

      it('should detect activity detections from activity context', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        
        const falconData = {
          activity: {
            type: 'detection',
          },
        };
        
        const result = detectCurrentSocket(falconData);
        
        expect(result.socket).toBe('activity.detections.details');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('Falcon context analysis');
      });

      it('should detect XDR detections from xdr context', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        
        const falconData = {
          xdr: {
            detection: true,
          },
        };
        
        const result = detectCurrentSocket(falconData);
        
        expect(result.socket).toBe('xdr.detections.panel');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('Falcon context analysis');
      });

      it('should fallback to activity detections for generic detection data', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        
        const falconData = {
          detection: {
            id: '123',
            // No source specified
          },
        };
        
        const result = detectCurrentSocket(falconData);
        
        expect(result.socket).toBe('activity.detections.details');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('Falcon context analysis');
      });

      it('should handle malformed context data gracefully', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        
        const falconData = {
          detection: {
            source: {
              // Source is object instead of string
              type: 'activity',
            },
          },
        };
        
        const result = detectCurrentSocket(falconData);
        
        // Should not crash and should return fallback
        expect(result.socket).toBe('unknown');
        expect(result.detected).toBe(false);
      });

      it('should handle null/undefined context data', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        
        expect(() => detectCurrentSocket(null)).not.toThrow();
        expect(() => detectCurrentSocket(undefined)).not.toThrow();
        
        const result1 = detectCurrentSocket(null);
        const result2 = detectCurrentSocket(undefined);
        
        expect(result1.socket).toBe('unknown');
        expect(result2.socket).toBe('unknown');
      });
    });

    describe('Title-based detection', () => {
      it('should detect activity detections from document title', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        mockDocument.title = 'Activity Detection Details - Falcon Console';
        
        const result = detectCurrentSocket();
        
        expect(result.socket).toBe('activity.detections.details');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('Document title analysis');
      });

      it('should detect Next-Gen SIEM from document title', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        mockDocument.title = 'SIEM Workbench - Falcon Console';
        
        const result = detectCurrentSocket();
        
        expect(result.socket).toBe('ngsiem.workbench.details');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('Document title analysis');
      });

      it('should detect XDR detections from document title', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        mockDocument.title = 'XDR Detection Panel - Falcon Console';
        
        const result = detectCurrentSocket();
        
        expect(result.socket).toBe('xdr.detections.panel');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('Document title analysis');
      });

      it('should check parent document title when current title does not match', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        mockDocument.title = 'Unknown Page';
        
        // Mock parent document
        const mockParentDocument = {
          title: 'Activity Detection Details - Falcon Console',
        };
        
        Object.defineProperty(mockWindow.parent, 'document', {
          value: mockParentDocument,
          writable: true,
        });
        
        const result = detectCurrentSocket();
        
        expect(result.socket).toBe('activity.detections.details');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('Document title analysis');
      });

      it('should handle document title access errors gracefully', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        
        // Mock document.title to throw error
        Object.defineProperty(mockDocument, 'title', {
          get: () => {
            throw new Error('Access denied');
          },
        });
        
        const result = detectCurrentSocket();
        
        expect(result.socket).toBe('unknown');
        expect(result.detected).toBe(false);
      });
    });

    describe('Fallback behavior', () => {
      it('should return unknown socket when all detection methods fail', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        mockDocument.title = 'Unknown Page';
        
        const result = detectCurrentSocket();
        
        expect(result.socket).toBe('unknown');
        expect(result.displayName).toBe('Unknown Page');
        expect(result.description).toBe('Unable to detect current Falcon Console page');
        expect(result.detected).toBe(false);
        expect(result.detectionMethod).toBe('No detection method successful');
      });

      it('should prioritize URL detection over context detection', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/activity/detections/details/123';
        
        const falconData = {
          ngsiem: {
            workbench: true,
          },
        };
        
        const result = detectCurrentSocket(falconData);
        
        // Should detect from URL, not context
        expect(result.socket).toBe('activity.detections.details');
        expect(result.detectionMethod).toBe('URL pattern analysis');
      });

      it('should prioritize context detection over title detection', () => {
        mockWindow.location.href = 'https://falcon.crowdstrike.com/unknown';
        mockDocument.title = 'Activity Detection Details - Falcon Console';
        
        const falconData = {
          ngsiem: {
            workbench: true,
          },
        };
        
        const result = detectCurrentSocket(falconData);
        
        // Should detect from context, not title
        expect(result.socket).toBe('ngsiem.workbench.details');
        expect(result.detectionMethod).toBe('Falcon context analysis');
      });
    });
  });

  describe('getAllAvailableSockets', () => {
    it('should return all socket configurations', () => {
      const sockets = getAllAvailableSockets();
      
      expect(sockets).toHaveLength(3);
      
      const socketTypes = sockets.map(s => s.socket);
      expect(socketTypes).toContain('activity.detections.details');
      expect(socketTypes).toContain('ngsiem.workbench.details');
      expect(socketTypes).toContain('xdr.detections.panel');
    });

    it('should return sockets with proper structure', () => {
      const sockets = getAllAvailableSockets();
      
      sockets.forEach(socket => {
        expect(socket).toHaveProperty('socket');
        expect(socket).toHaveProperty('displayName');
        expect(socket).toHaveProperty('description');
        expect(socket).toHaveProperty('detected');
        expect(socket).toHaveProperty('detectionMethod');
        
        expect(typeof socket.socket).toBe('string');
        expect(typeof socket.displayName).toBe('string');
        expect(typeof socket.description).toBe('string');
        expect(socket.detected).toBe(false);
        expect(socket.detectionMethod).toBe('Not detected');
      });
    });

    it('should return consistent data', () => {
      const sockets1 = getAllAvailableSockets();
      const sockets2 = getAllAvailableSockets();
      
      expect(sockets1).toEqual(sockets2);
    });
  });

  describe('formatSocketInfo', () => {
    it('should format detected socket info correctly', () => {
      const socketInfo: SocketInfo = {
        socket: 'activity.detections.details',
        displayName: 'Activity Detections',
        description: 'Activity app detection detail pages',
        detected: true,
        detectionMethod: 'URL pattern analysis',
      };
      
      const result = formatSocketInfo(socketInfo);
      
      expect(result).toBe('Socket: Activity Detections (activity.detections.details)');
    });

    it('should format undetected socket info correctly', () => {
      const socketInfo: SocketInfo = {
        socket: 'unknown',
        displayName: 'Unknown Page',
        description: 'Unable to detect current Falcon Console page',
        detected: false,
        detectionMethod: 'No detection method successful',
      };
      
      const result = formatSocketInfo(socketInfo);
      
      expect(result).toBe('Socket: Unknown (No detection method successful)');
    });

    it('should handle empty display name', () => {
      const socketInfo: SocketInfo = {
        socket: 'test.socket',
        displayName: '',
        description: 'Test description',
        detected: true,
        detectionMethod: 'Test method',
      };
      
      const result = formatSocketInfo(socketInfo);
      
      expect(result).toBe('Socket:  (test.socket)');
    });

    it('should handle various detection methods', () => {
      const methods = [
        'URL pattern analysis',
        'Falcon context analysis',
        'Document title analysis',
        'No detection method successful',
      ];
      
      methods.forEach(method => {
        const socketInfo: SocketInfo = {
          socket: 'test.socket',
          displayName: 'Test Socket',
          description: 'Test description',
          detected: method !== 'No detection method successful',
          detectionMethod: method,
        };
        
        const result = formatSocketInfo(socketInfo);
        
        if (socketInfo.detected) {
          expect(result).toBe('Socket: Test Socket (test.socket)');
        } else {
          expect(result).toBe(`Socket: Unknown (${method})`);
        }
      });
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle missing window object', () => {
      global.window = undefined as any;
      
      expect(() => detectCurrentSocket()).not.toThrow();
      
      const result = detectCurrentSocket();
      expect(result.socket).toBe('unknown');
      expect(result.detected).toBe(false);
    });

    it('should handle missing document object', () => {
      global.document = undefined as any;
      
      expect(() => detectCurrentSocket()).not.toThrow();
      
      const result = detectCurrentSocket();
      expect(result.detected).toBe(false);
    });

    it('should handle circular references in falcon data', () => {
      const circularData: any = {
        detection: {
          id: '123',
        },
      };
      circularData.detection.parent = circularData;
      
      expect(() => detectCurrentSocket(circularData)).not.toThrow();
    });

    it('should handle very deep falcon data structures', () => {
      const deepData = {
        level1: {
          level2: {
            level3: {
              level4: {
                level5: {
                  detection: {
                    source: 'activity',
                  },
                },
              },
            },
          },
        },
      };
      
      expect(() => detectCurrentSocket(deepData)).not.toThrow();
    });
  });
});
