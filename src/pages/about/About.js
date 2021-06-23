import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <section className="about-page-wrapper">
      <div className="about-page-container">
        <img src="./assets/css2.jpg" alt="Girl writing css" />
      </div>
      <div className="about-page-content">
        <h1>
          Front <b>Wiki</b>
        </h1>
        <p>
          FrontWiki was established in 2021 and is a website for anyone interested in front en development. We post tutorials and useful materials continuously for our members. We are run by volunteer front end developers who can post and share their
          knowledge via this site. Hope it is useful.
        </p>
        <p id="hide">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore
        </p>
        <Link to="/">
          <button className="go-back-button">Back to frontpage</button>
        </Link>
      </div>
    </section>
  );
}

export default About;
