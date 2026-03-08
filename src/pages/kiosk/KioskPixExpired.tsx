import { useNavigate } from "react-router-dom";
import { KioskShell } from "@/components/metro/KioskShell";
import { ResultState } from "@/components/metro/ResultState";
import { PrimaryButton } from "@/components/metro/PrimaryButton";
import { SecondaryButton } from "@/components/metro/SecondaryButton";
import { RefreshCw } from "lucide-react";

export default function KioskPixExpired() {
  const navigate = useNavigate();

  return (
    <KioskShell>
      <ResultState
        variant="timeout"
        title="O tempo para pagamento expirou"
        description="Gere um novo QR Code para continuar"
      >
        <PrimaryButton onClick={() => navigate("/kiosk/pix")} icon={<RefreshCw className="w-5 h-5" />}>
          Gerar novo QR Code Pix
        </PrimaryButton>
        <SecondaryButton onClick={() => navigate("/kiosk/session-end")}>
          Cancelar
        </SecondaryButton>
      </ResultState>
    </KioskShell>
  );
}
