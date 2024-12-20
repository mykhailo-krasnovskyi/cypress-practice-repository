/// <reference types="cypress" />

describe('Search', () => {
    const selectors = {
        emailField: '#signinEmail',
        passwordField: '#signinPassword',
        loginButton: '.modal-content .btn-primary',
        wrongDataMessage: '.alert-danger',
        errorMessage: '.invalid-feedback p',
    }

    beforeEach(() => {
        cy.visit('/');
        cy.contains('Sign In').click();
    })

    it('Success Sign In', () => {
        cy.get(selectors.emailField).type('michael.krasnovskyi+testUser1@gmail.com');
        cy.get(selectors.passwordField).type('ZSgeVQhuU3qkvlG');
        cy.get(selectors.loginButton).click();
        cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');
    });

    it('Sign In with wrong data', () => {
        cy.get(selectors.emailField).type('michael.krasnovskyi+testUser1@gmail.com');
        cy.get(selectors.passwordField).type('41241242');
        cy.get(selectors.loginButton).click();
        cy.get(selectors.wrongDataMessage).should('be.visible');
    });

    it('Sign In with empty email', () => {
        cy.get(selectors.emailField).focus();
        cy.get(selectors.emailField).blur();
        cy.get(selectors.passwordField).type('41241242');
        cy.get(selectors.errorMessage).should('have.text', 'Email required');
    });

    it('Sign In with empty password', () => {
        cy.get(selectors.passwordField).focus();
        cy.get(selectors.passwordField).blur();
        cy.get(selectors.emailField).type('michael.krasnovskyi+testUser1@gmail.com');
        cy.get(selectors.errorMessage).should('have.text', 'Password required');
    });

    it('Sign In with incorrect email', () => {
        cy.get(selectors.emailField).type('fsafasfasfafs');
        cy.get(selectors.emailField).blur();
        cy.get(selectors.errorMessage).should('have.text', 'Email is incorrect');
    });


})
