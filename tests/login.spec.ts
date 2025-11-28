import { expect, test } from '@playwright/test';

test.describe('login', () => {
test('login : should allow user to login', async ({ page }) => {
await page.goto('https://portal.mawarid.com.sa/apps4x/#/login');
await page.getByRole('textbox', { name: 'UserName' }).click();
await page.getByRole('textbox', { name: 'UserName' }).fill('a.hyder');
await page.getByRole('textbox', { name: 'Password' }).click();
await page.getByRole('textbox', { name: 'Password' }).fill('123456');
await page.getByRole('button', { name: 'SignIn' }).click();
await expect(page.getByRole('heading', { name: 'Apps' })).toBeVisible();
await expect(page.getByRole('link', { name: 'Helpdesk' })).toBeVisible();
});
});