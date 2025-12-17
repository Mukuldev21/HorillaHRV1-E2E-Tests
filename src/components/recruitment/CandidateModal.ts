import { Page, Locator, expect } from '@playwright/test';

export class CandidateModal {
    readonly dialog: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly mobileInput: Locator;
    readonly saveButton: Locator;

    constructor(private page: Page) {
        this.dialog = page.getByRole('dialog', { name: 'Create Candidate' });
        this.nameInput = this.dialog.getByLabel('Candidate Name');
        this.emailInput = this.dialog.getByLabel('Email');
        this.mobileInput = this.dialog.getByLabel('Mobile');
        this.saveButton = this.dialog.getByRole('button', { name: 'Save' });
        // Fallback for button if "Save" isn't explicitly named or is an icon
    }

    async addCandidate(name: string, email: string, mobile: string) {
        await expect(this.dialog).toBeVisible();
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.mobileInput.fill(mobile);
        await this.saveButton.click();
        await expect(this.dialog).toBeHidden();
    }
}
