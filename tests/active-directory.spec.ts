import { test, expect, Page } from '@playwright/test';
import { trackFailedApis } from '../utils/api-error-catcher/apiErrorTracker';

test.describe('active-directory login', () => {

    let failedApis: any[] = [];

    test.beforeEach(async ({ page }) => {
        // START tracking APIs
        failedApis = trackFailedApis(page);
        await test.step('go to the login page', async () => {
            await page.goto('https://portal.mawarid.com.sa/apps4x/#/login', { timeout: 60000 });
        });
    });
    test('AD login', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Sign in with Active Directory' })).toBeVisible();
        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('button', { name: 'Sign in with Active Directory' }).click();
        const page1 = await page1Promise;
        await expect(page1.getByRole('heading', { name: 'Sign in' })).toBeVisible();
        await page1.getByRole('textbox', { name: 'Enter your email, phone, or' }).click();
        await page1.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill('app.sup@mawarid.com.sa');
        await page1.getByRole('button', { name: 'Next' }).click();
        await page1.getByRole('textbox', { name: 'Enter the password for app.' }).fill('Sup@78521');
        await page1.getByRole('button', { name: 'Sign in' }).click(); await page1.getByRole('button', { name: 'Yes' }).click();
        await page.goto('https://portal.mawarid.com.sa/apps4x/#/home');
        await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible({ timeout: 20000 });
        await expect(page.getByRole('link', { name: 'Customer Support' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Helpdesk' })).toBeVisible();

        // goto helpdesk app 
        await page.getByRole('link', { name: 'Helpdesk' }).click();
        await page.goto('https://portal.mawarid.com.sa/apps4x/#/apps/Helpdesk/RequesterDashboard');
        await expect(page.getByRole('heading', { name: 'Helpdesk' })).toBeVisible();

        // navigate to the request menu - and its sub menu (my request)
        await page.locator('#MNU0000040').click();
        await page.getByRole('link', { name: ' My Requests' }).click();
        await expect(page.getByText('My Request', { exact: true })).toBeVisible();

        // back to home 
        await page.getByRole('button', { name: '' }).click();

        // logout 
        await page.getByRole('listitem').filter({ hasText: 'MawaridSign outApplication' }).getByRole('link').click();
        await expect(page.locator('div').filter({ hasText: /^MawaridSign outApplication Supportapp\.sup@mawarid\.com\.sa$/ }).first()).toBeVisible();
        await expect(page.getByRole('img', { name: 'profile' })).toBeVisible();
        await page.getByText('Sign out').click();
        await expect(page.getByRole('button', { name: 'Sign in with Active Directory' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible();
    });

    // 📌 This hook runs automatically AFTER each test case
    test.afterEach(async ({ page }, testInfo) => {

        // 📌 Try to find any UI element that shows the text "Error"
        // This usually indicates a frontend error message
        const uiError = page.getByText('Error');

        // 📌 Check if the "Error" text becomes visible within 3 seconds
        // `.catch(() => false)` prevents the test from failing if not found
        if (await uiError.isVisible({ timeout: 3000 }).catch(() => false)) {

            // 📌 Log which test showed the UI error
            console.error(`❌ UI Error in test: ${testInfo.title}`);

            // 📌 If failed backend APIs were captured during the test
            if (failedApis.length > 0) {

                // 📌 Log header for failed API details
                console.error('Failed APIs:');

                // 📌 Print each failed API request clearly
                failedApis.forEach(api => {
                    console.error(`${api.method} ${api.url} → ${api.status}`);
                });

            } else {
                // 📌 UI shows error but backend APIs look fine
                console.error('⚠ UI error shown but no failed API captured');
            }

            // 📌 Explicitly fail the test
            // This ensures UI errors caused by backend issues fail the test run
            throw new Error('UI error caused by backend failure');
        }
    });
});