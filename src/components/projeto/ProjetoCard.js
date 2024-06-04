import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import StyledCard from "../common/StyledCard";

const ProjetoCard = ({ item }) => {
  const { setSelectedItem, setShowModal } = useContext(CrudContext);

  const handleSelect = () => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <StyledCard item={item} onClick={handleSelect}>
      <Card.Header style={{ backgroundColor: item?.corEtiqueta, color: 'black' }}>{item?.nome}</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Responsável: </strong>
          {item.participanteResponsavel?.nome}
        </Card.Text>
        <Card.Text>
          <strong>Status: </strong>
          {item?.status}
        </Card.Text>
      </Card.Body>
    </StyledCard>
  );
};

export default ProjetoCard;