import { expect, Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly pageTitle = '.title';
  readonly paymentInfoLabel = '[data-test="payment-info-label"]';
  readonly shippingInfoLabel = '[data-test="shipping-info-label"]';
  readonly priceTotalLabel = '[data-test="total-info-label"]';
  readonly itemTotalLabel = '.summary_subtotal_label';
  readonly taxLabel = '.summary_tax_label';
  readonly totalLabel = '.summary_total_label';
  readonly finishButton = '[data-test="finish"]';

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
    await expect(this.page.locator(this.pageTitle)).toHaveText('Checkout: Overview');
  }

  async expectPaymentInformationExists() {
    await expect(this.page.locator(this.paymentInfoLabel)).toBeVisible();
    await expect(this.page.locator(this.paymentInfoLabel)).toHaveText('Payment Information:');
  }

  async expectShippingInformationExists() {
    await expect(this.page.locator(this.shippingInfoLabel)).toBeVisible();
    await expect(this.page.locator(this.shippingInfoLabel)).toHaveText('Shipping Information:');
  }

  async expectPriceTotalExists() {
    await expect(this.page.locator(this.priceTotalLabel)).toHaveText('Price Total');
    await expect(this.page.locator(this.itemTotalLabel)).toBeVisible();
    await expect(this.page.locator(this.taxLabel)).toBeVisible();
    await expect(this.page.locator(this.totalLabel)).toBeVisible();
  }

  async finish() {
    await this.page.click(this.finishButton);
  }
}