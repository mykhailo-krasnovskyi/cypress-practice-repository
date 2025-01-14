class HomePage {
    get signInButton() {
        return cy.get('.header_signin');
    }

    openPage() {
        cy.visit(`https://${Cypress.env('USERNAME')}:${Cypress.env('PASSWORD')}@qauto.forstudy.space`);
    }

    openSignInForm() {
        this.signInButton.click();
    }
}

export default new HomePage();