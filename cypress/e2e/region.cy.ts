/// <reference types="cypress" />

describe('Loads all seven regions.', () => {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.window()
    .its("store")
    .invoke("getState")
  });

  it('Should load the first time visit screen.', () => {
    const pokemon = cy.get('.Hero_heroImage__WMtdF');
    pokemon.click();
    pokemon.click();
    pokemon.click();

    const container = cy.get('.Region_regionContainer__hMScl').first();

    container.should('be.visible').click({force: true});

    cy.window()
    .its("store")
    .invoke("getState")
  });
});

export {}


