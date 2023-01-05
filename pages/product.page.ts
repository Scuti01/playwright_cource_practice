import { Page, expect } from "@playwright/test";

export default class ProductPage {

    constructor(public page: Page) {}

    productItemLocator(name:string) { return `img[alt='${name}']`};
    productItemColor(color:string) {return `[attribute-code="color"] [option-label="${color[0].toUpperCase() + color.slice(1)}"]`};
    productItemSize(size:string) {return `[attribute-code="size"] [option-label="${size.toUpperCase()}"]`};
    moreInformationTab = '#tab-label-additional-title';
    moreInformationBlock = '#product-attribute-specs-table';
    reviewsTab = '#tab-label-reviews';
    reviewsBlock = '#reviews';
    addToCartBtn = '#product-addtocart-button';
    addedProductToCartAlert = '[role="alert"]'; 

    async selectProductItem(name:string) {
        await this.page.click(this.productItemLocator(name));
    }

    async selectProductItemColor(color:string) {
        await this.page.click(this.productItemColor(color));
    }

    async selectProductItemSize(size:string) {
        await this.page.click(this.productItemSize(size));
    }

    async clickAddToCartBtn() {
        await this.page.click(this.addToCartBtn);
    }

    async verifyMoreInformationVisible() {
        await this.page.click(this.moreInformationTab);
        await this.page.waitForSelector(this.moreInformationBlock);
        expect(await this.page.locator(this.moreInformationBlock).isVisible()).toBe(true);
    }

    async verifyReviewsVisible() {
        await this.page.click(this.reviewsTab);
        await this.page.waitForSelector(this.reviewsBlock);
        expect(await this.page.locator(this.reviewsBlock).isVisible()).toBe(true);
    }

}