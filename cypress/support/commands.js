// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('goToHome', () => {
    cy.intercept('GET', 'https://api.demoblaze.com/entries').as('entries');
    cy.visit('https://www.demoblaze.com')
    cy.wait("@entries")
})

Cypress.Commands.add('goToCart', () => {
    cy.intercept('POST', '/viewcart').as('viewcart');
    cy.intercept('POST', '/view').as('view');
    cy.get('.nav-link').contains('Cart').click();
    cy.wait(['@viewcart','@view']);
})

Cypress.Commands.add('clickOnButton', (str) => {
    cy.get('button').contains(str).click();
})

Cypress.Commands.add('alertTextIs', (str) => {
    cy.on('window:alert', (msg) => {
        expect(msg).to.contains(str);
    })
});

Cypress.Commands.add('login', (username, password) => {
    cy.intercept('POST', '/login').as('loginUser');
    cy.get('#loginusername').should('be.visible').click().type(username, { delay: 30 }).and('have.value',username)
    cy.get('#loginpassword').should('be.visible').click().type(password, { delay: 30 }).and('have.value',password)
    cy.clickOnButton('Log in');
    cy.wait("@loginUser").then(() => {
        //Cypress.Cookies.preserveOnce('tokenp_', 'user')
        Cypress.Cookies.defaults({
            preserve: ['user', 'tokenp_'],
        })
    });
    
});

Cypress.Commands.add("loginByAPI", (username, password) => {
    return cy.request("POST", `${Cypress.env("apiUrl")}/login`, {
      username,
      password,
    });
});

Cypress.Commands.add('signUp', (username, password) => {
    cy.intercept('POST', '/signup').as('signUp');
    cy.get('#sign-username').should('be.visible').click().type(username, { delay: 30 }).and('have.value',username);
    cy.get('#sign-password').should('be.visible').click().type(password, { delay: 30 }).and('have.value',password);
    cy.clickOnButton('Sign up');
    cy.wait("@signUp");
});

Cypress.Commands.add('verifyModal', (modalId, mTitle) => {
    cy.get(modalId,{ timeout: 20000 }).should('be.visible');
    cy.get(`${modalId}Label`).should('be.visible').and('have.text', mTitle);
})

Cypress.Commands.add('filterByCategory', (cat) => {
    cy.intercept('POST', '/bycat').as('bycat');
    cy.get('.list-group-item').should('be.visible')
    cy.get('.list-group-item').contains(cat).click();
    cy.wait('@bycat');
});

Cypress.Commands.add('addToCart', (item) => {
    cy.intercept('POST', '/view').as('view');
    cy.intercept('POST', '/check').as('check');
    cy.intercept('POST', '/addtocart').as('addtocart');
    cy.get('#tbodyid').should('be.visible').contains(item.model).click()
    cy.wait(['@view', '@check'])
    cy.get('.price-container').contains(item.price).should('be.visible')
    cy.get('.btn').contains('Add to cart').click();
    cy.wait('@addtocart')
});

Cypress.Commands.add('deleteFromCart', (item) => {
    cy.intercept('POST', '/deleteitem').as('deleteItem');
    cy.get('.success').should('be.visible')
    .contains(item.model)
    .parent('tr')
    .within(() => {
        cy.get('td').contains('Delete').click({ waitForAnimations: true });
    })
    cy.wait('@deleteItem');
});

Cypress.Commands.add('placeOrder', (total, username, creditCard) => {
    cy.intercept('POST', '/deletecart').as('deletecart');
    cy.clickOnButton('Place Order');
    cy.wait(300);
    cy.verifyModal('#orderModal', 'Place order');
    cy.get('#totalm').should('be.visible').contains(total);
    cy.get('input[id="name"]').should('be.visible').click().type(username, { delay: 30 }).and('have.value',username);
    cy.get('input[id="card"]').should('be.visible').click().type(creditCard, { delay: 30 }).and('have.value',creditCard);
    cy.get('.btn-primary').should('be.visible').contains('Purchase').click();
    cy.wait('@deletecart');
})

Cypress.Commands.add('thanksPurchase', (total, username, creditCard) => {
    cy.get('.sweet-alert').should('be.visible');
    cy.get('.confirm').should('be.visible').click();
})