import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert { type: "json" };

const swaggerRouter = new express.Router();

swaggerRouter.use('/api-docs', swaggerUi.serve);
swaggerRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default swaggerRouter;
