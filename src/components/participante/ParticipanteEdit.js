import React, { useContext, useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import StatusSelect from "../common/StatusSelect";

const ParticipanteEdit = () => {
  const { selectedItem, setSelectedItem } = useContext(CrudContext);
  const [participante, setParticipante] = useState(selectedItem);

  useEffect(() => {
    setSelectedItem(participante);
  }, [participante, setSelectedItem]);

  const tokenHoraOptions = [
    { value: 0.2, label: "Aprendiz - 0,2 token" },
    { value: 0.4, label: "Iniciante - 0,4 token" },
    { value: 0.6, label: "Experiente - 0,6 token" },
    { value: 0.8, label: "Especialista - 0,8 token" },
    { value: 1, label: "Responsável - 1 token" },
  ];

  return (
    <Form>
      <Form.Group>
        <Form.Label>Nome</Form.Label>
        <FormControl
          type="text"
          value={participante?.nome}
          onChange={(e) => setParticipante({ ...participante, nome: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Whatsapp:</Form.Label>
        <FormControl
          type="text"
          value={participante?.whatsapp}
          onChange={(e) => setParticipante({ ...participante, whatsapp: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Senha:</Form.Label>
        <FormControl
          type="password"
          value={participante?.senha}
          onChange={(e) => setParticipante({ ...participante, senha: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Documento:</Form.Label>
        <FormControl
          type="text"
          value={participante?.documento}
          onChange={(e) => setParticipante({ ...participante, documento: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Chave Pix:</Form.Label>
        <FormControl
          type="text"
          value={participante?.chavePix}
          onChange={(e) => setParticipante({ ...participante, chavePix: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Estágio (Token por Hora):</Form.Label>
        <Form.Select
          value={participante?.tokenHora}
          onChange={(e) => setParticipante({ ...participante, tokenHora: e.target.value })}
        >
          <option></option>
          {tokenHoraOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <StatusSelect
        model="participante"
        object={participante}
        handleStatusChange={(e) => setParticipante({ ...participante, status: e.target.value })}
      />
    </Form>
  );
};

export default ParticipanteEdit;
