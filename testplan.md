# Test Plan: Horilla HR Application

**Project:** Horilla HR Test Automation  
**Version:** 1.0  
**Author:** Senior SDET  
**Date:** 2025-12-16  
**Application URL:** https://v1.demo.horilla.com/

---

## 1. Document Information

### 1.1 Purpose
This document outlines the comprehensive test strategy, scope, and detailed test cases for the Horilla HR application. It serves as the master reference for all testing activities related to the core HR management functionalities.

### 1.2 Scope
This test plan covers functional, end-to-end, and UI validation testing for the following modules:
- Recruitment Management
- Employee Management  
- Leave Management
- Payroll Processing
- Onboarding Workflow

### 1.3 Out of Scope
- Performance and load testing
- Security and penetration testing
- Mobile application testing
- Third-party integrations

---

## 2. Test Strategy

### 2.1 Testing Approach
- **Automation Framework:** Playwright with TypeScript
- **Design Pattern:** Component Object Model (COM)
- **Locator Strategy:** Semantic locators (getByRole, getByLabel) with stable attribute fallbacks
- **Test Architecture:** Page Objects + Fixtures + Dependency Injection
- **Standards:** Adherence to `AI_TEST_STANDARDS.md`

### 2.2 Test Environment
- **Base URL:** https://v1.demo.horilla.com/
- **Browser:** Chromium (Desktop Chrome)
- **Test Data:** Stored in fixtures, credentials in `.env`

### 2.3 Test Credentials
- **Admin User:** `admin` / `admin` (configured in `.env` as `TEST_USERNAME` and `TEST_PASSWORD`)
- **Employee User:** (To be created during test setup)

> [!NOTE]
> Environment variable names use `TEST_` prefix to avoid conflicts with Windows system variables.

---

## 3. Test Cases

### 3.1 Recruitment Module

#### TC001: Create New Job Position
**Priority:** High  
**Module:** Recruitment  
**Test Type:** Functional

**Objective:** Verify that an admin user can successfully create a new job position.

**Preconditions:**
- User is logged in as Admin
- At least one department exists in the system

**Test Steps:**
1. Navigate to Recruitment → Job Positions
2. Click the "Create" or "Add Job Position" button
3. Enter the following details:
   - Job Title: "Senior QA Engineer"
   - Department: Select "Engineering"
   - Employment Type: "Full-time"
   - No. of Positions: "2"
4. Click "Save" or "Submit"

**Expected Result:**
- Job position is created successfully
- Success message is displayed
- New job position appears in the Job Positions list
- Job details match the entered information

**Test Data:**
- Job Title: "Senior QA Engineer"
- Department: "Engineering"  
- Employment Type: "Full-time"
- Positions: 2

---

#### TC002: Submit Candidate Application
**Priority:** High  
**Module:** Recruitment  
**Test Type:** End-to-End

**Objective:** Verify that a candidate can apply for an open position and appears in the recruitment pipeline.

**Preconditions:**
- At least one active job position exists (TC001)
- User has access to the careers page or job portal

**Test Steps:**
1. Navigate to the job listing page (internal or public portal)
2. Select the "Senior QA Engineer" position created in TC001
3. Click "Apply Now" or equivalent button
4. Fill in candidate details:
   - Name: "John Doe"
   - Email: "john.doe@test.com"
   - Phone: "+1234567890"
   - Upload Resume: (test.pdf)
5. Click "Submit Application"
6. Log in as Admin
7. Navigate to Recruitment → Candidates
8. Search for "John Doe"

**Expected Result:**
- Application submission confirmation is displayed
- Candidate "John Doe" appears in the recruitment pipeline
- Application status is "Applied" or "New"
- Candidate details match submitted information

**Test Data:**
- Candidate Name: "John Doe"
- Email: "john.doe@test.com"
- Phone: "+1234567890"

---

### 3.2 Employee Management Module

#### TC003: Create New Employee Record
**Priority:** Critical  
**Module:** Employee Management  
**Test Type:** Functional

**Objective:** Verify that an admin can create a complete employee profile with all required information.

**Preconditions:**
- User is logged in as Admin
- At least one department exists
- At least one job position exists

**Test Steps:**
1. Navigate to Employee → Employees
2. Click "Create Employee" or "+ Add Employee"
3. Fill in Basic Information:
   - First Name: "Jane"
   - Last Name: "Smith"
   - Email: "jane.smith@horilla.com"
   - Phone: "+1987654321"
4. Fill in Work Information:
   - Employee ID: "EMP001"
   - Department: "Engineering"
   - Job Position: "Senior QA Engineer"
   - Join Date: Select current date
   - Employment Type: "Full-time"
5. Click "Save" or "Create"

**Expected Result:**
- Employee profile is created successfully
- Success notification is displayed
- Employee appears in the employee list
- Employee ID "EMP001" is assigned
- All entered information is saved correctly

**Test Data:**
- First Name: "Jane"
- Last Name: "Smith"
- Employee ID: "EMP001"
- Department: "Engineering"
- Job Position: "Senior QA Engineer"

---

#### TC004: Update Employee Personal Information
**Priority:** Medium  
**Module:** Employee Management  
**Test Type:** Functional

