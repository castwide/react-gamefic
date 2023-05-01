import React, { useEffect } from 'react';
import { useContext, useState } from "react";
import Modal from 'react-modal';
import { GameContext } from 'react-gamefic';
import SaveForm from './SaveForm';
import RestoreForm from './RestoreForm';

Modal.setAppElement('#root');

export default function Menu() {
  const [modal, setModal] = useState<string | null>(null);
  const context = useContext(GameContext);

  useEffect(() => {
    setModal(context.metaState);
  }, [context]);

  const handleSaveClick = () => {
    setModal('save');
  }

  const handleRestoreClick = () => {
    setModal('restore');
  }

  const handleNewClick = (event) => {
    event.preventDefault();
    if (confirm('Discard unsaved changes and start a new game?')) {
      context.handleNew();
    }
  }

  const handleUndoClick = (event) => {
    event.preventDefault();
    context.handleUndo();
  }

  const closeModal = () => {
    setModal(null);
  }

  const saveAndCloseModal = (name) => {
    context.handleSave(name);
    closeModal();
  }

  const restoreAndCloseModal = (name) => {
    context.handleRestore(name);
    closeModal();
  }

  return (
    <header>
      <h1>
        %(name)
      </h1>
      <nav>
        <button onClick={handleSaveClick}>Save</button>
        <Modal
          isOpen={modal == 'save'}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="overlay"
        >
          <h1>Save Game</h1>
          <SaveForm handleGetSavedFiles={context.handleGetSavedFiles} handleSave={saveAndCloseModal} handleDelete={context.handleDelete} />
          <footer>
            <button onClick={closeModal}>Cancel</button>
          </footer>
        </Modal>
        <button onClick={handleRestoreClick}>Restore</button>
        <Modal
          isOpen={modal == 'restore'}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="overlay"
        >
          <h1>Restore Saved Game</h1>
          <RestoreForm handleGetSavedFiles={context.handleGetSavedFiles} handleRestore={restoreAndCloseModal} handleDelete={context.handleDelete} />
          <footer>
            <button onClick={closeModal}>Cancel</button>
          </footer>
        </Modal>
        <button onClick={handleNewClick}>Restart</button>
        <button onClick={handleUndoClick}>Undo</button>
      </nav>
    </header>
  )
}
