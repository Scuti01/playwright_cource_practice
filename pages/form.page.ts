import { Page, expect } from "@playwright/test";

export default class FormPage {

    constructor(public page: Page) {}

    orderIdField: string = '#oar-order-id';
    lastNameField: string = '#oar-billing-lastname';
    findOrderByField:string = '#quick-search-type-id';
    emailField: string =  '#oar_email';
    continueBtn: string = '[title="Continue"] span';
    errorMessageLocator:string = '[role="alert"] div div';

    async fillOrderIdField(id: string){
        await this.page.locator(this.orderIdField).type(id);
    }

    async fillBillingLastNameField(lastName: string){
        await this.page.locator(this.lastNameField).type(lastName);
    }

    async selectOptionInFindOrderByField(option: string){
        await this.page.locator(this.findOrderByField).selectOption(option);
    }

    async fillEmailField(email: string){
        await this.page.locator(this.emailField).type(email);
    }

    async clickContinueBtn(){
        await this.page.click(this.continueBtn);
    }

    async verifyErrorMessageOnInvalidOrder(errorMessage:string) {
        await this.page.waitForSelector(this.errorMessageLocator);
        expect(await this.page.locator(this.errorMessageLocator).innerText()).toMatch(errorMessage);
    }
}
