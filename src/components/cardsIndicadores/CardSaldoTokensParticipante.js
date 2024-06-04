import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import apiRetaguarda from "../../config/apiRetaguarda";
import { formatToken } from "../../utils/displayFormatters";

const CardSaldoTokensParticipante = () => {
  const [saldoTotal, setSaldoTotal] = useState(0);

  useEffect(() => {
    const fetchSaldoTotal = async () => {
      const response = await apiRetaguarda.get("tokens/saldo-participante");
      setSaldoTotal(response.data.saldo);
    };

    fetchSaldoTotal();
  }, []);

  return (
    <Card className="mb-3">
      <Card.Header>Meu Saldo</Card.Header>
      <Card.Body>
        <Card.Text>{formatToken(saldoTotal)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardSaldoTokensParticipante;
