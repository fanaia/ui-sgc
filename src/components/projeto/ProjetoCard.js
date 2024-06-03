import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";

const ProjetoCard = ({ item }) => {
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
        borderLeft: `10px solid ${item.corEtiqueta}`,
      }}
      onClick={handleSelect}
    >
      <Card.Header style={{ backgroundColor: "#ffffff", fontWeight: "bold" }}>
        {item?.nome}
      </Card.Header>
      <Card.Body style={{ fontSize: "calc(1em - 3px)", fontStyle: "italic" }}>
        <Card.Text>
          <strong>Responsável: </strong>
          {item?.participanteResponsavel ? item.participanteResponsavel.nome : "Carregando..."}
        </Card.Text>
        <Card.Text>
          <strong>Status: </strong>
          {item?.status}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProjetoCard;
