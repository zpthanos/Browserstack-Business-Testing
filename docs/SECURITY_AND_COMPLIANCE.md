# Security and Compliance

## Minimum controls

- Store BrowserStack credentials only in an approved secret manager, shell environment, or GitHub
  Actions secrets.
- Grant repository and BrowserStack access through named individual accounts and least privilege.
- Use synthetic test accounts and data. Do not copy production customer records into test systems.
- Treat screenshots, videos, console output, network logs, traces, and HTML reports as potentially
  sensitive.
- Define owners and retention for GitHub artifacts and BrowserStack session data.
- Rotate access keys on personnel changes, suspected exposure, and the organization's normal key
  rotation cadence.
- Review third-party subprocessor, data-region, and contractual requirements with legal/security
  before testing regulated data or flows.

## Data classification checklist

Before automating a journey, identify whether it can expose:

- Passwords, access tokens, API keys, session cookies, or one-time codes
- Personal, health, payment, government, employment, or location data
- Confidential product, pricing, customer, or operational information
- Uploaded documents or user-generated content

If any answer is yes, design synthetic data and redaction before enabling recordings or network
payload capture. Do not rely on a later cleanup step.

## Logging choices in this starter

`browserstack.yml` enables network logs and error-level console logs because they materially help a
pilot. Security owners should decide whether these settings are acceptable for each test target.
Disable network logs for sensitive flows unless an approved debugging process requires them.

BrowserStack also supports command masking and other logging controls. Confirm current capability
names in the
[official Playwright capabilities documentation](https://www.browserstack.com/docs/automate/playwright/playwright-capabilities)
before changing production controls.

## Git and CI safeguards

- `.env` files, reports, traces, and logs are ignored.
- `browserstack.yml` deliberately omits credentials.
- The config contract test fails if credential fields or example credential strings appear.
- GitHub workflows use secrets only as environment variables.
- Workflow permissions are read-only unless a future use case explicitly requires more.
- Dependabot keeps npm and GitHub Actions updates visible for review.

Add your organization's secret scanner and software-composition analysis before production use.

## Exposure response

1. Stop affected workflows if exposure is ongoing.
2. Rotate the BrowserStack access key and any exposed application/test credentials.
3. Remove or restrict affected artifacts and sessions according to policy.
4. Preserve necessary evidence through the approved incident process.
5. Search git history and logs for the exposed value without repeating it in tickets or chat.
6. Notify security/privacy owners and follow contractual or regulatory reporting rules.
7. Correct the source and add a regression control before resuming.

Rewriting git history is an organizational change: coordinate it with repository administrators and
all contributors rather than treating it as the only remediation.

## Periodic review

At least quarterly, review access, key age, artifact retention, BrowserStack data settings,
third-party terms, platform matrix, test accounts, and any tests that capture sensitive screens.
