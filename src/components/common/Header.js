import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  const [expanded, setExpanded] = useState(false); 
  const nome = localStorage.getItem("nome");
  const contratoSocial = localStorage.getItem("contratoSocial");

  return (
    <header style={{ marginBottom: "10px" }}>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      >
        <Navbar.Brand
          as={Link}
          to="./home"
          style={{ paddingLeft: "1rem" }}
          onClick={() => setExpanded(false)}
        >
          cs-{contratoSocial} ({nome})
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{ paddingLeft: "1rem" }}
        >
          <Nav>
            <Nav.Link
              as={Link}
              to="./atividades"
              onClick={() => setExpanded(false)}
            >
              Atividades
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="./movimentacoes-financeiras"
              onClick={() => setExpanded(false)}
            >
              Movimentações Financeiras
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="./projetos"
              onClick={() => setExpanded(false)}
            >
              Projetos
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="./grupos-trabalho"
              onClick={() => setExpanded(false)}
            >
              Grupos de Trabalho
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="./participantes"
              onClick={() => setExpanded(false)}
            >
              Participantes
            </Nav.Link>
            <Nav.Link as={Link} to="./" onClick={() => setExpanded(false)}>
              Sair
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
