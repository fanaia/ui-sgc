import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { jwtDecode } from "jwt-decode";
import projetoService from "../services/projetoService";
import atividadeService from "../services/atividadeService";
import { Card, Form, FormControl, Button } from "react-bootstrap";

const AtividadeEdit = forwardRef(({ _id }, ref) => {
  const [step, setStep] = useState(1);
  const [projetos, setProjetos] = useState([]);
  const [selectedProjeto, setSelectedProjeto] = useState(null);
  const [atividade, setAtividade] = useState({
    descricao: "",
    dataRealizacao: new Date().toISOString().substring(0, 10),
    totalHoras: "",
  });

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const participanteId = decodedToken._id;

  useEffect(() => {
    const loadProjetos = async () => {
      const projetosData = await projetoService.listProjetos();
      setProjetos(projetosData);
    };
    loadProjetos();
  }, []);

  const handleProjetoSelect = (projeto) => {
    setSelectedProjeto(projeto);
    setStep(2);
  };

  const handleChange = (event) => {
    setAtividade({ ...atividade, [event.target.name]: event.target.value });
  };

  const load = async () => {
    if (_id) {
      const atividadeData = await atividadeService.loadAtividade(_id);
      if (!atividadeData) return;
      setAtividade(atividadeData);
    }
  };

  const save = async () => {
    const newAtividade = {
      ...atividade,
      totalTokens: atividade.totalHoras * selectedProjeto.tokensHora,
      participante: participanteId,
      projeto: selectedProjeto._id,
    };
    return atividadeService.createAtividade(newAtividade);
  };

  useImperativeHandle(ref, () => ({
    save,
    load,
  }));

  return (
    <div className="container">
      {step === 1 && (
        <div className="row">
          {projetos.map((projeto) => (
            <Card key={projeto._id} onClick={() => handleProjetoSelect(projeto)}>
              <Card.Body>{projeto.nome}</Card.Body>
            </Card>
          ))}
        </div>
      )}

      {step === 2 && (
        <Form>
          <Form.Group>
            <Form.Label>Descreva a atividade que foi feita</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descricao"
              value={atividade.descricao}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Quando foi feito</Form.Label>
            <Form.Control
              type="date"
              name="dataRealizacao"
              value={atividade.dataRealizacao}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Quantas horas você dedicou nessa atividade</Form.Label>
            <Form.Control
              type="number"
              name="totalHoras"
              value={atividade.totalHoras}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Token/Hora: {selectedProjeto.tokensHora}</Form.Label>
          </Form.Group>
        </Form>
      )}
    </div>
  );
});

export default AtividadeEdit;
