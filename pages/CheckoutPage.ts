import { Page, Locator } from '@playwright/test';
import { Header } from './Header';
import { CHECKOUT_INFO } from '../test-data/users';
import { toNumber } from '../utils/helpers';

// Covers all three checkout steps: information form, overview and confirmation.
export class CheckoutPage {
  readonly page: Page;
  readonly header: Header;

  // Step one: customer information
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly error: Locator;

  // Step two: overview
  readonly itemPrices: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  // Confirmation
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);

    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.error = page.getByTestId('error');

    this.itemPrices = page.getByTestId('inventory-item-price');
    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');

    this.completeHeader = page.getByTestId('complete-header');
  }

  async fillInfo(
    first = CHECKOUT_INFO.firstName,
    last = CHECKOUT_INFO.lastName,
    zip = CHECKOUT_INFO.postalCode,
  ) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async getItemPriceSum() {
    const prices = await this.itemPrices.allTextContents();
    return prices.map(toNumber).reduce((a, b) => a + b, 0);
  }

  async getSubtotal() {
    return toNumber(await this.subtotalLabel.textContent());
  }

  async getTax() {
    return toNumber(await this.taxLabel.textContent());
  }

  async getTotal() {
    return toNumber(await this.totalLabel.textContent());
  }
}
