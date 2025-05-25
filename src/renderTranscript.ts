import React from "react";
import { createRoot } from "react-dom/client";
import { History } from "./widgets";
import { OutputType } from "./types";

export default function renderTranscript(
  turns: OutputType[],
  component = History,
): HTMLDivElement {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(React.createElement(component, { turns: turns }));
  return div;
}
