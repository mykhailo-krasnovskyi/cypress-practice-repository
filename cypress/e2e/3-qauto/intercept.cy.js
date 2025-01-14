/// <reference types="cypress" />
import HomePage from "../../page-objects/pages/HomePage";
import SignInForm from "../../page-objects/forms/SignInForm";

describe('Intercept', () => {

    beforeEach(() => {
        HomePage.openPage();
        HomePage.openSignInForm();

    })


    it('Mock cars list', () => {


        const carsBody = {
            "status": "ok",
            "data": [
                {
                    "id": 231439,
                    "carBrandId": 1,
                    "carModelId": 3,
                    "initialMileage": 555,
                    "updatedMileageAt": "2025-01-13T19:01:18.000Z",
                    "carCreatedAt": "2025-01-13T19:01:18.000Z",
                    "mileage": 555,
                    "brand": "Audi",
                    "model": "Q7",
                    "logo": "opel.png"
                },
                {
                    "id": 231438,
                    "carBrandId": 1,
                    "carModelId": 3,
                    "initialMileage": 555,
                    "updatedMileageAt": "2025-01-13T19:01:05.000Z",
                    "carCreatedAt": "2025-01-13T19:01:05.000Z",
                    "mileage": 555,
                    "brand": "Audi",
                    "model": "Q7",
                    "logo": "audi.png"
                },
            ]
        }
        //   cy.intercept('**/cars', carsBody);
        cy.intercept('POST', '**/cars', {
            statusCode: 501,
            // body: {
            //     name: 'Peter Pan',
            // },
        });

        SignInForm.loginWithCredentials('michael.krasnovskyi+testUser1@gmail.com', 'ZSgeVQhuU3qkvlG');
        cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');
        cy.get('.car').should('have.length.at.least', 2);
    });

})