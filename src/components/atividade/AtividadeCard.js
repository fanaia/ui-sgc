import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";

const AtividadeCard = ({ item }) => {
  const { setSelectedItem, setShowModal } = useContext(CrudContext);

  const statusColors = {
    ativo: "green",
    pendente: "yellow",
    cancelado: "red",
    recusado: "red",
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
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
      onClick={handleSelect}
    >
      <Card.Header>
        <strong>{item?.descricao}</strong>
      </Card.Header>
      <Card.Body style={{ fontSize: "calc(1em - 3px)", fontStyle: "italic" }}>
        <Card.Text>
          <strong>Participante: </strong>
          {item?.participante ? item.participante.nome : "Carregando..."}
        </Card.Text>
        <Card.Text>
          <strong>Total de Horas: </strong>
          {item?.totalHoras}h
        </Card.Text>
        <Card.Text>
          <strong>Total de Tokens: </strong>
          {item?.totalTokens}
        </Card.Text>
        <Card.Text>
          <strong>Data de Realização: </strong>
          {item?.dataRealizacao}
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

export default AtividadeCard;
