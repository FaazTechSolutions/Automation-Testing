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
        await expect(page.locator('#canvasjs-angular-chart-container-1 canvas').nth(1)).toBeVisible({ timeout: 10000 });
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
        await expect(page.getByRole('heading', { name: 'My Team Ticket Count' })).toBeVisible({ timeout: 10000 });
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
        test.slow();
        test('My Tickets:should filter, select, and validate requests', async ({ page }) => {
            await test.step('Workflow-New', async () => {
                // My Tickets: Open and Pagination
                await page.locator('#MNU0000082').click();
                await page.getByRole('link', { name: ' My Tickets' }).click();
                await page.waitForTimeout(2000);
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

                // My Tickets: Options and Export
                await page.getByText('Options').click();
                await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
                await page.getByText('Options').click();
                await page.locator('i:nth-child(2)').click();

                // My Tickets: Filter by Subject
                await page.locator('#dynamic_list_EFN0000237').getByRole('textbox').click();
                await page.getByRole('option', { name: 'Subject' }).click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('Check for email issue with signature');
                await page.getByRole('button', { name: '' }).click();
                await expect(page.locator('comp-field-view-type').filter({ hasText: 'Check for email issue with' }).locator('a')).toBeVisible();
                await page.getByRole('button', { name: ' Clear' }).click();
                await expect(
                    page.locator('comp-field-view-type').filter({ hasText: 'Check for email issue with' }).locator('a')
                ).not.toBeVisible();

                // My Tickets: Filter by Created Date
                await page.locator('#dynamic_list_EFN0000237').getByRole('textbox').click();
                await page.getByText('CreatedDatetime').click();
                await page.locator('input[type="date"]').fill('2025-07-01');
                await expect(page.locator('comp-field-view-type').filter({ hasText: 'Test mail from system without' }).locator('a')).toBeVisible();
                await page.getByRole('button', { name: ' Clear' }).click();
                await expect(
                    page.locator('comp-field-view-type').filter({ hasText: 'Test mail from system without' }).locator('a')
                ).not.toBeVisible();

                // My Tickets: Filter by Assigned To
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

                // My Tickets: Filter by Ticket ID
                await page.locator('#dynamic_list_EFN0000237').getByRole('textbox').click();
                await page.getByRole('option', { name: 'Ticket ID' }).click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('MWD0015478');
                await page.getByRole('textbox').nth(3).press('Enter');
                await expect(page.locator('comp-field-view-type').filter({ hasText: 'Test Ticket create' }).locator('a')).toBeVisible();  //--here

                // My Tickets: Open Ticket Details
                await page.locator('comp-field-view-type').filter({ hasText: 'Test Ticket create' }).locator('a').click();
                await page.waitForTimeout(2000);
                await expect(page.getByRole('heading', { name: '[MWD0015478] Test Ticket' })).toBeVisible({ timeout: 10000 });

                // Ticket Details: Schedule Action
                await page.getByRole('link', { name: 'Schedule' }).click();
                await page.locator('#relation_autoComplete_dropdown_AssignedTo label').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(2000);
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
                await page.getByRole('link', { name: 'Close', exact: true }).click();
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('test comment');
                await page.locator('button').filter({ hasText: 'Close' }).click();

                // Ticket Details: Pickup Action
                await page.getByRole('link', { name: 'Pickup' }).click();
                await expect(page.locator('#Actionform').getByText('Pickup')).toBeVisible();
                await page.locator('#Actionform').getByText('Close').click();

                // Ticket Details: Assign Action
                await page.getByRole('link', { name: 'Assign', exact: true }).click();
                await page.locator('#relation_autoComplete_dropdown_AssignedTo label').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.hyder', { exact: true }).first()).toBeVisible({ timeout: 5000 });
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible({ timeout: 5000 });
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(2000);
                await expect(page.getByText('p.khan@mawarid.com.sa').first()).toBeVisible({ timeout: 5000 });
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]/a/i[1]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]/a/i').click();
                await page.waitForTimeout(2000);
                await expect(page.getByText('a.hyder', { exact: true }).first()).toBeVisible();
                await page.locator('.text-left > .clearfix > .table_filter_text').first().click();
                await page.locator('.text-left > .clearfix > .table_filter_text').first().fill('krishna');
                await page.locator('.text-left > .clearfix > .table_filter_text').first().press('Enter');
                await page.locator('td').filter({ hasText: 'm.krishna' }).first().click();
                await page.locator('#Actionform').getByText('Close').click();

                // Ticket Details: Ticket Actions
                await page.getByRole('link', { name: 'Ticket', exact: true }).click();
                await page.getByLabel('Title*').click();
                await page.getByLabel('Title*').fill('test title');
                await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[5]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[1]/a').click();
                await page.waitForTimeout(1000);
                await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('test');
                await page.waitForTimeout(2000);
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).press('Enter');
                await page.locator('#autoComplete_dropdown_tableTicketCategory i').click();
                await page.locator('#relation_autoComplete_dropdown_AssignedTo > .control-input > .form-control').first().click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await expect(page.getByText('a.Aldhubayban@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]/a/i').click();
                await page.waitForTimeout(2000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]/a/i').click();
                await expect(page.getByText('a.hyder')).toBeVisible();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(2).click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(2).fill('krishna');
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(2).press('Enter');
                await page.locator('td').filter({ hasText: 'm.krishna@faaztechsolutions.' }).locator('comp-datatype').click();
                await page.locator('.angular-editor-textarea').first().click();
                await page.locator('.angular-editor-textarea').first().fill('test');
                await page.locator('button').filter({ hasText: 'Close' }).click();

                // Ticket Details: Attachments, Customer Details, Comments, Notes, Approval, Tabs
                await page.getByRole('link', { name: ' Attach' }).click();
                await expect(page.getByText('Attachments TicketsETN0000007')).toBeVisible();
                await page.locator('#page_form_MON0000002').getByText('x', { exact: true }).click();
                await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0015478 Subject' }).locator('a').click();
                await expect(page.getByText('Customer Details')).toBeVisible();
                await page.locator('dynamic-details').filter({ hasText: 'Schedule Close Pickup Assign' }).locator('button').click();
                await page.getByRole('link', { name: ' Comments' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                await page.getByRole('link', { name: ' Notes' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test notes');
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                await page.getByRole('link', { name: '魯 Send Approval' }).click();
                await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
                await page.getByText('page 2').click();
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('Next page').click();
                await page.getByText('Next page').click();
                await expect(page.getByText('a.alhamdan@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 71').click();
                await page.getByText('page 70').click();
                await page.getByText('page 69').click();
                await page.getByText('Previous page').click();
                await page.getByText('Previous page').click();
                await page.getByText('Previous page').click();
                await page.getByText('page 1').click();
                await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
                await page.getByRole('searchbox').first().click();
                await page.getByRole('searchbox').first().fill('hyder');
                await page.getByText('a.hyder').click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test comment');
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                await expect(page.locator('a').filter({ hasText: 'Conversation' })).toBeVisible();
                await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
                await expect(page.getByText('Request Id')).toBeVisible();
                await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
                await expect(page.getByText('Approver Id')).toBeVisible();
                await page.locator('a').filter({ hasText: 'Attachments' }).click();
                await expect(page.getByRole('cell', { name: 'Name' })).toBeVisible();
                await page.locator('a').filter({ hasText: 'Status History' }).click();
                await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
                await page.getByRole('button', { name: 'Close' }).click();
                await page.getByRole('button', { name: ' Clear' }).click();
            });

            await test.step('Workflow-Schedule', async () => {
                await page.locator('a').filter({ hasText: 'Scheduled' }).click();
                await page.waitForTimeout(2000);
                await page.locator('#tabView_2').getByText('Options').click();
                await expect(page.locator('#tabView_2').getByText('Export SelectedExportExport')).toBeVisible();
                await page.locator('#tabView_2').getByText('Options').click();
                await page.locator('#tabView_2 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > div > div > .card-header > .card-tools > i:nth-child(2)').click();
                await page.locator('#dynamic_list_EFN0000238').getByRole('textbox').click();
                await page.getByRole('option', { name: 'Subject' }).click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('Multiple attachment test');
                await page.getByRole('button', { name: '' }).click();
                await expect(page.locator('comp-field-view-type').filter({ hasText: 'Multiple attachment test' }).locator('a')).toBeVisible();
                await page.getByRole('button', { name: ' Clear' }).click();
                await page.locator('#dynamic_list_EFN0000238').getByRole('textbox').click();
                await page.getByText('Scheduled Date').click();
                await page.locator('input[type="date"]').fill('2025-07-01');
                await expect(page.locator('comp-field-view-type').filter({ hasText: 'Test mail from system with attaechment' }).locator('a')).toBeVisible();
                await expect(page.locator('comp-field-view-type').filter({ hasText: 'Testing mail from mobile' }).locator('a')).toBeVisible();
                await page.getByRole('button', { name: ' Clear' }).click();
                await page.locator('#dynamic_list_EFN0000238').getByRole('textbox').click();
                await page.getByRole('option', { name: 'Ticket ID' }).click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('MWD0000894');
                await page.getByRole('textbox').nth(3).press('Enter');
                await page.waitForTimeout(1000);
                await expect(page.getByRole('paragraph').filter({ hasText: 'MWD0000894' })).toBeVisible();
                await page.locator('comp-field-view-type').filter({ hasText: 'Multiple attachment test' }).locator('a').click();
                //copy here
                await page.getByRole('link', { name: 'Close', exact: true }).click();
                await page.waitForTimeout(1000);
                await expect(page.locator('h4').filter({ hasText: 'Close' })).toBeVisible();
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('test ');
                await page.locator('button').filter({ hasText: 'Close' }).click();

                // Start
                await page.getByRole('link', { name: 'Start' }).click();
                await expect(page.locator('#Actionform').getByText('Start')).toBeVisible();
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('test s');
                await page.locator('#Actionform').getByText('Close').click();
                await page.getByRole('link', { name: 'Pickup' }).click();
                await expect(page.locator('#Actionform').getByText('Pickup')).toBeVisible();
                await page.locator('#Actionform').getByText('Close').click();
                await page.getByRole('link', { name: 'Assign', exact: true }).click();
                await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Mohamed Afrith').click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('b.iqbal@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
                await page.getByText('OK', { exact: true }).click();
                await page.locator('#Actionform button').first().click();
                //ticket
                await page.getByRole('link', { name: 'Ticket', exact: true }).click();
                await page.waitForTimeout(1000);
                await page.getByLabel('Title*').click();
                await page.getByLabel('Title*').fill('test');
                await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
                await page.waitForTimeout(2000);
                await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible({ timeout: 7000 });
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.locator('tr').filter({ hasText: 'Maintenance Maintenance' }).locator('i')).toBeVisible({ timeout: 5000 });
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('test');
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).press('Enter');
                await page.locator('#autoComplete_dropdown_tableTicketCategory i').click();
                await page.locator('#relation_autoComplete_dropdown_AssignedTo > .control-input > .form-control').first().click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.Aldhubayban@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.alharbi@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().fill('afrith');
                await page.waitForTimeout(1000);
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().press('Enter');
                await page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('m.afrith', { exact: true }).click();
                await page.locator('.angular-editor-textarea').first().click();
                await page.locator('.angular-editor-textarea').first().fill('t');
                await page.locator('div').filter({ hasText: /^t$/ }).first().fill('test');
                await page.locator('button').filter({ hasText: 'Close' }).click();
                await page.getByRole('link', { name: ' Attach' }).click();
                await page.locator('#page_form_MON0000002').getByText('x', { exact: true }).click();
                await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0000894 Subject' }).locator('a').click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Customer Details')).toBeVisible();
                await page.locator('dynamic-details').filter({ hasText: 'Close Start Pickup Assign' }).locator('button').click();
                await page.locator('a').filter({ hasText: 'Mohamed Afrith' }).click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Coordinators Details')).toBeVisible();
                await page.locator('dynamic-details').filter({ hasText: 'Close Start Pickup Assign' }).locator('button').click();
                //comments
                await page.getByRole('link', { name: ' Comments' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                //notes
                await page.getByRole('link', { name: ' Notes' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
                await page.locator('div').filter({ hasText: /^test$/ }).fill('test note');
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                //send approval
                await page.getByRole('link', { name: '魯 Send Approval' }).click();
                await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
                await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 2').click();
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('Next page').click();
                await expect(page.getByText('a.albugami@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 2').click();
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('Previous page').click();
                await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]').click();
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[8]').click();
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[7]').click();
                await page.getByText('Previous page').click();
                await page.getByText('Previous page').click();
                await page.getByText('page 1').click();
                await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
                await page.getByRole('searchbox').first().click();
                await page.getByRole('searchbox').first().fill('afrith');
                await page.getByRole('cell', { name: 'm.afrith', exact: true }).locator('div').click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test');
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                // reply
                await page.locator('dynamic-details').getByRole('link', { name: ' Reply' }).click();
                await expect(page.getByRole('textbox', { name: 'Add a To' })).toBeVisible();
                await expect(page.getByRole('textbox', { name: 'Cc' })).toBeVisible();
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                //Ticket tab
                await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
                await expect(page.getByText('Request Id')).toBeVisible();
                // approvals tab
                await page.locator('#cdk-drop-list-4 a').filter({ hasText: 'Approvals' }).click();
                await expect(page.getByText('Approver Id')).toBeVisible();
                await expect(page.getByText('APR0001175')).toBeVisible();
                // attachments tab
                await page.locator('a').filter({ hasText: 'Attachments' }).click();
                await expect(page.getByText('Name')).toBeVisible();
                await expect(page.getByRole('link', { name: ' QuestionBank (2).xlsx' })).toBeVisible();
                // status history tab
                await page.locator('a').filter({ hasText: 'Status History' }).click();
                await expect(page.getByRole('cell', { name: 'MWD0000894' }).locator('comp-datatype')).toBeVisible();
                await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
                await page.getByRole('button', { name: 'Close' }).click();
                await page.getByRole('button', { name: ' Clear' }).click();
                await expect(page.locator('#dynamic_list_EFN0000238').getByRole('textbox')).toBeVisible();
            });

            await test.step('Workflow-Inprogress', async () => {

                await page.locator('a').filter({ hasText: 'InProgress' }).click();
                await page.locator('#tabView_3').getByText('Options').click();
                await expect(page.locator('#tabView_3').getByText('Export SelectedExportExport')).toBeVisible();
                await page.locator('#tabView_3').getByText('Options').click();
                await page.locator('#tabView_3 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > div > div > .card-header > .card-tools > i:nth-child(2)').click();
                await page.locator('#dynamic_list_EFN0000239').getByRole('textbox').click();
                await page.getByRole('option', { name: 'Status' }).click();
                await page.locator('ng-select').filter({ hasText: /^×Status$/ }).getByRole('textbox').click();
                await page.getByRole('option', { name: 'Subject' }).click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('initial mail');
                await page.getByRole('textbox').nth(3).press('Enter');
                await page.waitForTimeout(1000);
                await expect(page.getByRole('heading', { name: 'Test: Initial Mail' })).toBeVisible();
                await page.getByRole('button', { name: ' Clear' }).click();
                await expect(page.locator('#dynamic_list_EFN0000239').getByRole('textbox')).toBeEmpty();
                await page.locator('#dynamic_list_EFN0000239').getByRole('textbox').click();
                await page.getByRole('option', { name: 'Ticket ID' }).click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('MWD0001011');
                await page.getByRole('textbox').nth(3).press('Enter');
                await page.locator('comp-field-view-type').filter({ hasText: 'Test: Initial Mail' }).locator('a').click();

                // Inprogress ticket details
                await page.getByRole('link', { name: 'Close', exact: true }).click();
                await page.waitForTimeout(1000);
                await expect(page.locator('h4').filter({ hasText: 'Close' })).toBeVisible();
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('test ');
                await page.locator('button').filter({ hasText: 'Close' }).click();

                // Pickup
                await page.getByRole('link', { name: 'Pickup' }).click();
                await expect(page.locator('#Actionform').getByText('Pickup')).toBeVisible();
                await page.locator('#Actionform').getByText('Close').click();
                await page.getByRole('link', { name: 'Assign', exact: true }).click();
                await page.waitForTimeout(1000);
                await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Mohamed Idhris Viswa').click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('b.iqbal@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
                await page.getByText('OK', { exact: true }).click();
                await page.locator('#Actionform button').first().click();
                //ticket
                await page.getByRole('link', { name: 'Ticket', exact: true }).click();
                await page.waitForTimeout(1500);
                await page.getByLabel('Title*').click();
                await page.getByLabel('Title*').fill('test');
                await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
                await page.waitForTimeout(1000);
                await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.locator('tr').filter({ hasText: 'Maintenance Maintenance' }).locator('i')).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('test');
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).press('Enter');
                await page.locator('#autoComplete_dropdown_tableTicketCategory i').click();
                await page.waitForTimeout(1000);
                await page.locator('#relation_autoComplete_dropdown_AssignedTo > .control-input > .form-control').first().click();
                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1200);
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.Aldhubayban@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.alharbi@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().fill('afrith');
                // await page.waitForTimeout(1200);
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().press('Enter');
                await page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('m.afrith', { exact: true }).click();
                await page.locator('.angular-editor-textarea').first().click();
                await page.locator('.angular-editor-textarea').first().fill('t');
                await page.locator('div').filter({ hasText: /^t$/ }).first().fill('test');
                await page.locator('button').filter({ hasText: 'Close' }).click();
                await page.getByRole('link', { name: ' Attach' }).click();
                await page.locator('#page_form_MON0000002').getByText('x', { exact: true }).click();
                await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0001011 Subject' }).locator('a').click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Customer Details')).toBeVisible();
                await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();
                await page.locator('a').filter({ hasText: 'Mohamed Idhris Viswa' }).click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Coordinators Details')).toBeVisible();
                await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();
                //comments
                await page.getByRole('link', { name: ' Comments' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                //notes
                await page.getByRole('link', { name: ' Notes' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
                await page.locator('div').filter({ hasText: /^test$/ }).fill('test note');
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                //send approval
                await page.getByRole('link', { name: '魯 Send Approval' }).click();
                await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
                await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 2').click();
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('Next page').click();
                await expect(page.getByText('a.albugami@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 2').click();
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('Previous page').click();
                await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]').click();
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[8]').click();
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[7]').click();
                await page.getByText('Previous page').click();
                await page.getByText('Previous page').click();
                await page.getByText('page 1').click();
                await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
                await page.getByRole('searchbox').first().click();
                await page.getByRole('searchbox').first().fill('afrith');
                await page.getByRole('cell', { name: 'm.afrith', exact: true }).locator('div').click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test');
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                //Ticket tab
                await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
                await expect(page.getByText('Request Id')).toBeVisible();
                // approvals tab
                await page.locator('//*[@id="cdk-drop-list-6"]/div[1]/ul/li[3]/a/span').click();
                await expect(page.getByText('Approver Id')).toBeVisible();
                // attachments tab
                await page.locator('a').filter({ hasText: 'Attachments' }).click();
                await expect(page.getByText('Name')).toBeVisible();
                // status history tab
                await page.locator('a').filter({ hasText: 'Status History' }).click();
                await expect(page.getByText('MWD0001011', { exact: true }).nth(3)).toBeVisible();
                await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
                await page.getByRole('button', { name: 'Close' }).click();
                await page.getByRole('button', { name: ' Clear' }).click();
            });

            await test.step('Workflow-Closed', async () => {
                await page.locator('a').filter({ hasText: 'Closed' }).nth(2).click();
                await page.waitForTimeout(1000);
                await page.locator('#tabView_4').getByText('Options').click();
                await expect(page.locator('#tabView_4').getByText('Export SelectedExportExport')).toBeVisible();
                await page.locator('#tabView_4').getByText('Options').click();
                await expect(page.getByRole('spinbutton')).toHaveValue('1');
                await page.locator('//*[@id="dynamic_list_EFN0000240"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a').click();
                await expect(page.getByRole('spinbutton')).toHaveValue('2');
                await page.locator('//*[@id="dynamic_list_EFN0000240"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a').click();
                await expect(page.getByRole('spinbutton')).toHaveValue('3');
                await page.locator('//*[@id="dynamic_list_EFN0000240"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]/a/i').click();
                await expect(page.getByRole('spinbutton')).toHaveValue('2');
                await page.locator('//*[@id="dynamic_list_EFN0000240"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[1]').click();
                await expect(page.getByRole('spinbutton')).toHaveValue('1');
                await page.locator('#tabView_4 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > div > div > .card-header > .card-tools > i:nth-child(2)').click();
                await page.locator('#dynamic_list_EFN0000240').getByRole('textbox').click();
                await page.getByRole('option', { name: 'Subject' }).click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('test cc');
                await page.getByRole('textbox').nth(3).press('Enter');
                await page.waitForTimeout(1000);
                await expect(page.locator('comp-field-view-type').filter({ hasText: 'test cc' }).locator('a')).toBeVisible({ timeout: 5000 });
                await page.getByRole('button', { name: ' Clear' }).click();
                await page.locator('#dynamic_list_EFN0000240').getByRole('textbox').click();
                await page.getByRole('option', { name: 'Ticket ID' }).click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('MWD0001319');
                await page.getByRole('button', { name: '' }).click();
                await expect(page.locator('a').filter({ hasText: 'MWD0001319' })).toBeVisible();
                // Closed ticket details
                await page.locator('comp-field-view-type').filter({ hasText: 'test cc' }).locator('a').click();
                //Reopen
                await page.getByRole('link', { name: 'Re Open' }).click();
                await page.waitForTimeout(5000);
                await expect(page.locator('#Actionform').getByText('ReOpen')).toBeVisible({ timeout: 7000 });
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('yest');
                await page.getByText('Close', { exact: true }).click();
                // Pickup
                await page.getByRole('link', { name: 'Pickup' }).click();
                await expect(page.locator('#Actionform').getByText('Pickup')).toBeVisible();
                await page.locator('#Actionform').getByText('Close').click();
                await page.getByRole('link', { name: 'Assign', exact: true }).click();
                await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Mohamed Idhris Viswa').click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('b.iqbal@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
                await page.getByText('OK', { exact: true }).click();
                await page.locator('#Actionform button').first().click();
                //ticket
                await page.getByRole('link', { name: 'Ticket', exact: true }).click();
                await page.waitForTimeout(1000);
                await page.getByLabel('Title*').click();
                await page.getByLabel('Title*').fill('test');
                await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
                await page.waitForTimeout(2000);
                await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible({ timeout: 5000 });
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.locator('tr').filter({ hasText: 'Maintenance Maintenance' }).locator('i')).toBeVisible({ timeout: 5000 });
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('test');
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).press('Enter');
                await page.locator('#autoComplete_dropdown_tableTicketCategory i').click();
                await page.locator('#relation_autoComplete_dropdown_AssignedTo > .control-input > .form-control').first().click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.Aldhubayban@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.alharbi@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().fill('afrith');
                await page.waitForTimeout(1000);
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().press('Enter');
                await page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('m.afrith', { exact: true }).click();
                await page.locator('.angular-editor-textarea').first().click();
                await page.locator('.angular-editor-textarea').first().fill('t');
                await page.locator('div').filter({ hasText: /^t$/ }).first().fill('test');
                await page.locator('button').filter({ hasText: 'Close' }).click();
                await page.getByRole('link', { name: ' Attach' }).click();
                await page.locator('#page_form_MON0000002').getByText('x', { exact: true }).click();
                await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0001319 Subject' }).locator('a').click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Customer Details')).toBeVisible();
                await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();
                await page.locator('a').filter({ hasText: 'Mohamed Idhris Viswa' }).click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Coordinators Details')).toBeVisible();
                await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();
                //Ticket tab
                await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
                await expect(page.getByText('Request Id')).toBeVisible();
                // approvals tab
                await page.locator('//*[starts-with(@id, "cdk-drop-list")]//a').filter({ hasText: 'Approvals' }).click();
                await expect(page.getByText('Approver Id')).toBeVisible();
                // attachments tab
                await page.locator('a').filter({ hasText: 'Attachments' }).click();
                await expect(page.getByText('Name')).toBeVisible();
                // status history tab
                await page.locator('a').filter({ hasText: 'Status History' }).click();
                await expect(page.getByText('MWD0001319', { exact: true }).nth(3)).toBeVisible();
                await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
                await page.getByRole('button', { name: 'Close' }).click();
                await page.getByRole('button', { name: ' Clear' }).click();
            });

            await test.step('Workflow-Reopen', async () => {
                await page.locator('a').filter({ hasText: 'ReOpen' }).click();
                await page.locator('#tabView_5').getByText('Options').click();
                await expect(page.locator('#tabView_5').getByText('Export SelectedExportExport')).toBeVisible();
                await page.locator('#tabView_5').getByText('Options').click();
                await page.locator('#tabView_5 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > div > div > .card-header > .card-tools > i:nth-child(2)').click();
                await page.locator('#dynamic_list_EFN0000241').getByRole('textbox').click();
                await page.getByRole('option', { name: 'Subject' }).click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('working on test');
                await page.getByRole('textbox').nth(3).press('Enter');
                await expect(page.getByRole('listitem').filter({ hasText: 'wo working on test MWD0001518' })).toBeVisible();
                await page.getByRole('button', { name: ' Clear' }).click();
                await page.locator('#dynamic_list_EFN0000241').getByRole('textbox').click();
                await page.getByText('Ticket ID').click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('MWD0001518');
                await page.getByRole('button', { name: '' }).click();
                await expect(page.locator('a').filter({ hasText: 'MWD0001518' })).toBeVisible();
                await page.locator('comp-field-view-type').filter({ hasText: 'working on test' }).locator('a').click();
                // Reopen ticket details 

                await page.getByRole('link', { name: 'Close', exact: true }).click();
                await expect(page.locator('h4').filter({ hasText: 'Close' })).toBeVisible({ timeout: 7000 });
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('test');
                await page.locator('button').filter({ hasText: 'Close' }).click();
                // Pickup
                await page.getByRole('link', { name: 'Pickup' }).click();
                await expect(page.locator('#Actionform').getByText('Pickup')).toBeVisible();
                await page.locator('#Actionform').getByText('Close').click();
                // Assign
                await page.getByRole('link', { name: 'Assign', exact: true }).click();
                await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Mehran Basith').click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('b.iqbal@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
                await page.getByText('OK', { exact: true }).click();
                await page.locator('#Actionform button').first().click();
                //ticket
                await page.getByRole('link', { name: 'Ticket', exact: true }).click();
                await page.waitForTimeout(1000);
                await page.getByLabel('Title*').click();
                await page.getByLabel('Title*').fill('test');
                await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
                await page.waitForTimeout(1000);
                await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible({ timeout: 7000 });
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.locator('tr').filter({ hasText: 'Maintenance Maintenance' }).locator('i')).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('test');
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).press('Enter');
                await page.locator('#autoComplete_dropdown_tableTicketCategory i').click();
                await page.locator('#relation_autoComplete_dropdown_AssignedTo > .control-input > .form-control').first().click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.Aldhubayban@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.alharbi@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().fill('afrith');
                await page.waitForTimeout(1000);
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().press('Enter');
                await page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('m.afrith', { exact: true }).click();
                await page.locator('.angular-editor-textarea').first().click();
                await page.locator('.angular-editor-textarea').first().fill('t');
                await page.locator('div').filter({ hasText: /^t$/ }).first().fill('test');
                await page.locator('button').filter({ hasText: 'Close' }).click();
                await page.getByRole('link', { name: ' Attach' }).click();
                await page.locator('#page_form_MON0000002').getByText('x', { exact: true }).click();
                await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0001518 Subject' }).locator('a').click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Customer Details')).toBeVisible();
                await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();
                await page.locator('a').filter({ hasText: 'Mehran Basith' }).click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Coordinators Details')).toBeVisible();
                await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();
                //comments
                await page.getByRole('link', { name: ' Comments' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                //notes
                await page.getByRole('link', { name: ' Notes' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
                await page.locator('div').filter({ hasText: /^test$/ }).fill('test note');
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                //send approval
                await page.getByRole('link', { name: '魯 Send Approval' }).click();
                await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
                await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 2').click();
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('Next page').click();
                await expect(page.getByText('a.albugami@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 2').click();
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('Previous page').click();
                await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]').click();
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[8]').click();
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[7]').click();
                await page.getByText('Previous page').click();
                await page.getByText('Previous page').click();
                await page.getByText('page 1').click();
                await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
                await page.getByRole('searchbox').first().click();
                await page.getByRole('searchbox').first().fill('afrith');
                await page.getByRole('cell', { name: 'm.afrith', exact: true }).locator('div').click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test');
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                // reply
                await page.locator('dynamic-details').getByRole('link', { name: ' Reply' }).click();
                await expect(page.getByRole('textbox', { name: 'Add a To' })).toBeVisible();
                await expect(page.getByRole('textbox', { name: 'Cc' })).toBeVisible();
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                //Ticket tab
                await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
                await expect(page.getByText('Request Id')).toBeVisible();
                // approvals tab
                page.locator('//*[starts-with(@id, "cdk-drop-list")]//a').filter({ hasText: 'Approvals' }).click();
                await expect(page.getByText('Approver Id')).toBeVisible();
                // attachments tab
                await page.locator('a').filter({ hasText: 'Attachments' }).click();
                await expect(page.getByText('Name')).toBeVisible();
                // status history tab
                await page.locator('a').filter({ hasText: 'Status History' }).click();
                await expect(page.getByText('MWD0001518', { exact: true }).nth(3)).toBeVisible();
                await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
                await page.getByRole('button', { name: 'Close' }).click();
                await page.getByRole('button', { name: ' Clear' }).click();
            });

            await test.step('Workflow-All', async () => {
                test.slow();
                await page.locator('#cdk-drop-list-0 a').filter({ hasText: 'All' }).click();
                await expect(page.locator('#tabView_6').getByText('All Tickets')).toBeVisible();
                await page.locator('#tabView_6').getByText('Options').click();
                await expect(page.locator('#tabView_6').getByText('Export SelectedExportExport')).toBeVisible();
                await page.locator('#tabView_6').getByText('Options').click(); await expect(page.getByRole('spinbutton')).toHaveValue('1');
                await page.locator('//*[@id="dynamic_list_EFN0000244"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
                await expect(page.getByRole('spinbutton')).toHaveValue('2');
                await page.locator('//*[@id="dynamic_list_EFN0000244"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
                await expect(page.getByRole('spinbutton')).toHaveValue('3');
                await page.locator('//*[@id="dynamic_list_EFN0000244"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[5]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="dynamic_list_EFN0000244"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="dynamic_list_EFN0000244"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="dynamic_list_EFN0000244"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="dynamic_list_EFN0000244"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[1]').click();
                await expect(page.getByRole('spinbutton')).toHaveValue('1');

                await page.locator('#tabView_6 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > .position-relative > div > .card-header > .card-tools > i:nth-child(2)').click();
                await page.locator('#dynamic_list_EFN0000244').getByRole('textbox').click();
                await page.getByRole('option', { name: 'Subject' }).click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('Multiple attachment test');
                await page.getByRole('button', { name: '' }).click();
                await page.waitForTimeout(1000);
                await expect(page.locator('#dynamic_list_EFN0000244 comp-field-view-type').filter({ hasText: 'Multiple attachment test' }).locator('a')).toBeVisible();
                await page.getByRole('button', { name: ' Clear' }).click();
                await page.locator('#dynamic_list_EFN0000244').getByRole('textbox').click();
                await page.getByText('Scheduled Date').click();
                await page.locator('input[type="date"]').fill('2025-07-07');
                await expect(page.locator('#dynamic_list_EFN0000244 comp-field-view-type').filter({ hasText: 'Test mail for full flow with' }).locator('a')).toBeVisible({ timeout: 7000 });
                await page.getByRole('button', { name: ' Clear' }).click();
                await page.locator('#dynamic_list_EFN0000244').getByRole('textbox').click();
                await page.getByRole('option', { name: 'Ticket ID' }).click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('MWD0000894');
                await page.getByRole('textbox').nth(3).press('Enter');
                await expect(page.getByRole('paragraph').filter({ hasText: 'MWD0000894' })).toBeVisible();
                await page.locator('#dynamic_list_EFN0000244 comp-field-view-type').filter({ hasText: 'Multiple attachment test' }).locator('a').click();

                //copy here
                await page.getByRole('link', { name: 'Close', exact: true }).click();
                await expect(page.locator('h4').filter({ hasText: 'Close' })).toBeVisible();
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('test ');
                await page.locator('button').filter({ hasText: 'Close' }).click();

                // Start
                await page.getByRole('link', { name: 'Start' }).click();
                await expect(page.locator('#Actionform').getByText('Start')).toBeVisible();
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('test s');
                await page.locator('#Actionform').getByText('Close').click();
                await page.getByRole('link', { name: 'Pickup' }).click();
                await expect(page.locator('#Actionform').getByText('Pickup')).toBeVisible();
                await page.locator('#Actionform').getByText('Close').click();
                await page.getByRole('link', { name: 'Assign', exact: true }).click();
                await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Mohamed Afrith').click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('b.iqbal@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
                await page.getByText('OK', { exact: true }).click();
                await page.locator('#Actionform button').first().click();
                //ticket
                await page.getByRole('link', { name: 'Ticket', exact: true }).click();
                await page.waitForTimeout(1000);
                await page.getByLabel('Title*').click();
                await page.getByLabel('Title*').fill('test');
                await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
                await page.waitForTimeout(1000);
                await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible({ timeout: 7000 });
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.locator('tr').filter({ hasText: 'Maintenance Maintenance' }).locator('i')).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('test');
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).press('Enter');
                await page.locator('#autoComplete_dropdown_tableTicketCategory i').click();
                await page.locator('#relation_autoComplete_dropdown_AssignedTo > .control-input > .form-control').first().click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.Aldhubayban@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.alharbi@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().fill('afrith');
                await page.waitForTimeout(1000);
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().press('Enter');
                await page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('m.afrith', { exact: true }).click();
                await page.locator('.angular-editor-textarea').first().click();
                await page.locator('.angular-editor-textarea').first().fill('t');
                await page.locator('div').filter({ hasText: /^t$/ }).first().fill('test');
                await page.locator('button').filter({ hasText: 'Close' }).click();
                await page.getByRole('link', { name: ' Attach' }).click();
                await page.locator('#page_form_MON0000002').getByText('x', { exact: true }).click();
                await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0000894 Subject' }).locator('a').click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Customer Details')).toBeVisible();
                await page.locator('dynamic-details').filter({ hasText: 'Close Start Pickup Assign' }).locator('button').click();
                await page.locator('a').filter({ hasText: 'Mohamed Afrith' }).click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Coordinators Details')).toBeVisible();
                await page.locator('dynamic-details').filter({ hasText: 'Close Start Pickup Assign' }).locator('button').click();
                //comments
                await page.getByRole('link', { name: ' Comments' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                //notes
                await page.getByRole('link', { name: ' Notes' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
                await page.locator('div').filter({ hasText: /^test$/ }).fill('test note');
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                //send approval
                await page.getByRole('link', { name: '魯 Send Approval' }).click();
                await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
                await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 2').click();
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('Next page').click();
                await expect(page.getByText('a.albugami@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 2').click();
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('Previous page').click();
                await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]').click();
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[8]').click();
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[7]').click();
                await page.getByText('Previous page').click();
                await page.getByText('Previous page').click();
                await page.getByText('page 1').click();
                await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
                await page.getByRole('searchbox').first().click();
                await page.getByRole('searchbox').first().fill('afrith');
                await page.getByRole('cell', { name: 'm.afrith', exact: true }).locator('div').click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test');
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                // reply
                await page.locator('dynamic-details').getByRole('link', { name: ' Reply' }).click();
                await expect(page.getByRole('textbox', { name: 'Add a To' })).toBeVisible();
                await expect(page.getByRole('textbox', { name: 'Cc' })).toBeVisible();
                await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
                //Ticket tab
                await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
                await expect(page.getByText('Request Id')).toBeVisible();
                // approvals tab
                page.locator('//*[starts-with(@id, "cdk-drop-list")]//a').filter({ hasText: 'Approvals' }).click();
                await expect(page.getByText('Approver Id')).toBeVisible();
                await expect(page.getByText('APR0001175')).toBeVisible();
                // attachments tab
                await page.locator('a').filter({ hasText: 'Attachments' }).click();
                await expect(page.getByText('Name')).toBeVisible();
                await expect(page.getByRole('link', { name: ' QuestionBank (2).xlsx' })).toBeVisible();
                // status history tab
                await page.locator('a').filter({ hasText: 'Status History' }).click();
                await expect(page.getByRole('cell', { name: 'MWD0000894' }).locator('comp-datatype')).toBeVisible();
                await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
                await page.getByRole('button', { name: 'Close' }).click();
                await page.getByRole('button', { name: ' Clear' }).click();
            });
        });

        test('Unassigned Tickets:should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000082').click();
            await page.getByRole('link', { name: ' Unassigned Tickets' }).click();
            await expect(page.locator('section').getByText('Unassigned Tickets')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible({ timeout: 5000 });
            await page.getByText('Options').click();
            await page.locator('i:nth-child(2)').click();

            // List Pagination
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('//*[@id="dynamic_list_EFN0000245"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('//*[@id="dynamic_list_EFN0000245"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('//*[@id="dynamic_list_EFN0000245"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[5]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="dynamic_list_EFN0000245"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="dynamic_list_EFN0000245"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="dynamic_list_EFN0000245"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[1]').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Filter by Subject
            await page.locator('#dynamic_list_EFN0000245').getByRole('textbox').click();
            await page.getByText('Subject').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('Check for the email issue.');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'Check for the email issue.' }).locator('a')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000245').getByRole('textbox')).toBeEmpty();

            // Filter by Scheduled Date - issue #494
            await page.locator('#dynamic_list_EFN0000245').getByRole('textbox').click(); await page.getByText('CreatedDatetime').click();
            await page.locator('input[type="date"]').fill('2025-05-11');
            await page.getByRole('button', { name: ' Clear' }).click();

            // Filter by Ticket ID
            await page.locator('#dynamic_list_EFN0000245').getByRole('textbox').click();
            await page.getByText('Ticket ID').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('MWD0014651');
            await page.getByRole('button', { name: '' }).click();
            await expect(page.getByText('MWD0014651')).toBeVisible();
            await page.locator('comp-field-view-type').filter({ hasText: 'Ticket for test' }).locator('a').click();

            // Ticket Details Page
            await expect(page.getByRole('heading', { name: '[MWD0014651] Ticket for test' })).toBeVisible();

            // Schedule Action
            await page.getByRole('link', { name: 'Schedule' }).click();
            await page.locator('#relation_autoComplete_dropdown_AssignedTo label').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(2000);
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
            await page.locator('button').filter({ hasText: 'Close' }).click(); await page.getByRole('link', { name: 'Close', exact: true }).click();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test comment');
            await page.locator('button').filter({ hasText: 'Close' }).click();

            // Pickup Action
            await page.getByRole('link', { name: 'Pickup' }).click();
            await expect(page.locator('#Actionform').getByText('Pickup')).toBeVisible();
            await page.locator('#Actionform').getByText('Close').click();

            // Assign Action
            await page.getByRole('link', { name: 'Assign', exact: true }).click();
            await page.locator('#relation_autoComplete_dropdown_AssignedTo label').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('a.hyder', { exact: true }).first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible({ timeout: 7000 });
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(2000);
            await expect(page.getByText('p.khan@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]/a/i[1]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]/a/i').click();
            await page.waitForTimeout(2000);
            await expect(page.getByText('a.hyder', { exact: true }).first()).toBeVisible();
            await page.locator('.text-left > .clearfix > .table_filter_text').first().click();
            await page.locator('.text-left > .clearfix > .table_filter_text').first().fill('krishna');
            await page.locator('.text-left > .clearfix > .table_filter_text').first().press('Enter');
            await page.locator('td').filter({ hasText: 'm.krishna' }).first().click();
            await page.locator('#Actionform').getByText('Close').click();

            // Ticket Action
            await page.getByRole('link', { name: 'Ticket', exact: true }).click();
            await page.getByLabel('Title*').click();
            await page.getByLabel('Title*').fill('test title');
            await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[5]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[1]/a').click();
            await page.waitForTimeout(1000);
            await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('test');
            await page.waitForTimeout(2000);
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).press('Enter');
            await page.locator('#autoComplete_dropdown_tableTicketCategory i').click();
            await page.locator('#relation_autoComplete_dropdown_AssignedTo > .control-input > .form-control').first().click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.getByText('a.Aldhubayban@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]/a/i').click();
            await page.waitForTimeout(2000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]/a/i').click();
            await expect(page.getByText('a.hyder')).toBeVisible();
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(2).click();
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(2).fill('krishna');
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(2).press('Enter');
            await page.locator('td').filter({ hasText: 'm.krishna@faaztechsolutions.' }).locator('comp-datatype').click();
            await page.locator('.angular-editor-textarea').first().click();
            await page.locator('.angular-editor-textarea').first().fill('test');
            await page.locator('button').filter({ hasText: 'Close' }).click();

            // Attachments
            await page.getByRole('link', { name: ' Attach' }).click();
            await expect(page.getByText('Attachments TicketsETN0000007')).toBeVisible();
            await page.locator('#page_form_MON0000002').getByText('x', { exact: true }).click();

            // Customer Details Page
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0014651 Subject' }).locator('a').click();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Schedule Close Pickup Assign' }).locator('button').click();

            // Comments Sub Actions
            await page.getByRole('link', { name: ' Comments' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();

            // Notes Sub Actions
            await page.getByRole('link', { name: ' Notes' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test notes');
            await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();

            // Send Approval
            await page.getByRole('link', { name: '魯 Send Approval' }).click();
            await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
            await page.getByText('page 2').click();
            await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await expect(page.getByText('a.alhamdan@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('page 71').click();
            await page.getByText('page 70').click();
            await page.getByText('page 69').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1').click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('hyder');
            await page.getByText('a.hyder').click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test comment');
            await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();

            // Conversation Tab
            await expect(page.locator('a').filter({ hasText: 'Conversation' })).toBeVisible();

            // Ticket Approvals Tab
            await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
            await expect(page.getByText('Request Id')).toBeVisible();

            // Approvals Tab
            await page.locator('//*[@id="cdk-drop-list-1"]/div[1]/ul/li[3]/a/span').click();
            await expect(page.getByText('Approver Id')).toBeVisible();

            // Attachments Tab
            await page.locator('a').filter({ hasText: 'Attachments' }).click();
            await expect(page.getByRole('cell', { name: 'Name' })).toBeVisible();

            // Status History Tab
            await page.locator('a').filter({ hasText: 'Status History' }).click();
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
        });

        test('All Tickets:should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000082').click();
            await page.getByRole('link', { name: ' All Tickets' }).click();
            await expect(page.locator('section').getByText('All Tickets')).toBeVisible({ timeout: 40000 });
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click(); await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('//*[@id="dynamic_list_EFN0000071"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('//*[@id="dynamic_list_EFN0000071"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('//*[@id="dynamic_list_EFN0000071"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[5]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="dynamic_list_EFN0000071"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="dynamic_list_EFN0000071"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="dynamic_list_EFN0000071"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="dynamic_list_EFN0000071"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[1]').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000071').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Title' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('Multiple attachment test');
            await page.getByRole('button', { name: '' }).click();
            await page.waitForTimeout(1000);
            await expect(page.locator('#dynamic_list_EFN0000071 comp-field-view-type').filter({ hasText: 'Multiple attachment test' }).locator('a')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000071').getByRole('textbox').click();
            await page.locator('#dynamic_list_EFN0000071').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Ticket ID' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('MWD0000894');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.getByRole('paragraph').filter({ hasText: 'MWD0000894' })).toBeVisible();
            await page.locator('comp-field-view-type').filter({ hasText: 'Multiple attachment test' }).locator('a').click();

            //copy here
            await page.getByRole('link', { name: 'Close', exact: true }).click();
            await expect(page.locator('h4').filter({ hasText: 'Close' })).toBeVisible();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test ');
            await page.locator('button').filter({ hasText: 'Close' }).click();

            // Start
            await page.getByRole('link', { name: 'Start' }).click();
            await expect(page.locator('#Actionform').getByText('Start')).toBeVisible();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test s');
            await page.locator('#Actionform').getByText('Close').click();
            await page.getByRole('link', { name: 'Pickup' }).click();
            await expect(page.locator('#Actionform').getByText('Pickup')).toBeVisible();
            await page.locator('#Actionform').getByText('Close').click();
            await page.getByRole('link', { name: 'Assign', exact: true }).click();
            await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Mohamed Afrith').click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('b.iqbal@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await page.waitForTimeout(1000);
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
            await page.getByText('OK', { exact: true }).click();
            await page.locator('#Actionform button').first().click();
            //ticket
            await page.getByRole('link', { name: 'Ticket', exact: true }).click();
            await page.waitForTimeout(1000);
            await page.getByLabel('Title*').click();
            await page.getByLabel('Title*').fill('test');
            await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
            await page.waitForTimeout(1000);
            await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.locator('tr').filter({ hasText: 'Maintenance Maintenance' }).locator('i')).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('test');
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).press('Enter');
            await page.locator('#autoComplete_dropdown_tableTicketCategory i').click();
            await page.locator('#relation_autoComplete_dropdown_AssignedTo > .control-input > .form-control').first().click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('a.Aldhubayban@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('a.alharbi@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().click();
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().fill('afrith');
            await page.waitForTimeout(1000);
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().press('Enter');
            await page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('m.afrith', { exact: true }).click();
            await page.locator('.angular-editor-textarea').first().click();
            await page.locator('.angular-editor-textarea').first().fill('t');
            await page.locator('div').filter({ hasText: /^t$/ }).first().fill('test');
            await page.locator('button').filter({ hasText: 'Close' }).click();
            await page.getByRole('link', { name: ' Attach' }).click();
            await page.locator('#page_form_MON0000002').getByText('x', { exact: true }).click();
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0000894 Subject' }).locator('a').click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Close Start Pickup Assign' }).locator('button').click();
            await page.locator('a').filter({ hasText: 'Mohamed Afrith' }).click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Coordinators Details')).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Close Start Pickup Assign' }).locator('button').click();
            //comments
            await page.getByRole('link', { name: ' Comments' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
            //notes
            await page.getByRole('link', { name: ' Notes' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('div').filter({ hasText: /^test$/ }).fill('test note');
            await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
            //send approval
            await page.getByRole('link', { name: '魯 Send Approval' }).click();
            await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('page 2').click();
            await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('Next page').click();
            await expect(page.getByText('a.albugami@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('page 2').click();
            await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('Previous page').click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]').click();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[8]').click();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[7]').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1').click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('afrith');
            await page.getByRole('cell', { name: 'm.afrith', exact: true }).locator('div').click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test');
            await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
            // reply
            await page.locator('dynamic-details').getByRole('link', { name: ' Reply' }).click();
            await expect(page.getByRole('textbox', { name: 'Add a To' })).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Cc' })).toBeVisible();
            await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
            //Ticket tab
            await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
            await expect(page.getByText('Request Id')).toBeVisible();
            // approvals tab
            await page.locator('#cdk-drop-list-1 a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByText('Approver Id')).toBeVisible();
            await expect(page.getByText('APR0001175')).toBeVisible();
            // attachments tab
            await page.locator('a').filter({ hasText: 'Attachments' }).click();
            await expect(page.getByText('Name')).toBeVisible();
            await expect(page.getByRole('link', { name: ' QuestionBank (2).xlsx' })).toBeVisible();
            // status history tab
            await page.locator('a').filter({ hasText: 'Status History' }).click();
            await expect(page.getByRole('cell', { name: 'MWD0000894' }).locator('comp-datatype')).toBeVisible();
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
        });

        test('All Closed Tickets:should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000082').click();
            await page.getByRole('link', { name: ' My All Closed Tickets' }).click();
            await expect(page.locator('section').getByText('My All Closed Tickets')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            await page.locator('//*[@id="dynamic_list_EFN0000233"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('//*[@id="dynamic_list_EFN0000233"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('//*[@id="dynamic_list_EFN0000233"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]/a/i').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('//*[@id="dynamic_list_EFN0000233"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[1]').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000233').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Title' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('test cc');
            await page.getByRole('textbox').nth(3).press('Enter');
            await page.waitForTimeout(1000);
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'test cc' }).locator('a')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000233').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Ticket ID' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('MWD0001319');
            await page.getByRole('button', { name: '' }).click();
            await expect(page.getByText('MWD0001319')).toBeVisible();
            // Closed ticket details
            await page.locator('comp-field-view-type').filter({ hasText: 'test cc' }).locator('a').click();
            //Reopen
            await page.getByRole('link', { name: 'Re Open' }).click();
            await expect(page.locator('#Actionform').getByText('ReOpen')).toBeVisible({ timeout: 7000 });
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('yest');
            await page.getByText('Close', { exact: true }).click();
            // Pickup
            await page.getByRole('link', { name: 'Pickup' }).click();
            await expect(page.locator('#Actionform').getByText('Pickup')).toBeVisible();
            await page.locator('#Actionform').getByText('Close').click();
            await page.getByRole('link', { name: 'Assign', exact: true }).click();
            await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Mohamed Idhris Viswa').click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('b.iqbal@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await page.waitForTimeout(1000);
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
            await page.getByText('OK', { exact: true }).click();
            await page.locator('#Actionform button').first().click();
            //ticket
            await page.getByRole('link', { name: 'Ticket', exact: true }).click();
            await page.waitForTimeout(1000);
            await page.getByLabel('Title*').click();
            await page.getByLabel('Title*').fill('test');
            await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
            await page.waitForTimeout(2000);
            await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible({ timeout: 7000 });
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.locator('tr').filter({ hasText: 'Maintenance Maintenance' }).locator('i')).toBeVisible({ timeout: 5000 });
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('test');
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).press('Enter');
            await page.locator('#autoComplete_dropdown_tableTicketCategory i').click();
            await page.locator('#relation_autoComplete_dropdown_AssignedTo > .control-input > .form-control').first().click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('a.Aldhubayban@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('a.alharbi@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().click();
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().fill('afrith');
            await page.waitForTimeout(1000);
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().press('Enter');
            await page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('m.afrith', { exact: true }).click();
            await page.locator('.angular-editor-textarea').first().click();
            await page.locator('.angular-editor-textarea').first().fill('t');
            await page.locator('div').filter({ hasText: /^t$/ }).first().fill('test');
            await page.locator('button').filter({ hasText: 'Close' }).click();
            await page.getByRole('link', { name: ' Attach' }).click();
            await page.locator('#page_form_MON0000002').getByText('x', { exact: true }).click();
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0001319 Subject' }).locator('a').click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();
            await page.locator('a').filter({ hasText: 'Mohamed Idhris Viswa' }).click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Coordinators Details')).toBeVisible();
            await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();
            //Ticket tab
            await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
            await expect(page.getByText('Request Id')).toBeVisible();
            // approvals tab
            await page.locator('//*[starts-with(@id, "cdk-drop-list")]//a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByText('Approver Id')).toBeVisible();
            // attachments tab
            await page.locator('a').filter({ hasText: 'Attachments' }).click();
            await expect(page.getByText('Name')).toBeVisible();
            // status history tab
            await page.locator('a').filter({ hasText: 'Status History' }).click();
            await expect(page.getByText('MWD0001319', { exact: true }).nth(3)).toBeVisible();
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
        });

        test('Assigned To Me:should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000082').click();
            await page.getByRole('link', { name: ' Assigned to me' }).click();
            // Pagination
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('//*[@id="dynamic_list_EFN0000030"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('//*[@id="dynamic_list_EFN0000030"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[5]/a/i').click();
            await page.locator('//*[@id="dynamic_list_EFN0000030"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="dynamic_list_EFN0000030"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[1]').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Title Filter
            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000030').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Title' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('test after update');
            await page.getByRole('button', { name: '' }).click();
            await expect(page.getByRole('heading', { name: 'test after update' })).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000030').getByRole('textbox')).toBeEmpty();

            // Ticket ID Filter
            await page.locator('#dynamic_list_EFN0000030').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Ticket ID' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('MWD0000846');
            await page.getByRole('button', { name: '' }).click();
            await page.locator('comp-field-view-type').filter({ hasText: 'test after update' }).locator('a').click();

            //Reopen
            await page.getByRole('link', { name: 'Re Open' }).click();
            await expect(page.locator('#Actionform').getByText('ReOpen')).toBeVisible({ timeout: 7000 });
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('yest');
            await page.getByText('Close', { exact: true }).click();
            // Pickup
            await page.getByRole('link', { name: 'Pickup' }).click();
            await expect(page.locator('#Actionform').getByText('Pickup')).toBeVisible();
            await page.locator('#Actionform').getByText('Close').click();
            await page.getByRole('link', { name: 'Assign', exact: true }).click();
            await page.locator('label').filter({ hasText: 'Mohamed Afrith' }).click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('b.iqbal@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await page.waitForTimeout(1000);
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
            await page.getByText('OK', { exact: true }).click();
            await page.locator('#Actionform button').first().click();
            //ticket
            await page.getByRole('link', { name: 'Ticket', exact: true }).click();
            await page.waitForTimeout(1000);
            await page.getByLabel('Title*').click();
            await page.getByLabel('Title*').fill('test');
            await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
            await page.waitForTimeout(2000);
            await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible({ timeout: 5000 });
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.locator('tr').filter({ hasText: 'Maintenance Maintenance' }).locator('i')).toBeVisible({ timeout: 5000 });
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('test');
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).press('Enter');
            await page.locator('#autoComplete_dropdown_tableTicketCategory i').click();
            await page.locator('.col-9 > relation-field > #relation_autoComplete_dropdown_AssignedTo > .control-input > .form-control').first().click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('a.Aldhubayban@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('a.alharbi@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().click();
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().fill('afrith');
            await page.waitForTimeout(1000);
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().press('Enter');
            await page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('m.afrith', { exact: true }).click();
            await page.locator('.angular-editor-textarea').first().click();
            await page.locator('.angular-editor-textarea').first().fill('t');
            await page.locator('div').filter({ hasText: /^t$/ }).first().fill('test');
            await page.locator('button').filter({ hasText: 'Close' }).click();
            await page.getByRole('link', { name: ' Attach' }).click();
            await page.locator('#page_form_MON0000002').getByText('x', { exact: true }).click();
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0000846 Subject' }).locator('a').click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();
            await page.locator('a').filter({ hasText: 'Mohamed Afrith' }).click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Coordinators Details')).toBeVisible();
            await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();
            //Ticket tab
            await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
            await expect(page.getByText('Request Id')).toBeVisible();
            // approvals tab
            await page.locator('//*[starts-with(@id, "cdk-drop-list")]//a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByText('Approver Id')).toBeVisible();
            // attachments tab
            await page.locator('a').filter({ hasText: 'Attachments' }).click();
            await expect(page.getByText('Name')).toBeVisible();
            // status history tab
            await page.locator('a').filter({ hasText: 'Status History' }).click();
            await expect(page.getByRole('cell', { name: 'MWD0000846' }).locator('comp-datatype')).toBeVisible();
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
        });

        test('Create By Me:should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000082').click();
            await page.getByRole('link', { name: ' Created By Me' }).click();
            await expect(page.locator('section').getByText('Created By Me')).toBeVisible();
            await expect(page.getByText('Options')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();

            // Pagination
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('//*[@id="dynamic_list_EFN0000007"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click(); await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('//*[@id="dynamic_list_EFN0000007"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[1]').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Title Filter
            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000007').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Title' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('Multiple attachment test');
            await page.getByRole('button', { name: '' }).click();
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'Multiple attachment test' }).locator('a')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000007').getByRole('textbox')).toBeEmpty();

            // Status Filter

            await page.locator('#dynamic_list_EFN0000007').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Status' }).click();
            await page.locator('#autoComplete_dropdown_Status label').click();
            await page.getByRole('row', { name: ' Closed Closed' }).locator('i').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.getByRole('listitem').filter({ hasText: 'Te Test MWD0001519 Closed' })).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000007').getByRole('textbox')).toBeEmpty();

            // Ticket ID Filter
            await page.locator('#dynamic_list_EFN0000007').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Ticket ID' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('MWD0000894');
            await page.getByRole('button', { name: '' }).click();
            await expect(page.getByText('MWD0000894')).toBeVisible();
            await page.locator('comp-field-view-type').filter({ hasText: 'Multiple attachment test' }).locator('a').click();

            // Cancel
            await page.getByRole('link', { name: 'Close', exact: true }).click();
            await page.waitForTimeout(1000);
            await expect(page.locator('h4').filter({ hasText: 'Close' })).toBeVisible();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test ');
            await page.locator('button').filter({ hasText: 'Close' }).click();

            // Start
            await page.getByRole('link', { name: 'Start' }).click();
            await expect(page.locator('#Actionform').getByText('Start')).toBeVisible();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test s');
            await page.locator('#Actionform').getByText('Close').click();
            await page.getByRole('link', { name: 'Pickup' }).click();
            await expect(page.locator('#Actionform').getByText('Pickup')).toBeVisible();
            await page.locator('#Actionform').getByText('Close').click();
            await page.getByRole('link', { name: 'Assign', exact: true }).click();
            await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Mohamed Afrith').click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('b.iqbal@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await page.waitForTimeout(1000);
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
            await page.getByText('OK', { exact: true }).click();
            await page.locator('#Actionform button').first().click();
            //ticket
            await page.getByRole('link', { name: 'Ticket', exact: true }).click();
            await page.waitForTimeout(1000);
            await page.getByLabel('Title*').click();
            await page.getByLabel('Title*').fill('test');
            await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
            await page.waitForTimeout(2000);
            await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible({ timeout: 5000 });
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.locator('tr').filter({ hasText: 'Maintenance Maintenance' }).locator('i')).toBeVisible({ timeout: 5000 });
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('test');
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).press('Enter');
            await page.locator('#autoComplete_dropdown_tableTicketCategory i').click();
            await page.locator('#relation_autoComplete_dropdown_AssignedTo > .control-input > .form-control').first().click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('a.Aldhubayban@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByText('a.alharbi@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().click();
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().fill('afrith');
            await page.waitForTimeout(1000);
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().press('Enter');
            await page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('m.afrith', { exact: true }).click();
            await page.locator('.angular-editor-textarea').first().click();
            await page.locator('.angular-editor-textarea').first().fill('t');
            await page.locator('div').filter({ hasText: /^t$/ }).first().fill('test');
            await page.locator('button').filter({ hasText: 'Close' }).click();
            await page.getByRole('link', { name: ' Attach' }).click();
            await page.locator('#page_form_MON0000002').getByText('x', { exact: true }).click();
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0000894 Subject' }).locator('a').click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Close Start Pickup Assign' }).locator('button').click();
            await page.locator('a').filter({ hasText: 'Mohamed Afrith' }).click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Coordinators Details')).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Close Start Pickup Assign' }).locator('button').click();
            //comments
            await page.getByRole('link', { name: ' Comments' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
            //notes
            await page.getByRole('link', { name: ' Notes' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('div').filter({ hasText: /^test$/ }).fill('test note');
            await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
            //send approval
            await page.getByRole('link', { name: '魯 Send Approval' }).click();
            await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('page 2').click();
            await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('Next page').click();
            await expect(page.getByText('a.albugami@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('page 2').click();
            await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('Previous page').click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]').click();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[8]').click();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[7]').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1').click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('afrith');
            await page.getByRole('cell', { name: 'm.afrith', exact: true }).locator('div').click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test');
            await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
            // reply
            await page.locator('dynamic-details').getByRole('link', { name: ' Reply' }).click();
            await expect(page.getByRole('textbox', { name: 'Add a To' })).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Cc' })).toBeVisible();
            await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
            //Ticket tab
            await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
            await expect(page.getByText('Request Id')).toBeVisible();
            // approvals tab
            page.locator('//*[starts-with(@id, "cdk-drop-list")]//a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByText('Approver Id')).toBeVisible();
            await expect(page.getByText('APR0001175')).toBeVisible();
            // attachments tab
            await page.locator('a').filter({ hasText: 'Attachments' }).click();
            await expect(page.getByText('Name')).toBeVisible();
            await expect(page.getByRole('link', { name: ' QuestionBank (2).xlsx' })).toBeVisible();
            // status history tab
            await page.locator('a').filter({ hasText: 'Status History' }).click();
            await expect(page.getByRole('cell', { name: 'MWD0000894' }).locator('comp-datatype')).toBeVisible();
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
        });
    });

    test.describe('My Team Tickets', () => {
        test('Create By Me:should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000136').click();
            await page.getByRole('link', { name: ' My Team Tickets' }).click();
            await expect(page.locator('section').getByText('My Team Tickets')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();

            // List Pagination
            await page.locator('//*[@id="dynamic_list_EFN0000276"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('//*[@id="dynamic_list_EFN0000276"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('//*[@id="dynamic_list_EFN0000276"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[5]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="dynamic_list_EFN0000276"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="dynamic_list_EFN0000276"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="dynamic_list_EFN0000276"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[1]').click();
            await page.waitForTimeout(1000);
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            
            // Title Filter
            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000276').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Subject' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('Status for Arrival from India.');
            await page.getByRole('button', { name: '' }).click();
            await expect(page.getByRole('heading', { name: 'Status for Arrival from India.' })).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000276').getByRole('textbox')).toBeEmpty();

            // Status Filter
            await page.locator('#dynamic_list_EFN0000276').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Status' }).click();
            await page.locator('#autoComplete_dropdown_Status label').click();
            await page.getByRole('row', { name: ' Closed Closed' }).locator('i').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.getByText('Need Approval From Chamber of Commerce Visit Visa. 90273 MWD0016041 Closed')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000276').getByRole('textbox')).toBeEmpty();

            // Ticket ID Filter
            await page.locator('#dynamic_list_EFN0000276').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Ticket ID' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('MWD0000075');
            await page.getByRole('button', { name: '' }).click();
            await expect(page.getByRole('paragraph').filter({ hasText: 'MWD0000075' })).toBeVisible();
            await page.locator('comp-field-view-type').filter({ hasText: 'Status for Arrival from India.' }).locator('a').click();

            //Reopen
                await page.getByRole('link', { name: 'Re Open' }).click();
                await page.waitForTimeout(5000);
                await expect(page.locator('#Actionform').getByText('ReOpen')).toBeVisible({ timeout: 7000 });
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('yest');
                await page.getByText('Close', { exact: true }).click();
                // Pickup
                await page.getByRole('link', { name: 'Pickup' }).click();
                await expect(page.locator('#Actionform').getByText('Pickup')).toBeVisible();
                await page.locator('#Actionform').getByText('Close').click();
                await page.getByRole('link', { name: 'Assign', exact: true }).click();
                await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Ali Al Maragah').click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('b.iqbal@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible(
                    { timeout: 7000 }
                );
                await page.getByText('OK', { exact: true }).click();
                await page.locator('#Actionform button').first().click();
                //ticket
                await page.getByRole('link', { name: 'Ticket', exact: true }).click();
                await page.waitForTimeout(1000);
                await page.getByLabel('Title*').click();
                await page.getByLabel('Title*').fill('test');
                await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
                await page.waitForTimeout(2000);
                await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible({ timeout: 5000 });
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.locator('tr').filter({ hasText: 'Maintenance Maintenance' }).locator('i')).toBeVisible({ timeout: 5000 });
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('test');
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).press('Enter');
                await page.locator('#autoComplete_dropdown_tableTicketCategory i').click();
                await page.locator('#relation_autoComplete_dropdown_AssignedTo > .control-input > .form-control').first().click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.Aldhubayban@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
                await page.waitForTimeout(1000);
                await expect(page.getByText('a.alharbi@mawarid.com.sa').first()).toBeVisible();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
                await page.waitForTimeout(1000);
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
                await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().fill('afrith');
                await page.waitForTimeout(1000);
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().press('Enter');
                await page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('m.afrith', { exact: true }).click();
                await page.locator('.angular-editor-textarea').first().click();
                await page.locator('.angular-editor-textarea').first().fill('t');
                await page.locator('div').filter({ hasText: /^t$/ }).first().fill('test');
                await page.locator('button').filter({ hasText: 'Close' }).click();
                await page.getByRole('link', { name: ' Attach' }).click();
                await page.locator('#page_form_MON0000002').getByText('x', { exact: true }).click();
                await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0000075 Subject' }).locator('a').click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Customer Details')).toBeVisible();
                await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();
                await page.locator('a').filter({ hasText: 'Ali Al Maragah' }).click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Coordinators Details')).toBeVisible();
                await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();

                // Reply 
                await page.locator('.timeline-header-action > .actions > .actionlist > a').first().click();
                await page.getByPlaceholder('Add a To').click();
                await page.waitForTimeout(3000);
                await page.getByPlaceholder('Add a To').fill('afrith');
                await expect(page.getByRole('button', { name: 'm.afrith@faaztechsolutions.com' }).first()).toBeVisible();
                await page.getByRole('button', { name: 'm.afrith@faaztechsolutions.com' }).first().click();
                await page.waitForTimeout(3000);
                await page.getByPlaceholder('Add a CC').click();
                await page.getByPlaceholder('Add a CC').fill('afrith');
                await page.waitForTimeout(3000);
                await page.getByRole('button', { name: 'm.afrith@faaztechsolutions.com' }).first().click();
                await page.getByTitle('aabdulhadi@femco.com.sa').hover();
                await page.getByLabel('aabdulhadi@femco.com.sa').getByLabel('Remove tag').click();
                await page.locator('.angular-editor-textarea > div').first().click();
                await page.getByText('Thanks & Regards,Mohamed').fill('Test\n\n\nThanks & Regards,\nMohamed Afrith');
                await page.getByText('Close', { exact: true }).click();

                // Forward
                await page.locator('.timeline-header-action > .actions > .actionlist > a:nth-child(2)').first().click();
                await page.getByPlaceholder('Add a To').click();
                await page.getByPlaceholder('Add a To').fill('afrith');
                await page.waitForTimeout(3000);
                await page.getByRole('button', { name: 'm.afrith@faaztechsolutions.com' }).first().click();
                await page.waitForTimeout(3000);
                await page.getByPlaceholder('Add a CC').click();
                await page.getByPlaceholder('Add a CC').fill('afrith');
                await page.waitForTimeout(3000);
                await page.getByRole('button', { name: 'm.afrith@faaztechsolutions.com' }).first().click();
                await page.locator('.angular-editor-textarea > div').first().click();
                await page.getByText('Thanks & Regards,Mohamed').fill('test\n\n\nThanks & Regards,\nMohamed Afrith');
                await page.getByText('Close', { exact: true }).click();
                
                //Ticket tab
                await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
                await expect(page.getByText('Request Id')).toBeVisible();
                // approvals tab
                await page.locator('//*[starts-with(@id, "cdk-drop-list")]//a').filter({ hasText: 'Approvals' }).click();
                await expect(page.getByText('Approver Id')).toBeVisible();
                // attachments tab
                await page.locator('a').filter({ hasText: 'Attachments' }).click();
                await expect(page.getByRole('cell', { name: 'Name' })).toBeVisible();
                // status history tab
                await page.locator('a').filter({ hasText: 'Status History' }).click();
                await expect(page.getByRole('cell', { name: 'MWD0000075' }).locator('comp-datatype')).toBeVisible();
                await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
                await page.getByRole('button', { name: 'Close' }).click();
                await page.getByRole('button', { name: ' Clear' }).click();
        });
    });

    test.describe('Mails', () => {
        test('Address Book:should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000081').click();
            await page.getByRole('link', { name: ' Address Book' }).click();
            await expect(page.getByText('Customer Contacts')).toBeVisible({ timeout: 7000 });
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();

            // Create 
            await page.getByText('Create', { exact: true }).click();
            await expect(page.locator('h4')).toBeVisible();
            await page.locator('#autoComplete_dropdown_CustomerId label').click();

            // Create Pagination
            await page.getByText('page 2', { exact: true }).click();
            await expect(page.getByText('CBN-0008329')).toBeVisible();
            await expect(page.getByText('شركة اتحاد العائلة للتشغيل')).toBeVisible();
            await page.getByText('Next page').click();
            await expect(page.getByText('CBN0002805')).toBeVisible();
            await expect(page.getByText('sagrclinic@mawaridservices.com')).toBeVisible();
            await page.getByText('page 4').click();
            await expect(page.getByText('CBN-0008052')).toBeVisible();
            await expect(page.getByText('شركة النقل المتخصص الطبي')).toBeVisible();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]').click(); 
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[8]/a').click();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[7]/a').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1', { exact: true }).click(); 

            // Create Name Filter 
            await page.locator('input[type="search"]').nth(1).click();
            await page.locator('input[type="search"]').nth(1).fill('مستشفي المدينة الوطني');
            await expect(page.getByText('مستشفي المدينة الوطني')).toBeVisible();
            await page.locator('input[type="search"]').nth(1).click(); 
            await page.locator('input[type="search"]').nth(1).fill(''); 

            //  Create Email Filter 
            await page.locator('input[type="search"]').nth(2).click();
            await page.locator('input[type="search"]').nth(2).fill('madinanh@mawaridservices.com');
            await expect(page.getByText('madinanh@mawaridservices.com')).toBeVisible();
            await page.locator('input[type="search"]').nth(2).click();
            await page.locator('input[type="search"]').nth(2).press('ControlOrMeta+a');
            await page.locator('input[type="search"]').nth(2).fill('');
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('CBN-0009258');
            await expect(page.getByText('CBN-')).toBeVisible();
            await page.locator('tr').filter({ hasText: 'CBN-0009258' }).locator('i').click();
            await page.getByPlaceholder('Contact Name').click();
            await page.getByPlaceholder('Contact Name').fill('test');
            await page.getByPlaceholder('Email').click();
            await page.getByPlaceholder('Email').fill('test');
            await page.getByText('Close', { exact: true }).click();

            // List Pagination 
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('//*[@id="dynamic_list_EFN0000391"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(1000);
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('//*[@id="dynamic_list_EFN0000391"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a').click();
            await page.waitForTimeout(1000);
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('//*[@id="dynamic_list_EFN0000391"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[5]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="dynamic_list_EFN0000391"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="dynamic_list_EFN0000391"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[1]/a/i').click();
            await page.waitForTimeout(1000);

            // Filter by RecId 
            await page.locator('i:nth-child(2)').click();
            await page.locator('.table_filter_text').first().click();
            await page.locator('.table_filter_text').first().click();
            await page.locator('.table_filter_text').first().fill('11515');
            await page.locator('.table_filter_text').first().press('Enter');
            await expect(page.getByRole('row', { name: '11515 CBN0007859 talharbi@' }).locator('a')).toBeVisible();
            await page.getByRole('cell', { name: '% 11515' }).hover();
            await page.getByRole('cell', { name: '% 11515 ' }).getByRole('combobox').hover(); 
            await page.locator('.table_filter_clear').click();

            // Filter by Customer Id & Pagination
            await page.getByRole('row', { name: '% IN % %' }).locator('label').click();

            // Pagination
            await page.getByText('page 2', { exact: true }).click();
            await expect(page.getByText('CBN-0008329')).toBeVisible();
            await expect(page.getByText('شركة اتحاد العائلة للتشغيل')).toBeVisible();
            await page.getByText('Next page').click();
            await expect(page.getByText('CBN0002805')).toBeVisible();
            await expect(page.getByText('sagrclinic@mawaridservices.com')).toBeVisible();
            await page.getByText('page 4').click();
            await expect(page.getByText('CBN-0008052')).toBeVisible();
            await expect(page.getByText('شركة النقل المتخصص الطبي')).toBeVisible();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]').click(); 
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[8]/a').click();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[7]/a').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1', { exact: true }).click(); 

            // Name Filter 
            await page.locator('input[type="search"]').nth(1).click();
            await page.locator('input[type="search"]').nth(1).fill('مستشفي المدينة الوطني');
            await expect(page.getByText('مستشفي المدينة الوطني')).toBeVisible();
            await page.locator('input[type="search"]').nth(1).click(); 
            await page.locator('input[type="search"]').nth(1).fill(''); 

            // Email Filter 
            await page.locator('input[type="search"]').nth(2).click();
            await page.locator('input[type="search"]').nth(2).fill('madinanh@mawaridservices.com');
            await expect(page.getByText('madinanh@mawaridservices.com')).toBeVisible();
            await page.locator('input[type="search"]').nth(2).click();
            await page.locator('input[type="search"]').nth(2).press('ControlOrMeta+a');
            await page.locator('input[type="search"]').nth(2).fill('');
            await page.locator('input[type="search"]').first().click();

            // Filter by Customer Id
            await page.locator('input[type="search"]').first().fill('CBN-0009258');
            await page.getByRole('cell', { name: 'CBN-0009258', exact: true }).locator('div').click(); 
            await page.getByRole('cell', { name: '', exact: true }).locator('span').click();
            await page.getByRole('cell', { name: 'CBN-0009258', exact: true }).click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.getByRole('row', { name: '11070 CBN-0009258 ahmad-14133' }).locator('comp-datatype').nth(1)).toBeVisible();
            await expect(page.getByRole('row', { name: '11073 CBN-0009258 madinanh@' }).locator('comp-datatype').nth(1)).toBeVisible();
            await page.getByRole('cell', { name: 'IN CBN-' }).getByRole('combobox').hover();
            await page.getByRole('cell', { name: 'IN CBN-' }).hover();
            await page.locator('label').filter({ hasText: 'CBN-' }).locator('i').click();

            // Filter by Email 
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').fill('talharbi@arabianfood.sa');
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('cell', { name: 'talharbi@arabianfood.sa', exact: true }).locator('comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '% talharbi@arabianfood.sa ' }).getByRole('combobox').hover();
            await page.getByRole('cell', { name: '% talharbi@arabianfood.sa ' }).getByRole('textbox').nth(1).hover();
            await page.locator('.table_filter_clear').click();

            // Filter by Contact Name
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').fill('talharbi');
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('row', { name: '11515 CBN0007859 talharbi@' })).toBeVisible();
            await expect(page.getByRole('cell', { name: '11515' }).locator('a')).toBeVisible();

            // Contact Details
            await page.getByRole('cell', { name: '11515' }).locator('a').click();
            await expect(page.getByText('CustomerContactEmail Details')).toBeVisible();
            await expect(page.locator('#DynamicDetails').getByText('talharbi@arabianfood.sa')).toBeVisible();
            await expect(page.locator('#DynamicDetails').getByText('talharbi', { exact: true })).toBeVisible();
            await expect(page.locator('#DynamicDetails').getByText('CBN0007859')).toBeVisible();
            await page.getByText('Next', { exact: true }).click();
            await page.getByText('Previous', { exact: true }).click();
            await page.locator('app-button button').click();
            await page.getByRole('cell', { name: '% talharbi' }).hover();
            await page.getByRole('cell', { name: '% talharbi ' }).getByRole('combobox').hover();
            await page.locator('.table_filter_clear').click();
            await expect(page.locator('td:nth-child(5) > .clearfix > .table_filter_text')).toBeEmpty();
        });

        test('New Mail :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000081').click();
            await page.locator('#MNU0000080').click();
            await page.locator('#relation_autoComplete_dropdown_customerQuery label').nth(1).click();

            // Customer Dropdown Pagination
            await expect(page.locator('input[name="currentPage"]')).toHaveValue('1');
            await page.locator('//*[@id="autoComplete_dropdown_customerQuery"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.locator('input[name="currentPage"]')).toHaveValue('2');
            await page.locator('//*[@id="autoComplete_dropdown_customerQuery"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.locator('input[name="currentPage"]')).toHaveValue('3'); 
            await expect(page.locator('tr').filter({ hasText: 'CBN0002805 مجمع عيادات شركة صقر المجد الدولية sagrclinic@mawaridservices.com' }).locator('i')).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_customerQuery"]/div[2]/div[1]/comp-pagination/ul/li[5]').click(); 
            await page.locator('//*[@id="autoComplete_dropdown_customerQuery"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_customerQuery"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_customerQuery"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click(); 
            await page.locator('//*[@id="autoComplete_dropdown_customerQuery"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await expect(page.locator('tr').filter({ hasText: 'CBN-0009198 شركة ريادتي للتشغيل والصيانة riadty@mawaridservices.com' }).locator('i')).toBeVisible(); 

            // Customer Name Filter 
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(1).click();  
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(1).fill('مستشفي المدينة الوطني');
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(1).press('Enter');
            await expect(page.locator('td').filter({ hasText: 'مستشفي المدينة الوطني' }).locator('comp-datatype')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(1).click();
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(1).press('ControlOrMeta+a');
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(1).fill('');
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(1).press('Enter');
            await expect(page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(1)).toBeEmpty();

            // Customer Email Filter 
            
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(2).click();
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(2).fill('madinanh@mawaridservices.com');
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(2).press('Enter');
            await expect(page.locator('td').filter({ hasText: 'madinanh@mawaridservices.com' }).locator('comp-datatype')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(2).click();
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(2).press('ControlOrMeta+a');
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(2).fill('');
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(2).press('Enter');
            await expect(page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').nth(2)).toBeEmpty();

            // Code/Customer Id Filter
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').first().click();
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').first().fill('CBN-0009258');
            await page.locator('#autoComplete_dropdown_tablecustomerQuery input[type="text"]').first().press('Enter');
            await expect(page.locator('comp-table')).toContainText('CBN-0009258');
            await page.waitForTimeout(2000);
            await page.locator('td').filter({ hasText: 'مستشفي المدينة الوطني' }).locator('comp-datatype').click();
            await page.waitForTimeout(1000);
            await page.getByPlaceholder('To*').click();
            await page.waitForTimeout(1000);
            await page.locator('.modal-body').first().click();
            await page.waitForTimeout(1000);
            await page.getByPlaceholder('To*').click();
            await page.waitForTimeout(1000);
            await page.getByPlaceholder('To*').fill('afrith');
            await page.getByRole('button', { name: 'm.afrith@faaztechsolutions.com' }).first().click();
            await page.getByPlaceholder('Add a To').fill('basith');
            await page.getByRole('button', { name: 'm.basith@faaztechsolutions.com', exact: true }).first().click();
            await page.getByText('m.basith@faaztechsolutions.com', { exact: true }).hover(); 
            await page.getByLabel('m.basith@faaztechsolutions.com').getByLabel('Remove tag').click();
            await page.getByPlaceholder('Cc', { exact: true }).click();
            await page.getByPlaceholder('Cc', { exact: true }).fill('krishna');
            await page.waitForTimeout(2000);
            await page.getByRole('button', { name: 'm.krishna@faaztechsolutions.' }).click();
            await page.waitForTimeout(2000);
            await page.getByPlaceholder('Add a Cc').fill('basith');
            await page.waitForTimeout(2000);
            await page.getByRole('button', { name: 'm.basith@faaztechsolutions.com', exact: true }).first().click();
            await page.getByText('m.basith@faaztechsolutions.com', { exact: true }).hover();
            await page.getByLabel('m.basith@faaztechsolutions.com').getByLabel('Remove tag').click();
            await page.getByPlaceholder('Bcc').click();
            await page.getByPlaceholder('Bcc').fill('basith');
            await page.getByRole('button', { name: 'm.basith@faaztechsolutions.com', exact: true }).first().click();
            await page.waitForTimeout(2000);
            await page.locator('h4').click();
            await page.waitForTimeout(1000);
            await page.getByPlaceholder('Subject').click();
            await page.getByPlaceholder('Subject').fill('test');
            await page.locator('div').filter({ hasText: /^Thanks & Regards,Mohamed Afrith$/ }).locator('div').first().click();
            await page.getByText('Thanks & Regards,Mohamed').fill('test\n\n\nThanks & Regards,\nMohamed Afrith');
            await page.getByText('Close', { exact: true }).click();
        });
    });    

});

