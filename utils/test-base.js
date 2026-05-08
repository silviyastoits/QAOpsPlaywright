const  base  = require('@playwright/test');


exports.customtest = base.test.extend(
    {
        testDataForOrder : {
            username:  "silviyastoitseva@gmail.com",
            password: "Iamking!00",
            productName: "ZARA COAT 3"
            }
    }
)