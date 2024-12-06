describe("Primera Práctica", () => {
  it("Login Incorrecto", () => {
    cy.visit("https://www.saucedemo.com/v1/");
    cy.viewport(1900, 800);
    // cy.wait(3000);
    // cy.viewport(500, 500);
    // cy.wait(3000);
    cy.title().should("eq", "Swag Labs");
    cy.get("#user-name").type("Luis Medina");
    cy.wait(2000);
    cy.get("#password").type("luiggie!1407");
    cy.get("#login-button").click();
    cy.wait(3000);
  });

  it("Login Correcto", () => {
    cy.visit("https://www.saucedemo.com/v1/");
    cy.viewport(1900, 800);
    cy.get("#user-name").type("standard_user");
    cy.wait(2000);
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.wait(2000);

    cy.get(".app_logo").should("be.visible");
    cy.get(".product_label").should("have.text", "Products");
    cy.wait(2000);
  });

  it("Submit a form page", () => {
    cy.visit("https://rodrigovillanueva.com.mx/form/demo-application");
  });
});
