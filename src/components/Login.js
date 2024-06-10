import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import apiRetaguarda from "../config/apiRetaguarda";

const Login = () => {
  const [msg, setMsg] = useState();
  const navigate = useNavigate();
  const { contratoSocial } = useParams();

  localStorage.setItem("contratoSocial", contratoSocial);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const whatsapp = event.target.whatsapp.value;
    const senha = event.target.senha.value;

    try {
      const response = await apiRetaguarda.post("/login", { whatsapp, senha });
      localStorage.setItem("tokenJwt", response.data.tokenJwt);
      localStorage.setItem("_id", response.data._id);
      localStorage.setItem("nome", response.data.nome);

      navigate("/auth/home");
    } catch (error) {
      setMsg(error.response?.data);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5 shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">Contrato Social: {contratoSocial}</h2>
              <h3 className="text-center mb-4">Autenticação</h3>
              {msg && (
                <div className="alert alert-danger" role="alert">
                  {JSON.stringify(msg)}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="whatsapp">Whatsapp</label>
                  <input type="whatsapp" id="whatsapp" name="whatsapp" className="form-control" />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="senha">Senha</label>
                  <input type="password" id="senha" name="senha" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
