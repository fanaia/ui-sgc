import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import apiRetaguarda from "../../config/apiRetaguarda";
import { formatToken } from '../../utils/displayFormatters';

const CardSaldoTokensTotal = () => {
  const [saldoTotal, setSaldoTotal] = useState(0);

  useEffect(() => {
    const fetchSaldoTotal = async () => {
      const response = await apiRetaguarda.get('tokens/saldo-total');
      setSaldoTotal(response.data.saldo);
    };

    fetchSaldoTotal();
  }, []);

  return (
    <Card className="mb-3">
      <Card.Header>Total Tokens</Card.Header>
      <Card.Body>
        <Card.Text>
          {formatToken(saldoTotal)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardSaldoTokensTotal;