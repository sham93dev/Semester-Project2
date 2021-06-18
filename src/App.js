import React from "react";
import "./sass/style.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/layout/Navigation";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Admin from "./pages/admin/Admin";
import About from "./pages/about/About";
import Login from "./pages/login/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <div className="main-page-container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/page/:id">
              <Details />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/admin" exact>
              <Admin />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
