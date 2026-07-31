# Test Plan Template

Copy this file for each product or significant release and replace every bracketed field.

## Identification

- Product/release: [name and version]
- Test plan owner: [name/team]
- Business sponsor: [name]
- Test window: [UTC dates/times]
- Target environment and build: [URL and immutable identifier]
- Related requirements/risks: [links]

## Objective

[State the customer or business outcomes this plan will provide confidence in.]

## Scope

### Included

- [Journey, feature, integration]

### Excluded

- [Item and reason]

## Risk and priority

| Risk/journey | Business impact               | Likelihood | Test tier                   | Owner   |
| ------------ | ----------------------------- | ---------- | --------------------------- | ------- |
| [Example]    | [High/Medium/Low + rationale] | [H/M/L]    | [Critical/Smoke/Regression] | [Owner] |

## Platform matrix

| Browser/device | OS/version | Reason/evidence             | Required for release? |
| -------------- | ---------- | --------------------------- | --------------------- |
| [Platform]     | [Version]  | [Analytics/contract/market] | [Yes/No]              |

## Test data and accounts

- Data source: [synthetic generator/fixtures]
- Account owners: [team]
- Reset/cleanup method: [method]
- Sensitive-data controls: [controls]

## Execution

- Suites/tags: [for example `@smoke`, `@critical`]
- Trigger/cadence: [manual, deployment, nightly]
- Parallel sessions: [number]
- Expected duration: [minutes]
- BrowserStack Local required: [yes/no and network owner]

## Entry criteria

- [Environment deployed and stable]
- [Required integrations available]
- [Test data prepared]
- [Known limitations reviewed]

## Exit and release criteria

- [Critical pass threshold]
- [Allowed defect severities/counts]
- [Flakiness threshold]
- [Required evidence]
- [Decision owner]

## Defect and triage process

- Triage channel: [link/name]
- Severity model: [link]
- Initial response target: [time]
- Escalation path: [roles]

## Evidence and retention

- BrowserStack project/build naming: [names]
- Release record location: [link]
- Artifact retention: [days/policy]
- Data classification: [classification]

## Approvals

| Role                          | Name   | Decision         | Date   |
| ----------------------------- | ------ | ---------------- | ------ |
| Product                       | [name] | [approve/reject] | [date] |
| QA                            | [name] | [approve/reject] | [date] |
| Engineering                   | [name] | [approve/reject] | [date] |
| Security/privacy, if required | [name] | [approve/reject] | [date] |
