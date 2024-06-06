import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import apiRetaguarda from "../../config/apiRetaguarda";
import { formatMoeda } from "../../utils/displayFormatters";

const CardCotacaoToken = () => {
  const [cotacao, setCotacao] = useState(0);

  useEffect(() => {
    const fetchCotacao = async () => {
      const response = await apiRetaguarda.get("tokens/cotacao");
      setCotacao(response.data.cotacao);
    };

    fetchCotacao();
  }, []);

  return (
    <Card className="mb-3">
      <Card.Header>Cotação PIX</Card.Header>
      <Card.Body>
        <Card.Text>{formatMoeda(cotacao)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardCotacaoToken;
