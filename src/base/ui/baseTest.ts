import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/ui/loginPage';
import { CampaignPage } from '../../pages/ui/campaignPage';
import { LoginAPI } from '../../pages/api/loginAPI';
import { OpportunityPage } from '../../pages/ui/opportunityPage';

type Fixtures = {
  loginPage: LoginPage;
  campaignPage: CampaignPage;
  opportunityPage:OpportunityPage;
  token: string;
};

export const test = base.extend<Fixtures>({
  
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
 
    campaignPage: async ({ page }, use) => {  
    await use(new CampaignPage(page));
    },

    opportunityPage: async ({ page }, use) => {
    await use(new OpportunityPage(page));
    },

     token: async ({ request }, use) => {             //request :API client
    const loginAPI = new LoginAPI(request);            //Take request-> pass into LoginAPI
    const token = await loginAPI.loginValid(); //dynamic token
    await use(token);
  },
});

/*test.beforeEach(async ({ loginPage }) => {
  const username = process.env.APP_USERNAME || '';
  const password = process.env.APP_PASSWORD || '';

  //await loginPage.navigateTo(testData.url);
  await loginPage.navigateTo();
  await loginPage.login(username, password);
});*/
export { expect };