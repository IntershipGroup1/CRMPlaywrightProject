/**
 * ------------------------------------------------------------
 * File Name   : UserProfilePage.ts
 * Description : Handles user profile actions
 * Author      : Gowri
 * Created On  : 02-Apr-2026
 * ------------------------------------------------------------
 */

import { Locator, Page } from '@playwright/test'
import { BasePage } from '../../base/ui/basePage'
import { logger } from '../../util/logger'

export class UserProfilePage extends BasePage {

    private readonly userProfile: Locator
    private readonly currentUser: Locator
    private readonly adminUser: Locator
    private readonly logoutMenu: Locator

    constructor(page: Page) {
        super(page)
        this.userProfile = page.locator('.user-icon')
        this.currentUser = page.locator('#profile-name')
        this.adminUser = page.locator('#admin-user')
        this.logoutMenu = page.locator('.logout')
    }

    async logout() {
        try {
            logger.info('Logging out user')
            await this.click(this.userProfile, 'User Profile Icon')
            await this.click(this.logoutMenu, 'Logout Button')
            logger.info('User logged out successfully')
        } catch (error) {
            logger.error(`Failed to logout user - ${error}`)
            //await this.page.screenshot({ path: `screenshots/logout-error-${Date.now()}.png` })
            await this.takeScreenshot('logout')
            throw error
        }
    }

}