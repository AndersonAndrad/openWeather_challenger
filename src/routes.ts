import express, {json, Router} from "express";
import {Logger} from "./infra/logger.ts";
import cors from 'cors';
import {NextHandleFunction} from "connect";
import {WeatherService} from "./app/weather/weather.service.ts";

export class Routes {
    private readonly router: Router;
    private readonly json: NextHandleFunction
    private readonly logger: Logger;

    constructor() {
        this.router = Router();
        this.json = json()

        this.logger = new Logger(Routes.name);
    }

    initializeRoutes(): void {
        this.router.use(this.json);
        this.router.use(cors())

        const weatherService = new WeatherService();

        // @todo configure swagger documents
        // this.router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
        this.router.get('/', (_, response) => {
            response.status(200).send(`Application is running...`);
        });

        this.router.get('/weather', async (req, res) => {
            try {
                const cityWeather = await weatherService.retrieveCity(String(req?.query?.city));

                res.status(200).json(cityWeather);
            } catch (error) {
                res.status(404).json({error: error?.message || 'City not found'});
            }
        });
    }

    attachAppRoutes(app: express.Application) {
        app.use('/api/v1', this.router);
        this.logger.debug("Routes initialized");
    }
}