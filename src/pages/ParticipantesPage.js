import React, { useEffect, useRef, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { Form, Modal, Button, ButtonGroup, Card } from "react-bootstrap";
import participanteService from "../services/participanteService";
import ParticipanteEdit from "../components/ParticipanteEdit";

const ParticipantesPage = () => {
  const [msg, setMsg] = useState();
  const [participantes, setParticipantes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [participanteIdToDelete, setParticipanteIdToDelete] = useState(null);

  const participanteEditRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    participanteService
      .listParticipantes()
      .then((data) => setParticipantes(data.map((item) => ({ ...item }))));
  };

  const toggleAtivo = async (_id, value) => {
    await participanteService.setAtivo(_id, value);
    fetchData();
  };

  const handleEdit = (_id) => {
    setSelectedId(_id);
    setShowModal(true);
  };

  const askForDeleteConfirmation = (_id) => {
    setParticipanteIdToDelete(_id);
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    participanteService
      .deleteParticipante(participanteIdToDelete)
      .then((response) => {
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
    const ret = await participanteEditRef.current.save();
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
          <div
            className={`alert alert-${msg.success ? "info" : "danger"}`}
            role="alert"
          >
            {JSON.stringify(msg.message)}
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center my-1">
          <h1 style={{ marginLeft: "10px" }}>Participantes</h1>
          <Button
            onClick={handleAdd}
            className="btn btn-link mb-3 border-0 btn-no-hover btn-outline-none"
            style={{ fontSize: "35px", backgroundColor: "transparent" }}
          >
            <BsPlusCircleFill />
          </Button>
        </div>
        <div className="d-flex flex-wrap justify-content-start">
          {participantes.map((participante) => (
            <Card
              key={participante._id}
              style={{
                width: "100%",
                margin: "10px",
                cursor: "pointer",
                borderLeft: "8px solid darkblue",
              }}
              onClick={() => handleEdit(participante._id)}
            >
              <Card.Header
                style={{ backgroundColor: "#ffffff", fontWeight: "bold" }}
              >
                {participante.nome}
              </Card.Header>
              <Card.Body
                style={{ fontSize: "calc(1em - 3px)", fontStyle: "italic" }}
              >
                <div className="row">
                  <div className="col">
                    <Card.Text>
                      <strong>Status:</strong>{" "}
                      {participante.status.charAt(0).toUpperCase() +
                        participante.status.slice(1)}
                    </Card.Text>
                  </div>
                  <div className="col">
                    <Card.Text>
                      <strong>Tokens/hora:</strong> {participante.tokenHora}
                      tk(s)
                    </Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedId > 0 ? "Alterar Participante" : "Adicionar Participante"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}
        >
          <ParticipanteEdit ref={participanteEditRef} _id={selectedId} />
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
        <Modal.Body>
          Tem certeza que deseja excluir este Participante?
        </Modal.Body>
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

export default ParticipantesPage;
