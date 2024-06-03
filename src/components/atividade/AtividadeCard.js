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
      }}
      onClick={handleSelect}
    >
      <Card.Header style={{ backgroundColor: "#ffffff", fontWeight: "bold" }}>
        {item?.descricao}
      </Card.Header>
      <Card.Body style={{ fontSize: "calc(1em - 3px)", fontStyle: "italic" }}>
        <Card.Text>
          <strong>Grupo de Trabalho: </strong>
          {item?.grupoTrabalho ? item.grupoTrabalho.nome : "Carregando..."}
        </Card.Text>
        <Card.Text>
          <strong>Projeto: </strong>
          {item?.projeto ? item.projeto.nome : "Carregando..."}
        </Card.Text>
        <Card.Text>
          <strong>Participante: </strong>
          {item?.participante ? item.participante.nome : "Carregando..."}
        </Card.Text>
        <Card.Text>
          <strong>Status: </strong>
          {item?.status}
        </Card.Text>
      </Card.Body>
      <Card.Footer
        style={{
          height: "8px",
          padding: "0",
          backgroundColor: statusColors[item?.status] || "grey",
        }}
      />
    </Card>
  );
};

export default AtividadeCard;
