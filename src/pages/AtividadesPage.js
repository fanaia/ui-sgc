import React, { useEffect, useRef, useState } from "react";
import { Form, Modal, Button, ButtonGroup, ProgressBar, Card } from "react-bootstrap";
import { HandThumbsDown, HandThumbsUp } from "react-bootstrap-icons";
import atividadeService from "../services/atividadeService";
import AtividadeEdit from "../components/AtividadeEdit";
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
    const grupoTrabalho = await grupoTrabalhoService.loadGrupoTrabalho(atividade.grupoTrabalho);
    setAtividades((prevAtividades) =>
      prevAtividades.map((atv) => (atv._id === atividade._id ? { ...atv, grupoTrabalho } : atv))
    );
  };

  const loadParticipante = async (atividade) => {
    const participante = await participanteService.loadParticipante(atividade.participante);
    setAtividades((prevAtividades) =>
      prevAtividades.map((atv) => (atv._id === atividade._id ? { ...atv, participante } : atv))
    );
  };

  const loadProjeto = async (atividade) => {
    const projeto = await projetoService.loadProjeto(atividade.projeto);
    setAtividades((prevAtividades) =>
      prevAtividades.map((atv) => (atv._id === atividade._id ? { ...atv, projeto } : atv))
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
          <div className={`alert alert-${msg.success ? "info" : "danger"}`} role="alert">
            {JSON.stringify(msg.message)}
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center my-1">
          <h1>Atividades</h1>
          <Button onClick={handleAdd} className="btn btn-primary mb-3">
            Adicionar
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
              }}
              onClick={() => handleEdit(atividade._id)}
            >
              <Card.Body>
                <div className="mt-2">
                  {atividade.grupoTrabalho ? (
                    <label
                      style={{
                        backgroundColor: atividade.grupoTrabalho.corEtiqueta,
                        paddingLeft: "10px",
                        paddingRight: "10px",
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
                      }}
                    >
                      {atividade.projeto.nome || "Carregando..."}
                    </label>
                  ) : null}
                </div>
                <div className="mt-2">
                  <label style={{ cursor: "pointer", fontWeight: "bold" }}>
                    {atividade.descricao}
                  </label>
                </div>
                <div className="mt-2">
                  <label style={{ cursor: "pointer" }}>
                    Valor: {atividade.totalHoras} hrs / {atividade.totalTokens} Token{" "}
                  </label>
                </div>
                <div className="mt-2">
                  {atividade.participante ? (
                    <label
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      Participante: {atividade.participante.nome || "Carregando..."}
                    </label>
                  ) : null}
                </div>
                <div className="mt-2">
                  <label style={{ cursor: "pointer" }}>Status: {atividade.status}</label>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{selectedId > 0 ? "Alterar Atividade" : "Adicionar Atividade"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
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
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
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
