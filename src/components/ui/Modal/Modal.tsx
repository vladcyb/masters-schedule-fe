import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../Button';
import './style.css';

type PropsType = {
  message: string
  title?: string
  onConfirm?: () => void
  onClose?: () => void
};

export const Modal = ({
  message,
  onConfirm,
  onClose,
}: PropsType) => (
  ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__content">
        <div className="modal__message">
          {message}
        </div>
        {onConfirm ? (
          <div className="modal__buttons">
            <Button onClick={onConfirm}>OK</Button>
            <Button onClick={onClose} variant="outline">Cancel</Button>
          </div>
        ) : (
          <Button
            className="modal__cancel"
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
        )}
      </div>
    </div>,
    document.getElementById('modal')!,
  )
);
