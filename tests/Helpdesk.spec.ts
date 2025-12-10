import { test, expect, Page } from '@playwright/test';


test.describe('Helpdesk', () => {

    test.beforeEach(async ({ page }) => {
        await test.step('go to the helpdesk app', async () => {
            await page.goto('https://portal.mawarid.com.sa/apps4x/', { timeout: 60000 });
            await expect(page.getByRole('link', { name: 'Helpdesk' })).toBeVisible({ timeout: 40000 });
            await page.getByRole('link', { name: 'Helpdesk' }).click();
        });
    });

    test('Create Request : should allow user to create a new helpdesk request and validate dashboard', async ({ page }) => {
        await test.step('Create a new request page', async () => {
            // --- Navigate to Create Request ---
            await page.getByRole('link', { name: '弄 Create Request' }).click();
            await expect(page.locator('#DynamicCreate div', { hasText: 'Create Request' }).nth(2)).toBeVisible();

            // --- Title dropdown and table validations ---
            await page.getByLabel('Title*').click();
            const titleInput = page.locator('.control-input > .form-control').first();
            await titleInput.click();

            const verifyColumns = ['Department Name', 'Name'];
            for (const col of verifyColumns) {
                await expect(page.getByText(col, { exact: true })).toBeVisible({ timeout: 30000 });
            }

            // --- Check category items on first page ---
            const categories1 = ['CRM', 'ERP', 'Portal', 'General'];
            for (const cat of categories1) {
                await expect(page.locator('td', { hasText: cat }).locator('comp-datatype')).toBeVisible();
            }

            // --- Go to page 2, check Maintenance & Projects ---
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByText('Maintenance', { exact: true }).first()).toBeVisible();
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
            // await categoryInput.nth(2).fill('02');
            // await expect(page.locator('td', { hasText: 'TCY0000002' }).locator('comp-datatype')).toBeVisible();
            // await categoryInput.nth(2).fill('');
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
            await expect(page.locator('th').filter({ hasText: 'User Id' })).toBeVisible({ timeout: 20000 });
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
            await expect(page.locator('#DynamicCreate').getByText('Hyder Ali A')).toBeVisible();
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
    });
    test('Dashboard & Dep Dashboard: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
        await test.step('Check the dashboard menu', async () => {
            const dashboardLink = page.getByRole('link', { name: ' Dashboard' });

            // Open Dashboard
            await expect(dashboardLink).toBeVisible({  timeout: 30000 });
            await dashboardLink.click();

            // Check dashboard components
            // await expect(page.locator('canvas').nth(1)).toBeVisible();
            await expect(page.getByRole('heading', { name: 'My Team Ticket' })).toBeVisible({ timeout: 30000 });
            await expect(page.getByRole('heading', { name: 'Request By Category' })).toBeVisible();
            await expect(page.getByRole('heading', { name: 'Request By Technician' })).toBeVisible();

            // Open More Options
            await page.getByRole('button', { name: 'More Options' }).click();

            // Open Dashboard for Department
            await page.getByRole('link', { name: ' Department Dashboard' }).click();
            await expect(page.locator('#page_left').getByText('My Department Requests')).toBeVisible();
            await expect(page.locator('canvas').nth(1)).toBeVisible({ timeout: 20000 });
            await expect(page.locator('canvas').nth(3)).toBeVisible();
            // Requests by Category table
            await expect(page.getByText('Requests by Category')).toBeVisible({ timeout: 20000 });
            await page.locator('div:nth-child(3) > .content_add > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > .position-relative > div > .card-header > .Right > .d-flex > i').first().click();
            await page.locator('.table_filter_text').first().click();
            await page.locator('.table_filter_text').first().fill('por');
            await expect(page.getByText('Portal')).toBeVisible();
            await page.getByRole('cell', { name: ' Category Name  ' }).hover();
            await page.getByRole('cell', { name: 'por', exact: true }).hover();
            await page.getByRole('cell', { name: 'por ' }).getByRole('textbox').hover();
            await page.getByRole('cell', { name: 'por ' }).locator('span').click({ timeout: 10000 });
            await expect(page.locator('.table_filter_text').first()).toBeEmpty();
            // Requests by Technician table
            await expect(page.getByText('Requests by Technician')).toBeVisible();
            await page.locator('div:nth-child(4) > .content_add > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > .position-relative > div > .card-header > .Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000482 > widget-grid > .card > div:nth-child(2) > comp-table > .table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('#dynamic_list_EFN0000482 > widget-grid > .card > div:nth-child(2) > comp-table > .table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').fill('ahmed');
            await expect(page.locator('#dynamic_list_EFN0000482').getByRole('table').getByText('Ahmed Fawzy').first()).toBeVisible();
            await page.getByRole('cell', { name: ' Technician Name  ' }).hover();
            await page.getByRole('cell', { name: 'ahmed', exact: true }).hover();
            await page.getByRole('cell', { name: 'ahmed ' }).getByRole('textbox').hover();
            await page.getByRole('cell', { name: 'ahmed ' }).locator('i').click();
            await expect(page.locator('#dynamic_list_EFN0000482 > widget-grid > .card > div:nth-child(2) > comp-table > .table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();
            await page.locator('#canvasjs-angular-chart-container-1').getByRole('button', { name: 'More Options' }).click({ timeout: 20000 });
            await page.locator('#canvasjs-angular-chart-container-1').getByRole('button', { name: 'More Options' }).click();
            await page.locator('#canvasjs-angular-chart-container-2').getByRole('button', { name: 'More Options' }).click();
        });
    });

    test.describe('Requests', () => {
        test('My Requests: should filter, select, and validate requests in My Requests menu', async ({ page }) => {
            await test.step('check the my request menu', async () => {
                // Navigate to Requests
                await expect(page.locator('#MNU0000040')).toBeVisible({ timeout: 30000 });
                await page.locator('#MNU0000040').click();
                await expect(page.getByRole('link', { name: ' My Requests' })).toBeVisible();
                await page.getByRole('link', { name: ' My Requests' }).click();

                const createButton = page.getByRole('button', { name: ' Create' });
                await createButton.waitFor({ state: 'visible', timeout: 30000 });
                await expect(createButton).toBeVisible();
                await createButton.click();

                await expect(page.getByLabel('Title*')).toBeVisible({ timeout: 20000 });
                await expect(page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first()).toBeVisible();
                await page.waitForTimeout(2000);
                await page.locator('#relation_autoComplete_dropdown_TicketCategory > .control-input > .form-control').first().click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('portal');
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('portal');
                await expect(page.locator('#autoComplete_dropdown_tableTicketCategory td').filter({ hasText: 'portal' })).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('');
                await page.locator('#autoComplete_dropdown_TicketCategory comp-pagination a').nth(2).click();
                await expect(page.getByText('Maintenance', { exact: true }).first()).toBeVisible();
                await expect(page.locator('td').filter({ hasText: 'Projects Department' }).locator('comp-datatype')).toBeVisible();
                await page.locator('#autoComplete_dropdown_TicketCategory comp-pagination a').nth(2).click();
                await expect(page.locator('tr').filter({ hasText: 'Test Test' }).locator('td').first()).toBeVisible();
                await page.locator('#autoComplete_dropdown_TicketCategory comp-pagination a').nth(1).click();
                await page.locator('#autoComplete_dropdown_TicketCategory comp-pagination a').nth(1).click();
                await expect(page.locator('td').filter({ hasText: 'General' }).locator('comp-datatype')).toBeVisible();
                await page.locator('#autoComplete_dropdown_TicketCategory comp-pagination a').nth(2).click();
                await page.locator('#autoComplete_dropdown_TicketCategory comp-pagination a').nth(2).click();
                await expect(page.locator('tr').filter({ hasText: 'Test Test' }).locator('td').first()).toBeVisible();
                await page.locator('#autoComplete_dropdown_TicketCategory comp-pagination a').first().click();
                await expect(page.locator('#autoComplete_dropdown_tableTicketCategory tbody').getByText('Portal')).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableTicketCategory tbody').getByText('Portal').click();
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
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]/a').click();
                await page.getByText('page 1', { exact: true }).click();
                await page.locator('td').filter({ hasText: 'a.abdalhamed@mawarid.com.sa' }).first().click();
                await page.locator('.angular-editor-textarea').first().click({ timeout: 20000 });
                await expect(page.getByText('Submit')).toBeVisible();
                await expect(page.getByText('Close', { exact: true })).toBeVisible();
                await page.locator('.modal-header > div > .btn').click();
                await expect(page.locator('.Right > .d-flex > i').first()).toBeVisible();
                await page.locator('.Right > .d-flex > i').first().click({ timeout: 40000 });
                await page.locator('//*[@id="autoComplete_dropdown_Status"]/div[1]/label').click();
                await page.getByRole('row', { name: ' New', exact: true }).locator('div').click({ timeout: 10000 });
                await page.getByRole('button', { name: 'OK' }).click();
                await expect(page.locator('.grid-field-tag > comp-datatype').first()).toBeVisible();
                await expect(page.getByRole('table')).toContainText('New');

                // Hover and clear the filters New Status
                await page.getByRole('cell', { name: '⯆ New' }).hover(); await page.getByRole('cell', { name: '⯆ New' }).click();
                await page.getByRole('cell', { name: '⯆ New ' }).locator('label').hover();
                await page.locator('label').filter({ hasText: 'New' }).locator('i').click();

                // Filter by Ticket Id
                await page.locator('.text-left > .clearfix > .table_filter_text').first().click();
                await page.locator('.text-left > .clearfix > .table_filter_text').first().fill('TRQ0016310');
                await page.locator('.text-left > .clearfix > .table_filter_text').first().press('Enter');
                await expect(page.getByText('TRQ0016310')).toBeVisible();
                await page.getByRole('cell', { name: 'Test ticket 3 for Automation test' }).locator('a').click();

                // Goto details page
                await expect(page.getByText('Details')).toBeVisible();
                await page
                    .locator('#custom_template_dynamic_list_EFN0000114 div')
                    .filter({ hasText: 'Test ticket 3 for Automation test' })
                    .nth(1)
                    .waitFor({ state: 'visible' });

                // Validate Details page Actions
                await expect(page.locator('#custom_template_dynamic_list_EFN0000114 div').filter({ hasText: 'Test ticket 3 for Automation test' }).nth(1)).toBeVisible({ timeout: 10000 });
                const ticketLocator = page
                    .locator('div')
                    .filter({ hasText: /^Test ticket 3 for Automation test$/ })
                    .nth(3);
                await ticketLocator.waitFor({ state: 'visible', timeout: 30000 });
                await expect(ticketLocator).toBeVisible();
                await expect(page.getByText('Note - Don\'t take any actions').nth(1)).toBeVisible();

                // Assign action validations
                await page.getByText('Assign', { exact: true }).nth(1).click();
                await page.waitForTimeout(4000);
                await page.locator('#Actionform_EFN0000177').getByText('Portal').click();
                await expect(page.locator('#autoComplete_dropdown_tableTicketCategory td').filter({ hasText: 'portal' })).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('portal');
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('portal');
                await expect(page.locator('#autoComplete_dropdown_tableTicketCategory td').filter({ hasText: 'portal' })).toBeVisible();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory input[type="text"]').nth(1).fill('');
                await page.locator('#autoComplete_dropdown_TicketCategory comp-pagination a').nth(2).click();
                await expect(page.getByText('Maintenance', { exact: true }).first()).toBeVisible();
                await expect(page.locator('td').filter({ hasText: 'Projects Department' }).locator('comp-datatype')).toBeVisible();
                await page.locator('#autoComplete_dropdown_TicketCategory comp-pagination a').nth(2).click();
                await expect(page.locator('tr').filter({ hasText: 'Test Test' }).locator('td').first()).toBeVisible();
                await page.locator('#autoComplete_dropdown_TicketCategory comp-pagination a').nth(1).click({ timeout: 10000 });
                await page.locator('#autoComplete_dropdown_TicketCategory comp-pagination a').nth(1).click({ timeout: 10000 });
                await expect(page.locator('td').filter({ hasText: 'General' }).locator('comp-datatype')).toBeVisible();
                await page.locator('#autoComplete_dropdown_TicketCategory comp-pagination a').nth(2).click();
                await page.locator('#autoComplete_dropdown_TicketCategory comp-pagination a').nth(2).click();
                await expect(page.locator('tr').filter({ hasText: 'Test Test' }).locator('td').first()).toBeVisible({ timeout: 30000 });
                await page.locator('#autoComplete_dropdown_TicketCategory comp-pagination a').first().click();
                await expect(page.locator('#autoComplete_dropdown_tableTicketCategory tbody').getByText('Portal')).toBeVisible({ timeout: 10000 });
                await page.locator('#autoComplete_dropdown_tableTicketCategory tbody').getByText('Portal').click();
                await page.locator('#autoComplete_dropdown_tableTicketCategory tbody').getByText('Portal').click();

                // Assign to Dropdown
                await page.locator('#relation_autoComplete_dropdown_AssignedTo label').nth(1).click();
                await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
                await expect(page.locator('#relation_autoComplete_dropdown_AssignedTo input[name="currentPage"]')).toHaveValue('1');

                // Wait for text like "of73" anywhere on the page
                await page.locator('text=/of\\d+/i').nth(2).waitFor({ state: 'visible', timeout: 10000 });
                // Now click the second pagination link
                await page.locator('#relation_autoComplete_dropdown_AssignedTo ul a').nth(2).click();

                await expect(page.locator('#relation_autoComplete_dropdown_AssignedTo input[name="currentPage"]')).toHaveValue('2');
                await expect(page.locator('comp-field-view-type').filter({ hasText: 'a.alamrani@mawarid.com.sa' }).first()).toBeVisible();

                // Wait for text like "of73" anywhere on the page
                await page.locator('text=/of\\d+/i').nth(2).waitFor({ state: 'visible', timeout: 10000 });
                // Now click the second pagination link
                await page.locator('#relation_autoComplete_dropdown_AssignedTo ul a').nth(2).click();

                await expect(page.locator('#relation_autoComplete_dropdown_AssignedTo input[name="currentPage"]')).toHaveValue('3');
                await expect(page.getByText('a.aldukhayil@mawarid.com.sa').first()).toBeVisible()
                await page.locator('text=/of\\d+/i').first().waitFor({ state: 'visible', timeout: 10000 });

                // Now click the second pagination link
                await page.locator('#relation_autoComplete_dropdown_AssignedTo ul a').first().click();
                await expect(page.locator('#relation_autoComplete_dropdown_AssignedTo input[name="currentPage"]')).toHaveValue('1');
                await expect(page.getByText('a.abdelhafiz@mawarid.com.sa').first()).toBeVisible({ timeout: 30000 });
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().fill('krishna');
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').first().press('Enter');
                await page.locator('span').filter({ hasText: 'm.krishna' }).first().click();
                await page.locator('label').filter({ hasText: 'Krishna' }).hover();
                await page.locator('label').filter({ hasText: 'Krishna' }).locator('i').click();
                await page.locator('#Actionform_EFN0000177').getByText('Close').click();

                // // Accept action validations
                await page.getByText('Accept').nth(1).click();
                await expect(page.locator('#Actionform_EFN0000178').getByText('Accept')).toBeVisible({ timeout: 20000 });
                await page.locator('#relation_autoComplete_dropdown_TicketTypeddl label').click();
                await page.locator('table').filter({ hasText: 'Name Issue Bug Customer' }).locator('input[type="text"]').click();
                await page.locator('table').filter({ hasText: 'Name Issue Bug Customer' }).locator('input[type="text"]').fill('bug');
                await page.locator('span').filter({ hasText: 'Bug' }).click();
                await page.locator('#Durationperiod').click();
                await page.locator('#Durationperiod').fill('1');
                await page.locator('ng-select').filter({ hasText: 'Duration Type' }).locator('input[type="text"]').click();
                await page.locator('div').filter({ hasText: /^Hours$/ }).click();
                await page.locator('#Actionform_EFN0000178').getByText('Close').click();

                // Cancel action validations
                await page.getByText('Cancel').nth(2).click();
                await expect(page.locator('#Actionform_EFN0000179').getByText('Cancel')).toBeVisible({ timeout: 20000 });
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('cancel');
                await page.locator('#Actionform_EFN0000179').getByText('Close').click();

                // // Close action validations
                await page.getByText('Close', { exact: true }).nth(2).click();
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('  close');
                await expect(page.locator('h4').filter({ hasText: 'Close' })).toBeVisible();
                await page.locator('#Actionform_EFN0000182 button').filter({ hasText: 'Close' }).click();

                // Attach action validations
                await page.getByText('Attach').nth(1).click();
                await expect(page.getByText('HDRequestAttachment')).toBeVisible();
                await page.getByLabel('Close').getByText('x').click();

                // // Approvals action validations
                await page.getByText('Approval', { exact: true }).click();
                await page.locator('#autoComplete_dropdown_Approvers label').nth(1).click();

                // Approvers Dropdown validations
                await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible({ timeout: 20000 });
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('page 2').click();
                await expect(page.getByText('a.alanazi@mawarid.com.sa').first()).toBeVisible();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Next page').click();
                await expect(page.getByText('a.aldursuni@mawarid.com.sa').first()).toBeVisible();       
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('page 2').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('page 1', { exact: true }).click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().click();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().fill('hyder');
                await page.locator('tr').filter({ hasText: 'a.hyder Hyder Ali A hyder@' }).locator('i').click();
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('test comment');
                await page.locator('#pills-tabContent').getByText('Close').click();

                // Task Action validations
                await page.locator('dynamic-details').getByText('Task', { exact: true }).click();
                await expect(page.getByText('IT', { exact: true })).toBeVisible({ timeout: 20000 });
                await expect(page.getByPlaceholder('Title')).toBeVisible();
                await expect(page.locator('#angular_editor_ETN0000029_Description').getByText('Note - Don\'t take any actions')).toBeVisible();
                await page.getByText('IT', { exact: true }).click();
                await page.locator('ul').filter({ hasText: 'of2' }).locator('a').nth(2).click();
                await page.locator('ul').filter({ hasText: 'of2' }).locator('a').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableDepartment input[type="text"]').first().click();
                await page.locator('#autoComplete_dropdown_tableDepartment input[type="text"]').first().fill('IT');
                await page.locator('#autoComplete_dropdown_tableDepartment input[type="text"]').first().press('Enter');
                await page.locator('tr').filter({ hasText: 'IT DPT0000001 s.alissa@' }).locator('span').first().click();
                await page.locator('tr').filter({ hasText: 'IT DPT0000001 s.alissa@' }).locator('i').click();
                await page.locator('#relation_autoComplete_dropdown_DepartmentMember div').filter({ hasText: 'Assinged To *' }).locator('label').nth(1).click({ timeout: 30000 });
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().click();
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().fill('ajeesh');
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().press('Enter');
                await page.getByText('ajeesh@faaztechsolutions.com').click({ timeout: 20000 });
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('test');
                await page.locator('#pills-tabContent').getByText('Close').click();
                await page.locator('#cdk-drop-list-9 a').filter({ hasText: 'Approvals' }).click();
                await page.locator('#cdk-drop-list-9 li').filter({ hasText: 'Task' }).locator('a').click();
                await page.locator('li').filter({ hasText: 'History' }).locator('a').click();
                await page.locator('a').filter({ hasText: 'Assignment' }).click();
                await page.locator('a').filter({ hasText: 'Conversation' }).click();
                await page.locator('button').filter({ hasText: 'Close' }).click();
                await page.getByRole('cell', { name: '⯆ TRQ0016310' }).hover();
                await page.getByRole('cell', { name: '⯆ TRQ0016310' }).getByRole('textbox').nth(1).hover();
                await page.getByRole('cell', { name: '⯆ TRQ0016310' }).locator('i').click();
                await expect(page.locator('.text-left > .clearfix > .table_filter_text').first()).toBeEmpty();
            });
        });

        test('Assigned To Me: should filter, select, and validate requests assigned to the user', async ({ page }) => {
            await test.step('check the AssignedToMe menu', async () => {
                await page.locator('#MNU0000040').click();
                await expect(page.getByRole('link', { name: ' Assigned to me' })).toBeVisible();
                await page.getByRole('link', { name: ' Assigned to me' }).click();
                await expect(page.getByText('Request Assigned to me')).toBeVisible({ timeout: 20000 });
                await page.locator('.Right > .d-flex > i').first().click();
                await page.locator('#autoComplete_dropdown_Status label').click();
                await page.getByRole('row', { name: ' New', exact: true }).locator('div').click();
                await page.getByText('ReOpen').first().click();
                await page.getByRole('button', { name: 'OK' }).click();
                await expect(page.getByRole('table').locator('span').filter({ hasText: 'New' }).first()).toBeVisible();
                await page.getByText('New,ReOpen').hover();
                await page.locator('label').filter({ hasText: 'New,ReOpen' }).locator('i').click();
                await page.locator('comp-pagination a').nth(2).click();
                await page.locator('comp-pagination a').nth(2).click();
                await page.locator('comp-pagination a').nth(2).click();
                await page.locator('comp-pagination a').nth(2).click();
                await expect(page.locator('input[name="currentPage"]')).toHaveValue('5');
                await page.locator('comp-pagination a').nth(1).click();
                await expect(page.locator('comp-pagination a').nth(1)).toBeVisible();
                await page.locator('comp-pagination a').nth(1).click();
                await page.locator('comp-pagination a').first().click();
                await page.locator('.text-left > .clearfix > .table_filter_text').first().click();
                await page.locator('.text-left > .clearfix > .table_filter_text').first().fill('Test ticket 3 for Automation test');
                await page.waitForTimeout(100);
                await page.locator('.text-left > .clearfix > .table_filter_text').first().press('Enter');
                await expect(page.getByRole('cell', { name: 'Test ticket 3 for Automation test', exact: true }).locator('a')).toBeVisible();
                await page.getByRole('cell', { name: 'Test ticket 3 for Automation test', exact: true }).locator('a').click();
                await expect(page.locator('#custom_template_dynamic_list_EFN0000114').getByText('Test ticket 3 for Automation test')).toBeVisible({ timeout: 20000 });
                await expect(page.getByText('Assign Accept Cancel Close Attach Assign Accept Cancel Close Attach Title Test')).toBeVisible({ timeout: 20000});
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
                await expect(page.locator('#autoComplete_dropdown_table_Approvers').getByText('Hyder Ali A')).toBeVisible();
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
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]/a').nth(1).click();
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[8]/a').nth(1).click();
                await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[7]/a').nth(1).click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Previous page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Previous page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Previous page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('Previous page').click();
                await page.locator('#autoComplete_dropdown_table_Approvers').getByText('page 1', { exact: true }).click();
                await expect(page.locator('td').filter({ hasText: 'a.abdalhamed@mawarid.com.sa' }).first()).toBeVisible();
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().click({ timeout: 20000 });
                await page.locator('#autoComplete_dropdown_table_Approvers input[type="search"]').first().fill('a.adm');
                await page.locator('td').filter({ hasText: 'a.admin' }).first().click();
                await page.locator('#pills-tabContent').getByText('Close').click({ timeout: 20000 });
                await page.locator('dynamic-details').getByText('Task', { exact: true }).click();
                await expect(page.getByPlaceholder('Title')).toBeVisible();
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
                await page.locator('#autoComplete_dropdown_tableDepartmentMember tbody').getByText('Hyder Ali').click();
                await page.getByPlaceholder('Comments').click();
                await page.locator('#pills-tabContent').getByText('Close').click();
                await page.getByText('Notes').click();
                await expect(page.locator('label').filter({ hasText: 'Notes' })).toBeVisible();
                await page.locator('#pills-tabContent').getByText('Close').click();
                await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
                await page.locator('#cdk-drop-list-2 li').filter({ hasText: 'Task' }).locator('a').click();
                await page.locator('li').filter({ hasText: 'History' }).locator('a').click();
                await expect(page.getByText('Status History')).toBeVisible();
                await page.locator('a').filter({ hasText: 'Assignment' }).click();
                await expect(page.locator('#dynamic_list_EFN0000108').getByText('TRQ0016310', { exact: true })).toBeVisible();
                await expect(page.locator('#dynamic_list_EFN0000108 comp-table tbody').getByText('Test ticket 3 for Automation')).toBeVisible();
                await page.locator('button').filter({ hasText: 'Close' }).click();
                await page.getByRole('cell', { name: 'pin Title  ' }).hover();
                await page.getByRole('cell', { name: '⯆ Test ticket 3 for' }).hover();
                await page.getByRole('cell', { name: '⯆ Test ticket 3 for' }).getByRole('textbox').nth(1).hover();
                await page.getByRole('cell', { name: '⯆ Test ticket 3 for' }).locator('i').click();
            });
        });

        test('Unassigned Requests: should filter, assign, and validate unassigned requests', async ({ page }) => {
            // Navigate to Unassigned Requests menu
            await page.locator('#MNU0000040').click();
            // Validate Unassigned Requests submenu
            await page.getByRole('link', { name: ' Unassigned Requests' }).click();
            await expect(page.getByText('Un Assigned Requests')).toBeVisible({ timeout: 20000 });
            // Options Export validation
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExport')).toBeVisible({ timeout: 10000 });
            await page.getByText('Options').click();
            // Filter and select a request
            await page.locator('.Right > .d-flex > i').first().click();
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
            // Goto details page
            await page.getByRole('cell', { name: 'Test 2 Play wright automation' }).locator('a').click();

            // Pickup action validations
            await page.getByText('Pickup').nth(1).click();
            await expect(page.locator('#Actionform_EFN0000176').getByText('Pickup')).toBeVisible({ timeout: 20000 });
            await page.locator('#Actionform_EFN0000176').getByText('Close').click();

            // Assign action validations
            await page.getByText('Assign', { exact: true }).nth(1).click();
            await expect(page.locator('#Actionform_EFN0000177').getByText('Assign', { exact: true })).toBeVisible();
            await page.locator('#Actionform_EFN0000177').getByText('Close').click();

            // Accept action validations
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
            await page.locator('#Actionform_EFN0000178').getByText('Close').click();

            // Cancel action validations
            await page.getByText('Cancel').nth(2).click();
            await expect(page.locator('#Actionform_EFN0000179').getByText('Cancel')).toBeVisible();
            await page.locator('#Actionform_EFN0000179').getByText('Close').click();

            // Close action validations
            await page.getByText('Close').nth(4).click();
            await expect(page.locator('h4').filter({ hasText: 'Close' })).toBeVisible();
            await page.locator('#Actionform_EFN0000182 button').filter({ hasText: 'Close' }).click();

            // Approvals action validations
            await page.getByText('Approval', { exact: true }).click();
            await page.locator('#pills-tabContent label').nth(2).click();
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('a.hy');
            await page.locator('tr').filter({ hasText: 'a.hyder Hyder Ali A hyder@' }).locator('i').click();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test comments');
            await page.locator('#pills-tabContent').getByText('Close').click();

            // Task Action validations
            await page.locator('dynamic-details').getByText('Task', { exact: true }).click();
            await page.locator('#relation_autoComplete_dropdown_DepartmentMember label').nth(1).click();
            await page.locator('#autoComplete_dropdown_tableDepartmentMember > comp-table > .table > thead > tr:nth-child(2) > td:nth-child(2)').hover();
            await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().waitFor({ state: 'visible' });
            await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().fill('m.viswa');
            await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().press('Enter');
            await page.locator('td').filter({ hasText: 'm.viswa@mawarid.com.sa' }).click();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test comments');
            await page.locator('#pills-tabContent').getByText('Close').click();

            // Approvals Action validations
            await page.getByText('Approval', { exact: true }).click();
            await page.locator('#pills-tabContent label').nth(2).click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible({ timeout: 20000 });
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
            await page.getByText('page 1', { exact: true }).click();
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('a.alharbi01@mawarid.com.sa');
            await page.locator('tr').filter({ hasText: 'a.alharbi01@mawarid.com.sa' }).locator('i').click();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test');
            await page.locator('#pills-tabContent').getByText('Close').click();

            // Notes Action validations
            await page.getByText('Notes').click();
            await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('div').filter({ hasText: /^test$/ }).fill('test notes');
            await page.locator('#pills-tabContent').getByText('Close').click();

            // Approvals Tab validations
            await page.locator('#cdk-drop-list-3 a').filter({ hasText: 'Approvals' }).click();
            await expect(page.locator('table').filter({ hasText: 'Approver Id Approver Status' })).toBeVisible();

            // Task Tab validations
            await page.locator('#cdk-drop-list-3 li').filter({ hasText: 'Task' }).locator('a').click();
            await expect(page.locator('table').filter({ hasText: 'Task Id Title Status Assigned' })).toBeVisible();

            // History Tab validations
            await page.locator('li').filter({ hasText: 'History' }).locator('a').click();
            await expect(page.getByText('Request Id Status System Comments User Comments Action By Action Date No Data')).toBeVisible();

            // Assignment Tab validations
            await page.locator('a').filter({ hasText: 'Assignment' }).click();
            await expect(page.locator('#dynamic_list_EFN0000108').getByText('TRQ0011625', { exact: true })).toBeVisible();

            // Conversation Tab validations
            await page.locator('a').filter({ hasText: 'Conversation' }).click();
            await expect(page.locator('app-button > .btn').first()).toBeVisible();

            // close the details page
            await page.locator('app-button > .btn').first().click();

            // Clear the filters
            await page.locator('label').filter({ hasText: 'Portal' }).hover();
            await page.locator('label').filter({ hasText: 'Portal' }).locator('i').click();
            await page.locator('.mb-1 > .ng-select-container').first().hover();
            await page.locator('.table_filter_clear').click();
        });

        test('My Open Requests: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            await test.step('myOpenRequest menu test', async () => {
                await page.locator('#MNU0000040').click();
                await page.getByRole('link', { name: ' My Open Requests' }).click();
                await page
                    .getByText('My Open Request', { exact: true })
                    .waitFor({ state: 'visible' });
                await page.locator('.Right > .d-flex > i').first().click();
                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('Test ticket 3 for Automation test');
                await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
                await expect(page.getByRole('cell', { name: 'Test ticket 3 for Automation test', exact: true }).locator('a')).toBeVisible();
                await expect(page.getByText('TRQ0016310')).toBeVisible();
                await page.getByRole('cell', { name: 'Test ticket 3 for Automation test', exact: true }).locator('a').click();

                // Assign Action validations
                await page.getByText('Assign', { exact: true }).nth(1).click();
                await expect(page.locator('label').filter({ hasText: 'Portal' })).toBeVisible({ timeout: 20000 });
                await expect(page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Hyder Ali')).toBeVisible();
                await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Hyder Ali').click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(1).click();
                await page.waitForTimeout(100);
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(1).fill('kri');
                await page.waitForTimeout(100);
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(1).press('Enter');
                await expect(page.locator('tr').filter({ hasText: 'm.krishna Krishna m.krishna@' }).locator('comp-field-view-type').nth(1)).toBeVisible({ timeout: 30000 });
                await page.locator('#Actionform_EFN0000177 button').first().click();

                // Accept Action validations
                await page.getByText('Accept').nth(1).click();
                await page.locator('#relation_autoComplete_dropdown_TicketTypeddl label').click();
                await page.locator('tr').filter({ hasText: 'Customer Request' }).locator('i').click();
                await page.getByPlaceholder('Scheduled Date').fill('2025-06-11');
                await page.locator('#Durationperiod').click({ timeout: 10000 });
                await page.locator('#Durationperiod').fill('2');
                await page.locator('div').filter({ hasText: /^Duration Type$/ }).nth(1).click();
                await page.locator('div').filter({ hasText: /^Hours$/ }).click();
                await page.locator('#Actionform_EFN0000178').getByText('Close').click();

                // Cancel Action validations
                await page.getByText('Cancel').nth(2).click();
                await expect(page.locator('#Actionform_EFN0000179').getByText('Cancel')).toBeVisible();
                await page.locator('#Actionform_EFN0000179').getByText('Close').click();

                // Close Action validations
                await page.getByText('Close').nth(3).click();
                await expect(page.locator('h4').filter({ hasText: 'Close' })).toBeVisible();
                await page.locator('#Actionform_EFN0000182 button').filter({ hasText: 'Close' }).click();

                // Attach Action validations
                await page.getByText('Attach').nth(1).click();
                await expect(page.getByText('HDRequestAttachment')).toBeVisible();
                await page.getByLabel('Close').getByText('x').click();

                // Approvals Sub Action validations
                await page.getByText('Approval', { exact: true }).click();
                await page.locator('#autoComplete_dropdown_Approvers label').nth(1).click();
                await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible({ timeout: 20000});
                await page.getByText('Next page').click();
                await expect(page.getByText('a.alangari@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 3').click();
                await expect(page.getByText('a.aldursuni@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 1', { exact: true }).click();
                await expect(page.getByText('a.abdulaziz@mawarid.com.sa').first()).toBeVisible();
                await page.locator('input[type="search"]').first().click();
                await page.locator('input[type="search"]').first().fill('hyder');
                await page.locator('tr').filter({ hasText: 'a.hyder Hyder Ali A hyder@' }).locator('i').click();
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('test');
                await page.locator('#pills-tabContent').getByText('Close').click();
                await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
                await page.locator('#cdk-drop-list-2 li').filter({ hasText: 'Task' }).locator('a').click();
                await page.locator('li').filter({ hasText: 'History' }).locator('a').click();
                await page.locator('a').filter({ hasText: 'Assignment' }).click();
                await expect(page.locator('#dynamic_list_EFN0000108 comp-table tbody').getByText('Test ticket 3 for Automation')).toBeVisible();
                await expect(page.locator('#dynamic_list_EFN0000108 comp-table tbody').getByText('a.hyder', { exact: true })).toBeVisible();
                await page.locator('a').filter({ hasText: 'Conversation' }).click();
                await expect(page.getByText('Hyder Ali A Assigned To Hyder')).toBeVisible();

                // Task Sub Action validations
                await page.locator('dynamic-details').getByText('Task', { exact: true }).click();
                await expect(page.getByText('IT', { exact: true })).toBeVisible({ timeout: 20000 });
                await page.locator('#relation_autoComplete_dropdown_DepartmentMember label').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().click();
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().fill('viswa');
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().press('Enter');
                await page.getByText('m.viswa@mawarid.com.sa').click();
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('test');
                await page.locator('#pills-tabContent').getByText('Close').click();

                // Notes Sub Action validations
                await page.getByText('Notes').click();
                await page.locator('#angular_editor_ETN0000029_Notes').getByText('Type here...').click();
                await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('t');
                await page.locator('div').filter({ hasText: /^t$/ }).fill('test notes');
                await page.locator('#pills-tabContent').getByText('Close').click();

                // Close the details page
                await page.locator('button').filter({ hasText: 'Close' }).click();

                // Clear filter title
                await page.getByRole('cell', { name: '⯆ Test ticket 3 for' }).getByRole('textbox').nth(1).hover();
                await page.getByRole('cell', { name: '⯆ Test ticket 3 for' }).locator('i').click();
                await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();
            });
        });

        test('All Requests: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            await test.step('All Requests menu test', async () => {
                // Menu Navigation
                await page.locator('#MNU0000040').click();
                await expect(page.getByRole('link', { name: ' All Requests' })).toBeVisible();
                // Submenu Navigation
                await page.getByRole('link', { name: ' All Requests' }).click();
                await page.locator('.Right > .d-flex > i').first().click();
                await page.locator('.table_filter_text').first().click();
                await page.locator('.table_filter_text').first().fill('TRQ0016310');
                await page.locator('.table_filter_text').first().press('Enter');
                await expect(page.getByText('TRQ0016310')).toBeVisible();
                await page.getByRole('cell', { name: 'Test ticket 3 for Automation test', exact: true }).locator('a').click();

                // Assign Action validations
                await page.getByText('Assign', { exact: true }).nth(1).click();
                await page.waitForTimeout(3000);
                await expect(page.locator('label').filter({ hasText: 'Portal' })).toBeVisible();
                await expect(page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Hyder Ali A')).toBeVisible({ timeout: 20000 });
                await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Hyder Ali A').click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(1).click();
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(1).fill('kri');
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(1).press('Enter');
                await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(1).press('Enter');
                await expect(page.locator('tr').filter({ hasText: 'm.krishna Krishna m.krishna@' }).locator('comp-field-view-type').nth(1)).toBeVisible({ timeout: 20000});
                await page.locator('#Actionform_EFN0000177 button').first().click();

                // Accept Action validations
                await page.getByText('Accept').nth(1).click();
                await page.locator('#relation_autoComplete_dropdown_TicketTypeddl label').click();
                await page.locator('tr').filter({ hasText: 'Customer Request' }).locator('i').click();
                await page.getByPlaceholder('Scheduled Date').fill('2025-06-11');

                await page.locator('#Durationperiod').click();
                await page.locator('#Durationperiod').fill('2');
                await page.locator('div').filter({ hasText: /^Duration Type$/ }).nth(1).click();
                await page.locator('div').filter({ hasText: /^Hours$/ }).click();
                await page.locator('#Actionform_EFN0000178').getByText('Close').click();

                // Cancel Action validations
                await page.getByText('Cancel').nth(1).click();
                await expect(page.locator('#Actionform_EFN0000179').getByText('Cancel')).toBeVisible();
                await page.locator('#Actionform_EFN0000179').getByText('Close').click();
                await page.getByText('Close').nth(3).click();

                // Close Action validations
                await expect(page.locator('h4').filter({ hasText: 'Close' })).toBeVisible();
                await page.locator('#Actionform_EFN0000182 button').filter({ hasText: 'Close' }).click();

                // Attach Action validations
                await page.getByText('Attach').nth(1).click();
                await expect(page.getByText('HDRequestAttachment')).toBeVisible();
                await page.getByLabel('Close').getByText('x').click();

                // Approvals Sub Action validations
                await page.getByText('Approval', { exact: true }).click();
                await page.locator('#autoComplete_dropdown_Approvers label').nth(1).click();
                await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible({ timeout: 20000});
                await page.getByText('Next page').click();
                await expect(page.getByText('a.alangari@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 3').click();
                await expect(page.getByText('a.aldursuni@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('Previous page').click();
                await page.getByText('page 1', { exact: true }).click();
                await expect(page.getByText('a.abdulaziz@mawarid.com.sa').first()).toBeVisible();
                await page.locator('input[type="search"]').first().click();
                await page.locator('input[type="search"]').first().fill('hyder');
                await page.locator('tr').filter({ hasText: 'a.hyder Hyder Ali A hyder@' }).locator('i').click();
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('test');
                await page.locator('#pills-tabContent').getByText('Close').click();
                await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
                await page.locator('#cdk-drop-list-2 li').filter({ hasText: 'Task' }).locator('a').click();
                await page.locator('li').filter({ hasText: 'History' }).locator('a').click();
                await page.locator('a').filter({ hasText: 'Assignment' }).click();
                await expect(page.locator('#dynamic_list_EFN0000108 comp-table tbody').getByText('Test ticket 3 for Automation')).toBeVisible();
                await expect(page.locator('#dynamic_list_EFN0000108 comp-table tbody').getByText('a.hyder', { exact: true })).toBeVisible();
                await page.locator('a').filter({ hasText: 'Conversation' }).click();
                await expect(page.getByText('Hyder Ali A Assigned To Hyder')).toBeVisible();

                // Task Sub Action validations
                await page.locator('dynamic-details').getByText('Task', { exact: true }).click();
                await expect(page.getByText('IT', { exact: true })).toBeVisible();
                await page.locator('#relation_autoComplete_dropdown_DepartmentMember label').nth(1).click();
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().click();
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().fill('viswa');
                await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().press('Enter');
                await page.getByText('m.viswa@mawarid.com.sa').click();
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('test');
                await page.locator('#pills-tabContent').getByText('Close').click();

                // Notes Sub Action validations
                await page.getByText('Notes').click();
                await page.locator('#angular_editor_ETN0000029_Notes').getByText('Type here...').click();
                await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('t');
                await page.locator('div').filter({ hasText: /^t$/ }).fill('test notes');
                await page.locator('#pills-tabContent').getByText('Close').click();

                // Close the details page
                await page.locator('button').filter({ hasText: 'Close' }).click();

                // Clear filter Id
                await page.getByRole('cell', { name: '⯆ TRQ0016310' }).hover();
                await page.getByRole('cell', { name: '⯆ TRQ0016310 ' }).getByRole('combobox').hover();
                await page.getByRole('cell', { name: '⯆ TRQ0016310 ' }).locator('i').click();
                await expect(page.locator('.table_filter_text').first()).toBeEmpty({ timeout: 20000 });
            });
        });
    });

    test.describe('Maintenance Requests', () => {
        test('All Maintenance Requests: should filter, select, and validate open requests assigned to the user', async ({ page }) => {

            // Menu Navigation
            await page.locator('#MNU0000047').click();

            // Sub Menu Navigation
            await page.getByRole('link', { name: ' All Maintenance Requests' }).click();

            // Page Validation
            await page
                .locator('section')
                .getByText('All Maintenance Requests')
                .waitFor({ state: 'visible' });

            // Pagination Validation
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Filter by Request ID
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('.text-left > .clearfix > .table_filter_text').first().click();
            await page.locator('.text-left > .clearfix > .table_filter_text').first().fill('TRQ0016098');
            await page.locator('.text-left > .clearfix > .table_filter_text').first().press('Enter');
            await expect(page.getByRole('cell', { name: 'test Maintenance request' }).locator('a')).toBeVisible();

            // Go to Request Details
            await page.getByRole('cell', { name: 'test Maintenance request' }).locator('a').click();

            // Details Page Validation
            await expect(page.locator('#custom_template_dynamic_list_EFN0000114 div').filter({ hasText: 'test Maintenance request' }).nth(1)).toBeVisible({ timeout: 20000 });

            // Attachments Validation
            await page.getByText('Attach').nth(1).click();
            await expect(page.getByText('HDRequestAttachment')).toBeVisible({ timeout: 10000 });
            await page.getByLabel('Close').getByText('x').click();

            // Related Maintenance Record Validation
            await page.locator('dynamic-field').filter({ hasText: 'Request Id TRQ0016098 Title' }).locator('a').click();
            await page.locator('dynamic-details').filter({ hasText: 'Attach Attach Title test' }).locator('button').click();
            await page.locator('a').filter({ hasText: 'Maintenance Mawarid' }).click();
            await expect(page.getByText('SysUsers Details')).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Attach Attach Title test' }).locator('button').click();

            // Notes Validation
            await page.getByText('Notes').click();
            await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('#pills-tabContent').getByText('Close').click();

            // Approvals Tab Validation
            await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByText('Approver Id')).toBeVisible();

            // Task Tab Validation
            await page.locator('#cdk-drop-list-2 li').filter({ hasText: 'Task' }).locator('a').click();
            await expect(page.getByText('Task Id')).toBeVisible();

            // History Tab Validation
            await page.locator('li').filter({ hasText: 'History' }).locator('a').click();
            await expect(page.locator('tr').filter({ hasText: 'TRQ0016098Scheduledstatus' }).locator('a')).toBeVisible();
            await expect(page.locator('#dynamic_list_EFN0000107 comp-table tbody').getByText('Scheduled', { exact: true })).toBeVisible();

            // Assignment Tab Validation
            await page.locator('a').filter({ hasText: 'Assignment' }).click();
            await expect(page.locator('#dynamic_list_EFN0000108 td').filter({ hasText: 'test Maintenance request' }).locator('comp-field-view-type')).toBeVisible();

            // Conversation Tab Validation
            await page.locator('a').filter({ hasText: 'Conversation' }).click();
            await expect(page.locator('div').filter({ hasText: /^Closed Comments - 1129781 has been completed the request - TRQ0016098$/ }).nth(1)).toBeVisible();
            await expect(page.locator('#dynamic_list_EFN0000141').getByText('Maintenance Mawarid').first()).toBeVisible();
            await expect(page.locator('#dynamic_list_EFN0000141').getByText('Maintenance Mawarid').nth(2)).toBeVisible();

            // Close Details Page
            await page.getByText('Close', { exact: true }).click();

            // Clear Filter Request ID
            await page.getByRole('cell', { name: 'pin Request Id  ' }).hover();
            await page.getByRole('cell', { name: '⯆ TRQ0016098' }).hover();
            await page.getByRole('cell', { name: '⯆ TRQ0016098 ' }).getByRole('textbox').nth(1).hover();
            await page.getByRole('cell', { name: '⯆ TRQ0016098 ' }).locator('i').click();
            await expect(page.locator('.text-left > .clearfix > .table_filter_text').first()).toBeEmpty();
        });
    });

    test.describe('My Teams', () => {
        test('My Team Requests: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000050').click();

            // Sub Menu Navigation
            await page.getByRole('link', { name: ' My Team Requests' }).click();

            // Options validation
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExport')).toBeVisible();
            await page.getByText('Options').click();

            // Filter by Request ID and Validation
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('comp-tilefilter ng-select div').first().click(); await page.getByLabel('Options list').getByText('Request Id').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('TRQ0011625');
            await page.getByRole('button', { name: ' Search' }).click();
            await expect(page.locator('#td_content_0_0')).toContainText("Test 2 Play wright automation (Don't Assign this Ticket)");
            await expect(page.locator('#td_content_0_1').getByText('TRQ0011625')).toBeVisible();

            // Ticket Details page validation
            await page.locator('#td_content_0_0 comp-field-view-type a').click();
            await expect(
                page
                    .locator('#custom_template_dynamic_list_EFN0000114')
                    .getByRole('heading', { name: "Test 2 Play wright automation (Don't Assign this Ticket)" })
            ).toBeVisible({ timeout: 20000 });

            // Pickup action validations
            await page.getByText('Pickup').nth(1).click();
            await expect(page.locator('#Actionform_EFN0000176').getByText('Pickup')).toBeVisible();
            await page.locator('#Actionform_EFN0000176').getByText('Close').click();

            // Assign action validations
            await page.getByText('Assign', { exact: true }).nth(1).click();
            await expect(page.locator('#Actionform_EFN0000177').getByText('Assign', { exact: true })).toBeVisible({ timeout: 20000 });
            await page.locator('#Actionform_EFN0000177').getByText('Close').click();

            // Accept action validations
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
            await page.locator('#Actionform_EFN0000178').getByText('Close').click();

            // Cancel action validations
            await page.getByText('Cancel').nth(1).click();
            await expect(page.locator('#Actionform_EFN0000179').getByText('Cancel')).toBeVisible();
            await page.locator('#Actionform_EFN0000179').getByText('Close').click();

            // Close action validations
            await page.getByRole('link', { name: 'Close' }).click();
            await expect(page.locator('h4').filter({ hasText: 'Close' })).toBeVisible();
            await page.locator('#Actionform_EFN0000182 button').filter({ hasText: 'Close' }).click();

            // Approvals action validations
            await page.getByText('Approval', { exact: true }).click();
            await page.locator('#pills-tabContent label').nth(2).click();
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('a.hy');
            await page.locator('tr').filter({ hasText: 'a.hyder Hyder Ali A hyder@' }).locator('i').click();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test comments');
            await page.locator('#pills-tabContent').getByText('Close').click();

            // Task Action validations
            await page.locator('dynamic-details').getByText('Task', { exact: true }).click();
            await page.locator('#relation_autoComplete_dropdown_DepartmentMember label').nth(1).click();
            await page.locator('#autoComplete_dropdown_tableDepartmentMember').getByRole('textbox').first().click();
            await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().fill('m.viswa');
            await page.locator('#autoComplete_dropdown_tableDepartmentMember input[type="text"]').first().press('Enter');
            await page.locator('td').filter({ hasText: 'm.viswa@mawarid.com.sa' }).click();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test comments');
            await page.locator('#pills-tabContent').getByText('Close').click();

            // Approvals Action validations
            await page.getByText('Approval', { exact: true }).click();
            await page.locator('#pills-tabContent label').nth(2).click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible({ timeout: 5000 });
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
            await page.getByText('page 1', { exact: true }).click();
            // await page.locator('input[type="search"]').first().click();
            await page.getByRole('searchbox').first().click();
            await page.locator('input[type="search"]').first().fill('a.alharbi01@mawarid.com.sa');
            await page.locator('tr').filter({ hasText: 'a.alharbi01@mawarid.com.sa' }).locator('i').click();
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test');
            await page.locator('#pills-tabContent').getByText('Close').click();

            // Notes Action validations
            await page.getByText('Notes').click();
            await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('div').filter({ hasText: /^test$/ }).fill('test notes');
            await page.locator('#pills-tabContent').getByText('Close').click();

            // Appointment Tab validations
            await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
            await expect(page.locator('table').filter({ hasText: 'Approver Id Approver Status' })).toBeVisible();

            // Task Tab validations
            await page.locator('#cdk-drop-list-2 li').filter({ hasText: 'Task' }).locator('a').click();
            await expect(page.locator('table').filter({ hasText: 'Task Id Title Status Assigned' })).toBeVisible();

            // History Tab validations
            await page.locator('li').filter({ hasText: 'History' }).locator('a').click();
            await expect(page.getByText('Request Id Status System Comments User Comments Action By Action Date No Data')).toBeVisible();

            // Assignment Tab validations
            await page.locator('a').filter({ hasText: 'Assignment' }).click();
            await expect(page.locator('#dynamic_list_EFN0000108').getByText('TRQ0011625', { exact: true })).toBeVisible();

            // Conversation Tab validations
            await page.locator('a').filter({ hasText: 'Conversation' }).click();
            await expect(page.locator('app-button > .btn').first()).toBeVisible();

            // Close Details Page
            await page.getByLabel('Close').locator('i').click();
            await expect(page.getByRole('textbox').nth(3)).toHaveValue('TRQ0011625');
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000123').getByRole('textbox')).toBeEmpty();
        });

        test('My Department Requests: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000050').click();

            // Sub Menu Navigation
            await page.getByRole('link', { name: ' My Department Requests' }).click();
            await expect(page.getByText('My Department Tickets')).toBeVisible({ timeout: 20000 });

            // pagination Validation
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toBeVisible();
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('4');
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Filter by Request ID and Validation
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('Test ticket 2 for Automation test');
            await page.waitForTimeout(100);
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('cell', { name: 'Test ticket 2 for Automation test', exact: true }).locator('a')).toBeVisible({ timeout: 20000 });
            await expect(page.getByText('TRQ0016275')).toBeVisible();
            await page.getByRole('cell', { name: 'Test ticket 2 for Automation test', exact: true }).locator('a').click();

            // Assign Action validations
            await page.getByText('Assign', { exact: true }).nth(1).click();
            await expect(page.locator('label').filter({ hasText: 'Portal' })).toBeVisible({ timeout: 20000 });
            await expect(page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Hyder Ali A')).toBeVisible();
            await page.locator('#relation_autoComplete_dropdown_AssignedTo').getByText('Hyder Ali A').click();
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(1).click();
            await page.waitForTimeout(100);
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(1).fill('kri');
            await page.waitForTimeout(100);
            await page.locator('thead').filter({ hasText: 'User Id Name Email Mobile' }).locator('input[type="text"]').nth(1).press('Enter');
            await expect(page.locator('tr').filter({ hasText: 'm.krishna Krishna m.krishna@' }).locator('comp-field-view-type').nth(1)).toBeVisible({ timeout: 20000});
            await page.locator('#Actionform_EFN0000177 button').first().click();

            // Cancel Action validations
            await page.getByText('Cancel').nth(1).click();
            await expect(page.locator('#Actionform_EFN0000179').getByText('Cancel')).toBeVisible();
            await page.locator('#Actionform_EFN0000179').getByText('Close').click();

            // Attach Action validations
            await page.getByText('Attach').nth(1).click();
            await expect(page.getByText('HDRequestAttachment')).toBeVisible();
            await page.getByLabel('Close').getByText('x').click();

            // Notes Sub Action validations
            await page.getByText('Notes').click();
            await page.locator('#angular_editor_ETN0000029_Notes').getByText('Type here...').click();
            await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('t');
            await page.locator('div').filter({ hasText: /^t$/ }).fill('test notes');
            await page.locator('#pills-tabContent').getByText('Close').click();

            // Close the details page
            await page.locator('button').filter({ hasText: 'Close' }).click();

            // Clear filter title
            await page.getByRole('cell', { name: '⯆ Test ticket 2 for' }).getByRole('textbox').nth(1).hover();
            await page.getByRole('cell', { name: '⯆ Test ticket 2 for' }).locator('i').click();
            await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();
        });
    });

    test.describe('Recruitment Request', () => {
        test('All Recruitment Requests: Request should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000233').click();
            // Sub Menu Navigation
            await page.getByRole('link', { name: ' All Recruitment Requests' }).click();
            // page title validation
            await expect(page.getByText('All Recruitment Request', { exact: true })).toBeVisible({ timeout: 20000 });
            // Options validation
            await page.getByText('Options').click();
            await expect(page.getByRole('link', { name: ' Export Selected' })).toBeVisible();
            await expect(page.getByRole('link', { name: ' Export All', exact: true })).toBeVisible();
            await expect(page.getByRole('link', { name: ' Export Visible' })).toBeVisible();
            await page.getByText('Options').click();

            // Pagination Validation
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('4');
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Filter by Title Validation

            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('Test-02');
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await page.getByRole('cell', { name: 'Test-02' }).locator('a').click();

            // Details Page Validation
            await expect(page.locator('#custom_template_dynamic_list_EFN0000114').getByText('Test-')).toBeVisible({ timeout: 20000 });
            await page.getByText('Attach').nth(1).click();
            await expect(page.getByText('HDRequestAttachment')).toBeVisible({ timeout: 20000 });
            await page.getByLabel('Close').getByText('x').click();

            // notes Validation

            await page.getByText('Notes').click();
            await page.locator('#angular_editor_ETN0000029_Notes').getByText('Type here...').click();
            await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('#pills-tabContent').getByText('Close').click();
            await expect(page.locator('a').filter({ hasText: 'Conversation' })).toBeVisible();
            await expect(page.getByText('Closed Comments - status')).toBeVisible();
            await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
            await page.locator('#cdk-drop-list-2 li').filter({ hasText: 'Task' }).locator('a').click();
            await page.locator('li').filter({ hasText: 'History' }).locator('a').click();
            await expect(page.locator('tr').filter({ hasText: 'TRQ0009327Closedstatus' }).locator('a')).toBeVisible();
            await expect(page.locator('#dynamic_list_EFN0000107 comp-table tbody').getByText('Closed', { exact: true })).toBeVisible();
            await page.locator('a').filter({ hasText: 'Assignment' }).click();
            await page.locator('a').filter({ hasText: 'Conversation' }).click();
            await page.getByText('Close', { exact: true }).click();

            // Ticket Category details
            await page.getByRole('cell', { name: 'Recruitment - Corporate Medical' }).locator('a').click();
            await expect(page.getByText('TicketCategory Details')).toBeVisible();
            await expect(page.getByText('Category Id TCY0000059 Name')).toBeVisible();
            await page.getByText('Close', { exact: true }).click();
            await page.getByRole('cell', { name: 'pin Title  ' }).hover();
            await page.getByRole('cell', { name: '⯆ Test-' }).hover();
            await page.getByRole('cell', { name: '⯆ Test-02 ' }).getByRole('combobox').hover();
            await page.getByRole('cell', { name: '⯆ Test-02 ' }).locator('span').nth(2).click();
            await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();
        });
    });

    test.describe('HR-ACT Tickets', () => {
        test('HR-ACT Tickets: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000260').click();

            // Sub Menu Navigation
            await page.getByRole('link', { name: ' HR-ART All Tickets' }).click();

            // Pagination Validation
            await expect(page.locator('section').getByText('HR-ART All Tickets')).toBeVisible({ timeout: 20000 });
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Filter by Request ID and Validation
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('.text-left > .clearfix > .table_filter_text').first().fill('TRQ0011381');
            await page.locator('.text-left > .clearfix > .table_filter_text').first().press('Enter');
            await expect(page.getByText('TRQ0011381')).toBeVisible();

            // Ticket Details page validation
            await page.getByRole('cell', { name: 'Test from ERP' }).locator('a').first().click();
            await expect(page.locator('#custom_template_dynamic_list_EFN0000114').getByText('Test from ERP')).toBeVisible({ timeout: 20000 });

            // Attachments Validation
            await page.getByText('Attach').nth(1).click();
            await expect(page.getByText('HDRequestAttachment')).toBeVisible({ timeout: 20000 });
            await page.getByLabel('Close').getByText('x').click();

            // Ticket details Validation
            await expect(page.locator('dynamic-details').getByText('TRQ0011381')).toBeVisible({ timeout: 20000 });
            await expect(page.locator('dynamic-details').getByText('Test from ERP').nth(3)).toBeVisible();
            await expect(page.locator('dynamic-details').getByText('Closed')).toBeVisible();

            // Notes Validation

            await page.getByText('Notes').click();
            await expect(page.locator('#Actionform_EFN0000185').getByText('Notes')).toBeVisible();
            await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000029_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('#pills-tabContent').getByText('Close').click();

            // Tabs Validation
            await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByText('Approver Id')).toBeVisible();
            await page.locator('#cdk-drop-list-2 li').filter({ hasText: 'Task' }).locator('a').click();
            await page.locator('li').filter({ hasText: 'History' }).locator('a').click();
            await expect(page.locator('tr').filter({ hasText: 'TRQ0011381Closedstatus' }).locator('a')).toBeVisible();
            await expect(page.locator('#dynamic_list_EFN0000107 comp-table tbody').getByText('Closed', { exact: true })).toBeVisible();
            await page.locator('a').filter({ hasText: 'Assignment' }).click();
            await expect(page.locator('#dynamic_list_EFN0000108 comp-table tbody').getByText('Test from ERP')).toBeVisible();
            await page.locator('a').filter({ hasText: 'Conversation' }).click();
            await expect(page.getByText('Closed Comments - Test from')).toBeVisible();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.getByText('Close', { exact: true }).click();

            // Category details validation
            await page.getByRole('cell', { name: 'Suggestion' }).locator('a').click();
            await expect(page.getByText('TicketCategory Details')).toBeVisible();
            await expect(page.getByText('Category Id TCY0000071 Name')).toBeVisible();
            await page.getByText('Close', { exact: true }).click();

            // Clear Filter Request ID
            await page.getByRole('cell', { name: 'pin Request Id  ' }).hover();
            await page.getByRole('cell', { name: '⯆ TRQ0011381' }).hover();
            await page.getByRole('cell', { name: '⯆ TRQ0011381 ' }).getByRole('combobox').hover();
            await page.getByRole('cell', { name: '⯆ TRQ0011381 ' }).locator('i').click();
            await expect(page.locator('.text-left > .clearfix > .table_filter_text').first()).toBeEmpty();


        });
    });

    test.describe('Reports', () => {
        test.skip('UserLoginReport: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000051').click();
            // Sub Menu Navigation
            await page.getByRole('link', { name: ' User Login Report' }).click();
            await expect(page.locator('#DynamicCreate div').filter({ hasText: 'From Date To Date User Id Filter Clear' }).nth(2)).toBeVisible();
            await expect(page.locator('#cdk-drop-list-0 a').filter({ hasText: 'List' })).toBeVisible();
            await expect(page.locator('a').filter({ hasText: 'Total Login Count' })).toBeVisible({ timeout: 40000 });
            await page.getByPlaceholder('From Date').fill('2025-04-01');
            await page.getByPlaceholder('To Date').fill('2025-04-30');
            await page.getByPlaceholder('User Id').click();
            await page.getByPlaceholder('User Id').fill('a.hyder');
            await page.getByText('Filter').click();
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

        test.skip('RequestByCategory: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000051').click();
            // Sub Menu Navigation
            await page.getByRole('link', { name: ' Request By Category' }).click();
            await expect(page.locator('#DynamicCreate div').filter({ hasText: 'From Date To Date Filter Clear' }).nth(2)).toBeVisible({ timeout: 50000 });
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
            await page.getByPlaceholder('From Date').fill('2025-06-01');
            await page.getByPlaceholder('To Date').fill('2025-06-07');
            await page.getByText('Filter').click();
        });

        test.skip('RequestByTechnician: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000051').click();
            await page.getByRole('link', { name: ' Request By Technician' }).click();
            await expect(page.locator('#DynamicCreate div').filter({ hasText: 'From Date To Date Filter Clear' }).nth(2)).toBeVisible({ timeout: 50000 });
            await page.getByPlaceholder('From Date').fill('2025-04-01');
            await page.getByPlaceholder('To Date').fill('2025-04-10');
            await page.getByText('Filter').click();
            await expect(page.getByText('1010973')).toBeVisible({ timeout: 60000 });
            await expect(page.locator('app-dynamic-list > .content > .container-fluid')).toBeVisible();
            await page.getByText('Clear').click();
            await expect(page.getByPlaceholder('From Date')).toBeEmpty();
            await expect(page.getByPlaceholder('To Date')).toBeEmpty();
        });
    });

    test.describe('Approvals', () => {
        test('PendingApprovals: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000083').click();
            // Sub Menu Navigation
            await page.getByRole('link', { name: ' Pending Approvals' }).click();
            await expect(page.getByText('My Pending Approvals')).toBeVisible({ timeout: 30000 });
            // Options validation
            await page.getByText('Options').click();
            await expect(page.getByRole('link', { name: ' Export Selected' })).toBeVisible();
            await expect(page.getByRole('link', { name: ' Export All', exact: true })).toBeVisible();
            await expect(page.getByRole('link', { name: ' Export Visible' })).toBeVisible();
            await page.getByText('Options').click();
            // search and filter validation
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000213').getByRole('textbox').click();
            await page.getByText('ApproverId').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('APR0001550');
            await page.getByRole('button', { name: '' }).click();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();
            await page.waitForTimeout(2000);
            await page.getByRole('link', { name: 'Approve', exact: true }).click();
            await expect(page.locator('#Actionform_EFN0000218').getByText('Approve')).toBeVisible();
            await page.getByText('Close').click();
            await page.getByRole('link', { name: 'Reject' }).click();
            await expect(page.locator('#Actionform_EFN0000219').getByText('Reject')).toBeVisible();
            await page.getByText('Close').click();

            // Ticket details page validation
            await page.locator('a').filter({ hasText: 'Ticket Details' }).click();
            await expect(page.getByRole('heading', { name: 'Test Ticket for Playwright' })).toBeVisible({ timeout: 30000 });
            await expect(page.locator('#page_form_MON0000024 dynamic-details').getByText('TRQ0016253')).toBeVisible({ timeout: 20000 });
            await page.locator('dynamic-field').filter({ hasText: 'Request Id TRQ0016253 Title' }).locator('a').click();
            await expect(page.getByText('TicketCategory Details')).toBeVisible();
            await expect(page.getByText('Category Id TCY0000003 Name')).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Pickup Assign Cancel Attach' }).locator('button').click();
            await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
            
            await expect(page.getByTitle('APR0001550')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'a.hyder' }).locator('comp-datatype')).toBeVisible();

            // Task Tab validations
            await page.locator('#cdk-drop-list-2').getByRole('listitem').filter({ hasText: 'Task' }).locator('a').click();
            await expect(page.getByText('TSK0001095')).toBeVisible();
            await expect(page.getByText('TSK0001097')).toBeVisible();
            await expect(page.getByText('TSK0001096')).toBeVisible();            
            await expect(page.getByRole('cell', { name: 'Todo' }).locator('comp-datatype')).toBeVisible();

            // History Tab validations
            await page.getByRole('listitem').filter({ hasText: 'History' }).locator('a').click();
            await expect(page.getByText('Status History')).toBeVisible({ timeout: 10000 });

            // Assignment Tab validations
            await page.locator('a').filter({ hasText: 'Assignment' }).click();
            await expect(page.getByRole('cell', { name: 'Request Id' }).locator('a')).toBeVisible();

            // Conversation Tab validations
            await page.locator('#cdk-drop-list-6 a').filter({ hasText: 'Conversation' }).click();
            await page.locator('#angular_editor_ETN0000037_Comments div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000037_Comments div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('a').filter({ hasText: 'Conversation' }).first().click();
            await page.locator('#angular_editor_ETN0000047_Comments').getByText('Type here...').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

            // close Details Page
            await page.getByLabel('Close').locator('i').click();

            // Clear Filter
            await page.getByRole('button', { name: ' Clear' }).click();
        });

        test('ApprovedList: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000083').click();

            // Sub Menu Navigation
            await page.getByRole('link', { name: ' Approved List' }).click();
            await expect(page.getByText('My Completed Approvals')).toBeVisible({ timeout: 60000 });

            // Options validation
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExport')).toBeVisible();
            await page.getByText('Options').click();

            // search and filter validation - Approvered List
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000215').getByRole('textbox').click();
            await page.getByRole('option', { name: 'ApproverId' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('APR0001308');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.getByRole('listitem').filter({ hasText: 'APR0001308Approver a.hyder' })).toBeVisible();
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
            await page.getByRole('textbox').nth(3).fill('APR0001308');
            await page.getByRole('button', { name: '' }).click();

            // Details Page Validation
            await page.locator('#td_content_0_0 comp-field-view-type a').click();
            await expect(page.getByRole('heading', { name: 'Approvals Details' })).toBeVisible({ timeout: 20000 });
            await expect(page.locator('a').filter({ hasText: 'Conversation' })).toBeVisible();
            await page.locator('a').filter({ hasText: 'Ticket Details' }).click();await expect(page.getByRole('heading', { name: 'Test ticket for Queue,' })).toBeVisible({ timeout: 30000});

            // Approvals Tab Validation
            await page.locator('#cdk-drop-list-4 a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByTitle('APR0001308')).toBeVisible({ timeout: 20000 });
            await expect(page.getByRole('cell', { name: 'Approved' }).locator('comp-datatype')).toBeVisible();

            // task Tab Validation
            await page.locator('#cdk-drop-list-4').getByRole('listitem').filter({ hasText: 'Task' }).locator('a').click();
            await expect(page.getByText('Task Id')).toBeVisible();
            await expect(page.getByText('Department Name')).toBeVisible();

            // History Tab Validation
            await page.getByRole('listitem').filter({ hasText: 'History' }).locator('a').click();
            await expect(page.getByRole('table').getByText('WaitingforApproval', { exact: true })).toBeVisible();
            await expect(page.getByTitle('Approved', { exact: true }).first()).toBeVisible();

            // Assignment Tab Validation
            await page.locator('a').filter({ hasText: 'Assignment' }).click();
            await expect(page.getByRole('table').getByText('Test ticket for Queue,')).toBeVisible();

            // Close Details Page
            await page.getByLabel('Close').locator('i').click();

            // Clear Filter
            await page.getByRole('button', { name: ' Clear' }).click();
        });

        test('AllApproved: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000083').click();
            // Sub Menu Navigation
            await page.getByRole('link', { name: ' All Approvals' }).click();
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000214').getByRole('textbox').click();
            await page.getByText('ApproverId').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('APR0001550');
            await page.getByRole('button', { name: '' }).click();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();
            await page.getByRole('link', { name: 'Approve', exact: true }).click();
            await expect(page.locator('#Actionform_EFN0000218').getByText('Approve')).toBeVisible();
            await page.getByText('Close').click();
            await page.getByRole('link', { name: 'Reject' }).click();
            await expect(page.locator('#Actionform_EFN0000219').getByText('Reject')).toBeVisible();
            await page.getByText('Close').click();

            // Ticket details page validation
            await expect(page.locator('a').filter({ hasText: 'Ticket Details' })).toBeVisible({ timeout: 10000 });
            await page.locator('a').filter({ hasText: 'Ticket Details' }).click();
            await expect(page.getByRole('heading', { name: 'Test Ticket for Playwright' })).toBeVisible({ timeout: 20000});
            await expect(page.locator('#page_form_MON0000024 dynamic-details').getByText('TRQ0016253')).toBeVisible();
            await page.locator('dynamic-field').filter({ hasText: 'Request Id TRQ0016253 Title' }).locator('a').click();
            await expect(page.getByText('TicketCategory Details')).toBeVisible();
            await expect(page.getByText('Category Id TCY0000003 Name')).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Pickup Assign Cancel Attach' }).locator('button').click();
            await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
            
            await expect(page.getByTitle('APR0001550')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'a.hyder' }).locator('comp-datatype')).toBeVisible();

            // Task Tab validations
            await page.locator('#cdk-drop-list-2').getByRole('listitem').filter({ hasText: 'Task' }).locator('a').click();
            await expect(page.getByText('TSK0001095')).toBeVisible();
            await expect(page.getByText('TSK0001097')).toBeVisible();
            await expect(page.getByText('TSK0001096')).toBeVisible(); 
            await expect(page.getByRole('cell', { name: 'Todo' }).locator('comp-datatype')).toBeVisible();

            // History Tab validations
            await page.getByRole('listitem').filter({ hasText: 'History' }).locator('a').click();
            await expect(page.getByText('Status History')).toBeVisible({ timeout: 10000 });

            // Assignment Tab validations
            await page.locator('a').filter({ hasText: 'Assignment' }).click();
            await expect(page.getByRole('cell', { name: 'Request Id' }).locator('a')).toBeVisible();

            // Conversation Tab validations
            await page.locator('#cdk-drop-list-6 a').filter({ hasText: 'Conversation' }).click();
            await page.locator('#angular_editor_ETN0000037_Comments div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000037_Comments div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('a').filter({ hasText: 'Conversation' }).first().click();
            await page.locator('#angular_editor_ETN0000047_Comments').getByText('Type here...').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

            // close Details Page
            await page.getByLabel('Close').locator('i').click();

            // Clear Filter
            await page.getByRole('button', { name: ' Clear' }).click();
            
        });
    });

    test.describe('Task', () => {
        test('PendingTask: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000087').click();
            // Sub Menu Navigation
            await page.getByRole('link', { name: ' Pending Task' }).click();
            await expect(page.getByText('My Pending Tasks')).toBeVisible({ timeout: 20000 });
            // Options validation
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExport')).toBeVisible();
            await page.getByText('Options').click();
            // search and filter validation
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000211').getByRole('textbox').click();
            await page.getByRole('option', { name: 'TaskId' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('TSK0001096');
            await page.getByRole('textbox').nth(3).press('Enter');
            await page.locator('#td_content_0_0 comp-field-view-type a').click();
            // Task Details Page Validation
            await expect(page.getByRole('heading', { name: 'Task Details' })).toBeVisible();
            await expect(page.locator('#page_left').getByText('Title')).toBeVisible();
            await expect(page.getByTitle('Test Ticket for Playwright')).toBeVisible();

            // Done Action Validation
            await page.getByRole('link', { name: 'Done' }).click();
            await expect(page.locator('#Actionform_EFN0000058').getByText('Done')).toBeVisible({ timeout: 10000 });
            await page.getByText('Close').click();

            // Department Details Validation
            await page.locator('#page_left a').filter({ hasText: 'IT' }).click();
            await expect(page.getByText('Department Details')).toBeVisible();
            await expect(page.getByText('Department Id DPT0000001 Name')).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Done Task Details Done Task' }).locator('button').click();
            await expect(page.getByText('Status: Doing')).toBeVisible();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

            // Close Task Details Page
            await page.getByLabel('Close').locator('i').click();

            // Clear Filter
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000211').getByRole('textbox')).toBeEmpty();
        });

        test('AllTask: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            // Navigate to All Tasks
            await page.locator('#MNU0000087').click();

            // Sub Menu Navigation
            await page.getByRole('link', { name: ' All Tasks' }).click();
            await expect(page.getByText('My All Tasks')).toBeVisible({ timeout: 20000 });

            // Options validation
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExport')).toBeVisible();
            await page.getByText('Options').click();

            // search and filter validation
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000210').getByRole('textbox').click();
            await page.getByRole('option', { name: 'TaskId' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('TSK0001095');
            await page.getByRole('textbox').nth(3).press('Enter');
            await page.locator('#td_content_0_0 comp-field-view-type a').click();
            // Task Details Page Validation
            await expect(page.getByRole('heading', { name: 'Task Details' })).toBeVisible();
            await expect(page.locator('#page_left').getByText('Title')).toBeVisible();
            await expect(page.getByTitle('Test Ticket for Playwright')).toBeVisible();

            // Done Action Validation
            await page.getByRole('link', { name: 'Doing' }).click();
            await expect(page.locator('#Actionform_EFN0000057').getByText('Doing')).toBeVisible();
            await page.getByText('Close').click();

            // Department Details Validation
            await page.locator('#page_left a').filter({ hasText: 'IT' }).click();
            await expect(page.getByText('Department Details')).toBeVisible({ timeout: 10000 });
            await expect(page.getByText('Department Id DPT0000001 Name')).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Doing Task Details Doing Task' }).locator('button').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

            // Close Task Details Page
            await page.getByLabel('Close').locator('i').click();

            // Clear Filter
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000210').getByRole('textbox')).toBeEmpty();
        });

        test('ComplectedTask: should filter, select, and validate open requests assigned to the user', async ({ page }) => {
            // Navigate to Completed Tasks
            await page.locator('#MNU0000087').click();

            // Sub Menu Navigation
            await page.getByRole('link', { name: ' Completed Task' }).click();
            await expect(page.getByText('My Completed Tasks')).toBeVisible({ timeout: 20000 });

            // Options validation
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExport')).toBeVisible();
            await page.getByText('Options').click();

            // search and filter validation
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000212').getByRole('textbox').click();
            await page.getByRole('option', { name: 'TaskId' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('TSK0001097');
            await page.getByRole('textbox').nth(3).press('Enter');
            await page.locator('#td_content_0_0 comp-field-view-type a').click();
            // Task Details Page Validation
            await expect(page.getByRole('heading', { name: 'Task Details' })).toBeVisible();
            await expect(page.locator('#page_left').getByText('Title')).toBeVisible();
            await expect(page.getByTitle('Test Ticket for Playwright')).toBeVisible();

            // status Validation
            await expect(page.locator('#page_left').getByText('Status', { exact: true })).toBeVisible();
            await expect(page.locator('#page_left').getByText('Done', { exact: true })).toBeVisible();
            await expect(page.getByText('Status: Done')).toBeVisible();
            await expect(page.getByText('Status: Doing')).toBeVisible();

            // Department Details Validation
            await page.locator('#page_left a').filter({ hasText: 'IT' }).click();
            await expect(page.getByText('Department Details')).toBeVisible();
            await expect(page.getByText('Department Id DPT0000001 Name')).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Task Details Task Id' }).locator('button').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

            // Close Task Details Page
            await page.getByLabel('Close').locator('i').click();

            // Clear Filter
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000212').getByRole('textbox')).toBeEmpty();
        });
    });

    test.describe('Masters', () => {
        test('Team: should filter, select, and validate requests in Team menu', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000031').click();
            // Sub Menu Navigation
            await page.getByRole('link', { name: '﨡 Team' }).click();
            // create Team Validation
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
            await page.getByText('page 1', { exact: true }).click();
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('hyder');
            await expect(page.getByText('a.hyder')).toBeVisible();
            await page.locator('tr').filter({ hasText: 'a.hyder Hyder Ali A hyder@' }).locator('i').click();
            await page.locator('#relation_autoComplete_dropdown_Department label').click();
            await page.locator('ul').filter({ hasText: 'of2' }).locator('a').nth(2).click();
            await expect(page.getByText('Test')).toBeVisible();
            await page.locator('ul').filter({ hasText: 'of2' }).locator('a').nth(1).click();
            await page.locator('tr').filter({ hasText: 'IT DPT0000001 s.alissa@' }).locator('td').first().click();
            await page.getByText('Close').click();

            // Member + validation
            await page.getByRole('row', { name: ' undefined  TEM0000003 CRM' }).locator('a').first().click();
            await expect(page.getByText('Team Member')).toBeVisible();

            // Add Member Validation create
            await page.getByRole('cell', { name: 'Team Member Options  Create' }).getByRole('button').click();
            await expect(page.getByText('Team Id CRM Team User Id x')).toBeVisible();

            // User Id Selection with Pagination
            await page.locator('#autoComplete_dropdown_UserId label').click();
            await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible({ timeout: 10000 });
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await expect(page.getByText('a.aldursuni@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('page 4').click();
            await page.getByText('page 5').click();
            await expect(page.getByText('a.almohaimeed@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await expect(page.getByText('a.aldursuni@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('page 1', { exact: true }).click();
            await expect(page.getByText('a.abdelhafiz@mawarid.com.sa').first()).toBeVisible();
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('hyder');
            await page.getByText('a.hyder').click();
            await page.getByText('Close').click();
            await page.getByRole('cell', { name: ' undefined' }).locator('a').click();

            // Category + Validation
            await page.getByRole('row', { name: ' undefined  TEM0000004 ERP' }).locator('a').nth(1).click();
            await expect(page.getByText('Team Category', { exact: true })).toBeVisible();

            // Add Category Validation create
            await page.getByRole('cell', { name: 'Team Category Options ' }).getByRole('button').click();
            await page.locator('#relation_autoComplete_dropdown_CategoryId label').click();
            await page.locator('#autoComplete_dropdown_CategoryId a').nth(3).click();
            await expect(page.locator('#autoComplete_dropdown_CategoryId input[name="currentPage"]')).toHaveValue('2');
            await page.locator('#autoComplete_dropdown_CategoryId a').nth(3).click();
            await expect(page.locator('#autoComplete_dropdown_CategoryId input[name="currentPage"]')).toHaveValue('3');
            await page.locator('#autoComplete_dropdown_CategoryId a').nth(4).click();
            await page.locator('#autoComplete_dropdown_CategoryId a').nth(2).click();
            await page.locator('#autoComplete_dropdown_CategoryId a').nth(1).click();
            await page.locator('#autoComplete_dropdown_tableCategoryId thead input[type="text"]').click();
            await page.locator('#autoComplete_dropdown_tableCategoryId thead input[type="text"]').fill('Erp');
            await page.locator('#autoComplete_dropdown_tableCategoryId thead input[type="text"]').press('Enter');
            await page.locator('#autoComplete_dropdown_tableCategoryId').getByText('ERP').click();
            await page.getByText('Close').click();

            // Team Details Page
            await page.locator('#dynamic_list_EFN0000100').getByRole('cell', { name: 'TEM0000004' }).locator('a').click();
            await expect(page.getByText('Team Details')).toBeVisible();
            await expect(page.locator('.groupView')).toBeVisible();
            await page.getByText('Close').click();
            await page.getByRole('cell', { name: ' undefined' }).locator('a').click();
            await page.locator('.align-items-start > .d-flex > i').first().click();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').fill('10');
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').press('Enter');
            await page.getByRole('cell', { name: 'TEM0000010' }).locator('a').click();
            await page.locator('page-entity').filter({ hasText: 'Team Member Options Export' }).locator('button').click();
            await page.locator('#autoComplete_dropdown_UserId label').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await page.getByText('page 4').click();
            await page.getByText('page 5').click();
            await expect(page.getByText('a.almohaimeed@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]/a').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1', { exact: true }).click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
            await page.locator('tr').filter({ hasText: 'a.abdalhamed@mawarid.com.sa' }).locator('i').click();
            await page.locator('#DynamicCreate').getByText('Close').click();
            await page.getByText('Create').nth(4).click();
            await page.locator('#relation_autoComplete_dropdown_CategoryId label').click();
            await page.locator('#autoComplete_dropdown_CategoryId a').nth(3).click();
            await expect(page.locator('#autoComplete_dropdown_tableCategoryId').getByText('Payroll')).toBeVisible();
            await page.locator('#autoComplete_dropdown_CategoryId a').nth(3).click();
            await expect(page.getByText('Test')).toBeVisible();
            await page.locator('#autoComplete_dropdown_CategoryId a').nth(2).click();
            await expect(page.locator('#autoComplete_dropdown_CategoryId input[name="currentPage"]')).toHaveValue('2');
            await page.locator('#autoComplete_dropdown_CategoryId a').nth(1).click();
            await expect(page.locator('#autoComplete_dropdown_CategoryId input[name="currentPage"]')).toHaveValue('1');
            await page.getByText('General Accounts').click();
            await page.locator('#DynamicCreate').getByText('Close').click();
            await page.locator('td').filter({ hasText: 'TCY0000014' }).locator('a').click();
            await expect(page.getByText('TicketCategory Details')).toBeVisible();
            await page.locator('#page_left').getByText('Close').click();
            await page.getByText('Close').click();
            await page.getByRole('cell', { name: 'pin Team Lead  ' }).hover();
            // await page.locator('td').filter({ hasText: /^⯆$/ }).nth(1).hover();
            await page.getByRole('cell', { name: '⯆ 10' }).hover();
            await page.getByRole('cell', { name: '⯆ 10 ' }).getByRole('textbox').nth(1).hover();
            await page.locator('.table_filter_clear').click();
            await page.locator('tbody > tr:nth-child(2) > td:nth-child(8)').hover();
            await page.locator('.px-1 > .fas').first().click();
            await expect(page.locator('h4')).toBeVisible();
            await expect(page.getByText('Update')).toBeVisible();
            await page.getByText('Close').click();
        });

        test('Service Provider: should filter, select, and validate requests in Team menu', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000031').click();
            // Sub Menu Navigation
            await page.getByRole('link', { name: ' Service Provider' }).click();
            // pagination Validation
            await page.locator('comp-pagination a').nth(2).click();
            await page.locator('comp-pagination a').nth(2).click();
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('4');
            await page.locator('comp-pagination a').nth(3).click();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('cell', { name: 'Hyder Ali A' }).locator('comp-datatype')).toBeVisible({ timeout: 20000 });
            await page.locator('section').getByText('Create').click();
            await page.locator('#autoComplete_dropdown_UserId label').click();
            await page.getByText('page 2').click();
            await page.getByText('page 3').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await expect(page.getByText('a.almohaimeed@mawarid.com.sa').first()).toBeVisible();
            await page.locator('//*[@id="dropdownPagination"]/pagination-template/nav/ul/li[9]/a').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1', { exact: true }).click();
            await expect(page.getByText('a.abdalhamed@mawarid.com.sa').first()).toBeVisible();
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('hyder');
            await page.locator('#autoComplete_dropdown_table_UserId').getByText('a.hyder').click();
            await page.getByText('Close').click();
        });

        test('Category: should filter, select, and validate requests in Team menu', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000031').click();
            // Sub Menu Navigation
            await page.getByRole('link', { name: ' Category' }).click();
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('cell', { name: 'TCY0000013' }).locator('a')).toBeVisible({ timeout: 10000 });
            // Team + Validation
            await page.locator('comp-field-view-type > .pointer').first().click();
            await expect(page.getByText('Category Team')).toBeVisible();
            await page.getByRole('cell', { name: 'Category Team Options ' }).getByRole('button').click();
            await page.locator('#relation_autoComplete_dropdown_TeamId label').click();
            await page.locator('#autoComplete_dropdown_tableTeamId thead input[type="text"]').click();
            await page.locator('#autoComplete_dropdown_tableTeamId thead input[type="text"]').fill('por');
            await page.locator('#autoComplete_dropdown_tableTeamId thead input[type="text"]').press('Enter');
            await page.getByText('Apps & Portals').click();
            await page.getByText('Close').click();

            // Category Details Page
            await page.locator('#dynamic_list_EFN0000486').getByRole('cell', { name: 'TCY0000013' }).locator('a').click();
            await expect(page.getByText('TicketCategory Details')).toBeVisible();
            await expect(page.getByText('Category Id TCY0000013 Name')).toBeVisible();
            await page.getByText('Close').click();

            // Team Details Page

            await page.getByRole('cell', { name: 'TEM0000009', exact: true }).locator('a').click();
            await expect(page.getByText('Team Details')).toBeVisible();
            await expect(page.locator('.groupView')).toBeVisible();
            await expect(page.locator('#DynamicDetails').getByTitle('Maintenance')).toBeVisible();
            await page.getByText('Close').click();
            await page.locator('comp-field-view-type > .pointer').first().click();

            // Pagination validation
            await page.locator('comp-pagination a').nth(3).click();
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('cell', { name: 'TCY0000001' }).locator('a')).toBeVisible();
            await page.locator('.align-items-start > .d-flex > i').first().click();
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
            await page.locator('#DynamicCreate').getByText('Close').click();
            await page.getByText('Close').click();
            await page.locator('td:nth-child(4) > .clearfix > .mb-1 > .ng-select-container').hover();
            await page.locator('.table_filter_clear').click();
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').fill('Maintenance');

            await page.getByRole('cell', { name: '⯆ Maintenance ' }).getByRole('textbox').nth(1).press('Enter');
            await expect(page.getByRole('table').getByText('Maintenance').first()).toBeVisible();
            await expect(page.getByRole('cell', { name: 'TCY0000013' }).locator('a')).toBeVisible();
            await page.locator('td:nth-child(5) > .clearfix > .mb-1 > .ng-select-container').hover();
            await page.locator('.table_filter_clear').click();
        });

        test('Ticket Type: should filter, select, and validate requests in Team menu', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000031').click();
            // Sub Menu Navigation
            await page.getByRole('link', { name: ' Ticket Type' }).click();
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByText('Recruitment Campaign Plan').first()).toBeVisible();
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByText('Issue').first()).toBeVisible();

            // Create Validation
            await page.locator('section').getByText('Create').click();
            await page.getByPlaceholder('Name').click();
            await page.getByPlaceholder('Name').fill('test name');
            await page.getByPlaceholder('Description').click();
            await page.getByPlaceholder('Description').fill('test des');
            await page.waitForTimeout(1000);
            await page.locator('#relation_autoComplete_dropdown_Department label').click();
            await expect(page.locator('td').filter({ hasText: 'DPT0000001' }).locator('comp-datatype')).toBeVisible();
            await page.locator('#autoComplete_dropdown_Department comp-pagination a').nth(2).click();
            await expect(page.getByText('Test')).toBeVisible();
            await page.locator('#autoComplete_dropdown_Department comp-pagination a').first().click();
            await page.locator('tr').filter({ hasText: 'IT DPT0000001 s.alissa@' }).locator('i').click();
            await page.locator('#autoComplete_dropdown_RequestingDepartment label').click();
            await page.locator('input[type="search"]').nth(1).click();
            await page.locator('input[type="search"]').nth(1).fill('test');
            await page.locator('tr').filter({ hasText: 'DPT0000018 Test' }).locator('i').click();
            await page.locator('#autoComplete_dropdown_table_RequestingDepartment').getByText('OK').click();
            await page.getByText('Close').click();
            await page.getByRole('row', { name: 'Issue Issue IT   ' }).locator('a').click();
            await expect(page.getByText('Department Details')).toBeVisible();
            await page.locator('#DynamicDetails button').click();

            // pagination validation
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Department Details Validation
            await page.getByRole('row', { name: 'Issue Issue IT   ' }).locator('a').click();
            await expect(page.getByText('Department Details')).toBeVisible();
            await expect(page.getByText('Department Id DPT0000001 Name')).toBeVisible();

            // Close details page
            await page.getByText('Close').click();
        });
    });
});
