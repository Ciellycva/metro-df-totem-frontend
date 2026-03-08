import { ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";

type BannerVariant = "success" | "error" | "warning" | "waiting";

interface StatusBannerProps {
  variant: BannerVariant;
  title: string;
  description?: string;
  icon?: ReactNode;
}

const variantStyles: Record<BannerVariant, { bg: string; border: string; text: string; iconColor: string }> = {
  success: { bg: "bg-accent", border: "border-primary/30", text: "text-accent-foreground", iconColor: "text-primary" },
  error: { bg: "bg-destructive/10", border: "border-destructive/30", text: "text-destructive", iconColor: "text-destructive" },
  warning: { bg: "bg-warning/15", border: "border-warning/40", text: "text-warning-foreground", iconColor: "text-warning" },
  waiting: { bg: "bg-secondary/10", border: "border-secondary/30", text: "text-secondary", iconColor: "text-secondary" },
};

const defaultIcons: Record<BannerVariant, ReactNode> = {
  success: <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8" />,
  error: <XCircle className="w-6 h-6 lg:w-8 lg:h-8" />,
  warning: <AlertTriangle className="w-6 h-6 lg:w-8 lg:h-8" />,
  waiting: <Clock className="w-6 h-6 lg:w-8 lg:h-8" />,
};

export function StatusBanner({ variant, title, description, icon }: StatusBannerProps) {
  const s = variantStyles[variant];
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full rounded-lg border-2 ${s.border} ${s.bg} px-6 py-5 lg:px-8 lg:py-6 flex items-start gap-4`}
    >
      <div className={s.iconColor}>{icon || defaultIcons[variant]}</div>
      <div>
        <p className={`font-semibold text-base lg:text-lg ${s.text}`}>{title}</p>
        {description && <p className="text-sm lg:text-base text-muted-foreground mt-1">{description}</p>}
      </div>
    </motion.div>
  );
}
