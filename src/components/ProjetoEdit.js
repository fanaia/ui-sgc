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
          <form>
            <Card className="mb-3">
              <Card.Header>
                <Card.Title>Dados do Projeto</Card.Title>
              </Card.Header>
              <Card.Body>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Nome</InputGroup.Text>
                  <FormControl
                    type="text"
                    value={projeto.nome}
                    onChange={(e) =>
                      setProjeto({ ...projeto, nome: e.target.value })
                    }
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text>Descrição</InputGroup.Text>
                  <FormControl
                    type="text"
                    value={projeto.descricao}
                    onChange={(e) =>
                      setProjeto({ ...projeto, descricao: e.target.value })
                    }
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text>Cor da Etiqueta</InputGroup.Text>
                  <FormControl
                    type="color"
                    value={projeto.corEtiqueta}
                    onChange={(e) =>
                      setProjeto({ ...projeto, corEtiqueta: e.target.value })
                    }
                  />
                </InputGroup>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Switch
                    id="ativo"
                    label="Ativo"
                    checked={projeto.ativo}
                    onChange={(e) =>
                      setProjeto({ ...projeto, ativo: e.target.checked })
                    }
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

export default ProjetoEdit;
