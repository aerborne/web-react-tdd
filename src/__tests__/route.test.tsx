import React from "react";
// import { act } from "react-dom/test-utils";
// import * as ReactDOM from "react-dom";
// import RouteHandler from "../components/route-handler/index";
// import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import LoginPage from "../pages/login";
import HomePage from "../pages/index";

describe("App", function () {
  it("should display Login Page", async () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // ACT
    const element = await screen.getByTestId("login-page");
    const loginTitle = await screen.getByTestId("login-title");
    // ASSERT
    expect(element).toBeDefined();
    expect(loginTitle.innerHTML).toBe("LOGIN");
  });

  it("should display correct Login Title", async () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // ACT
    const loginTitle = await screen.getByTestId("login-title");

    // ASSERT
    expect(loginTitle.innerHTML).toBe("LOGIN");
  });

  it("should display correct Home Title", async () => {
    // ARRANGE
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // ACT
    const title = await screen.getByTestId("home-title");

    // ASSERT
    expect(title.innerHTML).toBe("Home hehe");
  });
});
