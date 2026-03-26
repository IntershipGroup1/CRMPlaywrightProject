import { test, expect } from '../../base/ui/baseTest';
import { testData } from '../../Data/testData';
import { logger } from '../../util/logger';
import { faker } from '@faker-js/faker';
import { generateOpportunityFromJson } from '../../util/fakerCampaignData';

test.describe("Home Page Tests", () => {
  test.beforeEach(async ({ loginPage,opportunityPage }) => {
    logger.info("Starting login before each test");
      const username = process.env.APP_USERNAME || '';
      const password = process.env.APP_PASSWORD || '';
        //console.log("username:", username); 
        //console.log("password:", password);
       // await loginPage.navigateTo(testData.url);
       await loginPage.navigateTo();
        await loginPage.login(username, password);

    logger.info("Starting navigation to Opportunities page test");
    await opportunityPage.navigateToOpportunities();
    await opportunityPage.verifyUrl(testData.verifyOpportunityUrl);
    logger.info("Navigation to Opportunities page test completed successfully");
  });  


/*test('Create Opportunity', async ({ opportunityPage }) => {
    await opportunityPage.openOpportunitiesPage(testData.verifyOpportunityUrl);
    logger.info("Navigation to Opportunities page test completed successfully");
    const opportunityData  = require('../../Data/opportunityData.json');
    const opportunityName = faker.company.buzzNoun().slice(0, 15);
    await opportunityPage.clickCreateOpportunity();
   // await opportunityPage.fillOpportunityDetails(opportunityName, testData.amount, testData.businessType, testData.nextStep, testData.salesStage);
  //  await opportunityPage.fillOpportunityDetails({ opportunityName,...opportunityData.validOpportunity });

    console.log("Created opportunity name:", opportunityName, opportunityData.validOpportunity);
    await opportunityPage.selectLeadFromPopup();
    await opportunityPage.clickSubmitOpportunity();
    await opportunityPage.verifyOpportunityCreation();
    const name = await opportunityPage.firstRowOpportunityName().textContent();
    console.log("First row name:", name);
    await expect(opportunityPage.firstRowOpportunityName()).toContainText(opportunityName);
});*/

test('Create Opportunity', async ({ opportunityPage }) => {
  await opportunityPage.openOpportunitiesPage(testData.verifyOpportunityUrl);
  logger.info('Navigation to Opportunities page test completed successfully');
await opportunityPage.clickCreateOpportunity();
  const opportunity = generateOpportunityFromJson();

  
  await opportunityPage.fillOpportunityDetails(opportunity);


  console.log('Created opportunity:', opportunity);

  await opportunityPage.selectLeadFromPopup();
  await opportunityPage.clickSubmitOpportunity();
  await opportunityPage.verifyOpportunityCreation();

  const name = await opportunityPage.firstRowOpportunityName().textContent();
  console.log('First row name:', name);

  await expect(opportunityPage.firstRowOpportunityName()).toContainText(
    opportunity.OpportunityData.opportunityName
  );
});

test("Select search type from dropdown", async ({ opportunityPage }) => {
    logger.info("Starting select search type from dropdown test");
    await opportunityPage.openOpportunitiesPage(testData.verifyOpportunityUrl);
    await opportunityPage.selectSearchType(testData.OpportunitySearchValue);  
    await opportunityPage.verifySelectedSearchType(testData.OpportunitySearchexpectedValue);
    logger.info("Select search type from dropdown test completed successfully");
  });
 
  test("Search for a Opportunity by ID", async ({ opportunityPage }) => {
    logger.info("Starting search for a opportunity by ID test");
    await opportunityPage.openOpportunitiesPage(testData.verifyOpportunityUrl);
    await opportunityPage.Inputsearch.fill(testData.opportunityIdforSearch);
    const name = await opportunityPage.firstRowOpportunityName().textContent();
    console.log("First row name:", name);
    await expect(opportunityPage.firstRowOpportunityName()).toBeVisible();
    logger.info("Search for a campaign by ID test completed successfully");
  });

  test("Edit the opportunity ID", async ({ opportunityPage }) => {
    await opportunityPage.openOpportunitiesPage(testData.verifyOpportunityUrl);
    await opportunityPage.Inputsearch.fill(testData.opportunityIdforSearch);
    const editOpportunityName = faker.company.buzzNoun().slice(0, 15);
    await opportunityPage.clickEditOpportunity();
    await opportunityPage.editOpportunityDetails(editOpportunityName);
    console.log("Edited opportunity name:", editOpportunityName);
    await opportunityPage.verifyOpportunityUpdate();
    await opportunityPage.Inputsearch.fill(testData.opportunityIdforSearch);
    const name = await opportunityPage.firstRowOpportunityName().textContent();
    console.log("First row name after edit:", name);
    await expect(opportunityPage.firstRowOpportunityName()).toContainText(editOpportunityName);
  });
});