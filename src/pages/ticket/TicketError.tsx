import { MobileShell } from "@/components/metro/MobileShell";
import { ResultState } from "@/components/metro/ResultState";

export default function TicketError() {
  return (
    <MobileShell>
      <div className="flex-1 flex items-center justify-center">
        <ResultState
          variant="error"
          title="Não foi possível carregar o bilhete neste momento"
          description="Tente novamente ou utilize outro canal de atendimento"
        />
      </div>
    </MobileShell>
  );
}
