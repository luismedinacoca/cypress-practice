/* 
$ npm install --save-dev @faker-js/faker
url: fakerjs.dev/api/
*/
require("cypress-plugin-tab");
import "cypress-xpath";
import { faker } from "@faker-js/faker";

let time = 1500;

describe("Faker function exercises", () => {
  it("Faker form page", () => {
    let fakeName = faker.internet.userName();
    let fakeEmail = faker.internet.email();
    let fakeTel = faker.phone.imei();

    cy.visit("https://rodrigovillanueva.com.mx/form/demo-application");
    cy.viewport(1900, 800);
    cy.title().should("eq", "Demo: Application | RodrigoVillanueva.com.mx");

    cy.xpath("//input[@id='edit-contact-name']").type(fakeName);
    cy.xpath("//input[@id='edit-contact-email']").type(fakeEmail).wait(time);
    cy.xpath("//input[@id='edit-contact-phone']").type(fakeTel, { delay: 100 });
  });

  it("Form faker with loop", () => {
    for (let x = 1; x <= 5; x++) {
      let fakeName = faker.internet.userName();
      let fakeEmail = faker.internet.email();
      let fakeTel = faker.phone.imei();

      cy.log("Repetition #" + x);
      cy.visit("https://rodrigovillanueva.com.mx/form/demo-application");
      cy.viewport(1900, 800);
      cy.title().should("eq", "Demo: Application | RodrigoVillanueva.com.mx");

      cy.xpath("//input[@id='edit-contact-name']").type(fakeName);
      cy.xpath("//input[@id='edit-contact-email']").type(fakeEmail).wait(time);
      cy.xpath("//input[@id='edit-contact-phone']").type(fakeTel, {
        delay: 100,
      });
    }
  });
});
