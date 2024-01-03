import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
    indexHtmlFile: 'cypress/component-index.html',
    supportFile: 'cypress/support/index.js',
  },
});
