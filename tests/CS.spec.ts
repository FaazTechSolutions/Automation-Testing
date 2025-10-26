import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';


test.describe('Customer Support', async () => {

    test.beforeEach(async ({ page }) => {
        // test.slow();
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
        await expect(page.locator('#canvasjs-angular-chart-container-2 canvas').nth(1)).toBeVisible({ timeout: 3000 });
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
        // test.slow();
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
                await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
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
                await page.waitForTimeout(1300);
                await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible();
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
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('1');

                // await page.locator('ul').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();
                await page.locator('ul.pagination').filter({ hasText: /of/i }).locator('a').nth(2).click();
                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('2');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();

                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('1');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(3).click();
                await page.waitForTimeout(1000);
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i}).locator('a').nth(1).click();
                await page.waitForTimeout(1000);
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').first().click();
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
                await page.waitForTimeout(300);
                await page.getByRole('button', { name: 'Close' }).click();
                await page.getByRole('button', { name: ' Clear' }).click();
            });

            await test.step('Workflow-Schedule', async () => {
                await page.locator('a').filter({ hasText: 'Scheduled' }).click();
                await page.waitForTimeout(1000);
                await page.locator('#tabView_2').getByText('Options').click();
                await expect(page.locator('#tabView_2').getByText('Export SelectedExportExport')).toBeVisible();
                await page.locator('#tabView_2').getByText('Options').click();
                await page.locator('#tabView_2 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > div > div > .card-header > .card-tools > i:nth-child(2)').click();
                await page.locator('#dynamic_list_EFN0000238').getByRole('textbox').click();
                await page.getByRole('option', { name: 'Subject' }).click({ timeout: 2000});
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
                await page.waitForTimeout(700);
                //copy here
                await page.getByRole('link', { name: 'Close', exact: true }).click();
                await expect(page.locator('h4').filter({ hasText: 'Close' })).toBeVisible({ timeout: 2000 });
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
                await page.getByLabel('Title*').click();
                await page.getByLabel('Title*').fill('test title');
                await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('1');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();
                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('2');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();

                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('1');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(3).click();
                await page.waitForTimeout(1000);
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i}).locator('a').nth(1).click();
                await page.waitForTimeout(1000);
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').first().click();
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
                await page.getByLabel('Title*').click();
                await page.getByLabel('Title*').fill('test title');
                await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('1');
                await page.locator('ul').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();
                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('2');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();

                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('1');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(3).click();
                await page.waitForTimeout(1000);
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i}).locator('a').nth(1).click();
                await page.waitForTimeout(1000);
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').first().click();
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
                await page.getByLabel('Title*').click();
                await page.getByLabel('Title*').fill('test title');
                await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('1');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();
                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('2');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();

                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('1');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(3).click();
                await page.waitForTimeout(1000);
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i}).locator('a').nth(1).click();
                await page.waitForTimeout(1000);
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').first().click();
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
                await page.getByLabel('Title*').click();
                await page.getByLabel('Title*').fill('test title');
                await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('1');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();
                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('2');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();

                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('1');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(3).click();
                await page.waitForTimeout(1000);
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i}).locator('a').nth(1).click();
                await page.waitForTimeout(1000);
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').first().click();
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
                await page.getByLabel('Title*').click();
                await page.getByLabel('Title*').fill('test title');
                await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('1');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();
                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('2');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();

                await page.waitForTimeout(1000);
                await expect(page.locator('#autoComplete_dropdown_TicketCategory input[name="currentPage"]')).toHaveValue('1');
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').nth(3).click();
                await page.waitForTimeout(1000);
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i}).locator('a').nth(1).click();
                await page.waitForTimeout(1000);
                await page.locator('ul.pagination').filter({ hasText: /of\s*\d+/i }).locator('a').first().click();
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
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
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
            await page.getByText('Options').click({ timeout: 2000 });
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
            await expect(page.locator('.grid-field-tag > comp-datatype').first()).toBeVisible();
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
            await page.waitForTimeout(600);
            await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(600);
            await expect(page.getByText('b.iqbal@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(600);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(600);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await page.waitForTimeout(600);
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
            await page.waitForTimeout(800);
            await expect(page.getByText('a.alharbi@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().click();
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().fill('afrith');
            // await page.waitForTimeout(1000);
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
            await page.waitForTimeout(900);
            await expect(page.getByText('Customer Details')).toBeVisible();
            await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();
            await page.locator('a').filter({ hasText: 'Ali Al Maragah' }).click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Coordinators Details')).toBeVisible();
            await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();

            // Reply 
            await page.locator('.timeline-header-action > .actions > .actionlist > a').first().click();
            await page.getByPlaceholder('Add a To').click();
            await page.waitForTimeout(1000);
            await page.getByPlaceholder('Add a To').fill('afrith');
            await expect(page.getByRole('button', { name: 'm.afrith@faaztechsolutions.com' }).first()).toBeVisible();
            await page.getByRole('button', { name: 'm.afrith@faaztechsolutions.com' }).first().click({ timeout: 2000});
            await page.waitForTimeout(1000);
            await page.getByPlaceholder('Add a CC').click();
            await page.getByPlaceholder('Add a CC').fill('afrith');
            await page.getByRole('button', { name: 'm.afrith@faaztechsolutions.com' }).first().click({ timeout: 10000});
            await page.getByTitle('aabdulhadi@femco.com.sa').hover();
            await page.getByLabel('aabdulhadi@femco.com.sa').getByLabel('Remove tag').click();
            await page.locator('.angular-editor-textarea > div').first().click();
            await page.getByText('Thanks & Regards,Mohamed').fill('Test\n\n\nThanks & Regards,\nMohamed Afrith');
            await page.getByText('Close', { exact: true }).click();

            // Forward
            await page.locator('.timeline-header-action > .actions > .actionlist > a:nth-child(2)').first().click();
            await page.getByPlaceholder('Add a To').click();
            await page.getByPlaceholder('Add a To').fill('afrith');
            await page.waitForTimeout(1000);
            await page.getByRole('button', { name: 'm.afrith@faaztechsolutions.com' }).first().click();
            await page.waitForTimeout(1000);
            await page.getByPlaceholder('Add a CC').click();
            await page.getByPlaceholder('Add a CC').fill('afrith');
            await page.waitForTimeout(1000);
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

        test('Inbox: should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000081').click();
            await page.getByRole('link', { name: ' Inbox' }).click();
            await expect(page.locator('section').getByText('Inbox')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();

            // List pagenation 
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('//*[@id="dynamic_list_EFN0000230"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('//*[@id="dynamic_list_EFN0000230"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('//*[@id="dynamic_list_EFN0000230"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('//*[@id="dynamic_list_EFN0000230"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('//*[@id="dynamic_list_EFN0000230"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[5]').click();
            await expect(page.getByRole('listitem').filter({ hasText: 'a. a.moustafa@delta-medlab.' })).toBeVisible({ timeout: 30000 });
            await page.locator('//*[@id="dynamic_list_EFN0000230"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]').click();
            await page.locator('//*[@id="dynamic_list_EFN0000230"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]').click();
            await expect(page.getByRole('listitem').filter({ hasText: 'a. a.alsaaidi@mawarid.com.sa' }).nth(2)).toBeVisible({ timeout: 30000 });
            await page.locator('//*[@id="dynamic_list_EFN0000230"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[1]').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Mail From Filter
            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000230').getByRole('textbox').click();
            await page.getByRole('option', { name: 'From' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('reachidris@gmail.com');
            await page.getByRole('button', { name: '' }).click();
            await expect(page.getByRole('heading', { name: 'reachidris@gmail.com' }).first()).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000230').getByRole('textbox')).toBeEmpty();

            // Filter By Date - Filter has issue, after fix then test
            // await page.locator('#dynamic_list_EFN0000230').getByRole('textbox').click();
            // await page.getByText('CreatedDateTime').click();
            // await page.locator('input[type="date"]').fill('2024-10-13');
            // await page.getByRole('button', { name: '' }).click();

            //  Filter by Title
            await page.locator('#dynamic_list_EFN0000230').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Title' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('request for employee contract');
            await page.getByRole('button', { name: '' }).click();
            await expect(page.getByRole('paragraph').filter({ hasText: 'request for employee contract' }).first()).toBeVisible();

            // Details Page
            await page.locator('a').filter({ hasText: 'reachidris@gmail.com' }).nth(1).click();
            await expect(page.getByRole('heading', { name: '[MWD0000007] RE: [MWD0000007' })).toBeVisible();
            await expect(page.locator('#custom_template_dynamic_list_EFN0000229')).toContainText('reachidris@gmail.com To: alayuni@mawaridservices.com Cc: reply from Customer Thanks & Regards, Mohamed Idhris V.U Mobile # +00966507116987On Sun, Oct 13, 2024 at 2:23 PM Mawarid Customer Care <alayuni@mawaridservices.com> wrote:please find documentWarm regardsMohamed Idhris, PMPApplication ManagerMawarid Manpower Solutions Company | Riyadh, Saudi ArabiaEmail: m.viswa@mawarid.com/sa | Office: 966 11 2899191Mobile No: +00966590362041P.O. Box 103706 RIYADH 11616, Kingdom of Saudi Arabia www.mawarid.com.saDisclaimer:* This communication contains information which is privileged and confidential. It is exclusively to the intended recipient(s). If you are not the intended recipient(s), please: (1) notify the sender by forwarding this email and delete all copies from your system and (2) note that disclosure, distribution, copying or use of this communication is strictly prohibited. Any erroneous disclosure, distribution or copying of this email communications cannot be guaranteed to be secure or free from error or viruses. Please see www.Mawarid.com.sa to learn more.');
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000230').getByRole('textbox')).toBeEmpty();
        });

        test('Sent Item: should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000081').click();
            await page.getByRole('link', { name: ' Sent Item' }).click();
            await expect(page.locator('section').getByText('Sent Item')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();

            // List pagenation 
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('//*[@id="dynamic_list_EFN0000231"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('//*[@id="dynamic_list_EFN0000231"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('//*[@id="dynamic_list_EFN0000231"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('//*[@id="dynamic_list_EFN0000231"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('//*[@id="dynamic_list_EFN0000231"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[5]').click();
            await page.locator('//*[@id="dynamic_list_EFN0000231"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]').click();
            await page.locator('//*[@id="dynamic_list_EFN0000231"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]').click();
            await page.locator('//*[@id="dynamic_list_EFN0000231"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[1]').click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Mail From Filter
            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000231').getByRole('textbox').click();
            await page.getByRole('option', { name: 'ToRecipients' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('a.minhaj@faaztechsolutions.com');
            await page.getByRole('button', { name: '' }).click();
            await expect(page.getByRole('heading', { name: 'a.minhaj@faaztechsolutions.com' }).first()).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click({ timeout: 2000 });
            await expect(page.locator('#dynamic_list_EFN0000231').getByRole('textbox')).toBeEmpty();

            // Filter By Date - Filter has issue, after fix then test
            // await page.locator('#dynamic_list_EFN0000231').getByRole('textbox').click();
            // await page.getByText('CreatedDateTime').click();
            // await page.locator('input[type="date"]').fill('2024-10-13');
            // await page.getByRole('button', { name: '' }).click();

            //  Filter by Title
            await page.locator('#dynamic_list_EFN0000231').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Title' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('Testing mail from mobile');
            await page.getByRole('button', { name: '' }).click();
            await expect(page.getByRole('paragraph').filter({ hasText: 'Testing mail from mobile' }).first()).toBeVisible();

            // Details Page
            await page.locator('a').filter({ hasText: 'a.minhaj@faaztechsolutions.com' }).nth(1).click();
            await expect(page.getByRole('heading', { name: '[MWD0015547] RE: [MWD0015547' })).toBeVisible();
            await expect(page.locator('#custom_template_dynamic_list_EFN0000229')).toContainText('alsaif@mawaridservices.com To: a.minhaj@faaztechsolutions.com Cc: Dear Customer, Your Customer Support Ticket in Scheduled.Ticket Information:-Ticket ID : MWD0015547Title : Testing mail from mobileStatus : ScheduledScheduled Date : 07/02/2025 00:00:00Regards,Mawarid Customer Care');
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000231').getByRole('textbox')).toBeEmpty();
        });
    });

    test.describe('Setup', () => {
        test('Customer :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000001').click();
            await page.getByRole('link', { name: '﨡 Customer' }).click();
            await expect(page.locator('section').getByText('Customer')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();

            // Table Pagination 
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('4');
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(3).click();
            await expect(page.getByRole('row', { name: 'CBN0007200 Barkat Barkat' }).getByLabel('')).toBeVisible();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Create
            await page.getByText('Create', { exact: true }).click();
            await page.getByPlaceholder('Code').click();
            await page.getByPlaceholder('Code').fill('tst');
            await page.locator('div:nth-child(2) > .col-9').first().click();
            await page.getByPlaceholder('Name', { exact: true }).fill('test');
            await page.getByPlaceholder('Support Email').click();
            await page.getByPlaceholder('Support Email').fill('test@');
            await page.getByPlaceholder('Id', { exact: true }).click();
            await page.getByPlaceholder('Id', { exact: true }).fill('1');
            await page.getByPlaceholder('Short Name').click();
            await page.getByPlaceholder('Short Name').fill('nooon');
            await page.getByPlaceholder('Project Supervisor').click();
            await page.getByPlaceholder('Project Supervisor').fill('test');
            await page.getByPlaceholder('Owner').click();
            await page.getByPlaceholder('Owner').fill('test');
            await page.getByText('Close', { exact: true }).click();

            // Short Filter 
            await page.locator('i:nth-child(2)').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('Noon');
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByText('Noon', { exact: true }).first()).toBeVisible();
            await page.getByRole('cell', { name: '% Noon' }).hover();
            await page.getByRole('cell', { name: '% Noon ' }).getByRole('combobox').hover();
            await page.locator('.table_filter_clear').click();
            await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').fill('Noon');
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByText('Noon', { exact: true }).nth(1)).toBeVisible();
            await page.getByRole('cell', { name: '% Noon' }).hover();
            await page.getByRole('cell', { name: '% Noon ' }).getByRole('combobox').hover();
            await page.locator('.table_filter_clear').click();
            await expect(page.locator('td:nth-child(4) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter By Support Mail

            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').fill('noon@mawaridservices.com');
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('cell', { name: 'noon@mawaridservices.com', exact: true }).locator('comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '% noon@mawaridservices.com' }).hover();
            await page.getByRole('cell', { name: '% noon@mawaridservices.com ' }).getByRole('combobox').hover();
            await page.locator('.table_filter_clear').click();
            await expect(page.locator('td:nth-child(5) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter By Project Supervisor
            await page.locator('td:nth-child(6) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(6) > .clearfix > .table_filter_text').fill('Mohamed al omer');
            await page.locator('td:nth-child(6) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('cell', { name: 'Mohamed al omer', exact: true }).locator('comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '% Mohamed al omer' }).hover();
            await page.getByRole('cell', { name: '% Mohamed al omer ' }).getByRole('combobox').hover();
            await page.locator('.table_filter_clear').click();

            // Filter By Owner

            await page.locator('td:nth-child(8) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(8) > .clearfix > .table_filter_text').fill('Ali alsaaidi');
            await page.locator('td:nth-child(8) > .clearfix > .table_filter_text').press('Enter');
            await page.getByRole('cell', { name: '% Ali alsaaidi' }).hover();
            await page.getByRole('cell', { name: '% Ali alsaaidi ' }).getByRole('combobox').hover();
            await page.locator('.table_filter_clear').click();
            await expect(page.locator('td:nth-child(7) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter By Account
            await page.locator('td:nth-child(8) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(8) > .clearfix > .table_filter_text').fill('\t مستشفى دلة');
            await page.locator('td:nth-child(8) > .clearfix > .table_filter_text').press('Enter');
            await page.getByRole('cell', { name: '% مستشفى دلة' }).hover();
            await page.getByRole('cell', { name: '% مستشفى دلة ' }).getByRole('combobox').hover();
            await page.locator('.table_filter_clear').click();
            await expect(page.locator('td:nth-child(8) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter By Code
            await page.locator('.table_filter_text').first().click();
            await page.locator('.table_filter_text').first().fill('CBN-0009867');
            await page.locator('.table_filter_text').first().press('Enter');
            await expect(page.getByRole('row', { name: 'CBN-0009867 Noon Noon noon@' }).locator('a')).toBeVisible();

            // Details Page
            await page.getByRole('row', { name: 'CBN-0009867 Noon Noon noon@' }).locator('a').click();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.locator('dynamic-details')).toContainText('Customer Details Code CBN-0009867 Name Noon Support Email noon@mawaridservices.com Id CR Labor Office ID Sales Rep Name Sales Rep Email Sales Rep Phone Number VAT Number Short Name Noon Project Supervisor Mohamed al omer Owner Ali alsaaidi');
            await expect(page.getByText('Customer Contact By CustomerID')).toBeVisible();

            // Details Page Create & Create Pagination
            await page.locator('#page_left').getByText('Create').click();
            await page.locator('#DynamicCreate #autoComplete_dropdown_CustomerId label').click();
            await expect(page.getByText('CBN-0009198')).toBeVisible();
            await expect(page.getByText('شركة ريادتي للتشغيل والصيانة')).toBeVisible();
            await page.getByText('Next page').click();
            await expect(page.getByText('CBN-0008093')).toBeVisible();
            await expect(page.getByText('شركة الخوالد للخدمات الطبية المحدودة')).toBeVisible();
            await page.getByText('page 4').click();
            await expect(page.getByText('CBN-0009099')).toBeVisible();
            await expect(page.getByText('شركة مالين الطبية')).toBeVisible();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]').click();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[8]/a').click();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[7]/a').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1', { exact: true }).click();
            await page.locator('tr').filter({ hasText: 'CBN-0009198' }).locator('i').click();
            await page.getByPlaceholder('Contact Name').click();
            await page.getByPlaceholder('Contact Name').fill('test');
            await page.getByPlaceholder('Email').click();
            await page.getByPlaceholder('Email').fill('test');
            await page.getByText('Close', { exact: true }).click();

            // Details Page Table Pagination 
            await expect(page.locator('#dynamic_list_EFN0000393 input[name="currentPage"]')).toHaveValue('1');
            await page.locator('//*[@id="dynamic_list_EFN0000393"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.locator('#dynamic_list_EFN0000393 input[name="currentPage"]')).toHaveValue('2');
            await page.locator('//*[@id="dynamic_list_EFN0000393"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.locator('#dynamic_list_EFN0000393 input[name="currentPage"]')).toHaveValue('3');
            await page.locator('//*[@id="dynamic_list_EFN0000393"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.locator('#dynamic_list_EFN0000393 input[name="currentPage"]')).toHaveValue('4');
            await page.locator('//*[@id="dynamic_list_EFN0000393"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]/a/i').click();
            await expect(page.locator('#dynamic_list_EFN0000393 input[name="currentPage"]')).toHaveValue('3');
            await page.locator('//*[@id="dynamic_list_EFN0000393"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]/a/i').click();
            await expect(page.locator('#dynamic_list_EFN0000393 input[name="currentPage"]')).toHaveValue('2');
            await page.locator('//*[@id="dynamic_list_EFN0000393"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[1]').click();
            await expect(page.locator('#dynamic_list_EFN0000393 input[name="currentPage"]')).toHaveValue('1');
            await page.locator('ul').filter({ hasText: 'of14' }).locator('a').nth(3).click();
            await expect(page.locator('td').filter({ hasText: '11492' }).locator('div')).toBeVisible();
            await expect(page.locator('td').filter({ hasText: 'k.jamil@mawarid.com.sa' }).locator('comp-datatype')).toBeVisible();
            await expect(page.getByText('k.jamil').nth(1)).toBeVisible();
            await expect(page.locator('tr').filter({ hasText: '11492 k.jamil@mawarid.com.sa' }).locator('comp-datatype').nth(3)).toBeVisible();
            await page.locator('//*[@id="dynamic_list_EFN0000393"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="dynamic_list_EFN0000393"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="dynamic_list_EFN0000393"]/widget-grid/div[1]/div[3]/div[2]/comp-pagination/ul/li[1]').click();
            await expect(page.locator('#dynamic_list_EFN0000393 input[name="currentPage"]')).toHaveValue('1');

            // Details Page Filter By Email 
            await page.locator('.card-body > app-dynamic-list > .content > .container-fluid > div > div > .card-header > .card-tools > i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000393 > widget-grid > .card > div:nth-child(2) > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('#dynamic_list_EFN0000393 > widget-grid > .card > div:nth-child(2) > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').fill('k.jamil@mawarid.com.sa');
            await page.locator('#dynamic_list_EFN0000393 > widget-grid > .card > div:nth-child(2) > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').press('Enter'); await expect(page.locator('td').filter({ hasText: 'k.jamil@mawarid.com.sa' })).toBeVisible();
            await page.locator('#dynamic_list_EFN0000393 > widget-grid > .card > div:nth-child(2) > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .mb-1 > .ng-select-container > .ng-value-container > .ng-input').hover();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_clear').click();

            // Details Page FIlter By Contact Name 
            await page.locator('#dynamic_list_EFN0000393 > widget-grid > .card > div:nth-child(2) > comp-table > table > thead > tr:nth-child(2) > td:nth-child(4) > .clearfix > .table_filter_text').click();
            await page.locator('#dynamic_list_EFN0000393 > widget-grid > .card > div:nth-child(2) > comp-table > table > thead > tr:nth-child(2) > td:nth-child(4) > .clearfix > .table_filter_text').fill('k.jamil');
            await page.locator('#dynamic_list_EFN0000393 > widget-grid > .card > div:nth-child(2) > comp-table > table > thead > tr:nth-child(2) > td:nth-child(4) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByText('k.jamil').nth(1)).toBeVisible();
            await page.locator('#dynamic_list_EFN0000393 > widget-grid > .card > div:nth-child(2) > comp-table > table > thead > tr:nth-child(2) > td:nth-child(4) > .clearfix > .mb-1 > .ng-select-container > .ng-value-container > .ng-input').hover();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_clear').click();
            await expect(page.locator('#dynamic_list_EFN0000393 > widget-grid > .card > div:nth-child(2) > comp-table > table > thead > tr:nth-child(2) > td:nth-child(4) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter By Customer Id & Customer Pagination
            await page.locator('td').filter({ hasText: '⯆×IN× x' }).locator('label').click();
            await expect(page.getByText('CBN-0009198')).toBeVisible();
            await expect(page.getByText('شركة ريادتي للتشغيل والصيانة')).toBeVisible();
            await page.getByText('Next page').click();
            await expect(page.getByText('CBN-0008093')).toBeVisible();
            await expect(page.getByText('شركة الخوالد للخدمات الطبية المحدودة')).toBeVisible();
            await page.getByText('page 4').click();
            await expect(page.getByText('CBN-0009099')).toBeVisible();
            await expect(page.getByText('شركة مالين الطبية')).toBeVisible();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]').click();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[8]/a').click();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[7]/a').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1', { exact: true }).click();

            await page.locator('input[type="search"]').nth(1).click();
            await page.locator('input[type="search"]').nth(1).fill('noon');
            await expect(page.locator('#dynamic_list_EFN0000393').getByText('Noon', { exact: true })).toBeVisible();
            await page.locator('input[type="search"]').nth(1).click();
            await page.locator('input[type="search"]').nth(1).fill('');
            await expect(page.locator('input[type="search"]').nth(1)).toBeEmpty();
            await page.locator('input[type="search"]').nth(2).click();
            await page.locator('input[type="search"]').nth(2).fill('noon');
            await expect(page.locator('#dynamic_list_EFN0000393 #autoComplete_dropdown_table_CustomerId').getByText('noon@mawaridservices.com')).toBeVisible();
            await page.locator('input[type="search"]').nth(2).click();
            await page.locator('input[type="search"]').nth(2).fill('');
            await expect(page.locator('input[type="search"]').nth(2)).toBeEmpty();
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('\t CBN-0009867');
            await page.locator('tbody').filter({ hasText: 'CBN-0009867 Noon noon@' }).locator('i').click();
            // Zoom out (e.g., 90%)
            await page.evaluate(() => {
                document.body.style.zoom = "90%";
            });
            await page.getByText('OK', { exact: true }).click();
            await expect(page.locator('tr').filter({ hasText: '10792 noon@mawaridservices.' }).locator('comp-datatype').nth(3)).toBeVisible();
            await expect(page.locator('tr').filter({ hasText: '10793 m.viswa@mawarid.com.sa' }).locator('comp-datatype').nth(3)).toBeVisible();
            await page.locator('td').filter({ hasText: '⯆×IN× CBN-0009867 x Code Name' }).hover();
            await page.locator('label').filter({ hasText: 'CBN-' }).hover();
            await page.locator('label').filter({ hasText: 'CBN-' }).locator('span').click();
        });

        test('Team :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000001').click();
            await page.getByRole('link', { name: '﫟 Team', exact: true }).click();
            await expect(page.getByText('Teams')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();

            // Create
            await page.getByText('Create', { exact: true }).click();
            await page.locator('#autoComplete_dropdown_UserID label').nth(1).click();
            await page.locator('input[type="search"]').nth(2).click();
            await page.locator('input[type="search"]').nth(2).fill('Hyder');
            await expect(page.locator('#autoComplete_dropdown_table_UserID').getByText('hyder@faaztechsolutions.com')).toBeVisible();
            await page.locator('input[type="search"]').nth(2).click();
            await page.locator('input[type="search"]').nth(2).fill('');
            await expect(page.locator('input[type="search"]').nth(2)).toBeEmpty();
            await page.locator('input[type="search"]').nth(1).click();
            await page.locator('input[type="search"]').nth(1).fill('hyder');
            await expect(page.getByText('Hyder Ali A')).toBeVisible();
            await page.locator('input[type="search"]').nth(1).click();
            await page.locator('input[type="search"]').nth(1).fill('');
            await expect(page.locator('input[type="search"]').nth(1)).toBeEmpty();

            // Create Dropdown Pagination

            await page.getByText('page 2').click();
            await page.getByText('page 3').click();
            await page.getByText('page 4').click();
            await page.getByText('Previous page').click();
            await expect(page.getByText('a.aldursuni@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('page 2').click();
            await expect(page.getByText('a.alangari@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('Previous page').click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]').click();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[8]/a').click();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[7]').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1').click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('hyder');
            await page.locator('tr').filter({ hasText: 'a.hyder Hyder Ali A hyder@' }).locator('i').click();
            await expect(page.getByPlaceholder('Name')).toBeVisible();
            await expect(page.getByPlaceholder('Email')).toBeVisible();
            await page.getByPlaceholder('Mobile Number').click();
            await page.getByPlaceholder('Mobile Number').fill('65988451578');
            await page.locator('ng-select input[type="text"]').click();
            await page.locator('div').filter({ hasText: /^Supervisor$/ }).click();

            // Reporting To Dropdown
            await page.locator('#relation_autoComplete_dropdown_ReportingTo label').nth(1).click();
            await page.locator('.table_filter_text').first().click();
            await page.locator('.table_filter_text').first().fill('hyder');
            await page.locator('.table_filter_text').first().press('Enter');
            await expect(page.locator('#autoComplete_dropdown_tableReportingTo').getByText('a.hyder', { exact: true })).toBeVisible();
            await page.locator('.table_filter_text').first().click();
            await page.locator('.table_filter_text').first().fill('');
            await page.locator('.table_filter_text').first().press('Enter');
            await expect(page.locator('.table_filter_text').first()).toBeEmpty();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('hyder');
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.locator('#autoComplete_dropdown_tableReportingTo tbody').getByText('Hyder', { exact: true })).toBeVisible();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('');
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();
            await expect(page.locator('#autoComplete_dropdown_ReportingTo input[name="currentPage"]')).toHaveValue('1');
            await page.waitForTimeout(1000);
            await page.locator('#autoComplete_dropdown_ReportingTo comp-pagination a').nth(2).click();
            await expect(page.locator('#autoComplete_dropdown_ReportingTo input[name="currentPage"]')).toHaveValue('2');
            await page.waitForTimeout(1000);
            await page.locator('#autoComplete_dropdown_ReportingTo comp-pagination a').nth(2).click();
            await expect(page.locator('#autoComplete_dropdown_ReportingTo input[name="currentPage"]')).toHaveValue('3');
            await page.locator('#autoComplete_dropdown_ReportingTo comp-pagination a').nth(3).click();
            await page.waitForTimeout(1000);
            await page.locator('#autoComplete_dropdown_ReportingTo comp-pagination a').nth(1).click();
            await page.waitForTimeout(1000);
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').click();
            await page.waitForTimeout(1000);
            await page.locator('#autoComplete_dropdown_ReportingTo comp-pagination a').nth(1).click();
            await page.waitForTimeout(1000);
            await page.locator('#autoComplete_dropdown_ReportingTo comp-pagination a').first().click();
            await page.waitForTimeout(1000);
            await expect(page.locator('#autoComplete_dropdown_ReportingTo input[name="currentPage"]')).toHaveValue('1');
            await page.locator('tr').filter({ hasText: 'a.hyder Hyder Supervisor hyder@faaztechsolutions.com m.afrith m.afrith m.afrith' }).locator('i').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.getByText('Close', { exact: true }).click();

            // Table Pagination
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await expect(page.getByRole('table').locator('a').filter({ hasText: 'a.alashwan@mawarid.com.sa' })).toBeVisible();
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.getByRole('table').locator('a').filter({ hasText: 'j.wilfred@mawarid.com.sa' })).toBeVisible();
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('cell', { name: 'm.basith', exact: true }).locator('a')).toBeVisible();
            await page.locator('comp-pagination a').nth(3).click();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Filter By Name
            await page.locator('i:nth-child(2)').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('Saud Alsharif');
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('cell', { name: 'Saud Alsharif', exact: true }).locator('comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '% Saud Alsharif' }).hover();
            await page.getByRole('cell', { name: '% Saud Alsharif ' }).getByRole('combobox').hover();
            await page.locator('.table_filter_clear').click();

            // Filter By Position
            await page.locator('#autoComplete_dropdown_Position label').click();
            await page.getByRole('row', { name: ' Supervisor Supervisor', exact: true }).locator('i').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.locator('td:nth-child(4) > .col-group-indent-1 > comp-field-view-type > span > comp-datatype').first()).toBeVisible();
            await page.getByRole('cell', { name: 'IN Supervisor' }).hover();
            await page.locator('label').filter({ hasText: 'Supervisor' }).locator('i').click();

            // Filter By Email 
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').fill('s.alsharif@mawarid.com.sa');
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('table').locator('span').filter({ hasText: 's.alsharif@mawarid.com.sa' }).locator('comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '% s.alsharif@mawarid.com.sa' }).hover();
            await page.getByRole('cell', { name: '% s.alsharif@mawarid.com.sa ' }).getByRole('combobox').hover();
            await page.locator('.table_filter_clear').click();
            await expect(page.locator('td:nth-child(5) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter By User Id - 
            await page.locator('#autoComplete_dropdown_UserID label').click();
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('s.alsharif@mawarid.com.sa');
            await page.getByText('s.alsharif@mawarid.com.sa').first().click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.getByRole('row', { name: 's.alsharif@mawarid.com.sa Saud Alsharif Coordinator s.alsharif@mawarid.com.sa' }).getByLabel('')).toBeVisible();
            await page.getByRole('table').locator('a').filter({ hasText: 's.alsharif@mawarid.com.sa' }).click();

            // Details Page
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Coordinators Details')).toBeVisible();
            await expect(page.locator('dynamic-details')).toContainText('Coordinators Details User Id s.alsharif@mawarid.com.sa Name Saud Alsharif Email s.alsharif@mawarid.com.sa Mobile Number 554515551 Position Coordinator Reporting To Mohammad Obaid Profile Signature Reporting Path n.alshammari@mawarid.com.sa-m.obaid@mawarid.com.sa Reporting Child n.alshammari@mawarid.com.sa-m.obaid@mawarid.com.sa-s.alsharif@mawarid.com.sa');
            await expect(page.getByText('Customers')).toBeVisible();

            // Details Page Create 
            await page.locator('#page_left').getByText('Create').click();
            await page.locator('#relation_autoComplete_dropdown_CustomerCode label').click();
            await page.locator('thead').filter({ hasText: 'Code Name Support Email' }).locator('td').nth(1).hover();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').first().click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').first().fill('CBN-0009867');
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').first().press('Enter');
            await expect(page.getByText('CBN-0009867')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').first().click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').first().fill('');
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').first().press('Enter');
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(1).click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(1).fill('Noon');
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(1).press('Enter');
            await expect(page.locator('#autoComplete_dropdown_tableCustomerCode tbody').getByText('Noon', { exact: true })).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(1).click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(1).fill('');
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(1).press('Enter');
            await expect(page.getByText('CBN-0009198')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(2).click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(2).fill('noon@mawaridservices.com');
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(2).press('Enter');
            await expect(page.locator('td').filter({ hasText: 'noon@mawaridservices.com' }).locator('comp-datatype')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(2).click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(2).fill('');
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(2).press('Enter');
            await expect(page.locator('td').filter({ hasText: 'noon@mawaridservices.com' }).locator('comp-datatype')).not.toBeVisible();
            await page.locator('tr').filter({ hasText: 'CBN-0009198' }).locator('i').click();
            await page.getByText('Close', { exact: true }).click();
            await expect(page.locator('td').filter({ hasText: 'CBN-' }).locator('a')).toBeVisible();
            await page.locator('td').filter({ hasText: 'CBN-' }).locator('a').click();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.locator('#page_left')).toContainText('Customer Details Code CBN-0009756 Name LG Support Email lg@mawaridservices.com Id CR Labor Office ID Sales Rep Name Sales Rep Email Sales Rep Phone Number VAT Number Short Name LG Project Supervisor faris alwgait Owner Nahar alshammari');
            await page.locator('#page_left button').click();
            await page.locator('#DynamicDetails button').click();
            await page.getByRole('cell', { name: 'IN s.alsharif@mawarid.com.sa' }).getByRole('combobox').hover();
            await page.getByRole('cell', { name: 'IN s.alsharif@mawarid.com.sa' }).hover();
            await page.getByRole('cell', { name: 'IN s.alsharif@mawarid.com.sa' }).locator('label').hover();
            await page.locator('label').filter({ hasText: 's.alsharif@mawarid.com.sa' }).locator('i').click();
        });

        test.skip('Team Structure :should filter, select, and validate requests', async ({ page }, testInfo) => {
            testInfo.annotations.push({
                type: 'issue',
                description: 'https://github.com/FaazTechSolutions/Apps4x_new/issues/528',
            });
            await page.locator('#MNU0000001').click();
            await page.getByRole('link', { name: '﫟 Team Structure' }).click();
            await expect(page.locator('section').getByText('Team')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();
            await page.locator('i:nth-child(2)').click();
        });

        test('Coordinator Customer :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000001').click();
            await page.getByRole('link', { name: ' Coordinator Customer' }).click();
            await expect(page.locator('section').getByText('Coordinator Customer')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();

            // Pagination 
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await expect(page.getByRole('row', { name: 's.alrodan Saud Alrodan s.alrodan@mawarid.com.sa CBN-0008161' }).locator('a').first()).toBeVisible();
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('4');
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await expect(page.getByRole('table').locator('a').filter({ hasText: 'j.wilfred@mawarid.com.sa' })).toBeVisible();
            await page.locator('comp-pagination a').nth(3).click();
            await expect(page.getByRole('row', { name: 'm.krishna Krishna m.krishna@faaztechsolutions.com 0987654321 CBN0001030' }).locator('a').first()).toBeVisible();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Filter By User id
            await page.locator('i:nth-child(2)').click();
            await page.locator('#relation_autoComplete_dropdown_UserID label').click();
            await expect(page.getByText('a.hyder', { exact: true }).first()).toBeVisible();
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();
            await page.waitForTimeout(150);
            await expect(page.getByRole('cell', { name: 'IN User Id Name Position' }).getByRole('spinbutton')).toHaveValue('2');
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();
            await page.waitForTimeout(150);
            await expect(page.getByRole('cell', { name: 'IN User Id Name Position' }).getByRole('spinbutton')).toHaveValue('3');
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(1).click();
            await page.waitForTimeout(150);
            await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible();
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').first().click();
            await page.waitForTimeout(150);
            await expect(page.getByRole('cell', { name: 'IN User Id Name Position' }).getByRole('spinbutton')).toHaveValue('1');
            await expect(page.getByText('a.hyder', { exact: true }).first()).toBeVisible();
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();
            await page.waitForTimeout(150);
            await expect(page.getByRole('cell', { name: 'IN User Id Name Position' }).getByRole('spinbutton')).toHaveValue('2');
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();
            await page.waitForTimeout(150);
            await expect(page.getByRole('cell', { name: 'IN User Id Name Position' }).getByRole('spinbutton')).toHaveValue('3');
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(3).click();
            await page.waitForTimeout(150);
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(1).click();
            await page.waitForTimeout(150);
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(1).click();
            await page.waitForTimeout(150);
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').first().click();
            await page.waitForTimeout(250);
            await page.locator('#autoComplete_dropdown_tableUserID > comp-table > .table > thead > tr:nth-child(2) > td:nth-child(2) > .clearfix > .table_filter_text').click();
            await page.locator('#autoComplete_dropdown_tableUserID > comp-table > .table > thead > tr:nth-child(2) > td:nth-child(2) > .clearfix > .table_filter_text').fill('krishna');
            await page.waitForTimeout(200);
            await page.locator('#autoComplete_dropdown_tableUserID > comp-table > .table > thead > tr:nth-child(2) > td:nth-child(2) > .clearfix > .table_filter_text').press('Enter');
            await page.waitForTimeout(200);
            await expect(page.getByText('m.krishna', { exact: true })).toBeVisible();
            await page.getByText('m.krishna', { exact: true }).click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.getByRole('row', { name: 'm.krishna Krishna m.krishna@faaztechsolutions.com 0987654321 CBN0001030' }).locator('a').first()).toBeVisible();

            // Details page
            await page.getByRole('row', { name: 'm.krishna Krishna m.krishna@faaztechsolutions.com 0987654321 CBN0001030' }).locator('a').first().click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Coordinators Details')).toBeVisible();
            await expect(page.locator('dynamic-details')).toContainText('User Id m.krishna Name Krishna Email m.krishna@faaztechsolutions.com Mobile Number 0987654321 Position Coordinator Reporting To Mehran Basith Profile Signature Regards, Krishna Reporting Path m.afrith-m.basith Reporting Child m.afrith-m.basith-m.krishna');
            await page.locator('#DynamicDetails button').click();
            await page.getByRole('cell', { name: 'IN Krishna' }).hover();
            await page.locator('label').filter({ hasText: 'Krishna' }).hover();
            await page.locator('label').filter({ hasText: 'Krishna' }).locator('i').click();
            await expect(page.getByRole('cell', { name: 'm.afrith', exact: true }).locator('a')).toBeVisible();

            // Filter By Coordinator Name
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').fill('Syed Azam');
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.locator('.card-body > comp-table > table > tbody > tr:nth-child(2) > td:nth-child(3) > .col-group-indent-1 > comp-field-view-type > span > comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '% Syed Azam' }).hover();
            await page.getByRole('cell', { name: '% Syed Azam ' }).getByRole('combobox').hover();
            await page.locator('.table_filter_clear').click();
            await expect(page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(4) > .clearfix > .table_filter_text').click();
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(4) > .clearfix > .table_filter_text').fill('s.azam@mawarid.com.sa');
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(4) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.locator('tr:nth-child(4) > td:nth-child(4) > .col-group-indent-1 > comp-field-view-type > span > comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '% s.azam@mawarid.com.sa' }).hover();
            await page.getByRole('cell', { name: '% s.azam@mawarid.com.sa ' }).getByRole('combobox').hover();
            await page.locator('.table_filter_clear').click();
            await expect(page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(4) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter By Customer Code
            await page.locator('#relation_autoComplete_dropdown_CustomerCode label').click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').first().click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').first().fill('CBN-0009867');
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').first().press('Enter');
            await expect(page.getByText('CBN-0009867')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').first().click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').first().fill('');
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').first().press('Enter');
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(1).click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(1).fill('Noon');
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(1).press('Enter');
            await expect(page.locator('#autoComplete_dropdown_tableCustomerCode tbody').getByText('Noon', { exact: true })).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(1).click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(1).fill('');
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(1).press('Enter');
            await expect(page.locator('#autoComplete_dropdown_tableCustomerCode').getByText('CBN-0009198')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(2).click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(2).fill('noon@mawaridservices.com');
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(2).press('Enter');
            await expect(page.locator('td').filter({ hasText: 'noon@mawaridservices.com' }).locator('comp-datatype').nth(0)).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(2).click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(2).fill('');
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').nth(2).press('Enter');
            await expect(page.getByRole('cell', { name: 'IN Code Name Support Email ' }).getByRole('textbox').nth(3)).toBeEmpty();
            await page.waitForTimeout(600);
            await page.getByRole('row', { name: ' CBN-0009198 شركة ريادتي للتشغيل والصيانة riadty@mawaridservices.com', exact: true }).locator('i').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.getByRole('table').locator('a').filter({ hasText: 'CBN-' }).first()).toBeVisible();

            // Customer Code Details page 
            await page.getByRole('table').locator('a').filter({ hasText: 'CBN-' }).first().click();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.locator('dynamic-details')).toContainText('Code CBN-0009198 Name شركة ريادتي للتشغيل والصيانة Support Email riadty@mawaridservices.com Id 85f893ae-61bc-ee11-a569-0022489bfe56 CR 1010794634 Labor Office ID Microsoft.Xrm.Sdk.OptionSetValue Sales Rep Name Ali Ghafoor Sales Rep Email app.sup@mawarid.com.sa Sales Rep Phone Number 0506601239 VAT Number 0 Short Name Project Supervisor Owner');
            await page.locator('#DynamicDetails button').click();

            // User Id Details Page
            await page.getByRole('table').locator('a').filter({ hasText: 'm.viswa' }).first().click();
            await expect(page.getByText('Coordinators Details')).toBeVisible();
            await expect(page.locator('dynamic-details')).toContainText('User Id m.viswa Name Mohamed Idhris Viswa Email m.viswa@mawarid.com.sa Mobile Number 0590362041 Position Coordinator Reporting To Hyder Profile Signature Warm regards Mohamed Idhris, PMPApplication ManagerMawarid Manpower Solutions Company | Riyadh, Saudi ArabiaEmail: m.viswa@mawarid.com/sa | Office: 966 11 2899191Mobile No: +00966590362041P.O. Box 103706 RIYADH 11616, Kingdom of Saudi Arabia www.mawarid.com.sa Reporting Path m.afrith-a.hyder Reporting Child m.afrith-a.hyder-m.viswa');
            await page.locator('#DynamicDetails button').click();
            await page.getByRole('cell', { name: 'IN CBN-' }).hover();
            await page.locator('label').filter({ hasText: 'CBN-' }).hover();
            await page.locator('label').filter({ hasText: 'CBN-' }).locator('i').click();
            await expect(page.getByRole('row', { name: 'm.afrith Mohamed Afrith m.' }).getByLabel('')).toBeVisible();

            // Filter By Customer Name
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(7) > .clearfix > .table_filter_text').click();
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(7) > .clearfix > .table_filter_text').fill('LG');
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(7) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('cell', { name: 'LG', exact: true }).locator('comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '% LG' }).hover();
            await page.getByRole('cell', { name: '% LG ' }).getByRole('textbox').nth(1).hover();
            await page.locator('.table_filter_clear').click();
            await expect(page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(7) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter By Customer Email
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(8) > .clearfix > .table_filter_text').click();
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(8) > .clearfix > .table_filter_text').fill('Barkat@mawaridservices.com');
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(8) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('cell', { name: 'Barkat@mawaridservices.com', exact: true }).locator('comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '% Barkat@mawaridservices.com' }).hover();
            await page.getByRole('cell', { name: '% Barkat@mawaridservices.com ' }).getByRole('textbox').nth(1).hover();
            await page.locator('.table_filter_clear').click();
            await expect(page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(8) > .clearfix > .table_filter_text')).toBeEmpty();
            await page.locator('i:nth-child(3)').click();

        });

        test('My Customer :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000001').click();
            await page.getByRole('link', { name: '﨡 My Customer' }).click();
            await expect(page.getByText('My Customers')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();

            // Filter By Email
            await page.locator('i:nth-child(2)').click();
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').fill('\t alsaif@mawaridservices.com');
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').fill('Mohamed');
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').fill('\t alsaif@mawaridservices.com');
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('cell', { name: 'alsaif@mawaridservices.com', exact: true }).locator('comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '% alsaif@mawaridservices.com' }).hover();
            await page.getByRole('cell', { name: '% alsaif@mawaridservices.com ' }).getByRole('textbox').nth(1).hover();
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_clear').click();

            // Filter By Name 
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').fill('Mohamed');
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('row', { name: 'CBN0005632' }).locator('comp-datatype').nth(2)).toBeVisible();
            await expect(page.getByRole('cell', { name: 'شركة الخزامى التجارية' }).locator('comp-datatype')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'شركة دلتا للمختبرات الطبية' }).locator('comp-datatype')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'مؤسسة غوار التجارية' }).locator('comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '% Mohamed' }).hover();
            await page.getByRole('cell', { name: '% Mohamed ' }).getByRole('textbox').nth(1).hover();
            await page.locator('.table_filter_clear').click();
            await expect(page.locator('td:nth-child(4) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter By Customer Name 
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('\t مؤسسة غوار التجارية');
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('cell', { name: 'مؤسسة غوار التجارية', exact: true }).locator('comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '% مؤسسة غوار التجارية' }).hover();
            await page.getByRole('cell', { name: '% مؤسسة غوار التجارية ' }).getByRole('textbox').nth(1).hover();
            await page.locator('.table_filter_clear').click();
            await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter By Customer Code & Dropdown Pagination
            await page.getByRole('cell', { name: 'IN' }).locator('label').click();
            await page.getByRole('cell', { name: 'IN Code Name Support Email ' }).getByRole('textbox').nth(3).click();
            await page.getByRole('cell', { name: 'IN Code Name Support Email ' }).getByRole('textbox').nth(3).fill('alsaif@mawaridservices.com');
            await page.locator('#autoComplete_dropdown_tableCustomerCode thead').getByRole('cell', { name: 'alsaif@mawaridservices.com' }).getByRole('textbox').click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode thead').getByRole('cell', { name: 'alsaif@mawaridservices.com' }).getByRole('textbox').press('Enter'); await page.locator('#autoComplete_dropdown_tableCustomerCode thead').getByRole('cell', { name: 'alsaif@mawaridservices.com' }).getByRole('textbox').press('Enter');
            await expect(page.locator('#autoComplete_dropdown_tableCustomerCode').getByRole('table').getByText('alsaif@mawaridservices.com')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableCustomerCode thead').getByRole('cell', { name: 'alsaif@mawaridservices.com' }).getByRole('textbox').click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode thead').getByRole('cell', { name: 'alsaif@mawaridservices.com' }).getByRole('textbox').fill('');
            await page.getByRole('cell', { name: 'IN Code Name Support Email ' }).getByRole('textbox').nth(3).click();
            await page.waitForTimeout(300);
            await page.getByRole('cell', { name: 'IN Code Name Support Email ' }).getByRole('textbox').nth(3).press('Enter');
            await expect(page.getByRole('cell', { name: 'riadty@mawaridservices.com', exact: true }).locator('comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: 'IN Code Name Support Email ' }).getByRole('textbox').nth(3).press('Enter');
            await expect(page.getByRole('cell', { name: 'IN Code Name Support Email ' }).getByRole('textbox').nth(3)).toBeEmpty();

            // Dropdown Pagination
            await expect(page.getByRole('cell', { name: 'IN Code Name Support Email ' }).getByRole('spinbutton')).toHaveValue('1');
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();
            await expect(page.getByRole('cell', { name: 'IN Code Name Support Email ' }).getByRole('spinbutton')).toHaveValue('3');
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(3).click();
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(1).click();
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(1).click();
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').first().click();
            await expect(page.getByRole('cell', { name: 'IN Code Name Support Email ' }).getByRole('spinbutton')).toHaveValue('1');
            await page.getByRole('cell', { name: 'IN Code Name Support Email ' }).getByRole('textbox').nth(1).click();
            await page.getByRole('cell', { name: 'IN Code Name Support Email ' }).getByRole('textbox').nth(1).fill('CBN0001030');
            await page.locator('#autoComplete_dropdown_tableCustomerCode thead').getByRole('cell', { name: 'CBN0001030' }).getByRole('textbox').click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode thead').getByRole('cell', { name: 'CBN0001030' }).getByRole('textbox').press('Enter');
            await page.locator('#autoComplete_dropdown_tableCustomerCode').getByText('CBN0001030').click();
            await page.getByRole('button', { name: 'OK' }).click();

            // Details Page
            await page.getByRole('cell', { name: 'CBN0001030', exact: true }).locator('a').click();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.locator('dynamic-details')).toContainText('Code CBN0001030 Name مؤسسة غوار التجارية Support Email alsaif@mawaridservices.com Id d8f65b29-761f-ec11-b6e5-000d3ade6e20 CR 1010150306 Labor Office ID Microsoft.Xrm.Sdk.OptionSetValue Sales Rep Name Ahmed Mohammed Lubbad Sales Rep Email a.lubbad@mawarid.com.sa Sales Rep Phone Number VAT Number Short Name Project Supervisor Owner');
            await page.locator('#DynamicDetails button').click();
            await page.getByRole('cell', { name: 'IN CBN0001030' }).hover();
            await page.locator('label').filter({ hasText: 'CBN0001030' }).hover();
            await page.locator('label').filter({ hasText: 'CBN0001030' }).locator('i').click();
            await expect(page.getByRole('row', { name: 'CBN0005632' }).locator('a')).toBeVisible();
        });

        test('My Signature :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000001').click();
            await page.getByRole('link', { name: ' My Signature' }).click();
            await expect(page.getByText('My customization')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();
            await page.getByText('View').click();
            await expect(page.getByText('Thanks & Regards,')).toBeVisible();
            await expect(page.locator('#dynamic_list_EFN0000102').getByText('Mohamed Afrith')).toBeVisible();
            await page.getByLabel('Close').click();
        });
    });

    test.describe('Approvals', () => {
        test('My Pending Approvals :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000058').click();
            await page.getByRole('link', { name: ' My Pending Approvals' }).click();
            await expect(page.locator('section').getByText('My Pending Approvals')).toBeVisible({ timeout: 3000 });
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();

            // Details page
            await expect(page.getByRole('heading', { name: 'Approvals Details' })).toBeVisible();
            await page.getByRole('link', { name: 'Approve' }).click();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test');
            await page.getByText('Close', { exact: true }).click();
            await page.getByRole('link', { name: 'Reject' }).click();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('Test');
            await page.getByText('Close', { exact: true }).click();
            await expect(page.locator('dynamic-details')).toContainText('Approve Reject Approvals Details Approve Reject Approver m.afrith Requester Status Pending Ref Rec Id 11618 Request Id MWD0015189 Type Approvals Request Type CustomerSupport Request Comments test approval request');

            // Conversation Tab
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

            // Ticket Details Tab
            await page.locator('a').filter({ hasText: 'Ticket Details' }).click();
            await expect(page.getByRole('heading', { name: '[MWD0015189] Test ticket for' })).toBeVisible();

            // Ticket Details: Schedule Action
            await page.getByRole('link', { name: 'Schedule' }).click();
            await page.locator('#relation_autoComplete_dropdown_AssignedTo label').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(700);
            await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(700);
            await expect(page.getByText('b.iqbal@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(700);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(700);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(700);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]/a/i').click();
            await page.waitForTimeout(700);
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
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(300);
            await expect(page.getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible({ timeout: 5000 });
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(300);
            await expect(page.getByText('p.khan@mawarid.com.sa').first()).toBeVisible({ timeout: 5000 });
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]/a/i[1]').click();
            await page.waitForTimeout(300);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(300);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(300);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]/a/i').click();
            await page.waitForTimeout(300);
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
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
            await page.waitForTimeout(300);
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[5]/a/i').click();
            await page.waitForTimeout(300);
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.waitForTimeout(300);
            await page.locator('//*[@id="autoComplete_dropdown_TicketCategory"]/div[2]/div[1]/comp-pagination/ul/li[1]/a').click();
            await page.waitForTimeout(300);
            await expect(page.locator('tr').filter({ hasText: 'IT CRM TCY0000001 DPT0000001' }).locator('i')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('test');
            await page.waitForTimeout(300);
            await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).press('Enter');
            await page.locator('#autoComplete_dropdown_tableTicketCategory i').click();
            await page.locator('#relation_autoComplete_dropdown_AssignedTo > .control-input > .form-control').first().click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(300);
            await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await expect(page.getByText('a.Aldhubayban@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]/a/i').click();
            await page.waitForTimeout(300);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]/a/i').click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
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
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0015189 Subject' }).locator('a').click();
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
            await page.getByRole('cell', { name: 'a.hyder' }).locator('div').click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test comment');
            await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
            await expect(page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Conversation' })).toBeVisible();
            await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
            await expect(page.getByRole('cell', { name: 'Request Id' }).locator('a')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'No Data Found' }).locator('div')).toBeVisible();
            await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByRole('row', { name: 'APR0001230 m.afrith Pending a' }).getByLabel('')).toBeVisible();
            await page.locator('a').filter({ hasText: 'Attachments' }).click();
            await expect(page.getByText('Name')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'No Data Found' }).locator('div')).toBeVisible();
            await page.locator('a').filter({ hasText: 'Status History' }).click();
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: 'No Data Found' }).locator('div')).toBeVisible();
            await page.getByRole('button', { name: 'Close' }).click();
        });

        test('My Complected Approvals :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000058').click();
            await page.getByRole('link', { name: ' My Completed Approvals' }).click();
            await expect(page.locator('section').getByText('My Completed Approvals')).toBeVisible({ timeout: 20000 });
            await page.getByText('Options').click();
            await page.getByText('Options').click();
            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000061').getByRole('textbox').click();

            // Filter By Created Date
            await page.locator('#dynamic_list_EFN0000061').getByRole('textbox').click();
            await page.getByRole('option', { name: 'CreatedDatetime' }).click();
            await page.locator('comp-tilefilter input[type="date"]').fill('2025-07-01');
            await expect(page.locator('#td_content_2_0 comp-field-view-type a')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();

            // Filter By Status
            await page.locator('#dynamic_list_EFN0000061').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Status' }).click();
            await page.locator('comp-tilefilter label').click();
            await page.getByRole('cell', { name: 'Rejected' }).first().click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.getByRole('heading', { name: 'APR0001258' })).toBeVisible();
            await expect(page.locator('#td_content_0_2').getByText('Rejected')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000061').getByRole('textbox')).toBeEmpty();

            // Filter By Approvel Id 
            await page.locator('#dynamic_list_EFN0000061').getByRole('textbox').click();
            await page.getByRole('option', { name: 'ApproverId' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('APR0001255');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.getByRole('heading', { name: 'APR0001255' })).toBeVisible();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();

            // Approval Details Page
            await expect(page.getByRole('heading', { name: 'Approvals Details' })).toBeVisible();
            await expect(page.locator('dynamic-details')).toContainText('Approvals Details Approver m.afrith Requester Status Approved Ref Rec Id 11974 Request Id MWD0015547 Type Approvals Request Type CustomerSupport Request Comments Test approval');
            await expect(page.getByRole('listitem').filter({ hasText: 'MMohamed Afrith Changed to' })).toBeVisible();
            await page.locator('a').filter({ hasText: 'Ticket Details' }).click();
            await expect(page.getByRole('heading', { name: '[MWD0015547] Testing mail' })).toBeVisible();

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
            await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Hyder').click();
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
            // await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
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
            await page.waitForTimeout(700);
            await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible({ timeout: 2000 });
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(700);
            await expect(page.getByText('a.Aldhubayban@mawarid.com.sa').first()).toBeVisible({ timeout: 2000 });
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(700);
            await expect(page.getByText('a.alharbi@mawarid.com.sa').first()).toBeVisible({ timeout: 2000 });
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.waitForTimeout(500);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible({ timeout: 2500 });
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
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0015547 Subject' }).locator('a').click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Close Start Pickup Assign' }).locator('button').click();
            await page.locator('a').filter({ hasText: 'Hyder' }).click();
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
            await page.locator('#pills-tabContent #autoComplete_dropdown_Approver').getByText('Approver').click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible({ timeout: 2500 });
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
            await expect(page.getByRole('cell', { name: 'Request Id' }).locator('a')).toBeVisible();
            // approvals tab
            await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByRole('cell', { name: 'Approver Id' }).locator('a')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'APR0001255' }).locator('comp-datatype')).toBeVisible();
            // attachments tab
            await page.locator('a').filter({ hasText: 'Attachments' }).click();
            await expect(page.getByText('Name')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'No Data Found' }).locator('div')).toBeVisible();
            // status history tab
            await page.locator('a').filter({ hasText: 'Status History' }).click();
            await expect(page.getByRole('cell', { name: 'MWD0015547' }).locator('comp-datatype')).toBeVisible();
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
        });

        test('My All Approvals :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000058').click();
            await page.getByRole('link', { name: ' My All Approvals' }).click();
            await expect(page.getByText('My All Aprovals')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByRole('list').filter({ hasText: 'Export SelectedExportExport' }).locator('div').first()).toBeVisible();
            await page.getByText('Options').click();

            // Filter By Created Date
            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000060').getByRole('textbox').click();
            await page.getByRole('option', { name: 'CreatedDatetime' }).click();
            await page.locator('comp-tilefilter input[type="date"]').fill('2025-07-01');
            await expect(page.locator('#td_content_2_0 comp-field-view-type a')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();

            // Filter By Status
            await page.locator('#dynamic_list_EFN0000060').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Status' }).click();
            await page.locator('comp-tilefilter label').click();
            await page.getByRole('cell', { name: 'Rejected' }).first().click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.getByRole('heading', { name: 'APR0001258' })).toBeVisible();
            await expect(page.locator('#td_content_0_2').getByText('Rejected')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000060').getByRole('textbox')).toBeEmpty();

            // Filter By Approvel Id 
            await page.locator('#dynamic_list_EFN0000060').getByRole('textbox').click();
            await page.getByRole('option', { name: 'ApproverId' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('APR0001255');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.getByRole('heading', { name: 'APR0001255' })).toBeVisible();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();

            // Approval Details Page
            await expect(page.getByRole('heading', { name: 'Approvals Details' })).toBeVisible();
            await expect(page.locator('dynamic-details')).toContainText('Approvals Details Approver m.afrith Requester Status Approved Ref Rec Id 11974 Request Id MWD0015547 Type Approvals Request Type CustomerSupport Request Comments Test approval');
            await expect(page.getByRole('listitem').filter({ hasText: 'MMohamed Afrith Changed to' })).toBeVisible();
            await page.locator('a').filter({ hasText: 'Ticket Details' }).click();
            await expect(page.getByRole('heading', { name: '[MWD0015547] Testing mail' })).toBeVisible();

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
            await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Hyder').click();
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
            // await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder', { exact: true }).first()).toBeVisible();
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
            await page.waitForTimeout(700);
            await expect(page.getByText('a.alabbad01@mawarid.com.sa').first()).toBeVisible({ timeout: 2000 });
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(700);
            await expect(page.getByText('a.Aldhubayban@mawarid.com.sa').first()).toBeVisible({ timeout: 20000 });
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a/i').click();
            await page.waitForTimeout(700);
            await expect(page.getByText('a.alharbi@mawarid.com.sa').first()).toBeVisible({ timeout: 2000 });
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[5]').click();
            await page.waitForTimeout(500);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[2]/a/i').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[1]').click();
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible({ timeout: 2500 });
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
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0015547 Subject' }).locator('a').click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Close Start Pickup Assign' }).locator('button').click();
            await page.locator('a').filter({ hasText: 'Hyder' }).click();
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
            await page.locator('#pills-tabContent #autoComplete_dropdown_Approver').getByText('Approver').click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible({ timeout: 2500 });
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
            await expect(page.getByRole('cell', { name: 'Request Id' }).locator('a')).toBeVisible();
            // approvals tab
            await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByRole('cell', { name: 'Approver Id' }).locator('a')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'APR0001255' }).locator('comp-datatype')).toBeVisible();
            // attachments tab
            await page.locator('a').filter({ hasText: 'Attachments' }).click();
            await expect(page.getByText('Name')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'No Data Found' }).locator('div')).toBeVisible();
            // status history tab
            await page.locator('a').filter({ hasText: 'Status History' }).click();
            await expect(page.getByRole('cell', { name: 'MWD0015547' }).locator('comp-datatype')).toBeVisible();
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
        });

        test('Me Sent Approvals :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000058').click();
            await page.getByRole('link', { name: ' Me Send Approvals' }).click();
            await expect(page.locator('section').getByText('Me Send Approvals')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByRole('list').filter({ hasText: 'Export SelectedExportExport' }).locator('div').first()).toBeVisible();
            await page.getByText('Options').click();

            // List Pagination

            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').nth(1).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.getByRole('list').filter({ hasText: /of\s*\d+/i }).locator('a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Filter By Created Date
            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000152').getByRole('textbox').click();
            await page.getByRole('option', { name: 'CreatedDatetime' }).click();
            await page.locator('comp-tilefilter input[type="date"]').fill('2025-06-01');
            await expect(page.locator('#td_content_0_0 comp-field-view-type a')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000152').getByRole('textbox')).toBeEmpty();

            // Filter By Status
            await page.locator('#dynamic_list_EFN0000152').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Status' }).click();
            await page.locator('comp-tilefilter label').click();
            await page.getByRole('cell', { name: 'Rejected' }).first().click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.getByRole('heading', { name: 'APR0001237' })).toBeVisible();
            await expect(page.locator('#td_content_0_2').getByText('Rejected')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000152').getByRole('textbox')).toBeEmpty();

            // Filter By Approvel Id 
            await page.locator('#dynamic_list_EFN0000152').getByRole('textbox').click();
            await page.getByRole('option', { name: 'ApproverId' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('APR0001174');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.getByRole('heading', { name: 'APR0001174' })).toBeVisible();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();

            // Approval Details Page
            await expect(page.getByRole('heading', { name: 'Approvals Details' })).toBeVisible();
            await expect(page.locator('dynamic-details')).toContainText('Approvals Details Approver a.hyder Requester Status Approved Ref Rec Id 370 Request Id MWD0000975 Type Approvals Request Type CustomerSupport Request Comments Test comments');
            await page.locator('a').filter({ hasText: 'Ticket Details' }).click();
            await expect(page.getByRole('heading', { name: '[MWD0000975] Test Ticket' })).toBeVisible();
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
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0000975 Subject' }).locator('a').click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();
            await page.locator('a').filter({ hasText: 'Mohamed Afrith' }).click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Coordinators Details')).toBeVisible();
            await page.locator('//*[@id="DynamicCreate"]/div/div/div[1]/div/app-button/button/i').click();
            //Ticket tab
            await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
            await expect(page.getByRole('cell', { name: 'Request Id' }).locator('a')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'No Data Found' }).locator('div')).toBeVisible();
            // approvals tab
            await page.locator('//*[starts-with(@id, "cdk-drop-list")]//a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByRole('cell', { name: 'Approver Id' }).locator('a')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'APR0001174' }).locator('comp-datatype')).toBeVisible();
            // attachments tab
            await page.locator('a').filter({ hasText: 'Attachments' }).click();
            await expect(page.getByText('Name')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'No Data Found' }).locator('div')).toBeVisible();
            // status history tab
            await page.locator('a').filter({ hasText: 'Status History' }).click();
            await expect(page.getByText('MWD0000975', { exact: true }).nth(3)).toBeVisible();
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
        });
    });

    test.describe('Reports', () => {
        test('Tickets By Customer :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000174').click();
            await page.getByRole('link', { name: ' Tickets By Customer' }).click();
            await expect(page.getByText('TicketReports Create')).toBeVisible();

            // List Pagination
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await expect(page.getByRole('cell', { name: 'dallahhospital@' }).locator('comp-datatype')).toBeVisible();
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').nth(3).click();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('cell', { name: 'alsaif@mawaridservices.com' }).locator('comp-datatype')).toBeVisible();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Filter By From Date & To Date 
            await page.getByPlaceholder('From Date').fill('2025-07-01');
            await page.getByPlaceholder('To Date').fill('2025-07-21');
            await page.getByText('Filter').click();

            // Filter By Customer Id
            await page.locator('.control-input > .form-control').click();

            // Dropdown Pagination
            await page.locator('#autoComplete_dropdown_CustomerID comp-pagination a').nth(2).click();
            await expect(page.locator('#autoComplete_dropdown_CustomerID input[name="currentPage"]')).toHaveValue('2');
            await page.locator('#autoComplete_dropdown_CustomerID comp-pagination a').nth(2).click();
            await page.locator('#autoComplete_dropdown_CustomerID comp-pagination a').nth(2).click();
            await expect(page.locator('#autoComplete_dropdown_CustomerID input[name="currentPage"]')).toHaveValue('4');
            await expect(page.getByText('CBN-0009082')).toBeVisible();
            await page.locator('#autoComplete_dropdown_CustomerID comp-pagination a').nth(1).click();
            await expect(page.locator('#autoComplete_dropdown_CustomerID input[name="currentPage"]')).toHaveValue('3');
            await page.locator('#autoComplete_dropdown_CustomerID comp-pagination a').first().click();
            await expect(page.locator('#autoComplete_dropdown_CustomerID input[name="currentPage"]')).toHaveValue('1');
            await expect(page.locator('#autoComplete_dropdown_tableCustomerID').getByText('CBN0001030')).toBeVisible();
            await page.locator('input[type="text"]').nth(1).click();
            await page.locator('input[type="text"]').nth(1).fill('CBN-0009756');
            await page.locator('input[type="text"]').nth(1).press('Enter');
            await expect(page.getByText('CBN-0009756')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableCustomerID i').click();
            await page.getByText('Filter').click();
            await expect(page.getByRole('cell', { name: 'LG', exact: true }).locator('comp-datatype')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'lg@mawaridservices.com' }).locator('comp-datatype')).toBeVisible();
            await page.getByText('Clear').click();
            await expect(page.getByPlaceholder('To Date')).toBeEmpty();
            await expect(page.getByPlaceholder('From Date')).toBeEmpty();

            // Chart
            await page.locator('a').filter({ hasText: 'Chart' }).click();
            await expect(page.getByText('Ticket Chart By Customer')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.locator('canvas').nth(1)).toBeVisible();
        });

        test('Request By Coordinator :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000174').click();
            await page.getByRole('link', { name: '贈 Request By Coordinator' }).click();
            await expect(page.getByText('Request By Coordinators')).toBeVisible();
            await expect(page.getByRole('heading', { name: 'Request By Coordinators' })).toBeVisible({ timeout: 15000 });
            await page.locator('.img-container').first().click();
            await expect(page.locator('#custom_template_dynamic_list_EFN0000395').getByText('Mohamed Afrith')).toBeVisible();
            await expect(page.getByText('Mohamed Idhris Viswa')).toBeVisible();
            await expect(page.getByText('Syed Azam')).toBeVisible();
            await expect(page.getByText('Ahmed Alahmadi')).toBeVisible();
            await expect(page.locator('div:nth-child(13) > .card > .content > .img-container > .img-fluid')).toBeVisible();
            await page.getByRole('textbox', { name: 'Search By Coordinator' }).click();
            await page.getByRole('textbox', { name: 'Search By Coordinator' }).fill('AFR');
            await expect(page.locator('#custom_template_dynamic_list_EFN0000395')).toContainText('Request By Coordinators Total : 27 Mohamed Afrith New:6 InProgress:0 Scheduled:5 ReOpen:3 Closed:13');
            await expect(page.getByText('Total : 27 Mohamed Afrith New')).toBeVisible();
            await page.getByRole('textbox', { name: 'Search By Coordinator' }).click();
            await page.getByRole('textbox', { name: 'Search By Coordinator' }).fill('');
            await page.locator('.img-container').first().click();
            await expect(page.locator('#custom_template_dynamic_list_EFN0000395').getByText('Mohamed Afrith')).toBeVisible();
            await expect(page.getByText('Mohamed Idhris Viswa')).toBeVisible();
            await expect(page.getByText('Syed Azam')).toBeVisible();
            await expect(page.getByText('Ahmed Alahmadi')).toBeVisible();
            await expect(page.locator('div:nth-child(13) > .card > .content > .img-container > .img-fluid')).toBeVisible();
        });
    });
});

