import React, { useContext } from 'react';
import { ConsoleMode, GameContext, GameContextType, modalConfirm } from 'react-gamefic';

interface MenuProps {
  title?: string,
  className?: string
}

export default function Menu({title, className = ''}: MenuProps) {
  const context: GameContextType = useContext(GameContext);

  const handleSaveClick = (event: React.MouseEvent) => {
    event.preventDefault();
    context.setConsoleMode(ConsoleMode.Save);
  }

  const handleRestoreClick = (event: React.MouseEvent) => {
    event.preventDefault();
    context.setConsoleMode(ConsoleMode.Restore);
  }

  const handleNewClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (modalConfirm('Discard unsaved changes and start a new game?')) {
      context.handleNew();
    }
  }

  const handleUndoClick = (event: React.MouseEvent) => {
    event.preventDefault();
    context.handleUndo();
  }

  return (
    <div className={className}>
      <header>
        <h1>
          {title}
        </h1>
        <nav>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleRestoreClick}>Load</button>
          <button onClick={handleUndoClick}>Undo</button>
          <button onClick={handleNewClick}>Restart</button>
        </nav>
      </header>
    </div>
  )
}
