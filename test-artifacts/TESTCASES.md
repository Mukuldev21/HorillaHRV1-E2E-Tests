# Test Cases: Recruitment Module

## Suite Information
**Module:** Recruitment  
**Test Strategy:** System Testing  
**Standards:** Based on `AI_TEST_STANDARDS.md` and `testcases_standard.md`

---

### [TC001]: Create New Recruitment Drive
* **Priority:** P0 - Critical
* **Type:** Positive
* **Pre-conditions:**
    * User is logged in as Admin.
    * At least one "Job Position" (e.g., "Developer") exists in settings.
* **Test Data:**
    * Title: "Senior React Developer 2024"
    * Job Position: "Developer"
    * Manager: "Ohmni Admin" (or current user)

| Step # | Action Description (Instruction) | Expected Result (Verification) |
| :--- | :--- | :--- |
| 1. | Navigate to "Recruitment" via sidebar. | Title "Recruitment" is visible. |
| 2. | Click "Recruitment Pipeline" in sub-menu. | Pipeline dashboard loads. |
| 3. | Click the "Recruitment" button (Create). | "Create Recruitment" modal appears. |
| 4. | Enter "Senior React Developer 2024" into "Title". | Field accepts input. |
| 5. | Select "Developer" from "Job Position" dropdown. | Selection is applied. |
| 6. | Select "Ohmni Admin" from "Recruitment Managers". | Manager is added to selection. |
| 7. | Click "Save" button. | Modal closes; Success message appears; New card "Senior React Developer 2024" appears in the list. |

* **Post-conditions:**
    * Delete created Recruitment drive via API or UI to clean up.

---

### [TC002]: Create Recruitment Validation
* **Priority:** P1 - High
* **Type:** Negative
* **Pre-conditions:**
    * User is logged in as Admin.
    * "Create Recruitment" modal is open.
* **Test Data:**
    * Empty inputs.

| Step # | Action Description (Instruction) | Expected Result (Verification) |
| :--- | :--- | :--- |
| 1. | Leave "Title" empty. | - |
| 2. | Leave "Job Position" empty. | - |
| 3. | Click "Save" button. | Modal remains open; "Title" field shows "This field is required" error; "Job Position" field shows error. |

* **Post-conditions:**
    * Close modal.

---

### [TC003]: Add Candidate to Pipeline
* **Priority:** P0 - Critical
* **Type:** Positive
* **Pre-conditions:**
    * Recruitment Drive "Senior React Developer 2024" exists (TC001).
    * User is viewing the pipeline for this specific drive.
* **Test Data:**
    * Name: "John Candidate"
    * Email: "john.doe@example.com"
    * Mobile: "1234567890"

| Step # | Action Description (Instruction) | Expected Result (Verification) |
| :--- | :--- | :--- |
| 1. | Locate the "Senior React Developer 2024" card. | Card is visible. |
| 2. | Click "0 Applications" (or card body) to open pipeline. | Pipeline view loads with stages (Initial Qualification, etc.). |
| 3. | Click "Add Candidate" button. | "Create Candidate" modal appears. |
| 4. | Enter "John Candidate" into "Candidate Name". | Input expectation met. |
| 5. | Enter "john.doe@example.com" into "Email". | Input expectation met. |
| 6. | Enter "1234567890" into "Mobile". | Input expectation met. |
| 7. | Click "Save". | Modal closes; "John Candidate" card appears in the "Initial Qualification" column. |

* **Post-conditions:**
    * Deletion of Candidate.

---

### [TC004]: Verify Candidate in Global List
* **Priority:** P2 - Medium
* **Type:** UI / Verification
* **Pre-conditions:**
    * Candidate "John Candidate" was added in TC003.
    * User is on the Recruitment Pipeline page.
* **Test Data:**
    * Candidate Name: "John Candidate"

| Step # | Action Description (Instruction) | Expected Result (Verification) |
| :--- | :--- | :--- |
| 1. | Click "Recruitment" -> "Candidates" in sidebar. | Global Candidates table loads. |
| 2. | Enter "John Candidate" in the Search box. | Table filters results. |
| 3. | Verify the first row. | Name is "John Candidate"; Email is "john.doe@example.com"; Job Position is "Senior React Developer 2024". |

* **Post-conditions:**
    * None.

---

### [TC005]: Move Candidate Pipeline Stage
* **Priority:** P1 - High
* **Type:** Functional
* **Pre-conditions:**
    * "John Candidate" is in "Initial Qualification" stage.
    * User is viewing the specific recruitment pipeline.
* **Test Data:**
    * Source Stage: "Initial Qualification"
    * Target Stage: "First Interview"

| Step # | Action Description (Instruction) | Expected Result (Verification) |
| :--- | :--- | :--- |
| 1. | Locate "John Candidate" card in "Initial Qualification". | Card is visible. |
| 2. | Drag card to "First Interview" column. | Card snaps to new column; "Stage Changed" toaster/notification appears. |
| 3. | Refresh page (optional). | Verify "John Candidate" remains in "First Interview" column. |

* **Post-conditions:**
    * Return candidate to initial stage or delete.
