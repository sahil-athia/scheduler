const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants")

describe("Navigation", () => {
  
  it("should visit root", () => {
    cy.visit('/');
  });

  it("should navigate to tuesday", () => {
    cy.visit('/');
    cy.get('ul > :nth-child(2)')
      .click()
      .should("have.class", "day-list__item--selected");
  });

})