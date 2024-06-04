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

  return (
    <Form>
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Nome</Form.Label>
        <FormControl
          type="text"
          value={participante?.nome}
          onChange={(e) => setParticipante({ ...participante, nome: e.target.value })}
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Whatsapp:</Form.Label>
        <FormControl
          type="text"
          value={participante?.whatsapp}
          onChange={(e) => setParticipante({ ...participante, whatsapp: e.target.value })}
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Senha:</Form.Label>
        <FormControl
          type="password"
          value={participante?.senha}
          onChange={(e) => setParticipante({ ...participante, senha: e.target.value })}
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Documento:</Form.Label>
        <FormControl
          type="text"
          value={participante?.documento}
          onChange={(e) =>
            setParticipante({
              ...participante,
              documento: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Chave Pix:</Form.Label>
        <FormControl
          type="text"
          value={participante?.chavePix}
          onChange={(e) => setParticipante({ ...participante, chavePix: e.target.value })}
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Token hora:</Form.Label>
        <FormControl
          type="number"
          value={participante?.tokenHora || ""}
          onChange={(e) =>
            setParticipante({
              ...participante,
              tokenHora: e.target.value,
            })
          }
        />
      </Form.Group>
      <StatusSelect
        status={participante?.status}
        handleStatusChange={(e) =>
          setParticipante({ ...participante, status: e.target.value })
        }
      />
    </Form>
  );
};

export default ParticipanteEdit;
