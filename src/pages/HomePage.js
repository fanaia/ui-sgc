import React from "react";
import { Container } from "react-bootstrap";
import CardSaldoTotal from "../components/cardsIndicadores/CardSaldoTotal";
import CardCotacaoToken from "../components/cardsIndicadores/CardCotacaoToken";
import CardSaldoTokensParticipante from "../components/cardsIndicadores/CardSaldoTokensParticipante";
import CardSaldoTokensTotal from "../components/cardsIndicadores/CardSaldoTokensTotal";

function HomePage() {
  return (
    <Container>
      <CardCotacaoToken />
      <hr />
      <CardSaldoTokensParticipante />
      <hr />
      <CardSaldoTotal />
      <CardSaldoTokensTotal />
    </Container>
  );
}

export default HomePage;
