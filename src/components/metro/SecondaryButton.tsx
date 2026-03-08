import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function SecondaryButton({ children, icon, fullWidth = true, className = "", ...props }: SecondaryButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`touch-target border-2 border-border bg-card text-foreground font-medium text-base lg:text-lg rounded-lg px-8 py-4 lg:py-5 flex items-center justify-center gap-3 transition-colors active:bg-muted disabled:opacity-50 ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
}
