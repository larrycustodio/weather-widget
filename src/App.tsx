import React, { FormEvent, useState } from "react";
import "./App.css";
import useGetWeather from "./hooks/useGetWeather";
import search from "./icons/search.svg";
import spinner from "./icons/spinner.svg";
import locationPin from "./icons/location.svg";
import arrowUp from "./icons/arrow-up.svg";

function App() {
  const [location, setLocation] = useState("");
  const { data, loading, getWeather } = useGetWeather();

  const submitLocation = (e: FormEvent) => {
    e.preventDefault();
    if (!location.length) return;

    getWeather(location);
  };
  return (
    <div className="app">
      <h1 className="header">Weather</h1>
      <form className="location-form" onSubmit={submitLocation}>
        <label htmlFor="location-input" className="sr-only">
          Location
        </label>
        <button
          className="search-button"
          type="submit"
          disabled={!location.length}
          aria-label="Get Weather"
        >
          {loading === "pending" && (
            <img
              className="input-icon spin"
              aria-hidden="true"
              src={spinner}
              alt=""
            />
          )}
          {loading !== "pending" && (
            <img
              className="input-icon"
              aria-hidden="true"
              src={search}
              alt=""
            />
          )}
        </button>
        <input
          className="input-text"
          id="location-input"
          type="text"
          placeholder="Search for a location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </form>

      {loading === "pending" && <p>Loading...</p>}
      {loading === "error" && <p>Error!</p>}

      {loading === "fulfilled" && (
        <section>
          <div>
            <p className="data-location">
              <img
                src={locationPin}
                className="results-location-icon"
                alt="location"
              />
              {data?.location.name}, {data?.location.region}
            </p>
            <p className="results-temp">{data?.current.temp_f} °F</p>
            <p className="results-condition">{data?.current.condition.text}</p>
            <p className="results-wind">
              <span>
                {data?.current.wind_mph} mph {data?.current.wind_dir}
              </span>
              <img
                src={arrowUp}
                style={{ transform: `rotate(${data?.current.wind_degree}deg)` }}
                className="results-wind-icon"
                alt={`wind direction: ${data?.current.wind_degree} degrees`}
              />
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
