import { useState } from "react";
import { RAPID_API_KEY } from "../constants";
import { LoadState, WeatherData } from "../types";

const useGetWeather = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<LoadState>("idle");

  const getWeather = async (location: string) => {
    if (!location) return;
    setLoading("pending");
    setData(null);

    try {
      const response = await fetch(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": RAPID_API_KEY,
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw Error(data.message);
      }
      setData({
        location: {
          name: data.location.name,
          region: data.location.region,
          country: data.location.country,
          localtime: data.location.localtime,
        },
        current: {
          temp_c: data.current.temp_c,
          temp_f: data.current.temp_f,
          condition: {
            text: data.current.condition.text,
            icon: data.current.condition.icon,
          },
          feelslike_c: data.current.feelslike_c,
          feelslike_f: data.current.feelslike_f,
          wind_mph: data.current.wind_mph,
          wind_kph: data.current.wind_kph,
          wind_degree: data.current.wind_degree,
          wind_dir: data.current.wind_dir,
          last_updated: data.current.last_updated,
        },
      });
      setLoading("fulfilled");
    } catch (error: unknown) {
      console.error("Error fetching weather data:", error);
      setLoading("error");
    }
  };

  return { data, loading, getWeather };
};

export default useGetWeather;
