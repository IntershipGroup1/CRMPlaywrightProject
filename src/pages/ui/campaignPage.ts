import { expect, Page } from "@playwright/test";
import { BasePage } from "../../base/ui/basePage";
import { testData } from "../../Data/testData";

export class CampaignPage extends BasePage {
    constructor(page:Page) {
        super(page);
    }   
    campaignsLink = this.page.getByRole("link", { name: "Campaigns" });
    createCampaignButton = this.page.getByRole('button', { name: 'Create Campaign' });
    InputCampaignName = this.page.locator('[name="campaignName"]');
    InputCampaignStatus=this.page.locator('[name="campaignStatus"]');
    InputExpectedCloseDate=this.page.locator('[name="expectedCloseDate"]');
    InputTargetAudience=this.page.locator('[name="targetAudience"]');
    //InputDescription=this.page.getByLabel('Description');
    InputDescription = this.page.locator('textarea[name="description"]');
    InputTargetSize=this.page.locator('[name="targetSize"]');
    campaignSubmit = this.page.getByRole('button', { name: 'Create Campaign' });
    readonly dropdownSearchBy=this.page.locator('select.form-control')
    Inputsearch=this.page.getByPlaceholder("Search by Campaign Id");

     async navigateToCampaigns(){
        await this.campaignsLink.click();
     }
     
      async clickCreateCampaign() { 
      await this.createCampaignButton.click();
      }

      /*async createCampaign(campaignName: string) {
      await this.InputCampaignName.fill(campaignName);
      await this.InputTargetSize.fill(testData.campaignTargetSize);
      await this.campaignSubmit.click();
      //await this.page.pause();// Wait for the success toast to appear to identify this locator('.Toastify__toast-body')
      await this.page.locator('.Toastify__toast-body').filter({ hasText: /created|success/i }).first().waitFor({ state: 'visible' });
      }*/

      async createCampaign(campaign: any) {
    const data = campaign.campaignData;

    await this.InputCampaignName.fill(data.campaignName);
    await this.InputCampaignStatus.fill(data.campaignStatus);
    await this.InputTargetSize.fill(data.targetSize);
    await this.InputExpectedCloseDate.fill(data.expectedCloseDate);
    await this.InputTargetAudience.fill(data.targetAudience);
    await this.InputDescription.fill(data.description);
    await this.page.getByRole('button', { name: 'Create Campaign' }).click();
    await this.page.locator('.Toastify__toast-body').filter({ hasText: /created|success/i }).first().waitFor({ state: 'visible' });
  }


firstRowCampaignName() {
  return this.page.locator('table tbody tr td').nth(1);
}


      async selectSearchType(seachType:string){ 
        await this.dropdownSearchBy.selectOption (testData.campaignSearchValue);
        //await expect(this.dropdownSearchBy).toHaveValue(testData.campaignSearchexpectedValue); 
    }

    async verifySelectedSearchType(expectedValue: string) {
     await this.verifyDropdownValue(this.dropdownSearchBy, expectedValue);
    }
    }
