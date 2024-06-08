import { useState } from "react";
import { Container, FormControl } from "react-bootstrap";
import { Form } from "react-router-dom";

const StartPage = () => {
  const [seed, setSeed] = useState();

  return (
    <Container>
      <h1>Semente</h1>

      <Form>
        <Form.Group>
          <Form.Label>Nome do Projeto</Form.Label>
          <FormControl
            type="text"
            value={seed?.nome}
            onChange={(e) => setSeed({ ...seed, nome: e.target.value })}
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default StartPage;
