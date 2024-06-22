describe('Crear Visita Tecnica', () => {
    beforeEach(() => {
      // Configurar datos de prueba en localStorage
      const empleados = [
        { id_empleado: 1, pnombre: 'Juan', apaterno: 'Perez', amaterno: 'Gomez' },
        { id_empleado: 2, pnombre: 'Ana', apaterno: 'Lopez', amaterno: 'Martinez' },
      ];
      const clientes = [
        { id_cliente: 1, nombre_cliente: 'Cliente 1' },
        { id_cliente: 2, nombre_cliente: 'Cliente 2' },
      ];
      const empresas = [
        { id_empresa: 1, nombre_empresa: 'Empresa 1' },
        { id_empresa: 2, nombre_empresa: 'Empresa 2' },
      ];
      const establecimientos = [
        { id_establecimiento: 1, nombre_establecimiento: 'Establecimiento 1' },
        { id_establecimiento: 2, nombre_establecimiento: 'Establecimiento 2' },
      ];
      const tipoMantenimiento = [
        { id_tipo_mantenimiento: 1, desc_tipo_mantenimiento: 'Preventivo' },
        { id_tipo_mantenimiento: 2, desc_tipo_mantenimiento: 'Correctivo' },
      ];
  
      cy.intercept('GET', '/api/empleados', empleados);
      cy.intercept('GET', '/api/clientes', clientes);
      cy.intercept('GET', '/api/empresas', empresas);
      cy.intercept('GET', '/api/establecimientos', establecimientos);
      cy.intercept('GET', '/api/tipoMantenimiento', tipoMantenimiento);
      cy.intercept('POST', '/api/visitastecnicas', { statusCode: 201, body: { success: true } });
  
      cy.visit('/crear-visita-tecnica'); // Cambia la URL si es diferente
    });
  
    it('should create a new visita tecnica', () => {
      // Verificar que el formulario se ha renderizado correctamente
      cy.get('form').should('exist');
  
      // Llenar el formulario
      cy.get('input[name="fec_programacion_vt"]').type('2023-12-31');
      cy.get('input[name="desc_vt"]').type('Revisión general');
      cy.get('select[name="id_tipo_mantenimiento"]').select('1');
      cy.get('select[name="id_empleado"]').select('1');
      cy.get('select[name="id_establecimiento"]').select('1');
  
      // Enviar el formulario
      cy.get('form').submit();
  
      // Verificar que la redirección ocurrió
      cy.url().should('include', '/Layout/VT'); // Cambia la URL según sea necesario
  
      // Verificar que se realizó la solicitud POST correctamente
      cy.wait('@createVisitaTecnica').its('response.statusCode').should('eq', 201);
    });
  });
  