import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { KioskShell } from "@/components/metro/KioskShell";
import { LoadingState } from "@/components/metro/LoadingState";

export default function KioskPixProcessing() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const paymentId = localStorage.getItem("paymentId");

        const response = await fetch(`${API_URL}/payments/${paymentId}/status`);
        const data = await response.json();

        console.log("Status pagamento:", data);

        const pagamento = data.data ?? data;
        const status = pagamento.situacao_pagamento;

        if (status === "PAGO") {
          navigate("/kiosk/payment-success");
        }

        if (status === "FALHA" || status === "CANCELADO") {
          navigate("/kiosk/payment-failure");
        }

        if (status === "EXPIRADO") {
          navigate("/kiosk/pix-expired");
        }

        // Se estiver PENDENTE, não faz nada (continua aguardando)

      } catch (error) {
        console.error("Erro ao consultar status:", error);
      }
    };

    // chama imediatamente
    checkPaymentStatus();

    // fica consultando a cada 3 segundos
    const interval = setInterval(checkPaymentStatus, 3000);

    return () => clearInterval(interval);

  }, [API_URL, navigate]);

  return (
    <KioskShell>
      <LoadingState
        message="Aguardando confirmação do pagamento..."
        submessage="A tela será atualizada automaticamente"
      />
    </KioskShell>
  );
}