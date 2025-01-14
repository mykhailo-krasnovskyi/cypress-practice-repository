/// <reference types="cypress" />
import HomePage from "../../page-objects/pages/HomePage";
import SignInForm from "../../page-objects/forms/SignInForm";

describe('Login without POM', () => {
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

describe.only('Login with POM', () => {
    beforeEach(() => {
        HomePage.openPage();
        HomePage.openSignInForm();
    })

    it('Success Sign In', () => {
        SignInForm.loginWithCredentials('michael.krasnovskyi+testUser1@gmail.com', 'ZSgeVQhuU3qkvlG')
        cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');
    });

    it('Sign In with wrong data', () => {
        SignInForm.loginWithCredentials('michael.krasnovskyi+testUser1@gmail.com', '531512512')
        SignInForm.wrongDataMessage.should('be.visible');
    });

    it.only('Sign In with empty email', () => {
        //SignInForm.triggerErrorMessageForField('email')
        SignInForm.emailField.debug();
        SignInForm.enterPassword('41241242')
        SignInForm.errorMessage.should('have.text', 'Email required');
    });

    it('Sign In with empty password', () => {
        SignInForm.triggerErrorMessageForField('password')
        SignInForm.enterEmail('michael.krasnovskyi+testUser1@gmail.com');
        SignInForm.errorMessage.should('have.text', 'Password required');
    });

    it('Sign In with incorrect email', () => {
        SignInForm.enterEmail('fsafasfasfafs');
        SignInForm.triggerErrorMessageForField('email')
        SignInForm.errorMessage.should('have.text', 'Email is incorrect');
    });


})