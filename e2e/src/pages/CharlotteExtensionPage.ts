import { Page, FrameLocator, expect } from '@playwright/test';
import { SocketNavigationPage } from '@crowdstrike/foundry-playwright';

const CI_TIMEOUT = 60_000;

export class CharlotteExtensionPage extends SocketNavigationPage {
  constructor(page: Page) {
    super(page);
  }

  // Override to use 60s timeouts for CI (foundry-playwright hardcodes 15s for portal iframe).
  // TODO: Remove once foundry-playwright uses config.extensionTimeout for the portal iframe wait.
  async expandExtensionInSocket(extensionName: string): Promise<FrameLocator> {
    return this.withTiming(async () => {
      this.logger.info(`Expanding extension: ${extensionName}`);
      await this.scrollToExtension(extensionName);
      const extensionButton = this.page.getByRole('button', { name: new RegExp(extensionName, 'i') }).first();
      await expect(extensionButton).toBeVisible({ timeout: CI_TIMEOUT });
      const isExpanded = await extensionButton.getAttribute('aria-expanded');
      if (isExpanded === 'false' || isExpanded === null) {
        await extensionButton.click();
      }
      await expect(this.page.locator('iframe[name="portal"]')).toBeVisible({ timeout: CI_TIMEOUT });
      this.logger.success(`Extension "${extensionName}" expanded`);
      return this.page.frameLocator('iframe[name="portal"]');
    }, `Expand extension "${extensionName}"`);
  }

  async verifyCharlotteExtensionRenders(): Promise<void> {
    return this.withTiming(async () => {
      const iframe: FrameLocator = await this.expandExtensionInSocket('Charlotte Toolkit');

      const hasCharlotteContent = await Promise.race([
        iframe.getByText(/Charlotte/i).first().isVisible({ timeout: 10000 }).then(() => true),
        iframe.locator('text=/Charlotte/i').first().isVisible({ timeout: 10000 }).then(() => true),
        Promise.resolve(false)
      ]).catch(() => false);

      if (!hasCharlotteContent) {
        const iframeHasContent = await iframe.locator('body').isVisible({ timeout: 5000 });
        if (!iframeHasContent) {
          throw new Error('Charlotte Toolkit extension iframe appears empty');
        }
      }
    }, 'Verify Charlotte Toolkit extension renders');
  }
}
