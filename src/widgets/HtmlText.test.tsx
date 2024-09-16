import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import HtmlText from './HtmlText';

const user = userEvent.setup();

let received: string | null = null;

const handleInput = (command: string | null) => {
  received = command;
};

afterEach(() => {
  received = null;
});

describe("<HtmlText />", () => {
  it("sends commands from link clicks", async () => {
    const text = '<a data-command="link clicked">Click a link</a>';
    render(
      <HtmlText handleInput={handleInput} text={text} />
    );

    const link = screen.getByText("Click a link");
    await user.click(link);

    expect(received).toEqual("link clicked");
  });

  it("sends commands from button clicks", async () => {
    const text = '<button data-command="button clicked">Click a button</button>';
    render(
      <HtmlText handleInput={handleInput} text={text} />
    );

    const link = screen.getByText("Click a button");
    await user.click(link);

    expect(received).toEqual("button clicked");
  });
});
