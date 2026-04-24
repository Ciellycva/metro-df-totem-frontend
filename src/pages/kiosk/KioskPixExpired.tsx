import { useNavigate } from "react-router-dom";
import { KioskShell } from "@/components/metro/KioskShell";
import { ResultState } from "@/components/metro/ResultState";
import { PrimaryButton } from "@/components/metro/PrimaryButton";
import { SecondaryButton } from "@/components/metro/SecondaryButton";
import { RefreshCw } from "lucide-react";

export default function KioskPixExpired() {
  const navigate = useNavigate();

  const handleGenerateNewPix = () => {
    localStorage.removeItem("paymentId");
    navigate("/kiosk/pix");
  };

  return (
    <KioskShell>
      
      <ResultState
        variant="timeout"
        title="QR Code Pix expirado"
        description="O tempo limite de 5 minutos foi atingido. Fique tranquilo: se você não pagou, nenhuma cobrança foi feita."
      >
        {/* O resto do código continua igual */}

        <PrimaryButton
          onClick={handleGenerateNewPix}
          icon={<RefreshCw className="w-5 h-5" />}
        >
          Gerar novo QR Code Pix
        </PrimaryButton>

        <SecondaryButton onClick={() => navigate("/kiosk/session-end")}>
          Cancelar
        </SecondaryButton>
      </ResultState>
    </KioskShell>
  );
}