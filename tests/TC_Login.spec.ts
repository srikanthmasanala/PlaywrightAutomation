import test, { expect } from "@fixtures/basePage";
import * as data from "@testdata/logindata.json";

test.describe("Login Scenarios", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
  });
  test("Test with valid user", async ({ loginPage, homePage }) => {
    await loginPage.loginToApplication(data.username, data.password);
    const loginErroElement = await (
      await loginPage.getLoginErrorElement()
    ).isVisible();
    expect(loginErroElement).toBe(false);
    await homePage.navigatedToHomePage();
  });

  test("Test with Invalid user", async ({ loginPage, homePage }) => {
    await loginPage.loginToApplication(
      data.invalidUsername,
      data.invalidPassword
    );
    const loginErroElement = await (
      await loginPage.getLoginErrorElement()
    ).isVisible();
    expect(loginErroElement).toBe(true);

    const errorMessage = await loginPage.getLoginErrroMessage();
    console.log(errorMessage);
    await homePage.navigatedToHomePage();
  });


  test("Test with locked credentials", async ({ loginPage, homePage }) => {
    await loginPage.loginToApplication(
      data.locakedusername,
      data.lockedpassword
    );
    const loginErroElement = await (
      await loginPage.getLoginErrorElement()
    ).isVisible();
    expect(loginErroElement).toBe(true);

    const errorElement = await loginPage.getLoginErrorElement();
    expect(errorElement).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
});
