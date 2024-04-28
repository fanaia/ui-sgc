import React from "react";
import { Button, Card } from "react-bootstrap";

const atividades = [
  {
    descricao: "Desenvolvimento Interface",
    tempo: "8hrs",
    tokens: "8TKS",
    data: "2021-09-01",
    status: "aceito",
  },
  {
    descricao: "Alinhamento Projeto",
    tempo: "2hrs",
    tokens: "2TKS",
    data: "2021-09-01",
    status: "pendente",
  },
  {
    descricao: "Atividades Complementares",
    tempo: "20hrs",
    tokens: "20TKS",
    data: "2021-09-01",
    status: "rejeitado",
  },
];

function AtividadesPage() {
  return (
    <div>
      <h1>Atividades</h1>
      <hr />
      <Button variant="success" className="w-100">
        Adicionar
      </Button>
      <hr />
      {atividades.map((atividade, index) => (
        <Card
          key={index}
          className={`mb-3`}
          style={{
            backgroundColor:
              atividade.status === "aceito"
                ? "#d4edda"
                : atividade.status === "rejeitado"
                ? "#f8d7da"
                : "#fff9c4",
          }}
        >
          <Card.Body style={{ padding: "10px" }}>
            <Card.Title>{atividade.descricao}</Card.Title>
            <Card.Text>
              Tempo: {atividade.tempo} <br />
              Tokens: {atividade.tokens} <br />
              Data: {atividade.data}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default AtividadesPage;
