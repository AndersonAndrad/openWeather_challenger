import express from 'express';
import dotenv from 'dotenv';
import {Routes} from "./routes";

dotenv.config();

export class Server {
    private readonly expressInstance: express.Application;
    private readonly routes: Routes;

    constructor() {
        this.expressInstance = express();
        this.routes = new Routes();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    initializeServer(): void {
        const PORT = process.env.APP_PORT || '3000';

        this.expressInstance.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}/v1`);
        });
    }

    private initializeMiddlewares(): void {
        this.expressInstance.use(express.json());
    }

    private initializeRoutes(): void {
        this.routes.attachAppRoutes(this.expressInstance);
    }
}

const server = new Server();
server.initializeServer();