import React from 'react';
import { Card } from 'react-bootstrap';

const ParticipanteCard = ({ participante, handleEdit }) => {
  return (
    <Card
      key={participante._id}
      style={{
        width: "100%",
        margin: "10px",
        cursor: "pointer",
        borderLeft: "8px solid darkblue",
      }}
      onClick={() => handleEdit(participante._id)}
    >
      <Card.Header
        style={{ backgroundColor: "#ffffff", fontWeight: "bold" }}
      >
        {participante.nome}
      </Card.Header>
      <Card.Body
        style={{ fontSize: "calc(1em - 3px)", fontStyle: "italic" }}
      >
        <div className="row">
          <div className="col">
            <Card.Text>
              <strong>Status:</strong>{" "}
              {participante.status.charAt(0).toUpperCase() +
                participante.status.slice(1)}
            </Card.Text>
          </div>
          <div className="col">
            <Card.Text>
              <strong>Tokens/hora:</strong> {participante.tokenHora}
              tk(s)
            </Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ParticipanteCard;