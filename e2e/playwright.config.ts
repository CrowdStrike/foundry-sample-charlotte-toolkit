import { defineFoundryConfig } from '@crowdstrike/foundry-playwright';

export default defineFoundryConfig({
  timeout: 90_000,
  retries: 2,
});
