import React from "react";
import { Card } from "react-bootstrap";
import { formatMoeda } from "../../utils/displayFormatters";

const CardCotacaoToken = () => {
  return (
    <Card className="mb-3">
      <Card.Header>Cotação PIX</Card.Header>
      <Card.Body>
        <Card.Text>{formatMoeda(40)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardCotacaoToken;
