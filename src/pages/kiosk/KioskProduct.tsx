import { useNavigate } from "react-router-dom";
import { KioskShell } from "@/components/metro/KioskShell";
import { PrimaryButton } from "@/components/metro/PrimaryButton";
import { SecondaryButton } from "@/components/metro/SecondaryButton";
import { motion } from "framer-motion";
import { QrCode, ArrowLeft } from "lucide-react";

export default function KioskProduct() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleCreateOrder = async () => {
    try {
      const sessaoId = localStorage.getItem("sessaoId");
      console.log("sessaoId salvo:", sessaoId);

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_sessao: Number(sessaoId),
          valor_total: 5.5
        })
      });

      const data = await response.json();

      console.log("Pedido criado:", data);

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Erro ao criar pedido");
      }

      localStorage.setItem(
        "pedidoId",
        String(data.id_pedido ?? data.data?.id_pedido)
      );

      navigate("/kiosk/pix");
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
    }
  };

  return (
    <KioskShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-8 w-full max-w-lg"
      >
        <div className="w-full bg-card rounded-xl border-2 border-border p-6 lg:p-8 shadow-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <QrCode className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-display font-bold text-foreground">
                Bilhete Unitário Comum
              </h2>
              <p className="text-sm lg:text-base text-muted-foreground mt-1">
                Compra de 1 bilhete por operação
              </p>
            </div>
          </div>

          <div className="border-t-2 border-border pt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-base lg:text-lg text-muted-foreground">Valor</span>
              <span className="text-3xl lg:text-4xl font-display font-extrabold text-foreground">
                R$ 5,50
              </span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <PrimaryButton onClick={handleCreateOrder}>
            Pagar com Pix
          </PrimaryButton>

          <SecondaryButton
            onClick={() => navigate("/kiosk/home")}
            icon={<ArrowLeft className="w-5 h-5" />}
          >
            Voltar
          </SecondaryButton>
        </div>
      </motion.div>
    </KioskShell>
  );
}