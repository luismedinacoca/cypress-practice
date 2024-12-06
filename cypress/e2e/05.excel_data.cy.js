/*
$ npm install node-xlsx --save

add info:
https://dev.to/aswani25/how-to-read-and-write-from-excel-files-in-cypress-352h
*/
const XLSX = require("xlsx");

require("cypress-plugin-tab");
import "cypress-xpath";
import { faker } from "@faker-js/faker";

let time = 2000;

describe("Excel data examples", () => {
  beforeEach(() => {
    cy.visit("https://rodrigovillanueva.com.mx/form/demo-application");
    cy.viewport(1900, 800);
    cy.title().should("eq", "Demo: Application | RodrigoVillanueva.com.mx");
  });

  it("normal Login", () => {
    cy.parseXlsx("cypress/fixtures/data.xlsx").then((excelData) => {
      const rowCount = Cypress.$(excelData[0].data).length;

      for (let i = 1; i < rowCount; i++) {
        cy.log("--- row #" + i + " ----");
        cy.window().then((win) => {
          win.scrollBy(0, -500);
        });
        cy.wait(time);

        let row = excelData[0].data[i];

        // const id = row[0];
        // const name = row[1]; // name column value
        // const email = row[2]; // email column value
        // const phone = row[3]; // phone column value

        // cy.xpath("//input[@id='edit-contact-name']").type(name);
        // cy.xpath("//input[@id='edit-contact-email']").type(email);
        // cy.xpath("//input[@id='edit-contact-phone']").type(phone);

        const id = row[0] ? row[0].toString() : "";
        const name = row[1] ? row[1].toString() : "";
        const email = row[2] ? row[2].toString() : "";
        const phone = row[3] ? row[3].toString() : "";

        cy.xpath("//input[@id='edit-contact-name']").clear().type(name);
        cy.xpath("//input[@id='edit-contact-email']").clear().type(email);
        cy.xpath("//input[@id='edit-contact-phone']").clear().type(phone);

        cy.window().then((win) => {
          win.scrollBy(0, -500);
        });
        cy.log("Iteration #" + i);
        cy.wait(time);
      }
    });
  });
});
