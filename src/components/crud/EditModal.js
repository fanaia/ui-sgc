import React, { useContext, useState } from "react";
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import CrudContext from "../../contexts/CrudContext";
import MessageDisplay from "../common/MessageDisplay";

const EditModal = ({ ComponentEdit }) => {
  const { title, selectedItem, showModal, setShowModal, saveItem, deleteItem } =
    useContext(CrudContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSave = async () => {
    const ret = await saveItem(selectedItem);
    setShowModal(!ret);
  };

  const handleDelete = () => {
    deleteItem(selectedItem._id);
    setShowModal(false);
    setShowConfirmModal(false);
  };

  const askForDeleteConfirmation = () => {
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedItem?._id > 0 ? `Alterar ${title}` : `Adicionar ${title}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
          <MessageDisplay />
          <ComponentEdit />
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
            style={{ marginLeft: "auto" }}
            disabled={!selectedItem?._id}
            onClick={askForDeleteConfirmation}
          >
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este item?</Modal.Body>
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

export default EditModal;
