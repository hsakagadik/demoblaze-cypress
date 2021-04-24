import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('that user filter by the {string} category', function(category){
    console.log(category);
    cy.filterByCategory(category);
});

When('the {string} item with a price of {int} is added to cart', function(itemModel, itemPrice){
    const item = { model: itemModel, price: itemPrice };
    cy.addToCart(item);
});

When('the user clicks on {string} navigation bar button', function(e){
    if(e === "Sign up"){
        cy.get("[data-target='#signInModal']").click({ waitForAnimations: true })
        cy.verifyModal('#signInModal', 'Sign up');
        cy.wait(300)
    } else if (e === "Log in"){
        cy.get("[data-target='#logInModal']").click({ waitForAnimations: true });
        cy.verifyModal('#logInModal', 'Log in');
        cy.wait(300)
    } else if(e === "Cart") {
        cy.goToCart();
    }
});

Then('the {string} form is completed and submitted', function(form){
    switch (form) {
        case "Sign up": 
            cy.signUp(this.user.name, this.user.password);
            break;
        case "Log in":
            cy.login(this.user.name, this.user.password);
            break;
    }
});

Then('the {string} item is deleted from the cart', function(model){
    const item = { model: model };
    cy.deleteFromCart(item);
})

Then('the order is made with a total of {int} to pay it with {string}', function(total, creditCard){
    cy.placeOrder(total, this.user.name, creditCard);
    cy.wait(300);
})

Then('an alert message is displayed with the text {string}', function(msg){
    cy.alertTextIs(msg);
});

Then('the welcome message is displayed', function(){
    cy.get('#nameofuser').should('be.visible').and('contain', this.user.name);
});

Then('the message of thanks for your purchase of a total of {int} paid with {string} is displayed', function(total, creditCard){
    cy.thanksPurchase(total, this.user.name, creditCard);
})