import { Page, expect } from '@playwright/test';

export async function performTicketAction(page: Page) {
    // Ticket Action 
    await page.getByRole('link', { name: 'Ticket', exact: true }).click();
    await expect(page.locator('h4').filter({ hasText: 'Ticket' })).toBeVisible();
    await expect(page.getByLabel('Title*')).toBeVisible({ timeout: 20000 });
    await page.getByLabel('Title*').click();
    await page.getByLabel('Title*').fill('test');

    // Ticket Category Dropdown
    await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();

    // TC DD Pagenation
    await page.locator('ul').filter({ hasText: 'of4' }).locator('a').nth(2).click();
    await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('2');
    await expect(page.getByText('Payroll').nth(1)).toBeVisible();
    await page.locator('ul').filter({ hasText: 'of4' }).locator('a').nth(2).click();
    await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('3');
    await page.locator('ul').filter({ hasText: 'of4' }).locator('a').nth(1).click();
    await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('2');
    await page.locator('ul').filter({ hasText: 'of4' }).locator('a').first().click();
    await expect(page.locator('td').filter({ hasText: 'ERP' }).locator('span')).toBeVisible();

    // Search By Name
    await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
    await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('test');
    await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).press('Enter');
    await expect(page.getByText('Test', { exact: true }).nth(1)).toBeVisible({ timeout: 20000 });
    await page.locator('tr').filter({ hasText: 'Test Test' }).locator('span').first().click();
    await page.locator('.angular-editor-textarea').first().click();
    await page.locator('.angular-editor-textarea').first().fill('test');
    await expect(page.getByText('Files HDRequest Attachment')).toBeVisible();
    await page.locator('button').filter({ hasText: 'Close' }).click();
}