import { Page, Locator, expect } from '@playwright/test';
import { RecruitmentModal } from '../components/recruitment/RecruitmentModal';
import { SideMenu } from '../components/SideMenu';

export class RecruitmentPage {
    readonly sideMenu: SideMenu;
    readonly recruitmentModal: RecruitmentModal;
    readonly createButton: Locator;

    constructor(private page: Page) {
        this.sideMenu = new SideMenu(page);
        this.recruitmentModal = new RecruitmentModal(page);
        this.createButton = page.locator('#createNewRecruitment');
    }

    async goto() {
        // Navigate via sidebar instead of direct URL
        await this.sideMenu.navigateTo('Recruitment');
        await this.page.getByRole('link', { name: 'Recruitment Pipeline' }).click();
        await this.page.waitForLoadState('networkidle');
    }

    async openCreateModal() {
        await this.createButton.click();
    }

    async getRecruitmentTab(title: string): Promise<Locator> {
        // Recruitments are displayed as tabs, not kanban cards
        return this.page.locator('li.oh-tabs__tab').filter({ hasText: title });
    }

    async openPipeline(title: string) {
        const tab = await this.getRecruitmentTab(title);
        await expect(tab).toBeVisible();
        await tab.click();
    }
}
