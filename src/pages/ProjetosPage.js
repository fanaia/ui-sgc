import React, { useState, useEffect, useContext } from "react";
import MessageContext from "../contexts/MessageContext";
import { CrudProvider } from "../contexts/CrudContext";
import apiRetaguarda from "../config/apiRetaguarda";
import ListItem from "../components/crud/ListItem";
import EditModal from "../components/crud/EditModal";
import ProjetoCard from "../components/projeto/ProjetoCard";
import ProjetoEdit from "../components/projeto/ProjetoEdit";

const ProjetosPage = () => {
  const { addMessage } = useContext(MessageContext);
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    fetchItens();
  }, []);

  const fetchItens = async () => {
    const response = await apiRetaguarda.get("projetos");
    setProjetos(response.data);
  };

  const handleSave = async (projeto) => {
    try {
      if (projeto._id) {
        await apiRetaguarda.patch(`projetos/${projeto._id}`, projeto);
        addMessage("info", `Projeto ${projeto.nome} alterado com sucesso`);
      } else {
        await apiRetaguarda.post("projetos", projeto);
        addMessage("info", `Projeto ${projeto.nome} adicionado com sucesso`);
      }
      fetchItens();
      return true;
    } catch (error) {
      const details = error.response && error.response.data ? error.response.data : error.message;

      addMessage("warning", "Ocorreu um erro ao salvar o projeto", details);
      return false;
    }
  };

  const handleDelete = async (id) => {
    await apiRetaguarda.delete(`projetos/${id}`);
    addMessage("info", "Projeto cancelado com sucesso");
    fetchItens();
  };

  return (
    <CrudProvider
      title="Projetos"
      saveItem={handleSave}
      deleteItem={handleDelete}
      fetchItens={fetchItens}
      itens={projetos}
    >
      <ListItem ComponentCard={ProjetoCard} />
      <EditModal ComponentEdit={ProjetoEdit} />
    </CrudProvider>
  );
};

export default ProjetosPage;
