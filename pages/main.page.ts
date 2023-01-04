import { Page } from "@playwright/test";

export default class MainPage {

    constructor(public page: Page) {}

    bannersLocator = '.blocks-promo';
    logoLocator = '.logo';

    async checkBannersVisible(){
        return await this.page.locator(this.bannersLocator).isVisible();
    }

    async checkLogoVisible(){
        return await this.page.locator(this.logoLocator).isVisible();
    }

}