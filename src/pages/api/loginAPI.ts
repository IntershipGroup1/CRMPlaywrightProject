import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from '../../base/api/baseAPI';
import { testDataAPI } from '../../Data/testDataAPI';
import 'dotenv/config';

export class LoginAPI extends BaseAPI{
  protected request: APIRequestContext;

  constructor(request: APIRequestContext) {
    super(request);
    this.request = request;
  }


  async loginValid(): Promise<string> {
    const username = process.env.USERNAME!;
const password = process.env.PASSWORD!;
  const response = await this.get(
    testDataAPI.APIurlLogin,
    this.getBasicAuthHeader(username, password)
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