import { useNavigate } from "react-router-dom";
import { KioskShell } from "@/components/metro/KioskShell";
import { ResultState } from "@/components/metro/ResultState";
import { PrimaryButton } from "@/components/metro/PrimaryButton";
import { SecondaryButton } from "@/components/metro/SecondaryButton";
import { RefreshCw } from "lucide-react";

export default function KioskPaymentFailure() {
  const navigate = useNavigate();

  return (
    <KioskShell>
      <ResultState
        variant="error"
        title="Não foi possível confirmar o pagamento"
        description="Tente novamente ou utilize outro canal de atendimento"
      >
        <PrimaryButton onClick={() => navigate("/kiosk/pix")} icon={<RefreshCw className="w-5 h-5" />}>
          Tentar novamente
        </PrimaryButton>
        <SecondaryButton onClick={() => navigate("/kiosk/session-end")}>
          Encerrar
        </SecondaryButton>
      </ResultState>
    </KioskShell>
  );
}
