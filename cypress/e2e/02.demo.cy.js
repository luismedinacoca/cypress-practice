/*
installing libraries:
$ npm install -D cypress-xpath
$ npm install -D cypress-plugin-tab
*/

require("cypress-plugin-tab");
import "cypress-xpath";

let time = 1500;
describe("Primera Práctica", () => {
  it("Submit a form page", () => {
    cy.visit("https://rodrigovillanueva.com.mx/form/demo-application");
    cy.viewport(1900, 800);
    cy.title().should("eq", "Demo: Application | RodrigoVillanueva.com.mx");
    cy.xpath("//input[@id='edit-contact-name']").type("Luis Medina");
    cy.xpath("//input[@id='edit-contact-email']").type("Medina Coca");
    cy.xpath("//input[@id='edit-contact-phone']").type("+54 9 261 251 2542", {
      delay: 100,
    });
    cy.xpath("//input[@id='edit-contact-address']")
      .type("Huarpes 26347{backspace}{backspace}8, Godoy Cruz,,{backspace}", {
        delay: 100,
      })
      .type(" Mendoza - Argentina");
    cy.xpath("//input[@id='edit-contact-address-2']")
      .type("Segundo Textos")
      .type("{del}")
      .wait(1000)
      .type("Segundo Texto")
      .clear()
      .type("Nueva Dirección")
      .clear()
      .wait(1000)
      .type("Ciudad de Buenos Aires")
      .tab()
      .type("CABA");

    //campo select:
    cy.xpath("//select[contains(@id,'edit-contact-state-province')]")
      .select("Rhode Island")
      .wait(time);
    cy.xpath("//select[contains(@id,'edit-contact-country')]").select(
      "Cameroon"
    );

    //código:
    cy.xpath("//input[contains(@id,'edit-contact-postal-code')]")
      .type("5501")
      .wait(time);
    cy.xpath("//select[contains(@id, 'edit-contact-country')]")
      .select("Argentina")
      .wait(time);
    cy.xpath("//input[@id='edit-resume-method-paste']").click();
  });
});
