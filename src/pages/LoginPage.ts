import { expect, Locator, Page } from "@playwright/test";
import { UserActions } from "../../libs/UserActions";

let useractions: UserActions;

export class LoginPage {
  readonly page: Page;
  private inputUserName: string = "input#user-name";
  private inputPassword: string = "input#password";
  private btnLogin: string = "input#login-button";
  private errormsg = ".error.error-message-container";

  constructor(page: Page) {
    this.page = page;
    useractions = new UserActions(this.page);
  }

  async enterUserName(usernameData: string): Promise<void> {
    const userName = this.page.locator(this.inputUserName);
    await userName.fill(usernameData);
  }

  async enterPassword(passwordData: string): Promise<void> {
    const userName = this.page.locator(this.inputPassword);
    await userName.fill(passwordData);
  }

  async clickLoginButton(): Promise<void> {
    const loginBtn = this.page.locator(this.btnLogin);
    await loginBtn.click();
  }

  async loginToApplication(
    usernameData: string,
    passwordData: string
  ): Promise<void> {
    await useractions.enterElementText(this.inputUserName, usernameData);
    await useractions.enterElementText(this.inputPassword, passwordData);
    await useractions.clickElement(this.btnLogin);
  }

  async getLoginErrorElement() {
    return await this.page.locator(this.errormsg);
  }

  async getLoginErrroMessage() {
    return await this.page.locator(this.errormsg).innerText();
  }
}
