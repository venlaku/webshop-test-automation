import { test, expect } from '../fixtures/pages';
import { CHECKOUT_INFO } from '../test-data/users';
import { PRODUCTS } from '../test-data/products';


test.describe('Checkout', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login();
  });

  test('user can complete a purchase', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.header.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInfo();
    await checkoutPage.finish();

    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutPage.header.cartBadge).toBeHidden();
  });

  test('order totals are calculated correctly', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack, PRODUCTS.bikeLight);
    await inventoryPage.header.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInfo();

    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(checkoutPage.itemPrices).toHaveCount(2);

    const itemSum = await checkoutPage.getItemPriceSum();
    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    expect(subtotal).toBeCloseTo(itemSum, 2);
    expect(total).toBeCloseTo(subtotal + tax, 2);
  });

  test('checkout requires all fields', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.header.openCart();
    await cartPage.checkout();

    await checkoutPage.continueButton.click();
    await expect(checkoutPage.error).toContainText('First Name is required');

    await checkoutPage.fillInfo(CHECKOUT_INFO.firstName, '', CHECKOUT_INFO.postalCode);
    await expect(checkoutPage.error).toContainText('Last Name is required');

    await checkoutPage.fillInfo(CHECKOUT_INFO.firstName, CHECKOUT_INFO.lastName, '');
    await expect(checkoutPage.error).toContainText('Postal Code is required');
    await expect(page).toHaveURL(/checkout-step-one/);
  });
});