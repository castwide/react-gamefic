import React from "react";
import GameContext from "./GameContext";
import { ScenePropsType, TerminalPropsType } from "./types";

export default function Terminal({namedScenes, typedScenes, className = ''}: TerminalPropsType) {
  const selectScene = (scene: {name: string, type: string} | undefined): React.FunctionComponent<ScenePropsType> => {
    const available = namedScenes[scene?.name || ''] || typedScenes[scene?.type || ''];
    if (available) {
      return available;
    } else {
      throw new Error(`Scene name "${scene?.name}" and type "${scene?.type}" are not assigned to a component`);
    }
  }

  return (
      <div className={className}>
        <GameContext.Consumer>
          {(context) => {
            const sceneComponent = selectScene(context.output?.scene);
            return React.createElement(sceneComponent, {output: context.output, history: context.history, handleInput: context.handleInput}, null)
          }}
        </GameContext.Consumer>
      </div>
  );
}
