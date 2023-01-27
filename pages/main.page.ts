import { Page, expect } from "@playwright/test";

export default class MainPage {

    constructor(public page: Page) {}

    bannersLocator: string = '.blocks-promo';
    logoLocator: string = '.logo';

    async verifyBannersAreVisible(){
        await expect(this.page.locator(this.bannersLocator)).toBeVisible();
    }

    async verifyLogoIsVisible(){
        await expect(this.page.locator(this.logoLocator)).toBeVisible();
    }
}
