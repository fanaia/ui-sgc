import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import projetoService from "../services/projetoService";
import { Card, Form, FormControl, InputGroup } from "react-bootstrap";

const ProjetoEdit = forwardRef(({ _id }, ref) => {
  const [projeto, setProjeto] = useState({});

  const load = async () => {
    if (_id) {
      const projetoData = await projetoService.loadProjeto(_id);
      if (!projetoData) return;
      setProjeto(projetoData);
    }
  };

  const save = async () => {
    return projetoService.saveProjeto(projeto);
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
          <Form>
            <h1>Dados do Projeto</h1>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>
                Nome do Projeto:
              </Form.Label>
              <FormControl
                type="text"
                value={projeto.nome}
                onChange={(e) =>
                  setProjeto({ ...projeto, nome: e.target.value })
                }
              />
            </Form.Group>
            <div
              style={{ borderBottom: "1px solid #ddd", margin: "10px 0" }}
            ></div>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>
                Descrição:
              </Form.Label>
              <FormControl
                type="text"
                value={projeto.descricao}
                onChange={(e) =>
                  setProjeto({ ...projeto, descricao: e.target.value })
                }
              />
            </Form.Group>
            <div
              style={{ borderBottom: "1px solid #ddd", margin: "10px 0" }}
            ></div>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>
                Cor da Etiqueta:
              </Form.Label>
              <FormControl
                className="w-100"
                type="color"
                value={projeto.corEtiqueta}
                onChange={(e) =>
                  setProjeto({ ...projeto, corEtiqueta: e.target.value })
                }
              />
            </Form.Group>
            <div
              style={{ borderBottom: "1px solid #ddd", margin: "10px 0" }}
            ></div>
            <Form.Group style={{ marginBottom: "5px" }}>
              <Form.Label style={{ marginBottom: "2px" }}>Status:</Form.Label>
              <Form.Select
                id="status"
                value={projeto.status}
                onChange={(e) =>
                  setProjeto({ ...projeto, status: e.target.value })
                }
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
