import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import {
  HandThumbsUp,
  HandThumbsUpFill,
  HandThumbsDown,
  HandThumbsDownFill,
} from "react-bootstrap-icons";
import apiRetaguarda from "../../config/apiRetaguarda";
import MessageContext from "../../contexts/MessageContext";

const StatusSelect = ({ label, model, object }) => {
  const { addMessage } = useContext(MessageContext);
  const [status, setStatus] = useState("pendente");

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
      await apiRetaguarda.put(`/${model}/${object._id}/approve/true`);
      setStatus("ativo");

      addMessage("info", `${label} aprovado`);
    } catch (error) {
      addMessage("warning", `Erro ao aprovar ${label}`, error.response.data);
    }
  };

  const handleReject = async (event) => {
    event.stopPropagation();

    try {
      await apiRetaguarda.put(`/${model}/${object._id}/approve/false`);
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
