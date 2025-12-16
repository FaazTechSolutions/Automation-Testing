import { expect, test } from '@playwright/test';

test.describe('login', () => {
    test('login positive scenario : should allow user to login', async ({ page }) => {
        await page.goto('https://portal.mawarid.com.sa/apps4x/#/login');
        await page.getByRole('textbox', { name: 'UserName' }).click();
        await page.getByRole('textbox', { name: 'UserName' }).fill('a.hyder');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('123456');
        await page.getByRole('button', { name: 'Sign In', exact: true }).click();
        await expect(page.getByRole('heading', { name: 'Apps' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Helpdesk' })).toBeVisible();
    });

    test('login negative scenario : should allow user to login', async ({ page }) => {
        // Navigate to login page
        await page.goto('https://portal.mawarid.com.sa/apps4x/#/login');

        // Test 1: Invalid login with only username (password missing)
        await page.getByRole('textbox', { name: 'UserName' }).click();
        await page.getByRole('textbox', { name: 'UserName' }).fill('test');
        await page.getByRole('button', { name: 'Sign In', exact: true }).click();
        await expect(page.getByText('Please enter your password')).toBeVisible();

        // Test 2: Clear username field and verify it's empty
        await page.getByRole('textbox', { name: 'UserName' }).click();
        await page.getByRole('textbox', { name: 'UserName' }).fill('');
        await expect(page.getByRole('textbox', { name: 'UserName' })).toBeEmpty();

        // Test 3: Invalid login with only password (username missing)
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('09876');
        await page.getByRole('button', { name: 'Sign In', exact: true }).click();
        await expect(page.getByText('Please enter your username')).toBeVisible();

        // Test 4: Clear password field and verify it's empty
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('');
        await expect(page.getByRole('textbox', { name: 'Password' })).toBeEmpty();

        // Test 5: Invalid login with both username and password (incorrect credentials)
        await page.getByRole('textbox', { name: 'UserName' }).click();
        await page.getByRole('textbox', { name: 'UserName' }).fill('test');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('67999990');
        await page.getByRole('button', { name: 'Sign In', exact: true }).click();
        await expect(page.locator('#toast-container div').first()).toBeVisible();
        await page.getByRole('alert', { name: 'InValid userId and password' }).click();

        // Test 6: Verify password visibility toggle (eye icon)
        await expect(page.locator('i')).toBeVisible();
        await page.locator('i').click(); // Click to hide password
        await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
        await page.locator('i').click(); // Click to show password
        await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue('67999990');
        await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    });
});