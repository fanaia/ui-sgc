import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
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
          <form>
            <Card className="mb-3">
              <Card.Header>
                <Card.Title>Dados do Participante</Card.Title>
              </Card.Header>
              <Card.Body>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Nome</InputGroup.Text>
                  <FormControl
                    type="text"
                    value={participante.nome}
                    onChange={(e) => setParticipante({ ...participante, nome: e.target.value })}
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text>Whatsapp</InputGroup.Text>
                  <FormControl
                    type="text"
                    value={participante.whatsapp}
                    onChange={(e) => setParticipante({ ...participante, whatsapp: e.target.value })}
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text>Senha</InputGroup.Text>
                  <FormControl
                    type="password"
                    value={participante.senha}
                    onChange={(e) => setParticipante({ ...participante, senha: e.target.value })}
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text>Documento</InputGroup.Text>
                  <FormControl
                    type="text"
                    value={participante.documento}
                    onChange={(e) =>
                      setParticipante({ ...participante, documento: e.target.value })
                    }
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text>Chave Pix</InputGroup.Text>
                  <FormControl
                    type="text"
                    value={participante.chavePix}
                    onChange={(e) => setParticipante({ ...participante, chavePix: e.target.value })}
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text>Token Hora</InputGroup.Text>
                  <FormControl
                    type="number"
                    value={participante.tokenHora || ""}
                    onChange={(e) =>
                      setParticipante({ ...participante, tokenHora: e.target.value })
                    }
                  />
                </InputGroup>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Switch
                    id="ativo"
                    label="Ativo"
                    checked={participante.ativo}
                    onChange={(e) => setParticipante({ ...participante, ativo: e.target.checked })}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
});

export default ParticipanteEdit;
