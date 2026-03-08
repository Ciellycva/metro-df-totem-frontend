import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { KioskShell } from "@/components/metro/KioskShell";
import { LoadingState } from "@/components/metro/LoadingState";

export default function KioskPixProcessing() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/kiosk/payment-success");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <KioskShell>
      <LoadingState
        message="Aguardando confirmação do pagamento..."
        submessage="A tela será atualizada automaticamente"
      />
    </KioskShell>
  );
}
