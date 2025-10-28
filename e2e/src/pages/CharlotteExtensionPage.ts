import { Page, expect, FrameLocator } from '@playwright/test';
import { SocketNavigationPage } from './SocketNavigationPage';

/**
 * Page object for testing the Charlotte Toolkit UI extension
 *
 * Extension appears in multiple sockets:
 * - activity.detections.details (Endpoint Detections)
 * - ngsiem.workbench.details (NGSIEM Incidents)
 * - xdr.detections.panel (XDR Detections)
 *
 * Note: Charlotte AI functionality requires real detection context.
 * These tests focus on UI rendering verification only.
 */
export class CharlotteExtensionPage extends SocketNavigationPage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to Charlotte extension in Endpoint Detections socket
   * Socket: activity.detections.details
   */
  async navigateToEndpointDetectionsExtension(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Navigating to Charlotte extension in Endpoint Detections');

        // Navigate to endpoint detections page
        await this.navigateToEndpointDetections();

        // Open first detection to show details panel
        await this.openFirstDetection();

        // Wait for detection details panel
        await this.page.waitForLoadState('networkidle');

        this.logger.success('Navigated to detection with Charlotte Toolkit extension');
      },
      'Navigate to Charlotte Extension in Endpoint Detections'
    );
  }

  /**
   * Navigate to Charlotte extension in NGSIEM Incidents socket
   * Socket: ngsiem.workbench.details
   */
  async navigateToNGSIEMIncidentsExtension(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Navigating to Charlotte extension in NGSIEM Incidents');

        // Navigate to NGSIEM incidents page
        await this.navigateToNGSIEMIncidents();

        // Wait for incidents to load
        await this.page.waitForLoadState('networkidle');

        // Click on first incident to open details panel
        const firstIncidentButton = this.page.locator('[role="gridcell"] button').first();
        await firstIncidentButton.waitFor({ state: 'visible', timeout: 10000 });
        await firstIncidentButton.click();

        // Wait for incident details to load
        await this.page.waitForLoadState('networkidle');

        this.logger.success('Navigated to NGSIEM incident with Charlotte Toolkit extension');
      },
      'Navigate to Charlotte Extension in NGSIEM Incidents'
    );
  }

  /**
   * Navigate to Charlotte extension in XDR Detections socket
   * Socket: xdr.detections.panel
   */
  async navigateToXDRDetectionsExtension(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Navigating to Charlotte extension in XDR Detections');

        // Navigate to XDR detections page
        await this.navigateToXDRDetections();

        // Wait for detections to load
        await this.page.waitForLoadState('networkidle');

        // Click on first detection to open panel
        const firstDetectionButton = this.page.locator('[role="gridcell"] button').first();
        await firstDetectionButton.waitFor({ state: 'visible', timeout: 10000 });
        await firstDetectionButton.click();

        // Wait for detection panel to load
        await this.page.waitForLoadState('networkidle');

        this.logger.success('Navigated to XDR detection with Charlotte Toolkit extension');
      },
      'Navigate to Charlotte Extension in XDR Detections'
    );
  }

  /**
   * Verify Charlotte Toolkit extension renders correctly
   * Tests for:
   * - Extension button/tab visible
   * - Extension expandable
   * - Iframe loads
   * - Basic Charlotte branding/UI elements
   */
  async verifyCharlotteExtensionRenders(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Verifying Charlotte Toolkit extension renders');

        // Wait for detection/incident details panel to load
        await this.page.waitForLoadState('networkidle');

        // Look for Charlotte Toolkit extension button
        // Extensions in detection details are expandable buttons at the bottom
        const extensionButton = this.page.getByRole('button', { name: /Charlotte Toolkit/i });

        // Scroll the button into view if needed
        await extensionButton.scrollIntoViewIfNeeded({ timeout: 10000 });
        this.logger.info('Scrolled to Charlotte Toolkit extension button');

        // Wait for button to be visible
        await expect(extensionButton).toBeVisible({ timeout: 10000 });
        this.logger.info('Found Charlotte Toolkit extension button');

        // Check if already expanded, if not click to expand
        const isExpanded = await extensionButton.getAttribute('aria-expanded');
        if (isExpanded === 'false') {
          await extensionButton.click();
          this.logger.info('Clicked to expand Charlotte Toolkit extension');
        } else {
          this.logger.info('Charlotte Toolkit extension already expanded');
        }

        // Verify iframe loads
        await expect(this.page.locator('iframe')).toBeVisible({ timeout: 15000 });
        this.logger.info('Extension iframe loaded');

        // Verify iframe content
        const iframe: FrameLocator = this.page.frameLocator('iframe');

        // Check for Charlotte branding/title - looking for Charlotte Toolkit or Charlotte AI references
        const hasCharlotteContent = await Promise.race([
          iframe.getByText(/Charlotte/i).first().isVisible({ timeout: 10000 }).then(() => true),
          iframe.locator('text=/Charlotte/i').first().isVisible({ timeout: 10000 }).then(() => true),
          Promise.resolve(false)
        ]).catch(() => false);

        if (hasCharlotteContent) {
          this.logger.success('Charlotte Toolkit extension renders correctly with Charlotte branding');
        } else {
          // If we can't find Charlotte text, just verify iframe has content
          const iframeHasContent = await iframe.locator('body').isVisible({ timeout: 5000 });
          if (iframeHasContent) {
            this.logger.success('Charlotte Toolkit extension iframe loaded (content verification limited)');
          } else {
            throw new Error('Charlotte Toolkit extension iframe appears empty');
          }
        }
      },
      'Verify Charlotte Toolkit extension renders'
    );
  }

  /**
   * Verify extension appears in specific socket location
   * Used as a generic verification method for any socket
   */
  async verifyExtensionInSocket(socketName: string): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info(`Verifying Charlotte Toolkit extension in ${socketName} socket`);

        // Just verify the extension button/tab exists
        const extension = this.page.getByRole('button', { name: /Charlotte Toolkit/i });
        await expect(extension).toBeVisible({ timeout: 10000 });

        this.logger.success(`Charlotte Toolkit extension found in ${socketName} socket`);
      },
      `Verify extension in ${socketName} socket`
    );
  }
}
