import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import StyledCard from "../common/StyledCard";

const ParticipanteCard = ({ item }) => {
  const { setSelectedItem, setShowModal } = useContext(CrudContext);

  const handleSelect = () => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const tokenHoraMap = {
    0.2: "Aprendiz - 0,2 token",
    0.4: "Iniciante - 0,4 token",
    0.6: "Experiente - 0,6 token",
    0.8: "Especialista - 0,8 token",
    1: "Responsável - 1 token",
  };

  return (
    <StyledCard item={item} onClick={handleSelect}>
      <Card.Header>{item?.nome}</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Valor hora: </strong>
          {tokenHoraMap[item?.tokenHora]}
        </Card.Text>
        <Card.Text>
          <strong>Peso Consenso: </strong>
          {item?.pesoConsenso}
        </Card.Text>
        <Card.Text>
          <strong>Status: </strong>
          {item?.status}
        </Card.Text>
      </Card.Body>
    </StyledCard>
  );
};

export default ParticipanteCard;
