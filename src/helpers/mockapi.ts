import { WeatherData } from "../types";

export const noLocationFound = {
  code: 1006,
  message: "No matching location found.",
};

export const mockData: WeatherData = {
  location: {
    name: "San Diego",
    region: "California",
    country: "United States of America",
    localtime: "2024-06-18 15:38",
  },
  current: {
    last_updated: "2024-06-18 15:30",
    temp_c: 20.3,
    temp_f: 68.5,
    condition: {
      text: "Partly cloudy",
      icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
      code: 1003,
    },
    wind_mph: 11.9,
    wind_kph: 19.1,
    wind_degree: 230,
    wind_dir: "SW",
    feelslike_c: 20.3,
    feelslike_f: 68.5,
  },
};
