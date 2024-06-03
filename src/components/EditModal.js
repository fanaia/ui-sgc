import React, { useContext } from "react";
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import CrudContext from "../contexts/CrudContext";

const EditModal = ({ ComponentEdit }) => {
  const { title, selectedItem, showModal, setShowModal, saveItem, deleteItem } = useContext(CrudContext);

  const handleSave = () => {
    saveItem(selectedItem);
    setShowModal(false);
  };

  const handleDelete = () => {
    deleteItem(selectedItem._id);
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedItem?._id > 0 ? `Alterar ${title}` : `Adicionar ${title}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
        <ComponentEdit />
      </Modal.Body>
      <Modal.Footer>
        <ButtonGroup>
          <Button variant="primary" onClick={handleSave}>Salvar</Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </ButtonGroup>
        <Button variant="danger" style={{ marginLeft: "auto" }} disabled={!selectedItem?._id} onClick={handleDelete}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
