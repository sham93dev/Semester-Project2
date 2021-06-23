import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { FaUserCog, FaUserCircle } from "react-icons/fa";
import { Nav, Navbar, Button, Form, FormControl } from "react-bootstrap";
import { BASE_URL } from "../../constants/api";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);
  const [page, setPage] = useState([]);
  const [filteredPages, setFilteredPages] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await axios.get(BASE_URL);
        console.log(response.data);
        setPage(response.data);
      } catch (error) {
        setError(error.toString());
      }
    }
    fetchData();
  }, []);

  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push("/");
  }

  const search = (event) => {
    const string = event.target.value;
    setSearchString(string);
    setFilteredPages(page.filter((item) => item?.title.toLowerCase().includes(string.toLowerCase())));
  };

  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand href="/" className="brand-name">
        Front<b>Wiki</b>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto nav-links">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/guides">Guides</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <div className="search-bar-wrapper ml-auto">
          <Form inline>
            <FormControl type="text" placeholder="Search for guides.." onChange={search} className="mr-sm-1" />
            <Button className="search-btn">Search</Button>
          </Form>
          {filteredPages.length > 0 && searchString.length > 0 && (
            <ul className="auto-suggest">
              {filteredPages.map((page) => (
                <li key={page.id}>
                  <Link to={`/page/${page.id}`}>{page.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {auth ? (
          <>
            <Nav>
              <Nav.Link href="/admin">
                <FaUserCog id="admin-icon" size={29} />
              </Nav.Link>
              <button className="sign-out-button" onClick={logout}>
                Sign out
              </button>
            </Nav>
          </>
        ) : (
          <Nav>
            <Nav.Link href="/login">
              <FaUserCircle id="login-icon" size={31} />
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
