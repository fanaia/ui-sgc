import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import Etiqueta from "../common/Etiqueta";
import StyledCard from "../common/StyledCard";
import { formatData, formatMoeda } from "../../utils/displayFormatters";
import StatusSelect from "../common/StatusSelect";

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
        <div style={{ display: "flex" }}>
          <div style={{ flex: 3, overflow: "auto" }}>
            <Card.Text>
              <strong>Participante: </strong>
              {item.participante?.nome}
            </Card.Text>
            <Card.Text>
              <strong>{item?.tipoMovimentacao === 1 ? "Recebeu" : "Pagou"}: </strong>
              {formatMoeda(item?.valor)}
            </Card.Text>
            <Card.Text>
              <strong>Data da Transação: </strong>
              {formatData(item?.dataTransacao)}
            </Card.Text>
          </div>
          <div style={{ flex: 1, textAlign: "right", overflow: "auto" }}>
            <Card.Text>
              <StatusSelect label={item.descricao} router="movimentacoes-financeiras" object={item} />
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

export default MovimentacaoFinanceiraCard;
