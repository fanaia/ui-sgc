import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import apiRetaguarda from "../config/apiRetaguarda";

const Login = () => {
  const [msg, setMsg] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const whatsapp = event.target.whatsapp.value;
    const senha = event.target.senha.value;

    try {
      const response = await apiRetaguarda.post("/login", { whatsapp, senha });
      const tokenJwt = response.data.tokenJwt;
      localStorage.setItem("tokenJwt", tokenJwt);

      navigate("/auth/carteira");
    } catch (error) {
      setMsg(error.message);
      console.error("Falha na autenticação", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5 shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">
                CS pix-conta
              </h2>
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
