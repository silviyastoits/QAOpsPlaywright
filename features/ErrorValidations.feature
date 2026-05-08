Feature: Errors validations

@Regression
Scenario: Placing the Order
    Given a login to Ecommerce applicateion with "silviyastoitseva@gmail.com" and "Iamking!00"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify order is present in the OrderHistory

@Regression
Scenario Outline: Placing the Order
    Given a login to Ecommerce2 applicateion with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    |username       |password           |
    |rahulshetty    |Learning@830$3mK2  |
    |hello          |123456             |

   