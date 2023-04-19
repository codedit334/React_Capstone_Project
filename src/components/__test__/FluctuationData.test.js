import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import configureMockStore from "redux-mock-store";
import "@testing-library/jest-dom";
import FluctuationData from "../../pages/FluctuationData";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureMockStore([]);

describe("Fluctuation component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      fluctuationData: {
        status: "succeeded",
        fluctuationData: [
          {
            id: "1",
            symbol: "USD",
            change: "0.005",
            change_pct: "0.45",
          },
          {
            id: "2",
            symbol: "BGN",
            change: "0.0009",
            change_pct: "0.05",
          },
        ],
      },
    });
  });

  it("should render the FluctuationData component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FluctuationData />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("BGN")).toBeInTheDocument();
  });

  it("should render filtered FluctuationData component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FluctuationData />
        </BrowserRouter>
      </Provider>
    );

    userEvent.type(screen.getByTestId("search-input"), "USD");
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.queryByText("BGN")).not.toBeInTheDocument();
  });
});
