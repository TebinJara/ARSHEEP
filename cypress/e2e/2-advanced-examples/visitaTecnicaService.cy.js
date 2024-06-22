

describe('Visita Tecnica Service', () => {
    it('should fetch all visitas tecnicas', () => {
      cy.intercept('GET','http://localhost:3001/api/visitastecnicas', (req) => {
        console.log('Intercepting request to /api/visitastecnicas');
        req.reply({
          fixture: 'visitasTecnicas.json',
        });
      }).as('getVisitasTecnicas');
  
      cy.visit('/'); // Asegúrate de visitar la página donde se realiza la solicitud
  
      // Añade aserciones o acciones adicionales aquí, por ejemplo:
      cy.wait('@getVisitasTecnicas').its('response.statusCode').should('eq', 200);
    });
  });
  