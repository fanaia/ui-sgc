import apiRetaguarda from "../config/apiRetaguarda";

const listAtividades = async () => {
  const response = await apiRetaguarda.get("/atividades");
  return response.data;
};

const loadAtividade = async (_id) => {
  const response = await apiRetaguarda.get(`/atividades/${_id}`);
  return response.data;
};

const createAtividade = async (atividade) => {
  console.log(atividade);
  try {
    await apiRetaguarda.post("/atividades", atividade);
    return { success: true, message: "Adicionado com sucesso!" };
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
  createAtividade,
  deleteAtividade,
};

export default atividadeService;
