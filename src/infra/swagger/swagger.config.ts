import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions:  swaggerJSDoc.Options = {
    definition: {
        info: {title: 'Open weather api', version: '1.0.0'},
        openAPI: '3.0.0'
    },
    apis: ['./src/routes/*.ts']
}

export const swaggerDocs = swaggerJSDoc(swaggerOptions);