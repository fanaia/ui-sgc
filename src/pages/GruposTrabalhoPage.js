// GruposTrabalhoPage.js
import React, { useState, useEffect, useContext } from "react";
import MessageContext from "../contexts/MessageContext";
import { CrudProvider } from "../contexts/CrudContext";
import apiRetaguarda from "../config/apiRetaguarda";
import ListItem from "../components/crud/ListItem";
import EditModal from "../components/crud/EditModal";
import GrupoTrabalhoCard from "../components/grupoTrabalho/GrupoTrabalhoCard";
import GrupoTrabalhoEdit from "../components/grupoTrabalho/GrupoTrabalhoEdit";

const GruposTrabalhoPage = () => {
  const { addMessage } = useContext(MessageContext);
  const [gruposTrabalho, setGruposTrabalho] = useState([]);

  useEffect(() => {
    fetchItens();
  }, []);

  const fetchItens = async () => {
    const response = await apiRetaguarda.get("grupos-trabalho");
    setGruposTrabalho(response.data);
  };

  const handleSave = async (grupoTrabalho) => {
    try {
      if (grupoTrabalho._id) {
        await apiRetaguarda.patch(`grupos-trabalho/${grupoTrabalho._id}`, grupoTrabalho);
        addMessage("info", `Grupo de trabalho ${grupoTrabalho.nome} alterado com sucesso`);
      } else {
        await apiRetaguarda.post("grupos-trabalho", grupoTrabalho);
        addMessage("info", `Grupo de trabalho ${grupoTrabalho.nome} adicionado com sucesso`);
      }
      fetchItens();
      return true;
    } catch (error) {
      const details = error.response && error.response.data ? error.response.data : error.message;

      addMessage("warning", "Ocorreu um erro ao salvar o grupo de trabalho", details);
      return false;
    }
  };

  const handleDelete = async (id) => {
    await apiRetaguarda.delete(`grupos-trabalho/${id}`);
    addMessage("info", "Grupo de trabalho cancelado com sucesso");
    fetchItens();
  };

  return (
    <CrudProvider
      title="Grupos de Trabalho"
      saveItem={handleSave}
      deleteItem={handleDelete}
      fetchItens={fetchItens}
      itens={gruposTrabalho}
    >
      <ListItem ComponentCard={GrupoTrabalhoCard} />
      <EditModal ComponentEdit={GrupoTrabalhoEdit} />
    </CrudProvider>
  );
};

export default GruposTrabalhoPage;
