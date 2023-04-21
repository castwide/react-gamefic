import React from "react";
import { GameContext } from 'react-gamefic';
import { useContext } from "react";

export default function Menu() {
  const context = useContext(GameContext);

  const handleSaveClick = (event) => {
    event.preventDefault();
    context.handleSave();
  }

  const handleRestoreClick = (event) => {
    event.preventDefault();
    context.handleRestore();
  }

  const handleNewClick = (event) => {
    event.preventDefault();
    context.handleNew();
  }

  return (
    <header>
      <nav>
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={handleRestoreClick}>Load</button>
        <button onClick={handleNewClick}>New</button>
      </nav>
    </header>
  )
}
