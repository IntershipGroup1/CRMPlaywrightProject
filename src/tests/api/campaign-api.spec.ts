//import { test, expect } from '@playwright/test';
import { testDataAPI } from '../../Data/testDataAPI';
import { test, expect } from '../../base/ui/baseTest';
import { CampaignAPI } from '../../pages/api/campaignAPI';

test.describe.serial('Campaign API', () => {
let campaignAPI: CampaignAPI;    //shared variables
let campaignId: string | number; // Store campaignId for update and delete tests

test.beforeAll(async ({ request, token }) => {
  campaignAPI = new CampaignAPI(request, token);
  const createResponse = await campaignAPI.createCampaign();
  expect([200, 201]).toContain(createResponse.status());

    const createBody = await createResponse.json();
    campaignId = createBody.campaignId;

    console.log('Created campaignId:', campaignId);
    expect(campaignId).toBeTruthy();
  });

  test('Create campaign', async () => {
    expect(campaignId).toBeTruthy();
  });

test('Update Campaign', async ({ request, token }) => { 
     const campaignAPI = new CampaignAPI(request, token);
    console.log("Updating Campaign with ID:", campaignId);
    const response = await campaignAPI.updateCampaign(campaignId); 
   console.log("Status:", response.status());
   const responseBody = await response.json();
   console.log("Response Body:", responseBody);
   expect([200, 204]).toContain(response.status());
});

test('Delete Campaign', async ({ request, token }) => {
     const campaignAPI = new CampaignAPI(request, token);
    const response = await campaignAPI.deleteCampaign(campaignId);
    console.log("Status:", response.status());
   expect([200, 204]).toContain(response.status());
});   

test('Get All Campaigns', async ({ request, token }) => {
    const campaignAPI = new CampaignAPI(request, token);
    const response = await campaignAPI.getAllCampaigns();
    console.log("Status:", response.status());
    const responseBody = await response.json();
    console.log("Response Body:", responseBody);
    expect(response.status()).toBe(200);
});

test('Get All Campaigns Non-Pageable', async ({ request, token }) => {
    const campaignAPI = new CampaignAPI(request, token);
    const response = await campaignAPI.getAllCampaignsNonPageable();
    console.log("Status:", response.status());  
    const responseBody = await response.json();
    console.log("Response Body:", responseBody);
    expect(response.status()).toBe(200);
});

test('count Campaigns', async ({ request, token }) => {
    const campaignAPI = new CampaignAPI(request, token);
    const response = await campaignAPI.countCampaigns();
     console.log("Status:", response.status());
    const responseBody = await response.json();
    console.log("Campaign Count:", responseBody);
    expect(response.status()).toBe(200);
    expect(typeof responseBody).toBe('number');
    
});
});
