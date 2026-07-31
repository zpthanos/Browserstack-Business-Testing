# Test Operations Runbook

## Before a run

1. Confirm the target environment and release candidate are identifiable.
2. Check planned maintenance and active incidents.
3. Confirm synthetic users and required data are available.
4. Confirm the approved BrowserStack matrix and parallel capacity.
5. Select `smoke`, `regression`, or `all` based on the test plan.
6. Use BrowserStack Local only when the target is not publicly reachable.

## Execute locally

```bash
npm ci
npx playwright install chromium
APP_BASE_URL="https://target.example.com" npm run test:smoke
```

Use local execution for fast authoring feedback. It does not replace the approved cross-browser
release run.

## Execute on BrowserStack

```bash
export BROWSERSTACK_USERNAME="..."
export BROWSERSTACK_ACCESS_KEY="..."
export APP_BASE_URL="https://target.example.com"
npm run test:browserstack -- --grep @smoke
```

For private targets:

```bash
npm run config:browserstack -- --local=true
export APP_BASE_URL="http://localhost:3000"
npm run test:browserstack -- --grep @smoke
```

Return the repository default when finished:

```bash
npm run config:browserstack -- --local=false
```

## Triage sequence

1. Identify the first meaningful failed assertion, not the last cleanup error.
2. Compare platforms: one platform often suggests compatibility; all platforms often suggest the
   application, data, or environment.
3. Review Playwright trace, screenshot, video, console errors, and network logs.
4. Reproduce once with the same build, target, data, and platform.
5. Classify the failure:

| Class                 | Typical evidence                                            | Primary owner       |
| --------------------- | ----------------------------------------------------------- | ------------------- |
| Product defect        | Reproducible behavior contradicts requirement               | Product engineering |
| Test defect           | Bad locator, timing assumption, or incorrect assertion      | Test owner          |
| Environment/data      | Service outage, deployment drift, unavailable test user     | Environment owner   |
| BrowserStack/platform | Session creation or infrastructure issue independent of app | QA/platform owner   |
| Unknown               | Evidence is insufficient or contradictory                   | QA lead coordinates |

6. Record severity, scope, owner, evidence links, and next action.
7. Quarantine only with an owner, issue, reason, and expiration date.

## Common problems

### Missing credentials

Confirm `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` exist in the current shell or GitHub
environment. Do not print their values.

### Target is unreachable

- Public URL: confirm DNS, TLS, authentication, and allowlists.
- Private URL: set `browserstackLocal: true` using the config script.
- Proxy/VPN: follow BrowserStack's
  [proxy and firewall guidance](https://www.browserstack.com/docs/automate/playwright/local-testing/proxies-firewall-vpn)
  and involve the network owner.

### Sessions queue or fail to start

Check account parallel capacity, queued sessions, platform availability, and BrowserStack status.
Do not solve capacity issues by unbounded retries.

### Test is flaky

Remove fixed sleeps, use observable readiness conditions, isolate shared data, prefer semantic
locators, and inspect whether retries hide a consistent first-attempt failure. Keep the test out of
the release gate only through the approved quarantine process.

### A platform is unsupported

Validate the matrix against BrowserStack's
[supported Playwright browsers and operating systems](https://www.browserstack.com/docs/automate/playwright/browsers-and-os).
Document any matrix change and its customer impact.

## Escalation packet

Include build/session links, UTC time, target environment, platform, test name, first error,
reproduction result, classification, and sanitized evidence. Never paste credentials, session
cookies, or personal data into an issue.

## After a run

- Link evidence to the release record.
- File owned defects and flaky-test work.
- Confirm any temporary Local or logging configuration was restored.
- Review duration and parallel usage.
- Make and record the release decision under the approved quality gate.
