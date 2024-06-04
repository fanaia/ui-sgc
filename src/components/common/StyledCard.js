import React from 'react';
import { Card } from 'react-bootstrap';

const StyledCard = ({ item, children, onClick }) => {
  const statusColors = {
    ativo: "green",
    pendente: "yellow",
    cancelado: "red",
    recusado: "red",
  };

  const cardOpacity =
    item?.status === "cancelado" || item?.status === "recusado" ? 0.7 : 1;

  return (
    <Card
      key={item._id}
      style={{
        width: "100%",
        margin: "10px auto",
        cursor: "pointer",
        opacity: cardOpacity,
        borderBottom: `10px solid ${statusColors[item?.status] || "grey"}`,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
      onClick={onClick}
    >
      {children}
    </Card>
  );
};

export default StyledCard;