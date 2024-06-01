import apiRetaguarda from "../config/apiRetaguarda";

const listAtividades = async () => {
  const response = await apiRetaguarda.get("/atividades");
  return response.data;
};

const loadAtividade = async (_id) => {
  const response = await apiRetaguarda.get(`/atividades/${_id}`);
  return response.data;
};

const saveAtividade = async (atividade) => {
  try {
    if (atividade._id) {
      await apiRetaguarda.patch(`/atividades/${atividade._id}`, atividade);
      return { success: true, message: "Alterado com sucesso!" };
    } else {
      await apiRetaguarda.post("/atividades", atividade);
      return { success: true, message: "Adicionado com sucesso!" };
    }
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const deleteAtividade = async (_id) => {
  try {
    await apiRetaguarda.delete(`/atividades/${_id}`);
    return { success: true, message: "Excluído com sucesso!" };
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const atividadeService = {
  listAtividades,
  loadAtividade,
  saveAtividade,
  deleteAtividade,
};

export default atividadeService;
