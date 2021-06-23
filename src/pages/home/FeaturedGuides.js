import React from "react";
import ContentList from "../ContentList";
import { Link } from "react-router-dom";

function FeaturedGuides() {
  return (
    <section className="popular-guides-wrapper">
      <h2>Popular guides </h2>
      <ContentList />
      <Link to="guides">
        <button className="view-all-btn">View All</button>
      </Link>
    </section>
  );
}

export default FeaturedGuides;
