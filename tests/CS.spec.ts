import { test, expect, Page } from '@playwright/test';
import { time } from 'console';

// login function
async function login(page: Page, username: string, password: string) {
    await page.goto('https://portal.mawarid.com.sa/apps4x/#/login', { waitUntil: 'domcontentloaded' });
    await page.getByRole('textbox', { name: 'UserName' }).click({ timeout: 20000 });
    await page.getByRole('textbox', { name: 'UserName' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).click({ timeout: 20000 });
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'SignIn' }).click({ timeout: 20000 });
}

test.describe('Customer Support', () => {

    test.beforeEach(async ({ page }) => {
        test.slow();
        await test.step('Login the mawarid portal', async () => {
            await login(page, 'm.afrith', '123456');
        });
        await test.step('go to the CustomerSupport app', async () => {
            await expect(page.getByRole('link', { name: 'Customer Support' })).toBeVisible({ timeout: 30000 });
            await page.getByRole('link', { name: 'Customer Support' }).click();
        });
    });
});