# Demoblazer

E2E test with Cypress and Cucumber

## Installation

Needed [Node.js](https://nodejs.dev/) installed.

Run the following command before running the tests
```bash
npm install cypress
npm install cypress-cucumber-preprocessor
```

## Usage

Run the following command for running the tests

```bash
npx cypress open
```

## Cucumber steps definitions
Common steps for user data: 
 - Given that random username and password are generated
 - Given that we set the user as {string} and the password as {string}

These steps are located in "/cypress/integration/common"

Demoblaze steps definitions
 - Given that user filter by the {string} category
 - When the {string} item with a price of {int} is added to cart
 - When the user clicks on {string} navigation bar button
 - Then the {string} form is completed and submitted
 - Then the {string} item is deleted from the cart
 - Then the order is made with a total of {int} to pay it with {string}
 - Then an alert message is displayed with the text {string}
 - Then the welcome message is displayed
 - Then the message of thanks for your purchase of a total of {int} paid with {string} is displayed


These steps are located in "/cypress/integration/demoblaze"

### Author
Nayla Taguada