/// <reference types="cypress" />

describe('Loads all seven regions.', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should load the Kanto region.', () => {
    const container = cy.get('.Regions_container__bAZOy');
    container.contains('kanto').and('be.visible');
  });

  it('Should load the Johto region.', () => {
    const container = cy.get('.Regions_container__bAZOy');
    container.contains('johto').and('be.visible');
  });

  it('Should load the Hoenn region.', () => {
    const container = cy.get('.Regions_container__bAZOy');
    container.contains('hoenn').and('be.visible');
  });

  it('Should load the Sinnoh region.', () => {
    const container = cy.get('.Regions_container__bAZOy');
    container.contains('sinnoh').and('be.visible');
  });

  it('Should load the Unova region.', () => {
    const container = cy.get('.Regions_container__bAZOy');
    container.contains('unova').and('be.visible');
  });

  it('Should load the Kalos region.', () => {
    const container = cy.get('.Regions_container__bAZOy');
    container.contains('kalos').and('be.visible');
  });

  it('Should load the Alola region.', () => {
    const container = cy.get('.Regions_container__bAZOy');
    container.contains('alola').and('be.visible');
  });
});

export {}