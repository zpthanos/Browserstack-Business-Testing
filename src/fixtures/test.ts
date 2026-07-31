import { test as base } from '@playwright/test';

import { HomePage } from '../pages/home.page.js';
import { WooCommercePage } from '../pages/woocommerce.page.js';

interface BusinessFixtures {
  homePage: HomePage;
  wooCommercePage: WooCommercePage;
}

export const test = base.extend<BusinessFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  wooCommercePage: async ({ page }, use) => {
    await use(new WooCommercePage(page));
  },
});

export { expect } from '@playwright/test';
