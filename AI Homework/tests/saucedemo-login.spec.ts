import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

type UserScenario = {
  username: string;
  password: string;
  expectedSuccess: boolean;
  expectedMessage: string;
  description: string;
};

const userScenarios: UserScenario[] = [
  {
    username: 'standard_user',
    password: 'secret_sauce',
    expectedSuccess: true,
    expectedMessage: 'Products',
    description: 'Standard user should log in successfully',
  },
  {
    username: 'problem_user',
    password: 'secret_sauce',
    expectedSuccess: true,
    expectedMessage: 'Products',
    description: 'Problem user should log in successfully',
  },
  {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    expectedSuccess: true,
    expectedMessage: 'Products',
    description: 'Performance glitch user should log in successfully',
  },
  {
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedSuccess: false,
    expectedMessage: 'Epic sadface: Sorry, this user has been locked out.',
    description: 'Locked out user should see a lockout error message',
  },
  {
    username: 'invalid_user',
    password: 'wrong_password',
    expectedSuccess: false,
    expectedMessage: 'Epic sadface: Username and password do not match any user in this service',
    description: 'Invalid user should see a generic authentication error',
  },
];

for (const scenario of userScenarios) {
  test.describe(`SauceDemo login: ${scenario.username}`, () => {
    test(`${scenario.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      console.info(`Starting scenario: ${scenario.username}`);
      await loginPage.goto();
      await loginPage.login(scenario.username, scenario.password);

      if (scenario.expectedSuccess) {
        await inventoryPage.expectLoaded();
        const currentUrl = page.url();
        console.info(`Login successful for ${scenario.username}, landed on ${currentUrl}`);
        await expect(currentUrl).toContain('inventory.html');
      } else {
        await loginPage.expectErrorMessage(scenario.expectedMessage);
        const errorText = await loginPage.getErrorMessage();
        console.info(`Login failed for ${scenario.username} with message: ${errorText}`);
        await expect(errorText).toBe(scenario.expectedMessage);
      }
    });
  });
}