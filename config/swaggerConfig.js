const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'CarlosReting API',
      version: '1.0.0',
      description: 'Documentación de CarlosReting API',
    },
  },
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;
