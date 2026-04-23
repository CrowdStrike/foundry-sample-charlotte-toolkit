import { test as baseTest } from '@playwright/test';
import {
  AppCatalogPage,
  config,
} from '@crowdstrike/foundry-playwright';
import { CharlotteExtensionPage } from './pages/CharlotteExtensionPage';

type FoundryFixtures = {
  appCatalogPage: AppCatalogPage;
  charlotteExtensionPage: CharlotteExtensionPage;
  appName: string;
};

export const test = baseTest.extend<FoundryFixtures>({
  appCatalogPage: async ({ page }, use) => {
    await use(new AppCatalogPage(page));
  },

  charlotteExtensionPage: async ({ page }, use) => {
    await use(new CharlotteExtensionPage(page));
  },

  appName: async ({}, use) => {
    await use(config.appName);
  },
});

export { expect } from '@playwright/test';
