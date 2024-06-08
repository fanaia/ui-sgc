import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import StyledCard from "../common/StyledCard";
import StatusSelect from "../common/StatusSelect";

const ProjetoCard = ({ item }) => {
  const { setSelectedItem, setShowModal } = useContext(CrudContext);

  const handleSelect = () => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <StyledCard item={item} onClick={handleSelect}>
      <Card.Header style={{ backgroundColor: item?.corEtiqueta, color: "black" }}>
        {item?.nome}
      </Card.Header>
      <Card.Body>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 3, overflow: "auto" }}>
            <Card.Text>
              <strong>Responsável: </strong>
              {item.participanteResponsavel?.nome}
            </Card.Text>
          </div>
          <div style={{ flex: 1, textAlign: "right", overflow: "auto" }}>
            <Card.Text>
              <StatusSelect label={item.nome} router="projetos" object={item} />
            </Card.Text>
          </div>
        </div>
      </Card.Body>
    </StyledCard>
  );
};

export default ProjetoCard;
