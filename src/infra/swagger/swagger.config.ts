import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const APP_PORT = process.env.APP_PORT || 3000;

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Weather API",
            version: "1.0.0",
            description: "API documentation for the Weather service",
        },
        servers: [
            {
                url: `http://localhost:${APP_PORT}/api/v1`,
                description: "Local server",
            },
        ],
    },
    apis: ["src/routes.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export {swaggerDocs, swaggerUi};