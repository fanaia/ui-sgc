import React from "react";
import { Card } from "react-bootstrap";

const ProjetoCard = ({ projeto, handleEdit }) => {
  const cardOpacity = ["cancelado", "recusado"].includes(projeto.status)
    ? 0.7
    : 1;

  return (
    <Card
      key={projeto._id}
      style={{
        width: "100%",
        margin: "10px",
        borderLeft: `10px solid ${projeto.corEtiqueta}`,
        cursor: "pointer",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        opacity: cardOpacity,
      }}
      onClick={() => handleEdit(projeto._id)}
    >
      <Card.Body>
        <div className="mt-2">
          <label style={{ cursor: "pointer", fontWeight: "bold" }}>
            {projeto.nome}
          </label>
        </div>
        <div className="mt-2">
          <label style={{ cursor: "pointer" }}>
            Status:{" "}
            {projeto.status.charAt(0).toUpperCase() + projeto.status.slice(1)}
          </label>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjetoCard;
