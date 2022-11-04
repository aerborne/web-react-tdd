import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { logoutAPI } from "../api/index";

function CollapsibleExample() {
  const handleLogout = async () => {
    console.log("logout");
    await logoutAPI();
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">FERDS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/report">Reports</Nav.Link>
            <Nav.Link href="/user">Users</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
