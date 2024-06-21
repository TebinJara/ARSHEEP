// cypress/e2e/login.cy.js

describe('Login Component', () => {
    beforeEach(() => {
      cy.visit('/'); // Cambia esto si la página de inicio de sesión no está en la raíz
    });
  
    it('should allow a user to login successfully', () => {
      cy.intercept('POST', '/api/auth/login', {
        statusCode: 200,
        body: {
          token: 'fakeToken',
          user: { name: 'testuser' },
          empleado: {},
          tipoDeUsuario: {},
          rol: {},
          departamento: {},
        },
      }).as('postLogin');
  
      // Rellena el formulario y envíalo
      cy.get('input#username').type('testuser');
      cy.get('input#password').type('password123');
      cy.get('button[type="submit"]').click();
  
      // Espera a que la solicitud de inicio de sesión se complete y verifica la respuesta
      cy.wait('@postLogin').its('response.statusCode').should('eq', 200);
  
      // Verifica que el token se haya guardado en localStorage
      cy.window().then((window) => {
        expect(window.localStorage.getItem('token')).to.eq('fakeToken');
      });
    });
  
    it('should show an error message on login failure', () => {
      cy.intercept('POST', '/api/auth/login', {
        statusCode: 401,
        body: {
          message: 'Invalid credentials',
        },
      }).as('postLogin');
  
      // Rellena el formulario con credenciales incorrectas y envíalo
      cy.get('input#username').type('wronguser');
      cy.get('input#password').type('wrongpassword');
      cy.get('button[type="submit"]').click();
  
      // Espera a que la solicitud de inicio de sesión se complete y verifica la respuesta
      cy.wait('@postLogin').its('response.statusCode').should('eq', 401);
  
      // Verifica que se muestre el mensaje de error
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Usuario o contraseña incorrectos');
      });
    });
  });
  