import { test, expect, Page } from '@playwright/test';

test.describe('active-directory login', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://portal.mawarid.com.sa/apps4x/#/home');
    });

    test('home loads', async ({ page }) => {
        await expect(page).toHaveURL(/apps4x\/#\/home/);
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
        await expect(page.getByText('HomeApplication Support')).toBeVisible();
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
        await page.getByRole('listitem').filter({ hasText: 'Application Support Signout' }).getByRole('link').click();
        await expect(page.getByRole('heading', { name: 'Application Support' })).toBeVisible();
        await page.getByText('Signout').click();
        await expect(page.locator('div').filter({ hasText: /^User Name$/ })).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^Password$/ })).toBeVisible();
        await expect(page.locator('form div').filter({ hasText: 'SignInORSign in with Active' }).first()).toBeVisible();
    });
});