import apiRetaguarda from "../config/apiRetaguarda";

const listProjetos = async () => {
  const response = await apiRetaguarda.get("/projetos");
  return response.data;
};

const loadProjeto = async (_id) => {
  const response = await apiRetaguarda.get(`/projetos/${_id}`);
  return response.data;
};

const saveProjeto = async (projeto) => {
  try {
    if (projeto._id) {
      await apiRetaguarda.patch(`/projetos/${projeto._id}`, projeto);
      return { success: true, message: "Alterado com sucesso!" };
    } else {
      await apiRetaguarda.post("/projetos", projeto);
      return { success: true, message: "Adicionado com sucesso!" };
    }
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const deleteProjeto = async (_id) => {
  try {
    await apiRetaguarda.delete(`/projetos/${_id}`);
    return { success: true, message: "Excluído com sucesso!" };
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const projetoService = {
  listProjetos,
  loadProjeto,
  saveProjeto,
  deleteProjeto,
};

export default projetoService;
