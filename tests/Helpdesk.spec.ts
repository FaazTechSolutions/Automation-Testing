import { test, expect, Page } from '@playwright/test';
import { time } from 'console';

// login function
async function login(page: Page, username: string, password: string) {
    await page.goto('https://portal.mawarid.com.sa/apps4x/#/login', { waitUntil: 'domcontentloaded' });
    await page.getByRole('textbox', { name: 'UserName' }).click({ timeout: 20000 });
    await page.getByRole('textbox', { name: 'UserName' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).click({ timeout: 20000 });
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'SignIn' }).click({ timeout: 20000 });
}


test.describe('Helpdesk', () => {

    test.beforeEach(async ({ page }) => {
        test.slow();
        await test.step('Login the mawarid portal', async () => {
            await login(page, 'm.afrith', '123456');
        });
        await test.step('go to the helpdesk app', async () => {
            await expect(page.getByRole('link', { name: 'Helpdesk' })).toBeVisible({ timeout: 30000 });
            await page.getByRole('link', { name: 'Helpdesk' }).click();
        });
    });

    test('Create Request & Dashboard: should allow user to create a new helpdesk request and validate dashboard', async ({ page }) => {
        test.slow();
        await test.step('Create a new request page', async () => {
            // --- Navigate to Create Request ---
            await page.getByRole('link', { name: '弄 Create Request' }).click();
            await expect(page.locator('#DynamicCreate div', { hasText: 'Create Request' }).nth(2)).toBeVisible();

            // --- Title dropdown and table validations ---
            await page.getByLabel('Title*').click();
            const titleInput = page.locator('.control-input > .form-control').first();
            await titleInput.click();

            const verifyColumns = ['Department', 'Name', 'Category Id', 'Department Id'];
            for (const col of verifyColumns) {
                await expect(page.getByText(col, { exact: true })).toBeVisible();
            }

            // --- Check category items on first page ---
            const categories1 = ['CRM', 'ERP', 'Portal', 'General'];
            for (const cat of categories1) {
                await expect(page.locator('td', { hasText: cat }).locator('comp-datatype')).toBeVisible();
            }

            // --- Go to page 2, check Maintenance & Projects ---
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByText('Maintenance').nth(1)).toBeVisible();
            await expect(page.locator('td', { hasText: 'Projects Department' }).locator('comp-datatype')).toBeVisible();

            // --- Page 3 check ---
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.locator('td', { hasText: 'Recruitment - Individual Hourly' }).locator('comp-datatype')).toBeVisible();
            await expect(page.getByText('Test').nth(1)).toBeVisible();

            // --- Navigate back to Page 2 and 1 ---
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').nth(1).click();

            // --- Search in Title field ---
            const categoryInput = page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]');
            await categoryInput.nth(1).fill('portal');
            await expect(page.locator('td', { hasText: 'Portal' }).locator('comp-datatype')).toBeVisible();
            await categoryInput.nth(1).fill('');
            await categoryInput.nth(2).fill('02');
            await expect(page.locator('td', { hasText: 'TCY0000002' }).locator('comp-datatype')).toBeVisible();
            await categoryInput.nth(2).fill('');
            await page.locator('td', { hasText: 'Portal' }).click();

            // Assign To dropdown
            // const assignedLabel = page.locator('#autoComplete_dropdown_AssignedToByCategory label').nth(1);
            // await expect(assignedLabel).toBeVisible({ timeout: 20000 });
            // await assignedLabel.click();

            // const assignedTable = page.locator('#autoComplete_dropdown_table_AssignedToByCategory');
            // const assignedTexts = ['Name', 'Email', 'User Id', 'Ahamed Minhaj', 'Mohamed Afrith'];
            // for (const text of assignedTexts) {
            //     await expect(assignedTable.getByText(text)).toBeVisible();
            // }

            // // Filter by name and email
            // const searchInputs = page.locator('input[type="search"]');
            // await searchInputs.first().fill('afrith');
            // await expect(assignedTable.getByText('Mohamed Afrith')).toBeVisible();
            // await searchInputs.first().fill('');
            // await expect(page.getByText('Ahamed Minhaj')).toBeVisible();

            // await searchInputs.nth(1).fill('hyder');
            // await expect(page.getByText('hyder@faaztechsolutions.com').first()).toBeVisible();
            // await searchInputs.nth(1).fill('');
            // await expect(page.getByText('a.minhaj@faaztechsolutions.com')).toBeVisible();

            // // Select assignee
            // await assignedTable.getByText('Mohamed Afrith').click();

            //on behalf
            // On Behalf Of
            const onBehalfInput = page.locator('#autoComplete_dropdown_OnBehalfOf > .control-input > .form-control').first();
            await expect(onBehalfInput).toBeVisible();
            await onBehalfInput.click();

            // Validate table headers
            await expect(page.locator('th').filter({ hasText: 'User Id' })).toBeVisible();
            await expect(page.locator('tr').filter({ hasText: 'User Id Name Email Mobile' }).locator('div').nth(1)).toBeVisible();
            await expect(page.locator('th').filter({ hasText: 'Email' })).toBeVisible();
            await expect(page.locator('th').filter({ hasText: 'Mobile Number' })).toBeVisible();

            // Define common search input locator
            const tableHead = page.locator('thead', { hasText: 'User Id Name Email Mobile' });
            const onBehalfSearchInputs = tableHead.locator('input[type="search"]');

            // Search by User Id
            await onBehalfSearchInputs.nth(0).fill('a.hyder');
            await expect(page.getByText('a.hyder')).toBeVisible();
            await onBehalfSearchInputs.nth(0).fill('');

            // Search by Name
            await onBehalfSearchInputs.nth(1).fill('hyder');
            await expect(page.getByText('Hyder Ali A')).toBeVisible();
            await onBehalfSearchInputs.nth(1).fill('');

            // Search by Email
            await onBehalfSearchInputs.nth(2).fill('hyder');
            await expect(page.getByText('hyder@faaztechsolutions.com')).toBeVisible();
            await onBehalfSearchInputs.nth(2).fill('');

            // Validate basic records
            await expect(page.locator('td').filter({ hasText: 'a.abdalhamed@mawarid.com.sa' }).first()).toBeVisible();

            // Pagination and email checks
            // for (const emails of [
            //     ['a.alabbad01@mawarid.com.sa', 'a.albesher@mawarid.com.sa'],
            //     ['a.albugami@mawarid.com.sa', 'a.alhamad@mawarid.com.sa'],
            //     [], [], [], // 3 more empty clicks
            //     ['a.alrashidi@mawarid.com.sa', 'a.alshammari02@mawarid.com.sa']
            // ]) {
            //     await page.getByText('Next page').nth(1).click();
            //     for (const email of emails) {
            //         await expect(page.getByText(email).first()).toBeVisible();
            //     }
            // }
            await page.locator('td').filter({ hasText: 'a.abdalhamed@mawarid.com.sa' }).first().click();
            await page.locator('.angular-editor-textarea').first().click();
            await page.locator('.angular-editor-textarea').first().fill('Test test');
            await page.getByText('a.abdalhamed@mawarid.com.sa').first().hover();
            await page.locator('#autoComplete_dropdown_OnBehalfOf > .control-input > .form-control > .pull-right > .tabler-ti').click();
            await page.locator('label').filter({ hasText: 'Portal' }).hover();
            await page.locator('label').filter({ hasText: 'Portal' }).locator('i').click();

        });


        await test.step('Check the dashboard menu', async () => {
            const dashboardLink = page.getByRole('link', { name: ' Dashboard' });

            // Open Dashboard
            await expect(dashboardLink).toBeVisible();
            await dashboardLink.click();

            // Check dashboard components
            // await expect(page.locator('canvas').nth(1)).toBeVisible();
            await expect(page.getByRole('heading', { name: 'My Team Ticket' })).toBeVisible({ timeout: 20000 });
            await expect(page.getByRole('heading', { name: 'Request By Category' })).toBeVisible();
            await expect(page.getByRole('heading', { name: 'Request By Technician' })).toBeVisible();

            // Open More Options
            await page.getByRole('button', { name: 'More Options' }).click();
        });
    });

    test.describe('Requests', () => {
        test('My Requests: should filter, select, and validate requests in My Requests menu', async ({ page }) => {
            test.slow();
            await test.step('check the my request menu', async () => {
                // code gen ↓
                // // Navigate to Requests
                await expect(page.locator('#MNU0000040')).toBeVisible();
                await page.locator('#MNU0000040').click();
                await expect(page.getByRole('link', { name: ' My Requests' })).toBeVisible();
                await page.getByRole('link', { name: ' My Requests' }).click();
                await expect(page.locator('section').getByText('Create', { exact: true })).toBeVisible({ timeout: 20000 });
                await page.locator('section').getByText('Create', { exact: true }).click();
                await expect(page.getByLabel('Title*')).toBeVisible({ timeout: 20000 });
                await expect(page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first()).toBeVisible();
                await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('portal');
                await expect(page.locator('#autoComplete_dropdown_tableTicketCategory td').filter({ hasText: 'Portal' })).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('');
                await page.locator('ul').filter({ hasText: 'of3' }).locator('a').nth(2).click();
                await expect(page.getByText('Maintenance').nth(1)).toBeVisible();
                await expect(page.locator('td').filter({ hasText: 'Projects Department' }).locator('comp-datatype')).toBeVisible();
                await page.locator('ul').filter({ hasText: 'of3' }).locator('a').nth(2).click();
                await expect(page.locator('tr').filter({ hasText: 'Test Test TCY0000068' }).locator('i')).toBeVisible();
                await page.locator('ul').filter({ hasText: 'of3' }).locator('a').nth(1).click();
                await page.locator('ul').filter({ hasText: 'of3' }).locator('a').nth(1).click();
                await expect(page.locator('td').filter({ hasText: 'General' }).locator('comp-datatype')).toBeVisible();
                await page.locator('ul').filter({ hasText: 'of3' }).locator('a').nth(3).click();
                await expect(page.locator('tr').filter({ hasText: 'Test Test TCY0000068' }).locator('i')).toBeVisible();
                await page.locator('ul').filter({ hasText: 'of3' }).locator('a').first().click();
                await expect(page.locator('#autoComplete_dropdown_tableTicketCategory tbody').getByText('Portal')).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableTicketCategory tbody').getByText('Portal').click();
                await page.waitForTimeout(3000);
                await page.locator('#autoComplete_dropdown_OnBehalfOf > .control-input > .form-control').first().click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="search"]').first().click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="search"]').first().fill('hyder');
                await expect(page.getByText('a.hyder')).toBeVisible();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="search"]').first().click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="search"]').first().fill('');
                await page.locator('thead').filter({ hasText: 'User Id Name Email' }).locator('input[type="search"]').nth(1).click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email' }).locator('input[type="search"]').nth(1).fill('');
                await page.locator('thead').filter({ hasText: 'User Id Name Email' }).locator('input[type="search"]').nth(2).click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email' }).locator('input[type="search"]').nth(2).fill('hyder');
                await expect(page.locator('#DynamicCreate').getByText('hyder@faaztechsolutions.com')).toBeVisible();
                await page.locator('thead').filter({ hasText: 'User Id Name Email' }).locator('input[type="search"]').nth(2).click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email' }).locator('input[type="search"]').nth(2).fill('');
                await expect(page.locator('td').filter({ hasText: 'a.abdalhamed@mawarid.com.sa' }).first()).toBeVisible();
                await page.getByText('Next page').click();
                await expect(page.locator('td').filter({ hasText: 'a.alamrani@mawarid.com.sa' }).first()).toBeVisible();
                await page.getByText('Next page').click();
                await expect(page.locator('td').filter({ hasText: 'a.aldosari01@mawarid.com.sa' }).first()).toBeVisible();
                await page.getByText('Next page').click();
                await expect(page.locator('td').filter({ hasText: 'a.almansour@mawarid.com.sa' }).first()).toBeVisible();
                await page.getByText('page 70').click();
                await page.getByText('page 1').click();
                await page.locator('td').filter({ hasText: 'a.abdalhamed@mawarid.com.sa' }).first().click();
                await page.locator('.angular-editor-textarea').first().click({ timeout: 20000 });
                await expect(page.getByText('Submit')).toBeVisible();
                await expect(page.getByText('Close', { exact: true })).toBeVisible();
                await page.locator('.modal-header > div > .btn').click();
                await expect(page.locator('i:nth-child(2)')).toBeVisible();
                await page.locator('i:nth-child(2)').click({ timeout: 40000 });
                await page.locator('//*[@id="autoComplete_dropdown_Status"]/div[1]/label').click();
                await page.getByRole('row', { name: ' New New', exact: true }).locator('div').first().click({ timeout: 10000 });
                await page.getByRole('button', { name: 'OK' }).click();
                await expect(page.locator('.grid-field-tag > comp-datatype').first()).toBeVisible();
                await expect(page.getByRole('table')).toContainText('New');
                await expect(page.locator('tr:nth-child(7) > td:nth-child(4) > .col-group-indent-1 > comp-field-view-type > .grid-field-tag > comp-datatype')).toBeVisible();
                await expect(page.getByRole('table')).toContainText('New');
                await page.locator('#autoComplete_dropdown_Status > .control-input > .form-control').first().click({ timeout: 10000 });
                await page.getByRole('row', { name: ' Closed Closed', exact: true }).locator('i').click();
                await page.getByRole('button', { name: 'OK' }).click();
                await expect(page.getByRole('table').locator('span').filter({ hasText: 'Closed' }).first()).toBeVisible({ timeout: 30000 });
                await expect(page.locator('tr:nth-child(5) > td:nth-child(4) > .col-group-indent-1 > comp-field-view-type > .grid-field-tag')).toBeVisible();
                await page.getByText('New,Closed').hover();
                await page.locator('label').filter({ hasText: 'New,Closed' }).locator('i').click();
                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('Test sla ticket');
                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
                await expect(page.getByRole('cell', { name: 'Test SLA Ticket', exact: true }).locator('a')).toBeVisible();
                await expect(page.getByText('TRQ0010582')).toBeVisible();
                await page.getByRole('cell', { name: '% Test sla ticket ' }).getByRole('textbox').nth(1).hover();
                await page.getByRole('cell', { name: '% Test sla ticket ' }).locator('i').click();
                await expect(page.locator('comp-pagination a').nth(2)).toBeVisible();
                await page.locator('comp-pagination a').nth(2).click();
                await page.locator('.text-left > .clearfix > .table_filter_text').first().click();
                await page.locator('.text-left > .clearfix > .table_filter_text').first().fill('TRQ0010012');
                await page.locator('.text-left > .clearfix > .table_filter_text').first().press('Enter');
                await expect(page.getByText('TRQ0010012')).toBeVisible();
                await page.locator('.text-left > .clearfix').first().hover();
                await page.locator('.table_filter_clear').click();
                await page.locator('comp-pagination a').nth(2).click();
                await page.locator('comp-pagination a').nth(3).click();
                await expect(page.getByRole('cell', { name: 'Test 10/' }).locator('a')).toBeVisible();
                await page.locator('comp-pagination a').first().click();
                await page.getByRole('row', { name: '% % IN IN IN' }).getByRole('spinbutton').click();
                await page.getByRole('row', { name: '% % IN IN IN' }).getByRole('spinbutton').fill('42395');
                await page.getByRole('row', { name: '% % IN IN IN' }).getByRole('spinbutton').press('Enter');
                await expect(page.getByRole('cell', { name: '42395' })).toBeVisible();
                await page.getByText('⯆×=×').hover();
                await page.locator('.table_filter_clear').click();
                await expect(page.getByRole('cell', { name: 'Requester' })).toBeVisible();
                await expect(page.getByRole('table')).toMatchAriaSnapshot(`
                  - img "profile"
                  - text: Mohamed Afrith m.afrith@faaztechsolutions.com
                  `);
                await page.locator('.text-left > .clearfix > .table_filter_text').first().click();
                await page.locator('.text-left > .clearfix > .table_filter_text').first().fill('TRQ0012090');
                await page.locator('.text-left > .clearfix > .table_filter_text').first().press('Enter');
                await expect(page.getByText('TRQ0012090')).toBeVisible();
                await expect(page.getByRole('cell', { name: 'Test ticket from mobile to' }).locator('a')).toBeVisible();
                await page.getByRole('cell', { name: 'Test ticket from mobile to' }).locator('a').click();
                await page.waitForTimeout(3000);
                await expect(page.locator('#custom_template_dynamic_list_EFN0000114')).toContainText('Test ticket from mobile to test Full flow 2');
                await page.locator('app-button > .btn').first().click();
                await page.getByRole('cell', { name: '% TRQ0012090' }).hover();
                await page.locator('.mb-1 > .ng-select-container').first().click();
                await page.locator('.table_filter_clear').click();
            });
        });

        test('Assigned To Me: should filter, select, and validate requests assigned to the user', async ({ page }) => {
            test.slow();
            await test.step('check the AssignedToMe menu', async () => {
                await page.locator('#MNU0000040').click();
                await expect(page.getByRole('link', { name: ' Assigned to me' })).toBeVisible();
                await page.getByRole('link', { name: ' Assigned to me' }).click();
                await expect(page.getByText('Request Assigned to me')).toBeVisible({ timeout: 20000 });
                await page.locator('i:nth-child(2)').click();
                await page.locator('#autoComplete_dropdown_Status label').click();
                await page.getByRole('row', { name: ' New New', exact: true }).locator('div').first().click();
                await page.getByText('ReOpen').first().click();
                await page.getByRole('button', { name: 'OK' }).click();
                await expect(page.getByRole('table').locator('span').filter({ hasText: 'New' }).first()).toBeVisible();
                await page.getByRole('table').getByText('ReOpen', { exact: true }).nth(2).click();

                await page.getByText('New,ReOpen').hover();
                await page.locator('label').filter({ hasText: 'New,ReOpen' }).locator('i').click();
                await page.locator('comp-pagination a').nth(2).click();
                await page.locator('comp-pagination a').nth(2).click();
                await page.locator('comp-pagination a').nth(2).click();
                await page.locator('comp-pagination a').nth(2).click();
                await page.locator('comp-pagination a').nth(3).click();
                await expect(page.getByRole('cell', { name: 'TRQ0000427' }).locator('comp-datatype')).toBeVisible();
                await page.locator('comp-pagination a').nth(1).click();
                await expect(page.locator('comp-pagination a').nth(1)).toBeVisible();
                await page.locator('comp-pagination a').nth(1).click();
                await page.locator('comp-pagination a').first().click();
                await page.locator('.text-left > .clearfix > .table_filter_text').first().click();
                await page.locator('.text-left > .clearfix > .table_filter_text').first().fill('test sla ticket');
                await page.waitForTimeout(3000);
                await page.locator('.text-left > .clearfix > .table_filter_text').first().press('Enter');
                await expect(page.getByRole('cell', { name: 'Test SLA Ticket', exact: true }).locator('a')).toBeVisible();
                await page.getByRole('cell', { name: 'Test SLA Ticket Assigned' }).locator('a').click();
                await expect(page.locator('#custom_template_dynamic_list_EFN0000114').getByText('Test SLA Ticket Assigned')).toBeVisible({ timeout: 20000 });
                await expect(page.getByText('Assign Accept Cancel Close Attach Assign Accept Cancel Close Attach Title Test')).toBeVisible();
                await expect(page.getByText('Approval', { exact: true })).toBeVisible();
                await expect(page.locator('dynamic-details').getByText('Task', { exact: true })).toBeVisible();
                await expect(page.getByText('Notes')).toBeVisible();
                await page.getByText('Approval', { exact: true }).click();
                await page.locator('#autoComplete_dropdown_Approvers label').nth(1).click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().fill('afrith');
                await expect(page.locator('#autoComplete_dropdown_table_Approvers').getByText('m.afrith', { exact: true })).toBeVisible();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().fill('');
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(1).fill('hyder');
                await expect(page.getByText('Hyder Ali A')).toBeVisible();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(1).fill('');
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(2).click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(2).fill('afrith');
                await expect(page.locator('#autoComplete_dropdown_table_Approvers').getByText('m.afrith@faaztechsolutions.com')).toBeVisible();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(2).click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(2).fill('');
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Next page').click({ timeout: 20000 });
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Next page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Next page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Next page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('page 70').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('page 66').click();
                await expect(page.locator('td').filter({ hasText: 'ux@mawarid.com.sa' }).first()).toBeVisible();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Previous page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Previous page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Previous page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Previous page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('page 1').click();
                await expect(page.locator('td').filter({ hasText: 'a.abdalhamed@mawarid.com.sa' }).first()).toBeVisible();

                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().fill('a.adm');
                await page.locator('td').filter({ hasText: 'a.admin' }).first().click();
                await page.locator('#pills-tabContent').getByText('Close').click();
                await page.locator('dynamic-details').getByText('Task', { exact: true }).click();
                await expect(page.getByPlaceholder('Title')).toBeVisible();
                await expect(page.locator('div').filter({ hasText: /^Test SLA Ticket AssignedType here\.\.\.$/ }).locator('div')).toBeVisible();
                await expect(page.getByText('IT', { exact: true })).toBeVisible();
                await page.locator('#relation_autoComplete_dropdown_DepartmentMember label').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().click();
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().fill('viswa');
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().press('Enter');
                await expect(page.getByText('m.viswa@mawarid.com.sa')).toBeVisible({ timeout: 20000 });
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().click();
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().fill('');
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().press('Enter');
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').nth(3).click();
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').nth(3).fill('hyder');
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').nth(3).press('Enter');
                await expect(page.locator('td').filter({ hasText: 'a.hyder' }).locator('comp-datatype')).toBeVisible();
                await page.getByText('hyder@faaztechsolutions.com').click();
                await page.getByPlaceholder('Comments').click();
                await page.locator('#pills-tabContent').getByText('Close').click();
                await page.getByText('Notes').click();
                await expect(page.locator('label').filter({ hasText: 'Notes' })).toBeVisible();
                await page.locator('#cdk-drop-list-1 a').filter({ hasText: 'Approvals' }).click();
                await page.locator('#cdk-drop-list-1 li').filter({ hasText: 'Task' }).locator('a').click();
                await page.locator('li').filter({ hasText: 'History' }).locator('a').click();
                await expect(page.getByText('Status History')).toBeVisible();
                await page.locator('a').filter({ hasText: 'Assignment' }).click();
                await expect(page.getByText('TRQ0010583 Test SLA Ticket')).toBeVisible();
                await page.locator('app-button > .btn').first().click();
                await page.locator('.mb-1 > .ng-select-container').first().hover();
                await page.locator('.table_filter_clear').click();
            });

        });

        test('Unassigned Requests: should filter, assign, and validate unassigned requests', async ({ page }) => {
            test.slow();
            await page.locator('#MNU0000040').click();
            await page.getByRole('link', { name: ' Unassigned Requests' }).click();
            await expect(page.getByText('Un Assigned Requests')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();
            await page.locator('i:nth-child(2)').click();
            await page.locator('.text-left > .clearfix > .table_filter_text').first().click();
            await page.locator('.text-left > .clearfix > .table_filter_text').first().fill('11625');
            await page.locator('.text-left > .clearfix > .table_filter_text').first().press('Enter');
            await expect(page.getByText('TRQ0011625')).toBeVisible();
            await page.locator('.mb-1 > .ng-select-container').first().hover();
            await page.locator('.table_filter_clear').click();
            await page.locator('#relation_autoComplete_dropdown_TicketCategory label').click();
            await page.locator('tr:nth-child(4) > .check-td').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await page.locator('.text-left > .clearfix > .table_filter_text').first().click();
            await page.locator('.text-left > .clearfix > .table_filter_text').first().fill('11625');
            await page.locator('.text-left > .clearfix > .table_filter_text').first().press('Enter');
            await page.getByRole('cell', { name: 'Test 2 Play wright automation' }).locator('a').click();
            await page.getByText('Pickup').nth(1).click();
            await expect(page.locator('#Actionform').getByText('Pickup')).toBeVisible();
            await expect(page.locator('#Actionform form div').filter({ hasText: 'Assigned To Assigned To m.' }).nth(2)).toBeVisible();
            await page.locator('#Actionform button').first().click();
            await page.getByText('Assign', { exact: true }).nth(1).click();
            await expect(page.locator('#Actionform').getByText('Assign', { exact: true })).toBeVisible();
            await page.locator('#Actionform').getByText('Close').click();
            await page.getByText('Accept').nth(1).click();
            await page.locator('#relation_autoComplete_dropdown_TicketTypeddl label').click();
            await page.locator('table').filter({ hasText: 'Name Issue Bug Customer' }).locator('input[type="text"]').click();
            await page.locator('table').filter({ hasText: 'Name Issue Bug Customer' }).locator('input[type="text"]').fill('bug');
            await expect(page.locator('td').filter({ hasText: 'Bug' })).toBeVisible();
            await page.locator('td').filter({ hasText: 'Bug' }).locator('div').click();
            await page.getByPlaceholder('Scheduled Date').fill('2025-06-11');
            await page.locator('#Durationperiod').click();
            await page.locator('#Durationperiod').fill('1');
            await page.locator('div').filter({ hasText: /^Duration Type$/ }).nth(2).click();
            await page.getByText('Hours', { exact: true }).click();
            await page.locator('#Actionform').getByText('Close').click();
            await page.getByText('Cancel').nth(2).click();
            await expect(page.locator('#Actionform').getByText('Cancel')).toBeVisible();
            await page.locator('#Actionform button').first().click();
            await page.getByText('Close').nth(3).click();
            await expect(page.locator('h4').filter({ hasText: 'Close' })).toBeVisible();
            await page.locator('#Actionform button').first().click();
            await page.getByText('Approval', { exact: true }).click();

            await page.locator('#pills-tabContent label').nth(2).click();
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('a.hy');
            await page.locator('tr').filter({ hasText: 'a.hyder Hyder Ali A hyder@' }).locator('i').click();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test comments');
            await page.locator('#pills-tabContent').getByText('Close').click();
            await page.locator('dynamic-details').getByText('Task', { exact: true }).click();
            await page.locator('#relation_autoComplete_dropdown_DepartmentMember label').nth(1).click();
            await page.waitForTimeout(2000);
            await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().click();
            await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().fill('m.viswa');
            await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().press('Enter');
            await page.locator('td').filter({ hasText: 'm.viswa@mawarid.com.sa' }).click();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test comments');
            await page.locator('#pills-tabContent').getByText('Close').click();
            await page.getByText('Approval', { exact: true }).click();
            await page.locator('#pills-tabContent label').nth(2).click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('page 2').click();
            await page.getByText('page 3').click();
            await page.getByText('page 4').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await expect(page.locator('td').filter({ hasText: 'a.alqahss@mawarid.com.sa' }).first()).toBeVisible();

            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]/a').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();

            await page.getByText('page 1').click();
            await page.locator('input[type="search"]').first().click();

            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('a.alharbi01@mawarid.com.sa');
            await page.locator('tr').filter({ hasText: 'a.alharbi01@mawarid.com.sa' }).locator('i').click();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test');
            await page.locator('#pills-tabContent').getByText('Close').click();

            await page.getByText('Notes').click();
            await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('div').filter({ hasText: /^test$/ }).fill('test notes');
            await page.locator('#pills-tabContent').getByText('Close').click();
            await page.locator('#cdk-drop-list-1 a').filter({ hasText: 'Approvals' }).click();
            await expect(page.locator('table').filter({ hasText: 'Approver Id Approver Status' })).toBeVisible();
            await page.locator('#cdk-drop-list-1 li').filter({ hasText: 'Task' }).locator('a').click();
            await expect(page.locator('table').filter({ hasText: 'Task Id Title Status Assigned' })).toBeVisible();
            await page.locator('li').filter({ hasText: 'History' }).locator('a').click();
            await expect(page.getByText('Request Id Status System Comments User Comments Action By Action Date No Data')).toBeVisible();
            await page.locator('a').filter({ hasText: 'Assignment' }).click();
            await expect(page.locator('#dynamic_list_EFN0000108').getByText('TRQ0011625', { exact: true })).toBeVisible();
            await page.locator('a').filter({ hasText: 'Conversation' }).click();
            await expect(page.locator('app-button > .btn').first()).toBeVisible();
            await page.locator('app-button > .btn').first().click();
            await page.locator('label').filter({ hasText: 'Portal' }).hover();

            await page.locator('label').filter({ hasText: 'Portal' }).locator('i').click();
            await page.locator('.mb-1 > .ng-select-container').first().hover();
            await page.locator('.table_filter_clear').click();
        });

        test('My Open Requests: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            test.slow();
            await test.step('myOpenRequest menu test', async () => {
                test.slow();
                await page.locator('#MNU0000040').click();
                await page.getByRole('link', { name: ' My Open Requests' }).click();
                await expect(page.getByText('My Open Request', { exact: true })).toBeVisible({ timeout: 30000 });
                await page.locator('i:nth-child(2)').click();
                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('test ticket flow 2');
                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
                await expect(page.getByRole('cell', { name: 'Test Ticket Flow 2', exact: true }).locator('a')).toBeVisible();
                await expect(page.getByText('TRQ0004716')).toBeVisible();
                await page.getByRole('cell', { name: 'Test Ticket Flow 2', exact: true }).locator('a').click();
                await expect(page.getByText('Assign Attach Assign Attach')).toBeVisible({ timeout: 30000 });
                await page.locator('dynamic-details').getByText('Task', { exact: true }).click();
                await expect(page.getByPlaceholder('Title')).toBeVisible();
                await expect(page.locator('#relation_autoComplete_dropdown_Department label').nth(1)).toBeVisible();
                await page.locator('#relation_autoComplete_dropdown_DepartmentMember label').nth(1).click();
                await page.getByRole('button', { name: 'OK' }).click();
                await page.getByText('Close', { exact: true }).click();
                await page.getByText('Notes').click();
                await page.getByText('Close', { exact: true }).click();
                await page.locator('#cdk-drop-list-1 a').filter({ hasText: 'Approvals' }).click();
                await expect(page.locator('td').filter({ hasText: 'Rejected' }).locator('comp-datatype')).toBeVisible();
                await page.locator('#cdk-drop-list-1 li').filter({ hasText: 'Task' }).locator('a').click();
                await page.locator('li').filter({ hasText: 'History' }).locator('a').click();
                await expect(page.getByText('Status History')).toBeVisible();
                await page.locator('a').filter({ hasText: 'Assignment' }).click();
                await page.locator('app-button > .btn').first().click();
                await expect(page.getByRole('table')).toContainText('Test Ticket Flow 2');
                await page.locator('td:nth-child(3) > .clearfix > .mb-1 > .ng-select-container').hover();
                await page.getByRole('cell', { name: '% test ticket flow 2 ' }).locator('i').click();
                await page.locator('comp-pagination a').nth(2).click();
                await page.locator('comp-pagination a').first().click();
                await page.getByRole('table').locator('#autoComplete_dropdown_Status label').click();
                await page.getByRole('row', { name: ' Approved Approved', exact: true }).locator('i').click();
                await page.getByRole('row', { name: ' ReOpen ReOpen', exact: true }).locator('i').click();
                await page.getByRole('button', { name: 'OK' }).click();
                await expect(page.getByRole('table').getByText('ReOpen', { exact: true }).first()).toBeVisible();
                await expect(page.getByRole('table')).toContainText('Approved,ReOpen');
                await page.getByRole('table').locator('text=Approved,ReOpen').hover();
                await page.locator('comp-table label').filter({ hasText: 'Approved,ReOpen' }).locator('i').click();
            });
        });

        test('All Requests: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            test.slow();
            await test.step('All Requests menu test', async () => {
                await page.locator('#MNU0000040').click();
                await expect(page.getByRole('link', { name: ' All Requests' })).toBeVisible();
                await page.getByRole('link', { name: ' All Requests' }).click();
                await page.locator('i:nth-child(2)').click();
                await page.locator('.table_filter_text').first().click();
                await page.locator('.table_filter_text').first().fill('981');
                await page.locator('.table_filter_text').first().press('Enter');
                await expect(page.getByRole('row', { name: 'TRQ0010981 الروضة 1' })).toBeVisible();
                await page.getByRole('cell', { name: '% 981 ' }).getByRole('combobox').hover();
                await page.locator('.table_filter_clear').click();
                await expect(page.locator('.table_filter_text').first()).toBeEmpty();
                await page.locator('#relation_autoComplete_dropdown_TicketCategory label').click();
                await expect(page.locator('#autoComplete_dropdown_tableTicketCategory').getByRole('cell', { name: 'CRM' }).locator('div')).toBeVisible();
                await page.getByRole('list').filter({ hasText: 'of3' }).locator('a').nth(2).click();
                await expect(page.getByRole('row', { name: ' Maintenance Maintenance TCY0000013 DPT0000009', exact: true }).locator('comp-datatype').nth(1)).toBeVisible();
                await page.getByRole('list').filter({ hasText: 'of3' }).locator('a').nth(2).click();
                await expect(page.getByRole('cell', { name: 'Recruitment - Individual Live-In', exact: true }).locator('comp-datatype')).toBeVisible();
                await page.getByRole('list').filter({ hasText: 'of3' }).locator('a').nth(1).click();
                await expect(page.getByRole('row', { name: ' Maintenance Maintenance TCY0000013 DPT0000009', exact: true }).locator('comp-datatype').nth(1)).toBeVisible();
                await page.getByRole('list').filter({ hasText: 'of3' }).locator('a').first().click();
                await expect(page.locator('#autoComplete_dropdown_tableTicketCategory').getByRole('cell', { name: 'CRM' }).locator('comp-datatype')).toBeVisible();
                await page.getByRole('list').filter({ hasText: 'of3' }).locator('a').nth(3).click();
                await expect(page.getByRole('row', { name: ' Test Test TCY0000068 DPT0000018', exact: true }).locator('div').nth(1)).toBeVisible();
                await page.getByRole('row', { name: ' Test Test TCY0000068 DPT0000018', exact: true }).locator('div').nth(1).click();
                await page.getByRole('list').filter({ hasText: 'of3' }).locator('a').first().click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory').getByRole('cell', { name: 'Portal' }).locator('div').click();
                await page.getByRole('row', { name: ' IT ERP TCY0000002 DPT0000001', exact: true }).locator('i').click();
                await page.getByRole('button', { name: 'OK' }).click();
                await expect(page.getByRole('table')).toContainText('Portal', { timeout: 20000 });
                await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(2).click();
                await expect(page.getByRole('listitem').filter({ hasText: /of/i }).getByRole('spinbutton')).toHaveValue('2');
                await expect(page.getByRole('table')).toContainText('ERP');
                await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(2).click();
                await page.waitForTimeout(1000);
                await expect(page.getByRole('listitem').filter({ hasText: /of/i }).getByRole('spinbutton')).toHaveValue('3'), { timeout: 20000 };
                await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(2).click();
                await expect(page.getByRole('listitem').filter({ hasText: /of/i }).getByRole('spinbutton')).toHaveValue('4'), { timeout: 20000 };
                await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(2).click();
                await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(2).click();
                await expect(page.getByRole('listitem').filter({ hasText: /of/i }).getByRole('spinbutton')).toHaveValue('6'), { timeout: 20000 };
                await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(3).click();
                await page.getByRole('list').filter({ hasText: /of/i }).locator('a').first().click();
                await expect(page.getByRole('listitem').filter({ hasText: /of/i }).getByRole('spinbutton')).toHaveValue('1');
                await page.getByRole('cell', { name: 'IN ERP,Portal' }).getByRole('combobox').hover();
                await page.getByText('ERP,Portal').hover();
                await page.locator('label').filter({ hasText: 'ERP,Portal' }).locator('i').click();
                await expect(page.locator('#relation_autoComplete_dropdown_TicketCategory')).toContainText('');
                await page.locator('#autoComplete_dropdown_Status label').click();
                await page.getByRole('row', { name: ' New New', exact: true }).locator('div').first().click();
                await page.getByRole('row', { name: ' Approved Approved', exact: true }).locator('i').click();
                await page.getByRole('button', { name: 'OK' }).click();
                await expect(page.getByRole('table')).toContainText('New'), { timeout: 20000 };
                await expect(
                    page.getByRole('listitem').filter({ hasText: /of/i }).getByRole('spinbutton')
                ).toHaveValue('1', { timeout: 10000 });

                await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(3).click();
                await page.getByRole('list').filter({ hasText: /of/i }).locator('a').first().click();
                await expect(page.getByRole('listitem').filter({ hasText: /of/i }).getByRole('spinbutton')).toBeVisible();
                await page.getByText('New,Approved').hover();
                await page.locator('label').filter({ hasText: 'New' }).locator('i').click();
                await page.locator('#dynamic_list_EFN0000118').getByRole('listitem').first().click();
                await expect(page.getByRole('listitem').filter({ hasText: /of/i }).getByRole('spinbutton')).toHaveValue('1');
                await page.waitForTimeout(1000);
                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').first().click();
                await page.waitForTimeout(1000);
                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').first().fill('\t test helpdesk');
                await page.waitForTimeout(1000);
                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').first().press('Enter');
                await page.waitForTimeout(1000);
                await expect(page.getByRole('cell', { name: 'test helpdesk', exact: true })).toBeVisible();
                await page.getByRole('cell', { name: 'test helpdesk', exact: true }).locator('a').click();
                await page.locator('#custom_template_dynamic_list_EFN0000114').getByText('test helpdesk').waitFor({ state: 'visible', timeout: 15000 });
                // await expect(page.locator('#custom_template_dynamic_list_EFN0000114').getByText('test helpdesk')).toBeVisible();
                await expect(page.getByText('Attach Attach Title test')).toBeVisible();
                await expect(page.locator('a').filter({ hasText: 'Conversation' })).toBeVisible();
                await expect(page.locator('li').filter({ hasText: 'MMohamed Afrith Changed to' })).toBeVisible();
                await page.locator('#cdk-drop-list-1 a').filter({ hasText: 'Approvals' }).click();
                await expect(page.getByText('Approver Id')).toBeVisible();
                await page.locator('#cdk-drop-list-1 li').filter({ hasText: 'Task' }).locator('a').click();
                await expect(page.getByText('Task Id')).toBeVisible();
                await page.locator('li').filter({ hasText: 'History' }).locator('a').click();
                await expect(page.getByText('Status History')).toBeVisible();
                await page.locator('a').filter({ hasText: 'Assignment' }).click();
                await expect(page.locator('#dynamic_list_EFN0000108').getByText('Request Id')).toBeVisible();
                await page.getByText('Notes').click();
                await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('wht');
                await page.getByText('Close', { exact: true }).click();
                await page.locator('app-button > .btn').first().click();
                await page.getByText('⯆×%×').nth(1).hover();
                await page.waitForTimeout(1000);
                await page.getByRole('cell', { name: '% test helpdesk ' }).locator('i').click();
                await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text').first()).toBeEmpty();
                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').first().click();

                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').first().click();
                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').first().fill('Test 2 Play wright automation');
                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').first().press('Enter');

                await page.getByRole('cell', { name: 'Test 2 Play wright automation (Don\'t Assign this Ticket)' }).locator('a').click();
                await expect(page.locator('#custom_template_dynamic_list_EFN0000114')).toContainText('Test 2 Play wright automation (Don\'t Assign this Ticket)');

                await page.getByText('Pickup').nth(1).click();
                await expect(page.locator('#Actionform')).toContainText('Pickup');
                await page.locator('#Actionform button').first().click();
                await page.getByText('Assign', { exact: true }).nth(1).click();
                await page.locator('#Actionform').getByText('Portal').click();
                await page.locator('relation-field').filter({ hasText: 'Ticket Category * Portal' }).locator('input[type="text"]').nth(1).click();
                await page.locator('relation-field').filter({ hasText: 'Ticket Category * Portal' }).locator('input[type="text"]').nth(1).fill('crm');
                await page.locator('relation-field').filter({ hasText: 'Ticket Category * Portal' }).locator('input[type="text"]').nth(1).press('Enter');
                await page.locator('relation-field').filter({ hasText: 'Ticket Category * Portal' }).locator('input[type="text"]').nth(1).click();
                await page.locator('relation-field').filter({ hasText: 'Ticket Category * Portal' }).locator('input[type="text"]').nth(1).fill('');
                await page.locator('relation-field').filter({ hasText: 'Ticket Category * Portal' }).locator('input[type="text"]').nth(1).press('Enter');
                await expect(page.locator('relation-field').filter({ hasText: 'Ticket Category * Portal' }).locator('input[type="text"]').nth(1)).toBeEmpty();
                await page.locator('relation-field').filter({ hasText: 'Ticket Category * Portal' }).locator('input[type="text"]').nth(2).click();
                await page.locator('relation-field').filter({ hasText: 'Ticket Category * Portal' }).locator('input[type="text"]').nth(2).fill('10');
                await page.locator('relation-field').filter({ hasText: 'Ticket Category * Portal' }).locator('input[type="text"]').nth(2).press('Enter');
                await expect(page.locator('#Actionform td').filter({ hasText: 'TCY0000010' })).toBeVisible();
                await page.locator('relation-field').filter({ hasText: 'Ticket Category * Portal' }).locator('input[type="text"]').nth(2).click();
                await page.locator('relation-field').filter({ hasText: 'Ticket Category * Portal' }).locator('input[type="text"]').nth(2).fill('');
                await page.locator('relation-field').filter({ hasText: 'Ticket Category * Portal' }).locator('input[type="text"]').nth(2).press('Enter');
                await page.locator('#Actionform comp-pagination a').nth(2).click();
                await expect(page.locator('#Actionform input[name="currentPage"]')).toHaveValue('2');
                await expect(page.locator('td').filter({ hasText: 'Maintenance' }).nth(4)).toBeVisible({ timeout: 20000 });
                await page.locator('#Actionform comp-pagination a').nth(2).click();
                await expect(page.locator('#Actionform input[name="currentPage"]')).toHaveValue('3');
                await expect(page.locator('#Actionform td').filter({ hasText: 'Recruitment - Individual Hourly' })).toBeVisible({ timeout: 20000 });
                await page.locator('#Actionform comp-pagination a').first().click();
                await expect(page.locator('#Actionform input[name="currentPage"]')).toHaveValue('1');
                await expect(page.locator('#Actionform tbody').getByText('CRM')).toBeVisible();
                await page.locator('#Actionform button').first().click();
                await page.getByText('Accept').nth(1).click();
                await page.locator('#relation_autoComplete_dropdown_TicketTypeddl label').click();
                await expect(page.locator('#autoComplete_dropdown_tableTicketTypeddl td').filter({ hasText: 'Issue' })).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableTicketTypeddl td').filter({ hasText: 'Issue' }).click();
                await page.locator('ng-select').filter({ hasText: 'Duration Type' }).locator('input[type="text"]').click();
                await page.getByText('Hours').click();
                await page.locator('#Actionform').getByText('Close').click();
                await page.getByText('Cancel').nth(1).click();
                await expect(page.locator('#Actionform div').filter({ hasText: 'Cancel' }).nth(2)).toBeVisible();
                await page.locator('#Actionform button').first().click();
                await page.getByText('Approval', { exact: true }).click();
                await page.locator('#autoComplete_dropdown_Approvers label').nth(1).click();
                await page.waitForTimeout(10000);
                await expect(page.locator('td').filter({ hasText: '1010973' })).toBeVisible();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Next page').click();
                await expect(page.locator('#autoComplete_dropdown_table_Approvers')).toContainText('2');
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Next page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Next page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Next page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Next page').click();
                await expect(page.locator('#autoComplete_dropdown_table_Approvers')).toContainText('6');
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Previous page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Previous page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Previous page').click();
                await expect(page.locator('td').filter({ hasText: 'a.albugami@mawarid.com.sa' }).first()).toBeVisible();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('page 1').click();
                await expect(page.locator('td').filter({ hasText: '1010973' })).toBeVisible();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().fill('hyder');
                await expect(page.locator('#autoComplete_dropdown_table_Approvers td').filter({ hasText: 'a.hyder' })).toBeVisible();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().fill('');
                await expect(page.locator('td').filter({ hasText: '1010973' })).toBeVisible();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(1).fill('hyder');
                await expect(page.locator('#autoComplete_dropdown_table_Approvers td').filter({ hasText: 'Hyder Ali A' })).toBeVisible();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(1).fill('');
                await expect(page.locator('td').filter({ hasText: 'a.abdalhamed@mawarid.com.sa' }).first()).toBeVisible();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(2).click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(2).fill('hyder');
                await expect(page.locator('#autoComplete_dropdown_table_Approvers td').filter({ hasText: 'hyder@faaztechsolutions.com' })).toBeVisible();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(2).click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').nth(2).fill('');
                await expect(page.locator('td').filter({ hasText: 'a.abdalhamed@mawarid.com.sa' }).first()).toBeVisible();

                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().fill('a.ad');
                await page.locator('td').filter({ hasText: 'a.admin' }).first().click();
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('be');
                await page.locator('#pills-tabContent').getByText('Close').click();
                await page.locator('dynamic-details').getByText('Task', { exact: true }).click();
                await expect(page.getByPlaceholder('Title')).toBeVisible({ timeout: 20000 });
                await page.locator('#relation_autoComplete_dropdown_Department').getByText('IT').click();
                await page.locator('ul').filter({ hasText: 'of2' }).locator('a').nth(2).click();
                await expect(page.locator('td').filter({ hasText: 'Project' })).toBeVisible({ timeout: 20000 });
                await page.locator('ul').filter({ hasText: 'of2' }).locator('a').nth(1).click();
                await expect(page.locator('tr').filter({ hasText: 'IT DPT0000001 a.aldukhayil@' }).locator('td').nth(1)).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableDepartment input[type="text"]').first().click();
                await page.locator('#autoComplete_dropdown_tableDepartment input[type="text"]').first().fill('test');
                await page.locator('#autoComplete_dropdown_tableDepartment input[type="text"]').first().press('Enter');
                await expect(page.locator('#autoComplete_dropdown_tableDepartment td').filter({ hasText: 'Test' })).toBeVisible({ timeout: 10000 });
                await page.locator('#autoComplete_dropdown_tableDepartment input[type="text"]').first().click();
                await page.locator('#autoComplete_dropdown_tableDepartment input[type="text"]').first().fill(''), { timeout: 10000 };
                await page.locator('#autoComplete_dropdown_tableDepartment input[type="text"]').first().press('Enter');
                await expect(page.locator('tr').filter({ hasText: 'IT DPT0000001 a.aldukhayil@' }).locator('td').nth(1)).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableDepartment td').filter({ hasText: 'Finance' }).click();
                await page.locator('#relation_autoComplete_dropdown_DepartmentMember label').nth(1).click();
                await page.locator('#autoComplete_dropdown_DepartmentMember comp-pagination a').nth(2).click();
                await expect(page.locator('td').filter({ hasText: 'ma.aldosari@mawarid.com.sa' }).first()).toBeVisible();
                await page.locator('#autoComplete_dropdown_DepartmentMember comp-pagination a').nth(1).click();
                await expect(page.locator('td').filter({ hasText: 'a.mahmoud@mawarid.com.sa' }).first()).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().click();
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().fill('aldo');
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().press('Enter');
                await expect(page.locator('td').filter({ hasText: 'ma.aldosari@mawarid.com.sa' }).first()).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().click();
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().fill('');
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().press('Enter');
                await page.locator('td').filter({ hasText: 'amrmagdi@mawarid.com.sa' }).first().click();
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('asd');
                await page.locator('label').filter({ hasText: 'Amr Zayed' }).hover();
                await page.locator('label').filter({ hasText: 'Amr Zayed' }).locator('i').click();
                await page.locator('#pills-tabContent').getByText('Close').click();
                await page.locator('#cdk-drop-list-3 a').filter({ hasText: 'Approvals' }).click();
                await expect(page.locator('th').filter({ hasText: 'Approver Id' })).toBeVisible();
                await page.locator('#cdk-drop-list-3 li').filter({ hasText: 'Task' }).locator('a').click();
                await expect(page.locator('th').filter({ hasText: 'Task Id' })).toBeVisible();
                await page.locator('li').filter({ hasText: 'History' }).locator('a').click();
                await expect(page.getByText('Status History')).toBeVisible();
                await page.locator('a').filter({ hasText: 'Assignment' }).click();
                await expect(page.locator('#dynamic_list_EFN0000108 th').filter({ hasText: 'Request Id' })).toBeVisible();
                await page.locator('app-button > .btn').first().click();
                await page.getByText('⯆×%×').nth(1).hover();
                await page.locator('.table_filter_clear').click();
                await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text').first()).toBeEmpty();
            });
        });
    });

    test.describe('My Teams', () => {
        test('My Team Requests: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            await page.locator('#MNU0000050').click();
            await page.getByRole('link', { name: ' My Team Requests' }).click();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();
            await page.locator('i:nth-child(3)').click();
            await page.locator('comp-tilefilter ng-select div').first().click();
            await page.getByRole('option', { name: 'Title' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('Test Ticket From Mobile Customer Support');
            await page.getByRole('button', { name: '' }).click();
            await expect(page.locator('#td_content_0_0 comp-field-view-type a')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000123').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Request Id' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('TRQ0012008');
            await page.getByRole('button', { name: '' }).click();
            await expect(page.locator('#td_content_0_1').getByText('TRQ0012008')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000123').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Status' }).click();
            await page.locator('comp-tilefilter label').click();
            await page.getByText('Cancelled').nth(1).click();
            await page.getByRole('row', { name: ' ReOpen ReOpen' }).locator('div').first().click();
            await page.getByRole('button', { name: '' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000123').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Assigned To' }).click();
            await page.locator('comp-tilefilter label').click();
            await page.getByText('page 2').click();
            await page.getByText('page 3').click();
            await page.getByText('page 4').click();
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('hy');
            await page.getByRole('row', { name: ' Hyder Ali A hyder@' }).locator('i').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.locator('#td_content_0_4').getByText('a.hyder')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000123').getByRole('textbox').click();
            await page.getByLabel('Options list').getByText('Request Id').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('TRQ0012122');
            await page.getByRole('textbox').nth(3).press('Enter');
            await page.locator('#td_content_0_0 comp-field-view-type a').click();
            await page.getByRole('link', { name: 'Pickup' }).click();
            await page.locator('#Actionform').getByText('Close').click();
            await page.getByRole('link', { name: 'Assign', exact: true }).click();
            await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('m.krishna').click();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a').click();
            await page.waitForTimeout(2000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a').click();
            await expect(page.getByText('a.aldukhayil@mawarid.com.sa').first()).toBeVisible();
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().click();
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().fill('hyder');
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().press('Enter');
            await expect(page.locator('#autoComplete_dropdown_tableAssignedTo').getByText('a.hyder')).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableAssignedTo i').click();
            await page.locator('#Actionform').getByText('Close').click();
            await page.getByRole('link', { name: 'Accept' }).click();
            await page.locator('#relation_autoComplete_dropdown_TicketTypeddl label').click();
            await page.locator('#autoComplete_dropdown_TicketTypeddl a').nth(3).click();
            await expect(page.getByText('Test', { exact: true })).toBeVisible();
            await page.locator('#autoComplete_dropdown_TicketTypeddl a').nth(2).click();
            await page.getByText('Issue').click();
            await page.getByPlaceholder('Scheduled Date').fill('2025-07-30');
            await page.locator('#Durationperiod').click();
            await page.locator('#Durationperiod').fill('2');
            await page.locator('ng-select').filter({ hasText: 'Duration Type' }).locator('input[type="text"]').click();
            await page.locator('div').filter({ hasText: /^Days$/ }).click();
            await page.locator('#Actionform').getByText('Close').click();
            await page.getByRole('link', { name: 'Cancel' }).click();
            await expect(page.locator('#Actionform').getByText('Cancel')).toBeVisible();
            await page.locator('#Actionform').getByText('Close').click();
            await page.getByRole('link', { name: 'Approval' }).click();
            await page.locator('#autoComplete_dropdown_Approvers label').nth(1).click();
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('hyder');
            await expect(page.getByRole('cell', { name: 'a.hyder' }).locator('div')).toBeVisible();
            await page.getByRole('cell', { name: '' }).locator('i').click();
            await page.locator('#autoComplete_dropdown_Approvers').getByText('a.hyder').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await page.getByText('page 4').click();
            await page.getByText('page 5').click();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1').click();
            await page.getByText('a.abdalhamed@mawarid.com.sa').first().click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments' }).click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments' }).fill('test');
            await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
            await page.getByRole('link', { name: ' Task' }).click();
            await page.locator('#relation_autoComplete_dropdown_Department label').nth(1).click();
            await page.getByRole('list').filter({ hasText: 'of2' }).locator('a').nth(2).click();
            await page.getByRole('list').filter({ hasText: 'of2' }).locator('a').nth(1).click();
            await page.waitForTimeout(2000);
            await page.getByRole('row', { name: ' IT DPT0000001 a.aldukhayil@' }).locator('i').click();
            await page.locator('#relation_autoComplete_dropdown_DepartmentMember label').nth(1).click();
            await page.getByRole('list').filter({ hasText: 'of2' }).locator('a').nth(2).click();
            await page.getByRole('list').filter({ hasText: 'of2' }).locator('a').nth(1).click();
            await page.locator('#autoComplete_dropdown_tableDepartmentMember').getByRole('textbox').first().click();
            await page.locator('#autoComplete_dropdown_tableDepartmentMember').getByRole('textbox').first().fill('ajeesh');
            await page.locator('#autoComplete_dropdown_tableDepartmentMember').getByRole('textbox').first().press('Enter');
            await page.waitForTimeout(2000);
            await page.getByRole('cell', { name: '' }).locator('i').click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments' }).click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments' }).fill('test');
            await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
            await page.getByRole('link', { name: ' Notes' }).click();
            await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test notes');
            await page.getByRole('button', { name: '' }).click();
            await page.locator('div').filter({ hasText: /^test notes$/ }).fill('test notes bold');
            await page.locator('#pills-tabContent').getByRole('button', { name: 'Close' }).click();
            await page.locator('#cdk-drop-list-1 a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByText('Approver Id')).toBeVisible();
            await page.locator('#cdk-drop-list-1').getByRole('listitem').filter({ hasText: 'Task' }).locator('a').click();
            await expect(page.getByText('Task Id')).toBeVisible();
            await page.getByRole('listitem').filter({ hasText: 'History' }).locator('a').click();
            await expect(page.getByRole('cell', { name: 'Request Id' }).locator('a')).toBeVisible();
            await page.locator('a').filter({ hasText: 'Assignment' }).click();
            await expect(page.locator('a').filter({ hasText: 'Conversation' })).toBeVisible();
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
        });
    });

    test.describe('Reports', () => {
        test.skip('UserLoginReport: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            // test skip because of the UserLoginReport is move to Administration app
            await page.locator('#MNU0000051').click();
            await page.getByRole('link', { name: ' User Login Report' }).click();
            await expect(page.locator('#DynamicCreate div').filter({ hasText: 'From Date To Date User Id Filter Clear' }).nth(2)).toBeVisible();
            await expect(page.locator('#cdk-drop-list-0 a').filter({ hasText: 'List' })).toBeVisible();
            await expect(page.locator('a').filter({ hasText: 'Total Login Count' })).toBeVisible();
            await page.waitForTimeout(30000);
            await page.getByPlaceholder('From Date').fill('2025-04-01');
            await page.getByPlaceholder('To Date').fill('2025-04-30');
            await page.getByPlaceholder('User Id').click();
            await page.getByPlaceholder('User Id').fill('a.hyder');
            await page.getByText('Filter').click();
            // await expect(page.getByRole('row', { name: 'a.hyder a.hyder 03/04/2025 9:45 AM 223.185.24.107 System' })).toBeVisible();
            await page.locator('role=row', { hasText: 'a.hyder' }).waitFor({ state: 'visible', timeout: 60000 });
            await page.locator('comp-pagination a').nth(2).click();
            await page.locator('comp-pagination a').nth(2).click();
            await page.locator('comp-pagination a').nth(2).click();
            await page.locator('comp-pagination a').nth(3).click();
            await expect(page.getByRole('row', { name: 'a.hyder a.hyder 29/04/2025 5:20 PM 192.168.9.1 System' })).toBeVisible();
            await page.getByText('Filter').click();

            await page.locator('comp-pagination a').first().click();
            await page.locator('a').filter({ hasText: 'Total Login Count' }).click();
            await expect(page.locator('canvas').nth(1)).toBeVisible();
            await page.getByRole('button', { name: 'More Options' }).click();
            await page.locator('a').filter({ hasText: 'Unique Users Count' }).click();
            await expect(page.locator('canvas').nth(3)).toBeVisible();

            await page.getByText('Clear').click();
            await expect(page.getByPlaceholder('User Id')).toBeEmpty();
            await expect(page.getByPlaceholder('To Date')).toBeEmpty();
            await expect(page.getByPlaceholder('From Date')).toBeEmpty();
            await page.locator('#cdk-drop-list-0 a').filter({ hasText: 'List' }).click();
        });

        test('RequestByCategory: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            test.slow();
            await page.locator('#MNU0000051').click();
            await page.getByRole('link', { name: ' Request By Category' }).click();
            await expect(page.locator('#DynamicCreate div').filter({ hasText: 'From Date To Date Filter Clear' }).nth(2)).toBeVisible();
            await page.waitForTimeout(10000);
            await expect(page.getByRole('cell', { name: 'CRM' })).toBeVisible({ timeout: 60000 });
            await expect(page.getByRole('cell', { name: 'ERP' })).toBeVisible();
            await expect(page.getByRole('cell', { name: 'HR' })).toBeVisible();
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('cell', { name: 'Maintenance' }).locator('div')).toBeVisible();
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('cell', { name: 'Test' }).locator('div')).toBeVisible();
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.getByRole('cell', { name: 'Individual Sector Accounts' }).locator('div')).toBeVisible();
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByText('Mobile Application')).toBeVisible();
            await page.reload();
            await page.waitForTimeout(20000);
            await page.getByPlaceholder('From Date').fill('2025-06-01');
            await page.getByPlaceholder('To Date').fill('2025-06-07');
            await page.getByText('Filter').click();
        });

        test('RequestByTechnician: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            test.slow();
            await page.locator('#MNU0000051').click();
            await page.getByRole('link', { name: ' Request By Technician' }).click();
            await expect(page.locator('#DynamicCreate div').filter({ hasText: 'From Date To Date Filter Clear' }).nth(2)).toBeVisible({ timeout: 50000 });
            await page.getByPlaceholder('From Date').fill('2025-04-01');
            await page.getByPlaceholder('To Date').fill('2025-04-10');
            await page.getByText('Filter').click();
            await page.waitForTimeout(20000);
            await expect(page.getByText('1010973')).toBeVisible();
            await expect(page.locator('app-dynamic-list > .content > .container-fluid')).toBeVisible();
            await page.getByText('Clear').click();
            await expect(page.getByPlaceholder('From Date')).toBeEmpty();
            await expect(page.getByPlaceholder('To Date')).toBeEmpty();

        });
    });

    test.describe('Approvals', () => {
        test('PendingApprovals: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            await page.locator('#MNU0000083').click();
            await page.getByRole('link', { name: ' Pending Approvals' }).click();
            await page.waitForTimeout(2000);
            await expect(page.getByText('My Pending Approvals')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByRole('link', { name: ' Export Selected' })).toBeVisible();
            await expect(page.getByRole('link', { name: ' Export', exact: true })).toBeVisible();
            await expect(page.getByRole('link', { name: ' Export Visible' })).toBeVisible();
            await page.getByText('Options').click();
            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000213').getByRole('textbox').click();
            await page.getByText('ApproverId').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('APR0001252');
            await page.getByRole('button', { name: '' }).click();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();
            await page.waitForTimeout(3000);
            await page.getByRole('link', { name: 'Approve', exact: true }).click();
            await expect(page.locator('#Actionform').getByText('Approve')).toBeVisible();
            await page.getByText('Close').click();
            await page.getByRole('link', { name: 'Reject' }).click();
            await expect(page.locator('#Actionform').getByText('Reject')).toBeVisible();
            await page.getByText('Close').click();
            await page.locator('a').filter({ hasText: 'Ticket Details' }).click();
            await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
            await page.locator('#cdk-drop-list-2').getByRole('listitem').filter({ hasText: 'Task' }).locator('a').click();
            await page.getByRole('listitem').filter({ hasText: 'History' }).locator('a').click();
            await page.waitForTimeout(2000);
            await expect(page.getByText('Status History')).toBeVisible();
            await page.locator('a').filter({ hasText: 'Assignment' }).click();
            await expect(page.getByRole('cell', { name: 'Request Id' }).locator('a')).toBeVisible();
            await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Conversation' }).click();
            await page.locator('#angular_editor_ETN0000037_Comments div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000037_Comments div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('a').filter({ hasText: 'Conversation' }).first().click();
            await page.locator('#angular_editor_ETN0000047_Comments').getByText('Type here...').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
        });

        test('ApprovedList: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            await page.locator('#MNU0000083').click();
            await page.getByRole('link', { name: ' Approved List' }).click();
            await expect(page.getByText('My Completed Approvals')).toBeVisible({ timeout: 60000 });
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();
            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000215').getByRole('textbox').click();
            await page.getByRole('option', { name: 'ApproverId' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('036');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.getByRole('listitem').filter({ hasText: 'APR0000036 Approver m.afrith' })).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000215').getByRole('textbox')).toBeEmpty();
            await page.locator('#dynamic_list_EFN0000215').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Status' }).click();
            await page.locator('comp-tilefilter label').click();
            await page.getByRole('row', { name: ' Approved' }).locator('div').first().click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.locator('#td_content_0_2').getByText('Approved')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000215').getByRole('textbox').click({ timeout: 10000 });
            await page.getByRole('option', { name: 'ApproverId' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('036');
            await page.getByRole('button', { name: '' }).click();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();
            await expect(page.getByRole('heading', { name: 'Approvals Details' })).toBeVisible({ timeout: 10000 });
            await expect(page.locator('a').filter({ hasText: 'Conversation' })).toBeVisible();
            await page.locator('a').filter({ hasText: 'Ticket Details' }).click();
            await expect(page.locator('#custom_template_dynamic_list_EFN0000114 div').filter({ hasText: 'Test Status : Closed Request' }).nth(1)).toBeVisible();
            await page.waitForTimeout(3000);
            await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
            await page.locator('#cdk-drop-list-2').getByRole('listitem').filter({ hasText: 'Task' }).locator('a').click();
            await page.getByRole('listitem').filter({ hasText: 'History' }).locator('a').click();
            await expect(page.getByText('Status History')).toBeVisible();
            await page.locator('a').filter({ hasText: 'Assignment' }).click();

            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
        });

        test('AllApproved: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            await page.locator('#MNU0000083').click();
            await page.getByRole('link', { name: ' All Approvals' }).click();
            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000214').getByRole('textbox').click();
            await page.getByText('ApproverId').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('APR0000036');
            await page.getByRole('button', { name: '' }).click();
            await expect(page.locator('#td_content_0_0 comp-field-view-type a')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000214').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Approver', exact: true }).click();
            await page.locator('comp-tilefilter label').click();
            await page.getByText('page 2').click();
            await page.getByText('page 3').click();
            await page.getByText('page 4').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await expect(page.getByText('a.alahamdi@mawarid.com.sa').first()).toBeVisible();
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('hyder');
            await page.getByRole('cell', { name: '' }).locator('i').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000214').getByRole('textbox').click();
            await page.getByLabel('Options list').getByText('Approver', { exact: true }).click();
            await page.locator('comp-tilefilter label').click();
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('afr');
            await page.getByRole('cell', { name: 'm.afrith', exact: true }).locator('div').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.locator('#td_content_0_1').getByText('m.afrith')).toBeVisible();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000214').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Status' }).click();
            await page.locator('comp-tilefilter label').click();
            await page.getByText('Cancel').first().click();
            await page.getByText('Rejected').first().click();
            await page.getByRole('button', { name: 'OK' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000214').getByRole('textbox').click();
            await page.getByText('ApproverId').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('APR0001223');
            await page.getByRole('button', { name: '' }).click();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();
            await page.locator('a').filter({ hasText: 'Ticket Details' }).click();
            await page.waitForTimeout(3000);

            await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByRole('cell', { name: 'Approver Id' }).locator('a')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'APR0001223' }).locator('comp-datatype')).toBeVisible();
            await page.locator('#cdk-drop-list-2').getByRole('listitem').filter({ hasText: 'Task' }).locator('a').click();
            await page.getByRole('listitem').filter({ hasText: 'History' }).locator('a').click();
            await expect(page.getByText('Status History')).toBeVisible();
            await page.locator('a').filter({ hasText: 'Assignment' }).click();
            await expect(page.getByRole('cell', { name: 'Request Id' })).toBeVisible();
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
        });
    });

    test.describe('Task', () => {
        test('PendingTask: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            await page.locator('#MNU0000087').click();
            await page.getByRole('link', { name: ' Pending Task' }).click();
            await page.waitForTimeout(2000);
            await expect(page.getByText('My Pending Tasks')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();
            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000211').getByRole('textbox').click();
            await page.getByRole('option', { name: 'TaskId' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('062');
            await page.getByRole('textbox').nth(3).press('Enter');
            await page.locator('#td_content_0_0 comp-field-view-type a').click();
            await expect(page.getByRole('heading', { name: 'Task Details' })).toBeVisible();
            await expect(page.locator('#page_left').getByText('Title')).toBeVisible();
            await expect(page.getByText('Test Ticket create from').nth(2)).toBeVisible();
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000211').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Status' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000211').getByRole('textbox').click();
            await page.getByLabel('Options list').getByText('AssignedTo').click();
            await page.locator('comp-tilefilter label').click();
            await expect(page.getByRole('cell', { name: 'a.hyder' }).locator('div')).toBeVisible();
            await page.waitForTimeout(1000);
            await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(2).click();
            await page.waitForTimeout(1000);
            await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(2).click();
            await page.waitForTimeout(1000);
            await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(2).click();
            await page.waitForTimeout(1000);
            await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(2).click();
            await page.waitForTimeout(1000);
            await expect(page.locator('#autoComplete_dropdown_AssignedTo').getByRole('spinbutton')).toHaveValue('5');
            await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(3).click();
            await expect(page.getByRole('row', { name: ' a.alnaeem@mawarid.com.sa' }).locator('div').first()).toBeVisible();
            await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(1).click();
            await page.waitForTimeout(1000);
            await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(1).click();
            await page.waitForTimeout(1000);
            await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(1).click();
            await page.waitForTimeout(1000);
            await page.getByRole('list').filter({ hasText: /of/i }).locator('a').first().click();
            await page.waitForTimeout(1000);
            await expect(page.getByRole('cell', { name: 'a.hyder' }).locator('div')).toBeVisible();
            await page.getByRole('cell', { name: 'a.hyder' }).locator('div').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
        });

        test('AllTask: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            test.slow();
            await page.locator('#MNU0000087').click();
            await page.getByRole('link', { name: ' All Tasks' }).click();
            await expect(page.getByText('My All Tasks')).toBeVisible({ timeout: 10000 });
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();
            await page.locator('i:nth-child(2)').click();
            await page.locator('comp-tilefilter ng-select div').first().click();
            await page.getByLabel('Options list').getByText('AssignedTo').click();
            await page.locator('comp-tilefilter label').click();
            await page.locator('#autoComplete_dropdown_tableAssignedTo').getByRole('textbox').first().click();
            await page.locator('#autoComplete_dropdown_tableAssignedTo').getByRole('textbox').first().fill('hyder');
            await page.locator('#autoComplete_dropdown_tableAssignedTo').getByRole('textbox').first().press('Enter');
            await page.getByRole('cell', { name: 'hyder', exact: true }).getByRole('textbox').fill('');
            await page.waitForTimeout(1000);
            await page.locator('#autoComplete_dropdown_tableAssignedTo').getByRole('textbox').first().click();
            await page.locator('#autoComplete_dropdown_tableAssignedTo').getByRole('textbox').first().press('Enter');
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a').click();
            await page.waitForTimeout(1000);
            await expect(page.locator('#autoComplete_dropdown_AssignedTo').getByRole('spinbutton')).toHaveValue('5');
            await page.waitForTimeout(1000);

            await expect(page.getByText('a.almansour01@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a').click();
            await page.waitForTimeout(1000);
            await page.locator('//*[@id="autoComplete_dropdown_AssignedTo"]/div[2]/div[1]/comp-pagination/ul/li[4]/a').click();
            await page.waitForTimeout(1000);
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000210').getByRole('textbox').click();
            await page.getByLabel('Options list').getByText('Title').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('Ticket for test full flow from system with attachments');
            await page.getByRole('button', { name: '' }).click();

            await expect(page.locator('#td_content_0_1')).toContainText('Ticket for test full flow from system with attachments');
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000210').getByRole('textbox').click();
            await page.getByText('TaskId').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('TSK0001072');
            await page.getByRole('button', { name: '' }).click();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();
            await expect(page.getByRole('heading', { name: 'Task Details' })).toBeVisible();
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();

        });

        test('ComplectedTask: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            test.slow();
            await page.locator('#MNU0000087').click();
            await page.getByRole('link', { name: ' Completed Task' }).click();
            await page.waitForTimeout(10000);
            await expect(page.getByText('My Completed Tasks')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            await page.getByText('Options').click();
            await page.locator('i:nth-child(2)').click();
            await page.locator('#dynamic_list_EFN0000212').getByRole('textbox').click();
            await page.getByRole('option', { name: 'TaskId' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('058');
            await page.getByRole('button', { name: '' }).click();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();
            await expect(page.getByRole('heading', { name: 'Task Details' })).toBeVisible();
            await expect(page.getByText('Task Id TSK0001058 Title Test')).toBeVisible();
            await expect(page.locator('a').filter({ hasText: 'Conversation' })).toBeVisible();
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000212').getByRole('textbox').click();
            await page.getByLabel('Options list').getByText('AssignedTo').click();
            await page.locator('comp-tilefilter label').click();
            await page.locator('#autoComplete_dropdown_tableAssignedTo').getByRole('textbox').first().click();
            await page.locator('#autoComplete_dropdown_tableAssignedTo').getByRole('textbox').first().fill('hyder');
            await page.locator('#autoComplete_dropdown_tableAssignedTo').getByRole('textbox').first().press('Enter');
            await expect(page.getByRole('cell', { name: 'a.hyder' }).locator('div')).toBeVisible();
            await page.getByRole('cell', { name: 'hyder', exact: true }).getByRole('textbox').click();
            await page.getByRole('cell', { name: 'hyder', exact: true }).getByRole('textbox').fill('');
            await page.locator('#autoComplete_dropdown_tableAssignedTo').getByRole('textbox').first().click();
            await page.locator('#autoComplete_dropdown_tableAssignedTo').getByRole('textbox').first().press('Enter');
            await page.waitForTimeout(1000);
            await page.locator('#autoComplete_dropdown_tableAssignedTo').getByRole('textbox').first().click();
            await page.getByRole('button', { name: ' Clear' }).click();
            await page.locator('#dynamic_list_EFN0000212').getByRole('textbox').click();
            await page.getByText('TaskId').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('TSK0001005');
            await page.getByRole('button', { name: '' }).click();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();
            await expect(page.getByRole('heading', { name: 'Task Details' })).toBeVisible();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.getByRole('button', { name: 'Close' }).click();
            await page.getByRole('button', { name: ' Clear' }).click();
        });
    });


    test.describe('Masters', () => {
        test('Team: should filter, select, and validate requests in Team menu', async ({ page }) => {

            await page.locator('#MNU0000031').click();
            await page.getByRole('link', { name: '﨡 Team' }).click();
            await page.locator('section').getByText('Create').click();
            await page.getByPlaceholder('Name').click();
            await page.getByPlaceholder('Name').fill('test name');
            await page.locator('#autoComplete_dropdown_TeamLead label').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]/a').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1').click();
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('hyder');
            await expect(page.getByText('a.hyder')).toBeVisible();
            await page.locator('tr').filter({ hasText: 'a.hyder Hyder Ali A hyder@' }).locator('i').click();
            await page.locator('#relation_autoComplete_dropdown_Department label').click();
            await page.locator('ul').filter({ hasText: 'of2' }).locator('a').nth(2).click();
            await expect(page.getByText('HR-ART')).toBeVisible();
            await page.locator('ul').filter({ hasText: 'of2' }).locator('a').nth(1).click();
            await page.locator('tr').filter({ hasText: 'IT DPT0000001 a.aldukhayil@' }).locator('i').click();
            await page.getByText('Close').click();
            await page.locator('i:nth-child(2)').click();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').fill('10');
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').press('Enter');
            await page.getByRole('cell', { name: 'TEM0000010' }).locator('a').click();
            await page.mouse.wheel(0, 6700);
            await page.waitForTimeout(2000);
            await page.getByText('Create').nth(3).click();
            await page.waitForTimeout(2000);
            await page.locator('#autoComplete_dropdown_UserId label').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await page.getByText('page 4').click();
            await page.getByText('page 5').click();
            await expect(page.getByText('a.almansour@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]/a').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1').click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
            await page.locator('tr').filter({ hasText: 'a.abdalhamed@mawarid.com.sa' }).locator('i').click();
            await page.getByText('Close').click();
            await page.getByText('Create').nth(4).click();
            await page.locator('#relation_autoComplete_dropdown_CategoryId label').click();
            await page.locator('#autoComplete_dropdown_CategoryId a').nth(3).click();
            await expect(page.locator('#autoComplete_dropdown_tableCategoryId').getByText('Payroll')).toBeVisible();
            await page.locator('#autoComplete_dropdown_CategoryId a').nth(3).click();
            await expect(page.getByText('Test')).toBeVisible();
            await page.locator('#autoComplete_dropdown_CategoryId a').nth(2).click();
            await expect(page.getByText('Maintenance')).toBeVisible();
            await page.locator('#autoComplete_dropdown_CategoryId a').nth(1).click();
            await expect(page.getByText('CRM')).toBeVisible();
            await page.getByText('CRM').click();
            await page.getByText('Close').click();
            await page.locator('td').filter({ hasText: 'TCY0000014' }).locator('a').click();
            await expect(page.getByText('TicketCategory Details')).toBeVisible();
            await page.locator('#page_left button').click();
            await page.locator('#DynamicDetails button').click();
            await page.getByText('⯆×%×').nth(2).hover();
            await page.locator('.table_filter_clear').click();
            await page.locator('tbody > tr:nth-child(2) > td:nth-child(8)').hover();
            await page.locator('.px-1 > .fas').first().click();
            await expect(page.locator('h4')).toBeVisible();
            await expect(page.getByText('Update')).toBeVisible();
            await page.getByText('Close').click();

        });

        test('Service Provider: should filter, select, and validate requests in Team menu', async ({ page }) => {
            await page.locator('#MNU0000031').click();
            await page.getByRole('link', { name: ' Service Provider' }).click();
            await page.locator('comp-pagination a').nth(2).click();
            await page.locator('comp-pagination a').nth(2).click();
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('4');
            await page.locator('comp-pagination a').nth(3).click();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('cell', { name: 'Hyder Ali A' }).locator('comp-datatype')).toBeVisible();
            await page.locator('section').getByText('Create').click();
            await page.locator('#autoComplete_dropdown_UserId label').click();
            await page.getByText('page 2').click();
            await page.getByText('page 3').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await expect(page.getByText('a.almaghrabi@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]/a').click();

            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1').click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('hyder');
            await page.locator('#autoComplete_dropdown_table_UserId').getByText('a.hyder').click();
            await page.getByText('Close').click();
        });

        test('Category: should filter, select, and validate requests in Team menu', async ({ page }) => {
            await page.locator('#MNU0000031').click();
            await page.getByRole('link', { name: ' Category' }).click();
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('row', { name: '  TCY0000013 Maintenance' })).toBeVisible();
            await page.locator('comp-pagination a').nth(3).click();
            await page.waitForTimeout(2000);
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('cell', { name: 'TCY0000001' }).locator('a')).toBeVisible();
            await page.locator('i:nth-child(2)').click();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').fill('TCY0000013');
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').press('Enter');
            await page.getByRole('cell', { name: 'TCY0000013', exact: true }).locator('a').click();
            await expect(page.getByText('Details')).toBeVisible();
            await expect(page.getByText('Category Id TCY0000013 Name Maintenance Description Maintenance Department Id')).toBeVisible();
            await page.locator('#page_left').getByText('Create').click();
            await expect(page.locator('#DynamicCreate').getByText('Create')).toBeVisible();
            await page.getByPlaceholder('Name').click();
            await page.getByPlaceholder('Name').fill('test');
            await page.getByPlaceholder('Description').click();
            await page.getByPlaceholder('Description').fill('test');
            await page.getByText('Close').click();
            await page.locator('#DynamicDetails button').click();
            await page.locator('td:nth-child(4) > .clearfix > .mb-1 > .ng-select-container').hover();
            await page.locator('.table_filter_clear').click();
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').fill('Maintenance');
            await page.getByRole('cell', { name: '% Maintenance ' }).getByRole('textbox').nth(1).press('Enter');
            await expect(page.getByRole('table').getByText('Maintenance').first()).toBeVisible();
            await expect(page.getByRole('cell', { name: 'TCY0000013' }).locator('a')).toBeVisible();
            await page.locator('td:nth-child(5) > .clearfix > .mb-1 > .ng-select-container').hover();
            await page.locator('.table_filter_clear').click();
        });

        test('Ticket Type: should filter, select, and validate requests in Team menu', async ({ page }, testInfo) => {
            // testInfo.annotations.push({ type: 'issue', description: 'https://github.com/FaazTechSolutions/Apps4x_new/issues/468' });
            await page.locator('#MNU0000031').click();
            await page.getByRole('link', { name: ' Ticket Type' }).click();
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByText('Recruitment Campaign Plan').first()).toBeVisible();
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByText('Issue').first()).toBeVisible();
            await page.locator('section').getByText('Create').click();
            await page.getByPlaceholder('Name').click();
            await page.getByPlaceholder('Name').fill('test name');
            await page.getByPlaceholder('Description').click();
            await page.getByPlaceholder('Description').fill('test des');
            await page.locator('#relation_autoComplete_dropdown_Department label').click();
            await expect(page.locator('td').filter({ hasText: 'DPT0000001' }).locator('comp-datatype')).toBeVisible();
            await page.locator('#autoComplete_dropdown_Department comp-pagination a').nth(2).click();
            await expect(page.getByText('Test')).toBeVisible();
            await page.locator('#autoComplete_dropdown_Department comp-pagination a').first().click();
            await page.locator('tr').filter({ hasText: 'IT DPT0000001 a.aldukhayil@' }).locator('i').click();
            await page.locator('#autoComplete_dropdown_RequestingDepartment label').click();
            await page.locator('input[type="search"]').nth(1).click();
            await page.locator('input[type="search"]').nth(1).fill('test');
            await page.locator('tr').filter({ hasText: 'DPT0000018 Test' }).locator('i').click();
            await page.locator('#autoComplete_dropdown_table_RequestingDepartment').getByText('OK').click();
            await page.getByText('Close').click();
            await page.getByRole('row', { name: 'Issue Issue IT   ' }).locator('a').click();
            await expect(page.getByText('Department Details')).toBeVisible();
            await page.locator('#DynamicDetails button').click();
        });
    });
});

