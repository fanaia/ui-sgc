import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import StyledCard from "../common/StyledCard";
import Etiqueta from "../common/Etiqueta";
import { formatData, formatToken } from "../../utils/displayFormatters";
import StatusSelect from "../common/StatusSelect";

const AtividadeCard = ({ item }) => {
  const { setSelectedItem, setShowModal } = useContext(CrudContext);

  const handleSelect = () => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <StyledCard item={item} onClick={handleSelect}>
      <Card.Header>{item?.descricao}</Card.Header>

      <Card.Body>
      
      <div style={{ display: "flex" }}>
          <div style={{ flex: 3, overflow: "auto" }}>
        <Card.Text>
          <strong>Participante: </strong>
          {item.participante?.nome}
        </Card.Text>
        <Card.Text>
          <strong>Total de Horas: </strong>
          {item?.totalHoras} hrs
        </Card.Text>
        <Card.Text>
          <strong>Total Tokens: </strong>
          {formatToken(item?.totalTokens)}
        </Card.Text>
        <Card.Text>
          <strong>Data Realização: </strong>
          {formatData(item?.dataRealizacao)}
        </Card.Text>
        </div>
          <div style={{ flex: 1, textAlign: "right", overflow: "auto" }}>
            <Card.Text>
              <StatusSelect label={item.descricao} router="atividades" object={item} />
            </Card.Text>
          </div>
        </div>
      </Card.Body>

      <Card.Footer>
        <Etiqueta
          label={item?.grupoTrabalho?.nome}
          corEtiqueta={item?.grupoTrabalho?.corEtiqueta}
        />
        <Etiqueta label={item?.projeto?.nome} corEtiqueta={item?.projeto?.corEtiqueta} />
      </Card.Footer>
    </StyledCard>
  );
};

export default AtividadeCard;
 