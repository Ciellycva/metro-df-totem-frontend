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

  const [qrCodeValue, setQrCodeValue] = useState("");
  const [loading, setLoading] = useState(true);

  const handleExpire = useCallback(() => {
    navigate("/kiosk/pix-expired");
  }, [navigate]);

  useEffect(() => {
    const createPixPayment = async () => {
      try {
        const pedidoId = localStorage.getItem("pedidoId");
        console.log("pedidoId salvo:", pedidoId);

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

        console.log("Pagamento Pix criado:", data);

        if (!response.ok || data.success === false) {
          throw new Error(data.message || "Erro ao gerar pagamento Pix");
        }

        const pagamento = data.data ?? data;

        localStorage.setItem("paymentId", String(pagamento.id_pagamento));
        setQrCodeValue(pagamento.codigo_pix || "");
      } catch (error) {
        console.error("Erro ao gerar Pix:", error);
      } finally {
        setLoading(false);
      }
    };

    createPixPayment();
  }, [API_URL]);

  const handleSimulatePayment = async () => {
    try {
      const paymentId = localStorage.getItem("paymentId");

      if (!paymentId) {
        console.error("paymentId não encontrado");
        return;
      }

      await fetch(`${API_URL}/payments/${paymentId}/simulate-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          situacao_pagamento: "PAGO"
        })
      });

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
          <p>Gerando QR Code Pix...</p>
        ) : (
          <QRCodeCard value={qrCodeValue} size={280} />
        )}

        <CountdownTimer
          seconds={60}
          onExpire={handleExpire}
          label="Tempo restante:"
        />

        <div className="w-full flex flex-col gap-3 mt-2">
          <PrimaryButton onClick={handleSimulatePayment}>
            Simular pagamento
          </PrimaryButton>

          <SecondaryButton
            onClick={() => {
              localStorage.removeItem("pedidoId");
              localStorage.removeItem("paymentId");
              localStorage.removeItem("sessaoId");
              navigate("/kiosk/idle");
            }}
            icon={<X className="w-5 h-5" />}
          >
            Cancelar compra
          </SecondaryButton>
        </div>
      </motion.div>
    </KioskShell>
  );
}