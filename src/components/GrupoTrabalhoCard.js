import React from "react";
import { Card } from "react-bootstrap";

const GrupoTrabalhoCard = ({ grupoTrabalho, handleEdit }) => {
  const cardOpacity = ["cancelado", "recusado"].includes(grupoTrabalho.status)
    ? 0.7
    : 1;

  return (
    <Card
      key={grupoTrabalho._id}
      style={{
        width: "100%",
        margin: "10px",
        borderLeft: `10px solid ${grupoTrabalho.corEtiqueta}`,
        cursor: "pointer",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        opacity: cardOpacity,
      }}
      onClick={() => handleEdit(grupoTrabalho._id)}
    >
      <Card.Body>
        <div className="mt-2">
          <label style={{ cursor: "pointer", fontWeight: "bold" }}>
            {grupoTrabalho.nome}
          </label>
        </div>
        <div className="mt-2">
          <label style={{ cursor: "pointer" }}>
            Responsável:{" "}
            {grupoTrabalho.participanteResponsavel
              ? grupoTrabalho.participanteResponsavel.nome
              : "Carregando..."}
          </label>
        </div>
        <div className="mt-2">
          <label style={{ cursor: "pointer" }}>
            Status:{" "}
            {grupoTrabalho.status.charAt(0).toUpperCase() +
              grupoTrabalho.status.slice(1)}
          </label>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GrupoTrabalhoCard;
