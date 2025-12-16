import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Inspect specific: inputs have labels "Username" and "Password"
        // Also have ids "username" and "password"
        this.usernameInput = page.getByLabel('Username').or(page.locator('#username'));
        this.passwordInput = page.getByLabel('Password').or(page.locator('#password'));

        // Button text is "Sign In"
        this.loginButton = page.getByRole('button', { name: 'Secure Sign-in' });
    }

    async goto() {
        await this.page.goto('/');
    }

    async login(username = process.env.TEST_USERNAME!, password = process.env.TEST_PASSWORD!) {
        await this.goto();

        // Click fields and clear before typing (handle pre-filled values)
        await this.usernameInput.click();
        await this.usernameInput.clear();
        await this.usernameInput.fill(username);

        await this.passwordInput.click();
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);

        // State assertion before interaction (AI_TEST_STANDARDS section 5)
        await expect(this.loginButton).toBeVisible();
        await expect(this.loginButton).toBeEnabled();

        // Horilla login form submits on button click
        await this.loginButton.click();
    }
}
