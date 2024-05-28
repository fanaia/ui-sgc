import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import grupoTrabalhoService from "../services/grupoTrabalhoService";
import { Card, Form, FormControl, InputGroup } from "react-bootstrap";
import participanteService from "../services/participanteService";

const GrupoTrabalhoEdit = forwardRef(({ _id }, ref) => {
  const [grupoTrabalho, setGrupoTrabalho] = useState({});
  const [participantes, setParticipantes] = useState([]);

  const load = async () => {
    if (_id) {
      const grupoTrabalhoData = await grupoTrabalhoService.loadGrupoTrabalho(_id);
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
            <Card className="mb-3">
              <Card.Header>
                <Card.Title>Dados do Grupo de Trabalho</Card.Title>
              </Card.Header>
              <Card.Body>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Nome</InputGroup.Text>
                  <FormControl
                    type="text"
                    value={grupoTrabalho.nome}
                    onChange={(e) => setGrupoTrabalho({ ...grupoTrabalho, nome: e.target.value })}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Descrição</InputGroup.Text>
                  <FormControl
                    type="text"
                    value={grupoTrabalho.descricao}
                    onChange={(e) =>
                      setGrupoTrabalho({ ...grupoTrabalho, descricao: e.target.value })
                    }
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Ativo</InputGroup.Text>
                  <Form.Check
                    type="checkbox"
                    checked={grupoTrabalho.ativo}
                    onChange={(e) =>
                      setGrupoTrabalho({ ...grupoTrabalho, ativo: e.target.checked })
                    }
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Participante Responsável</InputGroup.Text>
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
                </InputGroup>
              </Card.Body>
            </Card>
          </Form>
        </div>
      </div>
    </div>
  );
});

export default GrupoTrabalhoEdit;
