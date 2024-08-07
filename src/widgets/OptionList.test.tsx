import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import OptionList from "./OptionList";

const options = ["first", "second"];

const handleInput = (command: string | null) => {
  return `${command}`;
};

describe("<OptionList />", () => {
  it("adds options to a list of command links", async () => {
    render(<OptionList options={options} handleInput={handleInput} />);

    const links = screen.getAllByRole("button").map((lnk) => lnk.textContent);
    expect(links).toEqual(["first", "second"]);
  });

  it("disables command links without an input handler", async () => {
    render(<OptionList options={options} />);

    const links = screen.queryAllByRole("link");
    expect(links.length).toEqual(0);
  });
});
