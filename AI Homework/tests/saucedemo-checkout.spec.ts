import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

const productName = 'Sauce Labs Backpack';

test('Full checkout flow from login to logout on Sauce Demo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  console.info('Navigate to Sauce Demo login page');
  await loginPage.goto();

  console.info('Login with standard_user');
  await loginPage.login('standard_user', 'secret_sauce');

  console.info('Verify successful login and Products page');
  await inventoryPage.expectLoaded();

  console.info('Add first product to the cart');
  await inventoryPage.addFirstProductToCart();
  await inventoryPage.expectCartBadgeCount('1');

  console.info('Navigate to cart and verify selected product');
  await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await cartPage.expectItemInCart(productName);

  console.info('Proceed to checkout');
  await cartPage.checkout();
  await checkoutStepOnePage.expectLoaded();

  console.info('Fill checkout information and continue');
  await checkoutStepOnePage.fillCustomerInformation('Test', 'User', '12345');
  await checkoutStepOnePage.continue();

  console.info('Verify checkout overview details');
  await checkoutOverviewPage.expectLoaded();
  await checkoutOverviewPage.expectPaymentInformationExists();
  await checkoutOverviewPage.expectShippingInformationExists();
  await checkoutOverviewPage.expectPriceTotalExists();

  console.info('Finish the order');
  await checkoutOverviewPage.finish();

  console.info('Verify order completion page');
  await checkoutCompletePage.expectLoaded();
  await checkoutCompletePage.expectSuccessMessages();

  console.info('Return to home page and verify Products page');
  await checkoutCompletePage.backHome();
  await inventoryPage.expectLoaded();

  console.info('Sign out from the application');
  await inventoryPage.openMenu();
  await inventoryPage.logout();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});