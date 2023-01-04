import {test as baseTest} from '@playwright/test';
import AuthorizationPage from '../pages/authorization.page';
import MainPage from '../pages/main.page';

type pages = {
    authorizationPage: AuthorizationPage,
    mainPage: MainPage,

}

const testPages = baseTest.extend<pages>({
    authorizationPage: async({page}, use) => {
        await use(new AuthorizationPage(page));
    },

    mainPage: async({page}, use) => {
        await use(new MainPage(page));
    }
})

export const test = testPages;
export const expect = testPages.expect;