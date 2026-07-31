# Contributing

## Change workflow

1. Create a short-lived branch from `main`.
2. Keep each pull request focused on one risk, journey, or maintenance change.
3. Run `npm ci` after dependency changes and commit `package-lock.json`.
4. Run `npm run validate` before opening the pull request.
5. Run the affected tests locally. Use BrowserStack when the change affects platform behavior,
   capabilities, Local Testing, or a release-gated journey.
6. Complete the pull-request checklist and attach sanitized evidence.

## Test standards

- Map each test to a requirement, risk, or customer journey.
- Prefer Playwright roles, labels, and test IDs over CSS or XPath.
- Make test data isolated and repeatable.
- Assert the observable business outcome.
- Avoid fixed sleeps and order dependencies.
- Tag tests with `@smoke`, `@critical`, or `@regression`.
- Never commit credentials, personal data, production tokens, reports, traces, or videos.

## Review standards

Reviewers should check correctness, business value, platform implications, data handling,
diagnostic quality, flakiness risk, and BrowserStack session cost. A retry is not a substitute for a
reliable test.

## Quarantine policy

A quarantined test must have a linked issue, named owner, reason, business risk, and expiry date.
Remove or repair expired quarantines before release sign-off.
