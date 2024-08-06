import React from "react";
import { ConsoleMode, GameContextType } from "./types";

const GameContext = React.createContext<GameContextType>({
  consoleMode: ConsoleMode.Game,
  output: {
    last_input: null,
    last_prompt: null,
    messages: "",
    options: [],
    queue: [],
    scene: {
      name: "",
      type: "Default",
    },
    prompt: ">",
  },
  history: [],
  setConsoleMode: (mode: ConsoleMode) => `setConsoleMode '${mode}'`,
  handleInput: (command: string | null) => `handleInput '${command}'`,
  handleSave: (name: string) => `handleSave '${name}'`,
  handleRestore: (name: string) => `handleRestore '${name}'`,
  handleNew: () => `new`,
  handleDelete: (name: string) => `handleDelete '${name}'`,
  handleGetSavedFiles: () => [],
  handleUndo: () => `handleUndo`,
});

export default GameContext;
