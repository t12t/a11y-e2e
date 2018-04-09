const url = 'https://www.w3.org/TR/wai-aria-practices-1.1/examples/disclosure/disclosure-faq.html'
const button = '.faq dt:first button';
const content = '.faq dd:first p';

describe('Collapsible', function() {
    beforeEach(function () {
      cy.visit(url);
    })

    it.only('should toggle content on click and set aria-expanded', function() {
      cy.get(button).click();
      cy.get(content).should('be.visible');

      cy.get(button).click();
      cy.get(content).should('not.be.visible');
    });

    it('should set aria-expanded to true/false', function() {
      cy.get(button).click();
      cy.get(button).should('have.attr', 'aria-expanded', 'true');

      cy.get(button).click();
      cy.get(button).should('have.attr', 'aria-expanded', 'false');
    });
  });