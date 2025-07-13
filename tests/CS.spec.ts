import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';


test.describe('Customer Support', async () => {

    test.beforeEach(async ({ page }) => {
        test.slow();
        await test.step('Login the mawarid portal', async () => {
            //POM login 
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await loginPage.login('m.afrith', '123456');
        });

        await test.step('go to the CustomerSupport app', async () => {
            await expect(page.getByRole('link', { name: 'Customer Support' })).toBeVisible({ timeout: 30000 });
            await page.getByRole('link', { name: 'Customer Support' }).click();
        });
    });

    test('Dashboard:', async ({ page }) => {
        await page.waitForTimeout(15000);
        await expect(page.locator('#canvasjs-angular-chart-container-0 canvas').nth(1)).toBeVisible();
        await expect(page.locator('#canvasjs-angular-chart-container-1 canvas').nth(1)).toBeVisible();
        await page.locator('#canvasjs-angular-chart-container-0').getByRole('button', { name: 'More Options' }).click();
        await page.locator('#canvasjs-angular-chart-container-0').getByRole('button', { name: 'More Options' }).click();
        await page.locator('#canvasjs-angular-chart-container-1').getByRole('button', { name: 'More Options' }).click();
        await page.locator('#canvasjs-angular-chart-container-1').getByRole('button', { name: 'More Options' }).click();
        await page.waitForTimeout(3000);
        await expect(page.locator('#canvasjs-angular-chart-container-2 canvas').nth(1)).toBeVisible();
        await page.locator('#canvasjs-angular-chart-container-2').getByRole('button', { name: 'More Options' }).click();
        await page.locator('#canvasjs-angular-chart-container-2').getByRole('button', { name: 'More Options' }).click();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(3000);
        await expect(page.getByRole('heading', { name: 'My Assigned Tickets' })).toBeVisible();
        await expect(page.locator('.myAssignedTikcetDashboard > div > .row > div').first()).toBeVisible();
        await expect(page.getByRole('heading', { name: 'All Tickets' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Coordinators Request by' })).toBeVisible();
        await page.getByRole('textbox', { name: 'Search Coordinator With' }).click();
        await page.getByRole('textbox', { name: 'Search Coordinator With' }).fill('kri');
        await expect(page.getByRole('cell', { name: 'Krishna' }).first()).toBeVisible();
        await page.getByRole('textbox', { name: 'Search Coordinator With' }).click();
        await page.getByRole('textbox', { name: 'Search Coordinator With' }).fill('');
        await expect(page.getByRole('heading', { name: 'Request by Coordinators' })).toBeVisible();
        await page.getByRole('textbox', { name: 'Search By Coordinator' }).click();
        await page.getByRole('textbox', { name: 'Search By Coordinator' }).fill('afrith');
        await expect(page.locator('#sortcoordinator-table').getByRole('cell', { name: 'Mohamed Afrith' })).toBeVisible();
        await page.getByRole('textbox', { name: 'Search By Coordinator' }).click();
        await page.getByRole('textbox', { name: 'Search By Coordinator' }).fill('');
        await page.getByPlaceholder('From Date').fill('2025-04-01');
        await page.getByPlaceholder('To Date').fill('2025-07-11');
        await page.getByText('Filter').click();
        await page.waitForTimeout(2000);
        //after filter issuse fix then test the balance 
    });

    test('MyTeamDashboard:', async ({ page }) => {
        await page.getByRole('link', { name: ' My Team Dashboard' }).click();
        await page.waitForTimeout(2000);
        await expect(page.getByRole('heading', { name: 'My Team Ticket Count' })).toBeVisible();
        await expect(page.locator('.myAssignedTikcetDashboard > div > div').first()).toBeVisible();
        await expect(page.locator('.row > div:nth-child(5)')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Request by Coordinator' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Mohamed Afrith' }).first()).toBeVisible();
        await page.getByPlaceholder('From Date').fill('2025-07-01');
        await page.getByPlaceholder('To Date').fill('2025-07-13');
        await page.getByText('Filter').click();
        await page.waitForTimeout(2000);
        await expect(page.getByRole('table')).toContainText('0');
        await page.locator('#relation_autoComplete_dropdown_UserId label').click();
        await page.locator('.table_filter_text').first().click();
        await page.locator('.table_filter_text').first().fill('afrith');
        await page.locator('.table_filter_text').first().press('Enter');
        await expect(page.locator('td').filter({ hasText: 'm.afrith' }).first()).toBeVisible();
        await page.locator('.table_filter_text').first().click();
        await page.locator('.table_filter_text').first().fill('');
        await page.locator('.table_filter_text').first().press('Enter');
        await expect(page.locator('td').filter({ hasText: 'a.hyder' }).first()).toBeVisible();
        await page.locator('comp-pagination a').nth(2).click();
        await page.waitForTimeout(1000);
        await expect(page.locator('td').filter({ hasText: 'j.wilfred@mawarid.com.sa' }).first()).toBeVisible();
        await page.locator('comp-pagination a').nth(2).click();
        await page.waitForTimeout(1000);
        await expect(page.locator('td').filter({ hasText: 'b.iqbal@mawarid.com.sa' }).first()).toBeVisible();
        await page.locator('comp-pagination a').nth(3).click();
        await page.waitForTimeout(1000);
        await expect(page.getByText('m.krishna', { exact: true })).toBeVisible();
        await page.locator('comp-pagination a').nth(1).click();
        await page.waitForTimeout(1000);
        await page.locator('comp-pagination a').nth(1).click();
        await page.waitForTimeout(1000);
        await page.locator('comp-pagination a').first().click();
        await page.waitForTimeout(1000);
        await expect(page.locator('td').filter({ hasText: 'a.hyder' }).first()).toBeVisible();
        await page.locator('.table_filter_text').first().click();
        await page.locator('.table_filter_text').first().fill('krishna');
        await page.locator('.table_filter_text').first().press('Enter');
        await page.locator('td').filter({ hasText: 'm.krishna' }).first().click();
        await page.getByText('Filter').click();
        await expect(page.getByRole('cell', { name: 'Krishna' }).first()).toBeVisible();
        await page.getByText('Clear').click();
        await page.waitForTimeout(2000);
        await expect(page.getByRole('cell', { name: 'Mohamed Afrith' }).first()).toBeVisible();
    });

    test.describe('Tickets', () => {
        test('My Tickets:should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000082').click();
            await page.getByRole('link', { name: ' My Tickets' }).click();
            await expect(page.getByText('New Tickets')).toBeVisible();
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'TestFromDev' }).locator('a')).toBeVisible();
            await page.locator('comp-pagination a').nth(3).click();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();
            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000237').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Subject' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('Check for email issue with signature');
            await page.getByRole('button', { name: '' }).click();
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'Check for email issue with' }).locator('a')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(
                page.locator('comp-field-view-type').filter({ hasText: 'Check for email issue with' }).locator('a')
            ).not.toBeVisible();await page.locator('#dynamic_list_EFN0000237').getByRole('textbox').click();
            await page.getByText('CreatedDatetime').click();
            await page.locator('input[type="date"]').fill('2025-07-01');
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'Test mail from system without' }).locator('a')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(
                page.locator('comp-field-view-type').filter({ hasText: 'Test mail from system without' }).locator('a')
            ).not.toBeVisible();
            await page.locator('#dynamic_list_EFN0000237').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Assigned To' }).click();
            await page.locator('#relation_autoComplete_dropdown_AssignedTo label').click();
            await page.locator('.text-left > .clearfix > .table_filter_text').first().click();
            await page.locator('.text-left > .clearfix > .table_filter_text').first().fill('krishna');
            await page.locator('.text-left > .clearfix > .table_filter_text').first().press('Enter');
            await expect(page.getByRole('cell', { name: 'm.krishna', exact: true })).toBeVisible();
            await page.getByRole('cell', { name: '' }).locator('i').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'Test mail from system without' }).locator('a')).toBeVisible();
            await page.locator('label').filter({ hasText: 'Krishna' }).hover();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000237').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Ticket ID' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('MWD0015478');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'Test Ticket create' }).locator('a')).toBeVisible();
            await page.locator('comp-field-view-type').filter({ hasText: 'Test Ticket create' }).locator('a').click();
            await expect(page.getByRole('heading', { name: '[MWD0015478] Test Ticket' })).toBeVisible();
            await page.getByRole('link', { name: 'Schedule' }).click();
            await page.locator('#relation_autoComplete_dropdown_AssignedTo label').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('b.iqbal@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo tbody div').filter({ hasText: 'a.hyder' }).first()).toBeVisible();
            await page.locator('.text-left > .clearfix > .table_filter_text').first().click();
            await page.locator('.text-left > .clearfix > .table_filter_text').first().fill('krishna');
            await page.locator('.text-left > .clearfix > .table_filter_text').first().press('Enter');
            await page.getByText('m.krishna', { exact: true }).click();
            await page.getByPlaceholder('Scheduled Date').fill('2025-07-13');
            await page.locator('#Actionform').getByText('Close').click();
            await page.getByRole('link', { name: 'Close', exact: true }).click();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test');
            await page.locator('button').filter({ hasText: 'Close' }).click();

        });
    });
});

