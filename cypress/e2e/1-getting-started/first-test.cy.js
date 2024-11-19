describe('Rozetka Notebook Tests', () => {
  const notebookPageUrl = 'https://rozetka.com.ua/ua/notebooks/c80004/';
  const availabilityText = 'Готовий до відправлення';
  const notebookTitles = ['Acer', 'Lenovo'];
  
  beforeEach(() => {
    cy.visit(notebookPageUrl);
  });

  it('displays available notebooks and allows adding to cart', () => {
    // Check if the "ноутбуки" section is visible
    cy.contains('body', 'ноутбуки').should('be.visible');

    // Check if Acer and Lenovo notebooks are listed
    notebookTitles.forEach((brand) => {
      cy.get('.goods-tile__title').contains(brand).should('be.visible');
    });

    // Check availability status and that the item can be added to the cart
    cy.get('.goods-tile__availability')
      .should('contain.text', availabilityText)
      .and('be.visible');

    // Add the 7th notebook to the cart and check button state
    cy.scrollTo('top');
    cy.get('.buy-button')
      .eq(6)
      .trigger('mouseover')
      .should('be.visible')
      .click({ force: true });

    // Verify the button state after adding to cart
    cy.get('.buy-button', { timeout: 15000 })
      .eq(0)
      .should('have.class', 'goods-tile__price.price--red.ng-star-inserted > rz-buy-button > button')
      .then(($btn) => {
        cy.log($btn.attr('class'));
      });
  });

  context('with a full cart', () => {
    beforeEach(() => {
      // Add the first notebook to the cart
      cy.get('.goods-tile__inner')
        .first()
        .find('.buy-button')
        .click({ force: true });
    });

    it('verifies that an item is added to the cart and submits the order', () => {
      // Verify that the cart icon is updated and visible
      cy.get('rz-icon-badge')
        .should('have.attr', 'rz-icon-badge')
        .and('be.visible');
    
      // Click the "Оформити замовлення" (Submit Order) button
      cy.contains('Оформити замовлення')
      .trigger(mouseover)
      .click();
    
      // Submit the order by clicking the "Submit Order" button
      cy.get('.cart-footer')
        .find('a[data-testid="cart-receipt-submit-order"]')
        .click();
    });
  });
  
});