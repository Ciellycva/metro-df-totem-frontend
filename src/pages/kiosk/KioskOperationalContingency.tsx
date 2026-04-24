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
          message="Sistema temporariamente indisponível"
          guidance="Para sua segurança, as vendas neste totem estão suspensas. Por favor, dirija-se à bilheteria ou utilize uma máquina ao lado."
        />

        <PrimaryButton onClick={() => navigate("/kiosk/session-end")}>
          Encerrar
        </PrimaryButton>
      </div>
    </KioskShell>
  );
}
