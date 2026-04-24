import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
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
  const API_URL = import.meta.env.VITE_API_URL;

  const [qrCode, setQrCode] = useState("");
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const handleExpire = useCallback(() => {
    navigate("/kiosk/pix-expired");
  }, [navigate]);

  useEffect(() => {
    const gerarPix = async () => {
      try {
        const pedidoId = localStorage.getItem("pedidoId");

        if (!pedidoId) {
          throw new Error("Pedido não encontrado");
        }

        const response = await fetch(`${API_URL}/payments/pix`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_pedido: Number(pedidoId),
          }),
        });

        const data = await response.json();

        console.log("Pagamento PIX:", data);

        if (!response.ok || data.success === false) {
          throw new Error(data.message || "Erro ao gerar pagamento Pix");
        }

        setQrCode(data.data?.codigo_pix);
        setPaymentId(data.data?.id_pagamento);
      } catch (error) {
        console.error("Erro ao gerar Pix:", error);
      } finally {
        setLoading(false);
      }
    };

    gerarPix();
  }, [API_URL]);

  const simularPagamento = async () => {
    try {
      if (!paymentId) {
        throw new Error("Pagamento não encontrado");
      }

      const response = await fetch(
        `${API_URL}/payments/${paymentId}/simulate-status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            situacao_pagamento: "PAGO",
          }),
        }
      );

      const data = await response.json();

      console.log("Pagamento simulado:", data);

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Erro ao simular pagamento");
      }

      navigate("/kiosk/pix-processing");
    } catch (error) {
      console.error("Erro ao simular pagamento:", error);
    }
  };

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

        {loading ? (
          <p className="text-muted-foreground">Gerando QR Code...</p>
        ) : (
          <QRCodeCard value={qrCode} size={280} />
        )}

        <CountdownTimer
          seconds={300}
          onExpire={handleExpire}
          label="Tempo restante:"
        />

        <div className="w-full flex flex-col gap-3 mt-2">
          <PrimaryButton onClick={simularPagamento}>
            Simular pagamento
          </PrimaryButton>

          <SecondaryButton
            onClick={() => navigate("/kiosk/product")}
            icon={<X className="w-5 h-5" />}
          >
            Cancelar compra
          </SecondaryButton>
        </div>
      </motion.div>
    </KioskShell>
  );
}