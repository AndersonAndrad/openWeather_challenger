import axios from "axios";
import {Logger} from "../../infra/logger.ts";

export class WeatherService {
    private readonly WEATHER_URL: string = process.env.WEATHER_URL ?? '';
    private readonly WEATHER_API_KEY: string = process.env.WEATHER_API_KEY ?? '';

    private readonly logger: Logger

    constructor() {
        this.logger = new Logger('WeatherService');
    }

    async retrieveCity(city: string): Promise<any> {
        if (!city) {
            this.logger.error(`City parameter is required`);
            throw new Error(`City parameter is required`);
        }

        const url: string = `${this.WEATHER_URL}/direct?limit=5`;

        try {
            const response = await axios.get(url, {
                params: {q: city, appid: this.WEATHER_API_KEY, units: 'metric'},
            });

            return response.data;
        } catch (error) {
            this.logger.error(error);
            throw new error(`Failed to retrieve city: ${city}`);
        }
    }
}