import { Page, Locator } from '@playwright/test';

export class SideMenu {
    readonly page: Page;
    readonly menuContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        // Assuming the side menu is a distinguishable element, using a stable selector or role
        // Based on inspection, it's likely a nav or aside element.
        // For now, using a generic stable approach, can be refined.
        this.menuContainer = page.locator('aside').first(); // Common for dashboards
    }

    async navigateTo(moduleName: 'Recruitment' | 'Employee' | 'Leave' | 'Payroll' | 'Onboarding') {
        // Using simple text matching as per "Semantics (Preferred)" if applicable, 
        // or falling back to text.
        // "Employees" might be the exact text, need to be careful.
        // Based on exploration: 'Recruitment', 'Employee', 'Leave'.

        // Using generic text locator for flexibility initially
        await this.page.getByRole('link', { name: moduleName, exact: false }).click();
    }
}
