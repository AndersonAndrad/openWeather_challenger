import axios from "axios";
import {Logger} from "../../infra/logger.ts";
import {clearString} from "../../core/utils/str.utils.ts";
import {Wheater} from "../../core/interfaces/weather.interface.ts";

export class WeatherService {
    private readonly WEATHER_URL: string = process.env.WEATHER_URL ?? '';
    private readonly WEATHER_API_KEY: string = process.env.WEATHER_API_KEY ?? '';

    private readonly logger: Logger

    constructor() {
        this.logger = new Logger('WeatherService');
    }

    async retrieveCity(cityName: string): Promise<Wheater> {
        cityName = clearString(cityName);

        if (!cityName || !cityName.length) {
            this.logger.error(`City parameter is required`);
            throw new Error(`City parameter is required`);
        }

        const url: string = `${this.WEATHER_URL}/forecast.json`;

        try {
            this.logger.debug(`Searching for city ${cityName}`);

            const response = await axios.get<Wheater>(url, {
                params: {q: cityName, key: this.WEATHER_API_KEY, days: 1},
            });

            if (!response || !response.data) {
                const errorMessage: string = `Don't exists city with this name ${cityName}`;
                this.logger.error(errorMessage);
                throw new Error(errorMessage);
            }

            return response.data;
        } catch (error) {
            const errorMessage: string = `Not exists city with name: ${cityName}`;
            this.logger.error(`${error.message} - ${errorMessage}`);
            throw new Error(errorMessage);
        }
    }
}