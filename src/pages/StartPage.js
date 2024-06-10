import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import apiRetaguarda from "../config/apiRetaguarda";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const { register, handleSubmit } = useForm();
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setCarregando(true);
    console.log(data);

    await apiRetaguarda
      .post("/createSeed", data)
      .then((response) => {
        alert(response.data);
        navigate("/");
      })
      .catch((error) => {
        alert("Erro ao iniciar a Seed", error.response?.data);
      });

    setCarregando(false);
  };

  return (
    <Container>
      <h1>Seed Contrato-Social</h1>
      <h2>OAD (Organização Autônoma Descentralizada)</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <div>
          <label>Qual o nome da Organização?</label>
          <br />
          <input {...register("contratoSocial", { required: true })} style={{ margin: "5px 0" }} />
        </div>
        <div>
          <label>Qual o nome do Token? (Moeda)</label>
          <br />
          <input {...register("tokenNome", { required: true })} style={{ margin: "5px 0" }} />
        </div>
        <div>
          <label>Qual a sigla da Moeda? (3 letras)</label>
          <br />
          <input
            {...register("tokenSigla", { required: true, maxLength: 3, minLength: 3 })}
            style={{ margin: "5px 0" }}
          />
        </div>
        <div>
          <label>Qual o valor de Liquidação Mínima?</label>
          <br />
          <input
            {...register("liquidacaoMinima", { required: true })}
            style={{ margin: "5px 0" }}
          />
        </div>
        <div>
          <input
            type="checkbox"
            {...register("ativarEstagioParticipante")}
            style={{ margin: "5px 0" }}
          />{" "}
          Ativar o Token/Hora do Participante por Estágio
        </div>
        <div>
          <h2>Participante Inicial</h2>
          <div>
            <label>Nome</label>
            <br />
            <input
              {...register("participante.nome", { required: true })}
              style={{ margin: "5px 0" }}
            />
          </div>
          <div>
            <label>E-mail</label>
            <br />
            <input
              {...register("participante.email", { required: true })}
              style={{ margin: "5px 0" }}
            />
          </div>
          <div>
            <label>Whatsapp com DDD (coloque o DDI caso diferente de Brasil)</label>
            <br />
            <input
              {...register("participante.whatsapp", { required: true })}
              style={{ margin: "5px 0" }}
            />
          </div>
          <div>
            <label>Senha</label>
            <br />
            <input
              {...register("participante.senha", { required: true })}
              style={{ margin: "5px 0" }}
            />
          </div>
        </div>
        <button type="submit" style={{ padding: "10px", marginTop: "10px" }} disabled={carregando}>
          {carregando ? "Carregando..." : "Iniciar"}
        </button>
      </form>
    </Container>
  );
};

export default StartPage;
