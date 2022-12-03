import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Navigation.css";
import { useContext } from "react";
import userContext from "./userContext";

/**
 * Navigation:
 *
 * Props: logout - fn to be called in parent
 *
 * State: none
 *
 * App -> Navigation -> Navlink
 */
function Navigation({ logout }) {
  console.log("Navigation");

  const { currUser } = useContext(userContext);

  return (
    <Navbar bg="light" sticky="top" className="Navigation">
      <Container>
        <Navbar.Brand>
          <NavLink to="/">Jobly</NavLink>
        </Navbar.Brand>
        <Nav className="nav-right">
          {currUser && (
            <>
              <Nav.Link as="span">
                <NavLink to="/companies">Companies</NavLink>
              </Nav.Link>
              <Nav.Link as="span">
                <NavLink to="/jobs">Jobs</NavLink>
              </Nav.Link>
              <Nav.Link as="span">
                <NavLink to="/profile">Profile</NavLink>
              </Nav.Link>
              <Nav.Link as="span">
                <NavLink to="/" onClick={logout}>
                  Logout {currUser.username}
                </NavLink>
              </Nav.Link>
            </>
          )}
          {!currUser && (
            <>
              <Nav.Link as="span">
                <NavLink to="/signup">Register</NavLink>
              </Nav.Link>
              <Nav.Link as="span">
                <NavLink to="/login">Login</NavLink>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
