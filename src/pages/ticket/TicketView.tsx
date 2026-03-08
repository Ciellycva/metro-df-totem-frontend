import { useNavigate, useParams } from "react-router-dom";
import { MobileShell } from "@/components/metro/MobileShell";
import { QRCodeCard } from "@/components/metro/QRCodeCard";
import { TicketActionBar } from "@/components/metro/TicketActionBar";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function TicketView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement("a");
    link.href = "#";
    alert("Em um ambiente real, o bilhete seria baixado como imagem.");
  };

  const handleShare = () => {
    navigate(`/ticket/share/${id}`);
  };

  return (
    <MobileShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-5 flex-1"
      >
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">
            Bilhete eletrônico
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Apresente este código no acesso
          </p>
        </div>

        <QRCodeCard
          value={`metro-df-ticket-${id}`}
          size={220}
        />

        <div className="flex items-start gap-2 bg-accent rounded-lg px-4 py-3 w-full">
          <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-accent-foreground">
            Este bilhete é válido para uma única utilização
          </p>
        </div>

        <div className="w-full mt-auto pt-4">
          <TicketActionBar onDownload={handleDownload} onShare={handleShare} />
        </div>
      </motion.div>
    </MobileShell>
  );
}
