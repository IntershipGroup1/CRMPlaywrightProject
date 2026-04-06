import { test, expect } from '../../base/ui/baseTest';
import { testData } from '../../Data/testData';
import { logger } from '../../util/logger';


test("Login with valid credentials", async ({ loginPage }) => {
    logger.info("Starting login test with valid credentials");
    const username = process.env.APP_USERNAME!;
    const password = process.env.APP_PASSWORD!;
    // console.log("username:", username);
    // console.log("password:", password);
    //await loginPage.navigateTo(testData.url);
    await loginPage.navigateTo();
    await loginPage.login(username, password);
    //await loginPage.login(testData.username, testData.password);
    await loginPage.verifyCampaignsText(testData.campaignPageLabel);
    await loginPage.takeScreenshot('login-successful');
    logger.info("Login test with valid credentials completed successfully");
});

test("Login with invalid credentials", async ({ loginPage, page }) => {
    logger.info("Starting login test with invalid credentials");
    //await loginPage.navigateTo(testData.url);   
    await loginPage.navigateTo();
    await loginPage.login(testData.invalidUsername, testData.invalidPassword);
    await loginPage.takeScreenshot('login-failed');
    logger.info("Login test with invalid credentials completed successfully");

});

/**
 * @author Gowri
 * Test to verify login and logout functionality for a valid user. It logs in with valid credentials, 
 * verifies the presence of the Campaigns page header, and then logs out. 
 */
test('Login with valid user and Logout', async ({ loginPage, campaignPage, userProfilePage }) => {
    logger.info('Logging in with valid user')

    const username = process.env.APP_USERNAME!;
    const password = process.env.APP_PASSWORD!;
    await loginPage.navigateTo();
    await loginPage.login(username, password);
    console.log(await campaignPage.getCampaignsHeader())
    expect(await campaignPage.getCampaignsHeader()).toBe('Campaigns')

    logger.info('Login successful with valid user')

    await userProfilePage.logout()
    expect(await loginPage.getLoginHeader()).toBe('Sign In')
    logger.info('Logout successful for valid user')

})





