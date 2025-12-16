import { Page, Locator, expect } from '@playwright/test';
import { SideMenu } from '../components/SideMenu';

export class DashboardPage {
    readonly page: Page;
    readonly sideMenu: SideMenu;
    readonly userMenuProfile: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sideMenu = new SideMenu(page);
        // Locator for a dashboard specific element to verify load
        this.userMenuProfile = page.locator('.avatar-container').first().or(page.getByRole('img', { name: 'User Image' }).first());
    }

    async expectLoaded() {
        // Wait for page to be fully loaded after navigation
        await this.page.waitForLoadState('networkidle');
        // Verify we're not on the login page anymore
        await expect(this.page).not.toHaveURL(/.*login/);
    }
}
