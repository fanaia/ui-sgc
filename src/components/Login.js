import React, { useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleLogin = () => {
    // Implemente a lógica de login aqui

    // Redirecionar para a página inicial
    navigate("/auth/home");
  };

  const handleRegister = () => {
    // Implemente a lógica de registro aqui
  };

  const handleForgotAccess = () => {
    // Implemente a lógica de recuperação de acesso aqui
  };

  return (
    <Form>
      <FormGroup>
        <Form.Control
          type="tel"
          name="phone"
          id="phoneNumber"
          placeholder="Telefone / WhatsApp"
          value={phoneNumber}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button variant="primary" className="w-100 mb-3" onClick={handleLogin}>
        Entrar
      </Button>
      <hr />
      <Button variant="link" className="w-100" onClick={handleRegister}>
        Criar novo cadastro
      </Button>
      <Button variant="link" className="w-100" onClick={handleForgotAccess}>
        Perdi meu acesso
      </Button>
    </Form>
  );
}

export default Login;