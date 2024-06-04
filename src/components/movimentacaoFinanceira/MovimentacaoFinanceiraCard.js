import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import Etiqueta from "../common/Etiqueta";
import StyledCard from "../common/StyledCard";

const MovimentacaoFinanceiraCard = ({ item }) => {
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
          <strong>Valor: </strong>
          {item?.valor}
        </Card.Text>
        <Card.Text>
          <strong>Tipo de Movimentação: </strong>
          {item?.tipoMovimentacao === 1 ? "Receber" : "Pagar"}
        </Card.Text>
        <Card.Text>
          <strong>Chave Pix Transação: </strong>
          {item?.chavePixTransacao}
        </Card.Text>
        <Card.Text>
          <strong>Origem: </strong>
          {item?.origem}
        </Card.Text>
        <Card.Text>
          <strong>Destino: </strong>
          {item?.destino}
        </Card.Text>
        <Card.Text>
          <strong>Data da Transação: </strong>
          {item?.dataTransacao}
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

export default MovimentacaoFinanceiraCard;
