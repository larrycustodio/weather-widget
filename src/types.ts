export type LoadState = "idle" | "pending" | "fulfilled" | "error";

type WeatherLocation = {
  name: string;
  region: string;
  country: string;
  localtime: string;
};

type WeatherCondition = {
  text: string;
  icon: string; // URL
};

type WeatherCurrent = {
  temp_c: number;
  temp_f: number;
  last_updated: string; // datestring
  condition: WeatherCondition;
  feelslike_c: number;
  feelslike_f: number;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
};

export type WeatherData = {
  location: WeatherLocation;
  current: WeatherCurrent;
};
