import React from "react";

const GameContext = React.createContext({
  output: {},
  history: [],
  handleInput: (_) => {},
  handleSave: () => {},
  handleRestore: (_) => {},
  handleNew: () => {}
});

export default GameContext;
