import React, { useContext, useState } from "react";
import {
  ConsoleMode,
  GameContext,
  GameContextType,
  History,
  Modal,
  modalConfirm,
} from "react-gamefic";
import { saveTranscript } from "react-gamefic";
import gearIcon from "./gear-icon.svg";

interface MenuProps {
  title?: string;
  className?: string;
}

export default function Menu({ title, className = "" }: MenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const context: GameContextType = useContext(GameContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSaveClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuOpen(false);
    context.setConsoleMode(ConsoleMode.Save);
  };

  const handleRestoreClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuOpen(false);
    context.setConsoleMode(ConsoleMode.Restore);
  };

  const handleNewClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuOpen(false);
    if (await modalConfirm("Discard unsaved changes and start a new game?")) {
      context.handleNew();
    }
  };

  const handleUndoClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuOpen(false);
    context.handleUndo();
  };

  const handleSaveTranscript = () => {
    setMenuOpen(false);
    saveTranscript([...context.history, context.output], History);
  };

  return (
    <div className={className}>
      <header>
        <h1>{title}</h1>
        <div>
          <button onClick={toggleMenu}>
            <img src={gearIcon} alt="Menu" />
          </button>
          <Modal
            isOpen={menuOpen}
            onRequestClose={() => setMenuOpen(false)}
            className="menu-modal"
          >
            <nav>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleRestoreClick}>Load</button>
              <button onClick={handleUndoClick}>Undo</button>
              <button onClick={handleNewClick}>Restart</button>
              <button onClick={handleSaveTranscript}>Transcribe</button>
            </nav>
          </Modal>
        </div>
      </header>
    </div>
  );
}
