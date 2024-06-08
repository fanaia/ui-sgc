import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import apiRetaguarda from "axios";

const StartPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    apiRetaguarda
      .post("/createSeed", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <h1>Semente</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>contratoSocial</label>
          <input {...register("seed.contratoSocial")} />
        </div>
        <div>
          <label>tokenNome</label>
          <input {...register("seed.tokenNome")} />
        </div>
        <div>
          <label>tokenSigla</label>
          <input {...register("seed.tokenSigla")} />
        </div>
        <div>
          <label>liquidacaoMinima</label>
          <input {...register("seed.liquidacaoMinima")} />
        </div>
        <div>
          <label>ativarEstagioParticipante</label>
          <input {...register("seed.ativarEstagioParticipante")} />
        </div>
        <div>
          <h2>participante</h2>
          <div>
            <label>nome</label>
            <input {...register("seed.participante.nome")} />
          </div>
          <div>
            <label>email</label>
            <input {...register("seed.participante.email")} />
          </div>
          <div>
            <label>whatsapp</label>
            <input {...register("seed.participante.whatsapp")} />
          </div>
          <div>
            <label>senha</label>
            <input {...register("seed.participante.senha")} />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
};

export default StartPage;
