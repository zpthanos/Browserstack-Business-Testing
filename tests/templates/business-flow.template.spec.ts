import { expect, test } from '../../src/fixtures/test.js';

test.describe('Business journey template', () => {
  test.skip(true, 'Copy this file into tests/e2e and replace the example steps.');

  test('@critical customer completes the primary journey', async ({ page }) => {
    await page.goto('/');

    // Prefer role-, label-, or test-id-based locators over CSS/XPath selectors.
    await page.getByRole('link', { name: 'Replace with real action' }).click();

    // Assert the business outcome, not only that an element was clicked.
    await expect(page.getByText('Replace with expected outcome')).toBeVisible();
  });
});
