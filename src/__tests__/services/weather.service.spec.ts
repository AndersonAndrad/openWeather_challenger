import {WeatherService} from "../../app/weather/weather.service";
import axios from "axios";
import {Wheater} from "../../core/interfaces/weather.interface";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("../../infra/logger.ts", () => {
    return {
        Logger: jest.fn().mockImplementation(() => ({
            info: jest.fn(),
            debug: jest.fn(),
            error: jest.fn(),
        })),
    };
});

describe(WeatherService.name, () => {
    let weatherService: WeatherService;

    beforeEach(async () => {
        weatherService = new WeatherService();

        jest.mock('axios');
    });

    it('should be defined', () => {
        expect(weatherService).toBeDefined();
    });

    it('should be return error when try search city without name', () => {
        expect(async () => await weatherService.retrieveCity('')).rejects.toMatchObject({message: 'City parameter is required'});
    });

    it('should call weather with correct  parameters', async () => {
        const cityName: string = 'london';
        const mockResponse: Partial<Wheater> = {
            location: {
                name: cityName,
                region: "",
                country: "",
                lat: 0,
                lon: 0,
                tz_id: "",
                localtime_epoch: 0,
                localtime: ""
            }
        }

        mockedAxios.get.mockResolvedValue({data: mockResponse});

        await weatherService.retrieveCity(cityName);

        expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
            params: {q: cityName, key: expect.any(String), days: 1},
        });
    });

    it('should be error when call weather with not exists city name parameters', async () => {
        const cityName: string = 'london';
        const mockResponse: Partial<Wheater> = {
            location: {
                name: cityName,
                region: "",
                country: "",
                lat: 0,
                lon: 0,
                tz_id: "",
                localtime_epoch: 0,
                localtime: ""
            }
        }

        mockedAxios.get.mockResolvedValue(mockResponse);

        expect(
            async () => await weatherService.retrieveCity(cityName))
            .rejects
            .toThrowError(`Not exists city with name: ${cityName}`
            )
    });
});