import React, { useState } from "react";
import { Button } from "react-bootstrap";

function CarteiraPage() {
  // Funções para lidar com a compra e venda de tokens vão aqui
  const [saldoTokenME, setSaldoTokenME] = useState(1200);
  const [fundoME, setFundoMe] = useState(34544.7);
  const [cotacaoToken, setCotacaoToken] = useState(fundoME / saldoTokenME);
  const [saldoToken, setSaldoToken] = useState(340);

  return (
    <div>
      <h1>Carteira</h1>
      <hr />
      <p>
        <strong>Cotação Token:</strong> R${" "}
        {cotacaoToken.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
      <p>
        <strong>Saldo Pessoal:</strong> {saldoToken} TKS (R${" "}
        {(saldoToken * cotacaoToken).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        )
      </p>
      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="danger" className="flex-grow-1 me-1">
          Liquidar
        </Button>
        <Button variant="success" className="flex-grow-1 mx-1">
          Comprar
        </Button>
        <Button variant="warning" className="flex-grow-1 ms-1">
          Transferir
        </Button>
      </div>
      <hr />
    </div>
  );
}

export default CarteiraPage;
