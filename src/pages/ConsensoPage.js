import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { HandThumbsUp, HandThumbsDown } from "react-bootstrap-icons";

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
    <div>
      <h1>Consenso</h1>
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
    </div>
  );
}

export default ConsensoPage;
