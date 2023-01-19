import { NavLink } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { logoutAPI } from "../api/index";

export default () => {
  const handleLogout = async () => {
    await logoutAPI();
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="teal" variant="dark">
      <Container>
        <Navbar.Brand href="/">React</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink href="/">Home</NavLink>
          </Nav>
          <Nav>
            <Nav.Link className="color-white" onClick={() => handleLogout()}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
