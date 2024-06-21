describe('Basic Test', () => {
    it('should visit the homepage', () => {
      cy.visit('/');
      cy.contains('Welcome'); // Ajusta esto a algún texto que sabes que está en tu página de inicio
    });
  });
  