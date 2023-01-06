import {test as baseTest} from '@playwright/test';
import AuthorizationPage from '../pages/authorization.page';
import MainPage from '../pages/main.page';
import ProductPage from '../pages/product.page';
import CartPage from '../pages/cart.page';

type pages = {
    authorizationPage: AuthorizationPage,
    mainPage: MainPage,
    productPage: ProductPage,
    cartPage: CartPage,
}

const testPages = baseTest.extend<pages>({
    authorizationPage: async({page}, use) => {
        await use(new AuthorizationPage(page));
    },

    mainPage: async({page}, use) => {
        await use(new MainPage(page));
    },

    productPage: async({page}, use) => {
        await use(new ProductPage(page));
    },

    cartPage: async({page}, use) => {
        await use(new CartPage(page));
    },
})

export const test = testPages;
export const expect = testPages.expect;
