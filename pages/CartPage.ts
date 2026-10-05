import { Page, Locator } from '@playwright/test';
import { Header } from './Header';

export class CartPage {
  readonly page: Page;
  readonly header: Header;
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.items = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async removeItem(product: string) {
    await this.page.getByTestId(`remove-${product}`).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
