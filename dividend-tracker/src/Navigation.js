import { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserContext from "./UserContext";

const Navigation = ({ logout }) => {

  const { currentUser } = useContext(UserContext);

  console.log(currentUser);

  return (
    <Navbar collapseOnSelect expand="md" className="mb-3 px-3">

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
              <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        }

        {currentUser &&
          <Nav>
            <LinkContainer to="/dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </LinkContainer>
          </Nav>
        }
      </Navbar.Collapse>

    </Navbar>
  );
}

export default Navigation;

