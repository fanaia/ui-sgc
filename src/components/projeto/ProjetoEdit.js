import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import apiRetaguarda from "../../config/apiRetaguarda";

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
    <div className="container">
      <div className="row">
        <div className="col">
          <Form>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>Nome do Projeto</Form.Label>
              <FormControl
                type="text"
                value={projeto?.nome}
                onChange={(e) =>
                  setProjeto({
                    ...projeto,
                    nome: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>Descrição</Form.Label>
              <FormControl
                type="text"
                value={projeto?.descricao}
                onChange={(e) => setProjeto({ ...projeto, descricao: e.target.value })}
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>Cor da Etiqueta</Form.Label>
              <FormControl
                className="w-100"
                type="color"
                value={projeto?.corEtiqueta}
                onChange={(e) => setProjeto({ ...projeto, corEtiqueta: e.target.value })}
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>Responsável</Form.Label>
              <Form.Select
                value={projeto?.participanteResponsavel?._id}
                onChange={(e) =>
                  setProjeto({
                    ...projeto,
                    participanteResponsavel: e.target.value,
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
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>Status</Form.Label>
              <Form.Select
                id="status"
                value={projeto?.status}
                onChange={(e) => setProjeto({ ...projeto, status: e.target.value })}
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

export default ProjetoEdit;
