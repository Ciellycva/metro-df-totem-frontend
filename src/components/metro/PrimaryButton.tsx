import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PrimaryButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function PrimaryButton({ children, icon, fullWidth = true, className = "", onClick, disabled, type = "button" }: PrimaryButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`touch-target bg-primary text-primary-foreground font-semibold text-lg lg:text-xl rounded-lg px-8 py-5 lg:py-6 flex items-center justify-center gap-3 shadow-lg transition-colors active:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {icon}
      {children}
    </motion.button>
  );
}
