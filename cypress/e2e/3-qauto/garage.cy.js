/// <reference types="cypress" />
import SignInForm from "../../page-objects/forms/SignInForm";
import HomePage from "../../page-objects/pages/HomePage";
import GaragePage from "../../page-objects/pages/GaragePage";

describe('Garage', () => {
    const selectors = {
        addNewCarButton: '.panel-page_heading button',
        brandDropdown: '#addCarBrand',
        modelDropdown: '#addCarModel',
        mileageField: '#addCarMileage',
        submitAddingCarButton: 'app-add-car-modal .btn-primary',
        addedCars: '.car-list li',
    }

    beforeEach(() => {
        cy.visit('/');
        cy.login('michael.krasnovskyi+testUser1@gmail.com', 'ZSgeVQhuU3qkvlG');
    })

    it('Add [BMW] [X5]', () => {
        cy.get(selectors.addNewCarButton).click();
        cy.get(selectors.brandDropdown).select('BMW');
        cy.get(selectors.modelDropdown).select('X5');
        cy.get(selectors.mileageField).type(123);
        cy.get(selectors.submitAddingCarButton).click();

        cy.get(selectors.addedCars).eq(0).find('.car_name').should('have.text', 'BMW X5');

    });

    it('Add [Audi] [TT]', () => {
        cy.get(selectors.addNewCarButton).click();
        cy.get(selectors.brandDropdown).select('Audi');
        cy.get(selectors.modelDropdown).select('TT');
        cy.get(selectors.mileageField).type(123);
        cy.get(selectors.submitAddingCarButton).click();

        cy.get(selectors.addedCars).eq(0).find('.car_name').should('have.text', 'Audi TT');

    });

    it('Add [Porsche] [Panamera]', () => {
        cy.get(selectors.addNewCarButton).click();
        cy.get(selectors.brandDropdown).select('Porsche');
        cy.get(selectors.modelDropdown).select('Panamera');
        cy.get(selectors.mileageField).type(123);
        cy.get(selectors.submitAddingCarButton).click();

        cy.get(selectors.addedCars).eq(0).find('.car_name').should('have.text', 'Porsche Panamera');
    });

    it('Add [Ford] [Focus]', () => {

        cy.get(selectors.addNewCarButton).click();
        cy.get(selectors.brandDropdown).select('Ford');
        cy.get(selectors.modelDropdown).select('Focus');
        cy.get(selectors.mileageField).type(123);
        cy.get(selectors.submitAddingCarButton).click();

        cy.get(selectors.addedCars).eq(0).find('.car_name').should('have.text', 'Ford Focus');

    });

    it('Add [Fiat] [Panda]', () => {
        cy.get(selectors.addNewCarButton).click();
        cy.get(selectors.brandDropdown).select('Fiat');
        cy.get(selectors.modelDropdown).select('Panda');
        cy.get(selectors.mileageField).type(123);
        cy.get(selectors.submitAddingCarButton).click();

        cy.get(selectors.addedCars).eq(0).find('.car_name').should('have.text', 'Fiat Panda');
    });

    after(() => {
        cy.get(selectors.addedCars).each((car) => {
            cy.wrap(car).find('.icon-edit').click();
            cy.contains('Remove car').click();
            cy.get('.btn-danger').click();

        })
    })


})


describe.only('Garage with POM', () => {

    beforeEach(() => {
       GaragePage.openPageAsLoggedUser();
    })

    it.only('Add [BMW] [X5]', () => {
        GaragePage.addNewCarByBrandAndModel('BMW', 'X5')
        GaragePage.verifyLastAddedCarByName('BMW X5');
    });

    it('Add [Audi] [TT]', () => {
        GaragePage.addNewCarByBrandAndModel('Audi', 'TT')
        GaragePage.verifyLastAddedCarByName('Audi TT');
    });

    it('Add [Porsche] [Panamera]', () => {
        GaragePage.addNewCarByBrandAndModel('Porsche', 'Panamera')
        GaragePage.verifyLastAddedCarByName('Porsche Panamera');
    });

    it('Add [Ford] [Focus]', () => {
        GaragePage.addNewCarByBrandAndModel('Ford', 'Focus')
        GaragePage.verifyLastAddedCarByName('Ford Focus');
    });

    it('Add [Fiat] [Panda]', () => {
        GaragePage.addNewCarByBrandAndModel('Fiat', 'Panda')
        GaragePage.verifyLastAddedCarByName('Fiat Panda');
    });

    after(() => {
       GaragePage.removeAllCars();
    })


})
