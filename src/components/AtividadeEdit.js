import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { jwtDecode } from "jwt-decode";
import { format } from "date-fns";
import projetoService from "../services/projetoService";
import atividadeService from "../services/atividadeService";
import { Card, Form } from "react-bootstrap";
import grupoTrabalhoService from "../services/grupoTrabalhoService";

const AtividadeEdit = forwardRef(({ _id }, ref) => {
  const [step, setStep] = useState(_id ? 3 : 1);
  const [projetos, setProjetos] = useState([]);
  const [gruposTrabalho, setGruposTrabalho] = useState([]);
  const [selectedProjeto, setSelectedProjeto] = useState(null);
  const [selectedGrupoTrabalho, setSelectedGrupoTrabalho] = useState(null);
  const [atividade, setAtividade] = useState({
    descricao: "",
    dataRealizacao: new Date().toISOString().substring(0, 10),
    totalHoras: "",
  });

  const tokenJwt = localStorage.getItem("tokenJwt");
  const decodedTokenJwt = jwtDecode(tokenJwt);
  const participanteId = decodedTokenJwt._id;
  const tokenHora = decodedTokenJwt.tokenHora;

  useEffect(() => {
    listGruposTrabalho();
    listProjetos();
  }, []);

  const listProjetos = async () => {
    const projetosData = await projetoService.listProjetos();
    setProjetos(projetosData);
  };

  const listGruposTrabalho = async () => {
    const gruposTrabalhoData = await grupoTrabalhoService.listGruposTrabalho();
    setGruposTrabalho(gruposTrabalhoData);
  };

  const handleGrupoTrabalhoSelect = (grupoTrabalho) => {
    setSelectedGrupoTrabalho(grupoTrabalho);
    setStep(projetos.length > 0 ? 2 : 3);
  };

  const handleProjetoSelect = (projeto) => {
    setSelectedProjeto(projeto);
    setStep(3);
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
      totalTokens: atividade.totalHoras * tokenHora,
      participante: participanteId,
      projeto: atividade.projeto._id,
      grupoTrabalho: atividade.grupoTrabalho._id,
    };
    return atividadeService.saveAtividade(newAtividade);
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
      {step === 1 && (
        <div className="row">
          <h3>Grupo de Trabalho</h3>
          {gruposTrabalho.map((grupoTrabalho) => (
            <Card
              key={grupoTrabalho._id}
              onClick={() => handleGrupoTrabalhoSelect(grupoTrabalho)}
            >
              <div
                style={{
                  width: "5px",
                  height: "100%",
                  backgroundColor: grupoTrabalho.corEtiqueta,
                  position: "absolute",
                }}
              ></div>
              <Card.Body>{grupoTrabalho.nome}</Card.Body>
            </Card>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="row">
          <h3>Projetos</h3>
          {projetos.map((projeto) => (
            <Card
              key={projeto._id}
              onClick={() => handleProjetoSelect(projeto)}
            >
              <div
                style={{
                  width: "5px",
                  height: "100%",
                  backgroundColor: projeto.corEtiqueta,
                  position: "absolute",
                }}
              ></div>
              <Card.Body>{projeto.nome}</Card.Body>
            </Card>
          ))}
        </div>
      )}

      {step === 3 && (
        <Form>
          <Form.Group style={{ marginBottom: "5px" }}>
            <Form.Label style={{ marginBottom: "2px" }}>
              Descreva a atividade que foi feita:
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descricao"
              value={atividade.descricao}
              onChange={handleChange}
            />
          </Form.Group>
          <div
            style={{ borderBottom: "1px solid #ddd", margin: "10px 0" }}
          ></div>
          <Form.Group style={{ marginBottom: "5px" }}>
            <Form.Label style={{ marginBottom: "2px" }}>
              Quando foi feito?
            </Form.Label>
            <Form.Control
              type="date"
              name="dataRealizacao"
              value={format(new Date(atividade.dataRealizacao), "yyyy-MM-dd")}
              onChange={handleChange}
            />
          </Form.Group>
          <div
            style={{ borderBottom: "1px solid #ddd", margin: "10px 0" }}
          ></div>
          <Form.Group style={{ marginBottom: "5px" }}>
            <Form.Label style={{ marginBottom: "2px" }}>
              Quantas horas você dedicou nessa atividade?
            </Form.Label>
            <Form.Control
              type="number"
              name="totalHoras"
              value={atividade.totalHoras}
              onChange={handleChange}
            />
          </Form.Group>
          <div
            style={{ borderBottom: "1px solid #ddd", margin: "10px 0" }}
          ></div>
          <Form.Group style={{ marginBottom: "5px" }}>
            <Form.Label style={{ marginBottom: "2px" }}>
              Token/Hora: <strong>{tokenHora}</strong>
            </Form.Label>
          </Form.Group>

          <div
            style={{ borderBottom: "1px solid #ddd", margin: "10px 0" }}
          ></div>
          <Form.Group style={{ marginBottom: "5px" }}>
            <Form.Label style={{ marginBottom: "2px" }}>
              Grupo de Trabalho
            </Form.Label>
            <Form.Select
              id="grupo"
              value={atividade.grupoTrabalho}
              onChange={(e) =>
                setAtividade({ ...atividade, grupoTrabalho: e.target.value })
              }
            >
              {gruposTrabalho.map((grupo) => (
                <option key={grupo._id} value={grupo._id}>
                  {grupo.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div
            style={{ borderBottom: "1px solid #ddd", margin: "10px 0" }}
          ></div>
          <Form.Group style={{ marginBottom: "5px" }}>
            <Form.Label style={{ marginBottom: "2px" }}>Projeto</Form.Label>
            <Form.Select
              id="projeto"
              value={atividade.projeto}
              onChange={(e) =>
                setAtividade({ ...atividade, projeto: e.target.value })
              }
            >
              {projetos.map((projeto) => (
                <option key={projeto._id} value={projeto._id}>
                  {projeto.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div
            style={{ borderBottom: "1px solid #ddd", margin: "10px 0" }}
          ></div>
          <Form.Group style={{ marginBottom: "5px" }}>
            <Form.Label style={{ marginBottom: "2px" }}>Status</Form.Label>
            <Form.Select
              id="status"
              value={atividade.status}
              onChange={(e) =>
                setAtividade({ ...atividade, status: e.target.value })
              }
            >
              <option value="pendente">Pendente</option>
              <option value="ativo">Ativo</option>
              <option value="recusado">Recusado</option>
              <option value="cancelado">Cancelado</option>
            </Form.Select>
          </Form.Group>
          <div
            style={{ borderBottom: "1px solid #ddd", margin: "10px 0" }}
          ></div>
        </Form>
      )}
    </div>
  );
});

export default AtividadeEdit;
