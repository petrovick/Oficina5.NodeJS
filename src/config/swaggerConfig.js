export default {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: { title: 'Secured API', version: '1.0.0' },
    paths: {
      '/session': {
        post: {
          operationId: 'session',
          summary: 'Create Session',
          responses: { '200': { description: '200 response' } },
          parameters: [
            {
              email: 'input',
              description: 'Valid E-mail',
              in: 'body',
              type: 'input',
            },
            {
              name: 'text',
              description: 'Type your name',
              in: 'body',
              type: 'input',
            },
          ],
        },
      },
      '/users': {
        post: {
          operationId: 'users',
          summary: 'Create User',
          responses: { '200': { description: '200 response' } },
          parameters: [
            {
              email: 'text',
              description: 'Valid E-mail',
              in: 'body',
              type: 'string',
            },
            {
              name: 'text',
              description: 'Type your name',
              in: 'body',
              type: 'string',
            },
          ],
        },
      },
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: { type: 'apiKey', in: 'header', name: 'X-API-Key' },
      },
    },
    tags: [],
  },
  apis: ['./routes.js'], // Path to the API docs
};
