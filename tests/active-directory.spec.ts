import { test, expect, Page } from '@playwright/test';

test.describe('active-directory login', () => {
    test('AD login', async ({ page }) => {
        await page.goto('https://portal.mawarid.com.sa/apps4x/#/login');
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
});