import { useTheme } from "./ThemeContext";
import "./ThemeSlider.css";

const ThemeSlider = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <input
        type="checkbox"
        className="checkbox"
        id="theme-checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label htmlFor="theme-checkbox" className="checkbox-label">
        <span className="icon" aria-label="dark mode">
          🌓
        </span>
        <span className="icon" aria-label="light mode">
          ☀️
        </span>
        <span className="toggle-indicator" />
      </label>
    </>
  );
};

export default ThemeSlider;
