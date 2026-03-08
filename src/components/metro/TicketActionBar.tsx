import { Download, Share2 } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";

interface TicketActionBarProps {
  onDownload: () => void;
  onShare: () => void;
}

export function TicketActionBar({ onDownload, onShare }: TicketActionBarProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <PrimaryButton onClick={onDownload} icon={<Download className="w-5 h-5" />}>
        Baixar imagem
      </PrimaryButton>
      <SecondaryButton onClick={onShare} icon={<Share2 className="w-5 h-5" />}>
        Enviar bilhete para outra pessoa
      </SecondaryButton>
    </div>
  );
}
