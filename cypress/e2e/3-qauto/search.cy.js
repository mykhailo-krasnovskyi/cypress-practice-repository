/// <reference types="cypress" />

describe('Search', () => {

    beforeEach(() => {
        cy.visit('/');
    })

    it('contains', () => {
        cy.contains('h1', 'Do more!');
    });

    it('find', () => {
        cy.get('.header_left').find('a');
        cy.get('.header_left a');
    });

    it('find', () => {
        cy.get('.header_left').children('a');
        cy.get('.header_left>a');
    });

    it('parent', () => {
        cy.contains('.header-link', 'Home').parent();
    });

    it('parents', () => {
        cy.contains('.header-link', 'Home').parents('.container');
    });

    it('closest', () => {
        cy.contains('.header-link', 'Home').closest('.container');
    });

    it('prev', () => {
        cy.contains('.header-link', 'About').prev();
    });

    it('siblings', () => {
        cy.contains('.header-link', 'About').siblings();
    });

    it('title', () => {
        cy.title().should('equal', 'Hillel Qauto');
    });

    it('url', () => {
        cy.url().should('equal', 'https://qauto.forstudy.space/');
    });

    it('filter', () => {
        cy.get('nav').children().filter('button');
    });

    it('eq', () => {
        cy.get('.socials_icon').eq(2);
    });

    it('first-last', () => {
        cy.get('.socials_icon').last();
    });

    it('first-last', () => {
        cy.get('nav').children().not('button');
    });

    it('invoke', () => {
        cy.contains('Sign In').invoke('hide');
        cy.contains('Sign In').invoke('show');
        cy.contains('Sign In').invoke('attr', 'class').should('contain', 'header_signin');
        cy.get('.header_signin').invoke('text').should('eq', 'Sign In');
        cy.get('.header_signin').should('have.text', 'Sign In');
    });

    it('then', () => {
        cy.get('.header_signin').invoke('text').then((text) => {
            cy.log('HELLO FROM cy.log:' + text.toUpperCase());
            cy.wrap(text).should('eq', 'Sign In');
        })
    });


    it('wrap', () => {
        const message = 'test message';
        const age = 20;
        cy.wrap(message).should('eq', 'test message');
        cy.wrap(age).should('be.greaterThan', 19);
    });

    it('its', () => {
        cy.title().its('length').should('be.greaterThan', 5);

        const response = {
            statusCode: 200,
            data: {
                name: 'John',
                age: 22
            }
        }

        cy.wrap(response).its('statusCode').should('eq', 200);
        cy.wrap(response).its('data').should('have.own.property', 'name');
    });

    it('each', () => {
        cy.contains('Sign up').click();
        cy.get('.modal-body input').each((input, index) => {
            cy.log(index);
            cy.wrap(input).focus();
        })
    });

    it('aliases', () => {
        cy.get('.header_signin').as('signInButton');
        cy.get('@signInButton').should('have.text', 'Sign In');
        cy.get('@signInButton').should('have.class', 'btn btn-outline-white header_signin');
        cy.get('@signInButton').click();
    });

    it('without aliases', () => {
        const signInButtonSelector = '.header_signin';
        cy.get(signInButtonSelector).should('have.text', 'Sign In');
        cy.get(signInButtonSelector).should('have.class', 'btn btn-outline-white header_signin');
        cy.get(signInButtonSelector).click();
    });

    it.only('within', () => {
        cy.contains('Sign In').click();

        cy.get('.modal-content').within(() => {
            cy.get('.btn-primary')
        })
    });

})
