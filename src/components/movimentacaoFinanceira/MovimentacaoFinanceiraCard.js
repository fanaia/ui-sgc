import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";

const MovimentacaoFinanceiraCard = ({ item }) => {
  const { setSelectedItem, setShowModal } = useContext(CrudContext);

  const statusColors = {
    ativo: "green",
    pendente: "yellow",
    recusado: "red",
    cancelado: "red",
  };

  const cardOpacity =
    item?.status === "cancelado" || item?.status === "recusado" ? 0.7 : 1;

  const handleSelect = () => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <Card
      key={item._id}
      style={{
        width: "100%",
        margin: "10px auto",
        cursor: "pointer",
        opacity: cardOpacity,
        borderBottom: `10px solid ${statusColors[item?.status] || "grey"}`,
      }}
      onClick={handleSelect}
    >
      <Card.Header style={{ backgroundColor: "#ffffff", fontWeight: "bold" }}>
        {item?.descricao}
      </Card.Header>
      <Card.Body style={{ fontSize: "calc(1em - 3px)", fontStyle: "italic" }}>
        <Card.Text>
          <strong>Participante: </strong>
          {item?.participante ? item.participante.nome : "Carregando..."}
        </Card.Text>
        <Card.Text>
          <strong>Valor: </strong>
          {item?.valor}
        </Card.Text>
        <Card.Text>
          <strong>Tipo de Movimentação: </strong>
          {item?.tipoMovimentacao}
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
          {item?.dataTransação}
        </Card.Text>
        <Card.Text>
          <strong>Status: </strong>
          {item?.status}
        </Card.Text>
      </Card.Body>
      <Card.Footer
        style={{
          padding: "5px",
        }}
      >
        <label
          style={{
            backgroundColor: item?.grupoTrabalho?.corEtiqueta,
            fontSize: "0.8em",
            padding: "5px",
            margin: "5px",
          }}
        >
          {item?.grupoTrabalho?.nome}
        </label>
        <label
          style={{
            backgroundColor: item?.projeto?.corEtiqueta,
            fontSize: "0.8em",
            padding: "5px",
            margin: "5px",
          }}
        >
          {item?.projeto?.nome}
        </label>
      </Card.Footer>
    </Card>
  );
};

export default MovimentacaoFinanceiraCard;
