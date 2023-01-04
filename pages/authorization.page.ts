import { Page } from "@playwright/test";

export default class AuthorizationPage {

    constructor(public page: Page) {}

    createAccountLocator = '.panel [href$="create/"]';
    pageTitleLocator = '.page-title';
    firstNameInputField= '#firstname';
    lastNameInputField= '#lastname';
    emailInputField= '#email_address';
    passwordInputField= '#password';
    passwordConfirmInputField= '#password-confirmation';
    createAccountBtn = '//button/span[text()="Create an Account"]';
    welcomeUserText = '.header ul:first-of-type .logged-in';
    logOutMenu = '.panel .customer-welcome';
    logOutBtn = `${this.logOutMenu} .authorization-link`;

    async clickCreateAccountLink(){
        await this.page.click(this.createAccountLocator);
    }

    async clickCreateAccountBtn(){
        await this.page.click(this.createAccountBtn);
    }

    async clickLogOutBtn(){
        await this.page.click(this.logOutMenu);
        await this.page.click(this.logOutBtn);
    }

    async getPageTitleText(){
        const locator = await this.page.locator(this.pageTitleLocator);
        return await locator.innerText();
    }

    async getWelcomeUserText(){
        const locator = await this.page.locator(this.welcomeUserText);
        return await locator.innerText();
    }

    async fillFirstNameInputField(firstName:string){
        await this.page.locator(this.firstNameInputField).type(firstName);
    }

    async fillLastNameInputField(lastName:string){
        await this.page.locator(this.lastNameInputField).type(lastName);
    }

    async fillEmailInputField(email:string){
        await this.page.locator(this.emailInputField).type(email);
    }

    async fillPasswordInputField(password:string){
        await this.page.locator(this.passwordInputField).type(password);
    }

    async fillPasswordConfirmInputField(password:string){
        await this.page.locator(this.passwordConfirmInputField).type(password);
    }

    async setRandomMail(email:string, length:number){
        let randomNumber = '';
        const numbers = '01234566789';
        const emailList = email.split('@');
        for (let i = 0; i < length; i++) {
            randomNumber += numbers[Math.floor(Math.random() * numbers.length)];
        }
        return emailList.join(`${randomNumber}@`);
    }


}