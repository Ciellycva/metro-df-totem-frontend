import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { KioskShell } from "@/components/metro/KioskShell";
import { LoadingState } from "@/components/metro/LoadingState";

export default function KioskPixProcessing() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [message, setMessage] = useState("Aguardando confirmação do pagamento...");
  const [submessage, setSubmessage] = useState("Estamos consultando o status automaticamente");

  useEffect(() => {
    let interval: number | undefined;
    let redirectTimer: number | undefined;

    const checkPaymentStatus = async () => {
      try {
        const paymentId = localStorage.getItem("paymentId");

        if (!paymentId) {
          setMessage("Pagamento não encontrado");
          setSubmessage("Não foi possível localizar os dados do pagamento");
          redirectTimer = window.setTimeout(() => {
            navigate("/kiosk/payment-failure");
          }, 1500);
          return;
        }

        const response = await fetch(`${API_URL}/payments/${paymentId}/status`);
        const data = await response.json();

        console.log("Status pagamento:", data);

        if (!response.ok || data.success === false) {
          throw new Error(data.message || "Erro ao consultar pagamento");
        }

        const pagamento = data.data ?? data;
        const status = pagamento.situacao_pagamento;

        if (status === "PENDENTE") {
          setMessage("Aguardando confirmação do pagamento...");
          setSubmessage("Assim que o pagamento for confirmado, a tela será atualizada");
          return;
        }

        if (status === "PAGO") {
          setMessage("Pagamento confirmado!");
          setSubmessage("Estamos gerando seu bilhete eletrônico");

          if (interval) {
            clearInterval(interval);
          }

          redirectTimer = window.setTimeout(() => {
            navigate("/kiosk/payment-success");
          }, 1200);

          return;
        }

        if (status === "FALHA" || status === "CANCELADO") {
          setMessage("Não foi possível confirmar o pagamento");
          setSubmessage("A compra não foi concluída. Tente novamente");

          if (interval) {
            clearInterval(interval);
          }

          redirectTimer = window.setTimeout(() => {
            navigate("/kiosk/payment-failure");
          }, 1500);

          return;
        }

        if (status === "EXPIRADO") {
          setMessage("O tempo para pagamento expirou");
          setSubmessage("Gere um novo QR Code Pix para continuar");

          if (interval) {
            clearInterval(interval);
          }

          redirectTimer = window.setTimeout(() => {
            navigate("/kiosk/pix-expired");
          }, 1500);
        }
      } catch (error) {
        console.error("Erro ao consultar status:", error);

        setMessage("Erro ao consultar pagamento");
        setSubmessage("Tente novamente em alguns instantes");

        if (interval) {
          clearInterval(interval);
        }

        redirectTimer = window.setTimeout(() => {
          navigate("/kiosk/payment-failure");
        }, 1500);
      }
    };

    checkPaymentStatus();
    interval = window.setInterval(checkPaymentStatus, 3000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }

      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [API_URL, navigate]);

  return (
    <KioskShell>
      <LoadingState
        message={message}
        submessage={submessage}
      />
    </KioskShell>
  );
}