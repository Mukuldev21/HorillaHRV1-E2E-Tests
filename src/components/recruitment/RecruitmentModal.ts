import { Page, Locator, expect } from '@playwright/test';

export class RecruitmentModal {
    readonly dialog: Locator;
    readonly titleInput: Locator;
    readonly jobPositionContainer: Locator;
    readonly managersContainer: Locator;
    readonly saveButton: Locator;

    constructor(private page: Page) {
        this.dialog = page.locator('.oh-modal').filter({ hasText: 'Create Recruitment' });
        this.titleInput = page.locator('#id_title');
        // Select2 containers
        this.jobPositionContainer = page.locator('#select2-id_job_position-container');
        this.managersContainer = page.locator('#select2-id_recruitment_managers-container');
        this.saveButton = this.dialog.getByRole('button', { name: 'Save' });
    }

    async createRecruitment(title: string, jobPosition: string, manager: string) {
        await expect(this.dialog).toBeVisible();
        await this.titleInput.fill(title);

        // Select2 dropdowns: click container, then select option
        await this.jobPositionContainer.click();
        await this.page.locator('.select2-results__option').filter({ hasText: jobPosition }).first().click();

        await this.managersContainer.click();
        await this.page.locator('.select2-results__option').filter({ hasText: manager }).first().click();

        await this.saveButton.click();
        await expect(this.dialog).toBeHidden({ timeout: 10000 });
    }
}
