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

// Cypress.on("uncaught:exception", (err, runnable) => {
//   //avoid executions are stopped by exception
//   return false;
// });

describe("AInvoke functions", () => {
  beforeEach(() => {
    cy.viewport(1900, 900);

    //Intercept the GET log:  "/https:\/\/298279967\.log\.optimizely\.com\/event/"
    cy.intercept("https://298279967.log.optimizely.com/event*", {
      statusCode: 200,
      body: {},
    }).as("optimizely");
  });

  it("Invoke function removing an attribute", () => {
    cy.visit("https://the-internet.herokuapp.com/windows");
    cy.title().should("contain", "The Internet");
    scroll(0, 500, time);

    //using invoke calling:
    cy.get("#content a").invoke("removeAttr", "target").click({ time: 4000 });
    cy.title().should("contain", "New Window");
    cy.get("h3").should("have.text", "New Window");
  });

  it("Invoke function getting Attribute values", () => {
    cy.visit("https://the-internet.herokuapp.com/login");
    cy.title().should("include", "The Internet");

    cy.log('<input type="text" name="username" id="username">');
    cy.log('name="username"');
    cy.xpath('//input[@id="username"]').type("sqe_lmedinaQE_Panama").wait(1500);
    cy.xpath('//input[@id="username"]')
      .invoke("attr", "name")
      .should("equal", "username");

    cy.log('<input type="password" name="password" id="password">');
    cy.log('type="password"');
    cy.xpath('//input[@id="password"]').type("Wordpress123!").wait(1500);
    cy.xpath('//input[@id="password"]')
      .invoke("attr", "type")
      .should("equal", "password");
    cy.log('name="password"');
    cy.xpath('//input[@id="password"]')
      .invoke("attr", "name")
      .should("equal", "password");
  });

  it("Invoke function getting Text values", () => {
    cy.visit("https://the-internet.herokuapp.com/login");
    cy.title().should("include", "The Internet");

    scroll(0, -300, time);

    cy.xpath('//input[contains(@id, "username")]')
      .type("SQE_lmedina_QE")
      .wait(1500);

    //getting its value:
    cy.xpath('//input[contains(@id, "username")]')
      .invoke("val")
      .should("equal", "SQE_lmedina_QE");

    //getting its text:
    cy.get("h2").invoke("text").should("contain", "Login Page");
  });

  it("Invoke function changing field value", () => {
    cy.visit("https://the-internet.herokuapp.com/login");
    cy.title().should("include", "The Internet").wait(time);

    cy.xpath('//input[contains(@id, "username")]')
      .invoke("val", "Luis Medina Coca")
      .wait(time)
      .wait(time);

    cy.xpath('//input[contains(@id, "username")]')
      .clear()
      .type("luiggie")
      .wait(time);
  });

  it("Invoke function getting a text value", () => {
    cy.visit("https://the-internet.herokuapp.com/login");
    cy.title().should("include", "The Internet").wait(time);

    scroll(0, -500, time);

    cy.xpath('//h4[contains(@class, "subheader")]').scrollIntoView();
    cy.xpath('//h4[contains(@class, "subheader")]', { timeout: 5000 })
      .invoke("text")
      .then((text) => {
        cy.log("Text value is: " + text);
        console.log("Text value is: " + text + " 👈🏽");

        if (text.includes("tomsmith")) {
          cy.log("tomsmith was found in text");
        } else {
          cy.log("tomsmith was NOT found in text");
        }
      });
  });

  it("Trigger DOM event", () => {
    cy.visit("https://the-internet.herokuapp.com/login");
    cy.title().should("include", "The Internet").wait(time);

    scroll(0, -500, 1000);

    cy.get('input[id="username"]')
      .type("Luiggie")
      .wait(time)
      .then(() => {
        cy.get("body").invoke("attr", "style", "background-color: crimson");
      });

    const textField = cy.get('input[id="username"]');
    textField
      .clear()
      .type("Luis Medina")
      .wait(time)
      .wait(time)
      .then(() => {
        textField.invoke("attr", "style", "background-color: yellow");
      });

    cy.get("body").invoke("attr", "style", "background: #525B44").wait(time);
    cy.get("body").invoke("attr", "style", "background: #EFB6C8").wait(time);

    textField
      .clear()
      .type("SQE_lmedina_QE")
      .then(() => {
        textField
          .invoke("attr", "style", "background-color: #C6E7FF")
          .wait(time);
      })
      .wait(time);

    textField
      .clear()
      .type("Luiggie")
      .then(() => {
        textField.invoke("attr", "style", "display: none").wait(time);
      });

    const textPass = cy.xpath('//input[@id="password"]');
    textPass
      .clear()
      .type("123456")
      .then(() => {
        textPass.invoke("attr", "style", "display: none").wait(time);
      });

    // cy.reload();

    textField.invoke("attr", "style", "display: block").then(() => {
      textField.clear().type("Bruno").wait(time);
    });

    textPass.invoke("attr", "style", "display: block").then(() => {
      textPass.clear().type("Bruno").wait(time);
    });

    textField
      .clear()
      .type("Gaston")
      .wait(time)
      .then(() => {
        // textField.invoke("attr", "readonly", "readonly").wait(time);
        textField.invoke("attr", "style", "font-size: 2rem").wait(time);
      });

    textPass
      .clear()
      .type("otorrinolaringologo")
      .wait(time)
      .then(() => {
        // textPass.invoke("attr", "style", "display: block").wait(time);
        textPass.invoke("attr", "disabled", "disabled").wait(time);
      });

    textField
      .clear()
      .type("Aurelie")
      .wait(time)
      .then(() => {
        // textField.invoke("attr", "readonly", "readonly").wait(time);
        textField.invoke("attr", "style", "color: red").wait(time);
      });
  });
});
