# Test Plan: Recruitment Module

## 1. Introduction
* **Objective:** Validate the comprehensive functionality of the Recruitment Module in Horilla HR, focusing on Recruitment Drives, Pipeline Management, and Candidate Tracking.
* **References:** Horilla HR V2 Live Demo Exploration (Dec 2025), `AI_TEST_STANDARDS.md`.

## 2. Scope
* **In-Scope:**
    * **Recruitment Drives:** Creating new "Recruitments" (Job Positions) with required fields (Title, Job Position, Managers).
    * **Pipeline Management:** verifying stages (e.g., Initial Qualification, First Interview) within a Recruitment drive.
    * **Candidate Management:** Adding candidates *within* a specific Recruitment Pipeline.
    * **Global Candidate View:** Verifying the "Candidates" list reflects additions made in pipelines.
    * **Filtering:** Filtering candidates by "Job Position" in the global list.
* **Out-of-Scope:**
    * "Recruitment Survey" configuration.
    * "Skill Zone" and "Open Jobs" public portal customization.
    * Third-party LinkedIn integration (mocked only).
    * Email notifications and SMTP server validation.

## 3. Test Strategy
* **Test Levels:** System Testing (E2E), Functional Regression.
* **Test Types:** Functional Automation, UI State Validation.
* **Tools & Frameworks:**
    * **Automation:** Playwright (TypeScript).
    * **Framework:** Component Object Model (COM) for modularity (e.g., `PipelineStageComponent`, `CandidateModal`).
    * **Data:** Synthetic data (Faker) for Candidate profiles; Pre-seeded data for Job Positions.

## 4. Test Environment
* **Hardware/Software:**
    * **OS:** Windows / Linux (CI Agents).
    * **Browser:** Chromium (Primary), Firefox.
    * **Screen:** 1920x1080 (Standard Desktop).
* **Data Requirements:**
    * **Admin User:** Pre-existing admin account (`admin`/`admin`) required for "Manager" selection.
    * **Job Positions:** At least one "Job Position" entity must exist to be selected during Recruitment creation.

## 5. Risks and Mitigation
| Risk Description | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Workflow Dependency:** Candidates cannot be created without an active Recruitment drive. | High | Test Setup must enforce order: Create Job Position -> Create Recruitment -> Add Candidate. |
| **Dynamic Pipelines:** Stages (columns) in pipeline view are dynamic and drag-and-drop. | High | Use `data-id` or specific text filtering to locate stages; Avoid fixed index selectors. |
| **Modal Overlays:** "Create Recruitment" and "Add Candidate" use modals. | Medium | Implement robust `await expect(modal).toBeVisible()` assertions before interaction to prevent flakiness. |

## 6. Deliverables
* **Test Plan:** This living document.
* **Automated Scripts:** `src/tests/recruitment/recruitment-flow.spec.ts`.
* **Execution Report:** HTML report with screenshots of failed steps.
* **Bug Reports:** Logged for any UI inconsistencies or logic failures.
