import React from "react";
import GameContext from './GameContext';

export default function Terminal({namedScenes, typedScenes}) {
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
    <GameContext.Consumer>
      {(context) => React.createElement(selectScene(context.output.scene), {output: context.output, history: context.history, handleInput: context.handleInput}, null)}
    </GameContext.Consumer>
  );
}
