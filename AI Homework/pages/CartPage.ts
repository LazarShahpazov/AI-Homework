import { expect, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly pageTitle = '.title';
  readonly cartItemName = '.cart_item .inventory_item_name';
  readonly checkoutButton = '[data-test="checkout"]';

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart.html/);
    await expect(this.page.locator(this.pageTitle)).toHaveText('Your Cart');
  }

  async expectItemInCart(productName: string) {
    const item = this.page.locator(this.cartItemName, { hasText: productName });
    await expect(item).toBeVisible();
  }

  async checkout() {
    await this.page.click(this.checkoutButton);
  }
}