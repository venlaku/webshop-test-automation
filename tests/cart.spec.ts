// tests/cart.spec.ts
import { test, expect } from '../fixtures/pages';
import { PRODUCTS } from '../test-data/products';

test.describe('Cart', () => {
  test('items can be added and removed', async ({ page, loginPage, inventoryPage, cartPage }) => {
    await loginPage.login();
    await inventoryPage.addToCart(PRODUCTS.backpack, PRODUCTS.boltTShirt, PRODUCTS.onesie);
    await expect(inventoryPage.header.cartBadge).toHaveText('3');

    await inventoryPage.header.openCart();
    await expect(cartPage.items).toHaveCount(3);

    await cartPage.removeItem(PRODUCTS.boltTShirt);
    await expect(cartPage.items).toHaveCount(2);
    await expect(cartPage.header.cartBadge).toHaveText('2');

    await page.reload();
    await expect(cartPage.items).toHaveCount(2);
  });
});
