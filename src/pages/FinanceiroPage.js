import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

function FinanceiroPage() {
  const [saldoTokenME, setSaldoTokenME] = useState(1200);
  const [fundoME, setFundoMe] = useState(34544.7);

  return (
    <div>
      <h1>Financeiro</h1>
      <hr />
      <p>
        <strong>Saldo:</strong> R${" "}
        {fundoME.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (
        {saldoTokenME} TKS)
      </p>
      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="danger" className="flex-grow-1 me-1" style={{ width: "50%" }}>
          Pagar
        </Button>
        <Button variant="success" className="flex-grow-1 ms-1" style={{ width: "50%" }}>
          Receber
        </Button>
      </div>
      <hr />
    </div>
  );
}

export default FinanceiroPage;
