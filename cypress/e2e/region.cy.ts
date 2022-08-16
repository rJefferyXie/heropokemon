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

  it('Should allow the user to select all three starters on all seven regions.', () => {
    // Open the first region preview (KANTO)
    cy.get('.Region_regionContainer__hMScl').eq(0).click();
    cy.get('.StarterCard_cardImage__KjOsL').eq(0).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'bulbasaur');
    cy.get('.StarterCard_cardImage__KjOsL').eq(1).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'charmander');
    cy.get('.StarterCard_cardImage__KjOsL').eq(2).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'squirtle');
    cy.get('.css-sghohy-MuiButtonBase-root-MuiButton-root').eq(0).should('be.visible').click();

    // Open the second region preview (JOHTO)
    cy.get('.Region_regionContainerLocked__UwKr4').eq(0).click();
    cy.get('.StarterCard_cardImage__KjOsL').eq(0).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'chikorita');
    cy.get('.StarterCard_cardImage__KjOsL').eq(1).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'cyndaquil');
    cy.get('.StarterCard_cardImage__KjOsL').eq(2).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'totodile');
    cy.get('.css-sghohy-MuiButtonBase-root-MuiButton-root').eq(0).should('be.visible').click();

    // Open the third region preview (HOENN)
    cy.get('.Region_regionContainerLocked__UwKr4').eq(1).click();
    cy.get('.StarterCard_cardImage__KjOsL').eq(0).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'treecko');
    cy.get('.StarterCard_cardImage__KjOsL').eq(1).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'torchic');
    cy.get('.StarterCard_cardImage__KjOsL').eq(2).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'mudkip');
    cy.get('.css-sghohy-MuiButtonBase-root-MuiButton-root').eq(0).should('be.visible').click();

    // Open the fourth region preview (SINNOH)
    cy.get('.Region_regionContainerLocked__UwKr4').eq(2).click();
    cy.get('.StarterCard_cardImage__KjOsL').eq(0).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'turtwig');
    cy.get('.StarterCard_cardImage__KjOsL').eq(1).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'chimchar');
    cy.get('.StarterCard_cardImage__KjOsL').eq(2).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'piplup');
    cy.get('.css-sghohy-MuiButtonBase-root-MuiButton-root').eq(0).should('be.visible').click();

    // Open the fifth region preview (UNOVA)
    cy.get('.Region_regionContainerLocked__UwKr4').eq(3).click();
    cy.get('.StarterCard_cardImage__KjOsL').eq(0).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'snivy');
    cy.get('.StarterCard_cardImage__KjOsL').eq(1).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'tepig');
    cy.get('.StarterCard_cardImage__KjOsL').eq(2).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'oshawott');
    cy.get('.css-sghohy-MuiButtonBase-root-MuiButton-root').eq(0).should('be.visible').click();

    // Open the sixth region preview (KALOS)
    cy.get('.Region_regionContainerLocked__UwKr4').eq(4).click();
    cy.get('.StarterCard_cardImage__KjOsL').eq(0).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'chespin');
    cy.get('.StarterCard_cardImage__KjOsL').eq(1).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'fennekin');
    cy.get('.StarterCard_cardImage__KjOsL').eq(2).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'froakie');
    cy.get('.css-sghohy-MuiButtonBase-root-MuiButton-root').eq(0).should('be.visible').click();

    // Open the seventh region preview (ALOLA)
    cy.get('.Region_regionContainerLocked__UwKr4').eq(5).click();
    cy.get('.StarterCard_cardImage__KjOsL').eq(0).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'rowlet');
    cy.get('.StarterCard_cardImage__KjOsL').eq(1).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'litten');
    cy.get('.StarterCard_cardImage__KjOsL').eq(2).click();
    cy.get('.RegionPreview_selectedPokemonName__IZVoe').should('have.text', 'popplio');

    // Try to unlock the alola region with 0 unlock points
    cy.get('.css-sghohy-MuiButtonBase-root-MuiButton-root').eq(1).should('be.visible').click();
    cy.get('.css-cpgvjg-MuiSnackbar-root').should('have.text',
     'You cannot unlock any more regions at this moment. Keep playing to unlock more!DISMISS');
  });
});

export {}