import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import grupoTrabalhoService from "../services/grupoTrabalhoService";
import { Card, Form, FormControl, InputGroup } from "react-bootstrap";
import participanteService from "../services/participanteService";

const GrupoTrabalhoEdit = forwardRef(({ _id }, ref) => {
  const [grupoTrabalho, setGrupoTrabalho] = useState({});
  const [participantes, setParticipantes] = useState([]);

  const load = async () => {
    if (_id) {
      const grupoTrabalhoData = await grupoTrabalhoService.loadGrupoTrabalho(
        _id
      );
      if (!grupoTrabalhoData) return;
      setGrupoTrabalho(grupoTrabalhoData);
    }
  };

  const listParticipantes = async () => {
    const participantesData = await participanteService.listParticipantes();
    setParticipantes(participantesData);
  };

  const save = async () => {
    return grupoTrabalhoService.saveGrupoTrabalho(grupoTrabalho);
  };

  useEffect(() => {
    listParticipantes();
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
                value={grupoTrabalho.nome}
                onChange={(e) =>
                  setGrupoTrabalho({
                    ...grupoTrabalho,
                    nome: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>Descrição</Form.Label>
              <FormControl
                type="text"
                value={grupoTrabalho.descricao}
                onChange={(e) =>
                  setGrupoTrabalho({
                    ...grupoTrabalho,
                    descricao: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>
                Cor da Etiqueta
              </Form.Label>
              <FormControl
                className="w-100"
                type="color"
                value={grupoTrabalho.corEtiqueta}
                onChange={(e) =>
                  setGrupoTrabalho({
                    ...grupoTrabalho,
                    corEtiqueta: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>Status:</Form.Label>
              <Form.Select
                id="status"
                value={grupoTrabalho.status}
                onChange={(e) =>
                  setGrupoTrabalho({ ...grupoTrabalho, status: e.target.value })
                }
              >
                <option value="pendente">Pendente</option>
                <option value="ativo">Ativo</option>
                <option value="recusado">Recusado</option>
                <option value="cancelado">Cancelado</option>
              </Form.Select>
            </Form.Group>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>
                Partipante:
              </Form.Label>
              <Form.Select
                value={grupoTrabalho.participanteResponsavel}
                onChange={(e) =>
                  setGrupoTrabalho({
                    ...grupoTrabalho,
                    participanteResponsavel: e.target.value,
                  })
                }
              >
                {participantes.map((participante) => (
                  <option key={participante._id} value={participante._id}>
                    {participante.nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
});

export default GrupoTrabalhoEdit;
