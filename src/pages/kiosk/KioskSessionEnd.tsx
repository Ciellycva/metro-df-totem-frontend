import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { KioskShell } from "@/components/metro/KioskShell";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function KioskSessionEnd() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/kiosk/idle");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <KioskShell>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <CheckCircle className="w-16 h-16 lg:w-20 lg:h-20 text-primary" />
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
          Obrigado por utilizar o Metrô-DF
        </h1>
        <p className="text-base lg:text-lg text-muted-foreground">
          Tenha uma boa viagem!
        </p>
        <p className="text-sm text-muted-foreground/60 mt-4">
          Retornando à tela inicial...
        </p>
      </motion.div>
    </KioskShell>
  );
}
