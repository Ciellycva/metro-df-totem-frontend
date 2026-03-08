import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Smartphone, Zap } from "lucide-react";

export default function KioskIdle() {
  const navigate = useNavigate();

  return (
    <div
      className="kiosk-container metro-gradient cursor-pointer select-none"
      onClick={() => navigate("/kiosk/home")}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-foreground lg:w-16 lg:h-16">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8M12 8v8" />
            </svg>
          </div>
          <h1 className="text-primary-foreground font-display font-extrabold text-4xl lg:text-6xl text-center tracking-tight">
            Metrô-DF
          </h1>
          <p className="text-primary-foreground/80 text-lg lg:text-xl text-center">
            Bilhete Digital • Autoatendimento
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col items-center gap-6 mt-8"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="bg-primary-foreground/20 backdrop-blur-sm rounded-2xl px-12 py-8 lg:px-16 lg:py-10 border border-primary-foreground/30"
          >
            <p className="text-primary-foreground font-display font-bold text-2xl lg:text-4xl text-center">
              Toque aqui para iniciar
            </p>
          </motion.div>

          <div className="flex items-center gap-6 text-primary-foreground/60 text-sm lg:text-base">
            <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> Rápido</span>
            <span className="flex items-center gap-2"><Smartphone className="w-4 h-4" /> Digital</span>
          </div>
        </motion.div>
      </div>

      <footer className="px-8 py-4 text-center">
        <p className="text-primary-foreground/50 text-xs lg:text-sm">
          Companhia do Metropolitano do Distrito Federal
        </p>
      </footer>
    </div>
  );
}
