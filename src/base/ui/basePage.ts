import { Page, expect, Locator } from "@playwright/test";
import path from 'path';
import { logger } from '../../util/logger'

export class BasePage {
  constructor(protected page: Page) {
    //this.page = page;
  }

  /*async navigateTo(url:string){
      await this.page.goto(url);  
  }*/
  async navigateTo() {
    await this.page.goto('/');
  }

  async verifyUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async selectDropdownByValue(locator: Locator, value: string) {
    await locator.selectOption(value);
  }

  async verifyDropdownValue(locator: Locator, expectedValue: string) {
    await expect(locator).toHaveValue(expectedValue);
  }

  async openPopup(clickLocator: any): Promise<Page> {
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'), clickLocator.click(),
    ]);
    await popup.waitForLoadState();
    return popup;
  }

  /*async clickAndWaitForPopupToClose(popup: Page, locator: any) {
    await Promise.all([
      locator.click(),popup.waitForEvent('close'),  
    ]);
  }*/
  async clickAndWaitForPopupToClose(popup: Page, locator: Locator) {
    const closePromise = popup.waitForEvent('close').catch(() => { null }); // Handle the case where the popup might already be closed
    try {
      await locator.click();
    } catch (error) {
      console.log('Error clicking the locator:', error);
    }
    await closePromise;
  }

  async takeScreenshot(name: string) {
    const filePath = path.join('Screenshots', `${name}-${Date.now()}.png`);

    await this.page.screenshot({
      path: filePath,
      fullPage: true,
    });
  }

  /**
   * @author Gowri
   * @param element - click locator
   * @param name - element name for logging
   */
  async click(element: Locator, name?: string) {
    try {
      logger.info(`Clicking on element: ${name ?? element}`)
      await element.click()
    } catch (error) {
      logger.error(`Failed to click on element: ${name ?? element} - ${error}`)
      await this.page.screenshot({ path: `screenshots/click-error-${Date.now()}.png` })
      throw error
    }
  }

  async getText(element: Locator, name?: string) {
    try {
      logger.info(`Getting text from element: ${name ?? element}`)
      return await element.textContent()
    } catch (error) {
      logger.error(`Failed to get text from element: ${name ?? element} - ${error}`)
      await this.page.screenshot({ path: `screenshots/text-error-${Date.now()}.png` })
      throw error
    }
  }
}
