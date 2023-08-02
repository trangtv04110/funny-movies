import React from "react";
import Loading from "./Loading";

describe("Loading should have label and class", () => {
  it("renders", () => {
    cy.mount(<Loading />);

    cy.get("div")
      .should("have.class", "flex")
      .should("have.class", "justify-center")
      .should("have.class", "items-center");
  });
});

describe("Loading should have svg", () => {
  it("renders", () => {
    cy.mount(<Loading />);

    cy.get("span").should("have.class", "sr-only");

    cy.get("svg").should("have.class", "w-8");
  });
});
