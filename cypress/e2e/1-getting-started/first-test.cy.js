describe('Rozetka Notebook Tests', () => {
  beforeEach(() => {
    cy.visit('https://rozetka.com.ua/ua/notebooks/c80004/');
  });

  it('displays available notebooks', () => {
    const newItem = 'Готовий до відправлення';
    cy.get('body').contains('ноутбуки').should('be.visible');

    cy.get('.goods-tile__title').contains('Acer').should('be.visible');
    cy.get('.goods-tile__title').contains('Lenovo').should('be.visible');
    cy.get('.goods-tile__availability')
      .should('contain.text', newItem)
      .and('be.visible');

    cy.get('.buy-button').eq(6).click(); // Click to add to cart

    // Check that the button changes state after adding to the cart
    cy.get('.buy-button', { timeout: 15000 })
      .eq(6)
      .should('have.class', 'buy-button_state_in_cart')
      .then(($btn) => {
        cy.log($btn.attr('class')); // Log the button's classes for debugging
      });
  });

  context('with a checked task', () => {
    beforeEach(() => {
      cy.contains('Додати до кошика')
        .parent()
        .find('button')
        .click(); // Click the add to cart button
    });

    it('can filter for uncompleted tasks', () => {
      cy.contains('Active').click();

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Оформити замовлення');

      cy.contains('Додати до кошика').should('not.exist');
    });

    it('can filter for completed tasks', () => {
      cy.contains('Completed').click();

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Додати до кошика');

      cy.contains('Walk the dog').should('not.exist');
    });

    it('can delete all completed tasks', () => {
      cy.contains('Clear completed').click();

      cy.get('.todo-list li')
        .should('have.length', 1)
        .should('not.have.text', 'Додати до кошика');

      cy.contains('Clear completed').should('not.exist');
    });
  });
});