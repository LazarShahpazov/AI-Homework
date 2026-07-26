import { expect, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly pageTitle = '.title';
  readonly completeHeader = '.complete-header';
  readonly completeText = '.complete-text';
  readonly backHomeButton = '[data-test="back-to-products"]';

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/checkout-complete.html/);
    await expect(this.page.locator(this.pageTitle)).toHaveText('Checkout: Complete!');
  }

  async expectSuccessMessages() {
    await expect(this.page.locator(this.completeHeader)).toHaveText('Thank you for your order!');
    await expect(this.page.locator(this.completeText)).toContainText('Your order has been dispatched');
  }

  async backHome() {
    await this.page.click(this.backHomeButton);
  }
}