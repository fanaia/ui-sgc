import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import apiRetaguarda from "../../config/apiRetaguarda";
import { formatMoeda } from '../../utils/displayFormatters';

const CardSaldoTotal = () => {
  const [saldoTotal, setSaldoTotal] = useState(0);

  useEffect(() => {
    const fetchSaldoTotal = async () => {
      const response = await apiRetaguarda.get('movimentacoes-financeiras/getSaldoTotal');
      setSaldoTotal(response.data.saldo);
    };

    fetchSaldoTotal();
  }, []);

  return (
    <Card className="mb-3">
      <Card.Header>Saldo Total</Card.Header>
      <Card.Body>
        <Card.Text>
          {formatMoeda(saldoTotal)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardSaldoTotal;