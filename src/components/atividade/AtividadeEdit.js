import React, { useContext, useEffect, useState } from "react";
import { Form, FormControl, ListGroup } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import apiRetaguarda from "../../config/apiRetaguarda";
import StatusSelect from "../common/StatusSelect";

const AtividadeEdit = () => {
  const { selectedItem, setSelectedItem } = useContext(CrudContext);
  const [atividade, setAtividade] = useState(selectedItem);
  const [participantes, setParticipantes] = useState([]);
  const [gruposTrabalho, setGruposTrabalho] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [step, setStep] = useState(selectedItem ? 3 : 1);

  useEffect(() => {
    setSelectedItem(atividade);
  }, [atividade, setSelectedItem]);

  useEffect(() => {
    const fetchParticipantes = async () => {
      const response = await apiRetaguarda.get("participantes");
      setParticipantes(response.data);
    };

    const fetchGruposTrabalho = async () => {
      const response = await apiRetaguarda.get("grupos-trabalho");
      setGruposTrabalho(response.data);
    };

    const fetchProjetos = async () => {
      const response = await apiRetaguarda.get("projetos");
      setProjetos(response.data);
    };

    fetchParticipantes();
    fetchGruposTrabalho();
    fetchProjetos();
  }, []);

  const nextStep = (value) => {
    if (step === 1) {
      setAtividade({ ...atividade, grupoTrabalho: value });
    } else if (step === 2) {
      setAtividade({ ...atividade, projeto: value });
    }
    setStep(step + 1);
  };

  return (
    <>
      {step === 1 && (
        <ListGroup>
          {gruposTrabalho.map((grupo) => (
            <ListGroup.Item
              key={grupo._id}
              onClick={() => nextStep(grupo)}
              style={{ backgroundColor: grupo.corEtiqueta }}
            >
              {grupo.nome}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {step === 2 && (
        <ListGroup>
          {projetos.map((projeto) => (
            <ListGroup.Item
              key={projeto._id}
              onClick={() => nextStep(projeto)}
              style={{ backgroundColor: projeto.corEtiqueta }}
            >
              {projeto.nome}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {step === 3 && (
        <Form>
          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <FormControl
              as="textarea"
              value={atividade?.descricao}
              onChange={(e) => setAtividade({ ...atividade, descricao: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Participante</Form.Label>
            <Form.Select
              value={atividade?.participante?._id}
              onChange={(e) =>
                setAtividade({
                  ...atividade,
                  participante: e.target.value,
                })
              }
            >
              <option></option>
              {participantes.map((participante) => (
                <option key={participante._id} value={participante._id}>
                  {participante.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Grupo de Trabalho</Form.Label>
            <Form.Select
              value={atividade?.grupoTrabalho?._id}
              onChange={(e) => setAtividade({ ...atividade, grupoTrabalho: e.target.value })}
            >
              <option></option>
              {gruposTrabalho.map((grupo) => (
                <option key={grupo._id} value={grupo._id}>
                  {grupo.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Projeto</Form.Label>
            <Form.Select
              value={atividade?.projeto?._id}
              onChange={(e) => setAtividade({ ...atividade, projeto: e.target.value })}
            >
              <option></option>
              {projetos.map((projeto) => (
                <option key={projeto._id} value={projeto._id}>
                  {projeto.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Data de Realização</Form.Label>
            <FormControl
              type="date"
              value={atividade?.dataRealizacao?.substring(0, 10)}
              onChange={(e) => setAtividade({ ...atividade, dataRealizacao: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Total de Horas</Form.Label>
            <FormControl
              type="number"
              value={atividade?.totalHoras}
              onChange={(e) => setAtividade({ ...atividade, totalHoras: e.target.value })}
            />
          </Form.Group>

          <StatusSelect
            status={atividade?.status}
            handleStatusChange={(e) => setAtividade({ ...atividade, status: e.target.value })}
          />
        </Form>
      )}
    </>
  );
};

export default AtividadeEdit;
