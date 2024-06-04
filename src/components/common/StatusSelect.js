import React from "react";
import { Form } from "react-bootstrap";

const StatusSelect = ({ status, handleStatusChange }) => {
  return (
    <Form.Group>
      <Form.Label>Status</Form.Label>
      <Form.Select id="status" value={status} onChange={handleStatusChange}>
        <option></option>
        <option value="ativo">Ativo</option>
        <option value="pendente">Pendente</option>
        <option value="recusado">Recusado</option>
        <option value="cancelado">Cancelado</option>
      </Form.Select>
    </Form.Group>
  );
};

export default StatusSelect;
