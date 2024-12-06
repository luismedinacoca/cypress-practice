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

describe.only("Session test and navigation in Swag Labs", () => {
  let sessionCookies;
  before(() => {
    cy.viewport(1900, 900);
    cy.intercept("https://298279967.log.optimizely.com/event*", {
      statusCode: 200,
      body: {},
    }).as("optimizely");
    cy.visit("https://www.saucedemo.com/v1/");

    cy.login("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");

    cy.getCookies().then((cookies) => {
      sessionCookies = cookies.filter((cookie) =>
        cookie.name.startsWith("session")
      );
    });

    // Asegurarse de que sessionCookies tiene valor
    cy.wrap(null).then(() => {
      expect(sessionCookies).to.not.be.undefined;
    });
  });

  it("Login and save session in Cookies", () => {
    sessionCookies.forEach((cookie) => {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        expiry: cookie.expiry,
      });
    });

    cy.visit("https://www.saucedemo.com/v1/inventory.html");

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

  it("Login and save session in Cookies", () => {
    sessionCookies.forEach((cookie) => {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        expiry: cookie.expiry,
      });
    });

    cy.visit("https://www.saucedemo.com/v1/inventory.html");
  });

  it("Login and save session in Cookies", () => {
    sessionCookies.forEach((cookie) => {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        expiry: cookie.expiry,
      });
    });

    cy.visit("https://www.saucedemo.com/v1/inventory.html");

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
  });
});
