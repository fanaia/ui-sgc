import React, { useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { HandThumbsUp, HandThumbsDown, HandThumbsUpFill } from "react-bootstrap-icons";

const questions = [
  "Cadastro de Sócia: Fabio",
  "Cadastro de Sócia: Rafa",
  "Pagamento de R$ 2.000,00 para Francisco Xavier: Compra de Ferramentas",
  // Adicione mais questões aqui
];

function ConsensoPage() {
  const [results, setResults] = useState({});

  const handleVote = (index, decision) => {
    const currentVotes = results[index] || { aceitar: 0, rejeitar: 0 };
    currentVotes[decision]++;
    setResults({ ...results, [index]: currentVotes });
  };

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>
        <HandThumbsUpFill size={32} style={{ marginRight: "10px" }} />
        Consenso
        <HandThumbsUpFill size={32} style={{ marginLeft: "10px" }} />
      </h1>
      <hr />
      <Button variant="primary" className="flex-grow-1 me-1" style={{ width: "100%" }}>
        Criar Votação
      </Button>
      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="warning" className="flex-grow-1 me-1" style={{ width: "50%" }}>
          Votar
        </Button>
        <Button variant="secondary" className="flex-grow-1 mx-1" style={{ width: "50%" }}>
          Encerrados
        </Button>
      </div>
      <hr />
      {questions.map((question, index) => (
        <Card
          key={index}
          className={`mb-3`}
          style={{
            backgroundColor:
              results[index]?.aceitar > results[index]?.rejeitar
                ? "#d4edda" // tom bem claro de verde
                : "#f8d7da", // tom bem claro de vermelho
          }}
        >
          <Card.Body style={{ padding: "10px" }}>
            <Card.Title>{question}</Card.Title>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="danger"
                className="flex-grow-1 me-1"
                style={{ width: "50%" }}
                onClick={() => handleVote(index, "rejeitar")}
              >
                <HandThumbsDown /> Rejeitar{" "}
                {results[index] && <label>{results[index].rejeitar}</label>}
              </Button>
              <Button
                variant="success"
                className="flex-grow-1 ms-1"
                style={{ width: "50%" }}
                onClick={() => handleVote(index, "aceitar")}
              >
                <HandThumbsUp /> Aceitar {results[index] && <label>{results[index].aceitar}</label>}
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default ConsensoPage;
