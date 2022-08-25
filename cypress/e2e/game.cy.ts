/// <reference types="cypress" />

describe('Testing the whole game including all items, buttons, and abilities.', () => {
  before(() => {
    cy.visit('http://localhost:3000');

    // Go past the first time visit screen
    const pokemon = cy.get('.Hero_heroImage__WMtdF');
    pokemon.click();
    pokemon.click();
    pokemon.click();

    // Play the game in the first region (KANTO)
    cy.get('.Region_regionContainer__hMScl').eq(0).click();
    cy.get('.StarterCard_cardImage__KjOsL').eq(0).click();
    cy.get('.css-sghohy-MuiButtonBase-root-MuiButton-root').eq(1).should('be.visible').click();

    // Wait for page to redirect
    cy.wait(1500);
  });

  describe('A full playthrough of the Kanto region.', () => {
    it('Modify currency and bonus points to test the shop and abilities.', () => {
      cy.window().its('store').invoke('dispatch', { type: 'SET_CURRENCY', payload: 99999 });
      cy.window().its('store').invoke('dispatch', { type: 'SET_BONUS_POINTS', payload: 99999 });
      cy.window().its('store').invoke('dispatch', { type: 'SET_HIGHEST_FLOOR', payload: 4 });    
      cy.window().its('store').invoke('dispatch', { type: 'SET_CURRENT_FLOOR', payload: 5 });
      cy.wait(100);
      cy.window().its('store').invoke('dispatch', { type: 'SET_CURRENT_FLOOR', payload: 1 });    
    });

    it('Healing the first pokemon.', () => {
      cy.get('.TeamCard_healButton__0RzWX').eq(0).click();
      cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('potion1').its('quantity').should('deep.equal', 9);
    });

    describe('Purchasing every item.', () => {
      it('Buying a normal potion.', () => {
        cy.get('.Options_option__h4v8l').eq(2).click();
        cy.get('.Shop_shopItem__lOEka').eq(0).click();
        cy.get('.Shop_incButton__o1XKN').click();
        cy.get('.Shop_confirmButton__9H_wv').click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('potion1').its('quantity').should('deep.equal', 10);
      });

      it('Buying a super potion.', () => {
        cy.get('.Shop_shopItem__lOEka').eq(1).click();
        cy.get('.Shop_incButton__o1XKN').click();
        cy.get('.Shop_confirmButton__9H_wv').click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('potion2').its('quantity').should('deep.equal', 1);
      });

      it('Buying a hyper potion.', () => {
        cy.get('.Shop_shopItem__lOEka').eq(2).click();
        cy.get('.Shop_incButton__o1XKN').click();
        cy.get('.Shop_confirmButton__9H_wv').click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('potion3').its('quantity').should('deep.equal', 1);
      });

      it('Buying a max potion.', () => {
        cy.get('.Shop_shopItem__lOEka').eq(3).click();
        cy.get('.Shop_incButton__o1XKN').click();
        cy.get('.Shop_confirmButton__9H_wv').click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('potion4').its('quantity').should('deep.equal', 1);
      });

      it('Buying a HP up.', () => {
        cy.get('.Shop_shopItem__lOEka').eq(4).click();
        cy.get('.Shop_incButton__o1XKN').click();
        cy.get('.Shop_confirmButton__9H_wv').click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('hp').its('quantity').should('deep.equal', 1);
      });

      it('Buying a protein.', () => {
        cy.get('.Shop_shopItem__lOEka').eq(5).click();
        cy.get('.Shop_incButton__o1XKN').click();
        cy.get('.Shop_confirmButton__9H_wv').click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('protein').its('quantity').should('deep.equal', 1);
      });

      it('Buying a iron.', () => {
        cy.get('.Shop_shopItem__lOEka').eq(6).click();
        cy.get('.Shop_incButton__o1XKN').click();
        cy.get('.Shop_confirmButton__9H_wv').click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('iron').its('quantity').should('deep.equal', 1);
      });

      it('Buying a calcium.', () => {
        cy.get('.Shop_shopItem__lOEka').eq(7).click();
        cy.get('.Shop_incButton__o1XKN').click();
        cy.get('.Shop_confirmButton__9H_wv').click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('calcium').its('quantity').should('deep.equal', 1);
      });

      it('Buying a zinc.', () => {
        cy.get('.Shop_shopItem__lOEka').eq(8).click();
        cy.get('.Shop_incButton__o1XKN').click();
        cy.get('.Shop_confirmButton__9H_wv').click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('zinc').its('quantity').should('deep.equal', 1);
      });

      it('Buying a carbos.', () => {
        cy.get('.Shop_shopItem__lOEka').eq(9).click();
        cy.get('.Shop_incButton__o1XKN').click();
        cy.get('.Shop_confirmButton__9H_wv').click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('carbos').its('quantity').should('deep.equal', 1);
      });

      it('Buying a rare candy.', () => {
        cy.get('.Shop_shopItem__lOEka').eq(10).click();
        cy.get('.Shop_incButton__o1XKN').click();
        cy.get('.Shop_confirmButton__9H_wv').click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('rareCandy').its('quantity').should('deep.equal', 1);
      });
    });

    describe('Using every item.', () => {
      it('Using a normal potion.', () => {
        cy.get('.Options_option__h4v8l').eq(2).click();
        cy.get('.Items_item__EBWHc').eq(0).click();
        cy.get('.PokemonPreview_containerItem__TMOMh').eq(0).click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('potion1').its('quantity').should('deep.equal', 9);
        cy.get('.Items_exitButton__5S7p3').eq(0).click();
      });

      it('Using a super potion.', () => {
        cy.get('.Items_item__EBWHc').eq(1).click();
        cy.get('.PokemonPreview_containerItem__TMOMh').eq(0).click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('potion2').its('quantity').should('deep.equal', 0);
        cy.get('.Items_exitButton__5S7p3').eq(0).click();
      });

      it('Using a hyper potion.', () => {
        cy.get('.Items_item__EBWHc').eq(1).click();
        cy.get('.PokemonPreview_containerItem__TMOMh').eq(0).click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('potion3').its('quantity').should('deep.equal', 0);
        cy.get('.Items_exitButton__5S7p3').eq(0).click();
      });

      it('Using a max potion.', () => {
        cy.get('.Items_item__EBWHc').eq(1).click();
        cy.get('.PokemonPreview_containerItem__TMOMh').eq(0).click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('potion4').its('quantity').should('deep.equal', 0);
        cy.get('.Items_exitButton__5S7p3').eq(0).click();
      });

      it('Using a HP up.', () => {
        cy.get('.Items_item__EBWHc').eq(1).click();
        cy.get('.PokemonPreview_containerItem__TMOMh').eq(0).click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('hp').its('quantity').should('deep.equal', 0);
        cy.get('.Items_exitButton__5S7p3').eq(0).click();
      });

      it('Using a protein.', () => {
        cy.get('.Items_item__EBWHc').eq(1).click();
        cy.get('.PokemonPreview_containerItem__TMOMh').eq(0).click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('protein').its('quantity').should('deep.equal', 0);
        cy.get('.Items_exitButton__5S7p3').eq(0).click();
      });

      it('Using a iron.', () => {
        cy.get('.Items_item__EBWHc').eq(1).click();
        cy.get('.PokemonPreview_containerItem__TMOMh').eq(0).click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('iron').its('quantity').should('deep.equal', 0);
        cy.get('.Items_exitButton__5S7p3').eq(0).click();
      });

      it('Using a calcium.', () => {
        cy.get('.Items_item__EBWHc').eq(1).click();
        cy.get('.PokemonPreview_containerItem__TMOMh').eq(0).click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('calcium').its('quantity').should('deep.equal', 0);
        cy.get('.Items_exitButton__5S7p3').eq(0).click();
      });

      it('Using a zinc.', () => {
        cy.get('.Items_item__EBWHc').eq(1).click();
        cy.get('.PokemonPreview_containerItem__TMOMh').eq(0).click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('zinc').its('quantity').should('deep.equal', 0);
        cy.get('.Items_exitButton__5S7p3').eq(0).click();
      });

      it('Using a carbos.', () => {
        cy.get('.Items_item__EBWHc').eq(1).click();
        cy.get('.PokemonPreview_containerItem__TMOMh').eq(0).click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('carbos').its('quantity').should('deep.equal', 0);
        cy.get('.Items_exitButton__5S7p3').eq(0).click();
      });

      it('Using a rare candy.', () => {
        cy.get('.Items_item__EBWHc').eq(1).click();
        cy.get('.PokemonPreview_containerItem__TMOMh').eq(0).click();
        cy.window().its('store').invoke('getState').its('itemReducer').its('items').its('rareCandy').its('quantity').should('deep.equal', 0);
        cy.get('.Items_exitButton__5S7p3').eq(0).click();
      });
    });

    describe('Purchasing every ability.', () => {
      it('Buying Regeneration.', () => {
        cy.get('.Options_option__h4v8l').eq(3).click();
        cy.get('.Bonuses_ability__QY6P3').eq(0).click();
        cy.get('.Bonuses_confirmButton__t5m2y').eq(0).click();
        cy.window().its('store').invoke('getState').its('bonusReducer').its('bonuses').its('regeneration').its('level').should('deep.equal', 1);
      });

      it('Buying Kind Soul.', () => {
        cy.get('.Bonuses_ability__QY6P3').eq(1).click();
        cy.get('.Bonuses_confirmButton__t5m2y').eq(0).click();
        cy.window().its('store').invoke('getState').its('bonusReducer').its('bonuses').its('kindSoul').its('level').should('deep.equal', 1);
      });

      it('Buying Vigor.', () => {
        cy.get('.Bonuses_ability__QY6P3').eq(2).click();
        cy.get('.Bonuses_confirmButton__t5m2y').eq(0).click();
        cy.window().its('store').invoke('getState').its('bonusReducer').its('bonuses').its('vigor').its('level').should('deep.equal', 1);
      });

      it('Buying Strong Style.', () => {
        cy.get('.Bonuses_ability__QY6P3').eq(3).click();
        cy.get('.Bonuses_confirmButton__t5m2y').eq(0).click();
        cy.window().its('store').invoke('getState').its('bonusReducer').its('bonuses').its('strongStyle').its('level').should('deep.equal', 1);
      });

      it('Buying Fortune.', () => {
        cy.get('.Bonuses_ability__QY6P3').eq(4).click();
        cy.get('.Bonuses_confirmButton__t5m2y').eq(0).click();
        cy.window().its('store').invoke('getState').its('bonusReducer').its('bonuses').its('fortune').its('level').should('deep.equal', 1);
      });

      it('Buying Swapper.', () => {
        cy.get('.Bonuses_ability__QY6P3').eq(5).click();
        cy.get('.Bonuses_confirmButton__t5m2y').eq(0).click();
        cy.window().its('store').invoke('getState').its('bonusReducer').its('bonuses').its('swapper').its('unlocked').should('deep.equal', true);
      });

      it('Buying Healer.', () => {
        cy.get('.Bonuses_ability__QY6P3').eq(6).click();
        cy.get('.Bonuses_confirmButton__t5m2y').eq(0).click();
        cy.window().its('store').invoke('getState').its('bonusReducer').its('bonuses').its('healer').its('unlocked').should('deep.equal', true);
      });
    });

    describe('Swapping pokemon on your team.', () => {
      it('Swapping the second pokemon on your team with the first one.', () => {
        cy.get('.Options_option__h4v8l').eq(0).click();
        cy.get('.TeamCard_pokemonName__nzyn0').eq(1).invoke('text').then((pokemonName) => {
          cy.get('.TeamCard_swapButton__itTHd').eq(0).click();
          cy.get('.TeamCard_pokemonName__nzyn0').eq(0).invoke('text').should('deep.equal', pokemonName);
        });
      });
    });
  });
});

export {}