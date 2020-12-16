const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants")

describe("Appointment", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    // reset db so we can run multiple tests w/o fail due to fully booked appointments
    cy.visit('/');
    cy.contains("Monday");
  })
  
  it("sould book an interview", () => {  
    cy.get(':nth-child(2) > .appointment__add > .appointment__add-button').click();

    cy.get('[data-testid=student-name-input]').type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("should edit an interview", () => {
    cy.get("[alt='Edit']").first().click({ force: true });
    // force the edit button to show itself

    cy.get('[data-testid=student-name-input]').clear().type("Lydia-Miller");
    cy.get(':nth-child(2) > .interviewers__item-image').click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia-Miller");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt='Delete']").first().click({ force: true });
    // force the delete button to show itself

    cy.get('.appointment__actions > :nth-child(2)').click();

    cy.contains("deleting").should("exist");
    cy.contains("deleting").should("not.exist");

    cy.contains('.appointment__card--show', "Archie Cohen").should("not.exist");
  });
  
})