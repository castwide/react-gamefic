import React from "react";
import { createRoot } from "react-dom/client";

import driver from "./driver";

import { Console, Modals, Terminal } from "react-gamefic";
import { Activity, Conclusion, MultipleChoice, Pause, YesOrNo } from "./scenes";
import { Menu } from "./widgets";

import "react-gamefic/styles/ebook";
import "./style.css";

const namedScenes = {};

const typedScenes = {
  Activity: Activity,
  ActiveChoice: Activity,
  Conclusion: Conclusion,
  MultipleChoice: MultipleChoice,
  Pause: Pause,
  YesOrNo: YesOrNo,
};

const root = createRoot(document.getElementById("root"));
root.render(
  <Console className="console" driver={driver} withConsoleCommands={true}>
    <Menu className="menu" title="%(title)" />
    <Terminal
      className="terminal"
      namedScenes={namedScenes}
      typedScenes={typedScenes}
    />
    <Modals modalClassName="modal" overlayClassName="overlay" />
  </Console>,
);
