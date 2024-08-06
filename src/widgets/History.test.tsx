import React from "react";
import History from "./History";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const commonHistory = {
  scene: {
    name: "scene_name",
    type: "scene_type",
  },
  last_input: "",
  last_prompt: "",
  options: [],
  queue: [],
};
const history = [
  {
    messages: "first",
    ...commonHistory,
  },
  {
    messages: "second",
    ...commonHistory,
  },
];

describe("<History />", () => {
  it("renders turns", () => {
    render(<History turns={history} />);

    expect(screen.getByText(/first/)).toBeInTheDocument();
    expect(screen.getByText(/second/)).toBeInTheDocument();
  });
});
