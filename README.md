# Horilla HR Test Automation Framework

<div align="center">

![Playwright](https://img.shields.io/badge/Playwright-1.57.0-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white)

**Enterprise-grade test automation for Horilla HR Management System**

[Quick Start](#-quick-start) • [Architecture](#-architecture) • [Writing Tests](#-writing-tests) • [Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Configuration](#-configuration)
- [Writing Tests](#-writing-tests)
- [Running Tests](#-running-tests)
- [CI/CD Integration](#-cicd-integration)
- [Standards & Best Practices](#-standards--best-practices)
- [Troubleshooting](#-troubleshooting)
- [Documentation](#-documentation)
- [Contributing](#-contributing)

---

## 🎯 Overview

Enterprise test automation framework for **Horilla HR Management System** built with Playwright and TypeScript. Implements Component Object Model (COM) pattern, dependency injection, and industry best practices.

**Application Under Test**: [https://v1.demo.horilla.com/](https://v1.demo.horilla.com/)

**Test Coverage**: Recruitment, Employee Management, Leave Management, Payroll, Onboarding

---

## ✨ Features

- ✅ Component Object Model (COM) - Modular, reusable UI components
- ✅ Page Object Pattern with Dependency Injection
- ✅ TypeScript with full type safety
- ✅ Semantic locators (resilient to UI changes)
- ✅ Environment-based configuration (.env)
- ✅ HTML reports with screenshots, videos, and traces
- ✅ Parallel execution with auto-retry
- ✅ CI/CD ready (GitHub Actions, GitLab, Jenkins)

---

## 🚀 Quick Start

**Prerequisites**: Node.js v18+, npm v9+

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install chromium

# 3. Configure environment
copy .env.example .env
# Edit .env and add your credentials:
# BASE_URL=https://v1.demo.horilla.com/
# TEST_USERNAME=your_username
# TEST_PASSWORD=your_password

# 4. Run tests
npx playwright test

# 5. View report
npx playwright show-report
```

---

## 📁 Project Structure

```
HorillaHRV2/
├── src/
│   ├── components/          # Reusable UI components (SideMenu, etc.)
│   ├── fixtures/            # Custom Playwright fixtures
│   │   └── custom-test.ts   # Page Object dependency injection
│   ├── pages/               # Page Object Models
│   │   ├── LoginPage.ts
│   │   └── DashboardPage.ts
│   └── tests/               # Test specifications by module
│       └── auth/
│           └── login.spec.ts
├── .env                     # Environment variables (DO NOT COMMIT)
├── .env.example             # Environment template
├── AI_TEST_STANDARDS.md     # Testing standards
├── playwright.config.ts     # Playwright configuration
├── testplan.md              # Comprehensive test plan
└── tsconfig.json            # TypeScript configuration
```

---

## 🏗 Architecture

### Component Object Model (COM)

```
Tests → Pages → Components
```

Pages compose reusable components instead of monolithic Page Objects.

**Example**:

```typescript
// Component: SideMenu.ts
export class SideMenu {
  constructor(private page: Page) {}
  async navigateTo(item: string) {
    await this.page.getByRole('link', { name: item }).click();
  }
}

// Page: DashboardPage.ts
export class DashboardPage {
  readonly sideMenu: SideMenu;  // Compose component
  
  constructor(page: Page) {
    this.sideMenu = new SideMenu(page);
  }
}

// Test: Uses dependency injection
test('navigate menu', async ({ dashboardPage }) => {
  await dashboardPage.sideMenu.navigateTo('Employees');
});
```

**Benefits**: Reusability, maintainability, scalability, clear separation of concerns

---

## ⚙️ Configuration

### Environment Variables (.env)

| Variable | Description | Example |
|:---------|:------------|:--------|
| `BASE_URL` | Application URL | `https://v1.demo.horilla.com/` |
| `TEST_USERNAME` | Test user | `admin` |
| `TEST_PASSWORD` | Password | `admin` |

> ⚠️ Use `TEST_` prefix to avoid Windows system variable conflicts

### Playwright Config Highlights

```typescript
export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

Full config: [playwright.config.ts](file:///c:/Users/mukul/Downloads/Horilla%20HR_v2/HorillaHRV2/playwright.config.ts)

---

## 📝 Writing Tests

### Test Structure (AAA Pattern)

```typescript
import { test, expect } from '../../fixtures/custom-test';

test.describe('Authentication', () => {
  test('TC001: Successful login', async ({ loginPage, dashboardPage }) => {
    // Arrange
    await loginPage.goto();
    
    // Act
    await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
    
    // Assert
    await expect(dashboardPage.welcomeMessage).toBeVisible();
  });
});
```

### Creating Page Objects

```typescript
import { Page, Locator } from '@playwright/test';
import { SideMenu } from '../components/SideMenu';

export class EmployeePage {
  readonly sideMenu: SideMenu;  // Compose components
  readonly createButton: Locator;
  readonly searchBox: Locator;
  
  constructor(private page: Page) {
    this.sideMenu = new SideMenu(page);
    // Use semantic locators
    this.createButton = page.getByRole('button', { name: 'Create Employee' });
    this.searchBox = page.getByPlaceholder('Search employees');
  }
  
  async goto() {
    await this.page.goto('/employee/employees');
  }
}
```

### Register in Fixtures

Add to [src/fixtures/custom-test.ts](file:///c:/Users/mukul/Downloads/Horilla%20HR_v2/HorillaHRV2/src/fixtures/custom-test.ts):

```typescript
import { test as base } from '@playwright/test';
import { EmployeePage } from '../pages/EmployeePage';

type MyFixtures = {
  employeePage: EmployeePage;
};

export const test = base.extend<MyFixtures>({
  employeePage: async ({ page }, use) => {
    await use(new EmployeePage(page));
  },
});
```

### Locator Strategy (CASCADE Rule)

1. **Semantic** (preferred): `getByRole()`, `getByLabel()`, `getByPlaceholder()`
2. **Stable attributes**: `getByTestId()`
3. **Container + filter** (dynamic lists):
   ```typescript
   // ❌ NEVER: page.locator('tr').nth(3)
   // ✅ CORRECT:
   const rows = page.getByRole('row');
   await rows.filter({ hasText: 'John Doe' }).getByRole('button', { name: 'Edit' }).click();
   ```

**🚫 FORBIDDEN**: XPath, CSS class chains, index selectors (`.nth()`, `.first()`)

---

## 🧪 Running Tests

```bash
# Run all tests
npx playwright test

# Run specific file
npx playwright test src/tests/auth/login.spec.ts

# Run with UI mode (interactive)
npx playwright test --ui

# Run in headed mode
npx playwright test --headed

# Run specific test
npx playwright test --grep "TC001"

# View report
npx playwright show-report
```

---

## 🔄 CI/CD Integration

### GitHub Actions

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright
      run: npx playwright install chromium --with-deps
    
    - name: Create .env
      run: |
        echo "BASE_URL=${{ secrets.BASE_URL }}" >> .env
        echo "TEST_USERNAME=${{ secrets.TEST_USERNAME }}" >> .env
        echo "TEST_PASSWORD=${{ secrets.TEST_PASSWORD }}" >> .env
    
    - name: Run tests
      run: npx playwright test
    
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
```

**GitLab CI** and **Jenkins** examples: See [CI/CD section in full docs](file:///c:/Users/mukul/Downloads/Horilla%20HR_v2/HorillaHRV2/testplan.md)

---

## 📚 Standards & Best Practices

Full standards: [AI_TEST_STANDARDS.md](file:///c:/Users/mukul/Downloads/Horilla%20HR_v2/HorillaHRV2/AI_TEST_STANDARDS.md)

### Key Principles

1. **Component Object Model** - Decompose pages into reusable components
2. **Semantic Locators** - Use user-facing selectors (CASCADE rule)
3. **Dependency Injection** - Use custom fixtures, never instantiate in tests
4. **Type Safety** - Full TypeScript typing, no `any`
5. **Environment Config** - Store credentials in `.env`, use prefixed names
6. **API + UI Hybrid** - Use API for setup, UI for verification

### Code Quality Checklist

- [ ] Used semantic or test-id locators
- [ ] Imported `test` from custom fixture
- [ ] Separated Page Objects from test logic
- [ ] Added TypeScript types
- [ ] Used environment variables for credentials
- [ ] No hardcoded waits or `any` types

---

## 🔧 Troubleshooting

| Issue | Solution |
|:------|:---------|
| `Cannot find module '@playwright/test'` | Run `npm install && npx playwright install` |
| `process.env.BASE_URL is undefined` | Create `.env` file with required variables |
| Login fails | Verify credentials in `.env`, check for typos |
| Tests flaky/timeout | Add explicit waits: `await Promise.all([page.waitForResponse('**/api'), button.click()])` |
| Browser won't launch | Run `npx playwright install chromium --with-deps` |

**Debug mode**: `npx playwright test --debug`

---

## 📖 Documentation

- **[testplan.md](file:///c:/Users/mukul/Downloads/Horilla%20HR_v2/HorillaHRV2/testplan.md)** - 10 comprehensive test cases (TC001-TC010)
- **[AI_TEST_STANDARDS.md](file:///c:/Users/mukul/Downloads/Horilla%20HR_v2/HorillaHRV2/AI_TEST_STANDARDS.md)** - Enterprise testing standards
- **[Playwright Docs](https://playwright.dev)** - Official documentation
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript reference

### Test Coverage

| Module | Test Cases | Priority |
|:-------|:-----------|:---------|
| Recruitment | TC001, TC002 | High |
| Employee Mgmt | TC003, TC004 | Critical/Medium |
| Leave Mgmt | TC005, TC006 | High |
| Payroll | TC007, TC008 | Critical/Medium |
| Onboarding | TC009, TC010 | High/Low |

---

## 🤝 Contributing

### Quick Guide

```bash
# 1. Fork and create branch
git checkout -b feature/your-feature

# 2. Make changes and test
npx playwright test

# 3. Commit and push
git commit -m "feat: add feature"
git push origin feature/your-feature

# 4. Create Pull Request
```

### Standards

- Follow [AI_TEST_STANDARDS.md](file:///c:/Users/mukul/Downloads/Horilla%20HR_v2/HorillaHRV2/AI_TEST_STANDARDS.md)
- Use TypeScript strict mode
- Write meaningful test names (TC###: Description)
- Use semantic commit messages (feat, fix, docs, refactor, test)

### PR Checklist

- [ ] Tests pass locally
- [ ] Code follows TypeScript standards
- [ ] Documentation updated
- [ ] No `.env` or sensitive data committed

---

## 📄 License

ISC License - Copyright (c) 2025 Horilla HR Test Automation

---

<div align="center">

**Built with ❤️ using Playwright + TypeScript**

[⬆ Back to Top](#horilla-hr-test-automation-framework)

</div>
