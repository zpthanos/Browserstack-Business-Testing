import { getTestEnvironment } from '../../src/config/environment.js';
import { expect, test } from '../../src/fixtures/test.js';

const environment = getTestEnvironment();

test('@critical @regression shopper reaches WooCommerce order review without placing an order', async ({
  page,
  wooCommercePage,
}, testInfo) => {
  const response = await wooCommercePage.openProduct(environment.productPath);
  expect(response, 'The product page should return an HTTP response').not.toBeNull();
  expect(response?.status(), 'The product page returned an error status').toBeLessThan(400);

  await wooCommercePage.addProduct(environment.productName);
  await wooCommercePage.openCart(environment.productName);
  await wooCommercePage.proceedToCheckout();
  await wooCommercePage.completeSyntheticBillingDetails();
  await wooCommercePage.expectOrderReview(environment.productName);

  await testInfo.attach('checkout-order-review', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });

  await expect(page).not.toHaveURL(/order-received/i);
});