**Objective:** Verify that employee personal information can be updated and changes are persisted.

**Preconditions:**
- Employee "Jane Smith" (EMP001) exists in the system (TC003)
- User is logged in as Admin

**Test Steps:**
1. Navigate to Employee → Employees
2. Search for "Jane Smith" or "EMP001"
3. Click on the employee name to open profile
4. Click "Edit" button
5. Update the following:
   - Phone: "+1111222333"
   - Address: "123 Test Street, Test City"
6. Click "Save Changes"
7. Verify updated information is displayed

**Expected Result:**
- Changes are saved successfully
- Success message is displayed
- Phone number is updated to "+1111222333"
- Address is updated to "123 Test Street, Test City"
- Other information remains unchanged

**Test Data:**
- Updated Phone: "+1111222333"
- Updated Address: "123 Test Street, Test City"

---

### 3.3 Leave Management Module

#### TC005: Submit Leave Request (Employee)
**Priority:** High  
**Module:** Leave Management  
**Test Type:** End-to-End

**Objective:** Verify that an employee can submit a leave request successfully.

**Preconditions:**
- Employee "Jane Smith" (EMP001) exists and is active
- User is logged in as Employee (jane.smith@horilla.com)
- Employee has available leave balance

**Test Steps:**
1. Navigate to Leave → Apply Leave
2. Select Leave Type: "Annual Leave"
3. Select Start Date: [Today + 7 days]
4. Select End Date: [Today + 8 days]
5. Enter Reason: "Personal vacation"
6. Click "Submit" or "Apply"

**Expected Result:**
- Leave request is submitted successfully
- Confirmation message is displayed
- Request status is "Pending" or "Requested"
- Leave request appears in "My Leave Requests"
- Leave balance is not deducted yet (pending approval)

**Test Data:**
- Leave Type: "Annual Leave"
- Duration: 2 days
- Reason: "Personal vacation"

---

#### TC006: Approve Leave Request (Manager)
**Priority:** High  
**Module:** Leave Management  
**Test Type:** End-to-End

**Objective:** Verify that a manager can approve a pending leave request and leave balance is updated.

**Preconditions:**
- Leave request from TC005 exists with status "Pending"
- User is logged in as Admin/Manager

**Test Steps:**
1. Navigate to Leave → Leave Requests
2. Filter or search for pending requests
3. Locate leave request for "Jane Smith" - "Annual Leave"
4. Click on the request to view details
5. Verify request details (dates, reason, employee)
6. Click "Approve" button
7. Add approval comment (optional): "Approved"
8. Confirm approval
9. Navigate to employee's leave balance
10. Verify leave balance is deducted

**Expected Result:**
- Leave request status changes to "Approved"
- Approval notification is sent to employee
- Leave balance is deducted by 2 days
- Approved leave appears in the calendar
- Manager comment is saved

**Test Data:**
- Approval Comment: "Approved"

---

### 3.4 Payroll Module

#### TC007: Generate Individual Payslip
**Priority:** Critical  
**Module:** Payroll  
**Test Type:** Functional

**Objective:** Verify that a payslip can be generated for an employee with accurate salary calculations.

**Preconditions:**
- Employee "Jane Smith" (EMP001) exists
- Employee has configured salary structure (Basic + Allowances)
- User is logged in as Admin/Payroll Manager

**Test Steps:**
1. Navigate to Payroll → Payslips
2. Click "Create Payslip" or "+ Generate Payslip"
3. Select Employee: "Jane Smith (EMP001)"
4. Select Month: Current month
5. Select Year: Current year
6. Review auto-calculated components:
   - Basic Salary: 50,000
   - HRA: 15,000
   - Transport: 5,000
   - Total Earnings: 70,000
   - Tax Deduction: 5,000
   - Net Pay: 65,000
7. Click "Generate" or "Save"

**Expected Result:**
- Payslip is generated successfully
- All salary components are calculated correctly
- Net Pay = (Basic + Allowances) - Deductions = 65,000
- Payslip is available for download (PDF)
- Payslip appears in employee's payslip history

**Test Data:**
- Employee: "Jane Smith (EMP001)"
- Basic: 50,000
- HRA: 15,000
- Transport: 5,000
- Tax: 5,000
- Expected Net: 65,000

---

#### TC008: Batch Generate Payslips
**Priority:** Medium  
**Module:** Payroll  
**Test Type:** Functional

**Objective:** Verify that payslips can be generated for multiple employees simultaneously.

**Preconditions:**
- Multiple employees exist in the system (at least 3)
- All selected employees have configured salary structures
- User is logged in as Admin/Payroll Manager

**Test Steps:**
1. Navigate to Payroll → Payslips
2. Click "Batch Generate" or "Generate Multiple"
3. Select Month: Current month
4. Select Year: Current year
5. Filter or select employees:
   - Select "Jane Smith (EMP001)"
   - Select "John Doe (EMP002)"
   - Select "Test User (EMP003)"
6. Click "Generate Payslips"
7. Wait for batch processing to complete
8. Verify all payslips are generated

