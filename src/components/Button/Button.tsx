import React from "react";
import "./button.css";
import { motion } from "framer-motion";

interface IconButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  background?: string;
  color?: string;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<IconButtonProps> = ({
  label,
  icon,
  onClick,
  background,
  disabled,
  className,
  color,
}) => {
  const buttonAnimationVariants = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.button
      title={label}
      className={`button ${className}`}
      onClick={onClick}
      style={{
        background: background ?? "transparent",
        color: color ?? "white",
      }}
      disabled={disabled}
      variants={buttonAnimationVariants}
      whileHover={{
        scale: 0.95,
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.327)",
      }}
    >
      <span>{label}</span>
      {icon}
    </motion.button>
  );
};

export default Button;
