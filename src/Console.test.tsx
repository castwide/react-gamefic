import React from "react";
import "@testing-library/jest-dom";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import Console from "./Console";
import Terminal from "./Terminal";
import TestDriver from "../fixtures/TestDriver";
import TestScene from "../fixtures/TestScene";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

// @todo Apparently not available in the testing-library screen
window.HTMLElement.prototype.scrollIntoView = function () {
  return null;
};

beforeEach(cleanup);

describe("<Console />", () => {
  // Splitting these expectations into separate tests would be cleaner, but
  // there are rendering leaks that cause false failures.
  it("runs a game", async () => {
    const driver = new TestDriver();
    render(
      <Console driver={driver}>
        <Terminal namedScenes={{ test: TestScene }} typedScenes={{}} />
      </Console>,
    );
    await screen.findByText(/introduction/);
    act(() => {
      const input = screen.getByRole("textbox");
      user.type(input, "command{Enter}");
    });
    await waitFor(() => {
      expect(screen.getByText(/turn 1/)).toBeInTheDocument();
    });
    act(() => {
      const input = screen.getByRole("textbox");
      user.type(input, "command{Enter}");
    });
    await waitFor(() => {
      expect(screen.getByText(/turn 2/)).toBeInTheDocument();
      expect(screen.getByText(/turn 1/)).toBeInTheDocument();
    });
  });

  // This test has to be last due to the aforementioned leaks.
  it("renders a loading screen", () => {
    const driver = new TestDriver();
    driver.stop = true;
    render(<Console driver={driver} />);
    expect(screen.getByText(/loading/)).toBeInTheDocument();
  });
});
