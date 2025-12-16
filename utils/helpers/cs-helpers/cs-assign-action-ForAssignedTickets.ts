import { Page, expect } from '@playwright/test';

export async function AssignActionForAssignedTickets(page: Page) {

    // Open Assign dropdown
    await page.getByRole('link', { name: 'Assign', exact: true }).click();
    await page.waitForTimeout(1000);
    await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Hyder').click();
    await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible({ timeout: 20000 });

    // Go to page 2,3 then back to 2,1
    await page.locator('ul').filter({ hasText: 'of5' }).locator('a').nth(2).click();
    await expect(page.locator('#autoComplete_dropdown_AssignedTo input[name="currentPage"]')).toHaveValue('2');
    await expect(page.getByText('y.almutlaq@mawarid.com.sa').first()).toBeVisible();

    await page.locator('ul').filter({ hasText: 'of5' }).locator('a').nth(2).click();
    await expect(page.locator('#autoComplete_dropdown_AssignedTo input[name="currentPage"]')).toHaveValue('3');
    await expect(page.locator('span').filter({ hasText: 'b.iqbal@mawarid.com.sa' }).first()).toBeVisible();

    await page.locator('ul').filter({ hasText: 'of5' }).locator('a').nth(1).click();
    await expect(page.locator('#autoComplete_dropdown_AssignedTo input[name="currentPage"]')).toHaveValue('2');
    await expect(page.locator('span').filter({ hasText: 'y.almutlaq@mawarid.com.sa' }).first()).toBeVisible();

    await page.locator('ul').filter({ hasText: 'of5' }).locator('a').first().click();
    await expect(page.locator('#autoComplete_dropdown_AssignedTo input[name="currentPage"]')).toHaveValue('1');
    await expect(page.getByText('a.hyder', { exact: true }).first()).toBeVisible();

    // Search by User Id
    const userIdSearch = page.locator('.text-left > .clearfix > .table_filter_text').first();
    await userIdSearch.click();
    await userIdSearch.fill('hyder');
    await page.waitForTimeout(100);
    await userIdSearch.press('Enter');

    await expect(page.getByText('a.hyder', { exact: true }).first()).toBeVisible();

    // Reset
    await userIdSearch.click();
    await userIdSearch.fill('');
    await page.waitForTimeout(100);
    await userIdSearch.press('Enter');

    // Search by User Name
    const nameSearch = page.locator('td:nth-child(3) > .clearfix > .table_filter_text');
    await nameSearch.click();
    await nameSearch.fill('mehr');
    await page.waitForTimeout(100);
    await nameSearch.press('Enter');

    await expect(page.locator('td').filter({ hasText: 'Mehran Basith' })
        .locator('comp-datatype')).toBeVisible();

    // Reset
    await nameSearch.click();
    await nameSearch.fill('');
    await page.waitForTimeout(100);
    await nameSearch.press('Enter');

    // Search by Email
    const emailSearch = page.locator('td:nth-child(5) > .clearfix > .table_filter_text');
    await emailSearch.click();
    await emailSearch.fill('j.wilfred@');
    await page.waitForTimeout(100);
    await emailSearch.press('Enter');

    await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true })
        .nth(2)).toBeVisible({ timeout: 20000 });

    await page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first().click();
    await page.locator('#Actionform_EFN0000467').getByText('Close').click();
}
