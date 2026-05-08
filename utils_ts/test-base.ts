import {test as baseTest} from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
};
export const customtest = baseTest.extend<{testDataForOrder: TestDataForOrder}>(
    {
        testDataForOrder : {
            username:  "silviyastoitseva@gmail.com",
            password: "Iamking!00",
            productName: "ZARA COAT 3"
            }
    }
)