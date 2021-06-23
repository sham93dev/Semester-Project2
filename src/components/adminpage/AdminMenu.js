import React from "react";
import { Link } from "react-router-dom";
import PostList from "./posts/PostList";

export default function AdminMenu() {
  return (
    <section className="admin-page-dashboard">
      <h1>Dashboard</h1>
      <nav className="admin-nav">
        <ul>
          <Link to="/adminpage/posts/">Posts</Link>
        </ul>
        <ul>
          <Link to="/adminpage/posts/create">Create New Post</Link>
        </ul>

      </nav>
  
    </section>
  );
}
