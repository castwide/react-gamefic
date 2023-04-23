import React from "react";

const GameContext = React.createContext({
  output: {},
  history: [],
  handleInput: null,
  handleSave: null,
  handleRestore: null,
  handleNew: null,
  handleGetSavedFiles: null
});

export default GameContext;
