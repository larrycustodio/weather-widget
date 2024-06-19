import { FormEvent, useState } from "react";
import "./App.css";
import useGetWeather from "./hooks/useGetWeather";
import search from "./icons/search.svg";
import spinner from "./icons/spinner.svg";
import WeatherData from "./WeatherData";
import ThemeSlider from "./ThemeSlider";
import { useTheme } from "./ThemeContext";
import cx from "classnames";

function App() {
  const [location, setLocation] = useState("");
  const { data, loading, error, getWeather } = useGetWeather();
  const { theme } = useTheme();

  const submitLocation = (e: FormEvent) => {
    e.preventDefault();
    if (!location.length) return;
    getWeather(location);
  };

  return (
    <div className={cx("page-container", theme)}>
      <div className={cx("app", theme)}>
        <h1 className={cx("header", theme)}>Weather</h1>
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
                className={cx("input-icon", "spin", theme)}
                aria-hidden="true"
                src={spinner}
                alt=""
              />
            )}
            {loading !== "pending" && (
              <img
                className={cx("input-icon", theme)}
                aria-hidden="true"
                src={search}
                alt=""
              />
            )}
          </button>
          <input
            className={cx("input-text", theme)}
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
    </div>
  );
}

export default App;
