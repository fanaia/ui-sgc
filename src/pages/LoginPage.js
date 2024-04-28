import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../components/Login";
import "../index.css";


function LoginPage() {

  return (
    <div>
      <h1>SGC</h1>
      <h2>Sistema de Gestão e Consenso</h2>
      <hr />
      <Login />
    </div>
  );
}

export default LoginPage;
