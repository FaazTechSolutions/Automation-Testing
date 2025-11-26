import { Page, expect } from '@playwright/test';

export async function performCloseAction(page: Page) {
    await page.getByRole('link', { name: 'Close', exact: true }).click();
    await expect(page.locator('h4').filter({ hasText: 'Close' })).toBeVisible({ timeout: 20000 });
    await page.getByPlaceholder('Comments').click();
    await page.getByPlaceholder('Comments').fill('test');
    await page.locator('button').filter({ hasText: 'Close' }).click();
}