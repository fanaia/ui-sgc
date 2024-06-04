import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";

const ParticipanteCard = ({ item }) => {
  const { setSelectedItem, setShowModal } = useContext(CrudContext);

  const statusColors = {
    ativo: "green",
    pendente: "yellow",
    cancelado: "red",
    recusado: "red",
  };

  const cardOpacity =
    item?.status === "cancelado" || item?.status === "recusado" ? 0.7 : 1;

  const handleSelect = () => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <Card
      key={item._id}
      style={{
        width: "100%",
        margin: "10px auto",
        cursor: "pointer",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        opacity: cardOpacity,
        borderBottom: `10px solid ${statusColors[item?.status] || "grey"}`,
      }}
      onClick={() => handleSelect(item)}
    >
      <Card.Header style={{ backgroundColor: "#ffffff", fontWeight: "bold" }}>
        {item?.nome}
      </Card.Header>
      <Card.Body style={{ fontSize: "calc(1em - 3px)", fontStyle: "italic" }}>
        <Card.Text>
          <strong>Valor hora: </strong>
          {item?.tokenHora}
        </Card.Text>
        <Card.Text>
          <strong>Status: </strong>
          {item?.status}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ParticipanteCard;
