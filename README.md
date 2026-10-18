# BrowserStack Business Testing

[![Repository quality](https://github.com/zpthanos/Browserstack-Business-Testing/actions/workflows/quality.yml/badge.svg)](https://github.com/zpthanos/Browserstack-Business-Testing/actions/workflows/quality.yml)
[![BrowserStack tests](https://github.com/zpthanos/Browserstack-Business-Testing/actions/workflows/browserstack-tests.yml/badge.svg)](https://github.com/zpthanos/Browserstack-Business-Testing/actions/workflows/browserstack-tests.yml)

A Playwright portfolio suite that runs a configurable WooCommerce business journey through BrowserStack Automate. It also includes a small homepage availability check, repository contract tests, CI reporting, and operational documentation.

## Active business evidence

The `@critical @regression` journey performs real storefront behavior:

1. Open a configured, in-stock WooCommerce product.
2. Assert the product page response and product heading.
3. Add the product to the cart.
4. Verify the product and quantity in the cart.
5. Continue to checkout.
6. Fill synthetic billing data using the reserved `example.com` domain.
7. Verify the order review and enabled **Place order** control.
8. Attach a full-page checkout screenshot to the Playwright report.
9. Stop before payment or order creation and assert that no order-confirmation URL is reached.

This replaces the previous skipped copy-a-template example; the repository now contains an active business test.

## Browser matrix

`browserstack.yml` runs the same active tests on:

- Chrome latest on Windows 11
- Playwright WebKit latest on macOS Ventura
- Playwright Firefox latest on Windows 11

Credentials are never stored in the file. The BrowserStack SDK reads `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` from the environment.

## Local validation

Requirements: Node.js 22+ and npm.

```bash
npm ci
npm run validate
```

`validate` runs strict TypeScript checks, configuration/credential-safety tests, test discovery, required-document checks, and formatting checks. It does not consume a BrowserStack session.

To execute locally after installing a Playwright browser:

```bash
npx playwright install chromium
npm run test:local
```

## Configure a WooCommerce target

```bash
export APP_BASE_URL="https://shop.example.test"
export WOOCOMMERCE_PRODUCT_PATH="/product/example-product/"
export WOOCOMMERCE_PRODUCT_NAME="Example Product"
```

The target must use a classic WooCommerce product/cart/checkout flow, and the configured product must be simple, in stock, and addable without selecting variations.

## Run on BrowserStack

```bash
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"
npm run test:browserstack
```

Common scopes:

```bash
npm run test:browserstack -- --grep @smoke
npm run test:browserstack -- --grep @regression
npm run test:browserstack -- --grep @critical
```

The manual GitHub Actions workflow accepts a target URL, suite, and BrowserStack Local option. It uploads HTML reports, JUnit output, screenshots, traces, and failure video for 14 days.

## Evidence and limitations

The two badges report the current workflow state; they are not hard-coded claims. Reviewers should open the BrowserStack workflow run and inspect its uploaded checkout screenshot and report. A cloud run requires repository secrets and therefore is intentionally manual.

The suite does not place an order, exercise payment, or claim complete WooCommerce coverage. A public demo target can change without notice.

## Documentation

- [Business readiness guide](docs/BUSINESS_READINESS_GUIDE.md)
- [GitHub setup](docs/GITHUB_SETUP.md)
- [Test operations runbook](docs/TEST_OPERATIONS_RUNBOOK.md)
- [Security and compliance](docs/SECURITY_AND_COMPLIANCE.md)
- [Test plan](docs/TEST_PLAN_TEMPLATE.md)
- [Go-live checklist](docs/GO_LIVE_CHECKLIST.md)
- [Contributing](CONTRIBUTING.md)

MIT licensed. See [LICENSE](LICENSE).
