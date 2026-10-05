import { Page, Locator } from '@playwright/test';
import { Header } from './Header';

export class InventoryPage {
  readonly page: Page;
  readonly header: Header;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.title = page.getByTestId('title');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async addToCart(...products: string[]) {
    for (const product of products) {
      await this.page.getByTestId(`add-to-cart-${product}`).click();
    }
  }
}
