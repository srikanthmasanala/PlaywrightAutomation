import { expect, Locator, Page } from "@playwright/test";
import { UserActions } from "../../libs/UserActions";

let useractions: UserActions;
export class CheckoutPage {
  readonly page: Page;
  private btnMenu: string = "button#react-burger-menu-btn";
  private lnkLogout: string = "a >> text=Logout";
  private lstProductNames = ".inventory_list > div div.inventory_item_name";
  private btnProductAddtoCart =
    "//div[text()='Sauce Labs Backpack']/../../../div[@class='pricebar']//button";
  private btnShoppingCart = ".shopping_cart_badge";
  private lblProductList = ".pricebar > .inventory_item_price";

  constructor(page: Page) {
    this.page = page;
    useractions = new UserActions(this.page);
  }

  async clickMenu(): Promise<void> {
    await useractions.clickElement(this.btnMenu);
  }

  /**
   * Method used to click Logout button
   */
  async clickLogout(): Promise<void> {
    await useractions.clickElement(this.lnkLogout);
  }

  /**
   * Method to product list
   */
  async getProductList(): Promise<void> {
    await this.page.locator(this.lstProductNames);
  }

  /**
   * Method will add the given product by Name
   * @param product - Product Name that needs to added in the cart
   */

  async addProductToCart(product: string): Promise<void> {
    await useractions.clickElement(
      `//div[text()='${product}']/../../../div[@class='pricebar']//button`
    );
  }

  /**
   * Method will add the given product by Price
   * @param val Price of the product thats needs to added
   */
  async addProductToCartByPrice(val: string) {
    console.log(val);
    await this.page
      .locator(".inventory_item_price:has-text('" + val + "')+button")
      .click();
  }

  /**
   *  Method used to navigate to shopping cart page
   */
  async navigateToAShoppingCartPage() {
    await useractions.clickElement(this.btnShoppingCart);
  }

  /**
   *
   * @returns
   */
  async getMaxProdcutPriceList(): Promise<string> {
    let priceList: string[] = await this.page
      .locator(this.lblProductList)
      .allInnerTexts();
    let maxprice = priceList
      .map(price => parseFloat(price.replace("$", "")))
      .reduce((prev, curr, ind, arr) => Math.max(...arr));
    return maxprice.toString();
  }
}
