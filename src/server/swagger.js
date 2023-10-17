import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'KeepTime API',
    description: 'API endpoints for KeepTime app. Note: Endpoints marked with a lock icon require a login to save auth info in cookies.'
  },
  host: 'localhost:3001'
};

const outputFile = './swagger.json';
const routes = ['./server.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);