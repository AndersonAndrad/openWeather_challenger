import path from 'path';
import { fileURLToPath } from 'url';
import swaggerJSDoc from "swagger-jsdoc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Open Weather API', version: '1.0.0' }
    },
    apis: [path.resolve(__dirname, '../../src/routes.ts')] // Fix the path here
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
