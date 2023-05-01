import React, { useContext } from 'react';
import { ConsoleMode, GameContext } from 'react-gamefic';

interface MenuProps {
  title?: string
}

export default function Menu({title}: MenuProps) {
  const context = useContext(GameContext);

  const handleSaveClick = (event: React.MouseEvent) => {
    event.preventDefault();
    context.setConsoleMode(ConsoleMode.Save);
  }

  const handleRestoreClick = (event: React.MouseEvent) => {
    event.preventDefault();
    context.setConsoleMode(ConsoleMode.Restore);
  }

  const handleNewClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (confirm('Discard unsaved changes and start a new game?')) {
      context.handleNew();
    }
  }

  const handleUndoClick = (event: React.MouseEvent) => {
    event.preventDefault();
    context.handleUndo();
  }

  return (
    <header>
      <h1>
        {title}
      </h1>
      <nav>
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={handleRestoreClick}>Restore</button>
        <button onClick={handleUndoClick}>Undo</button>
        <button onClick={handleNewClick}>Restart</button>
      </nav>
    </header>
  )
}
