export interface Location {
    name: string;
    local_names?: { [key: string]: string };
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export interface Coordinates {
    latitude: Location['lat'],
    longitude: Location['lon'],
}

export interface Weather {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: CurrentWeather;
    minutely: MinutelyWeather[];
    hourly: HourlyWeather[];
    daily: DailyWeather[];
    alerts?: WeatherAlert[];
}

interface CurrentWeather {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: WeatherDescription[];
}

interface MinutelyWeather {
    dt: number;
    precipitation: number;
}

interface HourlyWeather {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: WeatherDescription[];
    pop: number;
}

interface DailyWeather {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    summary: string;
    temp: DailyTemperature;
    feels_like: DailyFeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: WeatherDescription[];
    clouds: number;
    pop: number;
    rain?: number;
    uvi: number;
}

interface DailyTemperature {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

interface DailyFeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

interface WeatherDescription {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface WeatherAlert {
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags: string[];
}
