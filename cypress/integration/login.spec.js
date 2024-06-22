describe('Login Page', () => {
    it('should allow a user to log in', () => {
      cy.visit('/login'); // Asegúrate de que esta ruta es correcta para tu aplicación
  
      cy.get('input[name=username]').type('testuser');
      cy.get('input[name=password]').type('password');
      cy.get('button[type=submit]').click();
  
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome, testuser');
    });
  });
  