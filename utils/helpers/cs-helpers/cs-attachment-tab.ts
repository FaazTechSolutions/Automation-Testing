
import { Page, expect } from '@playwright/test';

export async function attachmentTab(page: Page) {
    await page.locator('a').filter({ hasText: 'Attachments' }).click();
    await expect(page.getByText('Name')).toBeVisible();
    await expect(page.getByText('Ext').first()).toBeVisible();
}