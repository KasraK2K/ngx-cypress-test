/// <reference types="cypress" />

describe('First test suite', () => {
    beforeEach(() => {
        if (!['Checkboxes'].includes(Cypress.currentTest.title)) {
            cy.visit('/');
            cy.contains('Forms').click();
            cy.contains('Form Layouts').click();
        }
    });

    it('first test', () => {
        cy.get('input');
    });

    it('second test', () => {
        cy.contains('Sign in');
        cy.contains('[status="warning"]', 'Sign in');
        cy.contains('nb-card', 'Horizontal form').find('button');
        cy.contains('nb-card', 'Horizontal form').contains('Sign in');
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click();
    });

    it('should save subject of the command', () => {
        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');

        // Cypress Alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid');
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password');

        // Cypress then() method
        cy.contains('nb-card', 'Using the Grid').then((usingTheGrid) => {
            cy.wrap(usingTheGrid).find('[for="inputEmail1"]').should('contain', 'Email');
            cy.wrap(usingTheGrid).find('[for="inputPassword2"]').should('contain', 'Password');
        });
    });

    it('extract text values', () => {
        // 1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');

        // 2
        cy.get('[for="exampleInputEmail1"]').then((label) => {
            const labelText = label.text();
            expect(labelText).to.equal('Email address');
            cy.wrap(labelText).should('contain', 'Email address');
        });

        // 3
        cy.get('[for="exampleInputEmail1"]')
            .invoke('text')
            .then((text) => {
                expect(text).to.equal('Email address');
            });
        cy.get('[for="exampleInputEmail1"]').as('labelText').should('contain', 'Email address');

        // 4
        cy.get('[for="exampleInputEmail1"]')
            .invoke('attr', 'class')
            .then((classValue) => {
                expect(classValue).to.equal('label');
            });

        // 5
        cy.get('#exampleInputEmail1').type('test@test.com');
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com');
    });

    it('Radio buttons', () => {
        cy.contains('nb-card', 'Using the Grid')
            .find('[type="radio"]')
            .then((radioButtons) => {
                cy.wrap(radioButtons).eq(0).check({ force: true }).should('be.checked');
                cy.wrap(radioButtons).eq(1).check({ force: true });
                cy.wrap(radioButtons).eq(0).should('not.be.checked');
                cy.wrap(radioButtons).eq(2).should('be.disabled');
            });
    });

    it.only('Checkboxes', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Toaster').click();

        cy.get('[type="checkbox"]').uncheck({ force: true });
        cy.get('[type="checkbox"]').eq(1).check({ force: true });
        cy.get('[type="checkbox"]').eq(0).click({ force: true });
    });
});
