import React, { useEffect, useRef, useState } from "react";
import { Form, Modal, Button, ButtonGroup } from "react-bootstrap";
import grupoTrabalhoService from "../services/grupoTrabalhoService";
import GrupoTrabalhoEdit from "../components/GrupoTrabalhoEdit";

const GruposTrabalhoPage = () => {
  const [msg, setMsg] = useState();
  const [gruposTrabalho, setGruposTrabalho] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [grupoTrabalhoIdToDelete, setGrupoTrabalhoIdToDelete] = useState(null);

  const grupoTrabalhoEditRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    grupoTrabalhoService
      .listGruposTrabalho()
      .then((data) => setGruposTrabalho(data.map((item) => ({ ...item }))));
  };

  const toggleAtivo = async (_id, value) => {
    await grupoTrabalhoService.setAtivo(_id, value);
    fetchData();
  };

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
        <h1 className="my-4">Grupos de Trabalho</h1>
        <Button variant="primary" onClick={handleAdd}>
          Adicionar Grupo de Trabalho
        </Button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ativo</th>
              <th>Participante Responsável</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {gruposTrabalho.map((grupoTrabalho) => (
              <tr key={grupoTrabalho._id}>
                <td>{grupoTrabalho.nome}</td>
                <td>{grupoTrabalho.descricao}</td>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={grupoTrabalho.ativo}
                    onChange={(e) => toggleAtivo(grupoTrabalho._id, e.target.checked)}
                  />
                </td>
                <td>{grupoTrabalho.participanteResponsavel}</td>
                <td>
                  <ButtonGroup>
                    <Button variant="secondary" onClick={() => handleEdit(grupoTrabalho._id)}>
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => askForDeleteConfirmation(grupoTrabalho._id)}
                    >
                      Excluir
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
