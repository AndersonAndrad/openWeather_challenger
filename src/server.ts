import express from 'express';
import dotenv from 'dotenv';
import { Routes } from "./routes.js";
import { Logger } from "./infra/logger.js";

dotenv.config();

class Server {
    private readonly expressInstance: express.Application;

    private readonly routes: Routes;

    private logger: Logger;

    constructor() {
        this.expressInstance = express();

        this.routes = new Routes();

        this.initializeRoutes();

        this.logger = new Logger(Server.name);
    }

    initializeServer(): void {
        const PORT: string = process.env.APP_PORT || '3000';
        this.expressInstance.listen(PORT, () => {
            this.logger.info(`Server listening on ${PORT}`);
        });
    }

    private initializeRoutes(): void {
        this.routes.initializeRoutes();
        this.routes.attachAppRoutes(this.expressInstance);
    }
}

const server = new Server();
server.initializeServer();
