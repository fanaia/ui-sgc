import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, ButtonGroup, Card } from "react-bootstrap";
import {
  BsPlusCircleFill,
  BsClockFill,
  BsCoin,
  BsHandThumbsDown,
  BsHandThumbsUp,
} from "react-icons/bs";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import atividadeService from "../services/atividadeService";
import AtividadeEdit from "../components/atividade/AtividadeEdit";
import participanteService from "../services/participanteService";
import grupoTrabalhoService from "../services/grupoTrabalhoService";
import projetoService from "../services/projetoService";

const AtividadesPage = () => {
  const [msg, setMsg] = useState();
  const [atividades, setAtividades] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [atividadeIdToDelete, setAtividadeIdToDelete] = useState(null);

  const atividadeEditRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const loadGrupoTrabalho = async (atividade) => {
    const grupoTrabalho = await grupoTrabalhoService.loadGrupoTrabalho(
      atividade.grupoTrabalho
    );
    setAtividades((prevAtividades) =>
      prevAtividades.map((atv) =>
        atv._id === atividade._id ? { ...atv, grupoTrabalho } : atv
      )
    );
  };

  const loadParticipante = async (atividade) => {
    const participante = await participanteService.loadParticipante(
      atividade.participante
    );
    setAtividades((prevAtividades) =>
      prevAtividades.map((atv) =>
        atv._id === atividade._id ? { ...atv, participante } : atv
      )
    );
  };

  const loadProjeto = async (atividade) => {
    const projeto = await projetoService.loadProjeto(atividade.projeto);
    setAtividades((prevAtividades) =>
      prevAtividades.map((atv) =>
        atv._id === atividade._id ? { ...atv, projeto } : atv
      )
    );
  };

  const fetchData = async () => {
    const atividades = await atividadeService.listAtividades();
    setAtividades(atividades);

    atividades.forEach((atividade) => {
      loadGrupoTrabalho(atividade);
      loadParticipante(atividade);
      loadProjeto(atividade);
    });
  };

  // const toggleAtivo = async (_id, value) => {
  //   await atividadeService.setAtivo(_id, value);
  //   fetchData();
  // };

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
        <div className="d-flex justify-content-between align-items-center my-1">
          <h1 style={{ marginLeft: "10px" }}>Atividades</h1>
          <Button
            onClick={handleAdd}
            className="btn btn-link mb-3 border-0 btn-no-hover btn-outline-none"
            style={{ fontSize: "35px", backgroundColor: "transparent" }}
          >
            <BsPlusCircleFill />
          </Button>
        </div>
        <div className="d-flex flex-wrap">
          {atividades.map((atividade) => (
            <Card
              key={atividade._id}
              style={{
                width: "100%",
                margin: "10px",
                borderLeft: `10px solid ${atividade.corEtiqueta}`,
                cursor: "pointer",
                opacity:
                  atividade.status === "cancelado" ||
                  atividade.status === "recusado"
                    ? 0.5
                    : 1,
              }}
              onClick={() => handleEdit(atividade._id)}
            >
              <Card.Header>
                <div className="mt-2">
                  {atividade.grupoTrabalho ? (
                    <label
                      style={{
                        backgroundColor: atividade.grupoTrabalho.corEtiqueta,
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        color: "#ffffff", // Adicione esta linha
                      }}
                    >
                      {atividade.grupoTrabalho.nome || "Carregando..."}
                    </label>
                  ) : null}
                  {atividade.projeto ? (
                    <label
                      style={{
                        backgroundColor: atividade.projeto.corEtiqueta,
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        color: "#ffffff", // Adicione esta linha
                      }}
                    >
                      {atividade.projeto.nome || "Carregando..."}
                    </label>
                  ) : null}
                </div>
              </Card.Header>
              <Card.Body>
                <div className="mt-2">
                  <label
                    style={{
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {atividade.descricao}
                  </label>
                </div>
                <div className="mt-2">
                  <label
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {format(new Date(atividade.dataRealizacao), "dd/MMM", {
                      locale: ptBR,
                    })}
                  </label>
                </div>
                <div
                  className="mt-2"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "-8px",
                  }}
                >
                  <label
                    style={{
                      cursor: "pointer",
                      fontSize: "calc(1em - 2px)",
                      fontStyle: "italic",
                      color: "#606060", // Altere o tom de cinza aqui
                    }}
                  >
                    <BsClockFill /> Tempo: {atividade.totalHoras} hrs
                  </label>
                  <label
                    style={{
                      cursor: "pointer",
                      fontSize: "calc(1em - 2px)",
                      fontStyle: "italic",
                      color: "#606060", // Altere o tom de cinza aqui
                    }}
                  >
                    <BsCoin /> Valor: {atividade.totalTokens} PIX
                  </label>
                </div>
              </Card.Body>
              <Card.Footer>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    {atividade.status !== "pendente" && (
                      <label
                        style={{
                          cursor: "pointer",
                          fontSize: "0.8em",
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        {atividade.status}
                      </label>
                    )}
                    {atividade.status === "pendente" && (
                      <div style={{ display: "flex" }}>
                        <button
                          type="button"
                          style={{
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px", // Adiciona espaço à direita do botão
                          }}
                        >
                          <BsHandThumbsDown style={{ color: "darkblue" }} />
                        </button>
                        <button
                          type="button"
                          style={{
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <BsHandThumbsUp style={{ color: "darkblue" }} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    {atividade.participante ? (
                      <label
                        style={{
                          cursor: "pointer",
                          textAlign: "right",
                          fontSize: "0.8em", // Aumente a fonte aqui
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        {atividade.participante.nome || "Carregando..."}
                      </label>
                    ) : null}
                  </div>
                </div>
              </Card.Footer>
            </Card>
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
