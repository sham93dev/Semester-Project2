import React from "react";
import ExploreButton from "../../components/layout/ExploreButton";
import ReadMoreButton from "../../components/layout/ReadMoreButton";

export default function HeroBanner() {
  return (
    <div className="hero-banner" style={{ backgroundImage: `url(${"./assets/bakgrunn2.jpg"})` }}>
      <h1>Learn from the best</h1>
      <p>Welcome to frontwiki. With us you get the latest guides and tutorials. We are here for front end developers so feel free to explore and learn. Is something unclear? let us know!</p>
      <div className="hero-buttons-wrapper">
        <ReadMoreButton />
        <ExploreButton />
      </div>
    </div>
  );
}
