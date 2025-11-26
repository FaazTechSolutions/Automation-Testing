import { Page, expect } from '@playwright/test';

export async function performOptionExport(page: Page) {

    // Check if first "Options" button is visible
    const firstOptionVisible = await page.getByText('Options').first().isVisible();

    if (firstOptionVisible) {

        // Use the first "Options"
        await expect(page.getByText('Options').first()).toBeVisible();
        await page.getByText('Options').first().click();
        await expect(page.getByText('Export SelectedExport')).toBeVisible({ timeout: 10000 });
        await page.getByText('Options').first().click();

    } else {

        // Use the second "Options"
        await expect(page.getByText('Options').nth(1)).toBeVisible({ timeout: 20000 });
        await page.getByText('Options').nth(1).click();
        await expect(page.getByText('Export SelectedExport').nth(1)).toBeVisible({ timeout: 10000 });
        await page.getByText('Options').nth(1).click();
    }
}
