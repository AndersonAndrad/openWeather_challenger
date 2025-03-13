import express, {json, Router} from "express";
import {Logger} from "./infra/logger.ts";
import cors from 'cors';
import {NextHandleFunction} from "connect";
import {WeatherService} from "./app/weather/weather.service.ts";
import {swaggerDocs, swaggerUi} from "./infra/swagger/swagger.config.ts";

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

        this.router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

        this.router.get('/', (_, response) => {
            response.status(200).send(`Application is running...`);
        });

        /**
         * @swagger
         * /weather:
         *   get:
         *     summary: Retrieve weather data for a city
         *     description: Fetches weather information based on a given city.
         *     parameters:
         *       - in: query
         *         name: city
         *         required: true
         *         schema:
         *           type: string
         *         description: Name of the city
         *     responses:
         *       200:
         *         description: Weather data returned successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *       404:
         *         description: City not found
         */
        this.router.get('/weather', async (req, res) => {
            try {
                const cityWeather = await weatherService.retrieveCity(String(req?.query?.city));

                res.status(200).json(cityWeather);
            } catch (error) {
                res.status(404).json({error: (error as Error).message || 'City not found'});
            }
        });
    }

    attachAppRoutes(app: express.Application) {
        app.use('/api/v1', this.router);
        this.logger.debug("Routes initialized");
    }
}