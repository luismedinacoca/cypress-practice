/// <reference types="cypress"/>
// require(''cypress-plugin-tab);
// npm install -D cypress-xpath
import "cypress-xpath";
// import { faker } from '@faker-js/faker';
const XLSX = require("xlsx");
let time = 1500;

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
    cy.visit("https://practice-automation.com/form-fields/");
    cy.title().should("contains", "Form Fields");
    scroll(0, -250, time);
    cy.wait(time);

    cy.xpath('//input[@name="name-input"]').should("be.visible");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("Luiggie");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').should("have.value", "Luiggie");
  });

  it("Actions - Special Characters type", () => {
    cy.visit("https://practice-automation.com/form-fields/");
    cy.title().should("contains", "Form Fields");
    scroll(0, -250, time);
    cy.wait(time);

    cy.xpath('//input[@name="name-input"]').should("be.visible");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("Luiggie");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').should("have.value", "Luiggie");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("{leftArrow}");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("{rightArrow}");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("{upArrow}");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("{downArrow}");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("{del}{selectall}{backspace}");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("Luis Medina");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').should("have.value", "Luis Medina");
  });

  it("Actions - Modification Key type", () => {
    cy.visit("https://practice-automation.com/form-fields/");
    cy.title().should("contains", "Form Fields");
    scroll(0, -250, time);
    cy.wait(time);

    cy.xpath('//input[@name="name-input"]').should("be.visible");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("Luiggie");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').should("have.value", "Luiggie");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("{alt}{option}");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("{ctrl}{control}");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("{meta}{command}{cmd}");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("{shift}");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("{del}{selectall}{backspace}");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("Luis Medina");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').should("have.value", "Luis Medina");
  });

  it("Actions - Delay type", () => {
    cy.visit("https://practice-automation.com/form-fields/");
    cy.title().should("contains", "Form Fields");
    scroll(0, -250, time);
    cy.wait(time);

    cy.xpath('//input[@name="name-input"]').should("be.visible");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("Luiggie", { delay: 300 });
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').should("have.value", "Luiggie");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("{del}{selectall}{backspace}");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("Luis Medina", {
      delay: 1000,
    });
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').should("have.value", "Luis Medina");
  });

  it("Actions - Visible or Disable types", () => {
    cy.visit("https://practice-automation.com/form-fields/");
    cy.title().should("contains", "Form Fields");
    scroll(0, -250, time);
    cy.wait(time);

    cy.xpath('//input[@name="name-input"]').should("be.visible");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("Luiggie"),
      { delay: 500 },
      { force: true };
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').should("have.value", "Luiggie");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("{del}{selectall}{backspace}");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("Luis Medina");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').should("have.value", "Luis Medina");
  });

  it("Actions - Focus", () => {
    cy.visit("https://practice-automation.com/form-fields/");
    cy.title().should("contains", "Form Fields");
    scroll(0, -250, time);
    cy.wait(time);

    cy.xpath('//input[@name="name-input"]').should("be.visible");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').focus();
    cy.wait(time);
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("Luiggie", { delay: 300 }),
      { delay: 500 },
      { force: true };
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').should("have.value", "Luiggie");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').clear();
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').type("Luis Medina");
    cy.wait(time);
    cy.xpath('//input[@name="name-input"]').should("have.value", "Luis Medina");
  });
});
