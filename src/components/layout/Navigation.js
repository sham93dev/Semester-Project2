import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { BsFillPersonFill, BsFillPersonCheckFill } from "react-icons/bs";
import { Nav, Navbar, Button, Form, FormControl } from "react-bootstrap";

export default function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push("/");
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        Front<b>Wiki</b>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#contact-page-wrapper">Guides</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <div className="searchbar-wrapper mr-auto">
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-light">Search</Button>
            </Form>
          </div>
        </Nav>
        {auth ? (
          <>
            <Nav>
              <Nav.Link href="/admin">
                <BsFillPersonCheckFill id="logedin" size={31} />
              </Nav.Link>
              <Button id="signout" onClick={logout} variant="danger" size="sm">
                Sign out
              </Button>
            </Nav>
          </>
        ) : (
          <Nav>
            <Nav.Link href="/login">
              <BsFillPersonFill size={31} />
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
