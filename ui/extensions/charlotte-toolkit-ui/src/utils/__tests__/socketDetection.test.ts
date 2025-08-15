// src/utils/__tests__/socketDetection.test.ts

import {
  detectCurrentSocket,
  getAllAvailableSockets,
  formatSocketInfo,
  type SocketInfo,
} from '../socketDetection';

describe('socketDetection', () => {
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
  });

  describe('detectCurrentSocket', () => {
    it('should detect from falcon context data - incident', () => {
      const falconData = {
        incident: {
          id: '123',
          type: 'security'
        }
      };
      
      const result = detectCurrentSocket(falconData);
      
      expect(result.socket).toBe('ngsiem.workbench.details');
      expect(result.detected).toBe(true);
      expect(result.detectionMethod).toBe('Falcon context analysis');
    });

    it('should detect from falcon context data - ngsiem', () => {
      const falconData = {
        ngsiem: {
          workbench: 'data'
        }
      };
      
      const result = detectCurrentSocket(falconData);
      
      expect(result.socket).toBe('ngsiem.workbench.details');
      expect(result.detected).toBe(true);
      expect(result.detectionMethod).toBe('Falcon context analysis');
    });

    it('should detect activity detection from context', () => {
      const falconData = {
        detection: {
          source: 'activity-detector',
          id: '456'
        },
        activity: true
      };
      
      const result = detectCurrentSocket(falconData);
      
      expect(result.socket).toBe('activity.detections.details');
      expect(result.detected).toBe(true);
      expect(result.detectionMethod).toBe('Falcon context analysis');
    });

    it('should detect XDR detection from context', () => {
      const falconData = {
        detection: {
          source: 'xdr-detector',
          id: '789'
        },
        xdr: true
      };
      
      const result = detectCurrentSocket(falconData);
      
      expect(result.socket).toBe('xdr.detections.panel');
      expect(result.detected).toBe(true);
      expect(result.detectionMethod).toBe('Falcon context analysis');
    });

    it('should fallback to activity detections for generic detection', () => {
      const falconData = {
        detection: {
          id: '999'
        }
      };
      
      const result = detectCurrentSocket(falconData);
      
      expect(result.socket).toBe('activity.detections.details');
      expect(result.detected).toBe(true);
      expect(result.detectionMethod).toBe('Falcon context analysis');
    });

    it('should return unknown socket when no detection method succeeds', () => {
      const result = detectCurrentSocket();
      
      expect(result.socket).toBe('unknown');
      expect(result.displayName).toBe('Unknown Page');
      expect(result.detected).toBe(false);
      expect(result.detectionMethod).toBe('No detection method successful');
    });

    it('should handle null/undefined context data', () => {
      const result1 = detectCurrentSocket(null);
      const result2 = detectCurrentSocket(undefined);
      
      expect(result1.socket).toBe('unknown');
      expect(result2.socket).toBe('unknown');
    });
  });
});
