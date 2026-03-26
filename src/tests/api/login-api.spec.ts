//import { test, expect } from '@playwright/test';
import { LoginAPI } from '../../pages/api/loginAPI';
import { test, expect } from '../../base/ui/baseTest';
 

test('Valid Basic Auth should access protected API', async ({ token }) => {

  //const loginAPI = new LoginAPI(request);
  //const token  = await loginAPI.loginValid();

  console.log("jwtToken:", token);

  expect(token).toBeTruthy();
});

test('Invalid Basic Auth should not access protected API', async ({ request }) => {

  const authAPI = new LoginAPI(request);
  const response = await authAPI.loginInvalid();

  console.log("Status:", response.status());
  console.log("Body:", await response.text());

  expect(response.status()).toBe(401);
});