import { url } from "node:inspector";

export const testData = {
   // url:"http://49.249.28.218:8098",
   // username:"rmgyantra",
    //password:"rmgy@9999",
    invalidUsername:"rmgyantra123",
    invalidPassword:"rmgy@9999abc",

    //-------------Campaign Data----------------//
    verifyCampaignUrl:"http://49.249.28.218:8098/campaigns",
    createCampaignUrl:"http://49.249.28.218:8098/create-campaign",
    campaignPageLabel:"Campaigns",
    //campaignName:"QWERTYBAS Campaigns",
    campaignTargetSize:"20000",
    campaignSearchValue:"campaignId",
    campaignSearchexpectedValue:"campaignId",
    campaignIdforSearch:"CAM15591",

    //-------------Opportunity Data----------------//
    verifyOpportunityUrl:"http://49.249.28.218:8098/opportunities",
    //opportunityName:"QWERTYBASAA Opportunity",
    //amount:"50000",
   // businessType:"New Business",
   // nextStep:"Contact Client",
   // salesStage:"Qualification",
    OpportunitySearchValue:"opportunityId",
    OpportunitySearchexpectedValue:"opportunityId",
    opportunityIdforSearch:"OPP00994",
    //editOpportunityName:"QWERTYBASAA Edited",
    leadId:"LEAD00927"

}