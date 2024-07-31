/// <reference types="cypress" />

import { navigateTo } from '../support/page_objects/navigationPage';

describe('Modal & Overlays test suite', () => {
  describe('Toaster', () => {
    beforeEach(() => {
      cy.visit('/');
      navigateTo.modalOverlays();
    });

    it('Checkboxes', () => {
      cy.get('[type="checkbox"]').uncheck({ force: true });
      cy.get('[type="checkbox"]').eq(1).check({ force: true });
      cy.get('[type="checkbox"]').eq(0).click({ force: true });
    });
  });

  describe('Tooltip', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.contains('Modal & Overlays').click();
      cy.contains('Tooltip').click();
    });

    it('should open tooltip on click', () => {
      cy.contains('nb-card', 'Colored Tooltips').contains('Default').click();
      cy.get('nb-tooltip').should('contain', 'This is a tooltip');
    });
  });
});
