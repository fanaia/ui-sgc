import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import StyledCard from "../common/StyledCard";
import StatusSelect from "../common/StatusSelect";

const ParticipanteCard = ({ item }) => {
  const { setSelectedItem, setShowModal } = useContext(CrudContext);
  const [status, setStatus] = useState(item?.status);

  const handleSelect = () => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const tokenHoraMap = {
    0.2: "Aprendiz: 0,2 PIX/hora",
    0.4: "Iniciante: 0,4 PIX/hora",
    0.6: "Experiente: 0,6 PIX/hora",
    0.8: "Especialista: 0,8 PIX/hora",
    1: "Responsável: 1,0 PIX/hora",
  };

  return (
    <StyledCard item={item} status={item.status} onClick={handleSelect}>
      <Card.Header>{item?.nome}</Card.Header>

      <Card.Body>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 3, overflow: "auto" }}>
            <Card.Text>
              <strong>{tokenHoraMap[item?.tokenHora]}</strong>
            </Card.Text>
            <Card.Text>
              <strong>Peso Consenso: </strong>
              {item?.pesoConsenso}
            </Card.Text>
          </div>
          <div style={{ flex: 1, textAlign: "right", overflow: "auto" }}>
            <Card.Text>
              <StatusSelect label={item.nome} router="participantes" object={item} />
            </Card.Text>
          </div>
        </div>
      </Card.Body>
    </StyledCard>
  );
};

export default ParticipanteCard;
