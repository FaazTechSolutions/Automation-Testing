import { test, expect, Page } from '@playwright/test';


test.describe('recruitment', () => {

    test.beforeEach(async ({ page }) => {
        await test.step('go to the helpdesk app', async () => {
            await page.goto('https://portal.mawarid.com.sa/apps4x/', { timeout: 60000 });
            await expect(page.getByRole('link', { name: 'Recruitment' })).toBeVisible({ timeout: 40000 });
            await page.getByRole('link', { name: 'Recruitment' }).click();
        });
    });

    test('agent menu', async ({ page }) => {
        await expect(page.locator('section').getByText('Agent', { exact: true })).toBeVisible({ timeout: 20000 });

        // option export 
        await page.getByText('Options').click();
        await expect(page.getByText('Export SelectedExport')).toBeVisible();
        await page.getByText('Options').click();

        // create 
        await page.getByRole('button', { name: ' Create' }).click();
        await expect(page.locator('dynamic-view div').filter({ hasText: 'Personal Information Agent Id' }).nth(1)).toBeVisible();
        await expect(page.locator('dynamic-view div').filter({ hasText: 'Contact Details Contact' }).nth(1)).toBeVisible();
        await expect(page.locator('dynamic-view div').filter({ hasText: 'Address Contact Address' }).nth(1)).toBeVisible();
        await expect(page.locator('dynamic-view div').filter({ hasText: 'Profile Img Profile' }).nth(1)).toBeVisible();
        // close the create
        await page.getByText('Close').click();

        // pagination validation
        await expect(page.getByRole('spinbutton')).toHaveValue('1');
        await page.locator('comp-pagination a').nth(2).click();
        await expect(page.getByRole('spinbutton')).toHaveValue('2');
        await expect(page.getByRole('cell', { name: 'AGN0000014' }).locator('a')).toBeVisible();
        await page.locator('comp-pagination a').nth(2).click();
        await expect(page.getByRole('cell', { name: 'AGN0000025' }).locator('a')).toBeVisible();
        await page.locator('comp-pagination a').nth(1).click();
        await expect(page.getByRole('spinbutton')).toHaveValue('2');
        await expect(page.getByRole('cell', { name: 'AGN0000015' }).locator('a')).toBeVisible();
        await page.locator('comp-pagination a').first().click();
        await expect(page.getByRole('cell', { name: 'AGN0000006' }).locator('a')).toBeVisible();

        // filter by agentId
        await page.locator('.Right > .d-flex > i').first().click();
        await page.locator('.table_filter_text').first().click();
        await page.locator('.table_filter_text').first().fill('AGN0000021');
        await page.getByRole('cell', { name: 'AGN0000021 ' }).getByRole('textbox').press('Enter');
        await expect(page.locator('td').filter({ hasText: 'AGN0000021' }).locator('a')).toBeVisible({ timeout: 10000 });
        await expect(page.getByText('Soundlines', { exact: true }).first()).toBeVisible();
        await expect(page.getByRole('table').getByText('India')).toBeVisible();

        // details page
        await page.locator('td').filter({ hasText: 'AGN0000021' }).locator('a').click();
        await expect(page.locator('widget-custom-template div').filter({ hasText: 'Soundlines Agent ID:' }).nth(3)).toBeVisible();
        await expect(page.locator('widget-custom-template')).toContainText('Personal Information Name: Soundlines Email: Soundlines_line@gmail.com Agent ID: AGN0000021 License No: Soundlines');
        await expect(page.getByText('Contact Details Contact')).toBeVisible();
        await expect(page.getByText('Address Address: Street: City')).toBeVisible();
        await expect(page.locator('#page_left').getByText('Users')).toBeVisible();
        await expect(page.getByTitle('AGN0000021')).toBeVisible();

        // details page - user table - action
        await page.locator('td').filter({ hasText: 'Action' }).locator('button').click();
        await page.locator('td').filter({ hasText: 'Action Update' }).locator('a').click();
        await expect(page.locator('dynamic-widget div').filter({ hasText: 'Agent User Update' }).nth(3)).toBeVisible();
        await expect(page.getByPlaceholder('Name')).toBeVisible();
        await page.locator('#autoComplete_dropdown_RoleId').getByText('Agent Portal Admin').click();
        await expect(page.getByText('Agent Portal User')).toBeVisible();
        // close the update form
        await page.locator('dynamic-widget button').first().click();

        // details page - user table - create
        await page.locator('#page_left').getByText('Create').click();
        await expect(page.locator('dynamic-widget div').filter({ hasText: 'Agent User Create' }).nth(3)).toBeVisible();
        await expect(page.locator('form div').filter({ hasText: 'Name * User Id * Email *' }).nth(1)).toBeVisible();
        await page.locator('#autoComplete_dropdown_RoleId label').click();
        await page.getByText('Agent Portal User').click();
        await page.locator('#page_left').getByText('Close').click();

        // close the deatils page 
        await page.getByText('Close').click();

        // clear the filter 
        await page.locator('section div').filter({ hasText: 'Agent Options Export SelectedExport AllExport VisibleFilterAdd ConditionAdd' }).nth(3).hover();
        await page.getByRole('cell', { name: 'pin Agent Id  ' }).hover();
        await page.getByRole('table').locator('thead').getByRole('cell', { name: 'AGN0000021' }).hover();
        await page.getByRole('cell', { name: 'AGN0000021 ' }).getByRole('textbox').hover();
        await page.getByRole('cell', { name: 'AGN0000021 ' }).locator('i').click();
        await expect(page.locator('.table_filter_text').first()).toBeEmpty();

        // list page multisearch 
        await page.locator('.position-relative > .fas').click();
        await expect(page.getByText('Multiple Search')).toBeVisible();
        await page.locator('ng-select').filter({ hasText: 'select Field' }).locator('input[type="text"]').click();
        await page.locator('form div').filter({ hasText: 'Search Fieldselect' }).locator('input[type="text"]').fill('id');
        await page.getByText('AgentId', { exact: true }).click();
        await page.getByPlaceholder('Values are separated by').click();
        await page.getByPlaceholder('Values are separated by').fill('AGN0000009\nAGN0000019\nAGN0000030');
        await page.getByText('Search', { exact: true }).click();
        await expect(page.getByRole('cell', { name: 'AGN0000009' }).locator('a')).toBeVisible();
        await expect(page.getByRole('cell', { name: 'AGN0000019' }).locator('a')).toBeVisible();
        await expect(page.getByRole('cell', { name: 'AGN0000030' }).locator('a')).toBeVisible();

        // clear the multisearch 
        await expect(page.locator('.dot')).toBeVisible();
        await page.locator('.position-relative > .fas').click();
        await expect(page.locator('ng-select').filter({ hasText: 'select Field×AgentId×' }).locator('input[type="text"]')).toBeVisible();
        await expect(page.getByPlaceholder('Values are separated by')).toHaveValue('AGN0000009\nAGN0000019\nAGN0000030');
        await page.getByText('Clear').click();
        await expect(page.locator('.d-flex > .position-relative')).toBeVisible();
    });

    test.describe('report', () => {

        test('recruitmentProject menu', async ({ page }) => {
            // navigate to the setup menu 
            await page.locator('#nav_link_3 a').click();

            // navigate to the recruitmentProject menu 

            await page.getByRole('link', { name: ' Recruitment Project', exact: true }).click();

            // filter by agent - main filter 
            await page.locator('.control-input > .form-control').first().click();
            // agent dropdown
            await expect(page.locator('#autoComplete_dropdown_Agent input[name="currentPage"]')).toHaveValue('1');
            await page.locator('ul').filter({ hasText: 'of96' }).locator('a').nth(2).click();
            await expect(page.locator('#autoComplete_dropdown_Agent input[name="currentPage"]')).toHaveValue('2');
            await expect(page.getByText('AGN0000013')).toBeVisible();
            await page.locator('ul').filter({ hasText: 'of96' }).locator('a').nth(2).click();
            await expect(page.locator('#autoComplete_dropdown_Agent input[name="currentPage"]')).toHaveValue('3');
            await expect(page.getByText('AGN0000022')).toBeVisible();
            await page.locator('ul').filter({ hasText: 'of96' }).locator('a').nth(1).click();
            await expect(page.locator('#autoComplete_dropdown_Agent input[name="currentPage"]')).toHaveValue('2');
            await expect(page.getByText('AGN0000013')).toBeVisible();
            await page.locator('ul').filter({ hasText: 'of96' }).locator('a').first().click();
            await expect(page.locator('#autoComplete_dropdown_Agent input[name="currentPage"]')).toHaveValue('1');
            await expect(page.locator('td').filter({ hasText: 'Aroop Manpower services' }).locator('comp-datatype')).toBeVisible();
            await page.locator('thead').filter({ hasText: 'Agent Id Agent Name License' }).locator('input[type="text"]').first().click();
            await page.locator('thead').filter({ hasText: 'Agent Id Agent Name License' }).locator('input[type="text"]').first().fill('AG00103');
            await page.locator('thead').filter({ hasText: 'Agent Id Agent Name License' }).locator('input[type="text"]').first().press('Enter');
            await expect(page.getByText('AG00103')).toBeVisible();
            await page.getByText('AG00103').click();
            await expect(page.getByRole('row', { name: ' RA-8243 AG00103 OXFORD' }).locator('a').nth(2)).toBeVisible();

            // clear the filter value 
            await page.locator('#dynamic-undefined-undefined').getByText('Agent', { exact: true }).hover();
            await page.locator('label').filter({ hasText: 'OXFORD INTERNATIONAL PVT .LTD' }).hover();
            await page.locator('label').filter({ hasText: 'OXFORD INTERNATIONAL PVT .LTD' }).locator('span').click();
            await expect(page.locator('.control-input > .form-control').first()).toBeVisible();

            // pagination 
            await expect(page.getByRole('listitem').filter({ hasText: /of\d+/ }).getByRole('spinbutton')).toHaveValue('1');
            await page.getByRole('list').filter({ hasText: /of\d+/ }).locator('a').nth(2).click();
            await expect(page.getByRole('row', { name: ' RA-8243 AG00129 SOUNDLINES' }).locator('a').nth(1)).toBeVisible();
            await page.getByRole('list').filter({ hasText: /of\d+/ }).locator('a').nth(2).click();
            await expect(page.getByRole('cell', { name: 'RA-8261', exact: true }).locator('a')).toBeVisible();
            await page.getByRole('list').filter({ hasText: /of\d+/ }).locator('a').nth(1).click();
            await expect(page.getByRole('listitem').filter({ hasText: /of\d+/ }).getByRole('spinbutton')).toHaveValue('2');
            await expect(page.getByRole('row', { name: ' RA-8243 AG00129 SOUNDLINES' }).locator('a').nth(1)).toBeVisible();
            await page.getByRole('list').filter({ hasText: /of\d+/ }).locator('a').first().click();
            await expect(page.getByRole('listitem').filter({ hasText: /of\d+/ }).getByRole('spinbutton')).toHaveValue('1');

            // filter by recruitment Id 
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').click();
            await page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(3) > .clearfix > .table_filter_text').fill('\t RA-8243');
            await page.getByRole('cell', { name: 'RA-8243 ' }).getByRole('textbox').press('Enter');
            await expect(page.getByRole('cell', { name: 'AG00402' }).locator('a')).toBeVisible();

            // agent details page 
            await page.getByRole('cell', { name: 'AG00402' }).locator('a').click();
            await expect(page.getByText('Agent Details')).toBeVisible();
            await expect(page.locator('#DynamicDetails form div').filter({ hasText: 'Personal Information Agent Id' }).nth(1)).toBeVisible();
            await expect(page.getByTitle('AG00402')).toBeVisible();

            // close the agent details page 
            await page.getByText('Close', { exact: true }).click();

            // row details page 
            await page.getByRole('row', { name: ' RA-8243 AG00402 HR' }).locator('a').first().click();
            await expect(page.getByText('RecruitmentProject Details')).toBeVisible();
            await expect(page.locator('#DynamicDetails form div').filter({ hasText: 'Recruiting ID RA-8243 Project' }).nth(1)).toBeVisible();
            await expect(page.locator('#DynamicDetails form div').filter({ hasText: 'Agent Selection No Of Days' }).nth(1)).toBeVisible();
            await expect(page.getByText('Authorization', { exact: true })).toBeVisible();
            await expect(page.locator('#cdk-drop-list-5').getByText('Agent')).toBeVisible();
            await expect(page.getByText('Authorization No')).toBeVisible();

            // close the row details page 
            await page.getByText('Close', { exact: true }).click();

            // recruitment Id details page 
            await page.getByRole('row', { name: ' RA-8243 AG00402 HR' }).locator('a').nth(1).click();
            await expect(page.getByText('Applications')).toBeVisible({ timeout: 30000 });
            await expect(page.getByRole('group', { name: ' Salary' })).toBeVisible();
            await expect(page.getByRole('button', { name: ' DownLoad Empty Template' })).toBeVisible();
            await expect(page.getByRole('button', { name: ' Download Salary Application' })).toBeVisible();
            await expect(page.getByRole('button', { name: ' Upload Salary' })).toBeVisible();

            // filter by passpoart number 
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').fill('\t PA0394783');
            await page.locator('td:nth-child(5) > .clearfix > .table_filter_text').press('Enter');
            await expect(page.getByRole('table').getByText('PA0394783')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'RA-' }).locator('comp-datatype')).toBeVisible();

            // review action
            await page.getByRole('button', { name: 'Review' }).click();
            await expect(page.getByText('Salary Update')).toBeVisible();
            await expect(page.getByText('House Allowance *')).toBeVisible();
            await page.getByPlaceholder('Other Allowance').click();
            await page.locator('dynamic-actionform input[type="text"]').click();
            await page.locator('div').filter({ hasText: /^Rejected$/ }).click();
            // form close
            await page.getByText('Close', { exact: true }).click();

            // clear the filter value 
            await page.getByRole('cell', { name: ' Passport Number ' }).hover(); 
            await page.getByRole('cell', { name: 'PA0394783' }).first().hover();
            await page.getByRole('cell', { name: 'PA0394783 ' }).getByRole('textbox').hover();
            await page.getByRole('cell', { name: 'PA0394783 ' }).locator('i').click();
            await expect(page.locator('td:nth-child(5) > .clearfix > .table_filter_text')).toBeEmpty();

            // recruitment Id multiFilter/search 
            await page.locator('.position-relative > .fas').click();
            await page.locator('div').filter({ hasText: /^select Field$/ }).nth(1).click();
            await page.locator('ng-select').filter({ hasText: 'select FieldFirst NameMiddle' }).locator('input[type="text"]').fill('pass');
            await page.getByLabel('Options list').getByText('Passport Number').click();
            await page.getByPlaceholder('Values are separated by').click();
            await page.getByPlaceholder('Values are separated by').fill('BA0109078\nPA2911961\nPA1715331');
            await page.getByText('Search', { exact: true }).click();
            await expect(page.getByRole('table').getByText('BA0109078')).toBeVisible();
            await expect(page.getByRole('table').getByText('PA1715331')).toBeVisible();
            await expect(page.getByRole('table').getByText('PA2911961')).toBeVisible();

            // clear the multiFilter 
            await expect(page.locator('.dot')).toBeVisible();
            await page.locator('.position-relative > .fas').click();
            await expect(page.getByText('Multiple Search')).toBeVisible();
            await page.getByText('Clear').click();
            await expect(page.locator('.d-flex > .position-relative')).toBeVisible();
            await page.locator('.position-relative > .fas').click();
            await expect(page.getByPlaceholder('Values are separated by')).toBeEmpty();
            await page.getByLabel('Close').click();

            // back to list page by clicking on menu
            await page.getByRole('link', { name: ' Recruitment Project', exact: true }).click();
            await expect(page.locator('td:nth-child(3) > .clearfix > .table_filter_text')).toBeEmpty({ timeout: 20000});
        });

        test('application menu', async ({ page }) => {
            // navigate to the setup menu
            await page.locator('#nav_link_3 a').click();

            // navigate to the application menu
            await page.getByRole('link', { name: ' Application' }).click();
            await expect(page.getByText('Applications')).toBeVisible({ timeout: 20000 });

            // export visible 
            await expect(page.getByRole('button', { name: ' Export' })).toBeVisible();
            await expect(page.getByRole('group', { name: ' Salary' })).toBeVisible();

            // pagination 
            await expect(page.locator('input[name="currentPage"]')).toHaveValue('1');
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.locator('tr:nth-child(6) > td:nth-child(3) > .col-group-indent-1 > comp-field-view-type > .tab-string > comp-datatype')).toBeVisible();
            await page.locator('comp-pagination a').nth(2).click();
            await expect(page.locator('tr:nth-child(7) > td:nth-child(3) > .col-group-indent-1 > comp-field-view-type > .tab-string > comp-datatype')).toBeVisible();
            await page.locator('comp-pagination a').nth(1).click();
            await expect(page.locator('tr:nth-child(7) > td:nth-child(3) > .col-group-indent-1 > comp-field-view-type > .tab-string > comp-datatype')).toBeVisible();
            await page.locator('comp-pagination a').first().click();
            await expect(page.locator('input[name="currentPage"]')).toHaveValue('1');

            // filter by recruitment Id - main 
            await page.locator('#relation_autoComplete_dropdown_RecruitingId > .control-input > .form-control').click();
            await page.locator('.table_filter_text').first().click();
            await page.locator('.table_filter_text').first().fill('RA-CRM-1374');
            await page.locator('.table_filter_text').first().press('Enter');
            await page.getByText('RA-CRM-1374').first().click();
            await expect(page.getByRole('row', { name: 'Review RA-CRM-1374 null EB7965432 SHAZAIB BIN TARIQ TARIQ MEHMOOD X) Employed' }).getByRole('button')).toBeVisible({ timeout: 20000 });

            // clear the main filter 
            await page.locator('label').filter({ hasText: 'RA-CRM-' }).hover();
            await page.locator('label').filter({ hasText: 'RA-CRM-' }).locator('i').click();
            await expect(page.locator('#relation_autoComplete_dropdown_RecruitingId > .control-input > .form-control')).toBeVisible();

            // filter by recruitment Id
            await page.getByRole('table').locator('#autoComplete_dropdown_hrmrecruitingId label').click();
            // recruitment Id Dropdown 
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await page.getByText('Next page').click();
            await page.getByText('page 3').click();
            await page.getByText('page 2', { exact: true }).click();
            await page.getByText('page 1').click();
            await expect(page.getByText('RA-CRM-0789')).toBeVisible();
            await page.getByRole('searchbox').first().click();
            await page.getByRole('searchbox').first().fill('RA-CRM-0789');
            await page.getByRole('searchbox').first().press('Enter');
            await expect(page.getByText('RA-CRM-0789')).toBeVisible();
            await page.getByText('RA-CRM-0789').click();
            await page.getByRole('button', { name: 'OK' }).click();
            await expect(page.getByRole('table').locator('comp-datatype').filter({ hasText: 'RA-CRM-' })).toBeVisible();

            // verify the review action 
            await page.getByRole('button', { name: 'Review' }).click();
            await page.getByPlaceholder('House Allowance').click();
            await expect(page.getByPlaceholder('Food Allowance')).toBeVisible();
            await page.getByPlaceholder('Other Allowance').click();
            await page.locator('dynamic-actionform input[type="text"]').click();
            await page.locator('div').filter({ hasText: /^Confirmed$/ }).click();
            await expect(page.getByText('Update', { exact: true })).toBeVisible();
            await page.getByText('Close', { exact: true }).click();

            // clear the filter 
            await page.getByRole('cell', { name: ' Recruiting Id ' }).hover();
            await page.locator('td').filter({ hasText: '⯆ RA-CRM-0789 x Recruiting ID' }).hover();
            await page.getByRole('table').locator('div').filter({ hasText: 'RA-CRM-0789 x Recruiting ID' }).nth(1).hover();
            // await page.getByRole('cell', { name: 'RA-CRM-0789 ' }).locator('label').locator('label').hover();
            await page.locator('label').filter({ hasText: 'RA-CRM-' }).locator('i').click();

            // filter by application Id 
            await page.locator('td:nth-child(9) > .clearfix > .table_filter_text').click();
            await page.locator('td:nth-child(9) > .clearfix > .table_filter_text').fill('MWD-125419');
            await page.getByRole('cell', { name: 'MWD-125419 ' }).getByRole('textbox').press('Enter');

            // application details page 
            await page.locator('td').filter({ hasText: 'MWD-' }).locator('a').click();
            await expect(page.getByText('Application Details')).toBeVisible();
            await expect(page.getByText('Personal Info First Name test')).toBeVisible();
            await expect(page.getByText('Work Info Application Id MWD-')).toBeVisible();
            await expect(page.getByText('Visa & Passport Visa Number')).toBeVisible();
            await expect(page.getByText('Salary Info Salary House')).toBeVisible();
            await expect(page.getByText('Address Address Email Id')).toBeVisible();
            await expect(page.getByText('ERP Status ERPStatus Success')).toBeVisible();
            await expect(page.getByText('Application Status History')).toBeVisible();
            await expect(page.getByTitle('MWD-').nth(3)).toBeVisible();

            // close the details page 
            await page.getByText('Close', { exact: true }).click();

            // clear the filter 
            await page.getByRole('cell', { name: 'pin Application Id ' }).hover();
            await page.getByRole('cell', { name: 'MWD-' }).first().hover();
            await page.getByRole('cell', { name: 'MWD-125419 ' }).getByRole('textbox').hover();
            await page.getByRole('cell', { name: 'MWD-125419 ' }).locator('i').click();
            await expect(page.locator('.card-body > comp-table > table > thead > tr:nth-child(2) > td:nth-child(5) > .clearfix > .table_filter_text')).toBeEmpty({ timeout: 20000 });

            // multiSelect validation 
            await page.locator('.position-relative > .fas').click();
            await page.locator('ng-select').filter({ hasText: 'select Field' }).locator('input[type="text"]').click();
            await page.locator('ng-select').filter({ hasText: 'select FieldFirst NameMiddle' }).locator('input[type="text"]').fill('app');
            await page.getByText('ApplicationId').click();
            await page.getByPlaceholder('Values are separated by').click();
            await page.getByPlaceholder('Values are separated by').fill('MWD-128042\nMWD-125451\nMWD-125463');
            await page.getByText('Search', { exact: true }).click();
            await expect(page.getByRole('cell', { name: 'MWD-128042' }).locator('a')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'MWD-125463' }).locator('a')).toBeVisible();
            await expect(page.getByRole('cell', { name: 'MWD-125451' }).locator('a')).toBeVisible();

            // clear the multiSelect 
            await expect(page.locator('.dot')).toBeVisible();
            await page.locator('.position-relative > .fas').click();
            await expect(page.locator('ng-select').filter({ hasText: 'select Field×ApplicationId×' }).locator('input[type="text"]')).toBeVisible();
            await expect(page.getByPlaceholder('Values are separated by')).toBeVisible();
            await page.getByText('Clear').click();
            await expect(page.locator('.d-flex > .position-relative')).toBeVisible();
        });

        test('recruitmentProjectSummary menu', async ({ page }) => {
            // navigate to the recruitment report menu
            await page.locator('#nav_link_3 a').click();

            // navigate to the recruitmentProjectSummary menu 
            await page.getByRole('link', { name: ' Recruitment Project Summary' }).click();
            await expect(page.locator('#page_left').getByText('Recruitment Project Summary')).toBeVisible();

            // option validation 
            await page.getByText('Options').click();
            await expect(page.getByText('Export SelectedExport')).toBeVisible();
            await page.getByText('Options').click();

            // filter by agent - agent dropdown
            await page.locator('#relation_autoComplete_dropdown_Agent label').click();
            await page.locator('thead').filter({ hasText: 'Agent Id Agent Name License' }).locator('input[type="text"]').first().click();
            // filter by agent Id
            await page.locator('thead').filter({ hasText: 'Agent Id Agent Name License' }).locator('input[type="text"]').first().fill('AG00013');
            await page.locator('thead').filter({ hasText: 'Agent Id Agent Name License' }).locator('input[type="text"]').first().press('Enter');
            await page.locator('#autoComplete_dropdown_tableAgent').getByText('AG00013').click();
            await expect(page.locator('label').filter({ hasText: 'ABU TRAVEL SERVICE MANPOWER' })).toBeVisible({ timeout: 20000 });

            // filter by recruitment Id 
            await page.locator('#autoComplete_dropdown_RecruitingID label').click();
            await page.locator('input[type="search"]').first().click();
            await page.locator('input[type="search"]').first().fill('RA-CRM-1251');
            await page.locator('input[type="search"]').first().press('Enter');
            await page.locator('#autoComplete_dropdown_table_RecruitingID').getByText('RA-CRM-1251').click();
            await expect(page.getByRole('heading', { name: 'RA-CRM-1251' }).locator('span')).toBeVisible({ timeout: 20000 });
            await expect(page.getByText('RA-CRM-1250 - AG00013 - ABU')).toBeVisible();
            await expect(page.locator('#move-content_0').getByText('Noofopenings')).toBeVisible();
            await expect(page.locator('#move-content_0').getByText('Selected')).toBeVisible();
            await expect(page.locator('#move-content_0').getByText('Total Applications')).toBeVisible();
            await expect(page.locator('#move-content_0').getByText('Ticket Confirmed')).toBeVisible();

            // clear the filters 
            await page.locator('#autoComplete_dropdown_RecruitingID').getByText('RA-CRM-').hover();
            await page.locator('label').filter({ hasText: 'RA-CRM-' }).locator('i').click();
            await page.locator('label').filter({ hasText: 'ABU TRAVEL SERVICE MANPOWER' }).hover();
            await page.locator('label').filter({ hasText: 'ABU TRAVEL SERVICE MANPOWER' }).locator('i').click();
            await expect(page.locator('.control-input > .form-control').first()).toBeVisible();
            await expect(page.locator('#autoComplete_dropdown_RecruitingID label')).toBeVisible();
        });
    });
});