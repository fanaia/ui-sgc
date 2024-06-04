import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import StyledCard from "../common/StyledCard";
import Etiqueta from "../common/Etiqueta";
import { dataExibicao } from "../../utils/formatDate";

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
        <Card.Text>
          <strong>Participante: </strong>
          {item.participante?.nome}
        </Card.Text>
        <Card.Text>
          <strong>Total de Horas: </strong>
          {item?.totalHoras}h
        </Card.Text>
        <Card.Text>
          <strong>Data Realização: </strong>
          {dataExibicao(item?.dataRealizacao)}
        </Card.Text>
        <Card.Text>
          <strong>Status: </strong>
          {item?.status}
        </Card.Text>
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
