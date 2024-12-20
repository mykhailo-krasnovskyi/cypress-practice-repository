/// <reference types="cypress" />

describe('Login form tests', () => {
    const correctUserName = 'standard_user';
    const correctUserPassword = 'secret_sauce';

    beforeEach(() => {
        cy.visit('/');
    })

    it('Success Login with credentials', () => {
        cy.get('[data-test="username"]').type(correctUserName);
        cy.get('[data-test="password"]').type(correctUserPassword);
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="title"]').should('have.text', 'Products');
        cy.contains('Products').should('be.visible');
        cy.url().should('equal', 'https://www.saucedemo.com/inventory.html')
    });

    it('Login with incorrect credentials', () => {
        cy.get('[data-test="username"]').type('random_name');
        cy.get('[data-test="password"]').type('random_pass');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('Login with locked user credentials', () => {
        cy.get('[data-test="username"]').type('locked_out_user');
        cy.get('[data-test="password"]').type(correctUserPassword);
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.');
    });

    it('Login without userName', () => {
        cy.get('[data-test="password"]').type(correctUserPassword);
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username is required');
    });

    it('Login without password', () => {
        cy.get('[data-test="username"]').type('locked_out_user');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Password is required');
    });


})
