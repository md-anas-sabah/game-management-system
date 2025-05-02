import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Game Management API",
      version: "1.0.0",
      description: "API for managing game information",
    },
    servers: [
      {
        url: "https://game-management-system.onrender.com/",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
