import React from "react";
import "./sass/style.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/layout/Navigation";
import Home from "./pages/home/Home";
import ContentDetails from "./pages/ContentDetails";
import Admin from "./pages/admin/Admin";
import About from "./pages/about/About";
import Login from "./pages/login/Login";
import Footer from "./components/layout/Footer";
import Guides from "./pages/guides/Guides";
import CreatePost from "./components/adminpage/posts/CreatePost";
import UpdatePost from "./components/adminpage/posts/UpdatePost";
import PostList from "./components/adminpage/posts/PostList";
import AdminMenu from "./components/adminpage/AdminMenu";

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
            <Route exact path="/guides">
              <Guides />
            </Route>
            <Route path="/page/:id">
              <ContentDetails />
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
            <Route path="/adminpage/" exact>
              <AdminMenu />
            </Route>
            <Route path="/adminpage/posts/" exact>
              <PostList />
            </Route>
            <Route path="/adminpage/posts/create">
              <CreatePost />
            </Route>
            <Route path="/adminpage/posts/update/:id">
              <UpdatePost />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </AuthProvider>
  );
}

export default App;
