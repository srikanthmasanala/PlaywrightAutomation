import { expect, Locator, Page } from "@playwright/test";
import { UserActions } from "../../libs/UserActions";

let useractions: UserActions;
export class CartPage {
  readonly page: Page;
  private removebtn: string = ".cart_button";
  private checkoutbtn: string = "button#checkout";
  private continueshoppingbtn: string = "button#checkout";
  private cartItemsList = ".cart_item";
  private priceList = ".item_pricebar";

  constructor(page: Page) {
    this.page = page;
    useractions = new UserActions(this.page);
  }

  async clickCheckout(): Promise<void> {
    useractions.clickElement(this.checkoutbtn);
  }

  async clickRemoveItem(): Promise<void> {
    useractions.clickElement(this.removebtn);
  }

  async clickContinueShopping(): Promise<void> {
    useractions.clickElement(this.continueshoppingbtn);
  }

  async removeCartItem(cartItem) {
    for (const item of cartItem) {
      await useractions.clickElement(`//div[text()='${item}']/../..//button`);
    }
  }

  async getCartItems() {
    return await this.page.locator(this.cartItemsList);
  }

  async getTotalPriceOfItems() {
    let totalPrice;
    return await this.page.locator(this.priceList).evaluateAll(plist => {
      const tempPriceList = plist.map(ele =>
        parseFloat(ele.textContent.replace("$", ""))
      );
      totalPrice = tempPriceList.reduce((acc, curr) => {
        return acc + curr;
      });

      return totalPrice;
    });
  }
  async getCartItemsDetails() {
    const allItems = await this.page.locator(this.cartItemsList);

    return allItems.evaluateAll(list => {
      return list.map(item => {
        const name = item.querySelector(".inventory_item_name");
        const price = item.querySelector(".inventory_item_price");
        const desc = item.querySelector(".inventory_item_desc");
        const toText = element => element && element.innerText.trim();

        return {
          item: toText(name),
          desc: toText(desc),
          price: toText(price)
        };
      });
    });
  }
  async removeAllCartItem() {}
}
