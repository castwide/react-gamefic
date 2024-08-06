import React from "react";
import ReactModal, { Props as ReactModalProps } from "react-modal";
import modalStyles from "./Modal.module.css";

export default function Modal(props: ReactModalProps) {
  return (
    <ReactModal
      {...props}
      className={`${modalStyles.modal} ${props.className}`}
      overlayClassName={`${modalStyles.overlay} ${props.overlayClassName}`}
    >
      {props.children}
    </ReactModal>
  );
}
