import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import CurrencyRate from "../../pages/CurrencyRate";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

describe("Currency component", () => {
  it("should render the CurrencyRate component", async () => {
    const routes = [
      {
        path: "/currency/:symbol",
        element: <CurrencyRate />,
        loader: () => [
          {
            id: "1",
            symbol: "USD",
            rate: "1",
          },
          {
            id: "2",
            symbol: "BGN",
            rate: "1.81",
          },
          {
            id: "3",
            symbol: "USD",
            rate: "1",
          },
          {
            id: "3",
            symbol: "CURR",
            rate: "1.81",
          },
          {
            id: "3",
            symbol: "CURR",
            rate: "1",
          },
          {
            id: "3",
            symbol: "CURR",
            rate: "1.81",
          },
          {
            id: "3",
            symbol: "CURR",
            rate: "1",
          },
          {
            id: "3",
            symbol: "CURR",
            rate: "1.81",
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/currency/usd"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByTestId("symbol"));
    expect(screen.getByTestId("symbol")).toBeInTheDocument();
    expect(screen.getByText("usd")).toBeInTheDocument();
    expect(screen.getByText("BGN")).toBeInTheDocument();
  });

  it("should render filtered FluctuationData component", async () => {
    const routes = [
      {
        path: "/currency/:symbol",
        element: <CurrencyRate />,
        loader: () => [
          {
            id: "1",
            symbol: "USD",
            rate: "1",
          },
          {
            id: "2",
            symbol: "BGN",
            rate: "1.81",
          },
          {
            id: "3",
            symbol: "USD",
            rate: "1",
          },
          {
            id: "3",
            symbol: "CURR",
            rate: "1.81",
          },
          {
            id: "3",
            symbol: "CURR",
            rate: "1",
          },
          {
            id: "3",
            symbol: "CURR",
            rate: "1.81",
          },
          {
            id: "3",
            symbol: "CURR",
            rate: "1",
          },
          {
            id: "3",
            symbol: "CURR",
            rate: "1.81",
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/currency/usd"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByTestId("symbol"));

    userEvent.type(screen.getByTestId("search-input-2"), "USD");
    expect(screen.queryByText("BGN")).not.toBeInTheDocument();
  });
});
