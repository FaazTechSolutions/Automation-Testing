// 📌 Import the Page type from Playwright

// Page represents a single browser tab or screen
import { Page } from '@playwright/test';

// 📌 Define a TypeScript type (structure) to store failed API details
// This helps keep API error data organized and strongly typed
export type FailedApi = {
    url: string;            // API endpoint URL
    status: number;         // HTTP status code (400, 401, 500, etc.)
    method: string;         // HTTP method (GET, POST, PUT, DELETE)
    responseBody?: string;  // Optional response body (error message)
};

// 📌 Function to track all failed backend API calls on a page
// You pass the Playwright page object to this function
export function trackFailedApis(page: Page) {

    // 📌 Create an empty array to store failed API responses
    const failedApis: FailedApi[] = [];

    // 📌 Listen to every network response that happens on the page
    page.on('response', async (response) => {

        // 📌 Get the HTTP status code of the response
        const status = response.status();

        // 📌 Capture only non-success responses
        // status !== 200 means API did not succeed
        if (status !== 200) {

            // 📌 Get the request details related to this response
            const request = response.request();

            // 📌 Variable to store response body text
            let body = '';

            // 📌 Try to read the response body as text
            // Some responses may not allow reading the body
            try {
                body = await response.text();
            } catch {
                // ❗ Ignore errors if response body cannot be read
            }

            // 📌 Store failed API details into the array
            failedApis.push({
                url: response.url(),        // API endpoint URL
                status,                     // HTTP status code
                method: request.method(),   // Request method (GET, POST, etc.)
                responseBody: body,         // Error response body (if any)
            });
        }
    });

    // 📌 Return the array so tests can access failed API details later
    return failedApis;
}
