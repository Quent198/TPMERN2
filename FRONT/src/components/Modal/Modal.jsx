import React from "react";
import styles from "./Modal.module.scss";

export default function Modal({ onClose, feedback, children }) {
  return (
    <div className={`${styles.modalOverlay}`} onClick={onClose}>
      <div
        className={`${styles.modalContent}`}
        onClick={(e) => e.stopPropagation()}
      >
        {feedback && <p>{feedback}</p>}
        {children}
      </div>
    </div>
  );
}
