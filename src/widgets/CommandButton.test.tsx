import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import CommandButton from "./CommandButton";

const user = userEvent.setup();

let received: string | null = null;

const handleInput = (command: string | null) => {
  received = command;
};

afterEach(() => {
  received = null;
});

describe("<CommandButton />", () => {
  it("sends commands from clicks", async () => {
    render(
      <CommandButton command="command" handleInput={handleInput}>
        Click Me
      </CommandButton>,
    );

    const link = screen.getByRole("button");
    await user.click(link);

    expect(received).toEqual("command");
  });
});
