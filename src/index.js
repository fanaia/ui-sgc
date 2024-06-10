import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import LoginPage from "./pages/LoginPage";
import ProjetosPage from "./pages/ProjetosPage";
import ConsensoPage from "./pages/ConsensoPage";
import ParticipantesPage from "./pages/ParticipantesPage";
import MovimentacaoFinanceiraPage from "./pages/MovimentacaoFinanceiraPage";
import AtividadesPage from "./pages/AtividadesPage";
import GruposTrabalhoPage from "./pages/GruposTrabalhoPage";
import HomePage from "./pages/HomePage";
import { MessageProvider } from "./contexts/MessageContext"; // Import the provider
import MessageDisplay from "./components/common/MessageDisplay";
import StartPage from "./pages/StartPage";
import CSNaoInformadoPage from "./pages/CSNaoInformadoPage";

const root = createRoot(document.getElementById("root"));

const App = () => {
  return (
    <MessageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CSNaoInformadoPage />} />
          <Route path="/:contratoSocial" element={<LoginPage />} />
          <Route path="/:contratoSocial/seed" element={<StartPage />} />
          <Route
            path="/:contratoSocial/auth/*"
            element={
              <>
                <Header />
                <MessageDisplay />
                <Routes>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/consenso" element={<ConsensoPage />} />
                  <Route path="/atividades" element={<AtividadesPage />} />
                  <Route path="/participantes" element={<ParticipantesPage />} />
                  <Route
                    path="/movimentacoes-financeiras"
                    element={<MovimentacaoFinanceiraPage />}
                  />
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
