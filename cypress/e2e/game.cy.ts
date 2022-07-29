/// <reference types="cypress" />

describe('Loads all seven regions.', () => {
  before(() => {
    cy.visit('http://localhost:3000');

    // Go past the first time visit screen
    const pokemon = cy.get('.Hero_heroImage__WMtdF');
    pokemon.click();
    pokemon.click();
    pokemon.click();
  });

  it('Should allow you to play the Kanto region.', () => {
    // Open the first region preview (KANTO)
    cy.get('.Region_regionContainer__hMScl').eq(0).click();
    cy.get('.StarterCard_cardImage__KjOsL').eq(0).click();
    cy.get('.css-sghohy-MuiButtonBase-root-MuiButton-root').eq(1).should('be.visible').click();

    // Wait 1 minute for gameplay loop
    cy.wait(60000);

    // healing first pokemon

    // swapping second pokemon with first

    // purchasing an item (1)
    
    // purchasing an item (max amount)

    // purchasing an ability

    // using an item from item page

    // change floor
  });
});

export {}