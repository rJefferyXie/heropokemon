/// <reference types="cypress" />

describe('Loads Home Page', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should load the Kanto region.', () => {
    const container = cy.get('.Regions_container__bAZOy');
    container.contains('KANTO').and('be.visible');
  });

  it('Should load the Johto region.', () => {
    const container = cy.get('.Regions_container__bAZOy');
    container.contains('JOHTO').and('be.visible');
  });

  it('Should load the Hoenn region.', () => {
    const container = cy.get('.Regions_container__bAZOy');
    container.contains('HOENN').and('be.visible');
  });

  it('Should load the Sinnoh region.', () => {
    const container = cy.get('.Regions_container__bAZOy');
    container.contains('SINNOH').and('be.visible');
  });

  it('Should load the Unova region.', () => {
    const container = cy.get('.Regions_container__bAZOy');
    container.contains('UNOVA').and('be.visible');
  });

  it('Should load the Kalos region.', () => {
    const container = cy.get('.Regions_container__bAZOy');
    container.contains('KALOS').and('be.visible');
  });

  it('Should load the Alola region.', () => {
    const container = cy.get('.Regions_container__bAZOy');
    container.contains('ALOLA').and('be.visible');
  });
});

export {}