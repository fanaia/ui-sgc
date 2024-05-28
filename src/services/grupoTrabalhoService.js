import apiRetaguarda from "../config/apiRetaguarda";

const listGruposTrabalho = async () => {
  const response = await apiRetaguarda.get("/grupos-trabalho");
  return response.data;
};

const loadGrupoTrabalho = async (_id) => {
  const response = await apiRetaguarda.get(`/grupos-trabalho/${_id}`);
  return response.data;
};

const saveGrupoTrabalho = async (grupoTrabalho) => {
  try {
    if (grupoTrabalho._id) {
      await apiRetaguarda.patch(`/grupos-trabalho/${grupoTrabalho._id}`, grupoTrabalho);
      return { success: true, message: "Alterado com sucesso!" };
    } else {
      await apiRetaguarda.post("/grupos-trabalho", grupoTrabalho);
      return { success: true, message: "Adicionado com sucesso!" };
    }
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const deleteGrupoTrabalho = async (_id) => {
  try {
    await apiRetaguarda.delete(`/grupos-trabalho/${_id}`);
    return { success: true, message: "Excluído com sucesso!" };
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const grupoTrabalhoService = {
  listGruposTrabalho,
  loadGrupoTrabalho,
  saveGrupoTrabalho,
  deleteGrupoTrabalho,
};

export default grupoTrabalhoService;