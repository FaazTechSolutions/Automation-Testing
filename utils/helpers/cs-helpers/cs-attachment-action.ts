
import { Page, expect } from '@playwright/test';

export async function performAttachmentAction(page: Page) {
    // Attach Action 
    await page.getByRole('link', { name: ' Attach' }).click();
    await expect(page.getByText('Attachments Tickets')).toBeVisible();
    await expect(page.getByText('Upload')).toBeVisible();
    await expect(page.getByText('Attachment Type')).toBeVisible();
    await expect(page.getByText('Files Name')).toBeVisible();
    await expect(page.getByText('Version')).toBeVisible();
    await expect(page.locator('#AttachPartial11').getByText('Ext')).toBeVisible();
    await expect(page.getByText('Files', { exact: true })).toBeVisible();
    await page.locator('#page_form_MON0000002').getByText('x', { exact: true }).click();
}