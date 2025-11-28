import { chromium, FullConfig } from '@playwright/test';
import path from 'path';

async function globalSetup(config: FullConfig) {
  console.log('🔄 Running Global Setup...');

  const browser = await chromium.launch({ headless: true }); // Set to false for debugging
  const page = await browser.newPage();

  // 🧹 Step 1: Open login and clear previous session
  await page.goto('https://portal.mawarid.com.sa/apps4x/#/login');
  await page.evaluate(() => localStorage.clear());
  await page.context().clearCookies();
  await page.goto('https://portal.mawarid.com.sa/apps4x/#/login');

  // ✅ Step 2: Do login manually
  await page.getByRole('textbox', { name: 'UserName' }).fill('a.hyder');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'SignIn' }).click();

  // ✅ Step 3: Wait for stable element that confirms login
  await page.getByRole('heading', { name: 'Home' }).waitFor({ timeout: 15000 });

  // ✅ Step 4: Save storage state to auth.json for re-use in other tests
  const storagePath = path.resolve(__dirname, '../auth.json');
  await page.context().storageState({ path: storagePath });
  console.log('✅ auth.json has been updated at:', storagePath);

  await browser.close();
}

export default globalSetup;