// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("parseXlsx", (filePath) => {
  return cy.task("parseXlsx", { filePath: filePath });
});

let time = 1500;
Cypress.Commands.add("login", (username, password) => {
  cy.xpath('//input[@id="user-name"]').type(username).wait(time);
  cy.xpath('//input[@id="password"]').type(password).wait(time);
  cy.xpath('//input[@id="login-button"]').click();
});
