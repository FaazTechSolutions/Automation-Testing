import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60000, // Increase global timeout to 60s
  testDir: './tests',
  
  /* Run tests in parallel if possible */
  fullyParallel: true,

  /* Fail the build if test.only accidentally left */
  forbidOnly: !!process.env.CI,

  /* Retries on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Run up to 2 workers on CI; use more if tests are isolated */
  workers: process.env.CI ? 2 : undefined,

  reporter: [['html', { open: 'never' }], ['list']], // List + HTML

  use: {
    trace: 'on-first-retry',    // Capture trace on first retry
    screenshot: 'only-on-failure', // Save screenshots on failure
    video: 'retain-on-failure', // Keep video on failure
    headless: true,             // Always run headless on CI
    viewport: { width: 1280, height: 720 },
    baseURL: process.env.BASE_URL || 'https://your-default-url.com', // Set proper base URL
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment these if you want cross-browser testing
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
