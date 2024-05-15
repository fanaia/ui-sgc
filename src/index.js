import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/footer/Footer";
// import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjetosPage from "./pages/ProjetosPage";
import ConsensoPage from "./pages/ConsensoPage";
import ParticipantesPage from "./pages/ParticipantesPage";
import FinanceiroPage from "./pages/FinanceiroPage";
import CarteiraPage from "./pages/carteira/CarteiraPage";
import AtividadesPage from "./pages/AtividadesPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/auth/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/home" element={<CarteiraPage />} />
                <Route path="/carteira" element={<CarteiraPage />} />
                <Route path="/consenso" element={<ConsensoPage />} />
                <Route path="/atividades" element={<AtividadesPage />} />
                <Route path="/participantes" element={<ParticipantesPage />} />
                <Route path="/financeiro" element={<FinanceiroPage />} />
                <Route path="/projetos" element={<ProjetosPage />} />
              </Routes>
              <Footer consensosParaVer={3}/>
            </>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
