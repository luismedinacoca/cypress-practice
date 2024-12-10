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

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe.only("Assertions validatio nwith .should() and .and()", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/v1/");
    cy.viewport(1900, 900);
  });

  it(".should() & .and() assertion examples", () => {
    //verifying an element visibility
    cy.xpath('//h4[contains(., "Accepted usernames are:")]')
      .should("be.visible")
      .and("contain", "Accepted usernames are:");

    //verifying enabled input and its value
    cy.xpath('//input[contains(@data-test, "username")]')
      .should("be.enabled")
      .and("have.value", "");

    //verifying an element has a CSS specific class and it's enable:
    cy.xpath('//input[contains(@data-test, "username")]')
      .should("have.class", "form_input")
      .and("be.enabled");

    //verifying an element does not have a CSS specific class and it's enable:
    cy.xpath('//input[contains(@data-test, "username")]')
      .should("not.have.class", "form_inn")
      .and("be.enabled");

    //verify an attribute and a specific class:
    cy.xpath('//input[contains(@data-test, "username")]')
      .should("exist")
      .should("have.attr", "placeholder");

    cy.xpath('//input[contains(@data-test, "username")]')
      .should("exist")
      .should("have.attr", "id");

    //Verify an element has a CSS class specific and does not contains a tex:
    cy.xpath('//input[contains(@data-test, "username")]')
      .should("have.class", "form_input")
      .and("not.contain", "Luiggie");

    //verify web page title
    cy.title().should("eq", "Swag Labs");

    cy.wait(5000);

    //verify start button in session is visible:
    cy.get(".btn_action").should("be.visible");

    //verify logo image is correctly uploaded:
    cy.get(".login_logo").should("be.visible").and("not.have.attr", "src");
    cy.wait(5000);
  });

  it(".should() & .and() assertion examples - part 02", () => {
    cy.xpath('//input[contains(@data-test, "username")]').type(
      "luiggie",
      "time:10000"
    );
    cy.xpath('//input[contains(@type, "password")]').type(
      "12345",
      "time:20000"
    );
    cy.get(".btn_action").should("be.visible").click({ time: 5000 });

    //verify error message is displayed after clicking on "login" button with wrong credentials:
    cy.get(".error-button").should("be.visible");
    cy.wait(4000);
  });

  it.only(".should() & .and() assertion examples - part 03", () => {
    cy.xpath('//input[contains(@data-test, "username")]').type(
      "standard_user",
      "time:5000"
    );

    cy.xpath('//input[contains(@type, "password")]').type(
      "secret_sauce",
      "time:5000"
    );

    cy.get(".btn_action").should("be.visible").click({ time: 5000 });

    //verify login is correct and valid credentials
    cy.url().should("include", "/inventory.html");

    //verify products are shown in Product page:
    cy.get(".inventory_item").should("have.length.greaterThan", 0);

    //verify adding a product to cart
    cy.get(".inventory_item:first-child .btn_primary").click();
    cy.get(".shopping_cart_badge").should("have.text", "1");

    //verify user can add a product into shopping cart:
    cy.get('.shopping_cart_link').click()

    //verify user can delete product from shopping cart:
    cy.get(".cart_item").should("have.length.greaterThan", 0);

    cy.xpath(
      '//div[@class="inventory_item_name"][contains(., "Sauce Labs Backpack")]'
    ).then(($product) => {
      const productTitle = $product.text();
      cy.log(productTitle);

      cy.xpath(
        '//button[@class="btn_secondary cart_button"][contains(., "REMOVE")]'
      ).click();

      cy.get(".cart_list").should("not.contain", productTitle);
    });
  });
});
