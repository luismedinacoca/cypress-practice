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

  it("Login and save session in Cookies", () => {
    cy.visit("https://www.saucedemo.com/v1/");
    cy.login("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");

    cy.getCookies().then((cookies) => {
      const sessionCookies = cookies.filter((cookie) =>
        cookie.name.startsWith("session")
      );
      sessionCookies.forEach((cookie) => {
        cy.setCookie(cookie.name, cookie.value);
      });
    });
  });

  it("Navigate to inventory page without login", () => {
    cy.setCookie("sessionCookieName", "valorDeLaCookie");
    cy.visit("https://www.saucedemo.com/v1/inventory.html");
    cy.url().should("include", "/inventory.html");
    cy.wait(4000);
  });

  it("Navigate to inventory page without login - Part 2", () => {
    cy.setCookie("sessionCookieName", "valorDeLaCookie");
    cy.visit("https://www.saucedemo.com/v1/inventory.html");
    cy.url().should("include", "/inventory.html");

    cy.xpath('(//button[contains(., "ADD TO CART")])[1]')
      .click({ time: 3000 })
      .wait(time);

    cy.xpath('(//button[contains(., "ADD TO CART")])[3]')
      .click({ time: 3000 })
      .wait(time);

    cy.get(".shopping_cart_link")
      .scrollIntoView()
      .click({ time: 3000 })
      .wait(time)
      .wait(time);

    cy.xpath('//a[@class="btn_secondary"][contains(., "Continue Shopping")]')
      .scrollIntoView()
      .click({ time: 3000 })
      .wait(time);
  });
});
