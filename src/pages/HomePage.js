import React from "react";
import { Card, Container } from "react-bootstrap";

function HomePage() {
  return (
    <Container>
      <Card className="mb-3">
        <Card.Header>
          <strong>Cotação PIX</strong>
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ display: "flex", alignItems: "center" }}>
            <strong style={{ fontSize: "1.2em" }}>R$ 98,00</strong>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>
          <strong>Saldo</strong>
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ display: "flex", alignItems: "center" }}>
            <strong style={{ fontSize: "1.2em" }}>4.200 PIX / R$ 336.000,00</strong>
          </Card.Text>
        </Card.Body>
      </Card>
      <hr />
      <Card className="mb-3">
        <Card.Header>
          <strong>Fundo Segurança</strong>
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ display: "flex", alignItems: "center" }}>
            <strong style={{ fontSize: "1.2em" }}>R$ 13.450,00</strong> - 3 meses
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>
          <strong>Fundo Liquidação</strong>
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ display: "flex", alignItems: "center" }}>
            <strong style={{ fontSize: "1.2em" }}>R$ 13.450,00</strong> - 340 PIX
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>
          <strong>Fundo Projetos</strong>
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ display: "flex", alignItems: "center" }}>
            <strong style={{ fontSize: "1.2em" }}>R$ 13.450,00</strong>
          </Card.Text>
        </Card.Body>
      </Card>
      <hr />
      <Card className="mb-3">
        <Card.Header>
          <strong>Cotação Mínima</strong>
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ display: "flex", alignItems: "center" }}>
            <strong style={{ fontSize: "1.2em" }}>R$ 40,00</strong>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>
          <strong>Liquidação Máxima</strong>
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ display: "flex", alignItems: "center" }}>
            <strong style={{ fontSize: "1.2em" }}>5x - R$ 200,00</strong>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>
          <strong>Meses Estabilidade</strong>
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ display: "flex", alignItems: "center" }}>
            <strong style={{ fontSize: "1.2em" }}>3 meses</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default HomePage;
