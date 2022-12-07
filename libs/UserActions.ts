import { expect, Locator, Page } from "@playwright/test";

export class UserActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterElementText(locator: string, inputText: string): Promise<void> {
    const inputElement = this.page.locator(locator);
    await inputElement.fill(inputText);
  }

  async clickElement(locator: string): Promise<void> {
    const buttonElement = this.page.locator(locator);
    await buttonElement.click();
  }
}
