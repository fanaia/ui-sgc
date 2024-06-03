import React, { useState, useEffect, useContext } from "react";
import MessageContext from "../contexts/MessageContext";
import { CrudProvider } from "../contexts/CrudContext";
import apiRetaguarda from "../config/apiRetaguarda";
import ListItem from "../components/crud/ListItem";
import EditModal from "../components/crud/EditModal";
import MovimentacaoFinanceiraCard from "../components/movimentacaoFinanceira/MovimentacaoFinanceiraCard";
import MovimentacaoFinanceiraEdit from "../components/movimentacaoFinanceira/MovimentacaoFinanceiraEdit";

const MovimentacaoFinanceiraPage = () => {
  const { addMessage } = useContext(MessageContext);
  const [movimentacoesFinanceiras, setMovimentacoesFinanceiras] = useState([]);

  useEffect(() => {
    fetchItens();
  }, []);

  const fetchItens = async () => {
    const response = await apiRetaguarda.get("movimentacoes-financeiras");
    setMovimentacoesFinanceiras(response.data);
  };

  const handleSave = async (movimentacaoFinanceira) => {
    try {
      if (movimentacaoFinanceira._id) {
        await apiRetaguarda.patch(
          `movimentacoes-financeiras/${movimentacaoFinanceira._id}`,
          movimentacaoFinanceira
        );
        addMessage(
          "info",
          `Movimentação Financeira ${movimentacaoFinanceira.descricao} alterada com sucesso`
        );
      } else {
        await apiRetaguarda.post(
          "movimentacoes-financeiras",
          movimentacaoFinanceira
        );
        addMessage(
          "info",
          `Movimentação Financeira ${movimentacaoFinanceira.descricao} adicionada com sucesso`
        );
      }
      fetchItens();
      return true;
    } catch (error) {
      const details =
        error.response && error.response.data
          ? error.response.data
          : error.message;

      addMessage(
        "warning",
        "Ocorreu um erro ao salvar a movimentação financeira",
        details
      );
      return false;
    }
  };

  const handleDelete = async (id) => {
    await apiRetaguarda.delete(`movimentacoes-financeiras/${id}`);
    addMessage("info", "Movimentação Financeira cancelada com sucesso");
    fetchItens();
  };

  return (
    <CrudProvider
      title="Movimentações Financeiras"
      saveItem={handleSave}
      deleteItem={handleDelete}
      fetchItens={fetchItens}
      itens={movimentacoesFinanceiras}
    >
      <ListItem ComponentCard={MovimentacaoFinanceiraCard} />
      <EditModal ComponentEdit={MovimentacaoFinanceiraEdit} />
    </CrudProvider>
  );
};

export default MovimentacaoFinanceiraPage;
