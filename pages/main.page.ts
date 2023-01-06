import { Page, expect } from "@playwright/test";

export default class MainPage {

    constructor(public page: Page) {}

    bannersLocator: string = '.blocks-promo';
    logoLocator: string = '.logo';

    async verifyBannersAreVisible(){
        expect(await this.page.locator(this.bannersLocator).isVisible()).toBe(true);
    }

    async verifyLogoIsVisible(){
        expect(await this.page.locator(this.logoLocator).isVisible()).toBe(true);
    }

}
