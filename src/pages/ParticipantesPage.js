// ParticipantesPage.js
import React, { useState, useEffect, useContext } from "react";
import { CrudProvider } from "../contexts/CrudContext";
import apiRetaguarda from "../config/apiRetaguarda";
import ListItem from "../components/ListItem";
import EditModal from "../components/EditModal";
import ParticipanteCard from "../components/Participante/ParticipanteCard";
import ParticipanteEdit from "../components/Participante/ParticipanteEdit";
import MessageContext from "../contexts/MessageContext";

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
    if (participante._id) {
      await apiRetaguarda.patch(`participantes/${participante._id}`, participante);
      addMessage("info", "Participante alterado com sucesso");
    } else {
      await apiRetaguarda.post("participantes", participante);
      addMessage("info", "Participante adicionado com sucesso");
    }
    fetchItens();
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
