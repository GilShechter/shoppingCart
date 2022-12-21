import type { PlaywrightTestConfig } from '@playwright/test';


const config: PlaywrightTestConfig = {
  testMatch: ["tests/**/*.spec.ts"],
  testDir: './tests',
  timeout: 30 * 1000,
};

export default config;
