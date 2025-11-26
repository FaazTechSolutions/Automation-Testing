import { Page, expect } from '@playwright/test';

export async function performPickupAction(page: Page) {
    await page.getByRole('link', { name: 'Pickup' }).click();
    await expect(page.locator('#Actionform_EFN0000466').getByText('Pickup')).toBeVisible({ timeout: 30000 });
    await expect(page.getByText('Assigned To Hyder Assigned')).toBeVisible({ timeout: 20000 });
    await page.locator('#Actionform_EFN0000466').getByText('Close').click();
}