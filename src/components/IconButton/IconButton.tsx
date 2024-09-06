import React from "react";
import "./icon-button.css";
import { motion } from "framer-motion";

interface IconButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  backgroundColor?: string;
  disabled?: boolean;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  label,
  icon,
  onClick,
  backgroundColor,
  disabled,
  className,
}) => {
  return (
    <motion.button
      title={label}
      className={`icon-button ${className}`}
      onClick={onClick}
      style={{ background: backgroundColor ?? "transparent" }}
      disabled={disabled}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{
        scale: 0.95,
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.1,
      }}
    >
      {icon}
    </motion.button>
  );
};

export default IconButton;
