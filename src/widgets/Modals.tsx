import React, { useContext } from 'react';
import Modal from './Modal';
import GameContext from '../GameContext';
import SaveForm from './SaveForm';
import RestoreForm from './RestoreForm';
import { ConsoleMode } from '../types';

interface ModalsProps {
  modalClassName?: string,
  overlayClassName?: string
}

export default function Modals({modalClassName, overlayClassName}: ModalsProps) {
  const context = useContext(GameContext);

  const closeModal = () => {
    context?.setConsoleMode(ConsoleMode.Game);
  }

  const saveAndCloseModal = (name: string) => {
    context?.handleSave(name);
    closeModal();
  }

  const restoreAndCloseModal = (name: string) => {
    context?.handleRestore(name);
    closeModal();
  }

  return (
    <>
      <Modal
        isOpen={context.consoleMode == 'save'}
        onRequestClose={closeModal}
        className={modalClassName}
        overlayClassName={overlayClassName}
      >
        <h1>Save Game</h1>
        <SaveForm handleGetSavedFiles={context?.handleGetSavedFiles} handleSave={saveAndCloseModal} handleDelete={context?.handleDelete} />
        <footer>
          <button onClick={closeModal}>Cancel</button>
        </footer>
      </Modal>
      <Modal
        isOpen={context.consoleMode == 'restore'}
        onRequestClose={closeModal}
        className={modalClassName}
        overlayClassName={overlayClassName}
      >
        <h1>Restore Saved Game</h1>
        <RestoreForm handleGetSavedFiles={context.handleGetSavedFiles} handleRestore={restoreAndCloseModal} handleDelete={context.handleDelete} />
        <footer>
          <button onClick={closeModal}>Cancel</button>
        </footer>
      </Modal>
    </>
  )
}
