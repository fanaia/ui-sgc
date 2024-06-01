import React, { useEffect, useRef, useState } from "react";
import { Form, Modal, Button, ButtonGroup, Card } from "react-bootstrap";
import grupoTrabalhoService from "../services/grupoTrabalhoService";
import GrupoTrabalhoEdit from "../components/GrupoTrabalhoEdit";
import participanteService from "../services/participanteService";

const GruposTrabalhoPage = () => {
  const [msg, setMsg] = useState();
  const [gruposTrabalho, setGruposTrabalho] = useState([]);
  const [participantes, setParticipantes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [grupoTrabalhoIdToDelete, setGrupoTrabalhoIdToDelete] = useState(null);

  const grupoTrabalhoEditRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let gruposTrabalho = await grupoTrabalhoService.listGruposTrabalho();

    gruposTrabalho = await Promise.all(
      gruposTrabalho.map(async (grupo) => {
        const participante = await participanteService.loadParticipante(
          grupo.participanteResponsavel
        );
        return { ...grupo, participanteResponsavel: participante };
      })
    );

    setGruposTrabalho(gruposTrabalho);
  };

  // const toggleAtivo = async (_id, value) => {
  //   await grupoTrabalhoService.setAtivo(_id, value);
  //   fetchData();
  // };

  const handleEdit = (_id) => {
    setSelectedId(_id);
    setShowModal(true);
  };

  const askForDeleteConfirmation = (_id) => {
    setGrupoTrabalhoIdToDelete(_id);
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    grupoTrabalhoService.deleteGrupoTrabalho(grupoTrabalhoIdToDelete).then((response) => {
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
    const ret = await grupoTrabalhoEditRef.current.save();
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
          <h1>Grupo Trabalho</h1>
          <Button onClick={handleAdd} className="btn btn-primary mb-3">
            Adicionar
          </Button>
        </div>
        <div className="d-flex flex-wrap">
          {gruposTrabalho.map((grupoTrabalho) => (
            <Card
              key={grupoTrabalho._id}
              style={{
                width: "100%",
                margin: "10px",
                borderLeft: `10px solid ${grupoTrabalho.corEtiqueta}`,
                cursor: "pointer",
              }}
              onClick={() => handleEdit(grupoTrabalho._id)}
            >
              <Card.Body>
                <div className="mt-2">
                  <label style={{ cursor: "pointer", fontWeight: "bold" }}>{grupoTrabalho.nome}</label>
                </div>
                <div className="mt-2">
                  <label style={{ cursor: "pointer" }}>
                    Responsável: {grupoTrabalho.participanteResponsavel ? grupoTrabalho.participanteResponsavel.nome : 'Carregando...'}
                  </label>
                </div>
                <div className="mt-2">
                  <label style={{ cursor: "pointer" }}>Status: {grupoTrabalho.status}</label>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Grupo de Trabalho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GrupoTrabalhoEdit ref={grupoTrabalhoEditRef} _id={selectedId} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza que deseja excluir este grupo de trabalho?</Modal.Body>
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

export default GruposTrabalhoPage;
