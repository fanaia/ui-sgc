import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";

const ParticipanteCard = ({ item }) => {
  const { setSelectedItem, setShowModal } = useContext(CrudContext);

  const handleSelect = () => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <Card
      key={item._id}
      style={{
        width: "100%",
        margin: "10px",
        cursor: "pointer",
        borderLeft: "5px solid #007bff",
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
