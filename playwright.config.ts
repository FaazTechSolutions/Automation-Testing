import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';

export default defineConfig({
  timeout: 100_000,
  testDir: 'tests', // ✅ This must point to your test directory

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  outputDir: 'test-results/',

  use: {
    trace: 'on-first-retry',
    screenshot: 'off',
    video: 'off',
    headless: true,
    viewport: { width: 1440, height: 900 },
    navigationTimeout: 120_000,
    actionTimeout: 90_000,
  },

  // globalSetup: './setup/login.setup.ts', // Reference your login file

  projects: [
    // {
    //   name: 'setup',
    //   testMatch: /setup\/login\.setup\.ts/,
    //   use: { },
    // },
    {
      name: 'chromium',
      testMatch: ["tests/**/*.spec.ts"],
      testIgnore: [
        /tests\/login\.setup\.ts/,
        /tests\/login\.spec\.ts/,
        /tests\/active-directory\.spec\.ts/,
      ],
      use: { ...devices['Desktop Chrome'], storageState: fs.existsSync('auth.json') ? 'auth.json' : undefined },
    },
    {
      name: 'loginTest',
      testMatch: /tests\/login\.spec\.ts/,
      use: { ...devices['Desktop Chrome'],},
    },
    {
      name: 'ActiveDirectoryloginTest',
      testMatch: /tests\/active-directory\.spec\.ts/,
      use: { ...devices['Desktop Chrome'],},
    }
  ],
});