**Expected Result:**
- Batch processing starts successfully
- Progress indicator is displayed
- All 3 payslips are generated
- Success message shows "3 payslips generated successfully"
- Each employee's payslip is accessible
- No errors or failed generations

**Test Data:**
- Employees: 3 (EMP001, EMP002, EMP003)
- Month: Current
- Year: Current

---

### 3.5 Onboarding Module

#### TC009: Initiate Onboarding Process
**Priority:** High  
**Module:** Onboarding  
**Test Type:** End-to-End

**Objective:** Verify that onboarding can be initiated for a hired candidate.

**Preconditions:**
- Candidate "John Doe" exists in recruitment pipeline
- Candidate status is "Hired" or "Selected"
- At least one onboarding template/checklist exists
- User is logged in as Admin/HR Manager

**Test Steps:**
1. Navigate to Recruitment → Candidates
2. Filter candidates by status: "Hired"
3. Select candidate "John Doe"
4. Click "Start Onboarding" or equivalent action
5. Select Onboarding Template: "Standard Engineering Onboarding"
6. Set Start Date: [Today + 1 day]
7. Assign Onboarding Manager: "Admin"
8. Click "Initiate Onboarding"

**Expected Result:**
- Onboarding is initiated successfully
- Candidate status changes to "Onboarding"
- Onboarding checklist is created
- Onboarding manager receives notification
- Start date is set correctly

**Test Data:**
- Candidate: "John Doe"
- Template: "Standard Engineering Onboarding"
- Start Date: [Today + 1]
- Manager: "Admin"

---

#### TC010: Verify New Joiner on Dashboard
**Priority:** Low  
**Module:** Onboarding  
**Test Type:** UI Validation

**Objective:** Verify that newly onboarded employees appear in the dashboard widgets.

**Preconditions:**
- Onboarding for "John Doe" is completed (TC009)
- Employee joining date is today or within the current week
- User is logged in as Admin

**Test Steps:**
1. Navigate to Dashboard (home page)
2. Locate the "Today's New Joiners" widget
3. Verify "John Doe" appears in the list
4. Locate the "Joining This Week" widget
5. Verify "John Doe" appears in this list as well

**Expected Result:**
- "Today's New Joiners" widget displays "John Doe"
- "Joining This Week" widget displays "John Doe"
- Employee information is accurate (name, department, position)
- Widgets update automatically

**Test Data:**
- Employee: "John Doe"
- Department: "Engineering"
- Position: "Senior QA Engineer"

---

## 4. Test Execution Summary

| Test Case | Module | Priority | Status | Notes |
|:----------|:-------|:---------|:-------|:------|
| TC001 | Recruitment | High | Not Run | - |
| TC002 | Recruitment | High | Not Run | - |
| TC003 | Employee Mgmt | Critical | Not Run | - |
| TC004 | Employee Mgmt | Medium | Not Run | - |
| TC005 | Leave Mgmt | High | Not Run | - |
| TC006 | Leave Mgmt | High | Not Run | - |
| TC007 | Payroll | Critical | Not Run | - |
| TC008 | Payroll | Medium | Not Run | - |
| TC009 | Onboarding | High | Not Run | - |
| TC010 | Onboarding | Low | Not Run | - |

---

## 5. Entry and Exit Criteria

### 5.1 Entry Criteria
- Test environment is accessible
- Test data and user credentials are available
- Playwright framework is set up and configured
- All Page Objects for the modules are implemented

### 5.2 Exit Criteria
- All Critical and High priority test cases pass
- No Critical or High severity defects are open
- Test coverage meets 80% of planned scenarios
- Test execution report is generated

---

## 6. Risks and Mitigation

| Risk | Impact | Mitigation |
|:-----|:-------|:-----------|
| Login authentication issues | High | Implement API-based authentication fallback |
| Test data dependencies | Medium | Use API to seed test data before execution |
| Flaky tests due to dynamic content | Medium | Implement robust waits and state assertions |
| Environment downtime | High | Schedule test execution during stable hours |

---

## 7. Deliverables

- Test execution report (HTML)
- Test case results with screenshots for failures
- Defect report (if any)
- Code coverage report

---

## 8. Test Schedule

| Phase | Start Date | End Date | Owner |
|:------|:-----------|:---------|:------|
| Test Plan Review | 2025-12-16 | 2025-12-17 | SDET Team |
| Test Implementation | 2025-12-17 | 2025-12-20 | SDET Team |
| Test Execution | 2025-12-21 | 2025-12-23 | SDET Team |
| Defect Fixing | 2025-12-24 | 2025-12-26 | Dev Team |
| Regression | 2025-12-27 | 2025-12-28 | SDET Team |
| Sign-off | 2025-12-29 | 2025-12-29 | QA Lead |

---

## 9. Approval

| Role | Name | Signature | Date |
|:-----|:-----|:----------|:-----|
| QA Lead | - | - | - |
| Project Manager | - | - | - |
| Development Lead | - | - | - |

---

**Document Version History:**

| Version | Date | Author | Changes |
|:--------|:-----|:-------|:--------|
| 1.0 | 2025-12-16 | Senior SDET | Initial enterprise-level test plan with TC001-TC010 |
