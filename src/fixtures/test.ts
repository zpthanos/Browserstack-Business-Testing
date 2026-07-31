import { test as base } from '@playwright/test';

import { HomePage } from '../pages/home.page.js';

interface BusinessFixtures {
  homePage: HomePage;
}

export const test = base.extend<BusinessFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect } from '@playwright/test';
