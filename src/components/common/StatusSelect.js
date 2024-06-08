import React, { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { HandThumbsUp, HandThumbsDown } from "react-bootstrap-icons";
import apiRetaguarda from "../../config/apiRetaguarda";
import MessageContext from "../../contexts/MessageContext";
import StatusContext from "../../contexts/StatusContext";

const StatusSelect = ({ label, router, object }) => {
  const { addMessage } = useContext(MessageContext);
  const { status, setStatus } = useContext(StatusContext);

  useEffect(() => {
    if (object?.status === undefined) {
      setStatus("pendente");
    } else {
      setStatus(object.status);
    }
  }, [object]);

  const handleApprove = async (event) => {
    event.stopPropagation();

    try {
      await apiRetaguarda.put(`/${router}/${object._id}/approve/true`);
      setStatus("ativo");

      addMessage("info", `${label} aprovado`);
    } catch (error) {
      addMessage("warning", `Erro ao aprovar ${label}`, error.response.data);
    }
  };

  const handleReject = async (event) => {
    event.stopPropagation();

    try {
      await apiRetaguarda.put(`/${router}/${object._id}/approve/false`);
      setStatus("recusado");

      addMessage("info", `${label} recusado`);
    } catch (error) {
      console.error(error);
      addMessage("warning", `Erro ao recusar ${label}`, error.response.data);
    }
  };

  return (
    <Form.Group>
      <Form.Label>
        {status === "pendente" && (
          <>
            <HandThumbsDown size={32} onClick={handleReject} />
            <HandThumbsUp size={32} onClick={handleApprove} />
          </>
        )}
      </Form.Label>
    </Form.Group>
  );
};

export default StatusSelect;
