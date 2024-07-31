function selectGroupMenuItem(groupName) {
  cy.contains('a', groupName).then((menu) => {
    cy.wrap(menu)
      .find('.expand-state g g')
      .invoke('attr', 'data-name')
      .then((attr) => {
        if (attr.includes('left')) {
          cy.wrap(menu).click();
        }
      });
  });
}

class NavigationPage {
  forms() {
    selectGroupMenuItem('FormForms');
    cy.contains('Form Layouts').click();
  }

  modalOverlays() {
    selectGroupMenuItem('Modal & Overlays');
    cy.contains('Toaster').click();
  }

  tableData() {
    selectGroupMenuItem('Tables & Data');
    cy.contains('Smart Table').click();
  }
}

export const navigateTo = new NavigationPage();
