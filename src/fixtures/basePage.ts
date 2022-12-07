import {test as baseTest} from "@playwright/test";
import { LoginPage } from "src/pages/LoginPage";
import { HomePage } from "src/pages/HomePage";
import { CartPage } from "src/pages/CartPage";

type Fixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  cartPage: CartPage;
};
const test = baseTest.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  }
});

export default test;
export const expect=test.expect;
