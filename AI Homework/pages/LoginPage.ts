import { expect, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = '#user-name';
  readonly passwordInput = '#password';
  readonly loginButton = '#login-button';
  readonly errorMessage = '[data-test=error]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
    await expect(this.page).toHaveURL('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }

  async expectErrorMessage(expected: string) {
    await expect(this.page.locator(this.errorMessage)).toBeVisible({ timeout: 5000 });
    await expect(this.page.locator(this.errorMessage)).toHaveText(expected);
  }
}