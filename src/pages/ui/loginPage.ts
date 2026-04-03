import { Page, expect } from '@playwright/test';
import { BasePage } from "../../base/ui/basePage";
import { logger } from '../../util/logger';


export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    emailInput = this.page.locator("#username");
    passwordInput = this.page.locator("#inputPassword");
    loginButton = this.page.getByRole("button", { name: "Sign In" });
    loginHeader = this.page.getByRole('heading', { name: 'Sign In' })

    async login(username: string, password: string) {

        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async verifyCampaignsText(campaignPageLabel: string) {
        await expect(this.page.locator('b', { hasText: campaignPageLabel })).toBeVisible();
    }

    //Gowri
    async getLoginHeader() {
        logger.info(`Getting login page header`)
        return await this.getText(this.loginHeader, 'Login Page Header')
    }

}


