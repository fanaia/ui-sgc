// ParticipantesPage.js
import React, { useState, useEffect, useContext } from "react";
import MessageContext from "../contexts/MessageContext";
import { CrudProvider } from "../contexts/CrudContext";
import apiRetaguarda from "../config/apiRetaguarda";
import ListItem from "../components/crud/ListItem";
import EditModal from "../components/crud/EditModal";
import ParticipanteCard from "../components/participante/ParticipanteCard";
import ParticipanteEdit from "../components/participante/ParticipanteEdit";

const ParticipantesPage = () => {
  const { addMessage } = useContext(MessageContext);
  const [participantes, setParticipantes] = useState([]);

  useEffect(() => {
    fetchItens();
  }, []);

  const fetchItens = async () => {
    const response = await apiRetaguarda.get("participantes");
    setParticipantes(response.data);
  };

  const handleSave = async (participante) => { 
    try {
      if (participante._id) {
        await apiRetaguarda.patch(`participantes/${participante._id}`, participante);
        addMessage("info", `Participante  ${participante.nome} alterado com sucesso`);
      } else {
        await apiRetaguarda.post("participantes", participante);
        addMessage("info", `Participante ${participante.nome} adicionado com sucesso`);
      }
      fetchItens();
      return true;
    } catch (error) {
      const details = error.response && error.response.data ? error.response.data : error.message;

      addMessage("warning", "Ocorreu um erro ao salvar o participante", details);
      return false;
    }
  };

  const handleDelete = async (id) => {
    await apiRetaguarda.delete(`participantes/${id}`);
    addMessage("info", "Participante cancelado com sucesso");
    fetchItens();
  };

  return (
    <CrudProvider
      title="Participantes"
      saveItem={handleSave}
      deleteItem={handleDelete}
      fetchItens={fetchItens}
      itens={participantes}
    >
      <ListItem ComponentCard={ParticipanteCard} />
      <EditModal ComponentEdit={ParticipanteEdit} />
    </CrudProvider>
  );
};

export default ParticipantesPage;
