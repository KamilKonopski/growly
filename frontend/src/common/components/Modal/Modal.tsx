import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  keepMounted?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnBackdropClick?: boolean;
}

const Modal = ({
  isOpen,
  keepMounted = false,
  onClose,
  children,
  closeOnBackdropClick = true,
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {(isOpen || keepMounted) && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.backdrop}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
          onClick={() => closeOnBackdropClick && isOpen && onClose()}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.9 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
