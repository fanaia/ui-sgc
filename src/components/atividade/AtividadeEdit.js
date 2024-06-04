import React, { useContext, useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import apiRetaguarda from "../../config/apiRetaguarda";
import StatusSelect from "../common/StatusSelect";

const AtividadeEdit = () => {
  const { selectedItem, setSelectedItem } = useContext(CrudContext);
  const [atividade, setAtividade] = useState(selectedItem);
  const [gruposTrabalho, setGruposTrabalho] = useState([]);
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    setSelectedItem(atividade);
  }, [atividade, setSelectedItem]);

  useEffect(() => {
    const fetchGruposTrabalho = async () => {
      const response = await apiRetaguarda.get("grupos-trabalho");
      setGruposTrabalho(response.data);
    };

    const fetchProjetos = async () => {
      const response = await apiRetaguarda.get("projetos");
      setProjetos(response.data);
    };

    fetchGruposTrabalho();
    fetchProjetos();
  }, []);

  return (
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
          value={atividade?.dataRealizacao}
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
  );
};

export default AtividadeEdit;
