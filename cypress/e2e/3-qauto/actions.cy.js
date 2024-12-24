/// <reference types="cypress" />

describe('Actions', () => {

    beforeEach(() => {
        // cy.visit('/');
    })

    it('click', () => {
        cy.get('a').click({ force: true });
    });

    it('clear', () => {
        cy.contains('Sign In').click();
        cy.get('#signinEmail').type('12345');
        cy.get('#signinEmail').clear();
        cy.get('#signinEmail').type('678910');
    });

    it('select', () => {
        cy.visit('https://practice.expandtesting.com/dropdown');
        cy.get('#dropdown').select('Option 2');
        cy.get('#country').select('AL');
        // cy.get('#country').select(2);
        cy.get('#country').should('have.value', 'AL')

    });


    it('select custom', () => {
        cy.visit('http://127.0.0.1:5500/dropdown.html');
        cy.get('#customDropdown').click();
        cy.get('[data-value="2"]').click();
        cy.get('.dropdown-toggle').should('have.text', 'Option 2')
    });

    it('checkboxes', () => {
        cy.visit('https://practice.expandtesting.com/checkboxes');
        cy.get('#checkbox1').check();
        cy.wait(3000);
        cy.get('[type="checkbox"]').uncheck();
        cy.get('[type="checkbox"]').check();
        cy.get('#checkbox1').should('be.checked');
        cy.get('#checkbox2').should('be.checked');

    });

    it('radio', () => {
        cy.visit('https://practice.expandtesting.com/radio-buttons');
        cy.get('#black').check();
        cy.wait(2000);
        cy.get('#red').check();
        cy.get('#red').should('be.checked');

    });

    it('scroll', () => {
        cy.visit('/');
        cy.get('.icon-instagram').scrollIntoView();

    });


    it('focus', () => {
        cy.visit('/');
        cy.contains('Sign In').click();
        cy.get('#signinEmail').focus();
        cy.get('#signinPassword').focus();
    });

    it('blur', () => {
        cy.visit('/');
        cy.contains('Sign In').click();
        cy.get('#signinEmail').focus();
        cy.get('#signinEmail').blur();
    });

    it('submit', () => {
        cy.visit('https://practice.expandtesting.com/forgot-password');
        cy.get('form').submit();
        cy.contains('Please enter a valid email address.').should('be.visible');
    });

    it('file uploading', () => {
        cy.visit('https://practice.expandtesting.com/upload');
        cy.get('[data-testid="file-input"]').selectFile('./test1.txt')
        cy.contains('Upload').click();
        cy.contains('File Uploaded!').should('be.visible');
    });

    it('write in file', () => {
        cy.writeFile('./test.txt', 'Hello World') // запис тексту 'Hello world' у файл message.txt
    });

    it('chaining', () => {
        cy.visit('/');
        cy.contains('Sign In').click();
        // cy.get('#signinEmail').focus();
        // cy.get('#signinEmail').blur();
        // cy.get('#signinEmail').type('fasfsafas');
        // cy.get('#signinEmail').should('be.visible');


        cy.get('#signinEmail')
            .click()
            .focus()
            .blur()
            .type('asgsagasg')
            .should('be.visible')
            .and('exist');

    });


    it.only('custom commands', () => {
        cy.visit('/');
        const randomEmail = `michael.krasnovskyi+${Date.now()}@gmail.com`
        cy.login(randomEmail, 'ZSgeVQhuU3qkvlG');

    })

})
