import { SapphireSearchFieldModule } from "./search-field.module";
import { FormsModule } from "@angular/forms";

const example = /* HTML */ ` <sp-search-field>
  <input
    spSearchFieldInput
    [(ngModel)]="value"
    aria-label="Search"
    placeholder="Search"
    (spSearchFieldSubmitted)="onSubmit($event)"
  />
</sp-search-field>`;

describe("SearchField", () => {
  it("clears the input when Escape is pressed", () => {
    cy.mount(example, {
      imports: [SapphireSearchFieldModule, FormsModule],
    });
    cy.get("input").type("search query");
    cy.realPress("Escape");
    cy.get("input").should("have.value", "");
  });

  it("submits the search when Enter is pressed", () => {
    const onSubmit = cy.stub();
    cy.mount(example, {
      componentProperties: { onSubmit },
      imports: [SapphireSearchFieldModule, FormsModule],
    });
    cy.get("input").type("s");
    cy.realPress("Enter");
    cy.wrap(onSubmit).should("be.calledOnceWith", "s");
  });

  it("clears the input when clear button is pressed", () => {
    cy.mount(example, {
      imports: [SapphireSearchFieldModule, FormsModule],
    });
    cy.get("input").type("search query");
    cy.findByRole("button").click();
    cy.get("input").should("have.value", "");
  });

  it("sets the expected aria-label on the clear button", () => {
    cy.mount(example, {
      imports: [SapphireSearchFieldModule, FormsModule],
    });
    cy.get("input").type("search query");
    cy.findByRole("button", { name: "Clear search" });
  });

  it("focuses the input when the box (including the search icon) is clicked", () => {
    cy.mount(example, {
      imports: [SapphireSearchFieldModule, FormsModule],
    });
    cy.root().realClick({ x: 8, y: 15 });
    cy.get("input").should("be.focused").blur();
    cy.root().realClick({ x: 18, y: 15 });
    cy.get("input").should("be.focused").blur();
    cy.root().realClick({ x: 290, y: 15 });
    cy.get("input").should("be.focused");
  });
});
