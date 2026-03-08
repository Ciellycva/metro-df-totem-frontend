import { useNavigate, useParams } from "react-router-dom";
import { MobileShell } from "@/components/metro/MobileShell";
import { PrimaryButton } from "@/components/metro/PrimaryButton";
import { SecondaryButton } from "@/components/metro/SecondaryButton";
import { motion } from "framer-motion";
import { Share2, MessageCircle, Mail, Copy, ArrowLeft } from "lucide-react";

export default function TicketShare() {
  const { id } = useParams();
  const navigate = useNavigate();

  const shareOptions = [
    { icon: <MessageCircle className="w-6 h-6" />, label: "WhatsApp" },
    { icon: <Mail className="w-6 h-6" />, label: "E-mail" },
    { icon: <Copy className="w-6 h-6" />, label: "Copiar link" },
  ];

  return (
    <MobileShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-6 flex-1"
      >
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
          <Share2 className="w-8 h-8 text-primary" />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">
            Enviar bilhete para outra pessoa
          </h1>
          <p className="text-base text-muted-foreground mt-2">
            Bilhete pronto para envio
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          {shareOptions.map((opt) => (
            <button
              key={opt.label}
              className="w-full flex items-center gap-4 bg-card border-2 border-border rounded-lg px-5 py-4 active:bg-muted transition-colors"
              onClick={() => alert(`Compartilhar via ${opt.label} (simulação)`)}
            >
              <div className="text-primary">{opt.icon}</div>
              <span className="text-base font-medium text-foreground">{opt.label}</span>
            </button>
          ))}
        </div>

        <div className="w-full mt-auto pt-4">
          <SecondaryButton onClick={() => navigate(`/ticket/view/${id}`)} icon={<ArrowLeft className="w-5 h-5" />}>
            Voltar ao bilhete
          </SecondaryButton>
        </div>
      </motion.div>
    </MobileShell>
  );
}
