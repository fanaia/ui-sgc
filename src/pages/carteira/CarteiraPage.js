import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {
  CurrencyExchange,
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowRightCircle,
} from "react-bootstrap-icons";
import "./CarteiraPage.css";

function CarteiraPage() {
  // Funções para lidar com a compra e venda de tokens vão aqui
  const [saldoTokenME, setSaldoTokenME] = useState(1200);
  const [fundoME, setFundoMe] = useState(34544.7);
  const [cotacaoToken, setCotacaoToken] = useState(fundoME / saldoTokenME);
  const [saldoToken, setSaldoToken] = useState(340);

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>
        <CurrencyExchange size={32} style={{ marginRight: "20px" }} />
        Carteira
        <CurrencyExchange size={32} style={{ marginLeft: "20px" }} />
      </h1>
      <Card className="mb-3">
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Card.Title>
              <strong>Valor Tempo</strong>
              <div style={{ fontSize: "0.8em" }}>Cotação pix-Conta (PIX)</div>
            </Card.Title>
            <Card.Text style={{ display: "flex", alignItems: "center" }}>
              <strong style={{ fontSize: "1.2em" }}>
                R${" "}
                {cotacaoToken.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </strong>
            </Card.Text>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Card.Title style={{ display: "flex", alignItems: "center" }}>
              <strong>Saldo Pessoal</strong>
            </Card.Title>
            <Card.Text>
              <strong style={{ fontSize: "1.2em" }}>{saldoToken} PIX</strong>
              <div style={{ fontSize: "0.8em" }}>
                R${" "}
                {(saldoToken * cotacaoToken).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
      <div className="button-container">
        <Button variant="danger" className="custom-button">
          <ArrowDownCircle className="mr-3" size={32} style={{ marginRight: "10px" }} />
          Liquidar
        </Button>
        <Button variant="success" className="custom-button">
          <ArrowUpCircle className="mr-3" size={32} style={{ marginRight: "10px" }} />
          Comprar
        </Button>
        <Button variant="warning" className="custom-button">
          <ArrowRightCircle className="mr-3" size={32} style={{ marginRight: "10px" }} />
          Transferir
        </Button>
      </div>
    </Container>
  );
}

export default CarteiraPage;
