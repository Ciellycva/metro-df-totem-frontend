import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message: string;
  submessage?: string;
}

export function LoadingState({ message, submessage }: LoadingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-6 py-12"
    >
      <div className="relative">
        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-muted flex items-center justify-center">
          <Loader2 className="w-10 h-10 lg:w-12 lg:h-12 text-primary animate-spin" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-xl lg:text-2xl font-semibold text-foreground">{message}</p>
        {submessage && (
          <p className="text-sm lg:text-base text-muted-foreground mt-2">{submessage}</p>
        )}
      </div>
    </motion.div>
  );
}
