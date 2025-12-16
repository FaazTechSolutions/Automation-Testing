import { Page, expect } from '@playwright/test';

export async function performScheduleAction(page: Page) {
    // Schedule Action
    await page.getByRole('link', { name: 'Schedule' }).click({ timeout: 20000 });
    // AssignTo Dropdown
    await page.waitForTimeout(8000);
    await page.locator('#relation_autoComplete_dropdown_AssignedTo label').click();
    await expect(page.locator('#autoComplete_dropdown_tableAssignedTo tbody span').filter({ hasText: 'a.hyder' }).first()).toBeVisible({ timeout: 30000 });
    await page.locator('ul').filter({ hasText: 'of5' }).locator('a').nth(2).click();
    await expect(page.locator('#autoComplete_dropdown_AssignedTo input[name="currentPage"]')).toHaveValue('2');
    await expect(page.getByText('y.almutlaq@mawarid.com.sa').first()).toBeVisible();
    await page.locator('ul').filter({ hasText: 'of5' }).locator('a').nth(2).click();
    await expect(page.locator('#autoComplete_dropdown_AssignedTo input[name="currentPage"]')).toHaveValue('3');
    await expect(page.getByText('a.alashwan@mawarid.com.sa').first()).toBeVisible();
    await page.locator('ul').filter({ hasText: 'of5' }).locator('a').nth(1).click();
    await expect(page.locator('#autoComplete_dropdown_AssignedTo input[name="currentPage"]')).toHaveValue('2');
    await expect(page.getByText('y.almutlaq@mawarid.com.sa').first()).toBeVisible();
    await page.locator('ul').filter({ hasText: 'of5' }).locator('a').first().click();
    await expect(page.locator('#autoComplete_dropdown_AssignedTo input[name="currentPage"]')).toHaveValue('1');
    await expect(page.getByText('a.hyder', { exact: true }).first()).toBeVisible();
    // Search by User Id 
    await page.locator('.text-left > .clearfix > .table_filter_text').first().click();
    await page.locator('.text-left > .clearfix > .table_filter_text').first().fill('hyder');
    await page.locator('.text-left > .clearfix > .table_filter_text').first().press('Enter');
    await expect(page.getByText('a.hyder', { exact: true }).first()).toBeVisible();
    await page.locator('.text-left > .clearfix > .table_filter_text').first().click();
    await page.locator('.text-left > .clearfix > .table_filter_text').first().fill('');
    await page.locator('.text-left > .clearfix > .table_filter_text').first().press('Enter');
    // Search by User Name 
    await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
    await page.waitForTimeout(100);
    await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('mehran');
    await page.waitForTimeout(100);
    await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
    await page.waitForTimeout(100);
    await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
    await expect(page.locator('td').filter({ hasText: 'Mehran Basith' }).locator('comp-datatype')).toBeVisible({ timeout: 20000 });
    await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
    await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('');
    await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
    // Search by Email 
    await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').click();
    await page.waitForTimeout(100);
    await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').fill('j.wilfred@');
    await page.waitForTimeout(100);
    await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').press('Enter');
    await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).nth(2)).toBeVisible({ timeout: 20000 });
    await page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first().click();
    // Schedule data
    await page.getByPlaceholder('Scheduled Date').fill('2025-07-13');
    await page.locator('#Actionform_EFN0000015').getByText('Schedule', { exact: true }).click();
    await page.locator('#Actionform_EFN0000015').getByText('Close').click();
}