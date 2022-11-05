import "@testing-library/jest-dom";
import React from "react";
import { render, screen, within } from "@testing-library/react";
import { AppWrapper } from "@hadmean/chromista";

import Dashboard from "pages/admin";
import Dashboard1 from "pages";

import { setupApiHandlers } from "__tests__/_/setupApihandlers";
import noop from "lodash/noop";

setupApiHandlers();

jest.mock("next/router", () => require("next-router-mock"));

noop(Dashboard1);

describe("pages/admin (Dashboard)", () => {
  it.skip("render menu items correctly", async () => {
    render(
      <AppWrapper>
        <Dashboard />
      </AppWrapper>
    );
    const layoutContent = screen.getByTestId("app-layout__content");

    expect(await within(layoutContent).findAllByText("8")).toHaveLength(3);
    expect(
      await within(layoutContent).findByText("Plural entity-1")
    ).toBeInTheDocument();

    expect(
      await within(layoutContent).findByText("Plural entity-2")
    ).toBeInTheDocument();

    expect(
      await within(layoutContent).findByText("Plural entity-3")
    ).toBeInTheDocument();
  });
});
