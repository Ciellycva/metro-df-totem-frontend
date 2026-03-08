import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { KioskShell } from "@/components/metro/KioskShell";
import { SecondaryButton } from "@/components/metro/SecondaryButton";
import { QRCodeCard } from "@/components/metro/QRCodeCard";
import { StatusBanner } from "@/components/metro/StatusBanner";
import { CountdownTimer } from "@/components/metro/CountdownTimer";
import { PrimaryButton } from "@/components/metro/PrimaryButton";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function KioskPix() {
  const navigate = useNavigate();

  const handleExpire = useCallback(() => {
    navigate("/kiosk/pix-expired");
  }, [navigate]);

  return (
    <KioskShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-6 w-full max-w-lg"
      >
        <StatusBanner
          variant="waiting"
          title="Aguardando pagamento"
          description="Abra o app do banco e pague pelo QR Code"
        />

        <QRCodeCard
          value="00020126580014br.gov.bcb.pix0136metro-df-bilhete-unitario-pix-demo5204000053039865802BR5925METRO-DF6008BRASILIA62070503***6304ABCD"
          size={280}
        />

        <CountdownTimer
          seconds={300}
          onExpire={handleExpire}
          label="Tempo restante:"
        />

        <div className="w-full flex flex-col gap-3 mt-2">
          <PrimaryButton onClick={() => navigate("/kiosk/pix-processing")}>
            Simular pagamento
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate("/kiosk/product")} icon={<X className="w-5 h-5" />}>
            Cancelar compra
          </SecondaryButton>
        </div>
      </motion.div>
    </KioskShell>
  );
}
