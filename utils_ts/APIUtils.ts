import { expect, String } from'@playwright/test';

class APIUtils {
  apiContext:any;
  loginPayLoad: string;
  constructor(apiContext:any , loginPayLoad: string) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }

 async getToken() {
  const loginResponse = await this.apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/auth/login',
    {
      data: this.loginPayLoad,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const body = await loginResponse.text();

  expect(
    loginResponse.ok(),
    `Login failed. Status: ${loginResponse.status()} Body: ${body}`
  ).toBeTruthy();

  const loginResponseJson = JSON.parse(body);
  expect(loginResponseJson.token).toBeTruthy();

  return loginResponseJson.token;
}

  async createOrder(orderPayLoad: string) {

    
    const token = await this.getToken();
 
    const orderResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
        data: orderPayLoad,
        headers: {
          Authorization: token,
        },
      }
    );

    expect(orderResponse.ok()).toBeTruthy();

    const orderResponseJson = await orderResponse.json();

    return {
      token,
      orderId: orderResponseJson.orders[0],
    };
  }
}

module.exports = { APIUtils };