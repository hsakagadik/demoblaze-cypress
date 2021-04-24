Feature: Demoblaze E2E user flow

@clean
Scenario: User should be able to sign up and create a new user
Given that random username and password are generated
When the user clicks on "Sign up" navigation bar button
Then the "Sign up" form is completed and submitted
And an alert message is displayed with the text "Sign up successful"

Scenario: User should be able to log in
When the user clicks on "Log in" navigation bar button
Then the "Log in" form is completed and submitted
And the welcome message is displayed

Scenario Outline: User should be able to add the item <itemModel> to the cart 
Given that user filter by the "<itemCategory>" category
When the "<itemModel>" item with a price of <itemPrice> is added to cart
Then an alert message is displayed with the text "Product added"
Examples:
    | itemCategory | itemModel    | itemPrice |
    |   Phones     | HTC One M9   |   700     | 
    |   Laptops    | MacBook air  |   700     |
    |   Monitors   | ASUS Full HD |   230     |

Scenario: User should be able to delete an item from the cart
When the user clicks on "Cart" navigation bar button 
Then the "HTC One M9" item is deleted from the cart

Scenario: User should be able to place the order
When the user clicks on "Cart" navigation bar button
Then the order is made with a total of 930 to pay it with "4035 5010 0000 0008"
And the message of thanks for your purchase of a total of 930 paid with "4035 5010 0000 0008" is displayed