import shopping from '../fixtures/shoppinglist.json';
describe('User shopping on Demoblaze', () => {
    const username = generateRandomString();
    const password = generateRandomString();
    const creditCard = "4035 5010 0000 0008";
    before('clean cookies', () => {
        cy.clearCookie('tokenp_');
        cy.clearCookie('user');
    });

    beforeEach('go home', () => {
        cy.goToHome();
    });
    it('should create a new user after clicking on sign up', () => {
        cy.get("[data-target='#signInModal']").click({ waitForAnimations: true });
        cy.verifyModal('#signInModal', 'Sign up');
        cy.wait(300)
        cy.signUp(username, password);
        cy.alertTextIs('Sign up successful');
    });

    it('should login a existent user', () => {
        cy.get("[data-target='#logInModal']").click({ waitForAnimations: true });
        cy.verifyModal('#logInModal', 'Log in');
        cy.wait(300)
        cy.login(username, password);
        cy.get('#nameofuser').should('be.visible').and('contain', username)
    });

    shopping.forEach((item) => {
        it(`should add the ${item.model} to the cart`, () => {
            cy.filterByCategory(item.category);
            cy.addToCart(item);
            cy.alertTextIs('Product added');
        })
    });

    shopping.filter(item => item.tbd).forEach((item) => {
        it(`should delete the ${item.model} to the cart`, () => {
            cy.goToCart();
            cy.deleteFromCart(item);
        })
    });

    it('should be able to place order', () => {
        cy.goToCart();
        let total = 0;
        shopping.filter(item => !item.tbd).forEach((item) => {
            total += item.price;
            console.log(total);
        });
        cy.placeOrder(total, username, creditCard);
        cy.wait(300);
        cy.thanksPurchase(total, username, creditCard);
        cy.url().should('include', '/index.html');

    });
    
})

function generateRandomString(){
    let text = "";
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for(let i = 0; i < 10; i++){
        text += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    }
    return text;
}