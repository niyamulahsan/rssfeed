const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RSS News Feed",
      version: "1.0.0",
      description: "Node rss news feed",
      contact: {
        email: "niyamulahsan@gmail.com",
      },
    },
    basePath: "/",
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "jwt",
        },
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./src/modules/**/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);

module.exports = {
  swaggerServe: swaggerUI.serve,
  swaggerSetup: swaggerUI.setup(openapiSpecification, {
    swaggerOptions: {
      filter: true,
      docExpression: "list",
    },
  }),
};
