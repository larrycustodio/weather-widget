import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";
import { mockData } from "./helpers/mockapi";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  const setupFulfilledRequest = () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
        ok: true,
      } as Response)
    );
    render(<App />);
  };

  const setupRejectedRequest = (
    errorMessage = "An error occurred",
    status = 500
  ) => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: errorMessage }),
        ok: false,
        status,
      } as Response)
    );
    render(<App />);
  };

  it("renders the location and weather information", async () => {
    setupFulfilledRequest();
    userEvent.type(
      screen.getByRole("textbox", { name: "Location" }),
      "London, UK"
    );
    userEvent.click(screen.getByRole("button", { name: "Get Weather" }));
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    const locationDisplay = screen.getByText(
      `${mockData.location.name}, ${mockData.location.region}`
    );
    expect(locationDisplay).toBeVisible();
    const tempDisplayImperial = screen.getByText(
      `${mockData.current.temp_f} °F`
    );
    expect(tempDisplayImperial).toBeVisible();
    const conditionsDisplay = screen.getByText(
      `${mockData.current.condition.text}`
    );

    expect(conditionsDisplay).toBeVisible();
    const windDisplay = screen.getByText(
      `${mockData.current.wind_mph} mph ${mockData.current.wind_dir}`
    );
    expect(windDisplay).toBeVisible();
  });

  it("renders an error message to notfy user of an unavailable service", async () => {
    setupRejectedRequest("Server Error", 500);
    userEvent.type(
      screen.getByRole("textbox", { name: "Location" }),
      "London, UK"
    );
    userEvent.click(screen.getByRole("button", { name: "Get Weather" }));
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(
      screen.getByText(
        "The weather API is currently not available, please try again later",
        { exact: false }
      )
    ).toBeVisible();
  });

  it("renders an error message to notfy user of an failed request", async () => {
    const testErrorMessage = "You are not subscribed to this API";
    setupRejectedRequest(testErrorMessage, 400);
    userEvent.type(
      screen.getByRole("textbox", { name: "Location" }),
      "London, UK"
    );
    userEvent.click(screen.getByRole("button", { name: "Get Weather" }));
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(screen.getByText(testErrorMessage, { exact: false })).toBeVisible();
  });
});
