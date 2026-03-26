import { test, expect } from '../../base/ui/baseTest';
import { testData } from '../../Data/testData';
import { logger } from '../../util/logger';
import { generateCampaignFromJson } from '../../util/fakerCampaignData';

test.describe("Home Page Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    logger.info("Starting login before each test");
      const username = process.env.APP_USERNAME || '';
      const password = process.env.APP_PASSWORD || '';
        //console.log("username:", username); 
        //console.log("password:", password);
        //await loginPage.navigateTo(testData.url);
        await loginPage.navigateTo();
        await loginPage.login(username, password);
    
  });  

  test("Navigate to Campaigns page", async ({ campaignPage }) => {
    logger.info("Starting navigation to Campaigns page test");
    await campaignPage.navigateToCampaigns();
    await campaignPage.verifyUrl(testData.verifyCampaignUrl);
    logger.info("Navigation to Campaigns page test completed successfully");
  });

 /* test("Click Create Campaign", async ({ campaignPage }) => {
    logger.info("Starting Create Campaign test");
     //const campaignName = faker.company.name();
     const campaignName = faker.company.buzzNoun().slice(0, 15); 
    await campaignPage.clickCreateCampaign();
    await campaignPage.verifyUrl(testData.createCampaignUrl);
    await campaignPage.createCampaign(campaignName);
    console.log("Created campaign name:", campaignName);
    const name = await campaignPage.firstRowCampaignName().textContent();
    console.log("First row name:", name);
    await expect(campaignPage.firstRowCampaignName()).toContainText(campaignName);
    logger.info("Create Campaign test completed successfully");
  });*/

 test("Click Create Campaign", async ({ campaignPage }) => {
  logger.info("Starting Create Campaign test");

  const campaign = generateCampaignFromJson(); // 👈 ONE object

  await campaignPage.clickCreateCampaign();
  await campaignPage.verifyUrl(testData.createCampaignUrl);

  await campaignPage.createCampaign(campaign); // 👈 pass whole object

  console.log("Created campaign:", campaign);

  const name = await campaignPage.firstRowCampaignName().textContent();
  console.log("First row name:", name);

  await expect(campaignPage.firstRowCampaignName())
    .toContainText(campaign.campaignData.campaignName);

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
