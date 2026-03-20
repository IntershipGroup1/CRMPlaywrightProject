import { test, expect } from '../../base/ui/baseTest';
import { testData } from '../../Data/testData';
import { logger } from '../../util/logger';
import 'dotenv/config';

    test("Login with valid credentials", async ({ loginPage }) => {
        logger.info("Starting login test with valid credentials");
        const username = process.env.USERNAME!;
        const password = process.env.PASSWORD!;
        await loginPage.navigateTo(testData.url);
        await loginPage.login(username, password);
        await loginPage.verifyCampaignsText(testData.campaignPageLabel);
        await loginPage.takeScreenshot('login-successful');
        logger.info("Login test with valid credentials completed successfully");
    });

    test("Login with invalid credentials", async ({ loginPage,page }) => {
       logger.info("Starting login test with invalid credentials");
        await loginPage.navigateTo(testData.url);      
        await loginPage.login(testData.invalidUsername, testData.invalidPassword);
        await loginPage.takeScreenshot('login-failed'); 
        logger.info("Login test with invalid credentials completed successfully");
    
    });

     

 

