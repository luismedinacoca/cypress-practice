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

describe.only("AInvoke functions", () => {
  beforeEach(() => {
    cy.viewport(1900, 900);

    //Intercept the GET log:  "/https:\/\/298279967\.log\.optimizely\.com\/event/"
    cy.intercept("https://298279967.log.optimizely.com/event*", {
      statusCode: 200,
      body: {},
    }).as("optimizely");
  });

  it("Login and save session", () => {
    cy.visit("https://www.saucedemo.com/v1/");

    // cy.xpath('//input[@id="user-name"]').type("standard_user").wait(time);
    // cy.xpath('//input[@id="password"]').type("secret_sauce").wait(time);
    // cy.xpath('//input[@id="login-button"]').click();
    cy.login("standard_user", "secret_sauce");

    //save session state in local storage:
    cy.window().then((win) => {
      const sessionData = {
        token: win.localStorage.getItem("token"), // get authorization token
        userId: win.localStorage.getItem("userId"), // get user ID
      };
      cy.wrap(sessionData).as("sessionData");
    });
  });
});

describe("Login session test", () => {
  it("Login session again", () => {
    cy.window().then((win) => {
      const sessionData = {
        token: win.localStorage.getItem("token"),
        userId: win.localStorage.getItem("userId"),
      };

      cy.wrap(sessionData).as("sessionData");
      cy.wait(time);

      cy.visit("https://www.saucedemo.com/v1/inventory.html");
      cy.wait(time);
    });
  });

  it("Doing some actions without login", () => {
    cy.visit("https://www.saucedemo.com/v1/inventory.html");

    cy.xpath('//div[@class="product_label"]').should("be.visible");
    cy.xpath('//div[@class="product_label"]').then((element) => {
      const text = element.text();
      cy.log(text);
    });

    // cy.xpath('//button[@class="btn_primary btn_inventory"]')
    cy.xpath('(//button[contains(., "ADD TO CART")])[1]')
      //   .eq(0)
      .click({ time: 3000 })
      .wait(time);
    // cy.xpath('//button[@class="btn_primary btn_inventory"]')
    cy.xpath('(//button[contains(., "ADD TO CART")])[3]')
      //   .eq(4)
      .click({ time: 3000 })
      .wait(time);

    cy.get(".shopping_cart_link")
      .scrollIntoView()
      .click({ time: 3000 })
      .wait(time)
      .wait(time);
  });

  it.only("Forth test without login session", () => {
    cy.visit("https://www.saucedemo.com/v1/inventory.html");

    cy.xpath('//div[@class="product_label"]').should("contain", "Products");

    cy.xpath('(//button[contains(@class, "inventory")])[5]')
      .click({ time: 4000 })
      .wait(time);
    cy.xpath('(//button[contains(@class, "inventory")])[6]')
      .click({ time: 4000 })
      .wait(time);

    cy.get(".shopping_cart_link")
      .scrollIntoView()
      .click({ time: 3000 })
      .wait(time)
      .wait(time)
      .wait(time);

    cy.xpath('//a[@class="btn_secondary"][contains(., "Continue Shopping")]')
      .scrollIntoView()
      .click({ time: 3000 })
      .wait(time);
  });
});
