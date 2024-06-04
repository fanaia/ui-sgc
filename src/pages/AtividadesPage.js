// AtividadesPage.js
import React, { useState, useEffect, useContext } from "react";
import MessageContext from "../contexts/MessageContext";
import { CrudProvider } from "../contexts/CrudContext";
import apiRetaguarda from "../config/apiRetaguarda";
import ListItem from "../components/crud/ListItem";
import EditModal from "../components/crud/EditModal";
import AtividadeCard from "../components/atividade/AtividadeCard";
import AtividadeEdit from "../components/atividade/AtividadeEdit";

const AtividadesPage = () => {
  const { addMessage } = useContext(MessageContext);
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    fetchItens();
  }, []);

  const fetchItens = async () => {
    const response = await apiRetaguarda.get("atividades");
    setAtividades(response.data);
  };

  const handleSave = async (atividade) => {
    try {
      if (atividade._id) {
        await apiRetaguarda.patch(`atividades/${atividade._id}`, atividade);
        addMessage("info", `Atividade ${atividade.descricao} alterada com sucesso`);
      } else {
        await apiRetaguarda.post("atividades", atividade);
        addMessage(
          "info",
          `Atividade ${atividade.descricao} adicionada com sucesso`
        );
      }
      fetchItens();
      return true;
    } catch (error) {
      const details =
        error.response && error.response.data
          ? error.response.data
          : error.message;

      addMessage("warning", "Ocorreu um erro ao salvar a atividade", details);
      return false;
    }
  };

  const handleDelete = async (id) => {
    await apiRetaguarda.delete(`atividades/${id}`);
    addMessage("info", "Atividade cancelada com sucesso");
    fetchItens();
  };

  return (
    <CrudProvider
      title="Atividades"
      saveItem={handleSave}
      deleteItem={handleDelete}
      fetchItens={fetchItens}
      itens={atividades}
    >
      <ListItem ComponentCard={AtividadeCard} />
      <EditModal ComponentEdit={AtividadeEdit} />
    </CrudProvider>
  );
};

export default AtividadesPage;
