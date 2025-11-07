import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
  return (
    <Navbar bg="light" className="p-2" data-bs-theme="light">
      <Navbar.Brand href="/" className="ms-3">
        Home
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/list">List</Nav.Link>
        <Nav.Link href="/population">Population Bar Chart</Nav.Link>
        <Nav.Link href="/custom">Population Pie Chart</Nav.Link>
      </Nav>
    </Navbar>
  );
}
