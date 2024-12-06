/// <reference types="cypress"/>
// require(''cypress-plugin-tab);
// npm install -D cypress-xpath
import "cypress-xpath";
// import { faker } from '@faker-js/faker';
const XLSX = require("xlsx");
let time = 1000;

function scroll(x, y, t) {
  cy.window().then((win) => {
    win.scrollBy(x, y);
    cy.wait(t);
  });
}

describe("Action practice", () => {
  beforeEach(() => {
    cy.viewport(1900, 900);
  });

  it("Action - Simple Type", () => {
    // make interactions in form page
    //cy.get("one-trust-accept-btn-handler").click({time:100000});
    cy.visit("https://www.zoho.com/commerce/free-demo.html");
    cy.title().should("contains", "Zoho Commerce");
    scroll(0, -550, time);
    cy.wait(time);

    cy.xpath('//input[@id="zcf_reported_by"]')
      .type("Luiggie", { delay: 400 })
      .wait(1000);
    scroll(0, -550, time);
    cy.xpath('//input[@id="zcf_email"]').type("luismedinacoca@gmail.com");

    scroll(0, 5, time);

    cy.xpath('//select[@id="zcf_address_country"]').select("Mali").wait(time);
    cy.xpath('//select[@id="zcf_address_country"]').select("Iran").wait(time);
    cy.xpath('//select[@id="zcf_address_country"]')
      .select("Argentina")
      .wait(time);
  });

  it("Combobox 2", () => {
    scroll(0, -50, time);

    cy.visit("https://www.dummyticket.com/dummy-ticket-for-visa-application/");

    cy.xpath('//span[@title="Visa application"]').click({ time: 5000 });
    cy.xpath('//span[@class="select2-search select2-search--dropdown"]')
      .type("Other")
      .type("{enter}")
      .wait(time);
    scroll(0, -50, time);

    cy.get("#billing_country_field > span").click({ time: 400 });
    cy.xpath('//span[@class="select2-search select2-search--dropdown"]')
      .type("Argentina")
      .type("{enter}");
    scroll(0, -50, time);

    cy.get("#select2-billing_state-container span").click({ time: 400 });
    cy.xpath('//span[@class="select2-search select2-search--dropdown"]')
      .type("Mendoza")
      .type("{enter}");
    scroll(0, -50, time);
  });

  it("Searching from Google and select an outcome", () => {
    cy.visit("https://www.google.com");

    cy.xpath('//textarea[contains(@id, "APjFqb")]')
      .type("Cypress Automation")
      .wait(3000);

    cy.get(".wM6W7d > span").each(($el, index, $list) => {
      cy.log($el.text().trim());
      if ($el.text().trim() === "cypress automation framework") {
        cy.wrap($el).click({ timeout: 3000 });
      }
    });
  });
});
