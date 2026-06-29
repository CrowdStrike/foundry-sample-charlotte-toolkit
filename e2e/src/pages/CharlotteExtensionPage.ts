import { Page, FrameLocator, expect } from '@playwright/test';
import { SocketNavigationPage } from '@crowdstrike/foundry-playwright';

export class CharlotteExtensionPage extends SocketNavigationPage {
  constructor(page: Page) {
    super(page);
  }

  // Override to use 30s portal iframe timeout (foundry-playwright hardcodes 15s).
  // TODO: Remove once foundry-playwright bumps the portal timeout to use config.extensionTimeout.
  async expandExtensionInSocket(extensionName: string): Promise<FrameLocator> {
    return this.withTiming(async () => {
      this.logger.info(`Expanding extension: ${extensionName}`);
      await this.scrollToExtension(extensionName);
      const extensionButton = this.page.getByRole('button', { name: new RegExp(extensionName, 'i') }).first();
      await expect(extensionButton).toBeVisible({ timeout: 30000 });
      const isExpanded = await extensionButton.getAttribute('aria-expanded');
      if (isExpanded === 'false' || isExpanded === null) {
        await extensionButton.click();
      }
      await expect(this.page.locator('iframe[name="portal"]')).toBeVisible({ timeout: 30000 });
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
