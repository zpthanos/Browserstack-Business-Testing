# Business Readiness Guide

## Purpose

Use this guide to move from a technical proof of concept to an owned, repeatable testing service.
The outcome is not merely a green test run; it is a release decision supported by trustworthy
evidence.

## Entry criteria

Do not call the program production-ready until all of these are true:

- A named business sponsor owns the quality objective and budget.
- A QA owner approves scope, risk tiers, and the initial browser/device matrix.
- Engineering owns application testability, stable selectors, and test-environment support.
- Security approves credentials, test data, logs, and retention.
- The BrowserStack plan has sufficient parallel capacity for the agreed execution time.
- The target environment is stable and has an escalation owner.
- Critical customer journeys and release-blocking rules are documented.
- At least three consecutive representative runs meet the agreed reliability target.

## Recommended ownership

| Activity                 | Accountable            | Responsible           | Consulted            | Informed      |
| ------------------------ | ---------------------- | --------------------- | -------------------- | ------------- |
| Quality goals and budget | Business sponsor       | QA lead               | Product, engineering | Leadership    |
| Journey prioritization   | Product owner          | QA lead               | Support, analytics   | Engineering   |
| Test implementation      | Engineering lead       | SDET/engineer         | QA                   | Product       |
| Platform and secrets     | Engineering lead       | DevOps                | Security             | QA            |
| Test data and privacy    | Security/privacy owner | QA + DevOps           | Legal, product       | Sponsor       |
| Release gate             | Release owner          | QA lead               | Engineering, product | Stakeholders  |
| Failure triage           | QA lead                | On-call engineer/SDET | Product              | Release owner |

Replace role names with real people or teams before launch.

## Risk-based test portfolio

| Tier        | Example                                    | Cadence                    | Target duration  | Release effect     |
| ----------- | ------------------------------------------ | -------------------------- | ---------------- | ------------------ |
| Critical    | Login, checkout, payment, account recovery | Every release candidate    | Under 10 minutes | Blocks release     |
| Smoke       | Site availability and top-level navigation | Pull request or deployment | Under 5 minutes  | Blocks promotion   |
| Regression  | Supported journeys and edge cases          | Nightly or pre-release     | Under 45 minutes | Blocks by severity |
| Exploratory | New behavior, unusual devices, UX          | Per sprint/release         | Time-boxed       | Human decision     |

Start with a narrow critical set. Add coverage only when the existing suite is stable and owned.

## Browser matrix decision

Base the matrix on production analytics, contractual commitments, market/geography, and customer
support evidence. The included matrix is a safe technical starting point, not a statement about
your customers.

Review the matrix quarterly and after material traffic changes. Record each addition or removal in
the test plan with supporting data.

## Quality gates

Recommended initial gate:

- 100% pass for critical tests on required platforms.
- No open Severity 1 or Severity 2 defect affecting the release scope.
- Smoke suite pass rate of at least 99% across the trailing 20 runs.
- Flaky-test rate below 2%; quarantined tests have an owner and expiry date.
- All failures classified as product defect, test defect, environment issue, or platform issue.
- Evidence links retained with the release record.

Tune thresholds to the business risk. Never treat a rerun pass as proof that the first failure did
not matter.

## Useful measures

| Measure                   | Definition                                             | Why it matters         |
| ------------------------- | ------------------------------------------------------ | ---------------------- |
| Critical journey coverage | Automated critical journeys / agreed critical journeys | Business risk coverage |
| First-run pass rate       | Tests passing without retry / tests executed           | Signal quality         |
| Flaky-test rate           | Tests with inconsistent results / tests executed       | Trust in automation    |
| Mean triage time          | Failure detected to classified                         | Release responsiveness |
| Escaped defect rate       | Relevant production defects / release                  | Outcome effectiveness  |
| Execution duration        | Start to complete for the release suite                | Delivery speed         |
| Parallel utilization      | Active sessions / purchased capacity                   | Cost and throughput    |

## 30-day adoption path

### Week 1: Align

- Name owners and approve scope.
- Select three to five high-value journeys.
- Confirm supported browsers from real usage data.
- Approve credential and test-data controls.

### Week 2: Prove

- Replace the sample tests with one real smoke and one critical journey.
- Run on one platform until selectors and data are stable.
- Define defect severity and triage channels.

### Week 3: Expand

- Add the approved cross-browser matrix.
- Enable the manual GitHub Actions workflow.
- Record duration, failure causes, and flakiness for at least three runs.

### Week 4: Operationalize

- Approve the release gate and escalation path.
- Add an agreed scheduled cadence if useful.
- Train backup owners.
- Hold the first monthly quality review and prioritize the next coverage increment.

## Exit criteria for the starter phase

- The example target and example assertions have been replaced.
- Every active test maps to a documented risk or requirement.
- The suite runs from GitHub Actions using repository or environment secrets.
- Results are reviewed by a named owner.
- The go-live checklist is signed off.
- A backlog exists for missing coverage, flaky tests, and platform changes.
