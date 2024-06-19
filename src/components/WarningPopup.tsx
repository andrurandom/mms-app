import React from 'react';
import '../styles/WarningPopup.css';

interface Props {
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

function WarningPopup({ message, onClose, onConfirm }: Props) {
  return (
    <div className="warning-popup-overlay">
      <div className="warning-popup">
        <p>{message}</p>
        <div className="warning-popup-buttons">
          <button className="warning-popup-button" onClick={onConfirm}>Yes</button>
          <button className="warning-popup-button" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

export default WarningPopup;
