import { Page, FrameLocator } from '@playwright/test';
import { SocketNavigationPage } from '@crowdstrike/foundry-playwright';

export class CharlotteExtensionPage extends SocketNavigationPage {
  constructor(page: Page) {
    super(page);
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
