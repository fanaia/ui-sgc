import React from "react";
import { Container } from "react-bootstrap";
import CardSaldoTotal from "../components/cardsIndicadores/CardSaldoTotal";
import CardCotacaoToken from "../components/cardsIndicadores/CardCotacaoToken";

function HomePage() {
  return (
    <Container>
      <CardCotacaoToken />
      <CardSaldoTotal />
    </Container>
  );
}

export default HomePage;
