import { useNavigate } from "react-router-dom";
import { KioskShell } from "@/components/metro/KioskShell";
import { ContingencyMessage } from "@/components/metro/ContingencyMessage";
import { PrimaryButton } from "@/components/metro/PrimaryButton";

export default function KioskOperationalContingency() {
  const navigate = useNavigate();

  return (
    <KioskShell>
      <div className="flex flex-col items-center gap-8 w-full max-w-lg">
        <ContingencyMessage
          message="Não foi possível concluir este processo neste momento"
          guidance="Utilize o guichê de atendimento, cartão recarga ou compra direta no acesso"
        />
        <PrimaryButton onClick={() => navigate("/kiosk/session-end")}>
          Encerrar
        </PrimaryButton>
      </div>
    </KioskShell>
  );
}
