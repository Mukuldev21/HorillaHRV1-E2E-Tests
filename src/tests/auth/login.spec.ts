import { test, expect } from '../../fixtures/custom-test';

test.describe('Authentication', () => {

    test('TC-LOGIN-01: Verify successful login', async ({ loginPage, page }) => {
        // 1. Arrange & Act
        await loginPage.login(); // Uses env vars by default

        // 2. Assert - verify we're not on login page anymore
        await expect(page).not.toHaveURL(/\/login/);
    });

    test('TC-LOGIN-02: Verify pages are accessible', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Horilla/i);
    });
});
