import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import participanteService from "../services/participanteService";
import { Card, Form, FormControl, InputGroup } from "react-bootstrap";

const ParticipanteEdit = forwardRef(({ _id }, ref) => {
  const [participante, setParticipante] = useState({});

  const load = async () => {
    if (_id) {
      const participanteData = await participanteService.loadParticipante(_id);
      if (!participanteData) return;
      participanteData.senha = "";
      setParticipante(participanteData);
    }
  };

  const save = async () => {
    return participanteService.saveParticipante(participante);
  };

  useEffect(() => {
    load();
  }, [_id]);

  useImperativeHandle(ref, () => ({
    save,
    load,
  }));

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Form>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>Nome</Form.Label>
              <FormControl
                type="text"
                value={participante.nome}
                onChange={(e) =>
                  setParticipante({ ...participante, nome: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>Whatsapp:</Form.Label>
              <FormControl
                type="text"
                value={participante.whatsapp}
                onChange={(e) =>
                  setParticipante({ ...participante, whatsapp: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>Senha:</Form.Label>
              <FormControl
                type="password"
                value={participante.senha}
                onChange={(e) =>
                  setParticipante({ ...participante, senha: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>
                Documento:
              </Form.Label>
              <FormControl
                type="text"
                value={participante.documento}
                onChange={(e) =>
                  setParticipante({
                    ...participante,
                    documento: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>
                Chave Pix:
              </Form.Label>
              <FormControl
                type="text"
                value={participante.chavePix}
                onChange={(e) =>
                  setParticipante({ ...participante, chavePix: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>
                Token hora:
              </Form.Label>
              <FormControl
                type="number"
                value={participante.tokenHora || ""}
                onChange={(e) =>
                  setParticipante({
                    ...participante,
                    tokenHora: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>Status:</Form.Label>
              <Form.Select
                id="status"
                value={participante.status}
                onChange={(e) =>
                  setParticipante({ ...participante, status: e.target.value })
                }
              >
                <option value="pendente">Pendente</option>
                <option value="ativo">Ativo</option>
                <option value="recusado">Recusado</option>
                <option value="cancelado">Cancelado</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
});

export default ParticipanteEdit;
