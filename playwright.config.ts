import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://www.saucedemo.com',
    testIdAttribute: 'data-test',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  reporter: 'html'
});

