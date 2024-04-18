const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Pruebas de API', () => {
  describe('GET /cars', () => {
    it('Debería obtener una lista de coches', async () => {
      const res = await chai.request(app).get('/cars');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      
    });
  });

  describe('GET /reservations', () => {
    it('Debería obtener una lista de reservaciones', async () => {
      const res = await chai.request(app).get('/reservations');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      
    });})



    describe('Manejo de errores 404', () => {
      it('Debería devolver un mensaje de "Página no encontrada" para rutas no existentes', async () => {
        const res = await chai.request(app).get('/ruta-que-no-existe');
        expect(res).to.have.status(404);
        expect(res.text).to.include('Página no encontrada');
        
      });
    });


    describe('Documentación Swagger UI', () => {
      it('Debería devolver la interfaz de usuario de Swagger', async () => {
        const res = await chai.request(app).get('/api-docs');
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
        
        expect(res.text).to.include('<title>Swagger UI</title>');
        
      });
    });


    


  
});
