import { expect, type Page, type Response } from '@playwright/test';

export class WooCommercePage {
  public constructor(private readonly page: Page) {}

  public async openProduct(path: string): Promise<Response | null> {
    return this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  public async addProduct(name: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name, exact: true })).toBeVisible();
    await this.page.getByRole('button', { name: /add to (cart|basket)/i }).click();
    await expect(this.page.getByText(/has been added to your (cart|basket)/i)).toBeVisible();
  }

  public async openCart(name: string): Promise<void> {
    await this.page.goto('/cart/', { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('link', { name, exact: true }).first()).toBeVisible();
    await expect(
      this.page.locator('input.qty, input.wc-block-components-quantity-selector__input').first(),
    ).toHaveValue('1');
  }

  public async proceedToCheckout(): Promise<void> {
    await this.page.getByRole('link', { name: /proceed to checkout/i }).click();
    await expect(this.page.getByRole('heading', { name: /checkout/i })).toBeVisible();
  }

  public async completeSyntheticBillingDetails(): Promise<void> {
    const fields: Record<string, string> = {
      '#billing_first_name': 'Ada',
      '#billing_last_name': 'Lovelace',
      '#billing_company': 'Analytical Engines Ltd',
      '#billing_address_1': '123 Test Street',
      '#billing_city': 'London',
      '#billing_postcode': 'SW1A 1AA',
      '#billing_phone': '+44 20 7946 0958',
      '#billing_email': 'ada.lovelace@example.com',
    };
    for (const [selector, value] of Object.entries(fields)) {
      await this.page.locator(selector).fill(value);
    }
  }

  public async expectOrderReview(productName: string): Promise<void> {
    await expect(this.page.locator('#order_review')).toBeVisible();
    await expect(this.page.getByText(productName).first()).toBeVisible();
    await expect(this.page.getByRole('button', { name: /place order/i })).toBeEnabled();
  }
}
