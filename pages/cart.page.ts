import { Page, expect } from "@playwright/test";

export default class CartPage {

    constructor(public page: Page) {}

    cartIconLocator = '.showcart';
    openCartLink = '//span[normalize-space()="View and Edit Cart"]';
    productItemSizeColor = '(//dt[contains(text(),"Size")])[2]/following-sibling::dd';

    async openCartPage() {
        await this.page.click(this.cartIconLocator);
        await this.page.click(this.openCartLink);
        await this.page.waitForLoadState();
    }

    async getProductItemSizeColor() {
        await this.page.waitForSelector(this.productItemSizeColor);
        return await this.page.locator(this.productItemSizeColor).allInnerTexts();
    }

}