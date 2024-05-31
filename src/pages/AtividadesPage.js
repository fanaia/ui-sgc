import React, { useEffect, useRef, useState } from "react";
import { Form, Modal, Button, ButtonGroup, ProgressBar } from "react-bootstrap";
import { HandThumbsDown, HandThumbsUp } from "react-bootstrap-icons";
import atividadeService from "../services/atividadeService";
import AtividadeEdit from "../components/AtividadeEdit";
import participanteService from "../services/participanteService";

const AtividadesPage = () => {
  const [msg, setMsg] = useState();
  const [atividades, setAtividades] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [atividadeIdToDelete, setAtividadeIdToDelete] = useState(null);

  const fetchParticipantes = async () => {
    const data = await participanteService.listParticipantes();
    setParticipantes(data);
    setLoading(false);
  };

  const atividadeEditRef = useRef();

  useEffect(() => {
    fetchData();
    fetchParticipantes();
  }, []);

  const fetchData = async () => {
    atividadeService.listAtividades().then((data) => {
      const sortedData = data.sort(
        (a, b) => new Date(b.dataRealizacao) - new Date(a.dataRealizacao)
      );
      setAtividades(sortedData.map((item) => ({ ...item })));
    });
  };

  const toggleAtivo = async (_id, value) => {
    await atividadeService.setAtivo(_id, value);
    fetchData();
  };

  const handleEdit = (_id) => {
    setSelectedId(_id);
    setShowModal(true);
  };

  const askForDeleteConfirmation = (_id) => {
    setAtividadeIdToDelete(_id);
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    atividadeService.deleteAtividade(atividadeIdToDelete).then((response) => {
      setShowModal(false);
      setMsg(response);
      fetchData();
    });
    setShowConfirmModal(false);
  };

  const handleAdd = () => {
    setSelectedId(null);
    setShowModal(true);
  };

  const handleSave = async () => {
    const ret = await atividadeEditRef.current.save();
    setShowModal(false);
    fetchData();
    setMsg(ret);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const [progress, setProgress] = useState(0);

  // Mapeamento de IDs de grupo de trabalho para cores de etiquetas e nomes de projetos
  const projectTags = {
    "6655d7e968bebf702fa70895": { name: "OADsBR", color: "red" },
    "6655d83268bebf702fa708ba": { name: "Tecnologia", color: "blue" },
    "6655d88568bebf702fa708d4": { name: "A&B", color: "DarkGoldenrod" },
    "6655de4eecfd7eb672ffde64": {
      name: "contrato-social pix-conta",
      color: "green",
    },
    "6655de5decfd7eb672ffde69": { name: "estudos", color: "purple" },
    "6655eb69868d7a6e944e4f78": {
      name: "cardapio-digital + pix",
      color: "Magenta",
    },
  };

  return (
    <>
      <div style={{ paddingBottom: "110px" }} className="container">
        {msg && (
          <div
            className={`alert alert-${msg.success ? "info" : "danger"}`}
            role="alert"
          >
            {JSON.stringify(msg.message)}
          </div>
        )}
        <h1 className="my-4">Atividades</h1>
        <Button onClick={handleAdd} className="btn btn-primary mb-3">
          Adicionar Atividade
        </Button>
        <div className="card-deck">
          {atividades.map((atividade) => (
            <div
              className="card"
              style={{ margin: "10px" }}
              key={atividade._id}
            >
              <div className="card-header">
                <div className="card-title" style={{ fontSize: "15px" }}>
                  {/* Renderizar a etiqueta do grupo de trabalho se o ID estiver no mapeamento */}
                  {atividade.grupoTrabalho in projectTags && (
                    <span
                      style={{
                        backgroundColor:
                          projectTags[atividade.grupoTrabalho].color,
                        color: "white",
                        borderRadius: "5px",
                        padding: "2px 5px",
                        marginLeft: "10px",
                      }}
                    >
                      {projectTags[atividade.grupoTrabalho].name}
                    </span>
                  )}
                  {/* Renderizar a etiqueta do projeto se o ID estiver no mapeamento */}
                  {atividade.projeto in projectTags && (
                    <span
                      style={{
                        backgroundColor: projectTags[atividade.projeto].color,
                        color: "white",
                        borderRadius: "5px",
                        padding: "2px 5px",
                        marginLeft: "10px",
                      }}
                    >
                      {projectTags[atividade.projeto].name}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="btn btn-link"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
                onClick={() => handleEdit(atividade._id)}
                style={{
                  textDecoration: "none",
                  textAlign: "left",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                {atividade.descricao}
              </button>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ProgressBar
                    striped
                    variant="success"
                    now={progress}
                    style={{ width: "90%", height: "8px" }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ marginTop: "15px", marginBottom: "0px" }}>
                  <Button
                    variant="danger"
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                    style={{ fontSize: "0.75rem" }} // Diminui o tamanho do botão
                  >
                    <HandThumbsDown style={{ color: "white" }} />
                  </Button>
                  <p style={{ fontSize: "11px", textAlign: "center" }}>
                    Rejeitar
                  </p>
                </div>
                <div style={{ marginTop: "15px", marginBottom: "0px" }}>
                  <Button
                    variant="success"
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                    style={{ fontSize: "0.75rem" }} // Diminui o tamanho do botão
                  >
                    <HandThumbsUp style={{ color: "white" }} />
                  </Button>
                  <p style={{ fontSize: "11px", textAlign: "center" }}>
                    Aceitar
                  </p>
                </div>
              </div>
              <table style={{ width: "100%" }}>
                <tr>
                  <td
                    style={{
                      textAlign: "left",
                      verticalAlign: "middle",
                      padding: "1px 4px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        fontStyle: "italic",
                        paddingLeft: "10px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Tempo gasto: {atividade.totalHoras} hora(s)
                    </p>
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      verticalAlign: "middle",
                      padding: "-10px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        fontStyle: "italic",
                        paddingRight: "10px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Total de Tokens: {atividade.totalTokens} TK
                    </p>
                  </td>
                </tr>
              </table>

              <div className="card-footer">
                <div className="row">
                  <div className="col">
                    <div className="d-flex align-items-center">
                      <div>Ativo</div>
                      <div style={{ marginLeft: "5px" }}>
                        <Form.Check
                          type="switch"
                          id={`ativo-${atividade._id}`}
                          checked={atividade.ativo}
                          onChange={() =>
                            toggleAtivo(atividade._id, !atividade.ativo)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div
                      className="d-flex justify-content-end mr-3"
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontStyle: "italic",
                      }}
                    >
                      Participante:{" "}
                      {loading
                        ? "Carregando..."
                        : participantes.find(
                            (part) => part._id === atividade.participante
                          )
                        ? participantes.find(
                            (part) => part._id === atividade.participante
                          ).nome
                        : "Não encontrado"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedId > 0 ? "Alterar Atividade" : "Adicionar Atividade"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}
        >
          <AtividadeEdit ref={atividadeEditRef} _id={selectedId} />
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button variant="primary" onClick={handleSave}>
              Salvar
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </ButtonGroup>
          <Button
            variant="danger"
            onClick={() => askForDeleteConfirmation(selectedId)}
            style={{ marginLeft: "auto" }}
            disabled={!selectedId}
          >
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir esta Atividade?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AtividadesPage;
