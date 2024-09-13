import React from "react";
import "./modal.css";
import { motion } from "framer-motion";

interface ModalProps {
  children?: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-container"
    >
      {children}
    </motion.div>
  );
};

export default Modal;
