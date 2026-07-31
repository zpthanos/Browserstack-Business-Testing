import { expect, type Page, type Response } from '@playwright/test';

export class HomePage {
  public constructor(private readonly page: Page) {}

  public async open(): Promise<Response | null> {
    return this.page.goto('/');
  }

  public async expectVisibleDocument(): Promise<void> {
    await expect(this.page.locator('body')).toBeVisible();
  }

  public async title(): Promise<string> {
    return this.page.title();
  }
}
