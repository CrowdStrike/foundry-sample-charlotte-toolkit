import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { detectCurrentSocket } from '../socketDetection';

describe('socketDetection', () => {
  // Store original values
  let originalLocation: Location;
  let originalTitle: string;

  beforeEach(() => {
    // Store originals
    originalLocation = window.location;
    originalTitle = document.title;
  });

  afterEach(() => {
    // Restore originals
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
      configurable: true,
    });
    document.title = originalTitle;
  });

  describe('detectCurrentSocket', () => {
    describe('URL-based detection', () => {
      it('should detect activity.detections.details from URL', () => {
        Object.defineProperty(window, 'location', {
          value: { href: 'https://falcon.crowdstrike.com/activity/detections/detail/123' },
          writable: true,
          configurable: true,
        });

        const result = detectCurrentSocket();
        expect(result.socket).toBe('activity.detections.details');
        expect(result.displayName).toBe('Activity Detections');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('URL pattern analysis');
      });

      it('should detect ngsiem.workbench.details from URL with /ngsiem/', () => {
        Object.defineProperty(window, 'location', {
          value: { href: 'https://falcon.crowdstrike.com/ngsiem/workbench/123' },
          writable: true,
          configurable: true,
        });

        const result = detectCurrentSocket();
        expect(result.socket).toBe('ngsiem.workbench.details');
        expect(result.displayName).toBe('Next-Gen SIEM');
        expect(result.detected).toBe(true);
      });

      it('should detect ngsiem.workbench.details from URL with /workbench/', () => {
        Object.defineProperty(window, 'location', {
          value: { href: 'https://falcon.crowdstrike.com/workbench/incident/456' },
          writable: true,
          configurable: true,
        });

        const result = detectCurrentSocket();
        expect(result.socket).toBe('ngsiem.workbench.details');
        expect(result.detected).toBe(true);
      });

      it('should detect xdr.detections.panel from URL', () => {
        Object.defineProperty(window, 'location', {
          value: { href: 'https://falcon.crowdstrike.com/xdr/detections/789' },
          writable: true,
          configurable: true,
        });

        const result = detectCurrentSocket();
        expect(result.socket).toBe('xdr.detections.panel');
        expect(result.displayName).toBe('XDR Detections');
        expect(result.detected).toBe(true);
      });
    });

    describe('context-based detection', () => {
      it('should detect ngsiem from incident context data', () => {
        const falconData = {
          incident: {
            id: '123',
            status: 'open',
          },
        };

        const result = detectCurrentSocket(falconData);
        expect(result.socket).toBe('ngsiem.workbench.details');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('Falcon context analysis');
      });

      it('should detect ngsiem from ngsiem context data', () => {
        const falconData = {
          ngsiem: { data: 'test' },
        };

        const result = detectCurrentSocket(falconData);
        expect(result.socket).toBe('ngsiem.workbench.details');
        expect(result.detected).toBe(true);
      });

      it('should detect activity detections from detection context with activity source', () => {
        const falconData = {
          detection: {
            source: 'activity-app',
            id: '123',
          },
        };

        const result = detectCurrentSocket(falconData);
        expect(result.socket).toBe('activity.detections.details');
        expect(result.detected).toBe(true);
      });

      it('should detect activity detections from activity context', () => {
        const falconData = {
          detection: { id: '123' },
          activity: { data: 'test' },
        };

        const result = detectCurrentSocket(falconData);
        expect(result.socket).toBe('activity.detections.details');
        expect(result.detected).toBe(true);
      });

      it('should detect xdr detections from detection context with xdr source', () => {
        const falconData = {
          detection: {
            source: 'xdr-platform',
            id: '456',
          },
        };

        const result = detectCurrentSocket(falconData);
        expect(result.socket).toBe('xdr.detections.panel');
        expect(result.detected).toBe(true);
      });

      it('should detect xdr detections from xdr context', () => {
        const falconData = {
          detection: { id: '456' },
          xdr: { data: 'test' },
        };

        const result = detectCurrentSocket(falconData);
        expect(result.socket).toBe('xdr.detections.panel');
        expect(result.detected).toBe(true);
      });

      it('should default to activity detections for generic detection', () => {
        const falconData = {
          detection: { id: '789' },
        };

        const result = detectCurrentSocket(falconData);
        expect(result.socket).toBe('activity.detections.details');
        expect(result.detected).toBe(true);
      });
    });

    describe('title-based detection', () => {
      it('should detect activity detections from document title', () => {
        document.title = 'Activity Detection Details - CrowdStrike';

        const result = detectCurrentSocket();
        expect(result.socket).toBe('activity.detections.details');
        expect(result.detected).toBe(true);
        expect(result.detectionMethod).toBe('Document title analysis');
      });

      it('should detect SIEM from document title', () => {
        document.title = 'SIEM Workbench - CrowdStrike';

        const result = detectCurrentSocket();
        expect(result.socket).toBe('ngsiem.workbench.details');
        expect(result.detected).toBe(true);
      });

      it('should detect workbench from document title', () => {
        document.title = 'Workbench Incident - CrowdStrike';

        const result = detectCurrentSocket();
        expect(result.socket).toBe('ngsiem.workbench.details');
        expect(result.detected).toBe(true);
      });

      it('should detect XDR detections from document title', () => {
        document.title = 'XDR Detection Panel - CrowdStrike';

        const result = detectCurrentSocket();
        expect(result.socket).toBe('xdr.detections.panel');
        expect(result.detected).toBe(true);
      });
    });

    describe('fallback behavior', () => {
      it('should return unknown socket when no detection methods succeed', () => {
        Object.defineProperty(window, 'location', {
          value: { href: 'https://other-site.com/unknown/page' },
          writable: true,
          configurable: true,
        });
        document.title = 'Unknown Page';

        const result = detectCurrentSocket();
        expect(result.socket).toBe('unknown');
        expect(result.displayName).toBe('Unknown Page');
        expect(result.detected).toBe(false);
        expect(result.detectionMethod).toBe('No detection method successful');
      });

      it('should return unknown for null falconData', () => {
        const result = detectCurrentSocket(null);
        expect(result.detected).toBe(false);
      });

      it('should return unknown for undefined falconData', () => {
        const result = detectCurrentSocket(undefined);
        expect(result.detected).toBe(false);
      });

      it('should return unknown for empty object', () => {
        const result = detectCurrentSocket({});
        expect(result.detected).toBe(false);
      });
    });

    describe('socket info structure', () => {
      it('should return complete SocketInfo structure', () => {
        const result = detectCurrentSocket();
        expect(result).toHaveProperty('socket');
        expect(result).toHaveProperty('displayName');
        expect(result).toHaveProperty('description');
        expect(result).toHaveProperty('detected');
        expect(result).toHaveProperty('detectionMethod');
      });

      it('should have string values for text fields', () => {
        const result = detectCurrentSocket();
        expect(typeof result.socket).toBe('string');
        expect(typeof result.displayName).toBe('string');
        expect(typeof result.description).toBe('string');
        expect(typeof result.detectionMethod).toBe('string');
      });

      it('should have boolean for detected field', () => {
        const result = detectCurrentSocket();
        expect(typeof result.detected).toBe('boolean');
      });
    });

    describe('error handling', () => {
      it('should handle invalid context data gracefully', () => {
        const result = detectCurrentSocket({ invalid: 'data' });
        expect(result).toBeDefined();
        expect(result.detected).toBe(false);
      });

      it('should handle context data with wrong types', () => {
        const result = detectCurrentSocket({
          detection: 'not-an-object',
        });
        expect(result).toBeDefined();
      });

      it('should handle circular reference in context data', () => {
        const circularData: any = { data: 'test' };
        circularData.self = circularData;

        const result = detectCurrentSocket(circularData);
        expect(result).toBeDefined();
      });
    });

    describe('detection method priority', () => {
      it('should prioritize URL detection over context detection', () => {
        Object.defineProperty(window, 'location', {
          value: { href: 'https://falcon.crowdstrike.com/activity/detections/123' },
          writable: true,
          configurable: true,
        });

        const falconData = {
          incident: { id: '456' }, // This would suggest SIEM
        };

        const result = detectCurrentSocket(falconData);
        expect(result.socket).toBe('activity.detections.details'); // URL wins
        expect(result.detectionMethod).toBe('URL pattern analysis');
      });

      it('should use context detection when URL detection fails', () => {
        Object.defineProperty(window, 'location', {
          value: { href: 'https://unknown.com/page' },
          writable: true,
          configurable: true,
        });

        const falconData = {
          incident: { id: '456' },
        };

        const result = detectCurrentSocket(falconData);
        expect(result.socket).toBe('ngsiem.workbench.details');
        expect(result.detectionMethod).toBe('Falcon context analysis');
      });

      it('should use title detection when URL and context fail', () => {
        Object.defineProperty(window, 'location', {
          value: { href: 'https://unknown.com/page' },
          writable: true,
          configurable: true,
        });
        document.title = 'Activity Detection - Falcon';

        const result = detectCurrentSocket({});
        expect(result.socket).toBe('activity.detections.details');
        expect(result.detectionMethod).toBe('Document title analysis');
      });
    });
  });
});
