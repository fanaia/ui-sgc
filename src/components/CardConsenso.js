import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CardConsenso = ({ card }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{card.descricao}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{card.grupo.nome}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{card.projeto.nome}</Card.Subtitle>
        <Button variant="primary">Ver detalhes</Button>
        <Button variant="primary">Aceitar</Button>
        <Button variant="primary">Recusar</Button>
      </Card.Body>
    </Card>
  );
};

export default CardConsenso;