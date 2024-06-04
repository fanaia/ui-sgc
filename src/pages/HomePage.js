import React from "react";
import { Card, Container } from "react-bootstrap";

function HomePage() {
  return (
    <Container>
      <Card className="mb-3">
        <Card.Header>Cotação PIX</Card.Header>
        <Card.Body>
          <Card.Text>R$ 98,00</Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>Meu Saldo</Card.Header>
        <Card.Body>
          <Card.Text>4.200 PIX / R$ 336.000,00</Card.Text>
        </Card.Body>
      </Card>
      <hr />
      <Card className="mb-3">
        <Card.Header>Fundo Segurança</Card.Header>
        <Card.Body>
          <Card.Text>R$ 13.450,00 - 3 meses</Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>Fundo Liquidação</Card.Header>
        <Card.Body>
          <Card.Text>R$ 13.450,00 - 340 PIX</Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>Fundo Projetos</Card.Header>
        <Card.Body>
          <Card.Text>R$ 13.450,00</Card.Text>
        </Card.Body>
      </Card>
      <hr />
      <Card className="mb-3">
        <Card.Header>Cotação Mínima</Card.Header>
        <Card.Body>
          <Card.Text>R$ 40,00</Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>Liquidação Máxima</Card.Header>
        <Card.Body>
          <Card.Text>5x - R$ 200,00</Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>Meses Estabilidade</Card.Header>
        <Card.Body>
          <Card.Text>3 meses</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default HomePage;
