import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MobileShell } from "@/components/metro/MobileShell";
import { QRCodeCard } from "@/components/metro/QRCodeCard";
import { TicketActionBar } from "@/components/metro/TicketActionBar";
import { motion } from "framer-motion";
import { AlertCircle, Loader2 } from "lucide-react";

export default function TicketView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Estados para gerenciar a integração com o Backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);

  useEffect(() => {
  const fetchTicket = async () => {
    // Só dispara se o ID existir na URL
    if (!id) return;

    try {
      setLoading(true);
      // Confirme se o VITE_API_URL no .env termina em /api/v1
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tickets/${id}`);
      
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Ajuste conforme a estrutura do seu backend (pode ser result.data ou result direto)
      setTicketData(result.data || result);
      setError(false);
    } catch (err) {
      console.error("Erro na integração:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  fetchTicket();
}, [id]); // Executa sempre que o ID mudar

  const handleDownload = () => {
    // Lógica de simulação de download que você já tinha
    alert("Em um ambiente real, o bilhete seria baixado como imagem.");
  };

  const handleShare = () => {
    navigate(`/ticket/share/${id}`);
  };

  // 1. ESTADO DE CARREGAMENTO (Melhora a UX no celular)
  if (loading) {
    return (
      <MobileShell>
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">Validando bilhete...</p>
        </div>
      </MobileShell>
    );
  }

  // 2. ESTADO DE ERRO (Caso o ID seja inválido ou o banco esteja fora)
  if (error) {
    return (
      <MobileShell>
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <div className="bg-destructive/10 p-4 rounded-full mb-4">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Bilhete não encontrado</h2>
          <p className="text-muted-foreground mt-2 mb-8">
            Não foi possível localizar este bilhete eletrônico.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="text-primary font-bold underline"
          >
            Voltar ao início
          </button>
        </div>
      </MobileShell>
    );
  }

  // 3. TELA FINAL (Seu layout original com dados reais)
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

        {/* QRCodeCard usando o ID ou payload retornado do backend */}
        <QRCodeCard
          value={ticketData?.codigo_qr || `metro-df-ticket-${id}`}
          size={240}
        />

        {/* Informativo de Uso Único (Critério de Aceite da Story) */}
        <div className="flex items-start gap-3 bg-accent/50 border border-primary/10 rounded-2xl px-5 py-4 w-full">
          <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-bold text-sm text-accent-foreground uppercase tracking-tight">
              Uso Único
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Válido para apenas um embarque. Após validado na catraca, este QR Code será desativado.
            </p>
          </div>
        </div>

        <div className="w-full mt-auto pt-4 mb-2">
          <TicketActionBar onDownload={handleDownload} onShare={handleShare} />
        </div>
      </motion.div>
    </MobileShell>
  );
}