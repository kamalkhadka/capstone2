import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Navigation() {
  return (
    <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">

      <LinkContainer to="/">
        <Navbar.Brand className="font-weight-bold text-muted">
          Track Dividend
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav activeKey={window.location.pathname}>
          <LinkContainer to="/signup">
            <Nav.Link>Signup</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
}

