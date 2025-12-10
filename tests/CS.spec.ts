import { test, expect, Page } from '@playwright/test';
import { performAssignAction } from '../utils/helpers/cs-helpers/cs-assign-action.ts';
import { AssignActionForAssignedTickets } from '../utils/helpers/cs-helpers/cs-assign-action-ForAssignedTickets.ts';
import { performOptionExport } from '../utils/helpers/cs-helpers/options-export.ts';
import { performScheduleAction as scheduleHelper } from '../utils/helpers/cs-helpers/cs-schedule-action.ts';
import { performCloseAction } from '../utils/helpers/cs-helpers/cs-close-action.ts';
import { performPickupAction } from '../utils/helpers/cs-helpers/cs-pickup-action.ts';
import { performTicketAction } from '../utils/helpers/cs-helpers/cs-ticket-action.ts';
import { performAttachmentAction } from '../utils/helpers/cs-helpers/cs-attachment-action.ts';
import { attachmentTab } from '../utils/helpers/cs-helpers/cs-attachment-tab.ts';


test.describe('Customer Support', async () => {

    test.beforeEach(async ({ page }) => {
        await test.step('go to the CustomerSupport app', async () => {
            await page.goto('https://portal.mawarid.com.sa/apps4x/');
            await expect(page.getByRole('link', { name: 'Customer Support' })).toBeVisible({ timeout: 30000 });
            await page.getByRole('link', { name: 'Customer Support' }).click();
        });
    });

    test('Dashboard:', async ({ page }) => {
        // Check the page title
        await expect(page.getByRole('heading', { name: 'Customer Support' })).toBeVisible();

        // Fill the From data and To date
        await page.getByPlaceholder('From Date').fill('2025-12-11');
        await page.getByPlaceholder('To Date').fill('2025-07-13');

        // All Ticket Chart are displayed
        await expect(page.locator('#canvasjs-angular-chart-container-0 canvas').nth(1)).toBeVisible({ timeout: 20000 });
        await page.locator('#canvasjs-angular-chart-container-0').getByRole('button', { name: 'More Options' }).click();

        // My Assigned Tickets chart are displayed
        await expect(page.locator('#canvasjs-angular-chart-container-0 canvas').nth(1)).toBeVisible();
        await page.locator('#canvasjs-angular-chart-container-1').getByRole('button', { name: 'More Options' }).click();
        await page.locator('#canvasjs-angular-chart-container-1').getByRole('button', { name: 'More Options' }).click();

        // Request By Coordinator chart are displayed 
        await expect(page.locator('#canvasjs-angular-chart-container-2 canvas').nth(1)).toBeVisible({ timeout: 20000 });
        await page.getByTitle('More Options').click();

        // My Assigned Tickets Cards are displayed
        await expect(page.getByRole('heading', { name: 'My Assigned Tickets' })).toBeVisible();
        await expect(page.getByRole('link', { name: /Closed/i }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: /New/i }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: /ReOpen/i }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: /Scheduled/i }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: /Total/i }).first()).toBeVisible();


        // All Ticket Cards are displayed 
        const statuses = ['Closed', 'New', 'ReOpen', 'Scheduled', 'Total'];
        await expect(page.getByRole('heading', { name: 'All Tickets' })).toBeVisible();
        for (const status of statuses) {
            await expect(page.getByRole('link', { name: new RegExp(status, 'i') }).nth(1)).toBeVisible(); // Regular Expression (used to match text patterns)
        }
    });

    test('MyTeamDashboard:', async ({ page }) => {
        // Navigate to the Dashboard 
        await page.getByRole('link', { name: ' My Team Dashboard' }).click();
        await page.getByPlaceholder('From Date').fill('2025-12-11');
        await page.getByPlaceholder('To Date').fill('2025-07-13');
        // UserId Dropdown
        await page.waitForTimeout(3000);
        await page.locator('#relation_autoComplete_dropdown_UserId label').click();
        await expect(page.getByText('a.hyder').first()).toBeVisible();
        await page.locator('comp-pagination a').nth(2).click();
        await expect(page.locator('input[name="currentPage"]')).toHaveValue('2');
        await page.locator('comp-pagination a').nth(2).click();
        await expect(page.locator('input[name="currentPage"]')).toHaveValue('3');
        await page.locator('comp-pagination a').first().click();
        await expect(page.locator('input[name="currentPage"]')).toHaveValue('1');
        await page.locator('.table_filter_text').first().click();
        await page.locator('.table_filter_text').first().fill('hyder');
        await page.waitForTimeout(1000);
        await page.locator('.table_filter_text').first().press('Enter');
        await page.waitForTimeout(1000);
        await page.getByText('a.hyder').click();

        // My Team Ticket Count Card
        await expect(page.locator('span').filter({ hasText: 'New' })).toBeVisible({ timeout: 20000 });
        await expect(page.locator('span').filter({ hasText: 'InProgress' })).toBeVisible();
        await expect(page.locator('span').filter({ hasText: 'Scheduled' })).toBeVisible();
        await expect(page.locator('span').filter({ hasText: 'Closed' })).toBeVisible();
        await expect(page.locator('span').filter({ hasText: 'ReOpen' })).toBeVisible();

        // Request By Coordinator 
        await expect(page.getByRole('heading', { name: 'Request by Coordinator' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'Hyder' })).toBeVisible();
        await expect(page.getByRole('cell', { name: 'CBN0001030' }).nth(1)).toBeVisible();
    });

    test.describe('Tickets For Me', () => {
        test('Ticket closed by me: should filter, select, and validate requests', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000181').click();

            // Sub menu Navigation 
            await page.getByRole('link', { name: ' Tickets Closed By Me' }).click();
            await expect(page.locator('.views')).toBeVisible({ timeout: 20000 });

            // options and Export
            await performOptionExport(page);

            // Filter by Ticket Id
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('16530');
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('table').getByText('MWD0016530')).toBeVisible();
            await expect(page.getByRole('table').getByText('Test Mail From Dev Mobile -')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'Closed' }).locator('comp-datatype')).toBeVisible();

            // customer details 
            await page.getByRole('cell', { name: 'CBN0001030' }).locator('a').click();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.
                locator('dynamic-details')).
                toContainText('Code CBN0001030 Name مؤسسة غوار التجارية Support Email alsaif@mawaridservices.com Id d8f65b29-761f-ec11-b6e5-000d3ade6e20 CR 1010150306 Labor Office ID Microsoft.Xrm.Sdk.OptionSetValue Sales Rep Name Ahmed Mohammed Lubbad Sales Rep Email a.lubbad@mawarid.com.sa Sales Rep Phone Number VAT Number Short Name Project Supervisor Owner');

            // Close Customer details 
            await page.getByText('Close', { exact: true }).click();

            // Clear the filters 
            await page.getByRole('cell', { name: ' Ticket ID  ' }).hover();
            await page.getByRole('cell', { name: '⯆ 16530' }).hover();
            await page.getByRole('cell', { name: '⯆ 16530 ' }).getByRole('textbox').nth(1).hover();
            await page.getByRole('cell', { name: '⯆ 16530 ' }).locator('i').click();
            await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();
            await page.locator('.Right > .d-flex > i').first().click();
        });

        test('Ticket Assigned To Me: should filter, select, and validate requests', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000181').click();

            // Sub menu Navigation 
            await page.getByRole('link', { name: '弄 Tickets Assigned To Me' }).click();
            await expect(page.getByText('Tickets Assigned to Me', { exact: true })).toBeVisible({ timeout: 20000 });

            // options and Export
            await performOptionExport(page);

            // List Pagination 
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Filter by Ticket Id 
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('15273');
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('table').getByText('MWD0015273')).toBeVisible();
            await expect(page.getByRole('table').getByText('Test from dev v3')).toBeVisible();

            // Open Customer Details 
            await page.getByRole('cell', { name: 'CBN0001030' }).nth(0).locator('a').click();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.locator('form div').filter({ hasText: 'Code CBN0001030 Name' }).nth(1)).toBeVisible();

            // Close Customer details 
            await page.getByText('Close', { exact: true }).click();

            // Clear the filters 
            await page.getByRole('cell', { name: ' Ticket ID  ' }).hover();
            await page.getByRole('cell', { name: '⯆ 15273' }).hover();
            await page.getByRole('cell', { name: '⯆ 15273 ' }).getByRole('textbox').nth(1).hover();
            await page.getByRole('cell', { name: '⯆ 15273 ' }).locator('i').click();
            await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();
        });

        test('Ticket Reopen By Me: should filter, select, and validate requests', async ({ page }) => {
            // Menu Navigation 
            await page.locator('#MNU0000181').click();

            // Sub menu Navigation
            await page.getByRole('link', { name: '弄 Tickets Reopened By Me' }).click();

            // options and Export
            await expect(page.getByText('Options')).toBeVisible({ timeout: 20000 });
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExport')).toBeVisible();
            await page.getByText('Options').click();

            // Filter by Ticket Id 
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('17198');
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('table').getByText('MWD0017198')).toBeVisible();
            await expect(page.getByRole('table').getByText('Automation test ticket Don\'t')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'ReOpen', exact: true }).locator('comp-datatype')).toBeVisible();

            // customer details 
            await page.getByRole('cell', { name: 'CBN0001030' }).locator('a').click();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.locator('form div').filter({ hasText: 'Code CBN0001030 Name' }).nth(1)).toBeVisible();

            // Close Customer details 
            await page.getByText('Close', { exact: true }).click();

            // Clear the filters 
            await page.getByRole('cell', { name: ' Ticket ID  ' }).hover();
            await page.getByRole('cell', { name: '⯆ 17198' }).hover();
            await page.getByRole('cell', { name: '⯆ 17198 ' }).getByRole('textbox').nth(1).hover();
            await page.getByRole('cell', { name: '⯆ 17198 ' }).locator('i').click();
            await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();
        });

        test('Ticket Scheduled By Me: should filter, select, and validate requests', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000181').click();

            // Sub menu Navigation
            await page.getByRole('link', { name: '弄 Tickets Scheduled By Me' }).click();
            await expect(page.getByText('Scheduled Tickets By Me')).toBeVisible({ timeout: 20000 });

            // options and Export
            await performOptionExport(page);

            // Filter by Ticket Id
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('17196');
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('table').getByText('MWD0017196')).toBeVisible();
            await expect(page.getByRole('table').getByText('Automation test ticket Don\'t')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'Scheduled', exact: true }).locator('comp-datatype')).toBeVisible();

            // customer details 
            await page.getByRole('cell', { name: 'CBN0001030' }).locator('a').click();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.locator('form div').filter({ hasText: 'Code CBN0001030 Name' }).nth(1)).toBeVisible();

            // Close Customer details 
            await page.getByText('Close', { exact: true }).click();

            // Clear the filters 
            await page.getByRole('cell', { name: ' Ticket ID  ' }).hover();
            await page.getByRole('cell', { name: '⯆ 17196' }).hover();
            await page.getByRole('cell', { name: '⯆ 17196 ' }).getByRole('textbox').nth(1).hover();
            await page.getByRole('cell', { name: '⯆ 17196 ' }).locator('i').click();
            await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();
        });

        test('Total Tickets: should filter, select, and validate requests', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000181').click();

            // Sub menu Navigation
            await page.getByRole('link', { name: '弄 Total Tickets For Me' }).click();
            await expect(page.locator('section').getByText('Total Tickets For Me')).toBeVisible({ timeout: 20000 });

            // options and Export
            await performOptionExport(page);

            // Filter by Ticket Id
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('17196');
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('table').getByText('MWD0017196')).toBeVisible();
            await expect(page.getByRole('table').getByText('Automation test ticket Don\'t')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'Scheduled', exact: true }).locator('comp-datatype')).toBeVisible();

            // customer details 
            await page.getByRole('cell', { name: 'CBN0001030' }).locator('a').click();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.locator('form div').filter({ hasText: 'Code CBN0001030 Name' }).nth(1)).toBeVisible();

            // Close Customer details 
            await page.getByText('Close', { exact: true }).click();

            // Clear the filters 
            await page.getByRole('cell', { name: ' Ticket ID  ' }).hover();
            await page.getByRole('cell', { name: '⯆ 17196' }).hover();
            await page.getByRole('cell', { name: '⯆ 17196 ' }).getByRole('textbox').nth(1).hover();
            await page.getByRole('cell', { name: '⯆ 17196 ' }).locator('i').click();
            await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();
        });
    });

    test.describe('Tickets', () => {
        test.describe('My Tickets', () => {
            test('New-workflow:should filter, select, and validate requests', async ({ page }) => {
                // My Team Menu Navigation
                await page.locator('#MNU0000082').click();
                // Sub menu Navigation
                await page.getByRole('link', { name: ' My Tickets' }).click();
                // List Title & Pagination
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

                // Options and Export
                await performOptionExport(page);

                // My Tickets: Filter by Ticket Id
                await page.locator('.Right > .d-flex > i').first().click();
                await page.locator('#dynamic_list_EFN0000237').getByRole('textbox').click();
                await page.getByText('Ticket ID').click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('MWD0017195');
                await page.getByRole('textbox').nth(3).press('Enter');

                // My Tickets: Open Ticket Details
                await page.locator('comp-field-view-type').filter({ hasText: 'Automation test ticket Don\'t' }).locator('a').click();
                await expect(page.getByRole('heading', { name: '[MWD0017195] Automation test' })).toBeVisible({ timeout: 20000 });

                // Ticket Details: Schedule Action
                await scheduleHelper(page);

                // Close Action 
                await performCloseAction(page);

                // Pickup Action 
                await performPickupAction(page);

                // Assign Action 
                await performAssignAction(page);

                // Ticket Action 
                await performTicketAction(page);

                // Attach Action 
                await performAttachmentAction(page);

                // Ticket Details data
                await expect(page.getByText('Ticket ID MWD0017195 Subject')).toBeVisible();

                // Customer Details 
                await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0017195 Subject' }).locator('a').click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Customer Details')).toBeVisible();
                await expect(page.getByText('CBN0001030', { exact: true })).toBeVisible();
                await expect(page.locator('div').filter({ hasText: /^alsaif@mawaridservices\.com$/ })).toBeVisible();
                await page.locator('dynamic-details').filter({ hasText: 'Schedule Close Pickup Assign' }).locator('button').click();

                // Comments Sub Action 
                await page.getByRole('link', { name: ' Comments' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

                // Notes Sub Action
                await page.getByRole('link', { name: ' Notes' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test Note');
                await page.getByRole('button', { name: 'Close' }).click();

                // Sent Approval Sub Action 
                await page.getByRole('link', { name: '魯 Send Approval' }).click();
                // SA Dropdown
                await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
                await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible({ timeout: 30000 });
                // SA Pagination
                await page.getByText('page 2').click();
                await expect(page.getByText('a.alangari@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 3').click();
                await page.getByText('page 4').click();
                await page.getByText('Next page').click();
                await page.getByText('Next page').click();
                await expect(page.getByText('a.alqahtani@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('Previous page').click();
                await page.getByText('Previous page').click();
                await page.getByText('page 1', { exact: true }).click();
                await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible();
                // Search By User Id 
                await page.getByRole('searchbox').first().click();
                await page.getByRole('searchbox').first().fill('hyder');
                await expect(page.getByText('a.hyder')).toBeVisible();
                await page.getByRole('searchbox').first().click();
                await page.getByRole('searchbox').first().fill('');
                // Search By Name
                await page.getByRole('searchbox').nth(1).click();
                await page.getByRole('searchbox').nth(1).fill('hyder');
                await expect(page.getByRole('cell', { name: 'Hyder Ali A' }).locator('div')).toBeVisible();
                await page.getByRole('searchbox').nth(1).click();
                await page.getByRole('searchbox').nth(1).fill('');
                // Search By Email 
                await page.getByRole('searchbox').nth(2).click();
                await page.getByRole('searchbox').nth(2).fill('hyder');
                await expect(page.getByText('hyder@faaztechsolutions.com')).toBeVisible();
                await page.getByText('hyder@faaztechsolutions.com').click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test comments');
                await page.getByRole('button', { name: 'Close' }).click();

                // Conversation Tab
                await expect(page.locator('b').filter({ hasText: 'alsaif@mawaridservices.com' })).toBeVisible();
                await expect(page.getByText('Dear Customer')).toBeVisible();
                await expect(page.getByText('Ticket Information')).toBeVisible();
                await expect(page.getByText('Ticket ID : MWD0017195')).toBeVisible();
                await expect(page.getByText('Title : Automation test')).toBeVisible();
                await expect(page.locator('#commentscollapse_1').getByText('Automation test ticket Don\'t')).toBeVisible();
                // Reply 
                await page.getByRole('link', { name: ' Reply' }).first().click();
                await expect(page.locator('#Actionform_EFN0000234').getByText('Reply', { exact: true })).toBeVisible({ timeout: 20000 });
                await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
                await expect(page.locator('#CcRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
                await expect(page.getByPlaceholder('Bcc')).toBeVisible();
                await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
                await expect(page.getByText('Files')).toBeVisible();
                await expect(page.locator('#file_Files')).toBeVisible();
                await page.locator('#Actionform_EFN0000234').getByText('Close').click();
                // Forward
                await page.getByRole('link', { name: ' Forward' }).first().click();
                await expect(page.locator('#Actionform_EFN0000235').getByText('Forward')).toBeVisible({ timeout: 20000 });
                await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
                await expect(page.getByPlaceholder('Add a CC')).toBeVisible();
                await expect(page.locator('#BccRecipients div').nth(1)).toBeVisible();
                await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
                await expect(page.getByText('Thanks & RegardsHyder Ali,')).toBeVisible();
                await expect(page.locator('#Actionform_EFN0000235 dynamic-view div').filter({ hasText: 'Files Drag and drop a file or' }).nth(1)).toBeVisible();
                await page.locator('#Actionform_EFN0000235').getByText('Close').click();

                // Ticket Tab
                await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
                await expect(page.getByText('Request Id')).toBeVisible();
                await expect(page.getByText('Title', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
                await expect(page.getByText('Ticket Category')).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Assigned To  ' })).toBeVisible();
                await expect(page.getByText('Ticket Type')).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Scheduled Date  ' })).toBeVisible();
                await expect(page.getByText('Duration').first()).toBeVisible();
                await expect(page.getByText('Description').nth(1)).toBeVisible();

                // Approval Tab
                await page.locator('#cdk-drop-list-2 a').filter({ hasText: 'Approvals' }).click();
                await expect(page.getByText('Approver Id')).toBeVisible();
                await expect(page.getByText('Approver', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();
                await expect(page.getByText('Approval Comments')).toBeVisible();

                // Attachment Tab 
                await attachmentTab(page);

                // Status History Tab 
                await page.locator('a').filter({ hasText: 'Status History' }).click();
                await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();

                // close the Ticket details page 
                await page.getByLabel('Close').locator('i').click();

                // Clear the filters 
                await expect(page.getByRole('textbox').nth(3)).toHaveValue('MWD0017195');
                await page.getByRole('button', { name: ' Clear' }).click();
                await expect(page.locator('#dynamic_list_EFN0000237').getByRole('textbox')).toBeEmpty();
                await page.locator('i:nth-child(2)').click();
            });

            test('Schedule-workflow:should filter, select, and validate requests', async ({ page }) => {
                // My Team Menu Navigation
                await page.locator('#MNU0000082').click();

                // Sub menu Navigation
                await page.getByRole('link', { name: ' My Tickets' }).click();

                // Go to schedule tab
                await page.locator('[id^="cdk-drop-list"] a', { hasText: 'Scheduled' }).click();
                await expect(page.getByText('Scheduled Tickets')).toBeVisible({ timeout: 30000 });
                await expect(page.getByRole('spinbutton')).toHaveValue('1');

                // Options and Export
                await performOptionExport(page);

                // Filter By Id 
                await page.locator('#tabView_2 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > div > div > .card-header > .Right > .d-flex > i').first().click();
                await page.locator('#dynamic_list_EFN0000238').getByRole('textbox').click();
                await page.getByRole('option', { name: 'Ticket ID' }).click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('MWD0017196');
                await page.getByRole('textbox').nth(3).press('Enter');
                await expect(page.locator('a').filter({ hasText: 'MWD0017196' })).toBeVisible({ timeout: 20000 });
                await expect(page.locator('comp-field-view-type').filter({ hasText: 'Automation test ticket Don\'t Take Any Actions - Scheduled' }).locator('a')).toBeVisible();
                await expect(page.locator('#dynamic_list_EFN0000238').getByText('Scheduled', { exact: true })).toBeVisible();

                // Go to Ticket details
                await page.locator('a').filter({ hasText: 'MWD0017196' }).click();
                await expect(page.getByRole('heading', { name: '[MWD0017196] Automation test' })).toBeVisible({ timeout: 20000 });
                await expect(page.getByText('Ticket ID MWD0017196 Subject')).toBeVisible({ timeout: 30000 });
                await expect(page.locator('dynamic-details form div').filter({ hasText: 'Category Channel Email' }).nth(1)).toBeVisible();

                // Close Action
                await performCloseAction(page);

                // Start Action 
                await page.getByRole('link', { name: 'Start' }).click();
                await expect(page.locator('#Actionform_EFN0000019').getByText('Start')).toBeVisible({ timeout: 30000 });
                await page.getByPlaceholder('Comments').click();
                await page.getByPlaceholder('Comments').fill('test');
                await page.locator('#Actionform_EFN0000019').getByText('Close').click();

                // Pickup Action
                await performPickupAction(page);

                // Assign Action 
                await AssignActionForAssignedTickets(page);

                // Ticket Action 
                await performTicketAction(page);

                // Attach Action 
                await performAttachmentAction(page);

                // Customer Details 
                await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0017196 Subject' }).locator('a').click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Customer Details')).toBeVisible({ timeout: 20000 });
                await expect(page.getByText('CBN0001030', { exact: true })).toBeVisible();
                await expect(page.locator('div').filter({ hasText: /^alsaif@mawaridservices\.com$/ })).toBeVisible();
                await page.locator('dynamic-details').filter({ hasText: 'Close Start Pickup Assign' }).locator('button').click();

                // Comments Sub Action 
                await page.getByRole('link', { name: ' Comments' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

                // Notes Sub Action
                await page.getByRole('link', { name: ' Notes' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test Note');
                await page.getByRole('button', { name: 'Close' }).click({ timeout: 20000 });

                // Sent Approval Sub Action 
                await page.getByRole('link', { name: '魯 Send Approval' }).click();
                // SA Dropdown
                await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
                await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible({ timeout: 30000 });
                // SA Pagination
                await page.getByText('page 2').click();
                await expect(page.getByText('a.alangari@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 3').click();
                await page.getByText('page 4').click();
                await page.getByText('Next page').click();
                await page.getByText('Next page').click();
                await expect(page.getByText('a.alqahtani@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('Previous page').click();
                await page.getByText('Previous page').click();
                await page.getByText('page 1', { exact: true }).click();
                await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible();
                // Search By User Id 
                await page.getByRole('searchbox').first().click();
                await page.getByRole('searchbox').first().fill('hyder');
                await expect(page.getByRole('cell', { name: 'a.hyder' }).locator('div')).toBeVisible();
                await page.getByRole('searchbox').first().click();
                await page.getByRole('searchbox').first().fill('');
                // Search By Name
                await page.getByRole('searchbox').nth(1).click();
                await page.getByRole('searchbox').nth(1).fill('hyder');
                await expect(page.getByRole('cell', { name: 'Hyder Ali A' }).locator('div')).toBeVisible();
                await page.getByRole('searchbox').nth(1).click();
                await page.getByRole('searchbox').nth(1).fill('');
                // Search By Email 
                await page.getByRole('searchbox').nth(2).click();
                await page.getByRole('searchbox').nth(2).fill('hyder');
                await expect(page.getByText('hyder@faaztechsolutions.com')).toBeVisible();
                await page.getByText('hyder@faaztechsolutions.com').click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test comments');
                await page.getByRole('button', { name: 'Close' }).click();

                // Conversation Tab
                await expect(page.locator('b').filter({ hasText: 'alsaif@mawaridservices.com' })).toBeVisible();
                await expect(page.getByText('Dear Customer')).toBeVisible();
                await expect(page.getByText('Ticket Information')).toBeVisible();
                await expect(page.getByText('Ticket ID : MWD0017196')).toBeVisible();
                await expect(page.getByText('Title : Automation test')).toBeVisible();
                await expect(page.locator('#commentscollapse_3').getByText('Automation test ticket Don\'t')).toBeVisible();
                // Reply 
                await page.getByRole('link', { name: ' Reply' }).first().click();
                await expect(page.locator('#Actionform_EFN0000234').getByText('Reply', { exact: true })).toBeVisible();
                await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
                await expect(page.getByPlaceholder('Bcc')).toBeVisible();
                await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
                await expect(page.getByText('Files')).toBeVisible();
                await expect(page.locator('#file_Files')).toBeVisible();
                await page.locator('#Actionform_EFN0000234').getByText('Close').click();
                // Forward
                await page.getByRole('link', { name: ' Forward' }).first().click();
                await expect(page.locator('#Actionform_EFN0000235').getByText('Forward')).toBeVisible({ timeout: 20000 });
                await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
                await expect(page.locator('#CcRecipients div').nth(1)).toBeVisible();
                await expect(page.locator('#BccRecipients div').nth(1)).toBeVisible();
                await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
                await expect(page.getByText('Thanks & RegardsHyder Ali,')).toBeVisible();
                await expect(page.locator('#Actionform_EFN0000235 dynamic-view div').filter({ hasText: 'Files Drag and drop a file or' }).nth(1)).toBeVisible();
                await page.locator('#Actionform_EFN0000235').getByText('Close').click();

                // Ticket Tab
                await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
                await expect(page.getByText('Request Id')).toBeVisible();
                await expect(page.getByText('Title', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
                await expect(page.getByText('Ticket Category')).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Assigned To  ' })).toBeVisible();
                await expect(page.getByText('Ticket Type')).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Scheduled Date  ' })).toBeVisible();
                await expect(page.getByText('Duration').first()).toBeVisible();
                await expect(page.getByText('Description').nth(1)).toBeVisible();

                // Approval Tab
                await page.locator('[id^="cdk-drop-list"] a').filter({ hasText: 'Approvals' }).click();
                await expect(page.getByText('Approver Id')).toBeVisible();
                await expect(page.getByText('Approver', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();
                await expect(page.getByText('Approval Comments')).toBeVisible();

                // Attachment Tab 
                await attachmentTab(page);

                // Status History Tab  
                await page.locator('a').filter({ hasText: 'Status History' }).click();
                await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
                await expect(page.getByText('System Comments')).toBeVisible();
                await expect(page.locator('#dynamic_list_EFN0000382').getByText('MWD0017196')).toBeVisible();
                await expect(page.getByRole('table').getByText('Scheduled', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: 'Status Change form New to' }).locator('comp-datatype')).toBeVisible();

                // close the Ticket details page 
                await page.getByLabel('Close').locator('i').click();

                // Clear the filters 
                await expect(page.getByRole('textbox').nth(3)).toHaveValue('MWD0017196');
                await page.getByRole('button', { name: ' Clear' }).click();
                await expect(page.locator('#dynamic_list_EFN0000238').getByRole('textbox')).toBeEmpty();
                await page.locator('#tabView_2 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > div > div > .card-header > .Right > .d-flex > i').first().click();
            });

            test('InProgress:should filter, select, and validate requests', async ({ page }) => {
                // My Team Menu Navigation
                await page.locator('#MNU0000082').click();

                // Sub menu Navigation
                await page.getByRole('link', { name: ' My Tickets' }).click();

                // Go to InProgress tab
                await page.locator('[id^="cdk-drop-list"] a', { hasText: 'InProgress' }).click();
                await expect(page.getByText('InProgress Tickets')).toBeVisible({ timeout: 20000 });
                await expect(page.getByRole('spinbutton')).toHaveValue('1');

                // Options and Export
                await performOptionExport(page);

                // Filter By Id 
                await page.locator('#tabView_3 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > div > div > .card-header > .Right > .d-flex > i').first().click();
                await page.locator('#dynamic_list_EFN0000239').getByRole('textbox').click();
                await page.getByRole('option', { name: 'Ticket ID' }).click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('MWD0017197');
                await page.getByRole('textbox').nth(3).press('Enter');
                await expect(page.locator('a').filter({ hasText: 'MWD0017197' })).toBeVisible();
                await expect(page.locator('comp-field-view-type').filter({ hasText: 'Automation test ticket Don\'t Take Any Actions - InProgress.' }).locator('a')).toBeVisible();

                // Go to Ticket details
                await page.locator('comp-field-view-type').filter({ hasText: 'Automation test ticket Don\'t Take Any Actions - InProgress.' }).locator('a').click();
                await expect(page.getByRole('heading', { name: '[MWD0017197] Automation test' })).toBeVisible({ timeout: 30000 });
                await expect(page.locator('dynamic-details form div').filter({ hasText: 'Ticket ID MWD0017197 Subject' }).nth(1)).toBeVisible({ timeout: 30000 });
                await expect(page.locator('dynamic-details form div').filter({ hasText: 'Category Channel Email' }).nth(1)).toBeVisible();

                // Close Action
                await performCloseAction(page);

                // Pickup Action
                await performPickupAction(page);

                // Assign Action 
                await AssignActionForAssignedTickets(page);

                // Ticket Action 
                await performTicketAction(page);

                // Attach Action 
                await performAttachmentAction(page);

                // Customer Details 
                await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0017197 Subject' }).locator('a').click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Customer Details')).toBeVisible({ timeout: 20000 });
                await expect(page.getByText('CBN0001030', { exact: true })).toBeVisible();
                await expect(page.locator('div').filter({ hasText: /^alsaif@mawaridservices\.com$/ })).toBeVisible();
                await page.locator('dynamic-details').filter({ hasText: 'Close Pickup Assign Ticket' }).locator('button').click();

                // Comments Sub Action 
                await page.getByRole('link', { name: ' Comments' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click({ timeout: 20000 });
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

                // Notes Sub Action
                await page.getByRole('link', { name: ' Notes' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test Note');
                await page.getByRole('button', { name: 'Close' }).click();

                // Sent Approval Sub Action 
                await page.getByRole('link', { name: '魯 Send Approval' }).click({ timeout: 20000 });
                // SA Dropdown
                await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
                await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible({ timeout: 30000 });
                // SA Pagination
                await page.getByText('page 2').click();
                await expect(page.getByText('a.alangari@mawarid.com.sa').first()).toBeVisible();
                await page.getByLabel('Pagination').getByText('3', { exact: true }).click();
                await page.getByText('page 4').click();
                await page.getByText('Next page').click();
                await page.getByText('Next page').click();
                await expect(page.getByText('a.alqahtani@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('Previous page').click();
                await page.getByText('Previous page').click();
                await page.getByText('page 1', { exact: true }).click();
                await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible();
                // Search By User Id 
                await page.getByRole('searchbox').first().click({ timeout: 20000 });
                await page.getByRole('searchbox').first().fill('hyder');
                await expect(page.getByRole('cell', { name: 'a.hyder' }).locator('div')).toBeVisible();
                await page.getByRole('searchbox').first().click();
                await page.getByRole('searchbox').first().fill('');
                // Search By Name
                await page.getByRole('searchbox').nth(1).click();
                await page.getByRole('searchbox').nth(1).fill('hyder');
                await expect(page.getByRole('cell', { name: 'Hyder Ali A' }).locator('div')).toBeVisible();
                await page.getByRole('searchbox').nth(1).click();
                await page.getByRole('searchbox').nth(1).fill('');
                // Search By Email 
                await page.getByRole('searchbox').nth(2).click();
                await page.getByRole('searchbox').nth(2).fill('hyder');
                await expect(page.getByText('hyder@faaztechsolutions.com')).toBeVisible();
                await page.getByText('hyder@faaztechsolutions.com').click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test comments');
                await page.getByRole('button', { name: 'Close' }).click();

                // Conversation Tab
                await expect(page.locator('b').filter({ hasText: 'alsaif@mawaridservices.com' })).toBeVisible();
                await expect(page.getByText('Dear Customer')).toBeVisible();
                await expect(page.getByText('Ticket Information')).toBeVisible();
                await expect(page.getByText('Ticket ID : MWD0017197')).toBeVisible();
                await expect(page.getByText('Title : Automation test')).toBeVisible();
                await expect(page.locator('#commentscollapse_3').getByText('Automation test ticket Don\'t')).toBeVisible();
                // Reply 
                await page.getByRole('link', { name: ' Reply' }).first().click();
                await expect(page.locator('#Actionform_EFN0000234').getByText('Reply', { exact: true })).toBeVisible();
                await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
                await expect(page.getByPlaceholder('Bcc')).toBeVisible();
                await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
                await expect(page.getByText('Files')).toBeVisible();
                await expect(page.locator('#file_Files')).toBeVisible();
                await page.locator('#Actionform_EFN0000234').getByText('Close').click();
                // Forward
                await page.getByRole('link', { name: ' Forward' }).first().click();
                await expect(page.locator('#Actionform_EFN0000235').getByText('Forward')).toBeVisible({ timeout: 20000 });
                await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
                await expect(page.locator('#CcRecipients div').nth(1)).toBeVisible();
                await expect(page.locator('#BccRecipients div').nth(1)).toBeVisible();
                await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
                await expect(page.getByText('Thanks & RegardsHyder Ali,')).toBeVisible();
                await expect(page.locator('#Actionform_EFN0000235 dynamic-view div').filter({ hasText: 'Files Drag and drop a file or' }).nth(1)).toBeVisible();
                await page.locator('#Actionform_EFN0000235').getByText('Close').click();

                // Ticket Tab
                await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click({ timeout: 20000 });
                await expect(page.getByText('Request Id')).toBeVisible();
                await expect(page.getByText('Title', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
                await expect(page.getByText('Ticket Category')).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Assigned To  ' })).toBeVisible();
                await expect(page.getByText('Ticket Type')).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Scheduled Date  ' })).toBeVisible();
                await expect(page.getByText('Duration').first()).toBeVisible();
                await expect(page.getByText('Description').nth(1)).toBeVisible();

                // Approval Tab
                await page.locator('[id^="cdk-drop-list"] a').filter({ hasText: 'Approvals' }).click();
                await expect(page.getByText('Approver Id')).toBeVisible();
                await expect(page.getByText('Approver', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();
                await expect(page.getByText('Approval Comments')).toBeVisible();

                // Attachment Tab 
                await attachmentTab(page)

                // Status History Tab  
                await page.locator('a').filter({ hasText: 'Status History' }).click();
                await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
                await expect(page.getByText('System Comments')).toBeVisible();
                await expect(page.locator('#dynamic_list_EFN0000382').getByText('MWD0017197').nth(0)).toBeVisible();
                // Scheduled status verification
                await expect(page.getByRole('table').getByText('Scheduled', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: 'Status Change form New to' }).locator('comp-datatype')).toBeVisible();
                // InProgress status verification 
                await expect(page.getByText('MWD0017197', { exact: true }).nth(4)).toBeVisible();
                await expect(page.getByRole('table').getByText('InProgress', { exact: true })).toBeVisible();

                // close the Ticket details page 
                await page.getByLabel('Close').locator('i').click();

                // Clear the filters 
                await expect(page.getByRole('textbox').nth(3)).toHaveValue('MWD0017197');
                await page.getByRole('button', { name: ' Clear' }).click();
                await expect(page.locator('#dynamic_list_EFN0000239').getByRole('textbox')).toBeEmpty();
                await page.locator('#tabView_3 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > div > div > .card-header > .Right > .d-flex > i').first().click();
            });

            test('Closed-workflow:should filter, select, and validate requests', async ({ page }) => {
                // My Team Menu Navigation
                await page.locator('#MNU0000082').click();

                // Sub menu Navigation
                await page.getByRole('link', { name: ' My Tickets' }).click();

                // Go to Closed tab
                await page.locator('[id^="cdk-drop-list"] a', { hasText: 'Closed' }).click();
                await expect(page.getByText('Closed Tickets', { exact: true })).toBeVisible({ timeout: 20000 });
                await expect(page.getByRole('spinbutton')).toHaveValue('1');
                await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(2).click({ timeout: 10000 });
                await expect(page.getByRole('spinbutton')).toHaveValue('2');
                await page.getByRole('list').filter({ hasText: /of3/i }).locator('a').first().click();
                await expect(page.getByRole('spinbutton')).toHaveValue('1');

                // Options and Export 
                await performOptionExport(page);

                // Filter By Id 
                await page.locator('#tabView_4 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > div > div > .card-header > .Right > .d-flex > i').first().click();
                await page.locator('#dynamic_list_EFN0000240').getByRole('textbox').click();
                await page.getByText('Ticket ID').click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('MWD0016530');
                await page.getByRole('button', { name: ' Search' }).click();
                await expect(page.locator('comp-field-view-type').filter({ hasText: 'Test Mail From Dev Mobile -' }).locator('a')).toBeVisible();
                await expect(page.locator('a').filter({ hasText: 'MWD0016530' })).toBeVisible();

                // Go to Ticket details
                await page.locator('comp-field-view-type').filter({ hasText: 'Test Mail From Dev Mobile -' }).locator('a').click();
                await expect(page.getByRole('heading', { name: '[MWD0016530] Test Mail From' })).toBeVisible({ timeout: 30000 });
                await expect(page.getByText('Ticket ID MWD0016530 Subject')).toBeVisible({ timeout: 20000 });
                await expect(page.locator('dynamic-details form div').filter({ hasText: 'Category Channel Assigned To' }).nth(1)).toBeVisible();

                // Reopen Action Verification
                await page.getByRole('link', { name: 'Re Open' }).click();
                await expect(page.locator('#Actionform_EFN0000020').getByText('ReOpen')).toBeVisible();
                await expect(page.getByPlaceholder('Comments')).toHaveValue('Test closed comment');
                await page.getByText('Close', { exact: true }).click();

                // Pickup Action
                await performPickupAction(page);

                // Assign Action
                await AssignActionForAssignedTickets(page);

                // Ticket Action 
                await performTicketAction(page);

                // Attach Action 
                await performAttachmentAction(page);

                // Customer Details 
                await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0016530 Subject' }).locator('a').click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Customer Details')).toBeVisible();
                await expect(page.getByText('CBN0001030', { exact: true })).toBeVisible();
                await expect(page.locator('div').filter({ hasText: /^alsaif@mawaridservices\.com$/ })).toBeVisible();
                await page.locator('dynamic-details').filter({ hasText: 'Re Open Pickup Assign Ticket' }).locator('button').click();

                // Conversation Tab
                await expect(page.locator('b').filter({ hasText: 'alsaif@mawaridservices.com' })).toBeVisible();
                await expect(page.getByRole('listitem').filter({ hasText: 'HHyder Ali A Assigned To' })).toBeVisible();
                await expect(page.locator('div').filter({ hasText: /^Krishna$/ })).toBeVisible();
                await expect(page.getByText('@Krishna @Mohamed Afrith @Ajeesh Nasar Sheik Ismail')).toBeVisible();
                await expect(page.locator('#dynamic_list_EFN0000012').getByRole('list').locator('div').filter({ hasText: 'alsaif@mawaridservices.comTo' }).nth(1)).toBeVisible();
                await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('Test');

                // Reply 
                await page.getByRole('link', { name: ' Reply' }).first().click({ timeout: 20000 });
                await expect(page.locator('#Actionform_EFN0000234').getByText('Reply', { exact: true })).toBeVisible({ timeout: 20000 });
                await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
                await expect(page.getByPlaceholder('Bcc')).toBeVisible();
                await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
                await expect(page.getByText('Files')).toBeVisible();
                await expect(page.locator('#file_Files')).toBeVisible();
                await page.locator('#Actionform_EFN0000234').getByText('Close').click();
                // Forward
                await page.getByRole('link', { name: ' Forward' }).first().click();
                await expect(page.locator('#Actionform_EFN0000235').getByText('Forward')).toBeVisible({ timeout: 30000 });
                await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
                await expect(page.locator('#CcRecipients div').nth(1)).toBeVisible();
                await expect(page.locator('#BccRecipients div').nth(1)).toBeVisible();
                await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
                await expect(page.getByText('Thanks & RegardsHyder Ali,').nth(1)).toBeVisible();
                await expect(page.locator('#Actionform_EFN0000235 dynamic-view div').filter({ hasText: 'Files Drag and drop a file or' }).nth(1)).toBeVisible();
                await page.locator('#Actionform_EFN0000235').getByText('Close').click();

                // Ticket Tab
                await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
                await expect(page.getByText('Request Id')).toBeVisible();
                await expect(page.getByText('Title', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
                await expect(page.getByText('Ticket Category')).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Assigned To  ' })).toBeVisible();
                await expect(page.getByText('Ticket Type')).toBeVisible({ timeout: 20000 });
                await expect(page.getByText('Duration').first()).toBeVisible({ timeout: 20000 });
                await expect(page.getByText('Description').nth(1)).toBeVisible({ timeout: 20000 });

                // Approval Tab
                await page.locator('[id^="cdk-drop-list"] a').filter({ hasText: 'Approvals' }).click();
                await expect(page.getByText('Approver Id')).toBeVisible();
                await expect(page.getByText('Approver', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();
                await expect(page.getByText('Approval Comments')).toBeVisible();

                // Attachment Tab 
                await attachmentTab(page);

                // Status History Tab  
                await page.locator('a').filter({ hasText: 'Status History' }).click({ timeout: 20000 });
                await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible({ timeout: 20000 });
                await expect(page.locator('#dynamic_list_EFN0000382').getByText('MWD0016530')).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
                await expect(page.getByRole('table').getByText('Closed', { exact: true })).toBeVisible();

                // close the Ticket details page 
                await page.getByLabel('Close').locator('i').click();

                // Clear the filters 
                await expect(page.getByRole('textbox').nth(3)).toHaveValue('MWD0016530');
                await page.getByRole('button', { name: ' Clear' }).click();
                await expect(page.locator('#dynamic_list_EFN0000240').getByRole('textbox')).toBeEmpty();
                await page.locator('#tabView_4 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > div > div > .card-header > .Right > .d-flex > i').first().click();
            });

            test('Reopen-workflow:should filter, select, and validate requests', async ({ page }) => {
                // My Team Menu Navigation
                await page.locator('#MNU0000082').click();

                // Sub menu Navigation
                await page.getByRole('link', { name: ' My Tickets' }).click();

                // Go to Reopen tab
                await page.locator('a').filter({ hasText: 'ReOpen' }).nth(1).click();
                await expect(page.getByText('ReOpen Tickets')).toBeVisible({ timeout: 20000 });
                await expect(page.getByRole('spinbutton')).toHaveValue('1');
                await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(2).click();
                await expect(page.getByRole('spinbutton')).toHaveValue('2');
                await page.getByRole('list').filter({ hasText: /of/i }).locator('a').first().click();
                await expect(page.getByRole('spinbutton')).toHaveValue('1');

                // Options and Export
                await performOptionExport(page);

                // Filter By Id
                await page.locator('#tabView_5 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > div > div > .card-header > .Right > .d-flex > i').first().click();
                await page.locator('#dynamic_list_EFN0000241').getByRole('textbox').click();
                await page.getByText('Ticket ID').click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('MWD0017198');
                await page.getByRole('textbox').nth(3).press('Enter');
                await expect(page.locator('comp-field-view-type').filter({ hasText: 'Automation test ticket Don\'t Take Any Actions - Reopen' }).locator('a')).toBeVisible();
                await expect(page.locator('a').filter({ hasText: 'MWD0017198' })).toBeVisible();
                await expect(page.locator('#dynamic_list_EFN0000241').getByText('ReOpen', { exact: true })).toBeVisible();

                // Go to Ticket details 
                await page.locator('comp-field-view-type').filter({ hasText: 'Automation test ticket Don\'t Take Any Actions - Reopen' }).locator('a').click();
                await expect(page.getByRole('heading', { name: '[MWD0017198] Automation test' })).toBeVisible({ timeout: 20000 });
                await expect(page.getByText('Ticket ID MWD0017198 Subject')).toBeVisible({ timeout: 20000 });
                await expect(page.locator('dynamic-details form div').filter({ hasText: 'Category Channel Email' }).nth(1)).toBeVisible();

                // Close Action 
                await performCloseAction(page);

                // Pickup Action 
                await performPickupAction(page);

                // Assign Action 
                await AssignActionForAssignedTickets(page);

                // Ticket Action 
                await performTicketAction(page);

                // Attach Action 
                await performAttachmentAction(page);

                // Comments Sub Action 
                await page.getByRole('link', { name: ' Comments' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

                // Notes Sub Action
                await page.getByRole('link', { name: ' Notes' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test Note');
                await page.getByRole('button', { name: 'Close' }).click();

                // Sent Approval Sub Action 
                await page.getByRole('link', { name: '魯 Send Approval' }).click();
                // SA Dropdown
                await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
                await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible();
                // SA Pagination
                await page.getByText('page 2').click();
                await expect(page.getByText('a.alangari@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 3').click();
                await page.getByText('page 4').click();
                await page.getByText('Next page').click();
                await page.getByText('Next page').click();
                await expect(page.getByText('a.alqahtani@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('Previous page').click();
                await page.getByText('Previous page').click();
                await page.getByText('page 1', { exact: true }).click();
                await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible();
                // Search By User Id 
                await page.getByRole('searchbox').first().click();
                await page.getByRole('searchbox').first().fill('hyder');
                await expect(page.getByRole('cell', { name: 'a.hyder' }).locator('div')).toBeVisible({ timeout: 20000 });
                await page.getByRole('searchbox').first().click();
                await page.getByRole('searchbox').first().fill('');
                // Search By Name
                await page.getByRole('searchbox').nth(1).click();
                await page.getByRole('searchbox').nth(1).fill('hyder');
                await expect(page.getByRole('cell', { name: 'Hyder Ali A' }).locator('div')).toBeVisible();
                await page.getByRole('searchbox').nth(1).click();
                await page.getByRole('searchbox').nth(1).fill('');
                // Search By Email 
                await page.getByRole('searchbox').nth(2).click();
                await page.getByRole('searchbox').nth(2).fill('hyder');
                await expect(page.getByText('hyder@faaztechsolutions.com')).toBeVisible();
                await page.getByText('hyder@faaztechsolutions.com').click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test comments');
                await page.getByRole('button', { name: 'Close' }).click();

                // Conversation Tab
                await expect(page.locator('b').filter({ hasText: 'alsaif@mawaridservices.com' }).nth(1)).toBeVisible();
                await expect(page.getByText('Dear Customer').nth(0)).toBeVisible();
                await expect(page.locator('#commentscollapse_0').getByText('Ticket Information')).toBeVisible();
                await expect(page.locator('#commentscollapse_0').getByText('Ticket ID : MWD0017198')).toBeVisible();
                await expect(page.locator('#commentscollapse_0').getByText('Title : Automation test')).toBeVisible();
                await expect(page.locator('#commentscollapse_7').getByText('Automation test ticket Don\'t')).toBeVisible();
                // Reply 
                await page.getByRole('link', { name: ' Reply' }).first().click();
                await expect(page.locator('#Actionform_EFN0000234').getByText('Reply', { exact: true })).toBeVisible();
                await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
                await expect(page.locator('#CcRecipients div').nth(1)).toBeVisible();
                await expect(page.getByPlaceholder('Bcc')).toBeVisible();
                await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
                await expect(page.getByText('Files')).toBeVisible();
                await expect(page.locator('#file_Files')).toBeVisible();
                await page.locator('#Actionform_EFN0000234').getByText('Close').click();
                // Forward
                await page.getByRole('link', { name: ' Forward' }).first().click();
                await expect(page.locator('#Actionform_EFN0000235').getByText('Forward')).toBeVisible();
                await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
                await expect(page.locator('#CcRecipients div').nth(1)).toBeVisible();
                await expect(page.locator('#BccRecipients div').nth(1)).toBeVisible();
                await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
                await expect(page.getByText('Thanks & RegardsHyder Ali,')).toBeVisible();
                await expect(page.locator('#Actionform_EFN0000235 dynamic-view div').filter({ hasText: 'Files Drag and drop a file or' }).nth(1)).toBeVisible();
                await page.locator('#Actionform_EFN0000235').getByText('Close').click();

                // Ticket Tab
                await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
                await expect(page.getByText('Request Id')).toBeVisible();
                await expect(page.getByText('Title', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
                await expect(page.getByText('Ticket Category')).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Assigned To  ' })).toBeVisible();
                await expect(page.getByText('Ticket Type')).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Scheduled Date  ' })).toBeVisible();
                await expect(page.getByText('Duration').first()).toBeVisible();
                await expect(page.getByText('Description').nth(1)).toBeVisible();

                // Approval Tab
                await page.locator('[id^="cdk-drop-list-"] a', { hasText: 'Approvals' }).click();
                await expect(page.getByText('Approver Id')).toBeVisible();
                await expect(page.getByText('Approver', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();
                await expect(page.getByText('Approval Comments')).toBeVisible();

                // Attachment Tab 
                await attachmentTab(page);

                // Status History Tab 
                await page.locator('a').filter({ hasText: 'Status History' }).click();
                await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();

                // close the Ticket details page 
                await page.getByLabel('Close').locator('i').click();

                // Clear the filters 

                await expect(page.getByRole('textbox').nth(3)).toHaveValue('MWD0017198');
                await page.getByRole('button', { name: ' Clear' }).click();
                await expect(page.locator('#dynamic_list_EFN0000241').getByRole('textbox')).toBeEmpty();
                await page.locator('#tabView_5 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > div > div > .card-header > .Right > .d-flex > i').first().click();
            });

            test('All-workflow:should filter, select, and validate requests', async ({ page }) => {
                // My Team Menu Navigation
                await page.locator('#MNU0000082').click();

                // Sub menu Navigation
                await page.getByRole('link', { name: ' My Tickets' }).click();

                // List Title & Pagination
                await page.locator('#cdk-drop-list-0').getByRole('listitem').filter({ hasText: 'All' }).locator('a').click();
                await expect(page.locator('#tabView_6').getByText('All Tickets')).toBeVisible({ timeout: 20000 });
                await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(2).click();
                await expect(page.getByRole('spinbutton')).toHaveValue('2');
                await page.getByRole('list').filter({ hasText: /of23/i }).locator('a').nth(2).click();
                await expect(page.getByRole('spinbutton')).toHaveValue('3');
                await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(2).click();
                await expect(page.getByRole('spinbutton')).toHaveValue('4');
                await page.getByRole('list').filter({ hasText: /of23/i }).locator('a').nth(2).click();
                await expect(page.getByRole('spinbutton')).toHaveValue('5');
                await page.getByRole('list').filter({ hasText: /of23/i }).locator('a').nth(1).click();
                await expect(page.getByRole('spinbutton')).toHaveValue('4');
                await page.getByRole('list').filter({ hasText: /of23/i }).locator('a').nth(1).click();
                await expect(page.getByRole('spinbutton')).toHaveValue('3');
                await page.getByRole('list').filter({ hasText: /of23/i }).locator('a').first().click();
                await expect(page.getByRole('spinbutton')).toHaveValue('1');

                // My Tickets: Options and Export
                await performOptionExport(page);

                // My Tickets: Filter by Ticket Id
                await page.locator('#tabView_6 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > .position-relative > div > .card-header > .Right > .d-flex > i').first().click();
                await page.locator('#dynamic_list_EFN0000244').getByRole('textbox').click();
                await page.getByText('Ticket ID').click();
                await page.getByRole('textbox').nth(3).click();
                await page.getByRole('textbox').nth(3).fill('MWD0017195');
                await page.getByRole('textbox').nth(3).press('Enter');

                // My Tickets: Open Ticket Details
                await page.locator('#dynamic_list_EFN0000244 comp-field-view-type').filter({ hasText: 'Automation test ticket Don\'t' }).locator('a').nth(0).click();
                await expect(page.getByRole('heading', { name: '[MWD0017195] Automation test' })).toBeVisible({ timeout: 20000 });

                // Ticket Details: Schedule Action
                await scheduleHelper(page);

                // Close Action 
                await performCloseAction(page);

                // Pickup Action 
                await performPickupAction(page);

                // Assign Action 
                await performAssignAction(page);

                // Ticket Action 
                await performTicketAction(page);

                // Attach Action 
                await performAttachmentAction(page);

                // Ticket Details data
                await expect(page.getByText('Ticket ID MWD0017195 Subject')).toBeVisible();

                // Customer Details 
                await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0017195 Subject' }).locator('a').click();
                await expect(page.getByText('Details', { exact: true })).toBeVisible();
                await expect(page.getByText('Customer Details')).toBeVisible();
                await expect(page.getByText('CBN0001030', { exact: true })).toBeVisible();
                await expect(page.locator('div').filter({ hasText: /^alsaif@mawaridservices\.com$/ })).toBeVisible();
                await page.locator('dynamic-details').filter({ hasText: 'Schedule Close Pickup Assign' }).locator('button').click();

                // Comments Sub Action 
                await page.getByRole('link', { name: ' Comments' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

                // Notes Sub Action
                await page.getByRole('link', { name: ' Notes' }).click();
                await page.locator('#angular_editor_ETN0000007_Notes').getByText('Type here...').click();
                await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test notes');
                await page.getByRole('button', { name: 'Close' }).click();

                // Sent Approval Sub Action 
                await page.getByRole('link', { name: '魯 Send Approval' }).click();
                // SA Dropdown
                await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
                await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible({ timeout: 20000 });
                // SA Pagination
                await page.getByText('page 2').click();
                await expect(page.getByText('a.alangari@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('page 3').click();
                await page.getByText('page 4').click();
                await page.getByText('Next page').click();
                await page.getByText('Next page').click();
                await expect(page.getByText('a.alqahtani@mawarid.com.sa').first()).toBeVisible();
                await page.getByText('Previous page').click();
                await page.getByText('Previous page').click();
                await page.getByText('page 1', { exact: true }).click();
                await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible();
                // Search By User Id 
                await page.getByRole('searchbox').first().click();
                await page.getByRole('searchbox').first().fill('hyder');
                await expect(page.getByText('a.hyder')).toBeVisible();
                await page.getByRole('searchbox').first().click();
                await page.getByRole('searchbox').first().fill('');
                // Search By Name
                await page.getByRole('searchbox').nth(1).click();
                await page.getByRole('searchbox').nth(1).fill('hyder');
                await expect(page.getByRole('cell', { name: 'Hyder Ali A' }).locator('div')).toBeVisible();
                await page.getByRole('searchbox').nth(1).click();
                await page.getByRole('searchbox').nth(1).fill('');
                // Search By Email 
                await page.getByRole('searchbox').nth(2).click();
                await page.getByRole('searchbox').nth(2).fill('hyder');
                await expect(page.getByText('hyder@faaztechsolutions.com')).toBeVisible();
                await page.getByText('hyder@faaztechsolutions.com').click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
                await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test comments');
                await page.getByRole('button', { name: 'Close' }).click();

                // Conversation Tab
                await expect(page.locator('b').filter({ hasText: 'alsaif@mawaridservices.com' })).toBeVisible();
                await expect(page.getByText('Dear Customer')).toBeVisible();
                await expect(page.getByText('Ticket Information')).toBeVisible();
                await expect(page.getByText('Ticket ID : MWD0017195')).toBeVisible();
                await expect(page.getByText('Title : Automation test')).toBeVisible();
                await expect(page.locator('#commentscollapse_1').getByText('Automation test ticket Don\'t')).toBeVisible();
                // Reply 
                await page.getByRole('link', { name: ' Reply' }).first().click();
                await expect(page.locator('#Actionform_EFN0000234').getByText('Reply', { exact: true })).toBeVisible();
                await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
                await expect(page.locator('#CcRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
                await expect(page.getByPlaceholder('Bcc')).toBeVisible();
                await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
                await expect(page.getByText('Files')).toBeVisible();
                await expect(page.locator('#file_Files')).toBeVisible();
                await page.locator('#Actionform_EFN0000234').getByText('Close').click();
                // Forward
                await page.getByRole('link', { name: ' Forward' }).first().click();
                await expect(page.locator('#Actionform_EFN0000235').getByText('Forward')).toBeVisible();
                await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
                await expect(page.getByPlaceholder('Add a CC')).toBeVisible();
                await expect(page.locator('#BccRecipients div').nth(1)).toBeVisible();
                await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
                await expect(page.getByText('Thanks & RegardsHyder Ali,')).toBeVisible();
                await expect(page.locator('#Actionform_EFN0000235 dynamic-view div').filter({ hasText: 'Files Drag and drop a file or' }).nth(1)).toBeVisible();
                await page.locator('#Actionform_EFN0000235').getByText('Close').click();

                // Ticket Tab
                await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
                await expect(page.getByText('Request Id')).toBeVisible();
                await expect(page.getByText('Title', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
                await expect(page.getByText('Ticket Category')).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Assigned To  ' })).toBeVisible();
                await expect(page.getByText('Ticket Type')).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Scheduled Date  ' })).toBeVisible();
                await expect(page.getByText('Duration').first()).toBeVisible();
                await expect(page.getByText('Description').nth(1)).toBeVisible();

                // Approval Tab
                await page.locator('#cdk-drop-list-3 a').filter({ hasText: 'Approvals' }).click();
                await expect(page.getByText('Approver Id')).toBeVisible();
                await expect(page.getByText('Approver', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();
                await expect(page.getByText('Approval Comments')).toBeVisible();

                // Attachment Tab 
                await attachmentTab(page);

                // Status History Tab 
                await page.locator('a').filter({ hasText: 'Status History' }).click();
                await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
                await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();

                // close the Ticket details page 
                await page.getByLabel('Close').locator('i').click();

                // Clear the filters 
                await expect(page.getByRole('textbox').nth(3)).toHaveValue('MWD0017195');
                await page.getByRole('button', { name: ' Clear' }).click();
                await expect(page.locator('#dynamic_list_EFN0000244').getByRole('textbox')).toBeEmpty({ timeout: 20000 });
                await page.locator('#tabView_6 > div > page-controller > .content-box > .content-view > .content-add > .inner_flex > div > div > app-dynamic-list > .content > .container-fluid > .position-relative > div > .card-header > .Right > .d-flex > i').first().click();
            });
        });


        test('Unassigned Tickets:should filter, select, and validate requests', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000082').click();
            // Unassigned Tickets Menu Navigation
            await page.getByRole('link', { name: ' Unassigned Tickets' }).click();
            await expect(page.locator('section').getByText('Unassigned Tickets')).toBeVisible({ timeout: 20000 });

            // Unassigned Tickets: Options and Export
            await performOptionExport(page);

            // Unassigned Tickets: Pagination 
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Unassigned Tickets: Filter by Ticket Id
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000245').getByRole('textbox').click();
            await page.getByText('Ticket ID').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('MWD0017195');
            await page.getByRole('textbox').nth(3).press('Enter');

            // My Tickets: Open Ticket Details
            await expect(page.getByText('MWD0017195')).toBeVisible();
            await page.locator('comp-field-view-type').filter({ hasText: 'Automation test ticket Don\'t' }).locator('a').click();
            await expect(page.getByRole('heading', { name: '[MWD0017195] Automation test' })).toBeVisible({ timeout: 30000 });

            // Ticket Details: Schedule Action
            await scheduleHelper(page);

            // Close Action 
            await performCloseAction(page);

            // Pickup Action 
            await performPickupAction(page);

            // Assign Action 
            await performAssignAction(page);

            // Ticket Action 
            await performTicketAction(page);

            // Attach Action 
            await performAttachmentAction(page);

            // Ticket Details data
            await expect(page.getByText('Ticket ID MWD0017195 Subject')).toBeVisible();

            // Customer Details 
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0017195 Subject' }).locator('a').click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Customer Details')).toBeVisible({ timeout: 20000 });
            await expect(page.getByText('CBN0001030', { exact: true })).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /^alsaif@mawaridservices\.com$/ })).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Schedule Close Pickup Assign' }).locator('button').click();

            // Comments Sub Action 
            await page.getByRole('link', { name: ' Comments' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

            // Notes Sub Action
            await page.getByRole('link', { name: ' Notes' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test notes');
            await page.getByRole('button', { name: 'Close' }).click();

            // Sent Approval Sub Action 
            await page.getByRole('link', { name: '魯 Send Approval' }).click();
            // SA Dropdown
            await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
            await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible({ timeout: 20000 });
            // SA Pagination
            await page.getByText('page 2').click();
            await expect(page.getByText('a.alangari@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('page 3').click();
            await page.getByText('page 4').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await expect(page.getByText('a.alqahtani@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1', { exact: true }).click();
            await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible();
            // Search By User Id 
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('hyder');
            await expect(page.getByText('a.hyder')).toBeVisible();
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('');
            // Search By Name
            await page.getByRole('searchbox').nth(1).click();
            await page.getByRole('searchbox').nth(1).fill('hyder');
            await expect(page.getByRole('cell', { name: 'Hyder Ali A' }).locator('div')).toBeVisible();
            await page.getByRole('searchbox').nth(1).click();
            await page.getByRole('searchbox').nth(1).fill('');
            // Search By Email 
            await page.getByRole('searchbox').nth(2).click();
            await page.getByRole('searchbox').nth(2).fill('hyder');
            await expect(page.getByText('hyder@faaztechsolutions.com')).toBeVisible();
            await page.getByText('hyder@faaztechsolutions.com').click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test comments');
            await page.getByRole('button', { name: 'Close' }).click();

            // Conversation Tab
            await expect(page.locator('b').filter({ hasText: 'alsaif@mawaridservices.com' })).toBeVisible();
            await expect(page.getByText('Dear Customer')).toBeVisible();
            await expect(page.getByText('Ticket Information')).toBeVisible();
            await expect(page.getByText('Ticket ID : MWD0017195')).toBeVisible();
            await expect(page.getByText('Title : Automation test')).toBeVisible();
            await expect(page.locator('#commentscollapse_1').getByText('Automation test ticket Don\'t')).toBeVisible();
            // Reply 
            await page.getByRole('link', { name: ' Reply' }).first().click();
            await expect(page.locator('#Actionform_EFN0000234').getByText('Reply', { exact: true })).toBeVisible({ timeout: 20000 });
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.locator('#CcRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.getByPlaceholder('Bcc')).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Files')).toBeVisible();
            await expect(page.locator('#file_Files')).toBeVisible();
            await page.locator('#Actionform_EFN0000234').getByText('Close').click();
            // Forward
            await page.getByRole('link', { name: ' Forward' }).first().click();
            await expect(page.locator('#Actionform_EFN0000235').getByText('Forward')).toBeVisible();
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.getByPlaceholder('Add a CC')).toBeVisible();
            await expect(page.locator('#BccRecipients div').nth(1)).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Thanks & RegardsHyder Ali,')).toBeVisible({ timeout: 30000 });
            await expect(page.locator('#Actionform_EFN0000235 dynamic-view div').filter({ hasText: 'Files Drag and drop a file or' }).nth(1)).toBeVisible();
            await page.locator('#Actionform_EFN0000235').getByText('Close').click();

            // Ticket Tab
            await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
            await expect(page.getByText('Request Id')).toBeVisible();
            await expect(page.getByText('Title', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' }).locator('a')).toBeVisible();
            await expect(page.getByText('Ticket Category')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Assigned To  ' }).locator('a')).toBeVisible();
            await expect(page.getByText('Ticket Type')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Scheduled Date  ' })).toBeVisible();
            await expect(page.getByText('Duration').first()).toBeVisible();
            await expect(page.getByText('Description').nth(1)).toBeVisible();

            // Approval Tab
            await page.locator('#cdk-drop-list-1 a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByText('Approver Id')).toBeVisible();
            await expect(page.getByText('Approver', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Created By  ' }).locator('a')).toBeVisible();
            await expect(page.getByText('Approval Comments')).toBeVisible();

            // Attachment Tab 
            await attachmentTab(page);

            // Status History Tab 
            await page.locator('a').filter({ hasText: 'Status History' }).click();
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();

            // close the Ticket details page 
            await page.getByLabel('Close').locator('i').click();

            // Clear the filters 
            await expect(page.getByRole('textbox').nth(3)).toHaveValue('MWD0017195');
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.getByRole('combobox').filter({ hasText: /^$/ })).toBeEmpty();
            await page.locator('.Right > .d-flex > i').first().click();
        });

        test('All Tickets:should filter, select, and validate requests', async ({ page }) => {
            // Menu Navigation
            await page.locator('#MNU0000082').click();
            // All Tickets Menu Navigation
            await page.getByRole('link', { name: ' All Tickets' }).click();
            await expect(page.locator('section').getByText('All Tickets')).toBeVisible({ timeout: 40000 });

            // Options and Export
            await performOptionExport(page);

            // Filter By Id 
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000071').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Ticket ID' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('MWD0017196');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.getByText('MWD0017196')).toBeVisible({ timeout: 20000 });
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'Automation test ticket Don\'t Take Any Actions - Scheduled' }).locator('a')).toBeVisible();
            await expect(page.locator('#dynamic_list_EFN0000071').getByText('Scheduled', { exact: true })).toBeVisible();

            // Go to Ticket details
            await page.locator('comp-field-view-type').filter({ hasText: 'Automation test ticket Don\'t' }).locator('a').click();
            await expect(page.getByRole('heading', { name: '[MWD0017196] Automation test' })).toBeVisible({ timeout: 20000 });
            await expect(page.getByText('Ticket ID MWD0017196 Subject')).toBeVisible({ timeout: 30000 });
            await expect(page.locator('dynamic-details form div').filter({ hasText: 'Category Channel Email' }).nth(1)).toBeVisible();

            // Close Action
            await performCloseAction(page);

            // Start Action 
            await page.getByRole('link', { name: 'Start' }).click();
            await expect(page.locator('#Actionform_EFN0000019').getByText('Start')).toBeVisible({ timeout: 20000});
            await page.getByPlaceholder('Comments').click();
            await page.getByPlaceholder('Comments').fill('test');
            await page.locator('#Actionform_EFN0000019').getByText('Close').click();

            // Pickup Action
            await performPickupAction(page);

            // Assign Action 
            await AssignActionForAssignedTickets(page);

            // Ticket Action 
            await performTicketAction(page);

            // Attach Action 
            await performAttachmentAction(page);

            // Customer Details 
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0017196 Subject' }).locator('a').click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.getByText('CBN0001030', { exact: true })).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /^alsaif@mawaridservices\.com$/ })).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Close Start Pickup Assign' }).locator('button').click();

            // Comments Sub Action 
            await page.getByRole('link', { name: ' Comments' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

            // Notes Sub Action
            await page.getByRole('link', { name: ' Notes' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test Note');
            await page.getByRole('button', { name: 'Close' }).click({ timeout: 20000 });

            // Sent Approval Sub Action 
            await page.getByRole('link', { name: '魯 Send Approval' }).click({ timeout: 20000 });
            // SA Dropdown
            await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
            await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible({ timeout: 30000 });
            // SA Pagination
            await page.getByText('page 2').click();
            await expect(page.getByText('a.alangari@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('page 3').click();
            await page.getByText('page 4').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await expect(page.getByText('a.alqahtani@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1', { exact: true }).click();
            await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible();
            // Search By User Id 
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('hyder');
            await expect(page.getByRole('cell', { name: 'a.hyder' }).locator('div')).toBeVisible();
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('');
            // Search By Name
            await page.getByRole('searchbox').nth(1).click();
            await page.getByRole('searchbox').nth(1).fill('hyder');
            await expect(page.getByRole('cell', { name: 'Hyder Ali A' }).locator('div')).toBeVisible();
            await page.getByRole('searchbox').nth(1).click();
            await page.getByRole('searchbox').nth(1).fill('');
            // Search By Email 
            await page.getByRole('searchbox').nth(2).click();
            await page.getByRole('searchbox').nth(2).fill('hyder');
            await expect(page.getByText('hyder@faaztechsolutions.com')).toBeVisible();
            await page.getByText('hyder@faaztechsolutions.com').click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test comments');
            await page.getByRole('button', { name: 'Close' }).click();

            // Conversation Tab
            await expect(page.locator('b').filter({ hasText: 'alsaif@mawaridservices.com' })).toBeVisible();
            await expect(page.getByText('Dear Customer')).toBeVisible();
            await expect(page.getByText('Ticket Information')).toBeVisible();
            await expect(page.getByText('Ticket ID : MWD0017196')).toBeVisible();
            await expect(page.getByText('Title : Automation test')).toBeVisible();
            await expect(page.locator('#commentscollapse_3').getByText('Automation test ticket Don\'t')).toBeVisible();
            // Reply 
            await page.getByRole('link', { name: ' Reply' }).first().click();
            await expect(page.locator('#Actionform_EFN0000234').getByText('Reply', { exact: true })).toBeVisible();
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.getByPlaceholder('Bcc')).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Files')).toBeVisible();
            await expect(page.locator('#file_Files')).toBeVisible();
            await page.locator('#Actionform_EFN0000234').getByText('Close').click();
            // Forward
            await page.getByRole('link', { name: ' Forward' }).first().click();
            await expect(page.locator('#Actionform_EFN0000235').getByText('Forward')).toBeVisible({ timeout: 20000 });
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.locator('#CcRecipients div').nth(1)).toBeVisible();
            await expect(page.locator('#BccRecipients div').nth(1)).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Thanks & RegardsHyder Ali,')).toBeVisible();
            await expect(page.locator('#Actionform_EFN0000235 dynamic-view div').filter({ hasText: 'Files Drag and drop a file or' }).nth(1)).toBeVisible();
            await page.locator('#Actionform_EFN0000235').getByText('Close').click();

            // Ticket Tab
            await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
            await expect(page.getByText('Request Id')).toBeVisible();
            await expect(page.getByText('Title', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
            await expect(page.getByText('Ticket Category')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Assigned To  ' })).toBeVisible();
            await expect(page.getByText('Ticket Type')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Scheduled Date  ' })).toBeVisible();
            await expect(page.getByText('Duration').first()).toBeVisible();
            await expect(page.getByText('Description').nth(1)).toBeVisible();

            // Approval Tab
            await page.locator('[id^="cdk-drop-list"] a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByText('Approver Id')).toBeVisible();
            await expect(page.getByText('Approver', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();
            await expect(page.getByText('Approval Comments')).toBeVisible();

            // Attachment Tab 
            await attachmentTab(page);

            // Status History Tab  
            await page.locator('a').filter({ hasText: 'Status History' }).click();
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
            await expect(page.getByText('System Comments')).toBeVisible();
            await expect(page.locator('#dynamic_list_EFN0000382').getByText('MWD0017196')).toBeVisible();
            await expect(page.getByRole('table').getByText('Scheduled', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: 'Status Change form New to' }).locator('comp-datatype')).toBeVisible();

            // close the Ticket details page 
            await page.getByLabel('Close').locator('i').click();

            // Clear the filters 
            await expect(page.getByRole('textbox').nth(3)).toHaveValue('MWD0017196');
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000071').getByRole('textbox')).toBeEmpty();
            await page.locator('.Right > .d-flex > i').first().click();
        });

        test('All Closed Tickets:should filter, select, and validate requests', async ({ page }) => {
            // My Team Menu Navigation
            await page.locator('#MNU0000082').click();

            // Sub menu Navigation
            await page.getByRole('link', { name: ' My All Closed Tickets' }).click();

            // Go to Closed tab
            await expect(page.locator('section').getByText('My All Closed Tickets')).toBeVisible({ timeout: 20000 });
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.getByRole('list').filter({ hasText: /of/i }).locator('a').nth(2).click({ timeout: 10000 });
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.getByRole('list').filter({ hasText: /of3/i }).locator('a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Options and Export 
            await performOptionExport(page);

            // Filter By Id 
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000233').getByRole('textbox').click();
            await page.getByText('Ticket ID').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('MWD0016530');
            await page.getByRole('button', { name: ' Search' }).click();
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'Test Mail From Dev Mobile -' }).locator('a')).toBeVisible();
            await expect(page.getByText('MWD0016530')).toBeVisible();

            // Go to Ticket details
            await page.locator('comp-field-view-type').filter({ hasText: 'Test Mail From Dev Mobile -' }).locator('a').click();
            await expect(page.getByRole('heading', { name: '[MWD0016530] Test Mail From' })).toBeVisible({ timeout: 30000 });
            await expect(page.getByText('Ticket ID MWD0016530 Subject')).toBeVisible({ timeout: 20000 });
            await expect(page.locator('dynamic-details form div').filter({ hasText: 'Category Channel Assigned To' }).nth(1)).toBeVisible();

            // Reopen Action Verification
            await page.getByRole('link', { name: 'Re Open' }).click();
            await expect(page.getByText('ReOpen', { exact: true })).toBeVisible();
            await expect(page.getByPlaceholder('Comments')).toHaveValue('Test closed comment');
            await page.getByText('Close', { exact: true }).click();

            // Pickup Action
            await performPickupAction(page);

            // Assign Action
            await AssignActionForAssignedTickets(page);

            // Ticket Action 
            await performTicketAction(page);

            // Attach Action 
            await performAttachmentAction(page);

            // Customer Details 
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0016530 Subject' }).locator('a').click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.getByText('CBN0001030', { exact: true })).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /^alsaif@mawaridservices\.com$/ })).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Re Open Pickup Assign Ticket' }).locator('button').click();

            // Conversation Tab
            await expect(page.locator('b').filter({ hasText: 'alsaif@mawaridservices.com' })).toBeVisible();
            await expect(page.getByRole('listitem').filter({ hasText: 'HHyder Ali A Assigned To' })).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /^Krishna$/ })).toBeVisible();
            await expect(page.getByText('@Krishna @Mohamed Afrith @Ajeesh Nasar Sheik Ismail')).toBeVisible();
            await expect(page.locator('#dynamic_list_EFN0000012').getByRole('list').locator('div').filter({ hasText: 'alsaif@mawaridservices.comTo' }).nth(1)).toBeVisible();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('Test');

            // Reply 
            await page.getByRole('link', { name: ' Reply' }).first().click({ timeout: 20000 });
            await expect(page.locator('#Actionform_EFN0000234').getByText('Reply', { exact: true })).toBeVisible({ timeout: 20000 });
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.getByPlaceholder('Bcc')).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Files')).toBeVisible();
            await expect(page.locator('#file_Files')).toBeVisible();
            await page.locator('#Actionform_EFN0000234').getByText('Close').click();
            // Forward
            await page.getByRole('link', { name: ' Forward' }).first().click();
            await expect(page.locator('#Actionform_EFN0000235').getByText('Forward')).toBeVisible({ timeout: 30000 });
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.locator('#CcRecipients div').nth(1)).toBeVisible();
            await expect(page.locator('#BccRecipients div').nth(1)).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Thanks & RegardsHyder Ali,').nth(1)).toBeVisible();
            await expect(page.locator('#Actionform_EFN0000235 dynamic-view div').filter({ hasText: 'Files Drag and drop a file or' }).nth(1)).toBeVisible();
            await page.locator('#Actionform_EFN0000235').getByText('Close').click();

            // Ticket Tab
            await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
            await expect(page.getByText('Request Id')).toBeVisible();
            await expect(page.getByText('Title', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
            await expect(page.getByText('Ticket Category')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Assigned To  ' })).toBeVisible();
            await expect(page.getByText('Ticket Type')).toBeVisible({ timeout: 20000 });
            await expect(page.getByText('Duration').first()).toBeVisible({ timeout: 20000 });
            await expect(page.getByText('Description').nth(1)).toBeVisible({ timeout: 20000 });

            // Approval Tab
            await page.locator('[id^="cdk-drop-list"] a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByText('Approver Id')).toBeVisible();
            await expect(page.getByText('Approver', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();
            await expect(page.getByText('Approval Comments')).toBeVisible();

            // Attachment Tab 
            await attachmentTab(page);

            // Status History Tab  
            await page.locator('a').filter({ hasText: 'Status History' }).click({ timeout: 20000 });
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible({ timeout: 20000 });
            await expect(page.locator('#dynamic_list_EFN0000382').getByText('MWD0016530')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
            await expect(page.getByRole('table').getByText('Closed', { exact: true })).toBeVisible();

            // close the Ticket details page 
            await page.getByLabel('Close').locator('i').click();

            // Clear the filters 
            await expect(page.getByRole('textbox').nth(3)).toHaveValue('MWD0016530');
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000233').getByRole('textbox')).toBeEmpty();
            await page.locator('.Right > .d-flex > i').first().click();
        });

        test('Assigned To Me:should filter, select, and validate requests', async ({ page }) => {
            // My Team Menu Navigation
            await page.locator('#MNU0000082').click();
            await page.getByRole('link', { name: ' Assigned To Me' }).click();

            // Page Validation 
            await expect(page.getByText('My Assigned Tickets')).toBeVisible({ timeout: 20000 });
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Options and Export
            await performOptionExport(page);

            // Filter By Id
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000030').getByRole('textbox').click();
            await page.getByText('Ticket ID').click();
            await page.getByRole('textbox').nth(3).click();

            await page.getByRole('textbox').nth(3).fill('MWD0017198');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'Automation test ticket Don\'t Take Any Actions - Reopen' }).locator('a')).toBeVisible({ timeout: 20000 });
            await expect(page.getByText('MWD0017198')).toBeVisible();
            await expect(page.getByText('ReOpen', { exact: true })).toBeVisible();

            // Go to Ticket details 
            await page.locator('comp-field-view-type').filter({ hasText: 'Automation test ticket Don\'t Take Any Actions - Reopen' }).locator('a').click();
            await expect(page.getByRole('heading', { name: '[MWD0017198] Automation test' })).toBeVisible({ timeout: 20000 });
            await expect(page.getByText('Ticket ID MWD0017198 Subject')).toBeVisible({ timeout: 20000 });
            await expect(page.locator('dynamic-details form div').filter({ hasText: 'Category Channel Email' }).nth(1)).toBeVisible();

            // Close Action 
            await performCloseAction(page);

            // Pickup Action 
            await performPickupAction(page);

            // Assign Action 
            await AssignActionForAssignedTickets(page);

            // Ticket Action 
            await performTicketAction(page);

            // Attach Action 
            await performAttachmentAction(page);

            // Comments Sub Action 
            await page.getByRole('link', { name: ' Comments' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

            // Notes Sub Action
            await page.getByRole('link', { name: ' Notes' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test Note');
            await page.getByRole('button', { name: 'Close' }).click();

            // Sent Approval Sub Action 
            await page.getByRole('link', { name: '魯 Send Approval' }).click();
            // SA Dropdown
            await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
            await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible({ timeout: 20000 });
            // SA Pagination
            await page.getByText('page 2').click();
            await expect(page.getByText('a.alangari@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('page 3').click();
            await page.getByText('page 4').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await expect(page.getByText('a.alqahtani@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1', { exact: true }).click();
            await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible();
            // Search By User Id 
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('hyder');
            await expect(page.getByRole('cell', { name: 'a.hyder' }).locator('div')).toBeVisible({ timeout: 20000 });
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('');
            // Search By Name
            await page.getByRole('searchbox').nth(1).click();
            await page.getByRole('searchbox').nth(1).fill('hyder');
            await expect(page.getByRole('cell', { name: 'Hyder Ali A' }).locator('div')).toBeVisible();
            await page.getByRole('searchbox').nth(1).click();
            await page.getByRole('searchbox').nth(1).fill('');
            // Search By Email 
            await page.getByRole('searchbox').nth(2).click();
            await page.getByRole('searchbox').nth(2).fill('hyder');
            await expect(page.getByText('hyder@faaztechsolutions.com')).toBeVisible();
            await page.getByText('hyder@faaztechsolutions.com').click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test comments');
            await page.getByRole('button', { name: 'Close' }).click();

            // Conversation Tab
            await expect(page.locator('b').filter({ hasText: 'alsaif@mawaridservices.com' }).nth(1)).toBeVisible();
            await expect(page.getByText('Dear Customer').nth(0)).toBeVisible();
            await expect(page.locator('#commentscollapse_0').getByText('Ticket Information')).toBeVisible();
            await expect(page.locator('#commentscollapse_0').getByText('Ticket ID : MWD0017198')).toBeVisible();
            await expect(page.locator('#commentscollapse_0').getByText('Title : Automation test')).toBeVisible();
            await expect(page.locator('#commentscollapse_7').getByText('Automation test ticket Don\'t')).toBeVisible();
            // Reply 
            await page.getByRole('link', { name: ' Reply' }).first().click();
            await expect(page.locator('#Actionform_EFN0000234').getByText('Reply', { exact: true })).toBeVisible();
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.locator('#CcRecipients div').nth(1)).toBeVisible();
            await expect(page.getByPlaceholder('Bcc')).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Files')).toBeVisible();
            await expect(page.locator('#file_Files')).toBeVisible();
            await page.locator('#Actionform_EFN0000234').getByText('Close').click();
            // Forward
            await page.getByRole('link', { name: ' Forward' }).first().click();
            await expect(page.locator('#Actionform_EFN0000235').getByText('Forward')).toBeVisible();
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.locator('#CcRecipients div').nth(1)).toBeVisible();
            await expect(page.locator('#BccRecipients div').nth(1)).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Thanks & RegardsHyder Ali,')).toBeVisible();
            await expect(page.locator('#Actionform_EFN0000235 dynamic-view div').filter({ hasText: 'Files Drag and drop a file or' }).nth(1)).toBeVisible();
            await page.locator('#Actionform_EFN0000235').getByText('Close').click();

            // Ticket Tab
            await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
            await expect(page.getByText('Request Id')).toBeVisible();
            await expect(page.getByText('Title', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
            await expect(page.getByText('Ticket Category')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Assigned To  ' })).toBeVisible();
            await expect(page.getByText('Ticket Type')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Scheduled Date  ' })).toBeVisible();
            await expect(page.getByText('Duration').first()).toBeVisible();
            await expect(page.getByText('Description').nth(1)).toBeVisible();

            // Approval Tab
            await page.locator('[id^="cdk-drop-list-"] a', { hasText: 'Approvals' }).click();
            await expect(page.getByText('Approver Id')).toBeVisible();
            await expect(page.getByText('Approver', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();
            await expect(page.getByText('Approval Comments')).toBeVisible();

            // Attachment Tab 
            await attachmentTab(page);

            // Status History Tab 
            await page.locator('a').filter({ hasText: 'Status History' }).click();
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();

            // close the Ticket details page 
            await page.getByLabel('Close').locator('i').click();

            // Clear the filters 
            await expect(page.getByRole('textbox').nth(3)).toHaveValue('MWD0017198');
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000030').getByRole('textbox')).toBeEmpty();
            await page.locator('.Right > .d-flex > i').first().click();
        });

        test('Created By Me:should filter, select, and validate requests', async ({ page }) => {
            // My Team Menu Navigation
            await page.locator('#MNU0000082').click();
            // Created By Me Menu Navigation
            await page.getByRole('link', { name: ' Created By Me' }).click();
            await expect(page.locator('section').getByText('Created By Me')).toBeVisible({ timeout: 30000 });

            // Options and Export
            await performOptionExport(page);

            // Pagination
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Filter by Id
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000007').getByRole('textbox').click();
            await page.getByText('Ticket ID').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('MWD0017199');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'Auto-Test Don&#x27;t Take Any' }).locator('a')).toBeVisible();
            await expect(page.getByText('MWD0017199')).toBeVisible();

            // Go to Ticket details
            await page.locator('comp-field-view-type').filter({ hasText: 'Auto-Test Don&#x27;t Take Any' }).locator('a').click();
            await expect(page.getByRole('heading', { name: '[MWD0017199] Auto-Test Don&#' })).toBeVisible({ timeout: 20000 });

            // Schedule Action
            await scheduleHelper(page);

            // Close Action 
            await performCloseAction(page);

            // Pickup Action 
            await performPickupAction(page);

            // Assign Action 
            await performAssignAction(page);

            // Ticket Action 
            await performTicketAction(page);

            // Attach Action 
            await performAttachmentAction(page);

            // Ticket Details data
            await expect(page.getByText('Ticket ID MWD0017199 Subject')).toBeVisible();

            // Customer Details 
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0017199 Subject' }).locator('a').click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.getByText('CBN0001030', { exact: true })).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /^alsaif@mawaridservices\.com$/ })).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Schedule Close Pickup Assign' }).locator('button').click();

            // Comments Sub Action 
            await page.getByRole('link', { name: ' Comments' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

            // Notes Sub Action
            await page.getByRole('link', { name: ' Notes' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test Note');
            await page.getByRole('button', { name: 'Close' }).click();

            // Sent Approval Sub Action 
            await page.getByRole('link', { name: '魯 Send Approval' }).click();
            // SA Dropdown
            await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
            await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible({ timeout: 20000 });
            // SA Pagination
            await page.getByText('page 2').click();
            await expect(page.getByText('a.alangari@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('page 3').click();
            await page.getByText('page 4').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await expect(page.getByText('a.alqahtani@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1', { exact: true }).click();
            await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible();
            // Search By User Id 
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('hyder');
            await expect(page.getByText('a.hyder')).toBeVisible();
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('');
            // Search By Name
            await page.getByRole('searchbox').nth(1).click();
            await page.getByRole('searchbox').nth(1).fill('hyder');
            await expect(page.getByRole('cell', { name: 'Hyder Ali A' }).locator('div')).toBeVisible();
            await page.getByRole('searchbox').nth(1).click();
            await page.getByRole('searchbox').nth(1).fill('');
            // Search By Email 
            await page.getByRole('searchbox').nth(2).click();
            await page.getByRole('searchbox').nth(2).fill('hyder');
            await expect(page.getByText('hyder@faaztechsolutions.com')).toBeVisible();
            await page.getByText('hyder@faaztechsolutions.com').click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test comments');
            await page.getByRole('button', { name: 'Close' }).click();

            // Conversation Tab
            await expect(page.locator('b').filter({ hasText: 'alsaif@mawaridservices.com' })).toBeVisible();
            await expect(page.getByText('alsaif@mawaridservices.comTo')).toBeVisible();
            await expect(page.getByRole('listitem').filter({ hasText: 'alsaif@mawaridservices.comTo' })).toBeVisible();
            // Reply 
            await page.locator('#dynamic_list_EFN0000012').getByRole('link', { name: ' Reply' }).click();
            await expect(page.locator('#Actionform_EFN0000234').getByText('Reply', { exact: true })).toBeVisible({ timeout: 20000 });
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.locator('#CcRecipients div').nth(1)).toBeVisible();
            await expect(page.getByPlaceholder('Bcc')).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Files')).toBeVisible();
            await expect(page.locator('#file_Files')).toBeVisible();
            await page.locator('#Actionform_EFN0000234').getByText('Close').click();
            // Forward
            await page.getByRole('link', { name: ' Forward' }).first().click();
            await expect(page.locator('#Actionform_EFN0000235').getByText('Forward')).toBeVisible();
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.locator('#CcRecipients div').nth(1)).toBeVisible();
            await expect(page.locator('#BccRecipients div').nth(1)).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Thanks & RegardsHyder Ali, From: alsaif@mawaridservices.comSent: Monday,')).toBeVisible({ timeout: 20000 });
            await expect(page.locator('#Actionform_EFN0000235 dynamic-view div').filter({ hasText: 'Files Drag and drop a file or' }).nth(1)).toBeVisible();
            await page.locator('#Actionform_EFN0000235').getByText('Close').click();

            // Ticket Tab
            await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
            await expect(page.getByText('Request Id')).toBeVisible();
            await expect(page.getByText('Title', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
            await expect(page.getByText('Ticket Category')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Assigned To  ' })).toBeVisible();
            await expect(page.getByText('Ticket Type')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Scheduled Date  ' })).toBeVisible();
            await expect(page.getByText('Duration').first()).toBeVisible();
            await expect(page.getByText('Description').nth(1)).toBeVisible();

            // Approval Tab
            await page.locator('#cdk-drop-list-1 a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByText('Approver Id')).toBeVisible();
            await expect(page.getByText('Approver', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();
            await expect(page.getByText('Approval Comments')).toBeVisible();

            // Attachment Tab 
            await attachmentTab(page);
            await expect(page.getByRole('link', { name: ' BA-basics.txt' })).toBeVisible();

            // Status History Tab 
            await page.locator('a').filter({ hasText: 'Status History' }).click();
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();

            // close the Ticket details page 
            await page.getByLabel('Close').locator('i').click();

            // Clear the filters 

            await expect(page.getByRole('textbox').nth(3)).toHaveValue('MWD0017199');
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.getByRole('combobox').filter({ hasText: /^$/ })).toBeEmpty({ timeout: 20000 });
            await page.locator('.Right > .d-flex > i').first().click();
        });
    });

    test.describe('My Team Tickets', () => {
        test('My Team Tickets:should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000136').click();
            await page.getByRole('link', { name: ' My Team Tickets' }).click();
            await expect(page.locator('section').getByText('My Team Tickets')).toBeVisible({ timeout: 30000 });
            await performOptionExport(page);

            // Options and Export 
            await performOptionExport(page);

            // Filter By Id 
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000276').getByRole('textbox').click();
            await page.getByText('Ticket ID').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('MWD0016530');
            await page.getByRole('button', { name: ' Search' }).click();
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'Test Mail From Dev Mobile -' }).locator('a').nth(0)).toBeVisible();
            await expect(page.getByText('MWD0016530').nth(0)).toBeVisible();

            // Go to Ticket details
            await page.locator('comp-field-view-type').filter({ hasText: 'Test Mail From Dev Mobile -' }).locator('a').nth(0).click();
            await expect(page.getByRole('heading', { name: '[MWD0016530] Test Mail From' })).toBeVisible({ timeout: 30000 });
            await expect(page.getByText('Ticket ID MWD0016530 Subject')).toBeVisible({ timeout: 30000 });
            await expect(page.locator('dynamic-details form div').filter({ hasText: 'Category Channel Assigned To' }).nth(1)).toBeVisible();

            // Reopen Action Verification
            await page.getByRole('link', { name: 'Re Open' }).click();
            await expect(page.locator('#Actionform_EFN0000020').getByText('ReOpen')).toBeVisible({ timeout: 20000 });
            await expect(page.getByPlaceholder('Comments')).toHaveValue('Test closed comment');
            await page.getByText('Close', { exact: true }).click();

            // Pickup Action
            await performPickupAction(page);

            // Assign Action
            await performAssignAction(page);

            // Ticket Action 
            await performTicketAction(page);

            // Attach Action 
            await performAttachmentAction(page);

            // Customer Details 
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0016530 Subject' }).locator('a').click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.getByText('CBN0001030', { exact: true })).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /^alsaif@mawaridservices\.com$/ })).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Re Open Pickup Assign Ticket' }).locator('button').click();

            // Conversation Tab
            await expect(page.locator('b').filter({ hasText: 'alsaif@mawaridservices.com' })).toBeVisible();
            await expect(page.getByRole('listitem').filter({ hasText: 'HHyder Ali A Assigned To' })).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /^Krishna$/ })).toBeVisible();
            await expect(page.getByText('@Krishna @Mohamed Afrith @Ajeesh Nasar Sheik Ismail')).toBeVisible();
            await expect(page.locator('#dynamic_list_EFN0000012').getByRole('list').locator('div').filter({ hasText: 'alsaif@mawaridservices.comTo' }).nth(1)).toBeVisible();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('Test');

            // Reply 
            await page.getByRole('link', { name: ' Reply' }).first().click({ timeout: 20000 });
            await expect(page.locator('#Actionform_EFN0000234').getByText('Reply', { exact: true })).toBeVisible({ timeout: 20000 });
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.getByPlaceholder('Bcc')).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Files')).toBeVisible();
            await expect(page.locator('#file_Files')).toBeVisible();
            await page.locator('#Actionform_EFN0000234').getByText('Close').click();
            // Forward
            await page.getByRole('link', { name: ' Forward' }).first().click();
            await expect(page.locator('#Actionform_EFN0000235').getByText('Forward')).toBeVisible({ timeout: 30000 });
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.locator('#CcRecipients div').nth(1)).toBeVisible();
            await expect(page.locator('#BccRecipients div').nth(1)).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Thanks & RegardsHyder Ali,').nth(1)).toBeVisible();
            await expect(page.locator('#Actionform_EFN0000235 dynamic-view div').filter({ hasText: 'Files Drag and drop a file or' }).nth(1)).toBeVisible();
            await page.locator('#Actionform_EFN0000235').getByText('Close').click();

            // Ticket Tab
            await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
            await expect(page.getByText('Request Id')).toBeVisible();
            await expect(page.getByText('Title', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
            await expect(page.getByText('Ticket Category')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Assigned To  ' })).toBeVisible();
            await expect(page.getByText('Ticket Type')).toBeVisible({ timeout: 20000 });
            await expect(page.getByText('Duration').first()).toBeVisible({ timeout: 20000 });
            await expect(page.getByText('Description').nth(1)).toBeVisible({ timeout: 20000 });

            // Approval Tab
            await page.locator('[id^="cdk-drop-list"] a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByText('Approver Id')).toBeVisible();
            await expect(page.getByText('Approver', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();
            await expect(page.getByText('Approval Comments')).toBeVisible();

            // Attachment Tab 
            await attachmentTab(page);

            // Status History Tab  
            await page.locator('a').filter({ hasText: 'Status History' }).click({ timeout: 20000 });
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible({ timeout: 20000 });
            await expect(page.locator('#dynamic_list_EFN0000382').getByText('MWD0016530')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
            await expect(page.getByRole('table').getByText('Closed', { exact: true })).toBeVisible();

            // close the Ticket details page 
            await page.getByLabel('Close').locator('i').click();

            // Clear the filters 
            await expect(page.getByRole('textbox').nth(3)).toHaveValue('MWD0016530');
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000276').getByRole('textbox')).toBeEmpty({ timeout: 20000 });
            await page.locator('.Right > .d-flex > i').first().click();
        });
    });

    test.describe('Mails', () => {
        test('Address Book:should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000081').click();
            await page.getByRole('link', { name: ' Address Book' }).click();
            await expect(page.getByText('Customer Contacts')).toBeVisible({ timeout: 20000 });
            await performOptionExport(page);

            // Create 
            await page.getByRole('button', { name: ' Create' }).click();
            await expect(page.locator('h4')).toBeVisible();
            // Customer Dropdown 
            await page.locator('#dynamic-undefined-undefined #autoComplete_dropdown_CustomerId label').click();
            await page.getByText('page 2', { exact: true }).click();
            await page.getByText('page 3').click();
            await expect(page.getByText('CBN-0008161')).toBeVisible();
            await page.getByText('page 4').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1').click();
            // Search by Customer code 
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('8129');
            await expect(page.getByText('CBN-')).toBeVisible();
            await expect(page.getByText('مجمع حسين علي محسن السقاف الطبي')).toBeVisible();
            await page.getByText('CBN-').click();
            await page.getByPlaceholder('Contact Name').click();
            await page.getByPlaceholder('Contact Name').fill('test');
            await page.getByPlaceholder('Email').click();
            await page.getByPlaceholder('Email').fill('test');
            await page.getByText('Close', { exact: true }).click();

            // List Pagination
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await expect(page.getByRole('row', { name: '29 CBN0001207 a.ghafoor@' }).locator('comp-datatype').nth(1)).toBeVisible();
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('4');
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Filter by RecId 
            await page.locator('.align-items-start > .d-flex > i').first().click();
            await page.locator('.table_filter_text').first().click();
            await page.locator('.table_filter_text').first().click();
            await page.locator('.table_filter_text').first().fill('11515');
            await page.locator('.table_filter_text').first().press('Enter');
            await expect(page.getByRole('row', { name: '11515 CBN0007859 talharbi@' }).locator('a')).toBeVisible();
            // Details page 
            await page.getByRole('cell', { name: '⯆ 11515' }).hover();
            await page.getByRole('row', { name: '11515 CBN0007859 talharbi@' }).locator('a').click();
            await expect(page.getByText('CustomerContactEmail Details')).toBeVisible();
            await expect(page.locator('.groupView')).toBeVisible();
            // Close Details page
            await page.getByText('Close', { exact: true }).click();
            // Clear filter RecId
            await page.getByRole('cell', { name: ' Rec Id  ' }).hover();
            await page.getByRole('cell', { name: '⯆ 11515' }).hover();
            await page.getByRole('cell', { name: '⯆ 11515 ' }).locator('div').nth(1).hover();
            await page.getByRole('cell', { name: '⯆ 11515 ' }).getByRole('combobox').click();
            await page.getByRole('cell', { name: '⯆ 11515 ' }).getByRole('textbox').nth(1).hover();
            await page.getByRole('cell', { name: '⯆ 11515 ' }).locator('span').nth(2).click();

            // Filter by Customer Id & Pagination
            await page.getByRole('row', { name: '⯆ ⯆ ⯆ ⯆' }).locator('label').click();
            // Pagination
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await page.getByText('page 4').click();
            await page.getByText('page 5').click();
            await page.getByText('page 4').click();
            await page.getByText('Previous page').click();
            await expect(page.getByText('CBN-0008161')).toBeVisible();
            await page.getByText('page 1').click();
            await expect(page.getByText('CBN-0008841')).toBeVisible();
            // Search by Customer Id
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('8130');
            await expect(page.getByText('CBN-0008130')).toBeVisible();
            await page.getByText('CBN-0008130').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.getByRole('row', { name: '10975 CBN-0008130 i.bakhareba' }).locator('comp-datatype').nth(1)).toBeVisible();
            // Clear Customer Id filter 
            await page.getByRole('cell', { name: '⯆ CBN-' }).hover();
            await page.locator('label').filter({ hasText: 'CBN-' }).locator('i').click();

            // Email Filter
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').fill('madinanh@mawaridservices');
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('table').getByText('madinanh@mawaridservices.com')).toBeVisible();
            await page.getByRole('cell', { name: '⯆ madinanh@mawaridservices' }).hover();
            await page.getByRole('cell', { name: '⯆ madinanh@mawaridservices ' }).locator('div').nth(1).hover();
            await page.getByRole('cell', { name: '⯆ madinanh@mawaridservices ' }).getByRole('combobox').hover();
            await page.getByRole('cell', { name: '⯆ madinanh@mawaridservices ' }).getByRole('textbox').nth(1).hover();
            await page.getByRole('cell', { name: '⯆ madinanh@mawaridservices ' }).locator('i').click();
            await expect(page.locator('td:nth-child(4) > .clearfix > .table_filter_text')).toBeEmpty();

            // Contact Details
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').fill('alsaif');
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('cell', { name: 'CBN0001030' }).locator('comp-field-view-type')).toBeVisible();
            await page.getByRole('row', { name: '5 CBN0001030 alsaif@' }).locator('i').nth(2).click();
            await expect(page.getByText('CustomerContactEmail')).toBeVisible();
            await page.getByText('Close', { exact: true }).click();
            await page.getByRole('cell', { name: '⯆ alsaif' }).hover();
            await page.getByRole('cell', { name: '⯆ alsaif ' }).getByRole('combobox').hover();
            await page.getByRole('cell', { name: '⯆ alsaif ' }).locator('span').nth(2).click();
        });

        test('New Mail :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000081').click();
            await page.locator('#MNU0000080').click();
            await page.locator('#autoComplete_dropdown_customerQuery label').nth(1).click({ timeout: 20000 });

            // Customer Dropdown Pagination
            await page.getByText('page 2').click();
            await page.getByText('Previous page').click();
            await page.getByText('Next page').click();
            await page.getByText('page 1').click();

            // Customer Name Filter
            await page.locator('input[type="search"]').nth(1).click();
            await page.locator('input[type="search"]').nth(1).fill('\t مؤسسة غوار التجارية');
            await expect(page.getByText('مؤسسة غوار التجارية').first()).toBeVisible();
            await page.locator('thead').filter({ hasText: 'Code Name Support Email' }).locator('td').nth(2).hover();
            await page.locator('input[type="search"]').nth(1).click();
            await page.locator('input[type="search"]').nth(1).fill('');
            await expect(page.locator('input[type="search"]').nth(1)).toBeEmpty();

            // Customer Email Filter
            await page.locator('input[type="search"]').nth(2).click();
            await page.locator('input[type="search"]').nth(2).fill('alsaif');
            await expect(page.getByText('alsaif@mawaridservices.com').first()).toBeVisible();
            await page.locator('input[type="search"]').nth(2).click();
            await page.locator('input[type="search"]').nth(2).fill('');
            await expect(page.locator('input[type="search"]').nth(2)).toBeEmpty();

            // Code/Customer Id Filter
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('1030');
            await expect(page.getByText('CBN0001030').first()).toBeVisible();
            await page.getByText('CBN0001030').first().click();
            await expect(page.getByText('Customer Customer CBN0001030 Customer Customer CBN0001030 x Code Name Support')).toBeVisible({ timeout: 20000 });
            await page.getByPlaceholder('To*').click();
            await page.getByPlaceholder('To*').fill('krish');
            await expect(page.getByRole('button', { name: 'm.krishna@faaztechsolutions.' })).toBeVisible({ timeout: 20000 });
            await page.getByRole('button', { name: 'm.krishna@faaztechsolutions.' }).click();
            await expect(page.getByPlaceholder('Add a To')).toBeVisible();
            await page.getByPlaceholder('Cc', { exact: true }).click();
            await page.getByPlaceholder('Cc', { exact: true }).fill('hyder');
            await expect(page.getByRole('button', { name: 'hyder@faaztechsolutions.com' })).toBeVisible({ timeout: 30000 });
            await page.getByRole('button', { name: 'hyder@faaztechsolutions.com' }).click();
            await expect(page.getByPlaceholder('Bcc')).toBeVisible();
            await page.getByPlaceholder('Add a Cc').click();
            await page.getByPlaceholder('Add a Cc').fill('m.vis');
            await page.getByRole('button', { name: 'm.viswa@mawarid.com.sa' }).click();
            await page.getByPlaceholder('Bcc').click();
            await page.locator('#Actionform_EFN0000198 dynamic-view div').filter({ hasText: 'Subject *Subject* Description' }).nth(1).click();
            await page.getByPlaceholder('Subject').click();
            await page.getByPlaceholder('Subject').fill('test subject');
            await expect(page.getByText('Thanks & RegardsHyder Ali,')).toBeVisible();
            await expect(page.locator('#Actionform_EFN0000198 dynamic-view div').filter({ hasText: 'Files' }).nth(4)).toBeVisible();
            await expect(page.locator('#file_files')).toBeVisible();
            await page.getByText('Close', { exact: true }).click();
        });

        test('Inbox: should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000081').click();
            await page.getByRole('link', { name: ' Inbox' }).click();
            await expect(page.locator('section').getByText('Inbox')).toBeVisible({ timeout: 30000 });
            await performOptionExport(page);

            //  Filter by Title
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000230').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Title' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('- InProgress.');
            await page.getByRole('button', { name: ' Search' }).click();
            await page.waitForTimeout(200);
            await expect(page.getByText('Automation test ticket Don\'t').nth(0)).toBeVisible({ timeout: 20000 });
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'm.krishna@faaztechsolutions.' }).locator('a').nth(0)).toBeVisible({ timeout: 20000 });

            // Mail Details Preview
            await page.locator('comp-field-view-type').filter({ hasText: 'm.krishna@faaztechsolutions.' }).locator('a').click();
            await expect(page.locator('#custom_template_dynamic_list_EFN0000229 div').filter({ hasText: '[MWD0017197] Automation test' }).nth(1)).toBeVisible();
            await expect(page.locator('#custom_template_dynamic_list_EFN0000229 div').filter({ hasText: 'm.krishna@faaztechsolutions.com To: alsaif@mawaridservices.com Cc: Automation' }).nth(0)).toBeVisible();
            // Close Details Preview
            await page.getByLabel('Close').locator('i').click();

            // // Click the View
            // await page.getByText('View').click();
            // await expect(page.getByText('Automation test ticket Don\'t Take Any Actions - Status: Reopen')).toBeVisible();
            // // Close the mail details page
            // await page.getByLabel('Close').click();

            // // Clear the filters
            // await expect(page.getByRole('textbox').nth(3)).toHaveValue('- InProgress.');
            // await page.getByRole('button', { name: ' Clear' }).click();
            // await expect(page.locator('#dynamic_list_EFN0000230').getByRole('textbox')).toBeEmpty();
            // await page.locator('.Right > .d-flex > i').first().click();

            // // List pagenation 
            // await expect(page.getByRole('spinbutton')).toHaveValue('1');
            // await page.locator('comp-pagination a').nth(2).click();
            // await expect(page.getByRole('spinbutton')).toHaveValue('2');
            // await page.waitForTimeout(100);
            // await page.locator('comp-pagination a').nth(2).click();
            // await expect(page.getByRole('spinbutton')).toHaveValue('3');
            // await page.waitForTimeout(100);
            // await page.locator('comp-pagination a').first().click();
            // await expect(page.getByRole('spinbutton')).toHaveValue('1');
            // await page.waitForTimeout(100);
        });

        test('Sent Item: should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000081').click();
            await page.getByRole('link', { name: ' Sent Item' }).click();
            await expect(page.locator('section').getByText('Sent Item')).toBeVisible();
            await performOptionExport(page);

            // List pagenation 
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Mail From Filter
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000231').getByRole('textbox').click();
            await page.getByRole('option', { name: 'ToRecipients' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.waitForTimeout(50);
            await page.getByRole('textbox').nth(3).fill('a.minhaj@faaztechsolutions.com');
            await page.waitForTimeout(50);
            await page.getByRole('button', { name: '' }).click();
            await expect(page.getByRole('heading', { name: 'a.minhaj@faaztechsolutions.com' }).nth(0)).toBeVisible({ timeout: 20000 });
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
            await page.getByRole('button', { name: ' Search' }).click();
            await expect(page.getByRole('paragraph').filter({ hasText: 'Testing mail from mobile' }).first()).toBeVisible({ timeout: 20000 });

            // Details Page
            await page.locator('a').filter({ hasText: 'a.minhaj@faaztechsolutions.com' }).nth(1).click();
            await expect(page.getByRole('heading', { name: '[MWD0015547] RE: [MWD0015547' })).toBeVisible();
            await expect(page.locator('#custom_template_dynamic_list_EFN0000229 div').filter({ hasText: 'alsaif@mawaridservices.com To: a.minhaj@faaztechsolutions.com Cc: Dear Customer' }).nth(2)).toBeVisible();
            await page.getByLabel('Close').locator('i').click();
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000231').getByRole('textbox')).toBeEmpty();
            await page.locator('.Right > .d-flex > i').first().click();
        });
    });

    test.describe('Setup', () => {
        test('Customer :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000001').click();
            await page.getByRole('link', { name: '﨡 Customer' }).click();
            await expect(page.locator('section').getByText('Customer')).toBeVisible({ timeout: 20000 });
            await performOptionExport(page);

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
            await page.locator('.align-items-start > .d-flex > i').first().click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('Noon');
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByText('Noon', { exact: true }).first()).toBeVisible();
            await page.getByRole('cell', { name: '⯆ Noon' }).hover();
            await page.getByRole('cell', { name: '⯆ Noon ' }).getByRole('combobox').hover();
            await page.getByRole('cell', { name: '⯆ Noon ' }).locator('i').click();
            await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').fill('Noon');
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByText('Noon', { exact: true }).nth(1)).toBeVisible();
            await page.getByRole('cell', { name: '⯆ Noon' }).hover();
            await page.getByRole('cell', { name: '⯆ Noon ' }).getByRole('combobox').hover();
            await page.getByRole('cell', { name: '⯆ Noon ' }).locator('i').click();
            await expect(page.locator('td:nth-child(4) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter By Support Mail
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').fill('noon@mawaridservices.com');
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('cell', { name: 'noon@mawaridservices.com', exact: true }).locator('comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '⯆ noon@mawaridservices.com' }).hover();
            await page.getByRole('cell', { name: '⯆ noon@mawaridservices.com ' }).getByRole('combobox').hover();
            await page.getByRole('row', { name: '⯆ ⯆ ⯆ ⯆ noon@mawaridservices.' }).locator('i').click();
            await expect(page.locator('td:nth-child(5) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter By Project Supervisor
            await page.locator('td:nth-child(6) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(6) > .clearfix > .table_filter_text').fill('Mohamed al omer');
            await page.locator('td:nth-child(6) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('cell', { name: 'Mohamed al omer', exact: true }).locator('comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '⯆ Mohamed al omer' }).hover();
            await page.getByRole('cell', { name: '⯆ Mohamed al omer ' }).getByRole('combobox').hover();
            await page.getByRole('row', { name: '⯆ ⯆ ⯆ ⯆ ⯆ Mohamed al omer' }).locator('i').click();

            // Filter By Owner
            await page.locator('td:nth-child(8) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(8) > .clearfix > .table_filter_text').fill('Ali alsaaidi');
            await page.locator('td:nth-child(8) > .clearfix > .table_filter_text').press('Enter');
            await page.getByRole('cell', { name: '⯆ Ali alsaaidi' }).hover();
            await page.getByRole('cell', { name: '⯆ Ali alsaaidi ' }).getByRole('combobox').hover();
            await page.getByRole('cell', { name: '⯆ Ali alsaaidi ' }).locator('i').click();
            await expect(page.locator('td:nth-child(7) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter By Account
            await page.locator('td:nth-child(8) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(8) > .clearfix > .table_filter_text').fill('\t مستشفى دلة');
            await page.locator('td:nth-child(8) > .clearfix > .table_filter_text').press('Enter');
            await page.getByRole('cell', { name: '⯆ مستشفى دلة' }).hover();
            await page.getByRole('cell', { name: '⯆ مستشفى دلة ' }).getByRole('combobox').hover();
            await page.getByRole('cell', { name: '⯆ مستشفى دلة ' }).locator('i').click();
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
            await page.getByText('Close', { exact: true }).nth(1).click();

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
            await expect(page.locator('#dynamic_list_EFN0000393 comp-table tbody').getByText('noon@mawaridservices.com')).toBeVisible();
            await page.locator('td').filter({ hasText: '10792' }).locator('a').click();
            await expect(page.getByText('CustomerContactEmail Details Customer Id CBN-0009867 Contact Name noon Email')).toBeVisible();
            await page.locator('#page_left').getByText('Close').click();

            // Details Page Filter By Email 
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000393 > widget-grid > .card > div:nth-child(2) > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('#dynamic_list_EFN0000393 > widget-grid > .card > div:nth-child(2) > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').fill('k.jamil@mawarid.com.sa');
            await page.locator('#dynamic_list_EFN0000393 > widget-grid > .card > div:nth-child(2) > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').press('Enter'); await expect(page.locator('td').filter({ hasText: 'k.jamil@mawarid.com.sa' }).nth(0)).toBeVisible();
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
            await page.locator('td').filter({ hasText: '⯆ x' }).locator('label').click();
            await expect(page.getByText('CBN-0009198')).toBeVisible({ timeout: 20000 });
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
            await page.locator('td').filter({ hasText: '⯆ CBN-0009867 x Code Name' }).hover();
            await page.locator('label').filter({ hasText: 'CBN-' }).hover();
            await page.locator('label').filter({ hasText: 'CBN-' }).locator('i').click();

            // close Customer Details Page 
            await page.getByText('Close', { exact: true }).click();
            await page.getByRole('cell', { name: '⯆ CBN-' }).hover();
            await page.getByRole('cell', { name: '⯆ CBN-0009867 ' }).getByRole('combobox').hover();
            await page.getByRole('cell', { name: '⯆ CBN-0009867 ' }).locator('i').click();
            await expect(page.locator('.table_filter_text').first()).toBeEmpty();
        });

        test('Address Book :should filter, select, and validate requests', async ({ page }) => {
            // menu navigation 
            await page.locator('#MNU0000001').click();

            // Address Book menu navigation 
            await page.getByRole('link', { name: ' Address Book' }).click();
            await expect(page.getByText('Customer Contacts')).toBeVisible({ timeout: 20000 });

            // Options validation
            await performOptionExport(page);

            // Create validation
            await page.getByRole('button', { name: ' Create' }).click();
            await page.locator('#autoComplete_dropdown_CustomerId label').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await page.getByText('page 3').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1').click();
            await expect(page.locator('#autoComplete_dropdown_table_CustomerId').getByText('CBN0001030')).toBeVisible();
            await page.locator('#autoComplete_dropdown_table_CustomerId').getByText('CBN0001030').click();
            await page.getByPlaceholder('Contact Name').click();
            await page.getByPlaceholder('Contact Name').fill('test');
            await page.getByPlaceholder('Email').click();
            await page.getByPlaceholder('Email').fill('test');

            // Close the Create form 
            await page.getByText('Close', { exact: true }).click();

            // Table Pagination validation 
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await expect(page.getByRole('row', { name: '5 CBN0001030 alsaif@' }).locator('comp-datatype').nth(1)).toBeVisible();

            // Details Page validation 
            await page.getByRole('row', { name: '5 CBN0001030 alsaif@' }).locator('a').click();
            await expect(page.getByText('CustomerContactEmail Details')).toBeVisible();
            await expect(page.locator('#DynamicDetails').getByText('Customer Id')).toBeVisible();
            await expect(page.locator('#DynamicDetails').getByText('CBN0001030')).toBeVisible();
            await expect(page.locator('#DynamicDetails').getByText('alsaif', { exact: true })).toBeVisible();
            await expect(page.locator('#DynamicDetails').getByText('alsaif@mawaridservices.com')).toBeVisible();

            // Close the Details Page 
            await page.getByText('Close', { exact: true }).click();

            // Filter By Email validation
            await page.locator('.align-items-start > .d-flex > i').first().click();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').fill('alsaif');
            await page.locator('td:nth-child(4) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('table').getByText('alsaif@mawaridservices.com').nth(0)).toBeVisible();
            await page.getByRole('cell', { name: '⯆ alsaif' }).hover();
            await page.getByRole('cell', { name: '⯆ alsaif ' }).getByRole('combobox').hover();
            await page.getByRole('cell', { name: '⯆ alsaif ' }).locator('i').click();
            await expect(page.locator('td:nth-child(4) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter by customer Id validation
            await page.getByRole('row', { name: '⯆ ⯆ ⯆ ⯆' }).locator('label').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await page.getByText('page 3').click();
            await page.getByText('page 2', { exact: true }).click();
            await page.getByText('Previous page').click();
            await expect(page.getByText('CBN0005632')).toBeVisible();
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('309');
            await expect(page.getByText('CBN0000309')).toBeVisible();
            await page.getByText('CBN0000309').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.getByRole('row', { name: '10043 CBN0000309 hamadalr@' }).locator('comp-datatype').nth(1)).toBeVisible();

            // Clear customer Id Filter 
            await page.getByRole('cell', { name: '⯆ CBN0000309' }).hover();
            await page.getByRole('cell', { name: '⯆ CBN0000309 ' }).locator('label').hover();
            await page.locator('label').filter({ hasText: 'CBN0000309' }).locator('i').click();
        });

        test('Team :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000001').click();
            await page.getByRole('link', { name: '﫟 Team', exact: true }).click();
            await expect(page.getByText('Teams')).toBeVisible({ timeout: 30000 });
            await performOptionExport(page);

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
            await expect(page.locator('#autoComplete_dropdown_table_UserID').getByText('Hyder Ali A')).toBeVisible();
            await page.locator('input[type="search"]').nth(1).click();
            await page.locator('input[type="search"]').nth(1).fill('');
            await expect(page.locator('input[type="search"]').nth(1)).toBeEmpty();

            // Create Dropdown Pagination
            await page.getByText('page 2').click();
            await page.getByText('page 3').click();
            await page.getByText('page 4').click();
            await page.getByText('Next page').click();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1', { exact: true }).click();
            await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('a.abdelhakim@mawarid.com.sa').first().click();
            await expect(page.getByPlaceholder('Name')).toBeVisible();
            await expect(page.getByPlaceholder('Email')).toBeVisible();
            await expect(page.getByPlaceholder('Mobile Number')).toBeVisible();
            await expect(page.locator('ng-select input[type="text"]')).toBeVisible();
            // Reporting To Selection dropdown
            await page.locator('#relation_autoComplete_dropdown_ReportingTo label').nth(1).click();
            await page.locator('ul').filter({ hasText: 'of2' }).locator('a').nth(2).click();
            await page.locator('ul').filter({ hasText: 'of2' }).locator('a').first().click();
            await expect(page.locator('#autoComplete_dropdown_tableReportingTo').getByText('a.hyder', { exact: true })).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableReportingTo').getByText('a.hyder', { exact: true }).click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

            // Close the Create form
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
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').fill('Saud Alsharif');
            await page.locator('td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('cell', { name: 'Saud Alsharif', exact: true }).locator('comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '⯆ Saud Alsharif' }).hover();
            await page.getByRole('cell', { name: '⯆ Saud Alsharif ' }).getByRole('combobox').hover();
            await page.getByRole('cell', { name: '⯆ Saud Alsharif ' }).locator('i').click();
            await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter By Position
            await page.locator('#autoComplete_dropdown_Position label').click();
            await page.getByRole('row', { name: ' Supervisor', exact: true }).locator('div').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.locator('td:nth-child(4) > .col-group-indent-1 > comp-field-view-type > span > comp-datatype').first()).toBeVisible();
            await page.getByRole('cell', { name: '⯆ Supervisor' }).hover();
            await page.getByRole('cell', { name: '⯆ Supervisor ' }).locator('label').hover();
            await page.locator('label').filter({ hasText: 'Supervisor' }).locator('i').click();

            // Filter By Email 
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').fill('s.alsharif@mawarid.com.sa');
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('table').locator('span').filter({ hasText: 's.alsharif@mawarid.com.sa' }).locator('comp-datatype').nth(0)).toBeVisible();
            await page.getByRole('cell', { name: '⯆ s.alsharif@mawarid.com.sa' }).hover();
            await page.getByRole('cell', { name: '⯆ s.alsharif@mawarid.com.sa ' }).getByRole('combobox').hover();
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
            await expect(page.locator('form div').filter({ hasText: 'User Id s.alsharif@mawarid.' }).nth(1)).toBeVisible();

            // Details Page Create 
            await expect(page.getByText('Customers')).toBeVisible();
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
            await page.locator('#DynamicCreate').getByText('Close').click();
            await expect(page.locator('td').filter({ hasText: 'CBN-' }).locator('a')).toBeVisible();
            await page.locator('td').filter({ hasText: 'CBN-' }).locator('a').click();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.locator('#page_left')).toContainText('Customer Details Code CBN-0009756 Name LG Support Email lg@mawaridservices.com Id CR Labor Office ID Sales Rep Name Sales Rep Email Sales Rep Phone Number VAT Number Short Name LG Project Supervisor faris alwgait Owner Nahar alshammari');
            await page.locator('#page_left').getByText('Close').click();
            await page.getByText('Close', { exact: true }).click();
            await page.getByRole('cell', { name: '⯆ s.alsharif@mawarid.com.sa' }).hover();
            await page.getByRole('cell', { name: '⯆ s.alsharif@mawarid.com.sa' }).locator('label').hover();
            await page.locator('label').filter({ hasText: 's.alsharif@mawarid.com.sa' }).locator('i').click();
        });

        test('Team Structure :should filter, select, and validate requests', async ({ page }) => {
            // menu navigation
            await page.locator('#MNU0000001').click();

            // Team Structure menu navigation
            await page.getByRole('link', { name: '﫟 Team Structure' }).click();
            await expect(page.locator('section').getByText('Team')).toBeVisible({ timeout: 20000 });
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExpor')).toBeVisible();
            await page.getByText('Options').click();

            // view tree structure
            await page.locator('.expandable-table-caret').first().click();
            await expect(page.getByRole('cell', { name: 'Mohamed Afrith' }).locator('a')).toBeVisible();
            await expect(page.getByRole('table').getByText('m.afrith@faaztechsolutions.com')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'Hyder', exact: true }).locator('a')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'hyder@faaztechsolutions.com' }).locator('comp-datatype')).toBeVisible();
            await expect(page.getByText('Supervisor').first()).toBeVisible();
            await page.locator('.col-group-indent-2 > span > .expandable-table-caret').first().click();
            await expect(page.getByText('Coordinator', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: 'Mohamed Idhris Viswa' }).locator('a')).toBeVisible();
            await expect(page.getByText('m.viswa@mawarid.com.sa')).toBeVisible();
            await page.getByRole('cell', { name: ' Supervisor' }).locator('span').nth(1).click();
            await page.getByRole('cell', { name: ' ProjectManager' }).locator('span').nth(1).click();
            await expect(page.getByRole('cell', { name: 'Mohamed Afrith' }).locator('a')).toBeVisible();

            // Details Page validation 
            await page.getByRole('cell', { name: 'Mohamed Afrith' }).locator('a').click();
            await expect(page.getByText('Coordinators Details')).toBeVisible();
            await expect(page.locator('dynamic-details')).toContainText('Coordinators Details User Id m.afrith Name Mohamed Afrith Email m.afrith@faaztechsolutions.com Mobile Number 0558165146 Position ProjectManager Reporting To Profile Signature Thanks & Regards,Mohamed Afrith Reporting Path Reporting Child m.afrith');
            await expect(page.getByText('Customers')).toBeVisible();

            // Details Page Create
            await page.getByText('Create', { exact: true }).click();
            await expect(page.locator('#DynamicCreate').getByText('Create')).toBeVisible();
            await expect(page.getByText('Coordinator * m.afrith Customer Code *')).toBeVisible();
            await page.waitForTimeout(3000); 
            await page.locator('#relation_autoComplete_dropdown_CustomerCode label').click();
            await page.locator('ul').filter({ hasText: 'of21' }).locator('a').nth(2).click();
            await expect(page.locator('#autoComplete_dropdown_CustomerCode input[name="currentPage"]')).toHaveValue('2');
            await page.locator('ul').filter({ hasText: 'of21' }).locator('a').nth(2).click();
            await page.locator('ul').filter({ hasText: 'of21' }).locator('a').nth(2).click();
            await expect(page.locator('#autoComplete_dropdown_CustomerCode input[name="currentPage"]')).toHaveValue('4');
            await page.locator('ul').filter({ hasText: 'of21' }).locator('a').nth(1).click();
            await page.locator('ul').filter({ hasText: 'of21' }).locator('a').first().click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').first().click();
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').first().fill('7291');
            await page.locator('#autoComplete_dropdown_tableCustomerCode input[type="text"]').first().press('Enter');
            await page.getByText('CBN0007291').click();
            await page.locator('#DynamicCreate').getByText('Close').click();
            await page.getByText('Close', { exact: true }).click();
        });

        test('Coordinator Customer :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000001').click();
            await page.getByRole('link', { name: ' Coordinator Customer' }).click();
            await expect(page.locator('section').getByText('Coordinator Customer')).toBeVisible({ timeout: 20000 });
            await performOptionExport(page);

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
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Filter By User id
            await page.locator('.Right > .d-flex > i').first().click();
            await page.waitForTimeout(2000); 
            await page.locator('#relation_autoComplete_dropdown_UserID label').click();
            await expect(page.getByText('a.hyder', { exact: true }).first()).toBeVisible();
            await expect(page.getByRole('cell', { name: '⯆  User Id  Name  Position' }).getByRole('spinbutton')).toHaveValue('1');
            await page.getByRole('list').filter({ hasText: 'of5' }).locator('a').nth(2).click();
            await expect(page.getByRole('cell', { name: '⯆  User Id  Name  Position' }).getByRole('spinbutton')).toHaveValue('2');
            await page.getByRole('list').filter({ hasText: 'of5' }).locator('a').nth(2).click();
            await expect(page.getByRole('cell', { name: '⯆  User Id  Name  Position' }).getByRole('spinbutton')).toHaveValue('3');
            await page.getByRole('list').filter({ hasText: 'of5' }).locator('a').nth(1).click();
            await expect(page.getByRole('cell', { name: '⯆  User Id  Name  Position' }).getByRole('spinbutton')).toHaveValue('2');
            await expect(page.locator('#autoComplete_dropdown_tableUserID').getByText('j.wilfred@mawarid.com.sa', { exact: true }).first()).toBeVisible({ timeout: 20000 });
            await page.getByRole('list').filter({ hasText: 'of5' }).locator('a').first().click();
            await expect(page.getByText('a.hyder', { exact: true }).first()).toBeVisible();
            await page.locator('#autoComplete_dropdown_tableUserID > comp-table > .table > thead > tr:nth-child(2) > td:nth-child(2) > .clearfix > .table_filter_text').click();
            await page.locator('#autoComplete_dropdown_tableUserID > comp-table > .table > thead > tr:nth-child(2) > td:nth-child(2) > .clearfix > .table_filter_text').fill('krishna');
            await page.keyboard.press('Enter');
            // await page.locator('#autoComplete_dropdown_tableUserID > comp-table > .table > thead > tr:nth-child(2) > td:nth-child(2) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByText('m.krishna', { exact: true })).toBeVisible();
            await page.getByText('m.krishna', { exact: true }).click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.getByRole('cell', { name: 'No Data Found' }).locator('div')).toBeVisible();

            // Clear User Id Filter
            await page.waitForTimeout(100);
            await page.getByRole('cell', { name: '⯆ Krishna' }).hover();
            await page.getByText('Krishna').nth(0).hover();
            await page.locator('label').filter({ hasText: 'Krishna' }).locator('i').click();
            await expect(page.getByRole('row', { name: 'm.viswa Mohamed Idhris Viswa m.viswa@mawarid.com.sa 0590362041 CBN0001030' }).locator('a').first()).toBeVisible();

            //User Id Details page
            await page.getByRole('row', { name: 'm.viswa Mohamed Idhris Viswa m.viswa@mawarid.com.sa 0590362041 CBN0001030' }).locator('a').first().click();
            await expect(page.getByText('Details Close')).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /^Coordinators Details$/ }).first()).toBeVisible();
            await expect(page.locator('form div').filter({ hasText: 'User Id m.viswa Name Mohamed' }).nth(1)).toBeVisible();
            await expect(page.getByText('Warm regards Mohamed Idhris,')).toBeVisible();
            // close Details page
            await page.getByText('Close', { exact: true }).click();

            // Customer Id Details Page validation
            await page.getByRole('cell', { name: 'CBN0001030' }).locator('a').click();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.locator('form div').filter({ hasText: 'Code CBN0001030 Name' }).nth(1)).toBeVisible();
            // close Customer Details Page 
            await page.getByText('Close', { exact: true }).click();

            // Filter By Coordinator Name
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').fill('Syed Azam');
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.locator('.card-body > comp-table > table > tbody > tr:nth-child(2) > td:nth-child(3) > .col-group-indent-1 > comp-field-view-type > span > comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '⯆ Syed Azam' }).click();
            await page.getByRole('cell', { name: '⯆ Syed Azam ' }).getByRole('textbox').nth(1).click();
            await page.getByRole('cell', { name: '⯆ Syed Azam ' }).locator('i').click();
            await expect(page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty();
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(4) > .clearfix > .table_filter_text').click();
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(4) > .clearfix > .table_filter_text').fill('s.azam@mawarid.com.sa');
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(4) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.locator('tr:nth-child(4) > td:nth-child(4) > .col-group-indent-1 > comp-field-view-type > span > comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '⯆ s.azam@mawarid.com.sa' }).hover();
            await page.getByRole('cell', { name: '⯆ s.azam@mawarid.com.sa ' }).getByRole('combobox').hover();
            await page.getByRole('cell', { name: '⯆ s.azam@mawarid.com.sa ' }).locator('i').click();
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
            await expect(page.getByRole('cell', { name: '⯆  Code  Name  Support' }).getByRole('textbox').nth(3)).toBeEmpty();
            await page.waitForTimeout(200);
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
            await page.getByRole('cell', { name: '⯆ CBN-' }).hover();
            await page.locator('label').filter({ hasText: 'CBN-' }).hover();
            await page.locator('label').filter({ hasText: 'CBN-' }).locator('span').click();

            // Filter By Customer Name
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(7) > .clearfix > .table_filter_text').click();
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(7) > .clearfix > .table_filter_text').fill('LG');
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(7) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('cell', { name: 'LG', exact: true }).locator('comp-datatype')).toBeVisible();

            await page.getByRole('cell', { name: '⯆ LG' }).click();
            await page.getByRole('cell', { name: '⯆ LG ' }).getByRole('textbox').nth(1).click();
            await page.getByRole('cell', { name: '⯆ LG ' }).locator('i').click();
            await expect(page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(7) > .clearfix > .table_filter_text')).toBeEmpty();

            // Filter By Customer Email
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(8) > .clearfix > .table_filter_text').click();
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(8) > .clearfix > .table_filter_text').fill('Barkat@mawaridservices.com');
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(8) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('cell', { name: 'Barkat@mawaridservices.com', exact: true }).locator('comp-datatype')).toBeVisible();
            await page.getByRole('cell', { name: '⯆ Barkat@mawaridservices.com' }).click();
            await page.getByRole('cell', { name: '⯆ Barkat@mawaridservices.com ' }).getByRole('textbox').nth(1).click();
            await page.getByRole('cell', { name: '⯆ Barkat@mawaridservices.com ' }).locator('i').click();
            await expect(page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(8) > .clearfix > .table_filter_text')).toBeEmpty();
            await page.locator('.Right > .d-flex > i').first().click();
        });

        test('My Customer :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000001').click();
            await page.getByRole('link', { name: '﨡 My Customer' }).click();
            await expect(page.getByText('My Customers')).toBeVisible({ timeout: 20000 });
            await performOptionExport(page);
            await expect(page.getByRole('cell', { name: 'مؤسسة غوار التجارية' }).locator('comp-datatype')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'Hyder' }).locator('comp-datatype')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'alsaif@mawaridservices.com' }).locator('comp-datatype')).toBeVisible();

            // details page 
            await page.getByRole('row', { name: 'CBN0001030' }).locator('a').click();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.locator('form div').filter({ hasText: 'Code CBN0001030 Name' }).nth(1)).toBeVisible();
            await expect(page.locator('form div').filter({ hasText: 'Short Name Project Supervisor' }).nth(1)).toBeVisible();
            await page.getByText('Close', { exact: true }).click();

        });

        test('My Signature :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000001').click();
            await page.getByRole('link', { name: ' My Signature' }).click();
            await expect(page.getByText('My customization')).toBeVisible();
            await performOptionExport(page);
            await page.getByText('View').click();
            await expect(page.getByText('×Thanks & RegardsHyder Ali,')).toBeVisible();
            await page.getByLabel('Close').click();
        });
    });

    test.describe('Approvals', () => {
        test('My Pending Approvals :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000058').click();
            await page.getByRole('link', { name: ' My Pending Approvals' }).click();
            await expect(page.locator('section').getByText('My Pending Approvals')).toBeVisible({ timeout: 20000 });
            await performOptionExport(page);

            // Filter By Id
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000059').getByRole('textbox').click();
            await page.getByText('ApproverId').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('APR0001352');
            await page.getByRole('button', { name: ' Search' }).click();

            // Appoval Details Page
            await page.locator('#td_content_0_0 comp-field-view-type a').nth(0).click();
            await expect(page.locator('dynamic-details form div').filter({ hasText: 'Approver a.hyder Requester' }).nth(1)).toBeVisible({ timeout: 20000 });
            await page.getByRole('link', { name: 'Approve' }).click();
            await expect(page.locator('#Actionform_EFN0000064').getByText('Approve')).toBeVisible();
            await expect(page.getByPlaceholder('Comments')).toBeVisible();
            await page.getByText('Close', { exact: true }).click();
            await page.getByRole('link', { name: 'Reject' }).click();
            await expect(page.locator('#Actionform_EFN0000065 div').filter({ hasText: 'Reject' }).nth(2)).toBeVisible();
            await expect(page.getByPlaceholder('Comments')).toBeVisible();
            await page.getByText('Close', { exact: true }).click();
            await expect(page.locator('a').filter({ hasText: 'Conversation' })).toBeVisible();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('a').filter({ hasText: 'Ticket Details' }).click();
            await expect(page.getByRole('heading', { name: '[MWD0016523] Test mail' })).toBeVisible({ timeout: 20000 });
            await expect(page.getByText('Schedule Close Pickup Assign Ticket Attach Schedule Close Pickup Assign Ticket')).toBeVisible({ timeout: 20000 });

            // close Details Page 
            await page.getByLabel('Close').locator('i').click();
            // clear filter 
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000059').getByRole('textbox')).toBeEmpty();
            await page.locator('.Right > .d-flex > i').first().click();
        });

        test('My Complected Approvals :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000058').click();
            await page.getByRole('link', { name: ' My Completed Approvals' }).click();
            await expect(page.locator('section').getByText('My Completed Approvals')).toBeVisible({ timeout: 20000 });
            
            // Options & Export 
            await performOptionExport(page);

            // Filter By Approvel Id 
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000061').getByRole('textbox').click();
            await page.getByRole('option', { name: 'ApproverId' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('APR0001353');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.getByRole('heading', { name: 'APR0001353' })).toBeVisible();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();

            // Approval Details Page
            await expect(page.getByRole('heading', { name: 'Approvals Details' })).toBeVisible({ timeout: 20000 });
            await expect(page.locator('dynamic-details form div').filter({ hasText: 'Approver a.hyder Requester' }).nth(1)).toBeVisible();
            await expect(page.locator('a').filter({ hasText: 'Conversation' })).toBeVisible();
            await expect(page.getByText('Status: Rejected')).toBeVisible();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('a').filter({ hasText: 'Ticket Details' }).click();
            await expect(page.getByRole('heading', { name: '[MWD0016521] Test ticket (' })).toBeVisible({ timeout: 20000 });

            // close Details Page
            await page.getByLabel('Close').locator('i').click();

            // clear filter 
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000061').getByRole('textbox')).toBeVisible({ timeout: 20000 });
            await expect(page.locator('#dynamic_list_EFN0000061').getByRole('textbox')).toBeEmpty();
            await page.locator('.Right > .d-flex > i').first().click();
        });

        test('My All Approvals :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000058').click();
            await page.getByRole('link', { name: ' My All Approvals' }).click();
            await expect(page.getByText('My All Aprovals')).toBeVisible({ timeout: 20000 });
            await page.getByText('Options').click();
            await expect(page.getByRole('list').filter({ hasText: 'Export SelectedExport' }).locator('div').first()).toBeVisible();
            await page.getByText('Options').click();

            // Filter By Approvel Id 
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000060').getByRole('textbox').click();
            await page.getByRole('option', { name: 'ApproverId' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('APR0001353');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.getByRole('heading', { name: 'APR0001353' })).toBeVisible();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();

            // Approval Details Page
            await expect(page.getByRole('heading', { name: 'Approvals Details' })).toBeVisible();
            await expect(page.locator('dynamic-details form div').filter({ hasText: 'Approver a.hyder Requester' }).nth(1)).toBeVisible();
            await expect(page.locator('a').filter({ hasText: 'Conversation' })).toBeVisible();
            await expect(page.getByText('Status: Rejected')).toBeVisible();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('a').filter({ hasText: 'Ticket Details' }).click();
            await expect(page.getByRole('heading', { name: '[MWD0016521] Test ticket (' })).toBeVisible({ timeout: 20000 });

            // close Details Page
            await page.getByLabel('Close').locator('i').click();

            // clear filter 
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000060').getByRole('textbox')).toBeEmpty({ timeout: 20000 });
            await page.locator('.Right > .d-flex > i').first().click();
        });

        test('Me Sent Approvals :should filter, select, and validate requests', async ({ page }) => {
            await page.locator('#MNU0000058').click();
            await page.getByRole('link', { name: ' Me Send Approvals' }).click();
            await expect(page.locator('section').getByText('Me Send Approvals')).toBeVisible();
            await page.getByText('Options').click();
            await expect(page.getByRole('list').filter({ hasText: 'Export SelectedExport' }).locator('div').first()).toBeVisible();
            await page.getByText('Options').click();

            // Filter By Approvel Id 
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000152').getByRole('textbox').click();
            await page.getByText('ApproverId').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('APR0001350');
            await page.getByRole('button', { name: ' Search' }).click();
            await expect(page.getByRole('listitem').filter({ hasText: 'APR0001350Approver m.krishna' })).toBeVisible();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();

            // Approval Details Page
            await expect(page.getByRole('heading', { name: 'Approvals Details' })).toBeVisible();
            await expect(page.getByText('Approvals Details Approver m.')).toBeVisible();
            // Request Id Details Page 
            await page.locator('a').filter({ hasText: 'MWD0016843' }).click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Tickets Details')).toBeVisible({ timeout: 20000 });
            await page.locator('dynamic-details').filter({ hasText: 'Approvals Details Approver m.' }).locator('button').click();

            // Conversation Tab 
            await expect(page.locator('a').filter({ hasText: 'Conversation' })).toBeVisible();
            await expect(page.getByText('Status: Approved')).toBeVisible();

            // Ticket Details Tab 
            await page.locator('a').filter({ hasText: 'Ticket Details' }).click();
            await expect(page.getByRole('heading', { name: '[MWD0016843] New Test asd' })).toBeVisible({ timeout: 20000 });

            // close Details Page
            await page.getByLabel('Close').locator('i').click();

            // clear filter 
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000152').getByRole('textbox')).toBeEmpty({ timeout: 20000 });
            await page.locator('.Right > .d-flex > i').first().click();
        });
    });

    test.describe('Reports', () => {
        test.skip('Tickets By Customer :should filter, select, and validate requests', async ({ page }) => {
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
            await page.locator('input[type="text"]').nth(1).fill('CBN0001030');
            await page.locator('input[type="text"]').nth(1).press('Enter');
            await page.locator('#autoComplete_dropdown_tableCustomerID').getByText('CBN0001030').click();
            await page.getByText('Filter').click();

            await page.getByText('Clear').click();
            await expect(page.getByPlaceholder('To Date')).toBeEmpty();
            await expect(page.getByPlaceholder('From Date')).toBeEmpty();

            // // Chart
            // await page.locator('a').filter({ hasText: 'Chart' }).click();
            // await expect(page.getByText('Ticket Chart By Customer')).toBeVisible();
            // await page.getByText('Options').click();
            // await expect(page.getByText('Export SelectedExportExport')).toBeVisible();
            // await page.getByText('Options').click();
            // await expect(page.locator('canvas').nth(1)).toBeVisible();
        });

        test.skip('Request By Coordinator :should filter, select, and validate requests', async ({ page }) => {
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

    test.describe('All Items', () => {
        test('All Tickets :should filter, select, and validate requests', async ({ page }) => {
            // menu Navigation 
            await page.locator('#MNU0000102').click();

            // Submenu Navigation 
            await page.getByRole('link', { name: ' All Ticket' }).click();

            // Options and Export
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExport')).toBeVisible();
            await page.getByText('Options').click();

            // Filter By Id 
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000221').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Ticket ID' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('MWD0017196');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.getByText('MWD0017196')).toBeVisible({ timeout: 20000 });
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'Automation test ticket Don\'t Take Any Actions - Scheduled' }).locator('a')).toBeVisible();
            await expect(page.getByText('Scheduled', { exact: true })).toBeVisible({ timeout: 20000 });

            // Go to Ticket details
            await page.locator('comp-field-view-type').filter({ hasText: 'Automation test ticket Don\'t' }).locator('a').click();
            await expect(page.getByRole('heading', { name: '[MWD0017196] Automation test' })).toBeVisible({ timeout: 20000 });
            await expect(page.getByText('Ticket ID MWD0017196 Subject')).toBeVisible({ timeout: 30000 });
            await expect(page.locator('dynamic-details form div').filter({ hasText: 'Category Channel Email' }).nth(1)).toBeVisible();

            // Close Action
            await performCloseAction(page);

            // Start Action 
            await page.getByRole('link', { name: 'Start' }).click();
            await expect(page.locator('#Actionform_EFN0000019').getByText('Start')).toBeVisible();
            await page.getByPlaceholder('Comments').click({ timeout: 20000 });
            await page.getByPlaceholder('Comments').fill('test');
            await page.locator('#Actionform_EFN0000019').getByText('Close').click();

            // Pickup Action
            await performPickupAction(page);

            // Assign Action 
            await AssignActionForAssignedTickets(page);

            // Ticket Action 
            await performTicketAction(page);

            // Attach Action 
            await performAttachmentAction(page);

            // Customer Details 
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0017196 Subject' }).locator('a').click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Customer Details')).toBeVisible();
            await expect(page.getByText('CBN0001030', { exact: true })).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /^alsaif@mawaridservices\.com$/ })).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Close Start Pickup Assign' }).locator('button').click();

            // Comments Sub Action 
            await page.getByRole('link', { name: ' Comments' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');

            // Notes Sub Action
            await page.getByRole('link', { name: ' Notes' }).click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('#angular_editor_ETN0000007_Notes div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test Note');
            await page.getByRole('button', { name: 'Close' }).click({ timeout: 20000 });

            // Sent Approval Sub Action 
            await page.getByRole('link', { name: '魯 Send Approval' }).click();
            // SA Dropdown
            await page.locator('#autoComplete_dropdown_Approver label').nth(1).click();
            await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible({ timeout: 30000 });
            // SA Pagination
            await page.getByText('page 2').click();
            await expect(page.getByText('a.alangari@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('page 3').click();
            await page.getByText('page 4').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await expect(page.getByText('a.alqahtani@mawarid.com.sa').first()).toBeVisible();
            await page.getByText('Previous page').click();
            await page.getByText('Previous page').click();
            await page.getByText('page 1', { exact: true }).click();
            await expect(page.getByText('a.abdelhakim@mawarid.com.sa').first()).toBeVisible();
            // Search By User Id 
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('hyder');
            await expect(page.getByRole('cell', { name: 'a.hyder' }).locator('div')).toBeVisible();
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('');
            // Search By Name
            await page.getByRole('searchbox').nth(1).click();
            await page.getByRole('searchbox').nth(1).fill('hyder');
            await expect(page.getByRole('cell', { name: 'Hyder Ali A' }).locator('div')).toBeVisible();
            await page.getByRole('searchbox').nth(1).click();
            await page.getByRole('searchbox').nth(1).fill('');
            // Search By Email 
            await page.getByRole('searchbox').nth(2).click();
            await page.getByRole('searchbox').nth(2).fill('hyder');
            await expect(page.getByText('hyder@faaztechsolutions.com')).toBeVisible();
            await page.getByText('hyder@faaztechsolutions.com').click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).click();
            await page.getByRole('textbox', { name: 'Comments Comments Comments *' }).fill('test comments');
            await page.getByRole('button', { name: 'Close' }).click();

            // Conversation Tab
            await expect(page.locator('b').filter({ hasText: 'alsaif@mawaridservices.com' })).toBeVisible();
            await expect(page.getByText('Dear Customer')).toBeVisible();
            await expect(page.getByText('Ticket Information')).toBeVisible();
            await expect(page.getByText('Ticket ID : MWD0017196')).toBeVisible();
            await expect(page.getByText('Title : Automation test')).toBeVisible();
            await expect(page.locator('#commentscollapse_3').getByText('Automation test ticket Don\'t')).toBeVisible();
            // Reply 
            await page.getByRole('link', { name: ' Reply' }).first().click();
            await expect(page.locator('#Actionform_EFN0000234').getByText('Reply', { exact: true })).toBeVisible({ timeout: 20000 });
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.getByPlaceholder('Bcc')).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Files')).toBeVisible();
            await expect(page.locator('#file_Files')).toBeVisible();
            await page.locator('#Actionform_EFN0000234').getByText('Close').click();
            // Forward
            await page.getByRole('link', { name: ' Forward' }).first().click();
            await expect(page.locator('#Actionform_EFN0000235').getByText('Forward')).toBeVisible({ timeout: 20000 });
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.locator('#CcRecipients div').nth(1)).toBeVisible();
            await expect(page.locator('#BccRecipients div').nth(1)).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Thanks & RegardsHyder Ali,')).toBeVisible();
            await expect(page.locator('#Actionform_EFN0000235 dynamic-view div').filter({ hasText: 'Files Drag and drop a file or' }).nth(1)).toBeVisible();
            await page.locator('#Actionform_EFN0000235').getByText('Close').click();

            // Ticket Tab
            await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
            await expect(page.getByText('Request Id')).toBeVisible();
            await expect(page.getByText('Title', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
            await expect(page.getByText('Ticket Category')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Assigned To  ' })).toBeVisible();
            await expect(page.getByText('Ticket Type')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Scheduled Date  ' })).toBeVisible();
            await expect(page.getByText('Duration').first()).toBeVisible();
            await expect(page.getByText('Description').nth(1)).toBeVisible();

            // Approval Tab
            await page.locator('[id^="cdk-drop-list"] a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByText('Approver Id')).toBeVisible();
            await expect(page.getByText('Approver', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();
            await expect(page.getByText('Approval Comments')).toBeVisible();

            // Attachment Tab 
            await attachmentTab(page);

            // Status History Tab  
            await page.locator('a').filter({ hasText: 'Status History' }).click();
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
            await expect(page.getByText('System Comments')).toBeVisible();
            await expect(page.locator('#dynamic_list_EFN0000382').getByText('MWD0017196')).toBeVisible();
            await expect(page.getByRole('table').getByText('Scheduled', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: 'Status Change form New to' }).locator('comp-datatype')).toBeVisible();

            // close the Ticket details page 
            await page.getByLabel('Close').locator('i').click();

            // Clear the filters 
            await expect(page.getByRole('textbox').nth(3)).toHaveValue('MWD0017196');
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000221').getByRole('textbox')).toBeEmpty();
            await page.locator('.Right > .d-flex > i').first().click();
        });

        test('All Closed Tickets :should filter, select, and validate requests', async ({ page }) => {
            // menu Navigation 
            await page.locator('#MNU0000102').click();

            // Submenu Navigation 
            await page.getByRole('link', { name: ' All Closed Tickets' }).click();

            // Options and Export 
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExport')).toBeVisible();
            await page.getByText('Options').click();

            // Filter By Id 
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000232').getByRole('textbox').click();
            await page.getByText('Ticket ID').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('MWD0016530');
            await page.getByRole('button', { name: ' Search' }).click();
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'Test Mail From Dev Mobile -' }).locator('a')).toBeVisible();
            await expect(page.getByText('MWD0016530')).toBeVisible();

            // Go to Ticket details
            await page.locator('comp-field-view-type').filter({ hasText: 'Test Mail From Dev Mobile -' }).locator('a').click();
            await expect(page.getByRole('heading', { name: '[MWD0016530] Test Mail From' })).toBeVisible({ timeout: 30000 });
            await expect(page.getByText('Ticket ID MWD0016530 Subject')).toBeVisible({ timeout: 20000 });
            await expect(page.locator('dynamic-details form div').filter({ hasText: 'Category Channel Assigned To' }).nth(1)).toBeVisible();

            // Reopen Action Verification
            await page.getByRole('link', { name: 'Re Open' }).click();
            await expect(page.locator('#Actionform_EFN0000020').getByText('ReOpen')).toBeVisible();
            await expect(page.getByPlaceholder('Comments')).toHaveValue('Test closed comment');
            await page.getByText('Close', { exact: true }).click();

            // Pickup Action
            await performPickupAction(page);

            // Assign Action
            await AssignActionForAssignedTickets(page);

            // Ticket Action 
            await performTicketAction(page);

            // Attach Action 
            await performAttachmentAction(page);

            // Customer Details 
            await page.locator('dynamic-field').filter({ hasText: 'Ticket ID MWD0016530 Subject' }).locator('a').click();
            await expect(page.getByText('Details', { exact: true })).toBeVisible();
            await expect(page.getByText('Customer Details')).toBeVisible({ timeout: 20000 });
            await expect(page.getByText('CBN0001030', { exact: true })).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /^alsaif@mawaridservices\.com$/ })).toBeVisible();
            await page.locator('dynamic-details').filter({ hasText: 'Re Open Pickup Assign Ticket' }).locator('button').click();

            // Conversation Tab
            await expect(page.locator('b').filter({ hasText: 'alsaif@mawaridservices.com' })).toBeVisible();
            await expect(page.getByRole('listitem').filter({ hasText: 'HHyder Ali A Assigned To' })).toBeVisible();
            await expect(page.locator('div').filter({ hasText: /^Krishna$/ })).toBeVisible();
            await expect(page.getByText('@Krishna @Mohamed Afrith @Ajeesh Nasar Sheik Ismail')).toBeVisible();
            await expect(page.locator('#dynamic_list_EFN0000012').getByRole('list').locator('div').filter({ hasText: 'alsaif@mawaridservices.comTo' }).nth(1)).toBeVisible();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('Test');

            // Reply 
            await page.getByRole('link', { name: ' Reply' }).first().click({ timeout: 20000 });
            await expect(page.locator('#Actionform_EFN0000234').getByText('Reply', { exact: true })).toBeVisible({ timeout: 20000 });
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.getByPlaceholder('Bcc')).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Files')).toBeVisible();
            await expect(page.locator('#file_Files')).toBeVisible();
            await page.locator('#Actionform_EFN0000234').getByText('Close').click();
            // Forward
            await page.getByRole('link', { name: ' Forward' }).first().click();
            await expect(page.locator('#Actionform_EFN0000235').getByText('Forward')).toBeVisible({ timeout: 30000 });
            await expect(page.locator('#ToRecipients').getByText('m.krishna@faaztechsolutions.')).toBeVisible();
            await expect(page.locator('#CcRecipients div').nth(1)).toBeVisible();
            await expect(page.locator('#BccRecipients div').nth(1)).toBeVisible();
            await expect(page.locator('dynamic-field').filter({ hasText: 'Subject Subject' }).locator('#dynamic-undefined-undefined')).toBeVisible();
            await expect(page.getByText('Thanks & RegardsHyder Ali,').nth(1)).toBeVisible();
            await expect(page.locator('#Actionform_EFN0000235 dynamic-view div').filter({ hasText: 'Files Drag and drop a file or' }).nth(1)).toBeVisible();
            await page.locator('#Actionform_EFN0000235').getByText('Close').click();

            // Ticket Tab
            await page.getByRole('list').filter({ hasText: 'Conversation Ticket Approvals' }).locator('a').nth(1).click();
            await expect(page.getByText('Request Id')).toBeVisible();
            await expect(page.getByText('Title', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
            await expect(page.getByText('Ticket Category')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Assigned To  ' })).toBeVisible();
            await expect(page.getByText('Ticket Type')).toBeVisible({ timeout: 20000 });
            await expect(page.getByText('Duration').first()).toBeVisible({ timeout: 20000 });
            await expect(page.getByText('Description').nth(1)).toBeVisible({ timeout: 20000 });

            // Approval Tab
            await page.locator('[id^="cdk-drop-list"] a').filter({ hasText: 'Approvals' }).click();
            await expect(page.getByText('Approver Id')).toBeVisible();
            await expect(page.getByText('Approver', { exact: true })).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Created By  ' })).toBeVisible();
            await expect(page.getByText('Approval Comments')).toBeVisible();

            // Attachment Tab 
            await attachmentTab(page);

            // Status History Tab  
            await page.locator('a').filter({ hasText: 'Status History' }).click({ timeout: 20000 });
            await expect(page.getByText('Ticket Id', { exact: true })).toBeVisible({ timeout: 20000 });
            await expect(page.locator('#dynamic_list_EFN0000382').getByText('MWD0016530')).toBeVisible();
            await expect(page.getByRole('cell', { name: ' Status  ' })).toBeVisible();
            await expect(page.getByRole('table').getByText('Closed', { exact: true })).toBeVisible();

            // close the Ticket details page 
            await page.getByLabel('Close').locator('i').click();

            // Clear the filters 
            await expect(page.getByRole('textbox').nth(3)).toHaveValue('MWD0016530');
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000232').getByRole('textbox')).toBeEmpty();
            await page.locator('.Right > .d-flex > i').first().click();
        });

        test('All Emails :should filter, select, and validate requests', async ({ page }) => {
            // menu Navigation
            await page.locator('#MNU0000102').click();

            // Submenu Navigation
            await page.getByRole('link', { name: ' All Emails' }).click();
            await expect(page.locator('section').getByText('All Emails')).toBeVisible({ timeout: 20000 });

            // options and Export 
            await performOptionExport(page);

            // pagination
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await page.locator('comp-pagination a').nth(2).click();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').first().click();

            // Filter By subject
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000041').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Subject' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('inprogress');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'm.krishna@faaztechsolutions.' }).locator('a')).toBeVisible();
            await expect(page.locator('span').filter({ hasText: 'Tickets' })).toBeVisible();

            // Go to Email details 
            await page.locator('comp-field-view-type').filter({ hasText: 'm.krishna@faaztechsolutions.' }).locator('a').click();
            await expect(page.getByRole('heading', { name: '[MWD0017197] Automation test' })).toBeVisible();
            await expect(page.locator('#custom_template_dynamic_list_EFN0000229 div').filter({ hasText: 'm.krishna@faaztechsolutions.com To: alsaif@mawaridservices.com Cc: Automation' }).nth(2)).toBeVisible();

            // close the Email details page 
            await page.getByLabel('Close').locator('i').click();

            // // view options
            // await page.getByRole('listitem').filter({ hasText: 'm. m.krishna@' }).getByRole('strong').click();
            // await expect(page.getByText('Automation test ticket Don\'t Take Any Actions - status: InProgress.')).toBeVisible({ timeout: 20000 });
            // await page.getByLabel('Close').click();

            // Clear the filters 
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000041').getByRole('textbox')).toBeEmpty();
            await page.locator('.Right > .d-flex > i').first().click();
        });

        test('All Received Emails :should filter, select, and validate requests', async ({ page }) => {
            // menu Navigation
            await page.locator('#MNU0000102').click();

            // Submenu Navigation
            await page.getByRole('link', { name: '綠 All Received Emails' }).click();
            await expect(page.locator('section').getByText('Received Emails')).toBeVisible();

            // options and Export 
            await performOptionExport(page);

            // pagination
            await expect(page.getByRole('spinbutton')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await page.locator('comp-pagination a').nth(2).click();
            await page.locator('comp-pagination a').nth(1).click();
            await page.locator('comp-pagination a').first().click();

            // Filter By subject
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000242').getByRole('textbox').click();
            await page.getByRole('option', { name: 'Subject' }).click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('inprogress');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.locator('comp-field-view-type').filter({ hasText: 'm.krishna@faaztechsolutions.' }).locator('a')).toBeVisible();
            await expect(page.locator('span').filter({ hasText: 'Tickets' })).toBeVisible();

            // Go to Email details 
            await page.locator('comp-field-view-type').filter({ hasText: 'm.krishna@faaztechsolutions.' }).locator('a').click();
            await expect(page.getByRole('heading', { name: '[MWD0017197] Automation test' })).toBeVisible();
            await expect(page.locator('#custom_template_dynamic_list_EFN0000229 div').filter({ hasText: 'm.krishna@faaztechsolutions.com To: alsaif@mawaridservices.com Cc: Automation' }).nth(2)).toBeVisible();

            // close the Email details page 
            await page.getByLabel('Close').locator('i').click();

            // view options
            // After fix wright the balance test
            // await page.getByRole('listitem').filter({ hasText: 'm. m.krishna@' }).getByRole('strong').click();
            // await expect(page.getByText('Automation test ticket Don\'t Take Any Actions - status: InProgress.')).toBeVisible();
            // await page.getByLabel('Close').click();

            // Clear the filters 
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000242').getByRole('textbox')).toBeEmpty();
            await page.locator('.Right > .d-flex > i').first().click();
        });

        test('All Send Emails :should filter, select, and validate requests', async ({ page }) => {
            // menu Navigation 
            await page.locator('#nav_link_11').click();

            // Submenu Navigation
            await page.getByRole('link', { name: '賂 All Send Emails' }).click();

            // options and Export
            await expect(page.getByText('Options')).toBeVisible({ timeout: 20000 });
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExport')).toBeVisible();
            await page.getByText('Options').click();

            // pagination 
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('3');
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.getByRole('spinbutton')).toHaveValue('2');
            await page.locator('comp-pagination a').first().click();
            await expect(page.getByRole('spinbutton')).toHaveValue('1');

            // Filter subject
            await page.locator('.Right > .d-flex > i').first().click();

            await page.locator('#dynamic_list_EFN0000243').getByRole('textbox').click();
            await page.getByText('Subject').click();
            await page.getByRole('textbox').nth(3).click();

            await page.getByRole('textbox').nth(3).fill('Actions - Scheduled');
            await page.getByRole('button', { name: ' Search' }).click();
            await expect(page.getByText('RE: [MWD0017196] - Automation test ticket Don\'t Take Any Actions - Scheduled', { exact: true })).toBeVisible();
            await expect(page.locator('span').filter({ hasText: 'Reply' })).toBeVisible();
            await expect(page.getByText('03/11/')).toBeVisible();

            // Go to Email details 
            await page.locator('comp-field-view-type').filter({ hasText: 'alsaif@mawaridservices.com' }).locator('a').click();
            await expect(page.getByRole('heading', { name: '[MWD0017196] RE: [MWD0017196' })).toBeVisible();
            await expect(page.locator('#custom_template_dynamic_list_EFN0000229 div').filter({ hasText: 'alsaif@mawaridservices.com To: m.krishna@faaztechsolutions.com Cc: Dear' }).nth(2)).toBeVisible();

            // close the Email details page 
            await page.getByLabel('Close').locator('i').click();

            // view options 
            await page.getByText('View').click();
            await expect(page.locator('list'))
                .toContainText('×Dear Customer,Thank you for contacting usYour ticket has been created successfully. Ticket Information:-Ticket ID : MWD0017196Title : Automation test ticket Don\'t Take Any Actions - ScheduledStatus : NewOur Team will review the ticket and process your request shortly. We will keep you updated on the progress.Regards,Corporate Care Team');
            await page.getByLabel('Close').click();

            // Clear the filters
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000243').getByRole('textbox')).toBeEmpty();
            await page.locator('.Right > .d-flex > i').first().click();
        });

        test('All Approvals :should filter, select, and validate requests', async ({ page }) => {
            // menu Navigation
            await page.locator('#MNU0000102').click();
            // Submenu Navigation
            await page.getByRole('link', { name: ' All Approvals' }).click();

            // options and Export 
            await expect(page.getByText('Options')).toBeVisible({ timeout: 20000 });
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExport')).toBeVisible();
            await page.getByText('Options').click();

            // Filter By Id
            await page.locator('.Right > .d-flex > i').first().click();
            await page.locator('#dynamic_list_EFN0000228').getByRole('textbox').click();
            await page.getByText('ApproverId').click();
            await page.getByRole('textbox').nth(3).click();
            await page.getByRole('textbox').nth(3).fill('APR0001353');
            await page.getByRole('textbox').nth(3).press('Enter');
            await expect(page.getByRole('heading', { name: 'APR0001353' })).toBeVisible();
            await page.locator('#td_content_0_0 comp-field-view-type a').click();

            // Approval Details Page
            await expect(page.getByRole('heading', { name: 'Approvals Details' })).toBeVisible({ timeout: 20000 });
            await expect(page.locator('dynamic-details form div').filter({ hasText: 'Approver a.hyder Requester' }).nth(1)).toBeVisible();
            await expect(page.locator('a').filter({ hasText: 'Conversation' })).toBeVisible();
            await expect(page.getByText('Status: Rejected')).toBeVisible();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').click();
            await page.locator('div').filter({ hasText: /^Type here\.\.\.$/ }).locator('div').fill('test');
            await page.locator('a').filter({ hasText: 'Ticket Details' }).click();
            await expect(page.getByRole('heading', { name: '[MWD0016521] Test ticket (' })).toBeVisible({ timeout: 20000 });

            // close Details Page
            await page.getByLabel('Close').locator('i').click();

            // clear filter 
            await page.getByRole('button', { name: ' Clear' }).click();
            await expect(page.locator('#dynamic_list_EFN0000228').getByRole('textbox')).toBeEmpty({ timeout: 20000 });
            await page.locator('.Right > .d-flex > i').first().click();
        });
    });
});