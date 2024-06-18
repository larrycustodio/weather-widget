import React, { FormEvent, useState } from "react";
import "./App.css";
import useGetWeather from "./hooks/useGetWeather";

function App() {
  const [location, setLocation] = useState("");
  const { data, loading, getWeather } = useGetWeather();

  const submitLocation = (e: FormEvent) => {
    e.preventDefault();
    if (!location.length) return;

    getWeather(location);
  };
  return (
    <div className="App">
      <h1 id="app-header">Weather</h1>
      <form onSubmit={submitLocation}>
        <label htmlFor="location-input">Location</label>
        <input
          id="location-input"
          type="text"
          placeholder="Search for a location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit" disabled={!location.length}>
          Get Weather
        </button>
      </form>
      {loading === "pending" && <p>Loading...</p>}
      {loading === "error" && <p>Error!</p>}
      {loading === "fulfilled" && (
        <section>
          <div>
            <p>
              {data?.location.name}, {data?.location.region}
            </p>
            <p>{data?.current.temp_f} °F</p>
            <p>{data?.current.condition.text}</p>
            <p>
              {data?.current.wind_mph} mph {data?.current.wind_dir}
            </p>
          </div>
        </section>
      )}
      {/* 
            {weather && (
                <div id="results">
                    <p>Temperature: {weather.current.temp_c} °C</p>
                    <p>Condition: {weather.current.condition.text}</p>
                    <p>Wind: {weather.current.wind_kph} kph {weather.current.wind_dir}</p>
                </div>
            )} */}
    </div>
  );
}

export default App;
