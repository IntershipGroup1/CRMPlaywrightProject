import { test, expect } from '../../base/ui/baseTest';
import { testData } from '../../Data/testData';
import { logger } from '../../util/logger';
import { log } from 'node:console';

    
test.describe("Home Page Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    logger.info("Starting login before each test");
    const username = process.env.USERNAME!;
   const password = process.env.PASSWORD!;
    await loginPage.navigateTo(testData.url); 
    await loginPage.login(username, password);  
  });  

  test("Navigate to Campaigns page", async ({ campaignPage }) => {
    logger.info("Starting navigation to Campaigns page test");
    await campaignPage.navigateToCampaigns();
    await campaignPage.verifyUrl(testData.verifyCampaignUrl);
    logger.info("Navigation to Campaigns page test completed successfully");
  });

  test("Click Create Campaign", async ({ campaignPage }) => {
    logger.info("Starting Create Campaign test");
    await campaignPage.clickCreateCampaign();
    await campaignPage.verifyUrl(testData.createCampaignUrl);
    await campaignPage.createCampaign();
    const name = await campaignPage.firstRowCampaignName().textContent();
    console.log("First row name:", name);
    await expect(campaignPage.firstRowCampaignName()).toBeVisible();
    logger.info("Create Campaign test completed successfully");
  });

  test("Select search type from dropdown", async ({ campaignPage }) => {
    logger.info("Starting select search type from dropdown test");
    await campaignPage.selectSearchType(testData.campaignSearchValue);  
    await campaignPage.verifySelectedSearchType(testData.campaignSearchexpectedValue);
    logger.info("Select search type from dropdown test completed successfully");
  });
 
  test("Search for a campaign by ID", async ({ campaignPage }) => {
    logger.info("Starting search for a campaign by ID test");
    await campaignPage.Inputsearch.fill(testData.campaignIdforSearch);
    const name = await campaignPage.firstRowCampaignName().textContent();
    console.log("First row name:", name);
    await expect(campaignPage.firstRowCampaignName()).toBeVisible();
    logger.info("Search for a campaign by ID test completed successfully");
  });

});