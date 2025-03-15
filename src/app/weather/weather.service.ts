import axios from "axios";
import {clearString} from "../../core/utils/str.utils";
import {Wheater} from "../../core/interfaces/weather.interface";

export class WeatherService {
    private readonly WEATHER_URL: string = process.env.WEATHER_URL ?? '';
    private readonly WEATHER_API_KEY: string = process.env.WEATHER_API_KEY ?? '';

    constructor() {
    }

    async retrieveCity(cityName: string): Promise<Wheater> {
        cityName = clearString(cityName);

        if (!cityName || !cityName.length) {
            console.log("No city name provided");
            throw new Error(`City parameter is required`);
        }

        const url: string = `${this.WEATHER_URL}/forecast.json`;

        try {
            console.log(`Searching for city ${cityName}`);

            const response = await axios.get<Wheater>(url, {
                params: {q: cityName, key: this.WEATHER_API_KEY, days: 1},
            });

            if (!response || !response.data) {
                const errorMessage: string = `Don't exists city with this name ${cityName}`;
                console.log(errorMessage);
                throw new Error(errorMessage);
            }

            return response.data;
        } catch (error) {
            const errorMessage: string = `Not exists city with name: ${cityName}`;
            console.log(`${(error as Error).message} - ${errorMessage}`);
            throw new Error(errorMessage);
        }
    }
}