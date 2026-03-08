import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { KioskShell } from "@/components/metro/KioskShell";
import { ResultState } from "@/components/metro/ResultState";
import { QRCodeCard } from "@/components/metro/QRCodeCard";
import { CountdownTimer } from "@/components/metro/CountdownTimer";
import { AutoResetSession } from "@/components/metro/AutoResetSession";
import { Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const TICKET_ID = "metro-df-20260308-001";

export default function KioskPaymentSuccess() {
  const navigate = useNavigate();

  const handleSessionEnd = useCallback(() => {
    navigate("/kiosk/session-end");
  }, [navigate]);

  const ticketUrl = `${window.location.origin}/ticket/view/${TICKET_ID}`;

  return (
    <KioskShell>
      <AutoResetSession seconds={120} redirectTo="/kiosk/session-end" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-6 w-full max-w-lg"
      >
        <ResultState
          variant="success"
          title="Pagamento confirmado com sucesso"
          description="Seu bilhete eletrônico foi gerado"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-4 w-full"
        >
          <div className="flex items-center gap-2 text-base lg:text-lg text-foreground font-medium">
            <Smartphone className="w-5 h-5 text-primary" />
            Leia o QR Code abaixo com seu celular
          </div>

          <QRCodeCard
            value={ticketUrl}
            size={280}
            label="Use a câmera do celular para abrir seu bilhete no navegador"
          />

          <CountdownTimer
            seconds={120}
            onExpire={handleSessionEnd}
            label="Sessão encerra em:"
          />
        </motion.div>
      </motion.div>
    </KioskShell>
  );
}
