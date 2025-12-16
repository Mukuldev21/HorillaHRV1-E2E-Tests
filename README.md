# Horilla HR Test Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-1.57.0-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white)

**Enterprise-grade test automation for [Horilla HR Management System](https://v1.demo.horilla.com/)**

---

## � Documentation Center

| Resource | Description |
|:---------|:------------|
| **[📄 Test Plan](./testplan.md)** | Detailed test strategy, scope, risks, and test case definitions (TC001-TC010) |
| **[📐 Standards](./AI_TEST_STANDARDS.md)** | Coding conventions, locator strategies (CASCADE), and pattern guides |
| **[⚙️ Config](./playwright.config.ts)** | Framework configuration, timeouts, and report settings |

## 🚀 Quick Start

**Prerequisites**: Node.js v18+, npm v9+

```bash
# 1. Setup
npm install
npx playwright install chromium

# 2. Configure Environment
copy .env.example .env
# Update .env with: BASE_URL, TEST_USERNAME, TEST_PASSWORD

# 3. Execution
npx playwright test              # Run all
npx playwright test --ui         # Interactive mode
npx playwright show-report       # View results
```

## 🏗 Architecture & Patterns

- **Component Object Model (COM)**: Pages compose reusable components (`src/components`) rather than monolithic definitions.
- **Dependency Injection**: Custom fixtures (`src/fixtures/custom-test.ts`) inject Page Objects automatically.
- **Hybrid Testing**: API for data setup, UI for user verification.
- **Strict Typing**: Full TypeScript implementation with distinct interfaces.

## � Structure

```
src/
├── components/   # Reusable UI widgets (SideMenu, Tables)
├── fixtures/     # DI Containers & Custom Test definitions
├── pages/        # Business logic & Page Objects
└── tests/        # Spec files grouped by module (auth, employee, etc)
```

## 🔧 Troubleshooting

- **Module fails?** Run `npm ci && npx playwright install`
- **Login fails?** Verify `.env` credentials against the manual demo site.
- **Flakiness?** Use `await expect(locator).toBeVisible()` before interactions. See [Standards](./AI_TEST_STANDARDS.md).

---
<div align="center">
  <b>Built with ❤️ using Playwright + TypeScript</b>
</div>
