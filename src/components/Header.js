import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <header style={{ marginBottom: '10px' }}>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      >
        <Navbar.Brand
          as={Link}
          to="/auth/home"
          style={{ paddingLeft: "1rem" }}
          onClick={() => setExpanded(false)}
        >
          SGC
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{ paddingLeft: "1rem" }}>
          <Nav>
            <Nav.Link as={Link} to="/auth/carteira" onClick={() => setExpanded(false)}>
              Carteira
            </Nav.Link>
            <Nav.Link as={Link} to="/auth/consenso" onClick={() => setExpanded(false)}>
              Consenso
            </Nav.Link>
            <Nav.Link as={Link} to="/auth/atividades" onClick={() => setExpanded(false)}>
              Atividades
            </Nav.Link>
            <Nav.Link as={Link} to="/auth/financeiro" onClick={() => setExpanded(false)}>
              Financeiro
            </Nav.Link>
            <Nav.Link as={Link} to="/auth/projetos" onClick={() => setExpanded(false)}>
              Projetos
            </Nav.Link>
            <Nav.Link as={Link} to="/auth/grupos-trabalho" onClick={() => setExpanded(false)}>
              Grupos de Trabalho
            </Nav.Link>
            <Nav.Link as={Link} to="/auth/participantes" onClick={() => setExpanded(false)}>
              Participantes
            </Nav.Link>
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
              Sair
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
