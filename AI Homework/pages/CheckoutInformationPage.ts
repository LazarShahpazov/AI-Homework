import { expect, Page } from '@playwright/test';

export class CheckoutInformationPage {
  readonly page: Page;
  readonly pageTitle = '.title';
  readonly firstNameInput = '#first-name';
  readonly lastNameInput = '#last-name';
  readonly postalCodeInput = '#postal-code';
  readonly continueButton = '#continue';

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
    await expect(this.page.locator(this.pageTitle)).toHaveText('Checkout: Your Information');
    await expect(this.page.locator(this.firstNameInput)).toBeVisible();
    await expect(this.page.locator(this.lastNameInput)).toBeVisible();
    await expect(this.page.locator(this.postalCodeInput)).toBeVisible();
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
  }

  async continueToOverview() {
    await this.page.click(this.continueButton);
  }
}