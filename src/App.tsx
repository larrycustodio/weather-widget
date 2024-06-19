import { FormEvent, useState } from "react";
import "./App.css";
import useGetWeather from "./hooks/useGetWeather";
import search from "./icons/search.svg";
import spinner from "./icons/spinner.svg";
import WeatherData from "./WeatherData";
import ThemeSlider from "./ThemeSlider";

function App() {
  const [location, setLocation] = useState("");
  const { data, loading, error, getWeather } = useGetWeather();

  const submitLocation = (e: FormEvent) => {
    e.preventDefault();
    if (!location.length) return;

    getWeather(location);
  };
  return (
    <div className="app">
      <h1 className="header">Weather</h1>
      <div className="theme-slider-container">
        <ThemeSlider />
      </div>
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
      {loading === "error" && (
        <p className="error">
          <strong>Error:</strong> {error}
        </p>
      )}

      {loading === "fulfilled" && data && <WeatherData data={data} />}
    </div>
  );
}

export default App;
