import {Before, Given} from 'cypress-cucumber-preprocessor/steps'

// Load the page before each test
Before(function(){
    cy.goToHome();
    cy.fixture('user').as('user');
})

Before({ tags: "@clean" },function(){
    cy.clearCookie('tokenp_');
    cy.clearCookie('user');
})

Given('that random username and password are generated', function(){
    function generateRandomString(){
        let text = "";
        let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for(let i = 0; i < 10; i++){
            text += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        }
        return text;
    }
    const user = {
        name: generateRandomString(),
        password: generateRandomString()
    }
    cy.writeFile('cypress/fixtures/user.json', user);
});

Given('that we set the user as {string} and the password as {string}', function(user, password){
    this.user = { name: user, password: password };
});