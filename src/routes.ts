import express, {json, Router} from "express";
import { Logger } from "./infra/logger.ts";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import {swaggerDocs} from "./infra/swagger/swagger.config.js";
import cors from 'cors';

export class Routes {
    private readonly router: Router;
    private readonly json
    private readonly logger: Logger;

    constructor() {
        this.router = Router();
        this.json = json()

        this.logger = new Logger(Routes.name);
    }

    initializeRoutes(): void {
        this.router.use(this.json);
        this.router.use(cors())

        // @todo configure swagger documents
        // this.router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

        this.router.use('/', (_, response ) => {
            response.status(200).send(`Application is running...`);
        });
    }

    attachAppRoutes(app: express.Application){
        app.use('/api/v1', this.router);
        this.logger.debug("Routes initialized");
    }
}