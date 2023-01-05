import { test, expect } from '../fixture/fixture';
import * as data from '../test-data/test-data.json';

test.describe('Basic tests for mageto web site', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Verify user can create an account and then log out', async ({ page, authorizationPage }) => {
    const email = await authorizationPage.setRandomMail(data.fakeEmail, 3);
    await authorizationPage.clickCreateAccountLink();
    expect(await authorizationPage.getPageTitleText()).toMatch('Create New Customer');
    await authorizationPage.fillFirstNameInputField(data.firstName);
    await authorizationPage.fillLastNameInputField(data.lastName);
    await authorizationPage.fillEmailInputField(email);
    await authorizationPage.fillPasswordInputField(data.password);
    await authorizationPage.fillPasswordConfirmInputField(data.password);
    await authorizationPage.clickCreateAccountBtn();
    await page.waitForSelector(authorizationPage.welcomeUserText);
    expect(await authorizationPage.getWelcomeUserText()).toMatch('Welcome, TestName TestLast!');
    await authorizationPage.clickLogOutBtn();
    expect(await authorizationPage.getPageTitleText()).toMatch('You are signed out');
  });

  test('Verify banners & content are displayed on the main page', async ({ page, mainPage }) => {
    await page.waitForLoadState('domcontentloaded');
    expect(await mainPage.verifyBannersVisible()).toBe(true);
    expect(await mainPage.verifyLogoVisible()).toBe(true);
  });

  test('Verify product is added to the cart with right size and color', async ({ page, mainPage, authorizationPage, productPage, cartPage }) => {
      const productDetails: string[] = [data.productItemSize, data.productItemColor];
      await page.goto('/promotions/pants-all.html');
      await productPage.selectProductItem(data.productItem);
      await productPage.verifyMoreInformationVisible();
      await productPage.verifyReviewsVisible();
      await productPage.selectProductItemColor(data.productItemColor);
      await productPage.selectProductItemSize(data.productItemSize);
      await productPage.clickAddToCartBtn();
      await page.waitForSelector(productPage.addedProductToCartAlert);
      await cartPage.openCartPage();
      expect(await cartPage.getProductItemSizeColor()).toEqual(productDetails);
  });
});
