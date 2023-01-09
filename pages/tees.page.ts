import { Page, expect } from "@playwright/test";

export default class ProductTeesPage {

    constructor(public page: Page) {}

    teesProductItemsImg: string = '.product-item img';
    teesReviewsBlock: string = '.product-reviews-summary';
    teesPriceBlock: string =  '.normal-price';
    teesAddToCardBtn: string =  '[title="Add to Cart"]';

    async verifyTeesDetailsOnMouseOverAreVisible() {
        await this.page.waitForLoadState();
        const teesItemsImg = await this.page.locator(this.teesProductItemsImg).all();
        const teesReviewsBlockItems = await this.page.locator(this.teesReviewsBlock).all();
        const teesPriceBlockItems = await this.page.locator(this.teesPriceBlock).all();
        const teesItemsAddToCartBtns = await this.page.locator(this.teesAddToCardBtn).all();
        for (let i = 0; i < teesItemsImg.length; i++) {
            await expect(teesItemsImg[i]).toBeVisible();
            await expect(teesPriceBlockItems[i]).toBeVisible();
            if (teesReviewsBlockItems[i] !== undefined){
                await expect(teesReviewsBlockItems[i]).toBeVisible();
            }
            await teesItemsImg[i].hover();
            await expect(teesItemsAddToCartBtns[i]).toBeVisible();  
        }   
    }
}
