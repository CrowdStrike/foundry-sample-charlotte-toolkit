// src/utils/socketDetection.ts

/**
 * Socket detection utility for CrowdStrike Falcon Console
 * Detects which socket/page the extension is currently embedded in
 */

export interface SocketInfo {
  socket: string;
  displayName: string;
  description: string;
  detected: boolean;
  detectionMethod: string;
}

/**
 * Map of socket identifiers to their display information
 */
const SOCKET_MAP: Record<string, { socket: string; displayName: string; description: string }> = {
  'activity.detections.details': {
    socket: 'activity.detections.details',
    displayName: 'Activity Detections',
    description: 'Activity app detection detail pages',
  },
  'ngsiem.workbench.details': {
    socket: 'ngsiem.workbench.details',
    displayName: 'Next-Gen SIEM',
    description: 'Next-Gen SIEM workbench detail views',
  },
  'xdr.detections.panel': {
    socket: 'xdr.detections.panel',
    displayName: 'XDR Detections',
    description: 'XDR detection panel views',
  },
};

/**
 * Detects the current socket based on various context clues
 */
export function detectCurrentSocket(falconData?: unknown): SocketInfo {
  // Method 1: Check URL patterns
  const urlSocket = detectSocketFromUrl();
  if (urlSocket && SOCKET_MAP[urlSocket]) {
    const socketInfo = SOCKET_MAP[urlSocket];
    return {
      socket: socketInfo.socket,
      displayName: socketInfo.displayName,
      description: socketInfo.description,
      detected: true,
      detectionMethod: 'URL pattern analysis',
    };
  }

  // Method 2: Check Falcon context data structure
  const contextSocket = detectSocketFromContext(falconData);
  if (contextSocket && SOCKET_MAP[contextSocket]) {
    const socketInfo = SOCKET_MAP[contextSocket];
    return {
      socket: socketInfo.socket,
      displayName: socketInfo.displayName,
      description: socketInfo.description,
      detected: true,
      detectionMethod: 'Falcon context analysis',
    };
  }

  // Method 3: Check document title or parent window
  const titleSocket = detectSocketFromTitle();
  if (titleSocket && SOCKET_MAP[titleSocket]) {
    const socketInfo = SOCKET_MAP[titleSocket];
    return {
      socket: socketInfo.socket,
      displayName: socketInfo.displayName,
      description: socketInfo.description,
      detected: true,
      detectionMethod: 'Document title analysis',
    };
  }

  // Fallback: Unknown socket
  return {
    socket: 'unknown',
    displayName: 'Unknown Page',
    description: 'Unable to detect current Falcon Console page',
    detected: false,
    detectionMethod: 'No detection method successful',
  };
}

/**
 * Detect socket from URL patterns
 */
function detectSocketFromUrl(): string | null {
  try {
    const currentUrl = window.location.href;
    const parentUrl = window.parent?.location?.href ?? '';
    const topUrl = window.top?.location?.href ?? '';

    // Check current and parent URLs for patterns
    const urlsToCheck = [currentUrl, parentUrl, topUrl].filter(Boolean);

    for (const url of urlsToCheck) {
      // Activity detections
      if (url.includes('/activity/') && url.includes('/detections/')) {
        return 'activity.detections.details';
      }

      // Next-Gen SIEM
      if (url.includes('/ngsiem/') || url.includes('/workbench/')) {
        return 'ngsiem.workbench.details';
      }

      // XDR detections
      if (url.includes('/xdr/') && url.includes('/detections/')) {
        return 'xdr.detections.panel';
      }
    }
  } catch {
    // Silently handle URL detection errors
  }

  return null;
}

/**
 * Detect socket from Falcon context data structure
 */
function detectSocketFromContext(falconData?: unknown): string | null {
  if (!falconData) return null;

  try {
    const falconDataRecord = falconData as Record<string, unknown>;

    // Check for specific data structures that indicate the current page

    // Next-Gen SIEM: Look for incident data
    if (falconDataRecord.incident || falconDataRecord.ngsiem) {
      return 'ngsiem.workbench.details';
    }

    // Detection pages: Look for detection data
    if (falconDataRecord.detection) {
      const detection = falconDataRecord.detection as Record<string, unknown>;
      // Differentiate between activity and XDR detections
      if (
        (typeof detection.source === 'string' && detection.source.includes('activity')) ||
        falconDataRecord.activity
      ) {
        return 'activity.detections.details';
      }
      if (
        (typeof detection.source === 'string' && detection.source.includes('xdr')) ||
        falconDataRecord.xdr
      ) {
        return 'xdr.detections.panel';
      }
      // Generic detection fallback
      return 'activity.detections.details';
    }
  } catch {
    // Silently handle context detection errors
  }

  return null;
}

/**
 * Detect socket from document title or DOM elements
 */
function detectSocketFromTitle(): string | null {
  try {
    const title = document.title?.toLowerCase() ?? '';
    const parentTitle = window.parent?.document?.title?.toLowerCase() ?? '';
    const topTitle = window.top?.document?.title?.toLowerCase() ?? '';

    const titlesToCheck = [title, parentTitle, topTitle].filter(Boolean);

    for (const titleText of titlesToCheck) {
      if (titleText.includes('activity') && titleText.includes('detection')) {
        return 'activity.detections.details';
      }

      if (titleText.includes('siem') || titleText.includes('workbench')) {
        return 'ngsiem.workbench.details';
      }

      if (titleText.includes('xdr') && titleText.includes('detection')) {
        return 'xdr.detections.panel';
      }
    }
  } catch {
    // Silently handle title detection errors
  }

  return null;
}
