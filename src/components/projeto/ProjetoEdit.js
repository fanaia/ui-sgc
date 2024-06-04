import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import apiRetaguarda from "../../config/apiRetaguarda";
import StatusSelect from "../common/StatusSelect";

const ProjetoEdit = forwardRef(({ _id }, ref) => {
  const { selectedItem, setSelectedItem } = useContext(CrudContext);
  const [projeto, setProjeto] = useState(selectedItem);
  const [participantes, setParticipantes] = useState([]);

  useEffect(() => {
    setSelectedItem(projeto);
  }, [projeto, setSelectedItem]);

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
        <Form.Label>Nome do Projeto</Form.Label>
        <FormControl
          type="text"
          value={projeto?.nome}
          onChange={(e) => setProjeto({ ...projeto, nome: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Descrição</Form.Label>
        <FormControl
          type="text"
          value={projeto?.descricao}
          onChange={(e) => setProjeto({ ...projeto, descricao: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Cor da Etiqueta</Form.Label>
        <FormControl
          className="w-100"
          type="color"
          value={projeto?.corEtiqueta || "#ffffff"} // Define a cor inicial como branco
          onChange={(e) => setProjeto({ ...projeto, corEtiqueta: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Responsável</Form.Label>
        <Form.Select
          value={projeto?.participanteResponsavel?._id}
          onChange={(e) => setProjeto({ ...projeto, participanteResponsavel: e.target.value })}
        >
          <option></option>
          {participantes.map((participante) => (
            <option key={participante._id} value={participante._id}>
              {participante.nome}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <StatusSelect
        status={projeto?.status}
        handleStatusChange={(e) => setProjeto({ ...projeto, status: e.target.value })}
      />
    </Form>
  );
});

export default ProjetoEdit;
