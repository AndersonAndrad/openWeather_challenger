import axios from "axios";
import {Logger} from "../../infra/logger.ts";
import {clearString} from "../../core/utils/str.utils.ts";

export class WeatherService {
    private readonly WEATHER_URL: string = process.env.WEATHER_URL ?? '';
    private readonly WEATHER_API_KEY: string = process.env.WEATHER_API_KEY ?? '';

    private readonly logger: Logger

    constructor() {
        this.logger = new Logger('WeatherService');
    }

    async retrieveCity(city: string): Promise<any> {
        city = clearString(city);

        if (!city || !city.length) {
            this.logger.error(`City parameter is required`);
            throw new Error(`City parameter is required`);
        }

        const url: string = `${this.WEATHER_URL}/forecast.json`;

        try {
            this.logger.debug(`Searching for city ${city}`);

            const response = await axios.get(url, {
                params: {q: city, key: this.WEATHER_API_KEY, days: 1},
            });

            if (!response || !response.data) {
                const errorMessage: string = `Don't exists city with this name ${city}`;
                this.logger.error(errorMessage);
                throw new Error(errorMessage);
            }

            return response.data;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}