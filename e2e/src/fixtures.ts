import { test as baseTest } from '@playwright/test';
import { CharlotteExtensionPage } from './pages/CharlotteExtensionPage';

type FoundryFixtures = {
  charlotteExtensionPage: CharlotteExtensionPage;
};

export const test = baseTest.extend<FoundryFixtures>({
  charlotteExtensionPage: async ({ page }, use) => {
    await use(new CharlotteExtensionPage(page));
  },
});

export { expect } from '@playwright/test';
