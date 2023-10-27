import express from 'express';
import swaggerUi from 'swagger-ui-express';
// //import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDocument from '../swagger.json' assert { type: 'json' };
// // let swaggerDocument = require('../swagger.json') Cannot be used as "type": "module" in package.json

const swaggerRouter = new express.Router();

/*const options = {
    failOnErrors: true,
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'KeepTime API',
        description: 'API endpoints for KeepTime app',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
    apis: ['./src/server/routes/*.js'],
};*/

swaggerRouter.use('/api-docs', swaggerUi.serve);
swaggerRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));
// //const swaggerSpec = swaggerJsdoc(options);
// //swaggerRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerRouter;
