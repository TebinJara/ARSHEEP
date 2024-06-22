// cypress/e2e/userInfo.cy.js

describe('UserInfo Component', () => {
    beforeEach(() => {
      // Definir los datos de prueba
      const user = {
        nombre_usuario: 'testuser',
        profile_image: '../img/testuser.png',
      };
      const empleado = {
        pnombre: 'Test',
        apaterno: 'User',
        amaterno: 'Example',
      };
      const tipoUsuario = {
        desc_tipo_usuario: 'Admin',
      };
      const rol = {
        desc_rol: 'Manager',
      };
  
      // Guardar los datos en localStorage antes de cada prueba
      localStorage.setItem('usuario', JSON.stringify(user));
      localStorage.setItem('empleado', JSON.stringify(empleado));
      localStorage.setItem('tipoUsuario', JSON.stringify(tipoUsuario));
      localStorage.setItem('rol', JSON.stringify(rol));
  
      // Visitar la página donde se monta el componente UserInfo
      cy.visit('/'); // Cambia esto si la página de UserInfo no está en la raíz
    });
  
    it('should display the correct user information', () => {
      // Esperar a que el componente UserInfo se monte
      cy.get('.user-info').should('exist');
  
      // Verificar que el tipo de usuario se muestra correctamente
      cy.get('.user-info p').first().should('contain', 'Admin');
  
      // Verificar que la imagen del usuario se muestra correctamente
      cy.get('.user-info-img img').should('have.attr', 'src', '../img/testuser.png');
  
      // Verificar que el nombre completo del empleado se muestra correctamente
      cy.get('.user-info p').eq(1).should('contain', 'Test User Example');
  
      // Verificar que el rol se muestra correctamente
      cy.get('.user-info p').last().should('contain', 'Manager');
    });
  
    afterEach(() => {
      // Limpiar localStorage después de cada prueba
      localStorage.clear();
    });
  });
  