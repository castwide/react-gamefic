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
import downloadIcon from "./download-icon.svg";
import closeIcon from "./close-icon.svg";

interface MenuProps {
  title?: string;
  className?: string;
}

export default function Menu({ title, className = "" }: MenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

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

  const handleTranscript = () => {
    setMenuOpen(false);
    setHistoryOpen(true);
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
            <button className="close-button" onClick={() => setMenuOpen(false)}>
              <img src={closeIcon} alt="Close" />
            </button>
            <nav>
              <button onClick={handleSaveClick}>Save Game</button>
              <button onClick={handleRestoreClick}>Load Game</button>
              <hr />
              <button onClick={handleUndoClick}>Undo Last Turn</button>
              <button onClick={handleNewClick}>Start New Game</button>
              <hr />
              <button onClick={handleTranscript}>Transcript</button>
            </nav>
          </Modal>
          <Modal
            isOpen={historyOpen}
            onRequestClose={() => setHistoryOpen(false)}
            className="transcript-modal"
          >
            <button className="close-button" onClick={() => setHistoryOpen(false)}>
              <img src={closeIcon} alt="Close" />
            </button>
            <History className="transcript" turns={[...context.history, context.output]} />
            <nav>
              <button onClick={handleSaveTranscript}>
                <img src={downloadIcon} alt="Save" />
              </button>
            </nav>
          </Modal>
        </div>
      </header>
    </div>
  );
}
