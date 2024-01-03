import { mount } from '@cypress/angular';
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('mount', mount);