import express, {Router} from "express";
import cors from 'cors';
import {WeatherService} from "./app/weather/weather.service";
import {swaggerDocs, swaggerUi} from "./infra/swagger/swagger.config";

export class Routes {
    private readonly router: Router;

    constructor() {
        this.router = Router();
    }

    attachAppRoutes(app: express.Application): void {
        this.initializeRoutes();
        app.use('/v1', this.router);
        console.log('Routes initialized ✅');
    }

    private initializeRoutes(): void {
        this.router.use(express.json());
        this.router.use(cors());

        const weatherService = new WeatherService();

        this.router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

        this.router.get('/', (_, res) => {
            res.status(200).send('Application is running...');
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
}