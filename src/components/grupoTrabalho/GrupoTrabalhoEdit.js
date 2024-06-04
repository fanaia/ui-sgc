import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import apiRetaguarda from "../../config/apiRetaguarda";

const GrupoTrabalhoEdit = forwardRef(({ _id }, ref) => {
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
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Nome</Form.Label>
        <FormControl
          type="text"
          value={grupoTrabalho?.nome}
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
          value={grupoTrabalho?.descricao}
          onChange={(e) =>
            setGrupoTrabalho({
              ...grupoTrabalho,
              descricao: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Cor da Etiqueta</Form.Label>
        <FormControl
          className="w-100"
          type="color"
          value={grupoTrabalho?.corEtiqueta || "#ffffff"}
          onChange={(e) =>
            setGrupoTrabalho({
              ...grupoTrabalho,
              corEtiqueta: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Responsável</Form.Label>
        <Form.Select
          value={grupoTrabalho?.participanteResponsavel?._id}
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
      <Form.Group style={{ marginBottom: "5px" }}>
        <Form.Label style={{ marginBottom: "2px" }}>Status</Form.Label>
        <Form.Select
          id="status"
          value={grupoTrabalho?.status}
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
    </Form>
  );
});

export default GrupoTrabalhoEdit;
