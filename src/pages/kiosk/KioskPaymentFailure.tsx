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
        title="Ocorreu uma falha no seu pagamento" 
        description="Não recebemos a confirmação. Verifique seu app do banco ou tente realizar a compra novamente."
      >
        <PrimaryButton onClick={() => navigate("/kiosk/product")} icon={<RefreshCw className="w-5 h-5" />}>
          Escolher produto novamente
        </PrimaryButton>
        <SecondaryButton onClick={() => navigate("/kiosk/session-end")}>
          Cancelar e sair
        </SecondaryButton>
      </ResultState>

    </KioskShell>
  );
}
