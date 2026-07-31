import { getTestEnvironment } from '../../src/config/environment.js';
import { expect, test } from '../../src/fixtures/test.js';

const environment = getTestEnvironment();

test('@smoke homepage is reachable and renders content', async ({ homePage }) => {
  const response = await homePage.open();

  expect(response, 'The top-level navigation should return an HTTP response').not.toBeNull();
  expect(response?.status(), 'The top-level document returned an error status').toBeLessThan(400);
  await homePage.expectVisibleDocument();

  const title = (await homePage.title()).trim();
  expect(title, 'The page should have a non-empty title').not.toBe('');

  if (environment.expectedTitlePattern) {
    expect(title).toMatch(environment.expectedTitlePattern);
  }
});

test('@regression homepage remains available after reload', async ({ homePage, page }) => {
  await homePage.open();
  const response = await page.reload();

  expect(response, 'Reload should return an HTTP response').not.toBeNull();
  expect(response?.status(), 'Reloaded document returned an error status').toBeLessThan(400);
  await homePage.expectVisibleDocument();
});
