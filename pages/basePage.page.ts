import { Page, expect } from "@playwright/test";

export default class BasePage {

    constructor(public page: Page) {}

    pageTitleLocator: string = ".page-title";
    errorMessageLocator: string = "[role='alert'] div[data-ui-id]";
    searchInputField: string = "#search";
    searchResultsForLabelLocator: string = "[data-ui-id='page-title-wrapper']";
    sorterLocator: string = "#sorter";
    sortingDirectionLocator: string = "a[data-role='direction-switcher']";
    productItemsLocator: string = ".product-item";
    productNamesLocator: string = ".product-item-name";
    productPricesLocator: string = ".product-item .price";

    async verifyPageTitleText(text: string) {
        await this.page.waitForSelector(this.pageTitleLocator);
        expect(await this.page.locator(this.pageTitleLocator).innerText()).toMatch(text);
    }

    async verifyErrorMessageIsDisplayed(errorMessage: string) {
        await this.page.waitForSelector(this.errorMessageLocator);
        expect(await this.page.locator(this.errorMessageLocator).innerText()).toMatch(errorMessage);
    }

    async searchForText(text: string) {
        await this.page.waitForSelector(this.searchInputField);
        await this.page.locator(this.searchInputField).type(text);
        await this.page.keyboard.press("Enter");
    }

    async verifySearchResultsForLabel(expectedItem: string) {
        await this.page.waitForSelector(this.searchResultsForLabelLocator);
        expect(await this.page.locator(this.searchResultsForLabelLocator).innerText()).toMatch(`Search results for: '${expectedItem}'`);
    }

    async sortByValue(value: string) {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForSelector(this.sorterLocator);
        await this.page.locator(this.sorterLocator).first().selectOption(value);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickFirstProductItem() {
        await this.page.locator(this.productItemsLocator).first().scrollIntoViewIfNeeded();
        await this.page.locator(this.productItemsLocator).first().click();
    }

    async setSortingDirection(direction: string) {
        await this.page.waitForSelector(this.sortingDirectionLocator);
        const actualDirection = await this.page.locator(this.sortingDirectionLocator).first().getAttribute("data-value");
        if (direction !== actualDirection) {
            await this.page.locator(this.sortingDirectionLocator).first().click();
        }
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyProductsAreSortedByPriceAscending(condition = true) {
        const actualPrices = await this.page.locator(this.productPricesLocator).allTextContents();

        let expectedPrices = actualPrices.slice();
        expectedPrices = condition 
            ? expectedPrices.sort((a, b) => (a > b ? 1 : -1)) 
            : expectedPrices.sort((a, b) => (a > b ? -1 : 1));
        
        for (let i = 0; i < actualPrices.length; i++) {
            expect(actualPrices[i]).toEqual(expectedPrices[i]);
        }
    }

    async verifyProductsAreSortedByProductNameAscending(condition = true) {
        let actualNames = await this.page.locator(this.productNamesLocator).allTextContents();
        actualNames = actualNames.map((el: string) => el.replace(/^\s+|\s+$/g, ''))
            .filter((el: string) => el != "");

        let expectedNames = actualNames.slice();
        expectedNames = condition 
            ? expectedNames.sort()
            : expectedNames.sort().reverse();
            
        for (let i = 0; i < actualNames.length; i++) {
            expect(actualNames[i]).toEqual(expectedNames[i]);
        }
    }
}
