import { Page } from "@playwright/test";

export default class MyAccountPage {

    constructor(public page: Page) {}

    changePasswordBtn: string = "a.change-password";

    async clickChangePasswordBtn() {
        await this.page.click(this.changePasswordBtn);
    }
}