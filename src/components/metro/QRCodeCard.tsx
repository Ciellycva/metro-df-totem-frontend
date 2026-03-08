import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

interface QRCodeCardProps {
  value: string;
  label?: string;
  size?: number;
}

export function QRCodeCard({ value, label, size = 240 }: QRCodeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="bg-card rounded-xl border-2 border-border p-6 lg:p-8 flex flex-col items-center gap-4 shadow-lg"
    >
      <div className="bg-primary-foreground p-4 rounded-lg">
        <QRCodeSVG
          value={value}
          size={size}
          level="M"
          bgColor="#ffffff"
          fgColor="#1a1a2e"
        />
      </div>
      {label && (
        <p className="text-sm lg:text-base text-muted-foreground text-center font-medium">{label}</p>
      )}
    </motion.div>
  );
}
