# Go-Live Checklist

## Product and risk

- [ ] Critical customer journeys are named and mapped to active tests.
- [ ] The browser/device matrix is supported by usage data or contractual requirements.
- [ ] Release-blocking thresholds and defect severities are approved.
- [ ] Excluded scope and residual risks are accepted by the decision owner.

## Technical readiness

- [ ] Sample target, title pattern, and template assertions have been replaced.
- [ ] Three consecutive representative runs meet pass-rate and flakiness targets.
- [ ] BrowserStack project/build names make runs traceable to a release.
- [ ] Parallel usage fits account capacity and the execution-time target.
- [ ] Reports and BrowserStack session links are accessible to operators.
- [ ] BrowserStack Local works from the actual runner if private targets are required.

## Security and compliance

- [ ] Secrets are stored in approved GitHub/enterprise secret storage.
- [ ] Test users and data are synthetic or explicitly approved.
- [ ] Network, console, video, screenshot, and trace settings are approved.
- [ ] Artifact and session retention is defined.
- [ ] Access and exposure-response owners are named.

## Operations

- [ ] Primary and backup operators can run and triage the suite.
- [ ] Failures have classification, severity, and escalation processes.
- [ ] Quarantine requires an owner, issue, and expiry.
- [ ] Application, environment, network, and BrowserStack escalation contacts are recorded.
- [ ] A review cadence exists for matrix, coverage, flakiness, cost, and access.

## Approval

| Role                                | Name | Decision | Date |
| ----------------------------------- | ---- | -------- | ---- |
| Business/release owner              |      |          |      |
| QA owner                            |      |          |      |
| Engineering owner                   |      |          |      |
| Security/privacy owner, if required |      |          |      |
