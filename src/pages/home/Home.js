import React from "react";
import FeaturedGuides from "./FeaturedGuides";
import HeroBanner from "./HeroBanner";
import BooksSection from "./BooksSection";

function Home() {
  return (
    <div>
      <HeroBanner />
      <FeaturedGuides />
      <section className="video-section">
        <h3>Want to become web developer?</h3>
        <video src="/assets/coding.mp4" autoPlay loop muted />
      </section>
      <BooksSection />
    </div>
  );
}

export default Home;
