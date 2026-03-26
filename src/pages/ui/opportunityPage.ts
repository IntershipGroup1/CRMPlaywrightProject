import { Page,expect } from '@playwright/test';
import { BasePage } from "../../base/ui/basePage";
import { testData } from "../../Data/testData";


export class OpportunityPage extends BasePage {
constructor(page:Page) {
    super(page);
}
opportunityLink=this.page.getByRole("link", { name: "Opportunities" });
createOpportunityButton=this.page.getByRole('button', { name: 'Create Opportunity' });
InputOpportunityName=this.page.locator('[name="opportunityName"]');
InputAmount=this.page.locator('[name="amount"]');
InputBusinessType=this.page.locator('[name="businessType"]');
InputNextStep=this.page.locator('[name="nextStep"]');
InputSalesStage=this.page.locator('[name="salesStage"]');
InputAssignedTo=this.page.locator('[name="assignedTo"]');
InputExpectedCloseDate=this.page.locator('[name="expectedCloseDate"]');
InputProbability=this.page.locator('[name="probability"]');
InputDescription=this.page.locator('textarea[name="description"]');
ClickPlusIConforLead=this.page.locator('button', { has: this.page.locator('svg[data-icon="plus"]') })
clickSubmit=this.page.getByRole('button', { name: 'Create Opportunity' });
readonly dropdownSearchBy=this.page.locator('select.form-control')
Inputsearch=this.page.getByPlaceholder("Search by Opportunity Id");
clickOpprotunityEdit=this.page.locator('[title="Edit"]');
clickUpdateOpportunity=this.page.getByRole('button', { name: 'Update Opportunity' });

async openOpportunitiesPage(opportunityurl:string){ 
  await this.navigateToOpportunities();
  await this.verifyUrl(opportunityurl); // or use testData
}

async navigateToOpportunities(){
     await this.opportunityLink.waitFor({ state: 'visible' });
    await this.opportunityLink.click();
}
async clickCreateOpportunity() {
    await this.createOpportunityButton.click();
}
/*async fillOpportunityDetails(opportunityName:string, amount:string, businessType:string, nextStep:string, salesStage:string) {
    await this.InputOpportunityName.fill(opportunityName);
    await this.InputAmount.fill(amount);
    await this.InputBusinessType.fill(businessType);
    await this.InputNextStep.fill(nextStep);
    await this.InputSalesStage.fill(salesStage);
}*/
/*async fillOpportunityDetails(data: {
  opportunityName: string;
  amount: string;
  businessType: string;
  nextStep: string;
  salesStage: string;
}) {
  await this.InputOpportunityName.fill(data.opportunityName);
  await this.InputAmount.fill(data.amount);
  await this.InputBusinessType.fill(data.businessType );
  await this.InputNextStep.fill(data.nextStep);
  await this.InputSalesStage.fill(data.salesStage);
}*/

async fillOpportunityDetails(opportunity: any) {
  const data = opportunity.OpportunityData;

  await this.InputOpportunityName.fill(data.opportunityName);
  await this.InputAmount.fill(data.amount);
  await this.InputAssignedTo.fill(data.assignedTo);
  await this.InputBusinessType.fill(data.businessType);
  await this.InputDescription.fill(data.description);
  await this.InputExpectedCloseDate.fill(data.expectedCloseDate);
  await this.InputNextStep.fill(data.nextStep);
  await this.InputSalesStage.fill(data.salesStage);
  await this.InputProbability.fill(data.probability);
}
async clickopprotninity() {
  await this.createOpportunityButton.click();
}


async selectLeadFromPopup() {
    const popup = await this.openPopup(this.ClickPlusIConforLead);  
    const firstSelectButton = popup.locator('tbody tr').first().getByRole('button', { name: 'Select' });
   await this.clickAndWaitForPopupToClose(popup, firstSelectButton);

}

async clickSubmitOpportunity() {
    await this.clickSubmit.click();
}
async verifyOpportunityCreation() {
    await this.page.locator('.Toastify__toast-body').filter({ hasText: /created|success/i }).first().waitFor({ state: 'visible' });
  }

  firstRowOpportunityName() {
  return this.page.locator('table tbody tr td').nth(1);
}

  async selectSearchType(seachType:string){ 
        await this.dropdownSearchBy.selectOption (seachType);
        //await expect(this.dropdownSearchBy).toHaveValue(testData.campaignSearchexpectedValue); 
    }

    async verifySelectedSearchType(expectedValue: string) {
     await this.verifyDropdownValue(this.dropdownSearchBy, expectedValue);
    }

    async clickEditOpportunity() {
    await this.clickOpprotunityEdit.click();
  }
  async editOpportunityDetails(editopportunityName:string) {
 await this.InputOpportunityName.fill(editopportunityName);
 await this.clickUpdateOpportunity.click();
  }
async verifyOpportunityUpdate() {
 await this.page.locator('.Toastify__toast-body').filter({ hasText: /updated|success/i }).first().waitFor({ state: 'visible' });

}
}
