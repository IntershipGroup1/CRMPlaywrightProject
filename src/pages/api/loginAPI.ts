import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from '../../base/api/baseAPI';
import { testDataAPI } from '../../Data/testDataAPI';

export class LoginAPI extends BaseAPI{
  protected request: APIRequestContext;

  constructor(request: APIRequestContext) {
    super(request);
    this.request = request;
  }


  async loginValid(): Promise<string> {
  const response = await this.get(
    testDataAPI.APIurlLogin,
    this.getBasicAuthHeader(testDataAPI.username, testDataAPI.password)
  );

  const body = await response.json();

  return body.jwtToken;
}
  async loginInvalid() {
    return await this.get(
      testDataAPI.APIurlLogin,
      this.getBasicAuthHeader(testDataAPI.invalidUsername, testDataAPI.invalidPassword)
    );
  }
}