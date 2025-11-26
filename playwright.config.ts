import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 160_000, // 140 sec per test
  testDir: './tests',
  
  /* Run tests in parallel if possible */
  fullyParallel: true,

  /* Fail the build if test.only accidentally left */
  forbidOnly: !!process.env.CI,

  /* Retries on CI only */
  retries: process.env.CI ? 1 : 0,

  /* Run up to 2 workers on CI; use more if tests are isolated */
  workers: process.env.CI ? 2 : undefined,

  reporter: [['html', { open: 'never' }], ['list']], // List + HTML

  use: {
    trace: 'on-first-retry',    // Capture trace on first retry
    screenshot: 'off', // Save screenshots on failure
    video: 'off', // Keep video on failure
    headless: true,             // Always run headless on CI
    viewport: { width: 1440, height: 900 },
    navigationTimeout: 40_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
