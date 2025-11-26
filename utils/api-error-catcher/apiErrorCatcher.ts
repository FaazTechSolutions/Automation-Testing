import { Page } from '@playwright/test';
import fs from 'fs';

export function catchApiErrors(page: Page) {
    page.on('response', async (res) => {
        const status = res.status();

        // Only log API (XHR/Fetch) requests — optional but recommended
        if (!['xhr', 'fetch'].includes(res.request().resourceType())) return;

        if (status >= 400) {
            console.log("====================================");
            console.log(`❌ API ERROR DETECTED`);
            console.log(`URL: ${res.url()}`);
            console.log(`Status: ${status}`);

            let body = '';
            try {
                body = await res.text();
                console.log(`Response Body: ${body}`);
            } catch {
                console.log("Could not read response body");
            }

            console.log("====================================");

            // Log to file
            const log = `
❌ API ERROR
URL: ${res.url()}
Status: ${status}
Time: ${new Date().toISOString()}
Body: ${body}

-----------------------------------------
`;

            fs.appendFileSync('api-error-log.txt', log);
        }
    });
}
