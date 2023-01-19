import { test } from '../fixture/fixture';
import * as data from '../test-data/test-data.json';

test.describe('Basic tests for mageto web site', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User should be able to create an account and then log out', async ({ page, authorizationPage }) => {
    const email = authorizationPage.setRandomMail(data.fakeEmail, 3);
    await authorizationPage.clickCreateAccountLink();
    await authorizationPage.verifyPageTitleText('Create New Customer');
    await authorizationPage.fillFirstNameInputField(data.firstName);
    await authorizationPage.fillLastNameInputField(data.lastName);
    await authorizationPage.fillEmailInputField(email);
    await authorizationPage.fillPasswordInputField(data.password);
    await authorizationPage.fillPasswordConfirmInputField(data.password);
    await authorizationPage.clickCreateAccountBtn();
    await page.waitForSelector(authorizationPage.welcomeUserText);
    await authorizationPage.verifyWelcomeUserText('Welcome, TestName TestLast!');
    await authorizationPage.clickLogOutBtn();
    await authorizationPage.verifyPageTitleText('You are signed out');
  });

  test('User should see banners & content on the main page', async ({ page, mainPage }) => {
    await page.waitForLoadState('domcontentloaded');
    await mainPage.verifyBannersAreVisible();
    await mainPage.verifyLogoIsVisible();
  });

  test('User should be able to add product to the cart with right size and color', async ({ page, productPage, cartPage }) => {
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
      await cartPage.verifyProductItemSizeColor(productDetails);
  });

  test('User should be able to see tees products image, price, reviews and "Add To Cart" button appears on mouse over', async ({ page, salePage, productTeesPage }) => {
    await page.goto('/sale.html');
    await salePage.clickSidebarTeesBtn();
    await productTeesPage.verifyTeesDetailsOnMouseOverAreVisible();
  });

  test('User should not be able to submit a form with non-existing order id and the rest valid data', async ({ page, formPage, authorizationPage }) => {
    await page.goto('/sales/guest/form/');
    await formPage.fillOrderIdField(authorizationPage.setRandomNumber(9));
    await formPage.fillBillingLastNameField(data.lastName);
    await formPage.selectOptionInFindOrderByField('email');
    await formPage.fillEmailField(data.email);
    await formPage.clickContinueBtn();
    await formPage.verifyErrorMessageOnInvalidOrder('You entered incorrect data. Please try again');
    await formPage.fillOrderIdField(data.orderId);
    await formPage.fillBillingLastNameField(data.lastName);
    await formPage.selectOptionInFindOrderByField('email');
    await formPage.fillEmailField(data.email);
    await formPage.clickContinueBtn();
    await page.waitForLoadState();
    await authorizationPage.verifyPageTitleText(`Order # ${data.orderId}`);
  });
});