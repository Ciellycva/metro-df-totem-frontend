import { useParams, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { QRCodeCard } from "@/components/metro/QRCodeCard";

export default function TicketView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);

  const fetchTicket = async () => {
    try {
      if (!id) {
        throw new Error("ID do bilhete não informado");
      }

      const response = await fetch(`${API_URL}/tickets/${id}`);
      const data = await response.json();

      console.log("Ticket recebido:", data);

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Erro ao buscar bilhete");
      }

      const ticketData = data.data ?? data;

      setTicket(ticketData);

    } catch (error) {
      console.error("Erro ao carregar bilhete:", error);
      navigate("/ticket/error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const handleValidateTicket = async () => {
    try {
      setValidating(true);

      const response = await fetch(`${API_URL}/validations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_bilhete: ticket.id_bilhete,
          identificador_ponto: "CATRACA-CENTRAL-01"
        })
      });

      const data = await response.json();

      console.log("Validação:", data);

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Erro na validação");
      }

      alert("Bilhete validado com sucesso 🚇");

      // Atualiza status visual imediatamente
      setTicket((prev: any) => ({
        ...prev,
        status: "USADO"
      }));

      // Opcional: recarregar do backend (mais seguro)
      await fetchTicket();

    } catch (error) {
      console.error("Erro ao validar:", error);
      alert("Falha na validação ❌");
    } finally {
      setValidating(false);
    }
  };

  const getStatusColor = () => {
    switch (ticket.status) {
      case "ATIVO":
        return "text-green-600";
      case "USADO":
        return "text-red-600";
      case "EXPIRADO":
        return "text-gray-500";
      default:
        return "text-yellow-600";
    }
  };

  if (loading) {
    return <p>Carregando bilhete...</p>;
  }

  if (!ticket) {
    return <p>Bilhete não encontrado</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-6">
      <h1 className="text-2xl font-bold">Seu Bilhete</h1>

      <QRCodeCard
        value={ticket.qr_code || String(ticket.id_bilhete)}
        size={260}
      />

      <div className="text-center">
        <p><strong>ID:</strong> {ticket.id_bilhete}</p>
        <p className={getStatusColor()}>
          <strong>Status:</strong> {ticket.status}
        </p>
        <p><strong>Validade:</strong> {ticket.validade ?? "—"}</p>
      </div>

      <button
        onClick={handleValidateTicket}
        disabled={validating || ticket.status === "USADO"}
        className="bg-green-600 text-white px-6 py-3 rounded-lg mt-4 disabled:opacity-50"
      >
        {validating ? "Validando..." : "Validar bilhete"}
      </button>
    </div>
  );
}