import { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserContext from "./UserContext";

const Navigation = ({ logout }) => {

  const { currentUser } = useContext(UserContext);

  return (
    <Navbar className="mb-3 px-3">

      <LinkContainer to="/">
        <Navbar.Brand className="font-weight-bold text-muted">
          Stock Tracker
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {!currentUser &&
          <Nav>
            <LinkContainer to="/signup">
              <Nav.Link className="text-muted">Signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link className="text-muted">Login</Nav.Link>
            </LinkContainer>
          </Nav>
        }

        {currentUser &&
          <Nav>
            <LinkContainer to="/profile">
              <Nav.Link className="text-muted">Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link className="text-muted" onClick={logout}>Logout</Nav.Link>
            </LinkContainer>
          </Nav>
        }
      </Navbar.Collapse>

    </Navbar>
  );
}

export default Navigation;

