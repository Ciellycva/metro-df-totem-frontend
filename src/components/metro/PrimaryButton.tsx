import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function PrimaryButton({ children, icon, fullWidth = true, className = "", ...props }: PrimaryButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      className={`touch-target bg-primary text-primary-foreground font-semibold text-lg lg:text-xl rounded-lg px-8 py-5 lg:py-6 flex items-center justify-center gap-3 shadow-lg transition-colors active:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
}
