import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface ContingencyMessageProps {
  message: string;
  guidance: string;
}

export function ContingencyMessage({ message, guidance }: ContingencyMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-6 text-center max-w-lg mx-auto"
    >
      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-warning/15 flex items-center justify-center">
        <AlertTriangle className="w-10 h-10 lg:w-12 lg:h-12 text-warning" />
      </div>
      <div>
        <h2 className="text-xl lg:text-2xl font-display font-bold text-foreground">{message}</h2>
        <p className="text-base lg:text-lg text-muted-foreground mt-3">{guidance}</p>
      </div>
    </motion.div>
  );
}
