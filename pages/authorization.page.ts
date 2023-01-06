import { Page, expect } from "@playwright/test";

export default class AuthorizationPage {

    constructor(public page: Page) {}

    // account elements
    createAccountLocator: string = '.panel [href$="create/"]';
    signInLocator: string = '.panel [href*="login"]';
    pageTitleLocator: string = '.page-title';
    logOutMenu: string = '.panel .customer-welcome';
    logOutBtn: string = `${this.logOutMenu} .authorization-link`;
    welcomeUserText: string = '.header ul:first-of-type .logged-in';

    // create account elements 
    firstNameInputField: string = '#firstname';
    lastNameInputField: string = '#lastname';
    emailInputField: string = '#email_address';
    passwordInputField: string = '#password';
    passwordConfirmInputField: string = '#password-confirmation';
    createAccountBtn: string = '//button/span[text()="Create an Account"]';
    
    // login elements
    signInEmailField: string = '#email';
    signInPasswordField: string = '#pass';
    signInBtn: string = '#send2';

    async clickCreateAccountLink(){
        await this.page.click(this.createAccountLocator);
    }

    async clickSignInLink(){
        await this.page.click(this.signInLocator);
    }

    async clickCreateAccountBtn(){
        await this.page.click(this.createAccountBtn);
    }

    async clickSignInBtn(){
        await this.page.click(this.signInBtn);
    }

    async clickLogOutBtn(){
        await this.page.click(this.logOutMenu);
        await this.page.click(this.logOutBtn);
    }

    async verifyPageTitleText(text: string){
        expect(await this.page.locator(this.pageTitleLocator).innerText()).toMatch(text);
    }

    async verifyWelcomeUserText(text: string){
        expect(await this.page.locator(this.welcomeUserText).innerText()).toMatch(text);
    }

    async fillFirstNameInputField(firstName: string){
        await this.page.locator(this.firstNameInputField).type(firstName);
    }

    async fillLastNameInputField(lastName: string){
        await this.page.locator(this.lastNameInputField).type(lastName);
    }

    async fillEmailInputField(email: string){
        await this.page.locator(this.emailInputField).type(email);
    }

    async fillSignInEmailField(email: string){
        await this.page.locator(this.signInEmailField).type(email);
    }

    async fillSignInPasswordField(password: string){
        await this.page.locator(this.signInPasswordField).type(password);
    }

    async fillPasswordInputField(password: string){
        await this.page.locator(this.passwordInputField).type(password);
    }

    async fillPasswordConfirmInputField(password: string){
        await this.page.locator(this.passwordConfirmInputField).type(password);
    }

    async setRandomMail(email: string, length: number){
        let randomNumber: string = '';
        const numbers: string = '01234566789';
        const emailList: string[] = email.split('@');
        for (let i = 0; i < length; i++) {
            randomNumber += numbers[Math.floor(Math.random() * numbers.length)];
        }
        return emailList.join(`${randomNumber}@`);
    }
}
