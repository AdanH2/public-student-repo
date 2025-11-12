import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
  return (
    <Navbar bg="light" className="p-2" data-bs-theme="light">
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/list">List</Nav.Link>
        <Nav.Link href="/bar-chart">Bar Chart</Nav.Link>
        <Nav.Link href="/pie-chart">Pie Chart</Nav.Link>
      </Nav>
    </Navbar>
  );
}
