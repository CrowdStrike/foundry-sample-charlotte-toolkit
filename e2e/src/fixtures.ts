import { test as baseTest } from '@playwright/test';
import { AppCatalogPage } from './pages/AppCatalogPage';
import { CharlotteExtensionPage } from './pages/CharlotteExtensionPage';
import { config } from './config/TestConfig';

type FoundryFixtures = {
  appCatalogPage: AppCatalogPage;
  charlotteExtensionPage: CharlotteExtensionPage;
  appName: string;
};

export const test = baseTest.extend<FoundryFixtures>({
  // Configure page with centralized settings
  page: async ({ page }, use) => {
    const timeouts = config.getPlaywrightTimeouts();
    page.setDefaultTimeout(timeouts.timeout);

    // Log configuration on first use
    if (!process.env.CONFIG_LOGGED) {
      config.logSummary();
      process.env.CONFIG_LOGGED = 'true';
    }

    await use(page);
  },

  // Page object fixtures
  appCatalogPage: async ({ page }, use) => {
    await use(new AppCatalogPage(page));
  },

  charlotteExtensionPage: async ({ page }, use) => {
    await use(new CharlotteExtensionPage(page));
  },

  // App name from config
  appName: async ({}, use) => {
    await use(config.appName);
  },
});

export { expect } from '@playwright/test';
