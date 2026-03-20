
import { APIRequestContext } from 'playwright';
import { BaseAPI } from '../../base/api/baseAPI';
import { testDataAPI } from '../../Data/testDataAPI';

  
export class CampaignAPI extends BaseAPI {
    private token: string;
    constructor(request: APIRequestContext, token: string) {
    super(request);
    this.token = token;
    
  }
  async createCampaign() {
    return await this.post(
      testDataAPI.APICampaignsurl,
      testDataAPI.campaignData,
      this.getBearerTokenHeader(this.token)
    );
  }

  async updateCampaign(campaignId: string | number) {
    return await this.put(
      `${testDataAPI.APICampaignsurl}?campaignId=${campaignId}`,
      testDataAPI.updateCampaignData,
      this.getBearerTokenHeader(this.token)
    );
  }

  async deleteCampaign(campaignId: string | number) {
    return await this.delete(
      `${testDataAPI.APICampaignsurl}?campaignId=${campaignId}`,
      this.getBearerTokenHeader(this.token)
    );
  }

  async getAllCampaigns() {
    return await this.get(
      `${testDataAPI.APICampaignsurl}${testDataAPI.endPointall}`,
      this.getBearerTokenHeader(this.token)
    );
  }

  async getAllCampaignsNonPageable() {
    return await this.get(
      `${testDataAPI.APICampaignsurl}${testDataAPI.endPointnonPagable}`,
      this.getBearerTokenHeader(this.token)
    );
  }

  async countCampaigns() {
    return await this.get(
      `${testDataAPI.APICampaignsurl}${testDataAPI.endPointCount}`,
      this.getBearerTokenHeader(this.token)
    );
  }
}