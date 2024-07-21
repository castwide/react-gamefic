import React from 'react';
import ReactModal from 'react-modal';
import modalStyles from './Modal.module.css';
import confirmationStyles from './Confirmation.module.css';
import { confirmable, ConfirmDialogProps } from 'react-confirm';

interface ConfirmationProps {
  show: boolean,
  proceed: (value: boolean) => void,
  confirmation: string
}

const Confirmation: React.FC<ConfirmDialogProps<ConfirmationProps, Response>> = ({ show, proceed, confirmation }: ConfirmationProps) => (
  <ReactModal
    isOpen={show}
    className={confirmationStyles.modal}
    overlayClassName={modalStyles.overlay}
    shouldCloseOnEsc={true}
    onRequestClose={() => proceed(false)}
  >
    <p>
      {confirmation}
    </p>
    <nav>
      <button onClick={() => proceed(true)}>Yes</button>
      <button onClick={() => proceed(false)}>No</button>
    </nav>
  </ReactModal>
)

export default confirmable(Confirmation);
