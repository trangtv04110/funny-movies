import React from "react";
import Button from "./Button";

describe("Button should have label and class", () => {
  it("renders", () => {
    cy.mount(<Button label="Login" />);

    cy.get("button")
      .contains("Login")
      .should("have.class", "bg-sky-500")
      .should("have.class", "shadow-md");
  });
});

describe("Button should have loading", () => {
  it("renders", () => {
    cy.mount(<Button label="Login" isLoading />);

    cy.get("button").should("contain.html", "svg");
  });
});
