import { expect, Page } from '@playwright/test';

export class OrderCompletePage {
  readonly page: Page;
  readonly completeHeader = '.complete-header';
  readonly completeText = '.complete-text';
  readonly backHomeButton = '#back-to-products';

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/checkout-complete.html/);
    await expect(this.page.locator(this.completeHeader)).toBeVisible();
    await expect(this.page.locator(this.completeText)).toBeVisible();
  }

  async expectSuccessMessages() {
    await expect(this.page.locator(this.completeHeader)).toHaveText('THANK YOU FOR YOUR ORDER');
    await expect(this.page.locator(this.completeText)).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  }

  async returnToProducts() {
    await this.page.click(this.backHomeButton);
  }
}