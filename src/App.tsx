import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Kiosk pages
import KioskIdle from "./pages/kiosk/KioskIdle";
import KioskHome from "./pages/kiosk/KioskHome";
import KioskProduct from "./pages/kiosk/KioskProduct";
import KioskPix from "./pages/kiosk/KioskPix";
import KioskPixProcessing from "./pages/kiosk/KioskPixProcessing";
import KioskPaymentSuccess from "./pages/kiosk/KioskPaymentSuccess";
import KioskPaymentFailure from "./pages/kiosk/KioskPaymentFailure";
import KioskPixExpired from "./pages/kiosk/KioskPixExpired";
import KioskOperationalContingency from "./pages/kiosk/KioskOperationalContingency";
import KioskSessionEnd from "./pages/kiosk/KioskSessionEnd";

// Ticket pages
import TicketView from "./pages/ticket/TicketView";
import TicketShare from "./pages/ticket/TicketShare";
import TicketError from "./pages/ticket/TicketError";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/kiosk/idle" replace />} />

          {/* Kiosk routes */}
          <Route path="/kiosk/idle" element={<KioskIdle />} />
          <Route path="/kiosk/home" element={<KioskHome />} />
          <Route path="/kiosk/product" element={<KioskProduct />} />
          <Route path="/kiosk/pix" element={<KioskPix />} />
          <Route path="/kiosk/pix-processing" element={<KioskPixProcessing />} />
          <Route path="/kiosk/payment-success" element={<KioskPaymentSuccess />} />
          <Route path="/kiosk/payment-failure" element={<KioskPaymentFailure />} />
          <Route path="/kiosk/pix-expired" element={<KioskPixExpired />} />
          <Route path="/kiosk/operational-contingency" element={<KioskOperationalContingency />} />
          <Route path="/kiosk/session-end" element={<KioskSessionEnd />} />

          {/* Ticket routes */}
          <Route path="/ticket/view/:id" element={<TicketView />} />
          <Route path="/ticket/share/:id" element={<TicketShare />} />
          <Route path="/ticket/error" element={<TicketError />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
