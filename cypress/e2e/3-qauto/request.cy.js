/// <reference types="cypress" />
import carBrands from '../../fixtures/brands.json'
import carModels from '../../fixtures/models.json'

describe('Public Request', () => {

    it('Get all brands [/api/cars/brands]', () => {
        cy.request('GET', '/api/cars/brands')
            .then((response) => {
                cy.log(JSON.stringify(response.body.data));
                const firstBrand = response.body.data[0];
                expect(response.body.data.length).to.eq(5);
                expect(firstBrand.title).to.eq('Audi');
            })

    });

    it('Get specific brand by id [/api/cars/brands/{id}] 1', () => {
        cy.request('GET', '/api/cars/brands/2')
            .then((response) => {
                cy.log(JSON.stringify(response.body.data));
                const brandTitle = response.body.data.title;
                expect(brandTitle).to.eq('BMW');
                // expect(response.body.data.length).to.eq(5);
                // expect(firstBrand.title).to.eq('Audi');
            })

    });

    it('Get specific brand by id [/api/cars/brands/{id}] 2', () => {

        cy.request('GET', '/api/cars/brands')
            .then((response) => {
                cy.log(JSON.stringify(response.body.data));
                const firstBrandId = response.body.data[0].id;
                cy.request('GET', `/api/cars/brands/${firstBrandId}`)
                    .then((response) => {
                        const brandTitle = response.body.data.title;
                        expect(brandTitle).to.eq('Audi');
                    })
            })
    });

    it('Get all models [/api/cars/models]', () => {
        cy.request('GET', '/api/cars/models')
            .then((response) => {
                cy.wrap(response.body.data.length).should('be.greaterThan', 20);
            })
    });

    it('Get specific model [/api/cars/models/{id}]', () => {
        cy.request('GET', '/api/cars/models/3').its('status').should('eq', 200);
    });



    it.skip('Get user cars [/api/cars]', () => {
        cy.request('GET', '/api/cars').then((response) => {
            cy.log(response);
        })
    });

})
it('Get token #1 [/api/auth/signin]', () => {
    cy.request('POST', '/api/auth/signin', {
        email: 'michael.krasnovskyi+testUser1@gmail.com',
        password: 'ZSgeVQhuU3qkvlG',
    }).then((response) => {
        const cookie = response.headers['set-cookie'][0];
        const sid = cookie.split(';')[0].split('=')[1];
        cy.log(sid);

        cy.request({
            method: 'GET',
            url: '/api/cars',
            headers: {
                Cookie: `sid=${sid}`,
            },
        }).then((response) => {
            cy.log(JSON.stringify(response.body.data));
        });
    })
});

describe('Private Request', () => {
    let globalSid;

    before(() => {
        cy.request('POST', '/api/auth/signin', {
            email: 'michael.krasnovskyi+testUser1@gmail.com',
            password: 'ZSgeVQhuU3qkvlG',
        }).then((response) => {
            const cookie = response.headers['set-cookie'][0];
            const sid = cookie.split(';')[0].split('=')[1];
            globalSid = sid;

        })

    })

    it('Get user cars 1 [/api/cars]', () => {
        cy.request({
            method: 'GET',
            url: '/api/cars',
            headers: {
                Cookie: `sid=${globalSid}`,
            },
        }).then((response) => {
            cy.log(JSON.stringify(response.body.data));
        });
    });

    it('Get user cars 2 [/api/cars]', () => {
        cy.request({
            method: 'GET',
            url: '/api/cars',
            headers: {
                Cookie: `sid=${globalSid}`,
            },
        }).then((response) => {
            cy.log(JSON.stringify(response.body.data));
        });
    });

    it('Get user cars 3 [/api/cars]', () => {
        cy.request({
            method: 'GET',
            url: '/api/cars',
            headers: {
                Cookie: `sid=${globalSid}`,
            },
        }).then((response) => {
            cy.log(JSON.stringify(response.body.data));
        });
    });

    describe('Adding cars', () => {
        it('Add a new Car (Audi TT) [/api/cars]', () => {
            cy.request({
                method: 'POST',
                url: '/api/cars',
                headers: {
                    Cookie: `sid=${globalSid}`,
                },
                body: {
                    "carBrandId": carBrands.data[0].id,
                    "carModelId": carModels.data[0].id,
                    "mileage": 122
                }
            }).then((response) => {
                expect(response.body.data.brand).eq(carBrands.data[0].title);
                expect(response.body.data.model).eq(carModels.data[0].title);

            });
        });

        it('Add a new Car (BMW X6) [/api/cars]', () => {
            cy.request({
                method: 'POST',
                url: '/api/cars',
                headers: {
                    Cookie: `sid=${globalSid}`,
                },
                body: {
                    "carBrandId": carBrands.data[1].id,
                    "carModelId": carModels.data[8].id,
                    "mileage": 122
                }
            }).then((response) => {
                expect(response.body.data.brand).eq(carBrands.data[1].title);
                expect(response.body.data.model).eq(carModels.data[8].title);
            });
        });


        it('Add a new Car (Ford Fiesta) [/api/cars]', () => {
            cy.request({
                method: 'POST',
                url: '/api/cars',
                headers: {
                    Cookie: `sid=${globalSid}`,
                },
                body: {
                    "carBrandId": carBrands.data[2].id,
                    "carModelId": carModels.data[10].id,
                    "mileage": 122
                }
            }).then((response) => {
                expect(response.body.data.brand).eq(carBrands.data[2].title);
                expect(response.body.data.model).eq(carModels.data[10].title);
            });
        });


        after(() => {
            cy.request({
                method: 'GET',
                url: '/api/cars',
                headers: {
                    Cookie: `sid=${globalSid}`,
                },
            }).then((response) => {
                const allCars = response.body.data;
                allCars.forEach((car) => {
                    cy.request({
                        method: 'DELETE',
                        url: `/api/cars/${car.id}`,
                        headers: {
                            Cookie: `sid=${globalSid}`,
                        },
                    }).then((response) => {
                        expect(response.status).eq(200);
                    })
                })
            });
        })

    })

})



it.only('cypress-api plugin', () => {
    cy.api('GET', '/api/cars/models')
        .then((response) => {
            cy.wrap(response.body.data.length).should('be.greaterThan', 20);
        })
});

