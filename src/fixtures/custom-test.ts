import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { RecruitmentPage } from '../pages/RecruitmentPage';
import { RecruitmentPipelinePage } from '../pages/RecruitmentPipelinePage';

type MyFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    recruitmentPage: RecruitmentPage;
    recruitmentPipelinePage: RecruitmentPipelinePage;
};

export const test = base.extend<MyFixtures, {}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    recruitmentPage: async ({ page }, use) => {
        await use(new RecruitmentPage(page));
    },
    recruitmentPipelinePage: async ({ page }, use) => {
        await use(new RecruitmentPipelinePage(page));
    },
});

export { expect } from '@playwright/test';
