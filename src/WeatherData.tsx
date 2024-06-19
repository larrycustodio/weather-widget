import type { WeatherData as WeatherDataType } from "./types";
import locationPin from "./icons/location.svg";
import arrowUp from "./icons/arrow-up.svg";
import "./WeatherData.css";
import { useTheme } from "./ThemeContext";
import cx from "classnames";

type WeatherDataProps = {
  data: WeatherDataType;
};

const WeatherData = ({ data }: WeatherDataProps) => {
  const { theme } = useTheme();
  return (
    <section>
      <p className="data-location">
        <img
          src={locationPin}
          className={cx("results-location-icon", "icon", theme)}
          alt="location"
        />
        {data?.location.name}, {data?.location.region}
      </p>
      <p className="results-temp">{data?.current.temp_f} °F</p>
      <p className={cx("results-condition", theme)}>
        {data?.current.condition.text}
      </p>
      <p className="results-wind">
        <span>
          {data?.current.wind_mph} mph {data?.current.wind_dir}
        </span>
        <img
          src={arrowUp}
          style={{ transform: `rotate(${data?.current.wind_degree}deg)` }}
          className={cx("results-wind-icon", "icon", theme)}
          alt={`wind direction: ${data?.current.wind_degree} degrees`}
        />
      </p>
    </section>
  );
};

export default WeatherData;
