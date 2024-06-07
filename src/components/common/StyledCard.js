import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const StyledCard = ({ item, children, onClick }) => {
  const statusColors = {
    ativo: "green",
    pendente: "yellow",
    cancelado: "red",
    recusado: "red",
  };

  const [borderColor, setBorderColor] = useState(statusColors[item?.status] || "grey");

  useEffect(() => {
    setBorderColor(statusColors[item?.status] || "grey");
  }, [item?.status]);

  const cardOpacity = item?.status === "cancelado" || item?.status === "recusado" ? 0.6 : 1;

  return (
    <Card
      key={item._id}
      style={{
        width: "100%",
        margin: "10px auto",
        cursor: "pointer",
        opacity: cardOpacity,
        borderBottom: `10px solid ${borderColor}`,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
      onClick={onClick}
    >
      {children}
    </Card>
  );
};

export default StyledCard;
