import apiRetaguarda from "../config/apiRetaguarda";

const listParticipantes = async () => {
  const response = await apiRetaguarda.get("/participantes");
  return response.data;
};

const loadParticipante = async (_id) => {
  const response = await apiRetaguarda.get(`/participantes/${_id}`);
  return response.data;
};

const saveParticipante = async (participante) => {
  try {
    if (participante._id) {
      await apiRetaguarda.patch(`/participantes/${participante._id}`, participante);
      return { success: true, message: "Alterado com sucesso!" };
    } else {
      await apiRetaguarda.post("/participantes", participante);
      return { success: true, message: "Adicionado com sucesso!" };
    }
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const deleteParticipante = async (_id) => {
  try {
    await apiRetaguarda.delete(`/participantes/${_id}`);
    return { success: true, message: "Excluído com sucesso!" };
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const setAtivo = async (_id, ativo) => {
  const response = await apiRetaguarda.patch(`/participantes/${_id}`, { ativo });
  return response.data;
};

const participanteService = {
  listParticipantes,
  loadParticipante,
  saveParticipante,
  deleteParticipante,
  setAtivo,
};

export default participanteService;
