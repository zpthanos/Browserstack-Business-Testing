# BrowserStack Business Testing Starter

A GitHub-ready foundation for teams starting automated cross-browser testing with
[BrowserStack Automate](https://www.browserstack.com/automate) and Playwright. It includes
working sample tests, a three-platform BrowserStack matrix, local and CI commands, secure
credential handling, GitHub Actions, reporting, and business adoption documentation.

## What is included

- TypeScript + Playwright test code with fixtures and page objects
- Chrome on Windows 11, Playwright WebKit on macOS Ventura, and Playwright Firefox on
  Windows 11
- BrowserStack SDK integration and optional BrowserStack Local tunnel
- Manual GitHub Actions workflow with target URL and suite selection
- HTML, JUnit, trace, screenshot, and video artifacts
- Security, governance, test-planning, release-gate, and incident runbooks
- Dependabot, pull-request template, and issue templates

This starter covers web application testing with BrowserStack Automate. Native mobile app
testing requires an Appium/App Automate extension and is intentionally outside this repository's
default scope.

## Five-minute quick start

### 1. Install

Requirements: Node.js 22 or newer and npm.

```bash
npm ci
npx playwright install chromium
```

### 2. Run locally

The default target is BrowserStack's public demo site.

```bash
npm run test:local
```

To test your own site:

```bash
APP_BASE_URL="https://staging.example.com" npm run test:local
```

### 3. Run on BrowserStack

Get your username and access key from your BrowserStack account. Keep both values out of source
control.

```bash
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"
export APP_BASE_URL="https://staging.example.com"
npm run test:browserstack
```

Results appear in the
[BrowserStack Automate dashboard](https://automate.browserstack.com/dashboard/v2).

### 4. Validate before a pull request

```bash
npm run validate
```

Validation checks types, configuration safety, test discovery, required documentation, and
formatting. It does not consume BrowserStack sessions.

## Common commands

| Command                                       | Purpose                                              |
| --------------------------------------------- | ---------------------------------------------------- |
| `npm run test:local`                          | Run all active tests on a local Chromium browser     |
| `npm run test:smoke`                          | Run tests tagged `@smoke` locally                    |
| `npm run test:regression`                     | Run tests tagged `@regression` locally               |
| `npm run test:browserstack`                   | Run active tests across `browserstack.yml` platforms |
| `npm run config:browserstack -- --local=true` | Enable SDK-managed BrowserStack Local                |
| `npm run validate`                            | Run repository checks without a cloud session        |
| `npm run format`                              | Format code, YAML, and Markdown                      |

BrowserStack test filtering uses standard Playwright arguments. For example:

```bash
npm run test:browserstack -- --grep @smoke
```

## Configuration

| Variable                  | Required   | Default                            | Meaning                       |
| ------------------------- | ---------- | ---------------------------------- | ----------------------------- |
| `APP_BASE_URL`            | No         | `https://bstackdemo.com`           | Application under test        |
| `EXPECTED_TITLE_PATTERN`  | No         | `StackDemo` only in `.env.example` | Case-insensitive title regex  |
| `BROWSERSTACK_USERNAME`   | Cloud only | none                               | BrowserStack account username |
| `BROWSERSTACK_ACCESS_KEY` | Cloud only | none                               | BrowserStack access key       |

`browserstack.yml` controls platforms, concurrency, Local Testing, logging, project, and build
grouping. Start with one parallel per platform, confirm account capacity, and increase deliberately.

For a private or localhost target:

```bash
npm run config:browserstack -- --local=true
export APP_BASE_URL="http://localhost:3000"
npm run test:browserstack
```

The BrowserStack SDK starts and stops the Local tunnel. Set `--local=false` when returning to a
public target. See [TEST_OPERATIONS_RUNBOOK.md](docs/TEST_OPERATIONS_RUNBOOK.md) for proxies,
firewalls, and failure triage.

## Add a real business journey

1. Copy `tests/templates/business-flow.template.spec.ts` into `tests/e2e/`.
2. Rename it for the journey, remove the unconditional `test.skip`, and replace the example steps.
3. Keep credentials and personal data in a secret manager or CI environment secrets.
4. Prefer locators by role, label, or test ID.
5. Assert the business outcome, such as order creation or account state, rather than only UI clicks.
6. Add `@smoke`, `@critical`, or `@regression` to the test title.

## GitHub setup

Unzip this package, commit the extracted contents, then follow
[GITHUB_SETUP.md](docs/GITHUB_SETUP.md). GitHub does not unpack a ZIP into repository files when
the ZIP itself is committed.

## Documentation map

| Document                                                     | Audience                 | Purpose                                           |
| ------------------------------------------------------------ | ------------------------ | ------------------------------------------------- |
| [Business readiness guide](docs/BUSINESS_READINESS_GUIDE.md) | Sponsors, product, QA    | Ownership, entry criteria, metrics, rollout       |
| [GitHub setup](docs/GITHUB_SETUP.md)                         | Repository admins        | Create repository, secrets, environments, Actions |
| [Test operations runbook](docs/TEST_OPERATIONS_RUNBOOK.md)   | QA, engineering, support | Execute, inspect, triage, escalate                |
| [Security and compliance](docs/SECURITY_AND_COMPLIANCE.md)   | Security, privacy, QA    | Secrets, test data, logs, retention               |
| [Test plan template](docs/TEST_PLAN_TEMPLATE.md)             | QA leads, product        | Scope, risks, coverage, release gate              |
| [Go-live checklist](docs/GO_LIVE_CHECKLIST.md)               | Release owners           | Final readiness and sign-off                      |
| [Contributing](CONTRIBUTING.md)                              | Contributors             | Branch, test, and review standards                |

## Source guidance

The integration follows BrowserStack's current official guidance for the
[Playwright Node.js SDK](https://www.browserstack.com/docs/automate/playwright/getting-started/nodejs/integrate-your-tests),
[supported Playwright browsers and operating systems](https://www.browserstack.com/docs/automate/playwright/browsers-and-os),
[Local Testing](https://www.browserstack.com/docs/automate/playwright/getting-started/nodejs/local-testing),
and [GitHub Actions](https://www.browserstack.com/docs/automate/playwright/github-actions).

## License

MIT. See [LICENSE](LICENSE).
