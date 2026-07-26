import { expect, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle = '.title';
  readonly inventoryContainer = '.inventory_list';
  readonly firstProductAddButton = '.inventory_item button';
  readonly cartBadge = '.shopping_cart_badge';
  readonly cartLink = '.shopping_cart_link';
  readonly burgerMenuButton = '#react-burger-menu-btn';
  readonly logoutLink = '#logout_sidebar_link';

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.page.locator(this.pageTitle)).toHaveText('Products');
    await expect(this.page.locator(this.inventoryContainer)).toBeVisible();
  }

  async addFirstProductToCart() {
    await this.page.click(this.firstProductAddButton);
  }

  async expectCartBadgeCount(expectedCount: string) {
    await expect(this.page.locator(this.cartBadge)).toHaveText(expectedCount);
  }

  async openCart() {
    await this.page.click(this.cartLink);
  }

  async openMenu() {
    await this.page.click(this.burgerMenuButton);
    await expect(this.page.locator(this.logoutLink)).toBeVisible();
  }

  async logout() {
    await this.page.click(this.logoutLink);
  }
}