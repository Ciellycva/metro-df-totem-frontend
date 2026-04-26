import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { KioskShell } from "@/components/metro/KioskShell";
import { ResultState } from "@/components/metro/ResultState";
import { QRCodeCard } from "@/components/metro/QRCodeCard";
import { CountdownTimer } from "@/components/metro/CountdownTimer";
import { AutoResetSession } from "@/components/metro/AutoResetSession";
import { Smartphone } from "lucide-react";
import { motion } from "framer-motion";

export default function KioskPaymentSuccess() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [ticketId, setTicketId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleSessionEnd = useCallback(() => {
    navigate("/kiosk/session-end");
  }, [navigate]);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const pedidoId = localStorage.getItem("pedidoId");

        if (!pedidoId) {
          throw new Error("pedidoId não encontrado");
        }

        const response = await fetch(
          `${API_URL}/tickets/by-order/${pedidoId}`
        );

        const data = await response.json();

        console.log("Resposta do bilhete:", data);

        if (!response.ok || data.success === false) {
          throw new Error(data.message || "Erro ao buscar bilhete");
        }

        // compatibilidade com diferentes formatos
        const ticket = data.data ?? data;

        if (!ticket.id_bilhete) {
          throw new Error("id_bilhete não encontrado");
        }

        setTicketId(String(ticket.id_bilhete));

      } catch (error) {
        console.error("Erro ao carregar bilhete:", error);
        navigate("/kiosk/payment-failure");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [API_URL, navigate]);

  const ticketUrl = ticketId
    ? `${window.location.origin}/ticket/view/${ticketId}`
    : "";

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

        {loading ? (
          <p>Gerando bilhete...</p>
        ) : (
          <>
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
          </>
        )}
      </motion.div>
    </KioskShell>
  );
}