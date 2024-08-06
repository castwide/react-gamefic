import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import CommandForm from "./CommandForm";
import { HandleInputType } from "../types";

const user = userEvent.setup();

let received: string | null = null;

const handleInput: HandleInputType = (input: string | null) => {
  received = input;
};

afterEach(() => {
  received = null;
});

describe("<CommandForm />", () => {
  it("handles input from the button", async () => {
    render(<CommandForm prompt=">" handleInput={handleInput} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "command");
    const button = screen.getByRole("button");
    await user.click(button);

    expect(received).toEqual("command");
  });

  it("handles input from the enter key", async () => {
    render(<CommandForm prompt=">" handleInput={handleInput} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "command{Enter}");

    expect(received).toEqual("command");
  });

  it("browses history with arrows", async () => {
    render(
      <CommandForm prompt=">" handleInput={handleInput} history={["last"]} />,
    );

    const input = screen.getByRole("textbox");

    await user.type(input, "x");

    await user.type(input, "{ArrowUp}");
    expect(input).toHaveValue("last");

    await user.type(input, "{ArrowDown}");
    expect(input).toHaveValue("x");
  });
});
