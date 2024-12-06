require("cypress-plugin-tab");
import "cypress-xpath";
import { faker } from "@faker-js/faker";

let time = 2500;

describe("Json data examples", () => {
  it("Datos Json", () => {
    let counter = 0;

    cy.window().then((win) => {
      win.scrollBy(0, -1000);
    });

    cy.wait(time);

    cy.fixture("datos.json").then((data) => {
      data.forEach((row) => {
        cy.visit("https://rodrigovillanueva.com.mx/form/demo-application");
        cy.viewport(1900, 800);
        cy.title().should("eq", "Demo: Application | RodrigoVillanueva.com.mx");

        const id = row.id;
        const nombre = row.name;
        const email = row.email;
        const telefono = row.phone;

        cy.log("Repetition #" + id);
        cy.xpath("//input[@id='edit-contact-name']").type(nombre);
        cy.xpath("//input[@id='edit-contact-email']").type(email).wait(time);
        cy.xpath("//input[@id='edit-contact-phone']").type(telefono, {
          delay: 100,
        });
        cy.wait(time);
        counter++;
        cy.window().then((win) => {
          win.scrollBy(0, -400);
        });
        cy.wait(time);
        cy.log("Dato cargado: " + counter);
      });
    });
  });
});
