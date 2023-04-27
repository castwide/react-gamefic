import React from "react";
import GameContext from "./GameContext";
import { GameContextType } from "./types";

interface TerminalProps {
  namedScenes: {
    [key: string]: React.Component
  },
  typedScenes: {
    [key: string]: React.Component
  },
  className?: string
}

// const GameContext = React.createContext<GameContextType>({
//   output: {},
//   history: [],
//   handleInput: null,
//   handleSave: null,
//   handleRestore: null,
//   handleNew: null,
//   handleGetSavedFiles: null
// });

export default function Terminal({namedScenes, typedScenes, className = ''}: TerminalProps) {
  const selectScene = (scene: any) => {
    const name = scene?.name;
    const type = scene?.type || scene;
    const available = namedScenes[name] || typedScenes[type];
    if (available) {
      return available;
    } else {
      throw(`Scene name "${name}" and type "${type}" are not assigned to a component`);
    }
  }

  return (
      <div className={className}>
        <GameContext.Consumer>
          {/* @ts-ignore */}
          {(context) => React.createElement<React.Component>(selectScene(context.output.scene), {output: context.output, history: context.history, handleInput: context.handleInput}, null)}
        </GameContext.Consumer>
      </div>
  );
}
