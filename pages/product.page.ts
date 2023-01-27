import { Page, expect } from "@playwright/test";

export default class ProductPage {

    constructor(public page: Page) {}

    moreInformationTab: string = '#tab-label-additional-title';
    moreInformationBlock: string = '#product-attribute-specs-table';
    reviewsTab: string = '#tab-label-reviews';
    reviewsBlock: string = '#reviews';
    addToCartBtn: string = '#product-addtocart-button';
    addedProductToCartAlert: string = '[role="alert"]';
    addToWishListBtn: string = "a[data-action='add-to-wishlist']";
    productPriceLocator: string = ".product-info-main .price";
    productNameLocator: string = ".product-info-main .base";
    productImagesLocator: string = ".fotorama__stage img";

    async getProductInformation(): Promise<{ productName: string | null, productPrice: string | null, productImg: string[]}> {
        const name = await this.page.locator(this.productNameLocator).textContent();
        const price = await this.page.locator(this.productPriceLocator).textContent();
        let imagesElements = this.page.locator(this.productImagesLocator).elementHandles;
        let images: string[] = [];
        for (let i = 0; i < imagesElements.length; i++) {
            images.push(imagesElements[i].getAttribute("src"));
        }
        return { productName: name, productPrice: price, productImg: images};
    }
    
    productItemLocator(name: string) { 
        return `//*[contains(@class, 'product-item-name') and contains(., '${name}')]`;
    };

    productItemColor(color: string) {
        return `[attribute-code="color"] [option-label="${color[0].toUpperCase() + color.slice(1)}"]`;
    };

    productItemSize(size: string) {
        return `[attribute-code="size"] [option-label="${size.toUpperCase()}"]`;
    };

    async selectProductItem(name: string) {
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

    async clickAddToWishListBtn() {
        await this.page.click(this.addToWishListBtn);
    }

    async verifyMoreInformationVisible() {
        await this.page.click(this.moreInformationTab);
        await this.page.waitForSelector(this.moreInformationBlock);
        await expect(this.page.locator(this.moreInformationBlock)).toBeVisible();
    }

    async verifyReviewsVisible() {
        await this.page.click(this.reviewsTab);
        await this.page.waitForSelector(this.reviewsBlock);
        await expect(this.page.locator(this.reviewsBlock)).toBeVisible();
    }

    async verifyProductName(productName: string) {
        expect(await this.page.locator(this.productNameLocator).innerText()).toMatch(productName);
    }

    async verifyProductPrice(productPrice: string) {
        expect(await this.page.locator(this.productPriceLocator).innerText()).toMatch(productPrice);
    }

    async verifyProductImages(productImg: string[]) {
        let imagesElements = this.page.locator(this.productImagesLocator).elementHandles;
        let images: string[] = [];
        for (let i = 0; i < imagesElements.length; i++) {
            images.push(imagesElements[i].getAttribute("src"));
        }

        for (let i = 0; i < images.length; i++) {
            expect(images[i]).toEqual(productImg[i]);
        }
    }
}
