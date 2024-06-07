import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import StatusContext from "../../contexts/StatusContext";

const StyledCard = ({ item, children, onClick }) => {
  const statusColors = {
    ativo: "green",
    pendente: "yellow",
    cancelado: "red",
    recusado: "red",
  };

  const [status, setStatus] = useState(item?.status);
  const [borderColor, setBorderColor] = useState(statusColors[status] || "grey");

  useEffect(() => {
    setBorderColor(statusColors[status] || "grey");
  }, [status]);

  const cardOpacity = status === "cancelado" || status === "recusado" ? 0.6 : 1;

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
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
    </StatusContext.Provider>
  );
};

export default StyledCard;
