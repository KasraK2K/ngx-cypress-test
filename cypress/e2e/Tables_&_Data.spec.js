/// <reference types="cypress" />

import { navigateTo } from '../support/page_objects/navigationPage';

describe('Tables & Data test suite', () => {
  describe('Smart Table', () => {
    beforeEach(() => {
      navigateTo.tableData();
    });

    it('should get row by text', () => {
      cy.get('tbody')
        .contains('tr', 'Larry')
        .then((tableRow) => {
          cy.wrap(tableRow).find('.nb-edit').click();
          cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35');
          cy.wrap(tableRow).find('.nb-checkmark').click();
          cy.wrap(tableRow).find('td').eq(6).should('contain', '35');
        });
    });

    it('should get row by index', () => {
      cy.get('thead').find('.nb-plus').click();
      cy.get('thead tr')
        .eq(2)
        .then((tableRow) => {
          cy.wrap(tableRow).find('[placeholder="First Name"]').type('Kasra');
          cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Karami');
          cy.wrap(tableRow).find('.nb-checkmark').click();
        });
      cy.get('tbody tr')
        .first()
        .find('td')
        .then((tableColumns) => {
          cy.wrap(tableColumns).eq(2).should('contain', 'Kasra');
          cy.wrap(tableColumns).eq(3).should('contain', 'Karami');
        });
    });

    it('should filter rows by age', () => {
      const ages = ['20', '30', '40', '200'];
      cy.wrap(ages).each((age) => {
        cy.get('thead [placeholder="Age"]').clear().type(age);
        cy.wait(500);
        cy.get('tbody tr').each((tableRow) => {
          cy.wrap(tableRow)
            .find('td')
            .then((tableColumns) => {
              if (tableColumns.length > 1) cy.wrap(tableColumns).eq(6).should('contain', age);
              else cy.wrap(tableColumns).should('contain', 'No data found');
            });
        });
      });
    });

    it.only('should open browser dialog box', () => {
      // By default browser confirmation in cypress get true answer but we can stop it by sending false value if we want
      cy.on('window:confirm', () => false);

      // 1. Bad way to test browser confirmation
      cy.get('tbody tr').first().find('.nb-trash').click();
      cy.on('window:confirm', (confirm) => {
        expect(confirm).to.equal('Are you sure you want to delete?');
      });

      // 2. Better but Complicated way to test browser confirmation
      const stub = cy.stub();
      cy.on('window:confirm', stub);
      cy.get('tbody tr')
        .first()
        .find('.nb-trash')
        .click()
        .then((event) => {
          expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
        });
    });
  });
});
