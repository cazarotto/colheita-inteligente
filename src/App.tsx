import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import SafrasPage from "@/pages/SafrasPage";
import TalhoesPage from "@/pages/TalhoesPage";
import OperacoesPage from "@/pages/OperacoesPage";
import PlanejamentoPage from "@/pages/PlanejamentoPage";
import PulverizacoesPage from "@/pages/PulverizacoesPage";
import ContasPagarPage from "@/pages/ContasPagarPage";
import ContasReceberPage from "@/pages/ContasReceberPage";
import EstoquePage from "@/pages/EstoquePage";
import VendasPage from "@/pages/VendasPage";
import OperadoresPage from "@/pages/OperadoresPage";
import MaquinasPage from "@/pages/MaquinasPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/safras" element={<SafrasPage />} />
            <Route path="/talhoes" element={<TalhoesPage />} />
            <Route path="/operacoes" element={<OperacoesPage />} />
            <Route path="/planejamento" element={<PlanejamentoPage />} />
            <Route path="/pulverizacoes" element={<PulverizacoesPage />} />
            <Route path="/financeiro/pagar" element={<ContasPagarPage />} />
            <Route path="/financeiro/receber" element={<ContasReceberPage />} />
            <Route path="/estoque" element={<EstoquePage />} />
            <Route path="/comercial/vendas" element={<VendasPage />} />
            <Route path="/cadastros/operadores" element={<OperadoresPage />} />
            <Route path="/cadastros/maquinas" element={<MaquinasPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
