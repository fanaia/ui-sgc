import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import LoginPage from "./pages/LoginPage";
import ProjetosPage from "./pages/ProjetosPage";
import ConsensoPage from "./pages/ConsensoPage";
import ParticipantesPage from "./pages/ParticipantesPage";
import FinanceiroPage from "./pages/FinanceiroPage";
import CarteiraPage from "./pages/carteira/CarteiraPage";
import AtividadesPage from "./pages/AtividadesPage";
import GruposTrabalhoPage from "./pages/GruposTrabalhoPage";
import HomePage from "./pages/HomePage";
import { MessageProvider } from "./contexts/MessageContext"; // Import the provider
import MessageDisplay from "./components/common/MessageDisplay";

const root = createRoot(document.getElementById("root"));

const App = () => {
  return (
    <MessageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/auth/*"
            element={
              <>
                <Header />
                <MessageDisplay />
                <Routes>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/carteira" element={<CarteiraPage />} />
                  <Route path="/consenso" element={<ConsensoPage />} />
                  <Route path="/atividades" element={<AtividadesPage />} />
                  <Route path="/participantes" element={<ParticipantesPage />} />
                  <Route path="/financeiro" element={<FinanceiroPage />} />
                  <Route path="/grupos-trabalho" element={<GruposTrabalhoPage />} />
                  <Route path="/projetos" element={<ProjetosPage />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </MessageProvider>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
