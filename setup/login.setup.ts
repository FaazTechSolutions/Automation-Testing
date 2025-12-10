// 📌 Import Playwright
import { chromium, expect } from '@playwright/test';

// 📌 Import "path" to create the file path for saving login session
import path from 'path';

async function globalSetup() {
  console.log('🚀 Starting Global Login Setup...');

  // 🔥 Launch Chromium (browser not visible because headless = true)
  const browser = await chromium.launch({ headless: true });

  // 🔥 Open a new page/tab
  const page = await browser.newPage();

  // ⏩ Navigate to login page
  await page.goto('https://portal.mawarid.com.sa/apps4x/#/login');

  // 🧹 Clear previous session
  await page.evaluate(() => localStorage.clear());
  await page.context().clearCookies();

  // 🔁 Reload login screen to ensure fresh state
  await page.goto('https://portal.mawarid.com.sa/apps4x/#/login');

  // 🧑‍💻 Enter login details
  await page.getByRole('textbox', { name: 'UserName' }).fill('a.hyder');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');

  // 🔐 Click Sign In button (stable locator)
  await page.locator('#Login').click();

  // ⏳ Wait until login is successful
  await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();

  // 💾 Save login session into auth.json
  const storagePath = path.resolve(__dirname, '../auth.json');
  await page.context().storageState({ path: storagePath });

  console.log('✅ Login session saved at:', storagePath);

  // 🔚 Close browser
  await browser.close();
}

// 📌 Export this file for Playwright to use in config
export default globalSetup;
