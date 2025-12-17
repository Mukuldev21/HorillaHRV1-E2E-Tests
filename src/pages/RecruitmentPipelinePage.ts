import { Page, Locator, expect } from '@playwright/test';
import { CandidateModal } from '../components/recruitment/CandidateModal';

export class RecruitmentPipelinePage {
    readonly candidateModal: CandidateModal;
    readonly addCandidateButton: Locator;

    constructor(private page: Page) {
        this.candidateModal = new CandidateModal(page);
        // Assuming there is a button to add candidate in the pipeline view
        this.addCandidateButton = page.getByRole('button', { name: 'Add Candidate' }).or(page.locator('.oh-btn--plus'));
    }

    async openAddCandidateModal() {
        await this.addCandidateButton.click();
    }

    async getCandidateCard(name: string): Promise<Locator> {
        return this.page.locator('.oh-kanban-card').filter({ hasText: name });
    }

    async verifyCandidateInStage(name: string, stageName: string) {
        // Find the stage column
        const stageColumn = this.page.locator('.oh-kanban-column').filter({ hasText: stageName });
        const card = stageColumn.locator('.oh-kanban-card').filter({ hasText: name });
        await expect(card).toBeVisible();
    }

    async moveCandidate(name: string, targetStage: string) {
        const card = await this.getCandidateCard(name);
        const targetColumn = this.page.locator('.oh-kanban-column').filter({ hasText: targetStage });

        await card.dragTo(targetColumn);
    }
}
