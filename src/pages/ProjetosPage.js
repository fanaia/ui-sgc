import React, { useEffect, useRef, useState } from "react";
import { Form, Modal, Button, ButtonGroup, Card } from "react-bootstrap";
import projetoService from "../services/projetoService";
import ProjetoEdit from "../components/ProjetoEdit";

const ProjetosPage = () => {
  const [msg, setMsg] = useState();
  const [projetos, setProjetos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [projetoIdToDelete, setProjetoIdToDelete] = useState(null);

  const projetoEditRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    projetoService.listProjetos().then((data) => setProjetos(data.map((item) => ({ ...item }))));
  };

  // const toggleAtivo = async (_id, value) => {
  //   await projetoService.setAtivo(_id, value);
  //   fetchData();
  // };

  const handleEdit = (_id) => {
    setSelectedId(_id);
    setShowModal(true);
  };

  const askForDeleteConfirmation = (_id) => {
    setProjetoIdToDelete(_id);
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    projetoService.deleteProjeto(projetoIdToDelete).then((response) => {
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
    const ret = await projetoEditRef.current.save();
    setShowModal(false);
    fetchData();
    setMsg(ret);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container">
        {msg && (
          <div className={`alert alert-${msg.success ? "info" : "danger"}`} role="alert">
            {JSON.stringify(msg.message)}
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center my-1">
          <h1>Projetos</h1>
          <Button onClick={handleAdd} className="btn btn-primary mb-3">
            Adicionar
          </Button>
        </div>
        <div className="d-flex flex-wrap">
          {projetos.map((projeto) => (
            <Card
              key={projeto._id}
              style={{
                width: "100%",
                margin: "10px",
                borderLeft: `10px solid ${projeto.corEtiqueta}`,
                cursor: "pointer",
              }}
              onClick={() => handleEdit(projeto._id)}
            >
              <Card.Body>
                <div className="mt-2">
                  <label style={{ cursor: "pointer", fontWeight: "bold" }}>{projeto.nome}</label>
                </div>
                <div className="mt-2">
                  <label style={{ cursor: "pointer" }}>Status: {projeto.status}</label>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{selectedId > 0 ? "Alterar Projeto" : "Adicionar Projeto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
          <ProjetoEdit ref={projetoEditRef} _id={selectedId} />
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
        <Modal.Body>Tem certeza que deseja excluir este Projeto?</Modal.Body>
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

export default ProjetosPage;
