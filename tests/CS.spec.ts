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
});

