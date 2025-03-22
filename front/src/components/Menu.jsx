// src/components/Menu.jsx
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { BsPersonCircle, BsListCheck, BsGear } from "react-icons/bs";
import './styles.css';
function Menu() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src="/logo.png"
            width="40"
            height="40"
            className="d-inline-block align-top me-2 brand-icon"
            alt="Dog Cone Icon"
          />
          Veterinaria
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/inicio">Inicio</Nav.Link>
            {user && user.role === "miembro" && (
              <Nav.Link as={NavLink} to="/veterinarios/lista">
                <BsListCheck /> Lista Veterinarios
              </Nav.Link>
            )}
            {user && user.role === "admin" && (
              <Nav.Link as={NavLink} to="/veterinarios/admin">
                <BsGear /> Gestión Veterinarios
              </Nav.Link>
            )}
            {!user ? (
              <Nav.Link as={NavLink} to="/login">
                <BsPersonCircle /> Login
              </Nav.Link>
            ) : (
              <Nav.Link onClick={logout}>
                <BsPersonCircle /> Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export { Menu };