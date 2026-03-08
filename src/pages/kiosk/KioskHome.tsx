import { useNavigate } from "react-router-dom";
import { KioskShell } from "@/components/metro/KioskShell";
import { PrimaryButton } from "@/components/metro/PrimaryButton";
import { SecondaryButton } from "@/components/metro/SecondaryButton";
import { motion } from "framer-motion";
import { Ticket } from "lucide-react";

export default function KioskHome() {
  const navigate = useNavigate();

  return (
    <KioskShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-8 w-full max-w-lg"
      >
        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-accent flex items-center justify-center">
          <Ticket className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
        </div>

        <div className="text-center">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">
            Compra de bilhete digital
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground mt-3">
            Compre seu bilhete e acesse no celular após o pagamento
          </p>
        </div>

        <div className="w-full flex flex-col gap-4 mt-4">
          <PrimaryButton onClick={() => navigate("/kiosk/product")}>
            Comprar bilhete
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate("/kiosk/idle")}>
            Cancelar
          </SecondaryButton>
        </div>
      </motion.div>
    </KioskShell>
  );
}
