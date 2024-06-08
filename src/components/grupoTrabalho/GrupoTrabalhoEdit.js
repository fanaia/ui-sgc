import React, { useContext, useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import apiRetaguarda from "../../config/apiRetaguarda";

const GrupoTrabalhoEdit = () => {
  const { selectedItem, setSelectedItem } = useContext(CrudContext);
  const [grupoTrabalho, setGrupoTrabalho] = useState(selectedItem);
  const [participantes, setParticipantes] = useState([]);

  useEffect(() => {
    setSelectedItem(grupoTrabalho);
  }, [grupoTrabalho, setSelectedItem]);

  useEffect(() => {
    const fetchParticipantes = async () => {
      const response = await apiRetaguarda.get("participantes");
      setParticipantes(response.data);
    };

    fetchParticipantes();
  }, []);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Nome</Form.Label>
        <FormControl
          type="text"
          value={grupoTrabalho?.nome}
          onChange={(e) => setGrupoTrabalho({ ...grupoTrabalho, nome: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Descrição</Form.Label>
        <FormControl
          type="text"
          value={grupoTrabalho?.descricao}
          onChange={(e) => setGrupoTrabalho({ ...grupoTrabalho, descricao: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Cor da Etiqueta</Form.Label>
        <FormControl
          className="w-100"
          type="color"
          value={grupoTrabalho?.corEtiqueta || "#ffffff"}
          onChange={(e) => setGrupoTrabalho({ ...grupoTrabalho, corEtiqueta: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Responsável</Form.Label>
        <Form.Select
          value={grupoTrabalho?.participanteResponsavel?._id}
          onChange={(e) =>
            setGrupoTrabalho({ ...grupoTrabalho, participanteResponsavel: e.target.value })
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
    </Form>
  );
};

export default GrupoTrabalhoEdit;
