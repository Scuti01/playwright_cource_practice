import { Page, expect } from "@playwright/test";

export default class SignInPage {

    constructor(public page: Page) {}

    emailInputField: string = "#email";
    passwordInputField: string = "input[name='login[password]']";
    signInButton: string = "button.login";

    async fillEmailInputField(email: string) {
        await this.page.waitForSelector(this.emailInputField);
        await this.page.locator(this.emailInputField).type(email);
    }

    async fillPasswordInputField(password: string) {
        await this.page.waitForSelector(this.passwordInputField);
        await this.page.locator(this.passwordInputField).type(password);
    }

    async clickSignInBtn(){
        await this.page.click(this.signInButton);
    }

}
