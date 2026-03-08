import { ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

type ResultVariant = "success" | "error" | "timeout";

interface ResultStateProps {
  variant: ResultVariant;
  title: string;
  description?: string;
  children?: ReactNode;
}

const icons: Record<ResultVariant, ReactNode> = {
  success: <CheckCircle className="w-16 h-16 lg:w-20 lg:h-20 text-primary" />,
  error: <XCircle className="w-16 h-16 lg:w-20 lg:h-20 text-destructive" />,
  timeout: <AlertTriangle className="w-16 h-16 lg:w-20 lg:h-20 text-warning" />,
};

export function ResultState({ variant, title, description, children }: ResultStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6 text-center w-full max-w-lg mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
      >
        {icons[variant]}
      </motion.div>
      <div>
        <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground">{title}</h2>
        {description && <p className="text-base lg:text-lg text-muted-foreground mt-3">{description}</p>}
      </div>
      {children && <div className="w-full flex flex-col gap-3 mt-4">{children}</div>}
    </motion.div>
  );
}
