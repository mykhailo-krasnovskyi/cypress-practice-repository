import HomePage from "./HomePage";
import SignInForm from "../forms/SignInForm";

class GaragePage {

    get addNewCarButton() {
        return cy.get('.panel-page_heading button');
    }

    get brandDropdown() {
        return cy.get('#addCarBrand');
    }

    get modelDropdown() {
        return cy.get('#addCarModel');
    }

    get mileageField() {
        return cy.get('#addCarMileage');
    }

    get submitAddingCarButton() {
        return cy.get('app-add-car-modal .btn-primary');
    }

    get addedCars() {
        return cy.get('.car-list li');
    }

    get carNamesSelector() {
        return '.car_name';
    }

    openPage() {
        cy.visit('/panel/garage');
    }

    openPageAsLoggedUser() {
        HomePage.openPage();
        HomePage.openSignInForm();
        SignInForm.loginWithCredentials('michael.krasnovskyi+testUser1@gmail.com', 'ZSgeVQhuU3qkvlG');
    }

    addNewCarByBrandAndModel(brand, model) {
        this.addNewCarButton.click();
        this.brandDropdown.select(brand);
        this.modelDropdown.select(model);
        this.mileageField.type(999);
        this.submitAddingCarButton.click();
        this.submitAddingCarButton.should('not.be.visible');
    }

    verifyLastAddedCarByName(carName) {
        this.addedCars.eq(0).find(this.carNamesSelector).should('have.text', carName);

    }

    removeAllCars() {
        this.addedCars.each((car) => {
            cy.wrap(car).find('.icon-edit').click();
            cy.contains('Remove car').click();
            cy.get('.btn-danger').click();
        })
    }




}

export default new GaragePage();